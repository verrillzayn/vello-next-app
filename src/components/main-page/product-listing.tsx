"use client";

import ImageSlider from "@/components/main-page/image-slider";
import { Skeleton } from "@/components/ui/skeleton";
import { PRODUCT_CATEGORIES } from "@/config";
import { cn, formatPrice } from "@/lib/utils";
import { Product } from "@/payload-types";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IProductListingProps {
  product: Product | null;
  index: number;
}

const ProductListing = ({ product, index }: IProductListingProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  if (!product || !isVisible) return <ProductPlaceholder />;

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category,
  )?.label;

  const validUrls = product.images
    .map(({ image }) => (typeof image === "string" ? image : image.url))
    .filter(Boolean) as string[];

  if (isVisible && product) {
    return (
      <Link
        href={`/product/${product.id}`}
        className={cn("group/main invisible h-full w-full cursor-pointer", {
          "visible animate-in fade-in-5": isVisible,
        })}
      >
        <div className="flex w-full flex-col">
          <ImageSlider urls={validUrls} />
          <h3 className="mt-4 text-sm font-medium text-foreground/70">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground/90">{label}</p>
          <p className="mt-1 text-sm font-medium text-foreground/90">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    );
  }
};

const ProductPlaceholder = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-secondary">
        <Skeleton className="h-full w-full" />
      </div>
      <Skeleton className="mt-4 h-4 w-2/3 rounded-lg" />
      <Skeleton className="mt-2 h-4 w-16 rounded-lg" />
      <Skeleton className="mt-2 h-4 w-12 rounded-lg" />
    </div>
  );
};

export default ProductListing;
