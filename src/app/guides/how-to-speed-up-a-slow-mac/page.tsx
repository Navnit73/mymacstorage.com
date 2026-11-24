import Link from "next/link";
import { AppCallout, GuideLayout, GuideTable } from "@/components/guide-layout";
import { Price } from "@/components/price";
import { articleGraph, innerPageGraph, pageMetadata } from "@/lib/seo";
import {
  APP_NAME,
  CACHE_GUIDE_PATH,
  CLEAR_RAM_GUIDE_PATH,
  GUIDE_PATH,
  LARGE_FILES_GUIDE_PATH,
  REFUND_DAYS,
  SPEED_UP_GUIDE_PATH,
  SYSTEM_DATA_GUIDE_PATH,
  UPDATE_SPACE_GUIDE_PATH,
} from "@/lib/site";

const market = "us" as const;
const path = SPEED_UP_GUIDE_PATH;
const published = "2026-11-24";
const title = "How to speed up a slow Mac: find the cause, then fix it";
const description =
  "Mac running slow? Find the real cause in Activity Monitor, then fix it: login items, low disk space, swap, Spotlight indexing, browser tabs and safe mode.";

export const metadata = pageMetadata({
  title: "How to Speed Up a Slow Mac (12 Real Fixes)",
  description,
  path,
  type: "article",
});

const symptoms = [
  ["Slow for a while after you log in", "Too many login items and background tasks", "Fix 3"],
  ["Fans loud, battery draining fast", "One process using lots of CPU", "Fix 2"],
  ["Beach ball when you switch apps", "Memory pressure and swap", "Fix 2 and fix 4"],
  ["Everything slow and the disk nearly full", "Too little free space for swap and caches", "Fix 4"],
  ["Slow for hours after an update or migration", "Spotlight and Photos indexing", "Fix 7"],
  ["Only the browser is slow", "Tabs and extensions", "Fix 6"],
];

