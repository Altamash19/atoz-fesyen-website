import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HoursTable } from "@/components/HoursTable";
import { OpenStatus } from "@/components/OpenStatus";
import { ShopGallery, type ShopPhoto } from "@/components/ShopGallery";
import { ClockIcon, PinIcon, WhatsAppIcon } from "@/components/icons";
import { site } from "@/config/site";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { requireImage } from "@/lib/images";
import { whatsappLink } from "@/lib/whatsapp";

const galleryKeys = ["shop-front", "shop-kurta-wall", "shop-stock", "shop-ladies", "shop-floor", "shop-stockroom", "shop-front-2", "shop-cashier"];

export function ShopView({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const s = t.shop;
  const front = requireImage("shop-front");
  const floor = requireImage("shop-floor");
  const a = site.address;
  const photos: ShopPhoto[] = galleryKeys.map((k) => ({ ...requireImage(k), alt: s.alts[k] }));
  const whatsappMsg =
    lang === "ms"
      ? "Salam A TO Z Fesyen, saya akan datang ke kedai. Boleh sediakan rekaan berikut?\n\nKod & warna: \nSaiz & kuantiti: \nTarikh datang: "
      : "Hi A TO Z Fesyen, I'm coming to the shop. Could you have these ready?\n\nCodes & shades: \nSizes & quantities: \nVisit date: ";

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="pattern-geo relative overflow-hidden text-white">
        <div className="container-page relative grid items-center gap-10 py-10 md:py-16 lg:grid-cols-12 lg:gap-12 lg:py-20">
          <div className="lg:col-span-6">
            <Breadcrumbs items={[{ label: t.nav.home, href: `/${lang}/` }, { label: s.nav }]} tone="dark" />
            <p className="eyebrow mt-8 !text-gold-soft">{s.eyebrow}</p>
            <h1 className="mt-4 text-[2.6rem] leading-[1.02] font-semibold sm:text-6xl lg:text-[4.2rem]">
              {s.title}
              <span className="mt-2 block font-normal text-gold-soft italic">{s.titleAccent}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">{s.intro}</p>
            <div className="mt-7">
              <OpenStatus lang={lang} />
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-light">
                <PinIcon width={18} height={18} /> {s.directions}
              </a>
              <a href={whatsappLink(whatsappMsg)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                <WhatsAppIcon width={18} height={18} /> {s.whatsappAhead}
              </a>
            </div>
          </div>

          {/* Photo stack */}
          <div className="relative mx-auto w-full max-w-md lg:col-span-6 lg:max-w-none">
            <div className="relative ml-auto aspect-[3/4] w-[82%] rotate-[1.5deg] overflow-hidden rounded-[2rem] shadow-2xl shadow-black/40 ring-1 ring-white/15">
              <Image src={front.src} alt={s.alts["shop-front"]} fill priority sizes="(min-width: 1024px) 480px, 80vw" className="object-cover" />
            </div>
            <div className="absolute bottom-[-6%] left-0 aspect-[3/4] w-[44%] -rotate-[4deg] overflow-hidden rounded-[1.5rem] border-4 border-brand-900 shadow-xl shadow-black/40">
              <Image src={floor.src} alt="" fill sizes="(min-width: 1024px) 260px, 40vw" className="object-cover" />
            </div>
            {/* Stamp */}
            <div className="absolute top-[6%] left-[4%] grid h-24 w-24 -rotate-12 place-items-center rounded-full bg-gold text-center font-display leading-tight text-white shadow-lg sm:h-28 sm:w-28" aria-hidden="true">
              <span>
                <span className="block text-[0.6rem] font-sans font-bold tracking-[0.2em] uppercase">Lot</span>
                <span className="block text-3xl font-semibold sm:text-4xl">20</span>
                <span className="block text-[0.6rem] font-sans font-bold tracking-[0.2em] uppercase">{lang === "ms" ? "Tingkat 7" : "Floor 7"}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Stats ribbon */}
        <div className="relative border-t border-white/10 bg-black/15">
          <dl className="container-page grid grid-cols-2 gap-y-6 py-7 md:grid-cols-4">
            {s.stats.map((st) => (
              <div key={st.l} className="flex flex-col-reverse border-white/10 px-2 md:border-l md:first:border-l-0 md:pl-6">
                <dt className="mt-1 text-xs text-white/60">{st.l}</dt>
                <dd className="font-display text-2xl font-semibold text-gold-soft md:text-3xl">{st.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Tour ───────────────────────────────────────────── */}
      <section className="container-page py-16 md:py-24" aria-labelledby="tour-heading">
        <div className="max-w-2xl">
          <p className="eyebrow">{s.tourEyebrow}</p>
          <h2 id="tour-heading" className="mt-2 text-3xl font-semibold text-brand-900 md:text-5xl">{s.tourTitle}</h2>
        </div>
        <ol className="mt-12 space-y-16 md:mt-16 md:space-y-24">
          {s.tour.map((stop, i) => {
            const img = requireImage(stop.img);
            const flip = i % 2 === 1;
            return (
              <li key={stop.title} className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
                <div className={`relative md:col-span-6 ${flip ? "md:order-2 md:col-start-7" : ""}`}>
                  <div className={`absolute inset-0 translate-x-3 translate-y-3 rounded-[1.75rem] border-2 border-gold/50 ${flip ? "md:-translate-x-3" : ""}`} aria-hidden="true" />
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-sand">
                    <Image src={img.src} alt={s.alts[stop.img]} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover transition duration-700 hover:scale-[1.03]" />
                  </div>
                </div>
                <div className={`md:col-span-5 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-8"}`}>
                  <span className="num-outline font-display text-7xl leading-none font-semibold md:text-8xl" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 text-2xl font-semibold text-brand-900 md:text-3xl">{stop.title}</h3>
                  <p className="mt-3 text-lg leading-relaxed text-muted">{stop.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* ── Gallery ────────────────────────────────────────── */}
      <section className="border-y border-line bg-sand/60 py-16 md:py-20" aria-labelledby="gallery-heading">
        <div className="container-page">
          <div className="mb-8 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="gallery-heading" className="text-3xl font-semibold text-brand-900 md:text-4xl">{s.galleryTitle}</h2>
            <p className="text-sm text-muted">{s.gallerySubtitle}</p>
          </div>
          <ShopGallery photos={photos} lang={lang} />
        </div>
      </section>

      {/* ── Plan your visit ────────────────────────────────── */}
      <section className="container-page py-16 md:py-24" aria-labelledby="visit-heading">
        <h2 id="visit-heading" className="text-3xl font-semibold text-brand-900 md:text-4xl">{s.visitTitle}</h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <div className="rounded-[1.5rem] border border-line bg-white p-6 md:p-7">
            <h3 className="flex items-center gap-2 font-sans text-sm font-semibold tracking-wider text-gold uppercase">
              <ClockIcon width={18} height={18} /> {s.hoursTitle}
            </h3>
            <div className="mt-4">
              <HoursTable lang={lang} />
            </div>
            <div className="mt-5">
              <OpenStatus lang={lang} tone="light" />
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-line bg-white p-6 md:p-7">
            <h3 className="flex items-center gap-2 font-sans text-sm font-semibold tracking-wider text-gold uppercase">
              <PinIcon width={18} height={18} /> {s.findTitle}
            </h3>
            <ol className="mt-5 space-y-4">
              {s.findSteps.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-700 font-display text-sm font-semibold text-white">{i + 1}</span>
                  <span className="pt-1 text-ink">{step}</span>
                </li>
              ))}
            </ol>
            <address className="mt-6 border-t border-line pt-4 text-sm leading-relaxed text-muted not-italic">
              {site.legalName}
              <br />
              {a.unit}, {a.building}, {a.street}, {a.postcode} {a.city}
            </address>
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline mt-5 w-full">
              <PinIcon width={18} height={18} /> {s.directions}
            </a>
          </div>

          <div className="pattern-geo flex flex-col justify-between rounded-[1.5rem] p-6 text-white md:p-7">
            <div>
              <h3 className="text-2xl font-semibold">{s.ctaTitle}</h3>
              <p className="mt-3 leading-relaxed text-white/80">{s.ctaText}</p>
            </div>
            <a href={whatsappLink(whatsappMsg)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp mt-6 w-full" data-testid="visit-whatsapp">
              <WhatsAppIcon /> {s.whatsappAhead}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
