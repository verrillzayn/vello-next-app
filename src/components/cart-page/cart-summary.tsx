"use client";

import { Button } from "@/components/ui/button";
import { FEE } from "@/config";
import { useCart } from "@/lib/hooks/useCart";
import { formatPrice } from "@/lib/utils";

const CartSummary = () => {
  const { items } = useCart();

  const cartTotal = items.reduce(
    (total, { product }) => total + product.price,
    0,
  );
  return (
    <section className="mt-16 rounded-lg bg-muted px-4 py-6 sm:p-6 lg:col-span-5 lg:-mt-7 lg:p-8">
      <h2 className="text-lg font-medium text-foreground/90">Order summary</h2>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Subtotal</p>
          <p className="text-sm font-medium text-foreground/80">
            {formatPrice(cartTotal)}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-muted pt-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <span>Flat Transaction Fee</span>
          </div>
          <div className="text-sm font-medium text-foreground/90">
            {formatPrice(FEE)}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-muted pt-4">
          <div className="text-base font-medium text-foreground/90">
            Order total
          </div>
          <div className="text-base font-medium text-foreground/90">
            {formatPrice(cartTotal + FEE)}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Button className="w-full" size="lg">
          Checkout
        </Button>
      </div>
    </section>
  );
};

export default CartSummary;
