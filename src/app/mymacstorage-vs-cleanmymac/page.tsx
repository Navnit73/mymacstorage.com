import Link from "next/link";
import { AppCallout, GuideLayout, GuideTable } from "@/components/guide-layout";
import { Price } from "@/components/price";
import { articleGraph, innerPageGraph, pageMetadata } from "@/lib/seo";
import {
  APP_NAME,
  BEST_CLEANER_PATH,
  CLEANMYMAC_ALT_PATH,
  DUPLICATES_GUIDE_PATH,
  IS_CLEANMYMAC_SAFE_PATH,
  PRICE,
  REFUND_DAYS,
  SYSTEM_DATA_GUIDE_PATH,
  VS_CLEANMYMAC_PATH,
} from "@/lib/site";

const market = "us" as const;
const path = VS_CLEANMYMAC_PATH;
const published = "2026-11-24";
const title = `${APP_NAME} vs CleanMyMac: which Mac cleaner fits you?`;
const description = `${APP_NAME} vs CleanMyMac compared on price model, cleanup, safety, privacy and features, including where CleanMyMac does more. Pick the right one.`;

export const metadata = pageMetadata({
  title: `${APP_NAME} vs CleanMyMac (Honest Comparison)`,
  description,
  path,
  type: "article",
});

const overview = [
  ["Maker", "MacPaw", "Independent developer"],
  ["Price model", "Subscription plans or a one-time license", `${PRICE} once`],
  ["Free trial", "Yes, 7 days", `No; ${REFUND_DAYS}-day refund instead`],
  ["Major upgrades", "One-time license excludes them, per MacPaw", "Included"],
  ["Focus", "All-in-one suite", "Disk space only"],
];

const features = [
  ["Caches, logs and system junk", "Included", "Yes, listed file by file"],
  ["Large and old files", "Included", "Yes, biggest first"],
  ["Duplicate files", "Included", "Yes, you pick which copy stays"],
  ["App leftovers", "Included, with a full uninstaller", "Leftovers of apps you removed"],
  ["iPhone backups and old installers", "Included", "Yes, with dates and sizes"],
  ["Visual disk map", "Yes (Space Lens)", "Overview and biggest-first list"],
  ["Malware scanning", "Yes", "No"],
  ["Maintenance tasks", "Yes", "No"],
  ["App updater", "Yes", "No"],
  ["Menu bar monitor", "Yes", "No"],
  ["Review before clearing", "Per section", "Every item"],
  ["Where cleared files go", "Depends on the tool you use", "Trash, with one-click Undo"],
];

