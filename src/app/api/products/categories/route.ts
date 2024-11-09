import { NextRequest, NextResponse } from "next/server";

/**
 * Import the Shopify categories fetching service
 * This service handles retrieving product categories/collections from Shopify
 */
import { fetchCategories } from "@/services/shopify-client";

/**
 * GET - Retrieves all product categories from Shopify
 *
 * @param {NextRequest} req - The incoming request object
 * @returns {NextResponse} - Returns the categories data or error message
 *
 * This endpoint:
 * 1. Fetches all available product categories from Shopify
 * 2. Returns them in a standardized format
 * 3. Handles any errors that occur during the fetch process
 *
 * Response format:
 * {
 *   success: boolean,
 *   categories: Category[] // Array of category objects from Shopify
 * }
 *
 * Error format:
 * {
 *   error: string
 * }
 */
export async function GET(req: NextRequest) {
  try {
    // Fetch categories from Shopify using the client service
    const categories = await fetchCategories();

    // Return successful response with categories data
    return NextResponse.json({ success: true, categories });
  } catch (error) {
    // Handle any errors during the fetch process
    // Returns a generic error message to avoid exposing internal details
    return NextResponse.json(
      { error: "Error fetching categories" },
      { status: 500 }
    );
  }
}
