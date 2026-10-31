import { rejectUnlessAdmin } from "@/lib/admin";
import { readJson } from "@/lib/app-api";
import { createRelease, listReleases } from "@/lib/app-releases";

/** Every release, newest build first, published or not. */
export async function GET(request: Request) {
  const rejected = rejectUnlessAdmin(request);
  if (rejected) return rejected;
  return Response.json({ releases: await listReleases() });
}

/**
 * Publishes a new release; apps pick it up on their next heartbeat. Body: `{ version, build, downloadUrl, channel?,
 * title?, notes?, size?, edSignature?, minimumSystemVersion?, critical?, minimumSupportedBuild?, published? }`.
 * Send `"published": false` to stage it without offering it yet.
 */
export async function POST(request: Request) {
  const rejected = rejectUnlessAdmin(request);
  if (rejected) return rejected;

  const body = await readJson(request);
  if (!body) return Response.json({ error: "Expected a JSON object" }, { status: 400 });
  const result = await createRelease(body);
  return result.ok
    ? Response.json({ id: result.id }, { status: 201 })
    : Response.json({ error: result.error }, { status: result.status });
}
