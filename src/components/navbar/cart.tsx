"use client";

import CartItem from "@/components/navbar/cart-item";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FEE } from "@/config";
import { useCart } from "@/lib/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Cart = () => {
  const { items } = useCart();
  const itemCount = items.length;

  const cartTotal = items.reduce(
    (total, { product }) => total + product.price,
    0,
  );

  return (
    <Sheet>
      <SheetTrigger className="group -m-2 flex items-center p-2">
        <ShoppingCart className="h-6 w-6 flex-shrink-0 text-muted-foreground/80   group-hover:text-muted-foreground" />
        <span className="ml-2 text-sm font-medium text-foreground/50 group-hover:text-foreground/80">
          {itemCount}
        </span>
      </SheetTrigger>

      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-md">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Cart ({itemCount})</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <div className="flex w-full flex-col pr-6">
              <ScrollArea>
                {items.map(({ product }) => (
                  <CartItem product={product} key={product.id} />
                ))}
                cart items
              </ScrollArea>
            </div>
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Transaction Fee</span>
                  <span>{formatPrice(FEE)}</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Total </span>
                  {/* client */}
                  <span>{formatPrice(cartTotal + FEE)}</span>
                </div>
              </div>

              <SheetFooter>
                <SheetTrigger asChild>
                  <Button asChild className="w-full">
                    <Link className="w-full" href="/cart">
                      Continue to Checkout
                    </Link>
                  </Button>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div
              aria-hidden
              className="relative mb-4 h-60 w-60 text-muted-foreground"
            >
              <Image src="/vello-cart.png" alt="empty shopping cart" fill />
            </div>
            <div className="text-xl font-semibold">Your cart is empty...</div>
            <SheetTrigger asChild>
              <Button
                variant="link"
                size="default"
                // className="text-sm text-muted-foreground"
                asChild
              >
                <Link href="/products">Add items to your cart to checkout</Link>
              </Button>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
