/**
 * Product catalogue — source: "A to Z Fesyen Baru · Katalog Pemborong 2026".
 *
 * Design codes (AZ-K01 …) match the printed catalogue so buyers can quote them on WhatsApp.
 * Prices come from the catalogue's price list (Senarai Harga): borong = wholesale per piece,
 * runcit = suggested retail (RRP). Stock quantities are not stored here.
 *
 * Photos: put files in /public/products, run `npm run images`, then list the file names
 * (without extension) in `images`. The first image is the card/cover photo.
 */
import type { Locale } from "@/i18n/config";

export type Localized = Record<Locale, string>;

export const categoryIds = ["men", "women", "kids", "fabrics"] as const;
export type CategoryId = (typeof categoryIds)[number];

/** Used for the fallback illustration when a product has no photo yet. */
export type Silhouette = "robe" | "kurta" | "kurung" | "blouse" | "sari" | "trousers" | "sampin" | "melayu";

export interface Category {
  id: CategoryId;
  name: Localized;
  blurb: Localized;
  /** Image key used on category tiles. */
  cover: string;
}

export interface Collection {
  id: string;
  category: CategoryId;
  name: Localized;
  description: Localized;
  silhouette: Silhouette;
}

export interface Shade {
  /** Shade number or design letter, e.g. "05" or "A". */
  no: string;
  name: Localized;
  /** Photo of the garment in this option (switches the main photo). */
  image?: string;
  /** Small fabric swatch shown inside the option button. */
  swatch?: string;
}

export interface Price {
  /** Borong — wholesale price per piece, RM. */
  wholesale: number;
  /** Runcit — suggested retail price (RRP), RM. */
  retail?: number;
}

export interface Product {
  slug: string;
  /** Catalogue design code, e.g. "AZ-K01". */
  code?: string;
  collection: string;
  /** Trade name as used in the shop (Malay), shown in both languages. */
  name: string;
  /** Short English/Malay descriptor shown under the name. */
  tagline: Localized;
  description: Localized;
  /** Leave out when the catalogue doesn't state it. */
  fabric?: string;
  sizes: Localized;
  /** e.g. "40 colours" — leave out when unknown. */
  colours?: Localized;
  shades?: Shade[];
  /** Label for the option buttons; defaults to "Shade" / "Warna". */
  optionLabel?: Localized;
  price?: Price;
  /** "request" = harga atas permintaan; "preorder" = made to order only. */
  priceStatus?: "request" | "preorder";
  images?: string[];
  /** Image key for catalogue cards when it differs from the first gallery image. */
  cover?: string;
  /** CSS object-position for the card crop of a wide cover photo, e.g. "62% 50%". */
  coverFocus?: string;
  /** Ranked best-seller (1 = top) — shown in "Start here". */
  bestseller?: number;
  bestsellerNote?: Localized;
  isNew?: boolean;
}

const L = (en: string, ms: string): Localized => ({ en, ms });
const P = (wholesale: number, retail?: number): Price => ({ wholesale, retail });
const designLabel = L("Design", "Rekaan");
const menSizes = L("S – 4XL", "S – 4XL");
const ladiesSizes = L("S – 3XL", "S – 3XL");
const ladiesSizes4 = L("S – 4XL", "S – 4XL");
const askSizes = L("Ask us for the size chart", "Minta carta saiz daripada kami");
const kidsSizes = L("4 – 16 years (4, 6, 8, 10, 12, 14, 16)", "4 – 16 tahun (4, 6, 8, 10, 12, 14, 16)");
const colours = (n: number) => L(`${n} colours`, `${n} warna`);

export const categories: Category[] = [
  {
    id: "men",
    cover: "az-k06",
    name: L("Men", "Lelaki"),
    blurb: L(
      "Kurta, jubbah and baju Melayu in China Cotton, Royal Cotton, crepe and satin — sizes S to 4XL.",
      "Kurta, jubah dan baju Melayu dalam China Cotton, Royal Cotton, crepe dan satin — saiz S hingga 4XL.",
    ),
  },
  {
    id: "women",
    cover: "az-w01",
    name: L("Women", "Wanita"),
    blurb: L(
      "Baju kurung sets in Scorpio cotton and Cotton Sulam, embroidered and beaded kurung, satin jubah and abaya, floral jubbah and free-size batik kaftan.",
      "Set baju kurung dalam Scorpio cotton dan Cotton Sulam, kurung bersulam dan bermanik, jubah dan abaya satin, jubah bunga serta kaftan batik saiz bebas.",
    ),
  },
  {
    id: "kids",
    cover: "az-c06",
    name: L("Kids", "Kanak-kanak"),
    blurb: L(
      "The men's jubbah and kurta cut down for boys aged 4 to 16 — same fabrics and colour cards for father-and-son sets.",
      "Jubah dan kurta lelaki dalam potongan budak 4 hingga 16 tahun — fabrik dan kad warna yang sama untuk set ayah dan anak.",
    ),
  },
  {
    id: "fabrics",
    cover: "az-s01-s02",
    name: L("Sampin & Fabrics", "Sampin & Fabrik"),
    blurb: L(
      "Woven songket sampin in 25 colours, plus cut lengths of our jubbah and kurta cloths for the trade.",
      "Sampin songket tenun dalam 25 warna, serta kain potongan fabrik jubah dan kurta kami untuk peniaga.",
    ),
  },
];

