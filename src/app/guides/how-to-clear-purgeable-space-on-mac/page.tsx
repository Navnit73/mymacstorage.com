import Link from "next/link";
import { AppCallout, GuideLayout, GuideTable } from "@/components/guide-layout";
import { Price } from "@/components/price";
import { articleGraph, innerPageGraph, pageMetadata } from "@/lib/seo";
import {
  APP_NAME,
  CACHE_GUIDE_PATH,
  GUIDE_PATH,
  IPHONE_BACKUPS_GUIDE_PATH,
  PURGEABLE_GUIDE_PATH,
  REFUND_DAYS,
  SYSTEM_DATA_GUIDE_PATH,
  UPDATE_SPACE_GUIDE_PATH,
} from "@/lib/site";

const market = "us" as const;
const path = PURGEABLE_GUIDE_PATH;
const published = "2026-11-13";
const title = "How to clear purgeable space on a Mac, and when you should leave it alone";
const description =
  "Learn what purgeable space on a Mac is, how to check it and how to clear it safely with Time Machine snapshots, iCloud settings and Terminal, when macOS won't.";

export const metadata = pageMetadata({
  title: "How to Clear Purgeable Space on Mac (Safe Methods)",
  description,
  path,
  type: "article",
});

const sources = [
  ["Time Machine local snapshots", "Hourly copies of your disk, kept for about 24 hours", "Delete in Disk Utility or with tmutil"],
  ["Optimised iCloud Drive files", "Local copies of files that also live in iCloud", "macOS removes them, or you click Remove Download"],
  ["Optimised Photos originals", "Full-size photos stored in iCloud Photos", "macOS swaps them for smaller versions"],
  ["System caches", "Files macOS can rebuild on demand", "Cleared by macOS, or by a restart"],
  ["Watched Apple TV content", "Films and shows you have already watched", "Delete in the TV app"],
];

