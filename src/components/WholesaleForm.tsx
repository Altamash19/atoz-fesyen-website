"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

type Fields = "name" | "business" | "location" | "products" | "quantity" | "notes";
const required: Fields[] = ["name", "products"];

/**
 * No backend: the form composes a WhatsApp message and opens it.
 * This keeps the site free to host and puts every lead straight into the sales chat.
 */
export function WholesaleForm({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const f = t.wholesale.fields;
  const [errors, setErrors] = useState<Partial<Record<Fields, boolean>>>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: Fields) => String(data.get(k) ?? "").trim();

    const missing = Object.fromEntries(required.filter((k) => !get(k)).map((k) => [k, true]));
    setErrors(missing);
    if (Object.keys(missing).length) {
      const first = e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(missing)[0]}"]`);
      first?.focus();
      return;
    }

    const order: Fields[] = ["name", "business", "location", "products", "quantity", "notes"];
    const details = order.filter((k) => get(k)).map((k) => `${f[k]}: ${get(k)}`);
    const message = [t.wholesale.messageHeader, "", ...details].join("\n");

    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  }

  const label = (k: Fields, text: string) => (
    <label htmlFor={`wf-${k}`} className="mb-1.5 block text-sm font-medium text-ink">
      {text}
      {required.includes(k) && (
        <span className="ml-1 text-gold" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );

  const errorText = (k: Fields) =>
    errors[k] ? (
      <p id={`wf-${k}-error`} className="mt-1 text-sm text-red-700">
        {t.wholesale.required}
      </p>
    ) : null;

  const aria = (k: Fields) => ({
    id: `wf-${k}`,
    name: k,
    "aria-required": required.includes(k) || undefined,
    "aria-invalid": errors[k] || undefined,
    "aria-describedby": errors[k] ? `wf-${k}-error` : undefined,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 sm:grid-cols-2" data-testid="wholesale-form">
      <div>
        {label("name", f.name)}
        <input {...aria("name")} className="field" autoComplete="name" />
        {errorText("name")}
      </div>
      <div>
        {label("business", f.business)}
        <input {...aria("business")} className="field" autoComplete="organization" />
      </div>
      <div className="sm:col-span-2">
        {label("location", f.location)}
        <input {...aria("location")} className="field" autoComplete="address-level2" />
      </div>
      <div className="sm:col-span-2">
        {label("products", f.products)}
        <textarea {...aria("products")} rows={3} className="field resize-y" placeholder={f.productsPlaceholder} />
        {errorText("products")}
      </div>
      <div>
        {label("quantity", f.quantity)}
        <input {...aria("quantity")} className="field" placeholder={f.quantityPlaceholder} />
      </div>
      <div>
        {label("notes", f.notes)}
        <input {...aria("notes")} className="field" />
      </div>
      <div className="sm:col-span-2">
        <button type="submit" className="btn btn-whatsapp w-full sm:w-auto">
          <WhatsAppIcon /> {t.wholesale.submit}
        </button>
        <p className="mt-3 text-xs text-muted">{t.wholesale.formNote}</p>
      </div>
    </form>
  );
}
