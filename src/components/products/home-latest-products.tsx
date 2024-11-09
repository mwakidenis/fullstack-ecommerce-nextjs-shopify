import ProductCard from "./product-card";
import Loader from "../layouts/loader";
import { ProductProps } from "@/types";
import {
  getLatestProducts,
  getProducts
} from "@/services/fetch-data-within-app";
import { Suspense } from "react";

/**
 * Server-side rendered component that displays the latest products on the home page
 * Uses Suspense for loading state management and provides fallback UI
 */
export default async function HomeLatestProducts() {
  // Initialize empty products array to handle potential fetch failures gracefully
  let productsData: ProductProps[] = [];

  // Attempt to fetch the latest 10 products
  try {
    productsData = await getLatestProducts(10);
  } catch (error) {
    console.error("Error fetching products:", error);
    // Component will render empty state UI if fetch fails
  }

  // Loading state flag (currently unused but maintained for future implementations)
  const loading: boolean | null = false;

  return (
    // Dark themed section for latest products
    <div className="bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <h2 className="text-3xl font-bold text-white mb-8">
          Introducing Our Latest Product
        </h2>

        {/* Responsive product grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Suspense boundary for loading state */}
          <Suspense fallback={<Loader />}>
            {/* Conditional rendering with type checking and empty state handling */}
            {productsData &&
            Array.isArray(productsData) &&
            productsData.length > 0 ? (
              // Map through products and render product cards
              productsData.map((data) => (
                <ProductCard key={data.id} product={data} />
              ))
            ) : (
              // Empty state message
              <p className="text-white">No products available now.</p>
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
