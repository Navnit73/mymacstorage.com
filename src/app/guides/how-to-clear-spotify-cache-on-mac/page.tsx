import Link from "next/link";
import { AppCallout, GuideLayout, GuideTable } from "@/components/guide-layout";
import { Price } from "@/components/price";
import { articleGraph, innerPageGraph, pageMetadata } from "@/lib/seo";
import {
  APP_NAME,
  CACHE_GUIDE_PATH,
  GUIDE_PATH,
  LARGE_FILES_GUIDE_PATH,
  REFUND_DAYS,
  SPOTIFY_CACHE_GUIDE_PATH,
  TEAMS_CACHE_GUIDE_PATH,
} from "@/lib/site";

const market = "us" as const;
const path = SPOTIFY_CACHE_GUIDE_PATH;
const published = "2026-11-24";
const title = "How to clear Spotify cache on a Mac and stop it filling your disk";
const description =
  "Spotify's cache can grow to gigabytes on a Mac. Clear it from the app's Storage settings, find the folders it uses, and move or remove downloaded music.";

export const metadata = pageMetadata({
  title: "How to Clear Spotify Cache on Mac",
  description,
  path,
  type: "article",
});

const kinds = [
  ["Cache", "Songs and images streamed recently", "Clear cache in Settings, or delete the cache folders"],
  ["Downloads", "Playlists and podcasts saved for offline play", "Remove downloads in Settings or per playlist"],
  ["App data", "Your login, settings and local files list", "Leave alone, or you sign out"],
];

const folders = [
  ["~/Library/Caches/com.spotify.client", "Short-term cache: images, data, updates", "Safe with Spotify quit"],
  ["~/Library/Application Support/Spotify/PersistentCache", "Streamed music cache and, by default, downloads", "Safe, but downloads go too"],
  ["~/Library/Application Support/Spotify/Users", "Per-account settings", "Leave alone"],
];

