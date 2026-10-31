import { Price } from "@/components/price";
import Link from "next/link";
import { ContentPage } from "@/components/content-page";
import { innerPageGraph, isoDateTime, pageMetadata } from "@/lib/seo";
import { APP_NAME, GUIDE_PATH, LARGE_FILES_GUIDE_PATH, OG_IMAGE, SITE_URL, pages } from "@/lib/site";

const path = LARGE_FILES_GUIDE_PATH;
const title = "How to find large files on a Mac: 6 free ways";
const description =
  "Learn how to find large files on a Mac with 6 free methods: Storage settings, Finder, Smart Folders, folder sizes, Terminal and disk maps. Works on any MacBook.";
const updated = pages.find((p) => p.path === path)?.updated ?? "2026-10-30";

export const metadata = pageMetadata({
  title: "How to Find Large Files on Mac (6 Free Ways)",
  description,
  path,
  type: "article",
});

const methods = [
  { method: "Storage settings", best: "A quick list with no setup", folders: "No", hidden: "No", skill: "Beginner" },
  { method: "Finder search", best: "Files over a size you choose", folders: "No", hidden: "Optional", skill: "Beginner" },
  { method: "Smart Folder", best: "Checking again every month", folders: "No", hidden: "Optional", skill: "Beginner" },
  { method: "Finder folder sizes", best: "Spotting heavy folders", folders: "Yes", hidden: "Optional", skill: "Beginner" },
  { method: "Terminal", best: "Fast, exact, whole-disk results", folders: "Yes", hidden: "Yes", skill: "Advanced" },
  { method: "Disk usage map", best: "Seeing everything at a glance", folders: "Yes", hidden: "Yes", skill: "Beginner" },
];

const sizes = [
  { size: "Over 100 MB", examples: "App installers, long screen recordings, large PDFs", action: "Review a few at a time" },
  { size: "Over 1 GB", examples: "4K videos, disk images, game files, project archives", action: "Check these first" },
  { size: "Over 10 GB", examples: "Virtual machines, video projects, old backups", action: "Delete or move to a drive" },
];

const hotspots = [
  { place: "Downloads", finds: "Installers, archives and videos", safe: "Usually" },
  { place: "Movies", finds: "Screen recordings and video exports", safe: "After you check" },
  { place: "Desktop and Documents", finds: "Old projects and duplicate copies", safe: "After you check" },
  { place: "~/Library/Containers", finds: "Data from apps you use or removed", safe: "Only for removed apps" },
  { place: "Virtual machines", finds: "Parallels or UTM disks of 20 GB or more", safe: "If you no longer use them" },
  { place: "Photos Library", finds: "Every photo and video in Photos", safe: "No, manage it inside Photos" },
];

