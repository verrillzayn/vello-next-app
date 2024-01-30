"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/hooks/useCart";
import { Product } from "@/payload-types";
import { useEffect, useState } from "react";

const AddToCartButton = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const [isSucces, setIsSucces] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSucces(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isSucces]);

  return (
    <Button
      onClick={() => {
        addItem(product);
        setIsSucces(true);
      }}
      size="lg"
      className="w-full"
    >
      {isSucces ? "Added!" : "add to cart"}
    </Button>
  );
};

export default AddToCartButton;
