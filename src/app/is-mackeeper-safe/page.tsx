import Link from "next/link";
import { AppCallout, GuideLayout, GuideTable } from "@/components/guide-layout";
import { Price } from "@/components/price";
import { articleGraph, innerPageGraph, pageMetadata } from "@/lib/seo";
import {
  APP_CLEANER_PATH,
  APP_NAME,
  BEST_CLEANER_PATH,
  CLEAR_RAM_GUIDE_PATH,
  GUIDE_PATH,
  IS_CLEANMYMAC_SAFE_PATH,
  IS_MACKEEPER_SAFE_PATH,
  REFUND_DAYS,
  SPEED_UP_GUIDE_PATH,
} from "@/lib/site";

const market = "us" as const;
const path = IS_MACKEEPER_SAFE_PATH;
const published = "2026-11-24";
const title = "Is MacKeeper safe? Its history, what it does now and how to remove it";
const description =
  "Is MacKeeper safe? A fair look at its past controversies, what the app does today, the free macOS tools that do the same jobs and how to fully uninstall it.";

export const metadata = pageMetadata({
  title: "Is MacKeeper Safe? A Fair, Updated Look",
  description,
  path,
  type: "article",
});

const history = [
  ["Around 2010", "MacKeeper launches as an all-in-one Mac utility suite", "Original developer Zeobit"],
  ["2013", "Kromtech takes over the product", "As widely reported at the time"],
  ["2015, settlement", "Zeobit settles a US class action over the app’s claims", "Reported as about $2 million, without admitting wrongdoing"],
  ["Late 2015", "A misconfigured database exposes customer records", "Reported as about 13 million accounts"],
  ["Later years", "The brand moves under Clario Tech", "Per the company’s own materials"],
];

const builtIn = [
  ["Free up disk space", "Storage settings", "System Settings > General > Storage"],
  ["Malware protection", "XProtect and Gatekeeper", "Built in, updated automatically"],
  ["Uninstall apps", "Finder or Launchpad", "Leftovers need a manual check"],
  ["Memory and speed", "Activity Monitor", "Applications > Utilities"],
  ["Find duplicates", "Smart Folders and Photos", "Photos merges duplicate photos"],
  ["VPN and ad blocking", "iCloud Private Relay, Safari", "Private Relay needs iCloud+"],
];

