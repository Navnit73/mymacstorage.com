"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { CHECKOUT_URL, REFUND_DAYS } from "@/lib/site";
import { AppleIcon, Logo } from "./icons";
import { Price } from "./price";

const links = [
  { href: "/#inside", label: "Inside" },
  { href: "/#how", label: "How it works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
  { href: "/guides", label: "Guides" },
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

  // Escape closes the menu; widening past the phone layout closes it too.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const wide = window.matchMedia("(min-width: 768px)");
    const onWide = () => wide.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  const solid = scrolled || open;
  const hidden = scrollingDown && scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] transition-transform duration-300 sm:px-6 sm:pt-5 ${
        hidden ? "-translate-y-[120%]" : "translate-y-0"
      }`}
    >
      <div
        className={`mx-auto max-w-5xl rounded-2xl border transition-[background-color,border-color,backdrop-filter] duration-300 ${
          solid ? "border-gray-200/80 bg-white/75 backdrop-blur-xl backdrop-saturate-150" : "border-transparent"
        }`}
      >
        <div className="flex h-14 items-center justify-between gap-2 pr-2 pl-3 sm:h-16 sm:pr-3 sm:pl-5">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2.5 font-semibold tracking-tight"
            onClick={() => setOpen(false)}
          >
            <Logo />
            <span className="truncate">{appName}</span>
          </Link>

          <nav aria-label="Main" className="flex shrink-0 items-center gap-1.5 text-sm md:gap-1">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="hidden rounded-lg px-3 py-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-black md:block"
              >
                {label}
              </Link>
            ))}
            <a
              href={CHECKOUT_URL}
              className="ml-1 inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-lime-600 px-3.5 py-2 font-medium whitespace-nowrap text-white transition-colors hover:bg-lime-700 active:bg-lime-700 sm:px-4"
            >
              Buy
              <span className="max-[359px]:hidden">
                for <Price />
              </span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex size-10 items-center justify-center rounded-lg text-black transition-colors active:bg-gray-100 md:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </nav>
        </div>

        {/* Phones and small tablets: grid-rows animates the menu open without measuring its height. */}
        <div
          id="mobile-menu"
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out md:hidden ${
            open ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"
          }`}
          inert={!open}
        >
          <div className="overflow-hidden">
            <nav aria-label="Mobile" className="mx-3 border-t border-gray-100 pt-1">
              {links.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-gray-100 px-1 py-3.5 text-base font-medium last:border-0 active:text-lime-700"
                >
                  {label}
                  <ArrowRight className="size-4 text-gray-400" />
                </Link>
              ))}
            </nav>
            <div className="p-3 pt-2">
              <a
                href={CHECKOUT_URL}
                className="flex items-center justify-center gap-2.5 rounded-xl bg-lime-600 px-6 py-3.5 font-medium text-white active:bg-lime-700"
              >
                <AppleIcon className="size-4" />
                Download for Mac &middot; <Price />
              </a>
              <p className="mt-2 text-center text-xs text-gray-500">
                One-time payment &middot; {REFUND_DAYS}-day refund
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
