import Link from "next/link";
import { AppCallout, GuideLayout, GuideTable } from "@/components/guide-layout";
import { Price } from "@/components/price";
import { articleGraph, innerPageGraph, pageMetadata } from "@/lib/seo";
import {
  APP_NAME,
  APP_CLEANER_PATH,
  CACHE_GUIDE_PATH,
  CHROME_CACHE_GUIDE_PATH,
  REFUND_DAYS,
  SPOTIFY_CACHE_GUIDE_PATH,
  TEAMS_CACHE_GUIDE_PATH,
} from "@/lib/site";

const market = "us" as const;
const path = TEAMS_CACHE_GUIDE_PATH;
const published = "2026-11-24";
const title = "How to clear Microsoft Teams cache on a Mac";
const description =
  "Fix Teams on a Mac by clearing its cache: quit it fully, find the right folder for new Teams, and know what you lose. Includes the old classic Teams path.";

export const metadata = pageMetadata({
  title: "How to Clear Teams Cache on Mac",
  description,
  path,
  type: "article",
});

const versions = [
  ["New Teams", "~/Library/Containers/com.microsoft.teams2", "Current version"],
  ["Classic Teams", "~/Library/Application Support/Microsoft/Teams", "Retired. Remove if still installed"],
];

const lose = [
  ["Messages, chats and files", "No", "They live in Microsoft 365, not on your Mac"],
  ["Sign-in", "Often", "You may need to sign in again"],
  ["Custom backgrounds", "Maybe", "Re-upload any you added yourself"],
  ["App settings", "Maybe", "Theme and notification choices may reset"],
  ["Cached images and data", "Yes", "Teams downloads them again"],
];

