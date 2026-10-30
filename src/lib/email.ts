import { Resend } from "resend";
import { collection } from "@/lib/db";
import { logger } from "@/lib/logger";
import { APP_NAME, SITE_URL, SUPPORT_EMAIL } from "@/lib/site";

const log = logger("email");

let client: Resend | undefined;

/** Built on first use for the same reason as the Dodo client: no API key at build time. */
function resend() {
  return (client ??= new Resend(requireEnv("RESEND_API_KEY")));
}

type PurchaseEmail = {
  to: string;
  name?: string | null;
  licenseKey: string;
  /** Resend drops a repeat send with the same key for 24 hours, so a retried webhook never emails twice. */
  idempotencyKey: string;
  orderId?: string | null;
  grantId?: string | null;
};

/**
 * Emails the buyer their download links and licence key through Resend, records the attempt in the `emails`
 * collection and returns Resend's email ID. Throws if Resend rejects it.
 */
export async function sendPurchaseEmail({ to, name, licenseKey, idempotencyKey, orderId, grantId }: PurchaseEmail) {
  const macUrl = requireEnv("MAC_DOWNLOAD_URL");
  const windowsUrl = process.env.WINDOWS_DOWNLOAD_URL;
  const greeting = name ? `Hi ${escapeHtml(name)},` : "Hi,";
  const key = escapeHtml(licenseKey);

  const html = `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:520px;margin:0 auto;color:#111">
  <h1 style="font-size:22px">Thanks for buying ${APP_NAME}</h1>
  <p>${greeting}</p>
  <p>Your payment went through. Download the app, open it and paste your licence key when it asks.</p>
  <p style="margin:28px 0">
    <a href="${macUrl}" style="background:#65a30d;color:#fff;padding:12px 22px;border-radius:10px;text-decoration:none;font-weight:600">Download for Mac</a>
  </p>
  ${windowsUrl ? `<p>On Windows? <a href="${windowsUrl}" style="color:#4d7c0f">Download for Windows</a>. The same key works on both.</p>` : ""}
  <p style="margin-bottom:6px">Your licence key:</p>
  <p style="font-family:ui-monospace,Menlo,monospace;font-size:16px;background:#f3f4f6;padding:12px 16px;border-radius:8px;word-break:break-all">${key}</p>
  <p style="color:#6b7280;font-size:14px">Keep this email. You need the key again if you reinstall or move to a new computer.</p>
  <p style="color:#6b7280;font-size:14px">Questions? Reply to this email or write to <a href="mailto:${SUPPORT_EMAIL}" style="color:#4d7c0f">${SUPPORT_EMAIL}</a>.</p>
  <p style="color:#6b7280;font-size:14px"><a href="${SITE_URL}" style="color:#6b7280">${SITE_URL.replace("https://", "")}</a></p>
</div>`;

  const text = [
    `Thanks for buying ${APP_NAME}.`,
    "",
    `Download for Mac: ${macUrl}`,
    ...(windowsUrl ? [`Download for Windows: ${windowsUrl}`] : []),
    "",
    `Your licence key: ${licenseKey}`,
    "",
    "Keep this email. You need the key again if you reinstall or move to a new computer.",
    `Questions? Write to ${SUPPORT_EMAIL}.`,
  ].join("\n");

  const subject = `Your ${APP_NAME} download and licence key`;
  const { data, error } = await resend().emails.send(
    { from: requireEnv("EMAIL_FROM"), to, replyTo: SUPPORT_EMAIL, subject, html, text },
    { idempotencyKey },
  );

  const record = { to, subject, kind: "purchase" as const, orderId: orderId ?? null, grantId: grantId ?? null };
  const emails = await collection("emails");
  if (error || !data) {
    const message = error ? `${error.name}: ${error.message}` : "Resend returned no data";
    await emails.insertOne({ ...record, resendId: null, status: "failed", error: message, at: new Date() });
    await log.error("Purchase email rejected", { to, grantId, error: message });
    throw new Error(`Resend rejected the purchase email: ${message}`);
  }

  await emails.insertOne({ ...record, resendId: data.id, status: "sent", at: new Date() });
  await log.info("Purchase email sent", { to, grantId, resendId: data.id });
  return data.id;
}

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set`);
  return value;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}
