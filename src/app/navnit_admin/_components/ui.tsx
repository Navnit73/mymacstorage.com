import Link from "next/link";
import type { ReactNode } from "react";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: process.env.ADMIN_TIME_ZONE || "UTC",
});

/** Admin dates are shown in ADMIN_TIME_ZONE (an IANA name like "Asia/Kolkata"), or UTC. */
export function formatDate(date: Date | string | undefined | null) {
  return date ? dateFormat.format(new Date(date)) : "—";
}

/** Dodo amounts are in the currency's smallest unit, e.g. cents. */
export function formatMoney(amount: number | undefined, currency: string | undefined) {
  if (amount === undefined || !currency) return "—";
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount / 100);
}

export function PageTitle({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <h1 className="text-2xl font-semibold tracking-tight text-gray-950">{children}</h1>
      {aside}
    </div>
  );
}

export function Card({ title, children, className = "" }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-xl border border-gray-200 bg-white p-5 ${className}`}>
      {title && <h2 className="mb-4 text-sm font-semibold text-gray-950">{title}</h2>}
      {children}
    </section>
  );
}

export function Stat({ label, value, note }: { label: string; value: ReactNode; note?: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="mt-1 text-3xl font-semibold tabular-nums tracking-tight text-gray-950">{value}</p>
      {note && <p className="mt-1 text-xs text-gray-500">{note}</p>}
    </div>
  );
}

/** A plain table that scrolls sideways on its own, so wide rows never widen the page. */
export function Table({ head, children, empty }: { head: string[]; children: ReactNode; empty?: boolean }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-600">
          <tr>
            {head.map((h) => (
              <th key={h} scope="col" className="whitespace-nowrap px-4 py-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {empty ? (
            <tr>
              <td colSpan={head.length} className="px-4 py-10 text-center text-gray-500">
                Nothing here yet.
              </td>
            </tr>
          ) : (
            children
          )}
        </tbody>
      </table>
    </div>
  );
}

export function Td({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <td className={`px-4 py-3 align-top text-gray-800 ${className}`}>{children}</td>;
}

export function Badge({ children, tone = "gray" }: { children: ReactNode; tone?: "gray" | "lime" | "dark" }) {
  const tones = {
    gray: "bg-gray-100 text-gray-700",
    lime: "bg-lime-600 text-white",
    dark: "bg-gray-900 text-white",
  };
  return (
    <span className={`inline-block whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

/** A row of links that each set one query parameter; the current one is highlighted. */
export function FilterLinks({
  options,
  current,
}: {
  options: { label: string; href: string; value: string }[];
  current: string;
}) {
  return (
    <div className="flex flex-wrap gap-1 rounded-lg border border-gray-200 bg-white p-1">
      {options.map((o) => (
        <Link
          key={o.value}
          href={o.href}
          className={`rounded-md px-3 py-1.5 text-sm ${
            o.value === current ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {o.label}
        </Link>
      ))}
    </div>
  );
}

export function PanelSkeleton() {
  return (
    <div className="animate-pulse space-y-4" aria-label="Loading">
      <div className="h-8 w-48 rounded bg-gray-200" />
      <div className="h-40 rounded-xl bg-gray-100" />
      <div className="h-64 rounded-xl bg-gray-100" />
    </div>
  );
}
