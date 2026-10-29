"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { features } from "@/lib/features";
import { AppWindow } from "./app-window";

// Hero-only screenshots; other tools fall back to their image in features.ts.
const heroImages: Record<string, string> = {
  Overview:
    "https://res.cloudinary.com/dipzpwbbk/image/upload/c_crop,x_0,y_0,w_2460,h_1633/v1793287028/overview_lfyfha.jpg",
  Space:
    "https://res.cloudinary.com/dipzpwbbk/image/upload/c_crop,x_2,y_4,w_2491,h_1652/v1793287983/space_sunbruts_wwnt2d.jpg",
};

const slides = features.map(({ name, icon, image }) => ({ name, icon, src: heroImages[name] ?? image }));

const INTERVAL_MS = 4500;
const SWIPE_PX = 40;

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % slides.length), INTERVAL_MS);
    return () => clearTimeout(t);
  }, [index, paused]);

  const go = (step: number) => setIndex((i) => (i + step + slides.length) % slides.length);
  const select = (name: string) => setIndex(slides.findIndex((s) => s.name === name));
  const current = slides[index];

  return (
    <>
      <ul className="mx-auto mt-8 grid max-w-sm grid-cols-3 gap-1 sm:mt-10 sm:max-w-3xl sm:grid-cols-6">
        {slides.map(({ name, icon: Icon }, i) => {
          const isActive = i === index;
          return (
            <li key={name}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-pressed={isActive}
                className={`flex w-full cursor-pointer flex-col items-center gap-1.5 rounded-xl py-2.5 transition-colors sm:gap-2 ${
                  isActive ? "bg-white text-lime-700" : "text-gray-600 hover:text-black"
                }`}
              >
                <Icon
                  className={`size-5 transition-colors sm:size-6 ${isActive ? "text-lime-700" : "text-black"}`}
                  strokeWidth={1.5}
                />
                <span className="text-xs font-medium sm:text-sm">{name}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div
        className="mx-auto mt-6 max-w-5xl sm:mt-8"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > SWIPE_PX) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        <AppWindow active={current.name} onSelect={select}>
          <div className="relative aspect-[3/2]">
            {slides.map(({ name, src }, i) =>
              src ? (
                <Image
                  key={name}
                  src={src}
                  alt={`MyMacStorage ${name} screen on a Mac`}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  className={`object-cover object-top transition-opacity duration-700 ${
                    i === index ? "opacity-100" : "opacity-0"
                  }`}
                />
              ) : (
                <div
                  key={name}
                  className={`absolute inset-3 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-200 text-sm font-medium text-gray-500 transition-opacity duration-700 sm:inset-4 ${
                    i === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {name} screenshot coming soon
                </div>
              ),
            )}
          </div>
        </AppWindow>

        <div className="mt-4 flex justify-center gap-1 sm:mt-5">
          {slides.map(({ name }, i) => (
            <button
              key={name}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show ${name}`}
              className="group flex h-6 cursor-pointer items-center px-1"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-lime-600" : "w-1.5 bg-gray-300 group-hover:bg-gray-400"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
