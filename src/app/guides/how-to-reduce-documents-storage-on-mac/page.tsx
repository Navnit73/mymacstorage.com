import Link from "next/link";
import { AppCallout, GuideLayout, GuideTable } from "@/components/guide-layout";
import { Price } from "@/components/price";
import { articleGraph, innerPageGraph, pageMetadata } from "@/lib/seo";
import {
  APP_CLEANER_PATH,
  APP_NAME,
  CHECK_STORAGE_GUIDE_PATH,
  DOCUMENTS_GUIDE_PATH,
  DOWNLOADS_GUIDE_PATH,
  DUPLICATES_GUIDE_PATH,
  EXTERNAL_DRIVE_GUIDE_PATH,
  ICLOUD_GUIDE_PATH,
  LARGE_FILES_GUIDE_PATH,
  REFUND_DAYS,
} from "@/lib/site";

const market = "us" as const;
const path = DOCUMENTS_GUIDE_PATH;
const published = "2026-11-24";
const title = "How to reduce Documents storage on a Mac";
const description =
  "Documents taking up too much space on your Mac? Learn what Storage settings counts as Documents, how to review it and how to shrink it without losing work.";

export const metadata = pageMetadata({
  title: "How to Reduce Documents Storage on Mac",
  description,
  path,
  type: "article",
});

const tabs = [
  ["Large Files", "Files over a size threshold, biggest first", "Old videos, disk images, archives"],
  ["Downloads", "Everything in your Downloads folder, oldest first", "Installers and one-off files"],
  ["Unsupported Apps", "Apps that no longer run on your macOS version", "32-bit and abandoned apps"],
  ["Containers", "Data stored by sandboxed apps", "App libraries and offline media"],
  ["File Browser", "Your folders, sorted by size", "Any folder you didn't expect"],
];

