"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import { dayNames, formatTime, openState, type OpenState } from "@/lib/hours";

/**
 * Live "Open now · closes 7 pm" badge, computed in Malaysia time.
 * Rendered only after mount so the static HTML never shows a stale status.
 */
export function OpenStatus({ lang, tone = "dark" }: { lang: Locale; tone?: "dark" | "light" }) {
  const [state, setState] = useState<OpenState | null>(null);

  useEffect(() => {
    const update = () => setState(openState());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  const base =
    tone === "dark"
      ? "bg-white/10 text-white ring-1 ring-white/20 backdrop-blur"
      : "bg-white text-ink ring-1 ring-line";

  if (!state) return <span className={`inline-flex h-9 w-48 rounded-full ${base} opacity-40`} aria-hidden="true" />;

  const text = state.open
    ? lang === "ms"
      ? `Dibuka sekarang · tutup ${formatTime(state.closesAt, lang)}`
      : `Open now · closes ${formatTime(state.closesAt, lang)}`
    : lang === "ms"
      ? `Ditutup · dibuka ${state.today ? "" : dayNames.ms[state.opensDay] + " "}${formatTime(state.opensAt, lang)}`
      : `Closed · opens ${state.today ? "" : dayNames.en[state.opensDay] + " "}${formatTime(state.opensAt, lang)}`;

  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${base}`} data-testid="open-status" aria-live="polite">
      <span className="relative flex h-2.5 w-2.5">
        {state.open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />}
        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${state.open ? "bg-emerald-400" : "bg-amber-400"}`} />
      </span>
      {text}
    </span>
  );
}
