import { Price } from "@/components/price";
import { ContentPage } from "@/components/content-page";
import { innerPageGraph, pageMetadata } from "@/lib/seo";
import { APP_NAME, REFUND_DAYS, SUPPORT_EMAIL, pages } from "@/lib/site";

const path = "/refund-policy";
const title = "Refund policy";
const description = `Get a full refund on ${APP_NAME} within ${REFUND_DAYS} days of purchase, no questions asked.`;
const updated = pages.find((p) => p.path === path)?.updated;

export const metadata = pageMetadata({ title: "Refund Policy", description, path });

export default function RefundPolicyPage() {
  return (
    <ContentPage
      title={title}
      intro={`If ${APP_NAME} isn’t right for you, get your money back within ${REFUND_DAYS} days. No questions asked.`}
      breadcrumb="Refunds"
      updated={updated}
      graph={innerPageGraph({ path, name: title, description })}
    >
      <h2>{REFUND_DAYS}-day money-back guarantee</h2>
      <p>
        {APP_NAME} costs <Price /> once. If you ask within {REFUND_DAYS} days of your purchase, we refund the full amount.
        You don&rsquo;t need to give a reason.
      </p>

      <h2>How to ask for a refund</h2>
      <ol>
        <li>
          Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> from the address you used to buy.
        </li>
        <li>Include your order number or licence key, if you have it to hand.</li>
        <li>We confirm the refund by email and send the money back to your original payment method.</li>
      </ol>
      <p>Your bank or card provider decides how long the money takes to reach your account.</p>

      <h2>After a refund</h2>
      <p>
        We deactivate the refunded licence key, so the app stops working with it on both Mac and Windows. Files you
        cleared stay wherever you left them: in the Trash, or gone if you emptied it.
      </p>

      <h2>After {REFUND_DAYS} days</h2>
      <p>
        We don&rsquo;t usually offer refunds after {REFUND_DAYS} days, but this doesn&rsquo;t affect any rights you
        have under consumer law. If something isn&rsquo;t working, email us first. We&rsquo;d rather fix it.
      </p>
    </ContentPage>
  );
}
