/**
 * Product catalogue.
 *
 * Source: "AtoZ stock list 16 June 2026". Quantities and prices are deliberately
 * NOT stored here — this file is shipped to the browser, and wholesale prices
 * are quoted on request.
 *
 * To add a photo: put the file in /public/products/ (e.g. `mens-jubbah-white-4-button.jpg`)
 * and set `images: ["/products/mens-jubbah-white-4-button.jpg"]` on the product.
 * The first image is used on product cards.
 */
import type { Locale } from "@/i18n/config";

export type Localized = Record<Locale, string>;

export const categoryIds = ["men", "women", "kids", "accessories"] as const;
export type CategoryId = (typeof categoryIds)[number];

/** Used to pick the placeholder illustration until real photos are added. */
export type Silhouette = "robe" | "kurta" | "kurung" | "blouse" | "sari" | "trousers" | "sampin" | "melayu";

export interface Category {
  id: CategoryId;
  name: Localized;
  blurb: Localized;
}

export interface Collection {
  id: string;
  category: CategoryId;
  name: Localized;
  description: Localized;
  silhouette: Silhouette;
}

export interface Product {
  slug: string;
  collection: string;
  /** The variant/style name, shown after the collection name. */
  style: Localized;
  fabric?: Localized;
  images?: string[];
  featured?: boolean;
  isNew?: boolean;
}

export const categories: Category[] = [
  {
    id: "men",
    name: { en: "Men", ms: "Lelaki" },
    blurb: {
      en: "Jubbah, kurta, baju Melayu and trousers for everyday wear and prayer.",
      ms: "Jubah, kurta, baju Melayu dan seluar untuk harian dan solat.",
    },
  },
  {
    id: "women",
    name: { en: "Women", ms: "Wanita" },
    blurb: {
      en: "Baju kurung, ladies jubbah, blouses and sari in modern and classic cuts.",
      ms: "Baju kurung, jubah wanita, blaus dan sari dalam potongan moden dan klasik.",
    },
  },
  {
    id: "kids",
    name: { en: "Kids", ms: "Kanak-kanak" },
    blurb: {
      en: "Children's jubbah, kurta and baju Melayu — ideal for school, Raya and events.",
      ms: "Jubah, kurta dan baju Melayu kanak-kanak — sesuai untuk sekolah, Raya dan majlis.",
    },
  },
  {
    id: "accessories",
    name: { en: "Accessories", ms: "Aksesori" },
    blurb: {
      en: "Sampin in regular and instant styles to complete the baju Melayu look for Hari Raya and weddings.",
      ms: "Sampin gaya biasa dan segera untuk melengkapkan persalinan baju Melayu bagi Hari Raya dan majlis perkahwinan.",
    },
  },
];

