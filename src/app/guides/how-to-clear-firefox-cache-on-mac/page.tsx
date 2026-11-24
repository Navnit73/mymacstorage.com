import Link from "next/link";
import { AppCallout, GuideLayout, GuideTable } from "@/components/guide-layout";
import { Price } from "@/components/price";
import { articleGraph, innerPageGraph, pageMetadata } from "@/lib/seo";
import {
  APP_NAME,
  CACHE_GUIDE_PATH,
  CHROME_CACHE_GUIDE_PATH,
  COOKIES_GUIDE_PATH,
  FIREFOX_CACHE_GUIDE_PATH,
  REFUND_DAYS,
  SAFARI_CACHE_GUIDE_PATH,
} from "@/lib/site";

const market = "us" as const;
const path = FIREFOX_CACHE_GUIDE_PATH;
const published = "2026-11-24";
const title = "How to clear Firefox cache on a Mac, all at once or one site at a time";
const description =
  "Clear Firefox's cache on a Mac without losing logins: the Settings route, the Command-Shift-Delete shortcut, one site only, and Firefox's cache folders.";

export const metadata = pageMetadata({
  title: "How to Clear Firefox Cache on Mac",
  description,
  path,
  type: "article",
});

const options = [
  ["Settings, Clear Data", "Clear all cached web content", "Nothing but cached files, if you untick cookies"],
  ["Command-Shift-Delete", "Clear cache for a time range", "Whatever else you tick"],
  ["Manage Data", "One site's cookies and storage", "That site's login"],
  ["Delete on close", "Cache and cookies every time you quit", "All logins, every session"],
  ["Cache folder in Finder", "Cache for a profile you can't open", "Nothing but cached files"],
];

