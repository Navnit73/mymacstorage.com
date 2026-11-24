import Link from "next/link";
import { AppCallout, GuideLayout, GuideTable } from "@/components/guide-layout";
import { Price } from "@/components/price";
import { articleGraph, innerPageGraph, pageMetadata } from "@/lib/seo";
import {
  APP_NAME,
  DOCKER_GUIDE_PATH,
  HOMEBREW_GUIDE_PATH,
  LARGE_FILES_GUIDE_PATH,
  REFUND_DAYS,
  SYSTEM_DATA_GUIDE_PATH,
  XCODE_SPACE_GUIDE_PATH,
} from "@/lib/site";

const market = "us" as const;
const path = DOCKER_GUIDE_PATH;
const published = "2026-11-24";
const title = "Docker taking up too much space on your Mac? How to shrink it safely";
const description =
  "Docker eating your Mac's disk? Check what uses space with docker system df, prune images and build cache safely, and cap or shrink the Docker.raw disk image.";

export const metadata = pageMetadata({
  title: "Docker Taking Up Space on Mac: How to Fix It",
  description,
  path,
  type: "article",
});

const commands = [
  ["docker system df", "Shows space used by images, containers, volumes and build cache", "Nothing. Read-only"],
  ["docker container prune", "Removes stopped containers", "Logs and changes inside those containers"],
  ["docker image prune", "Removes dangling images (untagged layers)", "Nothing you can still run by name"],
  ["docker image prune -a", "Removes every image not used by a container", "You re-pull or rebuild images later"],
  ["docker builder prune", "Clears the BuildKit build cache", "The next build runs slower once"],
  ["docker volume prune", "Removes volumes no container uses", "Database data and anything else stored in them"],
  ["docker system prune", "Stopped containers, unused networks, dangling images, build cache", "As above, without volumes"],
];

