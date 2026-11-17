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
