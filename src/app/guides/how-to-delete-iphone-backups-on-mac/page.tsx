import Link from "next/link";
import { AppCallout, GuideLayout, GuideTable } from "@/components/guide-layout";
import { Price } from "@/components/price";
import { articleGraph, innerPageGraph, pageMetadata } from "@/lib/seo";
import {
  APP_NAME,
  GUIDE_PATH,
  IPHONE_BACKUPS_GUIDE_PATH,
  PURGEABLE_GUIDE_PATH,
  REFUND_DAYS,
  SYSTEM_DATA_GUIDE_PATH,
  UPDATE_SPACE_GUIDE_PATH,
} from "@/lib/site";

const market = "us" as const;
const path = IPHONE_BACKUPS_GUIDE_PATH;
const published = "2026-11-13";
const title = "How to delete old iPhone backups on a Mac to free up space";
const description =
  "Find where iPhone backups are stored on a Mac and delete the old ones safely, using Storage settings, Finder or the backup folder. Learn which backup to keep.";

export const metadata = pageMetadata({
  title: "How to Delete Old iPhone Backups on Mac (3 Ways)",
  description,
  path,
  type: "article",
});

const methods = [
  ["Storage settings", "No", "Every backup, with sizes", "Clearing several old backups at once"],
  ["Finder", "Yes", "Every backup, with dates", "Checking a backup before you delete it"],
  ["Backup folder", "No", "Folders named by device ID", "When the other two won't open"],
];

