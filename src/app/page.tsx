import type { ReactNode } from "react";
import {
  Check,
  CircleCheck,
  CloudOff,
  KeyRound,
  Plus,
  RotateCcw,
  ShieldUser,
  Trash2,
  UserRoundX,
} from "lucide-react";
import { FeatureTour } from "@/components/feature-tour";
import { HeroSlider } from "@/components/hero-slider";
import { AppleIcon, WindowsIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StorageBar } from "@/components/storage-bar";
import { features } from "@/lib/features";
import Link from "next/link";
import { organizationNode, websiteNode } from "@/lib/seo";
import { APP_NAME, CHECKOUT_URL, GUIDE_PATH, OG_IMAGE, PRICE, PRICE_VALUE, SITE_DESCRIPTION, SITE_URL } from "@/lib/site";

const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
const toolCount = NUMBER_WORDS[features.length] ?? String(features.length);
const ToolCount = toolCount.charAt(0).toUpperCase() + toolCount.slice(1);

export default function Home() {
  return (
    <>
      <JsonLd graph={jsonLd} />
      <SiteHeader appName={APP_NAME} price={PRICE} />
      <main id="top" className="flex flex-col">
        <Hero />
        <Section
          id="inside"
          title={
            <>
              Your Mac storage bar,
              <br className="hidden sm:block" /> finally explained.
            </>
          }
          subtitle="MyMacStorage takes the storage bar from System Settings and names every coloured slice, so you know what to keep and what to clear."
        >
          <div className="mx-auto max-w-4xl">
            <StorageBar />
            <p className="mx-auto mt-6 max-w-2xl text-center leading-relaxed text-pretty text-gray-500">
              Most Mac disk space analyzers stop at a chart. {APP_NAME} ties every slice to the files behind it, so
              you go from &ldquo;what is this?&rdquo; to cleared in the same window.
            </p>
          </div>
        </Section>
        <Section
          title={`${ToolCount} Mac cleanup tools, one scan.`}
          subtitle="Analyze disk usage, find large files and clean up your Mac from one window. What you keep is grey. What you could clear is lime."
        >
          <FeatureTour />
        </Section>
        <WhatFillsYourMac />
        <Steps />
        <Comparison />
        <SafeByDesign />
        <EveryMac />
        {SHOW_TESTIMONIALS && <Testimonials />}
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id?: string;
  title: ReactNode;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-balance text-black sm:text-5xl">{title}</h2>
          {subtitle && (
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-pretty text-gray-500 sm:mt-4 sm:text-xl">
              {subtitle}
            </p>
          )}
        </div>
        <div className="mt-8 sm:mt-12">{children}</div>
      </div>
    </section>
  );
}

function DownloadButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`mx-auto flex max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center ${className}`}>
      <a
        href={CHECKOUT_URL}
        className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-lime-600 px-6 py-3.5 font-medium text-white transition-colors hover:bg-lime-700 active:bg-lime-700 sm:py-3"
      >
        <AppleIcon className="size-4" />
        Download for Mac
      </a>
      <a
        href={CHECKOUT_URL}
        className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-gray-200 px-6 py-3.5 font-medium text-black transition-colors hover:bg-gray-300 active:bg-gray-300 sm:py-3"
      >
        <WindowsIcon className="size-3.5" />
        Windows
      </a>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative px-4 pt-24 sm:px-6 sm:pt-28">
      <div className="absolute inset-x-3 top-3 bottom-[18%] -z-10 mx-auto max-w-7xl rounded-3xl bg-gray-100 sm:inset-x-10 sm:top-4 sm:bottom-[28%] sm:rounded-[28px] lg:inset-x-16" />

      <div className="mx-auto max-w-3xl pt-6 text-center sm:pt-10">
        <h1 className="text-[2.6rem] leading-[1.05] font-bold tracking-tight text-black sm:text-6xl lg:text-7xl">
          Disk cleanup for Mac,
          <br />
          <span className="bg-linear-to-r from-lime-600 to-lime-700 bg-clip-text text-transparent">done safely.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-pretty text-gray-500 sm:text-lg">
          {APP_NAME} is a <strong className="font-semibold text-black">native Mac storage cleaner</strong> and disk
          space analyzer. It maps your whole disk in <strong className="font-semibold text-black">one scan</strong>,
          shows exactly what fills it, then clears what you don&rsquo;t need,{" "}
          <strong className="font-semibold text-black">safely</strong>. Nothing is deleted. Everything goes to the
          Trash.
        </p>

        <DownloadButtons className="mt-7" />

        <p className="mt-4 flex flex-wrap justify-center gap-x-2 gap-y-1 text-sm text-gray-500">
          <span>{PRICE} once</span>
          <span aria-hidden>&middot;</span>
          <span>One key for Mac and Windows</span>
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

