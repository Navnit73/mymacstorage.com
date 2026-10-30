import Link from "next/link";
import { ContentPage } from "@/components/content-page";
import { innerPageGraph, isoDateTime, pageMetadata } from "@/lib/seo";
import {
  AIR_CACHE_GUIDE_PATH,
  APP_NAME,
  CACHE_GUIDE_PATH,
  LARGE_FILES_GUIDE_PATH,
  OG_IMAGE,
  PRICE,
  PRO_CACHE_GUIDE_PATH,
  SITE_URL,
  pages,
} from "@/lib/site";

const path = PRO_CACHE_GUIDE_PATH;
const title = "How to clear cache on a MacBook Pro, including pro app caches";
const description =
  "Learn how to clear cache on a MacBook Pro, from app and browser caches to the big ones: Final Cut Pro, Premiere Pro, Lightroom, Xcode, Docker and npm. Safe, step by step.";
const updated = pages.find((p) => p.path === path)?.updated ?? "2026-10-30";

export const metadata = pageMetadata({
  title: "How to Clear Cache on MacBook Pro (Pro Apps and Xcode)",
  description,
  path,
  type: "article",
});

const proCaches = [
  { app: "Final Cut Pro", cache: "Render, optimised and proxy media", clear: "File → Delete Generated Library Files" },
  { app: "Premiere Pro", cache: "Media cache and peak files", clear: "Settings → Media Cache → Delete" },
  { app: "Lightroom Classic", cache: "Camera Raw cache", clear: "Settings → Performance → Purge Cache" },
  { app: "Xcode", cache: "DerivedData build files", clear: "Delete the DerivedData folder" },
  { app: "Docker Desktop", cache: "Images and build cache", clear: "docker system prune" },
  { app: "npm and Homebrew", cache: "Downloaded packages", clear: "npm cache clean, brew cleanup" },
];

