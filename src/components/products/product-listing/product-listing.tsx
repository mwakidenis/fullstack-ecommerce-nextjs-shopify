"use client";

import { ProductProps } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { ProductGrid } from "./product-grid";
import { ProductSearch } from "./product-search";
import { Pagination } from "./pagination";
import { Suspense, useEffect } from "react";
import { PRODUCTS_PER_PAGE } from "@/constants";
import { useProducts } from "@/hooks/product";
import { useSearchParams } from "next/navigation";

// Props interface for the product listing component
interface ProductListingComponentProps {
  initialProducts: ProductProps[]; // Initial product data for SSR
  totalPages: number; // Initial total pages count
  currentPage: number; // Current active page number
  totalProducts: number; // Total number of products available
}

export function ProductListingComponent({
  initialProducts,
  totalPages,
  currentPage,
  totalProducts
}: ProductListingComponentProps) {
  // Get URL search parameters for filtering and pagination
  const searchParams = useSearchParams();

  // Initialize products hook with SSR data
  const [{ products, isLoading, error, total }, fetchProducts] = useProducts({
    products: initialProducts,
    total: totalProducts,
    currentPage
  });

  /**
   * Fetch products when URL parameters change
   * Handles all filter parameters including search, category, price range,
   * availability, sorting, and pagination
   */
  useEffect(() => {
    // Collect all filter parameters from URL
    const params = {
      search: searchParams.get("search") || undefined,
      category: searchParams.get("category") || undefined,
      minPrice: Number(searchParams.get("minPrice")) || undefined,
      maxPrice: Number(searchParams.get("maxPrice")) || undefined,
      availability: searchParams.get("availability") || undefined,
      sort: searchParams.get("sort") || undefined,
      page: Number(searchParams.get("page")) || 1
    };

    fetchProducts(params);
  }, [searchParams, fetchProducts]);

  // Calculate total pages based on current total products count
  const calculatedTotalPages = Math.ceil(total / PRODUCTS_PER_PAGE);

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      {/* Search and filter component */}
      <ProductSearch />

      <Card>
        <CardContent className="p-6">
          {/* Error state handling with reset option */}
          {error && (
            <div className="text-center py-8">
              <p className="text-gray-500">Error loading products: {error}</p>
              {searchParams.toString() && (
                <button
                  onClick={() => (window.location.href = `/products`)}
                  className="mt-4 text-sm text-blue-600 hover:text-blue-700 underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}

          {/* Product grid with loading suspense */}
          <Suspense fallback={<ProductGrid products={[]} isLoading={true} />}>
            <ProductGrid products={products} isLoading={isLoading} />
          </Suspense>

          {/* Pagination - only shown if there are products */}
          {total > 0 && (
            <div className="mt-8 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={calculatedTotalPages}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
