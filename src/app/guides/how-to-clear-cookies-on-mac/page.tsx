import Link from "next/link";
import { ContentPage } from "@/components/content-page";
import { innerPageGraph, isoDateTime, pageMetadata } from "@/lib/seo";
import { CACHE_GUIDE_PATH, COOKIES_GUIDE_PATH, OG_IMAGE, SAFARI_CACHE_GUIDE_PATH, SITE_URL, pages } from "@/lib/site";

const path = COOKIES_GUIDE_PATH;
const title = "How to clear cookies on Mac in every browser";
const description =
  "Learn how to clear cookies on Mac in Safari, Chrome, Firefox and Edge, for one site or all of them, and how to clear cache and cookies together without losing passwords.";
const updated = pages.find((p) => p.path === path)?.updated ?? "2026-10-30";

export const metadata = pageMetadata({
  title: "How to Clear Cookies on Mac (Safari, Chrome, Firefox, Edge)",
  description,
  path,
  type: "article",
});

const browsers = [
  { browser: "Safari", path: "Settings → Privacy → Manage Website Data", shortcut: "None", label: "Remove All" },
  { browser: "Chrome", path: "Chrome menu → Delete Browsing Data", shortcut: "Shift-Command-Delete", label: "Cookies and other site data" },
  { browser: "Firefox", path: "Settings → Privacy & Security → Cookies and Site Data", shortcut: "Shift-Command-Delete", label: "Cookies and site data" },
  { browser: "Edge", path: "Settings → Privacy, search, and services → Clear browsing data", shortcut: "Shift-Command-Delete", label: "Cookies and other site data" },
];

