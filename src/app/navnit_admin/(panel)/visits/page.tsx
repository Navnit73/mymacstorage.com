import type { Metadata } from "next";
import Link from "next/link";
import type { Filter } from "mongodb";
import { Suspense } from "react";
import { requireAdmin } from "@/lib/admin-auth";
import { collection, type Visit } from "@/lib/db";
import { Badge, FilterLinks, formatDate, PageTitle, PanelSkeleton, Table, Td } from "../../_components/ui";

export const metadata: Metadata = { title: "Visits" };

const PAGE_SIZE = 100;
type Params = Record<string, string | string[] | undefined>;

export default function VisitsPage({ searchParams }: PageProps<"/navnit_admin/visits">) {
  return (
    <Suspense fallback={<PanelSkeleton />}>
      <Visits searchParams={searchParams} />
    </Suspense>
  );
}

async function Visits({ searchParams }: { searchParams: Promise<Params> }) {
  await requireAdmin();
  const params = await searchParams;
  const get = (key: string) => (typeof params[key] === "string" ? (params[key] as string) : undefined);
  const type = get("type") ?? "all";
  const bot = get("bot");
  const path = get("path");
  const visitorId = get("visitor");
  const before = get("before");

  const filter: Filter<Visit> = {};
  if (type === "human") filter.isBot = false;
  if (type === "bot") filter.isBot = true;
  if (bot) filter.botName = bot;
  if (path) filter.path = path;
  if (visitorId) filter.visitorId = visitorId;
  if (before && !Number.isNaN(Date.parse(before))) filter.at = { $lt: new Date(before) };

  const visits = await (await collection("visits")).find(filter).sort({ at: -1 }).limit(PAGE_SIZE).toArray();

  /** The current filters with some changed; `before` is dropped unless given, so a new filter starts at page one. */
  const href = (changes: Params) => {
    const next = new URLSearchParams();
    for (const [k, v] of Object.entries({ type, bot, path, visitor: visitorId, ...changes })) {
      if (typeof v === "string" && v && !(k === "type" && v === "all")) next.set(k, v);
    }
    const query = next.toString();
    return `/navnit_admin/visits${query ? `?${query}` : ""}`;
  };

  const active = [
    bot && { label: `Bot: ${bot}`, clear: href({ bot: undefined }) },
    path && { label: `Path: ${path}`, clear: href({ path: undefined }) },
    visitorId && { label: `Visitor: ${visitorId.slice(0, 8)}…`, clear: href({ visitor: undefined }) },
  ].filter(Boolean) as { label: string; clear: string }[];

  return (
    <>
      <PageTitle
        aside={
          <FilterLinks
            current={type}
            options={[
              { value: "all", label: "All", href: href({ type: "all", bot: undefined }) },
              { value: "human", label: "People", href: href({ type: "human", bot: undefined }) },
              { value: "bot", label: "Bots", href: href({ type: "bot" }) },
            ]}
          />
        }
      >
        Visits
      </PageTitle>

      {active.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {active.map((f) => (
            <Link
              key={f.label}
              href={f.clear}
              className="rounded-full border border-gray-300 bg-white px-3 py-1 text-sm text-gray-800 hover:border-gray-500"
            >
              {f.label} <span aria-label="Remove filter">×</span>
            </Link>
          ))}
        </div>
      )}

      <Table head={["Time", "Who", "Request", "Referrer", "Where", "Client"]} empty={visits.length === 0}>
        {visits.map((v) => (
          <tr key={v._id.toString()} className="hover:bg-gray-50">
            <Td className="whitespace-nowrap text-gray-600">{formatDate(v.at)}</Td>
            <Td>
              {v.isBot ? (
                <Link href={href({ type: "bot", bot: v.botName ?? undefined })}>
                  <Badge>{v.botName ?? "Bot"}</Badge>
                </Link>
              ) : v.visitorId ? (
                <Link href={href({ visitor: v.visitorId })} title="All visits from this browser">
                  <Badge tone="lime">Person</Badge>
                </Link>
              ) : (
                <Badge tone="lime">Person</Badge>
              )}
            </Td>
            <Td>
              <Link href={href({ path: v.path })} className="break-all hover:underline">
                {v.method !== "GET" && <span className="mr-1 font-mono text-xs text-gray-500">{v.method}</span>}
                {v.path}
                {v.query && <span className="text-gray-500">{v.query}</span>}
              </Link>
            </Td>
            <Td className="max-w-56 break-all text-gray-600">{v.referrer ?? "—"}</Td>
            <Td className="whitespace-nowrap">
              <div>{v.country ?? "—"}</div>
              <div className="font-mono text-xs text-gray-500">{v.ip ?? ""}</div>
            </Td>
            <Td className="min-w-48">
              <div className="whitespace-nowrap">
                {[v.browser, v.os, v.device].filter(Boolean).join(" · ") || "—"}
              </div>
              {v.userAgent && (
                <div className="mt-0.5 max-w-80 truncate text-xs text-gray-500" title={v.userAgent}>
                  {v.userAgent}
                </div>
              )}
            </Td>
          </tr>
        ))}
      </Table>

      <div className="mt-4 flex justify-between text-sm">
        {before ? (
          <Link href={href({})} className="text-gray-700 hover:underline">
            ← Newest
          </Link>
        ) : (
          <span />
        )}
        {visits.length === PAGE_SIZE && (
          <Link href={href({ before: visits.at(-1)!.at.toISOString() })} className="text-gray-700 hover:underline">
            Older →
          </Link>
        )}
      </div>
    </>
  );
}
