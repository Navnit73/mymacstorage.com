import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import { recordVisit, VISITOR_COOKIE, visitFromRequest } from "@/lib/visits";

/**
 * Logs every page and API request, from people and bots alike, to the `visits` collection. The write runs after the
 * response is sent, so it adds no latency. People get a first-party visitor cookie so repeat visits group together.
 */
export function proxy(request: NextRequest, event: NextFetchEvent) {
  const existingId = request.cookies.get(VISITOR_COOKIE)?.value ?? null;
  const visit = visitFromRequest(request, existingId ?? crypto.randomUUID());
  event.waitUntil(recordVisit(visit));

  const response = NextResponse.next();
  if (!existingId && visit.visitorId) {
    response.cookies.set(VISITOR_COOKIE, visit.visitorId, {
      maxAge: 60 * 60 * 24 * 365,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
  }
  return response;
}

export const config = {
  matcher: [
    {
      // Everything except build output and static files. robots.txt and sitemap.xml stay in: bots fetching them
      // are worth seeing.
      source: "/((?!_next/static|_next/image|icon|apple-icon|api/admin|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|css|js|map|woff2?)$).*)",
      // Link prefetches aren't visits.
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
