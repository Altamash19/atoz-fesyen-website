import { site } from "@/config/site";

/** Builds a wa.me link that opens WhatsApp with a pre-filled message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}
