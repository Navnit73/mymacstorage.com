import Link from "next/link";
import { AppCallout, GuideLayout, GuideTable } from "@/components/guide-layout";
import { Price } from "@/components/price";
import { articleGraph, innerPageGraph, pageMetadata } from "@/lib/seo";
import {
  APP_NAME,
  DUPLICATES_GUIDE_PATH,
  EXTERNAL_DRIVE_GUIDE_PATH,
  GUIDE_PATH,
  ICLOUD_GUIDE_PATH,
  PHOTOS_GUIDE_PATH,
  REFUND_DAYS,
  SNAPSHOTS_GUIDE_PATH,
} from "@/lib/site";

const market = "us" as const;
const path = PHOTOS_GUIDE_PATH;
const published = "2026-11-24";
const title = "How to reduce your Photos library size on a Mac";
const description =
  "Shrink a huge Photos library on your Mac: turn on Optimize Mac Storage, empty Recently Deleted, merge duplicates, cut big videos or move it to a drive.";

export const metadata = pageMetadata({
  title: "Reduce Photos Library Size on Mac",
  description,
  path,
  type: "article",
});

const methods = [
  ["Optimize Mac Storage", "Often the most, if you use iCloud Photos", "Originals stay in iCloud and download on demand"],
  ["Empty Recently Deleted", "Whatever you deleted in the last month", "Permanent once emptied"],
  ["Merge duplicates", "Depends on how often you imported twice", "Photos keeps the best copy and merges metadata"],
  ["Delete long videos", "Large, since video is the heaviest media", "Permanent after Recently Deleted empties"],
  ["Move the library to a drive", "All of it", "The drive must be connected to use Photos"],
];