export const collections: Collection[] = [
  // ── Women ──────────────────────────────────────────────
  {
    id: "ladies-jubbah",
    category: "women",
    silhouette: "robe",
    name: { en: "Ladies Jubbah", ms: "Jubah Wanita" },
    description: {
      en: "Flowing, modest ladies jubbah with a graceful drape. Comfortable for daily wear, prayer and special occasions.",
      ms: "Jubah wanita yang longgar dan sopan dengan jatuhan yang anggun. Selesa untuk harian, solat dan majlis istimewa.",
    },
  },
  {
    id: "baju-kurung",
    category: "women",
    silhouette: "kurung",
    name: { en: "Baju Kurung", ms: "Baju Kurung" },
    description: {
      en: "Timeless Malay baju kurung in classic and modern designs, from simple everyday pieces to embroidered festive sets.",
      ms: "Baju kurung Melayu yang tidak lapuk dek zaman, daripada rekaan ringkas harian hingga set bersulam untuk perayaan.",
    },
  },
  {
    id: "blouse",
    category: "women",
    silhouette: "blouse",
    name: { en: "Blouse", ms: "Blaus" },
    description: {
      en: "Easy-to-style ladies blouses that pair well with skirts and trousers.",
      ms: "Blaus wanita yang mudah digayakan bersama skirt atau seluar.",
    },
  },
  {
    id: "sari",
    category: "women",
    silhouette: "sari",
    name: { en: "Sari", ms: "Sari" },
    description: {
      en: "Elegant sari for celebrations, weddings and cultural events.",
      ms: "Sari yang elegan untuk perayaan, majlis perkahwinan dan acara kebudayaan.",
    },
  },
  // ── Men ────────────────────────────────────────────────
  {
    id: "mens-jubbah",
    category: "men",
    silhouette: "robe",
    name: { en: "Men's Jubbah", ms: "Jubah Lelaki" },
    description: {
      en: "Classic men's jubbah in a range of collar and button styles — a staple for Friday prayers, mosques and religious schools.",
      ms: "Jubah lelaki klasik dalam pelbagai gaya kolar dan butang — pilihan utama untuk solat Jumaat, masjid dan sekolah agama.",
    },
  },
  {
    id: "mens-kurta",
    category: "men",
    silhouette: "kurta",
    name: { en: "Men's Kurta", ms: "Kurta Lelaki" },
    description: {
      en: "Comfortable knee-length kurta for daily wear, prayer and casual occasions.",
      ms: "Kurta paras lutut yang selesa untuk harian, solat dan majlis santai.",
    },
  },
  {
    id: "baju-melayu",
    category: "men",
    silhouette: "melayu",
    name: { en: "Baju Melayu", ms: "Baju Melayu" },
    description: {
      en: "Traditional baju Melayu for Hari Raya, weddings and formal events.",
      ms: "Baju Melayu tradisional untuk Hari Raya, majlis perkahwinan dan acara rasmi.",
    },
  },
  {
    id: "trousers",
    category: "men",
    silhouette: "trousers",
    name: { en: "Trousers", ms: "Seluar" },
    description: {
      en: "Matching trousers to pair with jubbah and kurta.",
      ms: "Seluar padanan untuk dipakai bersama jubah dan kurta.",
    },
  },
  // ── Kids ───────────────────────────────────────────────
  {
    id: "kids-jubbah",
    category: "kids",
    silhouette: "robe",
    name: { en: "Kids' Jubbah", ms: "Jubah Kanak-kanak" },
    description: {
      en: "Children's jubbah in popular collar and button styles — a favourite for religious schools, tahfiz and Friday prayers.",
      ms: "Jubah kanak-kanak dalam gaya kolar dan butang yang popular — pilihan sekolah agama, tahfiz dan solat Jumaat.",
    },
  },
  {
    id: "kids-kurta",
    category: "kids",
    silhouette: "kurta",
    name: { en: "Kids' Kurta", ms: "Kurta Kanak-kanak" },
    description: {
      en: "Easy-wear kurta for boys in several neckline and button styles.",
      ms: "Kurta mudah pakai untuk kanak-kanak lelaki dalam beberapa gaya leher dan butang.",
    },
  },
  {
    id: "kids-baju-melayu",
    category: "kids",
    silhouette: "melayu",
    name: { en: "Kids' Baju Melayu", ms: "Baju Melayu Kanak-kanak" },
    description: {
      en: "Baju Melayu for boys — perfect for Hari Raya and family occasions.",
      ms: "Baju Melayu untuk kanak-kanak lelaki — sesuai untuk Hari Raya dan majlis keluarga.",
    },
  },
  // ── Accessories ────────────────────────────────────────
  {
    id: "sampin",
    category: "accessories",
    silhouette: "sampin",
    name: { en: "Sampin", ms: "Sampin" },
    description: {
      en: "Sampin to complete a baju Melayu set, available in regular wrap and instant (ready-to-wear) styles.",
      ms: "Sampin untuk melengkapkan set baju Melayu, dalam gaya ikat biasa dan segera (siap pakai).",
    },
  },
];

const S = (en: string, ms: string = en): Localized => ({ en, ms });

