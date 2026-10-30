"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/navnit_admin", label: "Overview" },
  { href: "/navnit_admin/visits", label: "Visits" },
  { href: "/navnit_admin/orders", label: "Orders" },
  { href: "/navnit_admin/logs", label: "Logs" },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="-mx-1 flex gap-1 overflow-x-auto">
      {links.map((l) => {
        const active = l.href === "/navnit_admin" ? pathname === l.href : pathname.startsWith(l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={active ? "page" : undefined}
            className={`whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ${
              active ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
