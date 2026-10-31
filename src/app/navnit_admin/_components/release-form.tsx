"use client";

import { useActionState } from "react";
import { createReleaseAction } from "../app-actions";

const input =
  "mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-950 outline-none focus:border-lime-600 focus:ring-2 focus:ring-lime-600/30";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-800">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-gray-500">{hint}</span>}
    </label>
  );
}

/** Publishes a release. Apps see it on their next heartbeat, within about a minute. */
export function ReleaseForm() {
  const [state, action, pending] = useActionState(createReleaseAction, null);

  return (
    <form action={action} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Version" hint="CFBundleShortVersionString">
          <input name="version" required placeholder="1.4.0" className={input} />
        </Field>
        <Field label="Build" hint="CFBundleVersion, an integer">
          <input name="build" required inputMode="numeric" pattern="[0-9]+" placeholder="42" className={input} />
        </Field>
        <Field label="Channel">
          <select name="channel" defaultValue="stable" className={input}>
            <option value="stable">Stable</option>
            <option value="beta">Beta</option>
          </select>
        </Field>
      </div>
      <Field label="Download URL" hint="https link to the .dmg or .zip">
        <input name="downloadUrl" type="url" required placeholder="https://…" className={input} />
      </Field>
      <Field label="Title">
        <input name="title" placeholder="Defaults to “Version 1.4.0”" className={input} />
      </Field>
      <Field label="Release notes">
        <textarea name="notes" rows={4} className={input} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-4">
        <Field label="Size (bytes)" hint="For Sparkle">
          <input name="size" inputMode="numeric" pattern="[0-9]*" className={input} />
        </Field>
        <Field label="EdDSA signature" hint="sign_update output">
          <input name="edSignature" className={input} />
        </Field>
        <Field label="Minimum macOS">
          <input name="minimumSystemVersion" placeholder="13.0" className={input} />
        </Field>
        <Field label="Force builds below" hint="Older builds must update">
          <input name="minimumSupportedBuild" inputMode="numeric" pattern="[0-9]*" className={input} />
        </Field>
      </div>
      <div className="flex flex-wrap items-center gap-6 text-sm text-gray-800">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="critical" className="size-4 accent-lime-600" /> Critical (can’t be skipped)
        </label>
        <label className="flex items-center gap-2">
          <input type="hidden" name="published" value="false" />
          <input type="checkbox" name="published" value="true" defaultChecked className="size-4 accent-lime-600" />
          Publish now
        </label>
      </div>
      {(state?.error || state?.message) && (
        <p role="status" className="rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-950">
          {state.error ?? state.message}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-lime-600 px-4 py-2 text-sm font-semibold text-white hover:bg-lime-700 disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save release"}
      </button>
    </form>
  );
}
