import Link from "next/link";
import { AppCallout, GuideLayout, GuideTable } from "@/components/guide-layout";
import { Price } from "@/components/price";
import { articleGraph, innerPageGraph, pageMetadata } from "@/lib/seo";
import {
  APP_NAME,
  DOWNLOADS_GUIDE_PATH,
  DUPLICATES_GUIDE_PATH,
  EMPTY_TRASH_GUIDE_PATH,
  GUIDE_PATH,
  INSTALLERS_GUIDE_PATH,
  LARGE_FILES_GUIDE_PATH,
  REFUND_DAYS,
} from "@/lib/site";

const market = "us" as const;
const path = DOWNLOADS_GUIDE_PATH;
const published = "2026-11-24";
const title = "How to clear Downloads on a Mac and keep it clear";
const description =
  "Clear your Mac's Downloads folder: sort by size and Date Added, delete old .dmg and .pkg installers, and set up a Smart Folder that finds stale downloads.";

export const metadata = pageMetadata({
  title: "How to Clear Downloads on Mac",
  description,
  path,
  type: "article",
});

const fileTypes = [
  [".dmg", "Disk images for installing apps", "Delete once the app is in Applications"],
  [".pkg", "Installer packages", "Delete after installing"],
  [".zip", "Archives you already unzipped", "Delete if the unzipped folder exists"],
  [".mov / .mp4", "Videos and screen recordings", "Move to Movies or delete"],
  [".pdf", "Receipts, tickets, manuals", "File in Documents or delete"],
];

