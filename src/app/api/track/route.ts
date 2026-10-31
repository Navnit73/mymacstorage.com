import type { NextRequest } from "next/server";
import { readVisitorId, recordVisit, visitFromRequest } from "@/lib/visits";

/**
 * Logs an in-app navigation. Next serves those from prefetched data without a request the proxy could see, so
 * <NavigationBeacon> reports them here. Body: `{ path, query, referrer }`. The first page of a visit is a real
 * request and is logged by the proxy, not here.
 */
export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { path?: unknown; query?: unknown; referrer?: unknown } | null;
  const path = typeof body?.path === "string" ? body.path.slice(0, 512) : "";
  if (!path.startsWith("/") || path.startsWith("/api/") || path.startsWith("/navnit_admin")) {
    return new Response(null, { status: 204 });
  }

  const visit = visitFromRequest(request, readVisitorId(request));
  await recordVisit({
    ...visit,
    method: "GET",
    path,
    query: typeof body?.query === "string" && body.query ? body.query.slice(0, 512) : null,
    referrer: typeof body?.referrer === "string" && body.referrer ? body.referrer.slice(0, 1024) : null,
  });
  return new Response(null, { status: 204 });
}
