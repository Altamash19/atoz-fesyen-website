import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { coverImageKey, type CatalogItem } from "@/lib/catalog";
import { getImage } from "@/lib/images";
import { GarmentArt } from "./GarmentArt";

interface Props {
  item: CatalogItem;
  lang: Locale;
  priority?: boolean;
}

/**
 * Card thumbnail in a fixed 4:5 frame.
 * Tall photos (full-length jubbah) are cropped from the top so the collar shows;
 * wide photos (kurta chest shots) are shown whole on a matching neutral background.
 */
export function ProductImage({ item, lang, priority = false }: Props) {
  const key = coverImageKey(item);
  const img = key ? getImage(key) : undefined;
  const alt = `${item.name}${item.code ? ` ${item.code}` : ""}`;

  if (img) {
    const ratio = img.width / img.height;
    const fit = item.coverFocus ? "object-cover" : ratio > 1.02 ? "object-contain" : ratio < 0.6 ? "object-cover object-top" : "object-cover";
    return (
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#efebe3]">
        <Image
          src={img.src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 50vw"
          className={fit}
          style={item.coverFocus ? { objectPosition: item.coverFocus } : undefined}
        />
      </div>
    );
  }

  const t = getDictionary(lang);
  return (
    <div className="relative flex aspect-[4/5] w-full items-center justify-center bg-brand-50 text-brand-700" role="img" aria-label={`${alt} — ${t.products.photoSoon}`}>
      <GarmentArt silhouette={item.collectionData.silhouette} className="h-3/5 w-3/5 opacity-70" />
    </div>
  );
}