const faqs = [
  {
    q: "Is it safe to clear the Teams cache on a Mac?",
    a: "Yes. Your chats, channels, meetings and files are stored in Microsoft 365, not in the cache. Teams downloads what it needs again. You may have to sign in again and redo a few settings.",
  },
  {
    q: "Where is the Teams cache on a Mac?",
    a: "For new Teams, it is inside ~/Library/Containers/com.microsoft.teams2. Classic Teams used ~/Library/Application Support/Microsoft/Teams. Open either with Go to Folder in Finder.",
  },
  {
    q: "Why should I clear the Teams cache?",
    a: "It fixes common problems such as Teams not loading, showing an old profile picture, missing messages, sign-in loops and high disk use. It is usually the first fix IT support suggests.",
  },
  {
    q: "Will clearing the Teams cache delete my chat history?",
    a: "No. Chat history is stored in your organization's Microsoft 365 account. After you clear the cache, Teams loads the history again from the server.",
  },
  {
    q: "Teams says the folder is in use. What should I do?",
    a: "Teams is still running. Quit it from the menu bar with Command-Q, then check Activity Monitor for any Microsoft Teams processes and quit them. Try again once they are gone.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "Clear Teams cache on Mac", description }),
  ...articleGraph({ path, headline: title, description, published, updated: published, language: "en", faqs }),
];

export default function TeamsCacheGuide() {
  return (
    <GuideLayout
      market={market}
      title={title}
      intro="Teams won't load, keeps showing an old status, loops at sign-in or has grown to gigabytes. Clearing its cache fixes most of that. Here is how to do it on a Mac for the current version of Teams, and what you lose."
      breadcrumb="Clear Teams cache"
      updated={published}
      readMinutes={5}
      takeaways={[
        "Quit Teams fully before you clear anything.",
        "New Teams keeps its data in ~/Library/Containers/com.microsoft.teams2.",
        "Chats and files are safe. They live in Microsoft 365.",
        "Classic Teams is retired, so remove its old folder too.",
      ]}
      toc={[
        { id: "quit", label: "Quit Teams" },
        { id: "new", label: "New Teams" },
        { id: "classic", label: "Classic Teams" },
        { id: "lose", label: "What you lose" },
        { id: "still", label: "Still broken?" },
        { id: "faq", label: "FAQ" },
      ]}
      related={[
        { href: CACHE_GUIDE_PATH, label: "How to clear cache on a Mac" },
        { href: SPOTIFY_CACHE_GUIDE_PATH, label: "How to clear Spotify cache on a Mac" },
        { href: CHROME_CACHE_GUIDE_PATH, label: "How to clear Chrome cache on a Mac" },
        { href: APP_CLEANER_PATH, label: "App cleaner for Mac" },
      ]}
      graph={graph}
      faqs={faqs}
      closing={
        <>
          See every app cache and leftover on your Mac in one scan. <Price /> once, with a {REFUND_DAYS}-day refund.
        </>
      }
    >
      <p>
        Microsoft has two versions of Teams for Mac, and they keep their cache in different places. Check which one
        you have before you start.
      </p>
      <GuideTable head={["Version", "Data folder", "Status"]} rows={versions} />
      <p>
        If your app icon says <strong>Microsoft Teams</strong> without &ldquo;classic&rdquo;, and you installed or
        updated it recently, you have new Teams. Microsoft has retired classic Teams, so most Macs only need the
        first set of steps.
      </p>

      <h2 id="quit">Step 1: Quit Teams completely</h2>
      <p>
        Closing the window leaves Teams running in the background, and it holds its cache files open. Quit it
        properly first.
      </p>
      <ol>
        <li>
          With Teams in front, press <strong>Command-Q</strong>, or right-click its icon in the Dock and choose{" "}
          <strong>Quit</strong>.
        </li>
        <li>
          Open <strong>Activity Monitor</strong>, search for <code>Teams</code> and quit any process still listed.
        </li>
      </ol>

      <h2 id="new">Step 2: Clear the cache for new Teams</h2>
      <p>New Teams is a sandboxed app, so all its local data sits in one container folder.</p>
      <ol>
        <li>
          In Finder, choose <strong>Go</strong>, then <strong>Go to Folder</strong>, and enter{" "}
          <code>~/Library/Containers/com.microsoft.teams2</code>.
        </li>
        <li>
          Move the whole <code>com.microsoft.teams2</code> folder to the Trash. If macOS won&rsquo;t let you, open it
          and trash the contents of <code>Data/Library/Caches</code> and{" "}
          <code>Data/Library/Application Support/Microsoft/MSTeams</code> instead.
        </li>
        <li>
          Also check <code>~/Library/Group Containers/UBF8T346G9.com.microsoft.teams</code>. If it exists, trashing it
          completes the reset. Leave the other <code>UBF8T346G9</code> folders alone, because Outlook, Word and
          other Microsoft apps share them.
        </li>
        <li>Open Teams again. It rebuilds its data and may ask you to sign in.</li>
      </ol>
      <h3>Prefer Terminal?</h3>
      <p>With Teams quit, this moves the new Teams container out of the way in one line:</p>
      <p>
        <code>mv ~/Library/Containers/com.microsoft.teams2 ~/.Trash/</code>
      </p>
      <h3>Is there a button in Teams?</h3>
      <p>
        Some Teams builds and company-managed setups offer a reset or repair option in Settings or in the help menu.
        It isn&rsquo;t available everywhere, and Microsoft moves it between releases. If you see one, it does the same
        job as the steps above. If not, the folder method always works.
      </p>

      <h2 id="classic">Clear the cache for classic Teams</h2>
      <p>
        Classic Teams has been retired, but its folder often lingers on Macs that upgraded. It can hold hundreds of
        megabytes you no longer need.
      </p>
      <ol>
        <li>Quit every Teams app.</li>
        <li>
          Go to <code>~/Library/Application Support/Microsoft/Teams</code> and move the folder to the Trash.
        </li>
        <li>
          If the old <strong>Microsoft Teams classic</strong> app is still in Applications, move it to the Trash too.
        </li>
      </ol>
      <p>
        Removing an app leaves other files behind in your Library. Our guide to{" "}
        <Link href={APP_CLEANER_PATH}>using an app cleaner on a Mac</Link> shows how to find all of them.
      </p>

      <AppCallout market={market} title="Find leftovers from old Teams and other apps">
        {APP_NAME} scans your Mac on the device and lists app caches and leftovers, plus large files and duplicates,
        each with its size and location. Everything you clear goes to the Trash, and Undo puts it back.
      </AppCallout>

      <h2 id="lose">What you lose when you clear the Teams cache</h2>
      <GuideTable head={["Item", "Lost?", "Notes"]} rows={lose} />
      <p>
        Before you start, note any custom backgrounds you uploaded. They live in the local data, so you may need to add
        them again. Everything tied to your account, such as chats, channel posts, meetings and files, comes back as
        soon as you sign in.
      </p>

      <h2 id="still">If Teams still doesn&rsquo;t work</h2>
      <ul>
        <li>
          Try Teams in a browser at <code>teams.microsoft.com</code>. If it works there, the problem is the Mac app;
          reinstall it from Microsoft.
        </li>
        <li>
          Update Teams. Choose the <strong>…</strong> menu in Teams, then <strong>Check for updates</strong>, or run
          Microsoft AutoUpdate.
        </li>
        <li>
          Check your Mac has free space. Teams, like most apps, misbehaves when the disk is nearly full. See{" "}
          <Link href={CACHE_GUIDE_PATH}>how to clear cache on a Mac</Link> for other caches worth clearing.
        </li>
        <li>If your Mac is managed by your employer, ask IT. They may block some of these folders.</li>
      </ul>
      <p>
        Other apps build caches the same way. If you also use Spotify, read{" "}
        <Link href={SPOTIFY_CACHE_GUIDE_PATH}>how to clear Spotify cache on a Mac</Link>. And if you use Teams in
        Chrome, <Link href={CHROME_CACHE_GUIDE_PATH}>how to clear Chrome cache on a Mac</Link> covers that side.
      </p>

      <h2>Clear app caches in one pass with {APP_NAME}</h2>
      <p>
        {APP_NAME} shows every app cache, large file and leftover on your Mac with its size, and clears what you choose
        to the Trash. It costs <Price /> once, with no subscription. Learn more on the <Link href="/">home page</Link>.
      </p>
    </GuideLayout>
  );
}
