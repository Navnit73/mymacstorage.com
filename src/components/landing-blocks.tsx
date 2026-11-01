import type { ReactNode } from "react";
import Link from "next/link";
import { Check, Plus } from "lucide-react";
import { HeroSlider } from "@/components/hero-slider";
import { AppleIcon } from "@/components/icons";
import { Section } from "@/components/section";
import { CHECKOUT_URL, PRICE, REFUND_DAYS, UK_PRICE } from "@/lib/site";

/** Blocks shared by the landing-style pages in src/app/en-GB. They match the home page's design. */

/** The words and price that differ between the en-GB and en-US pages. */
export type Market = "uk" | "us";
const MARKETS = {
  uk: { price: UK_PRICE, bin: "Bin", licence: "licence" },
  us: { price: PRICE, bin: "Trash", licence: "license" },
};

export type Method = { title: string; body: ReactNode };
export type MethodGroup = { title: string; intro: string; methods: Method[] };

export function LandingHero({
  title,
  intro,
  secondaryHref,
  secondaryLabel,
  market,
}: {
  title: ReactNode;
  intro: ReactNode;
  secondaryHref: string;
  secondaryLabel: string;
  market: Market;
}) {
  const { price } = MARKETS[market];
  return (
    <section className="relative px-4 pt-24 sm:px-6 sm:pt-28">
      <div className="absolute inset-x-3 top-3 bottom-[18%] -z-10 mx-auto max-w-7xl rounded-3xl bg-gray-100 sm:inset-x-10 sm:top-4 sm:bottom-[28%] sm:rounded-[28px] lg:inset-x-16" />
      <div className="mx-auto max-w-3xl pt-6 text-center sm:pt-10">
        <h1 className="text-[2.4rem] leading-[1.05] font-bold tracking-tight text-black sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-pretty text-gray-500 sm:text-lg">{intro}</p>
        <div className="mx-auto mt-7 flex max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <a
            href={CHECKOUT_URL}
            className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-lime-600 px-6 py-3.5 font-medium text-white transition-colors hover:bg-lime-700 active:bg-lime-700 sm:py-3"
          >
            <AppleIcon className="size-4" />
            Download for Mac
          </a>
          <a
            href={secondaryHref}
            className="inline-flex items-center justify-center rounded-xl bg-gray-200 px-6 py-3.5 font-medium text-black transition-colors hover:bg-gray-300 active:bg-gray-300 sm:py-3"
          >
            {secondaryLabel}
          </a>
        </div>
        <p className="mt-4 flex flex-wrap justify-center gap-x-2 gap-y-1 text-sm text-gray-500">
          <span>{price} once</span>
          <span aria-hidden>&middot;</span>
          <span>{REFUND_DAYS}-day refund</span>
          <span aria-hidden className="hidden sm:inline">
            &middot;
          </span>
          <span className="w-full sm:w-auto">macOS 14 and later</span>
        </p>
      </div>
      <HeroSlider />
    </section>
  );
}

