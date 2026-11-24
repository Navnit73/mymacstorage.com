import Link from "next/link";
import { AppCallout, GuideLayout, GuideTable } from "@/components/guide-layout";
import { Price } from "@/components/price";
import { articleGraph, innerPageGraph, pageMetadata } from "@/lib/seo";
import {
  APP_NAME,
  CHECK_STORAGE_GUIDE_PATH,
  DISK_ANALYZER_PATH,
  DOCUMENTS_GUIDE_PATH,
  GUIDE_PATH,
  LARGE_FILES_GUIDE_PATH,
  MACOS_STORAGE_GUIDE_PATH,
  PURGEABLE_GUIDE_PATH,
  REFUND_DAYS,
  SYSTEM_DATA_GUIDE_PATH,
} from "@/lib/site";

const market = "us" as const;
const path = CHECK_STORAGE_GUIDE_PATH;
const published = "2026-11-24";
const title = "How to check storage on a Mac, and why the numbers don't match";
const description =
  "Check storage on a Mac five ways: Storage settings, Finder, Disk Utility, About This Mac and Terminal. Learn what each category means and why totals differ.";

export const metadata = pageMetadata({
  title: "How to Check Storage on Mac (5 Ways)",
  description,
  path,
  type: "article",
});

const methods = [
  ["Storage settings", "Categories and recommendations", "General > Storage in System Settings"],
  ["Finder Get Info", "Exact available space, with purgeable in brackets", "Select Macintosh HD, press Command-I"],
  ["Disk Utility", "Used, free and APFS volume sizes", "Applications > Utilities > Disk Utility"],
  ["About This Mac", "A quick shortcut to Storage settings", "Apple menu > About This Mac > More Info"],
  ["Terminal", "Raw numbers and folder sizes", "df -h and du -sh"],
];

const categories = [
  ["Applications", "Apps in your Applications folders", "Uninstall apps you don't use"],
  ["Documents", "Files in your home folder that fit no other category", "Review large files and downloads"],
  ["Photos", "Your Photos library", "Optimize Mac Storage or move the library"],
  ["iCloud Drive", "Local copies of iCloud Drive files", "Remove Download on folders you rarely open"],
  ["Mail and Messages", "Mail downloads and message attachments", "Delete old attachments"],
  ["macOS", "The operating system itself", "Mostly fixed; can't be shrunk by hand"],
  ["System Data", "Caches, logs, snapshots, VMs and anything uncategorized", "Clear caches and snapshots"],
];

