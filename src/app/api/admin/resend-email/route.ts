import { rejectUnlessAdmin } from "@/lib/admin";
import { resendLicenceEmail } from "@/lib/orders";

/**
 * Sends a buyer their download links and licence key again.
 * Body: `{ "email": "buyer@example.com" }`, the address they paid with. Optional `"to"` sends it somewhere else.
 */
export async function POST(request: Request) {
  const rejected = rejectUnlessAdmin(request);
  if (rejected) return rejected;

  const body = (await request.json().catch(() => null)) as { email?: unknown; to?: unknown } | null;
  if (typeof body?.email !== "string" || !body.email) {
    return Response.json({ error: "Body must be { email }" }, { status: 400 });
  }

  const sent = await resendLicenceEmail(body.email, typeof body.to === "string" && body.to ? body.to : body.email);
  if (!sent) return Response.json({ error: "No order with a licence key for that email" }, { status: 404 });
  return Response.json({ sent: true, ...sent });
}
