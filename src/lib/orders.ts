import { collection } from "@/lib/db";
import { dodo } from "@/lib/dodo";
import { sendPurchaseEmail } from "@/lib/email";

/**
 * Sends a buyer their download links and licence key again, for "I never got the email" support requests. `email`
 * is the address they paid with; `to` sends it somewhere else. Returns null when no order for that email has a key.
 */
export async function resendLicenceEmail(email: string, to = email) {
  const order = await (await collection("orders")).findOne(
    { email, licenseKeyId: { $exists: true } },
    { sort: { createdAt: -1 } },
  );
  if (!order?.licenseKeyId) return null;

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
  return { to, emailId };
}
