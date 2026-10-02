import { imageManifest } from "@/data/image-manifest";

/**
 * Prefix for sites served from a sub-path (e.g. GitHub Pages project sites: /atoz-fesyen-website).
 * Set by the deploy workflow; empty for a custom domain.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export interface SiteImage {
  src: string;
  width: number;
  height: number;
}

/** Looks up a photo by key (file name without extension) and returns a ready-to-use src. */
export function getImage(key: string): SiteImage | undefined {
  const img = imageManifest[key];
  return img ? { ...img, src: basePath + img.src } : undefined;
}

export function requireImage(key: string): SiteImage {
  const img = getImage(key);
  if (!img) throw new Error(`Image "${key}" not found — run \`npm run images\` after adding photos.`);
  return img;
}
