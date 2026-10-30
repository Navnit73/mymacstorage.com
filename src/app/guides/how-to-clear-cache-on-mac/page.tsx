import Link from "next/link";
import { ContentPage } from "@/components/content-page";
import { innerPageGraph, isoDateTime, pageMetadata } from "@/lib/seo";
import {
  AIR_CACHE_GUIDE_PATH,
  APP_NAME,
  CACHE_GUIDE_PATH,
  COOKIES_GUIDE_PATH,
  OG_IMAGE,
  PRICE,
  PRO_CACHE_GUIDE_PATH,
  SAFARI_CACHE_GUIDE_PATH,
  SITE_URL,
  SYSTEM_DATA_GUIDE_PATH,
  pages,
} from "@/lib/site";

const path = CACHE_GUIDE_PATH;
const title = "How to clear cache on Mac: 6 safe ways";
const description =
  "Learn how to clear cache on Mac safely: app, browser and system caches, Safe Mode and DNS. Step-by-step for macOS Ventura and later, with what never to delete.";
const updated = pages.find((p) => p.path === path)?.updated ?? "2026-10-30";

export const metadata = pageMetadata({
  title: "How to Clear Cache on Mac (6 Safe Ways)",
  description,
  path,
  type: "article",
});

const cacheTypes = [
  { type: "App caches", where: "~/Library/Caches", holds: "Thumbnails, downloads, previews", safe: "Yes, with the app closed" },
  { type: "Browser caches", where: "Inside each browser", holds: "Images, scripts and pages from sites", safe: "Yes, from browser settings" },
  { type: "System caches", where: "/Library/Caches", holds: "Shared data that macOS services use", safe: "Leave it to macOS" },
  { type: "Protected caches", where: "/System/Library/Caches", holds: "Core macOS files", safe: "No, macOS locks them" },
  { type: "DNS cache", where: "In memory", holds: "Recent website addresses", safe: "Yes, with one command" },
];

const methods = [
  { method: "Clear app caches in Finder", best: "Freeing the most space", time: "10 minutes" },
  { method: "Clear browser caches", best: "Pages that load wrongly", time: "2 minutes" },
  { method: "Clear one app's cache from its menu", best: "A single misbehaving app", time: "1 minute" },
  { method: "Restart in Safe Mode", best: "Font and startup problems", time: "10 minutes" },
  { method: "Flush the DNS cache", best: "Sites that won't load", time: "1 minute" },
  { method: "Use a cleanup app", best: "Seeing every cache at once", time: "2 minutes" },
];

