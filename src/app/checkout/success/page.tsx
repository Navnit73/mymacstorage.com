import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";
import { innerPageGraph } from "@/lib/seo";
import { APP_NAME, SUPPORT_EMAIL } from "@/lib/site";

const path = "/checkout/success";
const title = "Thanks for your purchase";
const description = `Your ${APP_NAME} download link and licence key are on their way to your inbox.`;

export const metadata: Metadata = {
  title: `${title} | ${APP_NAME}`,
  description,
  robots: { index: false, follow: false },
};

// Dodo sends the buyer here after checkout. The redirect proves nothing, so this page only says what happens next;
// the webhook sends the download and the key once Dodo confirms the payment.
export default function CheckoutSuccessPage() {
  return (
    <ContentPage
      title={title}
      intro="Your download link and licence key are on their way to your inbox."
      breadcrumb="Purchase complete"
      graph={innerPageGraph({ path, name: title, description })}
    >
      <h2>What happens next</h2>
      <ol>
        <li>Look for an email from {APP_NAME}. It usually arrives within a minute.</li>
        <li>Download the app from the link in that email and open it.</li>
        <li>Paste your licence key when the app asks for it.</li>
      </ol>

      <h2>No email yet?</h2>
      <p>
        Check your spam or promotions folder. If it still hasn&rsquo;t arrived after 10 minutes, email{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> from the address you paid with and we&rsquo;ll send
        it again.
      </p>
    </ContentPage>
  );
}
