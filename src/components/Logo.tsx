/** Text-based wordmark. Swap for the official logo file when available (put it in /public). */
export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className={`grid h-10 w-10 place-items-center rounded-xl font-display text-[0.95rem] font-bold tracking-tight ${
          inverted ? "bg-white text-brand-800" : "bg-brand-700 text-white"
        }`}
      >
        A–Z
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-lg font-semibold ${inverted ? "text-white" : "text-ink"}`}>A TO Z Fesyen</span>
        <span className={`mt-1 text-[0.65rem] font-semibold tracking-[0.2em] uppercase ${inverted ? "text-gold-soft" : "text-gold"}`}>
          Baru · Est. 2005
        </span>
      </span>
    </span>
  );
}