const faqs = [
  {
    q: "Will clearing cookies delete my saved passwords?",
    a: "No. Browsers store saved passwords separately from cookies. Safari keeps them in iCloud Keychain, and Chrome keeps them in Google Password Manager. You sign in to sites again, but your passwords still fill in.",
  },
  {
    q: "How to clear cookies on Mac without signing out of everything?",
    a: "Delete cookies for the problem site only. In Safari, use Manage Website Data and remove that one site. In Chrome, use the site's Cookies and site data panel. Every other site keeps you signed in.",
  },
  {
    q: "How do I clear cache and cookies on my Mac in one step?",
    a: "In Chrome, Firefox or Edge, press Shift-Command-Delete and tick both the cookies and the cache options. In Safari, open Manage Website Data in Privacy settings and click Remove All.",
  },
  {
    q: "How do I delete cookies on a Mac for just one site?",
    a: "In Safari, open Settings, then Privacy, then Manage Website Data, search for the site and click Remove. In Chrome, click the icon left of the address, then Cookies and site data, then Manage on-device site data, and delete the site.",
  },
  {
    q: "How do I clear cookies on a MacBook Air?",
    a: "Exactly as on any other Mac. A MacBook Air runs the same macOS and the same browsers, so every step in this guide applies.",
  },
  {
    q: "Should I block all cookies on my Mac?",
    a: "Usually not. Blocking all cookies stops you from signing in to most sites and can break shopping carts. Safari's Prevent cross-site tracking setting blocks the tracking cookies most people worry about and keeps logins working.",
  },
  {
    q: "Why do cookies come back after I delete them?",
    a: "Sites set new cookies on your next visit. That is normal. Use a private window if you don't want a browser to keep cookies after you close it.",
  },
  {
    q: "Does clearing cookies speed up a Mac?",
    a: "Not noticeably. Cookies are tiny text files. Clear them to fix login problems or protect your privacy, and clear your cache if you need disk space.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "Clear cookies on a Mac", description }),
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
      intro="Cookies keep you signed in, but they also track you and can break a login that refuses to work. Here is how to clear cookies on Mac in each browser, for one site or all of them."
      breadcrumb="Clear cookies on a Mac"
      updated={updated}
      graph={graph}
    >
      <p>
        Every browser keeps its own cookies, so clear them in each browser you use. The steps work on any MacBook Air,
        MacBook Pro, iMac or Mac mini running macOS Ventura or later.
      </p>

      <h2>The short answer</h2>
      <ol>
        <li>
          <strong>Safari:</strong> choose <strong>Safari</strong>, then <strong>Settings</strong>, then{" "}
          <strong>Privacy</strong>, then <strong>Manage Website Data</strong>, and click <strong>Remove All</strong>.
        </li>
        <li>
          <strong>Chrome, Firefox or Edge:</strong> press <strong>Shift-Command-Delete</strong>, tick the cookies
          option, choose <strong>All time</strong> and confirm.
        </li>
      </ol>
      <p>
        You will sign out of most websites. Your saved passwords, bookmarks and history stay where they are.
      </p>

      <h2>What cookies are and why you clear them</h2>
      <p>
        A cookie is a small text file a website saves in your browser. It remembers that you signed in, what sits in
        your cart and which language you chose. Some cookies come from advertisers, who use them to follow you from site
        to site.
      </p>
      <h3>Good reasons to delete cookies</h3>
      <ul>
        <li>
          <strong>A login loops or fails.</strong> A stale cookie can stop a site from signing you in.
        </li>
        <li>
          <strong>You used a shared or borrowed Mac.</strong> Clearing cookies signs you out of every account.
        </li>
        <li>
          <strong>You want fewer targeted ads.</strong> Removing tracking cookies breaks the trail advertisers follow.
        </li>
        <li>
          <strong>You plan to sell or give away your Mac.</strong> Clear cookies, then erase the Mac.
        </li>
      </ul>
      <h3>The types of cookies you will see</h3>
      <h4>First-party cookies</h4>
      <p>
        The site you visit sets these. They keep you signed in and remember your settings, so deleting them is what
        signs you out.
      </p>
      <h4>Third-party cookies</h4>
      <p>
        Another company sets these through ads or embedded content on the page. They follow you across sites, and they
        are the ones most privacy settings block.
      </p>
      <h4>Session and persistent cookies</h4>
      <p>
        Session cookies disappear when you quit the browser. Persistent cookies stay until they expire or you delete
        them, which can take months or years.
      </p>
      <h3>What clearing cookies does not do</h3>
      <p>
        It doesn&rsquo;t delete saved passwords, bookmarks or downloads, and it frees almost no disk space. For space,
        clear your cache instead.
      </p>

      <h2>Where to clear cookies in each browser</h2>
      <div className="mt-6 overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Browser</th>
              <th scope="col">Where to go</th>
              <th scope="col">Shortcut</th>
              <th scope="col">Option to tick</th>
            </tr>
          </thead>
          <tbody>
            {browsers.map(({ browser, path, shortcut, label }) => (
              <tr key={browser}>
                <th scope="row">{browser}</th>
                <td>{path}</td>
                <td>{shortcut}</td>
                <td>{label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>How to clear cookies on Mac, browser by browser</h2>

      <h3>1. Safari</h3>
      <h4>Delete all cookies</h4>
      <ol>
        <li>
          Choose <strong>Safari</strong>, then <strong>Settings</strong>, then <strong>Privacy</strong>.
        </li>
        <li>
          Click <strong>Manage Website Data</strong>.
        </li>
        <li>
          Click <strong>Remove All</strong>, then <strong>Remove Now</strong>.
        </li>
      </ol>
      <h4>Delete cookies for one site</h4>
      <p>
        In the same window, type the site&rsquo;s name in the search field, select it and click{" "}
        <strong>Remove</strong>. Every other site keeps you signed in.
      </p>
      <h4>Delete cookies, cache and history together</h4>
      <p>
        Choose <strong>History</strong>, then <strong>Clear History</strong>, pick <strong>all history</strong> and
        confirm. For cache-only options, read{" "}
        <Link href={SAFARI_CACHE_GUIDE_PATH}>how to clear Safari cache on a Mac</Link>.
      </p>

      <h3>2. Google Chrome</h3>
      <h4>Delete all cookies</h4>
      <ol>
        <li>
          Choose <strong>Chrome</strong>, then <strong>Delete Browsing Data</strong>, or press{" "}
          <strong>Shift-Command-Delete</strong>.
        </li>
        <li>
          Set the time range to <strong>All time</strong>.
        </li>
        <li>
          Tick <strong>Cookies and other site data</strong>. Untick the rest if you want to keep them.
        </li>
        <li>
          Click <strong>Delete data</strong>.
        </li>
      </ol>
      <h5>Signed in to Chrome?</h5>
      <p>
        Chrome keeps you signed in to your Google account in the browser even after you delete cookies, so sync keeps
        working.
      </p>
      <h4>Delete cookies for one site</h4>
      <p>
        Open the site, click the icon to the left of its address, then choose <strong>Cookies and site data</strong>,
        then <strong>Manage on-device site data</strong>. Click the bin icon next to each entry.
      </p>

      <h3>3. Firefox</h3>
      <h4>Delete all cookies</h4>
      <ol>
        <li>
          Choose <strong>Firefox</strong>, then <strong>Settings</strong>, then <strong>Privacy &amp; Security</strong>
          .
        </li>
        <li>
          Under <strong>Cookies and Site Data</strong>, click <strong>Clear Data</strong>.
        </li>
        <li>
          Tick <strong>Cookies and site data</strong> and click <strong>Clear</strong>.
        </li>
      </ol>
      <h4>Delete cookies for one site</h4>
      <p>
        Click <strong>Manage Data</strong> in the same section, search for the site, select it and click{" "}
        <strong>Remove Selected</strong>, then <strong>Save Changes</strong>.
      </p>

      <h3>4. Microsoft Edge</h3>
      <ol>
        <li>
          Press <strong>Shift-Command-Delete</strong>.
        </li>
        <li>
          Choose <strong>All time</strong> and tick <strong>Cookies and other site data</strong>.
        </li>
        <li>
          Click <strong>Clear now</strong>.
        </li>
      </ol>

      <h3>5. Brave, Opera and other browsers</h3>
      <p>
        Most other Mac browsers are built on the same engine as Chrome, so the same shortcut works. Press{" "}
        <strong>Shift-Command-Delete</strong>, tick <strong>Cookies and other site data</strong>, choose{" "}
        <strong>All time</strong> and confirm.
      </p>

      <h2>What to expect after you delete cookies</h2>
      <ul>
        <li>
          <strong>You sign in again.</strong> Sites that use two-factor authentication may ask for a code, because they
          no longer recognise your browser.
        </li>
        <li>
          <strong>Cookie banners return.</strong> Sites forget your consent choices and ask again.
        </li>
        <li>
          <strong>Carts and preferences reset.</strong> Items in a shopping cart and choices such as language or dark
          mode go back to the defaults.
        </li>
        <li>
          <strong>Login loops stop.</strong> A site that kept failing to sign you in usually works on the next try.
        </li>
      </ul>

      <h2>How to clear cache and cookies on a Mac at once</h2>
      <p>
        When a site still misbehaves after you delete its cookies, clear its cached files too. In Chrome, Firefox and
        Edge, tick both the cookies option and the cache option in the same window. In Safari, Remove All in Manage
        Website Data clears both. Restart the browser afterwards.
      </p>

      <h2>Control cookies instead of deleting them</h2>
      <h3>Block tracking cookies in Safari</h3>
      <p>
        Open <strong>Settings</strong>, then <strong>Privacy</strong>, and make sure{" "}
        <strong>Prevent cross-site tracking</strong> is on. Safari blocks most advertising cookies and keeps your logins
        working.
      </p>
      <h3>Block third-party cookies in Chrome</h3>
      <p>
        Open <strong>Settings</strong>, then <strong>Privacy and security</strong>, then{" "}
        <strong>Third-party cookies</strong>, and choose to block them.
      </p>
      <h3>Delete cookies automatically when you quit</h3>
      <h4>Firefox</h4>
      <p>
        Open <strong>Settings</strong>, then <strong>Privacy &amp; Security</strong>, and tick{" "}
        <strong>Delete cookies and site data when Firefox is closed</strong>. Click <strong>Manage Exceptions</strong>{" "}
        to keep the sites you want to stay signed in to.
      </p>
      <h4>Chrome</h4>
      <p>
        Open <strong>Settings</strong>, then <strong>Privacy and security</strong>, then <strong>Site settings</strong>
        , then <strong>On-device site data</strong>, and choose to delete data when you close all windows.
      </p>
      <h3>Use private browsing</h3>
      <p>
        A private window in any browser throws away its cookies when you close it. Press{" "}
        <strong>Shift-Command-N</strong> in Safari or Chrome, or <strong>Shift-Command-P</strong> in Firefox.
      </p>

      <h2>Don&rsquo;t delete cookie files in Finder</h2>
      <p>
        Some guides tell you to delete files in <code>~/Library/Cookies</code> or to run Terminal commands. Skip that.
        Modern browsers store cookies in their own databases, often in folders macOS protects, and deleting them by hand
        can corrupt a browser profile. The browser settings above are faster and safe.
      </p>

      <h2>Free up space as well</h2>
      <p>
        Cookies take up kilobytes, but app caches can take gigabytes. Our guide on{" "}
        <Link href={CACHE_GUIDE_PATH}>how to clear cache on a Mac</Link> shows where the big caches hide and which ones
        are safe to clear.
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
