import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { APP_NAME, DUPLICATES_GUIDE_PATH, GUIDE_PATH, SYSTEM_DATA_GUIDE_PATH } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const links = [
  { href: GUIDE_PATH, label: "How to free up space on a Mac" },
  { href: SYSTEM_DATA_GUIDE_PATH, label: "How to reduce System Data on a Mac" },
  { href: DUPLICATES_GUIDE_PATH, label: "How to find duplicate files on a Mac" },
];

/** Shown for every URL that doesn't exist. Next.js sends it with a 404 status. */
export default function NotFound() {
  return (
    <>
      <SiteHeader appName={APP_NAME} />
      <main className="px-4 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-24">
        <div className="mx-auto max-w-3xl rounded-3xl bg-gray-100 px-6 py-14 text-center sm:py-20">
          <p className="text-sm font-semibold tracking-wide text-lime-700 uppercase">Error 404</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-balance text-black sm:text-6xl">
            This page has gone missing.
          </h1>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-pretty text-gray-500 sm:text-lg">
            The link may be broken, or the page may have moved. Head back home, or try one of our guides.
          </p>
          <Link
            href="/"
            className="mx-auto mt-7 inline-flex items-center justify-center rounded-xl bg-lime-600 px-6 py-3.5 font-medium text-white transition-colors hover:bg-lime-700 active:bg-lime-700 sm:py-3"
          >
            Back to home
          </Link>
          <ul className="mx-auto mt-10 flex max-w-md flex-col gap-2 text-left">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block rounded-xl bg-white px-4 py-3 font-medium transition-colors hover:text-lime-700"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
