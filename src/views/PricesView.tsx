import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { WhatsAppIcon } from "@/components/icons";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { formatRM, getAllProducts, type CatalogItem } from "@/lib/catalog";
import { whatsappLink } from "@/lib/whatsapp";

interface Row {
  code?: string;
  name: string;
  href?: string;
  wholesale?: number;
  retail?: number;
  status?: "request" | "preorder";
}

/** Price list grouped like the printed catalogue's "Senarai Harga" page. */
export function PricesView({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const p = t.prices;
  const all = getAllProducts();
  const toRow = (i: CatalogItem): Row => ({
    code: i.code,
    name: i.name,
    href: `/${lang}/products/${i.slug}/`,
    wholesale: i.price?.wholesale,
    retail: i.price?.retail,
    status: i.priceStatus,
  });
  const pick = (cols: string[]) => all.filter((i) => cols.includes(i.collection)).map(toRow);

  const groups: { title: string; rows: Row[] }[] = [
    { title: lang === "ms" ? "Wanita" : "Ladies", rows: all.filter((i) => i.categoryData.id === "women").map(toRow) },
    { title: "Kurta", rows: pick(["kurta-lelaki", "kurta-bercorak"]) },
    {
      title: lang === "ms" ? "Jubah & Kurta China" : "Jubbah & China Kurta",
      rows: [...pick(["jubah-lelaki"]), { name: p.whitePutih, wholesale: 35, retail: 55 }, ...pick(["kurta-kolar-china"])],
    },
    { title: lang === "ms" ? "Kanak-kanak" : "Kids", rows: pick(["jubah-kanak"]) },
    { title: lang === "ms" ? "Baju Melayu & Sampin" : "Baju Melayu & Sampin", rows: pick(["baju-melayu", "sampin"]) },
    { title: lang === "ms" ? "Fabrik" : "Fabrics", rows: pick(["fabrik"]) },
  ];

  const cell = (r: Row, which: "wholesale" | "retail") => {
    const v = r[which];
    if (v) return formatRM(v);
    if (which === "retail") return "—";
    return r.status === "preorder" ? p.preorder : p.request;
  };

  return (
    <div className="container-page py-10 md:py-14">
      <Breadcrumbs items={[{ label: t.nav.home, href: `/${lang}/` }, { label: p.title }]} />
      <header className="mt-5 max-w-3xl">
        <h1 className="text-4xl font-semibold text-brand-900 md:text-5xl">{p.title}</h1>
        <p className="mt-3 text-lg leading-relaxed text-muted">{p.subtitle}</p>
        <p className="mt-2 text-sm font-semibold tracking-wider text-gold uppercase">RM · {t.product.perPiece}</p>
      </header>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {groups.map((g) => (
          <section key={g.title} className="overflow-hidden rounded-card border border-line bg-white" aria-labelledby={`pg-${g.title}`}>
            <h2 id={`pg-${g.title}`} className="border-b border-line bg-sand/60 px-5 py-3 font-sans text-sm font-semibold tracking-wider text-brand-800 uppercase">
              {g.title}
            </h2>
            <table className="w-full text-sm" data-testid="price-table">
              <thead>
                <tr className="text-left text-xs text-muted">
                  <th scope="col" className="py-2 pl-4 font-medium sm:pl-5">{p.design}</th>
                  <th scope="col" className="py-2 pr-2 text-right font-medium">{p.wholesale}</th>
                  <th scope="col" className="py-2 pr-4 text-right font-medium sm:pr-5">{p.retail}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {g.rows.map((r) => (
                  <tr key={(r.code ?? "") + r.name}>
                    <th scope="row" className="py-2.5 pl-4 text-left font-normal sm:pl-5">
                      {r.code && <span className="mr-2 inline-block w-[4.2rem] text-xs font-semibold text-gold">{r.code}</span>}
                      {r.href ? (
                        <Link href={r.href} className="text-ink hover:text-brand-700 hover:underline">
                          {r.name}
                        </Link>
                      ) : (
                        <span className="text-ink">{r.name}</span>
                      )}
                    </th>
                    <td className={`py-2.5 pr-2 text-right whitespace-nowrap tabular-nums ${r.wholesale ? "font-semibold text-brand-800" : "text-xs text-gold"}`}>
                      {cell(r, "wholesale")}
                    </td>
                    <td className="py-2.5 pr-4 text-right whitespace-nowrap text-muted tabular-nums sm:pr-5">{cell(r, "retail")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-[1.4fr_1fr]">
        <ul className="space-y-2 rounded-card border border-line bg-white p-6 text-sm text-muted">
          {p.notes.map((n) => (
            <li key={n} className="flex gap-2">
              <span className="text-gold">•</span>
              {n}
            </li>
          ))}
        </ul>
        <div className="pattern-geo flex flex-col justify-center gap-4 rounded-card p-6 text-white">
          <a
            href={whatsappLink(lang === "ms" ? "Salam A TO Z Fesyen, boleh hantar katalog pemborong 2026 (PDF)?" : "Hi A TO Z Fesyen, could you send me the 2026 wholesale catalogue (PDF)?")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            <WhatsAppIcon /> {p.download}
          </a>
          <Link href={`/${lang}/wholesale/`} className="text-center text-sm font-semibold text-white/85 hover:underline">
            {t.nav.wholesale} →
          </Link>
        </div>
      </div>
    </div>
  );
}
