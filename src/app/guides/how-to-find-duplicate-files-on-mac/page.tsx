import Link from "next/link";
import { ContentPage } from "@/components/content-page";
import { innerPageGraph, isoDateTime, pageMetadata } from "@/lib/seo";
import { APP_NAME, DUPLICATES_GUIDE_PATH, GUIDE_PATH, OG_IMAGE, PRICE, SITE_URL, pages } from "@/lib/site";

const path = DUPLICATES_GUIDE_PATH;
const title = "How to find duplicate files on a Mac: 5 free ways";
const description =
  "Learn how to find duplicate files on a Mac for free with Photos, Music, Finder and Terminal, then delete the extra copies safely on any MacBook or iMac.";
const updated = pages.find((p) => p.path === path)?.updated ?? "2026-10-30";

export const metadata = pageMetadata({
  title: "How to Find Duplicate Files on Mac (5 Free Ways)",
  description,
  path,
  type: "article",
});

// Lists every group of byte-identical files over 1 MB in the current folder. Tested on macOS with spaces in names.
const DUPLICATES_COMMAND =
  "find . -type f -size +1M -exec shasum {} + | sort | awk '$1==h{if(!s)print l; print; s=1; next}{h=$1; l=$0; s=0}'";

const methods = [
  { method: "Photos Duplicates album", finds: "Photos and videos", exact: "Yes, plus near-copies", skill: "Beginner" },
  { method: "Music duplicate view", finds: "Songs", exact: "By title and artist", skill: "Beginner" },
  { method: "Finder size sort", finds: "Any file type", exact: "No, you compare by eye", skill: "Beginner" },
  { method: "Terminal", finds: "Any file type", exact: "Yes, byte for byte", skill: "Advanced" },
  { method: "Duplicate finder app", finds: "Any file type", exact: "Yes, in most apps", skill: "Beginner" },
];

const kinds = [
  {
    kind: "Exact copy",
    example: "report.pdf and report copy.pdf with identical contents",
    action: "Keep one, delete the rest",
  },
  {
    kind: "Same name, different content",
    example: "Two versions of budget.xlsx saved weeks apart",
    action: "Open both before you decide",
  },
  {
    kind: "Similar photo",
    example: "Five burst shots or an edited and an original version",
    action: "Keep the best, but check edits first",
  },
];

