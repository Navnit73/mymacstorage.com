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

      <h2>Install {APP_NAME}</h2>
      <ol>
        <li>
          Open <strong>{APP_NAME}.dmg</strong> and drag <strong>{APP_NAME}</strong> into <strong>Applications</strong>.
        </li>
        <li>
          Open <strong>{APP_NAME}</strong> from Applications. macOS shows &ldquo;Apple could not verify &lsquo;
          {APP_NAME}&rsquo; is free of malware&rdquo;. Click <strong>Done</strong> (not Move to Trash).
        </li>
        <li>
          Open <strong>System Settings &rarr; Privacy &amp; Security</strong>, scroll down to &ldquo;{APP_NAME} was
          blocked to protect your Mac&rdquo;, and click <strong>Open Anyway</strong>. Enter your Mac password if asked.
        </li>
        <li>
          Click <strong>Open Anyway</strong> once more. From now on {APP_NAME} opens normally.
        </li>
      </ol>
      <p>You only do this once, and again after installing an update.</p>

      <p>
        <strong>Why?</strong> {APP_NAME} is sold directly by us, not through the App Store, and is not registered with
        Apple&rsquo;s paid notarization service. The warning means Apple has not scanned it, not that something is
        wrong. {APP_NAME} runs entirely on your Mac, never uploads your files, and only ever moves files to the Trash.
      </p>
      <p>
        <strong>&ldquo;Open Anyway&rdquo; isn&rsquo;t there?</strong> It appears only for about an hour after step 2.
        Open the app again, then go back to Privacy &amp; Security.
      </p>
      <p>
        <strong>Prefer Terminal?</strong> This removes the download flag so the warning is not shown:
      </p>
      <pre>
        <code>xattr -dr com.apple.quarantine /Applications/{APP_NAME}.app</code>
      </pre>
      <p>
        <strong>Requirements:</strong> macOS 14 Sonoma or later, Apple Silicon Mac (M1 or later).
      </p>

      <h2>No email yet?</h2>
      <p>
        Check your spam or promotions folder. If it still hasn&rsquo;t arrived after 10 minutes, email{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> from the address you paid with and we&rsquo;ll send
        it again.
      </p>
    </ContentPage>
  );
}
