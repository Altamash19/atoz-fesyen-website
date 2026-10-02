import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { categoryIds } from "@/data/catalog";
import { locales, localeTags } from "@/i18n/config";
import { getAllProducts } from "@/lib/catalog";

// Required for static export.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/products",
    "/wholesale",
    "/about",
    "/contact",
    ...categoryIds.map((c) => `/category/${c}`),
    ...getAllProducts().map((p) => `/products/${p.slug}`),
  ];
  const now = new Date();
  return paths.flatMap((path) =>
    locales.map((lang) => ({
      url: `${site.url}/${lang}${path}/`,
      lastModified: now,
      changeFrequency: path.startsWith("/products/") ? ("monthly" as const) : ("weekly" as const),
      priority: path === "" ? 1 : path === "/products" ? 0.9 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [localeTags[l], `${site.url}/${l}${path}/`])),
      },
    })),
  );
}
