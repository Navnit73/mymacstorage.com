import type { ReactNode } from "react";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { APP_NAME, PRICE } from "@/lib/site";

// Long-form text styles, so page bodies stay plain JSX headings, paragraphs and lists.
const prose =
  "text-gray-700 leading-relaxed [&_a]:font-medium [&_a]:text-lime-700 [&_a]:underline-offset-4 hover:[&_a]:underline " +
  "[&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-black sm:[&_h2]:text-3xl " +
  "[&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:tracking-tight [&_h3]:text-black " +
  "[&_h4]:mt-6 [&_h4]:font-semibold [&_h4]:text-black " +
  "[&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mt-2 " +
  "[&_strong]:font-semibold [&_strong]:text-black " +
  "[&_code]:rounded [&_code]:bg-gray-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:text-black";

export function ContentPage({
  title,
  intro,
  breadcrumb,
  updated,
  graph,
  children,
}: {
  title: string;
  intro: ReactNode;
  breadcrumb: string;
  /** ISO date shown as "Last updated". */
  updated?: string;
  graph: object[];
  children: ReactNode;
}) {
  return (
    <>
      <JsonLd graph={graph} />
      <SiteHeader appName={APP_NAME} price={PRICE} />
      <main className="px-4 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-24">
        <article className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-black">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-gray-700">
                {breadcrumb}
              </li>
            </ol>
          </nav>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance text-black sm:text-5xl">{title}</h1>
          <div className="mt-4 text-lg leading-relaxed text-pretty text-gray-500">{intro}</div>
          {updated && (
            <p className="mt-4 text-sm text-gray-500">
              Last updated{" "}
              <time dateTime={updated}>
                {new Date(updated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}
              </time>
            </p>
          )}
          <div className={`mt-8 border-t border-gray-200 pt-2 ${prose}`}>{children}</div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
