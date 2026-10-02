/** Business details used across the whole site (source: Katalog Pemborong 2026). */
export const site = {
  name: "A TO Z Fesyen Baru",
  legalName: "A TO Z Fesyen Baru Sdn. Bhd.",
  registrationNo: "706666-K",
  foundedYear: 2005,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://atozfesyen.com",

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
    en: "Monday – Saturday, 10:00 am – 6:00 pm",
    ms: "Isnin – Sabtu, 10.00 pagi – 6.00 petang",
  },

  social: {
    facebook: "https://www.facebook.com/atozfesyenbaru",
    instagram: "https://www.instagram.com/atozfesyen.my",
    tiktok: "https://www.tiktok.com/@alwanexclusive",
  },
} as const;

export type Site = typeof site;
