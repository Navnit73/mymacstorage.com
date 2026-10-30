import Link from "next/link";
import { ContentPage } from "@/components/content-page";
import { innerPageGraph, isoDateTime, pageMetadata } from "@/lib/seo";
import { APP_NAME, CACHE_GUIDE_PATH, GUIDE_PATH, OG_IMAGE, PRICE, SITE_URL, SYSTEM_DATA_GUIDE_PATH, pages } from "@/lib/site";

const path = SYSTEM_DATA_GUIDE_PATH;
const title = "How to reduce System Data on a Mac: 8 safe fixes";
const description =
  "Learn how to reduce System Data on a Mac safely. See what System Data is, why it grows so large and 8 ways to shrink it on any MacBook, iMac or Mac mini.";
const updated = pages.find((p) => p.path === path)?.updated ?? "2026-10-30";

export const metadata = pageMetadata({
  title: "How to Reduce System Data on Mac (8 Safe Fixes)",
  description,
  path,
  type: "article",
});

const contents = [
  { item: "App and browser caches", where: "~/Library/Caches", safe: "Yes, the folders inside it" },
  { item: "Log and crash files", where: "~/Library/Logs", safe: "Yes" },
  { item: "Local Time Machine snapshots", where: "Hidden on your startup disk", safe: "Yes, with tmutil" },
  { item: "Support files from removed apps", where: "~/Library/Application Support", safe: "Yes, for apps you removed" },
  { item: "Developer tools data", where: "~/Library/Developer and Docker", safe: "Yes, with each tool's commands" },
  { item: "Spotlight search index", where: "Hidden on your startup disk", safe: "Rebuild it, don't delete it" },
  { item: "Swap and sleep image files", where: "/private/var/vm", safe: "No, macOS manages them" },
];

const fixes = [
  { fix: "Restart your Mac", time: "2 min", impact: "Small to medium", risk: "None" },
  { fix: "Delete Time Machine snapshots", time: "2 min", impact: "Large", risk: "Low" },
  { fix: "Clear app and browser caches", time: "5 min", impact: "Medium", risk: "Low" },
  { fix: "Delete old log files", time: "2 min", impact: "Small", risk: "None" },
  { fix: "Remove app leftovers", time: "10 min", impact: "Small to medium", risk: "Medium" },
  { fix: "Clean up developer files", time: "10 min", impact: "Large", risk: "Low" },
  { fix: "Rebuild the Spotlight index", time: "5 min", impact: "Small to large", risk: "Low" },
  { fix: "Update macOS", time: "30 min", impact: "Varies", risk: "None" },
];

