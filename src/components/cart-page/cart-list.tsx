"use client";

import { Button } from "@/components/ui/button";
import { PRODUCT_CATEGORIES } from "@/config";
import { useCart } from "@/lib/hooks/useCart";
import { cn, formatPrice } from "@/lib/utils";
import { Check, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CartList = () => {
  const { items, removeItem } = useCart();

  return (
    <div
      className={cn("lg:col-span-7", {
        "rounded-lg border-2 border-dashed border-foreground/30 p-12":
          items.length === 0,
      })}
    >
      <h2 className="sr-only">Items in your shopping cart</h2>

      {items.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center space-y-1">
          <div
            className="relative mb-4 h-40 w-40 text-muted-foreground"
            aria-hidden
          >
            <Image
              src="/hippo-empty-cart.png"
              fill
              loading="eager"
              alt="empty shopping cart vello"
            />
          </div>
          <h3 className="text-2xl font-semibold">Your cart is empty</h3>
          <p className="text-center text-muted-foreground">
            Whoops! Nothing to show here yet..
          </p>
        </div>
      ) : null}

      <ul
        className={cn({
          "divide-y divide-muted-foreground/30 border-b border-t border-muted-foreground/30":
            items.length > 0,
        })}
      >
        {items.map(({ product }) => {
          const label = PRODUCT_CATEGORIES.find(
            (c) => c.value === product.category,
          )?.label;

          const { image } = product.images[0];

          return (
            <li key={product.id} className="flex py-6 sm:py-10">
              <div className="flex-shrink-0">
                <div className="relative h-24 w-24">
                  {typeof image !== "string" && image.url ? (
                    <Image
                      src={image.url}
                      fill
                      alt="product image"
                      className="h-full w-full rounded-md object-cover object-center sm:h-48 sm:w-48"
                    />
                  ) : null}
                </div>
              </div>

              <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                  <div>
                    <div className="flex justify-between">
                      <h3 className="text-sm">
                        <Link
                          href={`/product/${product.id}`}
                          className="font-medium text-foreground/70 hover:text-foreground/90"
                        >
                          {product.name}
                        </Link>
                      </h3>
                    </div>
                    <div className="mt-1 flex text-sm">
                      <p className="text-muted-foreground">Category: {label}</p>
                    </div>

                    <p className="mt-1 text-sm font-medium text-foreground/90">
                      {formatPrice(product.price)}
                    </p>
                  </div>

                  <div className="mt-4 w-20 sm:mt-0 sm:pr-9">
                    <div className="absolute right-0 top-0">
                      <Button
                        aria-label="remove product"
                        onClick={() => removeItem(product.id)}
                        variant="ghost"
                        size="icon"
                      >
                        <X className="h-5 w-5" aria-hidden />
                      </Button>
                    </div>
                  </div>
                </div>

                <p className="mt-4 flex space-x-2 text-sm text-foreground/65">
                  <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
                  <span>Eligible for instant delivery</span>
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CartList;