const faqs = [
  {
    q: "Is it safe to clear Spotify cache on a Mac?",
    a: "Yes. The cache holds copies of music and images Spotify can download again. Your playlists, liked songs and library live in your Spotify account, so they aren't affected. Downloaded songs may need to download again, depending on how you clear it.",
  },
  {
    q: "Why is Spotify taking up so much space on my Mac?",
    a: "Spotify caches music you stream so it can replay it without downloading again, and it stores offline downloads in the same area by default. Over months of listening, both can grow to several gigabytes.",
  },
  {
    q: "Will clearing Spotify cache delete my downloaded songs?",
    a: "Clear cache in Spotify's settings is meant to leave downloads alone. Deleting the PersistentCache folder by hand can remove them, so you would need to download those playlists again.",
  },
  {
    q: "Does Spotify's cache come back after I clear it?",
    a: "Yes. Spotify rebuilds it as you listen. That is normal, and the cache stays useful because it saves data and makes playback start faster. Clear it again when it grows too large.",
  },
  {
    q: "Can I move Spotify downloads to an external drive?",
    a: "Yes. In Spotify's settings, find the Storage or Offline storage location option and pick a folder on the external drive. Spotify moves existing downloads there. Keep the drive connected when you want to play them.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "Clear Spotify cache on Mac", description }),
  ...articleGraph({ path, headline: title, description, published, updated: published, language: "en", faqs }),
];

export default function SpotifyCacheGuide() {
  return (
    <GuideLayout
      market={market}
      title={title}
      intro="Spotify saves the music you stream so it can play it again without the network. That is handy until the folder grows to several gigabytes on a Mac with little space. Here is how to clear it safely, and how to keep it in check."
      breadcrumb="Clear Spotify cache"
      updated={published}
      readMinutes={6}
      takeaways={[
        "Spotify's Storage settings have a Clear cache button.",
        "Your playlists and library live in your account, not the cache.",
        "Downloads and cache are separate, but can share a folder.",
        "You can move offline downloads to an external drive.",
      ]}
      toc={[
        { id: "what", label: "Cache vs downloads" },
        { id: "settings", label: "Clear in the app" },
        { id: "folders", label: "Clear the folders" },
        { id: "downloads", label: "Downloads" },
        { id: "keep-small", label: "Keep it small" },
        { id: "faq", label: "FAQ" },
      ]}
      related={[
        { href: CACHE_GUIDE_PATH, label: "How to clear cache on a Mac" },
        { href: TEAMS_CACHE_GUIDE_PATH, label: "How to clear Microsoft Teams cache on a Mac" },
        { href: LARGE_FILES_GUIDE_PATH, label: "How to find large files on a Mac" },
        { href: GUIDE_PATH, label: "How to free up space on a Mac" },
      ]}
      graph={graph}
      faqs={faqs}
      closing={
        <>
          Find the app caches hiding on your Mac, Spotify&rsquo;s included. <Price /> once, with a {REFUND_DAYS}-day
          refund.
        </>
      }
    >
      <h2 id="what">Spotify cache vs downloads</h2>
      <p>
        Spotify stores three kinds of data on your Mac. Only one of them is the cache, and knowing which is which
        stops you deleting the wrong thing.
      </p>
      <GuideTable head={["Type", "What it is", "How to remove it"]} rows={kinds} />
      <p>
        The cache is temporary. Spotify fills it as you stream and trims it when it decides to. Downloads are
        permanent until you remove them. On many Macs, both live inside the same <code>PersistentCache</code> folder,
        which is why that folder can look surprisingly large.
      </p>

      <h2 id="settings">Clear Spotify cache in the desktop app</h2>
      <p>This is the safest method. It clears the cache and is designed to keep your downloads.</p>
      <ol>
        <li>Open the Spotify app on your Mac.</li>
        <li>
          Click your profile picture at the top and choose <strong>Settings</strong>. On some versions it is{" "}
          <strong>Spotify</strong>, then <strong>Settings</strong> in the menu bar.
        </li>
        <li>
          Scroll to <strong>Storage</strong>. Spotify shows how much space downloads and cache use.
        </li>
        <li>
          Click <strong>Clear cache</strong> and confirm.
        </li>
      </ol>
      <p>
        Spotify redesigns its settings from time to time, so the section may be called Storage, Offline storage or
        similar. Search Settings for &ldquo;cache&rdquo; if you can&rsquo;t find it. If your version has no Clear cache
        button, use the folder method below.
      </p>
      <p>
        The space comes back straight away. Playback of songs you streamed recently may start a moment slower the
        next time, because Spotify downloads them again.
      </p>

      <h2 id="folders">Clear the Spotify cache folders by hand</h2>
      <p>
        If the app won&rsquo;t open, or the settings button doesn&rsquo;t free much, you can remove the cache folders
        in Finder.
      </p>
      <GuideTable head={["Folder", "What it holds", "Safe to delete?"]} rows={folders} />
      <ol>
        <li>
          Quit Spotify fully. Choose <strong>Spotify</strong>, then <strong>Quit Spotify</strong>, or press{" "}
          <strong>Command-Q</strong>.
        </li>
        <li>
          In Finder, choose <strong>Go</strong>, then <strong>Go to Folder</strong>, and enter{" "}
          <code>~/Library/Caches/com.spotify.client</code>. Move its contents to the Trash.
        </li>
        <li>
          Go to <code>~/Library/Application Support/Spotify/PersistentCache</code>. Move the <code>Storage</code>{" "}
          folder inside it to the Trash. This clears streamed music, and may remove downloads too.
        </li>
        <li>Empty the Trash, then open Spotify again.</li>
      </ol>
      <p>
        Don&rsquo;t delete the whole <code>Application Support/Spotify</code> folder unless you want a full reset. It
        holds your login and settings, so Spotify asks you to sign in again. Your library and playlists are safe either
        way, because they live in your account.
      </p>

      <AppCallout market={market} title="Find every app cache, not just Spotify's">
        {APP_NAME} scans your Mac on the device and lists caches from Spotify and your other apps, plus large files,
        duplicates and app leftovers, each with its size. Everything you clear goes to the Trash, and Undo puts it back.
      </AppCallout>

      <h2 id="downloads">Manage Spotify downloads on a Mac</h2>
      <p>
        If the Storage section shows that downloads, not the cache, take most of the space, clear those instead.
      </p>
      <h3>Remove downloads you don&rsquo;t need</h3>
      <ul>
        <li>
          To remove one playlist or album, open it and click the green download arrow so it turns off.
        </li>
        <li>
          To remove all downloads at once, use <strong>Remove all downloads</strong> in the Storage section of
          Settings, if your version shows it.
        </li>
      </ul>
      <p>
        Spotify Premium downloads stay on the device only while you are a subscriber and go online at least once every
        30 days, according to Spotify. Downloads from an old account or a lapsed plan are dead weight.
      </p>
      <h3>Move downloads to an external drive</h3>
      <p>
        In <strong>Settings</strong>, look for <strong>Offline storage location</strong> or a{" "}
        <strong>Change location</strong> button in the Storage section. Pick a folder on an external drive or SD card.
        Spotify moves your downloads there. Keep the drive connected when you want to listen offline.
      </p>

      <h2 id="keep-small">Keep Spotify&rsquo;s cache from growing back</h2>
      <p>
        Spotify used to let you set a cache size limit on the desktop app. Current versions manage the size
        themselves, so clearing it now and then is the practical answer. A few habits help:
      </p>
      <ul>
        <li>Download only the playlists you actually play offline.</li>
        <li>Lower the download quality in Settings if you have a small drive.</li>
        <li>Check the Storage section every few months, as you would your Downloads folder.</li>
      </ul>
      <p>
        Spotify is rarely the only app doing this. Chat, video and design apps all keep caches too. Our guide on{" "}
        <Link href={CACHE_GUIDE_PATH}>how to clear cache on a Mac</Link> covers the rest, and{" "}
        <Link href={TEAMS_CACHE_GUIDE_PATH}>how to clear Microsoft Teams cache on a Mac</Link> handles another
        common offender. To see what else is large, read{" "}
        <Link href={LARGE_FILES_GUIDE_PATH}>how to find large files on a Mac</Link>.
      </p>

      <h2>See what fills your Mac with {APP_NAME}</h2>
      <p>
        {APP_NAME} shows every cache, large file and leftover on your Mac with its size, and moves what you choose to
        the Trash. It costs <Price /> once, with no subscription. Learn more on the <Link href="/">home page</Link>.
      </p>
    </GuideLayout>
  );
}
