import type { NextRequest } from "next/server";
import { countryFromHeaders, priceFor, resolveCountry } from "@/lib/pricing";

/**
 * The price to show this visitor. The pages stay static and cacheable; the browser asks here once and swaps the
 * price in. The country comes from Cloudflare's CF-IPCountry header, with the browser's time zone as a fallback.
 */
export function GET(request: NextRequest) {
  const timeZone = request.nextUrl.searchParams.get("tz");
  const country = resolveCountry(countryFromHeaders(request.headers), timeZone);
  return Response.json(priceFor(country), {
    // The answer depends on who is asking, so no shared cache (Cloudflare included) may keep it.
    headers: { "Cache-Control": "private, no-store" },
  });
}
