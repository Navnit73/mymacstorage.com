import Link from "next/link";
import { AppCallout, GuideLayout, GuideTable } from "@/components/guide-layout";
import { Price } from "@/components/price";
import { articleGraph, innerPageGraph, pageMetadata } from "@/lib/seo";
import {
  APP_NAME,
  CHECK_STORAGE_GUIDE_PATH,
  EXTERNAL_DRIVE_GUIDE_PATH,
  GUIDE_PATH,
  HOW_MUCH_STORAGE_GUIDE_PATH,
  ICLOUD_GUIDE_PATH,
  REFUND_DAYS,
  SYSTEM_DATA_GUIDE_PATH,
} from "@/lib/site";

const market = "us" as const;
const path = HOW_MUCH_STORAGE_GUIDE_PATH;
const published = "2026-11-24";
const title = "How much storage do you need on a Mac? 256 GB vs 512 GB vs 1 TB";
const description =
  "256 GB, 512 GB or 1 TB? Work out how much storage your next Mac needs by how you use it, what macOS takes and how much free space to keep on it.";

export const metadata = pageMetadata({
  title: "How Much Storage Do I Need on a Mac?",
  description,
  path,
  type: "article",
});

const byUser = [
  ["Web, email, documents, streaming", "256 GB", "Works if photos live in iCloud and you clear downloads now and then"],
  ["Students and office work", "256 GB to 512 GB", "512 GB if you keep coursework, recordings or a local photo library"],
  ["Photographers and Photos users", "512 GB to 1 TB", "RAW files and a local library grow fast; add an external SSD for archives"],
  ["Software developers", "512 GB to 1 TB", "Xcode, simulators, Docker and package caches each take tens of gigabytes"],
  ["Video editors and music producers", "1 TB to 2 TB+", "Project media plus sound libraries; plan on fast external storage too"],
  ["Gamers and virtual machine users", "1 TB+", "Each game or VM can use tens of gigabytes on its own"],
];

const baseline = [
  ["macOS and its recovery and system files", "Tens of gigabytes before you install anything"],
  ["System Data (caches, logs, snapshots, swap)", "Varies widely and grows over time"],
  ["Everyday apps", "A few gigabytes for a browser, office apps and chat"],
  ["Pro apps", "Xcode, Final Cut Pro or Logic Pro with content can each pass 10 GB"],
  ["Free space to keep", "10 to 15% of the drive, so macOS can update and swap"],
];

