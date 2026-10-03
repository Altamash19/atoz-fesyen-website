"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import { CloseIcon } from "./icons";

export interface ShopPhoto {
  src: string;
  width: number;
  height: number;
  alt: string;
}

/** Masonry photo wall with a keyboard-friendly lightbox (native <dialog>). */
export function ShopGallery({ photos, lang }: { photos: ShopPhoto[]; lang: Locale }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
  };
  const close = useCallback(() => dialog.current?.close(), []);
  const step = useCallback((dir: number) => setIndex((i) => (i === null ? i : (i + dir + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onClose = () => setIndex(null);
    d.addEventListener("keydown", onKey);
    d.addEventListener("close", onClose);
    return () => {
      d.removeEventListener("keydown", onKey);
      d.removeEventListener("close", onClose);
    };
  }, [step]);

  const current = index !== null ? photos[index] : null;
  const L = lang === "ms" ? { view: "Besarkan gambar", prev: "Sebelum", next: "Seterusnya", close: "Tutup" } : { view: "Enlarge photo", prev: "Previous", next: "Next", close: "Close" };

  return (
    <>
      <ul className="columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4 [&>li]:mb-3 sm:[&>li]:mb-4" data-testid="shop-gallery">
        {photos.map((p, i) => (
          <li key={p.src} className="break-inside-avoid">
            <button
              type="button"
              onClick={() => open(i)}
              className="group relative block w-full overflow-hidden rounded-2xl bg-sand"
              aria-label={`${L.view}: ${p.alt}`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="h-auto w-full transition duration-700 group-hover:scale-[1.04]"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent opacity-0 transition group-hover:opacity-100" />
              <span className="pointer-events-none absolute right-3 bottom-3 left-3 translate-y-2 text-left text-sm font-medium text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                {p.alt}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        className="m-auto h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-black/85"
        onClick={(e) => e.target === e.currentTarget && close()}
        aria-label={current?.alt}
      >
        {current && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4" onClick={(e) => e.target === e.currentTarget && close()}>
            <Image
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="100vw"
              className="h-auto max-h-[80dvh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
              data-testid="lightbox-photo"
            />
            <p className="text-center text-sm text-white/85">
              {current.alt} <span className="text-white/50">· {index! + 1} / {photos.length}</span>
            </p>
            <div className="flex gap-3">
              <button type="button" onClick={() => step(-1)} className="btn btn-light !min-h-10 !px-4 !py-2 text-sm">
                ← {L.prev}
              </button>
              <button type="button" onClick={() => step(1)} className="btn btn-light !min-h-10 !px-4 !py-2 text-sm">
                {L.next} →
              </button>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label={L.close}
              className="absolute top-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25"
            >
              <CloseIcon width={22} height={22} />
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
