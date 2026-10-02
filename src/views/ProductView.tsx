import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/ProductCard";
import { ProductDetail, type GalleryImage } from "@/components/ProductDetail";
import { site } from "@/config/site";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getRelatedProducts, type CatalogItem } from "@/lib/catalog";
import { getImage } from "@/lib/images";
import { absoluteUrl } from "@/lib/whatsapp";

export function ProductView({ lang, item }: { lang: Locale; item: CatalogItem }) {
  const t = getDictionary(lang);
  const url = absoluteUrl(`/${lang}/products/${item.slug}/`);
  const related = getRelatedProducts(item);

  // Product photos first, then one photo per shade (skipping duplicates).
  const gallery: GalleryImage[] = [];
  const seen = new Set<string>();
  for (const key of item.images ?? []) {
    const img = getImage(key);
    const shade = item.shades?.find((s) => s.image === key);
    if (img && !seen.has(key)) {
      seen.add(key);
      gallery.push({ ...img, shade: shade?.no, label: shade ? `${shade.no} ${shade.name[lang]}` : undefined });
    }
  }
  for (const s of item.shades ?? []) {
    const img = s.image ? getImage(s.image) : undefined;
    if (img && !seen.has(s.image!)) {
      seen.add(s.image!);
      gallery.push({ ...img, shade: s.no, label: `${s.no} ${s.name[lang]}` });
    }
  }

  return (
    <div className="container-page py-8 md:py-12">
      <Breadcrumbs
        items={[
          { label: t.nav.home, href: `/${lang}/` },
          { label: t.product.breadcrumb, href: `/${lang}/products/` },
          { label: item.categoryData.name[lang], href: `/${lang}/category/${item.categoryData.id}/` },
          { label: item.name },
        ]}
      />

      <article className="mt-6">
        <ProductDetail lang={lang} item={item} gallery={gallery} url={url} />
      </article>

      {related.length > 0 && (
        <section className="mt-16 md:mt-24" aria-labelledby="related-heading">
          <div className="flex items-end justify-between gap-4">
            <h2 id="related-heading" className="text-2xl font-semibold text-brand-900 md:text-3xl">
              {t.product.related}
            </h2>
            <Link href={`/${lang}/category/${item.categoryData.id}/`} className="shrink-0 text-sm font-semibold text-brand-700 hover:underline">
              {item.categoryData.name[lang]} →
            </Link>
          </div>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">
            {related.map((p) => (
              <li key={p.slug}>
                <ProductCard item={p} lang={lang} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: item.name,
          ...(item.code ? { sku: item.code, mpn: item.code } : {}),
          description: item.description[lang],
          category: item.categoryData.name[lang],
          url,
          ...(gallery.length ? { image: gallery.slice(0, 6).map((g) => absoluteUrl(g.src)) } : {}),
          brand: { "@type": "Brand", name: site.name },
          ...(item.fabric ? { material: item.fabric } : {}),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: t.product.breadcrumb, item: absoluteUrl(`/${lang}/products/`) },
            { "@type": "ListItem", position: 2, name: item.categoryData.name[lang], item: absoluteUrl(`/${lang}/category/${item.categoryData.id}/`) },
            { "@type": "ListItem", position: 3, name: item.name, item: url },
          ],
        }}
      />
    </div>
  );
}