const faqs = [
  {
    q: "Is it safe to delete duplicate files on a Mac?",
    a: "Yes, as long as the copies match byte for byte and you keep one. Move extras to the Trash rather than deleting them in Terminal, so you can put back anything you removed by mistake.",
  },
  {
    q: "Can Finder find duplicate files on its own?",
    a: "No. Finder has no duplicate search. You can sort files by size or search for names that contain copy, but you still need to compare the files yourself.",
  },
  {
    q: "What is the best free way to find duplicates on a Mac?",
    a: "Use the Photos Duplicates album for photos and videos, and the Terminal command in this guide for every other file type. Both are free, built in and match exact copies.",
  },
  {
    q: "Does merging duplicates in Photos lose anything?",
    a: "No. Photos keeps the highest-quality version and combines relevant details, such as captions, keywords and albums, into it. The extra copies go to Recently Deleted for 30 days.",
  },
  {
    q: "Why do I have so many duplicate files?",
    a: "Downloading the same file twice, importing photos more than once, copying folders between drives and syncing with more than one cloud service all create copies. Over a few years, they can add up to many gigabytes.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "Find duplicate files on a Mac", description }),
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
      intro="Extra copies of photos, downloads and documents waste gigabytes without you noticing. Here is how to find duplicate files on a Mac for free, and how to remove them without losing the one you need."
      breadcrumb="Find duplicate files on a Mac"
      updated={updated}
      graph={graph}
    >
      <p>
        Every method below works on any MacBook Air, MacBook Pro, iMac, Mac mini or Mac Studio. The menus match macOS
        Ventura and later.
      </p>

      <h2>The short answer</h2>
      <ol>
        <li>
          For photos and videos, open Photos and choose <strong>Duplicates</strong> in the sidebar.
        </li>
        <li>
          For songs, open Music and choose <strong>File</strong>, then <strong>Library</strong>, then{" "}
          <strong>Show Duplicate Items</strong>.
        </li>
        <li>For every other file, run the Terminal command below. It matches copies byte for byte.</li>
      </ol>

      <h2>Which method should you use?</h2>
      <div className="mt-6 overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Method</th>
              <th scope="col">Finds</th>
              <th scope="col">Exact match?</th>
              <th scope="col">Skill level</th>
            </tr>
          </thead>
          <tbody>
            {methods.map(({ method, finds, exact, skill }, i) => (
              <tr key={method}>
                <th scope="row">
                  {i + 1}. {method}
                </th>
                <td>{finds}</td>
                <td>{exact}</td>
                <td>{skill}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>What counts as a duplicate?</h2>
      <p>
        A true duplicate has exactly the same contents as another file, whatever its name. Two files with the same
        name aren&rsquo;t always copies, and two copies rarely share a name. Know which kind you have before you delete
        anything:
      </p>
      <div className="mt-6 overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Type</th>
              <th scope="col">Example</th>
              <th scope="col">What to do</th>
            </tr>
          </thead>
          <tbody>
            {kinds.map(({ kind, example, action }) => (
              <tr key={kind}>
                <th scope="row">{kind}</th>
                <td>{example}</td>
                <td>{action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Find duplicate photos on a Mac with the Photos app</h2>

      <h3>1. Use the Duplicates album</h3>
      <ol>
        <li>
          Open Photos and click <strong>Duplicates</strong> under Utilities in the sidebar.
        </li>
        <li>Review each set. Photos shows the copies side by side with their size and date.</li>
        <li>
          Click <strong>Merge</strong> next to a set, or select several sets and click the <strong>Merge</strong>{" "}
          button at the top of the window.
        </li>
      </ol>
      <p>
        Merging keeps the highest-quality version and moves the rest to <strong>Recently Deleted</strong>, where they
        stay for 30 days. Empty that album to get the space back right away.
      </p>
      <h4>Clean up burst photos</h4>
      <p>
        The Duplicates album skips burst shots, because each frame is slightly different. Open a burst, click{" "}
        <strong>Make a Selection</strong>, tick the frames you like and click <strong>Done</strong>. Photos offers to
        keep only your picks.
      </p>
      <h4>If you don&rsquo;t see the Duplicates album</h4>
      <p>
        Photos only shows the album when it has found copies, and it scans in the background. After a large import,
        leave your Mac on and Photos open for a few hours, then check again.
      </p>

      <h2>Find duplicate songs in the Music app</h2>

      <h3>2. Show duplicate items</h3>
      <p>
        Open Music and choose <strong>File</strong>, then <strong>Library</strong>, then{" "}
        <strong>Show Duplicate Items</strong>. Music lists songs with the same title and artist. Hold the{" "}
        <strong>Option</strong> key before you open the menu to choose <strong>Show Exact Duplicate Items</strong>{" "}
        instead, which also matches the album and version.
      </p>
      <p>
        Delete the extras with the <strong>Delete</strong> key, then click <strong>Done</strong> to return to your full
        library. Live and remastered versions often share a title, so check the album before you delete.
      </p>

      <h2>Find duplicates with Finder</h2>

      <h3>3. Sort files by size</h3>
      <p>
        Finder has no duplicate search, but copies always share a size, so sorting puts them next to each other.
      </p>
      <ol>
        <li>
          Open the folder you want to check, such as Documents, and press <strong>Command-F</strong>.
        </li>
        <li>
          Click the folder&rsquo;s name next to <strong>Search</strong> so Finder searches only that folder.
        </li>
        <li>
          Click the <strong>Kind</strong> menu, choose <strong>Other</strong>, then <strong>File Size</strong>, and set
          it to <strong>is greater than 1 MB</strong>.
        </li>
        <li>
          Switch to list view and click the <strong>Size</strong> column.
        </li>
      </ol>
      <p>
        Files with the same size and a similar name are probably copies. Press the <strong>Space bar</strong> to preview
        each one and confirm before you delete it.
      </p>
      <h4>Search for copy names</h4>
      <p>
        Type <strong>copy</strong> in the Finder search field to find files that Finder duplicated, such as &ldquo;Invoice
        copy.pdf&rdquo;. Then search for <strong>(1)</strong> to catch files that your browser downloaded twice.
      </p>
      <h4>Check the Mail Downloads folder</h4>
      <p>
        Mail saves a copy of every attachment you open, even if you already saved it elsewhere. Choose{" "}
        <strong>Go</strong>, then <strong>Go to Folder</strong>, and enter{" "}
        <code>~/Library/Containers/com.apple.mail/Data/Library/Mail Downloads</code>. Files here are safe to delete
        once you have saved the ones you need.
      </p>
      <h4>Save it as a Smart Folder</h4>
      <p>
        Click <strong>Save</strong> under the search field, name the search and tick <strong>Add To Sidebar</strong>.
        The folder updates itself, so you can check for new copies in one click.
      </p>

      <h2>Find duplicate files on a Mac with Terminal</h2>

      <h3>4. Compare file fingerprints</h3>
      <p>
        This is the most reliable free method. Terminal calculates a unique fingerprint, called a checksum, for every
        file. Two files with the same checksum are identical, even if their names differ.
      </p>
      <ol>
        <li>
          Open Terminal, type <code>cd</code> followed by a space, drag a folder into the window and press{" "}
          <strong>Return</strong>.
        </li>
        <li>
          Run this command:
          <code className="mt-2 block w-fit break-all">{DUPLICATES_COMMAND}</code>
        </li>
      </ol>
      <p>
        Terminal prints each group of identical files together, with the checksum at the start of each line. It only
        lists files and never deletes anything. The <code>-size +1M</code> part skips files under 1 MB, which saves
        time and rarely matters.
      </p>
      <h4>Read the results</h4>
      <p>
        Each group shares the long code at the start of the line, so every file in a group is a copy of the others. To
        see one in Finder, type <code>open -R</code> followed by a space, paste the file&rsquo;s path in quotes and
        press <strong>Return</strong>.
      </p>
      <h4>Scan an external hard drive</h4>
      <p>
        Drag the drive from the Finder sidebar into Terminal after <code>cd</code>, then run the same command. A large
        drive can take several minutes, because Terminal reads every file.
      </p>
      <h4>Fix &ldquo;Operation not permitted&rdquo;</h4>
      <p>
        Open <strong>System Settings</strong>, then <strong>Privacy &amp; Security</strong>, then{" "}
        <strong>Full Disk Access</strong>, and turn it on for Terminal.
      </p>

      <h2>Use a duplicate finder app</h2>

      <h3>5. Choose an app that compares contents</h3>
      <p>An app saves time when you have years of files across many folders. Before you pick one, check that it:</p>
      <ul>
        <li>Compares file contents, not just names or sizes.</li>
        <li>Lets you choose which copy to keep in each group.</li>
        <li>Moves files to the Trash instead of deleting them outright.</li>
        <li>Works on your Mac without uploading your files.</li>
      </ul>
      <p>dupeGuru is a free, open-source option that meets most of these.</p>

      <h2>How to delete duplicate files safely</h2>
      <p>
        Finding copies is the easy part. To remove duplicate files without losing the one you need, follow these rules:
      </p>
      <ul>
        <li>
          <strong>Keep the copy in the right place.</strong> Delete the one in Downloads or Desktop, and keep the one in
          the folder where it belongs.
        </li>
        <li>
          <strong>Use the app for app libraries.</strong> Remove photos inside Photos and songs inside Music. Never
          delete files from inside the Photos Library or Music folder in Finder.
        </li>
        <li>
          <strong>Check iCloud Drive first.</strong> If Optimize Mac Storage is on, some files exist only in iCloud, and
          Terminal can&rsquo;t read them until you download them.
        </li>
        <li>
          <strong>Use the Trash and back up.</strong> Run a Time Machine backup, move copies to the Trash and empty it
          only when you&rsquo;re sure.
        </li>
      </ul>

      <h2>How to stop duplicates from coming back</h2>
      <ul>
        <li>
          When Photos warns that an import contains duplicates, choose <strong>Don&rsquo;t Import</strong>.
        </li>
        <li>Make an alias instead of a copy when you need a file in two places.</li>
        <li>Sync each folder with one cloud service, not two.</li>
        <li>Clear your Downloads folder once a month.</li>
      </ul>
      <p>
        Duplicates are only one cause of a full disk. Our guide on{" "}
        <Link href={GUIDE_PATH}>how to free up space on a Mac</Link> covers caches, apps and backups too.
      </p>

      <h2>Find every duplicate in one scan with {APP_NAME}</h2>
      <p>
        {APP_NAME} matches duplicates byte for byte, not just by name, across every folder on your Mac. You keep one
        copy of each file, and the rest move to the Trash.
      </p>
      <p>
        Scanning and matching happen entirely on your Mac, and Undo puts back anything you remove. Learn more about{" "}
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
