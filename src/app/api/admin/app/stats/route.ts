import { intParam, rejectUnlessAdmin } from "@/lib/admin";
import { getAppStats } from "@/lib/app-stats";

/** Mac app usage: live devices, DAU/WAU/MAU, versions and top events for the last `days` days (default 7, max 90). */
export async function GET(request: Request) {
  const rejected = rejectUnlessAdmin(request);
  if (rejected) return rejected;

  return Response.json(await getAppStats(intParam(new URL(request.url), "days", 7, 1, 90)));
}
