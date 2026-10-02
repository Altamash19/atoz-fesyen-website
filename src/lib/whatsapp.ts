import { site } from "@/config/site";
import { basePath } from "./images";

/** Builds a wa.me link that opens WhatsApp with a pre-filled message. */
export function whatsappLink(message?: string, number: string = site.whatsapp): string {
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/**
 * Absolute URL for a site path. `site.url` is the full public base (including any sub-path),
 * and paths may or may not already carry the base path.
 */
export function absoluteUrl(path: string): string {
  const p = basePath && path.startsWith(basePath + "/") ? path.slice(basePath.length) : path;
  return site.url.replace(/\/$/, "") + p;
}
