import type { Metadata } from "next";
import { Suspense } from "react";
import { requireAdmin } from "@/lib/admin-auth";
import { getAppStats, type AppStats } from "@/lib/app-stats";
import { listReleases } from "@/lib/app-releases";
import { deleteReleaseAction, setReleasePublishedAction } from "../../app-actions";
import { ReleaseForm } from "../../_components/release-form";
import { Badge, Card, FilterLinks, formatDate, PageTitle, PanelSkeleton, Stat, Table, Td } from "../../_components/ui";

export const metadata: Metadata = { title: "App" };

const RANGES = [1, 7, 30, 90];

export default function AppPage({ searchParams }: PageProps<"/navnit_admin/app">) {
  return (
    <Suspense fallback={<PanelSkeleton />}>
      <AppUsage searchParams={searchParams} />
    </Suspense>
  );
}

async function AppUsage({ searchParams }: { searchParams: PageProps<"/navnit_admin/app">["searchParams"] }) {
  await requireAdmin();
  const requested = Number((await searchParams).days);
  const days = RANGES.includes(requested) ? requested : 7;
  const [stats, releases] = await Promise.all([getAppStats(days), listReleases()]);

  return (
    <>
      <PageTitle
        aside={
          <FilterLinks
            current={String(days)}
            options={RANGES.map((d) => ({
              value: String(d),
              label: d === 1 ? "24 hours" : `${d} days`,
              href: `/navnit_admin/app?days=${d}`,
            }))}
          />
        }
      >
        Mac app
      </PageTitle>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
        <Stat label="Live now" value={stats.live.toLocaleString()} note="Heartbeat in the last 2½ min" />
        <Stat label="Today" value={stats.dau.toLocaleString()} note="Active devices (UTC day)" />
        <Stat label="7 days" value={stats.wau.toLocaleString()} />
        <Stat label="30 days" value={stats.mau.toLocaleString()} />
        <Stat label="New installs" value={stats.newDevices.toLocaleString()} note={`In the last ${days === 1 ? "24 hours" : `${days} days`}`} />
        <Stat label="All installs" value={stats.totalDevices.toLocaleString()} />
      </div>

      <Card title="Active devices per day" className="mt-6">
        <ActiveChart perDay={stats.perDay} days={days} asOf={stats.asOf} />
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card title="Feature use">
          <Bars rows={stats.topEvents.map((e) => ({ key: e.name, value: e.count, note: `${e.devices} devices` }))} />
        </Card>
        <Card title="App versions (devices active in range)">
          <Bars rows={stats.versions.map((v) => ({ key: v.version, value: v.devices }))} />
        </Card>
      </div>

      <h2 className="mb-3 mt-8 text-lg font-semibold text-gray-950">Live devices</h2>
      <Table head={["Last seen", "Device", "Version", "macOS", "Model", "Country", "Licence"]} empty={stats.liveDevices.length === 0}>
        {stats.liveDevices.map((d) => (
          <tr key={d.deviceId}>
            <Td className="whitespace-nowrap text-gray-600">{formatDate(d.lastSeenAt)}</Td>
            <Td className="font-mono text-xs">{d.deviceId.slice(0, 8)}</Td>
            <Td>{d.appVersion}</Td>
            <Td>{d.osVersion ?? "—"}</Td>
            <Td>{d.model ?? "—"}</Td>
            <Td>{d.country ?? "—"}</Td>
            <Td>{d.licensed ? <Badge tone="lime">licensed</Badge> : <Badge>trial</Badge>}</Td>
          </tr>
        ))}
      </Table>

      <h2 className="mb-3 mt-8 text-lg font-semibold text-gray-950">Releases</h2>
      <Table head={["Version", "Channel", "Status", "Published", ""]} empty={releases.length === 0}>
        {releases.map((r) => (
          <tr key={r._id.toString()}>
            <Td>
              <div className="font-medium text-gray-950">
                {r.version} <span className="font-normal text-gray-500">({r.build})</span>
              </div>
              <div className="text-xs text-gray-500">{r.title}</div>
            </Td>
            <Td>{r.channel}</Td>
            <Td>
              <div className="flex flex-wrap gap-1">
                {r.published ? <Badge tone="lime">live</Badge> : <Badge>draft</Badge>}
                {r.critical && <Badge tone="dark">critical</Badge>}
                {r.minimumSupportedBuild && <Badge tone="dark">forces &lt; {r.minimumSupportedBuild}</Badge>}
              </div>
            </Td>
            <Td className="whitespace-nowrap text-gray-600">{r.published ? formatDate(r.publishedAt) : "—"}</Td>
            <Td className="whitespace-nowrap text-right">
              <form action={setReleasePublishedAction} className="inline">
                <input type="hidden" name="id" value={r._id.toString()} />
                <input type="hidden" name="published" value={String(!r.published)} />
                <button className="rounded-md px-2 py-1 text-sm text-gray-700 hover:bg-gray-100">
                  {r.published ? "Unpublish" : "Publish"}
                </button>
              </form>
              <form action={deleteReleaseAction} className="inline">
                <input type="hidden" name="id" value={r._id.toString()} />
                <button className="rounded-md px-2 py-1 text-sm text-gray-700 hover:bg-gray-100">Delete</button>
              </form>
            </Td>
          </tr>
        ))}
      </Table>

      <Card title="New release" className="mt-6">
        <ReleaseForm />
      </Card>
    </>
  );
}

