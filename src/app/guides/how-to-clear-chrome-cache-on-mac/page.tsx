import Link from "next/link";
import { AppCallout, GuideLayout, GuideTable } from "@/components/guide-layout";
import { Price } from "@/components/price";
import { articleGraph, innerPageGraph, pageMetadata } from "@/lib/seo";
import {
  APP_NAME,
  CACHE_GUIDE_PATH,
  CHROME_CACHE_GUIDE_PATH,
  COOKIES_GUIDE_PATH,
  DNS_CACHE_GUIDE_PATH,
  FIREFOX_CACHE_GUIDE_PATH,
  REFUND_DAYS,
  SAFARI_CACHE_GUIDE_PATH,
} from "@/lib/site";

const market = "us" as const;
const path = CHROME_CACHE_GUIDE_PATH;
const published = "2026-11-24";
const title = "How to clear Chrome cache on a Mac without losing your logins";
const description =
  "Clear Google Chrome's cache on a Mac in seconds: the keyboard shortcut, one site at a time, every profile, and the folders Chrome leaves behind on your disk.";

export const metadata = pageMetadata({
  title: "How to Clear Chrome Cache on Mac",
  description,
  path,
  type: "article",
});

const checkboxes = [
  ["Browsing history", "The list of pages you visited", "Your history and address bar suggestions"],
  ["Cookies and other site data", "Logins, site settings and stored data", "You are signed out of most sites"],
  ["Cached images and files", "Copies of page files Chrome reuses", "Nothing. Pages load a little slower once"],
  ["Download history", "The list in the Downloads page", "Only the list. Downloaded files stay put"],
  ["Autofill form data", "Addresses and form entries", "Chrome stops suggesting them"],
  ["Passwords and passkeys", "Saved sign-in details", "Saved passwords, unless they sync"],
];

const folders = [
  ["~/Library/Caches/Google/Chrome", "Main HTTP cache for each profile", "Safe to empty with Chrome quit"],
  ["…/Chrome/Default/Code Cache", "Compiled JavaScript and WebAssembly", "Safe. Chrome rebuilds it"],
  ["…/Chrome/Default/Service Worker", "Offline data for web apps", "Safe, but web apps lose offline copies"],
  ["…/Chrome/Default/GPUCache", "Graphics shader cache", "Safe. Chrome rebuilds it"],
  ["…/Chrome/Default/Cookies", "Your cookies database", "Leave alone, or you sign out everywhere"],
];

