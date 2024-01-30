"use client";

import { Product } from "@/payload-types";
import { TQueryValidator } from "../lib/validators/query-validator";
import { trpc } from "@/trpc/client";
import Link from "next/link";
import ProductListing from "@/components/main-page/product-listing";

interface IProductReelsProps {
  title: string;
  subtitle?: string;
  href?: string;
  query: TQueryValidator;
}

const FALLBACK_LIMIT = 4;

const ProductReel = (props: IProductReelsProps) => {
  const { title, subtitle, href, query } = props;

  const { data: queryResult, isLoading } =
    trpc.getInfiniteProducts.useInfiniteQuery(
      {
        limit: query.limit ?? FALLBACK_LIMIT,
        query,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      },
    );

  const products = queryResult?.pages.flatMap((page) => page.items);

  let map: (Product | null)[] = [];

  if (products && products.length) {
    map = products;
  } else if (isLoading) {
    map = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null);
  }

  return (
    <section className="py-12">
      <div className="mb-4 md:flex md:items-center md:justify-between ">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title ? (
            <h1 className="text-foreground/90sm:text-3xl text-2xl font-bold">
              {title}
            </h1>
          ) : null}
          {subtitle ? (
            <p className="mt-2 text-sm text-muted-foreground">{title}</p>
          ) : null}
        </div>

        {href ? (
          <Link
            href={href}
            className="hidden text-sm font-medium text-primary/90 hover:text-primary/60 md:block"
          >
            Shop the collection{"  "}
            <span aria-hidden>&rarr;</span>
          </Link>
        ) : null}
      </div>

      <div className="relative">
        <div className="mt-6 flex w-full items-center">
          <div className="grid w-full grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
            {map.map((product, index) => (
              <ProductListing product={product} index={index} key={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReel;
