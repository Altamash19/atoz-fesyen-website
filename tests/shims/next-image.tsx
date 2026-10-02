// Test-only stand-in for next/image.
export default function Image({ src, alt, fill, priority, sizes, className, width, height }: { src: string; alt: string; fill?: boolean; priority?: boolean; sizes?: string; className?: string; width?: number; height?: number }) {
  const style = fill ? { position: "absolute" as const, inset: 0, width: "100%", height: "100%" } : undefined;
  return <img src={src} alt={alt} sizes={sizes} className={className} width={width} height={height} style={style} loading={priority ? "eager" : "lazy"} decoding="async" />;
}
