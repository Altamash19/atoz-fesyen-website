/** Business details used across the whole site (source: Katalog Pemborong 2026). */
export const site = {
  name: "A TO Z Fesyen Baru",
  legalName: "A TO Z Fesyen Baru Sdn. Bhd.",
  registrationNo: "706666-K",
  foundedYear: 2005,
  // Public address. The deploy workflow sets this; the fallback is the GitHub Pages address.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://altamash19.github.io/atoz-fesyen-website",

  /** Main business WhatsApp — digits only, international format. */
  whatsapp: "601133492470",
  whatsappDisplay: "+60 11-3349 2470",
  /** Second contact person. */
  contactPerson: { name: "Syed Altamash Ali", phone: "60162401107", display: "+60 16-240 1107" },
  email: "atozfa@yahoo.co.in",

  address: {
    unit: "Floor 7, Shop No. 20",
    building: "Kenanga Wholesale City",
    street: "2, Jalan Gelugor, Pudu",
    postcode: "55200",
    city: "Kuala Lumpur",
    state: "Wilayah Persekutuan Kuala Lumpur",
    country: "Malaysia",
  },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Kenanga+Wholesale+City+Jalan+Gelugor+Kuala+Lumpur",

  hours: {
    en: "Sun – Thu 10 am – 7 pm · Fri & Sat 10 am – 8 pm",
    ms: "Ahad – Khamis 10 pagi – 7 malam · Jumaat & Sabtu 10 pagi – 8 malam",
  },

  /**
   * Opening times used for the "Open now" badge, the hours table and Google structured data.
   * day: 0 = Sunday … 6 = Saturday. Times are Malaysia time (24h).
   */
  schedule: [
    { days: [0, 1, 2, 3, 4], open: "10:00", close: "19:00" },
    { days: [5, 6], open: "10:00", close: "20:00" },
  ],
  timeZone: "Asia/Kuala_Lumpur",

  social: {
    facebook: "https://www.facebook.com/atozfesyenbaru",
    instagram: "https://www.instagram.com/atozfesyen.my",
    tiktok: "https://www.tiktok.com/@alwanexclusive",
  },
} as const;

export type Site = typeof site;
