import DodoPayments from "dodopayments";

/** Anything but an explicit "live_mode" stays in test mode, so a missing variable never charges real cards. */
export const dodoEnvironment = process.env.DODO_PAYMENTS_ENVIRONMENT === "live_mode" ? "live_mode" : "test_mode";

let client: DodoPayments | undefined;

/**
 * The Dodo client, built on first use because its constructor throws without DODO_PAYMENTS_API_KEY, which would
 * fail `next build` on any machine without secrets. Also reads DODO_PAYMENTS_WEBHOOK_KEY.
 */
export function dodo() {
  return (client ??= new DodoPayments({ environment: dodoEnvironment }));
}
