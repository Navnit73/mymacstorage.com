import Link from "next/link";
import { AppCallout, GuideLayout, GuideTable } from "@/components/guide-layout";
import { articleGraph, innerPageGraph, pageMetadata } from "@/lib/seo";
import { APP_NAME, GUIDES, MARKETS, REFUND_DAYS, guideAlternates, guidePath } from "@/lib/site";

const market = "uk" as const;
const { hreflang, price, cleanerPath, cleanerLabel } = MARKETS[market];
const key = "clearRam";
const path = guidePath(market, key);
const title = "How to clear RAM on Mac, and why a memory cleaner isn’t the answer";
const description =
  "Learn how to clear RAM on a Mac the right way. Read memory pressure in Activity Monitor, quit heavy apps and skip RAM cleaner apps that don’t help.";

export const metadata = pageMetadata({
  title: "How to Clear RAM on Mac (No Cleaner Needed)",
  description,
  path,
  type: "article",
  hreflang,
  alternates: guideAlternates(market, key),
});

const memoryTypes = [
  ["App Memory", "Memory your apps use right now", "Quit the apps that use the most"],
  ["Wired Memory", "Memory macOS reserves for itself and can’t compress or move", "Leave it alone"],
  ["Compressed", "Memory macOS squeezed to make room", "Normal under load"],
  ["Cached Files", "Recently used files kept ready for speed", "Normal, and macOS releases it on demand"],
  ["Swap Used", "Memory moved to your startup disk", "Keep it low, and keep free disk space"],
];

const symptoms = [
  ["Beachball when switching apps", "Red memory pressure", "Quit heavy apps, then restart"],
  ["Fans spin and the Mac feels slow", "One app uses far too much", "Quit or update that app"],
  ["Slowdown only after days of uptime", "A leaking app or process", "Restart your Mac"],
  ["Slow, and the disk is nearly full", "Little room for swap files", "Free up disk space"],
  ["Slow with many browser tabs", "Tabs hold memory", "Close tabs and extensions"],
];

