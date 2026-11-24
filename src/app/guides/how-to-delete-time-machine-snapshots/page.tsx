import Link from "next/link";
import { AppCallout, GuideLayout, GuideTable } from "@/components/guide-layout";
import { Price } from "@/components/price";
import { articleGraph, innerPageGraph, pageMetadata } from "@/lib/seo";
import {
  APP_NAME,
  GUIDE_PATH,
  MACOS_STORAGE_GUIDE_PATH,
  PURGEABLE_GUIDE_PATH,
  REFUND_DAYS,
  SNAPSHOTS_GUIDE_PATH,
  SYSTEM_DATA_GUIDE_PATH,
  UPDATE_SPACE_GUIDE_PATH,
} from "@/lib/site";

const market = "us" as const;
const path = SNAPSHOTS_GUIDE_PATH;
const published = "2026-11-24";
const title = "How to delete Time Machine local snapshots on a Mac";
const description =
  "Delete Time Machine local snapshots on a Mac with Disk Utility or tmutil in Terminal. Learn which snapshots are safe to remove and which ones to leave alone.";

export const metadata = pageMetadata({
  title: "How to Delete Time Machine Snapshots on Mac",
  description,
  path,
  type: "article",
});

const kinds = [
  ["com.apple.TimeMachine.<date>.local", "Time Machine local snapshot", "Safe to delete"],
  ["com.apple.os.update-<id>", "Created by a macOS update", "Leave it; macOS removes it"],
  ["com.bombich.ccc.<id>", "Carbon Copy Cloner snapshot", "Delete in Carbon Copy Cloner"],
  ["Other app names", "Created by another backup app", "Manage in that app"],
];

const commands = [
  ["tmutil listlocalsnapshots /", "Lists Time Machine snapshots on the startup disk"],
  ["tmutil listlocalsnapshotdates /", "Lists only their dates, ready to paste"],
  ["sudo tmutil deletelocalsnapshots <date>", "Deletes one snapshot by date"],
  ["sudo tmutil deletelocalsnapshots /", "Deletes all Time Machine snapshots on the disk (recent macOS)"],
  ["tmutil thinlocalsnapshots / <bytes> <urgency>", "Asks macOS to thin snapshots to free a set amount"],
];

