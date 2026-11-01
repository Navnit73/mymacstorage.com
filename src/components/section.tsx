import type { ReactNode } from "react";

/** A landing-page section: centred heading and subtitle above the content. Shared by the home page and the UK pages. */
export function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id?: string;
  title: ReactNode;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-balance text-black sm:text-5xl">{title}</h2>
          {subtitle && (
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-pretty text-gray-500 sm:mt-4 sm:text-xl">
              {subtitle}
            </p>
          )}
        </div>
        <div className="mt-8 sm:mt-12">{children}</div>
      </div>
    </section>
  );
}
