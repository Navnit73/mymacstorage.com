import Link from "next/link";
import { Suspense } from "react";
import { requireAdmin } from "@/lib/admin-auth";
import { getStats } from "@/lib/stats";
import { TrafficChart } from "../_components/traffic-chart";
import { Card, FilterLinks, formatMoney, PageTitle, PanelSkeleton, Stat } from "../_components/ui";

const RANGES = [1, 7, 30, 90];

export default function AdminOverviewPage({ searchParams }: PageProps<"/navnit_admin">) {
  return (
    <Suspense fallback={<PanelSkeleton />}>
      <Overview searchParams={searchParams} />
    </Suspense>
  );
}

async function Overview({ searchParams }: { searchParams: PageProps<"/navnit_admin">["searchParams"] }) {
  await requireAdmin();
  const requested = Number((await searchParams).days);
  const days = RANGES.includes(requested) ? requested : 7;
  const stats = await getStats(days);

  const count = (status: string) => stats.orders.find((o) => o.status === status)?.count ?? 0;
  const sales = count("paid") + count("fulfilled");
  const checkouts = stats.orders.reduce((sum, o) => sum + o.count, 0);

  return (
    <>
      <PageTitle
        aside={
          <FilterLinks
            current={String(days)}
            options={RANGES.map((d) => ({
              value: String(d),
              label: d === 1 ? "24 hours" : `${d} days`,
              href: `/navnit_admin?days=${d}`,
            }))}
          />
        }
      >
        Overview
      </PageTitle>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <Stat label="Visitors" value={stats.humans.visitors.toLocaleString()} note="Unique browsers" />
        <Stat label="Page requests" value={stats.humans.requests.toLocaleString()} note="From people" />
        <Stat label="Bot requests" value={stats.bots.requests.toLocaleString()} />
        <Stat label="Sales" value={sales} note={`${checkouts} checkouts started`} />
        <Stat
          label="Revenue"
          value={stats.revenue.length ? formatMoney(stats.revenue[0].amount, stats.revenue[0].currency) : "$0.00"}
          note={
            stats.revenue.length > 1
              ? `+ ${stats.revenue
                  .slice(1)
                  .map((r) => formatMoney(r.amount, r.currency))
                  .join(", ")}`
              : "Paid and fulfilled orders"
          }
        />
      </div>

      <Card title="Requests per day" className="mt-6">
        <TrafficChart perDay={stats.perDay} days={days} />
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card title="Top pages (people)">
          <RankList
            rows={stats.topPages.map((p) => ({
              key: p.path,
              label: p.path,
              value: p.views,
              note: `${p.visitors} visitors`,
              href: `/navnit_admin/visits?type=human&path=${encodeURIComponent(p.path)}`,
            }))}
          />
        </Card>
        <Card title="Top bots">
          <RankList
            rows={stats.topBots.map((b) => ({
              key: b.bot,
              label: b.bot,
              value: b.requests,
              href: `/navnit_admin/visits?type=bot&bot=${encodeURIComponent(b.bot)}`,
            }))}
          />
        </Card>
      </div>

      <Card title="Orders by status" className="mt-6">
        {stats.orders.length === 0 ? (
          <p className="text-sm text-gray-500">No orders in this period.</p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {stats.orders.map((o) => (
              <Link
                key={o.status}
                href={`/navnit_admin/orders?status=${o.status}`}
                className="rounded-lg border border-gray-200 px-4 py-3 hover:border-gray-400"
              >
                <div className="text-xs text-gray-600">{o.status.replace("_", " ")}</div>
                <div className="text-xl font-semibold tabular-nums text-gray-950">{o.count}</div>
              </Link>
            ))}
          </div>
        )}
      </Card>
    </>
  );
}

/** A ranked list with an inline bar showing each row's share of the top row. */
function RankList({ rows }: { rows: { key: string; label: string; value: number; note?: string; href: string }[] }) {
  if (rows.length === 0) return <p className="text-sm text-gray-500">No data in this period.</p>;
  const max = rows[0].value;
  return (
    <ol className="space-y-1">
      {rows.map((r) => (
        <li key={r.key}>
          <Link href={r.href} className="block rounded-md px-2 py-1.5 hover:bg-gray-50">
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="truncate text-gray-900">{r.label}</span>
              <span className="shrink-0 tabular-nums text-gray-950">
                {r.value.toLocaleString()}
                {r.note && <span className="ml-2 text-xs text-gray-500">{r.note}</span>}
              </span>
            </div>
            <div className="mt-1 h-1 rounded-full bg-gray-100">
              <div className="h-1 rounded-full bg-lime-600" style={{ width: `${(r.value / max) * 100}%` }} />
            </div>
          </Link>
        </li>
      ))}
    </ol>
  );
}
