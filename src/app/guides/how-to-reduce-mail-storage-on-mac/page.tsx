import Link from "next/link";
import { AppCallout, GuideLayout, GuideTable } from "@/components/guide-layout";
import { Price } from "@/components/price";
import { articleGraph, innerPageGraph, pageMetadata } from "@/lib/seo";
import {
  APP_NAME,
  CACHE_GUIDE_PATH,
  EMPTY_TRASH_GUIDE_PATH,
  GUIDE_PATH,
  MAIL_GUIDE_PATH,
  MESSAGES_GUIDE_PATH,
  REFUND_DAYS,
  SYSTEM_DATA_GUIDE_PATH,
} from "@/lib/site";

const market = "us" as const;
const path = MAIL_GUIDE_PATH;
const published = "2026-11-24";
const title = "How to reduce Mail storage on a Mac";
const description =
  "Apple Mail using gigabytes? Empty the Mail Downloads folder, erase deleted and junk mail, remove big messages and learn how IMAP and Gmail store mail.";

export const metadata = pageMetadata({
  title: "How to Reduce Mail Storage on Mac",
  description,
  path,
  type: "article",
});

const folders = [
  ["~/Library/Mail", "Your messages and attachments, per account", "Delete messages in Mail, not here"],
  [
    "~/Library/Containers/com.apple.mail/Data/Library/Mail Downloads",
    "Copies of attachments you opened",
    "Safe to empty while Mail is closed",
  ],
  ["~/Library/Containers/com.apple.mail/Data/Library/Caches", "Mail's cache", "Rebuilt by Mail; usually small"],
];

