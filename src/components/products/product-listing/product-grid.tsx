"use client";

import { ProductProps } from "@/types";
import ProductCard from "../product-card";
import { Card } from "@/components/ui/card";

interface ProductGridProps {
  products: ProductProps[]; // Array of products to display
  isLoading?: boolean; // Loading state flag for skeleton display
}

export function ProductGrid({ products, isLoading }: ProductGridProps) {
  // Display skeleton loading state
  // Shows placeholder cards with pulse animation while data is being fetched
  if (isLoading) {
    return (
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="h-[300px] animate-pulse" />
        ))}
      </div>
    );
  }

  // Display empty state when no products are found
  // This could be due to filtering or search results
  if (!products?.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px]">
        <p className="text-muted-foreground text-lg">No products found</p>
      </div>
    );
  }

  // Render product grid with responsive layout
  // - Single column on mobile
  // - Two columns on tablets (sm breakpoint)
  // - Three columns on desktop (lg breakpoint)
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
