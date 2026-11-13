import Link from "next/link";
import { AppCallout, GuideLayout, GuideTable } from "@/components/guide-layout";
import { Price } from "@/components/price";
import { articleGraph, innerPageGraph, pageMetadata } from "@/lib/seo";
import {
  APP_NAME,
  CACHE_GUIDE_PATH,
  GUIDE_PATH,
  REFUND_DAYS,
  SYSTEM_DATA_GUIDE_PATH,
  UPDATE_SPACE_GUIDE_PATH,
  XCODE_SPACE_GUIDE_PATH,
} from "@/lib/site";

const market = "us" as const;
const path = XCODE_SPACE_GUIDE_PATH;
const published = "2026-11-13";
const title = "Xcode taking up too much space on your Mac? What to delete and what to keep";
const description =
  "Xcode taking up too much space? Learn how to clear DerivedData, old simulators, runtimes, device support files and archives safely, and what never to delete.";

export const metadata = pageMetadata({
  title: "Xcode Taking Up Too Much Space? Safe Cleanup Guide",
  description,
  path,
  type: "article",
});

const folders = [
  ["DerivedData", "~/Library/Developer/Xcode/DerivedData", "Safe. Xcode rebuilds it on the next build"],
  ["Simulator devices", "~/Library/Developer/CoreSimulator/Devices", "Safe for devices you don't use"],
  ["Simulator runtimes", "Xcode Settings, Components", "Safe for iOS versions you don't test on"],
  ["iOS DeviceSupport", "~/Library/Developer/Xcode/iOS DeviceSupport", "Safe for old iOS versions"],
  ["Archives", "~/Library/Developer/Xcode/Archives", "Keep any build you still need to debug"],
  ["Xcode caches", "~/Library/Caches/com.apple.dt.Xcode", "Safe. Quit Xcode first"],
];

