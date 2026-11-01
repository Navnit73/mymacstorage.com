import Link from "next/link";
import { AppCallout, GuideLayout, GuideTable } from "@/components/guide-layout";
import { articleGraph, innerPageGraph, pageMetadata } from "@/lib/seo";
import { APP_NAME, GUIDES, MARKETS, REFUND_DAYS, guideAlternates, guidePath } from "@/lib/site";

const market = "us" as const;
const { hreflang, price, cleanerPath, cleanerLabel } = MARKETS[market];
const key = "appCleaner";
const path = guidePath(market, key);
const title = "App cleaner for Mac: how to uninstall apps and remove every leftover";
const description =
  "Dragging an app to the Trash leaves files behind. Learn how an app cleaner for Mac removes apps completely, by hand, with free AppCleaner or with one scan.";

export const metadata = pageMetadata({
  title: "App Cleaner for Mac: Uninstall Apps Completely",
  description,
  path,
  type: "article",
  hreflang,
  alternates: guideAlternates(market, key),
});

const leftovers = [
  ["~/Library/Application Support", "Settings, databases and downloaded content", "Yes, once the app is gone"],
  ["~/Library/Caches", "Temporary files the app rebuilt on its own", "Yes"],
  ["~/Library/Preferences", "Small .plist files with the app’s settings", "Yes, but you lose your settings"],
  ["~/Library/Containers", "Data for sandboxed and App Store apps", "Yes, for apps you removed"],
  ["~/Library/Logs", "Log and crash reports", "Yes"],
  ["~/Library/LaunchAgents", "Helpers that start at login", "Yes, only if they belong to the removed app"],
];

const options = [
  ["Drag to the Trash", "Free", "Apps you installed yourself", "Leaves support files behind"],
  ["Manual cleanup", "Free", "Careful users with 20 spare minutes", "Slow, and easy to miss a folder"],
  ["AppCleaner by FreeMacSoft", "Free", "Removing one app at a time", "Uninstalls only. It doesn’t show disk usage"],
  ["Paid uninstallers", "Paid", "People who want extra tools, such as extension managers", "Check the plan and the macOS support first"],
  [APP_NAME, `${price} once`, "Uninstalling, plus every other kind of cleanup", "No free trial, but a refund within 7 days"],
];

