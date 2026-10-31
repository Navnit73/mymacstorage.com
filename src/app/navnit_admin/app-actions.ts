"use server";

import { refresh } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";
import { createRelease, deleteRelease, updateRelease } from "@/lib/app-releases";
import type { FormState } from "./actions";

export async function createReleaseAction(_: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const result = await createRelease(Object.fromEntries(formData));
  if (!result.ok) return { error: result.error };
  refresh();
  return { message: "Release saved." };
}

export async function setReleasePublishedAction(formData: FormData) {
  await requireAdmin();
  await updateRelease(String(formData.get("id")), { published: formData.get("published") === "true" });
  refresh();
}

export async function deleteReleaseAction(formData: FormData) {
  await requireAdmin();
  await deleteRelease(String(formData.get("id")));
  refresh();
}