const faqs = [
  {
    q: "Is it safe to delete Time Machine local snapshots?",
    a: "Yes. They are extra copies kept on your Mac's own disk, and your backups on an external Time Machine drive are not touched. The only loss is the ability to restore from those snapshots while your backup drive is away.",
  },
  {
    q: "How much space do local snapshots take?",
    a: "It depends on how much changed since each snapshot. A snapshot only holds blocks that differ from the current disk, so it can be tiny, or tens of gigabytes if you recently deleted or edited big files.",
  },
  {
    q: "Why do local snapshots come back after I delete them?",
    a: "Time Machine creates a new one roughly every hour while automatic backups are on. That is expected. New snapshots start small and are thinned automatically when space runs low.",
  },
  {
    q: "Should I delete com.apple.os.update snapshots?",
    a: "No. macOS creates them during updates and removes them itself once the update settles. Deleting them by hand can interfere with an update or a rollback.",
  },
  {
    q: "Do local snapshots count as System Data or purgeable space?",
    a: "Both, in a way. Storage settings tends to put them in System Data, while Finder counts the space they hold as purgeable, because macOS can delete them when it needs room.",
  },
  {
    q: "Can I stop Time Machine from making local snapshots?",
    a: "Not separately on recent macOS. Local snapshots are made while automatic Time Machine backups are on. Turning off automatic backups stops them, but also stops your regular backups, so it is rarely a good trade.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "Delete Time Machine snapshots", description }),
  ...articleGraph({ path, headline: title, description, published, updated: published, language: "en", faqs }),
];

export default function SnapshotsGuide() {
  return (
    <GuideLayout
      market={market}
      title={title}
      intro="Time Machine quietly keeps snapshots of your disk on the Mac itself. They are useful, but they can hold tens of gigabytes after you delete big files. Here is how to see them, delete the right ones and leave the rest alone."
      breadcrumb="Delete Time Machine snapshots"
      updated={published}
      readMinutes={8}
      takeaways={[
        "Local snapshots live on your Mac's own disk, not on your backup drive.",
        "Disk Utility can list and delete them without Terminal.",
        "Only delete snapshots whose names start with com.apple.TimeMachine.",
        "Leave com.apple.os.update snapshots for macOS to remove itself.",
      ]}
      toc={[
        { id: "what", label: "What they are" },
        { id: "see", label: "See them" },
        { id: "disk-utility", label: "Disk Utility" },
        { id: "terminal", label: "Terminal" },
        { id: "other", label: "Other snapshots" },
        { id: "faq", label: "FAQ" },
      ]}
      related={[
        { href: PURGEABLE_GUIDE_PATH, label: "How to clear purgeable space on a Mac" },
        { href: SYSTEM_DATA_GUIDE_PATH, label: "How to reduce System Data on a Mac" },
        { href: UPDATE_SPACE_GUIDE_PATH, label: "Not enough space to update your Mac" },
        { href: GUIDE_PATH, label: "How to free up space on a Mac" },
      ]}
      graph={graph}
      faqs={faqs}
      closing={
        <>
          Clear snapshots, then clear what&rsquo;s really filling your disk. <Price /> once, with a {REFUND_DAYS}-day
          refund.
        </>
      }
    >
      <h2 id="what">What Time Machine local snapshots are</h2>
      <p>
        When automatic backups are on, Time Machine saves a snapshot of your startup disk about every hour. Apple says
        it keeps them for around 24 hours, and keeps the snapshot of your last successful backup until space is
        needed. The snapshots sit on the same disk as your files, separate from the backups on your external drive or
        network disk.
      </p>
      <p>
        On APFS, a snapshot doesn&rsquo;t copy your whole disk. It freezes the current state, then holds on to any
        blocks that later change or get deleted. That is why snapshots start almost empty and grow when you delete
        things. Delete a 40 GB video folder, and the newest snapshot may hold on to those 40 GB until it expires.
      </p>
      <h3>Why macOS counts them as available space</h3>
      <p>
        macOS treats snapshot space as purgeable. It will thin snapshots when an app asks for room, so Finder adds
        that space to the Available figure. The catch: some installers and apps check free space instead, see a full
        disk and stop. Our guide on <Link href={PURGEABLE_GUIDE_PATH}>purgeable space on a Mac</Link> covers that
        mismatch in depth.
      </p>

      <h2 id="see">How to see which snapshots you have</h2>
      <p>You can check without changing anything. Open Terminal from Applications &gt; Utilities and run:</p>
      <p>
        <code>tmutil listlocalsnapshots /</code>
      </p>
      <p>
        You will see lines such as <code>com.apple.TimeMachine.2026-11-24-091500.local</code>. Each one is a snapshot,
        named by the date and time it was taken. If the list is empty, Time Machine snapshots aren&rsquo;t what is
        using your space.
      </p>
      <p>To see every APFS snapshot from every app, not only Time Machine, run:</p>
      <p>
        <code>diskutil apfs listSnapshots /</code>
      </p>
      <h3>What the names mean</h3>
      <GuideTable head={["Name starts with", "What made it", "What to do"]} rows={kinds} />

      <h2 id="disk-utility">Method 1: Delete snapshots in Disk Utility</h2>
      <p>On macOS Monterey and later, Disk Utility can show and delete snapshots. No Terminal needed.</p>
      <ol>
        <li>
          Open <strong>Disk Utility</strong> from <code>/Applications/Utilities</code>.
        </li>
        <li>
          Select your startup volume in the sidebar. It is usually <strong>Macintosh HD</strong>; on some Macs you
          need <strong>Macintosh HD - Data</strong>.
        </li>
        <li>
          Choose <strong>View</strong>, then <strong>Show APFS Snapshots</strong>. A list appears at the bottom of the
          window, with each snapshot&rsquo;s name, date and private size.
        </li>
        <li>
          Select the snapshots starting with <code>com.apple.TimeMachine</code>. Hold Command to select several.
        </li>
        <li>
          Click the <strong>minus</strong> button below the list and confirm with <strong>Delete</strong>.
        </li>
      </ol>
      <p>
        The <strong>Private Size</strong> column is the useful one. It shows roughly how much space you get back by
        deleting that snapshot alone.
      </p>

      <h2 id="terminal">Method 2: Delete snapshots with tmutil in Terminal</h2>
      <GuideTable head={["Command", "What it does"]} rows={commands} />
      <h3>Delete one snapshot</h3>
      <ol>
        <li>
          Run <code>tmutil listlocalsnapshotdates /</code> to list the dates.
        </li>
        <li>
          Copy one date and run <code>sudo tmutil deletelocalsnapshots 2026-11-24-091500</code>, using your own date.
        </li>
        <li>Type your Mac password when asked. Nothing appears as you type; that is normal.</li>
        <li>
          Run <code>tmutil listlocalsnapshots /</code> again to confirm it is gone.
        </li>
      </ol>
      <h3>Delete all Time Machine snapshots at once</h3>
      <p>
        On recent macOS versions, <code>sudo tmutil deletelocalsnapshots /</code> removes every Time Machine snapshot
        on the startup disk in one go. If your version rejects that, delete them one by one, or use a short loop:
      </p>
      <p>
        <code>for d in $(tmutil listlocalsnapshotdates / | grep -E &apos;^[0-9]&apos;); do sudo tmutil deletelocalsnapshots $d; done</code>
      </p>
      <p>
        Run <code>man tmutil</code> to check what your version supports. These commands only delete Time Machine
        snapshots; they don&rsquo;t touch update snapshots or your backup drive.
      </p>
      <h3>Thin snapshots instead of deleting them</h3>
      <p>
        <code>tmutil thinlocalsnapshots / 50000000000 4</code> asks macOS to free about 50 GB by removing the oldest
        snapshots first. The last number is urgency, from 1 to 4. It is gentler than deleting everything, because
        macOS keeps the newest snapshots when it can.
      </p>

      <AppCallout market={market} title="Then see what is really filling the disk">
        Snapshots only hold on to files you already deleted. {APP_NAME} scans your Mac on the device and lists the
        caches, large files, duplicates, app leftovers, iPhone backups and old installers that are still there. It
        clears to the Trash, and Undo puts things back.
      </AppCallout>

      <h2>Method 3: Turn automatic backups off and on</h2>
      <p>This is Apple&rsquo;s own suggestion, and it needs no commands.</p>
      <ol>
        <li>
          Open <strong>System Settings</strong>, then <strong>General</strong>, then <strong>Time Machine</strong>.
        </li>
        <li>
          Click <strong>Options</strong> and set <strong>Back up frequency</strong> to <strong>Manually</strong>, or
          turn off automatic backups on older versions.
        </li>
        <li>Wait a few minutes. macOS removes the local Time Machine snapshots.</li>
        <li>Set the frequency back to automatic so your regular backups continue.</li>
      </ol>
      <p>
        Don&rsquo;t forget step 4. A Mac without automatic backups is a much bigger risk than a full disk.
      </p>

      <h2 id="other">Snapshots you should leave alone, or delete elsewhere</h2>
      <h3>macOS update snapshots</h3>
      <p>
        Names starting with <code>com.apple.os.update</code> belong to macOS. They let an update finish and give you a
        safe point to return to. macOS removes them once the update settles, usually after a restart or two. Deleting
        them by hand can cause update errors. If they seem stuck for weeks, install any pending update and restart.
        Our guide on <Link href={MACOS_STORAGE_GUIDE_PATH}>macOS taking up too much storage</Link> explains why the
        system grows after updates.
      </p>
      <h3>Carbon Copy Cloner and other backup apps</h3>
      <p>
        Carbon Copy Cloner can keep its own snapshots on your source disk, named with <code>com.bombich.ccc</code>.
        Manage them in Carbon Copy Cloner&rsquo;s snapshot settings, where you can set a retention policy or delete
        them. Other backup tools work the same way. Deleting their snapshots behind their back can confuse their next
        backup.
      </p>

      <h2>When deleting snapshots is worth it</h2>
      <ul>
        <li>
          A macOS update or installer says there isn&rsquo;t enough space, while Finder shows plenty available. See our
          guide on <Link href={UPDATE_SPACE_GUIDE_PATH}>not enough space to update</Link>.
        </li>
        <li>You deleted a lot of data and need the space now, not tomorrow.</li>
        <li>An app such as a video editor or virtual machine refuses to start because the disk looks full.</li>
      </ul>
      <p>
        Otherwise, leave them. They let you recover a file you deleted an hour ago, even with your backup drive at
        home. macOS thins them by itself when space runs low.
      </p>

      <h2>Troubleshooting</h2>
      <h3>&ldquo;Operation not permitted&rdquo; or nothing happens</h3>
      <p>
        Make sure you used <code>sudo</code> and typed your administrator password. If Terminal still can&rsquo;t act,
        give it Full Disk Access in <strong>System Settings</strong>, then <strong>Privacy &amp; Security</strong>,
        then <strong>Full Disk Access</strong>, and reopen Terminal.
      </p>
      <h3>The snapshot is deleted but the space didn&rsquo;t come back</h3>
      <p>
        Another snapshot may still hold the same data. Check the list again, including other apps&rsquo; snapshots
        with <code>diskutil apfs listSnapshots /</code>. Storage settings also caches its numbers, so close and reopen
        it, or check free space in Finder&rsquo;s Get Info window.
      </p>
      <h3>Disk Utility&rsquo;s minus button is grayed out</h3>
      <p>
        You probably selected an update snapshot, which macOS protects, or the wrong volume. Try the{" "}
        <strong>Data</strong> volume, and select only snapshots whose names start with{" "}
        <code>com.apple.TimeMachine</code>.
      </p>

      <h2>Snapshots and System Data</h2>
      <p>
        Storage settings often counts snapshot space under System Data. If that grey bar is huge, snapshots are one
        cause, but caches, logs and virtual machine files are common too. Our guide on{" "}
        <Link href={SYSTEM_DATA_GUIDE_PATH}>how to reduce System Data</Link> covers the rest.
      </p>
      <p>
        For lasting free space, remove files you don&rsquo;t need. {APP_NAME} finds them in one scan and costs{" "}
        <Price /> once, with no subscription. Learn more on the <Link href="/">home page</Link>.
      </p>
    </GuideLayout>
  );
}
