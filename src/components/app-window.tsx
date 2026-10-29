import type { ReactNode } from "react";
import Image from "next/image";
import { Settings } from "lucide-react";
import { features } from "@/lib/features";

type Props = {
  active?: string;
  image?: string | null;
  className?: string;
  /** Replaces the window body, e.g. for a slider. */
  children?: ReactNode;
  /** Makes the tabs clickable. */
  onSelect?: (name: string) => void;
};

export function AppWindow({ active = "Overview", image = null, className = "", children, onSelect }: Props) {
  const activeFeature = features.find((f) => f.name === active);
  const ActiveIcon = activeFeature?.icon;

  return (
    <div className={`overflow-hidden rounded-lg border border-gray-200 bg-white sm:rounded-xl ${className}`}>
      <div className="flex items-center gap-4 border-b border-gray-100 px-3 py-2 sm:px-4 sm:py-2.5">
        <div className="flex shrink-0 gap-1.5">
          {/* macOS traffic lights: close, minimise, maximise */}
          <span className="size-2 rounded-full bg-[#ff5f57] sm:size-2.5" />
          <span className="size-2 rounded-full bg-[#febc2e] sm:size-2.5" />
          <span className="size-2 rounded-full bg-[#28c840] sm:size-2.5" />
        </div>

        {/* Phones: just the active tab's name. */}
        <span className="flex flex-1 items-center justify-center gap-1.5 text-xs font-semibold sm:hidden">
          {ActiveIcon && <ActiveIcon className="size-3.5" strokeWidth={1.75} />}
          {active}
        </span>

        <nav className="hidden flex-1 justify-center gap-4 overflow-x-auto text-[11px] text-gray-600 [scrollbar-width:none] sm:flex">
          {features.map(({ name, icon: Icon }) => {
            const className = `flex shrink-0 items-center gap-1.5 border-b-2 py-1 transition-colors ${
              name === active ? "border-black font-semibold text-black" : "border-transparent"
            }`;
            const content = (
              <>
                <Icon className="size-3.5" strokeWidth={1.75} />
                {name}
              </>
            );
            return onSelect ? (
              <button
                key={name}
                type="button"
                onClick={() => onSelect(name)}
                className={`${className} cursor-pointer hover:text-black`}
              >
                {content}
              </button>
            ) : (
              <span key={name} className={className}>
                {content}
              </span>
            );
          })}
        </nav>

        <Settings className="size-3.5 shrink-0 text-gray-500 sm:size-4" strokeWidth={1.75} />
      </div>

      {children ? (
        children
      ) : image ? (
        // The window takes the screenshot's own height, so it is never cropped or letterboxed.
        <Image
          key={image}
          src={image}
          alt={`MyMacStorage ${active} screen on a Mac`}
          width={1385}
          height={940}
          sizes="(min-width: 1024px) 800px, 100vw"
          className="block h-auto w-full animate-fade-in"
        />
      ) : (
        <div className="relative aspect-[3/2] bg-white">
          <div className="absolute inset-3 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-200 text-center text-sm font-medium text-gray-500 sm:inset-4">
            {active} screenshot coming soon
          </div>
        </div>
      )}
    </div>
  );
}
