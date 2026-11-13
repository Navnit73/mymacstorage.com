import type { ReactNode } from "react";

/** A landing-page section: centred heading and subtitle above the content. Shared by the home page and the UK pages. */
export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  className = "",
  children,
}: {
  id?: string;
  /** A short lime label above the heading, e.g. "How it works". */
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`px-4 py-14 sm:px-6 sm:py-20 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl">
        <div className="reveal mx-auto max-w-3xl text-center">
          {eyebrow && (
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-lime-700 uppercase sm:mb-4 sm:text-sm">
              <span aria-hidden className="h-px w-5 bg-lime-600" />
              {eyebrow}
              <span aria-hidden className="h-px w-5 bg-lime-600" />
            </p>
          )}
          <h2 className="text-[clamp(1.85rem,6.4vw,3rem)] leading-[1.08] font-bold tracking-tight text-balance text-black">
            {title}
          </h2>
          {subtitle && (
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-pretty text-gray-500 sm:mt-4 sm:text-xl">
              {subtitle}
            </p>
          )}
        </div>
        <div className="reveal mt-8 sm:mt-12">{children}</div>
      </div>
    </section>
  );
}
