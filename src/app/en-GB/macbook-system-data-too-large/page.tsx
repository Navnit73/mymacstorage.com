import Link from "next/link";
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
import { innerPageGraph, isoDateTime, pageMetadata } from "@/lib/seo";
import {
  APP_NAME,
  GUIDES,
  CACHE_GUIDE_PATH,
  GUIDE_PATH,
  OG_IMAGE,
  SITE_URL,
  guidePath,
  SYSTEM_DATA_GUIDE_PATH,
  UK_PRICE,
  UK_SYSTEM_DATA_PATH as path,
  pages,
} from "@/lib/site";

// UK page: British spelling, and the £ price as plain text so crawlers and visitors see the same thing.
const title = "How to reduce System Data on Mac";
const description =
  "How to reduce System Data on Mac in 9 safe steps. Find out if it is too large, then clear snapshots, caches, logs and developer files without breaking macOS.";
const updated = pages.find((p) => p.path === path)?.updated ?? "2026-11-01";

export const metadata = pageMetadata({
  title: "How to Reduce System Data on Mac: 9 Fixes",
  description,
  path,
  hreflang: "en-GB",
});

const shortAnswer = [
  "Restart your Mac.",
  "Connect your backup disk and let Time Machine finish.",
  "Clear app and browser caches.",
  "Remove files that uninstalled apps left behind.",
  "Clean up Xcode, Docker and other developer files.",
];

const checks = [
  ["Free space above 15% and System Data stable", "Macs keep a lot of system files by design", "Leave it alone. Nothing needs fixing."],
  ["Free space below 10%", "macOS has little room for updates and swap files", "Work through the fixes below, starting with method 1."],
  ["System Data grew by tens of gigabytes in weeks", "Snapshots, caches or a developer tool are growing", "Start with methods 2, 5 and 8."],
  ["System Data jumped after a macOS update", "Install files and a snapshot are still on disk", "Restart, wait a day or two, then check again."],
];

const contents = [
  ["App and browser caches", "~/Library/Caches", "Yes, the folders inside it"],
  ["Log and crash files", "~/Library/Logs", "Yes"],
  ["Local Time Machine snapshots", "Hidden on your startup disk", "Yes, once a backup completes"],
  ["Support files from removed apps", "~/Library/Application Support", "Yes, for apps you removed"],
  ["Developer and AI tool data", "~/Library/Developer, Docker and tool folders", "Yes, with each tool’s own commands"],
  ["Spotlight search index", "Hidden on your startup disk", "Rebuild it, don’t delete it"],
  ["Swap files", "/private/var/vm", "No, macOS manages them"],
];

const methodGroups: MethodGroup[] = [
  {
    title: "Quick wins",
    intro: "Low risk, and each one takes minutes.",
    methods: [
      {
        title: "Restart your Mac",
        body: (
          <>
            A restart clears swap files, temporary files and stale caches that macOS creates while it runs. If you
            haven’t restarted in weeks, this step alone can free several gigabytes.
          </>
        ),
      },
      {
        title: "Let Time Machine finish a backup",
        body: (
          <>
            Local snapshots are often the largest part of System Data. Connect your backup disk and let Time Machine
            finish a backup, and macOS clears older local snapshots by itself. Need the space right now? Our{" "}
            <Link href={SYSTEM_DATA_GUIDE_PATH}>step-by-step System Data guide</Link> shows the Terminal commands.
          </>
        ),
      },
      {
        title: "Update macOS",
        body: (
          <>
            Some macOS releases contain bugs that let System Data grow out of control, and later updates fix them.
            Choose <strong>System Settings</strong>, then <strong>General</strong>, then{" "}
            <strong>Software Update</strong>.
          </>
        ),
      },
      {
        title: "Delete old log files",
        body: (
          <>
            In Finder, choose <strong>Go</strong>, then <strong>Go to Folder</strong>, and enter{" "}
            <code>~/Library/Logs</code>. Delete old logs and the crash reports in <code>DiagnosticReports</code>. They
            rarely take much space, but a misbehaving app can write gigabytes in a few days.
          </>
        ),
      },
    ],
  },
  {
    title: "Bigger wins",
    intro: "These take longer, and they usually free the most space.",
    methods: [
      {
        title: "Find the biggest folders in Library",
        body: (
          <>
            Open <code>~/Library</code> with <strong>Go to Folder</strong>, switch to list view and choose{" "}
            <strong>View</strong>, then <strong>Show View Options</strong>. Tick <strong>Calculate all sizes</strong>{" "}
            and click the <strong>Size</strong> column. The largest folders show where the space went.
          </>
        ),
      },
      {
        title: "Clear app and browser caches",
        body: (
          <>
            Quit an app, then delete the contents of its folder inside <code>~/Library/Caches</code>. Leave the Caches
            folder itself. Apps rebuild what they need on their next launch. Our guide on{" "}
            <Link href={CACHE_GUIDE_PATH}>how to clear cache on Mac</Link> covers every browser.
          </>
        ),
      },
      {
        title: "Remove leftovers from uninstalled apps",
        body: (
          <>
            Check <code>~/Library/Application Support</code> and <code>~/Library/Containers</code> for folders named
            after apps you no longer have. Delete only those that clearly belong to removed apps. When in doubt, leave
            the folder.
          </>
        ),
      },
      {
        title: "Clean up developer files",
        body: (
          <>
            If you write code, this often frees more than every other fix. Delete{" "}
            <code>~/Library/Developer/Xcode/DerivedData</code>, run <code>docker system prune</code> to remove unused
            images, and run <code>brew cleanup</code> to drop old package versions. Check folders for local AI models
            too, because a single model can take many gigabytes.
          </>
        ),
      },
      {
        title: "Rebuild the Spotlight index",
        body: (
          <>
            A damaged index can grow far beyond its normal size. Open <strong>System Settings</strong>, then{" "}
            <strong>Spotlight</strong>, and click <strong>Search Privacy</strong>. Add your startup disk, wait a
            minute, then remove it. Spotlight rebuilds a smaller index, and search runs slowly until it finishes.
          </>
        ),
      },
    ],
  },
];