const faqs = [
  {
    q: "What counts as Documents in Mac storage?",
    a: "Documents is a broad category for files in your home folder that don't fit Apps, Photos, Music, Mail or another named category. It includes videos, disk images, archives, downloads, project files and some app data stored in containers.",
  },
  {
    q: "Why is Documents so large on my Mac when my Documents folder is small?",
    a: "The category isn't the same as the Documents folder. It also counts Downloads, the Desktop, Movies, large files anywhere in your home folder and some app containers. Use the File Browser tab in Storage settings to see where the space really is.",
  },
  {
    q: "Is it safe to delete files from the Documents list in Storage settings?",
    a: "Deleting from Storage settings removes files straight away, without going through the Trash. That makes it fast but unforgiving. Review each item, or delete in Finder instead so you have the Trash as a safety net.",
  },
  {
    q: "Does storing Desktop and Documents in iCloud free up space?",
    a: "It can, if Optimize Mac Storage is also on. macOS then keeps older files only in iCloud and downloads them when you open them. You need enough iCloud storage to hold the folders.",
  },
  {
    q: "How do I find the biggest files on my Mac?",
    a: "Open the Large Files tab under Documents in Storage settings, or use Finder search with File Size greater than 1 GB. A disk analyzer shows every large file and folder in one view.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "Reduce Documents storage on Mac", description }),
  ...articleGraph({ path, headline: title, description, published, updated: published, language: "en", faqs }),
];

export default function DocumentsStorageGuide() {
  return (
    <GuideLayout
      market={market}
      title={title}
      intro="The Documents bar in Storage settings is often the biggest one, and it isn't just your Documents folder. Here is what it counts, how to review it with Apple's own tools and how to shrink it without losing anything you need."
      breadcrumb="Reduce Documents storage"
      updated={published}
      readMinutes={7}
      takeaways={[
        "Documents counts much more than the Documents folder, including Downloads and large files.",
        "Storage settings has a built-in review list with five useful tabs.",
        "Deleting from that list skips the Trash, so check before you click.",
        "Video, disk images and old downloads are the usual culprits.",
      ]}
      toc={[
        { id: "what", label: "What counts" },
        { id: "review", label: "Review it" },
        { id: "fix", label: "7 ways to shrink it" },
        { id: "safety", label: "Delete safely" },
        { id: "faq", label: "FAQ" },
      ]}
      related={[
        { href: LARGE_FILES_GUIDE_PATH, label: "How to find large files on a Mac" },
        { href: DUPLICATES_GUIDE_PATH, label: "How to find duplicate files on a Mac" },
        { href: DOWNLOADS_GUIDE_PATH, label: "How to clear Downloads on a Mac" },
        { href: CHECK_STORAGE_GUIDE_PATH, label: "How to check storage on a Mac" },
      ]}
      graph={graph}
      faqs={faqs}
      closing={
        <>
          See every big file, then clear it with an Undo button. <Price /> once, with a {REFUND_DAYS}-day refund.
        </>
      }
    >
      <h2 id="what">What Storage settings counts as Documents</h2>
      <p>
        Despite the name, the Documents category isn&rsquo;t your Documents folder. It is a catch-all for files in your
        home folder that don&rsquo;t belong to a more specific category such as Applications, Photos, Music, Mail,
        Messages or iCloud Drive. That usually includes:
      </p>
      <ul>
        <li>Your Desktop, Documents, Downloads and Movies folders.</li>
        <li>Videos and screen recordings saved outside the Photos app.</li>
        <li>Disk images, archives such as .zip files and installer packages.</li>
        <li>Project files from editors, design apps and music software.</li>
        <li>Data stored by some sandboxed apps in their containers.</li>
      </ul>
      <p>
        If you aren&rsquo;t sure which category is largest, start with our guide on{" "}
        <Link href={CHECK_STORAGE_GUIDE_PATH}>how to check storage on a Mac</Link>.
      </p>

      <h2 id="review">How to review Documents in Storage settings</h2>
      <ol>
        <li>
          Open <strong>System Settings</strong>, then <strong>General</strong>, then <strong>Storage</strong>.
        </li>
        <li>Wait for the bar to finish calculating.</li>
        <li>
          Click the <strong>info</strong> button next to <strong>Documents</strong> in the list.
        </li>
        <li>Use the tabs at the top of the sheet to sort what you see.</li>
      </ol>
      <GuideTable head={["Tab", "What it lists", "What you usually find"]} rows={tabs} />
      <p>
        Tab names can vary a little between macOS versions. To act on an item, select it and click{" "}
        <strong>Delete</strong>, or right-click and choose <strong>Show in Finder</strong> to handle it there.
      </p>
      <h3>The File Browser tab is the most useful</h3>
      <p>
        It shows your home folder with each folder&rsquo;s size, so you can drill down to the one that is actually big.
        A 60 GB Movies folder or a forgotten project folder jumps out straight away.
      </p>

      <h2 id="fix">7 ways to shrink Documents storage</h2>

      <h3>1. Clear old Downloads</h3>
      <p>
        Downloads is often the biggest hidden chunk of Documents. Sort by <strong>Date Added</strong> and delete
        anything older than a few months that you have already used. Our guide on{" "}
        <Link href={DOWNLOADS_GUIDE_PATH}>how to clear Downloads on a Mac</Link> goes step by step.
      </p>

      <h3>2. Delete or move large files</h3>
      <p>
        Open the <strong>Large Files</strong> tab and look at the top ten. Old screen recordings, exported videos,
        virtual machine images and disk images are typical. For more ways to hunt them down, including Finder searches
        by size, read <Link href={LARGE_FILES_GUIDE_PATH}>how to find large files on a Mac</Link>.
      </p>

      <h3>3. Remove duplicate files</h3>
      <p>
        Copies of the same video, photo export or PDF pile up in Downloads and Desktop. Our guide on{" "}
        <Link href={DUPLICATES_GUIDE_PATH}>how to find duplicate files on a Mac</Link> shows free ways to find them and
        decide which copy to keep.
      </p>

      <h3>4. Remove unsupported apps</h3>
      <p>
        The <strong>Unsupported Apps</strong> tab lists apps that can&rsquo;t run on your version of macOS. They take up
        space and do nothing. Delete them, and remove their leftover settings too; our guide to{" "}
        <Link href={APP_CLEANER_PATH}>app cleaners for Mac</Link> shows where leftovers live.
      </p>

      <h3>5. Check app containers</h3>
      <p>
        The <strong>Containers</strong> tab shows data stored by sandboxed apps, such as offline downloads in streaming
        apps or libraries in creative tools. Clear it from inside each app where possible, for example by removing
        offline downloads, rather than deleting container folders by hand.
      </p>

      <AppCallout market={market} title="Review every big file before it goes">
        {APP_NAME} scans your Mac on the device and lists large files, duplicates, caches, app leftovers, iPhone
        backups and old installers with their sizes and locations. Everything you clear goes to the Trash, not straight
        to oblivion, and Undo puts it back.
      </AppCallout>

      <h3>6. Store Desktop and Documents in iCloud</h3>
      <p>
        Open <strong>System Settings</strong>, click your name, then <strong>iCloud</strong>, then{" "}
        <strong>iCloud Drive</strong>, and turn on <strong>Desktop &amp; Documents Folders</strong>. With{" "}
        <strong>Optimize Mac Storage</strong> also on, macOS keeps older files only in iCloud when space runs low. You
        need enough iCloud storage for the folders. Our guide on{" "}
        <Link href={ICLOUD_GUIDE_PATH}>iCloud Drive taking up space on a Mac</Link> covers the trade-offs.
      </p>

      <h3>7. Move archives to an external drive</h3>
      <p>
        Finished projects, raw video and old archives rarely need to live on your internal disk. Move them to an
        external SSD and keep a second copy somewhere else. Our guide on{" "}
        <Link href={EXTERNAL_DRIVE_GUIDE_PATH}>how to move files to an external drive</Link> covers formats and how to
        check the copy before deleting the original.
      </p>

      <h2 id="safety">Delete safely: Storage settings vs Finder</h2>
      <p>
        There is one catch with Apple&rsquo;s review list. When you click <strong>Delete</strong> in Storage settings,
        macOS warns you that the item will be deleted immediately. It doesn&rsquo;t go to the Trash. That is fine for a
        file you are sure about, and risky for anything else.
      </p>
      <p>The safer habit:</p>
      <ol>
        <li>
          Right-click the item in Storage settings and choose <strong>Show in Finder</strong>.
        </li>
        <li>
          Move it to the Trash with <strong>Command-Delete</strong>.
        </li>
        <li>Use your Mac for a few days. If nothing is missing, empty the Trash.</li>
      </ol>
      <p>
        Before deleting work files, make sure they are backed up with Time Machine or another backup. A full disk is an
        annoyance; a lost project is a disaster.
      </p>

      <h2>Find big files with Finder instead</h2>
      <p>
        If Storage settings is slow or stuck on Calculating, Finder search does the same job and works on every
        version of macOS.
      </p>
      <ol>
        <li>
          Open your home folder in Finder and press <strong>Command-F</strong>.
        </li>
        <li>
          Click the first search field, choose <strong>Other</strong>, and tick <strong>File Size</strong>.
        </li>
        <li>
          Set the rule to <strong>is greater than 1 GB</strong>. Lower it to 500 MB if nothing shows up.
        </li>
        <li>
          Switch to list view, add the <strong>Size</strong> column with <strong>Command-J</strong> if it is missing,
          and sort biggest first.
        </li>
      </ol>
      <p>
        Click <strong>Save</strong> to keep the search in the sidebar as a smart folder, so you can re-run it next month
        with one click.
      </p>
      <h3>Look in Movies and Desktop too</h3>
      <p>
        Screen recordings save to the Desktop by default, and iMovie, Final Cut Pro and GarageBand keep libraries and
        projects in Movies and Music. A single forgotten library can hold tens of gigabytes. Open the library in its own
        app to delete rendered files or old projects, rather than deleting pieces of it in Finder.
      </p>

      <h2>Why Documents grows back</h2>
      <p>
        Documents creeps up because Downloads and Desktop are where new files land by default. A few habits keep it in
        check:
      </p>
      <ul>
        <li>Delete installers and disk images as soon as the app is installed.</li>
        <li>Move finished projects off your Mac each month.</li>
        <li>
          In Safari, choose <strong>Settings</strong>, then <strong>General</strong>, and set{" "}
          <strong>Remove download list items</strong> so old entries don&rsquo;t pile up. It doesn&rsquo;t delete the
          files, so still clear the folder.
        </li>
        <li>Check the Large Files tab once a month.</li>
      </ul>

      <h2>Do it in one pass with {APP_NAME}</h2>
      <p>
        Storage settings shows Documents. {APP_NAME} shows the whole disk, including caches and app leftovers that
        Documents doesn&rsquo;t count, and clears everything to the Trash. It costs <Price /> once, with no
        subscription. Learn more on the <Link href="/">home page</Link>.
      </p>
    </GuideLayout>
  );
}
