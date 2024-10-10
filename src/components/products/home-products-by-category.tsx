import { ProductProps } from "@/types";
import ProductCardLight from "./product-card-light";
import { getHomeProductsByCategory } from "@/services/fetch-data-within-app";

export interface CategoryProductsProps {
  slug: string;
  limit: number;
}
export default async function HomeProductsByCategory({
  slug,
  limit
}: CategoryProductsProps) {
  let productsData: ProductProps[] = [];
  try {
    productsData = await getHomeProductsByCategory(`${slug}`, (limit = 5));
    console.log("Products: ", productsData);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Category Products
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
          {/* {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))} */}
          {/* <ProductCardLight />
          <ProductCardLight />
          <ProductCardLight />
          <ProductCardLight />
          <ProductCardLight /> */}
          {productsData &&
          Array.isArray(productsData) &&
          productsData.length > 0 ? (
            productsData.map((data) => (
              <ProductCardLight key={data.id} product={data} />
            ))
          ) : (
            <p className="text-white">No products available now.</p>
          )}
        </div>
      </div>
    </div>
  );
}