/** A numbered list of quick answers, one card per line. */
export function ShortAnswer({ title, subtitle, items }: { title: ReactNode; subtitle?: string; items: string[] }) {
  return (
    <Section title={title} subtitle={subtitle}>
      <ol className="mx-auto grid max-w-3xl gap-2">
        {items.map((item, i) => (
          <li key={item} className="flex items-center gap-4 rounded-2xl bg-gray-100 p-4 sm:p-5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-lime-600 font-semibold text-white">
              {i + 1}
            </span>
            <span className="font-medium sm:text-lg">{item}</span>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/** A table in a grey card. The first column is a row header. */
export function InfoTable({ title, head, rows }: { title: string; head: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-2xl bg-gray-100 p-3 sm:p-5">
      <h3 className="px-2 pt-1 pb-3 text-xl font-bold tracking-tight sm:text-2xl">{title}</h3>
      <table className="w-full overflow-hidden rounded-xl bg-white text-left text-sm sm:text-base">
        <thead className="text-gray-500">
          <tr>
            {head.map((h, i) => (
              <th key={h} scope="col" className={`py-3 font-medium ${i === 0 ? "px-4" : "px-3"}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map(([first, ...rest]) => (
            <tr key={first}>
              <th scope="row" className="px-4 py-3 align-top font-semibold">
                {first}
              </th>
              {rest.map((cell) => (
                <td key={cell} className="px-3 py-3 align-top text-gray-600">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Long-text styles for method bodies: links and code match the rest of the site.
const bodyText =
  "mt-1 text-sm leading-relaxed text-pretty text-gray-600 sm:text-base [&_a]:font-medium [&_a]:text-lime-700 [&_a]:underline-offset-4 hover:[&_a]:underline " +
  "[&_strong]:font-semibold [&_strong]:text-black [&_code]:rounded [&_code]:bg-gray-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:text-black";

/** Two cards of numbered methods. Numbers run across both groups, so "method 8" in the text matches the heading. */
export function MethodGroups({ groups }: { groups: MethodGroup[] }) {
  let number = 0;
  return (
    <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
      {groups.map(({ title, intro, methods }) => (
        <div key={title} className="rounded-2xl bg-gray-100 p-5 sm:p-8">
          <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{title}</h3>
          <p className="mt-2 leading-relaxed text-pretty text-gray-500">{intro}</p>
          <ul className="mt-5 flex flex-col gap-2">
            {methods.map((method) => (
              <li key={method.title} className="rounded-xl bg-white p-4 sm:p-5">
                <h4 className="font-semibold">
                  {++number}. {method.title}
                </h4>
                <p className={bodyText}>{method.body}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

const scanSteps = (bin: string) => [
  {
    title: "Scan your disk",
    body: "Open MyMacStorage and start one scan. It maps every folder on your Mac, hidden ones included, in a single pass.",
  },
  {
    title: "Review what it finds",
    body: "Browse the results tool by tool. Every item shows its size and location, so you decide what goes.",
  },
  {
    title: `Clear it to the ${bin}`,
    body: `Click Clear, and MyMacStorage moves the files to the ${bin}. Changed your mind? Undo puts the whole cleanup back.`,
  },
];

export function ScanSteps({
  title,
  subtitle,
  intro,
  market,
}: {
  title: ReactNode;
  subtitle: string;
  intro: ReactNode;
  market: Market;
}) {
  return (
    <Section title={title} subtitle={subtitle}>
      <p className="mx-auto -mt-2 mb-8 max-w-2xl text-center leading-relaxed text-pretty text-gray-600">{intro}</p>
      <ol className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
        {scanSteps(MARKETS[market].bin).map(({ title: stepTitle, body }, i) => (
          <li key={stepTitle} className="rounded-2xl bg-gray-100 p-5 sm:p-7">
            <span className="flex size-9 items-center justify-center rounded-full bg-lime-600 font-semibold text-white">
              {i + 1}
            </span>
            <h3 className="mt-4 text-lg font-bold tracking-tight sm:text-xl">{stepTitle}</h3>
            <p className="mt-2 leading-relaxed text-pretty text-gray-600">{body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

const perks = ["Every tool, no limits", "One key for Mac and Windows", "Every future update included", `${REFUND_DAYS}-day refund`];

export function PricingSection({ market }: { market: Market }) {
  const { price, licence } = MARKETS[market];
  return (
    <Section id="pricing" title="Pay once. Keep it." subtitle="No subscription. Every update is included.">
      <div className="mx-auto max-w-md rounded-3xl bg-gray-100 p-2">
        <div className="rounded-2xl bg-white px-6 pt-8 pb-7 text-center sm:px-9 sm:pt-10">
          <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold tracking-wide text-gray-600 uppercase">
            Lifetime {licence}
          </span>
          <p className="mt-4 text-7xl leading-none font-bold tracking-tight sm:text-[80px]">{price}</p>
          <p className="mt-2 text-gray-500">One-time payment</p>
        </div>
        <div className="px-6 pt-6 pb-6 sm:px-9 sm:pb-8">
          <ul className="flex flex-col gap-3">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-3">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-lime-600 text-white">
                  <Check className="size-3" strokeWidth={3} />
                </span>
                {perk}
              </li>
            ))}
          </ul>
          <a
            href={CHECKOUT_URL}
            className="mt-7 block rounded-xl bg-lime-600 px-6 py-3.5 text-center font-medium text-white transition-colors hover:bg-lime-700 active:bg-lime-700"
          >
            Buy for {price}
          </a>
        </div>
      </div>
    </Section>
  );
}

export function FaqSection({ title, faqs }: { title: ReactNode; faqs: { q: string; a: string }[] }) {
  return (
    <Section id="faq" title={title}>
      <div className="mx-auto flex max-w-2xl flex-col gap-2">
        {faqs.map(({ q, a }) => (
          <details key={q} className="group rounded-2xl bg-gray-100">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 font-semibold transition-colors hover:text-lime-700 sm:px-6 sm:text-lg [&::-webkit-details-marker]:hidden">
              {q}
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white">
                <Plus className="size-4 text-gray-600 transition-transform duration-200 group-open:rotate-45" />
              </span>
            </summary>
            <p className="px-5 pb-5 leading-relaxed text-pretty text-gray-600 sm:px-6">{a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

export function FinalCta({ children, backHref, backLabel }: { children: ReactNode; backHref: string; backLabel: string }) {
  return (
    <section className="px-4 pb-14 sm:px-6 sm:pb-20">
      <div className="mx-auto max-w-6xl rounded-3xl bg-black px-6 py-14 text-center sm:py-20">
        <h2 className="text-3xl font-bold tracking-tight text-balance text-white sm:text-5xl">
          Give your Mac room to breathe.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-pretty text-gray-400 sm:mt-4 sm:text-lg">{children}</p>
        <div className="mx-auto mt-8 flex max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <a
            href={CHECKOUT_URL}
            className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-lime-600 px-6 py-3.5 font-medium text-white transition-colors hover:bg-lime-700 sm:py-3"
          >
            <AppleIcon className="size-4" />
            Download for Mac
          </a>
          <a
            href={backHref}
            className="inline-flex items-center justify-center rounded-xl bg-gray-800 px-6 py-3.5 font-medium text-white transition-colors hover:bg-gray-700 sm:py-3"
          >
            {backLabel}
          </a>
        </div>
      </div>
    </section>
  );
}

/** "Keep reading" cards that link a page to its siblings, so no page is an orphan. */
export function RelatedLinks({ links }: { links: { href: string; label: string }[] }) {
  return (
    <section className="px-4 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-bold tracking-tight">Keep reading</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="block rounded-xl bg-gray-100 px-4 py-3 font-medium transition-colors hover:text-lime-700">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