const faqs = [
  {
    q: "Why is Xcode taking up so much space on my Mac?",
    a: "Xcode itself is large, but most of the space goes to files it creates as you work: DerivedData from every build, simulator runtimes for each iOS version, device support files for every iPhone you connect and archives of every release you ship.",
  },
  {
    q: "Is it safe to delete DerivedData?",
    a: "Yes. DerivedData holds build products and indexes that Xcode recreates. Quit Xcode, delete the folder's contents, and expect the next build of each project to take longer than usual.",
  },
  {
    q: "Can I delete the whole CoreSimulator folder?",
    a: "It is better not to. Delete unused simulator devices and runtimes through Xcode or simctl instead. That way Xcode's own records stay in step with what is on disk.",
  },
  {
    q: "Should I delete old Xcode archives?",
    a: "Only for builds you no longer support. An archive holds the debug symbols you need to read crash reports from that version. If users still run a build, keep its archive.",
  },
  {
    q: "What is iOS DeviceSupport, and can I delete it?",
    a: "Xcode creates a folder of debug symbols for each iOS version it sees on a connected device. Folders for iOS versions your devices no longer run are safe to delete. Xcode recreates one the next time you connect a device on that version.",
  },
  {
    q: "Why did a simulator runtime come back after I deleted it?",
    a: "Some runtimes are managed by macOS as system assets, and removal can take effect only after a restart. If one keeps returning, check Xcode Settings, then Components, after restarting, and avoid deleting protected system folders by hand.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "Xcode taking up too much space", description }),
  ...articleGraph({ path, headline: title, description, published, updated: published, language: "en", faqs }),
];

export default function XcodeSpaceGuide() {
  return (
    <GuideLayout
      market={market}
      title={title}
      intro="You installed Xcode, built a few apps and now your disk is full. Xcode itself is only part of the problem. The build data, simulators and debug files it creates grow quietly in the background. Here is what each one is and how to clear it without breaking your projects."
      breadcrumb="Xcode taking up space"
      updated={published}
      readMinutes={7}
      takeaways={[
        "Most of Xcode's space is build data and simulators, not the app itself.",
        "DerivedData and Xcode caches are always safe to delete. They rebuild.",
        "Remove simulators and runtimes through Xcode or simctl, not Finder.",
        "Keep archives for any release you still need to debug.",
      ]}
      toc={[
        { id: "where", label: "Where the space goes" },
        { id: "measure", label: "Measure it" },
        { id: "clean", label: "6 cleanup steps" },
        { id: "keep", label: "What to keep" },
        { id: "faq", label: "FAQ" },
      ]}
      related={[
        { href: SYSTEM_DATA_GUIDE_PATH, label: "How to reduce System Data on a Mac" },
        { href: CACHE_GUIDE_PATH, label: "How to clear cache on a Mac" },
        { href: UPDATE_SPACE_GUIDE_PATH, label: "Not enough space to update your Mac" },
        { href: GUIDE_PATH, label: "How to free up space on a Mac" },
      ]}
      graph={graph}
      faqs={faqs}
      closing={
        <>
          Clear build data, simulators and node_modules in one place. <Price /> once, with a {REFUND_DAYS}-day refund.
        </>
      }
    >
      <h2 id="where">Where Xcode&rsquo;s space actually goes</h2>
      <p>
        The Xcode app in your Applications folder is several gigabytes on its own. That part is fixed. The rest lives
        in your user Library and grows every time you build, run a simulator or connect a device.
      </p>
      <GuideTable head={["What it is", "Where it lives", "Safe to delete?"]} rows={folders} />
      <p>
        On macOS, Storage settings counts most of this as <strong>Developer</strong> or <strong>System Data</strong>,
        which is why a grey bar can grow by tens of gigabytes without an obvious cause.
      </p>

      <h2 id="measure">Measure before you delete</h2>
      <p>Spend a minute finding the biggest folder first. Open Terminal and run:</p>
      <ul>
        <li>
          <code>du -sh ~/Library/Developer/Xcode/*</code>
        </li>
        <li>
          <code>du -sh ~/Library/Developer/CoreSimulator</code>
        </li>
      </ul>
      <p>
        Each line shows a folder and its size. Start your cleanup with whichever is largest. You can also open{" "}
        <code>~/Library/Developer</code> in Finder with <strong>Shift-Command-G</strong> and turn on{" "}
        <strong>Calculate all sizes</strong> in <strong>View Options</strong>.
      </p>

      <h2 id="clean">6 ways to free up space from Xcode</h2>
      <p>Quit Xcode and the Simulator app before you start.</p>

      <h3>1. Delete DerivedData</h3>
      <p>
        DerivedData holds the build products, indexes and logs for every project you have ever opened. Projects you
        deleted months ago still have folders here.
      </p>
      <ol>
        <li>
          In Finder, press <strong>Shift-Command-G</strong> and go to{" "}
          <code>~/Library/Developer/Xcode/DerivedData</code>.
        </li>
        <li>Select everything inside and move it to the Trash.</li>
        <li>Empty the Trash.</li>
      </ol>
      <p>
        Xcode recreates what it needs on your next build, which takes longer than usual once. For a single project,{" "}
        <strong>Product</strong>, then <strong>Clean Build Folder</strong>, is the gentler option, though it frees
        less.
      </p>

      <h3>2. Remove simulators you don&rsquo;t use</h3>
      <p>
        Every simulator device keeps its own apps and data. Old devices from past Xcode versions often linger after
        their runtime is gone.
      </p>
      <ol>
        <li>
          In Terminal, run <code>xcrun simctl delete unavailable</code>. This removes devices whose runtime is no
          longer installed.
        </li>
        <li>
          For the rest, open Xcode, choose <strong>Window</strong>, then <strong>Devices and Simulators</strong>,
          click <strong>Simulators</strong>, right-click a device you don&rsquo;t use and choose{" "}
          <strong>Delete</strong>.
        </li>
      </ol>
      <h4>Reset rather than delete</h4>
      <p>
        If a simulator you still use has grown large, reset it instead. Run <code>xcrun simctl erase all</code> to
        wipe the data on every simulator while keeping the devices themselves.
      </p>

      <h3>3. Remove old simulator runtimes</h3>
      <p>
        Runtimes are the biggest single items, often several gigabytes each. You need one only for the iOS, watchOS,
        tvOS or visionOS versions you actually test on.
      </p>
      <ol>
        <li>
          Open Xcode, choose <strong>Xcode</strong>, then <strong>Settings</strong>, then{" "}
          <strong>Components</strong>. Older versions call this tab <strong>Platforms</strong>.
        </li>
        <li>Select a runtime you no longer need.</li>
        <li>
          Click the <strong>minus</strong> button and confirm.
        </li>
      </ol>
      <p>
        From Terminal, <code>xcrun simctl runtime list</code> shows installed runtimes with their IDs, and{" "}
        <code>xcrun simctl runtime delete</code> followed by an ID removes one. Some runtimes disappear only after a
        restart, so check again after you reboot.
      </p>

      <h3>4. Clear old iOS DeviceSupport files</h3>
      <p>
        Each time you connect an iPhone running a new iOS version, Xcode copies debug symbols for it. Over a few years
        you can collect a folder for every point release you ever ran.
      </p>
      <p>
        Go to <code>~/Library/Developer/Xcode/iOS DeviceSupport</code> and delete folders for iOS versions your devices
        no longer use. Keep the newest. Xcode recreates any folder it needs when you next connect a device. The same
        applies to the <code>watchOS DeviceSupport</code> folder if you have one.
      </p>

      <h3>5. Prune old archives</h3>
      <p>
        Every time you archive a build to upload or export it, Xcode keeps a copy, debug symbols included. Open Xcode,
        choose <strong>Window</strong>, then <strong>Organizer</strong>, and review the <strong>Archives</strong>{" "}
        list. Delete builds for versions you no longer support. Read the next section first.
      </p>

      <h3>6. Clear Xcode and Swift package caches</h3>
      <p>
        Xcode keeps a general cache at <code>~/Library/Caches/com.apple.dt.Xcode</code>, and Swift Package Manager
        keeps downloaded packages at <code>~/Library/Caches/org.swift.swiftpm</code>. Both are safe to empty with
        Xcode closed. Packages download again the next time a project resolves them.
      </p>

      <h3>The Storage settings shortcut</h3>
      <p>
        macOS also offers a quick route. Open <strong>System Settings</strong>, then <strong>General</strong>, then{" "}
        <strong>Storage</strong>, and click the info button next to <strong>Developer</strong>. It lists Xcode caches,
        build files and some simulator data with their sizes, and you can delete them from there. It doesn&rsquo;t
        show archives or runtimes, so use the steps above for a full cleanup.
      </p>

      <AppCallout market={market} title="Clear developer files without a Terminal session">
        {APP_NAME} finds Xcode DerivedData, simulators, build output and <code>node_modules</code> folders across your
        whole Mac, lists them with sizes and clears them to the Trash, with Undo ready if a build complains.
      </AppCallout>

      <h2 id="keep">What to keep, even when space is tight</h2>
      <h3>Archives for live releases</h3>
      <p>
        An archive holds the dSYM files that turn crash reports into readable stack traces. If users still run a
        version, keep its archive, or export its dSYMs somewhere safe first.
      </p>
      <h3>The runtime for your deployment target</h3>
      <p>
        Keep at least one runtime that matches the oldest iOS version you support, plus the current one. Without them,
        you can&rsquo;t test the versions your users run.
      </p>
      <h3>Anything inside /System or /Library you didn&rsquo;t create</h3>
      <p>
        Some simulator runtimes live in protected system folders. Remove them through Xcode or simctl, never by
        deleting folders with administrator rights. Forcing it can leave Xcode unable to find the runtimes you kept.
      </p>

      <h2>If something breaks after a cleanup</h2>
      <p>None of the steps above touch your source code, but a few things can look odd the first time you open Xcode.</p>
      <h3>The first build is slow</h3>
      <p>
        That is expected after you clear DerivedData. Xcode rebuilds every module and reindexes the project once.
        Later builds return to normal speed.
      </p>
      <h3>Autocomplete or jump-to-definition stops working</h3>
      <p>
        Indexing runs in the background after a cleanup. Give it a few minutes. If it stays broken, quit Xcode, clear
        DerivedData for that project again and reopen it.
      </p>
      <h3>A simulator you need has gone</h3>
      <p>
        Open <strong>Xcode</strong>, then <strong>Settings</strong>, then <strong>Components</strong>, and download the
        runtime again. Then add a device in <strong>Devices and Simulators</strong>. Your project and its code are
        unaffected.
      </p>
      <h3>Packages fail to resolve</h3>
      <p>
        Choose <strong>File</strong>, then <strong>Packages</strong>, then <strong>Reset Package Caches</strong>, and
        let Xcode download them again.
      </p>

      <h2>Do you have more than one copy of Xcode?</h2>
      <p>
        Beta testers often keep a release Xcode and a beta side by side. Each copy is several gigabytes, and each one
        downloads its own components. Check <strong>Applications</strong> for apps named <code>Xcode-beta</code> or
        with a version number, and delete the ones you have finished with.
      </p>
      <p>
        If you also work on web projects, look for old <code>node_modules</code> folders too. Projects you
        haven&rsquo;t touched in months can hold hundreds of megabytes each, and <code>npm install</code> brings them
        back whenever you need them.
      </p>

      <h2>Keep Xcode lean from now on</h2>
      <ul>
        <li>Clear DerivedData every month or two, and whenever builds act strangely.</li>
        <li>Remove the previous runtime once you drop support for that iOS version.</li>
        <li>Run <code>xcrun simctl delete unavailable</code> after every major Xcode update.</li>
        <li>Review the Organizer when you ship a release and drop archives you no longer need.</li>
      </ul>
      <p>
        If Xcode isn&rsquo;t the whole story, our guide on <Link href={GUIDE_PATH}>how to free up space on a Mac</Link>{" "}
        covers the rest of the disk.
      </p>

      <h2>Clean developer files in one scan with {APP_NAME}</h2>
      <p>
        {APP_NAME} has a Developer files tool built for this job. It scans locally, so your project names never leave
        your Mac, and it moves everything to the Trash rather than deleting it. It costs <Price /> once, with no
        subscription. Learn more on the <Link href="/">home page</Link>.
      </p>
    </GuideLayout>
  );
}
