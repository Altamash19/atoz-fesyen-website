import type { Locale } from "./config";

const en = {
  meta: {
    title: "A TO Z Fesyen Baru — Muslim Fashion Wholesaler in Malaysia",
    description:
      "Wholesale and retail Muslim fashion since 2005: jubbah, kurta, baju Melayu, baju kurung and kids' wear. Ready stock for retailers in Malaysia and Brunei — enquire on WhatsApp.",
  },
  nav: {
    home: "Home",
    products: "Products",
    wholesale: "Wholesale",
    about: "About",
    contact: "Contact",
    menu: "Menu",
    close: "Close menu",
    skip: "Skip to content",
    language: "Language",
  },
  cta: {
    whatsapp: "Chat on WhatsApp",
    enquire: "Enquire on WhatsApp",
    quote: "Request wholesale quote",
    browse: "Browse catalogue",
    viewAll: "View all products",
    viewProduct: "View details",
  },
  home: {
    eyebrow: "Wholesale & retail Muslim fashion since 2005",
    title: "Quality Muslim wear, ready for your store.",
    subtitle:
      "Jubbah, kurta, baju Melayu, baju kurung and kids' wear — supplied in bulk to retailers, mosques, schools and boutiques across Malaysia and Brunei.",
    categoriesTitle: "Shop by category",
    featuredTitle: "Popular with our retailers",
    featuredSubtitle: "Fast-moving styles our wholesale customers reorder most.",
    whyTitle: "Why retailers choose A TO Z",
    why: [
      { title: "Since 2005", text: "Two decades supplying traditional and Muslim fashion to Malaysian retailers." },
      { title: "Ready stock", text: "Large ready stock across men's, women's and kids' ranges for quick fulfilment." },
      { title: "Wholesale pricing", text: "Competitive bulk pricing for retailers, institutions and bulk orders." },
      { title: "Malaysia & Brunei", text: "Serving trade customers locally and across the border." },
    ],
    stepsTitle: "How wholesale ordering works",
    steps: [
      { title: "Choose your styles", text: "Browse the catalogue and note the styles, sizes and colours you need." },
      { title: "Get a quote", text: "Send us your list on WhatsApp or the enquiry form. We reply with pricing and availability." },
      { title: "Confirm & collect", text: "Confirm your order and arrange pickup or delivery." },
    ],
    ctaTitle: "Planning stock for Ramadan & Hari Raya?",
    ctaText: "Talk to us early to secure sizes and colours before the festive rush.",
    stats: { styles: "styles", categories: "categories", years: "years in business" },
  },
  products: {
    title: "Product catalogue",
    subtitle: "Browse our ready-stock range. Prices are quoted on request — wholesale pricing depends on quantity.",
    all: "All",
    search: "Search products",
    searchPlaceholder: "Search e.g. jubbah, kurung, kids…",
    results: (n: number) => `${n} ${n === 1 ? "product" : "products"}`,
    empty: "No products match your search.",
    clear: "Clear filters",
    filterLabel: "Filter by category",
    newBadge: "New",
    photoSoon: "Photo coming soon",
  },
  product: {
    breadcrumb: "Products",
    category: "Category",
    collection: "Collection",
    style: "Style",
    fabric: "Fabric",
    sizes: "Sizes",
    sizesValue: "Multiple sizes available — ask us for the size chart.",
    price: "Price",
    priceValue: "Quoted on request (retail & wholesale)",
    availability: "Availability",
    availabilityValue: "Available for retail and wholesale orders",
    howTo: "How to order",
    howToText: "Tap the WhatsApp button and we'll reply with pricing, sizes, colours and stock. For bulk orders, tell us the quantity you need.",
    related: "You may also like",
    metaSuffix: "Wholesale & retail from A TO Z Fesyen Baru, Malaysia.",
    message: (name: string, url: string) =>
      `Hi A TO Z Fesyen, I'm interested in: ${name}\n${url}\n\nCould you share the price, sizes and colours available?`,
    quoteMessage: (name: string, url: string) =>
      `Hi A TO Z Fesyen, I'd like a WHOLESALE quote for: ${name}\n${url}\n\nQuantity: \nSizes: \nColours: `,
  },
  wholesale: {
    title: "Wholesale enquiries",
    subtitle:
      "We supply retailers, boutiques, mosques, religious schools and corporate buyers. Send us your requirements and we'll get back with a quote.",
    whoTitle: "Who we work with",
    who: ["Retail shops & boutiques", "Textile and fashion stores", "Mosques & surau", "Tahfiz and religious schools", "Corporate & event orders", "Export customers (Brunei)"],
    formTitle: "Request a quote",
    formNote: "Submitting opens WhatsApp with your details pre-filled — nothing is stored on this website.",
    fields: {
      name: "Your name",
      business: "Business / organisation",
      location: "City / country",
      products: "Products you're interested in",
      productsPlaceholder: "e.g. Men's jubbah white 4-button, Kids' kurta…",
      quantity: "Estimated quantity",
      quantityPlaceholder: "e.g. 200 pcs",
      notes: "Anything else (sizes, colours, delivery date)",
    },
    submit: "Send via WhatsApp",
    required: "Required",
    messageHeader: "Hi A TO Z Fesyen, I'd like a wholesale quote.",
  },
  about: {
    title: "About A TO Z Fesyen Baru",
    intro:
      "A TO Z Fesyen Baru Sdn. Bhd. was incorporated in Malaysia on 17 August 2005. For two decades we have supplied traditional and Muslim fashion to retailers, institutions and families.",
    story:
      "What started as a textile wholesale business has grown into a wide ready-stock range of jubbah, kurta, baju Melayu, baju kurung and children's wear. Our customers include retail chains, independent boutiques and buyers in Brunei who rely on us for consistent quality and supply — especially in the busy Ramadan and Hari Raya season.",
    valuesTitle: "What we stand for",
    values: [
      { title: "Modest, quality clothing", text: "Comfortable, well-made garments suitable for prayer, work and celebration." },
      { title: "Reliable supply", text: "Large ready stock so our retail partners can restock quickly." },
      { title: "Fair dealing", text: "Clear pricing and long-term relationships with our customers." },
    ],
    careersTitle: "Join our team",
    careersText: "We're always happy to hear from self-motivated people who want to grow with us. Send us a message to ask about openings.",
    founded: "Incorporated",
  },
  contact: {
    title: "Contact us",
    subtitle: "The fastest way to reach us is WhatsApp. We usually reply within business hours.",
    whatsapp: "WhatsApp",
    phone: "Phone",
    email: "Email",
    address: "Address",
    hours: "Business hours",
    directions: "Get directions",
  },
  footer: {
    tagline: "Wholesale & retail Muslim fashion — jubbah, kurta, baju Melayu, baju kurung and kids' wear.",
    explore: "Explore",
    getInTouch: "Get in touch",
    rights: "All rights reserved.",
  },
  notFound: {
    title: "Page not found",
    text: "The page you're looking for doesn't exist or has moved.",
    back: "Back to catalogue",
  },
};

