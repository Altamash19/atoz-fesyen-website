import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { CheckIcon, WhatsAppIcon } from "@/components/icons";
import { site } from "@/config/site";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getRelatedProducts, productName, type CatalogItem } from "@/lib/catalog";
import { absoluteUrl, whatsappLink } from "@/lib/whatsapp";

export function ProductView({ lang, item }: { lang: Locale; item: CatalogItem }) {
  const t = getDictionary(lang);
  const name = productName(item, lang);
  const path = `/${lang}/products/${item.slug}`;
  const url = absoluteUrl(path);
  const related = getRelatedProducts(item);

  const specs: { label: string; value: string }[] = [
    { label: t.product.category, value: item.categoryData.name[lang] },
    { label: t.product.collection, value: item.collectionData.name[lang] },
    { label: t.product.style, value: item.style[lang] },
    ...(item.fabric ? [{ label: t.product.fabric, value: item.fabric[lang] }] : []),
    { label: t.product.sizes, value: t.product.sizesValue },
    { label: t.product.price, value: t.product.priceValue },
  ];

  return (
    <div className="container-page py-8 md:py-12">
      <Breadcrumbs
        items={[
          { label: t.nav.home, href: `/${lang}` },
          { label: t.product.breadcrumb, href: `/${lang}/products` },
          { label: item.categoryData.name[lang], href: `/${lang}/category/${item.categoryData.id}` },
          { label: item.style[lang] },
        ]}
      />

      <article className="mt-6 grid gap-8 md:grid-cols-2 md:gap-10 lg:gap-16">
        <div className="md:sticky md:top-24 md:self-start">
          <div className="overflow-hidden rounded-[1.5rem] border border-line">
            <ProductImage item={item} lang={lang} size="large" priority />
          </div>
          {item.images && item.images.length > 1 && (
            <ul className="mt-3 grid grid-cols-4 gap-2">
              {item.images.slice(1, 5).map((src, i) => (
                <li key={src} className="relative aspect-square overflow-hidden rounded-xl border border-line bg-sand">
                  <Image src={src} alt={`${name} — ${i + 2}`} fill sizes="120px" className="object-cover" />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <p className="eyebrow">{item.categoryData.name[lang]}</p>
          <h1 className="mt-3 text-4xl leading-tight font-semibold text-brand-900 md:text-[2.75rem]">
            {item.collectionData.name[lang]}
            <span className="mt-1 block text-2xl font-medium text-ink/70 md:text-3xl">{item.style[lang]}</span>
          </h1>
          {item.isNew && (
            <span className="mt-4 inline-block rounded-full bg-gold px-3 py-1 text-xs font-bold tracking-wide text-white uppercase">
              {t.products.newBadge}
            </span>
          )}

          <p className="mt-5 text-lg leading-relaxed text-muted">{item.collectionData.description[lang]}</p>

          <p className="mt-5 flex items-center gap-2 text-sm font-medium text-brand-700">
            <CheckIcon width={18} height={18} /> {t.product.availabilityValue}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappLink(t.product.message(name, url))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp flex-1"
              data-testid="enquire-whatsapp"
            >
              <WhatsAppIcon /> {t.cta.enquire}
            </a>
            <a
              href={whatsappLink(t.product.quoteMessage(name, url))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline flex-1"
              data-testid="quote-whatsapp"
            >
              {t.cta.quote}
            </a>
          </div>

          <dl className="mt-8 divide-y divide-line rounded-card border border-line bg-white">
            {specs.map((s) => (
              <div key={s.label} className="grid grid-cols-[7.5rem_1fr] gap-4 px-5 py-3.5 text-sm sm:grid-cols-[9rem_1fr]">
                <dt className="font-medium text-muted">{s.label}</dt>
                <dd className="text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 rounded-card bg-brand-50 p-5">
            <h2 className="font-sans text-base font-semibold text-brand-800">{t.product.howTo}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-brand-900/80">{t.product.howToText}</p>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="mt-16 md:mt-24" aria-labelledby="related-heading">
          <div className="flex items-end justify-between gap-4">
            <h2 id="related-heading" className="text-2xl font-semibold text-brand-900 md:text-3xl">
              {t.product.related}
            </h2>
            <Link href={`/${lang}/category/${item.categoryData.id}`} className="shrink-0 text-sm font-semibold text-brand-700 hover:underline">
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
          name,
          description: item.collectionData.description[lang],
          category: item.categoryData.name[lang],
          url,
          ...(item.images?.length ? { image: item.images.map((i) => absoluteUrl(i)) } : {}),
          brand: { "@type": "Brand", name: site.name },
          ...(item.fabric ? { material: item.fabric[lang] } : {}),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: t.product.breadcrumb, item: absoluteUrl(`/${lang}/products`) },
            { "@type": "ListItem", position: 2, name: item.categoryData.name[lang], item: absoluteUrl(`/${lang}/category/${item.categoryData.id}`) },
            { "@type": "ListItem", position: 3, name, item: url },
          ],
        }}
      />
    </div>
  );
}