const faqs = [
  {
    q: "Does dragging an app to the Trash remove it completely?",
    a: "No. It removes the app itself. Settings, caches, logs and helper files stay in your Library folder until you delete them. An app’s own uninstaller, or an app cleaner, removes these too.",
  },
  {
    q: "Is there a free app cleaner for Mac?",
    a: "Yes. AppCleaner by FreeMacSoft is free and finds an app’s related files when you drop the app onto its window. Download it from the developer’s own website, because several look-alike sites bundle other software.",
  },
  {
    q: "Is AppCleaner safe?",
    a: "The original AppCleaner from FreeMacSoft has a long record and is widely used. Always check the files it lists before you confirm, and keep a Time Machine backup in case you remove something you wanted.",
  },
  {
    q: "Why won’t an app delete from my Mac?",
    a: "Usually the app is still running. Quit it, or force quit it from Activity Monitor, then try again. Apps built into macOS are protected and can’t be removed.",
  },
  {
    q: "How much space do app leftovers take?",
    a: "Most apps leave a few megabytes. Apps that store projects, models or downloaded content, such as video editors, games and creative suites, can leave several gigabytes.",
  },
  {
    q: "Do I need an app cleaner on an Apple silicon Mac?",
    a: "Apple silicon Macs leave the same leftovers as Intel Macs, so the same methods apply. The Trash method and a cleaner both work on every Mac that runs macOS 14 or later.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "App cleaner for Mac", description, language: hreflang }),
  ...articleGraph({ path, headline: title, description, published: "2026-11-01", updated: "2026-11-01", language: hreflang, faqs }),
];

export default function AppCleanerGuide() {
  return (
    <GuideLayout
      market={market}
      title={title}
      intro="Every app you drag to the Trash leaves files behind. This guide shows how to uninstall apps on a Mac completely, with built-in tools, with a free app cleaner and with one scan."
      breadcrumb="App cleaner for Mac"
      updated="2026-11-01"
      readMinutes={7}
      takeaways={[
        "Apple’s own steps remove only the app. Settings, caches and helpers stay behind.",
        "An app’s own uninstaller is the best first choice when one exists.",
        "AppCleaner by FreeMacSoft is a free app cleaner that lists related files before it deletes them.",
        `${APP_NAME} shows every app with its full size, plus leftovers from apps you already removed.`,
      ]}
      toc={[
        { id: "why", label: "Why the Trash isn’t enough" },
        { id: "uninstall", label: "How to uninstall" },
        { id: "leftovers", label: "Find leftovers" },
        { id: "free", label: "Free app cleaner" },
        { id: "compare", label: "Compared" },
        { id: "faq", label: "FAQ" },
      ]}
      related={[
        { href: cleanerPath, label: cleanerLabel },
        { href: guidePath(market, "cleanMyMacAlternative"), label: GUIDES.cleanMyMacAlternative.label },
        { href: guidePath(market, "diskAnalyzer"), label: GUIDES.diskAnalyzer.label },
        { href: "/guides/how-to-free-up-space-on-mac", label: "How to free up space on a Mac" },
      ]}
      graph={graph}
      faqs={faqs}
      closing={`See every app and every leftover in one scan. ${price} once, with a ${REFUND_DAYS}-day refund.`}
    >
      <h2 id="why">Why dragging an app to the Trash isn’t enough</h2>
      <p>
        When you drag an app to the Trash, macOS removes the app itself and nothing else. Apple’s own instructions say
        the same: if an app comes with an uninstaller, that is the best way to remove the app along with any login
        items, extensions and other data it stored elsewhere.
      </p>
      <p>
        Most apps never include an uninstaller, so those files stay on your disk. One forgotten app leaves little
        behind. Years of trying and removing apps leave gigabytes of settings, caches and helpers, and macOS counts
        most of them under System Data.
      </p>
      <h3>Where an app hides its files</h3>
      <p>These are the folders inside your Library that apps use most. Each one belongs to you, not to macOS.</p>
      <GuideTable head={["Folder", "What it holds", "Safe to remove?"]} rows={leftovers} />
      <p>
        Delete a leftover only when you are sure the app is gone for good. If you reinstall later, a fresh copy starts
        with default settings.
      </p>

      <h2 id="uninstall">How to uninstall an app on a Mac</h2>
      <p>Pick the method that matches how you installed the app. Quit the app first, whichever you choose.</p>

      <h3>Method 1: Use the app’s own uninstaller</h3>
      <p>
        Open the app’s folder in <strong>Applications</strong> and look for a file named <strong>Uninstall</strong> or{" "}
        <strong>Uninstaller</strong>. Adobe, Microsoft Office and many drivers include one. Some apps also add a
        remove or reset option in their menus or settings. Run it, follow the prompts and you are done.
      </p>

      <h3>Method 2: Move the app to the Trash</h3>
      <ol>
        <li>Open Finder and choose <strong>Applications</strong>, or find the app with Spotlight.</li>
        <li>Select the app and choose <strong>File</strong>, then <strong>Move to Trash</strong>.</li>
        <li>Enter your administrator password if macOS asks.</li>
        <li>Choose <strong>Finder</strong>, then <strong>Empty Trash</strong>, to get the space back.</li>
      </ol>

      <h3>Method 3: Delete it from Storage settings</h3>
      <p>
        Open <strong>System Settings</strong>, then <strong>General</strong>, then <strong>Storage</strong>. Click the
        info button next to <strong>Applications</strong>, sort by size and delete the apps you no longer open. This
        view makes the biggest apps easy to spot.
      </p>

      <h3>Method 4: Delete App Store apps from Launchpad</h3>
      <p>
        Open Launchpad, then click and hold any app until the icons wiggle. Apps downloaded from the App Store show an
        X in the corner, so click it and confirm. Other apps don’t show an X, so use method 2 for them.
      </p>

      <AppCallout market={market} title="Skip the folder hunt">
        {APP_NAME} lists every app with its full size, so the space hogs rise to the top. Its Applications tool also
        finds leftovers from apps you removed long ago. You review the list, then clear it to the Trash with Undo ready.
      </AppCallout>

      <h2 id="leftovers">How to find and delete leftover files by hand</h2>
      <p>
        This takes about 20 minutes for one app, and it works without any extra software. You search each Library
        folder for the app’s name.
      </p>
      <ol>
        <li>In Finder, choose <strong>Go</strong>, then <strong>Go to Folder</strong>, and enter <code>~/Library</code>.</li>
        <li>Open <strong>Application Support</strong>. Look for a folder named after the app or its developer.</li>
        <li>Repeat in <strong>Caches</strong>, <strong>Preferences</strong>, <strong>Containers</strong>, <strong>Logs</strong> and <strong>LaunchAgents</strong>.</li>
        <li>Drag each matching item to the Trash, then empty it.</li>
      </ol>
      <h3>Check login items and background helpers</h3>
      <p>
        Open <strong>System Settings</strong>, then <strong>General</strong>, then{" "}
        <strong>Login Items &amp; Extensions</strong>. Switch off helpers that belong to apps you removed.
      </p>
      <h3>Know what to leave alone</h3>
      <p>
        Never delete anything from the top-level <code>/Library</code> or <code>/System</code> folders unless an
        uninstaller tells you to. When you are not sure whether a folder belongs to a removed app, leave it. A few
        spare megabytes cost less than a broken app.
      </p>

      <h2 id="free">Free app cleaner for Mac: AppCleaner by FreeMacSoft</h2>
      <p>
        AppCleaner is a small free app that does one job well. You drag an app onto its window, it lists the related
        files in your Library, and you choose what to delete. That saves you the manual search above.
      </p>
      <h3>How to use AppCleaner</h3>
      <ol>
        <li>Download AppCleaner from the developer’s website, <strong>freemacsoft.net</strong>.</li>
        <li>Open it, then drag the app you want to remove into its window.</li>
        <li>Review the list of files it found, and untick anything you want to keep.</li>
        <li>Click <strong>Remove</strong>.</li>
      </ol>
      <h3>Watch out for look-alikes</h3>
      <p>
        Several apps have similar names. <em>App Cleaner &amp; Uninstaller</em>, for example, is a separate paid product
        from a different developer. Search results also include download sites that wrap installers with extra
        software, so always use the developer’s own page.
      </p>
      <p>
        AppCleaner removes apps, and that is all it does. It can’t show you what else fills your disk. For a wider
        cleanup, read our guide on <Link href={guidePath(market, "diskAnalyzer")}>Mac disk space analyzers</Link>.
      </p>

      <h2 id="compare">App cleaner options compared</h2>
      <GuideTable head={["Option", "Cost", "Best for", "Limits"]} rows={options} />

      <h2>Which apps to uninstall first</h2>
      <p>Sort the Applications list in Storage settings by size, then work from the top. These usually pay off most:</p>
      <ul>
        <li><strong>Creative suites and video editors.</strong> They hold large caches, presets and project files.</li>
        <li><strong>Games.</strong> A single title can use tens of gigabytes.</li>
        <li><strong>Extra browsers.</strong> Each one keeps its own cache and profile data.</li>
        <li><strong>Trial software.</strong> You tried it once, and it still sits on your disk.</li>
        <li><strong>Developer tools you no longer use.</strong> Xcode and its simulators take enormous space.</li>
      </ul>

      <h2>How {APP_NAME} removes apps and leftovers</h2>
      <p>
        {APP_NAME} is a native Mac storage cleaner. Its Applications tool lists every app with its full size, plus the
        files that apps you already removed left behind. You decide what goes. Everything moves to the Trash, and Undo
        puts a whole cleanup back with one click.
      </p>
      <p>
        The same scan also finds large files, byte-for-byte duplicates and caches, so you clear everything in one
        pass. Scanning runs on your Mac, and no filename leaves it. It costs {price} once, with no subscription and a{" "}
        {REFUND_DAYS}-day refund. See the full feature tour on the <Link href="/">home page</Link>.
      </p>
    </GuideLayout>
  );
}
