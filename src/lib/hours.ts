import { site } from "@/config/site";
import type { Locale } from "@/i18n/config";

export const dayNames: Record<Locale, string[]> = {
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  ms: ["Ahad", "Isnin", "Selasa", "Rabu", "Khamis", "Jumaat", "Sabtu"],
};

/** Opening slot for a given weekday (0 = Sunday), or undefined if closed. */
export function slotFor(day: number) {
  return site.schedule.find((s) => (s.days as readonly number[]).includes(day));
}

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** "19:00" → "7 pm" / "7 malam" */
export function formatTime(hhmm: string, lang: Locale): string {
  const [h, m] = hhmm.split(":").map(Number);
  const h12 = h % 12 || 12;
  const mins = m ? `:${String(m).padStart(2, "0")}` : "";
  if (lang === "ms") {
    const part = h < 12 ? "pagi" : h < 14 ? "tengah hari" : h < 19 ? "petang" : "malam";
    return `${h12}${mins ? "." + String(m).padStart(2, "0") : ""} ${part}`;
  }
  return `${h12}${mins} ${h < 12 ? "am" : "pm"}`;
}

/** Current day and minutes-past-midnight in the shop's time zone (Malaysia). */
export function shopNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: site.timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, minutes: (Number(get("hour")) % 24) * 60 + Number(get("minute")) };
}

export type OpenState =
  | { open: true; closesAt: string }
  | { open: false; opensAt: string; opensDay: number; today: boolean };

export function openState(date = new Date()): OpenState {
  const { day, minutes } = shopNow(date);
  const today = slotFor(day);
  if (today && minutes >= toMinutes(today.open) && minutes < toMinutes(today.close)) {
    return { open: true, closesAt: today.close };
  }
  if (today && minutes < toMinutes(today.open)) return { open: false, opensAt: today.open, opensDay: day, today: true };
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    const slot = slotFor(d);
    if (slot) return { open: false, opensAt: slot.open, opensDay: d, today: false };
  }
  return { open: false, opensAt: "10:00", opensDay: day, today: false };
}

/** schema.org openingHoursSpecification for Google. */
export function openingHoursSpecification() {
  const names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return site.schedule.map((s) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: s.days.map((d) => `https://schema.org/${names[d]}`),
    opens: s.open,
    closes: s.close,
  }));
}