const faqs = [
  {
    q: "Is it safe to clear the cache on a Mac?",
    a: "Yes, for app and browser caches. Apps rebuild them the next time they need them. Leave /System/Library/Caches alone, and quit an app before you clear its cache folder.",
  },
  {
    q: "Will clearing cache delete my files or passwords?",
    a: "No. Caches hold copies of data, not your documents, photos or saved passwords. Clearing cookies is different: it signs you out of websites, so clear only the cache if you want to stay signed in.",
  },
  {
    q: "How often should I clear the cache on my Mac?",
    a: "Only when you need to: when storage runs low, an app misbehaves or a website shows old content. Clearing caches every week slows your Mac down, because apps must download and rebuild everything again.",
  },
  {
    q: "Does clearing cache make a Mac faster?",
    a: "Rarely. It fixes apps that load corrupt cached data and frees disk space, which helps when your disk is almost full. On a healthy Mac, apps run a little slower at first while they rebuild their caches.",
  },
  {
    q: "Why did my cache come back after I cleared it?",
    a: "That is normal. Apps and browsers create caches as you use them, so the folder grows again. Clearing it is a fix for a problem or a full disk, not a one-time cleanup.",
  },
  {
    q: "How to clear cache on Mac without an app?",
    a: "Use the tools macOS already has. Finder's Go to Folder opens your Caches folder, each browser clears its own cache from its settings, and Safe Mode clears some system caches. None of them costs anything.",
  },
  {
    q: "How to clear cache on Mac with Terminal?",
    a: "You can, but we don't recommend it. Commands such as rm delete files for good, with no Trash and no undo. Finder's Go to Folder reaches the same folders and lets you restore a mistake.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "Clear cache on a Mac", description }),
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
      intro="Caches speed up your Mac, until they grow to gigabytes or go stale. Here is how to clear cache on Mac without breaking apps or losing anything you need."
      breadcrumb="Clear cache on a Mac"
      updated={updated}
      graph={graph}
    >
      <p>
        Every method below is free and works on any MacBook Air, MacBook Pro, iMac, Mac mini or Mac Studio. The menus
        match macOS Ventura and later, and we note where older versions differ.
      </p>

      <h2>The short answer</h2>
      <p>Here is how to clear cache on Mac in five steps:</p>
      <ol>
        <li>Quit the apps you have open.</li>
        <li>
          In Finder, choose <strong>Go</strong>, then <strong>Go to Folder</strong>, or press{" "}
          <strong>Shift-Command-G</strong>.
        </li>
        <li>
          Type <code>~/Library/Caches</code> and press <strong>Return</strong>.
        </li>
        <li>
          Open the folder of a large app, select everything inside and move it to the Trash. Keep the folder itself.
        </li>
        <li>Empty the Trash and restart your Mac.</li>
      </ol>
      <p>
        That clears your app caches, which is where most cache space goes. For browsers, a single app or a stubborn
        problem, use the methods below.
      </p>

      <h2>What is cache on a Mac?</h2>
      <p>
        A cache is a store of temporary files that an app keeps so it doesn&rsquo;t have to fetch or build them again.
        Safari saves images from sites you visit, Spotify saves songs you play, and Photos saves thumbnails. The next
        time you need them, they load from your disk instead of the internet.
      </p>
      <p>
        Caches are meant to be disposable. The trouble is that apps rarely clean up after themselves, so a cache can
        grow to several gigabytes or hold a damaged file that makes an app crash or show old content.
      </p>

      <h3>The types of cache on your Mac</h3>
      <div className="mt-6 overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Cache</th>
              <th scope="col">Where it lives</th>
              <th scope="col">What it holds</th>
              <th scope="col">Safe to clear?</th>
            </tr>
          </thead>
          <tbody>
            {cacheTypes.map(({ type, where, holds, safe }) => (
              <tr key={type}>
                <th scope="row">{type}</th>
                <td>
                  <code>{where}</code>
                </td>
                <td>{holds}</td>
                <td>{safe}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>When should you clear your cache?</h3>
      <ul>
        <li>
          <strong>Your disk is almost full.</strong> Caches count towards System Data in Storage settings, and clearing
          them can free several gigabytes.
        </li>
        <li>
          <strong>An app crashes or freezes on launch.</strong> A corrupt cache file is a common cause.
        </li>
        <li>
          <strong>A website looks broken or out of date.</strong> Your browser may be loading an old copy.
        </li>
        <li>
          <strong>You removed an app.</strong> Its cache folder often stays behind.
        </li>
      </ul>
      <p>
        If none of these apply, leave your caches alone. They make your Mac faster, not slower.
      </p>

      <h2>Which method should you use?</h2>
      <div className="mt-6 overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Method</th>
              <th scope="col">Best for</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            {methods.map(({ method, best, time }, i) => (
              <tr key={method}>
                <th scope="row">
                  {i + 1}. {method}
                </th>
                <td>{best}</td>
                <td>{time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>How to clear cache on Mac step by step</h2>

      <h3>1. Clear app caches in Finder</h3>
      <p>Your user caches sit in your Library folder, which macOS hides by default. Finder can still open it.</p>
      <h4>Open the Caches folder</h4>
      <ol>
        <li>Save your work and quit every app except Finder.</li>
        <li>
          In Finder, choose <strong>Go</strong>, then <strong>Go to Folder</strong>.
        </li>
        <li>
          Type <code>~/Library/Caches</code> and press <strong>Return</strong>.
        </li>
      </ol>
      <h4>Find the biggest cache folders</h4>
      <p>
        Choose <strong>View</strong>, then <strong>as List</strong>. Then choose <strong>View</strong>, then{" "}
        <strong>Show View Options</strong>, tick <strong>Calculate all sizes</strong> and click the{" "}
        <strong>Size</strong> column. Folders are named after their apps, such as <code>com.spotify.client</code> or{" "}
        <code>Google</code>.
      </p>
      <h4>Move the contents to the Trash</h4>
      <p>
        Open a large folder, press <strong>Command-A</strong> to select everything inside, and press{" "}
        <strong>Command-Delete</strong>. Keep the folder itself, because some apps expect it to exist. If macOS says an
        item is in use, skip it. The app that owns it is still running.
      </p>
      <h4>Empty the Trash and restart</h4>
      <p>
        Cached files keep using space until you empty the Trash. Open your apps first to check they work, then empty it
        and restart your Mac.
      </p>

      <h3>2. Clear your browser caches</h3>
      <p>
        Browsers keep their own caches and manage them from their settings. Clear only the cache if you want to stay
        signed in to websites.
      </p>
      <h4>Safari</h4>
      <p>
        Choose <strong>Safari</strong>, then <strong>Settings</strong>, then <strong>Advanced</strong>, and turn on{" "}
        <strong>Show features for web developers</strong>. Then choose <strong>Develop</strong>, then{" "}
        <strong>Empty Caches</strong>, or press <strong>Option-Command-E</strong>. Our full guide shows{" "}
        <Link href={SAFARI_CACHE_GUIDE_PATH}>how to clear Safari cache on a Mac</Link> for one site or every site.
      </p>
      <h4>Chrome</h4>
      <p>
        Press <strong>Shift-Command-Delete</strong>. Choose a time range, tick only{" "}
        <strong>Cached images and files</strong> and click <strong>Delete data</strong>.
      </p>
      <h4>Firefox and Edge</h4>
      <p>
        Press <strong>Shift-Command-Delete</strong> in either browser. In Firefox, tick{" "}
        <strong>Temporary cached files and pages</strong>. In Edge, tick <strong>Cached images and files</strong>.
      </p>
      <h5>Cache or cookies?</h5>
      <p>
        Cookies keep you signed in. Cache only stores copies of pages. To clear both, read{" "}
        <Link href={COOKIES_GUIDE_PATH}>how to clear cookies on a Mac</Link>.
      </p>

      <h3>3. Clear one app&rsquo;s cache from its own menu</h3>
      <p>Many apps can clear their own cache, which is safer than deleting files by hand:</p>
      <ul>
        <li>
          <strong>Spotify:</strong> open <strong>Settings</strong>, scroll to <strong>Storage</strong> and click{" "}
          <strong>Clear cache</strong>.
        </li>
        <li>
          <strong>Slack:</strong> choose <strong>Help</strong>, then <strong>Troubleshooting</strong>, then{" "}
          <strong>Clear Cache and Restart</strong>.
        </li>
        <li>
          <strong>Adobe apps:</strong> look for <strong>Media Cache</strong> or <strong>Purge Cache</strong> in the
          app&rsquo;s settings.
        </li>
      </ul>

      <h3>4. Restart in Safe Mode</h3>
      <p>
        Safe Mode checks your startup disk and deletes some system caches, including font caches. Use it when fonts
        look wrong or your Mac won&rsquo;t start normally.
      </p>
      <h4>On a Mac with Apple silicon</h4>
      <ol>
        <li>Shut down your Mac.</li>
        <li>
          Press and hold the power button until <strong>Loading startup options</strong> appears.
        </li>
        <li>
          Select your startup disk, hold <strong>Shift</strong> and click <strong>Continue in Safe Mode</strong>.
        </li>
      </ol>
      <h4>On an Intel Mac</h4>
      <p>
        Restart and hold <strong>Shift</strong> until the login window appears. Log in, then restart normally to leave
        Safe Mode.
      </p>

      <h3>5. Flush the DNS cache</h3>
      <p>
        Your Mac remembers website addresses so it can reach them faster. If a site moved or won&rsquo;t load, open
        Terminal and run <code>sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder</code>. Enter your password
        when asked. Nothing appears on screen, and no files are deleted.
      </p>

      <h3>6. Use a cleanup app</h3>
      <p>
        A cleanup app finds every cache folder at once and adds up the sizes, so you see where the space goes before
        you clear anything. Pick one that moves files to the Trash rather than deleting them outright.
      </p>

      <h2>Caches you should never delete</h2>
      <ul>
        <li>
          <strong>/System/Library/Caches.</strong> macOS protects these files and rebuilds them itself.
        </li>
        <li>
          <strong>/Library/Caches.</strong> Shared by macOS services and every user. Clearing it rarely frees much space.
        </li>
        <li>
          <strong>Folders of apps that are running.</strong> Quit the app first, or it may crash or rewrite the files.
        </li>
        <li>
          <strong>Anything outside a Caches folder.</strong> Application Support and Containers hold real app data, such
          as settings and libraries.
        </li>
      </ul>

      <h2>How to check how much space you freed</h2>
      <p>
        Before you start, open <strong>System Settings</strong>, then <strong>General</strong>, then{" "}
        <strong>Storage</strong>, and note your available space. Check again after you empty the Trash and restart.
        Storage settings can take a few minutes to update. If System Data is still large, read our guide on{" "}
        <Link href={SYSTEM_DATA_GUIDE_PATH}>how to reduce System Data on a Mac</Link>.
      </p>

      <h2>How to clear cache on Mac laptops</h2>
      <p>
        These steps work the same on every Mac laptop. A MacBook Air with 256 GB fills up faster, so see{" "}
        <Link href={AIR_CACHE_GUIDE_PATH}>how to clear cache on a MacBook Air</Link>. If you edit video or write code,
        our guide on <Link href={PRO_CACHE_GUIDE_PATH}>clearing cache on a MacBook Pro</Link> covers the large caches
        that pro apps build.
      </p>

      <h2>Clear every cache in one scan with {APP_NAME}</h2>
      <p>
        {APP_NAME} finds caches, build files and old installers across your whole Mac, groups them by app and adds up
        the total. You see exactly what each one holds before you clear it.
      </p>
      <p>
        Nothing is deleted outright. Every cleanup goes to the Trash, and Undo puts it back. Learn more about{" "}
        <Link href="/">{APP_NAME}, the disk cleanup app for Mac</Link>. It costs {PRICE} once, with no subscription.
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