const faqs = [
  {
    q: "Does clearing Chrome cache delete my passwords?",
    a: "No, not if you tick only Cached images and files. Passwords, cookies and history are separate checkboxes in the same dialog. Leave them unticked and your logins and saved passwords stay exactly as they were.",
  },
  {
    q: "What is the shortcut to clear Chrome cache on a Mac?",
    a: "Press Command-Shift-Delete in any Chrome window. It opens the Delete browsing data dialog, where you pick a time range and the kinds of data to remove.",
  },
  {
    q: "How do I clear the cache for one website in Chrome?",
    a: "Open the site, click the icon to the left of the address, choose Site settings, then Delete data. Or go to Settings, Privacy and security, Third-party cookies or Site data, and search for the site. Only that site's storage is removed.",
  },
  {
    q: "How big is Chrome's cache on a Mac?",
    a: "It varies with how much you browse. Chrome caps its main HTTP cache itself, but code caches, service workers and extra profiles add to it. Check the size of ~/Library/Caches/Google/Chrome and ~/Library/Application Support/Google/Chrome in Finder to see your own number.",
  },
  {
    q: "Will clearing cache make Chrome faster?",
    a: "Usually not. A cache exists to speed things up, so pages load slightly slower right after you clear it. Clear it to fix a broken page, free space or remove stale data, not as routine maintenance.",
  },
  {
    q: "How often should I clear Chrome cache?",
    a: "Only when something is wrong, such as a site showing an old version, or when the folder has grown large. Chrome manages the cache size on its own, so clearing it on a schedule gains little.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "Clear Chrome cache on Mac", description }),
  ...articleGraph({ path, headline: title, description, published, updated: published, language: "en", faqs }),
];

export default function ChromeCacheGuide() {
  return (
    <GuideLayout
      market={market}
      title={title}
      intro="A site won't load properly, a fix you shipped isn't showing, or Chrome's folders have grown to several gigabytes. Here is how to clear Chrome's cache on a Mac, for everything or for one site, without signing out of anything."
      breadcrumb="Clear Chrome cache"
      updated={published}
      readMinutes={7}
      takeaways={[
        "Command-Shift-Delete opens Chrome's Delete browsing data dialog.",
        "Tick only Cached images and files to keep your logins and history.",
        "You can clear one site's data without touching the rest.",
        "Each Chrome profile has its own cache, so clear each one you use.",
      ]}
      toc={[
        { id: "shortcut", label: "The quick way" },
        { id: "one-site", label: "One site only" },
        { id: "hard-reload", label: "Hard reload" },
        { id: "profiles", label: "Every profile" },
        { id: "folders", label: "Cache folders" },
        { id: "faq", label: "FAQ" },
      ]}
      related={[
        { href: CACHE_GUIDE_PATH, label: "How to clear cache on a Mac" },
        { href: SAFARI_CACHE_GUIDE_PATH, label: "How to clear Safari cache on a Mac" },
        { href: FIREFOX_CACHE_GUIDE_PATH, label: "How to clear Firefox cache on a Mac" },
        { href: COOKIES_GUIDE_PATH, label: "How to clear cookies on a Mac" },
      ]}
      graph={graph}
      faqs={faqs}
      closing={
        <>
          Find every cache on your Mac, not just Chrome&rsquo;s. <Price /> once, with a {REFUND_DAYS}-day refund.
        </>
      }
    >
      <h2 id="shortcut">Clear Chrome cache on a Mac with the keyboard shortcut</h2>
      <p>This is the fastest method, and it works in every recent version of Chrome.</p>
      <ol>
        <li>Open Chrome and press <strong>Command-Shift-Delete</strong>.</li>
        <li>
          The <strong>Delete browsing data</strong> dialog opens. If you see a short list, click{" "}
          <strong>More</strong> or switch to the <strong>Advanced</strong> tab, depending on your version.
        </li>
        <li>
          Set <strong>Time range</strong> to <strong>All time</strong>. Shorter ranges only clear recent files, which
          often leaves the stale one that causes the problem.
        </li>
        <li>
          Tick <strong>Cached images and files</strong>. Untick everything else unless you want it gone too.
        </li>
        <li>
          Click <strong>Delete data</strong>.
        </li>
      </ol>
      <p>
        You can reach the same dialog through the menus. Choose <strong>Chrome</strong> in the menu bar, then{" "}
        <strong>Delete Browsing Data</strong>. Or open <strong>Settings</strong>, then{" "}
        <strong>Privacy and security</strong>, then <strong>Delete browsing data</strong>.
      </p>
      <h3>What each checkbox removes</h3>
      <GuideTable head={["Checkbox", "What it holds", "What you lose"]} rows={checkboxes} />
      <p>
        The one that signs you out is <strong>Cookies and other site data</strong>. If you only want to fix a page or
        free space, leave it unticked. If you want to clear cookies too, our guide on{" "}
        <Link href={COOKIES_GUIDE_PATH}>how to clear cookies on a Mac</Link> explains what to keep.
      </p>
      <p>
        If you are signed in to Chrome with sync turned on, deleting history or passwords here deletes them on your
        other devices too. Cached files never sync, so clearing the cache affects only this Mac.
      </p>

      <h2 id="one-site">Clear the cache for one website</h2>
      <p>
        When a single site misbehaves, there is no need to wipe everything. Chrome lets you delete data for one site
        at a time.
      </p>
      <ol>
        <li>Open the site that isn&rsquo;t working.</li>
        <li>
          Click the icon to the left of the web address. It looks like a padlock or a pair of sliders.
        </li>
        <li>
          Choose <strong>Site settings</strong>, then click <strong>Delete data</strong> and confirm.
        </li>
      </ol>
      <p>
        This removes that site&rsquo;s cookies, local storage and cached data, so you will need to sign in to that one
        site again. Every other site keeps its data.
      </p>
      <h3>Find a site in Settings instead</h3>
      <p>
        Open <strong>Settings</strong>, then <strong>Privacy and security</strong>. Look for{" "}
        <strong>Site data</strong> or <strong>See all site data and permissions</strong>; the exact label changes
        between Chrome versions. Search for the domain and click the bin icon next to it. This view also shows how much
        storage each site uses, which is handy for spotting a web app that has stored gigabytes.
      </p>

      <h2 id="hard-reload">Use a hard reload for a quick fix</h2>
      <p>
        If one page shows an old version, a hard reload may be all you need. It reloads the page and ignores the cached
        copy for that load.
      </p>
      <ul>
        <li>
          Press <strong>Command-Shift-R</strong> on the page.
        </li>
        <li>
          Or open Developer Tools with <strong>Command-Option-I</strong>, then right-click the reload button and choose{" "}
          <strong>Empty Cache and Hard Reload</strong>. This option only appears while Developer Tools is open.
        </li>
      </ul>
      <p>
        Web developers can also tick <strong>Disable cache</strong> in the Network tab of Developer Tools. Chrome then
        skips the cache while that panel stays open, which is useful while testing a site.
      </p>

      <h2 id="profiles">Clear the cache in every Chrome profile</h2>
      <p>
        Each Chrome profile, such as Work and Personal, keeps its own cache. Clearing data in one profile leaves the
        others untouched. That is a common reason people clear the cache and see no change in disk space.
      </p>
      <ol>
        <li>Click your profile picture at the top right of Chrome and switch to the next profile.</li>
        <li>
          In that profile&rsquo;s window, press <strong>Command-Shift-Delete</strong> and repeat the steps above.
        </li>
        <li>Do the same for each profile you use.</li>
      </ol>
      <p>
        If you no longer use a profile, removing it frees its whole folder. Click the profile picture, open{" "}
        <strong>Manage Chrome profiles</strong>, then use the menu on the old profile and choose{" "}
        <strong>Delete</strong>. This removes that profile&rsquo;s bookmarks and history from this Mac, so export
        anything you want first.
      </p>

      <AppCallout market={market} title="See how much space browsers really use">
        {APP_NAME} scans your Mac on the device and lists caches from Chrome, other browsers and your apps, with the
        size and location of each. It also finds large files, duplicates and app leftovers. Everything you clear goes to
        the Trash, and Undo puts it back.
      </AppCallout>

      <h2 id="folders">Where Chrome stores its cache on a Mac</h2>
      <p>
        Chrome splits its data between two places in your user Library. The settings dialog clears most of it, but
        not all, and it can&rsquo;t clear a profile you have stopped opening.
      </p>
      <GuideTable head={["Folder", "What it holds", "Safe to delete?"]} rows={folders} />
      <p>
        In this table, <code>…/Chrome</code> means <code>~/Library/Application Support/Google/Chrome</code>. Other
        profiles use folders named <code>Profile 1</code>, <code>Profile 2</code> and so on instead of{" "}
        <code>Default</code>.
      </p>
      <h3>Clear the cache folders by hand</h3>
      <ol>
        <li>
          Quit Chrome fully with <strong>Command-Q</strong>. Closing the windows isn&rsquo;t enough.
        </li>
        <li>
          In Finder, choose <strong>Go</strong>, then <strong>Go to Folder</strong>, and enter{" "}
          <code>~/Library/Caches/Google/Chrome</code>.
        </li>
        <li>Open the profile folder inside, select its contents and move them to the Trash.</li>
        <li>
          For the code and GPU caches, go to <code>~/Library/Application Support/Google/Chrome/Default</code> and
          trash the contents of <code>Code Cache</code> and <code>GPUCache</code>.
        </li>
        <li>Open Chrome again. It recreates the folders as you browse.</li>
      </ol>
      <p>
        Don&rsquo;t delete the whole <code>Google/Chrome</code> folder in Application Support. It holds your
        bookmarks, history, extensions and cookies. Only remove the cache folders named above.
      </p>
      <h3>Service Worker data</h3>
      <p>
        Web apps such as email, chat and documents use service workers to work offline. Their storage sits in the{" "}
        <code>Service Worker</code> folder, and on some Macs it is the largest part of Chrome&rsquo;s data. Deleting
        it is safe, but those web apps reload their offline copies the next time you open them. The per-site view in
        Settings is the tidier way to clear one large web app.
      </p>

      <h2>Clearing cache vs flushing DNS in Chrome</h2>
      <p>
        If a site doesn&rsquo;t load at all, or loads from an old server after a move, the cache may not be the cause.
        Chrome also keeps a DNS cache of website addresses. Clear it by visiting{" "}
        <code>chrome://net-internals/#dns</code> and clicking <strong>Clear host cache</strong>. Our guide on{" "}
        <Link href={DNS_CACHE_GUIDE_PATH}>how to flush the DNS cache on a Mac</Link> covers the system-wide version.
      </p>

      <h2>Other browsers and the rest of your Mac</h2>
      <p>
        Chrome is rarely the only cache on a Mac. If you also use Safari, follow our guide on{" "}
        <Link href={SAFARI_CACHE_GUIDE_PATH}>how to clear Safari cache on a Mac</Link>. For Firefox, see{" "}
        <Link href={FIREFOX_CACHE_GUIDE_PATH}>how to clear Firefox cache on a Mac</Link>. And for system and app
        caches beyond the browser, read <Link href={CACHE_GUIDE_PATH}>how to clear cache on a Mac</Link>.
      </p>

      <h2>Clear caches in one pass with {APP_NAME}</h2>
      <p>
        Clearing Chrome by hand works well for one browser. If you want to see every cache, large file and leftover
        on your Mac at once, {APP_NAME} lists them with sizes, lets you choose and moves them to the Trash. It costs{" "}
        <Price /> once, with no subscription. Learn more on the <Link href="/">home page</Link>.
      </p>
    </GuideLayout>
  );
}