const faqs = [
  {
    q: "How do I see what is taking up storage on my Mac?",
    a: "Open System Settings, click General, then Storage. Hover over the colored bar to see each category, and click the info button next to a category to see the files or apps inside it.",
  },
  {
    q: "Why does my Mac show different storage numbers in different places?",
    a: "Storage settings and Finder count purgeable space as available, while Disk Utility and Terminal usually show only truly free space. Snapshots, iCloud files and caches that macOS can remove on demand make up the gap.",
  },
  {
    q: "How long does Storage settings take to calculate?",
    a: "On a fresh restart it can take a minute or more, because macOS scans and indexes the disk. If the bar stays on Calculating for a long time, wait until Spotlight indexing finishes, then reopen System Settings.",
  },
  {
    q: "How do I check the size of a folder on a Mac?",
    a: "Select the folder in Finder and press Command-I. For many folders at once, choose View, then Show View Options in a list view, and tick Calculate all sizes.",
  },
  {
    q: "How much free space should a Mac have?",
    a: "Keep at least 10 to 15 percent of the disk free, and more if you edit video or run virtual machines. macOS needs room for swap files, updates and snapshots, and a nearly full disk slows everything down.",
  },
  {
    q: "Can I check Mac storage from Terminal?",
    a: "Yes. Run df -h / to see the size, used and available space on your startup volume, and du -sh ~/* to see the size of each folder in your home folder.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "Check storage on Mac", description }),
  ...articleGraph({ path, headline: title, description, published, updated: published, language: "en", faqs }),
];

export default function CheckStorageGuide() {
  return (
    <GuideLayout
      market={market}
      title={title}
      intro="Your Mac reports storage in at least five places, and they rarely agree. Here is where to look, what each number means and which one to trust before you start deleting things."
      breadcrumb="Check storage on Mac"
      updated={published}
      readMinutes={7}
      takeaways={[
        "Storage settings in System Settings is the best starting point for most people.",
        "Finder's Get Info window shows available space with purgeable space in brackets.",
        "Different tools disagree because some count purgeable space and some don't.",
        "Terminal's du command finds which folders are actually big.",
      ]}
      toc={[
        { id: "settings", label: "Storage settings" },
        { id: "finder", label: "Finder" },
        { id: "disk-utility", label: "Disk Utility" },
        { id: "terminal", label: "Terminal" },
        { id: "categories", label: "Categories explained" },
        { id: "faq", label: "FAQ" },
      ]}
      related={[
        { href: GUIDE_PATH, label: "How to free up space on a Mac" },
        { href: SYSTEM_DATA_GUIDE_PATH, label: "How to reduce System Data on a Mac" },
        { href: LARGE_FILES_GUIDE_PATH, label: "How to find large files on a Mac" },
        { href: DISK_ANALYZER_PATH, label: "Best disk space analyzer for Mac" },
      ]}
      graph={graph}
      faqs={faqs}
      closing={
        <>
          See every gigabyte, then clear what you don&rsquo;t need. <Price /> once, with a {REFUND_DAYS}-day refund.
        </>
      }
    >
      <h2 id="settings">At a glance: five ways to check storage</h2>
      <GuideTable head={["Tool", "What it shows", "Where to find it"]} rows={methods} />
      <p>
        If you only try one, use Storage settings. If you need to know why an installer says your disk is full, use
        Finder or Disk Utility. If you want to find the folder that is actually eating your disk, use Terminal or a
        disk analyzer.
      </p>

      <h2>1. Check storage in System Settings</h2>
      <p>This is Apple&rsquo;s main storage view on macOS Ventura and later, including Sonoma, Sequoia and Tahoe.</p>
      <ol>
        <li>
          Click the <strong>Apple menu</strong> and choose <strong>System Settings</strong>.
        </li>
        <li>
          Click <strong>General</strong> in the sidebar, then <strong>Storage</strong>.
        </li>
        <li>Wait for the colored bar at the top to finish calculating. Hover over each segment to see its size.</li>
        <li>
          Scroll down to the category list. Click the <strong>info</strong> button (the small i) next to a category
          to see what is inside it.
        </li>
      </ol>
      <p>
        Below the bar, macOS shows <strong>Recommendations</strong> such as Store in iCloud, Optimize Storage and
        Empty Trash Automatically. They are safe, but read each one first. Store in iCloud, for example, keeps only
        recent files on your Mac and needs enough iCloud storage to hold the rest.
      </p>
      <h3>The About This Mac shortcut</h3>
      <p>
        Choose <strong>Apple menu</strong>, then <strong>About This Mac</strong>. On recent macOS versions, click{" "}
        <strong>More Info</strong>, then scroll to <strong>Storage</strong> and click{" "}
        <strong>Storage Settings</strong>. It opens the same screen as above. Older macOS versions showed a Storage
        tab here instead.
      </p>

      <h2 id="finder">2. Check available space in Finder</h2>
      <p>Finder gives you the most precise single number, and it shows purgeable space separately.</p>
      <ol>
        <li>
          Open a Finder window. If <strong>Macintosh HD</strong> isn&rsquo;t in the sidebar, choose{" "}
          <strong>Finder</strong>, then <strong>Settings</strong>, then <strong>Sidebar</strong>, and tick{" "}
          <strong>Hard disks</strong>.
        </li>
        <li>
          Select <strong>Macintosh HD</strong> and press <strong>Command-I</strong>.
        </li>
        <li>
          Read <strong>Capacity</strong>, <strong>Available</strong> and <strong>Used</strong>. Available may say
          something like <em>85 GB (20 GB purgeable)</em>.
        </li>
      </ol>
      <h3>Show free space at the bottom of every window</h3>
      <p>
        Choose <strong>View</strong>, then <strong>Show Status Bar</strong>. Every Finder window now shows the free
        space on the current disk in its bottom bar. It is the fastest way to watch space come back while you clean
        up.
      </p>
      <h3>Check the size of any folder</h3>
      <p>
        Select a folder and press <strong>Command-I</strong>. For a list of folders, switch to list view, choose{" "}
        <strong>View</strong>, then <strong>Show View Options</strong>, and tick <strong>Calculate all sizes</strong>.
        Click the Size column to sort biggest first.
      </p>

      <h2 id="disk-utility">3. Check storage in Disk Utility</h2>
      <p>
        Open <strong>Disk Utility</strong> from <code>/Applications/Utilities</code>, or search for it with Spotlight.
        Select your startup volume in the sidebar. The bar shows <strong>Used</strong>, <strong>Other Volumes</strong>{" "}
        and <strong>Free</strong>.
      </p>
      <p>
        Disk Utility is the place to check APFS details. Your startup disk is a container that holds several volumes:
        the sealed macOS system volume, a Data volume with your files, and smaller Preboot, Recovery and VM volumes.
        They all share one pool of free space. To see each one, choose <strong>View</strong>, then{" "}
        <strong>Show All Devices</strong>.
      </p>
      <p>
        Disk Utility usually reports free space without purgeable space, so its number is often lower than
        Finder&rsquo;s. Our guide to <Link href={PURGEABLE_GUIDE_PATH}>purgeable space on a Mac</Link> explains the
        difference.
      </p>

      <h2 id="terminal">4. Check storage in Terminal</h2>
      <p>Terminal gives you raw numbers and, more usefully, folder sizes. Open it from Applications &gt; Utilities.</p>
      <h3>See free space on the disk</h3>
      <p>
        Run <code>df -h /</code>. The <strong>Avail</strong> column shows free space on the startup volume. Because
        APFS volumes share space, the Size and Used columns can look odd. Trust Avail.
      </p>
      <h3>Find which folders are big</h3>
      <ul>
        <li>
          <code>du -sh ~/* 2&gt;/dev/null | sort -h</code> lists every folder in your home folder, smallest to largest.
        </li>
        <li>
          <code>du -sh ~/Library/* 2&gt;/dev/null | sort -h | tail -15</code> shows the 15 biggest folders inside your
          Library, where caches and app data live.
        </li>
        <li>
          <code>du -sh /Applications/* 2&gt;/dev/null | sort -h | tail -15</code> shows your largest apps.
        </li>
      </ul>
      <p>
        If Terminal reports <em>Operation not permitted</em> for some folders, give it Full Disk Access in{" "}
        <strong>System Settings</strong>, then <strong>Privacy &amp; Security</strong>, then{" "}
        <strong>Full Disk Access</strong>. These commands only read sizes; they don&rsquo;t change anything.
      </p>

      <AppCallout market={market} title="Skip the commands and see it all in one scan">
        {APP_NAME} scans your Mac on the device and lists caches, large files, duplicates, app leftovers, iPhone
        backups and old installers with their sizes and locations. Anything you clear goes to the Trash, and Undo
        puts it back.
      </AppCallout>

      <h2 id="categories">What each storage category means</h2>
      <p>Storage settings sorts your disk into categories. Here is what fills each one and where to start.</p>
      <GuideTable head={["Category", "What it holds", "First thing to try"]} rows={categories} />
      <p>
        Two categories confuse people most. <strong>macOS</strong> is the operating system and can&rsquo;t be trimmed
        by hand; see <Link href={MACOS_STORAGE_GUIDE_PATH}>why macOS takes up so much storage</Link>.{" "}
        <strong>System Data</strong> is everything macOS can&rsquo;t place elsewhere, and it is where most hidden
        space hides. Our guide on <Link href={SYSTEM_DATA_GUIDE_PATH}>reducing System Data</Link> covers it.
      </p>
      <p>
        If <strong>Documents</strong> is the biggest bar, read{" "}
        <Link href={DOCUMENTS_GUIDE_PATH}>how to reduce Documents storage on a Mac</Link>.
      </p>

      <h2>Why the numbers don&rsquo;t match</h2>
      <p>It is normal for tools to disagree by tens of gigabytes. The usual reasons:</p>
      <ul>
        <li>
          <strong>Purgeable space.</strong> Storage settings and Finder count snapshots, optimized iCloud files and some
          caches as available. Disk Utility and <code>df</code> mostly don&rsquo;t.
        </li>
        <li>
          <strong>Decimal versus binary units.</strong> macOS counts 1 GB as 1,000,000,000 bytes. Some Terminal tools
          and apps count in powers of 1,024, which makes the same disk look smaller.
        </li>
        <li>
          <strong>Timing.</strong> Storage settings caches its results. Right after you delete files, it may still show
          old numbers until you close and reopen it.
        </li>
        <li>
          <strong>Snapshots.</strong> A Time Machine local snapshot can hold on to deleted files, so space doesn&rsquo;t
          come back straight away.
        </li>
      </ul>
      <h3>Which number to trust</h3>
      <p>
        For &ldquo;can I install this update?&rdquo;, trust <strong>free</strong> space in Disk Utility, because some
        installers ignore purgeable space. For &ldquo;how full is my Mac day to day?&rdquo;, trust Finder&rsquo;s
        Available figure. For &ldquo;what should I delete?&rdquo;, look at folder sizes, not totals.
      </p>

      <h2>How often to check</h2>
      <p>
        Once a month is enough for most people. Check sooner when the Mac feels slow, when Mail or Photos complains
        about space, or before a macOS update. A disk that is more than about 90 percent full leaves little room for
        swap files and snapshots, and apps start to stall.
      </p>

      <h2>Next step: free up the space you found</h2>
      <p>
        Once you know what is big, the fix is usually quick. Our guide on{" "}
        <Link href={GUIDE_PATH}>how to free up space on a Mac</Link> lists 14 safe ways, from emptying the Trash to
        removing old iPhone backups. {APP_NAME} does the finding for you, costs <Price /> once and clears everything
        to the Trash so nothing is lost by mistake. Learn more on the <Link href="/">home page</Link>.
      </p>
    </GuideLayout>
  );
}
