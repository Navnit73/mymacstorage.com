import Link from "next/link";
import { AppCallout, GuideLayout, GuideTable } from "@/components/guide-layout";
import { Price } from "@/components/price";
import { articleGraph, innerPageGraph, pageMetadata } from "@/lib/seo";
import {
  APP_NAME,
  CACHE_GUIDE_PATH,
  DOCKER_GUIDE_PATH,
  HOMEBREW_GUIDE_PATH,
  LARGE_FILES_GUIDE_PATH,
  REFUND_DAYS,
  XCODE_SPACE_GUIDE_PATH,
} from "@/lib/site";

const market = "us" as const;
const path = HOMEBREW_GUIDE_PATH;
const published = "2026-11-24";
const title = "How to clear the Homebrew cache on a Mac, plus npm, pnpm and pip";
const description =
  "Clear the Homebrew cache with brew cleanup, remove unused dependencies, and free space from npm, pnpm, Yarn and pip caches and old node_modules folders.";

export const metadata = pageMetadata({
  title: "How to Clear Homebrew Cache on Mac",
  description,
  path,
  type: "article",
});

const caches = [
  ["Homebrew", "~/Library/Caches/Homebrew", "brew cleanup --prune=all"],
  ["npm", "~/.npm/_cacache", "npm cache clean --force"],
  ["pnpm", "the folder from pnpm store path", "pnpm store prune"],
  ["Yarn 1", "the folder from yarn cache dir", "yarn cache clean"],
  ["pip", "~/Library/Caches/pip", "pip cache purge"],
  ["node_modules", "Inside every JavaScript project", "Delete per project, reinstall when needed"],
];

