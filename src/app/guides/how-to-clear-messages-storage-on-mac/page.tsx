import Link from "next/link";
import { AppCallout, GuideLayout, GuideTable } from "@/components/guide-layout";
import { Price } from "@/components/price";
import { articleGraph, innerPageGraph, pageMetadata } from "@/lib/seo";
import {
  APP_NAME,
  GUIDE_PATH,
  IPHONE_BACKUPS_GUIDE_PATH,
  MAIL_GUIDE_PATH,
  MESSAGES_GUIDE_PATH,
  PHOTOS_GUIDE_PATH,
  REFUND_DAYS,
  SYSTEM_DATA_GUIDE_PATH,
} from "@/lib/site";

const market = "us" as const;
const path = MESSAGES_GUIDE_PATH;
const published = "2026-11-24";
const title = "How to clear Messages storage on a Mac";
const description =
  "Messages using gigabytes on your Mac? Delete big attachments, set Keep Messages to 1 year and understand what Messages in iCloud does when you delete.";

export const metadata = pageMetadata({
  title: "How to Clear Messages Storage on Mac",
  description,
  path,
  type: "article",
});

const options = [
  ["Storage settings review", "Biggest attachments across all chats", "Fastest way to free a lot at once"],
  ["Keep Messages: 1 Year or 30 Days", "Every message and attachment older than that", "Automatic from then on"],
  ["Delete in a conversation's info", "Photos and files in one chat", "Clearing a single busy group"],
  ["Delete a whole conversation", "All of its messages and attachments", "Chats you no longer need"],
];

const faqs = [
  {
    q: "Why is Messages taking up so much space on my Mac?",
    a: "Every photo, video, voice note and file sent to you is stored on the Mac. With Messages in iCloud on, your Mac can also download attachments from conversations you had on your iPhone. Group chats with lots of videos grow fastest.",
  },
  {
    q: "If I delete messages on my Mac, will they delete on my iPhone?",
    a: "Yes, if Messages in iCloud is on for both devices. Deletions sync, so the message or attachment disappears everywhere. If Messages in iCloud is off, deleting on the Mac only affects the Mac.",
  },
  {
    q: "Can I delete the Attachments folder in ~/Library/Messages?",
    a: "You can, but it's better not to. Messages keeps a database that still points to those files, so the chats show broken placeholders. Deleting attachments from inside Messages or Storage settings removes both the file and the reference.",
  },
  {
    q: "Where are iMessage attachments stored on a Mac?",
    a: "In ~/Library/Messages/Attachments, inside many numbered subfolders. Finder may ask you to give it access first. The size of that folder is a good measure of how much space Messages uses.",
  },
  {
    q: "Will Keep Messages for 1 Year delete my photos?",
    a: "It deletes messages older than a year, including their attachments. Photos you saved to the Photos app are not affected. Save anything you want to keep before you change the setting.",
  },
];

const graph = [
  ...innerPageGraph({ path, name: "Clear Messages storage on Mac", description }),
  ...articleGraph({ path, headline: title, description, published, updated: published, language: "en", faqs }),
];