export type Dictionary = typeof en;

const ms: Dictionary = {
  meta: {
    title: "A TO Z Fesyen Baru — Pemborong Pakaian Muslim di Malaysia",
    description:
      "Borong dan runcit pakaian Muslim sejak 2005: jubah, kurta, baju Melayu, baju kurung dan pakaian kanak-kanak. Stok sedia ada untuk peruncit di Malaysia dan Brunei — hubungi kami di WhatsApp.",
  },
  nav: {
    home: "Utama",
    products: "Produk",
    wholesale: "Borong",
    about: "Tentang Kami",
    contact: "Hubungi",
    menu: "Menu",
    close: "Tutup menu",
    skip: "Langkau ke kandungan",
    language: "Bahasa",
  },
  cta: {
    whatsapp: "WhatsApp Kami",
    enquire: "Tanya di WhatsApp",
    quote: "Minta sebut harga borong",
    browse: "Lihat katalog",
    viewAll: "Lihat semua produk",
    viewProduct: "Lihat butiran",
  },
  home: {
    eyebrow: "Borong & runcit pakaian Muslim sejak 2005",
    title: "Pakaian Muslim berkualiti, sedia untuk kedai anda.",
    subtitle:
      "Jubah, kurta, baju Melayu, baju kurung dan pakaian kanak-kanak — dibekalkan secara borong kepada peruncit, masjid, sekolah dan butik di seluruh Malaysia dan Brunei.",
    categoriesTitle: "Beli mengikut kategori",
    featuredTitle: "Pilihan popular peruncit",
    featuredSubtitle: "Gaya laris yang paling kerap ditempah semula oleh pelanggan borong kami.",
    whyTitle: "Mengapa peruncit memilih A TO Z",
    why: [
      { title: "Sejak 2005", text: "Dua dekad membekalkan pakaian tradisional dan Muslim kepada peruncit Malaysia." },
      { title: "Stok sedia ada", text: "Stok besar untuk lelaki, wanita dan kanak-kanak bagi penghantaran pantas." },
      { title: "Harga borong", text: "Harga pukal yang kompetitif untuk peruncit, institusi dan tempahan besar." },
      { title: "Malaysia & Brunei", text: "Melayani pelanggan perniagaan dalam negara dan merentas sempadan." },
    ],
    stepsTitle: "Cara membuat tempahan borong",
    steps: [
      { title: "Pilih gaya", text: "Lihat katalog dan catat gaya, saiz dan warna yang anda perlukan." },
      { title: "Dapatkan sebut harga", text: "Hantar senarai anda melalui WhatsApp atau borang pertanyaan. Kami akan membalas dengan harga dan ketersediaan." },
      { title: "Sahkan & ambil", text: "Sahkan tempahan dan atur pengambilan atau penghantaran." },
    ],
    ctaTitle: "Merancang stok untuk Ramadan & Hari Raya?",
    ctaText: "Hubungi kami awal untuk mendapatkan saiz dan warna sebelum musim perayaan.",
    stats: { styles: "gaya", categories: "kategori", years: "tahun beroperasi" },
  },
  products: {
    title: "Katalog produk",
    subtitle: "Lihat rangkaian stok sedia ada kami. Harga diberi atas permintaan — harga borong bergantung kepada kuantiti.",
    all: "Semua",
    search: "Cari produk",
    searchPlaceholder: "Cari cth. jubah, kurung, kanak-kanak…",
    results: (n: number) => `${n} produk`,
    empty: "Tiada produk sepadan dengan carian anda.",
    clear: "Kosongkan penapis",
    filterLabel: "Tapis mengikut kategori",
    newBadge: "Baharu",
    photoSoon: "Gambar akan datang",
  },
  product: {
    breadcrumb: "Produk",
    category: "Kategori",
    collection: "Koleksi",
    style: "Gaya",
    fabric: "Fabrik",
    sizes: "Saiz",
    sizesValue: "Pelbagai saiz tersedia — minta carta saiz daripada kami.",
    price: "Harga",
    priceValue: "Diberi atas permintaan (runcit & borong)",
    availability: "Ketersediaan",
    availabilityValue: "Tersedia untuk tempahan runcit dan borong",
    howTo: "Cara membuat tempahan",
    howToText: "Tekan butang WhatsApp dan kami akan membalas dengan harga, saiz, warna dan stok. Untuk tempahan pukal, nyatakan kuantiti yang diperlukan.",
    related: "Anda mungkin juga suka",
    metaSuffix: "Borong & runcit daripada A TO Z Fesyen Baru, Malaysia.",
    message: (name: string, url: string) =>
      `Salam A TO Z Fesyen, saya berminat dengan: ${name}\n${url}\n\nBoleh kongsikan harga, saiz dan warna yang ada?`,
    quoteMessage: (name: string, url: string) =>
      `Salam A TO Z Fesyen, saya ingin sebut harga BORONG untuk: ${name}\n${url}\n\nKuantiti: \nSaiz: \nWarna: `,
  },
  wholesale: {
    title: "Pertanyaan borong",
    subtitle:
      "Kami membekal kepada peruncit, butik, masjid, sekolah agama dan pembeli korporat. Hantar keperluan anda dan kami akan memberikan sebut harga.",
    whoTitle: "Pelanggan kami",
    who: ["Kedai runcit & butik", "Kedai tekstil dan fesyen", "Masjid & surau", "Sekolah tahfiz dan agama", "Tempahan korporat & majlis", "Pelanggan eksport (Brunei)"],
    formTitle: "Minta sebut harga",
    formNote: "Butang hantar akan membuka WhatsApp dengan maklumat anda — tiada data disimpan di laman web ini.",
    fields: {
      name: "Nama anda",
      business: "Perniagaan / organisasi",
      location: "Bandar / negara",
      products: "Produk yang diminati",
      productsPlaceholder: "cth. Jubah lelaki putih 4 butang, Kurta kanak-kanak…",
      quantity: "Anggaran kuantiti",
      quantityPlaceholder: "cth. 200 helai",
      notes: "Maklumat lain (saiz, warna, tarikh penghantaran)",
    },
    submit: "Hantar melalui WhatsApp",
    required: "Wajib",
    messageHeader: "Salam A TO Z Fesyen, saya ingin mendapatkan sebut harga borong.",
  },
  about: {
    title: "Tentang A TO Z Fesyen Baru",
    intro:
      "A TO Z Fesyen Baru Sdn. Bhd. diperbadankan di Malaysia pada 17 Ogos 2005. Selama dua dekad kami membekalkan pakaian tradisional dan Muslim kepada peruncit, institusi dan keluarga.",
    story:
      "Bermula sebagai perniagaan borong tekstil, kami kini menawarkan rangkaian stok sedia ada yang luas — jubah, kurta, baju Melayu, baju kurung dan pakaian kanak-kanak. Pelanggan kami termasuk rangkaian runcit, butik bebas dan pembeli di Brunei yang bergantung kepada kami untuk kualiti dan bekalan yang konsisten — terutamanya pada musim Ramadan dan Hari Raya.",
    valuesTitle: "Prinsip kami",
    values: [
      { title: "Pakaian sopan & berkualiti", text: "Pakaian yang selesa dan kemas untuk solat, kerja dan perayaan." },
      { title: "Bekalan yang boleh diharap", text: "Stok sedia ada yang besar supaya rakan runcit boleh menambah stok dengan cepat." },
      { title: "Urusan yang adil", text: "Harga yang jelas dan hubungan jangka panjang dengan pelanggan." },
    ],
    careersTitle: "Sertai pasukan kami",
    careersText: "Kami sentiasa mengalu-alukan individu bermotivasi yang ingin berkembang bersama kami. Hubungi kami untuk bertanya tentang jawatan kosong.",
    founded: "Diperbadankan",
  },
  contact: {
    title: "Hubungi kami",
    subtitle: "Cara paling pantas ialah melalui WhatsApp. Kami biasanya membalas dalam waktu perniagaan.",
    whatsapp: "WhatsApp",
    phone: "Telefon",
    email: "E-mel",
    address: "Alamat",
    hours: "Waktu perniagaan",
    directions: "Dapatkan arah",
  },
  footer: {
    tagline: "Borong & runcit pakaian Muslim — jubah, kurta, baju Melayu, baju kurung dan pakaian kanak-kanak.",
    explore: "Teroka",
    getInTouch: "Hubungi kami",
    rights: "Hak cipta terpelihara.",
  },
  notFound: {
    title: "Halaman tidak ditemui",
    text: "Halaman yang anda cari tidak wujud atau telah dipindahkan.",
    back: "Kembali ke katalog",
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, ms };

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}
