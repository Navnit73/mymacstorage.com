import Link from "next/link";
import { AppCallout, GuideLayout, GuideTable } from "@/components/guide-layout";
import { Price } from "@/components/price";
import { articleGraph, innerPageGraph, pageMetadata } from "@/lib/seo";
import {
  APP_NAME,
  DOWNLOADS_GUIDE_PATH,
  EMPTY_TRASH_GUIDE_PATH,
  GUIDE_PATH,
  INSTALLERS_GUIDE_PATH,
  MACOS_STORAGE_GUIDE_PATH,
  REFUND_DAYS,
  SNAPSHOTS_GUIDE_PATH,
  UPDATE_SPACE_GUIDE_PATH,
} from "@/lib/site";

const market = "us" as const;
const path = INSTALLERS_GUIDE_PATH;
const published = "2026-11-24";
const title = "How to delete old macOS installers and get gigabytes back";
const description =
  "Find and delete old macOS installers on your Mac: Install macOS apps, leftover install folders and .dmg or .pkg files. See which are safe to remove and when.";

export const metadata = pageMetadata({
  title: "How to Delete Old macOS Installers",
  description,
  path,
  type: "article",
});

const places = [
  ["Install macOS <name>.app", "/Applications", "A full installer, often well over 10 GB"],
  ["macOS Install Data", "Root of Macintosh HD", "Leftover from an interrupted install"],
  ["InstallAssistant.pkg or .dmg files", "Downloads or Desktop", "Installer packages you downloaded"],
  ["Third-party app installers (.dmg, .pkg)", "Downloads", "Disk images for apps already installed"],
  ["Bootable installer on a USB drive", "External drive", "Doesn't use your Mac's disk"],
];

