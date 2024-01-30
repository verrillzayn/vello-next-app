import MaxWidthWrapper from "@/components/max-width-wrapper";
import ProductReel from "@/components/product-reels";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";
import Link from "next/link";

const perks = [
  {
    name: "Instant Delivery",
    Icon: ArrowDownToLine,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex aspernatur voluptate magni placeat nobis!.",
  },
  {
    name: "Guaranteed Quality",
    Icon: CheckCircle,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, suscipit delectus amet accusamus ipsam reprehenderit!.",
  },
  {
    name: "For the Planet",
    Icon: Leaf,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta ratione animi quasi amet quam totam.",
  },
];

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="mx-auto flex min-h-[80vh] max-w-3xl flex-col items-center justify-center py-20 text-center">
          {/* TODO: ganti headlinenya dan Font */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Your Marketplace for high-quality {""}
            <span className="text-rose-600">digital assets</span>.
          </h1>
          <p className="mt-4 max-w-[40ch] text-base text-muted-foreground sm:mt-6 sm:max-w-prose">
            Welcome to Vello. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Aspernatur magni, sit eaque nihil eveniet libero.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Button asChild>
              <Link href="/products">Browse Trending</Link>
            </Button>
            <Button variant="link" className="text-foreground">
              Our quality promise &rarr;
            </Button>
          </div>
        </div>
        <ProductReel
          query={{ sort: "desc", limit: 4 }}
          title="Brand new"
          href="/products"
        />
      </MaxWidthWrapper>

      {/* TOO: List Product */}

      <section className="border-t border-muted-foreground/20 bg-secondary">
        <MaxWidthWrapper className="py-20">
          <div className="sm:grid- cols-2 grid grid-cols-1  gap-y-12 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((e) => (
              <div
                key={e.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="flex justify-center md:flex-shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground text-rose-900">
                    {<e.Icon className="h-1/3 w-1/3" />}
                  </div>
                </div>

                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-foreground">
                    {e.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {e.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
