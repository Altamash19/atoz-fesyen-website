/**
 * Product catalogue — source: "A to Z Fesyen Baru · Katalog Pemborong 2026".
 *
 * Design codes (AZ-K01 …) match the printed catalogue so buyers can quote them on WhatsApp.
 * Prices and stock quantities are deliberately NOT stored here (this file ships to the browser).
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
  no: string;
  name: Localized;
  image?: string;
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
  images?: string[];
  /** Ranked best-seller (1 = top) — shown in "Start here". */
  bestseller?: number;
  bestsellerNote?: Localized;
  isNew?: boolean;
}

const L = (en: string, ms: string): Localized => ({ en, ms });
const menSizes = L("S – 5XL", "S – 5XL");
const ladiesSizes = L("S – 5XL", "S – 5XL");
const kidsSizes = L("4 – 16 years (4, 6, 8, 10, 12, 14, 16)", "4 – 16 tahun (4, 6, 8, 10, 12, 14, 16)");
const colours = (n: number) => L(`${n} colours`, `${n} warna`);

export const categories: Category[] = [
  {
    id: "men",
    cover: "az-k06",
    name: L("Men", "Lelaki"),
    blurb: L(
      "Kurta, jubbah and baju Melayu in China Cotton, Royal Cotton, crepe and satin — sizes S to 5XL.",
      "Kurta, jubah dan baju Melayu dalam China Cotton, Royal Cotton, crepe dan satin — saiz S hingga 5XL.",
    ),
  },
  {
    id: "women",
    cover: "az-w01",
    name: L("Women", "Wanita"),
    blurb: L(
      "Baju kurung sets in Scorpio cotton and Cotton Sulam, printed kurung and jubah, and free-size batik kaftan.",
      "Set baju kurung dalam Scorpio cotton dan Cotton Sulam, kurung dan jubah bercorak, serta kaftan batik saiz bebas.",
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
    cover: "sampin-songket-emas",
    name: L("Sampin & Fabrics", "Sampin & Fabrik"),
    blurb: L(
      "Songket and printed sampin, plus cut lengths of our jubbah and kurta cloths for the trade.",
      "Sampin songket dan bercorak, serta kain potongan fabrik jubah dan kurta kami untuk peniaga.",
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
    name: L("Printed Kurung & Jubah", "Kurung & Jubah Bercorak"),
    description: L(
      "Floral prints in printed cotton. Prints change with the season — ask us for the current run.",
      "Corak bunga dalam kapas bercetak. Corak bertukar mengikut musim — tanya kami koleksi semasa.",
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
    name: L("Sampin", "Sampin"),
    description: L(
      "Sampin to complete a baju Melayu set for Raya and weddings. Sold by the piece.",
      "Sampin untuk melengkapkan set baju Melayu bagi Raya dan majlis perkahwinan. Dijual sehelai.",
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
    tagline: L("Three-button kurta, short sleeve", "Kurta tiga butang, lengan pendek"),
    description: L(
      "Three-button placket with a chest pocket. Short sleeve, straight hem — the everyday seller of the range. Plackets are interlined and topstitched, with shell-look four-hole buttons and a woven house label at the chest pocket.",
      "Plaket tiga butang dengan poket dada. Lengan pendek, kelim lurus — jualan harian paling laris dalam rangkaian ini. Plaket berlapik dan dijahit tindas, butang empat lubang rupa cangkerang dan label tenun di poket dada.",
    ),
    fabric: "China Cotton", sizes: menSizes, images: ["az-k01", "az-k01-2"],
  },
  {
    slug: "kurta-leher-v", code: "AZ-K02", collection: "kurta-lelaki", name: "Kurta Leher V",
    tagline: L("V-neck kurta, long sleeve", "Kurta leher V, lengan panjang"),
    description: L(
      "A clean V opening with no buttons. Long sleeve — the quietest neckline we cut.",
      "Bukaan leher V yang kemas tanpa butang. Lengan panjang — potongan leher paling ringkas kami.",
    ),
    fabric: "China Cotton", sizes: menSizes, images: ["az-k02"],
  },
  {
    slug: "kurta-dua-butang", code: "AZ-K03", collection: "kurta-lelaki", name: "Kurta Dua Butang",
    tagline: L("Two-button collar band, long sleeve", "Dua butang pada kolar, lengan panjang"),
    description: L(
      "Two buttons at the collar band, long sleeve. The traditional finish, plainly done.",
      "Dua butang pada jalur kolar, lengan panjang. Kemasan tradisional yang ringkas.",
    ),
    fabric: "China Cotton", sizes: menSizes, images: ["az-k03"],
  },
  {
    slug: "kurta-butang-luppi", code: "AZ-K04", collection: "kurta-lelaki", name: "Kurta Butang Luppi",
    tagline: L("Ornamental luppi button at the throat", "Butang hiasan luppi di leher"),
    description: L(
      "A single ornamental luppi button at the throat over a short slit opening — the dressiest of the plain necklines.",
      "Sebutir butang hiasan luppi di leher dengan belahan pendek — paling segak antara potongan leher kosong.",
    ),
    fabric: "China Cotton", sizes: menSizes, images: ["az-k04"],
  },
  {
    slug: "kurta-kolar-cuff", code: "AZ-K05", collection: "kurta-lelaki", name: "Kurta Kolar Cuff",
    tagline: L("Buttoned collar with shirt cuff, in crepe", "Kolar berbutang dan cuff kemeja, fabrik crepe"),
    description: L(
      "Buttoned collar band and a proper shirt cuff, cut in crepe. The formal end of the kurta range.",
      "Kolar berbutang dan cuff kemeja sebenar, dalam fabrik crepe. Pilihan paling formal dalam rangkaian kurta.",
    ),
    fabric: "Crepe", sizes: menSizes, images: ["az-k05"],
  },
  // ── Kurta Bercorak (AZ-K06 – K10) ───────────────────────────
  {
    slug: "kurta-kosong", code: "AZ-K06", collection: "kurta-bercorak", name: "Kurta Kosong",
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
    tagline: L("Woven satin stripe", "Jalur satin tenun"),
    description: L(
      "Woven satin stripe running the length of the body, matched at the placket. Thirty grounds.",
      "Jalur satin tenun sepanjang badan, dipadankan di plaket. Tiga puluh warna dasar.",
    ),
    fabric: "Woven stripe", sizes: menSizes, colours: colours(30), images: ["az-k07"],
  },
  {
    slug: "kurta-kotak-besar", code: "AZ-K08", collection: "kurta-bercorak", name: "Kurta Kotak Besar",
    tagline: L("Wide windowpane check", "Kotak besar windowpane"),
    description: L(
      "A wide windowpane check in the Checkered weave — the quietest of the three check scales. Check and stripe kurta sell all year, for Friday and for work.",
      "Corak kotak besar windowpane dalam tenunan Checkered — paling lembut antara tiga saiz kotak. Kurta kotak dan jalur laku sepanjang tahun, untuk Jumaat dan ke tempat kerja.",
    ),
    fabric: "Checkered", sizes: menSizes, colours: colours(15), images: ["az-k08"],
    bestseller: 2, bestsellerNote: L("Bought for Friday and for work — moves all year.", "Dibeli untuk Jumaat dan kerja — laku sepanjang tahun."),
  },
  {
    slug: "kurta-kotak-kecil", code: "AZ-K09", collection: "kurta-bercorak", name: "Kurta Kotak Kecil",
    tagline: L("Fine gingham check", "Kotak kecil gingham"),
    description: L("Fine gingham check in the Checkered weave, fourteen grounds.", "Kotak kecil gingham dalam tenunan Checkered, empat belas warna dasar."),
    fabric: "Checkered", sizes: menSizes, colours: colours(14), images: ["az-k09"],
  },
  {
    slug: "kurta-kotak-plaid", code: "AZ-K10", collection: "kurta-bercorak", name: "Kurta Kotak Plaid",
    tagline: L("Madras-scale plaid", "Plaid saiz Madras"),
    description: L("Madras-scale plaid in the Checkered weave, sixteen grounds.", "Plaid saiz Madras dalam tenunan Checkered, enam belas warna dasar."),
    fabric: "Checkered", sizes: menSizes, colours: colours(16), images: ["az-k10"],
  },
  // ── Jubah Lelaki (AZ-J01 – J03) ─────────────────────────────
  {
    slug: "jubah-lima-butang", code: "AZ-J01", collection: "jubah-lelaki", name: "Jubah Lima Butang",
    tagline: L("Five-button stand-collar jubbah", "Jubah kolar lima butang"),
    description: L(
      "China Cotton, five-button placket to a stand collar, floor length. Double-sided chest pocket and two side zip pockets.",
      "China Cotton, plaket lima butang hingga kolar tegak, labuh ke lantai. Poket dada dua lapis dan dua poket zip sisi.",
    ),
    fabric: "China Cotton", sizes: menSizes, colours: colours(8), images: ["az-j01"],
  },
  {
    slug: "jubah-omani", code: "AZ-J02", collection: "jubah-lelaki", name: "Jubah Omani",
    tagline: L("Tasselled cord with yoke embroidery", "Tali berumbai dengan sulaman yoke"),
    description: L(
      "Tasselled cord at the throat with tone-on-tone yoke embroidery. Two side zip pockets.",
      "Tali berumbai di leher dengan sulaman yoke sewarna. Dua poket zip sisi.",
    ),
    fabric: "China Cotton", sizes: menSizes, images: ["az-j02"],
  },
  {
    slug: "jubah-kolar-royal-cotton", code: "AZ-J03", collection: "jubah-lelaki", name: "Jubah Kolar Royal Cotton",
    tagline: L("Heavier Royal Cotton, green only", "Royal Cotton lebih tebal, hijau sahaja"),
    description: L(
      "The heavier Royal Cotton body with a firm stand collar. Green only, and worth the single colourway. The boys' version is AZ-C05 for father-and-son sets.",
      "Badan Royal Cotton yang lebih tebal dengan kolar tegak yang kemas. Hijau sahaja — dan tetap laku. Versi budak ialah AZ-C05 untuk set ayah dan anak.",
    ),
    fabric: "Royal Cotton", sizes: menSizes, colours: L("Green", "Hijau"), images: ["az-j03", "az-j03-2"],
    bestseller: 5, bestsellerNote: L("Green only, and it still sells.", "Hijau sahaja, dan tetap laku."),
  },
  // ── Kurta Kolar China (AZ-J04 – J06) ────────────────────────
  {
    slug: "kurta-kolar-china", code: "AZ-J04", collection: "kurta-kolar-china", name: "Kurta Kolar China",
    tagline: L("Collar kurta, welted chest pocket", "Kurta berkolar, poket dada welt"),
    description: L(
      "Waist-length collar kurta with a welted chest pocket and side zip pockets. Our deepest colour card — eighteen shades.",
      "Kurta berkolar paras pinggang dengan poket dada welt dan poket zip sisi. Kad warna terdalam kami — lapan belas warna.",
    ),
    fabric: "China Cotton", sizes: menSizes, colours: colours(18), images: ["az-j04"],
  },
  {
    slug: "kurta-kolar-cuff-china", code: "AZ-J05", collection: "kurta-kolar-china", name: "Kurta Kolar Cuff China",
    tagline: L("Buttoned cuff, curved shirt hem", "Cuff berbutang, kelim kemeja melengkung"),
    description: L(
      "Buttoned cuff and a curved shirt hem, zip pockets on both sides. Six shades including white.",
      "Cuff berbutang dan kelim kemeja melengkung, poket zip di kedua-dua sisi. Enam warna termasuk putih.",
    ),
    fabric: "China Cotton", sizes: menSizes, colours: colours(6), images: ["az-j05"],
  },
  {
    slug: "kurta-titch-lengan-pendek", code: "AZ-J06", collection: "kurta-kolar-china", name: "Kurta Titch Lengan Pendek",
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
    tagline: L("Collared, satin — 9 shades", "Berkolar, satin — 9 warna"),
    description: L(
      "A standing collar closed with five buttons, a chest pocket and two hip pockets. Satin, sold as shirt and trousers. Quote the shade number with the code. Sampin sold separately.",
      "Kolar tegak dengan lima butang, poket dada dan dua poket pinggul. Satin, dijual sebagai baju dan seluar. Nyatakan nombor warna bersama kod. Sampin dijual berasingan.",
    ),
    fabric: "Satin", sizes: menSizes, colours: colours(9),
    shades: [
      { no: "01", name: L("Emerald", "Hijau Zamrud"), image: "az-m01-01" },
      { no: "02", name: L("Black", "Hitam"), image: "az-m01-02" },
      { no: "03", name: L("Royal blue", "Biru Diraja"), image: "az-m01-03" },
      { no: "04", name: L("Grey", "Kelabu"), image: "az-m01-04" },
      { no: "05", name: L("Turquoise", "Biru Firus"), image: "az-m01-05" },
      { no: "06", name: L("Red", "Merah"), image: "az-m01-06" },
      { no: "07", name: L("Olive", "Hijau Zaitun"), image: "az-m01-07" },
      { no: "08", name: L("Cream", "Krim"), image: "az-m01-08" },
      { no: "09", name: L("Purple", "Ungu"), image: "az-m01-09" },
    ],
    images: ["az-m01-01"],
  },
  {
    slug: "baju-melayu-teluk-belanga", code: "AZ-M02", collection: "baju-melayu", name: "Baju Melayu Teluk Belanga",
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
    tagline: L("Scorpio cotton set — 12 colourways", "Set Scorpio cotton — 12 warna"),
    description: L(
      "Scorpio 100% cotton with a scalloped hem on the top and skirt and a gathered cuff. Twelve colourways from ash grey to burnt wine. Cloud White (AZ-W01·CW) is the strongest seller of the twelve; also popular in sand khaki, cocoa brown and olive green.",
      "Scorpio 100% kapas dengan kelim beralun pada baju dan kain serta cuff berkedut. Dua belas warna dari kelabu abu hingga merah wain. Cloud White (AZ-W01·CW) paling laris; juga popular dalam warna khaki pasir, coklat koko dan hijau zaitun.",
    ),
    fabric: "Scorpio cotton", sizes: ladiesSizes, colours: colours(12), images: ["az-w01", "az-w01-2", "az-w01-3"],
    bestseller: 4, bestsellerNote: L("Twelve colours, S to 5XL.", "Dua belas warna, S hingga 5XL."),
  },
  {
    slug: "kurung-sulam", code: "AZ-W02", collection: "baju-kurung", name: "Kurung Sulam",
    tagline: L("Embroidered occasion set", "Set bersulam untuk majlis"),
    description: L(
      "Cotton Sulam throughout, with the embroidery banded at the sleeve and skirt hem. The occasion set for Raya and majlis.",
      "Cotton Sulam sepenuhnya, dengan jalur sulaman di hujung lengan dan kelim kain. Set pilihan untuk Raya dan majlis.",
    ),
    fabric: "Cotton Sulam", sizes: ladiesSizes, colours: colours(16), images: ["az-w02"],
  },
  // ── Bercorak (AZ-W03 – W04) ─────────────────────────────────
  {
    slug: "kurung-bunga-lace", code: "AZ-W03", collection: "bercorak", name: "Kurung Bunga Lace",
    tagline: L("Floral print with lace band", "Corak bunga dengan jalur lace"),
    description: L(
      "A ditsy floral print with a wide lace band set into the hem of the top and repeated at the skirt. Contrast neck binding, long sleeve.",
      "Corak bunga kecil dengan jalur lace lebar di kelim baju dan diulang pada kain. Lipatan leher berwarna kontras, lengan panjang.",
    ),
    fabric: "Printed cotton", sizes: ladiesSizes, images: ["az-w03"],
  },
  {
    slug: "jubah-bunga", code: "AZ-W04", collection: "bercorak", name: "Jubah Bunga",
    tagline: L("One-piece floral jubah", "Jubah corak bunga sehelai"),
    description: L(
      "One-piece jubah in a small floral print — buttoned front, gathered cuff, full length. The everyday alternative to the two-piece kurung.",
      "Jubah sehelai dalam corak bunga kecil — butang di hadapan, cuff berkedut, labuh penuh. Alternatif harian kepada baju kurung dua helai.",
    ),
    fabric: "Printed cotton", sizes: ladiesSizes, images: ["az-w04"],
  },
  // ── Kaftan (AZ-W05) ─────────────────────────────────────────
  {
    slug: "kaftan-batik", code: "AZ-W05", collection: "kaftan", name: "Kaftan Batik",
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
    tagline: L("Yemeni yoke braid, tasselled cord", "Jalur yoke Yaman, tali berumbai"),
    description: L(
      "Yemeni yoke braid and a tasselled cord, three buttons. In black, maroon, navy and cream.",
      "Jalur yoke gaya Yaman dan tali berumbai, tiga butang. Dalam warna hitam, merah marun, biru laut dan krim.",
    ),
    fabric: "Micro", sizes: kidsSizes, colours: colours(4), images: ["az-c01"],
  },
  {
    slug: "jubah-kolar-china-kids", code: "AZ-C02", collection: "jubah-kanak", name: "Jubah Kolar China Kids",
    tagline: L("Five-button collar jubbah for boys", "Jubah kolar lima butang untuk budak"),
    description: L(
      "The five-button collar jubbah in the boys' block, with a double-sided pocket. Twelve shades to match the men's.",
      "Jubah kolar lima butang dalam blok budak, dengan poket dua lapis. Dua belas warna sepadan dengan jubah lelaki.",
    ),
    fabric: "China Cotton", sizes: kidsSizes, colours: colours(12), images: ["az-c02"],
  },
  {
    slug: "kurta-titch-china-kids", code: "AZ-C03", collection: "jubah-kanak", name: "Kurta Titch China Kids",
    tagline: L("Half-sleeve kurta with zip pockets", "Kurta lengan pendek dengan poket zip"),
    description: L(
      "Half-sleeve titch-button kurta with zip pockets — the boys' everyday piece, including white.",
      "Kurta lengan pendek butang titch dengan poket zip — pakaian harian budak lelaki, termasuk warna putih.",
    ),
    fabric: "China Cotton", sizes: kidsSizes, colours: colours(12), images: ["az-c03"],
  },
  {
    slug: "jubah-kolar-marhaba-kids", code: "AZ-C04", collection: "jubah-kanak", name: "Jubah Kolar Marhaba Kids",
    tagline: L("Marhaba cloth, stand collar", "Kain Marhaba, kolar tegak"),
    description: L(
      "Marhaba cloth, four buttons to a stand collar, a patch chest pocket and a double-sided pocket. Black, white, olive and bottle green.",
      "Kain Marhaba, empat butang hingga kolar tegak, poket dada tampal dan poket dua lapis. Hitam, putih, hijau zaitun dan hijau botol.",
    ),
    fabric: "Marhaba", sizes: kidsSizes, images: ["az-c04"],
  },
  {
    slug: "jubah-kolar-royal-cotton-kids", code: "AZ-C05", collection: "jubah-kanak", name: "Jubah Kolar Royal Cotton Kids",
    tagline: L("Father-and-son pair to AZ-J03", "Pasangan ayah dan anak untuk AZ-J03"),
    description: L(
      "The boys' cut of AZ-J03 in the same heavier Royal Cotton and the same single green — the father-and-son pair of the range.",
      "Potongan budak untuk AZ-J03 dalam Royal Cotton tebal yang sama dan warna hijau yang sama — pasangan ayah dan anak dalam rangkaian ini.",
    ),
    fabric: "Royal Cotton", sizes: kidsSizes, colours: L("Green", "Hijau"), images: ["az-c05"],
  },
  {
    slug: "jubah-budak-scorpio", code: "AZ-C06", collection: "jubah-kanak", name: "Jubah Budak Scorpio",
    tagline: L("One design, seven sizes — 17 colours", "Satu rekaan, tujuh saiz — 17 warna"),
    description: L(
      "The boys' jubbah in Scorpio 100% cotton: keyhole neck with a single button, three-quarter sleeve, side slits and a straight hem. Cut in sizes 4 to 16 on one graded block, so a size run hangs as a set. Order by swatch number; pairs with Kurta Kosong (AZ-K06) in the matching shade.",
      "Jubah budak dalam Scorpio 100% kapas: leher lubang kunci dengan sebutir butang, lengan tiga suku, belahan sisi dan kelim lurus. Dipotong saiz 4 hingga 16 pada satu blok bergred, jadi satu set saiz tergantung kemas. Tempah ikut nombor warna; padan dengan Kurta Kosong (AZ-K06) dalam warna yang sama.",
    ),
    fabric: "Scorpio cotton", sizes: kidsSizes, colours: colours(17), images: ["az-c06"], isNew: true,
  },
  // ── Sampin & Fabrics ────────────────────────────────────────
  {
    slug: "sampin-songket-perak", collection: "sampin", name: "Sampin Songket Perak",
    tagline: L("Silver songket, geometric border", "Songket perak, sempadan geometri"),
    description: L("Woven geometric border on black.", "Sempadan geometri tenunan di atas dasar hitam."),
    fabric: "Songket", sizes: L("One size", "Satu saiz"), images: ["sampin-songket-perak"],
  },
  {
    slug: "sampin-songket-emas", collection: "sampin", name: "Sampin Songket Emas",
    tagline: L("Gold songket, floral field", "Songket emas, corak bunga"),
    description: L("Floral field with a zigzag head.", "Corak bunga dengan kepala zigzag."),
    fabric: "Songket", sizes: L("One size", "Satu saiz"), images: ["sampin-songket-emas"],
  },
  {
    slug: "sampin-bercorak", collection: "sampin", name: "Sampin Bercorak",
    tagline: L("Printed pairs, teal and plum", "Corak cetak, teal dan plum"),
    description: L("Printed sampin in pairs — teal and plum.", "Sampin bercorak cetak secara berpasangan — teal dan plum."),
    sizes: L("One size", "Satu saiz"), images: ["sampin-bercorak"],
  },
  {
    slug: "fabrik-potongan", collection: "fabrik", name: "Fabrik Ikut Potongan",
    tagline: L("Cut lengths for the trade", "Kain potongan untuk peniaga"),
    description: L(
      "Our garment cloths sold by the piece: Scorpio premium cotton, China Cotton, Marhaba, Royal Cotton, Osaka / Toyobo, Cotton Linen P/D and the Checkered weave. Each is held on a fixed, numbered colour card so a reorder returns the same shade. Ask for the full colour library — 53 colourways across three stock cards.",
      "Kain pakaian kami dijual ikut potongan: Scorpio premium cotton, China Cotton, Marhaba, Royal Cotton, Osaka / Toyobo, Cotton Linen P/D dan tenunan Checkered. Setiap kain mempunyai kad warna bernombor supaya tempahan semula mendapat warna yang sama. Minta perpustakaan warna penuh — 53 warna dalam tiga kad stok.",
    ),
    fabric: "Scorpio · China Cotton · Marhaba · Royal Cotton · Osaka / Toyobo · Cotton Linen P/D · Checkered",
    sizes: L("By the piece", "Ikut potongan"), images: ["fabric-cut-length"],
  },
];
