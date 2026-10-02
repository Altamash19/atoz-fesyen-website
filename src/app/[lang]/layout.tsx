import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import "../globals.css";
import { JsonLd } from "@/components/JsonLd";
import { SiteShell } from "@/components/SiteShell";
import { site } from "@/config/site";
import { isLocale, locales, localeTags } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { absoluteUrl } from "@/lib/whatsapp";

const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const heading = Playfair_Display({ subsets: ["latin"], variable: "--font-heading", display: "swap" });

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.title, template: `%s | ${site.name}` },
    description: t.meta.description,
    applicationName: site.name,
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#115540",
  width: "device-width",
  initialScale: 1,
};

export default async function LangLayout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={localeTags[lang]} className={`${body.variable} ${heading.variable}`}>
      <body>
        <SiteShell lang={lang}>{children}</SiteShell>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "ClothingStore",
            name: site.legalName,
            url: absoluteUrl(`/${lang}`),
            foundingDate: String(site.foundedYear),
            telephone: `+${site.whatsapp}`,
            email: site.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: site.address.street,
              addressLocality: site.address.city,
              addressRegion: site.address.state,
              postalCode: site.address.postcode,
              addressCountry: "MY",
            },
          }}
        />
      </body>
    </html>
  );
}
