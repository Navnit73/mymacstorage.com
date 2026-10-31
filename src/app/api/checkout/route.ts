import { userAgent, type NextRequest } from "next/server";
import { collection } from "@/lib/db";
import type { CheckoutSessionBillingAddress } from "dodopayments/resources/checkout-sessions";
import { dodo } from "@/lib/dodo";
import { logger } from "@/lib/logger";
import { countryFromHeaders, hasOwnPrice } from "@/lib/pricing";
import { SITE_URL } from "@/lib/site";
import { detectBot, readVisitorId, UNNAMED_BOT } from "@/lib/visits";

const log = logger("checkout");

/**
 * Every Buy and Download button links here. Starts a fresh Dodo checkout for the one product on sale, saves it as an
 * order and sends the buyer to it. The product ID comes from the server, never from the request.
 */
export async function GET(request: NextRequest) {
  // Crawlers that ignore robots.txt would otherwise open a Dodo session on every pass. Only named bots are turned
  // away: the generic pattern can misfire on a real browser, and a lost sale costs more than a stray session.
  const bot = detectBot(request.headers.get("user-agent"), userAgent(request).isBot);
  if (bot && bot !== UNNAMED_BOT) return Response.redirect(`${SITE_URL}/#pricing`, 303);

  const productId = process.env.DODO_PRODUCT_ID;
  if (!productId) {
    await log.error("DODO_PRODUCT_ID is not set");
    return new Response("Checkout is not available right now.", { status: 503 });
  }

  const visitorId = readVisitorId(request);
  // Tell Dodo the same country the page priced for, so the checkout charges the amount the buyer was shown.
  const country = countryFromHeaders(request.headers);

  try {
    const session = await dodo().checkoutSessions.create({
      product_cart: [{ product_id: productId, quantity: 1 }],
      return_url: `${SITE_URL}/checkout/success`,
      ...(hasOwnPrice(country) && { billing_address: { country: country as CheckoutSessionBillingAddress["country"] } }),
      ...(visitorId && { metadata: { visitor_id: visitorId } }),
    });
    if (!session.checkout_url) throw new Error("Dodo returned no checkout_url");

    // The webhook upserts the order from the payment too, so a failed write here shouldn't stop the buyer paying.
    try {
      const now = new Date();
      await (await collection("orders")).insertOne({
        checkoutSessionId: session.session_id,
        status: "checkout_created",
        visitorId,
        createdAt: now,
        updatedAt: now,
      });
      await log.info("Checkout session created", { checkoutSessionId: session.session_id, visitorId });
    } catch (error) {
      await log.error("Saving the order failed", { checkoutSessionId: session.session_id, error });
    }

    return Response.redirect(session.checkout_url, 303);
  } catch (error) {
    await log.error("Checkout failed", { error, visitorId });
    return new Response("Checkout is not available right now. Please try again in a minute.", { status: 502 });
  }
}