const faqs = [
  {
    q: "Where are iPhone backups stored on a Mac?",
    a: "In ~/Library/Application Support/MobileSync/Backup. Each backup is a folder named with a long device ID. You can open it in Finder with Shift-Command-G, but deleting backups through Storage settings or Finder is safer.",
  },
  {
    q: "Is it safe to delete old iPhone backups on my Mac?",
    a: "Yes. Deleting a backup from your Mac doesn't change anything on your iPhone. The only cost is that you can't restore from that backup later, so keep the newest backup of every device you still use, unless it also backs up to iCloud.",
  },
  {
    q: "How big is an iPhone backup on a Mac?",
    a: "It depends on what is on the phone. Backups include messages, app data and photos that aren't in iCloud Photos, so a phone with a large camera roll can make a backup of tens of gigabytes.",
  },
  {
    q: "Does deleting an iPhone backup on my Mac delete my iCloud backup?",
    a: "No. Mac backups and iCloud backups are separate. To manage iCloud backups, open System Settings, click your name, then iCloud, then Manage, then Backups.",
  },
  {
    q: "Why can't I see iOS Files in Storage settings?",
    a: "The category appears only when your Mac holds at least one iPhone or iPad backup or software file. If it is missing, there is nothing of that kind to delete.",
  },
  {
    q: "Can I move iPhone backups to an external drive?",
    a: "Apple doesn't offer a setting for it. Workarounds that use symbolic links exist, but they break if the drive isn't connected when you back up. Backing up to iCloud instead is the simpler way to keep backups off your Mac.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "Delete iPhone backups on Mac", description }),
  ...articleGraph({ path, headline: title, description, published, updated: published, language: "en", faqs }),
];

export default function IphoneBackupsGuide() {
  return (
    <GuideLayout
      market={market}
      title={title}
      intro="Every time you back up an iPhone or iPad to your Mac, a full copy lands on your disk. Replace a phone a couple of times and you can carry backups of devices you sold years ago. Here is how to find them and delete the old ones safely."
      breadcrumb="Delete iPhone backups"
      updated={published}
      readMinutes={6}
      takeaways={[
        "Old iPhone and iPad backups often sit unnoticed for years.",
        "Storage settings deletes them without connecting your phone.",
        "Keep the newest backup of every device you still use.",
        "Deleting a Mac backup never touches the iPhone or your iCloud backup.",
      ]}
      toc={[
        { id: "where", label: "Where they live" },
        { id: "settings", label: "Storage settings" },
        { id: "finder", label: "Finder" },
        { id: "folder", label: "Backup folder" },
        { id: "keep", label: "What to keep" },
        { id: "faq", label: "FAQ" },
      ]}
      related={[
        { href: UPDATE_SPACE_GUIDE_PATH, label: "Not enough space to update your Mac" },
        { href: SYSTEM_DATA_GUIDE_PATH, label: "How to reduce System Data on a Mac" },
        { href: PURGEABLE_GUIDE_PATH, label: "How to clear purgeable space on a Mac" },
        { href: GUIDE_PATH, label: "How to free up space on a Mac" },
      ]}
      graph={graph}
      faqs={faqs}
      closing={
        <>
          Find forgotten backups and everything else that fills your disk. <Price /> once, with a {REFUND_DAYS}-day
          refund.
        </>
      }
    >
      <h2 id="where">Where iPhone backups are stored on a Mac</h2>
      <p>
        When you back up an iPhone or iPad through Finder, or through iTunes on older macOS, the backup goes to this
        folder:
      </p>
      <p>
        <code>~/Library/Application Support/MobileSync/Backup</code>
      </p>
      <p>
        Inside, each backup is a folder with a long name made of letters and numbers. That name is the device ID, not
        the device name, which is why it is hard to tell old backups from new ones by looking at the folder.
      </p>
      <h3>Why backups take so much space</h3>
      <p>
        A backup holds your messages, app data, settings and any photos that aren&rsquo;t already in iCloud Photos.
        On a phone with a big camera roll, that adds up to tens of gigabytes. macOS keeps one backup per device, but it
        never removes backups of devices you no longer own.
      </p>
      <h3>How to check whether you have any</h3>
      <p>
        Open <strong>System Settings</strong>, then <strong>General</strong>, then <strong>Storage</strong>. If you
        see <strong>iOS Files</strong> in the list, your Mac holds iPhone or iPad backups or software files. The size
        next to it tells you how much space you can win back.
      </p>

      <h3>How much space you will get back</h3>
      <p>
        Exactly the size Storage settings shows next to each backup, once you empty the Trash. A single current
        backup is rarely the problem. The space usually hides in three places:
      </p>
      <ul>
        <li>Backups of phones you traded in or handed down.</li>
        <li>Backups of a family member&rsquo;s iPhone you set up once on this Mac.</li>
        <li>Archived backups you made before an iOS beta and then forgot.</li>
      </ul>
      <p>
        Add up the sizes of those before you start, so you know whether backups are your real space problem or only
        part of it.
      </p>

      <h2>Pick the right method</h2>
      <GuideTable head={["Method", "Phone needed?", "What you see", "Best for"]} rows={methods} />

      <h2 id="settings">Method 1: Delete iPhone backups in Storage settings</h2>
      <p>This is the quickest way, and you don&rsquo;t need your phone or a cable.</p>
      <ol>
        <li>
          Choose <strong>Apple menu</strong>, then <strong>System Settings</strong>, then <strong>General</strong>,
          then <strong>Storage</strong>.
        </li>
        <li>Wait for the bar at the top to finish calculating.</li>
        <li>
          Click the <strong>info</strong> button next to <strong>iOS Files</strong>.
        </li>
        <li>
          Select the backups you don&rsquo;t need. Hold <strong>Command</strong> to pick several at once.
        </li>
        <li>
          Click <strong>Delete</strong>, then confirm.
        </li>
      </ol>
      <p>
        Each entry shows the device name, its size and when it was last used. Sort by date and you will usually find
        backups of phones you replaced long ago at the bottom.
      </p>
      <h4>On macOS Monterey or earlier</h4>
      <p>
        Choose <strong>Apple menu</strong>, then <strong>About This Mac</strong>, then <strong>Storage</strong>, then{" "}
        <strong>Manage</strong>. Click <strong>iOS Files</strong> in the sidebar, select a backup and press{" "}
        <strong>Delete</strong>.
      </p>

      <h2 id="finder">Method 2: Delete iPhone backups in Finder</h2>
      <p>
        Use Finder when you want to check a backup&rsquo;s date before deleting it. You need an iPhone, iPad or iPod
        connected to see the option, but it lists every device&rsquo;s backups, not only the connected one.
      </p>
      <ol>
        <li>Connect your iPhone to your Mac with a cable and unlock it.</li>
        <li>
          Open Finder and click your iPhone under <strong>Locations</strong> in the sidebar.
        </li>
        <li>
          On the <strong>General</strong> tab, click <strong>Manage Backups</strong>.
        </li>
        <li>
          Select a backup, click <strong>Delete Backup</strong> and confirm.
        </li>
      </ol>
      <p>
        A small padlock next to a backup means it is encrypted. Encrypted backups also hold saved passwords and Health
        data, so check you have another copy before you delete one you still rely on.
      </p>
      <h4>On macOS Mojave or earlier</h4>
      <p>
        Open <strong>iTunes</strong>, choose <strong>iTunes</strong>, then <strong>Preferences</strong>, then{" "}
        <strong>Devices</strong>. Select a backup and click <strong>Delete Backup</strong>.
      </p>

      <AppCallout market={market} title="Spot every old backup in one scan">
        {APP_NAME} scans your whole Mac, hidden folders included, and lists iPhone backups next to caches, old
        installers and large files, all with their sizes. Clear what you don&rsquo;t need to the Trash, with Undo
        ready.
      </AppCallout>

      <h2 id="folder">Method 3: Delete backups from the backup folder</h2>
      <p>
        If Storage settings won&rsquo;t load and you have no device to connect, you can go to the folder directly. Do
        this carefully, because the folder names don&rsquo;t say which device they belong to.
      </p>
      <ol>
        <li>
          In Finder, press <strong>Shift-Command-G</strong>, type{" "}
          <code>~/Library/Application Support/MobileSync/Backup</code> and press <strong>Return</strong>.
        </li>
        <li>
          Choose <strong>View</strong>, then <strong>as List</strong>, and sort by <strong>Date Modified</strong>.
        </li>
        <li>Move the oldest folders to the Trash. Delete whole backup folders only, never files inside a folder.</li>
        <li>Empty the Trash.</li>
      </ol>
      <p>
        A backup with files missing from inside its folder won&rsquo;t restore. If you aren&rsquo;t sure which folder
        is which, use Method 1 or 2 instead.
      </p>

      <h2>When a backup won&rsquo;t delete</h2>
      <h3>The Delete button is greyed out</h3>
      <p>
        Storage settings can&rsquo;t remove a backup while Finder is syncing or backing up a device. Disconnect your
        iPhone, quit any app that talks to it, such as Music or Photos, and try again.
      </p>
      <h3>The space doesn&rsquo;t come back</h3>
      <p>
        Empty the Trash first. If the number in Storage settings still hasn&rsquo;t moved, a Time Machine local
        snapshot may hold the deleted backup. It expires within a day, or you can remove it now with our guide on{" "}
        <Link href={PURGEABLE_GUIDE_PATH}>clearing purgeable space on a Mac</Link>.
      </p>
      <h3>Terminal says Operation not permitted</h3>
      <p>
        macOS protects the backup folder from apps that lack permission. Use Storage settings or Finder instead. If
        you need Terminal, give it <strong>Full Disk Access</strong> in <strong>System Settings</strong>, then{" "}
        <strong>Privacy &amp; Security</strong>, and remove that access again when you finish.
      </p>

      <h2>Delete old iPhone software update files too</h2>
      <p>
        If you once updated or restored an iPhone from a Mac, the iOS software file may still be there. On older
        macOS, look in <code>~/Library/iTunes/iPhone Software Updates</code>. Each file can run to several gigabytes,
        and your Mac downloads a fresh one whenever it needs it, so old ones are safe to remove. On newer macOS, they
        appear under iOS Files in Storage settings.
      </p>

      <h2 id="keep">Which iPhone backup should you keep?</h2>
      <ul>
        <li>
          <strong>Keep</strong> the newest backup of every device you still use, unless that device also backs up to
          iCloud.
        </li>
        <li>
          <strong>Keep</strong> an older backup if it is from before you erased or reset a phone and you might need
          something from it.
        </li>
        <li>
          <strong>Delete</strong> backups of phones and iPads you sold, gave away or replaced.
        </li>
        <li>
          <strong>Delete</strong> duplicate backups of the same device. Only the newest restores your current setup.
        </li>
      </ul>
      <h3>iCloud backups are separate</h3>
      <p>
        Deleting a backup on your Mac doesn&rsquo;t touch iCloud, and the reverse is also true. To review iCloud
        backups, open <strong>System Settings</strong>, click your name, then <strong>iCloud</strong>, then{" "}
        <strong>Manage</strong>, then <strong>Backups</strong>. Clearing those frees iCloud storage, not disk space
        on your Mac.
      </p>

      <h2>Stop backups filling your Mac again</h2>
      <p>
        If you have iCloud storage to spare, switch your iPhone to iCloud Backup. On the iPhone, open{" "}
        <strong>Settings</strong>, tap your name, then <strong>iCloud</strong>, then <strong>iCloud Backup</strong>,
        and turn it on. Your Mac then stops collecting local copies. If you prefer local backups, delete the previous
        one whenever you replace a device.
      </p>
      <p>
        Backups are often the reason a macOS update says the disk is full. If that is why you are here, read{" "}
        <Link href={UPDATE_SPACE_GUIDE_PATH}>what to do when there isn&rsquo;t enough space to update your Mac</Link>{" "}
        next.
      </p>

      <h2>Find backups and other space hogs with {APP_NAME}</h2>
      <p>
        {APP_NAME} is a native Mac storage cleaner. It scans on your Mac, so no file names leave the device, and lists
        everything with its size before you clear anything. It costs <Price /> once, with no subscription. Learn more
        on the <Link href="/">home page</Link>.
      </p>
    </GuideLayout>
  );
}
