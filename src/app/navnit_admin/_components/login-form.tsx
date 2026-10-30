"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, null);

  return (
    <form action={action} className="space-y-4">
      <label className="block">
        <span className="text-sm font-medium text-gray-800">Email</span>
        <input
          name="email"
          type="email"
          key={state?.email}
          defaultValue={state?.email}
          autoComplete="username"
          required
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-950 outline-none focus:border-lime-600 focus:ring-2 focus:ring-lime-600/30"
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-gray-800">Password</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-950 outline-none focus:border-lime-600 focus:ring-2 focus:ring-lime-600/30"
        />
      </label>
      {state?.error && (
        <p role="alert" className="rounded-lg border border-gray-900 bg-gray-100 px-3 py-2 text-sm font-medium text-gray-950">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-lime-600 px-4 py-2.5 font-semibold text-white hover:bg-lime-700 disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
