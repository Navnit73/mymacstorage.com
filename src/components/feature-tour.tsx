"use client";

import { useEffect, useRef, useState } from "react";
import { features } from "@/lib/features";
import { AppWindow } from "./app-window";

export function FeatureTour() {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Desktop: highlight whichever feature is crossing the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const current = features[active];

  return (
    <>
      {/* Phones and tablets: tool chips, description, screenshot. */}
      <div className="lg:hidden">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:justify-center">
          {features.map(({ name, icon: Icon }, i) => (
            <button
              key={name}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                i === active ? "bg-lime-600 text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              <Icon className="size-4" strokeWidth={1.75} />
              {name}
            </button>
          ))}
        </div>
        <p key={current.name} className="mx-auto mt-5 max-w-md animate-fade-in text-center text-pretty text-gray-600">
          {current.description}
        </p>
        <AppWindow className="mx-auto mt-5 max-w-2xl" active={current.name} image={current.image} />
      </div>

      {/* Desktop: list on the left, sticky screenshot on the right. */}
      <div className="hidden gap-10 lg:grid lg:grid-cols-[300px_1fr]">
        <ul className="flex flex-col gap-1 py-[15vh]">
          {features.map(({ name, description, icon: Icon }, i) => {
            const isActive = i === active;
            return (
              <li key={name}>
                <button
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  data-index={i}
                  onClick={() => {
                    setActive(i);
                    itemRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                  className={`flex min-h-28 w-full cursor-pointer gap-3 rounded-xl p-4 text-left transition-colors ${
                    isActive ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                >
                  <Icon
                    className={`mt-0.5 size-5 shrink-0 transition-colors ${isActive ? "text-lime-700" : "text-gray-400"}`}
                    strokeWidth={1.75}
                  />
                  <span className="flex flex-col gap-1">
                    <span
                      className={`text-base font-semibold transition-colors ${isActive ? "text-black" : "text-gray-500"}`}
                    >
                      {name}
                    </span>
                    <span
                      className={`text-sm leading-relaxed transition-colors ${
                        isActive ? "text-gray-700" : "text-gray-400"
                      }`}
                    >
                      {description}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div>
          <div className="sticky top-[max(5.5rem,calc(50vh-17rem))]">
            <AppWindow active={current.name} image={current.image} />
          </div>
        </div>
      </div>
    </>
  );
}