const faqs = [
  {
    q: `Is ${APP_NAME} better than CleanMyMac?`,
    a: `Not across the board. CleanMyMac does more, including malware scanning, maintenance and app updates. ${APP_NAME} is narrower: it focuses on disk space, shows every item before clearing it and costs ${PRICE} once.`,
  },
  {
    q: "Which is cheaper over time?",
    a: `A one-time ${PRICE} purchase costs less than most multi-year subscriptions. CleanMyMac also sells a one-time license, so compare MacPaw’s current price for your country with how long you expect to keep your Mac.`,
  },
  {
    q: `Does ${APP_NAME} remove malware?`,
    a: "No. It is a storage cleaner only. macOS includes built-in malware protection with XProtect, and CleanMyMac adds its own scanner if you want one.",
  },
  {
    q: "Can I try either before buying?",
    a: `CleanMyMac has a 7-day free trial with full functionality. ${APP_NAME} has no trial, but you can ask for a refund within ${REFUND_DAYS} days.`,
  },
  {
    q: "Are both safe to use?",
    a: "Both come from real developers and both show what they plan to remove. With either one, review the list before cleaning and keep a recent backup.",
  },
  {
    q: "Can I use both?",
    a: "You can, but there’s little point running two cleaners on the same Mac. Pick the one whose scope and price model fit you.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: `${APP_NAME} vs CleanMyMac`, description }),
  ...articleGraph({ path, headline: title, description, published, updated: published, language: "en", faqs }),
];

export default function VsCleanMyMac() {
  return (
    <GuideLayout
      market={market}
      title={title}
      intro={`CleanMyMac is a broad, polished suite. ${APP_NAME} is a narrow tool that does disk space and nothing else. Neither is right for everyone. This comparison is written by us, so we’ve tried hard to say where CleanMyMac is the better choice.`}
      breadcrumb={`${APP_NAME} vs CleanMyMac`}
      updated={published}
      readMinutes={7}
      takeaways={[
        "CleanMyMac does more: malware scanning, maintenance, updates and a menu bar monitor.",
        `${APP_NAME} does one job: disk space, with every item reviewed and sent to the Trash.`,
        `CleanMyMac has a free trial; ${APP_NAME} has a ${REFUND_DAYS}-day refund instead.`,
        `Pick by scope and price model: a suite you may subscribe to, or one tool for ${PRICE} once.`,
      ]}
      toc={[
        { id: "overview", label: "At a glance" },
        { id: "features", label: "Features" },
        { id: "cleanmymac-wins", label: "Where CleanMyMac wins" },
        { id: "mms-wins", label: `Where ${APP_NAME} differs` },
        { id: "pick", label: "Who should pick which" },
        { id: "faq", label: "FAQ" },
      ]}
      related={[
        { href: CLEANMYMAC_ALT_PATH, label: "CleanMyMac alternatives" },
        { href: IS_CLEANMYMAC_SAFE_PATH, label: "Is CleanMyMac safe?" },
        { href: BEST_CLEANER_PATH, label: "How to choose the best Mac cleaner app" },
        { href: SYSTEM_DATA_GUIDE_PATH, label: "How to reduce System Data on a Mac" },
      ]}
      graph={graph}
      faqs={faqs}
      closing={
        <>
          Disk space back, every item reviewed, every cleanup undoable. <Price /> once, with a {REFUND_DAYS}-day refund.
        </>
      }
    >
      <h2 id="overview">{APP_NAME} vs CleanMyMac at a glance</h2>
      <GuideTable head={["Point", "CleanMyMac", APP_NAME]} rows={overview} />
      <p>
        CleanMyMac details here reflect MacPaw’s public information when we checked in November 2026. Plans, prices and
        features change, so check MacPaw’s current price and plan terms before you decide.
      </p>

      <h2 id="features">Feature comparison</h2>
      <GuideTable head={["Feature", "CleanMyMac", APP_NAME]} rows={features} />
      <p>
        The pattern is clear: CleanMyMac covers more ground, and {APP_NAME} goes deeper on one question, “what is using
        my disk, and is it safe to remove?”
      </p>

      <h2 id="cleanmymac-wins">Where CleanMyMac is the better choice</h2>
      <h3>You want one app for everything</h3>
      <p>
        CleanMyMac bundles cleanup, malware scanning, maintenance tasks, an app uninstaller and updater, and a menu bar
        monitor. If you’d rather install one tool than several, that breadth is real value. {APP_NAME} won’t replace
        those extra tools.
      </p>
      <h3>You want to try before you pay</h3>
      <p>
        MacPaw offers a 7-day free trial with full functionality. {APP_NAME} has no trial. You can get a refund within{" "}
        {REFUND_DAYS} days, but that still means paying first.
      </p>
      <h3>You want malware scanning in your cleaner</h3>
      <p>
        macOS has built-in protection, but some people like a second scanner. CleanMyMac includes one. {APP_NAME} does
        not scan for malware at all.
      </p>
      <h3>You already have Setapp</h3>
      <p>
        CleanMyMac is part of Setapp, MacPaw’s app subscription. If you already pay for Setapp, you may already have it at
        no extra cost.
      </p>

      <h2 id="mms-wins">Where {APP_NAME} is different</h2>
      <h3>You pay once</h3>
      <p>
        {APP_NAME} costs {PRICE} once, and updates are included. CleanMyMac’s subscriptions renew, and MacPaw says its
        one-time license doesn’t include major version upgrades. Over several years of owning a Mac, that difference
        adds up.
      </p>
      <h3>You see every file before it goes</h3>
      <p>
        Each item {APP_NAME} finds shows its size and location. You tick what goes, rather than accepting a category
        total. That matters most for large files and duplicates, where only you know what is worth keeping. Our guide on{" "}
        <Link href={DUPLICATES_GUIDE_PATH}>how to find duplicate files</Link> explains why this review step matters.
      </p>
      <h3>Every cleanup can be undone</h3>
      <p>
        Cleared items move to the Trash, and a single Undo puts a whole cleanup back. Nothing is erased until you empty
        the Trash yourself.
      </p>
      <h3>It stays out of the way</h3>
      <p>
        {APP_NAME} scans on your Mac, uploads no filenames and doesn’t run a menu bar monitor. You open it when the disk
        is full and close it when you’re done.
      </p>
      <h3>It helps with the grey System Data bar</h3>
      <p>
        System Data in Storage settings is where many people get stuck. Caches, iPhone backups, old installers and app
        leftovers often make up a large share of it, and {APP_NAME} lists each of them with its size. If you want to
        tackle it by hand, see <Link href={SYSTEM_DATA_GUIDE_PATH}>how to reduce System Data on a Mac</Link>.
      </p>

      <AppCallout market={market} title="If disk space is all you need">
        {APP_NAME} lists caches, large files, duplicates, app leftovers, iPhone backups and old installers, scanned on
        your Mac. You review every item, it all goes to the Trash and Undo puts it back.
      </AppCallout>

      <h2>How a cleanup feels in each app</h2>
      <h3>CleanMyMac</h3>
      <p>
        You start a smart scan that checks cleanup, protection and performance together, then see a summary with a
        total size and a run button. You can open each section to see and untick items before you run it. It is quick
        when you trust the defaults, and the detail is there when you look for it.
      </p>
      <h3>{APP_NAME}</h3>
      <ol>
        <li>One scan maps the disk on your Mac.</li>
        <li>An overview shows what fills it, with caches, large files, duplicates, leftovers, backups and installers grouped.</li>
        <li>You open a group and tick individual items, each with its size and location.</li>
        <li>Cleared items move to the Trash, and Undo restores the whole cleanup if you change your mind.</li>
      </ol>
      <p>
        The difference is the default. CleanMyMac leads with a single action across many tools. {APP_NAME} leads with a
        list, because it only does one thing and expects you to look before anything goes. If you like to inspect
        before you act, you’ll probably prefer the second; if you want a quick, broad tidy-up, the first.
      </p>
      <h3>What neither can do</h3>
      <p>
        No cleaner can tell which of your own videos or documents matter. Large-file and duplicate results are always
        suggestions. And neither speeds up a Mac that already has plenty of free space, because macOS manages its
        caches and memory well on its own.
      </p>

      <h2 id="pick">Who should pick which</h2>
      <h3>Choose CleanMyMac if</h3>
      <ul>
        <li>You want malware scanning, maintenance and app updates in the same app as cleanup.</li>
        <li>You want a free trial before paying anything.</li>
        <li>You already subscribe to Setapp.</li>
        <li>You like a menu bar monitor that keeps an eye on space and memory.</li>
      </ul>
      <h3>Choose {APP_NAME} if</h3>
      <ul>
        <li>Your problem is a full disk, and you don’t need the other tools.</li>
        <li>You prefer one payment of {PRICE} to a renewal.</li>
        <li>You want to see every file, with its location, before anything is cleared.</li>
        <li>You want every cleanup to go to the Trash so you can undo it.</li>
      </ul>
      <h3>Choose neither if</h3>
      <p>
        Your Mac has plenty of free space and runs fine. macOS manages caches and memory well on its own. Come back to
        either tool when the storage bar fills up.
      </p>

      <h2>Safety and trust</h2>
      <p>
        Both apps need Full Disk Access to read protected folders, which is normal for cleaners. Both come from real
        developers and are signed and notarized. For a closer look at CleanMyMac in particular, read{" "}
        <Link href={IS_CLEANMYMAC_SAFE_PATH}>is CleanMyMac safe?</Link> If you want to weigh more than these two, our{" "}
        <Link href={CLEANMYMAC_ALT_PATH}>CleanMyMac alternatives guide</Link> compares free and paid options, and our{" "}
        <Link href={BEST_CLEANER_PATH}>buyer’s guide</Link> lists the red flags to watch for in any cleaner.
      </p>
    </GuideLayout>
  );
}
