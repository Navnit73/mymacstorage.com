import type { ReactNode } from "react";
import Link from "next/link";
import { Check, Copy, Eye, Layers, RotateCcw, Tag, TriangleAlert, UserRoundX } from "lucide-react";
import { FaqSection, FinalCta, InfoTable, PricingSection, RelatedLinks, ScanSteps } from "@/components/landing-blocks";
import { AppleIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { Section } from "@/components/section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { innerPageGraph, isoDateTime, pageMetadata } from "@/lib/seo";
import {
  APP_NAME,
  GUIDES,
  CHECKOUT_URL,
  GUIDE_PATH,
  OG_IMAGE,
  PRICE,
  REFUND_DAYS,
  SITE_URL,
  guidePath,
  SYSTEM_DATA_GUIDE_PATH,
  US_CLEANER_APP_PATH as path,
  pages,
} from "@/lib/site";

// US page: American spelling and the $ price as plain text. Competitor facts below were checked in November 2026.
const title = "Best Mac cleaner app: how to choose one you can trust";
const description = `How to pick the best Mac cleaner app. Compare free and paid Mac cleaning software, spot the red flags, and see what ${APP_NAME} does for ${PRICE} once.`;
const updated = pages.find((p) => p.path === path)?.updated ?? "2026-11-01";

export const metadata = pageMetadata({
  title: "Best Mac Cleaner App: How to Choose One",
  description,
  path,
  hreflang: "en-US",
});

const nav = [
  { href: "#need", label: "Do you need one?" },
  { href: "#criteria", label: "What to look for" },
  { href: "#types", label: "Compared" },
  { href: "#free", label: "Free options" },
  { href: "#red-flags", label: "Red flags" },
  { href: "#faq", label: "FAQ" },
];

const verdict = [
  "Pick a cleaner that shows every file before it clears anything.",
  "Make sure it moves files to the Trash, with an undo.",
  "Check that scanning stays on your Mac.",
  "Use free tools first if all you need is the basics.",
];

const needNot = [
  "Your disk is less than about 80 percent full.",
  "You only want to empty caches or uninstall an app now and then.",
  "You’re happy to dig through folders by hand.",
];

const needYes = [
  "System Data is huge and Storage settings won’t say why.",
  "You want duplicates, leftovers and large files in one scan.",
  "You want every cleanup undoable in one click.",
];

const criteria: { icon: typeof Eye; title: string; body: string }[] = [
  {
    icon: Eye,
    title: "It shows before it clears",
    body: "Good Mac cleaning software lists every file with its size and location, so you decide what goes. Avoid anything that deletes after a single click on “Clean”.",
  },
  {
    icon: RotateCcw,
    title: "It moves files to the Trash",
    body: "The Trash is your safety net. A cleaner that uses it, and adds an undo, turns a mistake into a ten-second fix.",
  },
  {
    icon: UserRoundX,
    title: "It keeps your files private",
    body: "Scanning, hashing and duplicate matching should run on your Mac. A Mac cleanup application has no reason to upload your filenames.",
  },
  {
    icon: Layers,
    title: "It explains System Data",
    body: "The grey System Data block is where most of the space hides. A good cleaner names what sits inside it instead of calling it “junk”.",
  },
  {
    icon: Copy,
    title: "It finds the real space hogs",
    body: "Large old files, byte-for-byte duplicates and leftovers from removed apps free far more than small caches do.",
  },
  {
    icon: Tag,
    title: "It prices honestly",
    body: "Check whether you pay once or every year, and what a renewal costs. Skip any app that hides the price until after the scan.",
  },
];

const types = [
  [
    "macOS Storage settings",
    "Free, built in",
    "Seeing categories, emptying the Trash, Optimize Storage",
    "Shows System Data as one block and can’t find duplicates",
  ],
  [
    "Free utilities",
    "OnyX, AppCleaner",
    "Maintenance tasks and uninstalling apps with their leftovers",
    "Narrow in scope, and OnyX needs the version for your macOS",
  ],
  [
    "Disk analyzers",
    "DaisyDisk",
    "Seeing your biggest folders as a map",
    "They show space but leave the cleanup to you",
  ],
  [
    "All-in-one cleaners",
    "CleanMyMac",
    "A guided scan with many extra tools",
    "Plans and one-time options differ, so check the current price",
  ],
  [
    APP_NAME,
    `${PRICE} once`,
    "One scan, a review, then a clear that you can undo",
    "No free trial, but a 7-day refund",
  ],
];

const freeOptions = [
  {
    title: "Storage settings",
    body: "Open System Settings, then General, then Storage. You get a category breakdown and recommendations such as Optimize Storage and emptying the Trash automatically. It costs nothing and is safe.",
  },
  {
    title: "OnyX",
    body: "A free maintenance utility that clears caches and runs routine tasks. Download the version made for your macOS release, and read each option before you run it.",
  },
  {
    title: "AppCleaner",
    body: "A free drag-and-drop uninstaller. It removes an app along with the support files it left behind, which Finder alone won’t do.",
  },
];

const redFlags = [
  { title: "Scare scans", body: "“12,847 issues found!” is a sales tactic. Caches rebuild themselves and aren’t a threat." },
  { title: "Speed promises", body: "A cleaner can’t make old hardware faster. It only helps when a full disk is slowing macOS down." },
  { title: "Deletes without review", body: "If you can’t see the file list first, you can’t judge what’s safe." },
  { title: "No clear developer", body: "Download only notarized apps from developers with a real website and a support address." },
  { title: "Unexplained access", body: "Full Disk Access lets an app read other apps’ data. Grant it only to software you trust, and revoke it when you stop using it." },
];

const faqs = [
  {
    q: "What is the best Mac cleaner app?",
    a: `There’s no single best. Pick one that shows every file first, moves files to the Trash and scans on your Mac. Free tools cover the basics. If you want one scan with an undo and no subscription, ${APP_NAME} costs ${PRICE} once.`,
  },
  {
    q: "Is there a free Mac cleaner that works?",
    a: `Yes. macOS Storage settings, OnyX and AppCleaner are all free and cover caches, categories and uninstalling apps. They won’t break open System Data or find duplicates. ${APP_NAME} has no free trial, but you can ask for a refund within ${REFUND_DAYS} days.`,
  },
  {
    q: "Are Mac cleaner apps safe?",
    a: "They can be. Choose a notarized app from a known developer that lists every file before it clears anything and uses the Trash. Be careful with Full Disk Access, because it lets an app read other apps’ data.",
  },
  {
    q: "Do Mac cleaners make your Mac faster?",
    a: "Only when your disk is nearly full. macOS needs free space for swap files and updates, so freeing room removes a slowdown. A cleaner can’t speed up a Mac that already has plenty of space.",
  },
  {
    q: "Is there a free alternative to CleanMyMac?",
    a: `Storage settings, OnyX and AppCleaner together cover basic maintenance and uninstalling, but they offer no guided scan. ${APP_NAME} is a paid, one-time alternative with a review step and undo.`,
  },
  {
    q: "Is a Mac disk space cleaner the same as antivirus?",
    a: "No. A cleaner frees storage, and an antivirus app looks for malware. Don’t expect one to do the other’s job.",
  },
  {
    q: "Do I need to give a Mac cleaner Full Disk Access?",
    a: "Any cleaner needs it to scan protected folders. Grant it only to apps you trust. You can turn it off any time in System Settings, under Privacy & Security, then Full Disk Access.",
  },
  {
    q: "Which Macs does MyMacStorage support?",
    a: "Every Mac running macOS 14 Sonoma or later, including MacBook Air, MacBook Pro, iMac, Mac mini and Mac Studio, on Apple silicon and Intel. One license also covers the Windows version.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "Best Mac cleaner app", description, language: "en-US" }),
  {
    "@type": "Article",
    "@id": `${SITE_URL}${path}#article`,
    headline: title,
    description,
    image: OG_IMAGE,
    datePublished: isoDateTime("2026-11-01"),
    dateModified: isoDateTime(updated),
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: { "@id": `${SITE_URL}${path}#webpage` },
    inLanguage: "en-US",
  },
  {
    "@type": "FAQPage",
    "@id": `${SITE_URL}${path}#faq`,
    isPartOf: { "@id": `${SITE_URL}${path}#webpage` },
    mainEntity: faqs.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  },
];

function List({ items, icon }: { items: string[]; icon: ReactNode }) {
  return (
    <ul className="mt-5 flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-0.5 shrink-0">{icon}</span>
          <span className="leading-relaxed text-pretty">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function UsCleanerAppPage() {
  return (
    <>
      <JsonLd graph={graph} />
      <SiteHeader appName={APP_NAME} />
      <main className="flex flex-col">
        {/* Hero: copy on the left, a short verdict card on the right. */}
        <section className="px-3 pt-3 sm:px-10 sm:pt-4 lg:px-16">
          <div className="mx-auto grid max-w-7xl items-center gap-8 rounded-3xl bg-gray-100 px-5 pt-24 pb-10 sm:rounded-[28px] sm:px-10 sm:pt-32 sm:pb-16 lg:grid-cols-[1.2fr_1fr] lg:gap-14 lg:px-16">
            <div>
              <p className="inline-block rounded-full bg-white px-3 py-1 text-xs font-semibold tracking-wide text-gray-600 uppercase">
                Buyer’s guide &middot; Updated{" "}
                {new Date(updated).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </p>
              <h1 className="mt-4 text-[2.4rem] leading-[1.05] font-bold tracking-tight text-balance text-black sm:text-6xl">
                Best Mac cleaner app: how to choose one{" "}
                <span className="bg-linear-to-r from-lime-600 to-lime-700 bg-clip-text text-transparent">
                  you can trust.
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-gray-600 sm:text-lg">
                Some Mac cleaning software frees gigabytes. Some only scares you into paying. This guide shows what the
                best Mac cleaner does, which free options are worth using and how to spot the rest.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={CHECKOUT_URL}
                  className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-lime-600 px-6 py-3.5 font-medium text-white transition-colors hover:bg-lime-700 active:bg-lime-700 sm:py-3"
                >
                  <AppleIcon className="size-4" />
                  Download for Mac
                </a>
                <a
                  href="#criteria"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 font-medium text-black transition-colors hover:bg-gray-200 sm:py-3"
                >
                  What to look for
                </a>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                {PRICE} once &middot; {REFUND_DAYS}-day refund &middot; macOS 14 and later
              </p>
            </div>

            <aside className="rounded-2xl bg-white p-6 sm:p-8">
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">The quick verdict</h2>
              <List items={verdict} icon={<Check className="size-5 text-lime-700" strokeWidth={3} />} />
            </aside>
          </div>

          <nav aria-label="On this page" className="mx-auto mt-4 max-w-6xl">
            <ul className="flex flex-wrap justify-center gap-2">
              {nav.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="block rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-lime-600 hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </section>

        <Section
          id="need"
          title="Do you need a Mac cleaner app at all?"
          subtitle="Honestly, not always. macOS already clears some caches itself and rebuilds them when needed."
        >
          <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-gray-100 p-5 sm:p-8">
              <h3 className="text-xl font-bold tracking-tight sm:text-2xl">You can probably skip one if</h3>
              <List items={needNot} icon={<span className="block size-2 rounded-full bg-gray-400" />} />
            </div>
            <div className="rounded-2xl bg-lime-50 p-5 ring-1 ring-lime-600/20 sm:p-8">
              <h3 className="text-xl font-bold tracking-tight sm:text-2xl">A cleaner earns its place if</h3>
              <List items={needYes} icon={<Check className="size-5 text-lime-700" strokeWidth={3} />} />
            </div>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center leading-relaxed text-pretty text-gray-600">
            Prefer to start by hand? Our guide on{" "}
            <Link href={GUIDE_PATH} className="font-medium text-lime-700 underline-offset-4 hover:underline">
              how to free up space on a Mac
            </Link>{" "}
            walks through every built-in tool.
          </p>
        </Section>

        <Section
          id="criteria"
          title="What the best Mac cleaning software does"
          subtitle="Judge any Mac cleaner tool by these six points. If it fails two, move on."
        >
          <ul className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {criteria.map(({ icon: Icon, title: itemTitle, body }) => (
              <li key={itemTitle} className="rounded-2xl bg-gray-100 p-5 sm:p-7">
                <span className="flex size-12 items-center justify-center rounded-xl bg-white">
                  <Icon className="size-6 text-lime-700" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-tight sm:text-xl">{itemTitle}</h3>
                <p className="mt-2 leading-relaxed text-pretty text-gray-600">{body}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section
          id="types"
          title="Mac cleaning programs compared by type"
          subtitle="Each kind of tool suits a different job. Check each vendor’s current price and macOS support before you buy."
        >
          <div className="mx-auto max-w-5xl">
            <InfoTable
              title="Which type fits you?"
              head={["Type", "Examples", "Best for", "Watch out for"]}
              rows={types}
            />
          </div>
        </Section>

        <Section
          id="free"
          title="Free Mac cleaner options, and their limits"
          subtitle="If you only need the basics, start here before you pay for anything."
        >
          <ul className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
            {freeOptions.map(({ title: itemTitle, body }) => (
              <li key={itemTitle} className="rounded-2xl bg-gray-100 p-5 sm:p-7">
                <h3 className="text-lg font-bold tracking-tight sm:text-xl">{itemTitle}</h3>
                <p className="mt-2 leading-relaxed text-pretty text-gray-600">{body}</p>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-6 max-w-2xl text-center leading-relaxed text-pretty text-gray-600">
            None of these breaks open the grey System Data block. If that’s your problem, read{" "}
            <Link href={SYSTEM_DATA_GUIDE_PATH} className="font-medium text-lime-700 underline-offset-4 hover:underline">
              what System Data holds and how to shrink it
            </Link>
            .
          </p>
        </Section>

        <section id="red-flags" className="px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl rounded-3xl bg-black px-5 py-12 sm:px-10 sm:py-16">
            <div className="mx-auto max-w-3xl text-center">
              <TriangleAlert className="mx-auto size-9 text-lime-500" strokeWidth={1.75} />
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance text-white sm:text-5xl">
                Five red flags in a Mac cleaner
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-pretty text-gray-400 sm:text-lg">
                Spot any of these and close the download page.
              </p>
            </div>
            <ol className="mx-auto mt-10 grid max-w-5xl gap-3 md:grid-cols-2">
              {redFlags.map(({ title: itemTitle, body }, i) => (
                <li key={itemTitle} className="flex gap-4 rounded-2xl bg-gray-900 p-5 sm:p-6">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-lime-600 text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-white sm:text-lg">{itemTitle}</h3>
                    <p className="mt-1 leading-relaxed text-pretty text-gray-400">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <ScanSteps
          market="us"
          title={`How ${APP_NAME} measures up`}
          subtitle="It was built around the six points above."
          intro={`${APP_NAME} is a native Mac disk space cleaner. One scan maps your whole disk, names what’s inside System Data, and finds large files, byte-for-byte duplicates and app leftovers. You review everything first, and Undo puts a whole cleanup back. Nothing leaves your Mac.`}
        />

        <PricingSection market="us" />
        <RelatedLinks
          links={[
            { href: guidePath("us", "appCleaner"), label: GUIDES.appCleaner.label },
            { href: guidePath("us", "cleanMyMacAlternative"), label: GUIDES.cleanMyMacAlternative.label },
            { href: guidePath("us", "clearRam"), label: GUIDES.clearRam.label },
            { href: guidePath("us", "diskAnalyzer"), label: GUIDES.diskAnalyzer.label },
          ]}
        />

        <FaqSection title="Mac cleaner questions, answered." faqs={faqs} />
        <FinalCta backHref="#criteria" backLabel="Back to the checklist">
          The best Mac cleaner app is the one you can check before it clears. {PRICE} once, with a {REFUND_DAYS}-day
          refund.
        </FinalCta>
      </main>
      <SiteFooter />
    </>
  );
}
