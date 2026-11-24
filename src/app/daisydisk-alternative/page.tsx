import Link from "next/link";
import { AppCallout, GuideLayout, GuideTable } from "@/components/guide-layout";
import { Price } from "@/components/price";
import { articleGraph, innerPageGraph, pageMetadata } from "@/lib/seo";
import {
  APP_NAME,
  CLEANMYMAC_ALT_PATH,
  DAISYDISK_ALT_PATH,
  DISK_ANALYZER_PATH,
  DUPLICATES_GUIDE_PATH,
  LARGE_FILES_GUIDE_PATH,
  REFUND_DAYS,
  SYSTEM_DATA_GUIDE_PATH,
} from "@/lib/site";

const market = "us" as const;
const path = DAISYDISK_ALT_PATH;
const published = "2026-11-24";
const title = "DaisyDisk alternatives: free, scriptable and clean-up tools";
const description =
  "Like DaisyDisk but want something different? Compare free visual tools, Terminal options like ncdu, and analyzers that also clean, sorted by what you need.";

export const metadata = pageMetadata({
  title: "DaisyDisk Alternatives: Free & Paid Picks",
  description,
  path,
  type: "article",
});

const byNeed = [
  ["Free, still visual", "GrandPerspective", "Treemap instead of a sunburst"],
  ["Free, plain list", "OmniDiskSweeper", "No map at all, just sizes"],
  ["Free, by file type", "Disk Inventory X", "Older; check it runs on your macOS"],
  ["Scriptable or remote", "du, ncdu or dust", "Runs over SSH and in scripts"],
  ["Nothing to install", "Storage settings", "Categories only, no folder tree"],
  ["Find and clean in one place", APP_NAME, "Paid once; no free trial"],
];

const differences = [
  ["How you see the disk", "Sunburst rings", "Treemap, list or categories, depending on the tool"],
  ["How you delete", "Drag to a collector, then delete", "Finder, Terminal or a built-in cleanup step"],
  ["What it finds for you", "Nothing; you browse", "Some tools flag duplicates, caches and leftovers"],
  ["Where it runs", "Mac app", "Mac app, Terminal or a remote shell"],
];

const faqs = [
  {
    q: "What is the best free alternative to DaisyDisk?",
    a: "GrandPerspective is the closest free match, because it also draws a visual map of your disk. If you prefer a sorted list, OmniDiskSweeper is free and very direct.",
  },
  {
    q: "Is DaisyDisk worth paying for?",
    a: "If you like its sunburst view and use it a few times a year, many people think so. If you only need to find large folders now and then, a free tool or Terminal’s du command does the same job.",
  },
  {
    q: "Is there a DaisyDisk alternative for Terminal?",
    a: "Yes. The built-in du command lists folder sizes, and ncdu adds an interactive, navigable view. You can install ncdu with Homebrew by running brew install ncdu.",
  },
  {
    q: "Does DaisyDisk find duplicates?",
    a: "No. DaisyDisk shows where space goes but does not search for duplicate files. You need a separate duplicate finder, or a tool that combines both.",
  },
  {
    q: "Why do DaisyDisk and other tools show different totals?",
    a: "They count purgeable space, local snapshots and protected folders differently. Some can’t read every folder without Full Disk Access. Compare the biggest folders rather than the exact totals.",
  },
  {
    q: `How is ${APP_NAME} different from DaisyDisk?`,
    a: `${APP_NAME} adds cleanup to the analysis. It lists caches, duplicates, app leftovers and large files for you to review, then moves what you pick to the Trash with Undo. It costs a one-time fee, with a ${REFUND_DAYS}-day refund instead of a trial.`,
  },
];

const graph = [
  ...innerPageGraph({ path, name: "DaisyDisk alternatives", description }),
  ...articleGraph({ path, headline: title, description, published, updated: published, language: "en", faqs }),
];

