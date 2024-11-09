import { useCallback, useEffect, useState } from "react";
import { ProductProps } from "@/types";

interface UseProductsResult {
  products: ProductProps[];
  isLoading: boolean;
  error: string | null;
  total: number;
  currentPage: number;
}

interface FetchProductsParams {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  availability?: string;
  sort?: string;
  page?: number;
}

// Custom hook for managing product data fetching and state
// Takes initial data to avoid unnecessary loading states on first render
export function useProducts(initialData: {
  products: ProductProps[];
  total: number;
  currentPage: number;
}): [UseProductsResult, (params: FetchProductsParams) => Promise<void>] {
  const [state, setState] = useState<UseProductsResult>({
    products: initialData.products,
    isLoading: false,
    error: null,
    total: initialData.total,
    currentPage: initialData.currentPage
  });

  // Memoized fetch function to prevent unnecessary re-renders
  // Takes search parameters and updates the products state accordingly
  const fetchProducts = useCallback(async (params: FetchProductsParams) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Build query string from non-empty params
      // Skip default filter values to keep URL clean
      const searchParams = new URLSearchParams();

      if (params.search) searchParams.set("search", params.search);
      if (params.category && params.category !== "all")
        searchParams.set("category", params.category);
      if (params.minPrice)
        searchParams.set("minPrice", params.minPrice.toString());
      if (params.maxPrice)
        searchParams.set("maxPrice", params.maxPrice.toString());
      if (params.availability && params.availability !== "any")
        searchParams.set("availability", params.availability);
      if (params.sort && params.sort !== "featured")
        searchParams.set("sort", params.sort);
      if (params.page) searchParams.set("page", params.page.toString());

      const queryString = searchParams.toString();
      const url = `/api/products${queryString ? `?${queryString}` : ""}`;

      const response = await fetch(url);
      const data = await response.json();

      // Handle non-200 responses with custom error messages
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch products");
      }

      // Update all state fields with fresh data
      setState({
        products: data.products,
        isLoading: false,
        error: null,
        total: data.total,
        currentPage: data.page
      });
    } catch (error) {
      // Reset products array on error to avoid showing stale data
      // Keep error message user-friendly while preserving type safety
      setState((prev) => ({
        ...prev,
        products: [],
        isLoading: false,
        total: 0,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while fetching products"
      }));
    }
  }, []);

  return [state, fetchProducts];
}
