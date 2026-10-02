"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import type { Category, CategoryId } from "@/data/catalog";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import type { CatalogItem } from "@/lib/catalog";
import { ProductCard } from "./ProductCard";
import { SearchIcon } from "./icons";

interface Props {
  lang: Locale;
  items: CatalogItem[];
  categories: Category[];
  counts: Record<CategoryId, number>;
  total: number;
  active?: CategoryId;
}

/** Lowercase and strip accents/punctuation so "Jubbah", "jubah" and "jubbah," all match. */
function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/jubbah/g, "jubah")
    .replace(/[^a-z0-9 ]+/g, " ");
}

export function CatalogBrowser({ lang, items, categories, counts, total, active }: Props) {
  const t = getDictionary(lang);
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);

  // Search both languages so "kanak-kanak" and "kids" both work regardless of the current language.
  const index = useMemo(
    () =>
      items.map((p) => ({
        item: p,
        text: normalize(
          [p.name, p.code ?? "", (p.code ?? "").replace("AZ-", ""), p.tagline.en, p.tagline.ms, p.collectionData.name.en, p.collectionData.name.ms, p.categoryData.name.en, p.categoryData.name.ms, p.fabric ?? ""].join(" "),
        ),
      })),
    [items],
  );

  const results = useMemo(() => {
    const terms = normalize(deferred).split(/\s+/).filter(Boolean);
    if (!terms.length) return items;
    return index.filter(({ text }) => terms.every((term) => text.includes(term))).map(({ item }) => item);
  }, [deferred, index, items]);

  const chip = (selected: boolean) =>
    `inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition ${
      selected ? "border-brand-700 bg-brand-700 text-white" : "border-line bg-white text-ink hover:border-brand-600"
    }`;

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <nav aria-label={t.products.filterLabel} className="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
          <ul className="flex gap-2">
            <li>
              <Link href={`/${lang}/products/`} className={chip(!active)} aria-current={!active ? "page" : undefined}>
                {t.products.all} <span className="opacity-70">({total})</span>
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`/${lang}/category/${c.id}/`} className={chip(active === c.id)} aria-current={active === c.id ? "page" : undefined}>
                  {c.name[lang]} <span className="opacity-70">({counts[c.id]})</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative w-full lg:max-w-xs">
          <label htmlFor="catalog-search" className="sr-only">
            {t.products.search}
          </label>
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted" />
          <input
            id="catalog-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.products.searchPlaceholder}
            className="field !rounded-full !pl-10"
            autoComplete="off"
          />
        </div>
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite" data-testid="result-count">
        {t.products.results(results.length)}
      </p>

      {results.length > 0 ? (
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {results.map((p, i) => (
            <li key={p.slug} className="flex">
              <div className="w-full">
                <ProductCard item={p} lang={lang} priority={i < 4} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-card border border-dashed border-line bg-white p-10 text-center">
          <p className="text-muted">{t.products.empty}</p>
          <button type="button" onClick={() => setQuery("")} className="btn btn-outline mt-4">
            {t.products.clear}
          </button>
        </div>
      )}
    </div>
  );
}
