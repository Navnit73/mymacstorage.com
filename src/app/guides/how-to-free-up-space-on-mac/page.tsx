import { guidePath } from "@/lib/site";
import { Price } from "@/components/price";
import Link from "next/link";
import { ContentPage } from "@/components/content-page";
import { innerPageGraph, isoDateTime, pageMetadata } from "@/lib/seo";
import {
  APP_NAME,
  CACHE_GUIDE_PATH,
  DUPLICATES_GUIDE_PATH,
  GUIDE_PATH,
  LARGE_FILES_GUIDE_PATH,
  OG_IMAGE,
  SITE_URL,
  SYSTEM_DATA_GUIDE_PATH,
  pages,
} from "@/lib/site";

const path = GUIDE_PATH;
const title = "How to free up space on a Mac: 14 safe ways";
const description =
  "Learn how to free up space on a Mac in 14 safe steps. Delete large files, old iPhone backups, caches and app leftovers, and shrink System Data on any MacBook.";
const updated = pages.find((p) => p.path === path)?.updated ?? "2026-10-30";

export const metadata = pageMetadata({
  title: "How to Free Up Space on a Mac (14 Safe Ways)",
  description,
  path,
  type: "article",
});

const methods = [
  { method: "Empty the Trash", time: "1 min", space: "Small to large", risk: "None" },
  { method: "Clear the Downloads folder", time: "5 min", space: "Medium", risk: "Low" },
  { method: "Turn on Optimize Storage and iCloud", time: "2 min", space: "Medium to large", risk: "None" },
  { method: "Remove big files", time: "10 min", space: "Large", risk: "Low" },
  { method: "Delete old iPhone and iPad backups", time: "2 min", space: "Large", risk: "Low" },
  { method: "Remove Messages and Mail attachments", time: "5 min", space: "Medium", risk: "Low" },
  { method: "Clear out extra copies", time: "10 min", space: "Medium", risk: "Low" },
  { method: "Uninstall unused apps", time: "5 min", space: "Large", risk: "Low" },
  { method: "Remove app leftovers", time: "10 min", space: "Small to medium", risk: "Medium" },
  { method: "Clear app and browser caches", time: "5 min", space: "Medium", risk: "Low" },
  { method: "Delete Time Machine snapshots", time: "2 min", space: "Large", risk: "Low" },
  { method: "Restart your Mac", time: "2 min", space: "Small to medium", risk: "None" },
  { method: "Clean up developer files", time: "10 min", space: "Large", risk: "Low" },
  { method: "Move your Photos library", time: "20 min", space: "Large", risk: "Medium" },
];

const categories = [
  { name: "Applications", holds: "Every app you have installed", fix: "Step 8" },
  { name: "Documents", holds: "Files in your home folder, including Downloads", fix: "Steps 2 and 4" },
  { name: "Photos", holds: "Your Photos library", fix: "Steps 7 and 14" },
  { name: "iOS Files", holds: "iPhone and iPad backups and software updates", fix: "Step 5" },
  { name: "Messages", holds: "Photos, videos and files from your chats", fix: "Step 6" },
  { name: "System Data", holds: "Caches, logs, snapshots and app support files", fix: "Steps 9 to 12" },
  { name: "macOS", holds: "The operating system itself", fix: "Leave it alone" },
];

