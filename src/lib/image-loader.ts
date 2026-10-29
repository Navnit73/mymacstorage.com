"use client";

import type { ImageLoaderProps } from "next/image";

// Serves Cloudinary images straight from Cloudinary's CDN, resized and in the best format the browser
// accepts (AVIF or WebP), instead of routing them through the Next.js image optimizer.
// The resize is chained after any existing crop, just before the version segment.
export default function cloudinaryLoader({ src, width, quality }: ImageLoaderProps) {
  if (!src.startsWith("https://res.cloudinary.com/")) return src;
  const resize = `f_auto,q_${quality ?? "auto"},c_limit,w_${width}`;
  return /\/v\d+\//.test(src)
    ? src.replace(/\/(v\d+\/)/, `/${resize}/$1`)
    : src.replace("/image/upload/", `/image/upload/${resize}/`);
}
