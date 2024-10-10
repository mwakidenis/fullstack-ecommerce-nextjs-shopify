import ProductCard from "./product-card";
import Loader from "../layouts/loader";
import { ProductProps } from "@/types";
import {
  getLatestProducts,
  getProducts
} from "@/services/fetch-data-within-app";
import { Suspense } from "react";

export default async function HomeLatestProducts() {
  let productsData: ProductProps[] = [];
  try {
    productsData = await getLatestProducts(6);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
  const loading: boolean | null = false;

  // const filteredProducts = productsData?.products || [];
  // const products = productsData?.slice(0, 6);

  // console.log(productsData);
  // console.log(products.length);

  return (
    <div className="bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8">
          Introducing Our Latest Product
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Suspense fallback={<Loader />}>
            {productsData &&
            Array.isArray(productsData) &&
            productsData.length > 0 ? (
              productsData.map((data) => (
                <ProductCard key={data.id} product={data} />
              ))
            ) : (
              <p className="text-white">No products available now.</p>
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
