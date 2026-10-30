import type { Metadata } from "next";
import { APP_NAME } from "@/lib/site";
import { LoginForm } from "../_components/login-form";

export const metadata: Metadata = { title: "Sign in" };

export default function AdminLoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8">
        <p className="text-sm font-medium text-lime-700">{APP_NAME}</p>
        <h1 className="mb-6 mt-1 text-2xl font-semibold tracking-tight text-gray-950">Admin sign in</h1>
        <LoginForm />
      </div>
    </main>
  );
}