function Bars({ rows }: { rows: { key: string; value: number; note?: string }[] }) {
  if (rows.length === 0) return <p className="text-sm text-gray-500">No data in this period.</p>;
  const max = rows[0].value;
  return (
    <ol className="space-y-2">
      {rows.map((r) => (
        <li key={r.key}>
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <span className="truncate font-mono text-xs text-gray-900">{r.key}</span>
            <span className="shrink-0 tabular-nums text-gray-950">
              {r.value.toLocaleString()}
              {r.note && <span className="ml-2 text-xs text-gray-500">{r.note}</span>}
            </span>
          </div>
          <div className="mt-1 h-1 rounded-full bg-gray-100">
            <div className="h-1 rounded-full bg-lime-600" style={{ width: `${(r.value / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Active devices per UTC day, with empty days filled in. */
function ActiveChart({ perDay, days, asOf }: { perDay: AppStats["perDay"]; days: number; asOf: Date }) {
  const counts = new Map(perDay.map((d) => [d.day, d.devices]));
  const series = Array.from({ length: days }, (_, i) => {
    const day = new Date(asOf.getTime() - (days - 1 - i) * 86_400_000).toISOString().slice(0, 10);
    return { day, devices: counts.get(day) ?? 0 };
  });
  const max = Math.max(1, ...series.map((d) => d.devices));

  return (
    <div>
      <div className="flex gap-2" role="img" aria-label={`Active devices per day for the last ${days} days`}>
        <div className="flex h-40 flex-col justify-between text-right text-[11px] tabular-nums text-gray-500">
          <span className="leading-none">{max}</span>
          <span className="leading-none">0</span>
        </div>
        <div className="flex h-40 flex-1 items-end gap-[2px] border-b border-gray-300">
          {series.map((d) => (
            <div key={d.day} className="group relative flex h-full min-w-0 flex-1 flex-col justify-end">
              <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-950 px-2.5 py-1.5 text-xs text-white group-hover:block">
                {d.day}: {d.devices}
              </div>
              {d.devices > 0 && (
                <div
                  className="mx-auto w-full max-w-6 rounded-t-[4px] bg-lime-600 group-hover:opacity-80"
                  style={{ height: `${(d.devices / max) * 100}%`, minHeight: 2 }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="ml-6 mt-1 flex justify-between text-[11px] text-gray-500">
        <span>{series[0]?.day}</span>
        <span>{series.at(-1)?.day}</span>
      </div>
    </div>
  );
}
