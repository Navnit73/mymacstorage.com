import Link from "next/link";
import { AppCallout, GuideLayout, GuideTable } from "@/components/guide-layout";
import { articleGraph, innerPageGraph, pageMetadata } from "@/lib/seo";
import { APP_NAME, GUIDES, MARKETS, REFUND_DAYS, guideAlternates, guidePath } from "@/lib/site";

const market = "us" as const;
const { hreflang, price, cleanerPath, cleanerLabel } = MARKETS[market];
const key = "cleanMyMacAlternative";
const path = guidePath(market, key);
const title = "CleanMyMac alternatives: 6 free and paid options compared";
const description = `Looking for a CleanMyMac alternative? Compare free tools and paid cleaners by price, safety and features, and find the right way to clean your Mac.`;

export const metadata = pageMetadata({
  title: "CleanMyMac Alternatives: 6 Free & Paid",
  description,
  path,
  type: "article",
  hreflang,
  alternates: guideAlternates(market, key),
});

const criteria = [
  ["Price model", "Subscription, one-time purchase or free", "A yearly fee adds up over the life of a Mac"],
  ["Review before delete", "Lists every file before it clears", "Protects documents you didn’t mean to remove"],
  ["Undo", "Moves files to the Trash, or offers its own undo", "Turns a mistake into a quick fix"],
  ["Privacy", "Scans on your Mac and uploads nothing", "Your filenames reveal a lot about you"],
  ["Scope", "One job or many", "Many tools suit beginners, and one tool suits experts"],
  ["macOS support", "Works on your macOS version", "Some tools ship a separate build per release"],
];

const compare = [
  ["Storage settings", "Free, built in", "Categories and quick wins", "No System Data breakdown, no duplicates"],
  ["OnyX", "Free", "Maintenance and cache tasks", "Technical, and tied to one macOS version"],
  ["AppCleaner", "Free", "Uninstalling apps", "Does nothing else"],
  ["GrandPerspective or DaisyDisk", "Free or low-cost; paid", "Seeing big folders on a map", "Analyzes only, so you delete by hand"],
  ["App Cleaner & Uninstaller", "Paid", "Uninstalling apps and managing extensions", "Narrower than a full cleaner"],
  [APP_NAME, `${price} once`, "Scan, review, clear and undo", "No free trial, but a 7-day refund"],
];

const faqs = [
  {
    q: "What is the best free CleanMyMac alternative?",
    a: "No single free tool replaces it. Combine macOS Storage settings for categories, AppCleaner for uninstalling apps and GrandPerspective or OnyX for large files and maintenance. Together they cover most needs without a guided scan.",
  },
  {
    q: "Does CleanMyMac have a free version?",
    a: "MacPaw offers a 7-day free trial with full functionality, and it charges you automatically afterward under the plan you picked. Check MacPaw’s site for the current terms, because plans and prices change.",
  },
  {
    q: "Is CleanMyMac a subscription?",
    a: "It offers both subscription plans and a one-time purchase. MacPaw says the one-time license includes updates but not major version upgrades. Check the current price for your country before you buy.",
  },
  {
    q: "Is CleanMyMac safe?",
    a: "Cleaner apps from established developers are generally safe when they show you what they’ll remove. Whatever you choose, review the file list, keep a Time Machine backup and grant Full Disk Access only to software you trust.",
  },
  {
    q: "Why is my Mac still full after using a cleaner?",
    a: "Cleaners clear caches and junk, which is rarely where most of the space sits. Large old files, duplicates, local snapshots and iPhone backups usually take far more. A scan that lists your biggest files finds them.",
  },
  {
    q: `How is ${APP_NAME} different?`,
    a: `${APP_NAME} costs ${price} once, runs entirely on your Mac and lists every file with its size and location before it clears anything. It moves files to the Trash and adds one-click Undo. It has no free trial, but you can ask for a refund within ${REFUND_DAYS} days.`,
  },
];

const graph = [
  ...innerPageGraph({ path, name: "CleanMyMac alternatives", description, language: hreflang }),
  ...articleGraph({ path, headline: title, description, published: "2026-11-01", updated: "2026-11-01", language: hreflang, faqs }),
];

