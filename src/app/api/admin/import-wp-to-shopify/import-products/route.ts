import { NextRequest, NextResponse } from "next/server";
// Legacy import path kept for reference
// import integrateWooCommerceToShopify from "@/services/woocommerce";

/**
 * Import the WooCommerce to Shopify integration service
 * This service handles the migration of product data from WooCommerce to Shopify
 */
import integrateWooCommerceToShopify from "@/services/woocommerce/wp-products";

/**
 * GET - Triggers the WooCommerce to Shopify integration process
 *
 * @param {NextRequest} req - The incoming request object
 * @returns {NextResponse} - Returns the integration results or error message
 *
 * This endpoint:
 * 1. Initiates the data migration process from WooCommerce to Shopify
 * 2. Handles any integration errors that might occur
 * 3. Returns the results of the integration process
 *
 * Note: This is an asynchronous operation that might take some time
 * depending on the amount of data being migrated
 */
export async function GET(req: NextRequest) {
  // Manual trigger query parameter
  const { searchParams } = new URL(req.url);
  const shouldImport = searchParams.get("import");

  // Only run import if explicitly triggered
  if (shouldImport !== "true") {
    return NextResponse.json(
      {
        message: "Import not triggered. Add ?import=true to URL to run import."
      },
      { status: 200 }
    );
  }

  try {
    // Execute the integration process
    const results = await integrateWooCommerceToShopify();

    // Return successful integration results
    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    // Log the full error details for debugging
    console.error("Integration error:", error);

    // Return a generic error message to the client
    // Avoiding exposure of sensitive error details
    return NextResponse.json({ error: "Integration failed" }, { status: 500 });
  }
}
