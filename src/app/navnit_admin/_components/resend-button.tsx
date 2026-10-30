"use client";

import { useActionState } from "react";
import { resendEmailAction } from "../actions";

export function ResendButton({ email }: { email: string }) {
  const [state, action, pending] = useActionState(resendEmailAction, null);

  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(`Email the licence key to ${email} again?`)) e.preventDefault();
      }}
    >
      <input type="hidden" name="email" value={email} />
      <button
        type="submit"
        disabled={pending}
        className="whitespace-nowrap rounded-md border border-gray-300 px-2.5 py-1 text-xs font-medium text-gray-800 hover:bg-gray-100 disabled:opacity-60"
      >
        {pending ? "Sending…" : "Resend email"}
      </button>
      {state && (
        <p role="status" className={`mt-1 text-xs ${state.error ? "font-medium text-gray-950" : "text-lime-700"}`}>
          {state.error ?? state.message}
        </p>
      )}
    </form>
  );
}
