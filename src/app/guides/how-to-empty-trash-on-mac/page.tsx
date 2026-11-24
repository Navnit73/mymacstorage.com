import Link from "next/link";
import { AppCallout, GuideLayout, GuideTable } from "@/components/guide-layout";
import { Price } from "@/components/price";
import { articleGraph, innerPageGraph, pageMetadata } from "@/lib/seo";
import {
  APP_NAME,
  DOWNLOADS_GUIDE_PATH,
  EMPTY_TRASH_GUIDE_PATH,
  GUIDE_PATH,
  MAIL_GUIDE_PATH,
  PHOTOS_GUIDE_PATH,
  PURGEABLE_GUIDE_PATH,
  REFUND_DAYS,
  SNAPSHOTS_GUIDE_PATH,
} from "@/lib/site";

const market = "us" as const;
const path = EMPTY_TRASH_GUIDE_PATH;
const published = "2026-11-24";
const title = "How to empty the Trash on a Mac, and what to do when it won't";
const description =
  "Empty the Trash on your Mac, set it to empty itself, and fix a Trash that won't empty because a file is in use, locked, or on an external drive.";

export const metadata = pageMetadata({
  title: "How to Empty Trash on Mac (and Fix It)",
  description,
  path,
  type: "article",
});

const problems = [
  ["The item is in use", "An app still has the file open", "Quit the app, or restart"],
  ["The item is locked", "Locked in Get Info", "Untick Locked, then empty"],
  ["You don't have permission", "Owned by another user or the system", "Get Info, Sharing & Permissions"],
  ["It's on an external drive", "Kept in the drive's own hidden Trash", "Connect the drive, then empty"],
  ["Space doesn't come back", "A Time Machine snapshot still holds it", "Wait a day or delete snapshots"],
];