export default function CleanMyMacAlternativeGuide() {
  return (
    <GuideLayout
      market={market}
      title={title}
      intro="CleanMyMac is a popular Mac cleaner, but it isn’t the only way to clean up a Mac. Here are six alternatives, free and paid, with honest notes on what each one does well."
      breadcrumb="CleanMyMac alternatives"
      updated="2026-11-01"
      readMinutes={7}
      takeaways={[
        "People switch for price, simplicity or privacy, not because the app fails.",
        "A free stack of three tools covers basic cleanup, but it has no guided scan.",
        "Judge any cleaner on six points: price, review, undo, privacy, scope and macOS support.",
        `${APP_NAME} is a one-time, ${price} option with a review step and Undo.`,
      ]}
      toc={[
        { id: "why", label: "Why switch?" },
        { id: "criteria", label: "What to compare" },
        { id: "options", label: "The 6 options" },
        { id: "table", label: "Side by side" },
        { id: "choose", label: "Which to choose" },
        { id: "faq", label: "FAQ" },
      ]}
      related={[
        { href: cleanerPath, label: cleanerLabel },
        { href: guidePath(market, "appCleaner"), label: GUIDES.appCleaner.label },
        { href: guidePath(market, "diskAnalyzer"), label: GUIDES.diskAnalyzer.label },
        { href: "/guides/how-to-reduce-system-data-on-mac", label: "How to reduce System Data on a Mac" },
      ]}
      graph={graph}
      faqs={faqs}
      closing={`One scan, a review step and Undo. ${price} once, with a ${REFUND_DAYS}-day refund.`}
    >
      <h2 id="why">Why people look for a CleanMyMac alternative</h2>
      <p>
        CleanMyMac, from MacPaw, is one of the best-known Mac cleaners. It offers a 7-day free trial, plus
        subscription plans and a one-time purchase. Most people who search for an alternative give one of these
        reasons:
      </p>
      <ul>
        <li><strong>Cost.</strong> A subscription charges you every year, and a one-time purchase may exclude major upgrades.</li>
        <li><strong>Too much.</strong> A suite with many tools can overwhelm someone who only wants more disk space.</li>
        <li><strong>Trust.</strong> A cleaner asks for Full Disk Access, so some people prefer a smaller, simpler tool.</li>
        <li><strong>Curiosity.</strong> Some people want to see what a free tool can do before they pay.</li>
      </ul>
      <p>
        None of that makes CleanMyMac a bad choice. It makes the decision a trade-off, and this guide helps you
        weigh it.
      </p>

      <h2 id="criteria">What to compare in any Mac cleaner</h2>
      <p>Use these six checks on every tool, including this one.</p>
      <GuideTable head={["Check", "What good looks like", "Why it matters"]} rows={criteria} />

      <h2 id="options">The 6 best CleanMyMac alternatives</h2>

      <h3>1. macOS Storage settings (free, built in)</h3>
      <p>
        Open <strong>System Settings</strong>, then <strong>General</strong>, then <strong>Storage</strong>. You get a
        category breakdown, plus options such as Optimize Storage and automatic Trash emptying. It costs nothing and
        carries no risk.
      </p>
      <p>
        <strong>Best for:</strong> a first look at what fills your disk. <strong>Skip if:</strong> you need to open up
        System Data or find duplicates.
      </p>

      <h3>2. OnyX (free)</h3>
      <p>
        OnyX is a free maintenance utility that runs routine tasks and clears caches. Download the version made for your
        macOS release, and read each option before you run it, because it exposes settings that expect some
        technical knowledge.
      </p>
      <p>
        <strong>Best for:</strong> confident users who like control. <strong>Skip if:</strong> you want a simple, guided
        scan.
      </p>

      <h3>3. AppCleaner (free)</h3>
      <p>
        AppCleaner, from FreeMacSoft, removes an app along with the support files it left behind. Our guide on{" "}
        <Link href={guidePath(market, "appCleaner")}>how to use an app cleaner on Mac</Link> walks through it.
      </p>
      <p>
        <strong>Best for:</strong> uninstalling apps cleanly. <strong>Skip if:</strong> you want it to do anything else.
      </p>

      <h3>4. GrandPerspective or DaisyDisk (disk analyzers)</h3>
      <p>
        These show your disk as a map, so the biggest folders stand out at once. GrandPerspective is free or low-cost,
        depending on where you get it. DaisyDisk is paid. Both leave the deleting to you.
      </p>
      <p>
        <strong>Best for:</strong> hunting large files visually. <strong>Skip if:</strong> you want a tool that also
        clears and undoes. Read our <Link href={guidePath(market, "diskAnalyzer")}>disk space analyzer comparison</Link>{" "}
        for the details.
      </p>

      <h3>5. App Cleaner &amp; Uninstaller (paid)</h3>
      <p>
        Nektony’s App Cleaner &amp; Uninstaller is a paid tool that removes apps and manages extensions and login
        items. It is a different product from the free AppCleaner above, so check the developer and the plan before you
        buy.
      </p>
      <p>
        <strong>Best for:</strong> people who manage lots of apps. <strong>Skip if:</strong> you need a full disk
        cleanup.
      </p>

      <h3>6. {APP_NAME} ({price} once)</h3>
      <p>
        {APP_NAME} is a native Mac storage cleaner. One scan maps your whole disk and names what is inside System Data.
        It also finds large files, byte-for-byte duplicates and app leftovers. You review every item, everything goes
        to the Trash and Undo restores a whole cleanup.
      </p>
      <p>
        <strong>Best for:</strong> a guided cleanup you pay for once. <strong>Skip if:</strong> you want a free trial.
        There isn’t one, but you can request a refund within {REFUND_DAYS} days.
      </p>

      <AppCallout market={market} title="Pay once instead of every year">
        {APP_NAME} costs {price} once. Every future update is included, and one key covers the Mac and Windows
        versions.
      </AppCallout>

      <h2 id="table">All six alternatives side by side</h2>
      <GuideTable head={["Tool", "Cost", "Best at", "Limits"]} rows={compare} />

      <h2 id="choose">Which alternative should you choose?</h2>
      <ul>
        <li><strong>You want to pay nothing.</strong> Use Storage settings, AppCleaner and OnyX or GrandPerspective together.</li>
        <li><strong>You mostly uninstall apps.</strong> Use AppCleaner.</li>
        <li><strong>You want a map of your disk.</strong> Use GrandPerspective or DaisyDisk.</li>
        <li><strong>You want one guided scan, no subscription and an undo.</strong> Use {APP_NAME}.</li>
      </ul>
      <p>
        Still unsure? Our <Link href={cleanerPath}>buyer’s guide to Mac cleaner apps</Link> lists the red flags to
        avoid.
      </p>

      <h2>How to switch without losing anything</h2>
      <ol>
        <li>Cancel any subscription in the store where you bought it, so it doesn’t renew.</li>
        <li>Run a Time Machine backup before your next cleanup.</li>
        <li>Remove the old cleaner with its own uninstaller, then check <code>~/Library</code> for leftovers.</li>
        <li>Run one scan in your new tool and review the list before you clear anything.</li>
      </ol>
    </GuideLayout>
  );
}
