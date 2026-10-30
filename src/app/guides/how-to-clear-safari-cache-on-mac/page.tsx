import Link from "next/link";
import { ContentPage } from "@/components/content-page";
import { innerPageGraph, isoDateTime, pageMetadata } from "@/lib/seo";
import { CACHE_GUIDE_PATH, COOKIES_GUIDE_PATH, OG_IMAGE, SAFARI_CACHE_GUIDE_PATH, SITE_URL, pages } from "@/lib/site";

const path = SAFARI_CACHE_GUIDE_PATH;
const title = "How to clear Safari cache on Mac: 5 ways";
const description =
  "Learn how to clear Safari cache on Mac in seconds: empty caches only, clear one website, or wipe history and cookies. Steps for Safari on macOS Ventura and later.";
const updated = pages.find((p) => p.path === path)?.updated ?? "2026-10-30";

export const metadata = pageMetadata({
  title: "How to Clear Safari Cache on Mac (5 Quick Ways)",
  description,
  path,
  type: "article",
});

const options = [
  { option: "Empty Caches", clears: "Cached files only", signedIn: "Yes", history: "Kept" },
  { option: "Remove one website", clears: "Cache and cookies for that site", signedIn: "Everywhere else", history: "Kept" },
  { option: "Remove All website data", clears: "Cache and cookies for every site", signedIn: "No", history: "Kept" },
  { option: "Clear History", clears: "History, cache and cookies", signedIn: "No", history: "Deleted" },
  { option: "Reload from origin", clears: "Nothing stored, one fresh page load", signedIn: "Yes", history: "Kept" },
];