const faqs = [
  {
    q: "How do I clear the cache on my MacBook Pro quickly?",
    a: "Quit your apps, open ~/Library/Caches with Go to Folder in Finder, and move the contents of the biggest folders to the Trash. Then empty the Trash and restart.",
  },
  {
    q: "Is it safe to delete Xcode DerivedData?",
    a: "Yes. DerivedData holds build products and indexes that Xcode recreates. Your first build afterwards takes longer, but no source code or settings are lost.",
  },
  {
    q: "Can I delete the whole ~/Library/Developer folder?",
    a: "No. Besides caches, it holds your simulators and their app data, plus Xcode Archives with the debug symbols for builds you shipped. Clear DerivedData and old device support, and keep the rest.",
  },
  {
    q: "Will deleting Final Cut Pro render files damage my projects?",
    a: "No. Render, optimised and proxy files are generated from your original media. Final Cut Pro can recreate them, as long as your original media files are still available.",
  },
  {
    q: "Why does my MacBook Pro have so much System Data?",
    a: "Pro apps, developer tools and Time Machine snapshots all add to it. Caches are often a large part, especially from Xcode, Docker and video editors.",
  },
  {
    q: "Does clearing cache improve MacBook Pro performance?",
    a: "Only if your disk is nearly full or a cache is corrupt. Pro apps work faster with their caches in place, so clear them between projects rather than during one.",
  },
  {
    q: "Are the steps different on M-series and Intel MacBook Pro models?",
    a: "Only for Safe Mode. On Apple silicon, you hold the power button at startup. On Intel, you hold Shift. Every other step is the same.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "Clear cache on a MacBook Pro", description }),
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
      intro="On a MacBook Pro, the biggest caches rarely come from browsers. Video editors, photo apps and developer tools can build caches of tens of gigabytes. Here is how to clear cache on a MacBook Pro, from the basics to pro apps."
      breadcrumb="Clear cache on a MacBook Pro"
      updated={updated}
      graph={graph}
    >
      <p>
        The steps apply to every MacBook Pro, with Apple silicon or Intel, on macOS Ventura and later.
      </p>

      <h2>The short answer</h2>
      <ol>
        <li>Quit every open app.</li>
        <li>
          In Finder, press <strong>Shift-Command-G</strong>, type <code>~/Library/Caches</code> and press{" "}
          <strong>Return</strong>.
        </li>
        <li>Move the contents of the largest folders to the Trash. Keep the folders.</li>
        <li>
          Clear pro app caches from inside each app, such as <strong>Delete Generated Library Files</strong> in Final
          Cut Pro.
        </li>
        <li>Empty the Trash and restart.</li>
      </ol>

      <h2>Where cache space goes on a MacBook Pro</h2>
      <p>
        Browsers and everyday apps keep caches of a few hundred megabytes each. Pro apps work differently. They create
        large files that speed up editing and building, and they keep them after you finish a project.
      </p>
      <div className="mt-6 overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">App</th>
              <th scope="col">What it caches</th>
              <th scope="col">How to clear it</th>
            </tr>
          </thead>
          <tbody>
            {proCaches.map(({ app, cache, clear }) => (
              <tr key={app}>
                <th scope="row">{app}</th>
                <td>{cache}</td>
                <td>{clear}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3>Measure before you clear</h3>
      <p>
        Open Terminal and run <code>du -sh ~/Library/Caches ~/Library/Developer 2&gt;/dev/null</code> to see how big
        each folder is. The command only reads sizes and deletes nothing.
      </p>

      <h2>How to clear cache on a MacBook Pro step by step</h2>

      <h3>1. Clear user caches in Finder</h3>
      <h4>Open the Caches folder</h4>
      <p>
        Quit your apps. In Finder, choose <strong>Go</strong>, then <strong>Go to Folder</strong>, type{" "}
        <code>~/Library/Caches</code> and press <strong>Return</strong>.
      </p>
      <h4>Find and clear the largest folders</h4>
      <p>
        In list view, choose <strong>View</strong>, then <strong>Show View Options</strong>, and tick{" "}
        <strong>Calculate all sizes</strong>. Sort by <strong>Size</strong>, open the biggest folder, select its
        contents and move them to the Trash. Keep the folder.
      </p>

      <h3>2. Clear video editing caches</h3>
      <h4>Final Cut Pro</h4>
      <ol>
        <li>Select your library in the sidebar.</li>
        <li>
          Choose <strong>File</strong>, then <strong>Delete Generated Library Files</strong>.
        </li>
        <li>
          Tick <strong>Delete Render Files</strong> and choose <strong>All</strong>. Tick optimised or proxy media only
          if you can recreate them.
        </li>
        <li>
          Click <strong>OK</strong>.
        </li>
      </ol>
      <h5>Check the library size</h5>
      <p>
        Select the library in Finder and press <strong>Command-I</strong> before and after, to see what you saved.
      </p>
      <h4>DaVinci Resolve</h4>
      <p>
        Open your project and choose <strong>Playback</strong>, then <strong>Delete Render Cache</strong>, then{" "}
        <strong>All</strong>. Resolve rebuilds what it needs the next time you play the timeline.
      </p>
      <h4>Adobe Premiere Pro</h4>
      <p>
        Choose <strong>Premiere Pro</strong>, then <strong>Settings</strong>, then <strong>Media Cache</strong>, and
        click <strong>Delete</strong> next to Remove Media Cache Files. Close every project first, so Premiere can
        remove all unused files.
      </p>

      <h3>3. Clear photo editing caches</h3>
      <h4>Lightroom Classic</h4>
      <p>
        Choose <strong>Lightroom Classic</strong>, then <strong>Settings</strong>, then{" "}
        <strong>Performance</strong>. Under Camera Raw Cache, click <strong>Purge Cache</strong>. You can also set a
        maximum size, so the cache never grows past it.
      </p>
      <h4>Photoshop</h4>
      <p>
        Photoshop&rsquo;s <strong>Edit</strong>, then <strong>Purge</strong> command frees memory, not disk space. To
        free disk space, quit Photoshop. It deletes its scratch files when it closes normally. After a crash, restart
        your Mac to clear the leftovers.
      </p>

      <h3>4. Clear developer caches</h3>
      <h4>Xcode DerivedData</h4>
      <p>
        Quit Xcode, then open <code>~/Library/Developer/Xcode/DerivedData</code> with Go to Folder and move its
        contents to the Trash. Inside Xcode, <strong>Product</strong>, then <strong>Clean Build Folder</strong> clears
        a single project.
      </p>
      <h5>Old simulators and device support</h5>
      <p>
        Run <code>xcrun simctl delete unavailable</code> to remove simulators for iOS versions you no longer have. In{" "}
        <code>~/Library/Developer/Xcode/iOS DeviceSupport</code>, delete folders for iOS versions your devices no
        longer run.
      </p>
      <h4>Package managers</h4>
      <p>These tools clear their own caches safely:</p>
      <ul>
        <li>
          <strong>Homebrew:</strong> <code>brew cleanup</code> removes old versions and downloads.
        </li>
        <li>
          <strong>npm:</strong> <code>npm cache clean --force</code> empties the package cache.
        </li>
        <li>
          <strong>pip:</strong> <code>pip cache purge</code> removes downloaded Python packages.
        </li>
      </ul>
      <h5>More package managers</h5>
      <p>
        Yarn uses <code>yarn cache clean</code>, and CocoaPods uses <code>pod cache clean --all</code>. Each one
        downloads packages again the next time a project needs them.
      </p>
      <h4>Docker</h4>
      <p>
        Run <code>docker system prune</code> to remove stopped containers, unused networks, dangling images and build
        cache. Read the list it shows before you type <strong>y</strong>, because removed containers don&rsquo;t come
        back.
      </p>

      <h3>5. Clear browser caches</h3>
      <p>
        In Safari, press <strong>Option-Command-E</strong> once the Develop menu is on. In Chrome, Firefox and Edge,
        press <strong>Shift-Command-Delete</strong> and tick only the cache option.
      </p>

      <h3>6. Restart in Safe Mode</h3>
      <p>
        Safe Mode deletes some system caches, including font caches. On Apple silicon, shut down, hold the power button
        until startup options appear, select your disk, hold <strong>Shift</strong> and click{" "}
        <strong>Continue in Safe Mode</strong>. On Intel, hold <strong>Shift</strong> as your Mac restarts.
      </p>

      <h2>How to clear cache on a MacBook Pro safely</h2>
      <ul>
        <li>
          <strong>Back up first.</strong> Run a Time Machine backup before a big cleanup.
        </li>
        <li>
          <strong>Finish or close your projects.</strong> Pro apps rely on their caches while a project is open.
        </li>
        <li>
          <strong>Use each app&rsquo;s own command first.</strong> It knows which files it can rebuild.
        </li>
        <li>
          <strong>Move files to the Trash rather than using rm.</strong> You can restore a mistake from the Trash.
        </li>
        <li>
          <strong>Test, then empty the Trash.</strong> Open your apps and a recent project before you empty it.
        </li>
      </ul>

      <h2>What not to delete on a MacBook Pro</h2>
      <ul>
        <li>
          <strong>Original media.</strong> Clear render and proxy files, never the footage they come from.
        </li>
        <li>
          <strong>Lightroom catalogues.</strong> The <code>.lrcat</code> file holds every edit you made.
        </li>
        <li>
          <strong>Docker volumes</strong> you still need. <code>docker system prune</code> leaves volumes alone unless
          you add <code>--volumes</code>.
        </li>
        <li>
          <strong>/System/Library/Caches.</strong> macOS protects it and manages it itself.
        </li>
      </ul>

      <h2>Move pro caches to an external drive</h2>
      <p>
        If you edit large projects on a 512 GB or 1 TB MacBook Pro, clearing caches only buys time. Pointing them at a
        fast external SSD keeps your internal disk free for good.
      </p>
      <h3>Final Cut Pro</h3>
      <p>
        Select the library, choose <strong>File</strong>, then <strong>Library Properties</strong>, and click{" "}
        <strong>Modify Settings</strong> next to Storage Locations. Set <strong>Cache</strong> to a folder on your
        external drive.
      </p>
      <h3>Premiere Pro and Lightroom Classic</h3>
      <p>
        In Premiere Pro&rsquo;s <strong>Media Cache</strong> settings, click <strong>Browse</strong> to choose a new
        location. In Lightroom Classic&rsquo;s <strong>Performance</strong> settings, click <strong>Choose</strong>{" "}
        next to the Camera Raw cache location.
      </p>
      <h4>Keep the drive connected</h4>
      <p>
        Apps rebuild a cache that goes missing, so nothing breaks if you edit without the drive. You just lose the
        speed boost until you plug it back in.
      </p>

      <h2>When to clear pro app caches</h2>
      <p>
        Clear them between projects, not during one. A render cache saves hours while you edit, and DerivedData saves
        minutes on every build. Once you deliver a project, its caches are dead weight.
      </p>
      <p>
        For caches every Mac shares, read <Link href={CACHE_GUIDE_PATH}>how to clear cache on a Mac</Link>. Short on
        space after a big project? Our guide on <Link href={LARGE_FILES_GUIDE_PATH}>finding large files on a Mac</Link>{" "}
        tracks down exports and archives. For a smaller laptop, see{" "}
        <Link href={AIR_CACHE_GUIDE_PATH}>how to clear cache on a MacBook Air</Link>.
      </p>

      <h2>Find every cache and build file with {APP_NAME}</h2>
      <p>
        {APP_NAME} finds caches, build files and old installers across your MacBook Pro, including developer folders,
        and adds up what each one takes. Everything goes to the Trash, and Undo puts it back.
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