const faqs = [
  {
    q: "Is it safe to delete everything in Downloads on a Mac?",
    a: "macOS doesn't need anything in Downloads, so deleting it won't break your Mac. The risk is losing a file you only have there, such as a receipt or a document you edited. Sort by Date Added and review before you delete.",
  },
  {
    q: "How do I delete all downloads on a Mac at once?",
    a: "Open Downloads in Finder, press Command-A to select everything and press Command-Delete to move it to the Trash. Check the Trash before you empty it, since that step is permanent.",
  },
  {
    q: "Can I delete .dmg files after installing?",
    a: "Yes. A .dmg file is only the package an app came in. Once the app is in your Applications folder and opens, the .dmg is safe to delete. Eject it in Finder first if it's still mounted.",
  },
  {
    q: "Does clearing browser download history delete the files?",
    a: "No. Clearing the download list in Safari or Chrome only removes the history entries. The files stay in your Downloads folder until you delete them in Finder.",
  },
  {
    q: "How do I make Downloads clean itself on a Mac?",
    a: "macOS has no built-in auto-delete for Downloads. You can save a Smart Folder that shows downloads older than 30 days, then clear it once a month. Turning on automatic Trash emptying finishes the job.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "Clear Downloads on Mac", description }),
  ...articleGraph({ path, headline: title, description, published, updated: published, language: "en", faqs }),
];

export default function DownloadsGuide() {
  return (
    <GuideLayout
      market={market}
      title={title}
      intro="Your Downloads folder collects every installer, PDF and video you have ever grabbed from the web, and nothing removes them for you. Here is how to clear it in a few minutes and set things up so it doesn't fill up again."
      breadcrumb="Clear Downloads"
      updated={published}
      readMinutes={6}
      takeaways={[
        "Sort Downloads by size first: a few large files usually make up most of the space.",
        "The Date Added column shows what you downloaded and never touched.",
        ".dmg and .pkg installers are safe to delete once the app is installed.",
        "A saved Smart Folder makes a monthly clean-up take a minute.",
      ]}
      toc={[
        { id: "size", label: "Check its size" },
        { id: "clear", label: "Clear it in 5 steps" },
        { id: "smart", label: "Smart Folder" },
        { id: "browsers", label: "Browser settings" },
        { id: "faq", label: "FAQ" },
      ]}
      related={[
        { href: LARGE_FILES_GUIDE_PATH, label: "How to find large files on a Mac" },
        { href: INSTALLERS_GUIDE_PATH, label: "How to delete old macOS installers" },
        { href: EMPTY_TRASH_GUIDE_PATH, label: "How to empty the Trash on a Mac" },
        { href: GUIDE_PATH, label: "How to free up space on a Mac" },
      ]}
      graph={graph}
      faqs={faqs}
      closing={
        <>
          Clear Downloads and everything else in one scan. <Price /> once, with a {REFUND_DAYS}-day refund.
        </>
      }
    >
      <h2 id="size">How big is your Downloads folder?</h2>
      <p>
        Open Finder and press <strong>Option-Command-L</strong> to jump to Downloads. Then press{" "}
        <strong>Command-I</strong> with nothing selected, or Control-click <strong>Downloads</strong> in the sidebar
        and choose <strong>Get Info</strong>. The Size line shows the total.
      </p>
      <p>
        Storage settings can show it too. Open <strong>System Settings</strong>, then <strong>General</strong>, then{" "}
        <strong>Storage</strong>, and click the info button next to <strong>Documents</strong>. The{" "}
        <strong>Downloads</strong> tab lists files by size and age, and lets you delete them right there.
      </p>

      <h2 id="clear">How to clear Downloads on a Mac in 5 steps</h2>

      <h3>1. Switch to list view and sort by size</h3>
      <ol>
        <li>
          In Downloads, press <strong>Command-2</strong> for list view.
        </li>
        <li>
          Click the <strong>Size</strong> column header so the largest files come first. Click again to reverse the
          order.
        </li>
        <li>
          Folders show a dash for size. To see them, choose <strong>View</strong>, then{" "}
          <strong>Show View Options</strong>, and tick <strong>Calculate all sizes</strong>.
        </li>
      </ol>
      <p>
        On most Macs, a handful of videos, disk images and archives make up most of the folder. Deal with those and you
        have done the bulk of the work.
      </p>

      <h3>2. Add the Date Added column</h3>
      <p>
        <strong>Date Modified</strong> often shows when a file was created on someone else&rsquo;s computer.{" "}
        <strong>Date Added</strong> shows when it arrived on your Mac, which is what you want. In{" "}
        <strong>Show View Options</strong>, tick <strong>Date Added</strong>, then sort by it. Anything you downloaded
        months ago and never moved is a good candidate for the Trash.
      </p>

      <h3>3. Delete installers you already used</h3>
      <GuideTable head={["File type", "What it is", "What to do"]} rows={fileTypes} />
      <p>
        If a disk image still shows in the Finder sidebar under Locations, click the eject button next to it before you
        delete the .dmg. Full macOS installers are a special case; see{" "}
        <Link href={INSTALLERS_GUIDE_PATH}>how to delete old macOS installers</Link>.
      </p>

      <h3>4. File what you want to keep</h3>
      <p>
        Move receipts, tickets and documents to <strong>Documents</strong>, and videos to <strong>Movies</strong>, so
        Downloads holds only things in progress. If you downloaded the same file twice, Finder names the copy with a
        number, such as <code>report 2.pdf</code>. Our guide on{" "}
        <Link href={DUPLICATES_GUIDE_PATH}>how to find duplicate files on a Mac</Link> finds the copies elsewhere too.
      </p>

      <h3>5. Move the rest to the Trash and empty it</h3>
      <p>
        Select what&rsquo;s left to remove and press <strong>Command-Delete</strong>. Space comes back only once you empty
        the Trash, and sometimes not until a Time Machine snapshot expires. See{" "}
        <Link href={EMPTY_TRASH_GUIDE_PATH}>how to empty the Trash on a Mac</Link> if it won&rsquo;t empty or the space
        doesn&rsquo;t return.
      </p>

      <AppCallout market={market} title="Downloads is just the start">
        {APP_NAME} scans your Mac on the device and lists large files, old installers, duplicates, caches, app leftovers
        and iPhone backups with their sizes. Everything goes to the Trash, and Undo puts it back.
      </AppCallout>

      <h2 id="smart">Set up a Smart Folder for old downloads</h2>
      <p>
        macOS can&rsquo;t empty Downloads on a schedule, but a Smart Folder can show you everything that&rsquo;s gone stale.
      </p>
      <ol>
        <li>
          Open Downloads, then choose <strong>File</strong>, then <strong>New Smart Folder</strong>.
        </li>
        <li>
          Next to <strong>Search</strong>, click <strong>&ldquo;Downloads&rdquo;</strong> so it searches only that
          folder.
        </li>
        <li>
          Click the <strong>+</strong> button. Set the first menu to <strong>Date Added</strong>. If it isn&rsquo;t
          listed, choose <strong>Other</strong> and search for it.
        </li>
        <li>
          Set the rule to <strong>is not within last</strong> <strong>30</strong> <strong>days</strong>.
        </li>
        <li>
          Click <strong>Save</strong>, name it <em>Old downloads</em> and tick <strong>Add to Sidebar</strong>.
        </li>
      </ol>
      <p>
        Once a month, open the Smart Folder, sort by size, review and delete. Pair it with{" "}
        <strong>Remove items from the Trash after 30 days</strong> in Finder&rsquo;s Advanced settings and the job looks
        after itself.
      </p>
      <h3>Use Stacks to keep the Desktop tidy too</h3>
      <p>
        If your browser saves to the Desktop, Control-click the Desktop and choose <strong>Use Stacks</strong>. macOS
        groups files by kind, so you can spot a pile of screenshots or disk images and clear them together. The
        Downloads folder in the Dock works the same way: Control-click it to show it as a stack, sorted by date added.
      </p>

      <h2>Where else downloads end up</h2>
      <p>Not everything you &ldquo;download&rdquo; lands in the same place. Check these too:</p>
      <ul>
        <li>
          <strong>AirDrop.</strong> Files sent to your Mac with AirDrop go to Downloads, so photos and videos from your
          iPhone pile up here quickly.
        </li>
        <li>
          <strong>Messages and Mail.</strong> Attachments you save from them often go to Downloads, while attachments you
          only open are kept inside the apps.
        </li>
        <li>
          <strong>Screenshots.</strong> These usually go to the Desktop. Press <strong>Shift-Command-5</strong>, click{" "}
          <strong>Options</strong> and pick a folder to change it.
        </li>
      </ul>
      <h3>Does iCloud Drive sync Downloads?</h3>
      <p>
        No. iCloud Drive can sync your Desktop and Documents folders, but not Downloads. That means Optimize Mac Storage
        never moves Downloads to the cloud, and everything there stays on your disk until you delete it.
      </p>
      <h3>Check before you delete</h3>
      <p>
        Not sure what a file is? Select it and press the <strong>Space</strong> bar. Quick Look shows PDFs, images,
        videos and documents without opening an app, so you can review dozens of files in a minute.
      </p>

      <h2 id="browsers">Change where browsers save downloads</h2>
      <p>
        If you want big downloads to land somewhere else, such as an external drive, or want the browser to ask each
        time, change it in the browser:
      </p>
      <ul>
        <li>
          <strong>Safari:</strong> <strong>Safari</strong>, then <strong>Settings</strong>, then{" "}
          <strong>General</strong>. Set <strong>File download location</strong>, and set{" "}
          <strong>Remove download list items</strong> to tidy the list.
        </li>
        <li>
          <strong>Chrome:</strong> <strong>Settings</strong>, then <strong>Downloads</strong>. Change{" "}
          <strong>Location</strong> or turn on <strong>Ask where to save each file before downloading</strong>.
        </li>
        <li>
          <strong>Firefox:</strong> <strong>Settings</strong>, then <strong>General</strong>, then{" "}
          <strong>Files and Applications</strong>.
        </li>
      </ul>
      <p>
        Clearing a browser&rsquo;s download list only removes the history. The files stay in Finder until you delete
        them there.
      </p>

      <h2>When Downloads isn&rsquo;t the problem</h2>
      <p>
        If Downloads is small but your disk is still full, the space is elsewhere. Our guide on{" "}
        <Link href={LARGE_FILES_GUIDE_PATH}>how to find large files on a Mac</Link> shows how to search the whole disk,
        and <Link href={GUIDE_PATH}>how to free up space on a Mac</Link> covers every common culprit.
      </p>

      <h2>Clear the whole disk with {APP_NAME}</h2>
      <p>
        {APP_NAME} maps your disk in one scan, groups old installers and large files for review, and clears what you
        choose to the Trash. It costs <Price /> once, with no subscription. Learn more on the{" "}
        <Link href="/">home page</Link>.
      </p>
    </GuideLayout>
  );
}
