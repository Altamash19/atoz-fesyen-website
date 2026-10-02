import type { NextConfig } from "next";

/**
 * Static export: `npm run build` writes a plain HTML site to /out that any static host can serve
 * (GitHub Pages, Vercel, Netlify, cPanel…). No server needed — WhatsApp handles all enquiries.
 *
 * NEXT_PUBLIC_BASE_PATH is set by the GitHub Pages workflow when the site is served from
 * a sub-path (username.github.io/repo). It is empty once a custom domain is connected.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true }, // photos are pre-optimised WebP (see scripts/gen-image-manifest.mjs)
  poweredByHeader: false,
};

export default nextConfig;
