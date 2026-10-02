// Test-only stand-in for next/navigation.
export class NotFoundError extends Error { digest = "NEXT_NOT_FOUND"; }
export function notFound(): never { throw new NotFoundError("NEXT_NOT_FOUND"); }
export function redirect(url: string): never { throw Object.assign(new Error("NEXT_REDIRECT"), { url }); }
export function usePathname(): string {
  const g = globalThis as { __PATHNAME__?: string; location?: Location };
  return g.__PATHNAME__ ?? g.location?.pathname ?? "/";
}
export function useRouter() { return { push() {}, replace() {}, back() {}, prefetch() {} }; }
