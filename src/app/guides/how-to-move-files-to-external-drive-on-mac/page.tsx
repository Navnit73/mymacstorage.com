import Link from "next/link";
import { AppCallout, GuideLayout, GuideTable } from "@/components/guide-layout";
import { Price } from "@/components/price";
import { articleGraph, innerPageGraph, pageMetadata } from "@/lib/seo";
import {
  APP_NAME,
  EXTERNAL_DRIVE_GUIDE_PATH,
  HOW_MUCH_STORAGE_GUIDE_PATH,
  IPHONE_BACKUPS_GUIDE_PATH,
  LARGE_FILES_GUIDE_PATH,
  PHOTOS_GUIDE_PATH,
  REFUND_DAYS,
} from "@/lib/site";

const market = "us" as const;
const path = EXTERNAL_DRIVE_GUIDE_PATH;
const published = "2026-11-24";
const title = "How to move files to an external drive on a Mac and free up space";
const description =
  "Free up Mac storage by moving files to an external drive. Pick APFS or exFAT, move Photos and Music libraries the right way, and copy, verify, then delete.";

export const metadata = pageMetadata({
  title: "Move Files to an External Drive on Mac",
  description,
  path,
  type: "article",
});

const formats = [
  ["APFS", "Mac only, SSDs", "Photos and Music libraries, Final Cut libraries, anything Mac-only"],
  ["Mac OS Extended (Journaled)", "Mac only, older Macs and spinning hard drives", "Archives used on Macs older than macOS High Sierra"],
  ["exFAT", "Mac and Windows", "Plain files you share with a PC. Not for Photos or Music libraries"],
];

const moves = [
  ["Photos library", "Often the largest item on the Mac", "Quit Photos, copy, then open the copy with Option held"],
  ["Music and TV media", "Downloaded songs, films and shows", "Change the media folder location in app settings"],
  ["Final Cut Pro and iMovie libraries", "Projects and render files", "Copy the library, open it from the drive"],
  ["Finished projects and archives", "Old work you rarely open", "Copy, verify, then delete the original"],
  ["Downloaded installers and disk images", "Files you might reinstall from", "Move, or simply delete"],
];

