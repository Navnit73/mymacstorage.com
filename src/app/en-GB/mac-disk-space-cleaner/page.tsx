import Link from "next/link";
import { Check } from "lucide-react";
import {
  FaqSection,
  FinalCta,
  InfoTable,
  LandingHero,
  MethodGroups,
  PricingSection,
  RelatedLinks,
  ScanSteps,
  ShortAnswer,
  type MethodGroup,
} from "@/components/landing-blocks";
import { JsonLd } from "@/components/json-ld";
import { Section } from "@/components/section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StorageBar } from "@/components/storage-bar";
import { innerPageGraph, isoDateTime, pageMetadata } from "@/lib/seo";
import {
  APP_NAME,
  GUIDES,
  CACHE_GUIDE_PATH,
  DUPLICATES_GUIDE_PATH,
  GUIDE_PATH,
  OG_IMAGE,
  SITE_URL,
  guidePath,
  SYSTEM_DATA_GUIDE_PATH,
  UK_CLEANER_PATH as path,
  UK_PRICE,
  pages,
} from "@/lib/site";

// UK page: British spelling, and the £ price as plain text so crawlers and visitors see the same thing.
const title = "How to free up space on Mac safely";
const description =
  "How to free up space on Mac in 10 safe steps: empty the Bin, clear caches, remove big files and app leftovers, or clean up Mac storage in one scan.";
const updated = pages.find((p) => p.path === path)?.updated ?? "2026-11-01";

export const metadata = pageMetadata({
  title: "How to Free Up Space on Mac: 10 Safe Ways",
  description,
  path,
  hreflang: "en-GB",
});

const shortAnswer = [
  "Empty the Bin and your Downloads folder.",
  "Turn on Optimise Mac Storage in iCloud.",
  "Delete old iPhone and iPad backups.",
  "Remove large files you no longer need.",
  "Uninstall apps you don’t use.",
];

const categories = [
  ["Applications", "Every app you have installed", "Method 6"],
  ["Documents", "Your files, including Downloads", "Methods 2 and 5"],
  ["Photos", "Your Photos library", "Method 3"],
  ["iOS Files", "iPhone and iPad backups", "Method 4"],
  ["Messages", "Photos, videos and files from your chats", "Method 10"],
  ["System Data", "Caches, logs, app support files and snapshots", "Methods 8 and 9"],
];

const methodGroups: MethodGroup[] = [
  {
    title: "Quick wins",
    intro: "Five minutes each, and nothing here can break your Mac.",
    methods: [
      {
        title: "Empty the Bin",
        body: (
          <>
            Deleted files stay on your disk until you empty the Bin. Right-click the Bin in the Dock and choose{" "}
            <strong>Empty Bin</strong>. To stop it filling up again, open Finder, choose <strong>Settings</strong>, then{" "}
            <strong>Advanced</strong>, and tick <strong>Remove items from the Bin after 30 days</strong>.
          </>
        ),
      },
      {
        title: "Clear your Downloads folder",
        body: (
          <>
            In Finder, choose <strong>Go</strong>, then <strong>Downloads</strong>. Sort by <strong>Size</strong>, then
            drag old installers (<code>.dmg</code> and <code>.pkg</code> files), archives and videos to the Bin.
          </>
        ),
      },
      {
        title: "Turn on Optimise Mac Storage",
        body: (
          <>
            Open <strong>System Settings</strong>, click your name, then <strong>iCloud</strong>, then{" "}
            <strong>Drive</strong>, and turn on <strong>Optimise Mac Storage</strong>. macOS keeps older files in iCloud
            and downloads them when you open them. Check you have enough iCloud storage first, because the free 5 GB
            fills quickly.
          </>
        ),
      },
      {
        title: "Delete old iPhone and iPad backups",
        body: (
          <>
            Choose <strong>System Settings</strong>, then <strong>General</strong>, then <strong>Storage</strong>, and
            click the info button next to <strong>iOS Files</strong>. Select a backup you no longer need and click{" "}
            <strong>Delete</strong>. A single backup often takes several gigabytes.
          </>
        ),
      },
    ],
  },
  {
    title: "Bigger wins",
    intro: "These take 10 to 20 minutes and usually free the most space.",
    methods: [
      {
        title: "Find and remove large files",
        body: (
          <>
            In Storage, click the info button next to <strong>Documents</strong> and open <strong>Large Files</strong>.
            Review each file from the biggest down and delete what you no longer need. Old video exports and disk
            images usually top the list.
          </>
        ),
      },
      {
        title: "Uninstall apps you don’t use",
        body: (
          <>
            Click the info button next to <strong>Applications</strong> in Storage, sort by size and delete apps you
            haven’t opened in months. Some apps leave files in <code>~/Library/Application Support</code>, so check
            there after you remove one.
          </>
        ),
      },
      {
        title: "Remove duplicate files",
        body: (
          <>
            Photos has a <strong>Duplicates</strong> album, and Finder can sort files by size. For every other file
            type, follow our guide on{" "}
            <Link href={DUPLICATES_GUIDE_PATH}>how to find duplicate files on Mac</Link>.
          </>
        ),
      },
      {
        title: "Clear app and browser caches",
        body: (
          <>
            Quit the app, then delete the contents of its folder inside <code>~/Library/Caches</code>. Leave the folder
            itself. Apps rebuild what they need, so expect one slow launch. Our guide on{" "}
            <Link href={CACHE_GUIDE_PATH}>how to clear cache on Mac</Link> covers browsers too.
          </>
        ),
      },
      {
        title: "Shrink System Data",
        body: (
          <>
            System Data holds caches, logs and app support files. Clearing caches (method 8), removing app leftovers
            (method 6) and deleting old backups (method 4) all shrink it. Read{" "}
            <Link href={SYSTEM_DATA_GUIDE_PATH}>how to reduce System Data on Mac</Link> for the full routine.
          </>
        ),
      },
      {
        title: "Clean up Messages and Mail attachments",
        body: (
          <>
            In Storage, click the info button next to <strong>Messages</strong> and delete large attachments. In Mail,
            choose <strong>Mailbox</strong>, then <strong>Erase Deleted Items</strong> and{" "}
            <strong>Erase Junk Mail</strong>.
          </>
        ),
      },
    ],
  },
];

