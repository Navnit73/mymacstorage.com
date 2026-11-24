import Link from "next/link";
import { AppCallout, GuideLayout, GuideTable } from "@/components/guide-layout";
import { Price } from "@/components/price";
import { articleGraph, innerPageGraph, pageMetadata } from "@/lib/seo";
import {
  APP_CLEANER_PATH,
  APP_NAME,
  BEST_CLEANER_PATH,
  CACHE_GUIDE_PATH,
  CLEANMYMAC_ALT_PATH,
  IS_CLEANMYMAC_SAFE_PATH,
  IS_MACKEEPER_SAFE_PATH,
  REFUND_DAYS,
  VS_CLEANMYMAC_PATH,
} from "@/lib/site";

const market = "us" as const;
const path = IS_CLEANMYMAC_SAFE_PATH;
const published = "2026-11-24";
const title = "Is CleanMyMac safe? What it touches and how to use it carefully";
const description =
  "Is CleanMyMac safe to use? A fair look at who makes it, what its cleanup removes, the permissions it asks for, billing to check and how to uninstall it.";

export const metadata = pageMetadata({
  title: "Is CleanMyMac Safe? An Honest Answer",
  description,
  path,
  type: "article",
});

const risks = [
  ["Is it malware?", "No. It comes from an established developer and is signed and notarized", "Low"],
  ["Can it delete something I need?", "Yes, if you accept every suggestion without looking", "Medium; review first"],
  ["Does it need deep access?", "It asks for Full Disk Access to scan protected folders", "Normal for cleaners"],
  ["Will I be charged later?", "Plans can renew automatically after a trial", "Check your plan"],
  ["Does it slow my Mac?", "A scan is heavy for a few minutes; background helpers use a little", "Low"],
];

const reviewList = [
  ["System Junk / caches", "Generally safe; apps rebuild caches", "Apps may open slower once"],
  ["Language files", "Safe for apps you don’t localize", "Can break some app updates or signatures"],
  ["Mail attachments", "Local copies; mail stays on the server for most accounts", "POP accounts may lose the only copy"],
  ["Large & old files", "Your own documents and media", "Check every item yourself"],
  ["iOS backups and installers", "Often large and forgotten", "Make sure you don’t need that backup"],
];

