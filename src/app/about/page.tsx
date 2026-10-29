import Link from "next/link";
import { ContentPage } from "@/components/content-page";
import { innerPageGraph, pageMetadata } from "@/lib/seo";
import { APP_NAME, GUIDE_PATH, PRICE, SUPPORT_EMAIL } from "@/lib/site";

const path = "/about";
const title = "About MyMacStorage";
const description =
  "Why MyMacStorage exists, the principles behind it and how it keeps your files safe while it cleans up your Mac.";

export const metadata = pageMetadata({ title: "About", description, path });

export default function AboutPage() {
  return (
    <ContentPage
      title={title}
      intro={`${APP_NAME} is a native Mac app that shows you what fills your disk, then clears what you don’t need, safely.`}
      breadcrumb="About"
      graph={innerPageGraph({ path, name: title, description, type: "AboutPage" })}
    >
      <h2>Why MyMacStorage exists</h2>
      <p>
        macOS tells you when your disk is full, but not much more. The storage bar in System Settings shows a few
        coloured slices and a large grey block called System Data. It rarely tells you which files sit inside, or which
        ones you can safely remove.
      </p>
      <p>
        {APP_NAME} fills that gap. One scan maps your whole disk, names every slice and groups the files you could
        clear, from caches and old installers to duplicates and app leftovers.
      </p>

      <h2>What we believe</h2>
      <h3>You decide what goes</h3>
      <p>
        {APP_NAME} never clears anything on its own. You review every item first, and each cleanup moves files to the
        Trash rather than deleting them. Undo puts a whole cleanup back.
      </p>
      <h3>Your files stay on your Mac</h3>
      <p>
        Scanning, hashing and duplicate matching all run on your Mac. The app has no account, no sync and no
        analytics. It sends only your licence key online, to check it.
      </p>
      <h3>Pay once, keep it</h3>
      <p>
        {APP_NAME} costs {PRICE} once. There&rsquo;s no subscription, every future update is included, and one key
        covers both the Mac and Windows versions.
      </p>

      <h2>What MyMacStorage does</h2>
      <ul>
        <li>
          <strong>Overview:</strong> your whole drive on one screen after a single scan.
        </li>
        <li>
          <strong>Find:</strong> any file as you type, in every folder, hidden ones included.
        </li>
        <li>
          <strong>Space:</strong> your biggest files and folders, listed first.
        </li>
        <li>
          <strong>Cleanup:</strong> caches, build files and old installers, grouped and added up.
        </li>
        <li>
          <strong>Duplicates:</strong> files that exist twice, matched byte for byte.
        </li>
        <li>
          <strong>Applications:</strong> every app with its full size, plus the leftovers it leaves behind.
        </li>
      </ul>
      <p>
        Prefer to clean up by hand? Our guide explains{" "}
        <Link href={GUIDE_PATH}>how to free up disk space on a Mac</Link> with the tools macOS already includes.
      </p>

      <h2>Get in touch</h2>
      <p>
        Questions, bug reports and feedback all reach us at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        See the <Link href="/contact">contact page</Link> for what to include.
      </p>
    </ContentPage>
  );
}
