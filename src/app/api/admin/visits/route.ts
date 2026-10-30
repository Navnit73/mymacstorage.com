import type { Filter } from "mongodb";
import { intParam, rejectUnlessAdmin } from "@/lib/admin";
import { collection, type Visit } from "@/lib/db";

/**
 * Raw visit log, newest first. Filters: `bot=true|false`, `botName`, `path`, `visitorId`. Pages with `limit`
 * (default 100, max 500) and `before` (an ISO time; pass the last row's `at` to get the next page).
 */
export async function GET(request: Request) {
  const rejected = rejectUnlessAdmin(request);
  if (rejected) return rejected;

  const url = new URL(request.url);
  const params = url.searchParams;
  const filter: Filter<Visit> = {};
  if (params.has("bot")) filter.isBot = params.get("bot") === "true";
  if (params.get("botName")) filter.botName = params.get("botName");
  if (params.get("path")) filter.path = params.get("path")!;
  if (params.get("visitorId")) filter.visitorId = params.get("visitorId");
  const before = new Date(params.get("before") ?? "");
  if (!Number.isNaN(before.getTime())) filter.at = { $lt: before };

  const visits = await (await collection("visits"))
    .find(filter)
    .sort({ at: -1 })
    .limit(intParam(url, "limit", 100, 1, 500))
    .toArray();
  return Response.json({ visits });
}
