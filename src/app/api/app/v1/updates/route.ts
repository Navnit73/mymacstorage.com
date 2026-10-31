import { badRequest, channel, int, rejectUnlessApp, updateFor } from "@/lib/app-api";

/**
 * A manual "Check for updates". Query: `build` (the app's CFBundleVersion) and optional `channel` (`stable` or
 * `beta`). Response: `{ update }`, null when the app is current. The heartbeat returns the same thing.
 */
export async function GET(request: Request) {
  const rejected = rejectUnlessApp(request);
  if (rejected) return rejected;

  const url = new URL(request.url);
  const build = int(url.searchParams.get("build"));
  if (build === null) return badRequest("build is required");
  return Response.json({ update: await updateFor(build, channel(url.searchParams.get("channel"))) });
}
