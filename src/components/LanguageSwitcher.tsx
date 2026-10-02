"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "@/i18n/config";

/** Swaps the first path segment (/en/... ↔ /ms/...) so visitors stay on the same page. */
export function LanguageSwitcher({ lang, className = "" }: { lang: Locale; className?: string }) {
  const pathname = usePathname() ?? `/${lang}`;
  const rest = pathname.replace(/^\/(en|ms)(?=\/|$)/, "");

  return (
    <div className={`items-center rounded-full border border-line bg-white p-0.5 text-xs font-semibold ${className || "flex"}`} role="group" aria-label="Language">
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest}`.replace(/\/?$/, "/")}
          hrefLang={l}
          lang={l}
          aria-current={l === lang ? "true" : undefined}
          title={localeNames[l]}
          className={`rounded-full px-2.5 py-1.5 uppercase transition ${
            l === lang ? "bg-brand-700 text-white" : "text-muted hover:text-ink"
          }`}
        >
          {l === "ms" ? "BM" : "EN"}
        </Link>
      ))}
    </div>
  );
}
