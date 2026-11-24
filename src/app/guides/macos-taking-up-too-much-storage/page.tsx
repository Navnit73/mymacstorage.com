import Link from "next/link";
import { AppCallout, GuideLayout, GuideTable } from "@/components/guide-layout";
import { Price } from "@/components/price";
import { articleGraph, innerPageGraph, pageMetadata } from "@/lib/seo";
import {
  APP_NAME,
  CHECK_STORAGE_GUIDE_PATH,
  GUIDE_PATH,
  INSTALLERS_GUIDE_PATH,
  MACOS_STORAGE_GUIDE_PATH,
  REFUND_DAYS,
  SNAPSHOTS_GUIDE_PATH,
  SYSTEM_DATA_GUIDE_PATH,
  UPDATE_SPACE_GUIDE_PATH,
} from "@/lib/site";

const market = "us" as const;
const path = MACOS_STORAGE_GUIDE_PATH;
const published = "2026-11-24";
const title = "macOS taking up too much storage? What's normal and what you can fix";
const description =
  "Why the macOS category in Mac storage is so large, what size is normal, and the few safe ways to shrink it, from update leftovers to snapshots and installers.";

export const metadata = pageMetadata({
  title: "macOS Taking Up Too Much Storage? Fixes",
  description,
  path,
  type: "article",
});

const compare = [
  ["What it is", "The operating system and its built-in apps", "Caches, logs, snapshots and uncategorized files"],
  ["Where it lives", "Mostly the sealed, read-only system volume", "Mostly your Data volume and Library folders"],
  ["Typical size", "Tens of gigabytes, fairly stable", "Anything from a few to over 100 GB"],
  ["Can you shrink it by hand?", "Hardly at all", "Yes, often by a lot"],
];

const shrinkable = [
  ["Pending or half-finished update", "Finish or restart the update", "Software Update"],
  ["Old update snapshots", "Restart; macOS removes them after the update settles", "Usually automatic"],
  ["Time Machine local snapshots", "Delete them or let them expire", "Disk Utility or tmutil"],
  ["Install macOS apps in Applications", "Delete installers you no longer need", "Finder"],
  ["Extra language voices and dictation models", "Remove the ones you don't use", "Accessibility and Keyboard settings"],
];