const faqs = [
  {
    q: "Why is my Photos library so big on my Mac?",
    a: "Usually because the Mac stores full-size originals of every photo and video. Videos, especially 4K and slow-motion clips, take far more room than photos. Items in Recently Deleted also still count until that album is emptied.",
  },
  {
    q: "Does Optimize Mac Storage delete my photos?",
    a: "No. It keeps the full-size originals in iCloud and stores smaller versions on your Mac. When you open or export a photo, Photos downloads the original. You need iCloud Photos turned on, and enough iCloud storage for the whole library.",
  },
  {
    q: "Can I delete the Photos Library file in Finder?",
    a: "Only if you have a complete copy elsewhere and don't want it on this Mac any more. Deleting the library in Finder removes every photo it holds that isn't already in iCloud or a backup. Never delete individual files inside the library package, because that corrupts it.",
  },
  {
    q: "How do I find large videos in Photos?",
    a: "Open Media Types, then Videos, in the sidebar. Photos can't sort by file size, so use length as a guide: long and 4K clips are the heaviest. Press Command-I on a video to see its dimensions and file size.",
  },
  {
    q: "Is it safe to keep my Photos library on an external drive?",
    a: "Yes, if the drive is formatted as APFS or Mac OS Extended and you back it up. Avoid network drives and drives formatted as exFAT. Photos needs the drive connected to open the library.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "Reduce Photos library size on Mac", description }),
  ...articleGraph({ path, headline: title, description, published, updated: published, language: "en", faqs }),
];

export default function PhotosLibraryGuide() {
  return (
    <GuideLayout
      market={market}
      title={title}
      intro="On many Macs the Photos library is the biggest single item on the disk. You don't have to delete memories to shrink it. Here is how to see its size, cut what you don't need and move the rest off your internal drive."
      breadcrumb="Reduce Photos library size"
      updated={published}
      readMinutes={8}
      takeaways={[
        "Optimize Mac Storage is the biggest win if you already use iCloud Photos.",
        "Deleted photos stay in Recently Deleted for about 30 days and still use space.",
        "The Duplicates album merges copies without losing edits or metadata.",
        "You can move the whole library to an external drive and keep using it.",
      ]}
      toc={[
        { id: "check", label: "Check its size" },
        { id: "methods", label: "6 ways to shrink it" },
        { id: "move", label: "Move it to a drive" },
        { id: "shared", label: "Shared Library" },
        { id: "faq", label: "FAQ" },
      ]}
      related={[
        { href: ICLOUD_GUIDE_PATH, label: "iCloud Drive taking up space on a Mac" },
        { href: EXTERNAL_DRIVE_GUIDE_PATH, label: "How to move files to an external drive" },
        { href: DUPLICATES_GUIDE_PATH, label: "How to find duplicate files on a Mac" },
        { href: GUIDE_PATH, label: "How to free up space on a Mac" },
      ]}
      graph={graph}
      faqs={faqs}
      closing={
        <>
          Find what else fills your disk after Photos. <Price /> once, with a {REFUND_DAYS}-day refund.
        </>
      }
    >
      <h2 id="check">How big is your Photos library?</h2>
      <p>
        Your library is a single package file, usually at <code>~/Pictures/Photos Library.photoslibrary</code>. To see
        its size:
      </p>
      <ol>
        <li>
          Open Finder and choose <strong>Go</strong>, then <strong>Home</strong>, then open <strong>Pictures</strong>.
        </li>
        <li>
          Select <strong>Photos Library</strong> and press <strong>Command-I</strong>.
        </li>
        <li>
          Read the <strong>Size</strong> line. Large libraries can take a minute to calculate.
        </li>
      </ol>
      <p>
        You can also open <strong>System Settings</strong>, then <strong>General</strong>, then{" "}
        <strong>Storage</strong>. The <strong>Photos</strong> row shows roughly the same figure. If it shows tens or
        hundreds of gigabytes, the steps below are worth your time.
      </p>
      <p>
        Don&rsquo;t open the package with <strong>Show Package Contents</strong> and delete files inside it. Photos
        tracks every file in its database, and removing them by hand can corrupt the library.
      </p>

      <h2 id="methods">6 ways to reduce your Photos library size</h2>
      <GuideTable head={["Method", "Space it frees", "Trade-off"]} rows={methods} />

      <h3>1. Turn on Optimize Mac Storage</h3>
      <p>
        If you use iCloud Photos, this is the biggest single win. Photos keeps the full-size originals in iCloud and
        stores smaller versions on your Mac.
      </p>
      <ol>
        <li>
          Open Photos and choose <strong>Photos</strong>, then <strong>Settings</strong>, then <strong>iCloud</strong>.
        </li>
        <li>
          Make sure <strong>iCloud Photos</strong> is on, then select <strong>Optimize Mac Storage</strong>.
        </li>
      </ol>
      <p>
        Photos doesn&rsquo;t swap originals out straight away. It frees space gradually, and faster when your disk runs
        low. The catch: your iCloud plan must be large enough for the whole library, and you need an internet
        connection to open a full-size original.
      </p>

      <h3>2. Empty Recently Deleted</h3>
      <p>
        Deleting a photo moves it to <strong>Recently Deleted</strong>, where it stays for about 30 days. Until then,
        it still uses space.
      </p>
      <ol>
        <li>
          Click <strong>Recently Deleted</strong> in the sidebar. On recent macOS versions it sits under{" "}
          <strong>Utilities</strong>, and you may need Touch ID or your password to view it.
        </li>
        <li>
          Click <strong>Delete All</strong>, or select items and click <strong>Delete</strong>.
        </li>
      </ol>
      <p>This is permanent. With iCloud Photos on, it also removes the items from every device.</p>

      <h3>3. Merge duplicates</h3>
      <p>
        Photos finds exact and near-exact copies for you. Click <strong>Duplicates</strong> under{" "}
        <strong>Utilities</strong> in the sidebar. If the album isn&rsquo;t there, Photos either hasn&rsquo;t finished
        scanning or found none. Review each pair, then click <strong>Merge</strong>. Photos keeps the highest-quality
        copy, combines keywords, captions and album membership, and moves the rest to Recently Deleted.
      </p>
      <p>
        Duplicates outside the library, such as the same photo saved in Downloads and Desktop, need a different
        approach. Our guide on <Link href={DUPLICATES_GUIDE_PATH}>how to find duplicate files on a Mac</Link> covers
        them.
      </p>

      <h3>4. Delete large videos you don&rsquo;t need</h3>
      <p>
        A minute of 4K video can take more space than hundreds of photos. Click <strong>Videos</strong> under{" "}
        <strong>Media Types</strong> in the sidebar. Photos can&rsquo;t sort by file size, so look for long clips,
        accidental recordings and screen recordings. Select a video and press <strong>Command-I</strong> to see its
        size.
      </p>
      <p>
        To keep a running list of videos, choose <strong>File</strong>, then <strong>New Smart Album</strong>, and set
        the condition to <strong>Photo</strong> <strong>is</strong> <strong>Movie</strong>. You can add a date
        condition to find old clips you have already shared or backed up.
      </p>

      <h3>5. Clear out screenshots, bursts and imports</h3>
      <p>
        <strong>Screenshots</strong> and <strong>Bursts</strong> both appear under <strong>Media Types</strong>. For a
        burst, open it and keep only the frames you want. Also check <strong>Imports</strong> under Utilities for
        batches you imported twice, or from a card you also copied to Finder.
      </p>

      <h3>6. Remove extra libraries</h3>
      <p>
        If you once created a second library or upgraded from iPhoto, an old library may still sit in{" "}
        <code>~/Pictures</code>. Hold <strong>Option</strong> while opening Photos to see every library it knows
        about. Open the old one, check its photos also exist in your main library, then quit Photos and move the old
        library to the Trash.
      </p>

      <AppCallout market={market} title="See what else fills your disk">
        Photos is rarely the only problem. {APP_NAME} scans your Mac on the device and lists caches, large files,
        duplicates, app leftovers, old installers and iPhone backups with their sizes. Everything goes to the Trash,
        and Undo puts it back.
      </AppCallout>

      <h2 id="move">How to move your Photos library to an external drive</h2>
      <p>
        If you want every original on hand but don&rsquo;t have room for it, move the whole library. This frees all of
        its space on your internal disk.
      </p>
      <ol>
        <li>Back up your Mac with Time Machine, or make sure iCloud Photos has finished uploading.</li>
        <li>
          Connect a drive formatted as <strong>APFS</strong> or <strong>Mac OS Extended (Journaled)</strong>. Photos
          can&rsquo;t use exFAT or network drives for a library.
        </li>
        <li>Quit Photos.</li>
        <li>
          Drag <strong>Photos Library</strong> from <code>~/Pictures</code> to the drive and wait for the copy to
          finish.
        </li>
        <li>
          Hold <strong>Option</strong> and open Photos. Click <strong>Other Library</strong> and choose the copy on the
          drive.
        </li>
        <li>
          Choose <strong>Photos</strong>, then <strong>Settings</strong>, then <strong>General</strong>, and click{" "}
          <strong>Use as System Photo Library</strong>. Only the system library can use iCloud Photos.
        </li>
        <li>
          Check that your photos open, then move the old library on the internal disk to the Trash and empty it.
        </li>
      </ol>
      <p>
        If the space doesn&rsquo;t come back after you empty the Trash, a Time Machine snapshot is still holding the old
        library. See <Link href={SNAPSHOTS_GUIDE_PATH}>how to delete Time Machine snapshots</Link>. For general advice
        on choosing and formatting a drive, read{" "}
        <Link href={EXTERNAL_DRIVE_GUIDE_PATH}>how to move files to an external drive on a Mac</Link>.
      </p>
      <h3>If you use iCloud Photos after the move</h3>
      <p>
        Photos may re-check the whole library against iCloud after you set the new system library. That is normal and
        can take a while for large libraries. Keep the drive connected until it finishes.
      </p>

      <h2 id="shared">iCloud Shared Library caveats</h2>
      <p>
        If you take part in an iCloud Shared Photo Library, its photos count towards the storage of the person who
        added them in iCloud, but full copies can still sit on your Mac. Keep these points in mind:
      </p>
      <ul>
        <li>Shared Library works only with the system photo library and iCloud Photos turned on.</li>
        <li>
          Deleting a photo from the Shared Library removes it for every participant, so agree on clean-ups first.
        </li>
        <li>
          Optimize Mac Storage applies to Shared Library items too, which is often a better choice than deleting
          shared memories.
        </li>
      </ul>
      <p>
        Use the library switcher in the toolbar to view only your personal library or only the shared one, which makes
        it easier to see where the big items come from.
      </p>

      <h2>What not to do</h2>
      <ul>
        <li>Don&rsquo;t turn off iCloud Photos to save space. It downloads nothing but can leave you without a full copy.</li>
        <li>Don&rsquo;t delete files inside the library package in Finder.</li>
        <li>
          Don&rsquo;t move the library to iCloud Drive. Apple advises against storing a Photos library in a synced
          folder, and it can corrupt.
        </li>
      </ul>
      <p>
        If iCloud Drive itself is the problem, our guide on{" "}
        <Link href={ICLOUD_GUIDE_PATH}>iCloud Drive taking up space on a Mac</Link> explains how to keep files in the
        cloud without deleting them.
      </p>

      <h2>Keep your library lean with {APP_NAME}</h2>
      <p>
        Once Photos is under control, the rest of your disk is next. {APP_NAME} scans your Mac on the device, shows
        what takes up room and clears it to the Trash. It costs <Price /> once, with no subscription. For the bigger
        picture, read <Link href={GUIDE_PATH}>how to free up space on a Mac</Link>.
      </p>
    </GuideLayout>
  );
}
