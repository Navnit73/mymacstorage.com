import {
  ArrowRight,
  Check,
  CircleCheck,
  CloudOff,
  CodeXml,
  Copy,
  Database,
  FileStack,
  HardDrive,
  KeyRound,
  Laptop,
  LaptopMinimal,
  LockKeyhole,
  Mail,
  Monitor,
  PackageOpen,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShieldUser,
  Trash2,
  Undo2,
  UserRoundX,
  type LucideIcon,
} from "lucide-react";
import { FeatureTour } from "@/components/feature-tour";
import { HeroSlider } from "@/components/hero-slider";
import { AppleIcon, WindowsIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Price } from "@/components/price";
import { Section } from "@/components/section";
import { StorageBar } from "@/components/storage-bar";
import { features } from "@/lib/features";
import Link from "next/link";
import { organizationNode, websiteNode } from "@/lib/seo";
import {
  APP_NAME,
  CHECKOUT_URL,
  GUIDE_PATH,
  OG_IMAGE,
  PRICE,
  PRICE_VALUE,
  REFUND_DAYS,
  SITE_DESCRIPTION,
  SITE_URL,
  SUPPORT_EMAIL,
} from "@/lib/site";

const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
const toolCount = NUMBER_WORDS[features.length] ?? String(features.length);
const ToolCount = toolCount.charAt(0).toUpperCase() + toolCount.slice(1);

export default function Home() {
  return (
    <>
      <JsonLd graph={jsonLd} />
      <SiteHeader appName={APP_NAME} />
      <main id="top" className="flex flex-col">
        <Hero />
        <Proof />
        <Section
          id="inside"
          eyebrow="Inside the app"
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
          eyebrow="The tools"
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

function DownloadButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`mx-auto flex w-full max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center ${className}`}>
      <a
        href={CHECKOUT_URL}
        className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-lime-600 px-6 py-3.5 font-medium text-white ring-1 ring-lime-700/30 transition-colors ring-inset hover:bg-lime-700 active:bg-lime-700 sm:py-3"
      >
        <AppleIcon className="size-4" />
        Download for Mac
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </a>
      <a
        href={CHECKOUT_URL}
        className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-white px-6 py-3.5 font-medium text-black ring-1 ring-gray-200 transition-colors ring-inset hover:bg-gray-50 active:bg-gray-50 sm:py-3"
      >
        <WindowsIcon className="size-3.5" />
        Windows
      </a>
    </div>
  );
}

function Hero() {
  const trust = [
    { icon: Undo2, text: "Everything goes to the Trash" },
    { icon: LockKeyhole, text: "Scans stay on your Mac" },
    { icon: KeyRound, text: "One key for Mac and Windows" },
  ];

  return (
    <section className="relative px-4 pt-24 sm:px-6 sm:pt-28">
      {/* Backdrop card: grey base, fine dots and a lime glow at the top. */}
      <div className="absolute inset-x-2 top-2 bottom-[16%] -z-10 mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gray-100 sm:inset-x-6 sm:top-4 sm:bottom-[26%] sm:rounded-[32px] lg:inset-x-12">
        <div className="bg-dots absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div className="bg-glow absolute inset-0" />
      </div>

      <div className="mx-auto max-w-3xl pt-4 text-center sm:pt-10">
        <p className="inline-flex max-w-full items-center gap-2 rounded-full bg-white/80 py-1 pr-3.5 pl-1 text-xs font-medium text-gray-700 ring-1 ring-gray-200 backdrop-blur sm:text-sm">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-black text-white">
            <AppleIcon className="size-3" />
          </span>
          <span className="truncate">
            <span className="max-[389px]:hidden">Native for </span>Apple silicon and Intel &middot; macOS 14+
          </span>
        </p>

        <h1 className="mt-5 text-[clamp(2.3rem,10.5vw,3.4rem)] sm:text-6xl lg:text-[4.6rem] leading-[1.02] font-bold tracking-[-0.035em] text-balance text-black sm:mt-6">
          Disk cleanup for Mac,
          <br />
          <span className="bg-linear-to-r from-lime-600 to-lime-700 bg-clip-text text-transparent">done safely.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-pretty text-gray-600 sm:text-lg">
          {APP_NAME} is a <strong className="font-semibold text-black">native Mac storage cleaner</strong> and disk
          space analyzer. It maps your whole disk in <strong className="font-semibold text-black">one scan</strong>,
          shows exactly what fills it, then clears what you don&rsquo;t need,{" "}
          <strong className="font-semibold text-black">safely</strong>. Nothing is deleted. Everything goes to the
          Trash.
        </p>

        <DownloadButtons className="mt-7 sm:mt-8" />

        <p className="mt-4 text-sm text-gray-500">
          <span className="font-semibold text-black">
            <Price />
          </span>{" "}
          once &middot; no subscription &middot; {REFUND_DAYS}-day refund
        </p>

        <ul className="mx-auto mt-6 grid max-w-xs gap-2 text-left text-sm text-gray-600 sm:max-w-none sm:grid-cols-3 sm:gap-3 sm:text-center">
          {trust.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-2 sm:justify-center">
              <Icon className="size-4 shrink-0 text-lime-700" strokeWidth={2} />
              {text}
            </li>
          ))}
        </ul>
      </div>

      <HeroSlider />
    </section>
  );
}

