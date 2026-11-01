import type { ReactNode } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { AppleIcon } from "@/components/icons";
import { prose } from "@/components/content-page";
import { FaqSection, FinalCta, RelatedLinks } from "@/components/landing-blocks";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { APP_NAME, CHECKOUT_URL, MARKETS, REFUND_DAYS, type MarketKey } from "@/lib/site";

/** Long-form guide page for one market. Same look as the landing pages: grey hero card, lime accents, black closing card. */
export function GuideLayout({
  market,
  title,
  intro,
  breadcrumb,
  updated,
  readMinutes,
  takeaways,
  toc,
  related,
  graph,
  faqs,
  closing,
  children,
}: {
  market: MarketKey;
  title: ReactNode;
  intro: ReactNode;
  breadcrumb: string;
  /** ISO date. */
  updated: string;
  readMinutes: number;
  takeaways: string[];
  toc: { id: string; label: string }[];
  related: { href: string; label: string }[];
  graph: object[];
  faqs: { q: string; a: string }[];
  closing: ReactNode;
  children: ReactNode;
}) {
  const { hreflang } = MARKETS[market];
  const date = new Date(updated).toLocaleDateString(hreflang, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  return (
    <>
      <JsonLd graph={graph} />
      <SiteHeader appName={APP_NAME} />
      <main id="top" className="flex flex-col">
        <section className="px-3 pt-3 sm:px-10 sm:pt-4 lg:px-16">
          <div className="mx-auto grid max-w-7xl items-center gap-8 rounded-3xl bg-gray-100 px-5 pt-24 pb-10 sm:rounded-[28px] sm:px-10 sm:pt-32 sm:pb-16 lg:grid-cols-[1.35fr_1fr] lg:gap-14 lg:px-16">
            <div>
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
              <h1 className="mt-4 text-[2.2rem] leading-[1.08] font-bold tracking-tight text-balance text-black sm:text-5xl">
                {title}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-gray-600 sm:text-lg">{intro}</p>
              <p className="mt-4 text-sm text-gray-500">
                Updated <time dateTime={updated}>{date}</time> &middot; {readMinutes} min read
              </p>
            </div>
            <aside className="rounded-2xl bg-white p-6 sm:p-8">
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">Key takeaways</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {takeaways.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 size-5 shrink-0 text-lime-700" strokeWidth={3} />
                    <span className="leading-relaxed text-pretty">{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
          <nav aria-label="In this guide" className="mx-auto mt-4 max-w-6xl">
            <ul className="flex flex-wrap justify-center gap-2">
              {toc.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="block rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-lime-600 hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </section>

        <article className="px-4 pt-10 pb-4 sm:px-6 sm:pt-14">
          <div className={`mx-auto max-w-3xl [&_h2]:scroll-mt-28 [&_h2:first-child]:mt-0 ${prose}`}>{children}</div>
        </article>

        <RelatedLinks links={related} />

        <FaqSection title="Your questions, answered." faqs={faqs} />
        <FinalCta backHref="#top" backLabel="Back to the top">
          {closing}
        </FinalCta>
      </main>
      <SiteFooter />
    </>
  );
}

/** A lime call-out for the middle of an article. One short pitch and a download button. */
export function AppCallout({ market, title, children }: { market: MarketKey; title: string; children: ReactNode }) {
  const { price } = MARKETS[market];
  return (
    <aside className="my-10 rounded-2xl bg-lime-50 p-5 ring-1 ring-lime-600/20 sm:p-8">
      <div className="text-xl font-bold tracking-tight text-black sm:text-2xl">{title}</div>
      <div className="mt-2 leading-relaxed text-pretty text-gray-700">{children}</div>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href={CHECKOUT_URL}
          className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-lime-600 px-6 py-3 font-medium text-white! no-underline! transition-colors hover:bg-lime-700"
        >
          <AppleIcon className="size-4" />
          Download for Mac
        </a>
        <span className="text-sm font-normal text-gray-600">
          {price} once &middot; {REFUND_DAYS}-day refund
        </span>
      </div>
    </aside>
  );
}

/** A table for article bodies. The first column is the row header. */
export function GuideTable({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="mt-6 overflow-x-auto">
      <table>
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([first, ...rest]) => (
            <tr key={first}>
              <th scope="row">{first}</th>
              {rest.map((cell) => (
                <td key={cell}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
