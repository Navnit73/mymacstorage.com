import Link from "next/link";
import { AppCallout, GuideLayout, GuideTable } from "@/components/guide-layout";
import { Price } from "@/components/price";
import { articleGraph, innerPageGraph, pageMetadata } from "@/lib/seo";
import {
  APP_NAME,
  DOCUMENTS_GUIDE_PATH,
  EXTERNAL_DRIVE_GUIDE_PATH,
  ICLOUD_GUIDE_PATH,
  PHOTOS_GUIDE_PATH,
  PURGEABLE_GUIDE_PATH,
  REFUND_DAYS,
} from "@/lib/site";

const market = "us" as const;
const path = ICLOUD_GUIDE_PATH;
const published = "2026-11-24";
const title = "iCloud Drive taking up space on your Mac? How to keep files in the cloud";
const description =
  "iCloud Drive filling your Mac? Turn on Optimize Mac Storage, use Remove Download instead of Delete, and stop Desktop and Documents sync eating local space.";

export const metadata = pageMetadata({
  title: "iCloud Drive Taking Up Space on Mac: Fixes",
  description,
  path,
  type: "article",
});

const actions = [
  ["Remove Download", "Deletes the local copy only", "Stays in iCloud and on your other devices"],
  ["Delete / Move to Trash", "Deletes the file everywhere", "Gone from iCloud and every device after 30 days in Recently Deleted"],
  ["Keep Downloaded", "Pins the file on this Mac", "Uses local space, never removed by Optimize"],
  ["Optimize Mac Storage", "Lets macOS remove local copies when space is low", "Files stay in iCloud"],
];