const comparisonRows = [
  { label: "Breaks down System Data", macos: "No" },
  { label: "Lists your biggest files and folders", macos: "Partly" },
  { label: "Finds duplicates byte for byte", macos: "No" },
  { label: "Finds leftovers from removed apps", macos: "No" },
  { label: "Undoes a whole cleanup", macos: "No" },
];

const faqs = [
  {
    q: "How to free up space on Mac without deleting files?",
    a: "Turn on Optimise Mac Storage in iCloud Drive so macOS keeps older files in iCloud, or move large libraries, such as Photos, to an external drive. Your files stay available, but they stop filling your Mac’s disk.",
  },
  {
    q: "How to clear disk space on Mac quickly?",
    a: `Empty the Bin, clear your Downloads folder and delete old iPhone backups. Those three steps take about five minutes and often free several gigabytes. A scan with ${APP_NAME} finds caches, duplicates and large files in the same time.`,
  },
  {
    q: "How to clear space on Mac when the Bin is already empty?",
    a: "Open System Settings, then General, then Storage, and look for your largest categories. Large files, System Data and old backups usually hold the space, and methods 4, 5, 8 and 9 above clear them.",
  },
  {
    q: "How much free space should a Mac have?",
    a: "Keep at least 10 to 15 percent of your disk free. macOS uses that room for swap files, caches and updates, and a major macOS upgrade can need 25 GB or more while it installs.",
  },
  {
    q: "Why is my Mac storage full when I have few files?",
    a: "Your own documents are often the smallest part. Caches, app support files, local snapshots, iPhone backups and leftovers from removed apps fill the rest, and macOS groups most of them under System Data.",
  },
  {
    q: "How do I free up space on a MacBook Air?",
    a: "Use the same methods as on any Mac. Many MacBook Air models have 256 GB of storage, so old iPhone backups, a large Photos library and Optimise Mac Storage usually make the biggest difference.",
  },
  {
    q: "Why didn’t my free space go up after I deleted files?",
    a: "Deleted files stay in the Bin until you empty it. macOS can also keep local Time Machine snapshots for a while, and Storage settings can take a few minutes to update. Empty the Bin and restart your Mac to see the real figure.",
  },
  {
    q: "Is it safe to use a Mac cleaner app?",
    a: `It is when the app shows every file before it clears anything and moves files to the Bin instead of deleting them. ${APP_NAME} works this way, so Undo or the Bin brings back anything you removed, and scanning never leaves your Mac.`,
  },
  {
    q: "Does freeing up space make a Mac faster?",
    a: "It helps when your disk is nearly full, because macOS needs free space for swap files and updates. A cleanup won’t speed up a Mac that already has plenty of room.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "How to free up space on Mac (UK)", description, language: "en-GB" }),
  {
    "@type": "Article",
    "@id": `${SITE_URL}${path}#article`,
    headline: `${title}: 10 ways`,
    description,
    image: OG_IMAGE,
    datePublished: isoDateTime("2026-11-01"),
    dateModified: isoDateTime(updated),
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: { "@id": `${SITE_URL}${path}#webpage` },
    inLanguage: "en-GB",
  },
  {
    "@type": "FAQPage",
    "@id": `${SITE_URL}${path}#faq`,
    isPartOf: { "@id": `${SITE_URL}${path}#webpage` },
    mainEntity: faqs.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  },
];

export default function UkCleanerPage() {
  return (
    <>
      <JsonLd graph={graph} />
      <SiteHeader appName={APP_NAME} />
      <main className="flex flex-col">
        <LandingHero
          market="uk"
          title={
            <>
              How to free up space on Mac,{" "}
              <span className="bg-linear-to-r from-lime-600 to-lime-700 bg-clip-text text-transparent">safely.</span>
            </>
          }
          intro={
            <>
              Your Mac says the disk is almost full. This guide shows{" "}
              <strong className="font-semibold text-black">how to free up space on Mac</strong> in 10 steps, from
              five-minute quick wins to the hidden files Finder never shows. Prefer one scan?{" "}
              <strong className="font-semibold text-black">{APP_NAME}</strong> does it for {UK_PRICE}, once.
            </>
          }
          secondaryHref="#methods"
          secondaryLabel="Read the 10 steps"
        />

        <ShortAnswer
          title="The short answer: free up space on Mac in 5 minutes"
          subtitle={`Last updated ${new Date(updated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}. Every step uses tools macOS already includes.`}
          items={shortAnswer}
        />

        <Section
          title="How to clear space on Mac: start with what fills it"
          subtitle="Open System Settings, then General, then Storage. The two or three biggest categories show which methods will help most."
        >
          <div className="mx-auto max-w-4xl">
            <StorageBar />
            <div className="mt-8">
              <InfoTable
                title="What each storage category means"
                head={["Category", "What it holds", "How to shrink it"]}
                rows={categories}
              />
            </div>
          </div>
        </Section>

        <Section
          id="methods"
          title="How to free up space on Mac: 10 safe methods"
          subtitle="Work from the top. The quick wins come first, and the bigger ones follow."
        >
          <MethodGroups groups={methodGroups} />
          <p className="mx-auto mt-6 max-w-2xl text-center text-gray-600">
            Want the full walkthrough with 14 methods? Read our guide on{" "}
            <Link href={GUIDE_PATH} className="font-medium text-lime-700 underline-offset-4 hover:underline">
              how to free up space on a Mac
            </Link>
            .
          </p>
        </Section>

        <ScanSteps
          market="uk"
          title="Free up space on Mac in one scan with MyMacStorage"
          subtitle="The methods above work, but they take an afternoon. MyMacStorage checks all of them in a single pass."
          intro={`To clean up Mac storage without hunting through folders, ${APP_NAME} scans your whole disk, names every category and shows what each one frees. Nothing is deleted: everything goes to the Bin, and Undo puts it back. Scanning runs on your Mac, so no filename is ever uploaded.`}
        />
        <div className="-mt-10 px-4 pb-14 sm:-mt-14 sm:px-6 sm:pb-20">
          <div className="mx-auto max-w-5xl rounded-2xl bg-gray-100 p-5 sm:p-8">
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
        </div>

        <PricingSection market="uk" />
        <RelatedLinks
          links={[
            { href: guidePath("uk", "appCleaner"), label: GUIDES.appCleaner.label },
            { href: guidePath("uk", "cleanMyMacAlternative"), label: GUIDES.cleanMyMacAlternative.label },
            { href: guidePath("uk", "clearRam"), label: GUIDES.clearRam.label },
            { href: guidePath("uk", "diskAnalyzer"), label: "Mac disk space analyser" },
          ]}
        />

        <FaqSection title="Free up space on Mac: your questions, answered." faqs={faqs} />
        <FinalCta backHref="#methods" backLabel="Back to the steps">
          Now you know how to free up space on Mac by hand. One scan with {APP_NAME} does it in minutes. {UK_PRICE} once,
          and it’s yours.
        </FinalCta>
      </main>
      <SiteFooter />
    </>
  );
}
