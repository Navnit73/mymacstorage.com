import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(self)" },
          // Only blocks other sites from framing ours. A full script-src policy needs testing against Clarity, Ahrefs and Dodo.
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'; base-uri 'self'; object-src 'none'" },
        ],
      },
    ];
  },
  redirects() {
    return [
      {
        source: "/guides/how-to-free-up-disk-space-on-mac",
        destination: "/guides/how-to-free-up-space-on-mac",
        permanent: true,
      },
      // November 2026: the US and UK copies of each page were near-duplicates competing with each other and with
      // the /guides pages. Each now has one URL; every old copy redirects to it. Specific paths must stay above the catch-alls.
      { source: "/en-US/mac-cleaner-for-mac", destination: "/best-mac-cleaner", permanent: true },
      { source: "/en-US/app-cleaner-for-mac", destination: "/app-cleaner-for-mac", permanent: true },
      { source: "/en-GB/app-cleaner-for-mac", destination: "/app-cleaner-for-mac", permanent: true },
      { source: "/en-US/cleanmymac-alternative", destination: "/cleanmymac-alternative", permanent: true },
      { source: "/en-GB/cleanmymac-alternative", destination: "/cleanmymac-alternative", permanent: true },
      { source: "/en-US/mac-disk-space-analyzer", destination: "/mac-disk-space-analyzer", permanent: true },
      { source: "/en-GB/mac-disk-space-analyser", destination: "/mac-disk-space-analyzer", permanent: true },
      { source: "/en-US/how-to-clear-ram-on-mac", destination: "/guides/how-to-clear-ram-on-mac", permanent: true },
      { source: "/en-GB/how-to-clear-ram-on-mac", destination: "/guides/how-to-clear-ram-on-mac", permanent: true },
      { source: "/en-GB/mac-disk-space-cleaner", destination: "/guides/how-to-free-up-space-on-mac", permanent: true },
      { source: "/en-GB/macbook-system-data-too-large", destination: "/guides/how-to-reduce-system-data-on-mac", permanent: true },
      { source: "/en-US", destination: "/guides", permanent: true },
      { source: "/en-GB", destination: "/guides", permanent: true },
      { source: "/en-US/:path*", destination: "/guides", permanent: true },
      { source: "/en-GB/:path*", destination: "/guides", permanent: true },
    ];
  },
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
