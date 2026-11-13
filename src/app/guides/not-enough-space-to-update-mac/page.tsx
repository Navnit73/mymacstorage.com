import Link from "next/link";
import { AppCallout, GuideLayout, GuideTable } from "@/components/guide-layout";
import { Price } from "@/components/price";
import { articleGraph, innerPageGraph, pageMetadata } from "@/lib/seo";
import {
  APP_NAME,
  CACHE_GUIDE_PATH,
  DUPLICATES_GUIDE_PATH,
  GUIDE_PATH,
  IPHONE_BACKUPS_GUIDE_PATH,
  LARGE_FILES_GUIDE_PATH,
  PURGEABLE_GUIDE_PATH,
  REFUND_DAYS,
  UPDATE_SPACE_GUIDE_PATH,
  XCODE_SPACE_GUIDE_PATH,
} from "@/lib/site";

const market = "us" as const;
const path = UPDATE_SPACE_GUIDE_PATH;
const published = "2026-11-13";
const title = "Not enough space to update your Mac? Here is how to make room";
const description =
  "Mac says there isn't enough space to update macOS? Find out how much you need, why available space misleads, and 9 safe ways to free room for the update.";

export const metadata = pageMetadata({
  title: "Not Enough Space to Update Mac? 9 Safe Fixes",
  description,
  path,
  type: "article",
});

const quickWins = [
  ["Old macOS installers", "Install macOS ….app in Applications", "Often over 10 GB each"],
  ["iPhone and iPad backups", "Storage settings, iOS Files", "Often tens of GB"],
  ["Downloads folder", "~/Downloads", "Varies, often large"],
  ["Time Machine snapshots", "Disk Utility, Show APFS Snapshots", "Varies, often large"],
  ["App and browser caches", "~/Library/Caches", "Usually a few GB"],
  ["Developer files", "~/Library/Developer", "Can reach tens of GB"],
];