const faqs = [
  {
    q: "Is CleanMyMac a virus?",
    a: "No. CleanMyMac is made by MacPaw, an established Mac developer, and it is code-signed and notarized by Apple. Fake download sites have imitated well-known apps in the past, so download it only from MacPaw, the Mac App Store or Setapp.",
  },
  {
    q: "Can CleanMyMac damage my Mac?",
    a: "Its default cleanup targets files that are generally safe to remove, such as caches and logs. The real risk is user error: accepting large-file or attachment suggestions without reading them. Review each list and keep a backup.",
  },
  {
    q: "Why does CleanMyMac need Full Disk Access?",
    a: "macOS blocks apps from reading many folders, including Mail and some Library data, without it. A cleaner needs that access to measure and clear those folders. Grant it only to software you trust, and remove it if you uninstall the app.",
  },
  {
    q: "Is CleanMyMac safe to use on Apple silicon Macs?",
    a: "Current versions run natively on Apple silicon. As with any utility, use the latest version for your macOS release and check MacPaw’s compatibility notes after a major macOS update.",
  },
  {
    q: "Does CleanMyMac charge automatically?",
    a: "MacPaw offers a free trial, and subscription plans can renew automatically afterward. It also sells a one-time license. Check your plan and renewal date in your MacPaw account or in Apple’s subscription settings if you bought through the App Store.",
  },
  {
    q: "Do I need CleanMyMac at all?",
    a: "Not necessarily. macOS manages caches and memory well on its own, and you can free space by hand. A cleaner saves time and helps you find clutter you’d miss, which is what you’re paying for.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "Is CleanMyMac safe?", description }),
  ...articleGraph({ path, headline: title, description, published, updated: published, language: "en", faqs }),
];

export default function IsCleanMyMacSafe() {
  return (
    <GuideLayout
      market={market}
      title={title}
      intro="Short answer: yes, CleanMyMac is legitimate software from an established developer. Whether it is safe for your files depends on how you use it. Here is what it does, what it asks for and how to avoid the mistakes people actually make."
      breadcrumb="Is CleanMyMac safe?"
      updated={published}
      readMinutes={8}
      takeaways={[
        "CleanMyMac is made by MacPaw and is signed and notarized; it is not malware.",
        "Most of the risk comes from accepting suggestions without reviewing them.",
        "Full Disk Access is normal for a cleaner, so grant it only to apps you trust.",
        "Check whether your plan renews, and remove its helpers if you uninstall.",
      ]}
      toc={[
        { id: "who", label: "Who makes it" },
        { id: "reputation", label: "Its reputation" },
        { id: "touches", label: "What it touches" },
        { id: "use", label: "Use it safely" },
        { id: "uninstall", label: "Uninstall it" },
        { id: "faq", label: "FAQ" },
      ]}
      related={[
        { href: VS_CLEANMYMAC_PATH, label: `${APP_NAME} vs CleanMyMac` },
        { href: CLEANMYMAC_ALT_PATH, label: "CleanMyMac alternatives" },
        { href: IS_MACKEEPER_SAFE_PATH, label: "Is MacKeeper safe?" },
        { href: BEST_CLEANER_PATH, label: "How to choose the best Mac cleaner app" },
      ]}
      graph={graph}
      faqs={faqs}
      closing={
        <>
          Review every file before it goes, and undo any cleanup. <Price /> once, with a {REFUND_DAYS}-day refund.
        </>
      }
    >
      <h2 id="who">Who makes CleanMyMac</h2>
      <p>
        CleanMyMac is made by MacPaw, a software company based in Kyiv, Ukraine, that has built Mac apps since the late
        2000s. MacPaw also runs Setapp, a subscription bundle of Mac apps. CleanMyMac has gone through several major
        versions, and it is sold directly by MacPaw, through Setapp and on the Mac App Store.
      </p>
      <p>
        The app is code-signed and notarized, which means Apple has scanned it for known malicious content and macOS
        will open it without warnings. Notarization isn’t an endorsement, but it does rule out the most basic worry.
      </p>
      <h3>The quick risk summary</h3>
      <GuideTable head={["Question", "Answer", "Risk"]} rows={risks} />

      <h2 id="reputation">Why some people still ask whether it’s safe</h2>
      <p>Three things keep the question alive, and none of them means the app is harmful today.</p>
      <h3>Cleaner apps as a category</h3>
      <p>
        Mac cleaners have a mixed history. Some products in the 2010s used scare-style pop-ups and were labeled
        “potentially unwanted programs” by some security vendors. CleanMyMac was at times caught up in those
        broader debates about cleaners. That history is why people search the question, and it is a fair reason to
        check any cleaner before you install it. If you are weighing a different app with a more troubled past, read
        our page on <Link href={IS_MACKEEPER_SAFE_PATH}>whether MacKeeper is safe</Link>.
      </p>
      <h3>Fake downloads</h3>
      <p>
        Popular apps get imitated. Security researchers have reported fake sites offering well-known Mac apps,
        CleanMyMac among them, bundled with malware. The real app isn’t the problem; the download source is. Get it only
        from macpaw.com, the Mac App Store or Setapp.
      </p>
      <h3>“Does a Mac even need a cleaner?”</h3>
      <p>
        Many experts point out that macOS handles caches and memory well by itself. That is true, and it is a question
        of value, not safety. A cleaner saves you the time of finding clutter by hand.
      </p>

      <h2 id="touches">What CleanMyMac’s cleanup actually touches</h2>
      <p>
        CleanMyMac groups its tools differently from version to version, but the cleanup generally covers system and
        app caches, logs, language files, mail attachments, Trash bins, large and old files, and app leftovers. Recent
        versions also include malware scanning and maintenance tasks. Here is how risky each kind of cleanup is.
      </p>
      <GuideTable head={["Cleanup", "Usually", "Watch out for"]} rows={reviewList} />
      <p>
        Caches and logs are the safe end. Your own files are the risky end, because no app can know whether an old video
        matters to you. If you want to clear caches yourself, our guide on{" "}
        <Link href={CACHE_GUIDE_PATH}>how to clear cache on a Mac</Link> shows which folders are safe.
      </p>
      <h3>The permissions it asks for</h3>
      <ul>
        <li>
          <strong>Full Disk Access</strong>, so it can read protected folders. Normal for any cleaner or backup tool.
        </li>
        <li>
          <strong>An administrator password</strong>, for some system-level tasks and its helper tool.
        </li>
        <li>
          <strong>Background items</strong>, such as a menu bar helper that monitors space and memory. You can turn
          these off in <strong>System Settings</strong> under <strong>General</strong>, then{" "}
          <strong>Login Items &amp; Extensions</strong>.
        </li>
      </ul>

      <h2 id="use">How to use CleanMyMac safely</h2>
      <ol>
        <li>
          <strong>Back up first.</strong> Make sure Time Machine, or another backup, has run recently.
        </li>
        <li>
          <strong>Open each category before you clean.</strong> Every section lets you see the items it will remove.
          Spend thirty seconds there.
        </li>
        <li>
          <strong>Untick your own files.</strong> Large & old files and attachments are suggestions, not junk. Decide
          each one yourself.
        </li>
        <li>
          <strong>Be careful with language files</strong> in apps you rely on for work. Removing them can interfere with
          some apps’ updates.
        </li>
        <li>
          <strong>Skip “free up RAM”</strong> unless an app is misbehaving. macOS uses spare memory as a cache on
          purpose.
        </li>
        <li>
          <strong>Check your plan.</strong> Know whether you are on a trial, a subscription or a one-time license, and
          when it renews.
        </li>
      </ol>

      <AppCallout market={market} title="Prefer a cleaner that only does disk space?">
        {APP_NAME} scans your Mac on the device and lists caches, large files, duplicates, app leftovers, iPhone backups
        and old installers. You review every item, cleared files go to the Trash and Undo restores them. It doesn’t
        scan for malware, and there’s no free trial.
      </AppCallout>

      <h2>How to tell you have the real CleanMyMac</h2>
      <p>Since the main real-world risk is a fake download, check these before you grant any permission:</p>
      <ul>
        <li>
          <strong>Where it came from.</strong> The address bar should show macpaw.com, or the app should come from the
          Mac App Store or Setapp. Search ads can point to look-alike sites, so type the address yourself.
        </li>
        <li>
          <strong>What macOS says on first launch.</strong> A notarized app opens with the standard “downloaded from the
          internet” prompt. A warning that the app can’t be verified, or a request to right-click and choose Open to
          bypass checks, is a red flag.
        </li>
        <li>
          <strong>What it asks for.</strong> The real app asks for Full Disk Access through System Settings. Software
          that asks you to paste a command into Terminal, or for your password in an unusual dialog, is not CleanMyMac.
        </li>
        <li>
          <strong>The developer name.</strong> Select the app in Finder and press <strong>Command-I</strong>, or check
          the App Store listing. It should name MacPaw.
        </li>
      </ul>
      <p>
        If anything looks off, delete the download, change any passwords you typed into it and run a scan with a
        reputable security tool.
      </p>

      <h2 id="uninstall">How to uninstall CleanMyMac completely</h2>
      <p>
        Dragging the app to the Trash leaves its helper tools and settings behind. Follow MacPaw’s own uninstall
        instructions for your version if they exist, then check these steps.
      </p>
      <ol>
        <li>Quit CleanMyMac and its menu bar helper.</li>
        <li>
          Cancel any subscription first: in your MacPaw account if you bought directly, or in{" "}
          <strong>System Settings</strong> under your Apple Account if you bought through the App Store. Deleting the
          app doesn’t cancel billing.
        </li>
        <li>Move the app from Applications to the Trash.</li>
        <li>
          Open <strong>System Settings</strong>, then <strong>General</strong>, then{" "}
          <strong>Login Items &amp; Extensions</strong>, and remove any CleanMyMac or MacPaw entries that remain.
        </li>
        <li>
          In Finder, choose <strong>Go</strong>, then <strong>Go to Folder</strong>, enter <code>~/Library</code> and
          search for <code>MacPaw</code> and <code>CleanMyMac</code>. Move matching folders in Application Support,
          Caches, Preferences and LaunchAgents to the Trash.
        </li>
        <li>
          In <strong>Privacy &amp; Security</strong>, remove CleanMyMac from Full Disk Access.
        </li>
      </ol>
      <p>
        An app uninstaller does most of this for you. Our guide to{" "}
        <Link href={APP_CLEANER_PATH}>app cleaners for Mac</Link> explains how they find leftovers.
      </p>

      <h2>The verdict</h2>
      <p>
        CleanMyMac is safe software from a real company. Treat it like any tool with deep access: download it from an
        official source, review what it suggests, keep a backup and know what you are paying. If you mainly want disk
        space back and prefer a one-time price, compare it with alternatives in our{" "}
        <Link href={VS_CLEANMYMAC_PATH}>{APP_NAME} vs CleanMyMac comparison</Link> or the wider{" "}
        <Link href={CLEANMYMAC_ALT_PATH}>CleanMyMac alternatives guide</Link>.
      </p>
    </GuideLayout>
  );
}