const faqs = [
  {
    q: "Why is Mail taking up so much space on my Mac?",
    a: "Mail keeps a local copy of your messages and their attachments so you can read them offline. Large accounts with years of attachments can reach many gigabytes. Each attachment you open also gets a copy in the Mail Downloads folder.",
  },
  {
    q: "Is it safe to delete the Mail Downloads folder?",
    a: "Yes. It holds copies of attachments you opened, and the originals are still in the messages. Quit Mail first, then delete the files inside the folder. Mail downloads an attachment again when you next open it.",
  },
  {
    q: "If I delete emails on my Mac, are they deleted from Gmail?",
    a: "With an IMAP account like Gmail, iCloud or Outlook, yes. Actions sync with the server, so deleting in Mail deletes or archives the message on the server too, depending on your account settings. Check Gmail's own Trash and All Mail if a message seems to linger.",
  },
  {
    q: "Can I stop Mail downloading attachments?",
    a: "On some macOS versions, Mail's account settings include a Download Attachments option with All, Recent or None. If yours doesn't show it, Mail decides for itself and downloads attachments when you view them.",
  },
  {
    q: "Does removing a Mail account free up space?",
    a: "Yes. Mail deletes the local copy of that account's mail. For an IMAP account the mail stays on the server. For a POP account, messages may exist only on your Mac, so back them up first.",
  },
  {
    q: "How do I find large emails in Apple Mail?",
    a: "Choose View, then Sort By, then Size, and Mail puts the biggest messages first. If you don't see a size column, choose View, then Use Column Layout, then add the Size column.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "Reduce Mail storage on Mac", description }),
  ...articleGraph({ path, headline: title, description, published, updated: published, language: "en", faqs }),
];

export default function MailStorageGuide() {
  return (
    <GuideLayout
      market={market}
      title={title}
      intro="Apple Mail keeps a local copy of your inbox, every attachment and every file you opened from it. Over a few years that can add up to many gigabytes. Here is where Mail stores it all and how to shrink it without losing mail you need."
      breadcrumb="Reduce Mail storage"
      updated={published}
      readMinutes={7}
      takeaways={[
        "The Mail Downloads folder holds copies of opened attachments and is safe to empty.",
        "Sort by size to find and delete the few messages that take the most space.",
        "Deleted and junk mail still uses space until you erase it.",
        "With IMAP accounts like Gmail, deleting on the Mac deletes on the server too.",
      ]}
      toc={[
        { id: "where", label: "Where Mail stores files" },
        { id: "reduce", label: "6 ways to reduce it" },
        { id: "imap", label: "IMAP and Gmail" },
        { id: "rebuild", label: "Rebuild mailboxes" },
        { id: "faq", label: "FAQ" },
      ]}
      related={[
        { href: MESSAGES_GUIDE_PATH, label: "How to clear Messages storage on a Mac" },
        { href: CACHE_GUIDE_PATH, label: "How to clear cache on a Mac" },
        { href: EMPTY_TRASH_GUIDE_PATH, label: "How to empty the Trash on a Mac" },
        { href: GUIDE_PATH, label: "How to free up space on a Mac" },
      ]}
      graph={graph}
      faqs={faqs}
      closing={
        <>
          Find the gigabytes Mail doesn&rsquo;t show you. <Price /> once, with a {REFUND_DAYS}-day refund.
        </>
      }
    >
      <h2 id="where">Where Apple Mail stores files on your Mac</h2>
      <p>
        Mail uses a few folders inside your Library. To open one, choose <strong>Go</strong>, then{" "}
        <strong>Go to Folder</strong> in Finder and paste the path.
      </p>
      <GuideTable head={["Folder", "What it holds", "What to do"]} rows={folders} />
      <p>
        Inside <code>~/Library/Mail</code> you&rsquo;ll see a folder named <code>V10</code> or similar, then one folder
        per account. Select <code>~/Library/Mail</code> and press <strong>Command-I</strong> to see how much Mail uses
        in total. If Finder says you don&rsquo;t have permission, that is macOS privacy protection. You don&rsquo;t need
        to change it to follow this guide.
      </p>
      <p>
        Never delete files inside <code>~/Library/Mail</code> by hand. Mail indexes them, and missing files lead to
        blank messages and repeated downloads.
      </p>

      <h2 id="reduce">6 ways to reduce Mail storage</h2>

      <h3>1. Empty the Mail Downloads folder</h3>
      <p>
        Every attachment you open from Mail is copied to <strong>Mail Downloads</strong>. Those copies stay long after
        you need them.
      </p>
      <ol>
        <li>Quit Mail.</li>
        <li>
          In Finder, choose <strong>Go</strong>, then <strong>Go to Folder</strong>, and enter{" "}
          <code>~/Library/Containers/com.apple.mail/Data/Library/Mail Downloads</code>.
        </li>
        <li>Select everything inside the folder and move it to the Trash. Leave the folder itself.</li>
      </ol>
      <p>
        If you edited an attachment and saved it in place, its only copy may be here. Move anything you changed to
        Documents first.
      </p>

      <h3>2. Delete the largest messages</h3>
      <ol>
        <li>Open a mailbox such as Inbox, Sent or Archive.</li>
        <li>
          Choose <strong>View</strong>, then <strong>Sort By</strong>, then <strong>Size</strong>. Sort descending so
          the biggest come first.
        </li>
        <li>Save any attachments you want to keep, then delete the messages.</li>
      </ol>
      <p>
        Don&rsquo;t forget Sent. Files you emailed to others are often the biggest items in an account. To search
        everything at once, select <strong>All Inboxes</strong> or use a search such as <code>attachment:pdf</code> in
        the search field.
      </p>

      <h3>3. Erase deleted items and junk</h3>
      <p>
        Deleted mail sits in Trash and junk sits in Junk, both using space until erased. Choose{" "}
        <strong>Mailbox</strong>, then <strong>Erase Deleted Items</strong>, then pick an account or{" "}
        <strong>In All Accounts</strong>. Then choose <strong>Mailbox</strong>, then <strong>Erase Junk Mail</strong>.
      </p>
      <p>
        To do this automatically, open <strong>Mail</strong>, then <strong>Settings</strong>, then{" "}
        <strong>Accounts</strong>, select an account and open <strong>Mailbox Behaviors</strong>. Set{" "}
        <strong>Erase deleted messages</strong> and <strong>Erase junk messages</strong> to a period such as{" "}
        <strong>After one week</strong>. Options vary by account type.
      </p>

      <h3>4. Change how attachments download</h3>
      <p>
        On some macOS versions, <strong>Mail</strong>, then <strong>Settings</strong>, then <strong>Accounts</strong>,
        then <strong>Account Information</strong> shows a <strong>Download Attachments</strong> menu. Choose{" "}
        <strong>Recent</strong> or <strong>None</strong> to keep older attachments on the server until you open them.
        Recent versions of Mail often hide this option and manage downloads themselves.
      </p>

      <h3>5. Remove accounts you no longer use</h3>
      <p>
        An old work or school account can hold gigabytes of mail you&rsquo;ll never read. Open{" "}
        <strong>System Settings</strong>, then <strong>Internet Accounts</strong>, select the account and turn off{" "}
        <strong>Mail</strong>, or remove the account. Mail deletes its local copy. IMAP mail stays on the server; POP
        mail may not, so export it first with <strong>Mailbox</strong>, then <strong>Export Mailbox</strong>.
      </p>

      <h3>6. Archive old mail outside Mail</h3>
      <p>
        If you must keep years of mail but don&rsquo;t need it on this Mac, export the mailboxes to an external drive with{" "}
        <strong>Export Mailbox</strong>, check the export opens, then delete them in Mail. You can import them later
        with <strong>File</strong>, then <strong>Import Mailboxes</strong>.
      </p>

      <AppCallout market={market} title="Mail is one app. Your disk has more.">
        {APP_NAME} scans your Mac on the device and lists caches, large files, duplicates, app leftovers, old installers
        and iPhone backups with their sizes. Everything you clear goes to the Trash, and Undo puts it back.
      </AppCallout>

      <h2 id="imap">How IMAP accounts and Gmail behave</h2>
      <p>
        Most accounts today use IMAP: iCloud, Gmail, Outlook.com, Yahoo and most work mail. Mail keeps a local copy,
        and every action syncs with the server.
      </p>
      <ul>
        <li>
          <strong>Deleting syncs.</strong> A message you delete on the Mac is deleted on the server and every other
          device.
        </li>
        <li>
          <strong>Gmail is different.</strong> Gmail uses labels, so one message can show in several folders. Mail may
          download an extra copy for each label, especially <strong>All Mail</strong>. Deleting from Inbox may only
          remove a label, and the message stays in All Mail.
        </li>
        <li>
          <strong>Server storage isn&rsquo;t Mac storage.</strong> Clearing your Mac&rsquo;s copy doesn&rsquo;t help a
          full Gmail or iCloud quota, and vice versa.
        </li>
      </ul>
      <p>
        If you want the mail to stay on the server but not on your Mac, use the web version of the service for that
        account and turn Mail off for it in Internet Accounts.
      </p>

      <h2 id="rebuild">Rebuild mailboxes to tidy up</h2>
      <p>
        If Mail still uses a lot of space after you delete messages, or shows messages that won&rsquo;t open, rebuild the
        mailbox. Select it in the sidebar and choose <strong>Mailbox</strong>, then <strong>Rebuild</strong>. For IMAP
        accounts, Mail deletes its local copy and downloads the mailbox again, which can take a while for big
        accounts. Rebuilding fixes index problems but doesn&rsquo;t usually free much space on its own.
      </p>

      <h2>Stop newsletters and notifications piling up</h2>
      <p>
        Newsletters, receipts and app notifications are small one by one, but thousands of them add up, especially
        those full of images. Two built-in tools deal with them:
      </p>
      <ul>
        <li>
          <strong>Search by sender.</strong> Type a sender&rsquo;s address in the search field, press{" "}
          <strong>Command-A</strong> to select every result and delete them in one go.
        </li>
        <li>
          <strong>Rules.</strong> Choose <strong>Mail</strong>, then <strong>Settings</strong>, then{" "}
          <strong>Rules</strong>, and click <strong>Add Rule</strong>. For example, move messages from a shop&rsquo;s
          address to Trash, or to a folder you clear monthly. Rules run on your Mac when Mail is open, so for an
          account you also read on your phone, the provider&rsquo;s own web filters may work better.
        </li>
        <li>
          <strong>Unsubscribe.</strong> Mail shows an <strong>Unsubscribe</strong> banner on many mailing-list
          messages. One click stops future mail, which is the only fix that lasts.
        </li>
      </ul>
      <h3>Big attachments you send</h3>
      <p>
        When you send a large file, Mail can offer <strong>Mail Drop</strong>, which uploads it to iCloud and sends a
        link instead. The copy in your Sent mailbox then holds a link, not the file, which keeps Sent much smaller.
      </p>

      <h2>Mail and System Data</h2>
      <p>
        Some of Mail&rsquo;s files are counted as System Data or Documents rather than under Mail in Storage settings.
        If those grey bars are large, read <Link href={SYSTEM_DATA_GUIDE_PATH}>how to reduce System Data on a Mac</Link>.
        Messages has a similar problem with attachments, covered in{" "}
        <Link href={MESSAGES_GUIDE_PATH}>how to clear Messages storage on a Mac</Link>.
      </p>
      <p>
        When you&rsquo;re done, empty the Finder Trash so the space comes back. If it won&rsquo;t empty, see{" "}
        <Link href={EMPTY_TRASH_GUIDE_PATH}>how to empty the Trash on a Mac</Link>.
      </p>

      <h2>Free up the rest of your Mac with {APP_NAME}</h2>
      <p>
        {APP_NAME} scans your whole Mac on the device, lists what takes up space and clears it to the Trash. It costs{" "}
        <Price /> once, with no subscription. For more ideas, read{" "}
        <Link href={GUIDE_PATH}>how to free up space on a Mac</Link>.
      </p>
    </GuideLayout>
  );
}
