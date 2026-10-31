import { MongoServerError, ObjectId } from "mongodb";
import { parseRelease } from "@/lib/app-api";
import { collection } from "@/lib/db";
import { logger } from "@/lib/logger";

const log = logger("app-releases");

export type ReleaseResult = { ok: true; id: string } | { ok: false; error: string; status: number };

/** Saves a new release. Shared by the admin API and the admin panel. */
export async function createRelease(body: Record<string, unknown>): Promise<ReleaseResult> {
  const parsed = parseRelease(body);
  if (typeof parsed === "string") return { ok: false, error: parsed, status: 400 };

  const now = new Date();
  try {
    const { insertedId } = await (await collection("app_releases")).insertOne({
      ...parsed,
      publishedAt: now,
      createdAt: now,
    });
    await log.info("Release created", { version: parsed.version, build: parsed.build, channel: parsed.channel });
    return { ok: true, id: insertedId.toString() };
  } catch (error) {
    if (error instanceof MongoServerError && error.code === 11000) {
      return { ok: false, error: `Build ${parsed.build} already exists on ${parsed.channel}`, status: 409 };
    }
    throw error;
  }
}

/** Publishes, unpublishes or flags a release. Only these fields can change; anything else needs a new build. */
export async function updateRelease(id: string, body: Record<string, unknown>): Promise<ReleaseResult> {
  if (!ObjectId.isValid(id)) return { ok: false, error: "Not found", status: 404 };
  const set: Record<string, unknown> = {};
  if (typeof body.published === "boolean") {
    set.published = body.published;
    if (body.published) set.publishedAt = new Date();
  }
  if (typeof body.critical === "boolean") set.critical = body.critical;
  if (typeof body.notes === "string") set.notes = body.notes.slice(0, 20_000);
  if (typeof body.title === "string" && body.title.trim()) set.title = body.title.trim().slice(0, 200);
  if (body.minimumSupportedBuild === null || (Number.isInteger(body.minimumSupportedBuild) && Number(body.minimumSupportedBuild) > 0)) {
    set.minimumSupportedBuild = body.minimumSupportedBuild;
  }
  if (Object.keys(set).length === 0) {
    return { ok: false, error: "Nothing to change: published, critical, notes, title, minimumSupportedBuild", status: 400 };
  }

  const result = await (await collection("app_releases")).updateOne({ _id: new ObjectId(id) }, { $set: set });
  if (result.matchedCount === 0) return { ok: false, error: "Not found", status: 404 };
  await log.info("Release updated", { id, ...set });
  return { ok: true, id };
}

export async function deleteRelease(id: string): Promise<ReleaseResult> {
  if (!ObjectId.isValid(id)) return { ok: false, error: "Not found", status: 404 };
  const result = await (await collection("app_releases")).deleteOne({ _id: new ObjectId(id) });
  if (result.deletedCount === 0) return { ok: false, error: "Not found", status: 404 };
  await log.info("Release deleted", { id });
  return { ok: true, id };
}

export async function listReleases(limit = 100) {
  return (await collection("app_releases")).find().sort({ build: -1 }).limit(limit).toArray();
}
