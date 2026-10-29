"use client";

import { useEffect, useRef, useState } from "react";

const TOTAL = 494.4;

type Segment = { label: string; gb: number; color: string; clearable: boolean };

const segments: Segment[] = [
  { label: "Kept", gb: 72, color: "bg-gray-300", clearable: false },
  { label: "Developer files", gb: 30, color: "bg-lime-700", clearable: true },
  { label: "Kept", gb: 53, color: "bg-gray-400", clearable: false },
  { label: "Old downloads", gb: 12, color: "bg-lime-600", clearable: true },
  { label: "Kept", gb: 70.9, color: "bg-gray-300", clearable: false },
  { label: "Caches", gb: 9.5, color: "bg-lime-600/70", clearable: true },
  { label: "Duplicates", gb: 11, color: "bg-lime-700/60", clearable: true },
  { label: "Kept", gb: 53, color: "bg-gray-400", clearable: false },
  { label: "Logs", gb: 3, color: "bg-lime-600/45", clearable: true },
  { label: "Leftovers", gb: 5, color: "bg-lime-700/35", clearable: true },
  { label: "Kept", gb: 30, color: "bg-gray-500", clearable: false },
];

const legend = [
  { label: "Kept", color: "bg-gray-400" },
  ...segments.filter((s) => s.clearable).map(({ label, color }) => ({ label, color })),
];

const clearableGb = segments.filter((s) => s.clearable).reduce((sum, s) => sum + s.gb, 0);
const usedGb = segments.reduce((sum, s) => sum + s.gb, 0);
const STEP_MS = 450;

export function StorageBar() {
  // Number of clearable segments that have been moved to the Trash so far.
  const [cleared, setCleared] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const clearableLabels = segments.filter((s) => s.clearable).map((s) => s.label);
  const done = cleared === clearableLabels.length;
  const running = started && !done;

  function play() {
    setCleared(0);
    setStarted(true);
  }

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play();
          observer.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setCleared((c) => c + 1), cleared === 0 ? 900 : STEP_MS);
    return () => clearTimeout(t);
  }, [running, cleared]);

  const isCleared = (label: string) => clearableLabels.indexOf(label) > -1 && clearableLabels.indexOf(label) < cleared;
  const freedGb = segments.filter((s) => isCleared(s.label)).reduce((sum, s) => sum + s.gb, 0);
  const freeGb = TOTAL - usedGb + freedGb;

  return (
    <div ref={ref} className="rounded-2xl bg-gray-100 p-4 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-semibold">Macintosh HD</h3>
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-black tabular-nums">{freeGb.toFixed(1)} GB</span> free of {TOTAL} GB
        </p>
      </div>

      <div className="mt-3 flex h-5 overflow-hidden rounded-md sm:h-6 bg-gray-200">
        {segments.map((s, i) => {
          const gone = s.clearable && isCleared(s.label);
          return (
            <div
              key={i}
              className={`${s.color} h-full border-white transition-[width,border-width] duration-500 ease-out ${
                gone ? "border-r-0" : "border-r-2"
              }`}
              style={{ width: gone ? 0 : `${(s.gb / TOTAL) * 100}%` }}
            />
          );
        })}
      </div>

      <div className="mt-4 flex flex-col gap-3 text-sm lg:flex-row lg:items-center lg:justify-between">
        <ul className="flex flex-wrap gap-x-3.5 gap-y-1.5 text-xs sm:gap-x-4 sm:text-sm">
          {legend.map(({ label, color }) => (
            <li
              key={label}
              className={`flex items-center gap-2 transition-colors ${
                isCleared(label) ? "text-gray-400 line-through" : "text-gray-700"
              }`}
            >
              <span className={`size-2.5 rounded-full ${color}`} />
              {label}
            </li>
          ))}
        </ul>

        <p className="flex shrink-0 items-center justify-between gap-4 border-t border-gray-200 pt-3 text-gray-700 lg:border-0 lg:pt-0">
          {done ? (
            <span>
              <span className="font-semibold text-black">Done.</span> {clearableGb.toFixed(1)} GB is in the Trash.
            </span>
          ) : (
            <span>
              <span className="font-semibold text-black">{running ? "Clearing…" : "Ready."}</span>{" "}
              {clearableGb.toFixed(1)} GB to clear.
            </span>
          )}
          <button
            onClick={play}
            disabled={running}
            className="cursor-pointer rounded-md px-1 font-medium text-lime-700 transition-colors hover:text-lime-600 disabled:cursor-default disabled:opacity-40"
          >
            {done ? "Replay" : "Clear"}
          </button>
        </p>
      </div>
    </div>
  );
}