const faqs = [
  {
    q: "What format should an external drive be for a Mac?",
    a: "APFS for SSDs you'll use only with Macs. Choose exFAT if you need to plug the drive into Windows PCs too, but don't keep a Photos or Music library on exFAT, because those libraries rely on Mac file system features.",
  },
  {
    q: "Can I move my Photos library to an external drive?",
    a: "Yes. Quit Photos, copy the Photos Library file to an APFS drive, then hold Option while opening Photos and choose the copy. Make it the System Photo Library in Photos settings if you use iCloud Photos, then delete the original once you've checked the copy works.",
  },
  {
    q: "Can I install apps on an external drive?",
    a: "Some apps run from an external drive, but many don't update or work correctly there, and apps from the App Store expect to live in Applications. It rarely frees much space either. Move documents and media instead.",
  },
  {
    q: "Is it safe to delete files after copying them to an external drive?",
    a: "Only after you've checked the copy opens and the sizes match. A single external drive is also a single point of failure, so keep a second backup of anything important, for example with Time Machine on another drive or in cloud storage.",
  },
  {
    q: "Can I use my Time Machine drive to store files too?",
    a: "Apple recommends using a Time Machine drive only for backups. Time Machine deletes old backups when the drive fills, and mixing your own files in makes both harder to manage. Use a separate drive or a separate APFS volume.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "Move files to an external drive on Mac", description }),
  ...articleGraph({ path, headline: title, description, published, updated: published, language: "en", faqs }),
];

export default function ExternalDriveGuide() {
  return (
    <GuideLayout
      market={market}
      title={title}
      intro="An external SSD is the cheapest way to add storage to a Mac, especially Apple silicon models where internal storage can't be upgraded. Here is what to move, how to move it without breaking anything, and what to leave on the internal disk."
      breadcrumb="Move files to an external drive"
      updated={published}
      readMinutes={8}
      takeaways={[
        "Format the drive as APFS for Mac-only use, or exFAT if you share it with Windows.",
        "Photos, Music and video libraries free the most space, but need the right steps.",
        "Copy, check the copy opens, then delete the original. Never cut and paste.",
        "Keep apps, your home folder and your Time Machine backups where they are.",
      ]}
      toc={[
        { id: "format", label: "Format the drive" },
        { id: "what", label: "What to move" },
        { id: "how", label: "How to move it" },
        { id: "avoid", label: "What to leave" },
        { id: "faq", label: "FAQ" },
      ]}
      related={[
        { href: PHOTOS_GUIDE_PATH, label: "How to reduce Photos library size on a Mac" },
        { href: LARGE_FILES_GUIDE_PATH, label: "How to find large files on a Mac" },
        { href: IPHONE_BACKUPS_GUIDE_PATH, label: "How to delete iPhone backups on a Mac" },
        { href: HOW_MUCH_STORAGE_GUIDE_PATH, label: "How much storage do you need on a Mac?" },
      ]}
      graph={graph}
      faqs={faqs}
      closing={
        <>
          Know exactly what to move before you buy a drive. <Price /> once, with a {REFUND_DAYS}-day refund.
        </>
      }
    >
      <h2 id="format">Step 1: format the drive for your Mac</h2>
      <p>
        Most new drives come formatted as exFAT. That works on a Mac, but APFS is better for anything that stays on
        Macs. Formatting erases the drive, so do it before you copy anything.
      </p>
      <GuideTable head={["Format", "Works with", "Best for"]} rows={formats} />
      <ol>
        <li>
          Connect the drive and open <strong>Disk Utility</strong> from <code>/Applications/Utilities</code>.
        </li>
        <li>
          Choose <strong>View</strong>, then <strong>Show All Devices</strong>, and select the drive itself, not the
          volume indented under it.
        </li>
        <li>
          Click <strong>Erase</strong>. Pick <strong>APFS</strong> (or exFAT), and <strong>GUID Partition Map</strong>{" "}
          as the scheme.
        </li>
        <li>Name it something clear, such as Archive, and click Erase.</li>
      </ol>
      <p>
        A fast USB-C or Thunderbolt SSD makes libraries feel almost as quick as internal storage. A spinning hard drive
        is fine for archives you rarely open.
      </p>

      <h2 id="what">Step 2: decide what to move</h2>
      <p>
        Move large things you don&rsquo;t need every day, or things that live happily in one self-contained library.
        Our guide on <Link href={LARGE_FILES_GUIDE_PATH}>finding large files on a Mac</Link> shows how to build the
        list.
      </p>
      <GuideTable head={["What to move", "Why", "How"]} rows={moves} />

      <h2 id="how">Step 3: move it the safe way</h2>
      <h3>The rule: copy, verify, then delete</h3>
      <p>
        Drag a folder to the external drive in Finder and macOS copies it, leaving the original. That is what you want.
        Avoid Command-Option-drag (which moves) for important files until you know the copy is good.
      </p>
      <ol>
        <li>Copy the files or library to the drive.</li>
        <li>
          Select both the original and the copy and press <strong>Command-I</strong>. The sizes and item counts should
          match.
        </li>
        <li>Open a few files from the copy to check they work.</li>
        <li>Only then move the original to the Trash, and empty it once you are confident.</li>
      </ol>

      <h3>Move your Photos library</h3>
      <ol>
        <li>Quit Photos. Make sure the drive is formatted as APFS or Mac OS Extended.</li>
        <li>
          In Finder, open <strong>Pictures</strong> and drag <strong>Photos Library</strong> to the external drive. A
          large library can take hours.
        </li>
        <li>
          Hold <strong>Option</strong> and open Photos. Click <strong>Other Library</strong> and choose the copy.
        </li>
        <li>
          If you use iCloud Photos, open <strong>Photos</strong>, then <strong>Settings</strong>, then{" "}
          <strong>General</strong>, and click <strong>Use as System Photo Library</strong>.
        </li>
        <li>Check your photos open, then delete the original library from Pictures.</li>
      </ol>
      <p>
        Photos only works with the library while the drive is connected. If you use iCloud Photos, you may prefer to
        keep the library internal and turn on Optimize Mac Storage instead. Our guide on{" "}
        <Link href={PHOTOS_GUIDE_PATH}>reducing Photos library size</Link> compares both routes.
      </p>

      <h3>Move Music and TV media</h3>
      <p>
        In the Music app, open <strong>Settings</strong>, then <strong>Files</strong>, click <strong>Change</strong>{" "}
        next to the Music Media folder location and pick a folder on the drive. Then choose{" "}
        <strong>File</strong>, <strong>Library</strong>, <strong>Organize Library</strong>, and tick{" "}
        <strong>Consolidate files</strong> to copy your media across. The TV app has the same setting for its media
        folder. Delete the old media folder only after you&rsquo;ve checked playback works.
      </p>

      <h3>Move Final Cut Pro and iMovie libraries</h3>
      <p>
        Close the app, copy the <code>.fcpbundle</code> or iMovie Library to the drive, and open it from there by
        double-clicking it. In Final Cut Pro you can also delete generated render files first (
        <strong>File</strong>, then <strong>Delete Generated Library Files</strong>) so there is less to copy.
      </p>

      <AppCallout market={market} title="Find what is worth moving">
        {APP_NAME} scans your Mac on the device and lists large files, duplicates, caches, app leftovers, old installers
        and iPhone backups by size. Delete what you don&rsquo;t need first, then move what is left. Anything you clear
        goes to the Trash, and Undo puts it back.
      </AppCallout>

      <h3>iPhone backups: possible, but take care</h3>
      <p>
        Finder stores iPhone backups in <code>~/Library/Application Support/MobileSync/Backup</code> and has no setting
        to change that. Some people move the Backup folder to an external drive and leave a symbolic link in its place
        with <code>ln -s</code>. It works, but if the drive isn&rsquo;t connected, backups fail, and a mistake can lose
        your only backup. For most people, deleting old backups is the simpler fix. See{" "}
        <Link href={IPHONE_BACKUPS_GUIDE_PATH}>how to delete iPhone backups on a Mac</Link>.
      </p>

      <h2 id="avoid">What to leave on the internal disk</h2>
      <ul>
        <li>
          <strong>Applications.</strong> Most apps expect to live in <code>/Applications</code>, and App Store apps
          won&rsquo;t update elsewhere. Apps are rarely the biggest use of space anyway.
        </li>
        <li>
          <strong>Your home folder.</strong> Moving the whole home folder is possible through advanced user settings,
          but if the drive is missing at login your account breaks. Move individual folders instead.
        </li>
        <li>
          <strong>The Library folder and system files.</strong> Never move <code>~/Library</code> or anything in{" "}
          <code>/System</code>.
        </li>
        <li>
          <strong>Files you sync with iCloud Drive.</strong> iCloud only syncs its own folder. Moving files out of it
          deletes them from iCloud.
        </li>
      </ul>

      <h2>Keep your Time Machine drive separate</h2>
      <p>
        Apple recommends using a Time Machine disk only for backups. When the backup disk fills, Time Machine deletes
        its oldest backups, and your own files get in the way. If you only have one drive, add a second APFS volume to
        it in Disk Utility (<strong>Edit</strong>, then <strong>Add APFS Volume</strong>) so backups and files stay
        apart. Also remember that files that exist only on an external drive aren&rsquo;t backed up unless you include
        that drive in a backup.
      </p>

      <h2>Before you buy a bigger drive</h2>
      <p>
        If you are moving files because your Mac is too small for how you use it, our guide on{" "}
        <Link href={HOW_MUCH_STORAGE_GUIDE_PATH}>how much storage you need on a Mac</Link> helps you size the next one.
        And before moving anything, clear what you don&rsquo;t need at all. {APP_NAME} shows it in one scan for{" "}
        <Price /> once. Learn more on the <Link href="/">home page</Link>.
      </p>
    </GuideLayout>
  );
}