const faqs = [
  {
    q: "Is it safe to delete the Install macOS app?",
    a: "Yes, once you have finished upgrading. The installer isn't needed to run macOS, and you can download it again from the App Store or Software Update. Usually the installer deletes itself after a successful upgrade, so one that lingers is safe to remove.",
  },
  {
    q: "How big is a macOS installer?",
    a: "Full installers for recent macOS versions are typically well over 10 GB, and the exact size varies by version. Check the size in Finder with Get Info before you delete it, so you know how much you will get back.",
  },
  {
    q: "What is the macOS Install Data folder?",
    a: "It is a temporary folder macOS uses during an installation. If an install fails or is interrupted, it can be left behind at the top level of your startup disk. If no install is in progress, it is safe to delete.",
  },
  {
    q: "Should I keep a macOS installer as a backup?",
    a: "Only if you need to reinstall without internet or set up several Macs. Even then, a bootable USB installer is a better place for it than your internal disk. Most people can rely on macOS Recovery instead.",
  },
  {
    q: "Can I delete .dmg files after installing an app?",
    a: "Yes. A .dmg is just the package an app came in. Once the app is in your Applications folder, eject the disk image and delete the .dmg file.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "Delete old macOS installers", description }),
  ...articleGraph({ path, headline: title, description, published, updated: published, language: "en", faqs }),
];

export default function InstallersGuide() {
  return (
    <GuideLayout
      market={market}
      title={title}
      intro="A full macOS installer is one of the biggest single files a Mac can hold, and old ones often stay behind after an upgrade. Here is where they hide, which are safe to delete and how to keep one on a USB drive instead."
      breadcrumb="Delete old macOS installers"
      updated={published}
      readMinutes={6}
      takeaways={[
        "Look in Applications for any app named Install macOS followed by a version name.",
        "A leftover macOS Install Data folder means an install was interrupted.",
        "Old .dmg and .pkg files in Downloads add up fast.",
        "Need an installer later? Keep it on a USB drive, not your internal disk.",
      ]}
      toc={[
        { id: "where", label: "Where they hide" },
        { id: "applications", label: "Install macOS apps" },
        { id: "install-data", label: "Install Data folder" },
        { id: "packages", label: ".dmg and .pkg files" },
        { id: "usb", label: "Keep one on USB" },
        { id: "faq", label: "FAQ" },
      ]}
      related={[
        { href: UPDATE_SPACE_GUIDE_PATH, label: "Not enough space to update your Mac" },
        { href: MACOS_STORAGE_GUIDE_PATH, label: "macOS taking up too much storage" },
        { href: DOWNLOADS_GUIDE_PATH, label: "How to clear Downloads on a Mac" },
        { href: GUIDE_PATH, label: "How to free up space on a Mac" },
      ]}
      graph={graph}
      faqs={faqs}
      closing={
        <>
          Find old installers and everything else you don&rsquo;t need. <Price /> once, with a {REFUND_DAYS}-day
          refund.
        </>
      }
    >
      <h2 id="where">Where old installers hide on a Mac</h2>
      <GuideTable head={["What to look for", "Where", "Notes"]} rows={places} />
      <p>
        A quick way to find them all: open Finder, press <strong>Command-F</strong>, set the search to{" "}
        <strong>This Mac</strong>, and search for <code>Install macOS</code>. Then search again for files with the
        kind <strong>Disk Image</strong> and the kind <strong>Installer package</strong>.
      </p>

      <h2 id="applications">1. Delete Install macOS apps from Applications</h2>
      <p>
        When you download a macOS upgrade from the App Store or with Software Update&rsquo;s full installer, macOS saves
        it as an app named <strong>Install macOS</strong> plus the version name, such as Install macOS Sequoia. After
        a successful upgrade the installer normally deletes itself. If the upgrade was cancelled, failed, or you
        downloaded the installer on purpose, it stays.
      </p>
      <ol>
        <li>
          Open <strong>Finder</strong> and click <strong>Applications</strong> in the sidebar.
        </li>
        <li>
          Sort by name and look for anything starting with <strong>Install macOS</strong>. Older ones may be called{" "}
          <strong>Install OS X</strong>.
        </li>
        <li>
          Select one and press <strong>Command-I</strong> to see its size.
        </li>
        <li>
          If you don&rsquo;t need it, drag it to the Trash or press <strong>Command-Delete</strong>.
        </li>
        <li>
          Empty the Trash to get the space back. Our guide on{" "}
          <Link href={EMPTY_TRASH_GUIDE_PATH}>how to empty the Trash on a Mac</Link> helps if it refuses.
        </li>
      </ol>
      <h3>Keep it if an upgrade is still pending</h3>
      <p>
        If you downloaded an installer to upgrade later this week, leave it. Deleting it means downloading it again.
        If you are short of space for the upgrade itself, our guide on{" "}
        <Link href={UPDATE_SPACE_GUIDE_PATH}>not enough space to update a Mac</Link> shows how much room you need and
        how to make it.
      </p>

      <h2 id="install-data">2. Delete a leftover macOS Install Data folder</h2>
      <p>
        During an install, macOS can create a folder called <strong>macOS Install Data</strong> at the top level of
        your startup disk. When an install finishes, it goes away. When an install fails or is interrupted, it can
        stay, sometimes holding many gigabytes.
      </p>
      <ol>
        <li>
          In Finder, choose <strong>Go</strong>, then <strong>Computer</strong>, and open <strong>Macintosh HD</strong>.
        </li>
        <li>
          Press <strong>Command-Shift-Period</strong> to show hidden files if you don&rsquo;t see it.
        </li>
        <li>
          If you see <strong>macOS Install Data</strong> and no update is installing, drag it to the Trash. Enter your
          password if asked.
        </li>
      </ol>
      <p>
        Not sure if an update is in progress? Open <strong>System Settings</strong>, then <strong>General</strong>,
        then <strong>Software Update</strong>. If it is preparing or waiting to restart, finish the update first.
        Afterwards, restart and check again.
      </p>
      <h3>Software Update downloads you can&rsquo;t see</h3>
      <p>
        Smaller updates downloaded through Software Update are kept in protected system folders that you
        can&rsquo;t browse. You don&rsquo;t need to. Installing or cancelling the update lets macOS remove them, and
        any snapshot from the update is cleared after it settles. Our guide on{" "}
        <Link href={SNAPSHOTS_GUIDE_PATH}>Time Machine snapshots</Link> explains how update snapshots differ.
      </p>

      <AppCallout market={market} title="Spot every old installer in one scan">
        {APP_NAME} scans your Mac on the device and lists old installers, disk images, caches, large files,
        duplicates, app leftovers and iPhone backups with their sizes. Everything you clear goes to the Trash, and
        Undo puts it back.
      </AppCallout>

      <h2 id="packages">3. Clear out .dmg and .pkg files</h2>
      <p>
        Every app you download from the web arrives as a disk image (<code>.dmg</code>) or an installer package{" "}
        (<code>.pkg</code>). Once the app is installed, the file has done its job. Over a year or two, these add up to
        many gigabytes in Downloads.
      </p>
      <ol>
        <li>
          Open your <strong>Downloads</strong> folder and switch to list view with <strong>Command-2</strong>.
        </li>
        <li>
          Click the <strong>Kind</strong> column header to group disk images and installer packages together.
        </li>
        <li>Eject any mounted disk images first, from the Finder sidebar.</li>
        <li>Select the files and move them to the Trash.</li>
      </ol>
      <p>
        Apple&rsquo;s full installer sometimes downloads as <code>InstallAssistant.pkg</code>. Running it creates the
        Install macOS app, so you usually need only one of the two. Delete the .pkg once the app exists. For more on
        clearing the rest of the folder, read{" "}
        <Link href={DOWNLOADS_GUIDE_PATH}>how to clear Downloads on a Mac</Link>.
      </p>

      <h2 id="usb">Keep an installer on a USB drive instead</h2>
      <p>
        If you set up Macs often or want an offline way to reinstall, put the installer on a USB drive and delete it
        from your Mac. Apple supports this with the <code>createinstallmedia</code> tool inside each installer.
      </p>
      <ol>
        <li>Plug in a USB drive of at least 32 GB. Everything on it will be erased.</li>
        <li>Make sure the Install macOS app is in your Applications folder.</li>
        <li>
          In Terminal, run the command for your version, for example:
          <br />
          <code>
            sudo /Applications/Install\ macOS\ Sequoia.app/Contents/Resources/createinstallmedia --volume
            /Volumes/MyVolume
          </code>
        </li>
        <li>
          Replace <code>MyVolume</code> with your drive&rsquo;s name and the app name with your installer&rsquo;s
          name. Type <strong>Y</strong> to confirm.
        </li>
        <li>When it finishes, eject the drive and delete the installer from Applications.</li>
      </ol>
      <p>
        Apple&rsquo;s support article &ldquo;Create a bootable installer for macOS&rdquo; lists the exact command for
        each version. Most people don&rsquo;t need any of this: <strong>macOS Recovery</strong>, which you reach at
        startup, can reinstall macOS over the internet.
      </p>

      <h2>How to get an installer back if you need it</h2>
      <p>Deleting an installer isn&rsquo;t permanent. If you need one later, you have three official routes:</p>
      <ul>
        <li>
          <strong>macOS Recovery.</strong> Restart and hold the power button on Apple silicon, or Command-R on Intel,
          then choose <strong>Reinstall macOS</strong>. It downloads the installer it needs.
        </li>
        <li>
          <strong>The App Store.</strong> Apple&rsquo;s support article &ldquo;How to download and install macOS&rdquo;
          links to the App Store page for each recent version.
        </li>
        <li>
          <strong>Terminal.</strong> <code>softwareupdate --list-full-installers</code> lists the full installers your
          Mac can download, and <code>softwareupdate --fetch-full-installer --full-installer-version</code> followed by
          a version number downloads one into Applications.
        </li>
      </ul>
      <p>
        Because all three work, there is little reason to keep a 10 GB-plus installer on your internal disk &ldquo;just
        in case&rdquo;.
      </p>
      <h3>Why installers sometimes come back</h3>
      <p>
        If an Install macOS app reappears after you delete it, Software Update may have been set to download
        updates automatically. Open <strong>System Settings</strong>, then <strong>General</strong>, then{" "}
        <strong>Software Update</strong>, click the info button next to <strong>Automatic updates</strong>, and choose
        whether macOS downloads new updates on its own. Leaving security responses on is still a good idea.
      </p>

      <h2>What not to delete</h2>
      <ul>
        <li>
          <strong>System files with &ldquo;install&rdquo; in the name</strong> inside <code>/System</code> or{" "}
          <code>/Library</code>. They belong to macOS.
        </li>
        <li>
          <strong>An installer you still need</strong> for an upgrade you haven&rsquo;t done yet.
        </li>
        <li>
          <strong>Installers for apps you can&rsquo;t download again</strong>, such as discontinued software you paid
          for. Move those to an external drive instead.
        </li>
      </ul>

      <h2>After the installers: what else to clear</h2>
      <p>
        Installers are a quick win, but rarely the only one. The macOS category itself can&rsquo;t be shrunk; our
        guide on <Link href={MACOS_STORAGE_GUIDE_PATH}>macOS taking up too much storage</Link> explains why. For
        everything else, start with <Link href={GUIDE_PATH}>how to free up space on a Mac</Link>.
      </p>
      <p>
        {APP_NAME} lists old installers alongside caches, backups and large files, so you can clear them together. It
        costs <Price /> once, with no subscription. Learn more on the <Link href="/">home page</Link>.
      </p>
    </GuideLayout>
  );
}
