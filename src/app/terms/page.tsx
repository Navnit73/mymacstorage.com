import { Price } from "@/components/price";
import Link from "next/link";
import { ContentPage } from "@/components/content-page";
import { innerPageGraph, pageMetadata } from "@/lib/seo";
import { APP_NAME, REFUND_DAYS, SUPPORT_EMAIL, pages } from "@/lib/site";

const path = "/terms";
const title = "Terms of service";
const description = `The terms for buying and using ${APP_NAME}, including your licence, updates, refunds and limits of liability.`;
const updated = pages.find((p) => p.path === path)?.updated;

export const metadata = pageMetadata({ title: "Terms of Service", description, path });

export default function TermsPage() {
  return (
    <ContentPage
      title={title}
      intro={`These terms apply when you buy or use ${APP_NAME}. By using the app, you agree to them.`}
      breadcrumb="Terms"
      updated={updated}
      graph={innerPageGraph({ path, name: title, description })}
    >
      <h2>Your licence</h2>
      <p>
        When you buy {APP_NAME} for <Price />, you get a licence key for your own use. It works with both the Mac and
        Windows versions of the app. The licence never expires and includes every future update.
      </p>
      <p>You agree not to:</p>
      <ul>
        <li>Share, sell or publish your licence key</li>
        <li>Copy, modify or redistribute the app</li>
        <li>Reverse engineer the app, except where the law allows it</li>
      </ul>

      <h2>How cleanups work</h2>
      <p>
        {APP_NAME} shows you files you could clear, and you choose what to remove. Each cleanup moves files to the
        Trash, and Undo can put a cleanup back until you empty the Trash. You stay responsible for reviewing what you
        clear and for keeping backups of important files.
      </p>

      <h2>Refunds</h2>
      <p>
        You can get a full refund within {REFUND_DAYS} days of purchase, no questions asked. See the{" "}
        <Link href="/refund-policy">refund policy</Link>.
      </p>

      <h2>Updates and availability</h2>
      <p>
        We may update the app to fix bugs, add features or support new versions of macOS and Windows. Updates are free
        for licence holders.
      </p>

      <h2>No warranty</h2>
      <p>
        We build {APP_NAME} with care, but we provide it &ldquo;as is&rdquo;, without warranties of any kind, to the
        extent the law allows.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the extent the law allows, our total liability for any claim about {APP_NAME} is limited to the amount you
        paid for your licence. Nothing in these terms limits rights you have under consumer law that can&rsquo;t be
        excluded.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms. When we do, we&rsquo;ll change the date on this page. Questions? Email{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
      </p>
    </ContentPage>
  );
}
