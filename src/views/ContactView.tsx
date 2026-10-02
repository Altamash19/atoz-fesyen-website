import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/icons";
import { site } from "@/config/site";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { whatsappLink } from "@/lib/whatsapp";

function Row({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex gap-4 py-5">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700">{icon}</span>
      <div>
        <p className="text-sm font-medium text-muted">{label}</p>
        <div className="mt-0.5 text-ink">{children}</div>
      </div>
    </li>
  );
}

export function ContactView({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const a = site.address;
  return (
    <div className="container-page py-10 md:py-14">
      <Breadcrumbs items={[{ label: t.nav.home, href: `/${lang}` }, { label: t.nav.contact }]} />
      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <h1 className="text-4xl font-semibold text-brand-900 md:text-5xl">{t.contact.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{t.contact.subtitle}</p>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp mt-8">
            <WhatsAppIcon /> {t.cta.whatsapp}
          </a>
        </div>

        <ul className="divide-y divide-line rounded-[1.5rem] border border-line bg-white px-6">
          <Row icon={<WhatsAppIcon />} label={t.contact.whatsapp}>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-brand-700 hover:underline">
              {site.phoneDisplay}
            </a>
          </Row>
          <Row icon={<PhoneIcon />} label={t.contact.phone}>
            <a href={`tel:+${site.whatsapp}`} className="font-medium hover:text-brand-700 hover:underline">
              {site.phoneDisplay}
            </a>
          </Row>
          <Row icon={<MailIcon />} label={t.contact.email}>
            <a href={`mailto:${site.email}`} className="font-medium break-all hover:text-brand-700 hover:underline">
              {site.email}
            </a>
          </Row>
          <Row icon={<PinIcon />} label={t.contact.address}>
            <address className="not-italic">
              {site.legalName}
              <br />
              {a.street}
              <br />
              {a.postcode} {a.city}, {a.state}, {a.country}
            </address>
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-brand-700 hover:underline">
              {t.contact.directions} →
            </a>
          </Row>
          <Row icon={<ClockIcon />} label={t.contact.hours}>
            {site.hours[lang]}
          </Row>
        </ul>
      </div>
    </div>
  );
}