const faqs = [
  {
    q: "Does clearing the cache in Firefox delete passwords?",
    a: "No. Passwords are stored separately and aren't touched by Clear Data or Clear recent history. Only the cookies checkbox signs you out of sites, so untick it if you want to stay logged in.",
  },
  {
    q: "What is the shortcut to clear cache in Firefox on a Mac?",
    a: "Press Command-Shift-Delete. Firefox opens its clear history dialog, where you choose a time range and tick only the cache option.",
  },
  {
    q: "Where is the Firefox cache stored on a Mac?",
    a: "The main cache lives in ~/Library/Caches/Firefox/Profiles, in a folder named after your profile. Your bookmarks, passwords and settings live separately in ~/Library/Application Support/Firefox/Profiles.",
  },
  {
    q: "How do I see how big my Firefox cache is?",
    a: "Open Settings, then Privacy & Security, and scroll to Cookies and Site Data. Firefox shows how much space cookies, site data and cache use on your disk. You can also type about:cache in the address bar for the raw numbers.",
  },
  {
    q: "Can Firefox clear its cache automatically?",
    a: "Yes. In Privacy & Security, turn on the option to delete cookies and site data when Firefox is closed, or set history to use custom settings and clear history on close with Cache ticked. Firefox then empties the cache each time you quit.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "Clear Firefox cache on Mac", description }),
  ...articleGraph({ path, headline: title, description, published, updated: published, language: "en", faqs }),
];

export default function FirefoxCacheGuide() {
  return (
    <GuideLayout
      market={market}
      title={title}
      intro="Firefox keeps copies of the pages you visit so they load faster. When a site shows old content, breaks after an update or Firefox's folder grows large, clearing that cache fixes it. Here is how to do it on a Mac without signing out of everything."
      breadcrumb="Clear Firefox cache"
      updated={published}
      readMinutes={6}
      takeaways={[
        "Settings, Privacy & Security, Clear Data clears the cache in a few clicks.",
        "Untick Cookies and Site Data to keep your logins.",
        "Manage Data lets you clear one site and leave the rest alone.",
        "Firefox can empty its cache every time you quit.",
      ]}
      toc={[
        { id: "settings", label: "From Settings" },
        { id: "shortcut", label: "Shortcut" },
        { id: "one-site", label: "One site" },
        { id: "automatic", label: "Automatically" },
        { id: "folders", label: "Cache folders" },
        { id: "faq", label: "FAQ" },
      ]}
      related={[
        { href: CACHE_GUIDE_PATH, label: "How to clear cache on a Mac" },
        { href: CHROME_CACHE_GUIDE_PATH, label: "How to clear Chrome cache on a Mac" },
        { href: SAFARI_CACHE_GUIDE_PATH, label: "How to clear Safari cache on a Mac" },
        { href: COOKIES_GUIDE_PATH, label: "How to clear cookies on a Mac" },
      ]}
      graph={graph}
      faqs={faqs}
      closing={
        <>
          See every browser and app cache on your Mac in one list. <Price /> once, with a {REFUND_DAYS}-day refund.
        </>
      }
    >
      <h2 id="settings">Clear Firefox cache from Settings</h2>
      <p>This method clears all cached web content and lets you keep your cookies, so you stay signed in.</p>
      <ol>
        <li>
          Open Firefox and choose <strong>Firefox</strong>, then <strong>Settings</strong> in the menu bar, or press{" "}
          <strong>Command-Comma</strong>. You can also type <code>about:preferences#privacy</code> in the address
          bar to jump straight to the right page.
        </li>
        <li>
          Click <strong>Privacy &amp; Security</strong> in the sidebar.
        </li>
        <li>
          Scroll to <strong>Cookies and Site Data</strong> and click <strong>Clear Data</strong>.
        </li>
        <li>
          Untick <strong>Cookies and site data</strong>. Leave <strong>Cached web content</strong> ticked.
        </li>
        <li>
          Click <strong>Clear</strong>.
        </li>
      </ol>
      <p>
        Recent Firefox versions may show a combined dialog with a time range and extra checkboxes. If so, choose{" "}
        <strong>Everything</strong> as the range and tick only the cache option. The labels move a little between
        releases, but the cache option always mentions cached or temporary files.
      </p>
      <h3>Every way to clear the cache, compared</h3>
      <GuideTable head={["Method", "What it clears", "What you lose"]} rows={options} />

      <h2 id="shortcut">Clear Firefox cache with Command-Shift-Delete</h2>
      <p>The shortcut opens the clear history dialog, which also lets you limit the time range.</p>
      <ol>
        <li>
          Press <strong>Command-Shift-Delete</strong> in any Firefox window.
        </li>
        <li>
          Set the time range. Choose <strong>Everything</strong> to clear the whole cache.
        </li>
        <li>
          Tick <strong>Cache</strong> or <strong>Temporary cached files and pages</strong>. Untick history, cookies
          and form data if you want to keep them.
        </li>
        <li>
          Click <strong>OK</strong> or <strong>Clear</strong>.
        </li>
      </ol>
      <p>
        For a single stubborn page, a forced reload is often enough. Press <strong>Command-Shift-R</strong> and
        Firefox fetches the page again instead of using its cached copy.
      </p>

      <h2 id="one-site">Clear the cache and data for one site</h2>
      <p>
        If one site misbehaves, clear only that site&rsquo;s data and keep everything else.
      </p>
      <ol>
        <li>
          Go to <strong>Settings</strong>, then <strong>Privacy &amp; Security</strong>.
        </li>
        <li>
          Under <strong>Cookies and Site Data</strong>, click <strong>Manage Data</strong>.
        </li>
        <li>
          Search for the site, select it and click <strong>Remove Selected</strong>, then <strong>Save Changes</strong>.
        </li>
      </ol>
      <p>
        A quicker route is the padlock icon in the address bar. Click it while you are on the site and choose{" "}
        <strong>Clear cookies and site data</strong>. You will need to sign in to that site again, and only that site.
      </p>
      <p>
        The Manage Data list shows how much storage each site uses. Sort by storage to find a web app that has quietly
        cached hundreds of megabytes.
      </p>

      <h2 id="automatic">Make Firefox clear its cache automatically</h2>
      <p>If you want a clean slate every time, Firefox can do the work when you quit.</p>
      <ol>
        <li>
          Open <strong>Settings</strong>, then <strong>Privacy &amp; Security</strong>.
        </li>
        <li>
          Under <strong>History</strong>, set Firefox to <strong>Use custom settings for history</strong>.
        </li>
        <li>
          Tick <strong>Clear history when Firefox closes</strong>, click <strong>Settings</strong> next to it and tick
          only <strong>Cache</strong>.
        </li>
      </ol>
      <p>
        Avoid the separate option to delete cookies and site data when Firefox is closed unless you want to sign in
        again every day. It clears logins along with the cache.
      </p>

      <AppCallout market={market} title="Find the caches Firefox doesn't show you">
        {APP_NAME} scans your Mac on the device and lists caches from Firefox, other browsers and your apps, plus large
        files, duplicates and app leftovers, each with its size and location. Everything you clear goes to the Trash,
        and Undo puts it back.
      </AppCallout>

      <h2 id="folders">Where Firefox stores its cache on a Mac</h2>
      <p>
        Firefox keeps your profile in two places. The cache sits in one, and everything you care about sits in the
        other.
      </p>
      <ul>
        <li>
          <code>~/Library/Caches/Firefox/Profiles</code> holds the cache. Each profile has a folder with a random name
          that ends in <code>.default-release</code> or similar. Inside, <code>cache2</code> holds the cached pages.
        </li>
        <li>
          <code>~/Library/Application Support/Firefox/Profiles</code> holds bookmarks, passwords, extensions and
          settings. Don&rsquo;t delete anything here to clear the cache.
        </li>
      </ul>
      <h3>Clear the cache folder by hand</h3>
      <p>
        This is useful when Firefox won&rsquo;t start, or for an old profile you no longer open.
      </p>
      <ol>
        <li>
          Quit Firefox with <strong>Command-Q</strong>.
        </li>
        <li>
          In Finder, choose <strong>Go</strong>, then <strong>Go to Folder</strong>, and enter{" "}
          <code>~/Library/Caches/Firefox/Profiles</code>.
        </li>
        <li>
          Open your profile folder and move the <code>cache2</code> folder to the Trash.
        </li>
        <li>Open Firefox again. It creates a new, empty cache.</li>
      </ol>
      <h3>Check the cache with about:cache</h3>
      <p>
        Type <code>about:cache</code> in the address bar. Firefox lists its storage areas with the number of entries,
        the size on disk and the folder path. It is a quick way to confirm the cache really emptied, and to find the
        right profile folder if you have several.
      </p>

      <h2>When clearing the Firefox cache won&rsquo;t help</h2>
      <p>
        A cleared cache fixes stale pages and broken layouts. It won&rsquo;t fix a slow Mac, a crashing extension or a
        site that is down. If a site still fails after clearing, try a private window with{" "}
        <strong>Command-Shift-P</strong>. If it works there, an extension or cookie is the likely cause.
      </p>
      <p>
        Firefox is also one browser among several. If you use more than one, see{" "}
        <Link href={CHROME_CACHE_GUIDE_PATH}>how to clear Chrome cache on a Mac</Link> and{" "}
        <Link href={SAFARI_CACHE_GUIDE_PATH}>how to clear Safari cache on a Mac</Link>. For system and app caches
        beyond the browser, read <Link href={CACHE_GUIDE_PATH}>how to clear cache on a Mac</Link>.
      </p>

      <h2>See every cache at once with {APP_NAME}</h2>
      <p>
        Browser caches are only part of the picture. {APP_NAME} shows every cache, large file and app leftover on your
        Mac with its size, and clears what you pick to the Trash. It costs <Price /> once, with no subscription. Learn
        more on the <Link href="/">home page</Link>.
      </p>
    </GuideLayout>
  );
}
