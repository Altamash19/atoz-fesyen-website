import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CatalogBrowser } from "@/components/CatalogBrowser";
import type { CategoryId } from "@/data/catalog";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { categories, countByCategory, getAllProducts, getCategory, getProductsByCategory } from "@/lib/catalog";

export function CatalogView({ lang, category }: { lang: Locale; category?: CategoryId }) {
  const t = getDictionary(lang);
  const cat = category ? getCategory(category) : undefined;
  const items = category ? getProductsByCategory(category) : getAllProducts();

  return (
    <div className="container-page py-10 md:py-14">
      <Breadcrumbs
        items={[
          { label: t.nav.home, href: `/${lang}` },
          ...(cat ? [{ label: t.nav.products, href: `/${lang}/products` }, { label: cat.name[lang] }] : [{ label: t.nav.products }]),
        ]}
      />
      <header className="mt-5 max-w-3xl">
        <h1 className="text-4xl font-semibold text-brand-900 md:text-5xl">{cat ? cat.name[lang] : t.products.title}</h1>
        <p className="mt-3 text-lg leading-relaxed text-muted">{cat ? cat.blurb[lang] : t.products.subtitle}</p>
      </header>
      <div className="mt-8">
        <CatalogBrowser
          lang={lang}
          items={items}
          categories={categories}
          counts={countByCategory()}
          total={getAllProducts().length}
          active={category}
        />
      </div>
    </div>
  );
}
