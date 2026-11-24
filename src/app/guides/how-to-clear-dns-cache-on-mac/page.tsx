import Link from "next/link";
import { AppCallout, GuideLayout, GuideTable } from "@/components/guide-layout";
import { Price } from "@/components/price";
import { articleGraph, innerPageGraph, pageMetadata } from "@/lib/seo";
import {
  APP_NAME,
  CACHE_GUIDE_PATH,
  CHROME_CACHE_GUIDE_PATH,
  DNS_CACHE_GUIDE_PATH,
  FIREFOX_CACHE_GUIDE_PATH,
  REFUND_DAYS,
  SAFARI_CACHE_GUIDE_PATH,
} from "@/lib/site";

const market = "us" as const;
const path = DNS_CACHE_GUIDE_PATH;
const published = "2026-11-24";
const title = "How to flush the DNS cache on a Mac, and when it actually helps";
const description =
  "Flush the DNS cache on a Mac with one Terminal command, clear browser DNS caches too, and check it worked. Plus why flushing DNS doesn't free any disk space.";

export const metadata = pageMetadata({
  title: "How to Flush DNS Cache on Mac",
  description,
  path,
  type: "article",
});

const signs = [
  ["A site moved to a new server", "Your Mac still has the old address", "Flush DNS"],
  ["You changed DNS servers", "Old answers are still cached", "Flush DNS"],
  ["You edited /etc/hosts", "macOS may keep the previous answer", "Flush DNS"],
  ["A site shows old pages or styles", "Stale files in the browser cache", "Clear the browser cache instead"],
  ["Every site fails", "Wi-Fi, router or DNS server problem", "Check your network first"],
];