const faqs = [
  {
    q: "How much free space do I need to update my Mac?",
    a: "The error message tells you the exact figure for your Mac. Small point updates need a few gigabytes, while major yearly upgrades usually ask for tens of gigabytes. Free a little more than the message asks for, because the installer also needs room to unpack.",
  },
  {
    q: "Why does my Mac say not enough space when I have plenty?",
    a: "Storage settings counts purgeable space, such as Time Machine snapshots and optimised iCloud files, as available. The installer may only count truly free space. Delete local snapshots or remove iCloud downloads to turn purgeable space into free space.",
  },
  {
    q: "Can I install a macOS update on an external drive to save space?",
    a: "No. The update has to install on the startup disk it is updating. An external drive helps only as a place to move large files, such as videos and old projects, so the internal disk has room.",
  },
  {
    q: "Can I delete the Install macOS app after updating?",
    a: "Yes. Once the update finishes, the installer app in Applications is no longer needed, and macOS usually removes it itself. If an old one is still there, move it to the Trash and empty it.",
  },
  {
    q: "Will deleting iPhone backups affect my iPhone?",
    a: "No. Deleting a backup from your Mac doesn't change anything on the iPhone. You just can't restore the phone from that backup later, so keep the latest one if you don't use iCloud Backup.",
  },
  {
    q: "The update failed halfway. Is the partial download still taking space?",
    a: "It can be. Restart your Mac and open Software Update again. macOS usually reuses or removes a partial download on its own, so try that before deleting anything by hand.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "Not enough space to update Mac", description }),
  ...articleGraph({ path, headline: title, description, published, updated: published, language: "en", faqs }),
];

export default function UpdateSpaceGuide() {
  return (
    <GuideLayout
      market={market}
      title={title}
      intro="You click Update Now and macOS says there isn't enough free space. Sometimes the disk really is full. Sometimes it only looks full to the installer. Here is how to tell which, and how to make room safely without deleting anything you need."
      breadcrumb="Not enough space to update"
      updated={published}
      readMinutes={7}
      takeaways={[
        "The error message tells you exactly how much space the update needs.",
        "Available space isn't the same as free space, and the installer may want free.",
        "Old installers, iPhone backups and snapshots are the quickest big wins.",
        "An external drive can't hold the update, but it can hold your large files.",
      ]}
      toc={[
        { id: "why", label: "Why it happens" },
        { id: "how-much", label: "How much you need" },
        { id: "fixes", label: "9 ways to make room" },
        { id: "still", label: "Still not enough?" },
        { id: "faq", label: "FAQ" },
      ]}
      related={[
        { href: PURGEABLE_GUIDE_PATH, label: "How to clear purgeable space on a Mac" },
        { href: IPHONE_BACKUPS_GUIDE_PATH, label: "How to delete iPhone backups on a Mac" },
        { href: LARGE_FILES_GUIDE_PATH, label: "How to find large files on a Mac" },
        { href: GUIDE_PATH, label: "How to free up space on a Mac" },
      ]}
      graph={graph}
      faqs={faqs}
      closing={
        <>
          Make room for the update in minutes, not an afternoon. <Price /> once, with a {REFUND_DAYS}-day refund.
        </>
      }
    >
      <h2 id="why">Why your Mac says there isn&rsquo;t enough space</h2>
      <p>
        A macOS update has to download, unpack and then install, all on your startup disk. For a while it needs room
        for the old system, the new system and the files in between. If that room isn&rsquo;t there, Software Update
        stops before it starts.
      </p>
      <h3>When the disk looks fine but the update still fails</h3>
      <p>
        This catches most people out. Storage settings shows <strong>available</strong> space, which includes
        purgeable files that macOS promises to delete when needed, such as Time Machine snapshots and iCloud Drive
        files stored in the cloud. The installer doesn&rsquo;t always wait for macOS to purge them, so it sees less
        room than you do.
      </p>
      <p>
        To see the real figure, click <strong>Macintosh HD</strong> in the Finder sidebar and press{" "}
        <strong>Command-I</strong>. If the purgeable number in brackets is large, start with fix 4 below. Our guide on{" "}
        <Link href={PURGEABLE_GUIDE_PATH}>clearing purgeable space on a Mac</Link> explains it in full.
      </p>

      <h2 id="how-much">How much space does a macOS update need?</h2>
      <p>
        There is no single number. Read the message in <strong>System Settings</strong>, then{" "}
        <strong>General</strong>, then <strong>Software Update</strong>. It states how much space your Mac needs for
        that update.
      </p>
      <ul>
        <li>
          <strong>Point updates</strong>, such as a security fix, usually need a few gigabytes.
        </li>
        <li>
          <strong>Major yearly upgrades</strong> usually ask for tens of gigabytes, because they replace the whole
          system.
        </li>
      </ul>
      <p>
        Aim to free more than the message asks for. A buffer of 10 to 20 GB on top helps the install finish without a
        second warning halfway through, and leaves macOS room for swap files once you restart.
      </p>

      <h3>What the different messages mean</h3>
      <p>The wording changes depending on where the update stops. Each version points to a slightly different fix.</p>
      <GuideTable
        head={["Message or symptom", "What it means", "Start with"]}
        rows={[
          ["Requires X GB of available storage", "There isn't enough room to download and prepare", "Fixes 1 to 5"],
          ["Not enough free space, yet Storage looks fine", "Purgeable space hasn't been released", "Fix 4, then a restart"],
          ["Download finishes, install fails", "No room left to unpack the update", "Free 10 to 20 GB more"],
          ["Upgrade missing from Software Update", "Your Mac may not support it", "Check Apple's compatibility list"],
        ]}
      />
      <p>
        If the figure Software Update asks for keeps rising as you free space, that is normal. It measures the gap
        between what you have and what it needs, and recalculates whenever it checks again.
      </p>

      <h2 id="fixes">9 ways to free space for a macOS update</h2>
      <p>
        Work from the top. Each fix is safe, and the first few free the most space on most Macs. Check the Software
        Update figure after each one, and stop when you have enough.
      </p>
      <h3>The quickest big wins</h3>
      <GuideTable head={["What to remove", "Where to find it", "Typical size"]} rows={quickWins} />

      <h3>1. Empty the Trash</h3>
      <p>
        Files in the Trash still use disk space. Right-click the Trash in the Dock and choose{" "}
        <strong>Empty Trash</strong>. It sounds obvious, yet it is often the reason the earlier cleanup didn&rsquo;t
        help.
      </p>

      <h3>2. Delete old macOS installers</h3>
      <p>
        Open <strong>Applications</strong> and look for apps named <strong>Install macOS</strong> followed by a
        version name. If an older installer is still there from a past upgrade, it can take over 10 GB. Move it to the
        Trash. You can download it again from Apple if you ever need it.
      </p>

      <h3>3. Remove old iPhone and iPad backups</h3>
      <p>
        Open <strong>System Settings</strong>, then <strong>General</strong>, then <strong>Storage</strong>, and click
        the info button next to <strong>iOS Files</strong>. Delete backups of devices you no longer own. Our guide on{" "}
        <Link href={IPHONE_BACKUPS_GUIDE_PATH}>deleting iPhone backups on a Mac</Link> has every step.
      </p>

      <h3>4. Clear Time Machine local snapshots</h3>
      <p>
        Open <strong>Disk Utility</strong>, choose <strong>View</strong>, then <strong>Show APFS Snapshots</strong>,
        and delete the ones named <code>com.apple.TimeMachine</code>. This turns purgeable space into free space
        straight away. Leave any snapshot named <code>com.apple.os.update</code> in place.
      </p>

      <h3>5. Sort out your Downloads folder</h3>
      <p>
        Open <strong>Downloads</strong> in Finder, switch to list view and click the <strong>Size</strong> column. Old
        disk images, zip files and installers you already used are safe to remove.
      </p>

      <h3>6. Clear app and browser caches</h3>
      <p>
        Caches rebuild as you use your apps, so clearing them is safe and fast. Our guide on{" "}
        <Link href={CACHE_GUIDE_PATH}>how to clear cache on a Mac</Link> shows which folders to empty.
      </p>

      <h3>7. Find large files and duplicates</h3>
      <p>
        Old video exports, virtual machines and copies of the same photo library add up quickly. Use our guides to{" "}
        <Link href={LARGE_FILES_GUIDE_PATH}>find large files</Link> and{" "}
        <Link href={DUPLICATES_GUIDE_PATH}>find duplicate files</Link> on a Mac.
      </p>

      <h3>8. Move big files to an external drive</h3>
      <p>
        You can&rsquo;t install the update on an external drive, but you can move large files there. Copy video
        projects, music libraries or old archives to the drive, check they open, then delete the originals from your
        Mac.
      </p>

      <h3>9. Clean up developer files</h3>
      <p>
        If you write code, check <code>~/Library/Developer</code>. Xcode build data and old simulators often grow
        into tens of gigabytes. Our guide on{" "}
        <Link href={XCODE_SPACE_GUIDE_PATH}>Xcode taking up too much space</Link> shows what is safe to remove.
      </p>

      <AppCallout market={market} title="Find the space for your update in one scan">
        {APP_NAME} lists old installers, iPhone backups, caches, large files and developer files with their sizes, so
        you clear the biggest first. Everything goes to the Trash, and Undo puts it back.
      </AppCallout>

      <h2 id="still">Still not enough space? Try these</h2>
      <h3>Restart and try again</h3>
      <p>
        A restart clears temporary files and gives macOS a chance to purge what it promised to. Open Software Update
        straight after you log in, before other apps start filling caches again.
      </p>
      <h3>Turn on Optimise Mac Storage</h3>
      <p>
        Open <strong>System Settings</strong>, click your name, then <strong>iCloud</strong>, then{" "}
        <strong>Drive</strong>, and turn on <strong>Optimise Mac Storage</strong>. Older files stay in iCloud and
        download when you open them. Photos has a similar option in its own settings.
      </p>
      <h3>Check the update isn&rsquo;t stuck on a partial download</h3>
      <p>
        If a previous attempt failed halfway, the partial download may still sit on the disk. Restart and open
        Software Update again. macOS usually reuses or clears it on its own, so avoid deleting system folders by hand.
      </p>
      <h3>Make sure your Mac supports the update</h3>
      <p>
        If you can&rsquo;t see the upgrade at all, your Mac may not support it. Apple lists compatible models on each
        macOS release page. No amount of free space changes that.
      </p>

      <h2>Before you click Update Now</h2>
      <ul>
        <li>Back up with Time Machine or another tool. A major update rarely goes wrong, but it can.</li>
        <li>Plug a MacBook into power and keep it on the charger until the update finishes.</li>
        <li>Leave the extra buffer of free space in place until the first restart is done.</li>
      </ul>
      <p>
        Don&rsquo;t refill the disk while the update downloads. Large file copies, video exports and new app installs
        all compete for the same space, and the installer can run short at the last step. Let it finish, restart,
        and then move your files back if you parked any on an external drive.
      </p>
      <p>
        Once the update is in, check Storage settings again. The figure often drops a little, because macOS removes
        the installer and temporary files it no longer needs.
      </p>

      <h2>Keep room for the next update</h2>
      <p>
        Apple releases a major macOS version every year and point updates in between. Keeping 10 to 15 percent of your
        disk free means you won&rsquo;t hit this message again. Our guide on{" "}
        <Link href={GUIDE_PATH}>how to free up space on a Mac</Link> lists 14 habits that help.
      </p>
      <p>
        {APP_NAME} makes the check quick. One scan shows what fills your disk, and you clear it to the Trash with Undo
        ready. It costs <Price /> once, with no subscription. Learn more on the <Link href="/">home page</Link>.
      </p>
    </GuideLayout>
  );
}