const spaceGroups = [
  {
    title: "Safe to clear",
    intro: "macOS and your apps rebuild these files whenever they need them.",
    items: [
      {
        title: "Caches and logs",
        body: "Browsers, apps and macOS write caches and logs all day. Over months, they quietly grow into gigabytes. Clearing them frees space without touching your documents.",
      },
      {
        title: "Developer files",
        body: "Xcode DerivedData, old simulators, node_modules folders and build output pile up fast. MyMacStorage groups them and adds them up, so you see what each cleanup frees.",
      },
      {
        title: "Old installers",
        body: "Downloaded .dmg and .pkg files stay on your disk long after you install the app. MyMacStorage finds every leftover installer, wherever it hides.",
      },
    ],
  },
  {
    title: "Worth a second look",
    intro: "These files may still matter to you, so MyMacStorage shows them clearly and lets you decide.",
    items: [
      {
        title: "System Data",
        body: "macOS lumps caches, logs and app support files into one grey slice. MyMacStorage breaks that slice open and names what sits inside.",
      },
      {
        title: "Large, forgotten files",
        body: "The Space tool lists your biggest files and folders first. Old video exports, virtual machines and backup archives rise straight to the top.",
      },
      {
        title: "Duplicate files",
        body: "MyMacStorage matches duplicates byte for byte, not just by name. You keep one copy and move the rest to the Trash.",
      },
      {
        title: "App leftovers",
        body: "Dragging an app to the Trash leaves its support files behind. The Applications tool shows each app’s full size, plus what removed apps left behind.",
      },
    ],
  },
];