const faqs = [
  {
    q: "What is the command to flush DNS on a Mac?",
    a: "Open Terminal and run sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder, then enter your Mac password. It works on all recent versions of macOS and prints nothing when it succeeds.",
  },
  {
    q: "Is it safe to flush the DNS cache?",
    a: "Yes. The DNS cache only holds website addresses your Mac looked up recently. Flushing it makes your Mac ask again, which takes a few milliseconds per site, and nothing else changes.",
  },
  {
    q: "Does flushing DNS free up storage space?",
    a: "No. The DNS cache lives in memory and is tiny. Flushing it doesn't free any disk space. To free space, clear browser and app caches on disk instead.",
  },
  {
    q: "Does restarting a Mac clear the DNS cache?",
    a: "Yes. The cache lives in memory, so a restart empties it. The Terminal command does the same thing without closing your apps.",
  },
  {
    q: "Why did nothing happen when I ran the command?",
    a: "That is normal. The command prints no message when it works. If you see 'No matching processes' or a permission error, check that you typed sudo and the full command, and that you entered your password.",
  },
  {
    q: "Do I need to flush the DNS cache in my browser too?",
    a: "Sometimes. Chrome and some other browsers keep their own DNS cache. In Chrome, open chrome://net-internals/#dns and click Clear host cache. Restarting the browser also clears it.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "Flush DNS cache on Mac", description }),
  ...articleGraph({ path, headline: title, description, published, updated: published, language: "en", faqs }),
];

export default function DnsCacheGuide() {
  return (
    <GuideLayout
      market={market}
      title={title}
      intro="A website moved, you changed DNS settings or you edited your hosts file, and your Mac still goes to the old place. Flushing the DNS cache fixes that in seconds. Here is the command, how to check it worked and when it is the wrong fix."
      breadcrumb="Flush DNS cache"
      updated={published}
      readMinutes={6}
      takeaways={[
        "One Terminal command flushes the DNS cache on any recent version of macOS.",
        "Chrome keeps its own DNS cache, which you clear separately.",
        "Flushing DNS fixes wrong addresses, not stale page content.",
        "It frees no disk space. Clear disk caches for that.",
      ]}
      toc={[
        { id: "what", label: "What it is" },
        { id: "flush", label: "Flush it" },
        { id: "browsers", label: "Browser caches" },
        { id: "check", label: "Check it worked" },
        { id: "when", label: "When to flush" },
        { id: "faq", label: "FAQ" },
      ]}
      related={[
        { href: CACHE_GUIDE_PATH, label: "How to clear cache on a Mac" },
        { href: CHROME_CACHE_GUIDE_PATH, label: "How to clear Chrome cache on a Mac" },
        { href: SAFARI_CACHE_GUIDE_PATH, label: "How to clear Safari cache on a Mac" },
        { href: FIREFOX_CACHE_GUIDE_PATH, label: "How to clear Firefox cache on a Mac" },
      ]}
      graph={graph}
      faqs={faqs}
      closing={
        <>
          Need disk space, not a DNS fix? See every cache on your Mac in one scan. <Price /> once, with a{" "}
          {REFUND_DAYS}-day refund.
        </>
      }
    >
      <h2 id="what">What the DNS cache on a Mac is</h2>
      <p>
        Every website has a name, like <code>example.com</code>, and a numeric address that computers use. DNS turns
        the name into the address. To save time, macOS remembers each answer for a while. That memory is the DNS
        cache.
      </p>
      <p>
        On macOS, a background process called <code>mDNSResponder</code> keeps this cache in memory. Each answer
        carries a time limit set by the website&rsquo;s owner, from a few seconds to a day or more. Until that limit
        runs out, your Mac keeps using the cached address, even if the site has moved.
      </p>
      <p>
        Because the cache lives in memory and holds only short text records, it is tiny. Flushing it doesn&rsquo;t free
        disk space. If you are here because your Mac is full, our guide on{" "}
        <Link href={CACHE_GUIDE_PATH}>how to clear cache on a Mac</Link> covers the caches that do take up space.
      </p>

      <h2 id="flush">How to flush the DNS cache on a Mac</h2>
      <p>This command works on all recent versions of macOS, including the current one.</p>
      <ol>
        <li>
          Open <strong>Terminal</strong> from <code>/Applications/Utilities</code>, or press{" "}
          <strong>Command-Space</strong> and type Terminal.
        </li>
        <li>
          Paste this line and press Return:
          <br />
          <code>sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder</code>
        </li>
        <li>
          Enter your Mac password when asked. Nothing appears as you type, which is normal. Press Return.
        </li>
      </ol>
      <p>
        The command prints nothing when it succeeds. The first part clears the directory service cache. The second
        tells <code>mDNSResponder</code> to drop its cached answers. Running both covers every macOS version Apple
        currently supports.
      </p>
      <h3>The no-Terminal way</h3>
      <p>
        Restart your Mac. The DNS cache lives in memory, so a restart empties it. Turning Wi-Fi off and on clears some
        cached answers too, but not reliably, so use the command or a restart.
      </p>

      <h2 id="browsers">Clear the DNS cache in your browser</h2>
      <p>
        Some browsers keep their own short DNS cache on top of the one in macOS. If a site still goes to the old
        address after you flush, clear the browser&rsquo;s too.
      </p>
      <ul>
        <li>
          <strong>Chrome, Edge and Brave:</strong> open <code>chrome://net-internals/#dns</code> (or{" "}
          <code>edge://net-internals/#dns</code> in Edge) and click <strong>Clear host cache</strong>. Then open{" "}
          <code>chrome://net-internals/#sockets</code> and click <strong>Flush socket pools</strong> to drop open
          connections.
        </li>
        <li>
          <strong>Firefox:</strong> open <code>about:networking#dns</code> and click <strong>Clear DNS Cache</strong>.
        </li>
        <li>
          <strong>Safari:</strong> it uses the macOS cache, so the Terminal command is enough. Quit and reopen Safari to
          close old connections.
        </li>
      </ul>
      <p>
        Quitting and reopening any browser also clears its own DNS cache. If the page loads but looks out of date,
        the problem is the browser&rsquo;s file cache, not DNS. See{" "}
        <Link href={CHROME_CACHE_GUIDE_PATH}>how to clear Chrome cache on a Mac</Link> or{" "}
        <Link href={SAFARI_CACHE_GUIDE_PATH}>how to clear Safari cache on a Mac</Link>.
      </p>

      <AppCallout market={market} title="Clear the caches that actually use disk space">
        DNS takes no room on your disk, but browser and app caches can take gigabytes. {APP_NAME} scans your Mac on
        the device and lists those caches, plus large files, duplicates and app leftovers, with their sizes. Everything
        you clear goes to the Trash, and Undo puts it back.
      </AppCallout>

      <h2 id="check">Check that the flush worked</h2>
      <p>Ask for the address of the site and compare it with the one you expect.</p>
      <ul>
        <li>
          <code>dig example.com +short</code> asks your DNS server directly and prints the address it returns.
        </li>
        <li>
          <code>nslookup example.com</code> does the same with a little more detail.
        </li>
        <li>
          <code>dscacheutil -q host -a name example.com</code> shows what macOS itself resolves, including entries
          from your hosts file.
        </li>
      </ul>
      <p>
        Note that <code>dig</code> and <code>nslookup</code> query the DNS server and skip the macOS cache. If they
        show the new address but your browser still goes to the old one, flush again and restart the browser. If they
        show the old address too, the change hasn&rsquo;t reached your DNS server yet, and flushing your Mac
        won&rsquo;t help. Wait, or switch to another DNS server in{" "}
        <strong>System Settings</strong>, then <strong>Network</strong>, then your connection, then{" "}
        <strong>Details</strong>, then <strong>DNS</strong>.
      </p>

      <h2 id="when">When flushing DNS helps, and when it doesn&rsquo;t</h2>
      <GuideTable head={["Symptom", "Likely cause", "What to do"]} rows={signs} />
      <p>
        Flushing is quick and harmless, so it is fine to try when in doubt. It just isn&rsquo;t a speed boost.
        Your Mac rebuilds the cache as you browse, and the first visit to each site takes a moment longer.
      </p>
      <h3>Developers and the hosts file</h3>
      <p>
        If you edit <code>/etc/hosts</code> to point a domain at a local server, flush the DNS cache after each change.
        Browsers that use secure DNS, also called DNS over HTTPS, may ignore your hosts file altogether. Turn that
        setting off in the browser while you test.
      </p>

      <h2>Free up real space with {APP_NAME}</h2>
      <p>
        If your Mac is slow because the disk is nearly full, flushing DNS won&rsquo;t change that. {APP_NAME} shows what
        fills your disk, from caches to forgotten downloads, and clears what you choose to the Trash. It costs{" "}
        <Price /> once, with no subscription. Learn more on the <Link href="/">home page</Link>.
      </p>
    </GuideLayout>
  );
}