const faqs = [
  {
    q: "What is the shortcut to clear Safari cache on a Mac?",
    a: "Press Option-Command-E. The shortcut only works after you turn on Show features for web developers in Safari Settings, under Advanced.",
  },
  {
    q: "How to clear Safari cache on Mac without the Develop menu?",
    a: "Open Safari Settings, then Privacy, then Manage Website Data, and click Remove All. It clears the cache along with cookies, so you sign in to sites again. History stays.",
  },
  {
    q: "How do I clear cache and cookies in Safari?",
    a: "Open Safari Settings, then Privacy, then Manage Website Data, and click Remove All, then Remove Now. To clear history as well, choose History, then Clear History, instead.",
  },
  {
    q: "Does clearing Safari cache delete my passwords?",
    a: "No. Safari keeps saved passwords in iCloud Keychain, which you see in the Passwords app on macOS Sequoia and later. Clearing cache, cookies or history never touches it. You may need to sign in to websites again after you clear cookies, but your saved passwords still fill in.",
  },
  {
    q: "Does clearing Safari cache on my Mac clear it on my iPhone?",
    a: "Empty Caches only affects your Mac. Clear History syncs through iCloud, so it also removes history on your iPhone and iPad if Safari is turned on in iCloud settings.",
  },
  {
    q: "Why is Clear History greyed out in Safari?",
    a: "Screen Time content limits block it. Open System Settings, then Screen Time, then Content & Privacy, and set web content to unrestricted access. Your Mac may be managed by a school or company if you can't change it.",
  },
  {
    q: "How do I clear the cache on Safari for one website?",
    a: "Open Safari Settings, then Privacy, then Manage Website Data. Search for the site, select it and click Remove. That clears its cache and cookies and leaves every other site alone.",
  },
  {
    q: "Should I clear Safari cache regularly?",
    a: "No. Safari manages its cache well on its own. Clear it when a site looks broken or shows old content, or when you want to free a little space.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "Clear Safari cache on a Mac", description }),
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
      intro="A page that won't update or a site that looks broken is often Safari loading an old copy. Here is how to clear Safari cache on Mac, from one keystroke to a full reset."
      breadcrumb="Clear Safari cache on a Mac"
      updated={updated}
      graph={graph}
    >
      <p>
        The steps match Safari 16 and later on macOS Ventura and later, on any MacBook, iMac or Mac mini. On older
        versions, Safari calls its settings <strong>Preferences</strong>.
      </p>

      <h2>The short answer</h2>
      <ol>
        <li>
          Open Safari and choose <strong>Safari</strong>, then <strong>Settings</strong>.
        </li>
        <li>
          Click <strong>Advanced</strong> and turn on <strong>Show features for web developers</strong>.
        </li>
        <li>
          Choose <strong>Develop</strong>, then <strong>Empty Caches</strong>, or press{" "}
          <strong>Option-Command-E</strong>.
        </li>
      </ol>
      <p>
        Safari clears its cached files at once. You stay signed in to every site, and your history stays put. To clear
        cookies or history too, use the other methods below.
      </p>

      <h2>What Safari&rsquo;s cache holds</h2>
      <p>
        Every time you visit a site, Safari saves copies of its images, scripts and style sheets on your Mac. The next
        visit loads them from your disk, which makes pages appear faster and uses less data.
      </p>
      <p>
        Problems start when a site changes but Safari keeps showing the old copy, or a cached file gets damaged. You
        might see an outdated page, a layout that looks broken or a login form that won&rsquo;t submit.
      </p>
      <h3>Cache, cookies and history are different</h3>
      <ul>
        <li>
          <strong>Cache</strong> stores copies of page files. Clearing it never signs you out.
        </li>
        <li>
          <strong>Cookies and website data</strong> remember logins, carts and preferences. Clearing them signs you out.
        </li>
        <li>
          <strong>History</strong> lists the pages you visited. It syncs to your other Apple devices through iCloud.
        </li>
      </ul>

      <h2>Which option should you use?</h2>
      <div className="mt-6 overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Option</th>
              <th scope="col">What it clears</th>
              <th scope="col">Stay signed in?</th>
              <th scope="col">History</th>
            </tr>
          </thead>
          <tbody>
            {options.map(({ option, clears, signedIn, history }, i) => (
              <tr key={option}>
                <th scope="row">
                  {i + 1}. {option}
                </th>
                <td>{clears}</td>
                <td>{signedIn}</td>
                <td>{history}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>How to clear Safari cache on Mac step by step</h2>

      <h3>1. Empty Safari&rsquo;s cache only</h3>
      <p>This is the best fix for most problems, because it keeps your logins and history.</p>
      <h4>Turn on the Develop menu</h4>
      <ol>
        <li>
          Choose <strong>Safari</strong>, then <strong>Settings</strong>, or press <strong>Command-Comma</strong>.
        </li>
        <li>
          Click <strong>Advanced</strong>.
        </li>
        <li>
          Tick <strong>Show features for web developers</strong> at the bottom of the window.
        </li>
      </ol>
      <h5>On Safari 16 or earlier</h5>
      <p>
        The checkbox is called <strong>Show Develop menu in menu bar</strong>.
      </p>
      <h4>Empty the caches</h4>
      <p>
        Choose <strong>Develop</strong> in the menu bar, then <strong>Empty Caches</strong>. Nothing pops up, and Safari
        clears the cache straight away. From now on, press <strong>Option-Command-E</strong> whenever you need to.
      </p>
      <h4>Reload the page</h4>
      <p>
        Open tabs still show the old version until you reload them. Press <strong>Command-R</strong> on each tab you
        want to refresh.
      </p>

      <h3>2. Clear the cache for one website</h3>
      <p>When only one site misbehaves, clear just that site and leave the rest alone.</p>
      <ol>
        <li>
          Choose <strong>Safari</strong>, then <strong>Settings</strong>, then <strong>Privacy</strong>.
        </li>
        <li>
          Click <strong>Manage Website Data</strong>. Safari lists every site that stores data on your Mac.
        </li>
        <li>
          Type the site&rsquo;s name in the search field, select it and click <strong>Remove</strong>.
        </li>
        <li>
          Click <strong>Done</strong>.
        </li>
      </ol>
      <p>
        This removes the site&rsquo;s cache and cookies, so you sign in to that site again. Search for the main name,
        such as &ldquo;google&rdquo;, to catch every subdomain it uses.
      </p>

      <h3>3. Remove all website data</h3>
      <p>
        In <strong>Manage Website Data</strong>, click <strong>Remove All</strong>, then <strong>Remove Now</strong>.
        Safari deletes the cache and cookies for every site but keeps your history. Expect to sign in again everywhere.
      </p>

      <h3>4. Clear history, cache and cookies together</h3>
      <p>Use this for a full reset, such as before you sell your Mac or after someone else used it.</p>
      <ol>
        <li>
          Choose <strong>History</strong>, then <strong>Clear History</strong>.
        </li>
        <li>
          Pick a range: <strong>the last hour</strong>, <strong>today</strong>, <strong>today and yesterday</strong> or{" "}
          <strong>all history</strong>.
        </li>
        <li>
          Click <strong>Clear History</strong>.
        </li>
      </ol>
      <h4>What Clear History removes</h4>
      <p>
        Despite its name, it also removes cookies and cached files from that period. If you use Safari in iCloud, your
        history clears on your iPhone and iPad too.
      </p>
      <h4>If you use Safari profiles</h4>
      <p>
        The window may ask which profile to clear. Choose the profile you want, or all of them.
      </p>

      <h3>5. Reload a page without its cache</h3>
      <p>
        To see the latest version of one page without clearing anything, hold <strong>Option</strong> and choose{" "}
        <strong>View</strong>, then <strong>Reload Page From Origin</strong>, or press{" "}
        <strong>Option-Command-R</strong>. Safari skips its cache for that single load.
      </p>

      <h2>How much space does Safari&rsquo;s cache use?</h2>
      <p>
        Safari doesn&rsquo;t show its cache size in its settings, but Finder does. Choose <strong>Go</strong>, then{" "}
        <strong>Go to Folder</strong>, type <code>~/Library/Caches</code> and press <strong>Return</strong>. Select the{" "}
        <code>com.apple.Safari</code> folder and press <strong>Command-I</strong> to see its size.
      </p>
      <p>
        On most Macs it takes a few hundred megabytes, because Safari trims its own cache over time. If you need
        gigabytes back, Safari is rarely the place to find them.
      </p>

      <h2>What happens after you clear Safari cache</h2>
      <ul>
        <li>
          <strong>Pages load a little slower at first.</strong> Safari downloads images and scripts again on your next
          visit, then caches them as before.
        </li>
        <li>
          <strong>Sites show their latest version.</strong> Old layouts and stale content disappear once you reload.
        </li>
        <li>
          <strong>Your settings stay.</strong> Bookmarks, Reading List, extensions and saved passwords don&rsquo;t
          change.
        </li>
        <li>
          <strong>Cookies stay unless you chose to remove them.</strong> Empty Caches never signs you out.
        </li>
      </ul>

      <h2>Clear Safari cache on your iPhone or iPad</h2>
      <p>
        Your iPhone and iPad keep their own Safari cache, separate from your Mac. On iOS 18 and later, open{" "}
        <strong>Settings</strong>, then <strong>Apps</strong>, then <strong>Safari</strong>, and tap{" "}
        <strong>Clear History and Website Data</strong>. On earlier versions, Safari sits directly in Settings.
      </p>

      <h2>Stop Safari from keeping a cache</h2>
      <p>
        A private window doesn&rsquo;t keep cache, cookies or history after you close it. Choose <strong>File</strong>,
        then <strong>New Private Window</strong>, or press <strong>Shift-Command-N</strong>. It suits a quick test,
        such as checking whether a site works without your saved data.
      </p>

      <h2>Safari cache shortcuts</h2>
      <ul>
        <li>
          <strong>Option-Command-E:</strong> empty caches, once the Develop menu is on.
        </li>
        <li>
          <strong>Option-Command-R:</strong> reload the current page without its cache.
        </li>
        <li>
          <strong>Shift-Command-N:</strong> open a private window that keeps nothing.
        </li>
        <li>
          <strong>Command-Comma:</strong> open Safari Settings.
        </li>
        <li>
          <strong>Command-Y:</strong> show your history, where you can delete single pages.
        </li>
      </ul>

      <h2>Safari cache still causing problems?</h2>
      <ul>
        <li>
          <strong>Quit and reopen Safari.</strong> Press <strong>Command-Q</strong>, then open it again to drop anything
          held in memory.
        </li>
        <li>
          <strong>Turn off extensions.</strong> Open <strong>Settings</strong>, then <strong>Extensions</strong>, and
          untick them one at a time. Content blockers often break sites.
        </li>
        <li>
          <strong>Check another browser.</strong> If the site fails in Chrome too, the problem is the site, not your
          cache.
        </li>
        <li>
          <strong>Update macOS.</strong> Safari updates come with macOS, under <strong>System Settings</strong>, then{" "}
          <strong>General</strong>, then <strong>Software Update</strong>.
        </li>
      </ul>

      <h2>Clear caches beyond Safari</h2>
      <p>
        Safari&rsquo;s cache is usually small. Apps such as Spotify, Chrome and Xcode keep much bigger ones in your
        Library folder. Our guide on <Link href={CACHE_GUIDE_PATH}>how to clear cache on a Mac</Link> covers every app,
        and <Link href={COOKIES_GUIDE_PATH}>how to clear cookies on a Mac</Link> covers cookies in every browser.
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