const faqs = [
  {
    q: "Why is my Mac suddenly so slow?",
    a: "A sudden slowdown usually has one cause: a process stuck at high CPU, a disk that has just filled up, or indexing after an update. Open Activity Monitor, sort by CPU and check free space in Storage settings first. Those two checks explain most cases.",
  },
  {
    q: "Does a full disk slow down a Mac?",
    a: "Yes. macOS needs free space for swap files, caches and updates, and it slows down when it runs short. There is no official figure, but a common rule of thumb is to keep 10 to 15 percent of the disk free.",
  },
  {
    q: "Will clearing RAM speed up my Mac?",
    a: "Rarely for long. macOS fills spare memory with cached data on purpose and frees it when apps need it. Quitting the app that uses the most memory helps; memory cleaner apps generally do not.",
  },
  {
    q: "Should I reset the SMC or NVRAM to speed up my Mac?",
    a: "Only on an Intel Mac, and only for specific hardware symptoms such as fans or power behaving oddly. Apple silicon Macs have no SMC reset, and restarting covers what these resets used to do.",
  },
  {
    q: "Does a Mac cleaner app make a Mac faster?",
    a: "Only when the slowdown comes from low disk space. Freeing space gives macOS room for swap and caches. A cleaner that deletes caches on a Mac with plenty of space can even make apps slower for a while as they rebuild them.",
  },
  {
    q: "When is it time to upgrade instead?",
    a: "When Activity Monitor shows memory pressure in the red during normal work, or your Mac no longer gets current macOS versions. At that point, software fixes have little left to give.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "Speed up a slow Mac", description }),
  ...articleGraph({ path, headline: title, description, published, updated: published, language: "en", faqs }),
];

export default function SpeedUpMacGuide() {
  return (
    <GuideLayout
      market={market}
      title={title}
      intro="A slow Mac almost always has a cause you can see. Spend two minutes finding it before you change anything, then use the fix that matches. This guide covers 12 fixes, from the free and instant to the ones worth saving for last."
      breadcrumb="Speed up a slow Mac"
      updated={published}
      readMinutes={9}
      takeaways={[
        "Activity Monitor tells you whether CPU, memory or the disk is the bottleneck.",
        "Login items and background items are the most common cause of a slow start.",
        "A nearly full disk slows everything, because swap and caches need room.",
        "Skip memory cleaners and random resets; they rarely fix the real cause.",
      ]}
      toc={[
        { id: "diagnose", label: "Find the cause" },
        { id: "fixes", label: "12 fixes" },
        { id: "skip", label: "What to skip" },
        { id: "hardware", label: "When it’s hardware" },
        { id: "faq", label: "FAQ" },
      ]}
      related={[
        { href: CLEAR_RAM_GUIDE_PATH, label: "How to clear RAM on a Mac" },
        { href: GUIDE_PATH, label: "How to free up space on a Mac" },
        { href: SYSTEM_DATA_GUIDE_PATH, label: "How to reduce System Data on a Mac" },
        { href: CACHE_GUIDE_PATH, label: "How to clear cache on a Mac" },
      ]}
      graph={graph}
      faqs={faqs}
      closing={
        <>
          Give macOS the free space it needs to run well. <Price /> once, with a {REFUND_DAYS}-day refund.
        </>
      }
    >
      <h2 id="diagnose">Step 1: find out what is actually slow</h2>
      <p>
        “Slow” can mean three different problems: the processor is busy, memory is full, or the disk is full. Each
        has a different fix, so check before you act. Open <strong>Activity Monitor</strong> from{" "}
        <code>/Applications/Utilities</code>, or press <strong>Command-Space</strong> and type its name.
      </p>
      <h3>Check the CPU tab</h3>
      <p>
        Click the <strong>% CPU</strong> column to sort by it. A single process near or above 100% for minutes at a
        time is a strong suspect. Note its name. If it is an app you recognize, quit it. If it is a system process
        such as <code>mds_stores</code> or <code>photoanalysisd</code>, it is probably indexing, which ends on its own.
      </p>
      <h3>Check the Memory tab</h3>
      <p>
        Look at the <strong>Memory Pressure</strong> graph at the bottom, not the “Memory Used” number. Green means
        macOS is coping. Yellow means it is compressing memory. Red means it is swapping to disk heavily, and that is
        when your Mac feels sluggish. Also note <strong>Swap Used</strong>: several gigabytes of swap on a Mac that
        feels slow points to memory.
      </p>
      <h3>Check free disk space</h3>
      <p>
        Open <strong>System Settings</strong>, then <strong>General</strong>, then <strong>Storage</strong>. If the bar is
        nearly full, that alone can explain a slow Mac, because swap and caches compete for the little room left.
      </p>
      <h3>Match the symptom to the fix</h3>
      <GuideTable head={["What you notice", "Likely cause", "Start with"]} rows={symptoms} />

      <h2 id="fixes">12 ways to speed up a slow Mac</h2>

      <h3>1. Restart</h3>
      <p>
        It sounds too simple, but a restart clears stuck processes, resets swap and lets pending updates finish. If
        your Mac has been running for weeks, restart before anything else and see whether the problem returns.
      </p>

      <h3>2. Quit the process that is hogging CPU or memory</h3>
      <p>
        In Activity Monitor, select the process, click the <strong>Stop</strong> button (the octagon with an X) and
        choose <strong>Quit</strong>. Use <strong>Force Quit</strong> only if Quit doesn’t work, since unsaved work is
        lost. If the same app keeps returning to the top, check for an update to it or replace it.
      </p>

      <h3>3. Cut login items and background items</h3>
      <p>
        Apps that start at login slow down startup and keep running all day. Open <strong>System Settings</strong>,
        then <strong>General</strong>, then <strong>Login Items &amp; Extensions</strong> (just{" "}
        <strong>Login Items</strong> on older macOS versions).
      </p>
      <ul>
        <li>
          Under <strong>Open at Login</strong>, select apps you don’t need straight away and click the minus button.
        </li>
        <li>
          Under <strong>Allow in the Background</strong>, turn off helpers for apps you no longer use. Leave security
          software and backup tools alone unless you know you don’t need them.
        </li>
      </ul>
      <p>Restart, then compare how quickly your Mac becomes usable.</p>

      <h3>4. Free up disk space</h3>
      <p>
        macOS writes swap files and caches to your startup disk. When the disk is nearly full, both suffer, and so
        does every app that saves files. Start with the biggest items: old videos, disk images, iPhone backups and
        apps you don’t use. Our guides on{" "}
        <Link href={GUIDE_PATH}>how to free up space on a Mac</Link> and{" "}
        <Link href={LARGE_FILES_GUIDE_PATH}>how to find large files</Link> walk through each one.
      </p>

      <h3>5. Install macOS and app updates</h3>
      <p>
        Updates fix bugs that cause runaway processes and memory leaks. Open <strong>System Settings</strong>, then{" "}
        <strong>General</strong>, then <strong>Software Update</strong>. If an update says there isn’t enough space, read{" "}
        <Link href={UPDATE_SPACE_GUIDE_PATH}>what to do when there isn’t enough space to update</Link>.
      </p>

      <h3>6. Tame your browser</h3>
      <p>
        A browser with dozens of tabs can use more memory than every other app combined. Each tab is its own process
        in Safari and Chrome, so they show up separately in Activity Monitor.
      </p>
      <ul>
        <li>Close tabs you aren’t using, or save them as bookmarks.</li>
        <li>Remove extensions you don’t use. Each one runs on every page you open.</li>
        <li>In Chrome, open the browser’s own Task Manager from the Window menu to find the heaviest tab.</li>
      </ul>

      <h3>7. Let indexing finish, or rebuild a stuck index</h3>
      <p>
        After an update or a migration, Spotlight and Photos re-index your files. Your Mac can feel slow for a few
        hours while they work. Leave it plugged in and awake, ideally overnight.
      </p>
      <p>
        If <code>mds_stores</code> still sits near the top of the CPU list days later, the index may be stuck. Rebuild it
        by adding your disk to the Spotlight privacy list in System Settings, waiting a moment, then removing it. You
        can also run <code>sudo mdutil -E /</code> in Terminal. Search results are incomplete until the rebuild ends.
      </p>

      <h3>8. Quit apps you aren’t using</h3>
      <p>
        Closing a window doesn’t quit most Mac apps. A dot under the icon in the Dock means the app is still running.
        Press <strong>Command-Q</strong> in apps you’ve finished with, especially heavy ones such as video editors,
        virtual machines and design tools.
      </p>

      <h3>9. Reduce visual effects on older Macs</h3>
      <p>
        On older Intel Macs, transparency and motion effects cost a little performance. Open{" "}
        <strong>System Settings</strong>, then <strong>Accessibility</strong>, then <strong>Display</strong>, and turn on{" "}
        <strong>Reduce transparency</strong> and <strong>Reduce motion</strong>. On Apple silicon the difference is
        usually too small to notice.
      </p>

      <h3>10. Start up in safe mode once</h3>
      <p>
        Safe mode loads only what macOS needs, checks your startup disk and clears some system caches. If your Mac is
        fast in safe mode, a login item or third-party extension is the likely cause.
      </p>
      <ul>
        <li>
          <strong>Apple silicon:</strong> shut down, then press and hold the power button until startup options
          appear. Select your disk, hold <strong>Shift</strong> and click <strong>Continue in Safe Mode</strong>.
        </li>
        <li>
          <strong>Intel:</strong> restart and hold <strong>Shift</strong> until the login window appears.
        </li>
      </ul>
      <p>Restart normally afterward.</p>

      <h3>11. Reset NVRAM or the SMC (Intel Macs only)</h3>
      <p>
        These resets fix specific hardware behavior, such as fans running constantly or odd power issues. They are not
        general speed fixes. Apple silicon Macs don’t have an SMC reset, and restarting covers what these resets used
        to do. On an Intel Mac, follow Apple’s instructions for your exact model.
      </p>

      <h3>12. Test with a new user account</h3>
      <p>
        Create a temporary user in <strong>System Settings</strong> under <strong>Users &amp; Groups</strong> and log
        in to it. If that account is fast, the problem is in your own login items, preferences or caches, not macOS
        itself. That narrows the search a lot.
      </p>

      <AppCallout market={market} title="If the disk is the bottleneck, clear it safely">
        {APP_NAME} scans your Mac on the device and lists caches, large files, duplicates, app leftovers, iPhone
        backups and old installers with their sizes. You choose what goes, it all moves to the Trash and Undo puts it
        back.
      </AppCallout>

      <h2 id="skip">What not to bother with</h2>
      <h3>Memory cleaner apps</h3>
      <p>
        macOS uses spare memory as a cache on purpose and frees it when apps need it. Forcing it empty means apps
        reload data from disk, which can make things slower. Our guide on{" "}
        <Link href={CLEAR_RAM_GUIDE_PATH}>how to clear RAM on a Mac</Link> explains what actually helps.
      </p>
      <h3>Deleting caches on a Mac with plenty of space</h3>
      <p>
        Caches exist to make apps faster. Clearing them frees space, but apps rebuild them on next launch, so they can
        feel slower at first. Clear caches when you need the space or when one app misbehaves. See{" "}
        <Link href={CACHE_GUIDE_PATH}>how to clear cache on a Mac</Link> for the safe way.
      </p>
      <h3>Terminal tweaks from old forum posts</h3>
      <p>
        Commands that disable system services, Spotlight or security features rarely help on modern macOS and can
        cause problems that are hard to trace later. If you don’t know what a command does, don’t run it.
      </p>

      <h2 id="hardware">When the slowdown is hardware</h2>
      <p>Software fixes have limits. These are signs you have reached them:</p>
      <ul>
        <li>Memory pressure turns yellow or red during your normal work, even after a restart with few apps open.</li>
        <li>Your Mac no longer receives current macOS versions, so apps stop being optimized for it.</li>
        <li>On an Intel Mac with a spinning hard drive, every task waits on the disk.</li>
        <li>A MacBook battery is reported as needing service, which can limit performance.</li>
      </ul>
      <p>
        Apple silicon Macs can’t be upgraded after purchase, so the fix is a Mac with more memory. If you are buying,
        pick memory for the apps you run, and a disk big enough to keep plenty of space free.
      </p>

      <h2>A five-minute routine to keep your Mac fast</h2>
      <ol>
        <li>Restart at least once a week.</li>
        <li>Install updates when they arrive.</li>
        <li>Review Login Items &amp; Extensions every few months.</li>
        <li>Keep a healthy share of the disk free.</li>
        <li>Glance at Activity Monitor whenever your Mac feels off, before you reach for a fix.</li>
      </ol>
      <p>
        If free space is the part you keep losing, {APP_NAME} shows exactly what fills your disk and clears it to the
        Trash. It costs <Price /> once, with no subscription. Learn more on the <Link href="/">home page</Link>.
      </p>
    </GuideLayout>
  );
}