const faqs = [
  {
    q: "Why is iCloud Drive taking up space on my Mac?",
    a: "iCloud Drive keeps local copies of files you have opened or added on this Mac. If Optimize Mac Storage is off, it keeps a full copy of everything. Desktop & Documents sync also counts toward it, because those folders become part of iCloud Drive.",
  },
  {
    q: "How do I remove iCloud files from my Mac without deleting them from iCloud?",
    a: "Right-click the file or folder in Finder and choose Remove Download. The local copy goes, and the file stays in iCloud with a cloud icon next to it. Don't use Move to Trash, which deletes it everywhere.",
  },
  {
    q: "Does Optimize Mac Storage delete my files?",
    a: "No. It removes the local copy of files you haven't opened recently when your Mac needs space. The originals stay in iCloud and download again when you open them, as long as you are online.",
  },
  {
    q: "Where are iCloud Drive files stored on a Mac?",
    a: "In ~/Library/Mobile Documents. Finder shows them under iCloud Drive in the sidebar. Don't move or delete things inside Mobile Documents directly; use Finder's iCloud Drive view instead.",
  },
  {
    q: "Why does iCloud Drive space show as purgeable?",
    a: "With Optimize Mac Storage on, macOS treats local copies of iCloud files as removable when space runs low. It counts that space as available, even though the files are still on your disk.",
  },
  {
    q: "What is the bird process on my Mac?",
    a: "bird is the background process that syncs iCloud Drive. High CPU or disk use from bird usually means a large upload or download is in progress. It settles once syncing finishes.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "iCloud Drive taking up space on Mac", description }),
  ...articleGraph({ path, headline: title, description, published, updated: published, language: "en", faqs }),
];

export default function ICloudDriveGuide() {
  return (
    <GuideLayout
      market={market}
      title={title}
      intro="You pay for iCloud so your files live in the cloud, yet your Mac's disk keeps filling. Usually iCloud Drive is keeping local copies. Here is how to let them go without losing a single file."
      breadcrumb="iCloud Drive using space"
      updated={published}
      readMinutes={7}
      takeaways={[
        "Turn on Optimize Mac Storage so macOS can drop local copies when space is low.",
        "Remove Download frees space now and keeps the file in iCloud.",
        "Move to Trash deletes the file from iCloud and every device. Don't use it to save space.",
        "Desktop & Documents sync puts those folders inside iCloud Drive.",
      ]}
      toc={[
        { id: "why", label: "Why it uses space" },
        { id: "optimize", label: "Optimize Mac Storage" },
        { id: "remove", label: "Remove Download" },
        { id: "desktop", label: "Desktop & Documents" },
        { id: "faq", label: "FAQ" },
      ]}
      related={[
        { href: DOCUMENTS_GUIDE_PATH, label: "How to reduce Documents storage on a Mac" },
        { href: PHOTOS_GUIDE_PATH, label: "How to reduce Photos library size on a Mac" },
        { href: PURGEABLE_GUIDE_PATH, label: "How to clear purgeable space on a Mac" },
        { href: EXTERNAL_DRIVE_GUIDE_PATH, label: "How to move files to an external drive" },
      ]}
      graph={graph}
      faqs={faqs}
      closing={
        <>
          See what is local, what is large and what you can clear. <Price /> once, with a {REFUND_DAYS}-day refund.
        </>
      }
    >
      <h2 id="why">Why iCloud Drive uses space on your Mac</h2>
      <p>
        iCloud Drive isn&rsquo;t purely online storage. It is a folder on your Mac, at{" "}
        <code>~/Library/Mobile Documents</code>, that syncs with iCloud. Any file you create, open or download in it
        has a local copy. Whether those copies stay depends on one setting.
      </p>
      <ul>
        <li>
          <strong>Optimize Mac Storage off:</strong> your Mac keeps a full copy of everything in iCloud Drive. A 200 GB
          iCloud plan can mean up to 200 GB used locally.
        </li>
        <li>
          <strong>Optimize Mac Storage on:</strong> your Mac keeps recent files and removes older local copies when it
          needs space.
        </li>
      </ul>
      <p>
        Large app folders also live in iCloud Drive. Pages, Keynote, GarageBand, Preview and third-party apps that sync
        through iCloud each keep their own folder, and their documents count too.
      </p>
      <h3>What each action does</h3>
      <GuideTable head={["Action", "What happens on this Mac", "What happens in iCloud"]} rows={actions} />

      <h2 id="optimize">Turn on Optimize Mac Storage</h2>
      <ol>
        <li>
          Open <strong>System Settings</strong> and click your name at the top of the sidebar.
        </li>
        <li>
          Click <strong>iCloud</strong>, then <strong>iCloud Drive</strong>. On some macOS versions it sits under{" "}
          <strong>Saved to iCloud</strong> or <strong>Drive</strong>.
        </li>
        <li>
          Turn on <strong>Optimize Mac Storage</strong>.
        </li>
      </ol>
      <p>
        macOS doesn&rsquo;t clear space the moment you flip the switch. It removes local copies when your disk gets
        tight, oldest-used first. Until then, that space shows as <strong>purgeable</strong>. If you need it now,
        combine this setting with Remove Download below. Our guide on{" "}
        <Link href={PURGEABLE_GUIDE_PATH}>clearing purgeable space</Link> explains why the numbers look odd in the
        meantime.
      </p>

      <h2 id="remove">Use Remove Download to free space now</h2>
      <ol>
        <li>
          Open Finder and click <strong>iCloud Drive</strong> in the sidebar.
        </li>
        <li>
          Switch to list view (<strong>Command-2</strong>) and choose <strong>View</strong>, then{" "}
          <strong>Show View Options</strong>, and tick <strong>Size</strong> and <strong>Calculate all sizes</strong>{" "}
          to find big folders.
        </li>
        <li>
          Right-click a large file or folder and choose <strong>Remove Download</strong>.
        </li>
      </ol>
      <p>
        A cloud icon appears next to the item. It still shows in Finder, still syncs and still opens with a
        double-click; it just downloads first. Removing the download of a whole folder works the same way.
      </p>
      <p>
        <strong>Don&rsquo;t press Delete or choose Move to Trash</strong> to save space. That deletes the file from
        iCloud and every device signed in to your Apple Account. Deleted iCloud files can usually be recovered from
        Recently Deleted on iCloud.com for 30 days, but it is easy to avoid needing that.
      </p>
      <h3>Keep Downloaded</h3>
      <p>
        Newer macOS versions add a <strong>Keep Downloaded</strong> option to the same menu. It pins a file or folder
        so Optimize Mac Storage never removes it. Useful for files you need offline, but check you haven&rsquo;t pinned
        large folders by accident, since pinned items can&rsquo;t free space automatically.
      </p>

      <AppCallout market={market} title="See which local files are actually big">
        {APP_NAME} scans your Mac on the device and lists large files, duplicates, caches, app leftovers, old installers
        and iPhone backups by size. Clear what you don&rsquo;t need to the Trash, and Undo puts it back. For iCloud
        files you want to keep, use Remove Download as shown above.
      </AppCallout>

      <h2 id="desktop">Desktop & Documents sync</h2>
      <p>
        When <strong>Desktop &amp; Documents Folders</strong> is on in iCloud Drive settings, your Desktop and
        Documents move into iCloud Drive. Their contents then follow the same rules: local copies stay until Optimize
        removes them or you choose Remove Download.
      </p>
      <p>Two things often surprise people:</p>
      <ul>
        <li>
          Large files saved to the Desktop sync to iCloud and use space on both your Mac and your iCloud plan.
        </li>
        <li>
          If you turn the feature off, macOS creates new empty Desktop and Documents folders on your Mac. Your files
          stay in iCloud Drive, in folders named Desktop and Documents, and you move them back by hand. Moving them back
          downloads everything, so make sure you have the space first.
        </li>
      </ul>
      <p>
        If your Documents category in Storage settings is big, our guide on{" "}
        <Link href={DOCUMENTS_GUIDE_PATH}>reducing Documents storage on a Mac</Link> walks through what usually fills
        it.
      </p>

      <h2>When iCloud seems stuck</h2>
      <p>
        iCloud Drive syncs through a background process called <code>bird</code>, with help from{" "}
        <code>cloudd</code>. If you see either using lots of CPU or disk in Activity Monitor, a large upload or download
        is usually in progress. Leave the Mac on and connected until it finishes.
      </p>
      <p>If space still won&rsquo;t free up:</p>
      <ul>
        <li>Check the progress indicator next to iCloud Drive in the Finder sidebar for files still uploading. macOS won&rsquo;t remove a local copy until the upload finishes.</li>
        <li>Make sure you have free iCloud storage. A full iCloud plan stops uploads, so local copies can&rsquo;t be released.</li>
        <li>Restart the Mac. This often unsticks sync after a big change.</li>
        <li>As a last resort, sign out of iCloud and back in. Only do this once uploads are complete, and read Apple&rsquo;s prompts carefully, since it offers to keep or remove local copies.</li>
      </ul>

      <h2>Photos and Messages are separate</h2>
      <p>
        iCloud Photos and Messages in iCloud have their own optimize settings and don&rsquo;t live in iCloud Drive. If
        your Photos library is the problem, see{" "}
        <Link href={PHOTOS_GUIDE_PATH}>how to reduce the Photos library size on a Mac</Link>. For files you want off
        both your Mac and iCloud, an external drive is cheaper per gigabyte: see{" "}
        <Link href={EXTERNAL_DRIVE_GUIDE_PATH}>how to move files to an external drive</Link>.
      </p>

      <h2>Keep local storage under control with {APP_NAME}</h2>
      <p>
        iCloud settings decide what stays local. {APP_NAME} shows what else fills your disk, in one scan on your Mac,
        for <Price /> once. Learn more on the <Link href="/">home page</Link>.
      </p>
    </GuideLayout>
  );
}
