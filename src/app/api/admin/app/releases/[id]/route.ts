import { rejectUnlessAdmin } from "@/lib/admin";
import { readJson } from "@/lib/app-api";
import { deleteRelease, updateRelease } from "@/lib/app-releases";

/** Changes `published`, `critical`, `notes`, `title` or `minimumSupportedBuild` of a release. */
export async function PATCH(request: Request, ctx: RouteContext<"/api/admin/app/releases/[id]">) {
  const rejected = rejectUnlessAdmin(request);
  if (rejected) return rejected;

  const body = await readJson(request);
  if (!body) return Response.json({ error: "Expected a JSON object" }, { status: 400 });
  const result = await updateRelease((await ctx.params).id, body);
  return result.ok ? Response.json({ id: result.id }) : Response.json({ error: result.error }, { status: result.status });
}

export async function DELETE(request: Request, ctx: RouteContext<"/api/admin/app/releases/[id]">) {
  const rejected = rejectUnlessAdmin(request);
  if (rejected) return rejected;

  const result = await deleteRelease((await ctx.params).id);
  return result.ok ? new Response(null, { status: 204 }) : Response.json({ error: result.error }, { status: result.status });
}
