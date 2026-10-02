/**
 * Business details used across the whole site.
 *
 * ⚠️ BEFORE LAUNCH: replace every value marked TODO with the real details.
 * `scripts/check-data.mjs` fails while any TODO placeholder remains.
 */
export const site = {
  name: "A TO Z Fesyen Baru",
  legalName: "A TO Z Fesyen Baru Sdn. Bhd.",
  // TODO: company registration number (SSM), e.g. "200501012345 (689123-X)"
  registrationNo: "TODO-SSM-NUMBER",
  foundedYear: 2005,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://atozfesyen.com",

  // WhatsApp number in international format, digits only (no +, spaces or dashes).
  // TODO: replace with the real business WhatsApp number, e.g. "60123456789"
  whatsapp: "60000000000",
  // Shown to visitors. TODO: e.g. "+60 12-345 6789"
  phoneDisplay: "+60 TODO",
  // TODO: business email
  email: "TODO@atozfesyen.com",

  address: {
    // TODO: full street address
    street: "TODO street address",
    city: "TODO city",
    state: "TODO state",
    postcode: "00000",
    country: "Malaysia",
  },
  // Google Maps link to the shop/warehouse. TODO
  mapsUrl: "https://maps.google.com/?q=A+TO+Z+Fesyen+Baru",

  hours: {
    en: "Mon – Sat, 9:00 am – 6:00 pm",
    ms: "Isnin – Sabtu, 9:00 pagi – 6:00 petang",
  },

  social: {
    facebook: "",
    instagram: "",
    tiktok: "",
  },
} as const;

export type Site = typeof site;
