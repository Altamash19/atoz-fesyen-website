import type { ReactNode } from "react";
import type { Silhouette } from "@/data/catalog";

/**
 * Line-art placeholders shown until real product photos are added.
 * Each silhouette is a simple, original garment outline.
 */
const shapes: Record<Silhouette, ReactNode> = {
  robe: (
    <>
      <path d="M82 32q18 12 36 0l32 10 34 56-19 10-20-32 6 150H49l6-150-20 32-19-10 34-56Z" />
      <path d="M100 42v62" />
      {[56, 70, 84, 98].map((y) => (
        <circle key={y} cx="100" cy={y} r="2.2" fill="currentColor" stroke="none" />
      ))}
    </>
  ),
  kurta: (
    <>
      <path d="M82 32q18 12 36 0l32 10 30 50-18 10-17-26 5 104h-6l-3-18H59l-3 18h-6l5-104-17 26-18-10 30-50Z" />
      <path d="M100 42v44" />
      {[54, 66, 78].map((y) => (
        <circle key={y} cx="100" cy={y} r="2.2" fill="currentColor" stroke="none" />
      ))}
    </>
  ),
  kurung: (
    <>
      <path d="M84 32q16 10 32 0l30 10 30 60-17 9-20-34 3 76H58l3-76-20 34-17-9 30-60Z" />
      <path d="M60 153h80l12 74H48Z" />
      <path d="M92 33l8 16 8-16" />
    </>
  ),
  blouse: (
    <>
      <path d="M84 40q16 10 32 0l32 10 26 46-17 9-18-28 3 62H58l3-62-18 28-17-9 26-46Z" />
      <path d="M94 46l6 18 6-18M100 64l-10 18M100 64l10 18" />
    </>
  ),
  sari: (
    <>
      <path d="M86 32q14 10 28 0l18 8 6 40-12 4 6 143H68l6-143-12-4 6-40Z" />
      <path d="M86 32l50 70-10 125M114 34l20 60" />
      <path d="M74 120h52M72 160h56M70 200h60" strokeDasharray="3 5" />
    </>
  ),
  trousers: (
    <>
      <path d="M62 32h76l12 195h-38l-12-140-12 140H50Z" />
      <path d="M62 46h76" />
      <path d="M100 46v40" />
    </>
  ),
  sampin: (
    <>
      <path d="M40 60h120l-8 140H48Z" />
      <path d="M44 110h112M46 150h108" />
      {[60, 80, 100, 120, 140].map((x) => (
        <path key={x} d={`M${x} 122l8 8-8 8-8-8Z`} />
      ))}
      <path d="M40 60l20-20h80l20 20" />
    </>
  ),
  melayu: (
    <>
      <path d="M86 30h28v10l34 6 30 52-18 10-18-28 2 70H54l2-70-18 28-18-10 30-52 34-6Z" />
      <path d="M100 40v40" />
      {[50, 62, 74].map((y) => (
        <circle key={y} cx="100" cy={y} r="2.2" fill="currentColor" stroke="none" />
      ))}
      <path d="M58 170h84l8 57h-36l-14-40-14 40H50Z" />
    </>
  ),
};

export function GarmentArt({ silhouette, className }: { silhouette: Silhouette; className?: string }) {
  return (
    <svg
      viewBox="0 0 200 240"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      {shapes[silhouette]}
    </svg>
  );
}