const faqs = [
  {
    q: "Is 256 GB enough for a Mac?",
    a: "For light use, yes, especially if your photos live in iCloud and you don't keep big media files locally. It leaves little room for pro apps, large photo libraries or development tools, and you will need to clear space regularly.",
  },
  {
    q: "Is 512 GB enough for a MacBook?",
    a: "512 GB is the comfortable choice for most people, including students, office work and moderate photo libraries. Heavy video, music production or development work usually needs 1 TB or an external SSD.",
  },
  {
    q: "Can I upgrade the storage on a Mac later?",
    a: "Not on Apple silicon Macs. The storage is part of the main board and can't be replaced or expanded by the user. The only later upgrade is external storage, so choose with a few years' growth in mind.",
  },
  {
    q: "How much free space should I keep on my Mac?",
    a: "Aim for 10 to 15% of the drive, or at least 20 to 30 GB on smaller drives. macOS needs room for virtual memory, caches and updates, and major macOS updates need more free space than their download size.",
  },
  {
    q: "Is it better to buy more storage or use an external drive?",
    a: "Internal storage is faster and always there, but Apple's upgrades cost more per gigabyte than an external SSD. A sensible middle ground is enough internal storage for apps and active work, plus an external SSD for archives and media.",
  },
  {
    q: "Does more storage make a Mac faster?",
    a: "Not directly. But a nearly full disk can slow a Mac down, because macOS has less room for swap and caches. On some models, the smallest storage option also has slower SSD speeds than larger configurations.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "How much storage do I need on a Mac?", description }),
  ...articleGraph({ path, headline: title, description, published, updated: published, language: "en", faqs }),
];

export default function HowMuchStorageGuide() {
  return (
    <GuideLayout
      market={market}
      title={title}
      intro="Storage is the one spec you can't change after you buy an Apple silicon Mac. Here is how to choose between 256 GB, 512 GB and 1 TB based on how you actually use your Mac, not on guesswork."
      breadcrumb="How much storage you need"
      updated={published}
      readMinutes={7}
      takeaways={[
        "256 GB suits light use with photos in iCloud. Expect regular cleanups.",
        "512 GB is the comfortable default for most people.",
        "Developers, photographers and video editors should start at 1 TB or plan for an external SSD.",
        "Keep 10 to 15% free. Storage can't be upgraded later on Apple silicon Macs.",
      ]}
      toc={[
        { id: "by-use", label: "By how you use it" },
        { id: "baseline", label: "What macOS takes" },
        { id: "current", label: "Check your current Mac" },
        { id: "alternatives", label: "External and cloud" },
        { id: "faq", label: "FAQ" },
      ]}
      related={[
        { href: CHECK_STORAGE_GUIDE_PATH, label: "How to check storage on a Mac" },
        { href: EXTERNAL_DRIVE_GUIDE_PATH, label: "How to move files to an external drive" },
        { href: ICLOUD_GUIDE_PATH, label: "iCloud Drive taking up space on a Mac" },
        { href: GUIDE_PATH, label: "How to free up space on a Mac" },
      ]}
      graph={graph}
      faqs={faqs}
      closing={
        <>
          Make the storage you already have go further. <Price /> once, with a {REFUND_DAYS}-day refund.
        </>
      }
    >
      <h2 id="by-use">How much storage you need, by how you use your Mac</h2>
      <p>
        Find the row that matches your heaviest regular use, not your average day. Storage needs only go up over the
        life of a Mac.
      </p>
      <GuideTable head={["How you use your Mac", "Recommended storage", "Why"]} rows={byUser} />
      <h3>When 256 GB is enough</h3>
      <p>
        256 GB works for browsing, email, documents and streaming, as long as two things are true. Your photos and
        files live mostly in iCloud with Optimize Mac Storage turned on, and you&rsquo;re happy to clear downloads,
        caches and old backups a few times a year. If you back up an iPhone to this Mac or install even one large
        creative app, 256 GB gets tight quickly.
      </p>
      <h3>Why 512 GB suits most people</h3>
      <p>
        512 GB leaves room for a local photo library, a few years of documents, several large apps and the headroom
        macOS needs for updates. It also tolerates the slow growth of System Data without constant cleanups.
      </p>
      <h3>When to choose 1 TB or more</h3>
      <p>
        Pick 1 TB or more if you edit video, produce music with large sample libraries, shoot RAW photos, develop
        software, run virtual machines or play large games. Development alone can take 50 GB or more once Xcode,
        simulators, Docker images and package caches add up. Video editors should plan on fast external storage as
        well, whatever the internal size.
      </p>

      <h2 id="baseline">What macOS and apps take before your files</h2>
      <p>
        A 256 GB Mac doesn&rsquo;t give you 256 GB for your files. macOS reports storage in decimal gigabytes, and the
        system, recovery and caches claim their share before you add anything.
      </p>
      <GuideTable head={["What uses space", "Typical size"]} rows={baseline} />
      <p>
        System Data is the wild card. It holds caches, logs, Time Machine local snapshots and virtual memory, and it
        can grow to tens of gigabytes. Our guide on{" "}
        <Link href={SYSTEM_DATA_GUIDE_PATH}>reducing System Data on a Mac</Link> explains what is in it.
      </p>
      <h3>Keep 10 to 15% free</h3>
      <p>
        macOS uses free space for swap (virtual memory), caches and update files. When free space runs very low, apps
        can slow down or fail to save, and macOS updates refuse to install. As a rule, keep 10 to 15% of the drive
        free, or at least 20 to 30 GB on a small drive. On a 256 GB Mac that means planning on roughly 200 GB of
        usable space for macOS, apps and files together.
      </p>

      <h2 id="current">Use your current Mac to decide</h2>
      <p>
        The best predictor of what you need is what you use now. Open <strong>System Settings</strong>, then{" "}
        <strong>General</strong>, then <strong>Storage</strong>, and note how much is used and which categories are
        largest. Our guide on <Link href={CHECK_STORAGE_GUIDE_PATH}>how to check storage on a Mac</Link> walks through
        each category.
      </p>
      <ul>
        <li>Take the used figure after a cleanup, not before. Caches and old downloads inflate it.</li>
        <li>Add growth. Look at how much your usage grew over the last year or two and project it across how long you keep a Mac.</li>
        <li>Add headroom of 10 to 15% on top.</li>
        <li>Round up to the next size Apple sells.</li>
      </ul>
      <p>
        For example, if you use 180 GB after cleaning up and grow about 30 GB a year, a Mac you keep for five years
        needs around 330 GB plus headroom. That points to 512 GB, not 256 GB.
      </p>

      <AppCallout market={market} title="Clean up first, then measure">
        {APP_NAME} scans your Mac on the device and lists caches, large files, duplicates, app leftovers, old installers
        and iPhone backups with their sizes. Clear what you don&rsquo;t need to the Trash, with Undo if you change your
        mind, and you&rsquo;ll see your true storage use.
      </AppCallout>

      <h2>Storage can&rsquo;t be upgraded later</h2>
      <p>
        On Apple silicon Macs, the SSD is part of the main board. You can&rsquo;t open the case and swap in a larger
        drive, and Apple doesn&rsquo;t offer storage upgrades after purchase. Some older Intel Macs had replaceable
        storage, but no current model does. Whatever you choose at checkout is what the Mac keeps for its whole life,
        which is why erring one size up usually pays off.
      </p>
      <p>
        Apple charges for each storage step at checkout. Check Apple&rsquo;s current price for the upgrade on the model
        you want, and compare it with an external SSD of the same size before deciding.
      </p>
      <h3>Does the smallest size run slower?</h3>
      <p>
        On some recent Mac models, independent tests found the base storage configuration had slower SSD read and write
        speeds than larger ones, because it used fewer flash chips. In everyday use most people won&rsquo;t notice, but
        it is another small reason to avoid the minimum if you work with large files.
      </p>

      <h2 id="alternatives">External storage and iCloud as alternatives</h2>
      <h3>External SSDs</h3>
      <p>
        A USB-C or Thunderbolt SSD costs far less per gigabyte than an internal upgrade and is fast enough for photo
        libraries, music libraries and video projects. The trade-off is that it must be plugged in. It suits desktop
        Macs and laptops that mostly sit on a desk. See{" "}
        <Link href={EXTERNAL_DRIVE_GUIDE_PATH}>how to move files to an external drive</Link>.
      </p>
      <h3>iCloud</h3>
      <p>
        With iCloud Photos and iCloud Drive set to optimize storage, your Mac keeps recent files locally and older ones
        in the cloud. It is the easiest way to live with 256 GB, as long as you have a good connection and pay for
        enough iCloud storage. Our guide on{" "}
        <Link href={ICLOUD_GUIDE_PATH}>iCloud Drive taking up space</Link> shows how to set it up properly.
      </p>
      <h3>The balanced setup</h3>
      <p>
        For most people the best value is enough internal storage for macOS, apps and active work, plus an external SSD
        or iCloud for archives and media. That usually means 512 GB internal for general use and 1 TB for creative or
        development work.
      </p>

      <h2>Get more from the Mac you have</h2>
      <p>
        If your current Mac is full, buying a bigger one isn&rsquo;t the only answer. Our guide on{" "}
        <Link href={GUIDE_PATH}>how to free up space on a Mac</Link> covers the free fixes. {APP_NAME} finds what to
        clear in one scan, on your Mac, for <Price /> once. Learn more on the <Link href="/">home page</Link>.
      </p>
    </GuideLayout>
  );
}
