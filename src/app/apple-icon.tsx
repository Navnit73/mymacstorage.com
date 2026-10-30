import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Samee mark as the Logo component and icon.svg, at Apple touch icon size.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#000" }}>
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" strokeWidth="3.5" strokeLinecap="round">
          <circle cx="12" cy="12" r="8" stroke="#6a7282" />
          <path d="M12 4a8 8 0 0 1 8 8" stroke="#5ea500" />
          <path d="M20 12a8 8 0 0 1-8 8" stroke="#fff" />
        </svg>
      </div>
    ),
    size,
  );
}
