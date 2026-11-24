import Link from "next/link";
import { AppCallout, GuideLayout, GuideTable } from "@/components/guide-layout";
import { articleGraph, innerPageGraph, pageMetadata } from "@/lib/seo";
import { APP_NAME, GUIDES, MARKETS, REFUND_DAYS, guideAlternates, guidePath } from "@/lib/site";

const market = "us" as const;
const { hreflang, price, cleanerPath, cleanerLabel } = MARKETS[market];
const key = "diskAnalyzer";
const path = guidePath(market, key);
const title = "Best disk space analyzer for Mac: 6 tools compared";
const description =
  "Find out what fills your Mac. Compare DaisyDisk, GrandPerspective, Disk Inventory X, OmniDiskSweeper and more, then clean up what you find without guesswork.";

export const metadata = pageMetadata({
  title: "Best Disk Space Analyzer for Mac: 6 Tools",
  description,
  path,
  type: "article",
  hreflang,
  alternates: guideAlternates(market, key),
});

const views = [
  ["Sunburst", "Rings of folders, with the biggest as the widest slice", "DaisyDisk"],
  ["Treemap", "Nested blocks, where block size shows file size", "GrandPerspective, Disk Inventory X"],
  ["Sorted list", "Files and folders ranked from largest to smallest", "OmniDiskSweeper"],
];

const tools = [
  ["Storage settings", "Free, built in", "Categories", "No folder-level detail"],
  ["DaisyDisk", "Paid", "Sunburst map", "Analyzes only"],
  ["GrandPerspective", "Free or low-cost", "Treemap", "Analyzes only"],
  ["Disk Inventory X", "Free", "Treemap with file-type colors", "Development has slowed"],
  ["OmniDiskSweeper", "Free", "Sorted list", "No visual map"],
  [APP_NAME, `${price} once`, "Overview, biggest-first list, cleanup", "No free trial"],
];