const faqs = [
  {
    q: "Where is the Homebrew cache on a Mac?",
    a: "Run brew --cache to see it. On most Macs it is ~/Library/Caches/Homebrew. It holds downloaded bottles and source archives that Homebrew keeps after installing or upgrading.",
  },
  {
    q: "Is it safe to delete the Homebrew cache?",
    a: "Yes. The cache only holds downloads, and installed packages don't depend on it. If you need a file again, Homebrew downloads it. Use brew cleanup rather than deleting folders by hand, so Homebrew stays consistent.",
  },
  {
    q: "Does brew cleanup run automatically?",
    a: "Yes, Homebrew runs a cleanup periodically and after installs and upgrades, removing files older than its default age limit. It keeps recent downloads, which is why a manual brew cleanup --prune=all can still free space.",
  },
  {
    q: "Is npm cache clean --force safe?",
    a: "Yes. It empties npm's local download cache, and npm fills it again as needed. Your projects and installed packages are untouched. The only cost is slower installs until the cache warms up.",
  },
  {
    q: "How do I find all node_modules folders on my Mac?",
    a: "In Terminal, cd to the folder that holds your projects and run find . -name node_modules -type d -prune, then add -exec du -sh {} + to see their sizes. Delete the ones in projects you aren't working on; npm install recreates them.",
  },
  {
    q: "What does brew autoremove do?",
    a: "It uninstalls formulae that were only installed as dependencies of something you have since removed. Run brew autoremove --dry-run first to see the list.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "Clear Homebrew cache on Mac", description }),
  ...articleGraph({ path, headline: title, description, published, updated: published, language: "en", faqs }),
];

export default function HomebrewCacheGuide() {
  return (
    <GuideLayout
      market={market}
      title={title}
      intro="Package managers keep every download just in case. On a developer Mac, Homebrew, npm, pnpm and pip caches plus old node_modules folders can add up to tens of gigabytes. Here is how to clear each one safely."
      breadcrumb="Clear Homebrew cache"
      updated={published}
      readMinutes={7}
      takeaways={[
        "brew cleanup --prune=all empties the Homebrew download cache.",
        "brew autoremove removes dependencies nothing needs any more.",
        "npm, pnpm, Yarn and pip each have a one-line cache clear.",
        "Old node_modules folders are often bigger than every cache combined.",
      ]}
      toc={[
        { id: "homebrew", label: "Homebrew" },
        { id: "node", label: "npm, pnpm, Yarn" },
        { id: "node-modules", label: "node_modules" },
        { id: "python", label: "pip" },
        { id: "faq", label: "FAQ" },
      ]}
      related={[
        { href: XCODE_SPACE_GUIDE_PATH, label: "Xcode taking up too much space" },
        { href: DOCKER_GUIDE_PATH, label: "Docker taking up space on a Mac" },
        { href: CACHE_GUIDE_PATH, label: "How to clear cache on a Mac" },
        { href: LARGE_FILES_GUIDE_PATH, label: "How to find large files on a Mac" },
      ]}
      graph={graph}
      faqs={faqs}
      closing={
        <>
          See every cache on your Mac with its size. <Price /> once, with a {REFUND_DAYS}-day refund.
        </>
      }
    >
      <p>
        Every command below clears <strong>downloads and caches</strong>, not installed tools. The worst case is that
        the next install is slower while the cache refills.
      </p>
      <GuideTable head={["Tool", "Where the cache lives", "Command to clear it"]} rows={caches} />

      <h2 id="homebrew">How to clear the Homebrew cache</h2>
      <h3>1. See where the cache is and how big it is</h3>
      <p>
        <code>brew --cache</code> prints the folder, usually <code>~/Library/Caches/Homebrew</code>. To check its size:
      </p>
      <p>
        <code>du -sh &quot;$(brew --cache)&quot;</code>
      </p>
      <h3>2. Preview, then run brew cleanup</h3>
      <p>
        Start with a dry run so you see what would go: <code>brew cleanup -n</code>. Then run it for real:
      </p>
      <p>
        <code>brew cleanup</code>
      </p>
      <p>
        This removes old versions of installed formulae and casks, plus cached downloads older than Homebrew&rsquo;s
        default age limit. It keeps the newest version of everything you have installed.
      </p>
      <h3>3. Clear every cached download</h3>
      <p>
        <code>brew cleanup --prune=all</code>
      </p>
      <p>
        This removes all cached downloads regardless of age. Add <code>-s</code> to also scrub the downloads of the
        latest versions of installed packages: <code>brew cleanup -s --prune=all</code>. Homebrew downloads them again
        if it ever needs them.
      </p>
      <h3>4. Remove dependencies you no longer need</h3>
      <p>
        When you uninstall a formula, the libraries it pulled in stay behind. Check what would be removed with{" "}
        <code>brew autoremove --dry-run</code>, then run <code>brew autoremove</code>.
      </p>
      <h3>5. Remove whole tools you don&rsquo;t use</h3>
      <p>
        <code>brew list --formula</code> and <code>brew list --cask</code> show what is installed. Large casks such as
        IDEs, browsers or design apps installed through Homebrew can be several gigabytes each. Remove one with{" "}
        <code>brew uninstall --cask name</code>, adding <code>--zap</code> to also remove its settings and support
        files. Only use <code>--zap</code> when you don&rsquo;t want those settings back.
      </p>
      <h3>Should you turn off automatic cleanup?</h3>
      <p>
        Setting <code>HOMEBREW_NO_INSTALL_CLEANUP=1</code> in your shell profile stops Homebrew cleaning up after each
        install. That makes the cache grow faster, so only set it if you have a reason to keep old versions. If you
        find it in your <code>~/.zshrc</code> and don&rsquo;t remember why, removing it lets Homebrew tidy up on its
        own again.
      </p>

      <h2 id="node">How to clear npm, pnpm and Yarn caches</h2>
      <h3>npm</h3>
      <p>
        npm stores every package tarball it downloads in <code>~/.npm/_cacache</code>. Check its size with{" "}
        <code>du -sh ~/.npm</code>, then clear it:
      </p>
      <p>
        <code>npm cache clean --force</code>
      </p>
      <p>
        The <code>--force</code> flag is required because npm considers its cache self-healing. It is still safe. Run{" "}
        <code>npm cache verify</code> afterward if you want npm to check the now-empty cache.
      </p>
      <h3>pnpm</h3>
      <p>
        pnpm keeps one content-addressed store shared by every project. Find it with <code>pnpm store path</code>.
        Then run:
      </p>
      <p>
        <code>pnpm store prune</code>
      </p>
      <p>
        This removes packages no project on your Mac references any more. It does not break existing projects.
      </p>
      <h3>Yarn</h3>
      <p>
        For Yarn 1, <code>yarn cache dir</code> shows the folder and <code>yarn cache clean</code> empties it. Newer
        Yarn versions keep a cache per project or a global one in <code>~/.yarn/berry/cache</code>; run{" "}
        <code>yarn cache clean --all</code> inside a project to clear it.
      </p>

      <AppCallout market={market} title="Find big caches without memorizing commands">
        {APP_NAME} scans your Mac on the device and lists caches, large files, duplicates and app leftovers with their
        sizes. You review the list, and everything you clear goes to the Trash, so Undo puts it back.
      </AppCallout>

      <h2 id="node-modules">Find and delete old node_modules folders</h2>
      <p>
        Each JavaScript project has its own <code>node_modules</code>, and a single one can run to hundreds of
        megabytes. Twenty old projects can easily outweigh every cache on this page.
      </p>
      <ol>
        <li>
          In Terminal, go to the folder that holds your projects, for example <code>cd ~/Projects</code>.
        </li>
        <li>
          List every <code>node_modules</code> folder and its size:
          <br />
          <code>find . -name node_modules -type d -prune -exec du -sh {"{}"} +</code>
        </li>
        <li>Delete the ones belonging to projects you aren&rsquo;t working on. Drag them to the Trash in Finder, or remove them in Terminal once you are sure.</li>
      </ol>
      <p>
        Nothing is lost. When you return to a project, <code>npm install</code> (or your package manager&rsquo;s
        equivalent) rebuilds the folder from the lockfile. Don&rsquo;t run <code>find</code> from your home folder root
        with a delete action attached. Point it at your projects folder so it can&rsquo;t touch app bundles that ship
        their own <code>node_modules</code>.
      </p>
      <p>
        Build output folders such as <code>.next</code>, <code>dist</code> and <code>.turbo</code> are safe to delete
        in inactive projects too. They come back on the next build.
      </p>

      <h2 id="python">How to clear the pip cache</h2>
      <p>
        pip caches downloaded wheels in <code>~/Library/Caches/pip</code>. See its size with{" "}
        <code>pip cache info</code>. Then clear it:
      </p>
      <p>
        <code>pip cache purge</code>
      </p>
      <p>
        If you use <code>pip3</code> or several Python versions, run the command with each one. Old virtual
        environments (<code>.venv</code> or <code>venv</code> folders inside projects) are often bigger than the cache.
        Delete those in finished projects and recreate them from <code>requirements.txt</code> when needed. Conda users
        can run <code>conda clean --all</code> to remove unused packages and tarballs.
      </p>

      <h2>Other developer caches worth checking</h2>
      <ul>
        <li>
          <strong>Xcode:</strong> DerivedData, old simulators and device support files are usually the largest
          developer files on a Mac. See <Link href={XCODE_SPACE_GUIDE_PATH}>Xcode taking up too much space</Link>.
        </li>
        <li>
          <strong>Docker:</strong> images, volumes and build cache live in one virtual disk. See{" "}
          <Link href={DOCKER_GUIDE_PATH}>Docker taking up space on a Mac</Link>.
        </li>
        <li>
          <strong>Gradle and Maven:</strong> <code>~/.gradle/caches</code> and <code>~/.m2/repository</code> refill on
          the next build.
        </li>
        <li>
          <strong>CocoaPods:</strong> <code>pod cache clean --all</code> clears <code>~/Library/Caches/CocoaPods</code>.
        </li>
        <li>
          <strong>Go and Rust:</strong> <code>go clean -modcache</code> clears Go modules, and old Rust{" "}
          <code>target</code> folders can be deleted per project.
        </li>
      </ul>

      <h2>Make it a habit</h2>
      <p>
        Run <code>brew cleanup --prune=all</code> and the cache commands above once a month, or whenever you finish a
        project. For everything outside your developer tools, our guide on{" "}
        <Link href={CACHE_GUIDE_PATH}>how to clear cache on a Mac</Link> covers app and system caches. {APP_NAME}{" "}
        shows them all in one scan for <Price /> once. Learn more on the <Link href="/">home page</Link>.
      </p>
    </GuideLayout>
  );
}
