import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { formatRM, type CatalogItem } from "@/lib/catalog";
import { ProductImage } from "./ProductImage";

export function ProductCard({ item, lang, priority = false, note }: { item: CatalogItem; lang: Locale; priority?: boolean; note?: string }) {
  const t = getDictionary(lang);
  return (
    <Link
      href={`/${lang}/products/${item.slug}/`}
      className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-14px_rgb(36_80_47/0.35)]"
      data-testid="product-card"
    >
      <div className="overflow-hidden">
        <div className="transition duration-500 group-hover:scale-[1.03]">
          <ProductImage item={item} lang={lang} priority={priority} />
        </div>
      </div>
      {item.isNew && (
        <span className="absolute top-3 left-3 rounded-full bg-sage px-2.5 py-1 text-[0.7rem] font-bold tracking-wide text-night-deep uppercase">
          {t.products.newBadge}
        </span>
      )}
      <div className="flex flex-1 flex-col gap-1 p-3.5 sm:p-4">
        <p className="text-[0.7rem] font-semibold tracking-wider text-gold uppercase">{item.code ?? item.collectionData.name[lang]}</p>
        <h3 className="font-display text-[1.05rem] leading-snug font-semibold text-ink sm:text-lg">{item.name}</h3>
        <p className="text-sm leading-snug text-muted">{note ?? item.tagline[lang]}</p>
        <p className="mt-1.5 text-sm" data-testid="card-price">
          {item.price ? (
            <>
              <span className="font-semibold text-brand-800">{formatRM(item.price.wholesale)}</span>
              <span className="text-muted"> {t.product.wholesale.toLowerCase()}</span>
              {item.price.retail && <span className="text-muted"> · {t.product.retail} {formatRM(item.price.retail)}</span>}
            </>
          ) : (
            <span className="font-medium text-gold">{item.priceStatus === "preorder" ? t.product.preorder : t.product.priceOnRequest}</span>
          )}
        </p>
        <span className="mt-auto pt-2 text-sm font-semibold text-brand-700 group-hover:underline">{t.cta.viewProduct} →</span>
      </div>
    </Link>
  );
}
