import Link from "next/link";
import { APP_NAME, pages } from "@/lib/site";
import { Logo } from "./icons";

const productLinks = [
  { href: "/#inside", label: "Inside" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 text-center lg:flex-row lg:text-left">
        <Link href="/" className="flex items-center gap-2.5 font-semibold">
          <Logo />
          {APP_NAME}
        </Link>
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
          {[...productLinks, ...pages.map(({ path, label }) => ({ href: path, label }))].map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-black">
              {label}
            </Link>
          ))}
        </nav>
        <p className="text-sm text-gray-500">&copy; 2026 {APP_NAME}</p>
      </div>
    </footer>
  );
}
