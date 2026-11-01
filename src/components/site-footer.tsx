import Link from "next/link";
import { APP_NAME, SUPPORT_EMAIL, pages } from "@/lib/site";
import { Price } from "./price";
import { Logo } from "./icons";

const productLinks = [
  { href: "/#inside", label: "Inside" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

// Product links first, then each page group in the order it first appears in `pages`.
const columns = [
  { title: "Product", links: productLinks },
  ...[...new Set(pages.map((p) => p.group))].map((group) => ({
    title: group,
    links: pages.filter((p) => p.group === group).map(({ path, label }) => ({ href: path, label })),
  })),
];

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 px-4 pt-12 pb-8 sm:px-6 sm:pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-[1.5fr_repeat(6,minmax(0,1fr))]">
          <div className="col-span-2 sm:col-span-4 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 font-semibold">
              <Logo />
              {APP_NAME}
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-pretty text-gray-500">
              Disk cleanup for Mac, done safely. <Price /> once, no subscription.
            </p>
          </div>
          {columns.map(({ title, links }) => (
            <nav key={title} aria-label={title}>
              <p className="text-sm font-semibold text-black">{title}</p>
              <ul className="mt-4 space-y-3 text-sm">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="text-gray-600 transition-colors hover:text-black">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-gray-200 pt-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 {APP_NAME}. All rights reserved.</p>
          <a href={`mailto:${SUPPORT_EMAIL}`} className="transition-colors hover:text-black">
            {SUPPORT_EMAIL}
          </a>
        </div>
      </div>
    </footer>
  );
}