export const collections: Collection[] = [
  {
    id: "kurta-lelaki",
    category: "men",
    silhouette: "kurta",
    name: L("Men's Kurta", "Kurta Lelaki"),
    description: L(
      "Five necklines on one body block in China Cotton and crepe. Waist length, soft, breathable and a modest fit — so a retailer can mix necklines within one size run.",
      "Lima jenis leher pada satu blok badan dalam China Cotton dan crepe. Paras pinggang, lembut, selesa dan longgar sopan — peruncit boleh campur jenis leher dalam satu set saiz.",
    ),
  },
  {
    id: "kurta-bercorak",
    category: "men",
    silhouette: "kurta",
    name: L("Plain, Stripe & Check Kurta", "Kurta Kosong, Jalur & Kotak"),
    description: L(
      "Plain cotton plus stripe and check in the Checkered weave. Men buy these for Friday prayers and for work, so they sell all year — not only at Raya.",
      "Kain kosong serta jalur dan kotak dalam tenunan Checkered. Dibeli untuk solat Jumaat dan ke tempat kerja, jadi laku sepanjang tahun — bukan hanya musim Raya.",
    ),
  },
  {
    id: "jubah-lelaki",
    category: "men",
    silhouette: "robe",
    name: L("Men's Jubbah", "Jubah Lelaki"),
    description: L(
      "Collar and Omani jubbah in China Cotton and Royal Cotton, with two side zip pockets and a double-sided chest pocket.",
      "Jubah berkolar dan Omani dalam China Cotton dan Royal Cotton, dengan dua poket zip sisi dan poket dada dua lapis.",
    ),
  },
  {
    id: "kurta-kolar-china",
    category: "men",
    silhouette: "kurta",
    name: L("China Collar Kurta", "Kurta Kolar China"),
    description: L(
      "Waist-length collar kurta in China Cotton with zip pockets on both sides. Colour cards on request.",
      "Kurta berkolar paras pinggang dalam China Cotton dengan poket zip di kedua-dua sisi. Kad warna boleh diminta.",
    ),
  },
  {
    id: "baju-melayu",
    category: "men",
    silhouette: "melayu",
    name: L("Baju Melayu", "Baju Melayu"),
    description: L(
      "Two necklines for Raya: the collared Cekak Musang and the collarless Teluk Belanga. Shirt and trousers as a set, worn with a sampin (sold separately).",
      "Dua jenis leher untuk Raya: Cekak Musang berkolar dan Teluk Belanga tanpa kolar. Baju dan seluar sebagai satu set, dipakai bersama sampin (dijual berasingan).",
    ),
  },
  {
    id: "baju-kurung",
    category: "women",
    silhouette: "kurung",
    name: L("Baju Kurung", "Baju Kurung"),
    description: L(
      "Two-piece kurung sets in Scorpio cotton and Cotton Sulam — scalloped hem, modest fit, sold as a set.",
      "Set baju kurung dua helai dalam Scorpio cotton dan Cotton Sulam — kelim beralun, potongan sopan, dijual sebagai set.",
    ),
  },
  {
    id: "bercorak",
    category: "women",
    silhouette: "kurung",
    name: L("Floral Jubbah", "Jubah Bunga"),
    description: L(
      "Long, loose floral jubbah in printed cotton — three prints, nine colourways in all.",
      "Jubah bunga labuh dan longgar dalam kapas bercetak — tiga corak, sembilan pilihan warna.",
    ),
  },
  {
    id: "kurung-moden",
    category: "women",
    silhouette: "kurung",
    name: L("Embroidered & Beaded Kurung", "Kurung Sulam & Manik"),
    description: L(
      "Statement two-piece kurung sets — sari-inspired embroidery and beaded patchwork for Raya, weddings and majlis.",
      "Set kurung dua helai yang menyerlah — sulaman gaya sari dan tampalan bermanik untuk Raya, perkahwinan dan majlis.",
    ),
  },
  {
    id: "satin",
    category: "women",
    silhouette: "robe",
    name: L("Satin Jubah & Abaya", "Jubah & Abaya Satin"),
    description: L(
      "Full-length satin pieces with a soft sheen and an elastic cuff, in four shades: dark grey, light grey, burgundy and hazel.",
      "Pakaian satin labuh dengan kilauan lembut dan cuff bergetah, dalam empat warna: kelabu gelap, kelabu cerah, burgundy dan hazel.",
    ),
  },
  {
    id: "kaftan",
    category: "women",
    silhouette: "blouse",
    name: L("Kaftan Batik", "Kaftan Batik"),
    description: L(
      "Free-size batik kaftan tops with a placed border print. One size, many prints, quick to sell.",
      "Kaftan batik saiz bebas dengan corak sempadan. Satu saiz, banyak corak, cepat laku.",
    ),
  },
  {
    id: "jubah-kanak",
    category: "kids",
    silhouette: "robe",
    name: L("Boys' Jubbah & Kurta", "Jubah & Kurta Kanak-kanak"),
    description: L(
      "The men's styles in the boys' block — same fabrics, same finishing and the same colour cards for father-and-son sets.",
      "Gaya lelaki dalam blok budak — fabrik, kemasan dan kad warna yang sama untuk set ayah dan anak.",
    ),
  },
  {
    id: "sampin",
    category: "fabrics",
    silhouette: "sampin",
    name: L("Sampin Songket", "Sampin Songket"),
    description: L(
      "Woven songket sampin in 25 colours to complete a baju Melayu set — standard full length or instant, ready to wear.",
      "Sampin songket tenun dalam 25 warna untuk melengkapkan set baju Melayu — biasa (panjang penuh) atau segera, siap pakai.",
    ),
  },
  {
    id: "fabrik",
    category: "fabrics",
    silhouette: "sampin",
    name: L("Fabrics", "Fabrik"),
    description: L(
      "Our garment cloths sold by the piece to the trade, each held on a fixed, numbered colour card so a reorder returns the same shade.",
      "Kain pakaian kami dijual ikut potongan kepada peniaga, setiap satu dengan kad warna bernombor supaya tempahan semula mendapat warna yang sama.",
    ),
  },
];

