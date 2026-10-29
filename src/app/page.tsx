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
import { AppleIcon, Logo, WindowsIcon } from "@/components/icons";
import { SiteHeader } from "@/components/site-header";
import { StorageBar } from "@/components/storage-bar";
import { features } from "@/lib/features";

const APP_NAME = "MyMacStorage";
const PRICE = "$9";

const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
const toolCount = NUMBER_WORDS[features.length] ?? String(features.length);
const ToolCount = toolCount.charAt(0).toUpperCase() + toolCount.slice(1);

export default function Home() {
  return (
    <>
      <SiteHeader appName={APP_NAME} price={PRICE} />
      <main id="top" className="flex flex-col">
        <Hero />
        <Section
          id="inside"
          title={
            <>
              The bar you know,
              <br className="hidden sm:block" /> finally explained.
            </>
          }
          subtitle="The storage bar from System Settings, with every coloured slice named and ready to clear."
        >
          <div className="mx-auto max-w-4xl">
            <StorageBar />
          </div>
        </Section>
        <Section
          title="Every byte, on one screen."
          subtitle={`${ToolCount} tools, one scan. What you keep is grey. What you could clear is lime.`}
        >
          <FeatureTour />
        </Section>
        <SafeByDesign />
        <Testimonials />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
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
        href="#download"
        className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-lime-600 px-6 py-3.5 font-medium text-white transition-colors hover:bg-lime-700 active:bg-lime-700 sm:py-3"
      >
        <AppleIcon className="size-4" />
        Download for Mac
      </a>
      <a
        href="#download-windows"
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
    <section className="relative px-4 pt-20 sm:px-6 sm:pt-24">
      <div className="absolute inset-x-2 top-2 bottom-[18%] -z-10 rounded-3xl bg-gray-100 sm:inset-x-6 sm:top-3 sm:bottom-[28%] sm:rounded-[28px]" />

      <div className="mx-auto max-w-3xl pt-6 text-center sm:pt-10">
        <h1 className="text-[2.6rem] leading-[1.05] font-bold tracking-tight text-black sm:text-6xl lg:text-7xl">
          See what&rsquo;s filling
          <br />
          <span className="bg-linear-to-r from-lime-600 to-lime-700 bg-clip-text text-transparent">your Mac.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-pretty text-gray-500 sm:text-lg">
          {APP_NAME} is a <strong className="font-semibold text-black">native Mac app</strong> that maps your whole
          disk in <strong className="font-semibold text-black">one scan</strong>, then clears what you don&rsquo;t
          need, <strong className="font-semibold text-black">safely</strong>. Nothing is deleted. Everything goes to
          the Trash.
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
    <Section title="Safe by design." subtitle="Two promises the app keeps, whatever you click.">
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

// Placeholder testimonials: replace with real quotes, names, handles and avatars.
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
              href="#buy"
              className="rounded-xl bg-lime-600 px-6 py-3.5 text-center font-medium text-white transition-colors hover:bg-lime-700 active:bg-lime-700"
            >
              Buy for {PRICE}
            </a>
            <a
              href="#download"
              className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-white px-6 py-3.5 font-medium text-black transition-colors hover:bg-gray-200 active:bg-gray-200"
            >
              <AppleIcon className="size-4" />
              Try it free
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}

const faqs = [
  {
    q: "Will it delete anything without asking?",
    a: "No. You review every item first, and everything goes to the Trash, so you can always drag it back.",
  },
  {
    q: "Does it upload my files or filenames?",
    a: "No. Scanning, hashing and duplicate matching all run on your Mac. Only your licence key is checked online.",
  },
  {
    q: "Which macOS versions are supported?",
    a: "macOS 14 Sonoma and later, on both Apple silicon and Intel Macs.",
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

function Faq() {
  return (
    <Section id="faq" title="Questions, answered.">
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

function FinalCta() {
  return (
    <section className="px-4 pb-14 sm:px-6 sm:pb-20">
      <div className="mx-auto max-w-6xl rounded-3xl bg-black px-6 py-14 text-center sm:py-20">
        <h2 className="text-3xl font-bold tracking-tight text-balance text-white sm:text-5xl">
          Give your Mac room to breathe.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-pretty text-gray-400 sm:mt-4 sm:text-lg">
          One scan shows you everything. {PRICE} once, and it&rsquo;s yours.
        </p>
        <div className="mx-auto mt-8 flex max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <a
            href="#download"
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

function Footer() {
  return (
    <footer className="border-t border-gray-200 px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
        <a href="#top" className="flex items-center gap-2.5 font-semibold">
          <Logo />
          {APP_NAME}
        </a>
        <nav className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
          <a href="#inside" className="hover:text-black">
            Inside
          </a>
          <a href="#pricing" className="hover:text-black">
            Pricing
          </a>
          <a href="#faq" className="hover:text-black">
            FAQ
          </a>
        </nav>
        <p className="text-sm text-gray-500">&copy; 2026 {APP_NAME}</p>
      </div>
    </footer>
  );
}
