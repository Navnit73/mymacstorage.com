import type { Stats } from "@/lib/stats";

type Day = { day: string; people: number; bots: number };

/** Requests per day, people stacked on bots. Each bar has a hover tooltip; the table below gives exact numbers. */
export function TrafficChart({ perDay, days }: { perDay: Stats["perDay"]; days: number }) {
  const series = fillDays(perDay, days);
  const max = Math.max(1, ...series.map((d) => d.people + d.bots));
  const ticks = [max, Math.round(max / 2), 0];

  return (
    <div>
      <div className="mb-3 flex gap-4 text-xs text-gray-700" aria-hidden>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-lime-600" /> People
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-gray-400" /> Bots
        </span>
      </div>

      <div className="flex gap-2" role="img" aria-label={`Requests per day for the last ${days} days, people and bots`}>
        <div className="flex h-48 flex-col justify-between text-right text-[11px] tabular-nums text-gray-500">
          {ticks.map((t) => (
            <span key={t} className="leading-none">
              {t}
            </span>
          ))}
        </div>
        <div className="relative flex h-48 flex-1 items-end gap-[2px] border-b border-gray-300">
          <div className="pointer-events-none absolute inset-x-0 top-0 border-t border-dashed border-gray-200" />
          <div className="pointer-events-none absolute inset-x-0 top-1/2 border-t border-dashed border-gray-200" />
          {series.map((d) => (
            <div key={d.day} className="group relative flex h-full min-w-0 flex-1 flex-col justify-end">
              {/* Hover target spans the full column height, wider than the bar itself. */}
              <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-950 px-2.5 py-1.5 text-xs text-white group-hover:block">
                <div className="font-medium">{d.day}</div>
                <div>People: {d.people}</div>
                <div>Bots: {d.bots}</div>
              </div>
              <div
                className="mx-auto flex w-full max-w-6 flex-col justify-end gap-[2px] group-hover:opacity-80"
                style={{ height: `${((d.people + d.bots) / max) * 100}%` }}
              >
                {d.people > 0 && (
                  <div className="rounded-t-[4px] bg-lime-600" style={{ flexGrow: d.people, minHeight: 2 }} />
                )}
                {d.bots > 0 && (
                  <div
                    className={`bg-gray-400 ${d.people > 0 ? "" : "rounded-t-[4px]"}`}
                    style={{ flexGrow: d.bots, minHeight: 2 }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="ml-8 mt-1 flex justify-between text-[11px] text-gray-500">
        <span>{series[0]?.day}</span>
        <span>{series.at(-1)?.day}</span>
      </div>

      <details className="mt-4 text-sm">
        <summary className="cursor-pointer text-gray-600 hover:text-gray-950">Show as table</summary>
        <div className="mt-2 max-h-64 overflow-auto rounded-lg border border-gray-200">
          <table className="w-full text-left text-sm tabular-nums">
            <thead className="sticky top-0 bg-gray-50 text-xs text-gray-600">
              <tr>
                <th className="px-3 py-2 font-medium">Day (UTC)</th>
                <th className="px-3 py-2 text-right font-medium">People</th>
                <th className="px-3 py-2 text-right font-medium">Bots</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {series.toReversed().map((d) => (
                <tr key={d.day}>
                  <td className="px-3 py-1.5">{d.day}</td>
                  <td className="px-3 py-1.5 text-right">{d.people}</td>
                  <td className="px-3 py-1.5 text-right">{d.bots}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}

/** One entry per day in the range, including days with no traffic, oldest first. Days are UTC, as in the query. */
function fillDays(perDay: Stats["perDay"], days: number): Day[] {
  const byDay = new Map<string, Day>();
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const day = new Date(today.getTime() - i * 86_400_000).toISOString().slice(0, 10);
    byDay.set(day, { day, people: 0, bots: 0 });
  }
  for (const row of perDay) {
    const entry = byDay.get(row.day);
    if (entry) entry[row.isBot ? "bots" : "people"] += row.requests;
  }
  return [...byDay.values()];
}
