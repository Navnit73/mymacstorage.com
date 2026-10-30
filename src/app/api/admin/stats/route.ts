import { intParam, rejectUnlessAdmin } from "@/lib/admin";
import { getStats } from "@/lib/stats";

/** Traffic and sales summary for the last `days` days (default 7, max 90). */
export async function GET(request: Request) {
  const rejected = rejectUnlessAdmin(request);
  if (rejected) return rejected;

  return Response.json(await getStats(intParam(new URL(request.url), "days", 7, 1, 90)));
}