export default function DaisyDiskAlternatives() {
  return (
    <GuideLayout
      market={market}
      title={title}
      intro="DaisyDisk is a well-liked way to see what fills a Mac. People look elsewhere when they want something free, something that runs in Terminal, or something that does the cleanup too. Here are the alternatives, grouped by the reason you’re switching."
      breadcrumb="DaisyDisk alternatives"
      updated={published}
      readMinutes={8}
      takeaways={[
        "GrandPerspective is the closest free match if you want a visual map.",
        "du and ncdu work in Terminal, over SSH and inside scripts.",
        "DaisyDisk finds space but doesn’t flag duplicates, caches or leftovers for you.",
        "Pick the tool by the job, not by the prettiest chart.",
      ]}
      toc={[
        { id: "why", label: "Why switch" },
        { id: "free", label: "Free visual tools" },
        { id: "terminal", label: "Terminal tools" },
        { id: "clean", label: "Tools that also clean" },
        { id: "choose", label: "Which to pick" },
        { id: "faq", label: "FAQ" },
      ]}
      related={[
        { href: DISK_ANALYZER_PATH, label: "Best disk space analyzer for Mac" },
        { href: LARGE_FILES_GUIDE_PATH, label: "How to find large files on a Mac" },
        { href: DUPLICATES_GUIDE_PATH, label: "How to find duplicate files on a Mac" },
        { href: CLEANMYMAC_ALT_PATH, label: "CleanMyMac alternatives" },
      ]}
      graph={graph}
      faqs={faqs}
      closing={
        <>
          See where your space went and clear it in the same app. <Price /> once, with a {REFUND_DAYS}-day refund.
        </>
      }
    >
      <h2 id="why">Why people look for a DaisyDisk alternative</h2>
      <p>
        DaisyDisk draws your disk as a sunburst. You click into the widest slices, drag what you don’t want to a
        collector at the bottom, and delete it in one go. It is quick and pleasant to use. If you are happy with it,
        keep it.
      </p>
      <p>People who switch usually want one of four things:</p>
      <ul>
        <li><strong>No cost.</strong> They need an answer once or twice a year and don’t want to buy an app for it.</li>
        <li><strong>A different view.</strong> Rings can make small folders hard to compare. A treemap or list may read faster.</li>
        <li><strong>Terminal access.</strong> They manage servers, build machines or remote Macs, where a graphical app can’t run.</li>
        <li><strong>Help deciding.</strong> DaisyDisk shows you where space goes, but you still judge each file. Some people want a tool that flags caches, duplicates and leftovers.</li>
      </ul>
      <p>
        If you want a general comparison of every analyzer instead, read our{" "}
        <Link href={DISK_ANALYZER_PATH}>guide to disk space analyzers for Mac</Link>. This page assumes you already
        know DaisyDisk.
      </p>
      <h3>What changes when you switch</h3>
      <GuideTable head={["Point", "DaisyDisk", "Alternatives"]} rows={differences} />

      <h2 id="free">Free alternatives with a visual view</h2>

      <h3>GrandPerspective: the closest free match</h3>
      <p>
        GrandPerspective is open source and draws a treemap: every file is a rectangle, and the bigger the file, the
        bigger the rectangle. Large videos and disk images jump out immediately. It is free to download from its
        project page, and a paid version on the Mac App Store supports the developer. You open files in Finder or move
        them to the Trash from the map.
      </p>
      <p>
        <strong>Coming from DaisyDisk:</strong> treemaps show every file at once rather than one ring at a time. Some
        people find that faster for spotting a single huge file, and busier for browsing folders.
      </p>

      <h3>OmniDiskSweeper: a sorted list, no chart</h3>
      <p>
        The Omni Group’s free OmniDiskSweeper lists folders from biggest to smallest, in columns you click through like
        Finder’s column view. There is nothing to interpret. If you found DaisyDisk’s rings pretty but slow to read,
        this is the opposite approach.
      </p>

      <h3>Disk Inventory X: colors by file type</h3>
      <p>
        Disk Inventory X is a free treemap tool that colors files by type, so you can see whether video, archives or
        app data dominate. It has been around for many years and updates have been infrequent, so check that the
        current build runs on your macOS version before you rely on it.
      </p>

      <h3>Storage settings: nothing to install</h3>
      <p>
        Open <strong>System Settings</strong>, then <strong>General</strong>, then <strong>Storage</strong>. You get
        categories such as Applications, Documents and System Data, plus recommendations. It won’t show a folder tree,
        and System Data stays a single number, but it costs nothing and needs no permissions. For that grey bar, see{" "}
        <Link href={SYSTEM_DATA_GUIDE_PATH}>how to reduce System Data on a Mac</Link>.
      </p>

      <h2 id="terminal">Terminal alternatives: du, ncdu and dust</h2>
      <p>
        If you work over SSH, maintain build machines or simply prefer the keyboard, these tools do DaisyDisk’s core
        job without a window. Give Terminal <strong>Full Disk Access</strong> in{" "}
        <strong>System Settings</strong> under <strong>Privacy &amp; Security</strong> first, or protected folders
        report “Operation not permitted”.
      </p>

      <h3>du: built in, everywhere</h3>
      <p>Every Mac already has it. To see the 15 largest items in your home folder:</p>
      <p>
        <code>du -sh ~/* ~/.[!.]* 2&gt;/dev/null | sort -h | tail -15</code>
      </p>
      <p>
        The second pattern includes hidden folders such as <code>~/.docker</code> or <code>~/.cache</code>, which Finder
        hides and which often hold developer data. Change into the biggest folder and run it again to drill down. Add{" "}
        <code>-x</code> to stay on one volume.
      </p>

      <h3>ncdu: an interactive view in Terminal</h3>
      <p>
        ncdu scans a folder, then lets you move through it with the arrow keys, sorted by size. Press <strong>d</strong>{" "}
        to delete the selected item, after a confirmation. Install it with Homebrew:
      </p>
      <ol>
        <li>
          Run <code>brew install ncdu</code>.
        </li>
        <li>
          Run <code>ncdu ~</code> to scan your home folder, or <code>ncdu -x /</code> for the whole startup volume.
        </li>
        <li>Use the arrow keys to browse and <strong>q</strong> to quit.</li>
      </ol>
      <p>
        Deleting in ncdu is permanent and skips the Trash, so treat <strong>d</strong> with care.
      </p>

      <h3>dust: a quick tree summary</h3>
      <p>
        dust prints a compact tree of the largest folders with bars showing their share, in a single command. Install it
        with <code>brew install dust</code> and run <code>dust ~</code>. It suits a quick look rather than browsing.
      </p>
      <h3>Why Terminal tools suit some people better</h3>
      <ul>
        <li>They run over SSH on a Mac you can’t see.</li>
        <li>You can put them in a script, for example to report the biggest folders on build machines every week.</li>
        <li>They cost nothing and are easy to inspect.</li>
      </ul>

      <h2 id="clean">Alternatives that also clean</h2>
      <p>
        DaisyDisk leaves the judgment to you. That works well for your own files, but less well inside{" "}
        <code>~/Library</code>, where folder names don’t say whether something is safe to remove. A cleaner that knows
        what caches, duplicates and app leftovers look like saves that research.
      </p>
      <h3>{APP_NAME}</h3>
      <p>
        {APP_NAME} scans your Mac on the device and combines two views: a biggest-first list of files and folders, and
        ready-made groups of caches, duplicates, app leftovers, iPhone backups and old installers. Every item shows its
        size and location before you clear it. Cleared items go to the Trash, and Undo puts them back.
      </p>
      <p>
        It is a one-time purchase with no free trial, and you can ask for a refund within {REFUND_DAYS} days. It does
        not scan for malware.
      </p>
      <h3>All-in-one suites</h3>
      <p>
        Larger suites such as CleanMyMac combine disk maps with maintenance, uninstalling and other tools. If that
        breadth appeals, our <Link href={CLEANMYMAC_ALT_PATH}>CleanMyMac alternatives guide</Link> compares the options.
      </p>

      <AppCallout market={market} title="Like DaisyDisk, plus the cleanup">
        {APP_NAME} lists your largest files and flags duplicates, caches and leftovers, so you aren’t guessing what is
        safe. Everything goes to the Trash first, and nothing leaves your Mac.
      </AppCallout>

      <h2 id="choose">Which DaisyDisk alternative should you pick?</h2>
      <GuideTable head={["What you want", "Pick", "Trade-off"]} rows={byNeed} />
      <h3>A sensible combination</h3>
      <p>
        Many people end up with two tools: a visual or Terminal analyzer to find big personal files, and something that
        handles <code>~/Library</code> clutter and duplicates. Our guides on{" "}
        <Link href={LARGE_FILES_GUIDE_PATH}>finding large files</Link> and{" "}
        <Link href={DUPLICATES_GUIDE_PATH}>finding duplicate files</Link> show the manual routes for both.
      </p>

      <h2>Before you delete anything</h2>
      <ul>
        <li>Make sure Time Machine, or another backup, has run recently.</li>
        <li>Delete from your home folder freely; leave <code>/System</code> and the top-level <code>/Library</code> alone.</li>
        <li>Prefer tools that use the Trash, so you can change your mind.</li>
        <li>
          Expect available space to lag. A local Time Machine snapshot can hold deleted files for up to a day.
        </li>
      </ul>
      <p>
        Whichever tool you pick, the goal is the same: find the few folders that hold most of the space and deal with
        them. Learn more about {APP_NAME} on the <Link href="/">home page</Link>.
      </p>
    </GuideLayout>
  );
}