const faqs = [
  {
    q: "How do I empty the Trash on a Mac?",
    a: "Click the Trash icon in the Dock and click Empty in the top-right corner, or choose Finder, then Empty Trash. The keyboard shortcut is Shift-Command-Delete. Emptying the Trash permanently deletes the items in it.",
  },
  {
    q: "Why can't I empty my Trash on Mac?",
    a: "Usually because a file is still open in an app, is locked, or belongs to another user. Quit open apps, untick Locked in Get Info, or restart the Mac and try again. If one item still refuses, delete it on its own.",
  },
  {
    q: "Why didn't emptying the Trash free up space?",
    a: "A Time Machine local snapshot can still hold the deleted files, so the space shows as purgeable for up to a day. The space returns when the snapshot expires, or straight away if you delete the snapshot.",
  },
  {
    q: "Can I make my Mac empty the Trash automatically?",
    a: "Yes. In Finder, choose Finder, then Settings, then Advanced, and tick Remove items from the Trash after 30 days. Storage settings offers the same option under Empty Trash Automatically.",
  },
  {
    q: "Can I recover files after emptying the Trash?",
    a: "Not from the Trash itself. You can restore them from a Time Machine backup or local snapshot if one exists. Recovery apps sometimes work, but on SSDs with TRIM the data is often gone quickly.",
  },
  {
    q: "Is it safe to empty the Trash with Terminal?",
    a: "It works, but a typo in an rm command can delete the wrong files with no undo. Use Finder first and treat Terminal as a last resort, copying the command exactly.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "Empty the Trash on Mac", description }),
  ...articleGraph({ path, headline: title, description, published, updated: published, language: "en", faqs }),
];

export default function EmptyTrashGuide() {
  return (
    <GuideLayout
      market={market}
      title={title}
      intro="Files you delete on a Mac go to the Trash and keep using space until you empty it. Usually that takes one click. Here is how to do it, how to make it automatic, and how to fix a Trash that won't empty or doesn't give the space back."
      breadcrumb="Empty the Trash"
      updated={published}
      readMinutes={6}
      takeaways={[
        "Shift-Command-Delete empties the Trash; add Option to skip the warning.",
        "Turn on Remove items from the Trash after 30 days so it never fills up.",
        "Files in use, locked files and permissions are the usual reasons it won't empty.",
        "Photos and Mail have their own trash, which the Finder Trash doesn't touch.",
      ]}
      toc={[
        { id: "empty", label: "Empty it" },
        { id: "auto", label: "Empty it automatically" },
        { id: "wont", label: "When it won't empty" },
        { id: "space", label: "No space back?" },
        { id: "faq", label: "FAQ" },
      ]}
      related={[
        { href: SNAPSHOTS_GUIDE_PATH, label: "How to delete Time Machine snapshots" },
        { href: DOWNLOADS_GUIDE_PATH, label: "How to clear Downloads on a Mac" },
        { href: PURGEABLE_GUIDE_PATH, label: "How to clear purgeable space on a Mac" },
        { href: GUIDE_PATH, label: "How to free up space on a Mac" },
      ]}
      graph={graph}
      faqs={faqs}
      closing={
        <>
          Know what&rsquo;s worth putting in the Trash in the first place. <Price /> once, with a {REFUND_DAYS}-day
          refund.
        </>
      }
    >
      <h2 id="empty">How to empty the Trash on a Mac</h2>
      <p>There are three ways, and they all do the same thing:</p>
      <ul>
        <li>
          Click the <strong>Trash</strong> in the Dock, then click <strong>Empty</strong> in the top-right corner of
          the window.
        </li>
        <li>
          Control-click the Trash icon in the Dock and choose <strong>Empty Trash</strong>.
        </li>
        <li>
          In Finder, choose <strong>Finder</strong>, then <strong>Empty Trash</strong>, or press{" "}
          <strong>Shift-Command-Delete</strong>.
        </li>
      </ul>
      <p>
        Add <strong>Option</strong> to the shortcut, <strong>Option-Shift-Command-Delete</strong>, to skip the
        confirmation. Emptying is permanent, so take a quick look inside first.
      </p>
      <h3>Delete one item without emptying everything</h3>
      <p>
        Open the Trash, select the item, Control-click it and choose <strong>Delete Immediately</strong>. You can also
        select a file anywhere in Finder and press <strong>Option-Command-Delete</strong> to skip the Trash entirely.
      </p>
      <h3>Put something back</h3>
      <p>
        Changed your mind? Control-click the item in the Trash and choose <strong>Put Back</strong>. It returns to the
        folder it came from.
      </p>

      <h2 id="auto">How to make the Trash empty itself</h2>
      <ol>
        <li>
          In Finder, choose <strong>Finder</strong>, then <strong>Settings</strong>, then <strong>Advanced</strong>.
        </li>
        <li>
          Tick <strong>Remove items from the Trash after 30 days</strong>.
        </li>
      </ol>
      <p>
        You can also turn it on from <strong>System Settings</strong>, <strong>General</strong>,{" "}
        <strong>Storage</strong>, where it appears as <strong>Empty Trash Automatically</strong> under
        Recommendations. Items still get a 30-day grace period, so you can rescue a mistake.
      </p>

      <h2 id="wont">What to do when the Trash won&rsquo;t empty</h2>
      <GuideTable head={["Problem", "Why it happens", "Fix"]} rows={problems} />

      <h3>A file is in use</h3>
      <p>
        If Finder says an item is in use, an app still has it open. Quit the app named in the message. If no app is
        named, quit apps one by one, or restart your Mac and empty the Trash straight after.
      </p>
      <p>
        Background tools such as cloud sync apps, antivirus and video players often hold files. Pausing the sync app
        usually releases them.
      </p>

      <h3>A file is locked</h3>
      <ol>
        <li>Open the Trash and select the item.</li>
        <li>
          Press <strong>Command-I</strong> to open Get Info.
        </li>
        <li>
          Untick <strong>Locked</strong> in the General section, then empty the Trash.
        </li>
      </ol>

      <h3>You don&rsquo;t have permission</h3>
      <p>
        Files from another user account or an old Mac can belong to someone else. Open Get Info, expand{" "}
        <strong>Sharing &amp; Permissions</strong>, click the lock and enter your password, then give your account{" "}
        <strong>Read &amp; Write</strong> access. Empty the Trash again.
      </p>

      <h3>Start up in safe mode</h3>
      <p>
        Safe mode loads only what macOS needs, which releases files held by login items. On a Mac with Apple silicon,
        shut down, press and hold the power button until you see startup options, select your disk, hold{" "}
        <strong>Shift</strong> and click <strong>Continue in Safe Mode</strong>. On an Intel Mac, hold{" "}
        <strong>Shift</strong> as it starts. Empty the Trash, then restart normally.
      </p>

      <h3>Last resort: Terminal</h3>
      <p>
        Terminal can delete what Finder can&rsquo;t, but it has no undo and no warning. Only use it if the steps above
        fail, and copy the command exactly:
      </p>
      <ol>
        <li>
          Open <strong>Terminal</strong> from <code>/Applications/Utilities</code>. You may need to give Terminal Full
          Disk Access in <strong>Privacy &amp; Security</strong> first.
        </li>
        <li>
          List what is in the Trash: <code>ls -la ~/.Trash</code>
        </li>
        <li>
          Delete one stuck item by name: <code>rm -rf ~/.Trash/&quot;Item name&quot;</code>
        </li>
      </ol>
      <p>
        Avoid <code>sudo</code> and wildcards unless you are sure. A stray space in an <code>rm -rf</code> command can
        delete far more than the Trash.
      </p>

      <AppCallout market={market} title="Clear the right files to begin with">
        {APP_NAME} scans your Mac on the device and lists caches, large files, duplicates, app leftovers, old installers
        and iPhone backups with their sizes. What you choose goes to the Trash, and Undo restores a whole cleanup
        before you empty it.
      </AppCallout>

      <h2>Does emptying the Trash securely erase files?</h2>
      <p>
        Older versions of macOS had a <strong>Secure Empty Trash</strong> option that overwrote files before deleting
        them. Apple removed it years ago, because overwriting doesn&rsquo;t work reliably on SSDs, and every current Mac
        uses one.
      </p>
      <p>Today, two things protect deleted files instead:</p>
      <ul>
        <li>
          <strong>FileVault.</strong> When FileVault is on, everything on the disk is encrypted, so deleted data
          can&rsquo;t be read without your password. Check it in <strong>System Settings</strong>, then{" "}
          <strong>Privacy &amp; Security</strong>, then <strong>FileVault</strong>. Macs with Apple silicon or a T2 chip
          encrypt the internal disk in hardware as well.
        </li>
        <li>
          <strong>TRIM.</strong> The SSD clears deleted blocks in the background, which is why recovery apps often find
          nothing after the Trash is emptied.
        </li>
      </ul>
      <p>
        If you&rsquo;re selling or giving away your Mac, don&rsquo;t rely on the Trash. Use{" "}
        <strong>Erase All Content and Settings</strong> in <strong>System Settings</strong>, then{" "}
        <strong>General</strong>, then <strong>Transfer or Reset</strong>, which erases the whole disk safely.
      </p>

      <h2>Trash on external drives</h2>
      <p>
        When you delete a file from an external drive, it goes to a hidden <code>.Trashes</code> folder on that drive,
        not your Mac. It appears in your Trash only while the drive is connected. To free space on the drive, connect
        it and empty the Trash before you eject it. If you eject first, Finder may ask whether to empty the Trash or
        keep the items.
      </p>

      <h2>Photos and Mail have their own trash</h2>
      <p>The Finder Trash doesn&rsquo;t cover everything you delete:</p>
      <ul>
        <li>
          <strong>Photos</strong> keeps deleted items in <strong>Recently Deleted</strong> for about 30 days. See{" "}
          <Link href={PHOTOS_GUIDE_PATH}>how to reduce your Photos library size</Link>.
        </li>
        <li>
          <strong>Mail</strong> keeps deleted messages in each account&rsquo;s Trash until you choose{" "}
          <strong>Mailbox</strong>, then <strong>Erase Deleted Items</strong>. See{" "}
          <Link href={MAIL_GUIDE_PATH}>how to reduce Mail storage on a Mac</Link>.
        </li>
        <li>
          <strong>iCloud Drive</strong> keeps deleted files in Recently Deleted on iCloud.com for 30 days, though that
          uses iCloud storage, not your Mac&rsquo;s disk.
        </li>
      </ul>

      <h2 id="space">Emptied the Trash but got no space back?</h2>
      <p>
        This is common, and nothing is wrong. Time Machine keeps hourly local snapshots of your disk. If a snapshot was
        taken while the files still existed, APFS keeps their data until that snapshot expires, usually within 24
        hours. Until then the space shows as <strong>purgeable</strong>.
      </p>
      <p>
        To get it back now, delete the snapshots. Our guide on{" "}
        <Link href={SNAPSHOTS_GUIDE_PATH}>how to delete Time Machine snapshots</Link> covers Disk Utility and Terminal,
        and <Link href={PURGEABLE_GUIDE_PATH}>how to clear purgeable space</Link> explains the rest.
      </p>

      <h2>Fill the Trash with what really matters</h2>
      <p>
        An empty Trash only helps if the right files went in. Your Downloads folder is often the easiest place to start;
        see <Link href={DOWNLOADS_GUIDE_PATH}>how to clear Downloads on a Mac</Link>. For the whole disk, {APP_NAME}{" "}
        shows what takes up room in one scan and clears it to the Trash for <Price /> once. Learn more on the{" "}
        <Link href="/">home page</Link>.
      </p>
    </GuideLayout>
  );
}