const faqs = [
  {
    q: "Is 90% RAM usage bad on a Mac?",
    a: "Not by itself. macOS uses spare memory to cache files, so a full memory bar is normal. Check the memory pressure graph instead. A green graph means your Mac is coping, and a red one means it needs more memory.",
  },
  {
    q: "Does restarting a Mac clear RAM?",
    a: "Yes. A restart closes every app and process, so memory starts clean. It helps most when an app has leaked memory over several days, and it costs you nothing.",
  },
  {
    q: "Are RAM cleaner apps worth it?",
    a: "Rarely. They usually empty cached files, so the free-memory number rises for a moment, then macOS fills it again. Apps then reload data from disk, which can make things slower. Fix the cause instead, such as a heavy app or a full disk.",
  },
  {
    q: "How much RAM does a Mac need?",
    a: "Light use, such as browsing, email and documents, works on less memory. Heavy multitasking, photo and video editing or development benefit from more. Watch your memory pressure graph during a normal day to decide.",
  },
  {
    q: "Can I add more RAM to a Mac?",
    a: "Only on some older Intel Macs. Apple silicon Macs use unified memory that sits inside the chip, so you can’t upgrade it later. Choose the right amount when you buy.",
  },
  {
    q: "Why does a full disk slow down my Mac?",
    a: "macOS uses your startup disk for virtual memory when RAM runs short. With little free space, it has less room for swap files, and everything slows down. Keeping 10 to 15 per cent of the disk free helps.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "How to clear RAM on Mac", description, language: hreflang }),
  ...articleGraph({ path, headline: title, description, published: "2026-11-01", updated: "2026-11-01", language: hreflang, faqs }),
];

export default function ClearRamGuide() {
  return (
    <GuideLayout
      market={market}
      title={title}
      intro="Your Mac feels slow and the memory bar looks full. Here is how to clear RAM on a Mac properly, how to read what Activity Monitor tells you and why most memory cleaner apps do nothing useful."
      breadcrumb="How to clear RAM on Mac"
      updated="2026-11-01"
      readMinutes={7}
      takeaways={[
        "Memory pressure matters more than how full the memory bar looks.",
        "Quit heavy apps and restart your Mac. Those two steps fix most slowdowns.",
        "RAM cleaner apps mostly empty a cache that macOS refills straight away.",
        "A nearly full disk makes memory problems worse, because macOS swaps to it.",
      ]}
      toc={[
        { id: "check", label: "Check your RAM" },
        { id: "ways", label: "8 ways to free RAM" },
        { id: "cleaners", label: "Memory cleaner apps" },
        { id: "disk", label: "Disk space matters" },
        { id: "faq", label: "FAQ" },
      ]}
      related={[
        { href: guidePath(market, "appCleaner"), label: GUIDES.appCleaner.label },
        { href: guidePath(market, "diskAnalyzer"), label: "Mac disk space analyser" },
        { href: cleanerPath, label: cleanerLabel },
        { href: "/guides/how-to-free-up-space-on-mac", label: "How to free up space on a Mac" },
      ]}
      graph={graph}
      faqs={faqs}
      closing={`Give macOS room to breathe. ${price} once, with a ${REFUND_DAYS}-day refund.`}
    >
      <h2 id="check">How to check your RAM before you clear it</h2>
      <p>
        Don’t start by closing things at random. Spend two minutes in Activity Monitor and find out whether memory is
        your problem at all.
      </p>
      <ol>
        <li>Open <strong>Activity Monitor</strong> from <code>/Applications/Utilities</code>, or find it with Spotlight.</li>
        <li>Click the <strong>Memory</strong> tab.</li>
        <li>Click the <strong>Memory</strong> column header to sort the biggest users to the top.</li>
        <li>Look at the <strong>Memory Pressure</strong> graph at the bottom of the window.</li>
      </ol>

      <h3>Read the memory pressure graph</h3>
      <p>
        Apple says a red memory pressure graph means your Mac needs more RAM. People commonly read green as healthy and
        yellow as strained, although those thresholds aren’t official. Apple also notes that unused memory doesn’t make
        a Mac faster, so a bar that looks full isn’t a problem on its own.
      </p>
      <h3>Know what each number means</h3>
      <GuideTable head={["Number", "What it is", "What to do"]} rows={memoryTypes} />
      <h4>Swap Used</h4>
      <p>
        A high Swap Used number means macOS has moved memory to your startup disk. A little swap is normal. A lot of it,
        together with a red graph, means your apps want more memory than you have.
      </p>

      <h2 id="ways">8 ways to free up RAM on a Mac</h2>
      <p>Work from the top. The first steps fix most slowdowns.</p>

      <h3>1. Quit the apps that use the most memory</h3>
      <p>
        In Activity Monitor’s Memory tab, select a heavy process and click the <strong>X</strong> button in the toolbar,
        then choose <strong>Quit</strong>. Use <strong>Force Quit</strong> only if the app doesn’t respond. Save your work
        first.
      </p>
      <h3>2. Close browser tabs and extensions</h3>
      <p>
        A browser is often the largest memory user. In Chrome, choose <strong>Window</strong>, then{" "}
        <strong>Task Manager</strong>, to see which tabs and extensions use the most. Close the heavy ones, or switch off
        extensions you don’t need.
      </p>
      <h3>3. Remove startup apps you don’t use</h3>
      <p>
        Open <strong>System Settings</strong>, then <strong>General</strong>, then{" "}
        <strong>Login Items &amp; Extensions</strong>. Remove apps that launch at login without earning their keep.
      </p>
      <h3>4. Restart your Mac</h3>
      <p>
        A restart closes every process and clears accumulated memory. If your Mac has run for days or weeks, this single
        step often brings back the speed.
      </p>
      <h3>5. Update macOS and your apps</h3>
      <p>
        Updates fix memory leaks, so a slowdown that started recently may disappear after you update. Choose{" "}
        <strong>System Settings</strong>, then <strong>General</strong>, then <strong>Software Update</strong>.
      </p>
      <h3>6. Free up disk space</h3>
      <p>
        macOS swaps to your startup disk when RAM runs short, so a nearly full disk makes every memory problem worse. The
        section below explains how much space to keep free.
      </p>
      <h3>7. Check for one runaway process</h3>
      <p>
        If one process uses an unusual amount of memory for days, quit it, update the app that owns it and see whether it
        returns. If it does, contact that app’s developer.
      </p>
      <h3>8. Add memory only where you can</h3>
      <p>
        Some older Intel Macs have upgradable RAM, and System Information shows which kind you have. Apple silicon Macs
        use unified memory that you can’t upgrade, so the fix there is closing apps, or buying a model with more memory
        next time.
      </p>

      <h2>Match the symptom to the fix</h2>
      <GuideTable head={["What you see", "Likely cause", "Fix"]} rows={symptoms} />

      <AppCallout market={market} title="Give macOS room to swap">
        A full disk starves macOS of swap space. {APP_NAME} finds what fills your disk in one scan, from caches and
        duplicates to large old files, and clears it to the Bin with Undo ready.
      </AppCallout>

      <h2 id="cleaners">Do memory cleaner apps work?</h2>
      <p>
        A Mac memory cleaner, or RAM cleaner, promises to free memory with one click. In practice, these apps empty
        cached files. The free-memory number jumps, then macOS refills the cache, and your apps reload data from disk,
        which is slower than reading it from memory.
      </p>
      <p>
        Terminal tricks that claim the same result work the same way. Apple doesn’t document them as a fix, and the
        gain disappears within minutes. Spend your time on the real causes above instead.
      </p>
      <h3>A cleaner that does help</h3>
      <p>
        A disk cleaner helps indirectly. It doesn’t touch RAM, but it gives macOS free space for swap files and updates.
        Read our <Link href={cleanerPath}>guide to freeing up space on a Mac</Link> for the safe places to
        start.
      </p>

      <h2 id="disk">Why free disk space matters for memory</h2>
      <p>
        When memory runs short, macOS moves data to your startup disk and pulls it back when an app needs it. That only
        works well when the disk has room. Aim to keep 10 to 15 per cent of the disk free, and more if you edit video or
        run virtual machines.
      </p>
      <p>
        Open <strong>System Settings</strong>, then <strong>General</strong>, then <strong>Storage</strong> to check your
        free space. If it is low, our guide on{" "}
        <Link href="/guides/how-to-free-up-space-on-mac">how to free up space on a Mac</Link> lists 14 safe ways to
        make room, and {APP_NAME} does the same job in one scan.
      </p>
      <p>
        {APP_NAME} is a native Mac storage cleaner that costs {price} once. It scans on your Mac, lists every file
        before it clears anything and moves it to the Bin. Learn more on the <Link href="/">home page</Link>.
      </p>
    </GuideLayout>
  );
}