/** A row of plain facts under the hero. Every number here is true of the product, not a marketing estimate. */
function Proof() {
  const stats = [
    { value: "1", label: "scan maps your whole disk" },
    { value: String(features.length), label: "cleanup tools in one app" },
    { value: "0", label: "filenames uploaded, ever" },
    { value: `${REFUND_DAYS} days`, label: "to ask for a refund" },
  ];
  return (
    <section aria-label="At a glance" className="px-4 pt-12 sm:px-6 sm:pt-16">
      <dl className="reveal mx-auto grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-2xl bg-gray-200 ring-1 ring-gray-200 md:grid-cols-4">
        {stats.map(({ value, label }) => (
          <div key={label} className="flex flex-col gap-1 bg-white px-4 py-5 text-center sm:px-6 sm:py-7">
            <dt className="order-2 text-xs leading-snug text-pretty text-gray-500 sm:text-sm">{label}</dt>
            <dd className="order-1 text-3xl font-bold tracking-tight tabular-nums sm:text-4xl">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

const spaceGroups: {
  title: string;
  tag: string;
  intro: string;
  tone: "lime" | "gray";
  items: { icon: LucideIcon; title: string; body: string }[];
}[] = [
  {
    title: "Safe to clear",
    tag: "Rebuilds itself",
    tone: "lime",
    intro: "macOS and your apps rebuild these files whenever they need them.",
    items: [
      {
        icon: FileStack,
        title: "Caches and logs",
        body: "Browsers, apps and macOS write caches and logs all day. Over months, they quietly grow into gigabytes. Clearing them frees space without touching your documents.",
      },
      {
        icon: CodeXml,
        title: "Developer files",
        body: "Xcode DerivedData, old simulators, node_modules folders and build output pile up fast. MyMacStorage groups them and adds them up, so you see what each cleanup frees.",
      },
      {
        icon: PackageOpen,
        title: "Old installers",
        body: "Downloaded .dmg and .pkg files stay on your disk long after you install the app. MyMacStorage finds every leftover installer, wherever it hides.",
      },
    ],
  },
  {
    title: "Worth a second look",
    tag: "You decide",
    tone: "gray",
    intro: "These files may still matter to you, so MyMacStorage shows them clearly and lets you decide.",
    items: [
      {
        icon: Database,
        title: "System Data",
        body: "macOS lumps caches, logs and app support files into one grey slice. MyMacStorage breaks that slice open and names what sits inside.",
      },
      {
        icon: HardDrive,
        title: "Large, forgotten files",
        body: "The Space tool lists your biggest files and folders first. Old video exports, virtual machines and backup archives rise straight to the top.",
      },
      {
        icon: Copy,
        title: "Duplicate files",
        body: "MyMacStorage matches duplicates byte for byte, not just by name. You keep one copy and move the rest to the Trash.",
      },
      {
        icon: Trash2,
        title: "App leftovers",
        body: "Dragging an app to the Trash leaves its support files behind. The Applications tool shows each app’s full size, plus what removed apps left behind.",
      },
    ],
  },
];

function WhatFillsYourMac() {
  return (
    <Section
      eyebrow="Where the space goes"
      title={"What’s taking up space on your Mac?"}
      subtitle="A full Mac often hides gigabytes in places Finder never shows. MyMacStorage finds them and sorts them by how safe they are to clear."
    >
      <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
        {spaceGroups.map(({ title, tag, tone, intro, items }) => (
          <div key={title} className="rounded-3xl bg-gray-100 p-2 sm:p-3">
            <div className="px-3 pt-3 pb-4 sm:px-5 sm:pt-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{title}</h3>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    tone === "lime" ? "bg-lime-600 text-white" : "bg-white text-gray-700 ring-1 ring-gray-200"
                  }`}
                >
                  {tag}
                </span>
              </div>
              <p className="mt-2 leading-relaxed text-pretty text-gray-500">{intro}</p>
            </div>
            <ul className="flex flex-col gap-1.5">
              {items.map(({ icon: Icon, title: itemTitle, body }) => (
                <li
                  key={itemTitle}
                  className="flex gap-3.5 rounded-2xl bg-white p-4 ring-1 ring-transparent transition-colors hover:ring-gray-200 sm:gap-4 sm:p-5"
                >
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-xl sm:size-10 ${
                      tone === "lime" ? "bg-lime-600/10 text-lime-700" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <Icon className="size-[18px] sm:size-5" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-semibold">{itemTitle}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-pretty text-gray-600 sm:text-[15px]">{body}</p>
                  </div>
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
    <Section
      id="how"
      eyebrow="How it works"
      title="Clean up your Mac in three steps."
      subtitle="No settings to learn. No Terminal commands. Just scan, review and clear."
    >
      {/* Phones: a vertical timeline. Tablets and up: three columns joined by a line. */}
      <ol className="relative mx-auto grid max-w-5xl gap-0 md:grid-cols-3 md:gap-4">
        <span
          aria-hidden
          className="absolute top-5 bottom-5 left-[19px] w-px bg-linear-to-b from-lime-600 via-gray-200 to-gray-200 md:top-[39px] md:right-[16%] md:bottom-auto md:left-[16%] md:h-px md:w-auto md:bg-linear-to-r"
        />
        {steps.map(({ title, body }, i) => (
          <li
            key={title}
            className="relative flex gap-4 pb-8 last:pb-0 md:flex-col md:items-center md:gap-0 md:rounded-3xl md:p-5 md:pb-6 md:text-center"
          >
            <span
              className={`relative flex size-10 shrink-0 items-center justify-center rounded-full font-semibold tabular-nums ring-4 ring-white ${
                i === 0 ? "bg-lime-600 text-white" : "bg-black text-white"
              }`}
            >
              {i + 1}
            </span>
            <div className="pt-1.5 md:pt-0">
              <h3 className="text-lg font-bold tracking-tight sm:text-xl md:mt-5">{title}</h3>
              <p className="mt-1.5 max-w-sm leading-relaxed text-pretty text-gray-600 md:mt-2">{body}</p>
            </div>
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
      eyebrow="Compare"
      title="Better than the built&#8209;in storage tools."
      subtitle="macOS tells you your disk is full. MyMacStorage tells you why, then fixes it."
    >
      <div className="mx-auto grid max-w-5xl gap-4 lg:grid-cols-[3fr_2fr]">
        <div className="rounded-3xl bg-gray-100 p-2 sm:p-3">
          <h3 className="px-3 pt-3 pb-4 text-xl font-bold tracking-tight sm:px-5 sm:pt-5 sm:text-2xl">
            {APP_NAME} vs macOS Storage settings
          </h3>
          <table className="w-full table-fixed overflow-hidden rounded-2xl bg-white text-left text-sm sm:text-base">
            <colgroup>
              <col />
              <col className="w-[4.5rem] sm:w-28" />
              <col className="w-[4.5rem] sm:w-36" />
            </colgroup>
            <thead className="text-xs text-gray-500 sm:text-sm">
              <tr className="border-b border-gray-100">
                <th scope="col" className="px-4 py-3 font-medium sm:px-5">
                  Feature
                </th>
                <th scope="col" className="px-2 py-3 text-center font-medium">
                  macOS
                </th>
                <th scope="col" className="bg-lime-600/5 px-2 py-3 text-center font-semibold text-lime-700">
                  <span className="sm:hidden">Ours</span>
                  <span className="hidden sm:inline">{APP_NAME}</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {comparisonRows.map(({ label, macos }) => (
                <tr key={label}>
                  <th scope="row" className="px-4 py-3.5 leading-snug font-normal text-pretty sm:px-5">
                    {label}
                  </th>
                  <td className="px-2 py-3.5 text-center">
                    <span className="inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 sm:text-sm">
                      {macos}
                    </span>
                  </td>
                  <td className="bg-lime-600/5 px-2 py-3.5">
                    <span className="mx-auto flex size-6 items-center justify-center rounded-full bg-lime-600 text-white">
                      <Check className="size-3.5" strokeWidth={3} aria-label="Yes" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col rounded-3xl bg-black p-6 text-white sm:p-8">
          <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{APP_NAME} vs subscription cleaners</h3>
          <p className="mt-3 leading-relaxed text-pretty text-gray-400">
            Many Mac cleanup tools charge you every year and ask you to trust them with your files. {APP_NAME} costs{" "}
            <span className="font-semibold text-white">
              <Price />
            </span>{" "}
            once, runs entirely on your Mac and never uploads a filename.
          </p>
          <p className="mt-3 leading-relaxed text-pretty text-gray-400">
            You get every future update without a subscription, and one key covers the Windows version too.
          </p>
          <a
            href="#pricing"
            className="group mt-6 inline-flex items-center gap-2 self-start font-medium text-lime-600 transition-colors hover:text-white lg:mt-auto"
          >
            See what&rsquo;s included
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </Section>
  );
}

const macs: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: LaptopMinimal,
    title: "MacBook Air",
    body: "Small SSDs fill up fast. MyMacStorage frees space on your MacBook Air in minutes, so macOS updates install and your photos keep syncing.",
  },
  {
    icon: Laptop,
    title: "MacBook Pro",
    body: "Developers and creators lose gigabytes to build caches, simulators and render files. One scan finds them all, so you never hunt folder by folder.",
  },
  {
    icon: Monitor,
    title: "iMac, Mac mini and Mac Studio",
    body: "Desktop Macs collect years of downloads, duplicates and forgotten projects. MyMacStorage sorts them by size, so the biggest wins come first.",
  },
];

function EveryMac() {
  return (
    <Section eyebrow="Every model" title="Built for every Mac." subtitle="From a 256 GB MacBook Air to a packed Mac Studio.">
      {/* Phones: a swipeable row that peeks the next card. Tablets and up: three columns. */}
      <div className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-auto md:grid md:max-w-5xl md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
        {macs.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="flex w-[82%] shrink-0 snap-start flex-col rounded-3xl bg-gray-100 p-6 ring-1 ring-transparent transition-colors hover:ring-gray-200 sm:w-[48%] sm:p-7 md:w-auto"
          >
            <span className="flex size-11 items-center justify-center rounded-2xl bg-white text-black">
              <Icon className="size-5" strokeWidth={1.75} />
            </span>
            <h3 className="mt-5 text-lg font-bold tracking-tight sm:text-xl">{title}</h3>
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
    <Section
      eyebrow="Privacy and safety"
      title={"A Mac storage cleaner that’s safe by design."}
      subtitle="Two promises the app keeps, whatever you click."
    >
      <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
        {cards.map(({ icon: Icon, title, body, items }) => (
          <div key={title} className="flex flex-col rounded-3xl bg-gray-100 p-2 sm:p-3">
            <div className="px-3 pt-3 pb-5 sm:px-5 sm:pt-5">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-white ring-1 ring-gray-200">
                <Icon className="size-6 text-lime-700" strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 text-xl font-bold tracking-tight sm:text-2xl">{title}</h3>
              <p className="mt-2 leading-relaxed text-pretty text-gray-500">{body}</p>
            </div>
            <ul className="divide-y divide-gray-100 rounded-2xl bg-white md:mt-auto">
              {items.map(({ icon: ItemIcon, text }) => (
                <li key={text} className="flex items-center gap-3 px-4 py-3.5 text-sm sm:px-5 sm:text-base">
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
  const assurances = [
    { icon: ShieldCheck, text: `${REFUND_DAYS}-day refund` },
    { icon: Mail, text: "Licence key by email" },
    { icon: LockKeyhole, text: "Secure checkout" },
  ];

  return (
    <Section id="pricing" eyebrow="Pricing" title="Pay once. Keep it." subtitle="No subscription. Every update is included.">
      {/* A thin lime edge around the card, drawn by the padded gradient wrapper. */}
      <div id="download" className="edge-lime mx-auto max-w-3xl rounded-[28px] p-px">
        <div className="grid overflow-hidden rounded-[27px] bg-white md:grid-cols-[1fr_1.1fr]">
          <div className="relative flex flex-col items-center justify-center overflow-hidden bg-black px-6 py-10 text-center text-white sm:py-12 [--dot:oklch(100%_0_0/0.08)]">
            <div className="bg-dots absolute inset-0" />
            <div className="bg-glow absolute inset-0" />
            <span className="relative rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase ring-1 ring-white/15">
              Lifetime licence
            </span>
            <p className="relative mt-5 text-[clamp(3.75rem,16vw,5.5rem)] leading-none font-bold tracking-tight tabular-nums">
              <Price />
            </p>
            <p className="relative mt-3 text-gray-400">One-time payment</p>
          </div>

          <div className="flex flex-col justify-center px-6 py-7 sm:px-9 sm:py-9">
            <p className="text-sm font-semibold text-gray-500">Everything included</p>
            <ul className="mt-4 flex flex-col gap-3.5">
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
              className="group mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-lime-600 px-6 py-3.5 text-center font-medium text-white transition-colors hover:bg-lime-700 active:bg-lime-700"
            >
              Buy for <Price />
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <ul className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-xs text-gray-500 sm:text-sm">
              {assurances.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-1.5">
                  <Icon className="size-3.5 text-lime-700" strokeWidth={2} />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

/** The FAQ text is written with the USD price so structured data stays static; on screen it shows the visitor's own. */
function WithPrice({ text }: { text: string }) {
  return text.split(PRICE).flatMap((part, i) => (i === 0 ? [part] : [<Price key={i} />, part]));
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
    <section id="faq" className="px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
      {/* Desktop: heading sticks on the left while questions scroll on the right. */}
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <div className="reveal text-center lg:sticky lg:top-28 lg:self-start lg:text-left">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-lime-700 uppercase sm:mb-4 sm:text-sm">
            <span aria-hidden className="h-px w-5 bg-lime-600 lg:hidden" />
            FAQ
            <span aria-hidden className="h-px w-5 bg-lime-600" />
          </p>
          <h2 className="text-[clamp(1.85rem,6.4vw,3rem)] leading-[1.08] font-bold tracking-tight text-balance">
            Mac disk cleanup questions, answered.
          </h2>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-pretty text-gray-500 lg:mx-0">
            Still unsure? Email{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="font-medium text-black underline decoration-gray-300 underline-offset-4 hover:decoration-lime-600"
            >
              {SUPPORT_EMAIL}
            </a>
            . Prefer to do it by hand? Read our guide on{" "}
            <Link href={GUIDE_PATH} className="font-medium text-lime-700 underline-offset-4 hover:underline">
              how to free up space on a Mac
            </Link>
            .
          </p>
        </div>

        <div className="reveal flex flex-col gap-2">
          {faqs.map(({ q, a }) => (
            <details
              key={q}
              className="faq-item group rounded-2xl bg-gray-100 transition-colors open:bg-white open:ring-1 open:ring-gray-200"
            >
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 font-semibold transition-colors hover:text-lime-700 sm:px-6 sm:text-lg [&::-webkit-details-marker]:hidden">
                <WithPrice text={q} />
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-gray-200 transition-colors group-open:bg-lime-600 group-open:ring-lime-600">
                  <Plus className="size-4 text-gray-600 transition-transform duration-200 group-open:rotate-45 group-open:text-white" />
                </span>
              </summary>
              <p className="px-5 pb-5 leading-relaxed text-pretty text-gray-600 sm:px-6">
                <WithPrice text={a} />
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="px-3 pb-14 sm:px-6 sm:pb-20">
      <div className="reveal relative mx-auto max-w-6xl overflow-hidden rounded-[28px] bg-black px-6 py-16 text-center sm:rounded-[32px] sm:py-24 [--dot:oklch(100%_0_0/0.07)]">
        <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(70%_70%_at_50%_0%,black,transparent)]" />
        <div className="bg-glow absolute inset-0" />
        <div className="relative">
          <h2 className="text-[clamp(2rem,7vw,3.5rem)] leading-[1.05] font-bold tracking-tight text-balance text-white">
            Give your Mac room to breathe.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-gray-400 sm:text-lg">
            One scan shows you everything filling your Mac. <Price /> once, and it&rsquo;s yours.
          </p>
          <div className="mx-auto mt-8 flex max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
            <a
              href={CHECKOUT_URL}
              className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-lime-600 px-6 py-3.5 font-medium text-white transition-colors hover:bg-lime-700 sm:py-3"
            >
              <AppleIcon className="size-4" />
              Download for Mac
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center rounded-xl bg-white/10 px-6 py-3.5 font-medium text-white ring-1 ring-white/15 transition-colors ring-inset hover:bg-white/15 sm:py-3"
            >
              See pricing
            </a>
          </div>
          <p className="mt-5 text-sm text-gray-500">
            macOS 14 and later &middot; Apple silicon and Intel &middot; {REFUND_DAYS}-day refund
          </p>
        </div>
      </div>
    </section>
  );
}