const faqs = [
  {
    q: "What is purgeable space on a Mac?",
    a: "Purgeable space is storage that macOS can free on its own when it needs room. It holds Time Machine local snapshots, iCloud files that also exist in the cloud and caches macOS can rebuild. macOS counts it as available, even though the files are still on your disk.",
  },
  {
    q: "Is it safe to delete purgeable space?",
    a: "Yes, as long as you use the methods in this guide. Every file in purgeable space is either a copy that exists elsewhere or something macOS can rebuild. The one trade-off is Time Machine snapshots: once deleted, you can't restore files from them.",
  },
  {
    q: "Why is my purgeable space so large?",
    a: "Usually because of Time Machine local snapshots or iCloud Drive files. If you recently deleted a lot of data, a snapshot may still hold it, so the space doesn't come back until that snapshot is removed.",
  },
  {
    q: "Does restarting a Mac clear purgeable space?",
    a: "Sometimes, and only partly. A restart clears temporary files and some caches, but it doesn't remove Time Machine snapshots or optimised iCloud files. Check the number before and after to see what changed on your Mac.",
  },
  {
    q: "Why won't macOS let me use purgeable space?",
    a: "Some apps and installers check free space rather than available space. macOS only purges when something asks it to, and not every app asks. Deleting snapshots or removing iCloud downloads turns purgeable space into free space straight away.",
  },
  {
    q: "Does sudo purge clear purgeable disk space?",
    a: "No. The purge command flushes memory caches in RAM. It has nothing to do with purgeable space on your disk, despite the similar name.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "Clear purgeable space on Mac", description }),
  ...articleGraph({ path, headline: title, description, published, updated: published, language: "en", faqs }),
];

export default function PurgeableSpaceGuide() {
  return (
    <GuideLayout
      market={market}
      title={title}
      intro="Your Mac says you have space available, yet an app or a macOS update says the disk is full. The gap is usually purgeable space. Here is what it is, how to check it and how to clear it safely when macOS won't do it for you."
      breadcrumb="Clear purgeable space"
      updated={published}
      readMinutes={7}
      takeaways={[
        "Purgeable space is real storage that macOS promises to free when it needs room.",
        "Time Machine local snapshots are the biggest and most common source.",
        "You can clear snapshots in Disk Utility without opening Terminal.",
        "Most of the time, the right move is to leave purgeable space alone.",
      ]}
      toc={[
        { id: "what", label: "What it is" },
        { id: "check", label: "Check it" },
        { id: "clear", label: "5 ways to clear it" },
        { id: "leave", label: "When to leave it" },
        { id: "faq", label: "FAQ" },
      ]}
      related={[
        { href: SYSTEM_DATA_GUIDE_PATH, label: "How to reduce System Data on a Mac" },
        { href: UPDATE_SPACE_GUIDE_PATH, label: "Not enough space to update your Mac" },
        { href: CACHE_GUIDE_PATH, label: "How to clear cache on a Mac" },
        { href: GUIDE_PATH, label: "How to free up space on a Mac" },
      ]}
      graph={graph}
      faqs={faqs}
      closing={
        <>
          Turn space you can&rsquo;t touch into space you can use. <Price /> once, with a {REFUND_DAYS}-day refund.
        </>
      }
    >
      <h2 id="what">What purgeable space on a Mac actually is</h2>
      <p>
        Purgeable space is storage that holds files macOS considers optional. They are still on your disk, but macOS
        has decided it can delete them the moment something needs the room. Because of that promise, macOS adds
        purgeable space to the <strong>available</strong> figure it shows you.
      </p>
      <p>
        That is why two numbers can disagree. Storage settings may say 80 GB is available, while an installer that
        checks <strong>free</strong> space sees only 30 GB. The missing 50 GB is purgeable.
      </p>
      <h3>What fills purgeable space</h3>
      <GuideTable head={["Source", "What it is", "How it goes away"]} rows={sources} />
      <p>
        Apple says Time Machine saves a local snapshot of your startup disk about every hour and keeps it for 24 hours.
        It also keeps the snapshot of your last successful backup until space is needed. If you deleted a large folder
        this morning, a snapshot may still hold a copy, so the space doesn&rsquo;t come back yet.
      </p>

      <h2 id="check">How to check purgeable space on your Mac</h2>
      <p>Newer versions of Storage settings fold purgeable space into the available figure, so use Finder instead.</p>
      <ol>
        <li>
          Open a Finder window. If your disk isn&rsquo;t in the sidebar, choose <strong>Finder</strong>, then{" "}
          <strong>Settings</strong>, then <strong>Sidebar</strong>, and tick <strong>Hard disks</strong>.
        </li>
        <li>
          Click <strong>Macintosh HD</strong> in the sidebar and press <strong>Command-I</strong>.
        </li>
        <li>
          Read the <strong>Available</strong> line. The purgeable amount appears in brackets after it, for example{" "}
          <em>120 GB (42 GB purgeable)</em>.
        </li>
      </ol>
      <h3>Check it in Disk Utility</h3>
      <p>
        Open <strong>Disk Utility</strong> from <code>/Applications/Utilities</code> and select your startup volume. On
        most macOS versions it shows <strong>Free</strong> space separately from what Finder calls available. The
        difference between the two is roughly your purgeable space.
      </p>

      <h2 id="clear">5 ways to clear purgeable space on a Mac</h2>
      <p>Start at the top. The first method frees the most space on most Macs.</p>

      <h3>1. Delete Time Machine snapshots in Disk Utility</h3>
      <p>On macOS Monterey and later, you can see and delete snapshots without Terminal.</p>
      <ol>
        <li>
          Open <strong>Disk Utility</strong> and select your startup volume, usually <strong>Macintosh HD</strong> or{" "}
          <strong>Macintosh HD - Data</strong>.
        </li>
        <li>
          Choose <strong>View</strong>, then <strong>Show APFS Snapshots</strong>. A list appears at the bottom of the
          window.
        </li>
        <li>
          Select the snapshots whose names start with <code>com.apple.TimeMachine</code>, click the{" "}
          <strong>minus</strong> button and confirm.
        </li>
      </ol>
      <p>
        Leave snapshots named <code>com.apple.os.update</code> alone. macOS uses those during and after updates.
      </p>

      <h3>2. Delete snapshots with Terminal</h3>
      <p>If you prefer the command line, Terminal gives you the same result.</p>
      <ol>
        <li>
          List your snapshots: <code>tmutil listlocalsnapshots /</code>
        </li>
        <li>
          Delete one by its date: <code>sudo tmutil deletelocalsnapshots 2026-11-13-091500</code>
        </li>
        <li>Enter your Mac password when asked. Nothing appears as you type, which is normal.</li>
      </ol>
      <p>
        Replace the date with one from your own list. To ask macOS to thin snapshots as hard as it can in one go, run{" "}
        <code>tmutil thinlocalsnapshots / 999999999999 4</code>. Run <code>man tmutil</code> to read the options on
        your version.
      </p>
      <h4>The no-Terminal shortcut</h4>
      <p>
        Apple&rsquo;s own advice is simpler. Open <strong>System Settings</strong>, then <strong>General</strong>, then{" "}
        <strong>Time Machine</strong>, turn off automatic backups, wait a few minutes and turn them back on. macOS
        removes the local snapshots in between.
      </p>

      <h3>3. Remove local copies of iCloud Drive files</h3>
      <p>
        With <strong>Optimise Mac Storage</strong> on, iCloud Drive files you haven&rsquo;t opened in a while count as
        purgeable. To free them now, right-click a large folder in iCloud Drive and choose{" "}
        <strong>Remove Download</strong>. The files stay in iCloud and download again when you open them.
      </p>
      <p>
        Don&rsquo;t press Delete on those files. Deleting removes them from iCloud and every other device signed in to
        your Apple Account.
      </p>

      <h3>4. Restart your Mac</h3>
      <p>
        A restart clears temporary files and some system caches. It won&rsquo;t touch snapshots or iCloud files, so
        treat it as a small win. Note the purgeable figure before and after so you know what it did.
      </p>

      <h3>5. Clear caches you control</h3>
      <p>
        App and browser caches don&rsquo;t always count as purgeable, but clearing them gives macOS free space straight
        away. Our guide on <Link href={CACHE_GUIDE_PATH}>how to clear cache on a Mac</Link> shows which folders are
        safe to empty.
      </p>

      <AppCallout market={market} title="See what fills your disk, purgeable or not">
        {APP_NAME} maps your whole disk in one scan and lists caches, old installers, iPhone backups and large files
        with their sizes. Everything you clear goes to the Trash, and Undo puts it back.
      </AppCallout>

      <h2>Methods to skip</h2>
      <h3>Filling the disk with a huge file</h3>
      <p>
        An old trick is to create a giant file until macOS panics and purges, then delete it. On APFS this is
        unreliable, and running a disk to zero free space can crash apps and corrupt files mid-save. It isn&rsquo;t
        worth the risk.
      </p>
      <h3>Running sudo purge</h3>
      <p>
        Despite the name, <code>sudo purge</code> flushes memory caches in RAM. It doesn&rsquo;t free a single byte of
        purgeable disk space.
      </p>
      <h3>Apps that promise one-click purging</h3>
      <p>
        Some apps claim to clear purgeable space in one click. Under the hood, they ask macOS to thin snapshots, which
        you can do yourself for free with the methods above.
      </p>

      <h2 id="leave">When to leave purgeable space alone</h2>
      <p>
        Purgeable space isn&rsquo;t wasted. Snapshots let you recover a file you deleted by mistake an hour ago, and
        local iCloud copies open instantly. macOS frees this space by itself when Finder copies files, when you
        download large items and when most apps save.
      </p>
      <p>Clear it by hand only when one of these happens:</p>
      <ul>
        <li>A macOS update says there isn&rsquo;t enough space, even though Storage settings shows plenty.</li>
        <li>An app such as a video editor or a virtual machine tool refuses to start because the disk looks full.</li>
        <li>You deleted a lot of data and need the space back today, not tomorrow.</li>
      </ul>
      <p>
        If your update is the problem, our guide on{" "}
        <Link href={UPDATE_SPACE_GUIDE_PATH}>what to do when there isn&rsquo;t enough space to update your Mac</Link>{" "}
        covers the full fix.
      </p>

      <h2>Why purgeable space grows after you delete files</h2>
      <p>
        It feels backwards. You delete 30 GB of old videos, and available space barely moves while purgeable space
        jumps. The reason is the most recent Time Machine snapshot. It still points to those videos, so APFS keeps the
        blocks on disk until the snapshot expires.
      </p>
      <p>
        Wait a day and the snapshot ages out on its own, or delete it with method 1 or 2 above and get the space back
        now. Either way, nothing is wrong with your disk. If you back up to an external Time Machine drive, the
        videos are still in that backup after the local snapshot goes.
      </p>
      <h3>How long until macOS clears it by itself</h3>
      <p>
        Hourly snapshots normally expire after 24 hours. Optimised iCloud files and caches have no fixed timer. macOS
        removes them when free space runs low or when an app asks for room. That is why the purgeable figure can look
        stuck for weeks on a Mac with plenty of free space, and vanish within minutes on a nearly full one.
      </p>

      <h2>Purgeable space vs System Data</h2>
      <p>
        They overlap but aren&rsquo;t the same. System Data is a category in Storage settings that groups caches, logs,
        snapshots, virtual memory and other files macOS can&rsquo;t put elsewhere. Some of it is purgeable, and much of
        it isn&rsquo;t. If the grey System Data bar is your problem, read{" "}
        <Link href={SYSTEM_DATA_GUIDE_PATH}>how to reduce System Data on a Mac</Link>.
      </p>
      <p>
        If you also back up an iPhone to this Mac, check those backups next. They are rarely purgeable, and they are
        often the biggest single item on the disk. Our guide on{" "}
        <Link href={IPHONE_BACKUPS_GUIDE_PATH}>how to delete iPhone backups on a Mac</Link> walks through it.
      </p>

      <h2>Make space that stays free with {APP_NAME}</h2>
      <p>
        Purgeable space comes and goes on its own. Real free space comes from removing files you don&rsquo;t need.{" "}
        {APP_NAME} scans your Mac on the device, shows exactly what takes up room and clears it to the Trash. It costs{" "}
        <Price /> once, with no subscription. Learn more on the <Link href="/">home page</Link>.
      </p>
    </GuideLayout>
  );
}
