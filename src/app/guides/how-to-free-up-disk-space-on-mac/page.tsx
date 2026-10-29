import Link from "next/link";
import { ContentPage } from "@/components/content-page";
import { innerPageGraph, isoDateTime, pageMetadata } from "@/lib/seo";
import { APP_NAME, GUIDE_PATH, OG_IMAGE, PRICE, SITE_URL, pages } from "@/lib/site";

const path = GUIDE_PATH;
const title = "How to free up disk space on a Mac: 12 safe ways";
const description =
  "Learn how to free up disk space on a Mac with 12 safe steps: clear caches, large files, app leftovers and System Data on any MacBook, iMac or Mac mini.";
const updated = pages.find((p) => p.path === path)?.updated ?? "2026-10-29";

export const metadata = pageMetadata({
  title: "How to Free Up Disk Space on a Mac (12 Safe Ways)",
  description,
  path,
  type: "article",
});

const faqs = [
  {
    q: "How much free space should a Mac have?",
    a: "Aim to keep at least 10 to 15 percent of your disk free. macOS uses that room for swap files, caches and updates, and a major macOS upgrade can need 25 GB or more while it installs.",
  },
  {
    q: "Why is my Mac storage full when I have few files?",
    a: "Your own documents are often the smallest part. Caches, app support files, Time Machine snapshots, developer tools and leftovers from removed apps fill the rest, and macOS files most of them under System Data.",
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
  ...innerPageGraph({ path, name: "Free up disk space on a Mac", description }),
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
      intro="Your Mac says its disk is almost full. These 12 steps free up space safely, from one-click quick wins to the hidden files most guides miss."
      breadcrumb="Free up disk space on a Mac"
      updated={updated}
      graph={graph}
    >
      <p>
        Every step below uses tools that macOS already includes, and works on any MacBook Air, MacBook Pro, iMac, Mac
        mini or Mac Studio running a recent version of macOS. Work from the top: the first steps are the safest and
        often free the most space.
      </p>

      <h2>Check what is using your Mac storage</h2>
      <p>
        Before you delete anything, find out where the space went. Choose <strong>Apple menu</strong>, then{" "}
        <strong>System Settings</strong>, then <strong>General</strong>, then <strong>Storage</strong>. macOS draws a
        bar for your disk and lists each category, such as Applications, Documents, Photos and System Data, with its
        size.
      </p>
      <p>
        Click the info button next to a category to see what it holds. Note the two or three biggest categories. They
        tell you which of the steps below will help most.
      </p>

      <h2>Quick wins that free space in minutes</h2>

      <h3>1. Empty the Trash</h3>
      <p>
        Files in the Trash still use disk space. Control-click the Trash in the Dock and choose{" "}
        <strong>Empty Trash</strong>. To stop it building up again, turn on <strong>Empty Trash Automatically</strong> in
        Storage settings. macOS then removes items that have sat in the Trash for 30 days.
      </p>

      <h3>2. Clear your Downloads folder</h3>
      <p>
        Downloads quietly collects installers, archives and videos. Open it in Finder, choose{" "}
        <strong>View</strong>, then <strong>as List</strong>, and click the <strong>Size</strong> column to put the
        largest files first. Old <code>.dmg</code> and <code>.pkg</code> installers are safe to remove once the app is
        installed.
      </p>

      <h3>3. Turn on the Storage recommendations</h3>
      <p>Storage settings offers a few built-in helpers at the top of the page:</p>
      <ul>
        <li>
          <strong>Store in iCloud</strong> keeps older files and photos in iCloud and downloads them when you open them.
        </li>
        <li>
          <strong>Optimize Storage</strong> removes Apple TV films and shows you&rsquo;ve watched, and keeps only recent
          email attachments.
        </li>
        <li>
          <strong>Empty Trash Automatically</strong> clears the Trash after 30 days.
        </li>
      </ul>

      <h2>Find and remove large files</h2>

      <h3>4. Search for large files in Finder</h3>
      <p>
        Open a Finder window and press <strong>Command-F</strong>. Click the <strong>Kind</strong> menu, choose{" "}
        <strong>Other</strong>, then select <strong>File Size</strong>. Set it to <strong>is greater than 1 GB</strong>.
        Finder now lists every large file, including old video exports, disk images and virtual machines you may have
        forgotten.
      </p>

      <h3>5. Remove large message attachments</h3>
      <p>
        In Storage settings, click the info button next to <strong>Messages</strong>. macOS lists photos, videos and
        files from your conversations, largest first. Select the ones you no longer need and click{" "}
        <strong>Delete</strong>.
      </p>

      <h3>6. Delete duplicate photos and files</h3>
      <p>
        The Photos app finds duplicate photos for you. Open Photos and choose <strong>Duplicates</strong> under
        Utilities in the sidebar, then merge each set. For other files, duplicates are harder to spot by hand, because
        two copies often have different names.
      </p>

      <h2>Clean up apps and their leftovers</h2>

      <h3>7. Uninstall apps you no longer use</h3>
      <p>
        In Storage settings, click the info button next to <strong>Applications</strong>. Sort by size, select the apps
        you don&rsquo;t use and click <strong>Delete</strong>. Games, video editors and design suites often take tens of
        gigabytes each.
      </p>

      <h3>8. Remove files that deleted apps leave behind</h3>
      <p>
        Dragging an app to the Trash removes the app, but not its support files. In Finder, choose{" "}
        <strong>Go</strong>, then <strong>Go to Folder</strong> (Shift-Command-G), and check these folders for names of
        apps you have removed:
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
      <p>Delete only folders that clearly belong to apps you have already uninstalled.</p>

      <h2>Clear caches and System Data</h2>

      <h3>9. Clear app caches</h3>
      <p>
        Apps store temporary files in <code>~/Library/Caches</code>, and they can grow to several gigabytes. Quit the app
        first, then delete the contents of its folder inside Caches. Leave the Caches folder itself in place. The app
        rebuilds what it needs the next time it opens.
      </p>

      <h3>10. Remove local Time Machine snapshots</h3>
      <p>
        If you use Time Machine, macOS keeps local snapshots on your disk and counts them under System Data. It removes
        them automatically when space runs low, but you can clear them sooner. Open Terminal and run{" "}
        <code>tmutil listlocalsnapshots /</code> to see them, then{" "}
        <code>sudo tmutil deletelocalsnapshots 2026-10-28-120000</code>, using a date from the list.
      </p>

      <h3>11. Restart your Mac</h3>
      <p>
        A restart clears temporary files and swap files that macOS creates while it runs. If System Data looks
        unusually large, restart before you go hunting for anything else.
      </p>

      <h2>Clear developer files</h2>
      <p>If you write code on your Mac, developer tools are often the biggest hidden user of space.</p>
      <h3>12. Delete build files and unused tool data</h3>
      <h4>Xcode</h4>
      <p>
        Delete <code>~/Library/Developer/Xcode/DerivedData</code>. Xcode rebuilds it on the next build. Run{" "}
        <code>xcrun simctl delete unavailable</code> to remove simulators for iOS versions you no longer have installed.
      </p>
      <h4>Node.js projects</h4>
      <p>
        Every project keeps its own <code>node_modules</code> folder. Delete it in projects you aren&rsquo;t working on.
        Running <code>npm install</code> brings it back when you need it.
      </p>
      <h4>Docker</h4>
      <p>
        Run <code>docker system prune</code> to remove stopped containers, unused networks and dangling images. Docker
        lists what it will delete and asks you to confirm first.
      </p>

      <h2>The faster way: one scan with MyMacStorage</h2>
      <p>
        The steps above work, but they take time, and each one shows only part of your disk. {APP_NAME} does all of it
        in one scan. It names everything inside System Data, lists your biggest files, finds duplicates byte for byte
        and groups caches, developer files and app leftovers so you can clear them in a click.
      </p>
      <p>
        Nothing is deleted outright. Every cleanup goes to the Trash, and Undo puts it back. Learn more about{" "}
        <Link href="/">{APP_NAME}, the disk cleanup app for Mac</Link>. It costs {PRICE} once, with no subscription.
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
