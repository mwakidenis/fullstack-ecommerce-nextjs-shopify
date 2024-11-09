import { NextRequest, NextResponse } from "next/server";
import {
  fetchProduct,
  fetchProducts,
  fetchProductsByCategory
} from "@/services/shopify-client";
import { PRODUCTS_PER_PAGE } from "@/constants";
import { ProductProps } from "@/types";

/**
 * Helper function to get product price
 * Extracts the price from the first variant if available
 *
 * @param {ProductProps} product - The product object
 * @returns {number} - The product price or 0 if not available
 */
function getProductPrice(product: ProductProps): number {
  // Get price from first variant if available
  if (product.variants && product.variants.length > 0) {
    const price = parseFloat(product.variants[0].price);
    return isNaN(price) ? 0 : price;
  }

  return 0;
}

/**
 * Helper function to check product availability status
 *
 * @param {ProductProps} product - The product object
 * @param {string} status - Desired availability status ('in-stock', 'out-of-stock', 'pre-order')
 * @returns {boolean} - Whether the product matches the desired availability status
 */
function checkAvailability(product: ProductProps, status: string): boolean {
  if (!product.variants || product.variants.length === 0) return false;

  switch (status) {
    case "in-stock":
      return product.variants.some(
        (variant) => variant.availableForSale && variant.inventoryQuantity > 0
      );
    case "out-of-stock":
      return product.variants.every(
        (variant) => !variant.availableForSale || variant.inventoryQuantity <= 0
      );
    case "pre-order":
      return product.variants.some(
        (variant) => variant.availableForSale && variant.inventoryQuantity <= 0
      );
    default:
      return true;
  }
}

/**
 * GET - Advanced product fetching endpoint with filtering, sorting, and pagination
 *
 * @param {NextRequest} request - The incoming request object
 * @returns {NextResponse} - Returns filtered, sorted, and paginated products
 *
 * URL Parameters:
 * - handle: Fetch a single product by handle
 * - category: Filter products by category
 * - search: Search in title, description, and vendor
 * - minPrice: Minimum price filter
 * - maxPrice: Maximum price filter
 * - availability: Filter by stock status ('in-stock', 'out-of-stock', 'pre-order')
 * - sort: Sort products ('price-asc', 'price-desc', 'name-asc', 'name-desc')
 * - page: Page number for pagination (default: 1)
 *
 * Example URLs:
 * /api/products?handle=my-product
 * /api/products?category=shoes&minPrice=50&maxPrice=200&sort=price-asc&page=2
 * /api/products?search=nike&availability=in-stock
 *
 * Response format:
 * {
 *   success: boolean,
 *   products?: Product[],
 *   product?: Product,
 *   total?: number,
 *   page?: number,
 *   error?: string
 * }
 */
export async function GET(request: NextRequest) {
  // Extract all query parameters
  const { searchParams } = new URL(request.url);
  const handle = searchParams.get("handle");
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || Infinity;
  const availability = searchParams.get("availability");
  const sort = searchParams.get("sort");
  const page = Number(searchParams.get("page")) || 1;

  try {
    let products: ProductProps[];
    let categoryExists = true;

    // Handle single product fetch by handle
    if (handle) {
      const product = await fetchProduct(handle);
      if (!product) {
        return NextResponse.json(
          { success: false, error: "Product not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, product });
    }
    // Handle category-based product fetch
    else if (category) {
      const result = await fetchProductsByCategory(category);
      if (!result.exists) {
        return NextResponse.json(
          { success: false, error: "Category not found" },
          { status: 404 }
        );
      }
      products = result.products;
    }
    // Fetch all products if no handle or category specified
    else {
      products = await fetchProducts();
    }

    // Initialize empty array if no products found
    if (!products) {
      products = [];
    }

    // Apply filters
    let filteredProducts = [...products];

    // Apply search filter across title, description, and vendor
    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.vendor.toLowerCase().includes(searchLower)
      );
    }

    // Apply price range filter
    if (minPrice > 0 || maxPrice < Infinity) {
      filteredProducts = filteredProducts.filter((product) => {
        const price = getProductPrice(product);
        return price >= minPrice && price <= maxPrice;
      });
    }

    // Apply availability filter
    if (availability && availability !== "any") {
      filteredProducts = filteredProducts.filter((product) =>
        checkAvailability(product, availability)
      );
    }

    // Apply sorting
    if (sort) {
      filteredProducts = [...filteredProducts].sort((a, b) => {
        switch (sort) {
          case "price-asc":
            return getProductPrice(a) - getProductPrice(b);
          case "price-desc":
            return getProductPrice(b) - getProductPrice(a);
          case "name-asc":
            return a.title.localeCompare(b.title);
          case "name-desc":
            return b.title.localeCompare(a.title);
          default:
            return 0;
        }
      });
    }

    // Apply pagination
    const start = (page - 1) * PRODUCTS_PER_PAGE;
    const paginatedProducts = filteredProducts.slice(
      start,
      start + PRODUCTS_PER_PAGE
    );

    // Return paginated results with metadata
    return NextResponse.json({
      success: true,
      products: paginatedProducts,
      total: filteredProducts.length,
      page: page
    });
  } catch (error) {
    // Log and handle any errors during processing
    console.error("Error in API route:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