const faqs = [
  {
    q: "Is MacKeeper a virus?",
    a: "No. MacKeeper is a commercial app, not a virus. Its bad reputation comes from past marketing practices, a 2015 class-action settlement and a 2015 data exposure, as widely reported at the time.",
  },
  {
    q: "Is MacKeeper still a scam?",
    a: "Calling it a scam goes too far. It is a paid utility suite that does what it lists. The fair question is whether you need it, since macOS includes free tools for most of the same jobs.",
  },
  {
    q: "Why did MacKeeper have such a bad reputation?",
    a: "Mainly aggressive advertising, including pop-ups and pop-under ads, and scans that critics said overstated problems to push sales. A 2015 US class action over those claims was settled. Some security vendors also flagged it as a potentially unwanted program.",
  },
  {
    q: "How do I completely remove MacKeeper?",
    a: "Quit it and its menu bar helper, cancel any subscription, move the app to the Trash, then remove its login items and leftover folders in ~/Library. The steps are in the uninstall section of this page.",
  },
  {
    q: "Does MacKeeper slow down a Mac?",
    a: "Any suite with background helpers uses some memory and CPU. Whether you notice depends on your Mac. If your Mac felt faster after removing it, the background helpers were likely the reason.",
  },
  {
    q: "What are safe alternatives to MacKeeper?",
    a: "macOS covers malware protection and basic storage management for free. For deeper disk cleanup, use a single-purpose tool from an established developer that shows every file before it removes anything.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "Is MacKeeper safe?", description }),
  ...articleGraph({ path, headline: title, description, published, updated: published, language: "en", faqs }),
];

export default function IsMacKeeperSafe() {
  return (
    <GuideLayout
      market={market}
      title={title}
      intro="MacKeeper is one of the most searched Mac apps, and one of the most argued about. It isn’t a virus, but its history explains why people are wary. Here is what happened, what the app does now, and whether you need it at all."
      breadcrumb="Is MacKeeper safe?"
      updated={published}
      readMinutes={8}
      takeaways={[
        "MacKeeper is a commercial app, not malware.",
        "Its reputation suffered from past marketing, a 2015 settlement and a 2015 data exposure.",
        "macOS already includes free tools for most of what it offers.",
        "If you remove it, also clear its login items and leftover files.",
      ]}
      toc={[
        { id: "short", label: "Short answer" },
        { id: "history", label: "Its history" },
        { id: "today", label: "What it does now" },
        { id: "builtin", label: "Free alternatives" },
        { id: "uninstall", label: "Uninstall it" },
        { id: "faq", label: "FAQ" },
      ]}
      related={[
        { href: IS_CLEANMYMAC_SAFE_PATH, label: "Is CleanMyMac safe?" },
        { href: BEST_CLEANER_PATH, label: "How to choose the best Mac cleaner app" },
        { href: APP_CLEANER_PATH, label: "App cleaner for Mac" },
        { href: SPEED_UP_GUIDE_PATH, label: "How to speed up a slow Mac" },
      ]}
      graph={graph}
      faqs={faqs}
      closing={
        <>
          One job, done in the open: free up disk space and undo any cleanup. <Price /> once, with a {REFUND_DAYS}-day
          refund.
        </>
      }
    >
      <h2 id="short">The short answer</h2>
      <p>
        MacKeeper is legitimate, paid software. It isn’t malware, and installing it won’t infect your Mac. The reasons
        people ask are its past: years of aggressive advertising, a settled US class action over its claims and a large
        customer data exposure, all widely reported in 2015.
      </p>
      <p>
        The more useful question is whether you need it. Most of what MacKeeper offers, macOS does for free, and the
        rest is available from single-purpose tools you can judge more easily.
      </p>

      <h2 id="history">MacKeeper’s history, briefly</h2>
      <p>
        The timeline below is based on public reporting. Company structures and dates can be described differently
        depending on the source, so treat it as an outline rather than a legal record.
      </p>
      <GuideTable head={["When", "What happened", "Note"]} rows={history} />
      <h3>The marketing problem</h3>
      <p>
        For years, MacKeeper was known for pop-up and pop-under ads that many people found intrusive, and for scans that
        critics said exaggerated how many problems a Mac had. Some security companies classed it as a potentially
        unwanted program, a label for software that is legal but pushed in ways users often don’t expect.
      </p>
      <h3>The 2015 class action</h3>
      <p>
        In 2015, Zeobit agreed to settle a US class action alleging that MacKeeper misrepresented the problems it found
        in order to sell the full version. The settlement was reported as about $2 million, and, as is common with such
        settlements, it was reached without an admission of wrongdoing. Eligible buyers could claim refunds.
      </p>
      <h3>The 2015 data exposure</h3>
      <p>
        Late in 2015, a security researcher reported that a MacKeeper database had been left publicly accessible. It was
        reported to contain records for around 13 million accounts, including names, email addresses and hashed
        passwords. The company said it secured the database after being notified.
      </p>

      <h2 id="today">What MacKeeper does today</h2>
      <p>
        MacKeeper is sold by subscription and has been reorganized over the years. Its feature list has included
        storage cleanup, duplicate finding, an app uninstaller, antivirus, a VPN, an ad blocker, memory cleaning and
        identity theft monitoring. Features and plans change, so check the current product page.
      </p>
      <h3>What’s worth knowing before you install it</h3>
      <ul>
        <li>
          <strong>It is a suite.</strong> You pay for many tools. If you only need one, that is poor value.
        </li>
        <li>
          <strong>It runs background helpers.</strong> Like most suites, it keeps components running for monitoring.
          You can see them in <strong>System Settings</strong> under <strong>General</strong>, then{" "}
          <strong>Login Items &amp; Extensions</strong>.
        </li>
        <li>
          <strong>Memory cleaning rarely helps.</strong> macOS uses spare memory as a cache on purpose. Our guide on{" "}
          <Link href={CLEAR_RAM_GUIDE_PATH}>how to clear RAM on a Mac</Link> explains why.
        </li>
        <li>
          <strong>Check the billing terms.</strong> Know what the first payment covers and what the renewal costs.
        </li>
      </ul>

      <h2 id="builtin">Free macOS tools that do the same jobs</h2>
      <p>Before you pay for a suite, see what your Mac already has.</p>
      <GuideTable head={["Job", "Built-in tool", "Where"]} rows={builtIn} />
      <p>
        macOS includes XProtect, which detects and removes known malware, and Gatekeeper, which checks apps before they
        open. For storage, Storage settings shows categories and recommendations, and our guide on{" "}
        <Link href={GUIDE_PATH}>how to free up space on a Mac</Link> covers the rest by hand. If your Mac feels slow, see{" "}
        <Link href={SPEED_UP_GUIDE_PATH}>how to speed up a slow Mac</Link> before you buy anything.
      </p>

      <AppCallout market={market} title="Need disk space back, not a suite?">
        {APP_NAME} does one job: it scans your Mac on the device and lists caches, large files, duplicates, app
        leftovers, iPhone backups and old installers for you to review. Cleared files go to the Trash and Undo puts them
        back. It doesn’t do antivirus or VPN, and there’s no subscription.
      </AppCallout>

      <h2>If you see MacKeeper pop-ups you didn’t ask for</h2>
      <p>
        Ads and pop-ups that claim your Mac is infected or full of junk don’t come from macOS. Whatever product they
        promote, treat them the same way:
      </p>
      <ol>
        <li>Close the tab or window. Don’t click buttons inside the pop-up, including “Cancel”.</li>
        <li>
          If a browser keeps opening such pages, review its extensions and remove any you don’t recognize.
        </li>
        <li>
          In <strong>Safari</strong> settings, under <strong>Websites</strong>, check which sites may send notifications
          and remove the ones you don’t know. Chrome has the same list under its site settings.
        </li>
        <li>
          Check <strong>Login Items &amp; Extensions</strong> in System Settings for apps you didn’t install.
        </li>
        <li>
          Never install software from a pop-up. If you want an app, go to its official site or the Mac App Store yourself.
        </li>
      </ol>
      <p>
        macOS doesn’t show warnings about your disk in a web browser. Real storage warnings come from the system itself,
        usually as a notification that your startup disk is almost full.
      </p>

      <h2 id="uninstall">How to uninstall MacKeeper completely</h2>
      <p>
        Moving the app to the Trash isn’t enough on its own, because helpers and settings stay behind. Check MacKeeper’s
        own uninstall instructions for your version, then work through these steps.
      </p>
      <ol>
        <li>
          <strong>Cancel the subscription first.</strong> Deleting the app doesn’t stop billing. Use your MacKeeper
          account, or your Apple Account subscriptions if you bought through the App Store.
        </li>
        <li>
          <strong>Quit the app and its menu bar icon.</strong> If a process won’t quit, find it in Activity Monitor and
          stop it.
        </li>
        <li>
          <strong>Move MacKeeper to the Trash</strong> from the Applications folder. Enter your password if asked.
        </li>
        <li>
          <strong>Remove login and background items.</strong> Open <strong>System Settings</strong>, then{" "}
          <strong>General</strong>, then <strong>Login Items &amp; Extensions</strong>, and remove any remaining
          MacKeeper or Clario entries.
        </li>
        <li>
          <strong>Delete leftover files.</strong> In Finder, choose <strong>Go</strong>, then <strong>Go to Folder</strong>,
          and check <code>~/Library/Application Support</code>, <code>~/Library/Caches</code>,{" "}
          <code>~/Library/Preferences</code> and <code>~/Library/LaunchAgents</code> for items with MacKeeper in the
          name. Check <code>/Library/LaunchDaemons</code> too.
        </li>
        <li>
          <strong>Remove browser extensions</strong> it may have added, in each browser’s extension settings.
        </li>
        <li>
          <strong>Revoke permissions.</strong> In <strong>Privacy &amp; Security</strong>, remove it from Full Disk
          Access and any other lists it appears in. If it installed a VPN profile, remove it under{" "}
          <strong>VPN</strong> in System Settings.
        </li>
        <li>Restart your Mac.</li>
      </ol>
      <p>
        An uninstaller tool finds most leftovers automatically. Our{" "}
        <Link href={APP_CLEANER_PATH}>guide to app cleaners for Mac</Link> explains how they work.
      </p>

      <h2>How to judge any Mac cleaner</h2>
      <ul>
        <li>Does it show every file before it removes anything?</li>
        <li>Does it move files to the Trash, so you can undo a mistake?</li>
        <li>Does it scan on your Mac, without uploading your file list?</li>
        <li>Is the price clear before the scan, including renewals?</li>
        <li>Does it avoid alarming pop-ups and inflated “issues found” counts?</li>
      </ul>
      <p>
        Those questions apply to every app, including ours. Our{" "}
        <Link href={BEST_CLEANER_PATH}>buyer’s guide to Mac cleaner apps</Link> goes through them in detail, and our
        page on <Link href={IS_CLEANMYMAC_SAFE_PATH}>whether CleanMyMac is safe</Link> applies them to another
        well-known option.
      </p>
    </GuideLayout>
  );
}