function WhatFillsYourMac() {
  return (
    <Section
      title={"What’s taking up space on your Mac?"}
      subtitle="A full Mac often hides gigabytes in places Finder never shows. MyMacStorage finds them and sorts them by how safe they are to clear."
    >
      <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
        {spaceGroups.map(({ title, intro, items }) => (
          <div key={title} className="rounded-2xl bg-gray-100 p-5 sm:p-8">
            <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{title}</h3>
            <p className="mt-2 leading-relaxed text-pretty text-gray-500">{intro}</p>
            <ul className="mt-5 flex flex-col gap-2">
              {items.map((item) => (
                <li key={item.title} className="rounded-xl bg-white p-4 sm:p-5">
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-pretty text-gray-600 sm:text-base">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

const steps = [
  {
    title: "Scan your disk",
    body: "Open MyMacStorage and start one scan. It maps every folder on your Mac, hidden ones included, in a single pass.",
  },
  {
    title: "Review what it finds",
    body: "Browse the results tool by tool. Every item shows its size and location, so you decide what goes.",
  },
  {
    title: "Clear it to the Trash",
    body: "Click Clear, and MyMacStorage moves the files to the Trash. Changed your mind? Undo puts the whole cleanup back.",
  },
];

function Steps() {
  return (
    <Section title="Clean up your Mac in three steps." subtitle="No settings to learn. No Terminal commands. Just scan, review and clear.">
      <ol className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
        {steps.map(({ title, body }, i) => (
          <li key={title} className="rounded-2xl bg-gray-100 p-5 sm:p-7">
            <span className="flex size-9 items-center justify-center rounded-full bg-lime-600 font-semibold text-white">
              {i + 1}
            </span>
            <h3 className="mt-4 text-lg font-bold tracking-tight sm:text-xl">{title}</h3>
            <p className="mt-2 leading-relaxed text-pretty text-gray-600">{body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

const comparisonRows: { label: string; macos: string }[] = [
  { label: "Breaks down System Data", macos: "No" },
  { label: "Lists your biggest files and folders", macos: "Partly" },
  { label: "Finds duplicates byte for byte", macos: "No" },
  { label: "Finds leftovers from removed apps", macos: "No" },
  { label: "Undoes a whole cleanup", macos: "No" },
];

function Comparison() {
  return (
    <Section
      title="Better than the built-in storage tools."
      subtitle="macOS tells you your disk is full. MyMacStorage tells you why, then fixes it."
    >
      <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-[3fr_2fr]">
        <div className="rounded-2xl bg-gray-100 p-5 sm:p-8">
          <h3 className="text-xl font-bold tracking-tight sm:text-2xl">MyMacStorage vs macOS Storage settings</h3>
          <table className="mt-5 w-full overflow-hidden rounded-xl bg-white text-left text-sm sm:text-base">
            <thead className="text-gray-500">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">
                  Feature
                </th>
                <th scope="col" className="px-3 py-3 font-medium">
                  macOS
                </th>
                <th scope="col" className="px-3 py-3 font-medium text-lime-700">
                  {APP_NAME}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {comparisonRows.map(({ label, macos }) => (
                <tr key={label}>
                  <th scope="row" className="px-4 py-3 font-normal">
                    {label}
                  </th>
                  <td className="px-3 py-3 text-gray-500">{macos}</td>
                  <td className="px-3 py-3">
                    <Check className="size-4 text-lime-700" strokeWidth={3} aria-label="Yes" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col rounded-2xl bg-gray-100 p-5 sm:p-8">
          <h3 className="text-xl font-bold tracking-tight sm:text-2xl">MyMacStorage vs subscription cleaners</h3>
          <p className="mt-3 leading-relaxed text-pretty text-gray-600">
            Many Mac cleanup tools charge you every year and ask you to trust them with your files. {APP_NAME} costs{" "}
            {PRICE} once, runs entirely on your Mac and never uploads a filename.
          </p>
          <p className="mt-3 leading-relaxed text-pretty text-gray-600">
            You get every future update without a subscription, and one key covers the Windows version too.
          </p>
        </div>
      </div>
    </Section>
  );
}

const macs = [
  {
    title: "MacBook Air",
    body: "Small SSDs fill up fast. MyMacStorage frees space on your MacBook Air in minutes, so macOS updates install and your photos keep syncing.",
  },
  {
    title: "MacBook Pro",
    body: "Developers and creators lose gigabytes to build caches, simulators and render files. One scan finds them all, so you never hunt folder by folder.",
  },
  {
    title: "iMac, Mac mini and Mac Studio",
    body: "Desktop Macs collect years of downloads, duplicates and forgotten projects. MyMacStorage sorts them by size, so the biggest wins come first.",
  },
];

function EveryMac() {
  return (
    <Section title="Built for every Mac." subtitle="From a 256 GB MacBook Air to a packed Mac Studio.">
      <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
        {macs.map(({ title, body }) => (
          <div key={title} className="rounded-2xl bg-gray-100 p-5 sm:p-7">
            <h3 className="text-lg font-bold tracking-tight sm:text-xl">{title}</h3>
            <p className="mt-2 leading-relaxed text-pretty text-gray-600">{body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function SafeByDesign() {
  const cards = [
    {
      icon: Trash2,
      title: "Nothing is deleted.",
      body: "Every cleanup moves files to the Trash, never straight to oblivion. The worst case is dragging them back out.",
      items: [
        { icon: RotateCcw, text: "Undo puts a whole cleanup back" },
        { icon: CircleCheck, text: "You review every item first" },
      ],
    },
    {
      icon: ShieldUser,
      title: "Nothing leaves your Mac.",
      body: "Scanning, hashing and duplicate matching all happen on your Mac. Not a single filename is uploaded.",
      items: [
        { icon: UserRoundX, text: "No account to make" },
        { icon: CloudOff, text: "No sync, no analytics" },
        { icon: KeyRound, text: "Only your licence is checked" },
      ],
    },
  ];

  return (
    <Section title={"A Mac storage cleaner that’s safe by design."} subtitle="Two promises the app keeps, whatever you click.">
      <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
        {cards.map(({ icon: Icon, title, body, items }, i) => (
          <div key={title} className="flex flex-col rounded-2xl bg-gray-100 p-5 sm:p-8">
            <span className="flex size-12 items-center justify-center rounded-xl bg-white">
              <Icon className={`size-6 ${i === 0 ? "text-lime-600" : "text-lime-700"}`} strokeWidth={1.75} />
            </span>
            <h3 className="mt-5 text-xl font-bold tracking-tight sm:text-2xl">{title}</h3>
            <p className="mt-2 leading-relaxed text-pretty text-gray-500">{body}</p>
            <ul className="mt-5 divide-y divide-gray-100 rounded-xl bg-white md:mt-auto">
              {items.map(({ icon: ItemIcon, text }) => (
                <li key={text} className="flex items-center gap-3 px-4 py-3 text-sm sm:text-base">
                  <ItemIcon className="size-4 shrink-0 text-lime-700" strokeWidth={1.75} />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

// Placeholder testimonials: replace with real quotes, names, handles and avatars, then set this to true.
const SHOW_TESTIMONIALS = false;
const testimonials = [
  { quote: "Replace this with a real customer quote.", name: "Customer name", handle: "@handle" },
  { quote: "Replace this with a real customer quote.", name: "Customer name", handle: "@handle" },
  { quote: "Replace this with a real customer quote.", name: "Customer name", handle: "@handle" },
];

function Testimonials() {
  return (
    <Section title="Heard at launch.">
      {/* Swipeable row on phones, three columns from md up. */}
      <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0">
        {testimonials.map(({ quote, name, handle }, i) => (
          <figure
            key={i}
            className="flex w-[85%] shrink-0 snap-center flex-col justify-between gap-6 rounded-2xl bg-gray-100 p-6 sm:w-[60%] sm:p-7 md:w-auto"
          >
            <blockquote className="text-lg leading-snug font-medium text-pretty">&ldquo;{quote}&rdquo;</blockquote>
            <figcaption className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-gray-300 font-semibold text-gray-600">
                {name.charAt(0)}
              </span>
              <span className="flex flex-col text-sm">
                <span className="font-semibold">{name}</span>
                <span className="text-gray-500">{handle}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

function Pricing() {
  const perks = [
    `All ${toolCount} tools, no limits`,
    "One key for Mac and Windows",
    "Every future update included",
    "No account, no subscription",
  ];

  return (
    <Section id="pricing" title="Pay once. Keep it." subtitle="No subscription. Every update is included.">
      <div id="download" className="mx-auto max-w-md rounded-3xl bg-gray-100 p-2">
        <div className="rounded-2xl bg-white px-6 pt-8 pb-7 text-center sm:px-9 sm:pt-10">
          <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold tracking-wide text-gray-600 uppercase">
            Lifetime licence
          </span>
          <p className="mt-4 flex items-start justify-center font-bold tracking-tight">
            <span className="mt-2 text-3xl">$</span>
            <span className="text-7xl leading-none sm:text-[80px]">{PRICE.replace("$", "")}</span>
          </p>
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

          <div className="mt-7 flex flex-col gap-2.5">
            <a
              href={CHECKOUT_URL}
              className="rounded-xl bg-lime-600 px-6 py-3.5 text-center font-medium text-white transition-colors hover:bg-lime-700 active:bg-lime-700"
            >
              Buy for {PRICE}
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}

const faqs = [
  {
    q: "What is the best way to do a disk cleanup on a Mac?",
    a: `Find out what fills your disk first, then clear it in order of size. ${APP_NAME} does both: it scans your whole Mac, names every category and moves what you choose to the Trash.`,
  },
  {
    q: "How do I free up disk space on my Mac quickly?",
    a: "Clear caches, old installers and duplicate files first, because you rarely need them. Then review your largest files. One scan lists all of these, so a typical cleanup takes minutes.",
  },
  {
    q: "What is System Data on a Mac, and can I clear it?",
    a: `System Data is a catch-all for caches, logs, app support files and local snapshots. macOS manages part of it, but caches and logs often grow unchecked. ${APP_NAME} shows what sits inside and lets you clear the parts that are safe to remove.`,
  },
  {
    q: "How is it different from other Mac cleanup tools?",
    a: `${APP_NAME} shows before it clears. You see every file with its size and location, and nothing leaves your Mac. Each cleanup goes to the Trash with a one-click undo, and you pay once instead of every year.`,
  },
  {
    q: "Why is my Mac storage still full after I empty the Trash?",
    a: `Big files often sit outside the folders you check: caches, developer files, duplicates and app leftovers. Run one scan in ${APP_NAME} to see where the space really went.`,
  },
  {
    q: "Does cleaning up my Mac make it faster?",
    a: "It helps when your disk is nearly full, because macOS needs free space for swap files and updates. A cleanup won’t make a fast Mac faster, but it stops a full disk from slowing it down.",
  },
  {
    q: "How often should I clean up my Mac?",
    a: "A quick cleanup every month or two keeps most Macs healthy. Caches and downloads grow back, so run a scan after big projects or macOS updates.",
  },
  {
    q: "Can I undo a cleanup?",
    a: "Yes. Undo puts a whole cleanup back in one click. Your files also stay in the Trash until you empty it yourself.",
  },
  {
    q: "Is it safe to delete caches on a Mac?",
    a: `Yes, in most cases. Apps and macOS rebuild caches when they need them. ${APP_NAME} still moves them to the Trash first, so you can restore anything an app misses.`,
  },
  {
    q: "Will it delete anything without asking?",
    a: "No. You review every item first, and everything goes to the Trash, so you can always drag it back.",
  },
  {
    q: "Does it upload my files or filenames?",
    a: "No. Scanning, hashing and duplicate matching all run on your Mac. Only your licence key is checked online.",
  },
  {
    q: `What does the ${PRICE} licence include?`,
    a: `All ${toolCount} tools with no limits, the Mac and Windows versions, and every future update. You pay once, with no account and no subscription.`,
  },
  {
    q: "Is there a free trial?",
    a: `No. ${APP_NAME} costs ${PRICE} once, with no trial and no subscription. Every future update is included.`,
  },
  {
    q: "Which Macs and macOS versions are supported?",
    a: "Every Mac running macOS 14 Sonoma or later, including MacBook Air, MacBook Pro, iMac, Mac mini and Mac Studio, on both Apple silicon and Intel.",
  },
  {
    q: "Is it a WizTree alternative for Mac?",
    a: `Yes. WizTree runs only on Windows. ${APP_NAME} gives you a fast disk space analyzer on macOS, adds cleanup tools, and one licence covers both Mac and Windows.`,
  },
  {
    q: "Can I use one licence on Windows too?",
    a: "Yes. One key works with both the Mac and Windows versions.",
  },
  {
    q: "Is it a subscription?",
    a: `No. You pay ${PRICE} once and every future update is included.`,
  },
];

// One @graph so WebSite, Organization, WebPage, app and FAQ reference each other instead of repeating.
const jsonLd = [
  websiteNode,
  organizationNode,
  {
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: "Disk Cleanup for Mac",
    description: SITE_DESCRIPTION,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#software` },
    primaryImageOfPage: OG_IMAGE,
    inLanguage: "en",
  },
  {
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#software`,
    name: APP_NAME,
    url: SITE_URL,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "macOS 14 or later, Windows",
    description:
      "Disk cleanup for Mac. A native storage cleaner and disk space analyzer that clears caches, duplicates and app leftovers to the Trash.",
    image: OG_IMAGE,
    publisher: { "@id": `${SITE_URL}/#organization` },
    offers: { "@type": "Offer", price: PRICE_VALUE, priceCurrency: "USD", url: `${SITE_URL}/#pricing` },
  },
  {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    isPartOf: { "@id": `${SITE_URL}/#webpage` },
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  },
];

function Faq() {
  return (
    <Section id="faq" title="Mac disk cleanup questions, answered.">
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
        <p className="mt-4 text-center text-gray-600">
          Prefer to do it by hand? Read our guide on{" "}
          <Link href={GUIDE_PATH} className="font-medium text-lime-700 underline-offset-4 hover:underline">
            how to free up disk space on a Mac
          </Link>
          .
        </p>
      </div>
    </Section>
  );
}

function FinalCta() {
  return (
    <section className="px-4 pb-14 sm:px-6 sm:pb-20">
      <div className="mx-auto max-w-6xl rounded-3xl bg-black px-6 py-14 text-center sm:py-20">
        <h2 className="text-3xl font-bold tracking-tight text-balance text-white sm:text-5xl">
          Give your Mac room to breathe.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-pretty text-gray-400 sm:mt-4 sm:text-lg">
          One scan shows you everything filling your Mac. {PRICE} once, and it&rsquo;s yours.
        </p>
        <div className="mx-auto mt-8 flex max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <a
            href={CHECKOUT_URL}
            className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-lime-600 px-6 py-3.5 font-medium text-white transition-colors hover:bg-lime-700 sm:py-3"
          >
            <AppleIcon className="size-4" />
            Download for Mac
          </a>
          <a
            href="#pricing"
            className="inline-flex items-center justify-center rounded-xl bg-gray-800 px-6 py-3.5 font-medium text-white transition-colors hover:bg-gray-700 sm:py-3"
          >
            See pricing
          </a>
        </div>
      </div>
    </section>
  );
}
