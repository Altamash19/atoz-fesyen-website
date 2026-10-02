"use client";

import Image from "next/image";
import { useState } from "react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import type { CatalogItem } from "@/lib/catalog";
import { whatsappLink } from "@/lib/whatsapp";
import { CheckIcon, WhatsAppIcon } from "./icons";

export interface GalleryImage {
  src: string;
  width: number;
  height: number;
  /** Shade number when this photo shows a specific shade. */
  shade?: string;
  label?: string;
}

interface Props {
  lang: Locale;
  item: CatalogItem;
  gallery: GalleryImage[];
  url: string;
}

/** Product photo gallery + shade picker + WhatsApp enquiry buttons (shade is included in the message). */
export function ProductDetail({ lang, item, gallery, url }: Props) {
  const t = getDictionary(lang);
  const [index, setIndex] = useState(0);
  const current = gallery[index];
  const shade = item.shades?.find((s) => s.no === current?.shade);
  const label = item.code ? `${item.name} (${item.code})` : item.name;
  const subject = shade ? `${label} — ${t.product.shade} ${shade.no} ${shade.name[lang]}` : label;

  const specs: { label: string; value: string }[] = [
    ...(item.code ? [{ label: t.product.code, value: item.code }] : []),
    { label: t.product.collection, value: item.collectionData.name[lang] },
    ...(item.fabric ? [{ label: t.product.fabric, value: item.fabric }] : []),
    { label: t.product.sizes, value: item.sizes[lang] },
    ...(item.colours ? [{ label: t.product.colours, value: item.colours[lang] }] : []),
    { label: t.product.price, value: t.product.priceValue },
    { label: t.product.moq, value: t.product.moqValue },
  ];

  return (
    <div className="grid gap-8 md:grid-cols-2 md:gap-10 lg:gap-16">
      {/* Gallery */}
      <div className="md:sticky md:top-24 md:self-start">
        {current && (
          <div className="flex justify-center overflow-hidden rounded-[1.5rem] border border-line bg-[#efebe3]">
            <Image
              key={current.src}
              src={current.src}
              alt={shade ? `${item.name} — ${shade.name[lang]}` : item.name}
              width={current.width}
              height={current.height}
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
              className="h-auto max-h-[78vh] w-auto max-w-full object-contain"
              data-testid="main-photo"
            />
          </div>
        )}
        {gallery.length > 1 && (
          <ul className="mt-3 flex flex-wrap gap-2" aria-label={t.product.photos}>
            {gallery.map((g, i) => (
              <li key={g.src}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-pressed={i === index}
                  aria-label={g.label ?? `${t.product.photo} ${i + 1}`}
                  title={g.label}
                  className={`relative block h-16 w-14 overflow-hidden rounded-lg border-2 bg-[#efebe3] transition sm:h-20 sm:w-16 ${
                    i === index ? "border-brand-700" : "border-transparent opacity-80 hover:opacity-100"
                  }`}
                >
                  <Image src={g.src} alt="" fill sizes="64px" className="object-cover object-top" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Details */}
      <div>
        <p className="eyebrow">
          {item.categoryData.name[lang]}
          {item.code && <span className="text-muted"> · {item.code}</span>}
        </p>
        <h1 className="mt-3 text-4xl leading-tight font-semibold text-brand-900 md:text-[2.75rem]">{item.name}</h1>
        <p className="mt-2 text-lg text-ink/70">{item.tagline[lang]}</p>
        {item.isNew && (
          <span className="mt-3 inline-block rounded-full bg-gold px-3 py-1 text-xs font-bold tracking-wide text-white uppercase">
            {t.products.newBadge}
          </span>
        )}

        <p className="mt-5 text-[1.05rem] leading-relaxed text-muted">{item.description[lang]}</p>

        {item.shades && (
          <fieldset className="mt-6">
            <legend className="text-sm font-semibold text-ink">
              {t.product.shade}: <span className="font-normal text-muted" data-testid="shade-name">{shade ? `${shade.no} · ${shade.name[lang]}` : t.product.pickShade}</span>
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.shades.map((s) => {
                const gi = gallery.findIndex((g) => g.shade === s.no);
                return (
                  <button
                    key={s.no}
                    type="button"
                    onClick={() => gi >= 0 && setIndex(gi)}
                    aria-pressed={shade?.no === s.no}
                    className={`rounded-full border px-3 py-1.5 text-sm transition ${
                      shade?.no === s.no ? "border-brand-700 bg-brand-700 text-white" : "border-line bg-white text-ink hover:border-brand-600"
                    }`}
                  >
                    {s.no} {s.name[lang]}
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        <p className="mt-6 flex items-center gap-2 text-sm font-medium text-brand-700">
          <CheckIcon width={18} height={18} /> {t.product.availabilityValue}
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappLink(t.product.message(subject, url))}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp flex-1"
            data-testid="enquire-whatsapp"
          >
            <WhatsAppIcon /> {t.cta.enquire}
          </a>
          <a
            href={whatsappLink(t.product.quoteMessage(subject, url))}
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
    </div>
  );
}
