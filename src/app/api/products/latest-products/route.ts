import { NextResponse } from "next/server";

/**
 * Import the Shopify latest products fetching service
 * This service retrieves the most recently added/updated products from Shopify
 * Typically used for "New Arrivals" or "Latest Products" sections
 */
import { fetchLatestProducts } from "@/services/shopify-client";

/**
 * GET - Retrieves the most recent products from Shopify
 *
 * @param {Request} request - The incoming request object
 * @returns {NextResponse} - Returns the latest products data or error message
 *
 * URL Parameters:
 * - limit (optional): Maximum number of products to return (default: 10)
 *
 * Example URLs:
 * /api/latest-products         // Returns 5 products (default)
 * /api/latest-products?limit=3 // Returns 3 products
 *
 * Response format:
 * Array of product objects from Shopify containing:
 * {
 *   id: string,
 *   title: string,
 *   price: string,
 *   // ... other product properties
 * }[]
 *
 * Error format:
 * {
 *   error: string
 * }
 */
export async function GET(request: Request) {
  // Extract and parse the limit parameter from URL
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit")) || 10; // Default to 10 if not specified

  try {
    // Fetch the latest products with the specified limit
    const products = await fetchLatestProducts(limit);

    // Return the products array directly
    return NextResponse.json(products);
  } catch (error) {
    // Handle any errors during the fetch process
    // Returns a generic error message to avoid exposing internal details
    return NextResponse.json(
      { error: "Error fetching latest products" },
      { status: 500 }
    );
  }
}
