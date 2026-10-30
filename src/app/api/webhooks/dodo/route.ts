import { MongoServerError } from "mongodb";
import type { EntitlementGrant } from "dodopayments/resources/entitlements/grants";
import type { Payment } from "dodopayments/resources/payments";
import { collection, type OrderStatus } from "@/lib/db";
import { dodo } from "@/lib/dodo";
import { sendPurchaseEmail } from "@/lib/email";
import { logger } from "@/lib/logger";

const log = logger("webhook");

/**
 * Dodo calls this for payment and licence events. Payments update the order; when the licence key for a paid order
 * is issued, the buyer is emailed the download links and the key.
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
        await deliverLicence(event.data);
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

  await orders.updateOne(
    filter,
    {
      $set: {
        paymentId: payment.payment_id,
        customerId: payment.customer.customer_id,
        email: payment.customer.email,
        name: payment.customer.name,
        amount: payment.total_amount,
        currency: payment.currency,
        updatedAt: now,
      },
      $setOnInsert: {
        checkoutSessionId: payment.checkout_session_id ?? `payment:${payment.payment_id}`,
        status,
        visitorId: (payment.metadata?.visitor_id as string | undefined) ?? null,
        createdAt: now,
      },
    },
    // Only a successful payment is worth an order the checkout route didn't save.
    { upsert: status === "paid" },
  );
  await orders.updateOne({ ...filter, status: { $nin: KEEP[status] } }, { $set: { status } });
  await log.info(`Payment ${status}`, { paymentId: payment.payment_id, checkoutSessionId: payment.checkout_session_id });

  if (status === "paid") await attachEarlyLicenceEmail(payment);
}

/** The licence email can go out before payment.succeeded arrives. If it did, mark this order fulfilled now. */
async function attachEarlyLicenceEmail(payment: Payment) {
  const emails = await collection("emails");
  const sent = await emails.findOne(
    { customerId: payment.customer.customer_id, kind: "purchase", status: "sent", orderId: null },
    { sort: { at: -1 } },
  );
  if (!sent?.grantId) return;

  const orders = await collection("orders");
  const order = await orders.findOneAndUpdate(
    { paymentId: payment.payment_id, grantId: { $exists: false } },
    {
      $set: {
        status: "fulfilled",
        grantId: sent.grantId,
        ...(sent.licenseKeyId && { licenseKeyId: sent.licenseKeyId }),
        ...(sent.resendId && { emailId: sent.resendId }),
        emailSentAt: sent.at,
        updatedAt: new Date(),
      },
    },
  );
  if (order) await emails.updateOne({ _id: sent._id }, { $set: { orderId: order._id.toString() } });
}

async function deliverLicence(grant: EntitlementGrant) {
  if (grant.status !== "Delivered" || !grant.license_key) return;

  // Dodo can send both entitlement_grant.created and .delivered for one grant. One email per grant is enough;
  // support can resend from the admin panel.
  const emails = await collection("emails");
  if (await emails.findOne({ grantId: grant.id, kind: "purchase", status: "sent" })) {
    await log.info("Licence already emailed for this grant", { grantId: grant.id });
    return;
  }

  const customer = await dodo().customers.retrieve(grant.customer_id);
  const orders = await collection("orders");
  // The grant doesn't name its payment, so it belongs to this customer's newest paid order still waiting for a
  // licence. If payment.succeeded hasn't arrived yet, no order matches; attachEarlyLicenceEmail links it later.
  const order = await orders.findOne({ customerId: grant.customer_id, status: "paid" }, { sort: { createdAt: -1 } });

  const emailId = await sendPurchaseEmail({
    to: customer.email,
    name: customer.name,
    licenseKey: grant.license_key.key,
    idempotencyKey: `licence-email/${grant.id}`,
    orderId: order?._id.toString() ?? null,
    grantId: grant.id,
    customerId: grant.customer_id,
    licenseKeyId: grant.license_key.id,
  });

  if (order) {
    await orders.updateOne(
      { _id: order._id },
      {
        $set: {
          status: "fulfilled",
          grantId: grant.id,
          licenseKeyId: grant.license_key.id,
          emailId,
          emailSentAt: new Date(),
          updatedAt: new Date(),
        },
      },
    );
  }
}
