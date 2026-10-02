import type { ImgHTMLAttributes } from "react";
// Test-only stand-in for next/image (unoptimized mode renders a plain <img>, like production export).
type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & { src: string; fill?: boolean; priority?: boolean };
export default function Image({ fill, priority, style, ...rest }: Props) {
  const s = fill ? { position: "absolute" as const, inset: 0, width: "100%", height: "100%", ...style } : style;
  return <img {...rest} style={s} loading={priority ? "eager" : "lazy"} decoding="async" />;
}