const faqs = [
  {
    q: "Why is Docker using so much space on my Mac?",
    a: "Docker Desktop runs containers inside a Linux virtual machine, and everything that VM stores lives in one disk image called Docker.raw. Every image you pull, every build layer and every volume adds to it, and nothing is removed until you prune.",
  },
  {
    q: "Is it safe to delete Docker.raw?",
    a: "Only if you are happy to lose every image, container and volume. Deleting it is the same as a full reset. Use Docker Desktop's Clean / Purge data option instead of deleting the file by hand, so Docker recreates it correctly.",
  },
  {
    q: "Why does Finder show Docker.raw as 64 GB when it uses less?",
    a: "Docker.raw is a sparse file. Finder's size shows the maximum the file may grow to, not the blocks it actually uses. Run du -h on the file in Terminal to see the real figure.",
  },
  {
    q: "Does docker system prune delete volumes?",
    a: "Not by default. It removes stopped containers, unused networks, dangling images and build cache. Volumes are only removed if you add --volumes, which can delete database data.",
  },
  {
    q: "Why didn't my Mac get space back after pruning?",
    a: "Docker frees space inside the virtual disk, and Docker Desktop then has to release it to macOS. Recent versions do this on their own, but it can take a few minutes. Restarting Docker Desktop usually speeds it up.",
  },
  {
    q: "Can I move Docker's disk image to an external drive?",
    a: "Yes. In Docker Desktop, open Settings, then Resources, then Advanced, and change the disk image location. Expect slower builds on a USB drive, and keep the drive connected whenever Docker runs.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "Docker taking up space on Mac", description }),
  ...articleGraph({ path, headline: title, description, published, updated: published, language: "en", faqs }),
];

export default function DockerSpaceGuide() {
  return (
    <GuideLayout
      market={market}
      title={title}
      intro="Docker Desktop can quietly grow to tens of gigabytes. Here is how to see what it really uses, which prune commands are safe, and how to stop the disk image from growing back."
      breadcrumb="Docker taking up space"
      updated={published}
      readMinutes={8}
      takeaways={[
        "Everything Docker stores sits in one virtual disk file called Docker.raw.",
        "Finder overstates its size. Use du -h or docker system df for the real figure.",
        "docker system prune is safe for most people. Adding --volumes is not.",
        "Cap the disk size in Docker Desktop so it can't fill your Mac again.",
      ]}
      toc={[
        { id: "where", label: "Where it lives" },
        { id: "check", label: "Check usage" },
        { id: "prune", label: "Prune safely" },
        { id: "desktop", label: "Docker Desktop settings" },
        { id: "faq", label: "FAQ" },
      ]}
      related={[
        { href: XCODE_SPACE_GUIDE_PATH, label: "Xcode taking up too much space" },
        { href: HOMEBREW_GUIDE_PATH, label: "How to clear the Homebrew cache on a Mac" },
        { href: SYSTEM_DATA_GUIDE_PATH, label: "How to reduce System Data on a Mac" },
        { href: LARGE_FILES_GUIDE_PATH, label: "How to find large files on a Mac" },
      ]}
      graph={graph}
      faqs={faqs}
      closing={
        <>
          Find what else fills your disk after Docker. <Price /> once, with a {REFUND_DAYS}-day refund.
        </>
      }
    >
      <h2 id="where">Where Docker stores its data on a Mac</h2>
      <p>
        Containers need a Linux kernel, so Docker Desktop runs a small Linux virtual machine. Every image, container,
        volume and build layer lives inside that VM&rsquo;s disk, which is a single file on your Mac:
      </p>
      <p>
        <code>~/Library/Containers/com.docker.docker/Data/vms/0/data/Docker.raw</code>
      </p>
      <p>
        On older installs you may see <code>Docker.qcow2</code> instead. Either way, macOS sees one large file. In
        Storage settings it often lands under <strong>System Data</strong> or <strong>Developer</strong>, which is why
        many people hunt for the missing space in the wrong place.
      </p>
      <h3>Why Finder shows the wrong size</h3>
      <p>
        Docker.raw is a <strong>sparse file</strong>. Docker sets a maximum size, often 64 GB or more, and Finder
        reports that maximum. The blocks actually written to disk can be far fewer. To see the real number, run:
      </p>
      <p>
        <code>du -h ~/Library/Containers/com.docker.docker/Data/vms/0/data/Docker.raw</code>
      </p>
      <p>
        If <code>du</code> shows 12 GB and Finder shows 64 GB, your Mac is using 12 GB. Base your cleanup on the{" "}
        <code>du</code> figure.
      </p>

      <h2 id="check">Check what Docker is using</h2>
      <p>With Docker running, open Terminal and run:</p>
      <p>
        <code>docker system df</code>
      </p>
      <p>
        It lists four rows: <strong>Images</strong>, <strong>Containers</strong>, <strong>Local Volumes</strong> and{" "}
        <strong>Build Cache</strong>. The <strong>Reclaimable</strong> column tells you how much each prune can free.
        For a per-item breakdown, add <code>-v</code>: <code>docker system df -v</code>.
      </p>
      <p>
        On most developer Macs, build cache and old image versions are the biggest items. Volumes are usually smaller
        but matter more, because they hold data you may not be able to recreate.
      </p>

      <h2 id="prune">Prune Docker safely, from gentle to aggressive</h2>
      <p>Each command asks for confirmation unless you add <code>-f</code>. Read the prompt before you type y.</p>
      <GuideTable head={["Command", "What it removes", "What you lose"]} rows={commands} />

      <h3>1. Start with the standard prune</h3>
      <p>
        <code>docker system prune</code>
      </p>
      <p>
        This removes stopped containers, unused networks, dangling images and the build cache. It leaves every image
        a container uses, plus all volumes. For most people this is the right first step, and it often frees several
        gigabytes.
      </p>

      <h3>2. Remove images you no longer use</h3>
      <p>
        <code>docker system prune -a</code>
      </p>
      <p>
        The <code>-a</code> flag also removes tagged images that no container uses. That includes base images you
        pulled weeks ago for a project you have since finished. The cost is time: the next <code>docker run</code> or
        build downloads them again.
      </p>

      <h3>3. Clear the build cache on its own</h3>
      <p>
        <code>docker builder prune</code>
      </p>
      <p>
        If you build images often, BuildKit&rsquo;s cache can grow large. To keep recent layers and drop older ones,
        use a filter, for example <code>docker builder prune --filter until=72h</code>. Add <code>-a</code> to clear
        all of it.
      </p>

      <h3>4. Volumes: only with care</h3>
      <p>
        <strong>Warning:</strong> <code>docker system prune --volumes</code> and <code>docker volume prune</code> delete
        volumes that no container is attached to right now. If you stopped and removed a database container, its data
        volume counts as unused. Run <code>docker volume ls</code> first, and remove specific volumes by name with{" "}
        <code>docker volume rm name</code> instead.
      </p>

      <AppCallout market={market} title="See what else is filling your disk">
        {APP_NAME} scans your Mac on the device and lists caches, large files, duplicates, app leftovers, old
        installers and iPhone backups with their sizes. It won&rsquo;t prune Docker for you, but it shows where the rest
        of your space went. Everything goes to the Trash, and Undo puts it back.
      </AppCallout>

      <h2 id="desktop">Shrink and cap the disk in Docker Desktop</h2>
      <h3>Set a disk size limit</h3>
      <p>
        Open Docker Desktop, click the gear icon for <strong>Settings</strong>, then <strong>Resources</strong>. Under{" "}
        <strong>Advanced</strong>, find the <strong>Virtual disk limit</strong> (older versions call it Disk image
        size) and lower it. Docker won&rsquo;t grow the disk past this limit, so pruning becomes a habit instead of an
        emergency. On some versions, lowering the limit recreates the disk and deletes its contents, and Docker warns
        you first.
      </p>
      <h3>Move the disk image</h3>
      <p>
        On the same screen, <strong>Disk image location</strong> lets you move Docker.raw to another drive. An external
        SSD over Thunderbolt or USB-C works well. A slow USB stick does not.
      </p>
      <h3>Reset everything</h3>
      <p>
        If you don&rsquo;t need anything Docker currently holds, open the <strong>Troubleshoot</strong> menu (the bug
        icon) and choose <strong>Clean / Purge data</strong>. This deletes all images, containers and volumes and
        gives you an empty disk. Depending on your version you may see it offered per VM type. It is the clean way to
        get all the space back, and much safer than deleting Docker.raw in Finder.
      </p>
      <h3>Give space back to macOS</h3>
      <p>
        After a big prune, Docker frees blocks inside the VM, and current versions of Docker Desktop hand them back to
        macOS automatically. If <code>du</code> still shows the old size after a few minutes, quit Docker Desktop
        completely and start it again.
      </p>

      <h2>OrbStack, Colima and other runtimes</h2>
      <p>
        If you use OrbStack, Colima, Rancher Desktop or Podman instead of Docker Desktop, the <code>docker</code> prune
        commands above still work, because they talk to whichever engine is active. The disk image itself lives in a
        different folder, though. Colima keeps its VMs under <code>~/.colima</code> and its Lima data under{" "}
        <code>~/.lima</code>, and OrbStack stores its data in its own folder in your home directory. Check each tool&rsquo;s
        documentation for the exact path on your version before deleting anything.
      </p>
      <p>
        One trap: if you switched from Docker Desktop to another runtime, the old Docker.raw may still be sitting in{" "}
        <code>~/Library/Containers/com.docker.docker</code>. If you have uninstalled Docker Desktop and don&rsquo;t plan
        to go back, that folder is often the single largest leftover on the Mac.
      </p>

      <h2>Keep Docker small over time</h2>
      <ul>
        <li>
          Run <code>docker system prune</code> at the end of a project, or monthly.
        </li>
        <li>Use small base images such as the slim or alpine variants where your stack allows it.</li>
        <li>
          Add a <code>.dockerignore</code> file so builds don&rsquo;t copy <code>node_modules</code> and{" "}
          <code>.git</code> into the build context.
        </li>
        <li>Name the volumes you care about, so they are easy to spot and harder to prune by accident.</li>
        <li>Keep the virtual disk limit set to what you actually need.</li>
      </ul>
      <p>
        Docker is rarely the only developer tool eating space. Package manager caches add up too: see{" "}
        <Link href={HOMEBREW_GUIDE_PATH}>how to clear the Homebrew, npm and pip caches</Link>. If you build for Apple
        platforms, <Link href={XCODE_SPACE_GUIDE_PATH}>Xcode&rsquo;s DerivedData and simulators</Link> are usually even
        bigger.
      </p>

      <h2>Find the rest with {APP_NAME}</h2>
      <p>
        Once Docker is under control, the remaining space is usually spread across caches, downloads and forgotten
        files. Our guide to <Link href={LARGE_FILES_GUIDE_PATH}>finding large files on a Mac</Link> covers the free
        methods. {APP_NAME} does it in one scan, on your Mac, and costs <Price /> once. Learn more on the{" "}
        <Link href="/">home page</Link>.
      </p>
    </GuideLayout>
  );
}
