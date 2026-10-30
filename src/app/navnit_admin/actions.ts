"use server";

import { redirect } from "next/navigation";
import { ADMIN_LOGIN_PATH, ADMIN_PATH, requireAdmin, signIn, signOut } from "@/lib/admin-auth";
import { logger } from "@/lib/logger";
import { resendLicenceEmail } from "@/lib/orders";

export type FormState = { error?: string; message?: string; email?: string } | null;

export async function loginAction(_: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "");
  const result = await signIn(email, String(formData.get("password") ?? ""));
  // React resets the form after an action; handing the email back keeps it filled in for the retry.
  if (!result.ok) return { error: result.error, email };
  redirect(ADMIN_PATH);
}

export async function logoutAction() {
  await signOut();
  redirect(ADMIN_LOGIN_PATH);
}

export async function resendEmailAction(_: FormState, formData: FormData): Promise<FormState> {
  const admin = await requireAdmin();
  const email = String(formData.get("email") ?? "");
  try {
    const sent = await resendLicenceEmail(email);
    if (!sent) return { error: "This order has no licence key yet." };
    await logger("admin").info("Licence email resent", { by: admin.email, to: email });
    return { message: `Sent to ${sent.to}` };
  } catch (error) {
    await logger("admin").error("Licence email resend failed", { by: admin.email, to: email, error });
    return { error: "Sending failed. See Logs." };
  }
}
