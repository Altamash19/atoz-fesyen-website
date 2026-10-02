import Link from "next/link";
import { site } from "@/config/site";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { categories } from "@/lib/catalog";
import { whatsappLink } from "@/lib/whatsapp";
import { ClockIcon, MailIcon, PinIcon, WhatsAppIcon } from "./icons";
import { Logo } from "./Logo";

export function Footer({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const year = new Date().getFullYear();

  return (
    <footer className="pattern-geo mt-20 text-white/85">
      <div className="container-page grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo inverted />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">{t.footer.tagline}</p>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp mt-6">
            <WhatsAppIcon /> {t.cta.whatsapp}
          </a>
        </div>

        <div className="grid grid-cols-2 gap-8 md:col-span-4">
          <div>
            <h2 className="font-sans text-sm font-semibold tracking-wider text-gold-soft uppercase">{t.nav.products}</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link href={`/${lang}/category/${c.id}`} className="hover:text-white hover:underline">
                    {c.name[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-sans text-sm font-semibold tracking-wider text-gold-soft uppercase">{t.footer.explore}</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href={`/${lang}/wholesale`} className="hover:text-white hover:underline">{t.nav.wholesale}</Link></li>
              <li><Link href={`/${lang}/about`} className="hover:text-white hover:underline">{t.nav.about}</Link></li>
              <li><Link href={`/${lang}/contact`} className="hover:text-white hover:underline">{t.nav.contact}</Link></li>
            </ul>
          </div>
        </div>

        <div className="md:col-span-3">
          <h2 className="font-sans text-sm font-semibold tracking-wider text-gold-soft uppercase">{t.footer.getInTouch}</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2.5"><PinIcon className="mt-0.5 shrink-0 text-gold-soft" width={18} height={18} />
              <span>{site.address.street}, {site.address.postcode} {site.address.city}, {site.address.state}</span>
            </li>
            <li className="flex gap-2.5"><MailIcon className="mt-0.5 shrink-0 text-gold-soft" width={18} height={18} />
              <a href={`mailto:${site.email}`} className="break-all hover:underline">{site.email}</a>
            </li>
            <li className="flex gap-2.5"><ClockIcon className="mt-0.5 shrink-0 text-gold-soft" width={18} height={18} />
              <span>{site.hours[lang]}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-1 pt-5 pb-24 text-xs text-white/55 sm:flex-row sm:justify-between lg:pb-5">
          <p>© {year} {site.legalName} ({site.registrationNo}). {t.footer.rights}</p>
          <p>atozfesyen.com</p>
        </div>
      </div>
    </footer>
  );
}
