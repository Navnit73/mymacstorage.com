import Link from "next/link";
import { ContentPage } from "@/components/content-page";
import { innerPageGraph, isoDateTime, pageMetadata } from "@/lib/seo";
import {
  AIR_CACHE_GUIDE_PATH,
  APP_NAME,
  CACHE_GUIDE_PATH,
  GUIDE_PATH,
  OG_IMAGE,
  PRICE,
  PRO_CACHE_GUIDE_PATH,
  SAFARI_CACHE_GUIDE_PATH,
  SITE_URL,
  pages,
} from "@/lib/site";

const path = AIR_CACHE_GUIDE_PATH;
const title = "How to clear cache on a MacBook Air with little storage";
const description =
  "Learn how to clear cache on a MacBook Air, find the caches that fill a 256 GB drive, and keep them small. Safe steps for M1, M2, M3, M4 and Intel models.";
const updated = pages.find((p) => p.path === path)?.updated ?? "2026-10-30";

export const metadata = pageMetadata({
  title: "How to Clear Cache on MacBook Air (Low Storage Fixes)",
  description,
  path,
  type: "article",
});

const hogs = [
  { app: "Web browsers", where: "~/Library/Caches/Google, com.apple.Safari", fix: "Clear from browser settings" },
  { app: "Spotify and Apple Music", where: "~/Library/Caches/com.spotify.client", fix: "Clear in app settings" },
  { app: "Messaging apps", where: "Slack, Teams and Discord caches", fix: "Clear Cache and Restart" },
  { app: "Software updaters", where: "~/Library/Caches/*.ShipIt", fix: "Delete once the app updates" },
  { app: "Removed apps", where: "Folders named after apps you deleted", fix: "Delete the whole folder" },
];