export const products: Product[] = [
  // Ladies jubbah
  { slug: "ladies-jubbah-satin-plain-sleeves", collection: "ladies-jubbah", style: S("Satin, Plain Sleeves", "Satin, Lengan Biasa"), fabric: S("Satin"), featured: true },
  { slug: "ladies-jubbah-satin-elastic-sleeves", collection: "ladies-jubbah", style: S("Satin, Elastic Sleeves", "Satin, Lengan Getah"), fabric: S("Satin") },
  { slug: "ladies-jubbah-zoom", collection: "ladies-jubbah", style: S("Zoom") },
  // Baju kurung
  { slug: "baju-kurung-modern", collection: "baju-kurung", style: S("Modern", "Moden"), isNew: true, featured: true },
  { slug: "baju-kurung-kedah", collection: "baju-kurung", style: S("Kedah"), isNew: true, featured: true },
  { slug: "baju-kurung-butter-crepe", collection: "baju-kurung", style: S("Butter Crepe"), fabric: S("Butter crepe") },
  { slug: "baju-kurung-embroidered", collection: "baju-kurung", style: S("Embroidered", "Sulam") },
  { slug: "baju-kurung-lace-embroidered-beaded", collection: "baju-kurung", style: S("Lace, Embroidered & Beaded", "Lace Sulam Batu"), fabric: S("Lace") },
  { slug: "baju-kurung-embroidered-buttons", collection: "baju-kurung", style: S("Embroidered with Buttons", "Sulam Butang") },
  // Blouse & sari
  { slug: "blouse-tie", collection: "blouse", style: S("Tie Detail", "Tali") },
  { slug: "blouse-embroidered", collection: "blouse", style: S("Embroidered", "Sulam") },
  { slug: "sari-classic", collection: "sari", style: S("Classic", "Klasik") },
  // Men's jubbah
  { slug: "mens-jubbah-white-4-button", collection: "mens-jubbah", style: S("White, 4-Button", "Putih, 4 Butang"), featured: true },
  { slug: "mens-jubbah-white-yamen-tie", collection: "mens-jubbah", style: S("White Yamen, Tie Neck", "Putih Yamen Tali") },
  { slug: "mens-jubbah-white-collar", collection: "mens-jubbah", style: S("White, Collar", "Putih Berkolar") },
  { slug: "mens-jubbah-collar-micro", collection: "mens-jubbah", style: S("Collar, Micro", "Kolar Micro") },
  { slug: "mens-jubbah-yamen-micro", collection: "mens-jubbah", style: S("Yamen, Micro", "Yamen Micro") },
  { slug: "mens-jubbah-china-collar", collection: "mens-jubbah", style: S("China Collar", "Kolar Cina") },
  { slug: "mens-jubbah-bombay-green", collection: "mens-jubbah", style: S("Bombay Green", "Bombay Hijau") },
  { slug: "mens-jubbah-marhaba-black", collection: "mens-jubbah", style: S("Marhaba Black", "Marhaba Hitam") },
  // Men's kurta
  { slug: "mens-kurta-three-quarter-sleeves", collection: "mens-kurta", style: S("Three-Quarter Sleeves", "Lengan Tiga Suku"), featured: true },
  { slug: "mens-kurta-marhaba-sleeves", collection: "mens-kurta", style: S("Marhaba Sleeves", "Lengan Marhaba") },
  { slug: "mens-kurta-china-mix", collection: "mens-kurta", style: S("China, Assorted", "China, Campur") },
  // Baju Melayu & trousers
  { slug: "baju-melayu-adult", collection: "baju-melayu", style: S("Adult", "Dewasa"), featured: true },
  { slug: "trousers-classic", collection: "trousers", style: S("Classic", "Klasik") },
  // Kids' jubbah
  { slug: "kids-jubbah-china-4-button", collection: "kids-jubbah", style: S("China, 4-Button", "China, 4 Butang"), featured: true },
  { slug: "kids-jubbah-micro-collar", collection: "kids-jubbah", style: S("Micro Collar", "Kolar Micro") },
  { slug: "kids-jubbah-yamen-micro", collection: "kids-jubbah", style: S("Yamen, Micro", "Yamen Micro") },
  { slug: "kids-jubbah-yamen-china", collection: "kids-jubbah", style: S("Yamen, China", "Yamen China") },
  { slug: "kids-jubbah-china-collar", collection: "kids-jubbah", style: S("China, Collar", "China, Berkolar") },
  { slug: "kids-jubbah-bombay-green", collection: "kids-jubbah", style: S("Bombay Green", "Bombay Hijau") },
  { slug: "kids-jubbah-marhaba-black", collection: "kids-jubbah", style: S("Marhaba Black", "Marhaba Hitam") },
  // Kids' kurta
  { slug: "kids-kurta-china-luppi", collection: "kids-kurta", style: S("China, Luppi") },
  { slug: "kids-kurta-china-titch-button", collection: "kids-kurta", style: S("China, Titch Button", "China, Butang Titch") },
  { slug: "kids-kurta-china-2-button", collection: "kids-kurta", style: S("China, 2-Button", "China, 2 Butang") },
  { slug: "kids-kurta-china-v-neck", collection: "kids-kurta", style: S("China, V-Neck", "China, Leher V") },
  { slug: "kids-kurta-marhaba-luppi", collection: "kids-kurta", style: S("Marhaba, Luppi") },
  { slug: "kids-kurta-marhaba-2-button", collection: "kids-kurta", style: S("Marhaba, 2-Button", "Marhaba, 2 Butang") },
  { slug: "kids-kurta-marhaba-v-neck", collection: "kids-kurta", style: S("Marhaba, V-Neck", "Marhaba, Leher V") },
  // Kids' baju Melayu
  { slug: "kids-baju-melayu", collection: "kids-baju-melayu", style: S("Boys", "Budak Lelaki") },
  // Sampin
  { slug: "sampin-instant", collection: "sampin", style: S("Instant (Ready-to-Wear)", "Segera (Siap Pakai)"), featured: true },
  { slug: "sampin-regular", collection: "sampin", style: S("Regular Wrap", "Ikat Biasa") },
];
