"use client";

import { usePathname } from "next/navigation";
import { defaultLocale, isLocale } from "@/i18n/config";
import { NotFoundView } from "@/views/NotFoundView";

export default function NotFound() {
  const seg = usePathname()?.split("/")[1] ?? "";
  return <NotFoundView lang={isLocale(seg) ? seg : defaultLocale} />;
}