export default function MessagesStorageGuide() {
  return (
    <GuideLayout
      market={market}
      title={title}
      intro="Years of photos, videos and voice notes in iMessage can quietly fill tens of gigabytes. Here is how to see how much space Messages uses, clear the biggest attachments and stop it growing again, without losing chats you care about."
      breadcrumb="Clear Messages storage"
      updated={published}
      readMinutes={7}
      takeaways={[
        "Storage settings lists your biggest Messages attachments so you can delete them in one go.",
        "Keep Messages set to 1 Year clears old messages and attachments automatically.",
        "With Messages in iCloud on, anything you delete disappears on every device.",
        "Delete attachments inside Messages, not by emptying the Attachments folder in Finder.",
      ]}
      toc={[
        { id: "check", label: "Check its size" },
        { id: "clear", label: "4 ways to clear it" },
        { id: "icloud", label: "Messages in iCloud" },
        { id: "folder", label: "The Attachments folder" },
        { id: "faq", label: "FAQ" },
      ]}
      related={[
        { href: PHOTOS_GUIDE_PATH, label: "How to reduce your Photos library size" },
        { href: MAIL_GUIDE_PATH, label: "How to reduce Mail storage on a Mac" },
        { href: IPHONE_BACKUPS_GUIDE_PATH, label: "How to delete iPhone backups on a Mac" },
        { href: GUIDE_PATH, label: "How to free up space on a Mac" },
      ]}
      graph={graph}
      faqs={faqs}
      closing={
        <>
          See every big file on your Mac, not just in Messages. <Price /> once, with a {REFUND_DAYS}-day refund.
        </>
      }
    >
      <h2 id="check">How much space is Messages using?</h2>
      <ol>
        <li>
          Open <strong>System Settings</strong>, then <strong>General</strong>, then <strong>Storage</strong>.
        </li>
        <li>
          Wait for the categories to load, then find <strong>Messages</strong> in the list.
        </li>
        <li>The figure next to it is the space taken by messages and their attachments.</li>
      </ol>
      <p>
        For a second opinion, open Finder, choose <strong>Go</strong>, then <strong>Go to Folder</strong>, and enter{" "}
        <code>~/Library/Messages</code>. Select the <strong>Attachments</strong> folder and press{" "}
        <strong>Command-I</strong>. Attachments are almost always most of the total.
      </p>

      <h2 id="clear">4 ways to clear Messages storage on a Mac</h2>
      <GuideTable head={["Method", "What it removes", "Best for"]} rows={options} />

      <h3>1. Review attachments in Storage settings</h3>
      <p>This is the quickest way to clear a lot of space, because it lists every attachment by size.</p>
      <ol>
        <li>
          In <strong>System Settings</strong>, <strong>General</strong>, <strong>Storage</strong>, click the info
          button next to <strong>Messages</strong>.
        </li>
        <li>
          You&rsquo;ll see a list of attachments with their sizes and dates. Click the <strong>Size</strong> column to
          put the biggest first.
        </li>
        <li>
          Select the items you don&rsquo;t need. Hold <strong>Command</strong> to select several.
        </li>
        <li>
          Click <strong>Delete</strong> and confirm.
        </li>
      </ol>
      <p>
        Videos and screen recordings usually top the list. Before you delete a photo or video you want to keep, open
        the conversation in Messages, Control-click the attachment and choose <strong>Save to Photos</strong> or{" "}
        <strong>Save to Downloads</strong>.
      </p>

      <h3>2. Keep messages for 1 year or 30 days</h3>
      <p>By default, Messages keeps everything forever. Changing that stops the problem from coming back.</p>
      <ol>
        <li>
          Open Messages and choose <strong>Messages</strong>, then <strong>Settings</strong>, then{" "}
          <strong>General</strong>.
        </li>
        <li>
          Set <strong>Keep messages</strong> to <strong>1 Year</strong> or <strong>30 Days</strong>.
        </li>
        <li>Confirm when Messages warns that older messages will be deleted.</li>
      </ol>
      <p>
        Messages deletes everything older than the limit straight away, and keeps doing so from then on. This cannot
        be undone, so export or save anything important first. With Messages in iCloud on, the setting and its
        deletions apply across your devices.
      </p>

      <h3>3. Delete attachments from one conversation</h3>
      <p>Good for one busy group chat that fills up with videos.</p>
      <ol>
        <li>Open the conversation in Messages.</li>
        <li>
          Click the name at the top of the conversation, or the info button, to open its details.
        </li>
        <li>
          Scroll to the <strong>Photos</strong> or files section. Control-click an item and choose{" "}
          <strong>Delete</strong>. Some versions let you select several items first.
        </li>
      </ol>
      <p>
        Inside the chat, you can also Control-click any attachment bubble and choose <strong>Delete</strong>. It
        removes that message and its file.
      </p>

      <h3>4. Delete whole conversations</h3>
      <p>
        Old chats you&rsquo;ll never read again can go entirely. In the sidebar, Control-click a conversation and choose{" "}
        <strong>Delete</strong>. Deleted conversations go to <strong>Recently Deleted</strong> in recent macOS
        versions, where they stay for up to 30 days. To free the space now, choose <strong>View</strong>, then{" "}
        <strong>Recently Deleted</strong>, and delete them from there.
      </p>

      <AppCallout market={market} title="Messages is one folder. See the rest.">
        {APP_NAME} scans your Mac on the device and lists large files, caches, duplicates, app leftovers, old installers
        and iPhone backups with their sizes. Everything you clear goes to the Trash, and Undo puts it back.
      </AppCallout>

      <h2 id="icloud">What Messages in iCloud changes</h2>
      <p>
        With <strong>Messages in iCloud</strong> on, your conversations sync between your Mac, iPhone and iPad. That
        has two effects on storage:
      </p>
      <ul>
        <li>
          <strong>Deletions sync.</strong> Delete an attachment on your Mac and it disappears from your iPhone too.
          That is handy for a clean-up and dangerous for a photo you only have in one chat.
        </li>
        <li>
          <strong>The Mac can download history.</strong> Turning it on can pull years of attachments onto your Mac. On
          a Mac with little storage, that alone can fill the disk.
        </li>
      </ul>
      <p>
        To check the setting, choose <strong>Messages</strong>, then <strong>Settings</strong>, then{" "}
        <strong>iMessage</strong>, and look at <strong>Enable Messages in iCloud</strong>. If you turn it off on the
        Mac only, your Mac stops syncing, but the messages it already has stay put. Deleting them then affects only
        the Mac.
      </p>

      <h2 id="folder">The ~/Library/Messages/Attachments folder</h2>
      <p>
        All attachments live in <code>~/Library/Messages/Attachments</code>, spread across many numbered folders.
        Deleting files there does free space, but Messages still lists the attachments, which then show as missing or
        greyed out. It can also confuse Messages in iCloud. Use the methods above instead.
      </p>
      <p>
        If Finder shows a permission error when you open the folder, that is macOS privacy protection. You don&rsquo;t
        need to change it to clear Messages, because Storage settings and the Messages app already have access.
      </p>
      <h3>Messages storage vs System Data</h3>
      <p>
        Messages has its own row in Storage settings, but some caches it creates are counted as System Data. If that
        grey bar is large, our guide on{" "}
        <Link href={SYSTEM_DATA_GUIDE_PATH}>how to reduce System Data on a Mac</Link> explains what else hides
        there.
      </p>

      <h2>How to stop Messages filling up again</h2>
      <p>Clearing Messages once helps for a few months. These habits keep it small for good:</p>
      <ul>
        <li>
          <strong>Keep the 1 Year setting.</strong> It does more than any manual clean-up, because it runs every day
          without you.
        </li>
        <li>
          <strong>Save keepers straight away.</strong> When someone sends a photo you want, save it to Photos then.
          The copy in Messages can go later without a second thought.
        </li>
        <li>
          <strong>Mute or leave busy groups.</strong> A group chat that shares videos daily can add gigabytes a month.
          If you only read it on your phone, deleting the conversation on the Mac with Messages in iCloud off keeps
          your Mac clear while your phone keeps the history.
        </li>
        <li>
          <strong>Check the Storage settings list every few months.</strong> Sorting by size takes a minute and shows
          new large attachments before they add up.
        </li>
      </ul>
      <h3>Shared Macs and multiple accounts</h3>
      <p>
        Messages storage is per user. If several people use the Mac with their own accounts, each has their own{" "}
        <code>~/Library/Messages</code> folder. Storage settings shows only the account you are signed in to, so each
        person has to clear their own Messages.
      </p>

      <h2>Before you delete: save what matters</h2>
      <ul>
        <li>Save favorite photos and videos to the Photos app first. They then live in your library, not in Messages.</li>
        <li>
          If your Photos library is big too, read{" "}
          <Link href={PHOTOS_GUIDE_PATH}>how to reduce your Photos library size on a Mac</Link>.
        </li>
        <li>
          Your iPhone backups on the Mac also include messages. If you clear old backups, read{" "}
          <Link href={IPHONE_BACKUPS_GUIDE_PATH}>how to delete iPhone backups on a Mac</Link> first.
        </li>
      </ul>

      <h2>Free up the rest of your Mac with {APP_NAME}</h2>
      <p>
        Messages is one corner of your disk. {APP_NAME} maps all of it in one scan and clears what you choose to the
        Trash. It costs <Price /> once, with no subscription. For more ideas, read{" "}
        <Link href={GUIDE_PATH}>how to free up space on a Mac</Link>.
      </p>
    </GuideLayout>
  );
}
