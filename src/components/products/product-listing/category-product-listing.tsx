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

// Props interface for the category listing component
interface CategoryProductListingComponentProps {
  initialProducts: ProductProps[]; // Initial product data for SSR
  category: string; // Current category identifier
  totalPages: number; // Total number of pages for pagination
  currentPage: number; // Current active page
  totalProducts: number; // Total number of products in category
}

export function CategoryProductListingComponent({
  initialProducts,
  category,
  totalPages,
  currentPage,
  totalProducts
}: CategoryProductListingComponentProps) {
  // Get URL search parameters for filtering and sorting
  const searchParams = useSearchParams();

  // Initialize products hook with SSR data
  const [{ products, isLoading, error, total }, fetchProducts] = useProducts({
    products: initialProducts,
    total: totalProducts,
    currentPage
  });

  // Fetch products when filters, sort, or page changes
  useEffect(() => {
    // Collect all filter parameters from URL
    const params = {
      category,
      search: searchParams.get("search") || undefined,
      minPrice: Number(searchParams.get("minPrice")) || undefined,
      maxPrice: Number(searchParams.get("maxPrice")) || undefined,
      availability: searchParams.get("availability") || undefined,
      sort: searchParams.get("sort") || undefined,
      page: Number(searchParams.get("page")) || 1
    };

    fetchProducts(params);
  }, [searchParams, category, fetchProducts]);

  // Calculate total pages based on products per page constant
  const calculatedTotalPages = Math.ceil(total / PRODUCTS_PER_PAGE);

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      {/* Category header with product count */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold capitalize">{category}</h1>
        <p className="text-muted-foreground">
          {total} {total === 1 ? "product" : "products"}
        </p>
      </div>

      {/* Search and filter component */}
      <ProductSearch categorySlug={category} />

      {/* Main product display card */}
      <Card>
        <CardContent className="p-6">
          {/* Error state handling */}
          {error ? (
            <div className="text-red-500 mb-4">
              Error loading products: {error}
            </div>
          ) : products.length === 0 ? (
            // Empty state with option to clear filters
            <div className="text-center py-8">
              <p className="text-gray-500">
                No products found in this category.
              </p>
              {searchParams.toString() && (
                <button
                  onClick={() => (window.location.href = `/${category}`)}
                  className="mt-4 text-sm text-blue-600 hover:text-blue-700 underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
          ) : (
            // Product grid with loading suspense
            <Suspense fallback={<ProductGrid products={[]} isLoading={true} />}>
              <ProductGrid products={products} isLoading={isLoading} />
            </Suspense>
          )}

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
