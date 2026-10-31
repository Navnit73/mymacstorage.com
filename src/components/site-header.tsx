"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { CHECKOUT_URL } from "@/lib/site";
import { Logo } from "./icons";
import { Price } from "./price";

const links = [
  { href: "/#inside", label: "Inside" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

// Ignore tiny scroll jitter (e.g. trackpad bounce) so the bar doesn't flicker.
const SCROLL_DELTA_PX = 6;

export function SiteHeader({ appName }: { appName: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);
  const [open, setOpen] = useState(false);

  // Hide when scrolling down, show again as soon as the user scrolls up.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (Math.abs(y - lastY) < SCROLL_DELTA_PX) return;
      setScrollingDown(y > lastY);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;
  const hidden = scrollingDown && scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-transform duration-300 sm:px-6 sm:pt-5 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div
        className={`mx-auto max-w-5xl rounded-2xl border transition-all duration-300 ${
          solid ? "border-gray-200/80 bg-white/80 shadow-lg shadow-black/5 backdrop-blur-md" : "border-transparent"
        }`}
      >
        <div className="flex h-14 items-center justify-between pr-2 pl-4 sm:h-16 sm:pr-3 sm:pl-6">
          <Link href="/" className="flex items-center gap-2.5 font-semibold" onClick={() => setOpen(false)}>
            <Logo />
            {appName}
          </Link>

          <nav className="flex items-center gap-2 text-sm sm:gap-7">
            {links.map(({ href, label }) => (
              <a key={href} href={href} className="hidden text-gray-700 transition-colors hover:text-black sm:block">
                {label}
              </a>
            ))}
            <a
              href={CHECKOUT_URL}
              className="rounded-xl bg-lime-600 px-4 py-2 font-medium text-white transition-colors hover:bg-lime-700"
            >
              Buy for <Price />
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex size-10 items-center justify-center rounded-lg text-black sm:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </nav>
        </div>

        {open && (
          <nav className="mx-4 border-t border-gray-100 pb-2 sm:hidden">
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
      </div>
    </header>
  );
}