const faqs = [
  {
    q: "How much free space should a Mac have?",
    a: "Aim to keep at least 10 to 15 percent of your disk free. macOS uses that room for swap files, caches and updates, and a major macOS upgrade can need 25 GB or more while it installs.",
  },
  {
    q: "Why is my Mac storage full when I have few files?",
    a: "Your own documents are often the smallest part. Caches, app support files, Time Machine snapshots, iPhone backups and leftovers from removed apps fill the rest, and macOS files most of them under System Data.",
  },
  {
    q: "Can I free up space without deleting files?",
    a: "Yes. Turn on Store in iCloud to keep older files and photos in iCloud, or move large libraries such as Photos to an external drive. Your files stay available, but they no longer fill your Mac's disk.",
  },
  {
    q: "How do I free up space on a MacBook Air?",
    a: "Use the same steps as any other Mac. Many MacBook Air models ship with 256 GB of storage, so old iPhone backups, a large Photos library and Store in iCloud usually make the biggest difference.",
  },
  {
    q: "Why didn't my free space go up after I deleted files?",
    a: "Deleted files stay in the Trash until you empty it. macOS may also keep local Time Machine snapshots of them for a while, and Storage settings can take a few minutes to recalculate. Empty the Trash and restart to see the real figure.",
  },
  {
    q: "Is it safe to delete the Caches folder on a Mac?",
    a: "Clear the folders inside ~/Library/Caches, not the Caches folder itself. Quit the matching app first. Apps rebuild what they need, so expect them to open a little slower the first time.",
  },
  {
    q: "Does Optimize Storage delete my files?",
    a: "No. It removes local copies of Apple TV films and shows you have already watched, and keeps only recent email attachments on your Mac. You can download any of them again.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "Free up space on a Mac", description }),
  {
    "@type": "Article",
    "@id": `${SITE_URL}${path}#article`,
    headline: title,
    description,
    image: OG_IMAGE,
    datePublished: isoDateTime("2026-10-29"),
    dateModified: isoDateTime(updated),
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: { "@id": `${SITE_URL}${path}#webpage` },
    inLanguage: "en",
  },
  {
    "@type": "FAQPage",
    "@id": `${SITE_URL}${path}#faq`,
    isPartOf: { "@id": `${SITE_URL}${path}#webpage` },
    mainEntity: faqs.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  },
];

export default function GuidePage() {
  return (
    <ContentPage
      title={title}
      intro="Your Mac says its disk is almost full. Here is how to free up space on a Mac safely, from two-minute quick wins to the hidden files most guides miss."
      breadcrumb="Free up space on a Mac"
      updated={updated}
      graph={graph}
    >
      <p>
        Every step uses tools that macOS already includes and works on any MacBook Air, MacBook Pro, iMac, Mac mini or
        Mac Studio. The menus below match macOS Ventura and later. On an older version, choose{" "}
        <strong>Apple menu</strong>, then <strong>About This Mac</strong>, then <strong>Storage</strong>, and click{" "}
        <strong>Manage</strong>.
      </p>

      <h2>The short answer</h2>
      <p>If you only have five minutes, do these five things to clear space on a Mac:</p>
      <ol>
        <li>Empty the Trash and your Downloads folder.</li>
        <li>Turn on Optimize Storage and Store in iCloud.</li>
        <li>Delete large files and old iPhone backups.</li>
        <li>Uninstall apps you no longer use.</li>
        <li>Clear app caches, then restart your Mac.</li>
      </ol>

      <h2>All 14 methods at a glance</h2>
      <p>
        Pick the steps that suit your Mac. How much space each one frees depends on how you use your Mac, so treat the
        middle column as a rough guide.
      </p>
      <div className="mt-6 overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Method</th>
              <th scope="col">Time</th>
              <th scope="col">Space freed</th>
              <th scope="col">Risk</th>
            </tr>
          </thead>
          <tbody>
            {methods.map(({ method, time, space, risk }, i) => (
              <tr key={method}>
                <th scope="row">
                  {i + 1}. {method}
                </th>
                <td>{time}</td>
                <td>{space}</td>
                <td>{risk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Check what is using your Mac storage</h2>
      <p>
        Learning how to free up disk space on a Mac starts with one question: where did the space go? Choose <strong>Apple menu</strong>, then{" "}
        <strong>System Settings</strong>, then <strong>General</strong>, then <strong>Storage</strong>. macOS draws a
        bar for your disk and lists each category with its size.
      </p>
      <p>
        Click the info button next to a category to see what it holds. The two or three largest categories tell you
        which of the steps below will help most.
      </p>

      <h3>What each storage category means</h3>
      <div className="mt-6 overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Category</th>
              <th scope="col">What it holds</th>
              <th scope="col">How to shrink it</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(({ name, holds, fix }) => (
              <tr key={name}>
                <th scope="row">{name}</th>
                <td>{holds}</td>
                <td>{fix}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Quick wins: clear space on a Mac in minutes</h2>

      <h3>1. Empty the Trash</h3>
      <p>
        Files in the Trash still use disk space. Control-click the Trash in the Dock and choose{" "}
        <strong>Empty Trash</strong>. Then check two bins people often forget: the <strong>Recently Deleted</strong>{" "}
        album in Photos, which keeps deleted pictures for 30 days, and deleted mail, which you clear in Mail by choosing{" "}
        <strong>Mailbox</strong>, then <strong>Erase Deleted Items</strong>.
      </p>

      <h3>2. Clear your Downloads folder</h3>
      <p>
        Downloads quietly collects installers, archives and videos. Open it in Finder, choose <strong>View</strong>,
        then <strong>as List</strong>, and click the <strong>Size</strong> column to put the largest files first. Old{" "}
        <code>.dmg</code> and <code>.pkg</code> installers are safe to remove once the app is installed.
      </p>

      <h3>3. Turn on Optimize Storage and Store in iCloud</h3>
      <p>Storage settings offers built-in helpers at the top of the page:</p>
      <ul>
        <li>
          <strong>Store in iCloud</strong> keeps older files and photos in iCloud and downloads them when you open them.
          It needs enough free room in your iCloud plan.
        </li>
        <li>
          <strong>Optimize Storage</strong> removes Apple TV films and shows you&rsquo;ve watched, and keeps only recent
          email attachments.
        </li>
        <li>
          <strong>Empty Trash Automatically</strong> removes items that have sat in the Trash for 30 days.
        </li>
      </ul>

      <h2>Delete big files you no longer need</h2>
      <p>
        This is often the fastest way to clear disk space on a Mac, because a handful of big files can outweigh
        thousands of small ones.
      </p>

      <h3>4. Remove old videos, disk images and archives</h3>
      <p>
        In Storage settings, click the info button next to <strong>Documents</strong> and open the{" "}
        <strong>Large Files</strong> tab. Old video exports, disk images and virtual machines often top the list. For
        Finder searches, folder sizes and Terminal commands, read our guide on{" "}
        <Link href={LARGE_FILES_GUIDE_PATH}>how to find large files on a Mac</Link>.
      </p>

      <h3>5. Delete old iPhone and iPad backups</h3>
      <p>
        Every time you back up an iPhone or iPad to your Mac, the backup lands on your startup disk. In Storage
        settings, click the info button next to <strong>iOS Files</strong>. Select backups of devices you no longer
        own, or ones you now back up to iCloud, and click <strong>Delete</strong>. A single backup can take tens of
        gigabytes.
      </p>

      <h3>6. Remove Messages and Mail attachments</h3>
      <p>
        In Storage settings, click the info button next to <strong>Messages</strong>. macOS lists photos, videos and
        files from your chats, largest first. Select the ones you no longer need and click <strong>Delete</strong>.
      </p>
      <p>
        For Mail, open <strong>Mail</strong>, then <strong>Settings</strong>, then <strong>General</strong>, and set{" "}
        <strong>Remove unedited downloads</strong> to <strong>After Message is Deleted</strong>.
      </p>

      <h3>7. Clear out extra copies</h3>
      <p>
        Open Photos and choose <strong>Duplicates</strong> under Utilities in the sidebar, then merge each set. Copies of
        documents and downloads are harder to spot, because two copies often have different names. Our guide on{" "}
        <Link href={DUPLICATES_GUIDE_PATH}>how to find duplicate files on a Mac</Link> shows every method.
      </p>

      <h2>Free up storage on a Mac by removing apps</h2>

      <h3>8. Uninstall apps you no longer use</h3>
      <p>
        In Storage settings, click the info button next to <strong>Applications</strong>. Sort by size, select the apps
        you don&rsquo;t use and click <strong>Delete</strong>. Games, video editors and design suites often take tens of
        gigabytes each.
      </p>

      <h3>9. Remove files that deleted apps leave behind</h3>
      <p>
        Dragging an app to the Trash removes the app, but not its support files. In Finder, choose{" "}
        <strong>Go</strong>, then <strong>Go to Folder</strong> (Shift-Command-G), and check these folders for the names
        of apps you have removed:
      </p>
      <ul>
        <li>
          <code>~/Library/Application Support</code>
        </li>
        <li>
          <code>~/Library/Containers</code>
        </li>
        <li>
          <code>~/Library/Caches</code>
        </li>
      </ul>
      <p>Delete only folders that clearly belong to apps you have already uninstalled. When in doubt, leave it.</p>

      <h2>Shrink hidden system files</h2>
      <p>
        Caches, logs and Time Machine snapshots can quietly grow to tens of gigabytes, and macOS files them under
        System Data. These three steps cover the basics. For every fix, read our guide on{" "}
        <Link href={SYSTEM_DATA_GUIDE_PATH}>how to reduce System Data on a Mac</Link>.
      </p>

      <h3>10. Clear app and browser caches</h3>
      <p>
        Apps store temporary files in <code>~/Library/Caches</code>. Quit an app first, then delete the contents of its
        folder inside Caches. Leave the Caches folder itself in place.
      </p>
      <h4>Safari</h4>
      <p>
        Choose <strong>Safari</strong>, then <strong>Settings</strong>, then <strong>Advanced</strong>, and turn on{" "}
        <strong>Show features for web developers</strong>. Then choose <strong>Develop</strong>, then{" "}
        <strong>Empty Caches</strong>.
      </p>
      <h4>Chrome</h4>
      <p>
        Open <strong>Settings</strong>, then <strong>Privacy and security</strong>, then{" "}
        <strong>Delete browsing data</strong>. Select only <strong>Cached images and files</strong> so you stay signed
        in to your accounts.
      </p>
      <p>
        For every app, browser and system cache, read our guide on{" "}
        <Link href={CACHE_GUIDE_PATH}>how to clear cache on a Mac</Link>.
      </p>

      <h3>11. Delete local Time Machine snapshots</h3>
      <p>
        If you use Time Machine, macOS keeps local snapshots on your disk and counts them under System Data. It removes
        them when space runs low, but you can clear them sooner. Open Terminal and run{" "}
        <code>tmutil listlocalsnapshots /</code> to see them, then{" "}
        <code>sudo tmutil deletelocalsnapshots 2026-10-28-120000</code>, using a date from the list.
      </p>

      <h3>12. Restart your Mac</h3>
      <p>
        A restart clears the temporary and swap files that macOS creates while it runs. If System Data still looks
        unusually large, restart before you hunt for anything else.
      </p>

      <h2>Clean up developer files</h2>
      <p>If you write code on your Mac, developer tools are often the biggest hidden user of space.</p>

      <h3>13. Delete build files and unused tool data</h3>
      <h4>Xcode</h4>
      <p>
        Delete <code>~/Library/Developer/Xcode/DerivedData</code>. Xcode rebuilds it on the next build. Run{" "}
        <code>xcrun simctl delete unavailable</code> to remove simulators for iOS versions you no longer have installed.
      </p>
      <h4>Node.js</h4>
      <p>
        Every project keeps its own <code>node_modules</code> folder. Delete it in projects you aren&rsquo;t working on.
        Running <code>npm install</code> brings it back when you need it.
      </p>
      <h4>Docker and Homebrew</h4>
      <p>
        Run <code>docker system prune</code> to remove stopped containers, unused networks and dangling images. Docker
        lists what it will delete and asks you to confirm first. Run <code>brew cleanup</code> to remove old package
        versions and cached downloads.
      </p>

      <h2>Move big libraries to an external drive</h2>

      <h3>14. Move your Photos library</h3>
      <p>
        If your photos take up most of your disk, and iCloud isn&rsquo;t an option, move the library. Quit Photos, then
        drag <strong>Photos Library</strong> from your Pictures folder to an external drive formatted as APFS or Mac OS
        Extended. Hold the <strong>Option</strong> key as you open Photos and choose the library on the drive.
      </p>
      <p>
        Once your photos open from the drive, delete the original library from your Mac. Keep the drive connected
        whenever you use Photos.
      </p>

      <h2>What not to delete on your Mac</h2>
      <p>
        When you clear disk space on a Mac, some files look like clutter but keep your Mac running. Leave these alone:
      </p>
      <ul>
        <li>
          <strong>The System and Library folders at the top of your disk.</strong> They hold files macOS needs to start
          up.
        </li>
        <li>
          <strong>The Caches folder itself.</strong> Clear the folders inside it, never the folder.
        </li>
        <li>
          <strong>Containers for apps you still use.</strong> They hold those apps&rsquo; data and settings.
        </li>
        <li>
          <strong>
            Anything a guide tells you to remove with <code>sudo rm -rf</code>.
          </strong>{" "}
          One typo can erase files you can&rsquo;t get back.
        </li>
      </ul>

      <h2>Free up space faster with {APP_NAME}</h2>
      <p>
        The steps above work, but they take time, and each one shows only part of your disk. {APP_NAME} does all of it
        in one scan. It names everything inside System Data, lists your biggest files, finds duplicates byte for byte
        and groups caches, developer files and app leftovers so you can clear them in a click.
      </p>
      <p>
        Nothing is deleted outright. Every cleanup goes to the Trash, and Undo puts it back. Learn more about{" "}
        <Link href="/">{APP_NAME}, the disk cleanup app for Mac</Link>. It costs <Price /> once, with no subscription.
      </p>

      <p>
        Want to go further? Read how to <Link href={guidePath("us", "appCleaner")}>remove apps and their leftovers</Link>{" "}
        and compare <Link href={guidePath("us", "diskAnalyzer")}>disk space analyzers for Mac</Link>.
      </p>

      <h2>Frequently asked questions</h2>
      {faqs.map(({ q, a }) => (
        <div key={q}>
          <h3>{q}</h3>
          <p>{a}</p>
        </div>
      ))}
    </ContentPage>
  );
}
