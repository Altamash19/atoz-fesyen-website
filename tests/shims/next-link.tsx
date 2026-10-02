import type { AnchorHTMLAttributes, ReactNode } from "react";
// Test-only stand-in for next/link: a plain anchor.
export default function Link({ href, children, prefetch: _p, replace: _r, scroll: _s, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children?: ReactNode; prefetch?: boolean; replace?: boolean; scroll?: boolean }) {
  return <a href={href} {...rest}>{children}</a>;
}
