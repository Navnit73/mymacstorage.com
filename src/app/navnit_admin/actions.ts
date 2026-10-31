"use server";

import { redirect } from "next/navigation";
import { ADMIN_LOGIN_PATH, ADMIN_PATH, signIn, signOut } from "@/lib/admin-auth";

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