export const products: Product[] = [
  // ── Kurta Lelaki (AZ-K01 – K05) ─────────────────────────────
  {
    slug: "kurta-tiga-butang", code: "AZ-K01", collection: "kurta-lelaki", name: "Kurta Tiga Butang",
    price: P(20, 27),
    tagline: L("Three-button kurta, short sleeve", "Kurta tiga butang, lengan pendek"),
    description: L(
      "Three-button placket with a chest pocket. Short sleeve, straight hem — the everyday seller of the range. Plackets are interlined and topstitched, with shell-look four-hole buttons and a woven house label at the chest pocket.",
      "Plaket tiga butang dengan poket dada. Lengan pendek, kelim lurus — jualan harian paling laris dalam rangkaian ini. Plaket berlapik dan dijahit tindas, butang empat lubang rupa cangkerang dan label tenun di poket dada.",
    ),
    fabric: "China Cotton", sizes: menSizes, images: ["az-k01-info", "az-k01", "az-k01-closeup", "az-k01-2"], cover: "az-k01-closeup",
  },
  {
    slug: "kurta-leher-v", code: "AZ-K02", collection: "kurta-lelaki", name: "Kurta Leher V",
    price: P(20, 27),
    tagline: L("V-neck kurta, long sleeve", "Kurta leher V, lengan panjang"),
    description: L(
      "A clean V opening with no buttons. Long sleeve — the quietest neckline we cut.",
      "Bukaan leher V yang kemas tanpa butang. Lengan panjang — potongan leher paling ringkas kami.",
    ),
    fabric: "China Cotton", sizes: menSizes, images: ["az-k02-info", "az-k02", "az-k02-closeup"], cover: "az-k02-closeup",
  },
  {
    slug: "kurta-dua-butang", code: "AZ-K03", collection: "kurta-lelaki", name: "Kurta Dua Butang",
    price: P(20, 27),
    tagline: L("Two-button collar band, long sleeve", "Dua butang pada kolar, lengan panjang"),
    description: L(
      "Two buttons at the collar band, long sleeve. The traditional finish, plainly done.",
      "Dua butang pada jalur kolar, lengan panjang. Kemasan tradisional yang ringkas.",
    ),
    fabric: "China Cotton", sizes: menSizes, images: ["az-k03-info", "az-k03", "az-k03-closeup"], cover: "az-k03-closeup",
  },
  {
    slug: "kurta-butang-luppi", code: "AZ-K04", collection: "kurta-lelaki", name: "Kurta Butang Luppi",
    price: P(20, 27),
    tagline: L("Ornamental luppi button at the throat", "Butang hiasan luppi di leher"),
    description: L(
      "A single ornamental luppi button at the throat over a short slit opening — the dressiest of the plain necklines.",
      "Sebutir butang hiasan luppi di leher dengan belahan pendek — paling segak antara potongan leher kosong.",
    ),
    fabric: "China Cotton", sizes: menSizes, images: ["az-k04-info", "az-k04", "az-k04-detail"], cover: "az-k04-detail",
  },
  {
    slug: "kurta-kolar-cuff", code: "AZ-K05", collection: "kurta-lelaki", name: "Kurta Kolar Cuff",
    price: P(20, 27),
    tagline: L("Buttoned collar with shirt cuff, in crepe", "Kolar berbutang dan cuff kemeja, fabrik crepe"),
    description: L(
      "Buttoned collar band and a proper shirt cuff, cut in crepe. The formal end of the kurta range.",
      "Kolar berbutang dan cuff kemeja sebenar, dalam fabrik crepe. Pilihan paling formal dalam rangkaian kurta.",
    ),
    fabric: "Crepe", sizes: menSizes, images: ["az-k05-info", "az-k05", "az-k05-closeup"], cover: "az-k05-closeup",
  },
  // ── Kurta Bercorak (AZ-K06 – K10) ───────────────────────────
  {
    slug: "kurta-kosong", code: "AZ-K06", collection: "kurta-bercorak", name: "Kurta Kosong",
    priceStatus: "request",
    tagline: L("Plain cotton kurta in 40 colours", "Kurta kosong kapas, 40 warna"),
    description: L(
      "One luppi button at the throat, side slits and a three-quarter sleeve. The widest colour card in the catalogue — order by swatch number. Pairs with Jubah Budak Scorpio (AZ-C06) for father-and-son sets.",
      "Sebutir butang luppi di leher, belahan sisi dan lengan tiga suku. Kad warna terluas dalam katalog — tempah ikut nombor warna. Padan dengan Jubah Budak Scorpio (AZ-C06) untuk set ayah dan anak.",
    ),
    fabric: "100% cotton", sizes: menSizes, colours: colours(40), images: ["az-k06", "az-k06-2"],
    bestseller: 3, bestsellerNote: L("Forty colours — the safe reorder.", "Empat puluh warna — tempahan semula yang selamat."),
  },
  {
    slug: "kurta-berjalur", code: "AZ-K07", collection: "kurta-bercorak", name: "Kurta Berjalur",
    priceStatus: "request",
    tagline: L("Woven satin stripe", "Jalur satin tenun"),
    description: L(
      "Woven satin stripe running the length of the body, matched at the placket. Thirty grounds.",
      "Jalur satin tenun sepanjang badan, dipadankan di plaket. Tiga puluh warna dasar.",
    ),
    fabric: "Woven stripe", sizes: menSizes, colours: colours(30), images: ["az-k07"],
  },
  {
    slug: "kurta-kotak-besar", code: "AZ-K08", collection: "kurta-bercorak", name: "Kurta Kotak Besar",
    priceStatus: "preorder",
    tagline: L("Wide windowpane check", "Kotak besar windowpane"),
    description: L(
      "A wide windowpane check in the Checkered weave — the quietest of the three check scales. Made to pre-order only.",
      "Corak kotak besar windowpane dalam tenunan Checkered — paling lembut antara tiga saiz kotak. Tempahan awal (pre-order) sahaja.",
    ),
    fabric: "Checkered", sizes: menSizes, colours: colours(15), images: ["az-k08"],
  },
  {
    slug: "kurta-kotak-kecil", code: "AZ-K09", collection: "kurta-bercorak", name: "Kurta Kotak Kecil",
    price: P(24, 35),
    tagline: L("Fine gingham check", "Kotak kecil gingham"),
    description: L("Fine gingham check in the Checkered weave, fourteen grounds.", "Kotak kecil gingham dalam tenunan Checkered, empat belas warna dasar."),
    fabric: "Checkered", sizes: menSizes, colours: colours(14), images: ["az-k09"],
    bestseller: 2, bestsellerNote: L("Check and stripe for Friday and for work — moves all year.", "Kotak dan jalur untuk Jumaat dan kerja — laku sepanjang tahun."),
  },
  {
    slug: "kurta-kotak-plaid", code: "AZ-K10", collection: "kurta-bercorak", name: "Kurta Kotak Plaid",
    price: P(24, 35),
    tagline: L("Madras-scale plaid", "Plaid saiz Madras"),
    description: L("Madras-scale plaid in the Checkered weave, sixteen grounds.", "Plaid saiz Madras dalam tenunan Checkered, enam belas warna dasar."),
    fabric: "Checkered", sizes: menSizes, colours: colours(16), images: ["az-k10"],
  },
  // ── Jubah Lelaki (AZ-J01 – J03) ─────────────────────────────
  {
    slug: "jubah-lima-butang", code: "AZ-J01", collection: "jubah-lelaki", name: "Jubah Lima Butang",
    price: P(35, 65),
    tagline: L("Five-button stand-collar jubbah", "Jubah kolar lima butang"),
    description: L(
      "China Cotton, five-button placket to a stand collar, floor length. Double-sided chest pocket and two side zip pockets.",
      "China Cotton, plaket lima butang hingga kolar tegak, labuh ke lantai. Poket dada dua lapis dan dua poket zip sisi.",
    ),
    fabric: "China Cotton", sizes: menSizes, colours: colours(8), images: ["az-j01"],
  },
  {
    slug: "jubah-omani", code: "AZ-J02", collection: "jubah-lelaki", name: "Jubah Omani",
    price: P(40, 60),
    tagline: L("Tasselled cord with yoke embroidery", "Tali berumbai dengan sulaman yoke"),
    description: L(
      "Tasselled cord at the throat with tone-on-tone yoke embroidery. Two side zip pockets.",
      "Tali berumbai di leher dengan sulaman yoke sewarna. Dua poket zip sisi.",
    ),
    fabric: "China Cotton", sizes: menSizes, images: ["az-j02"],
  },
  {
    slug: "jubah-kolar-royal-cotton", code: "AZ-J03", collection: "jubah-lelaki", name: "Jubah Kolar Royal Cotton",
    price: P(35, 65),
    tagline: L("Heavier Royal Cotton, green only", "Royal Cotton lebih tebal, hijau sahaja"),
    description: L(
      "The heavier Royal Cotton body with a firm stand collar. Green only, and worth the single colourway. The boys' version is AZ-C05 for father-and-son sets.",
      "Badan Royal Cotton yang lebih tebal dengan kolar tegak yang kemas. Hijau sahaja — dan tetap laku. Versi budak ialah AZ-C05 untuk set ayah dan anak.",
    ),
    fabric: "Royal Cotton", sizes: menSizes, colours: L("Green", "Hijau"), images: ["az-j03", "az-j03-2"],
    bestseller: 5, bestsellerNote: L("Green only, and it still sells.", "Hijau sahaja, dan tetap laku."),
  },
  {
    slug: "jubah-scorpio", code: "AZ-J07", collection: "jubah-lelaki", name: "Jubah Scorpio",
    price: P(40, 65),
    tagline: L("Two sleeve lengths, 16 colours", "Dua panjang lengan, 16 warna"),
    description: L(
      "Round neck with a single button over a short placket and a straight, full-length body in Scorpio cotton. Choose the ¾ sleeve — the warm-weather cut — or the full-length sleeve for prayers and more formal wear. Pairs with Jubah Scorpio Kids (AZ-C06) for father-and-son sets.",
      "Leher bulat dengan sebutir butang di atas plaket pendek dan badan lurus labuh dalam Scorpio cotton. Pilih lengan ¾ — potongan untuk cuaca panas — atau lengan panjang untuk solat dan majlis lebih formal. Padan dengan Jubah Scorpio Kids (AZ-C06) untuk set ayah dan anak.",
    ),
    fabric: "Scorpio cotton", sizes: menSizes, colours: colours(16),
    optionLabel: L("Sleeve", "Lengan"),
    shades: [
      { no: "3Q", name: L("¾ sleeve", "Lengan 3 suku"), image: "az-j07-3q" },
      { no: "LS", name: L("Long sleeve", "Lengan panjang"), image: "az-j07-ls" },
    ],
    images: ["az-j07-3q", "az-j07-ls", "az-j07-neck", "az-j07-fabric"], cover: "az-j07-neck", isNew: true,
  },
  {
    slug: "jubah-underpants", code: "AZ-J08", collection: "jubah-lelaki", name: "Jubah Underpants",
    price: P(10, 15),
    tagline: L("Trousers to wear under a jubah", "Seluar untuk dipakai di bawah jubah"),
    description: L(
      "Straight-leg trousers to wear under a jubah: elasticated waist with a drawstring, side pockets, light and cool.",
      "Seluar kaki lurus untuk dipakai di bawah jubah: pinggang bergetah dengan tali serut, poket sisi, ringan dan sejuk.",
    ),
    sizes: L("Adult sizes", "Saiz dewasa"), colours: colours(5),
    shades: [
      { no: "01", name: L("Black", "Hitam") },
      { no: "02", name: L("White", "Putih") },
      { no: "03", name: L("Maroon", "Maroon") },
      { no: "04", name: L("Navy", "Biru Laut") },
      { no: "05", name: L("Brown", "Coklat") },
    ],
    images: ["az-j08"], isNew: true,
  },
  // ── Kurta Kolar China (AZ-J04 – J06) ────────────────────────
  {
    slug: "kurta-kolar-china", code: "AZ-J04", collection: "kurta-kolar-china", name: "Kurta Kolar China",
    priceStatus: "request",
    tagline: L("Collar kurta, welted chest pocket", "Kurta berkolar, poket dada welt"),
    description: L(
      "Waist-length collar kurta with a welted chest pocket and side zip pockets. Our deepest colour card — eighteen shades.",
      "Kurta berkolar paras pinggang dengan poket dada welt dan poket zip sisi. Kad warna terdalam kami — lapan belas warna.",
    ),
    fabric: "China Cotton", sizes: menSizes, colours: colours(18), images: ["az-j04"],
  },
  {
    slug: "kurta-kolar-cuff-china", code: "AZ-J05", collection: "kurta-kolar-china", name: "Kurta Kolar Cuff China",
    priceStatus: "request",
    tagline: L("Buttoned cuff, curved shirt hem", "Cuff berbutang, kelim kemeja melengkung"),
    description: L(
      "Buttoned cuff and a curved shirt hem, zip pockets on both sides. Six shades including white.",
      "Cuff berbutang dan kelim kemeja melengkung, poket zip di kedua-dua sisi. Enam warna termasuk putih.",
    ),
    fabric: "China Cotton", sizes: menSizes, colours: colours(6), images: ["az-j05"],
  },
  {
    slug: "kurta-titch-lengan-pendek", code: "AZ-J06", collection: "kurta-kolar-china", name: "Kurta Titch Lengan Pendek",
    priceStatus: "request",
    tagline: L("Half sleeve, single titch button", "Lengan pendek, sebutir butang titch"),
    description: L(
      "Half sleeve with a turned-back cuff and a single titch button, zip pockets on both sides. The one to stock for the school run and the market.",
      "Lengan pendek dengan cuff berlipat dan sebutir butang titch, poket zip di kedua-dua sisi. Pilihan untuk dipakai ke sekolah dan ke pasar.",
    ),
    fabric: "China Cotton", sizes: menSizes, colours: colours(12), images: ["az-j06"],
  },
  // ── Baju Melayu (AZ-M01 – M02) ──────────────────────────────
  {
    slug: "baju-melayu-cekak-musang", code: "AZ-M01", collection: "baju-melayu", name: "Baju Melayu Cekak Musang",
    price: P(40, 60),
    tagline: L("Collared, satin — 9 shades", "Berkolar, satin — 9 warna"),
    description: L(
      "A standing collar closed with five buttons, a chest pocket and two hip pockets. Satin, sold as shirt and trousers. Quote the shade number with the code. Sampin sold separately.",
      "Kolar tegak dengan lima butang, poket dada dan dua poket pinggul. Satin, dijual sebagai baju dan seluar. Nyatakan nombor warna bersama kod. Sampin dijual berasingan.",
    ),
    fabric: "Satin", sizes: menSizes, colours: colours(9),
    shades: [
      { no: "01", name: L("Emerald", "Hijau Zamrud"), image: "az-m01-model-01" },
      { no: "02", name: L("Black", "Hitam"), image: "az-m01-02" },
      { no: "03", name: L("Royal blue", "Biru Diraja"), image: "az-m01-model-03" },
      { no: "04", name: L("Grey", "Kelabu"), image: "az-m01-04" },
      { no: "05", name: L("Turquoise", "Biru Firus"), image: "az-m01-05" },
      { no: "06", name: L("Red", "Merah"), image: "az-m01-model-06" },
      { no: "07", name: L("Olive", "Hijau Zaitun"), image: "az-m01-07" },
      { no: "08", name: L("Cream", "Krim"), image: "az-m01-08" },
      { no: "09", name: L("Purple", "Ungu"), image: "az-m01-09" },
    ],
    images: ["az-m01-model-01"], coverFocus: "62% 50%",
  },
  {
    slug: "baju-melayu-teluk-belanga", code: "AZ-M02", collection: "baju-melayu", name: "Baju Melayu Teluk Belanga",
    price: P(45, 65),
    tagline: L("Collarless — 11 shades", "Tanpa kolar — 11 warna"),
    description: L(
      "The collarless neckline with a single button at the throat, elbow-length sleeves and a chest pocket. Sold as shirt and trousers. Quote the shade number with the code. Sampin sold separately.",
      "Leher tanpa kolar dengan sebutir butang di leher, lengan paras siku dan poket dada. Dijual sebagai baju dan seluar. Nyatakan nombor warna bersama kod. Sampin dijual berasingan.",
    ),
    sizes: menSizes, colours: colours(11),
    shades: [
      { no: "01", name: L("Peach", "Peach"), image: "az-m02-01" },
      { no: "02", name: L("Tan / Apricot", "Aprikot"), image: "az-m02-02" },
      { no: "03", name: L("Cream", "Krim"), image: "az-m02-03" },
      { no: "04", name: L("Sky blue", "Biru Langit"), image: "az-m02-04" },
      { no: "05", name: L("Navy", "Biru Laut"), image: "az-m02-05" },
      { no: "06", name: L("Lilac", "Ungu Lilac"), image: "az-m02-06" },
      { no: "07", name: L("Taupe brown", "Coklat Taupe"), image: "az-m02-07" },
      { no: "08", name: L("Maroon", "Merah Marun"), image: "az-m02-08" },
      { no: "09", name: L("Sage green", "Hijau Pudina"), image: "az-m02-09" },
      { no: "10", name: L("Grey", "Kelabu"), image: "az-m02-10" },
      { no: "11", name: L("Teal", "Biru Firus"), image: "az-m02-11" },
    ],
    images: ["az-m02-05"],
  },
  // ── Baju Kurung (AZ-W01 – W02) ──────────────────────────────
  {
    slug: "kurung-scorpio", code: "AZ-W01", collection: "baju-kurung", name: "Kurung Scorpio",
    price: P(28, 50),
    tagline: L("Scorpio cotton set — 12 colours", "Set Scorpio cotton — 12 warna"),
    description: L(
      "Two-piece tunic and skirt in Scorpio cotton, with sulam embroidery on the scalloped hems at the sleeve, tunic and skirt — a sulam flower is stitched at each scallop. Lightweight and breathable. Eleven shades plus Cloud White (AZ-W01·CW). Sold as a two-piece set.",
      "Set baju dan kain dua helai dalam Scorpio cotton, dengan sulaman pada kelim beralun di lengan, baju dan kain — sekuntum bunga sulam di setiap alun. Ringan dan selesa. Sebelas warna serta Cloud White (AZ-W01·CW). Dijual sebagai set dua helai.",
    ),
    fabric: "Scorpio cotton", sizes: ladiesSizes4, colours: L("11 colours + Cloud White", "11 warna + Cloud White"),
    shades: [
      { no: "01", name: L("Teal", "Teal"), image: "az-w01", swatch: "az-w01-sw01" },
      { no: "02", name: L("Dark Green", "Hijau Gelap"), swatch: "az-w01-sw02" },
      { no: "03", name: L("Mint Green", "Hijau Pudina"), swatch: "az-w01-sw03" },
      { no: "04", name: L("Light Blue", "Biru Muda"), swatch: "az-w01-sw04" },
      { no: "05", name: L("Navy", "Biru Laut"), swatch: "az-w01-sw05" },
      { no: "06", name: L("Lilac", "Lilac"), swatch: "az-w01-sw06" },
      { no: "07", name: L("Dusty Pink", "Merah Jambu Pudar"), swatch: "az-w01-sw07" },
      { no: "08", name: L("Maroon", "Maroon"), swatch: "az-w01-sw08" },
      { no: "09", name: L("Burgundy", "Burgundy"), swatch: "az-w01-sw09" },
      { no: "10", name: L("Mocha", "Moka"), swatch: "az-w01-sw10" },
      { no: "11", name: L("Beige", "Kuning Air"), swatch: "az-w01-sw11" },
      { no: "12", name: L("Cloud White", "Cloud White"), image: "az-w01-cw", swatch: "az-w01-sw12" },
    ],
    images: ["az-w01", "az-w01-cw", "az-w01-cuff", "az-w01-hem"],
    bestseller: 4, bestsellerNote: L("Twelve colours with Cloud White, S to 4XL.", "Dua belas warna termasuk Cloud White, S hingga 4XL."),
  },
  {
    slug: "kurung-sulam", code: "AZ-W02", collection: "baju-kurung", name: "Kurung Sulam",
    price: P(40, 80),
    tagline: L("Embroidered occasion set", "Set bersulam untuk majlis"),
    description: L(
      "Cotton Sulam throughout, with the embroidery banded at the sleeve and skirt hem. The occasion set for Raya and majlis.",
      "Cotton Sulam sepenuhnya, dengan jalur sulaman di hujung lengan dan kelim kain. Set pilihan untuk Raya dan majlis.",
    ),
    fabric: "Cotton Sulam", sizes: ladiesSizes, colours: colours(16), images: ["az-w02-info", "az-w02"], cover: "az-w02",
  },
  // ── Embroidered & beaded kurung (AZ-W07, AZ-W09) ────────────
  {
    slug: "baju-kurung-saree", code: "AZ-W07", collection: "kurung-moden", name: "Baju Kurung Saree",
    tagline: L("Sari-inspired embroidered set — pre-order", "Set bersulam gaya sari — tempahan awal"),
    description: L(
      "Tunic and skirt with heavy floral embroidery, in three designs, each in its own colour. Design A (red): a sari drape panel crossing the tunic front, embroidered edge to edge. Design B (brown): open-front tunic with twin embroidered bands and a floral-sprinkled skirt. Design C (maroon): V-neck tunic with a split front and an embroidered motif rising from the hem. Made to order.",
      "Baju dan kain dengan sulaman bunga yang tebal, dalam tiga rekaan, setiap satu dengan warnanya sendiri. Rekaan A (merah): panel drape gaya sari melintang di hadapan baju, bersulam dari hujung ke hujung. Rekaan B (coklat): baju terbuka di hadapan dengan dua jalur sulaman dan kain bertabur bunga. Rekaan C (merah marun): baju leher V dengan belahan hadapan dan motif sulaman dari kelim. Dibuat mengikut tempahan.",
    ),
    sizes: ladiesSizes4, colours: L("3 designs", "3 rekaan"), priceStatus: "preorder",
    optionLabel: designLabel,
    shades: [
      { no: "A", name: L("Red", "Merah"), image: "az-w07-a" },
      { no: "B", name: L("Brown", "Coklat"), image: "az-w07-b" },
      { no: "C", name: L("Maroon", "Merah Marun"), image: "az-w07-c" },
    ],
    images: ["az-w07-a", "az-w07-a-detail", "az-w07-b", "az-w07-b-detail", "az-w07-c", "az-w07-c-detail"], isNew: true,
  },
  {
    slug: "baju-kurung-patchwork", code: "AZ-W09", collection: "kurung-moden", name: "Baju Kurung Patchwork",
    priceStatus: "request",
    tagline: L("Beaded patchwork kurung set", "Set kurung tampalan bermanik"),
    description: L(
      "Two-piece modern kurung with sheer patchwork panels worked in pearls, beads and stones across the tunic and sleeves.",
      "Kurung moden dua helai dengan panel tampalan jarang yang dihias mutiara, manik dan batu di seluruh baju dan lengan.",
    ),
    sizes: askSizes, colours: colours(2),
    shades: [
      { no: "01", name: L("Grey", "Kelabu") },
      { no: "02", name: L("White", "Putih") },
    ],
    images: ["az-w09"], isNew: true,
  },
  // ── Floral jubbah (AZ-W04) ──────────────────────────────────
  {
    slug: "jubah-bunga", code: "AZ-W04", collection: "bercorak", name: "Jubbah Bunga",
    price: P(31),
    tagline: L("Three prints, nine colourways", "Tiga corak, sembilan warna"),
    description: L(
      "A long, loose one-piece jubbah in a small floral print, with a buttoned placket at the neck and a gathered or buttoned cuff. Three prints, nine colourways in all — quote the design letter and colour. Design A: blue, red. Design B: maroon, blue, green, orange. Design C: blue, green, brown.",
      "Jubah labuh dan longgar sehelai dalam corak bunga kecil, dengan plaket berbutang di leher dan cuff berkedut atau berbutang. Tiga corak, sembilan warna kesemuanya — nyatakan huruf rekaan dan warna. Rekaan A: biru, merah. Rekaan B: maroon, biru, hijau, oren. Rekaan C: biru, hijau, coklat.",
    ),
    fabric: "Printed cotton", sizes: ladiesSizes, colours: L("3 designs · 9 colourways", "3 rekaan · 9 warna"),
    optionLabel: designLabel,
    shades: [
      { no: "A", name: L("Blue, Red", "Biru, Merah"), image: "az-w04-a" },
      { no: "B", name: L("Maroon, Blue, Green, Orange", "Maroon, Biru, Hijau, Oren"), image: "az-w04-b" },
      { no: "C", name: L("Blue, Green, Brown", "Biru, Hijau, Coklat"), image: "az-w04-c" },
    ],
    images: ["az-w04-model", "az-w04-a", "az-w04-b", "az-w04-c"],
  },
  // ── Satin (AZ-W06, AZ-W08) ──────────────────────────────────
  {
    slug: "jubah-satin", code: "AZ-W06", collection: "satin", name: "Jubah Satin",
    price: P(40, 60),
    tagline: L("Zipped satin dress — nursing friendly", "Jubah satin berzip — mesra menyusu"),
    description: L(
      "A one-piece satin jubah with a front zip from the neckline, nursing friendly. Round neck, darted bodice, full-length A-line skirt and a long sleeve gathered into an elastic cuff. Lightweight, with a soft, smooth hand.",
      "Jubah satin sehelai dengan zip hadapan dari leher, mesra menyusu. Leher bulat, badan berdart, kain A-line labuh dan lengan panjang berkedut ke cuff bergetah. Ringan, lembut dan licin.",
    ),
    fabric: "Satin", sizes: ladiesSizes4, colours: colours(4),
    shades: [
      { no: "01", name: L("Dark grey", "Kelabu Gelap"), swatch: "az-w06-sw01" },
      { no: "02", name: L("Light grey", "Kelabu Cerah"), swatch: "az-w06-sw02" },
      { no: "03", name: L("Burgundy", "Burgundy"), image: "az-w06", swatch: "az-w06-sw03" },
      { no: "04", name: L("Hazel", "Hazel"), swatch: "az-w06-sw04" },
    ],
    images: ["az-w06", "az-w06-neck", "az-w06-cuff"], isNew: true,
  },
  {
    slug: "abayah-satin", code: "AZ-W08", collection: "satin", name: "Abayah Satin",
    price: P(40, 60),
    tagline: L("Loose textured-satin abaya", "Abaya satin bertekstur, longgar"),
    description: L(
      "A loose, full-length abaya in textured satin with a soft sheen. Round neck with a concealed front zip, and a full balloon sleeve gathered into an elastic cuff.",
      "Abaya labuh dan longgar dalam satin bertekstur dengan kilauan lembut. Leher bulat dengan zip hadapan tersembunyi, dan lengan belon penuh berkedut ke cuff bergetah.",
    ),
    fabric: "Textured satin", sizes: askSizes, colours: colours(4),
    shades: [
      { no: "01", name: L("Dark grey", "Kelabu Gelap"), image: "az-w08-01" },
      { no: "02", name: L("Light grey", "Kelabu Cerah"), image: "az-w08-02" },
      { no: "03", name: L("Burgundy", "Burgundy"), image: "az-w08-03" },
      { no: "04", name: L("Hazel", "Hazel"), image: "az-w08-04" },
    ],
    images: ["az-w08", "az-w08-neck", "az-w08-cuff"], isNew: true,
  },
  // ── Kaftan (AZ-W05) ─────────────────────────────────────────
  {
    slug: "kaftan-batik", code: "AZ-W05", collection: "kaftan", name: "Kaftan Batik",
    priceStatus: "request",
    tagline: L("Free-size batwing kaftan top", "Kaftan kelawar saiz bebas"),
    description: L(
      "A batwing kaftan top cut free size, worn over slim trousers. Every piece carries a placed border print engineered to the panel, so the hem and sleeve edges finish on the border. Drawstring at the waist, V opening at the neck. Prints run in short lots — tell us the quantity and we'll show you what's on the floor that week.",
      "Kaftan kelawar saiz bebas, dipakai bersama seluar slim. Setiap helai mempunyai corak sempadan yang direka mengikut panel, jadi kelim dan hujung lengan berakhir pada sempadan corak. Tali serut di pinggang, bukaan V di leher. Corak dikeluarkan dalam kuantiti kecil — beritahu kuantiti dan kami tunjukkan stok minggu itu.",
    ),
    sizes: L("Free size", "Saiz bebas"), images: ["az-w05", "az-w05-2", "az-w05-3", "az-w05-4"],
    bestseller: 1, bestsellerNote: L("Our fastest seller — one size fits nearly everyone.", "Paling laris — satu saiz muat hampir semua."),
  },
  // ── Kids (AZ-C01 – C06) ─────────────────────────────────────
  {
    slug: "jubah-yemen-micro-kids", code: "AZ-C01", collection: "jubah-kanak", name: "Jubah Yemen Micro Kids",
    price: P(25, 40),
    tagline: L("Yemeni yoke braid, tasselled cord", "Jalur yoke Yaman, tali berumbai"),
    description: L(
      "Yemeni yoke braid and a tasselled cord, three buttons. In black, maroon, navy and cream.",
      "Jalur yoke gaya Yaman dan tali berumbai, tiga butang. Dalam warna hitam, merah marun, biru laut dan krim.",
    ),
    fabric: "Micro", sizes: kidsSizes, colours: colours(4), images: ["az-c01"],
  },
  {
    slug: "jubah-kolar-china-kids", code: "AZ-C02", collection: "jubah-kanak", name: "Jubah Kolar China Kids",
    price: P(25, 40),
    tagline: L("Five-button collar jubbah for boys", "Jubah kolar lima butang untuk budak"),
    description: L(
      "The five-button collar jubbah in the boys' block, with a double-sided pocket. Twelve shades to match the men's.",
      "Jubah kolar lima butang dalam blok budak, dengan poket dua lapis. Dua belas warna sepadan dengan jubah lelaki.",
    ),
    fabric: "China Cotton", sizes: kidsSizes, colours: colours(12), images: ["az-c02"],
  },
  {
    slug: "kurta-titch-china-kids", code: "AZ-C03", collection: "jubah-kanak", name: "Kurta Titch China Kids",
    price: P(12, 20),
    tagline: L("Half-sleeve kurta with zip pockets", "Kurta lengan pendek dengan poket zip"),
    description: L(
      "Half-sleeve titch-button kurta with zip pockets — the boys' everyday piece, including white.",
      "Kurta lengan pendek butang titch dengan poket zip — pakaian harian budak lelaki, termasuk warna putih.",
    ),
    fabric: "China Cotton", sizes: kidsSizes, colours: colours(12), images: ["az-c03"],
  },
  {
    slug: "jubah-kolar-marhaba-kids", code: "AZ-C04", collection: "jubah-kanak", name: "Jubah Kolar Marhaba Kids",
    price: P(25, 40),
    tagline: L("Marhaba cloth, stand collar", "Kain Marhaba, kolar tegak"),
    description: L(
      "Marhaba cloth, four buttons to a stand collar, a patch chest pocket and a double-sided pocket. Black, white, olive and bottle green.",
      "Kain Marhaba, empat butang hingga kolar tegak, poket dada tampal dan poket dua lapis. Hitam, putih, hijau zaitun dan hijau botol.",
    ),
    fabric: "Marhaba", sizes: kidsSizes, images: ["az-c04"],
  },
  {
    slug: "jubah-kolar-royal-cotton-kids", code: "AZ-C05", collection: "jubah-kanak", name: "Jubah Kolar Royal Cotton Kids",
    price: P(25, 40),
    tagline: L("Father-and-son pair to AZ-J03", "Pasangan ayah dan anak untuk AZ-J03"),
    description: L(
      "The boys' cut of AZ-J03 in the same heavier Royal Cotton and the same single green — the father-and-son pair of the range.",
      "Potongan budak untuk AZ-J03 dalam Royal Cotton tebal yang sama dan warna hijau yang sama — pasangan ayah dan anak dalam rangkaian ini.",
    ),
    fabric: "Royal Cotton", sizes: kidsSizes, colours: L("Green", "Hijau"), images: ["az-c05"],
  },
  {
    slug: "jubah-budak-scorpio", code: "AZ-C06", collection: "jubah-kanak", name: "Jubah Scorpio Kids",
    price: P(25, 40),
    tagline: L("Boys' Scorpio jubah — 16 colours", "Jubah Scorpio budak — 16 warna"),
    description: L(
      "The boys' jubah in Scorpio cotton: round neck with a single button over a keyhole placket, long sleeve, straight hem. Graded in sizes 4, 6, 8, 10, 12, 14 and 16 years so a size run hangs as a set. Match with the men's Jubah Scorpio (AZ-J07) for a father-and-son set.",
      "Jubah budak dalam Scorpio cotton: leher bulat dengan sebutir butang di atas plaket lubang kunci, lengan panjang, kelim lurus. Bergred saiz 4, 6, 8, 10, 12, 14 dan 16 tahun supaya satu set saiz tergantung kemas. Padankan dengan Jubah Scorpio lelaki (AZ-J07) untuk set ayah dan anak.",
    ),
    fabric: "Scorpio cotton", sizes: kidsSizes, colours: colours(16), images: ["az-c06"], isNew: true,
  },
  // ── Sampin & Fabrics ────────────────────────────────────────
  {
    slug: "sampin-songket-standard", code: "AZ-S01", collection: "sampin", name: "Sampin Songket Standard",
    price: P(60, 85),
    tagline: L("Standard (biasa), full length — 25 colours", "Biasa, panjang penuh — 25 warna"),
    description: L(
      "Woven songket sampin in the standard full length, tied in the traditional way over a baju Melayu. 25 colours — ask for the colour card.",
      "Sampin songket tenun dalam panjang penuh biasa, diikat secara tradisional di atas baju Melayu. 25 warna — minta kad warna.",
    ),
    fabric: "Songket", sizes: L("One size, full length", "Satu saiz, panjang penuh"), colours: colours(25),
    images: ["az-s01-s02", "sampin-songket-emas", "sampin-songket-perak"],
  },
  {
    slug: "sampin-songket-instant", code: "AZ-S02", collection: "sampin", name: "Sampin Songket Instant",
    price: P(65, 90),
    tagline: L("Instant — shorter, ready to wear — 25 colours", "Segera — lebih pendek, siap pakai — 25 warna"),
    description: L(
      "The same woven songket in a shorter, ready-to-wear instant sampin — no tying needed. 25 colours — ask for the colour card.",
      "Songket tenun yang sama dalam sampin segera yang lebih pendek dan siap pakai — tidak perlu diikat. 25 warna — minta kad warna.",
    ),
    fabric: "Songket", sizes: L("One size, ready to wear", "Satu saiz, siap pakai"), colours: colours(25),
    images: ["az-s01-s02", "sampin-bercorak"],
  },
  {
    slug: "fabrik-potongan", collection: "fabrik", name: "Fabrik Ikut Potongan",
    priceStatus: "request",
    tagline: L("Cut lengths for the trade", "Kain potongan untuk peniaga"),
    description: L(
      "Our garment cloths sold by the piece: Scorpio premium cotton, China Cotton, Marhaba, Royal Cotton, Osaka / Toyobo, Cotton Linen P/D and the Checkered weave. Each is held on a fixed, numbered colour card so a reorder returns the same shade. Ask for the full colour library — 53 colourways across three stock cards.",
      "Kain pakaian kami dijual ikut potongan: Scorpio premium cotton, China Cotton, Marhaba, Royal Cotton, Osaka / Toyobo, Cotton Linen P/D dan tenunan Checkered. Setiap kain mempunyai kad warna bernombor supaya tempahan semula mendapat warna yang sama. Minta perpustakaan warna penuh — 53 warna dalam tiga kad stok.",
    ),
    fabric: "Scorpio · China Cotton · Marhaba · Royal Cotton · Osaka / Toyobo · Cotton Linen P/D · Checkered",
    sizes: L("By the piece", "Ikut potongan"), images: ["fabric-cut-length"],
  },
];
