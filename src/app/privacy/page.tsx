import Link from "next/link";
import { ContentPage } from "@/components/content-page";
import { innerPageGraph, pageMetadata } from "@/lib/seo";
import { APP_NAME, SUPPORT_EMAIL, pages } from "@/lib/site";

const path = "/privacy";
const title = "Privacy policy";
const description = `How ${APP_NAME} handles your data. Scans run on your Mac, and the app sends only your licence key online.`;
const updated = pages.find((p) => p.path === path)?.updated;

export const metadata = pageMetadata({ title: "Privacy Policy", description, path });

export default function PrivacyPage() {
  return (
    <ContentPage
      title={title}
      intro={`${APP_NAME} is built to keep your files on your Mac. This policy explains the little data we do handle, and why.`}
      breadcrumb="Privacy"
      updated={updated}
      graph={innerPageGraph({ path, name: title, description })}
    >
      <h2>In short</h2>
      <ul>
        <li>The app scans, hashes and matches files entirely on your Mac.</li>
        <li>It never uploads your files or filenames.</li>
        <li>It has no account, no sync and no analytics.</li>
        <li>It sends only your licence key online, to check that it&rsquo;s valid.</li>
      </ul>

      <h2>Data the app handles</h2>
      <h3>Your files</h3>
      <p>
        {APP_NAME} reads your disk to measure files and find ones you could clear. That processing happens on your Mac.
        File names, paths, contents and hashes never leave it.
      </p>
      <h3>Your licence key</h3>
      <p>
        When you activate or check your licence, the app sends your licence key to our licence server. Like any
        internet request, that connection also reveals your IP address. We use this only to confirm that your licence
        is valid.
      </p>

      <h2>Data the website handles</h2>
      <p>
        This website sets no cookies and runs no analytics. It loads product screenshots from an image delivery
        service, which, like any web server, receives your IP address and browser details to send you the images.
      </p>

      <h2>Purchases</h2>
      <p>
        A third-party payment provider processes your order. It collects the details needed to take payment, such as
        your name, email address and card details, under its own privacy policy. We receive your email address and
        order details so we can deliver your licence and offer support. We never see your full card number.
      </p>

      <h2>Emails you send us</h2>
      <p>
        When you email {SUPPORT_EMAIL}, we keep your message and address so we can reply and follow up. We don&rsquo;t
        add you to a mailing list or share your email with anyone.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask us what data we hold about you, ask us to correct it, or ask us to delete it. Email{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> and we&rsquo;ll respond as the law requires.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If we change how we handle data, we&rsquo;ll update this page and its date. Questions? Visit the{" "}
        <Link href="/contact">contact page</Link>.
      </p>
    </ContentPage>
  );
}
