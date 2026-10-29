import Link from "next/link";
import { ContentPage } from "@/components/content-page";
import { innerPageGraph, pageMetadata } from "@/lib/seo";
import { APP_NAME, REFUND_DAYS, SUPPORT_EMAIL } from "@/lib/site";

const path = "/contact";
const title = "Contact MyMacStorage support";
const description = `Email ${APP_NAME} support for help with the app, your licence, refunds or feedback.`;

export const metadata = pageMetadata({ title: "Contact", description, path });

export default function ContactPage() {
  return (
    <ContentPage
      title={title}
      intro={
        <>
          Email us at <a href={`mailto:${SUPPORT_EMAIL}`} className="font-medium text-lime-700">{SUPPORT_EMAIL}</a>. A
          person reads every message.
        </>
      }
      breadcrumb="Contact"
      graph={innerPageGraph({ path, name: title, description, type: "ContactPage" })}
    >
      <h2>Get help with the app</h2>
      <p>To help us fix a problem quickly, include:</p>
      <ul>
        <li>Your Mac model and macOS version (Apple menu, then About This Mac)</li>
        <li>The version of {APP_NAME} you use</li>
        <li>What you did, what you expected and what happened instead</li>
        <li>A screenshot, if the problem shows on screen</li>
      </ul>

      <h2>Licence questions</h2>
      <p>
        Lost your licence key or need it moved to a new Mac? Email us from the address you used to buy, and we&rsquo;ll
        sort it out.
      </p>

      <h2>Refunds</h2>
      <p>
        You can get a full refund within {REFUND_DAYS} days of purchase, no questions asked. Read the{" "}
        <Link href="/refund-policy">refund policy</Link> for details.
      </p>

      <h2>Feedback and feature requests</h2>
      <p>
        Tell us what you&rsquo;d like {APP_NAME} to find or clear next. Feature requests shape what we build, so every
        idea helps.
      </p>
    </ContentPage>
  );
}
