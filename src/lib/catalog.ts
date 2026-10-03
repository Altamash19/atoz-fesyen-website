import type { Locale } from "@/i18n/config";
import {
  categories,
  collections,
  products,
  type Category,
  type CategoryId,
  type Collection,
  type Product,
} from "@/data/catalog";

const collectionById = new Map(collections.map((c) => [c.id, c]));
const productBySlug = new Map(products.map((p) => [p.slug, p]));

/** A product joined with its collection and category — what the UI works with. */
export interface CatalogItem extends Product {
  collectionData: Collection;
  categoryData: Category;
}

function enrich(product: Product): CatalogItem {
  const collectionData = collectionById.get(product.collection);
  if (!collectionData) throw new Error(`Unknown collection "${product.collection}" on ${product.slug}`);
  const categoryData = categories.find((c) => c.id === collectionData.category)!;
  return { ...product, collectionData, categoryData };
}

const allItems: CatalogItem[] = products.map(enrich);

export function getAllProducts(): CatalogItem[] {
  return allItems;
}

export function getProduct(slug: string): CatalogItem | undefined {
  const p = productBySlug.get(slug);
  return p ? enrich(p) : undefined;
}

/** Best-sellers in rank order ("Start here" on the home page). */
export function getBestsellers(): CatalogItem[] {
  return allItems.filter((p) => p.bestseller).sort((a, b) => a.bestseller! - b.bestseller!);
}

export function getProductsByCategory(id: CategoryId): CatalogItem[] {
  return allItems.filter((p) => p.categoryData.id === id);
}

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

/** Same collection first, then same category, excluding the product itself. */
export function getRelatedProducts(item: CatalogItem, limit = 4): CatalogItem[] {
  const sameCollection = allItems.filter((p) => p.slug !== item.slug && p.collection === item.collection);
  const sameCategory = allItems.filter(
    (p) => p.slug !== item.slug && p.collection !== item.collection && p.categoryData.id === item.categoryData.id,
  );
  return [...sameCollection, ...sameCategory].slice(0, limit);
}

/** "Kurta Tiga Butang (AZ-K01)" — used in titles and WhatsApp messages. */
export function productLabel(item: CatalogItem): string {
  return item.code ? `${item.name} (${item.code})` : item.name;
}

/** Cover photo key: first image, or first shade image. */
export function coverImageKey(item: CatalogItem): string | undefined {
  return item.cover ?? item.images?.[0] ?? item.shades?.find((s) => s.image)?.image;
}

export function countByCategory(): Record<CategoryId, number> {
  const counts = { men: 0, women: 0, kids: 0, fabrics: 0 } as Record<CategoryId, number>;
  for (const p of allItems) counts[p.categoryData.id]++;
  return counts;
}

export type { Locale };
export { categories, collections };
