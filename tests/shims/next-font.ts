// Test-only stand-in for next/font/google. Real fonts are self-hosted by Next at build time.
const make = (cls: string) => () => ({ className: cls, variable: cls, style: { fontFamily: "" } });
export const Inter = make("font-var-body");
export const Playfair_Display = make("font-var-heading");