const protect = [
  {
    title: "The System folder and the top-level Library folder",
    body: "macOS needs both to start up. Work only inside your own ~/Library.",
  },
  {
    title: "Swap files in /private/var/vm",
    body: "macOS creates and removes these as it needs them.",
  },
  {
    title: "Anything in /private/var/folders",
    body: "macOS clears these temporary files itself, and deleting them by hand can crash running apps.",
  },
  {
    title: "Folders for apps you still use",
    body: "They hold your settings, data and sign-ins.",
  },
];

const faqs = [
  {
    q: "How to reduce System Data on Mac without Terminal?",
    a: "Restart your Mac, connect your backup disk so Time Machine can clear local snapshots, and delete cache and log folders in Finder. Then remove support folders for apps you uninstalled. None of these steps needs Terminal.",
  },
  {
    q: "Is MacBook System Data too large at 100 GB?",
    a: "Not always. The number matters less than your free space. If you have more than 15 percent of your disk free and System Data stays steady, leave it alone. If free space is low or it keeps growing, use the fixes above.",
  },
  {
    q: "Is MacBook Pro System Data too large at 200 GB normal?",
    a: "It can be, mostly on a Mac used for development or video work. Xcode, Docker images, local AI models and large caches add up quickly. Check the biggest folders in your Library first, then clear what you no longer use.",
  },
  {
    q: "Why is Mac Other storage taking up space on my disk?",
    a: "Apple renamed Other storage to System Data in macOS Monterey, so it is the same category. It holds caches, logs, snapshots and support files that don’t fit under Applications, Documents or Photos.",
  },
  {
    q: "Why is my MacBook System Data too large after an update?",
    a: "macOS keeps temporary install files and often takes a local snapshot before an update. Most of that clears within a day or two. Restart your Mac, then check Storage settings again.",
  },
  {
    q: "Is it safe to clear System Data?",
    a: "Yes, if you clear the right parts. Caches, logs, local snapshots and leftovers from removed apps are safe to remove. Leave the System folder, the top-level Library folder and the swap files alone.",
  },
  {
    q: "Why does System Data keep coming back?",
    a: "Apps rebuild their caches as you use them, and Time Machine keeps making local snapshots. Some regrowth is normal. If it returns fast, connect your backup disk more often and check which app’s cache grows most.",
  },
  {
    q: "Does reinstalling macOS reduce System Data?",
    a: "Reinstalling over your current system keeps your apps and their data, so it rarely helps. Erasing your Mac and restoring from a backup resets System Data, but treat that as a last resort.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "How to reduce System Data on Mac (UK)", description, language: "en-GB" }),
  {
    "@type": "Article",
    "@id": `${SITE_URL}${path}#article`,
    headline: `${title}: 9 safe fixes`,
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

export default function UkSystemDataPage() {
  return (
    <>
      <JsonLd graph={graph} />
      <SiteHeader appName={APP_NAME} />
      <main className="flex flex-col">
        <LandingHero
          market="uk"
          title={
            <>
              How to reduce System Data on Mac,{" "}
              <span className="bg-linear-to-r from-lime-600 to-lime-700 bg-clip-text text-transparent">safely.</span>
            </>
          }
          intro={
            <>
              Is your MacBook System Data too large? Here is{" "}
              <strong className="font-semibold text-black">how to reduce System Data on Mac</strong> in 9 steps,
              without deleting anything macOS needs. Prefer one scan that names every part?{" "}
              <strong className="font-semibold text-black">{APP_NAME}</strong> does it for {UK_PRICE}, once.
            </>
          }
          secondaryHref="#fixes"
          secondaryLabel="Read the 9 fixes"
        />

        <ShortAnswer
          title="The short answer: five fixes that solve most cases"
          subtitle={`Last updated ${new Date(updated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}. Every fix uses tools macOS already includes.`}
          items={shortAnswer}
        />

        <Section
          title="MacBook System Data too large? Check the number first"
          subtitle="Open System Settings, then General, then Storage, and wait for the bar to finish loading. Hover over the grey section to see your System Data total."
        >
          <div className="mx-auto max-w-4xl">
            <InfoTable
              title="Is your System Data really a problem?"
              head={["What you see", "What it means", "What to do"]}
              rows={checks}
            />
            <p className="mx-auto mt-6 max-w-2xl text-center leading-relaxed text-pretty text-gray-600">
              Write the figure down, so you can measure your progress. Free space matters more than the System Data
              number, and macOS clears caches and logs that are safe to delete when it needs the room.
            </p>
          </div>
        </Section>

        <Section
          title="Mac Other storage taking up space? It’s now called System Data"
          subtitle="Apple renamed the category in macOS Monterey. The same fixes apply to both names."
        >
          <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-gray-100 p-5 sm:p-8">
              <h3 className="text-xl font-bold tracking-tight sm:text-2xl">System Data</h3>
              <p className="mt-2 leading-relaxed text-pretty text-gray-600">
                A catch-all for files that don’t fit Applications, Documents or Photos. It mostly holds temporary and
                support files that apps and macOS create as they run. You can shrink it.
              </p>
            </div>
            <div className="rounded-2xl bg-gray-100 p-5 sm:p-8">
              <h3 className="text-xl font-bold tracking-tight sm:text-2xl">macOS</h3>
              <p className="mt-2 leading-relaxed text-pretty text-gray-600">
                The operating system itself. macOS seals and protects it, so you can’t shrink it, and you shouldn’t
                try.
              </p>
            </div>
          </div>
          <div className="mx-auto mt-4 max-w-5xl">
            <InfoTable
              title="What System Data includes"
              head={["What it holds", "Where it lives", "Safe to clear?"]}
              rows={contents}
            />
          </div>
        </Section>

        <Section
          id="fixes"
          title="How to reduce System Data on Mac: 9 safe fixes"
          subtitle="Work from the top. The first fixes carry the least risk."
        >
          <MethodGroups groups={methodGroups} />
          <h3 className="mx-auto mt-10 max-w-3xl text-center text-2xl font-bold tracking-tight sm:text-3xl">
            MacBook Pro System Data too large? Check developer and AI files
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-center leading-relaxed text-pretty text-gray-600">
            On a MacBook Pro used for coding or video work, method 8 usually matters most. Xcode simulators, Docker
            images and local AI models can each take tens of gigabytes.
          </p>
          <h3 className="mx-auto mt-10 max-w-3xl text-center text-2xl font-bold tracking-tight sm:text-3xl">
            Small disk? Keep at least 20 GB free
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-center leading-relaxed text-pretty text-gray-600">
            A small disk leaves less room for snapshots and updates, so keep at least 20 GB free. Connect your backup
            disk often and restart once a week. For more ways to make room, read our guide on{" "}
            <Link href={GUIDE_PATH} className="font-medium text-lime-700 underline-offset-4 hover:underline">
              how to free up space on a Mac
            </Link>
            .
          </p>
        </Section>

        <Section title="What not to delete" subtitle="Some files look like clutter but keep your Mac running.">
          <ul className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
            {protect.map(({ title: itemTitle, body }) => (
              <li key={itemTitle} className="rounded-2xl bg-gray-100 p-5 sm:p-7">
                <h3 className="font-semibold sm:text-lg">{itemTitle}</h3>
                <p className="mt-2 leading-relaxed text-pretty text-gray-600">{body}</p>
              </li>
            ))}
          </ul>
        </Section>

        <ScanSteps
          market="uk"
          title="See what’s inside System Data with MyMacStorage"
          subtitle="Storage settings shows one grey block. MyMacStorage opens it up."
          intro={`${APP_NAME} names each part of System Data, from caches and snapshots to developer files and app leftovers, and shows its size, so you know what is safe to clear. That is how to reduce System Data on Mac in minutes. Nothing is deleted outright: everything goes to the Bin, and Undo puts it back.`}
        />

        <PricingSection market="uk" />
        <RelatedLinks
          links={[
            { href: guidePath("uk", "appCleaner"), label: GUIDES.appCleaner.label },
            { href: guidePath("uk", "cleanMyMacAlternative"), label: GUIDES.cleanMyMacAlternative.label },
            { href: guidePath("uk", "clearRam"), label: GUIDES.clearRam.label },
            { href: guidePath("uk", "diskAnalyzer"), label: "Mac disk space analyser" },
          ]}
        />

        <FaqSection title="System Data on Mac: your questions, answered." faqs={faqs} />
        <FinalCta backHref="#fixes" backLabel="Back to the fixes">
          Now you know how to reduce System Data on Mac by hand. One scan with {APP_NAME} shows the rest. {UK_PRICE} once,
          and it’s yours.
        </FinalCta>
      </main>
      <SiteFooter />
    </>
  );
}
