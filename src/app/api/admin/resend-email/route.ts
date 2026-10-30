import { rejectUnlessAdmin } from "@/lib/admin";
import { collection } from "@/lib/db";
import { dodo } from "@/lib/dodo";
import { sendPurchaseEmail } from "@/lib/email";

/**
 * Sends a buyer their download links and licence key again, for "I never got the email" support requests.
 * Body: `{ "email": "buyer@example.com" }`, the address they paid with. Optional `"to"` sends it somewhere else.
 */
export async function POST(request: Request) {
  const rejected = rejectUnlessAdmin(request);
  if (rejected) return rejected;

  const body = (await request.json().catch(() => null)) as { email?: unknown; to?: unknown } | null;
  if (typeof body?.email !== "string" || !body.email) {
    return Response.json({ error: "Body must be { email }" }, { status: 400 });
  }
  const to = typeof body.to === "string" && body.to ? body.to : body.email;

  const order = await (await collection("orders")).findOne(
    { email: body.email, licenseKeyId: { $exists: true } },
    { sort: { createdAt: -1 } },
  );
  if (!order?.licenseKeyId) {
    return Response.json({ error: "No order with a licence key for that email" }, { status: 404 });
  }

  const licence = await dodo().licenseKeys.retrieve(order.licenseKeyId);
  const emailId = await sendPurchaseEmail({
    to,
    name: order.name,
    licenseKey: licence.key,
    // Unique per request: a resend is always deliberate.
    idempotencyKey: `licence-resend/${order._id}/${Date.now()}`,
    orderId: order._id.toString(),
    grantId: order.grantId ?? null,
  });
  return Response.json({ sent: true, to, emailId });
}
