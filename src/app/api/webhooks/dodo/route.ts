import { MongoServerError, type ObjectId } from "mongodb";
import type { EntitlementGrant } from "dodopayments/resources/entitlements/grants";
import type { Payment } from "dodopayments/resources/payments";
import { collection, type OrderStatus } from "@/lib/db";
import { dodo } from "@/lib/dodo";
import { logger } from "@/lib/logger";

const log = logger("webhook");

/**
 * Dodo calls this for payment and licence events. Payments update the order; when the licence key for a paid order
 * is issued, the order is marked fulfilled. Dodo emails the buyer the receipt and licence key itself.
 *
 * The key arrives on `entitlement_grant.created` (auto-fulfilled keys) or `entitlement_grant.delivered`
 * (a key fulfilled or restored later), not on `payment.succeeded`. Subscribe to those two plus `payment.succeeded`,
 * `payment.failed` and `payment.cancelled`.
 *
 * Every event is stored in `webhook_events` under its webhook-id. A non-2xx response makes Dodo retry; an event that
 * was already processed is acknowledged without running again.
 */
export async function POST(request: Request) {
  const body = await request.text();
  const webhookId = request.headers.get("webhook-id") ?? "";

  // Outside the try: a missing API key should surface as a 500, not pass for a bad signature.
  const client = dodo();
  let event;
  try {
    event = client.webhooks.unwrap(body, {
      headers: {
        "webhook-id": webhookId,
        "webhook-signature": request.headers.get("webhook-signature") ?? "",
        "webhook-timestamp": request.headers.get("webhook-timestamp") ?? "",
      },
    });
  } catch {
    await log.warn("Rejected webhook with an invalid signature", { webhookId });
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }

  const events = await collection("webhook_events");
  try {
    await events.insertOne({ _id: webhookId, type: event.type, payload: event, receivedAt: new Date() });
  } catch (error) {
    if (!(error instanceof MongoServerError && error.code === 11000)) throw error;
    const seen = await events.findOne({ _id: webhookId });
    if (seen?.processedAt) return Response.json({ received: true, duplicate: true });
  }

  try {
    switch (event.type) {
      case "payment.succeeded":
        await recordPayment(event.data, "paid");
        break;
      case "payment.failed":
        await recordPayment(event.data, "failed");
        break;
      case "payment.cancelled":
        await recordPayment(event.data, "cancelled");
        break;
      case "entitlement_grant.created":
      case "entitlement_grant.delivered":
        await recordLicence(event.data);
        break;
    }
    await events.updateOne({ _id: webhookId }, { $set: { processedAt: new Date() }, $unset: { error: "" } });
  } catch (error) {
    await events.updateOne({ _id: webhookId }, { $set: { error: String(error) } });
    await log.error("Webhook processing failed", { webhookId, type: event.type, error });
    return Response.json({ error: "Processing failed" }, { status: 500 });
  }

  return Response.json({ received: true });
}

/** Statuses an event may not overwrite: a late failure must not undo a payment, nor a payment undo a fulfilment. */
const KEEP: Record<OrderStatus, OrderStatus[]> = {
  checkout_created: [],
  paid: ["fulfilled"],
  failed: ["paid", "fulfilled"],
  cancelled: ["paid", "fulfilled"],
  fulfilled: [],
};

async function recordPayment(payment: Payment, status: OrderStatus) {
  const orders = await collection("orders");
  const now = new Date();
  const filter = payment.checkout_session_id
    ? { checkoutSessionId: payment.checkout_session_id }
    : { paymentId: payment.payment_id };

  const details = {
    paymentId: payment.payment_id,
    customerId: payment.customer.customer_id,
    email: payment.customer.email,
    name: payment.customer.name,
    amount: payment.total_amount,
    currency: payment.currency,
    updatedAt: now,
  };
  // Details and status change together, and only when the status may change. A late failure for an earlier attempt
  // must not replace the payment ID and amount of the attempt that succeeded.
  const updated = await orders.updateOne(
    { ...filter, status: { $nin: KEEP[status] } },
    { $set: { ...details, status } },
  );
  // Only a successful payment is worth an order the checkout route didn't save. Filtering on the status above would
  // make an existing fulfilled order look missing and the insert collide with it, so this is a separate step.
  if (updated.matchedCount === 0 && status === "paid") {
    await orders.updateOne(
      filter,
      {
        $setOnInsert: {
          ...details,
          checkoutSessionId: payment.checkout_session_id ?? `payment:${payment.payment_id}`,
          status,
          visitorId: (payment.metadata?.visitor_id as string | undefined) ?? null,
          createdAt: now,
        },
      },
      { upsert: true },
    );
  }
  await log.info(`Payment ${status}`, { paymentId: payment.payment_id, checkoutSessionId: payment.checkout_session_id });

  if (status === "paid") await attachEarlyGrant(payment);
}

/** Dodo can issue the licence before payment.succeeded arrives. If it did, attach it to this order now. */
async function attachEarlyGrant(payment: Payment) {
  const orders = await collection("orders");
  const order = await orders.findOne({ paymentId: payment.payment_id, status: "paid" });
  if (!order) return;

  const grants = (await (await collection("webhook_events"))
    .find({ type: { $in: LICENCE_EVENTS }, "payload.data.customer_id": payment.customer.customer_id })
    .sort({ receivedAt: -1 })
    .toArray()).map((e) => (e.payload as { data: EntitlementGrant }).data);

  for (const grant of grants) {
    if (grant.status !== "Delivered" || !grant.license_key) continue;
    if (await orders.findOne({ grantId: grant.id })) continue;
    await markFulfilled(order._id, grant);
    return;
  }
}

const LICENCE_EVENTS = ["entitlement_grant.created", "entitlement_grant.delivered"];

/** Dodo emails the buyer their licence key itself; this only records which order it belongs to. */
async function recordLicence(grant: EntitlementGrant) {
  if (grant.status !== "Delivered" || !grant.license_key) return;

  const orders = await collection("orders");
  // Dodo can send both entitlement_grant.created and .delivered for one grant.
  if (await orders.findOne({ grantId: grant.id })) return;

  // The grant doesn't name its payment, so it belongs to this customer's newest paid order still waiting for a
  // licence. If payment.succeeded hasn't arrived yet, no order matches; attachEarlyGrant links it later.
  const order = await orders.findOne({ customerId: grant.customer_id, status: "paid" }, { sort: { createdAt: -1 } });
  if (!order) {
    await log.info("Licence issued before its payment was recorded", { grantId: grant.id });
    return;
  }
  await markFulfilled(order._id, grant);
}

async function markFulfilled(orderId: ObjectId, grant: EntitlementGrant) {
  await (await collection("orders")).updateOne(
    { _id: orderId },
    {
      $set: {
        status: "fulfilled",
        grantId: grant.id,
        ...(grant.license_key && { licenseKeyId: grant.license_key.id }),
        updatedAt: new Date(),
      },
    },
  );
  await log.info("Licence issued", { orderId: orderId.toString(), grantId: grant.id });
}
