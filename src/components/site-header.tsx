"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./icons";

const links = [
  { href: "#inside", label: "Inside" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader({ appName, price }: { appName: string; price: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        solid ? "border-gray-200 bg-white/85 backdrop-blur-md" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5 font-semibold" onClick={() => setOpen(false)}>
          <Logo />
          {appName}
        </a>

        <nav className="flex items-center gap-2 text-sm sm:gap-7">
          {links.map(({ href, label }) => (
            <a key={href} href={href} className="hidden text-gray-700 transition-colors hover:text-black sm:block">
              {label}
            </a>
          ))}
          <a
            href="#pricing"
            className="rounded-lg bg-lime-600 px-4 py-2 font-medium text-white transition-colors hover:bg-lime-700"
          >
            Buy for {price}
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-2 flex size-10 items-center justify-center rounded-lg text-black sm:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
      </div>

      {open && (
        <nav className="border-t border-gray-100 px-5 pb-3 sm:hidden">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block border-b border-gray-100 py-3.5 text-base font-medium last:border-0"
            >
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
