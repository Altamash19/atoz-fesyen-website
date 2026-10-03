"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import { dayNames, formatTime, shopNow, slotFor } from "@/lib/hours";

/** Weekly opening hours, Monday first, with today highlighted (Malaysia time). */
export function HoursTable({ lang }: { lang: Locale }) {
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => setToday(shopNow().day), []);
  const order = [1, 2, 3, 4, 5, 6, 0];
  const todayLabel = lang === "ms" ? "Hari ini" : "Today";

  return (
    <table className="w-full text-sm" data-testid="hours-table">
      <caption className="sr-only">{lang === "ms" ? "Waktu operasi" : "Opening hours"}</caption>
      <tbody>
        {order.map((d) => {
          const slot = slotFor(d);
          const isToday = d === today;
          return (
            <tr key={d} className={isToday ? "bg-brand-50 font-semibold text-brand-800" : "text-ink"} aria-current={isToday ? "date" : undefined}>
              <th scope="row" className="rounded-l-lg py-2.5 pl-3 text-left font-medium">
                {dayNames[lang][d]}
                {isToday && <span className="ml-2 rounded-full bg-brand-700 px-2 py-0.5 text-[0.65rem] font-bold tracking-wide text-white uppercase">{todayLabel}</span>}
              </th>
              <td className="rounded-r-lg py-2.5 pr-3 text-right tabular-nums">
                {slot ? `${formatTime(slot.open, lang)} – ${formatTime(slot.close, lang)}` : lang === "ms" ? "Tutup" : "Closed"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
