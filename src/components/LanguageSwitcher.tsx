"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "@/i18n/config";

/** Swaps the first path segment (/en/... ↔ /ms/...) so visitors stay on the same page. */
export function LanguageSwitcher({ lang, className = "", dark = false }: { lang: Locale; className?: string; dark?: boolean }) {
  const pathname = usePathname() ?? `/${lang}`;
  const rest = pathname.replace(/^\/(en|ms)(?=\/|$)/, "");

  return (
    <div className={`items-center rounded-full border p-0.5 ${dark ? "border-white/15 bg-white/5" : "border-line bg-white"} text-xs font-semibold ${className || "flex"}`} role="group" aria-label="Language">
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest}`.replace(/\/?$/, "/")}
          hrefLang={l}
          lang={l}
          aria-current={l === lang ? "true" : undefined}
          title={localeNames[l]}
          className={`rounded-full px-2.5 py-1.5 uppercase transition ${
            l === lang ? (dark ? "bg-sage text-night-deep" : "bg-brand-700 text-white") : dark ? "text-white/70 hover:text-white" : "text-muted hover:text-ink"
          }`}
        >
          {l === "ms" ? "BM" : "EN"}
        </Link>
      ))}
    </div>
  );
}