const faqs = [
  {
    q: "How much storage should macOS take up?",
    a: "On recent versions, the macOS category commonly shows tens of gigabytes, and the exact figure varies with your Mac, your version and what Apple Intelligence or language assets are installed. A steady number is normal. A number that keeps climbing usually points to update files or snapshots.",
  },
  {
    q: "Can I delete macOS from Storage settings?",
    a: "No, and you shouldn't try. The core of macOS sits on a sealed, read-only system volume that macOS checks at startup. You can only shrink the parts around it, such as update leftovers and installers.",
  },
  {
    q: "Why did macOS storage grow after an update?",
    a: "macOS keeps a snapshot and some files from the update while it settles. These usually go away after a restart or within a few days. If the size stays high, check for a stalled update in Software Update.",
  },
  {
    q: "What is the difference between macOS and System Data?",
    a: "macOS is the operating system itself. System Data is a catch-all for caches, logs, snapshots, virtual machine files and anything Storage settings can't put in another category. System Data is where you can usually free real space.",
  },
  {
    q: "Does reinstalling macOS reduce its size?",
    a: "Rarely by much. A reinstall replaces the system with a fresh copy of the same size. It can clear a stuck update, but it won't make the operating system meaningfully smaller.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "macOS taking up too much storage", description }),
  ...articleGraph({ path, headline: title, description, published, updated: published, language: "en", faqs }),
];

export default function MacOSStorageGuide() {
  return (
    <GuideLayout
      market={market}
      title={title}
      intro="Storage settings shows a big grey bar labeled macOS and offers no button to shrink it. That is by design. Here is what the category holds, what size is normal and the handful of things you can actually change."
      breadcrumb="macOS storage"
      updated={published}
      readMinutes={7}
      takeaways={[
        "The macOS category is the operating system itself, and most of it is locked.",
        "A large, stable number is normal. A climbing number is worth a look.",
        "Update leftovers, snapshots and old installers are the parts you can shrink.",
        "Real space savings usually come from System Data and your own files instead.",
      ]}
      toc={[
        { id: "what", label: "What it is" },
        { id: "normal", label: "What's normal" },
        { id: "vs", label: "macOS vs System Data" },
        { id: "fix", label: "What you can fix" },
        { id: "faq", label: "FAQ" },
      ]}
      related={[
        { href: SYSTEM_DATA_GUIDE_PATH, label: "How to reduce System Data on a Mac" },
        { href: UPDATE_SPACE_GUIDE_PATH, label: "Not enough space to update your Mac" },
        { href: INSTALLERS_GUIDE_PATH, label: "How to delete old macOS installers" },
        { href: CHECK_STORAGE_GUIDE_PATH, label: "How to check storage on a Mac" },
      ]}
      graph={graph}
      faqs={faqs}
      closing={
        <>
          Leave macOS alone and clear what really fills your disk. <Price /> once, with a {REFUND_DAYS}-day refund.
        </>
      }
    >
      <h2 id="what">What the macOS category actually holds</h2>
      <p>
        When Storage settings says <strong>macOS</strong>, it means the operating system: the kernel, frameworks,
        system apps such as Safari and Mail, fonts, drivers and the data macOS needs to boot. Since macOS Big Sur, most
        of this lives on a <strong>sealed system volume</strong>. It is read-only, cryptographically signed, and
        checked when your Mac starts. Nothing on it can be deleted, by you or by any cleaner app.
      </p>
      <p>
        The category can also include files that belong to the system but sit outside the sealed volume, such as
        downloaded system components, language and voice assets, on-device AI models and files from an update in
        progress. That is why the number can change a little between versions.
      </p>
      <h3>Why it can&rsquo;t be trimmed like other categories</h3>
      <p>
        Other categories have an info button with a list of files to review. macOS doesn&rsquo;t, because every file
        in it is needed. Deleting system files by hand on an older Mac could stop it from booting. On a sealed volume,
        it simply isn&rsquo;t allowed.
      </p>

      <h2 id="normal">How big is normal?</h2>
      <p>
        There is no single right number. It depends on your macOS version, your Mac model, whether Apple Intelligence
        is turned on, and which languages and voices you have installed. Expect tens of gigabytes on any recent
        version. On Macs with large on-device AI models downloaded, it can be noticeably higher.
      </p>
      <p>Instead of judging the size, watch how it behaves:</p>
      <ul>
        <li>
          <strong>Stable across weeks:</strong> normal. Leave it.
        </li>
        <li>
          <strong>Jumped right after an update, then dropped:</strong> normal. macOS cleaned up after itself.
        </li>
        <li>
          <strong>Jumped and stayed high for days:</strong> worth checking. Something from an update may be stuck.
        </li>
      </ul>
      <p>
        To get a precise reading, use the steps in our guide on{" "}
        <Link href={CHECK_STORAGE_GUIDE_PATH}>how to check storage on a Mac</Link>.
      </p>

      <h2 id="vs">macOS vs System Data: they are not the same</h2>
      <GuideTable head={["", "macOS", "System Data"]} rows={compare} />
      <p>
        If you came here because a big grey bar is eating your disk, check which label it carries. If it says{" "}
        <strong>System Data</strong>, you have a lot more room to work with. Our guide on{" "}
        <Link href={SYSTEM_DATA_GUIDE_PATH}>how to reduce System Data on a Mac</Link> covers caches, logs, snapshots
        and developer files step by step, so we won&rsquo;t repeat it here.
      </p>

      <h2 id="fix">What you can do about a large macOS category</h2>
      <GuideTable head={["Likely cause", "Fix", "Where"]} rows={shrinkable} />

      <h3>1. Finish or restart a stuck update</h3>
      <p>
        Open <strong>System Settings</strong>, then <strong>General</strong>, then <strong>Software Update</strong>. If
        an update is downloaded but not installed, install it or restart. A half-finished download can hold several
        gigabytes. If the update keeps failing for lack of room, follow our guide on{" "}
        <Link href={UPDATE_SPACE_GUIDE_PATH}>not having enough space to update a Mac</Link>.
      </p>

      <h3>2. Restart after an update</h3>
      <p>
        After a major update, macOS keeps a snapshot named like <code>com.apple.os.update-...</code> so it can finish
        setting up and roll back if something goes wrong. A restart or two, plus a few days, usually lets macOS remove
        it on its own. Don&rsquo;t delete these update snapshots by hand.
      </p>

      <h3>3. Delete Time Machine local snapshots</h3>
      <p>
        Local snapshots are usually counted as System Data or purgeable space, not macOS. But they can make the whole
        disk look full right after an update. Our guide on{" "}
        <Link href={SNAPSHOTS_GUIDE_PATH}>how to delete Time Machine snapshots</Link> shows how to clear them safely.
      </p>

      <h3>4. Remove old macOS installers</h3>
      <p>
        An app named <strong>Install macOS ...</strong> in your Applications folder is a full copy of the installer,
        often over 10 GB. It isn&rsquo;t needed once you have upgraded. See{" "}
        <Link href={INSTALLERS_GUIDE_PATH}>how to delete old macOS installers</Link> for where they hide.
      </p>

      <h3>5. Remove voices, languages and on-device models you don&rsquo;t use</h3>
      <p>
        Extra system voices for VoiceOver and Spoken Content can be large. Open <strong>System Settings</strong>, then{" "}
        <strong>Accessibility</strong>, then <strong>Spoken Content</strong>, click the info button next to{" "}
        <strong>System voice</strong>, and remove voices you downloaded but don&rsquo;t use. If you turned on Apple
        Intelligence and don&rsquo;t use it, turning it off in <strong>Apple Intelligence &amp; Siri</strong> settings
        may let macOS remove its models over time. Results vary by version, so check the macOS figure before and after.
      </p>

      <AppCallout market={market} title="Find the space you can actually free">
        {APP_NAME} scans your Mac on the device and lists caches, old installers, iPhone backups, duplicates, app
        leftovers and large files with their sizes. It never touches the system volume. Everything goes to the Trash,
        and Undo puts it back.
      </AppCallout>

      <h2>When the macOS number looks wrong</h2>
      <p>
        Sometimes the category isn&rsquo;t really large; Storage settings is just miscounting. Signs of that: the
        figure is far larger than the same version on a friend&rsquo;s Mac, it changes by tens of gigabytes between
        visits, or the bar never finishes calculating.
      </p>
      <h3>Let Spotlight finish indexing</h3>
      <p>
        Storage settings leans on Spotlight&rsquo;s index to sort files into categories. After an update or a restore,
        indexing can take hours, and categories look odd until it ends. Leave the Mac on and plugged in, then check
        again the next day.
      </p>
      <h3>Rebuild the Spotlight index</h3>
      <p>
        If the numbers stay strange, open <strong>System Settings</strong>, then <strong>Spotlight</strong>, and use{" "}
        <strong>Search Privacy</strong> to add Macintosh HD, wait a minute, then remove it. macOS rebuilds the index,
        which can take a few hours. Your files aren&rsquo;t affected.
      </p>
      <h3>Compare with Disk Utility</h3>
      <p>
        Open Disk Utility, choose <strong>View</strong>, then <strong>Show All Devices</strong>, and select the system
        volume, usually named <strong>Macintosh HD</strong> without &ldquo;Data&rdquo;. Its used figure is a good
        sanity check on the sealed part of macOS. If it looks normal while Storage settings shows a huge macOS bar,
        the extra space is almost always on the Data volume, which means update files, snapshots or misfiled data
        rather than the system itself.
      </p>

      <h2>What not to do</h2>
      <h3>Don&rsquo;t disable System Integrity Protection to delete system files</h3>
      <p>
        Some forum posts suggest turning off SIP and deleting files from <code>/System</code>. It saves little,
        weakens security, and can leave your Mac unable to update or boot. It is never worth it for storage.
      </p>
      <h3>Don&rsquo;t trust apps that promise to shrink macOS</h3>
      <p>
        No app can make the sealed system volume smaller. An app that claims to is either clearing caches (which show
        up under System Data) or misreporting. Read our{" "}
        <Link href={SYSTEM_DATA_GUIDE_PATH}>System Data guide</Link> to do the real work yourself.
      </p>
      <h3>Don&rsquo;t reinstall macOS just to save space</h3>
      <p>
        A reinstall writes a fresh copy of the same system. It can fix a stuck update, but the macOS category ends up
        about the same size.
      </p>

      <h2>Where to look instead</h2>
      <p>
        On most full Macs, the space is in your own files and in System Data: iPhone backups, old downloads, video
        projects, app caches and leftovers from deleted apps. Our main guide on{" "}
        <Link href={GUIDE_PATH}>how to free up space on a Mac</Link> walks through 14 safe ways.
      </p>
      <p>
        {APP_NAME} shows exactly where your space went in one scan, then clears what you pick to the Trash. It costs{" "}
        <Price /> once, with no subscription. Learn more on the <Link href="/">home page</Link>.
      </p>
    </GuideLayout>
  );
}
