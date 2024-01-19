import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number | string,
  options: {
    locale?: "en-US" | "fr-FR" | "en-GB" | "bn-BD" | "id-ID";
    currency?: "USD" | "EUR" | "GBP" | "BDT" | "IDR";
    notation?: Intl.NumberFormatOptions["notation"];
  } = {},
) {
  const { currency = "IDR", notation = "standard", locale = "id-ID" } = options;
  // const { currency = "USD", notation = "standard", locale = "en-US" } = options;
  // const { currency = "EUR", notation = "standard", locale = "en-GB" } = options;

  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    notation,
  }).format(numericPrice);
}