const faqs = [
  {
    q: "What is the best disk space analyzer for Mac?",
    a: `It depends on how you like to look at data. DaisyDisk and GrandPerspective show a visual map, and OmniDiskSweeper shows a plain sorted list. ${APP_NAME} adds cleanup with a review step and Undo, so you can act on what you find.`,
  },
  {
    q: "Is there a free disk space analyzer for Mac?",
    a: "Yes. OmniDiskSweeper and Disk Inventory X are free, GrandPerspective is free or low-cost, and Storage settings is built in. Terminal’s du command also works if you’re comfortable with it.",
  },
  {
    q: "Is there a WizTree for Mac?",
    a: `WizTree runs only on Windows. On a Mac, GrandPerspective and Disk Inventory X give a similar treemap view, and ${APP_NAME} adds a fast scan, cleanup tools and a license that also covers Windows.`,
  },
  {
    q: "Is it safe to delete what a disk analyzer shows?",
    a: "Only after you know what each item is. Delete your own large files freely. Leave system folders, and anything you don’t recognize, alone. Move files to the Trash rather than deleting them outright.",
  },
  {
    q: "Why does my Mac show different sizes in different tools?",
    a: "Tools count space in different ways. Some include purgeable space and local snapshots, and some skip protected folders unless you grant Full Disk Access. Compare the biggest folders, not the exact totals.",
  },
  {
    q: "Do disk analyzers slow my Mac?",
    a: "A scan reads many files, so it uses your disk heavily for a few minutes. Your Mac may feel slower while it runs, then it returns to normal.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "Mac disk space analyzer", description, language: hreflang }),
  ...articleGraph({ path, headline: title, description, published: "2026-11-01", updated: "2026-11-01", language: hreflang, faqs }),
];

export default function DiskAnalyzerGuide() {
  return (
    <GuideLayout
      market={market}
      title={title}
      intro="Storage settings tells you your disk is full, but not which folder fills it. A disk space analyzer for Mac shows you, so you clear the right files first."
      breadcrumb="Mac disk space analyzer"
      updated="2026-11-01"
      readMinutes={7}
      takeaways={[
        "Analyzers show where the space went. Cleaners remove it. Most tools do only one.",
        "Pick a view you like: a sunburst, a treemap or a plain sorted list.",
        "Free options work well. DaisyDisk is paid, and GrandPerspective is free or low-cost.",
        `${APP_NAME} combines the map, the biggest-first list and a cleanup you can undo.`,
      ]}
      toc={[
        { id: "what", label: "What it does" },
        { id: "tools", label: "The 6 tools" },
        { id: "compare", label: "Compared" },
        { id: "read", label: "Read your results" },
        { id: "free", label: "Free method" },
        { id: "faq", label: "FAQ" },
      ]}
      related={[
        { href: cleanerPath, label: cleanerLabel },
        { href: guidePath(market, "cleanMyMacAlternative"), label: GUIDES.cleanMyMacAlternative.label },
        { href: guidePath(market, "clearRam"), label: GUIDES.clearRam.label },
        { href: "/guides/how-to-find-large-files-on-mac", label: "How to find large files on a Mac" },
      ]}
      graph={graph}
      faqs={faqs}
      closing={`See where your space went, then clear it. ${price} once, with a ${REFUND_DAYS}-day refund.`}
    >
      <h2 id="what">What a disk space analyzer does</h2>
      <p>
        A disk space analyzer scans your drive and shows how much space each folder and file uses. Storage settings
        stops at categories such as Documents and System Data. An analyzer opens those categories, so you see the one
        folder that holds 40 GB.
      </p>
      <p>Most analyzers show your disk in one of three ways:</p>
      <GuideTable head={["View", "How it looks", "Found in"]} rows={views} />
      <h3>Analyzers find, cleaners clear</h3>
      <p>
        Most analyzers only show you the problem. You delete files yourself in Finder. A cleaner removes files for you,
        which is faster but needs more trust. A tool that does both, with a review step, saves the most time.
      </p>

      <h2 id="tools">The 6 best disk space analyzers for Mac</h2>

      <h3>1. Storage settings (built in)</h3>
      <p>
        Open <strong>System Settings</strong>, then <strong>General</strong>, then <strong>Storage</strong>. It gives you
        categories and recommendations at no cost. It doesn’t show individual folders, so use it as a starting point.
      </p>

      <h3>2. DaisyDisk (paid)</h3>
      <p>
        DaisyDisk draws your disk as a sunburst of rings. You click through folders and drag items to a collector before
        you delete them. Reviewers find it fast and easy to read. Check its page for the current price.
      </p>

      <h3>3. GrandPerspective (free or low-cost)</h3>
      <p>
        GrandPerspective draws a treemap, where each block’s size matches a file’s size. It is open source, and people
        often recommend it as the closest free match to DaisyDisk. The price depends on where you download it, so check
        before you buy.
      </p>

      <h3>4. Disk Inventory X (free)</h3>
      <p>
        Disk Inventory X is a free treemap tool that colors blocks by file type, so you see at a glance whether video,
        disk images or archives dominate. Development has slowed, so confirm it works on your macOS version first.
      </p>

      <h3>5. OmniDiskSweeper (free)</h3>
      <p>
        OmniDiskSweeper skips the pictures and gives you a sorted list, from the biggest files and folders down. It
        suits people who want an answer, not a visualization.
      </p>

      <h3>6. {APP_NAME} ({price} once)</h3>
      <p>
        {APP_NAME} is a native Mac storage cleaner and disk space analyzer. One scan maps your whole drive, hidden
        folders included, and its Space tool lists your biggest files and folders first. Then you can clear what you
        don’t need, with everything going to the Trash and Undo ready.
      </p>

      <AppCallout market={market} title="Find it and clear it in one app">
        {APP_NAME} scans your disk, names what sits inside System Data and finds duplicates and app leftovers. You
        review every item first, and nothing leaves your Mac.
      </AppCallout>

      <h2 id="compare">All six tools compared</h2>
      <GuideTable head={["Tool", "Cost", "View", "Limits"]} rows={tools} />

      <h2 id="read">How to read your results and decide what to delete</h2>
      <p>Whatever tool you use, follow this order. It keeps risk low and the gains high.</p>
      <ol>
        <li><strong>Start with your biggest folders.</strong> The top three usually hold most of the space.</li>
        <li><strong>Open your home folder first.</strong> Downloads, Movies and Documents hold files you can judge yourself.</li>
        <li><strong>Check <code>~/Library</code> next.</strong> Caches, app support files and old iPhone backups often fill it.</li>
        <li><strong>Leave system folders alone.</strong> Never delete from <code>/System</code> or the top-level <code>/Library</code>.</li>
        <li><strong>Move, don’t erase.</strong> Use the Trash, and empty it only when you’re sure.</li>
      </ol>
      <h3>Common space hogs</h3>
      <p>
        Old video exports, disk images (<code>.dmg</code> files), iPhone backups, virtual machines, game libraries and
        Xcode data take the most space. Our guide on{" "}
        <Link href="/guides/how-to-find-large-files-on-mac">how to find large files on a Mac</Link> goes deeper.
      </p>

      <h2 id="free">Analyze disk space for free with Terminal</h2>
      <p>If you’re comfortable with Terminal, you don’t need any extra software to see your largest folders.</p>
      <ol>
        <li>Open Terminal and type <code>cd</code>, followed by a space.</li>
        <li>Drag the folder you want to check into the window, then press <strong>Return</strong>.</li>
        <li>Run <code>du -sh * | sort -h | tail -10</code>.</li>
      </ol>
      <p>
        Terminal lists the 10 largest items in that folder. Repeat the steps inside the biggest one to drill down. If
        you see “Operation not permitted”, turn on Full Disk Access for Terminal in{" "}
        <strong>System Settings</strong>, under <strong>Privacy &amp; Security</strong>.
      </p>

      <h2>Which analyzer should you pick?</h2>
      <ul>
        <li><strong>You want a pretty map.</strong> Choose DaisyDisk or GrandPerspective.</li>
        <li><strong>You want a plain list.</strong> Choose OmniDiskSweeper.</li>
        <li><strong>You want it free and don’t mind an older tool.</strong> Choose Disk Inventory X.</li>
        <li><strong>You want to find and clear in one place.</strong> Choose {APP_NAME}.</li>
      </ul>
      <p>
        Not sure whether you need a cleaner too? Read{" "}
        <Link href={cleanerPath}>how to choose the best Mac cleaner app</Link>, or see how it compares in our{" "}
        <Link href={guidePath(market, "cleanMyMacAlternative")}>CleanMyMac alternatives guide</Link>.
      </p>
    </GuideLayout>
  );
}
