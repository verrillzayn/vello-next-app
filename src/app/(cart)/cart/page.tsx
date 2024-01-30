import CartList from "@/components/cart-page/cart-list";
import CartSummary from "@/components/cart-page/cart-summary";

const CartPage = () => {
  return (
    <div className="bg-background">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Shopping Cart
        </h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <CartList />

          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
