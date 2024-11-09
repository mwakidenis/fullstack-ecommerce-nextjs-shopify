import { NextResponse } from "next/server";

/**
 * Import the Shopify category products fetching service
 * This service handles retrieving products for a specific category from Shopify
 * Typically used for displaying products on the home page grouped by category
 */
import { fetchHomeProductsbyCategory } from "@/services/shopify-client";

/**
 * GET - Retrieves products for a specific category from Shopify
 *
 * @param {Request} request - The incoming request object
 * @returns {NextResponse} - Returns the products data or error message
 *
 * URL Parameters:
 * - category (required): The category slug to fetch products for
 * - limit (optional): Maximum number of products to return (default: 10)
 *
 * Example URLs:
 * /api/products?category=mens-clothing&limit=5
 * /api/products?category=accessories
 *
 * Response format:
 * {
 *   success: boolean,
 *   products: Product[] // Array of product objects from Shopify
 * }
 *
 * Error format:
 * {
 *   error: string
 * }
 */
export async function GET(request: Request) {
  // Extract and parse URL parameters
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const limit = Number(searchParams.get("limit")) || 10; // Default to 10 if not specified

  // Validate required category parameter
  if (!category) {
    return NextResponse.json(
      { error: "Category slug is required" },
      { status: 400 }
    );
  }

  try {
    // Fetch products for the specified category with limit
    const products = await fetchHomeProductsbyCategory(category, limit);

    // Return successful response with products data
    return NextResponse.json({
      success: true,
      products: products
    });
  } catch (error) {
    // Handle any errors during the fetch process
    // Returns a generic error message to avoid exposing internal details
    return NextResponse.json(
      { error: "Error fetching category products" },
      { status: 500 }
    );
  }
}
