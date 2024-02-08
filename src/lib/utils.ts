import { type ClassValue, clsx } from "clsx";
import { Metadata } from "next";
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

export function constructMetadata({
  title = "Vello - the marketplace for digital assets",
  description = "Vello is an open-source marketplace for high-quality digital goods.",
  image = "/thumbnail.png",
  icons = "https://vello-production.up.railway.app//favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@vezynx",
    },
    icons,
    metadataBase: new URL("https://vello-production.up.railway.app"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
