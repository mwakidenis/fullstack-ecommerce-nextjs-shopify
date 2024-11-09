import { ProductProps } from "@/types";
import { getHomeProductsByCategory } from "@/services/fetch-data-within-app";
import ProductCard from "./product-card";

// Props interface for the category products component
export interface CategoryProductsProps {
  slug: string; // Category identifier/slug
  limit: number; // Maximum number of products to display
}

/**
 * Server component that displays a grid of products from a specific category
 * Used on the home page to showcase category-specific products
 */
export default async function HomeProductsByCategory({
  slug,
  limit
}: CategoryProductsProps) {
  // Initialize empty products array to handle potential fetch failures
  let productsData: ProductProps[] = [];

  // Attempt to fetch products for the specified category
  try {
    productsData = await getHomeProductsByCategory(`${slug}`, (limit = 5));
    console.log("Products: ", productsData); // Debug log for development
  } catch (error) {
    console.error("Error fetching products:", error);
    // Component will render empty state if fetch fails
  }

  return (
    <div className="bg-white">
      {/* Content container with responsive padding */}
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {/* Section header */}
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          {/* TODO: retrieve dynamic category title in future updates */}
          Category Products
        </h2>

        {/* Responsive product grid:
            - 1 column on mobile
            - 2 columns on tablet (sm)
            - 5 columns on desktop (lg)
            With consistent spacing and gaps */}
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
          {/* Conditional rendering with type safety checks */}
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
        </div>
      </div>
    </div>
  );
}