const faqs = [
  {
    q: "How do I clear cache on my MacBook Air quickly?",
    a: "Quit your apps, press Shift-Command-G in Finder and go to ~/Library/Caches. Move the contents of the largest app folders to the Trash, empty it and restart.",
  },
  {
    q: "How much space does clearing cache free on a MacBook Air?",
    a: "It depends on how you use it. A few hundred megabytes is common, and several gigabytes is possible if you stream music offline or use many browsers. Check Storage settings before and after to see your own result.",
  },
  {
    q: "Is clearing cache on a MacBook Air different from other Macs?",
    a: "No. The steps are identical on every Mac. The difference is how much it matters: on a 256 GB MacBook Air, a few gigabytes of cache can decide whether a macOS update installs.",
  },
  {
    q: "Will clearing cache make my MacBook Air faster?",
    a: "Only if your disk is nearly full. macOS needs free space for virtual memory and updates, so a full drive slows everything down. With plenty of free space, clearing cache doesn't change speed.",
  },
  {
    q: "How do I clear cache and cookies on my MacBook Air?",
    a: "Clear app caches in Finder as this guide shows, then clear cookies inside each browser. In Safari, open Settings, then Privacy, then Manage Website Data, and click Remove All. Expect to sign in to sites again.",
  },
  {
    q: "Can I clear cache on a MacBook Air automatically?",
    a: "macOS clears some caches itself when storage runs low. For the rest, check your Caches folder once every few months, or use a cleanup app that lists every cache with its size.",
  },
  {
    q: "Does the M1, M2, M3 or M4 chip change anything?",
    a: "No. The chip only changes how you start in Safe Mode. Every other step is the same on Apple silicon and Intel models.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "Clear cache on a MacBook Air", description }),
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
      intro="Most MacBook Air models ship with 256 GB of storage, so a few gigabytes of cache can be the difference between a smooth update and a full disk. Here is how to clear cache on a MacBook Air safely."
      breadcrumb="Clear cache on a MacBook Air"
      updated={updated}
      graph={graph}
    >
      <p>
        These steps work on every MacBook Air, from Intel models to M1, M2, M3 and M4, on macOS Ventura and later.
      </p>

      <h2>The short answer</h2>
      <ol>
        <li>Quit every open app.</li>
        <li>
          In Finder, press <strong>Shift-Command-G</strong>, type <code>~/Library/Caches</code> and press{" "}
          <strong>Return</strong>.
        </li>
        <li>Open the largest app folders and move what&rsquo;s inside them to the Trash. Keep the folders.</li>
        <li>
          In Safari, press <strong>Option-Command-E</strong> to empty its cache.
        </li>
        <li>Empty the Trash and restart your MacBook Air.</li>
      </ol>

      <h2>Why cache matters more on a MacBook Air</h2>
      <p>
        Cache works the same on every Mac. What changes on an Air is the room you have. Base models since the M1 come
        with 256 GB, and older Intel models often have 128 GB. After macOS, your apps and your photos, there is little
        space to spare.
      </p>
      <h3>Signs your Air needs a cache cleanup</h3>
      <ul>
        <li>
          A <strong>&ldquo;Your disk is almost full&rdquo;</strong> warning appears.
        </li>
        <li>A macOS update says it needs more space to install.</li>
        <li>
          <strong>System Data</strong> in Storage settings keeps growing.
        </li>
        <li>Apps freeze or beachball when your disk is nearly full.</li>
      </ul>
      <h3>Why a full disk slows an Air down</h3>
      <p>
        When memory runs short, macOS moves data to swap files on your disk. On an 8 GB MacBook Air, it does this
        often. A nearly full disk leaves no room for swap, so apps stall. Clearing cache gives macOS that room back.
      </p>

      <h2>Check your storage first</h2>
      <ol>
        <li>
          Choose <strong>Apple menu</strong>, then <strong>System Settings</strong>, then <strong>General</strong>,
          then <strong>Storage</strong>.
        </li>
        <li>Note the available space at the top.</li>
        <li>
          Hold the pointer over the coloured bar. Caches count towards <strong>System Data</strong>.
        </li>
      </ol>
      <h4>On macOS Monterey or earlier</h4>
      <p>
        Choose <strong>Apple menu</strong>, then <strong>About This Mac</strong>, then <strong>Storage</strong>.
      </p>
      <h5>If the bar says Calculating</h5>
      <p>
        macOS is still adding up your files. Leave the window open for a few minutes. On a nearly full disk, it can take
        longer than usual, so note the number once it settles and use it to measure your progress.
      </p>

      <h2>How to clear cache on a MacBook Air step by step</h2>

      <h3>1. Clear app caches in Finder</h3>
      <h4>Open the Caches folder</h4>
      <p>
        Quit your apps, then in Finder choose <strong>Go</strong>, then <strong>Go to Folder</strong>. Type{" "}
        <code>~/Library/Caches</code> and press <strong>Return</strong>.
      </p>
      <h4>Sort folders by size</h4>
      <p>
        Choose <strong>View</strong>, then <strong>as List</strong>. Open <strong>View</strong>, then{" "}
        <strong>Show View Options</strong>, tick <strong>Calculate all sizes</strong> and click the{" "}
        <strong>Size</strong> column. The biggest cache folders rise to the top.
      </p>
      <h4>Clear the biggest folders</h4>
      <p>
        Open a large folder, press <strong>Command-A</strong> and then <strong>Command-Delete</strong>. Leave the folder
        itself in place. Skip anything macOS says is in use.
      </p>

      <h3>2. Empty your browser caches</h3>
      <h4>Safari</h4>
      <p>
        Turn on <strong>Show features for web developers</strong> in Safari&rsquo;s <strong>Advanced</strong> settings,
        then choose <strong>Develop</strong>, then <strong>Empty Caches</strong>. Our guide on{" "}
        <Link href={SAFARI_CACHE_GUIDE_PATH}>clearing Safari cache on a Mac</Link> covers every option.
      </p>
      <h4>Chrome, Firefox and Edge</h4>
      <p>
        Press <strong>Shift-Command-Delete</strong>, tick only the cache option and confirm. You stay signed in to your
        sites.
      </p>

      <h3>3. Clear caches inside your apps</h3>
      <p>
        Streaming and chat apps often hold the largest caches on an Air. Clear them from the app, so it doesn&rsquo;t
        rebuild them straight away:
      </p>
      <ul>
        <li>
          <strong>Spotify:</strong> <strong>Settings</strong>, then <strong>Storage</strong>, then{" "}
          <strong>Clear cache</strong>. Remove offline playlists you no longer play.
        </li>
        <li>
          <strong>Slack:</strong> <strong>Help</strong>, then <strong>Troubleshooting</strong>, then{" "}
          <strong>Clear Cache and Restart</strong>.
        </li>
        <li>
          <strong>Apple Music:</strong> remove downloaded songs you don&rsquo;t need offline. Right-click an album and
          choose <strong>Remove Download</strong>.
        </li>
      </ul>

      <h3>4. Empty the Trash and restart</h3>
      <p>
        Cached files keep using space until you empty the Trash. Restart afterwards, so macOS also clears its temporary
        files and releases swap space.
      </p>

      <h2>The caches that fill a MacBook Air most</h2>
      <div className="mt-6 overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Source</th>
              <th scope="col">Where to look</th>
              <th scope="col">How to clear it</th>
            </tr>
          </thead>
          <tbody>
            {hogs.map(({ app, where, fix }) => (
              <tr key={app}>
                <th scope="row">{app}</th>
                <td>{where}</td>
                <td>{fix}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>What not to delete on a MacBook Air</h2>
      <ul>
        <li>
          <strong>/System/Library/Caches</strong> and <strong>/Library/Caches</strong>. Leave these to macOS.
        </li>
        <li>
          <strong>Your Photos Library.</strong> Its thumbnails are part of the library, not a cache you can remove.
        </li>
        <li>
          <strong>iCloud Drive files.</strong> Deleting a synced file removes it from iCloud and your other devices too.
        </li>
      </ul>

      <h2>How much free space should a MacBook Air keep?</h2>
      <p>
        Apple doesn&rsquo;t publish a fixed number, but macOS needs room to work. Major macOS updates often ask for
        tens of gigabytes while they install, and swap files grow whenever memory runs short.
      </p>
      <p>
        As a rule of thumb, keep at least 10 to 15 percent of your disk free. On a 256 GB MacBook Air, that means
        roughly 25 to 40 GB. If you sit below that, clear cache first, because it is the quickest space to win back.
      </p>

      <h2>How to clear cache on a MacBook Air running an older macOS</h2>
      <p>
        Older Intel MacBook Air models with 128 GB feel space pressure the most. The Caches folder sits in the same
        place, so the Finder steps above work on every version. Two things differ:
      </p>
      <ul>
        <li>
          <strong>Safari settings</strong> are called <strong>Preferences</strong>, and the checkbox reads{" "}
          <strong>Show Develop menu in menu bar</strong>.
        </li>
        <li>
          <strong>Safe Mode</strong> starts when you hold <strong>Shift</strong> as your Mac restarts, instead of the
          power-button method Apple silicon uses.
        </li>
      </ul>

      <h2>Keep caches small on a 256 GB Air</h2>
      <h3>Use Storage recommendations</h3>
      <p>
        In <strong>System Settings</strong>, then <strong>General</strong>, then <strong>Storage</strong>, macOS lists
        recommendations under the bar. Turn on <strong>Empty Trash Automatically</strong> so cleared caches don&rsquo;t
        sit in the Trash for weeks. macOS then deletes items that have been in the Trash for 30 days.
      </p>
      <h3>Turn on Optimise Mac Storage</h3>
      <p>
        Open <strong>System Settings</strong>, click your name, then <strong>iCloud</strong>, then{" "}
        <strong>Drive</strong>, and turn on <strong>Optimise Mac Storage</strong>. macOS keeps older files in iCloud
        and downloads them when you open them.
      </p>
      <h3>Limit offline downloads</h3>
      <p>
        Streaming apps cache everything you download for offline use. Keep a small offline selection and stream the
        rest.
      </p>
      <h3>Check every few months</h3>
      <p>
        Caches grow back, and that is normal. A quick check every few months, or whenever storage runs low, is enough.
      </p>
      <p>
        If cache isn&rsquo;t the problem, our guide on <Link href={GUIDE_PATH}>how to free up space on a Mac</Link>{" "}
        lists 14 more ways to make room. For a full explanation of every cache type, read{" "}
        <Link href={CACHE_GUIDE_PATH}>how to clear cache on a Mac</Link>. Using a MacBook Pro as well? See{" "}
        <Link href={PRO_CACHE_GUIDE_PATH}>how to clear cache on a MacBook Pro</Link>.
      </p>

      <h2>See every cache on your Air with {APP_NAME}</h2>
      <p>
        {APP_NAME} scans your whole MacBook Air and lists caches, build files and old installers with their sizes, so
        you clear the biggest first. Everything goes to the Trash, and Undo puts it back.
      </p>
      <p>
        Learn more about <Link href="/">{APP_NAME}, the disk cleanup app for Mac</Link>. It costs {PRICE} once, with no
        subscription.
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
