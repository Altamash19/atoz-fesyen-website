import Image from "next/image";
import type { CategoryId } from "@/data/catalog";
import type { CatalogItem } from "@/lib/catalog";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { productName } from "@/lib/catalog";
import { GarmentArt } from "./GarmentArt";

const tints: Record<CategoryId, string> = {
  men: "bg-brand-50 text-brand-700",
  women: "bg-[#f7ece9] text-[#8c4a3c]",
  kids: "bg-[#eef1f8] text-[#3e5487]",
  accessories: "bg-gold-soft text-gold",
};

interface Props {
  item: CatalogItem;
  lang: Locale;
  /** Large = product page hero; otherwise card thumbnail. */
  size?: "card" | "large";
  priority?: boolean;
}

export function ProductImage({ item, lang, size = "card", priority = false }: Props) {
  const photo = item.images?.[0];
  const alt = productName(item, lang);

  if (photo) {
    return (
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-sand">
        <Image
          src={photo}
          alt={alt}
          fill
          priority={priority}
          sizes={size === "large" ? "(min-width: 1024px) 560px, 100vw" : "(min-width: 1024px) 300px, (min-width: 640px) 45vw, 50vw"}
          className="object-cover"
        />
      </div>
    );
  }

  const t = getDictionary(lang);
  return (
    <div
      className={`relative flex aspect-[4/5] w-full flex-col items-center justify-center ${tints[item.categoryData.id]}`}
      role="img"
      aria-label={`${alt} — ${t.products.photoSoon}`}
    >
      <GarmentArt silhouette={item.collectionData.silhouette} className={size === "large" ? "h-3/5 w-3/5 opacity-80" : "h-3/5 w-3/5 opacity-70"} />
      <span
        className={`absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/80 px-2.5 py-1 font-medium whitespace-nowrap text-muted backdrop-blur ${size === "large" ? "text-xs" : "text-[0.65rem]"}`}
      >
        {t.products.photoSoon}
      </span>
    </div>
  );
}