const faqs = [
  {
    q: "How do I find the largest files on my Mac quickly?",
    a: "Open System Settings, then General, then Storage. Click the info button next to Documents and open the Large Files tab. macOS lists your biggest files with the largest at the top.",
  },
  {
    q: "Why doesn't Finder show folder sizes?",
    a: "Finder skips folder sizes by default because calculating them takes time. In list view, choose View, then Show View Options, and tick Calculate all sizes.",
  },
  {
    q: "How do I find large files on a MacBook Air?",
    a: "Every method in this guide works on a MacBook Air, because it runs the same macOS as other Macs. On a model with 256 GB of storage, start with the Downloads and Movies folders, where large files pile up fastest.",
  },
  {
    q: "Is it safe to delete large files that Finder finds?",
    a: "Your own videos, disk images and downloads are safe to delete once you no longer need them. Leave anything inside the System folder, the Library folder or app packages unless you know exactly what it is.",
  },
  {
    q: "Why is my Mac still full after I delete large files?",
    a: "Large files explain only part of your storage. Caches, Time Machine snapshots and app data often fill the rest, and macOS files them under System Data. Empty the Trash and restart, then check Storage settings again.",
  },
  {
    q: "Can I find large files without installing an app?",
    a: "Yes. Storage settings, Finder search, Smart Folders, Finder folder sizes and Terminal are all built into macOS and cost nothing.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "Find large files on a Mac", description }),
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
      intro="A few forgotten videos or disk images can fill your disk faster than thousands of documents. Here is how to find large files on a Mac with tools you already have."
      breadcrumb="Find large files on a Mac"
      updated={updated}
      graph={graph}
    >
      <p>
        Every method below is free and works on any MacBook Air, MacBook Pro, iMac, Mac mini or Mac Studio. The menus
        match macOS Ventura and later.
      </p>

      <h2>The short answer</h2>
      <ol>
        <li>
          Open <strong>System Settings</strong>, then <strong>General</strong>, then <strong>Storage</strong>.
        </li>
        <li>
          Click the info button next to <strong>Documents</strong>.
        </li>
        <li>
          Open the <strong>Large Files</strong> tab to see your biggest files, largest first.
        </li>
      </ol>
      <p>For folder sizes, hidden files or a search by exact size, use the methods below.</p>

      <h2>Which method should you use?</h2>
      <div className="mt-6 overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Method</th>
              <th scope="col">Best for</th>
              <th scope="col">Shows folders</th>
              <th scope="col">Shows hidden files</th>
              <th scope="col">Skill level</th>
            </tr>
          </thead>
          <tbody>
            {methods.map(({ method, best, folders, hidden, skill }, i) => (
              <tr key={method}>
                <th scope="row">
                  {i + 1}. {method}
                </th>
                <td>{best}</td>
                <td>{folders}</td>
                <td>{hidden}</td>
                <td>{skill}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>What counts as a large file?</h2>
      <p>There is no official cut-off, but these limits help you decide where to start:</p>
      <div className="mt-6 overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Size</th>
              <th scope="col">Typical files</th>
              <th scope="col">What to do</th>
            </tr>
          </thead>
          <tbody>
            {sizes.map(({ size, examples, action }) => (
              <tr key={size}>
                <th scope="row">{size}</th>
                <td>{examples}</td>
                <td>{action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Find big files with built-in tools</h2>

      <h3>1. Use the Large Files list in Storage settings</h3>
      <p>
        Choose <strong>Apple menu</strong>, then <strong>System Settings</strong>, then <strong>General</strong>, then{" "}
        <strong>Storage</strong>. Click the info button next to <strong>Documents</strong>, then open{" "}
        <strong>Large Files</strong>. Select a file and click <strong>Delete</strong>, or hold the pointer over it and
        click the magnifying glass to show it in Finder.
      </p>
      <p>
        This list only covers your documents. It skips apps, hidden files and folders, so use it as a first pass.
      </p>
      <h4>On macOS Monterey or earlier</h4>
      <p>
        Choose <strong>Apple menu</strong>, then <strong>About This Mac</strong>, then <strong>Storage</strong>, and
        click <strong>Manage</strong>. Select <strong>Documents</strong> in the sidebar, then click{" "}
        <strong>Large Files</strong>.
      </p>

      <h3>2. Search files by size in Finder</h3>
      <ol>
        <li>
          Open Finder and press <strong>Command-F</strong>. Make sure <strong>This Mac</strong> is selected.
        </li>
        <li>
          Click the <strong>Kind</strong> menu, choose <strong>Other</strong>, then select <strong>File Size</strong>{" "}
          and click <strong>OK</strong>.
        </li>
        <li>
          Set the rule to <strong>is greater than</strong>, type <strong>1</strong> and choose <strong>GB</strong>.
        </li>
      </ol>
      <p>
        Finder lists every match. Turn on list view and click the <strong>Size</strong> column to sort the biggest
        files to the top. Lower the limit to 500 MB if the list comes back short.
      </p>

      <h3>3. Save the search as a Smart Folder</h3>
      <p>
        Choose <strong>File</strong>, then <strong>New Smart Folder</strong>, and add the same File Size rule. Click{" "}
        <strong>Save</strong>, give it a name such as &ldquo;Over 1 GB&rdquo; and tick <strong>Add To Sidebar</strong>
        . The folder updates itself, so one click shows your large files whenever you want to check again.
      </p>

      <h2>How to find large folders on a Mac</h2>
      <p>
        Large files often hide as thousands of small ones inside a single folder, such as an old project or an app
        cache. Finder searches miss these, so check folder sizes too.
      </p>

      <h3>4. Show folder sizes in Finder</h3>
      <ol>
        <li>
          Open your home folder in Finder and choose <strong>View</strong>, then <strong>as List</strong>.
        </li>
        <li>
          Choose <strong>View</strong>, then <strong>Show View Options</strong>, and tick{" "}
          <strong>Calculate all sizes</strong>. Click <strong>Use as Defaults</strong> to apply it to every folder.
        </li>
        <li>
          Click the <strong>Size</strong> column, then open the largest folder and repeat until you find the cause.
        </li>
      </ol>
      <h4>Check one folder&rsquo;s size</h4>
      <p>
        Select a folder and press <strong>Command-I</strong>. The Get Info window shows its total size and the number
        of items inside.
      </p>

      <h2>Find large files on a Mac with Terminal</h2>
      <p>
        Terminal searches your whole disk in seconds and catches hidden files that Finder skips. These commands only
        list files. They never delete anything.
      </p>

      <h3>5. Run find, du and mdfind</h3>
      <h4>List files over 1 GB</h4>
      <p>
        Run <code>find ~ -type f -size +1G 2&gt;/dev/null</code> to search your home folder. Change{" "}
        <code>+1G</code> to <code>+500M</code> for a wider net, or replace <code>~</code> with <code>/</code> to search
        the whole disk.
      </p>
      <h4>Show the 20 biggest files with their sizes</h4>
      <p>
        Run <code>find ~ -type f -size +100M -exec du -h {"{}"} + 2&gt;/dev/null | sort -hr | head -20</code>.
      </p>
      <h4>Rank folders by size</h4>
      <p>
        Run <code>du -hd 1 ~ 2&gt;/dev/null | sort -hr | head -15</code>. Then run it again on the largest folder to dig
        deeper.
      </p>
      <h4>Search with Spotlight</h4>
      <p>
        Run <code>mdfind &quot;kMDItemFSSize &gt; 1000000000&quot;</code> to list every indexed file over 1 GB almost
        instantly.
      </p>
      <p>
        If you see &ldquo;Operation not permitted&rdquo;, open <strong>System Settings</strong>, then{" "}
        <strong>Privacy &amp; Security</strong>, then <strong>Full Disk Access</strong>, and turn it on for Terminal.
      </p>

      <h2>Visualize disk usage</h2>

      <h3>6. Use a disk map</h3>
      <p>
        A disk map draws every file as a block sized by the space it takes, so the biggest ones stand out at once. Free
        options include GrandPerspective, which draws your disk as a grid of coloured blocks, and OmniDiskSweeper, which
        lists folders from largest to smallest. Both only show your files, so you still delete them yourself in Finder.
      </p>

      <h2>Narrow your search</h2>

      <h3>Find old files you haven&rsquo;t opened in a year</h3>
      <p>
        In a Finder search, click <strong>+</strong> to add a second rule. Choose <strong>Last opened date</strong>,
        set it to <strong>is before</strong> and pick a date one year ago. Combined with a size rule, it shows big files
        you have forgotten about.
      </p>
      <p>
        You can also sort any folder by age. In list view, choose <strong>View</strong>, then{" "}
        <strong>Show View Options</strong>, tick <strong>Date Last Opened</strong> and click that column.
      </p>

      <h3>Find large videos and photos</h3>
      <p>
        Set the <strong>Kind</strong> rule to <strong>Movie</strong> or <strong>Image</strong> and add a size rule.
        Screen recordings and 4K exports are usually the biggest culprits.
      </p>
      <p>
        Videos inside your Photos library won&rsquo;t appear in Finder. Open Photos and choose{" "}
        <strong>Videos</strong> under Media Types in the sidebar to review them there.
      </p>

      <h3>Include hidden and system files</h3>
      <p>
        Finder searches skip hidden files by default. Add a rule, choose <strong>Other</strong>, then{" "}
        <strong>System files</strong>, and set it to <strong>are included</strong>. To see hidden files in any Finder
        window, press <strong>Shift-Command-Period</strong>. Press it again to hide them.
      </p>

      <h2>Where large files usually hide</h2>
      <div className="mt-6 overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Location</th>
              <th scope="col">What you&rsquo;ll find</th>
              <th scope="col">Safe to delete?</th>
            </tr>
          </thead>
          <tbody>
            {hotspots.map(({ place, finds, safe }) => (
              <tr key={place}>
                <th scope="row">{place}</th>
                <td>{finds}</td>
                <td>{safe}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>How to delete large files safely</h2>
      <ul>
        <li>
          <strong>Back up first.</strong> Run a Time Machine backup before a big cleanup.
        </li>
        <li>
          <strong>Use the Trash, not Terminal.</strong> Drag files to the Trash so you can restore a mistake. Commands
          such as <code>rm</code> delete files for good.
        </li>
        <li>
          <strong>Leave the Photos Library alone.</strong> Finder shows it as one huge file. Delete photos inside the
          Photos app instead, or you lose your whole library.
        </li>
        <li>
          <strong>Empty the Trash.</strong> Deleted files keep using space until you do.
        </li>
      </ul>
      <p>
        Finding big files is only one way to make room. Our guide on{" "}
        <Link href={GUIDE_PATH}>how to free up space on a Mac</Link> covers caches, app leftovers and backups too.
      </p>

      <h2>See every large file in one scan with {APP_NAME}</h2>
      <p>
        {APP_NAME} skips the searching. One scan covers every folder on your Mac, hidden ones included, and lists your
        biggest files and folders first. Old video exports, virtual machines and backup archives rise straight to the
        top.
      </p>
      <p>
        Nothing is deleted outright. Every cleanup goes to the Trash, and Undo puts it back. Learn more about{" "}
        <Link href="/">{APP_NAME}, the disk cleanup app for Mac</Link>. It costs <Price /> once, with no subscription.
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