const faqs = [
  {
    q: "Is it safe to clear System Data on a Mac?",
    a: "Yes, if you clear the right parts. Caches, logs, local Time Machine snapshots and leftovers from removed apps are safe to remove. Leave the System folder, the Library folder itself and the swap files in /private/var/vm alone.",
  },
  {
    q: "How do I clear Other storage on a Mac?",
    a: "Apple renamed Other storage to System Data in macOS Monterey, so the same fixes apply. Restart your Mac, delete local Time Machine snapshots, clear app caches and remove files that uninstalled apps left behind.",
  },
  {
    q: "How much System Data is normal on a Mac?",
    a: "There is no fixed figure, because it depends on your apps and how you use your Mac. Watch the trend instead. If System Data grows by tens of gigabytes in a few weeks, snapshots, caches or developer tools are usually the cause.",
  },
  {
    q: "Why does System Data keep coming back?",
    a: "Apps rebuild their caches as you use them, and Time Machine keeps making local snapshots. Some regrowth is normal. If it returns fast, keep your backup disk connected more often and check which app's cache folder grows the most.",
  },
  {
    q: "Why did System Data go up after a macOS update?",
    a: "macOS keeps temporary install files and often takes a local snapshot before an update. Most of that clears itself within a day or two. A restart usually speeds it up.",
  },
  {
    q: "Does reinstalling macOS reduce System Data?",
    a: "Reinstalling macOS over your current system keeps your apps and their data, so it rarely helps. Erasing your Mac and restoring from a backup does reset System Data, but treat it as a last resort.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "Reduce System Data on a Mac", description }),
  {
    "@type": "Article",
    "@id": `${SITE_URL}${path}#article`,
    headline: title,
    description,
    image: OG_IMAGE,
    datePublished: isoDateTime("2026-10-30"),
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
      intro="System Data takes up a huge slice of your disk, and macOS won't show you what's inside. This guide explains what it holds and how to reduce System Data on a Mac without breaking anything."
      breadcrumb="Reduce System Data on a Mac"
      updated={updated}
      graph={graph}
    >
      <p>
        Every fix uses tools built into macOS and works on any MacBook Air, MacBook Pro, iMac, Mac mini or Mac Studio.
        The menus match macOS Ventura and later.
      </p>

      <h2>The short answer</h2>
      <p>Try these five steps first. They solve most cases:</p>
      <ol>
        <li>Restart your Mac.</li>
        <li>Delete local Time Machine snapshots.</li>
        <li>Clear app and browser caches.</li>
        <li>Remove files that uninstalled apps left behind.</li>
        <li>Clean up Xcode, Docker and other developer files.</li>
      </ol>

      <h2>What is System Data on a Mac?</h2>
      <p>
        So what is System Data on a Mac? It is the storage category for files that don&rsquo;t fit anywhere else, such
        as Applications, Documents or Photos. It mostly holds temporary and support files that apps and macOS create as
        they run. Before macOS Monterey, Apple called it <strong>Other storage</strong>, so any advice on how to clear
        Other storage on a Mac applies here too.
      </p>
      <p>
        System Data is not the same as the <strong>macOS</strong> category. That one holds the operating system itself,
        which macOS seals and protects, so you can&rsquo;t shrink it.
      </p>

      <h3>What System Data includes</h3>
      <div className="mt-6 overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">What it holds</th>
              <th scope="col">Where it lives</th>
              <th scope="col">Safe to clear?</th>
            </tr>
          </thead>
          <tbody>
            {contents.map(({ item, where, safe }) => (
              <tr key={item}>
                <th scope="row">{item}</th>
                <td>
                  <code>{where}</code>
                </td>
                <td>{safe}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Why is System Data so large on a Mac?</h2>
      <p>If you&rsquo;re wondering why System Data is so large on a Mac, a few common causes explain most cases:</p>
      <ul>
        <li>
          <strong>Time Machine snapshots pile up</strong> when your backup disk stays unplugged, because macOS keeps
          hourly snapshots on your Mac until it can back them up.
        </li>
        <li>
          <strong>Caches never stop growing.</strong> Browsers, Slack, Spotify and creative apps can each hold several
          gigabytes.
        </li>
        <li>
          <strong>Developer tools are heavy.</strong> Xcode build data, simulators and Docker images often reach tens of
          gigabytes.
        </li>
        <li>
          <strong>Deleted apps leave files behind.</strong> Dragging an app to the Trash keeps its support files.
        </li>
        <li>
          <strong>Storage settings lags behind.</strong> macOS can take several minutes to recalculate after you delete
          something.
        </li>
      </ul>

      <h2>Check how much System Data your Mac has</h2>
      <p>
        Choose <strong>Apple menu</strong>, then <strong>System Settings</strong>, then <strong>General</strong>, then{" "}
        <strong>Storage</strong>. Wait for the bar to finish loading, then hold the pointer over its grey section to
        see the System Data total. Write it down so you can measure your progress.
      </p>

      <h3>Find the biggest folders yourself</h3>
      <p>
        In Finder, choose <strong>Go</strong>, then <strong>Go to Folder</strong>, and enter <code>~/Library</code>.
        Switch to list view, choose <strong>View</strong>, then <strong>Show View Options</strong>, and tick{" "}
        <strong>Calculate all sizes</strong>. Click the <strong>Size</strong> column to put the largest folders first.
      </p>
      <p>
        Prefer Terminal? Run <code>du -sh ~/Library/* | sort -h | tail -10</code> to list the 10 largest folders in
        your Library.
      </p>

      <h2>How to clear System Data on a Mac: 8 safe fixes</h2>
      <p>
        To clear System Data on a Mac safely, work through the fixes in order. The first ones carry the least risk and
        often free the most space.
      </p>
      <div className="mt-6 overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Fix</th>
              <th scope="col">Time</th>
              <th scope="col">Space freed</th>
              <th scope="col">Risk</th>
            </tr>
          </thead>
          <tbody>
            {fixes.map(({ fix, time, impact, risk }, i) => (
              <tr key={fix}>
                <th scope="row">
                  {i + 1}. {fix}
                </th>
                <td>{time}</td>
                <td>{impact}</td>
                <td>{risk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>1. Restart your Mac</h3>
      <p>
        A restart clears swap files, temporary files and stale caches that macOS creates while it runs. It also lets
        macOS release purgeable space. If you haven&rsquo;t restarted in weeks, this step alone can free several
        gigabytes.
      </p>

      <h3>2. Delete local Time Machine snapshots</h3>
      <p>
        Snapshots are often the single largest part of System Data. The easiest fix is to connect your backup disk and
        let Time Machine finish a backup. To remove snapshots right away, open Terminal and run{" "}
        <code>tmutil listlocalsnapshots /</code>. Then delete each one with{" "}
        <code>sudo tmutil deletelocalsnapshots 2026-10-28-120000</code>, using a date from the list.
      </p>

      <h3>3. Clear app and browser caches</h3>
      <p>
        Open <code>~/Library/Caches</code> with <strong>Go to Folder</strong>. Quit an app, then delete the contents of
        its folder. Leave the Caches folder itself in place. Apps rebuild what they need on their next launch.
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
        in.
      </p>
      <p>
        For every app, browser and system cache, read our guide on{" "}
        <Link href={CACHE_GUIDE_PATH}>how to clear cache on a Mac</Link>.
      </p>

      <h3>4. Delete old log files</h3>
      <p>
        Open <code>~/Library/Logs</code> and delete old logs and the crash reports in{" "}
        <code>DiagnosticReports</code>. They rarely take much space, but a misbehaving app can write gigabytes of logs
        in a few days.
      </p>

      <h3>5. Remove leftovers from uninstalled apps</h3>
      <p>
        Check <code>~/Library/Application Support</code> and <code>~/Library/Containers</code> for folders named after
        apps you no longer have. Delete only those that clearly belong to removed apps. When in doubt, leave the folder.
      </p>

      <h3>6. Clean up developer files</h3>
      <p>If you write code, this fix often frees more space than all the others combined.</p>
      <h4>Xcode</h4>
      <p>
        Delete <code>~/Library/Developer/Xcode/DerivedData</code> and old folders in{" "}
        <code>~/Library/Developer/Xcode/iOS DeviceSupport</code>. Run <code>xcrun simctl delete unavailable</code> to
        remove simulators for iOS versions you no longer use.
      </p>
      <h4>Docker</h4>
      <p>
        Run <code>docker system prune</code> to remove stopped containers and unused images. Docker lists what it will
        delete and asks you to confirm first.
      </p>
      <h4>Homebrew and npm</h4>
      <p>
        Run <code>brew cleanup</code> to remove old package versions, and <code>npm cache clean --force</code> to clear
        the npm download cache.
      </p>

      <h3>7. Rebuild the Spotlight index</h3>
      <p>
        A damaged Spotlight index can grow far beyond its normal size. Open <strong>System Settings</strong>, then{" "}
        <strong>Spotlight</strong>, and click <strong>Search Privacy</strong>. Add your startup disk, wait a minute, then
        remove it. Spotlight rebuilds a fresh, smaller index, and search works more slowly until it finishes.
      </p>

      <h3>8. Update macOS</h3>
      <p>
        Some macOS releases contain bugs that let System Data grow out of control, and Apple fixes them in later
        updates. Choose <strong>System Settings</strong>, then <strong>General</strong>, then{" "}
        <strong>Software Update</strong>, and install any update it offers.
      </p>

      <h2>How to reduce System Data on a MacBook with little storage</h2>
      <p>
        On a MacBook Air or MacBook Pro with 256 GB, System Data hurts more because there is less room to spare. These
        habits help you reduce System Data on a MacBook and keep it low:
      </p>
      <ul>
        <li>
          <strong>Keep at least 20 GB free.</strong> macOS needs room for swap files, updates and snapshots, and it
          clears snapshots more aggressively when space runs low.
        </li>
        <li>
          <strong>Connect your backup disk often.</strong> Each completed backup lets macOS clear older local
          snapshots.
        </li>
        <li>
          <strong>Restart once a week.</strong> Regular restarts stop swap and temporary files from building up.
        </li>
        <li>
          <strong>Turn on Store in iCloud.</strong> Moving documents and photos to iCloud frees room for the files
          macOS needs.
        </li>
      </ul>
      <p>
        For more ways to make room beyond System Data, read our guide on{" "}
        <Link href={GUIDE_PATH}>how to free up space on a Mac</Link>.
      </p>

      <h2>What not to delete</h2>
      <p>When you clear System Data on a Mac, some files look like clutter but keep it running. Leave these alone:</p>
      <ul>
        <li>
          <strong>The System folder and the top-level Library folder.</strong> macOS needs them to start up.
        </li>
        <li>
          <strong>
            Swap files in <code>/private/var/vm</code>.
          </strong>{" "}
          macOS creates and removes them as needed.
        </li>
        <li>
          <strong>
            Anything in <code>/private/var/folders</code>.
          </strong>{" "}
          macOS clears these temporary files itself, and deleting them by hand can crash running apps.
        </li>
        <li>
          <strong>Folders for apps you still use.</strong> They hold your settings, data and sign-ins.
        </li>
      </ul>

      <h2>See what&rsquo;s inside System Data with {APP_NAME}</h2>
      <p>
        Storage settings shows System Data as one grey block. {APP_NAME} opens it up. One scan names each part, from
        caches and snapshots to developer files and app leftovers, and shows its size so you know what is safe to clear.
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
