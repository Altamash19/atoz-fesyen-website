import { basePath } from "@/lib/images";

/**
 * Official A to Z logo (light sage on transparent — always place it on a dark surface).
 * - "emblem": ornament + "A to Z" plate, for the header, with a text name beside it.
 * - "full":   the complete stacked logo, for the footer and brand panels.
 */
export function Logo({ variant = "emblem", className = "" }: { variant?: "emblem" | "full"; className?: string }) {
  if (variant === "full") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`${basePath}/brand/logo-full.webp`}
        width={480}
        height={620}
        alt="A to Z Fesyen Baru Sdn Bhd — Importer, Exporter & Manufacturer"
        className={`h-auto w-40 ${className}`}
      />
    );
  }
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${basePath}/brand/logo-emblem.webp`} width={243} height={200} alt="" aria-hidden="true" className="h-12 w-auto md:h-14" />
      <span className="hidden flex-col leading-none sm:flex">
        <span className="font-display text-lg font-semibold text-white">A to Z</span>
        <span className="mt-1 text-[0.65rem] font-semibold tracking-[0.2em] text-sage uppercase">Fesyen Baru</span>
      </span>
    </span>
  );
}
