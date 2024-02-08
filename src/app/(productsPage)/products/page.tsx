import MaxWidthWrapper from "@/components/max-width-wrapper";
import ProductReel from "@/components/product-reels";
import { PRODUCT_CATEGORIES } from "@/config";

type TParam = string | string[] | undefined;

interface IProductsPage {
  searchParams: { [key: string]: TParam };
}

const parse = (param: TParam) => {
  return typeof param === "string" ? param : undefined;
};

const ProductsPage = ({ searchParams }: IProductsPage) => {
  const sort = parse(searchParams.sort);
  const category = parse(searchParams.category);

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === category,
  )?.label;

  return (
    <MaxWidthWrapper>
      <ProductReel
        title={label ?? "Browse high-quality assets"}
        query={{
          category,
          limit: 40,
          sort: sort === "desc" || sort === "asc" ? sort : undefined,
        }}
      />
    </MaxWidthWrapper>
  );
};

export default ProductsPage;
