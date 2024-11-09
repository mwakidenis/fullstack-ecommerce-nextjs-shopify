import { NextResponse } from "next/server";

/**
 * Shopify API credentials from environment variables
 * Required for authenticating with Shopify's Admin API
 *
 * SHOPIFY_ACCESS_TOKEN: Private app access token with draft order permissions
 * SHOPIFY_STORE_DOMAIN: Your store's myshopify.com domain (e.g., store-name.myshopify.com)
 */
const shopifyAccessToken = process.env.SHOPIFY_ACCESS_TOKEN!;
const shopifyDomain = process.env.SHOPIFY_STORE_DOMAIN!;

/**
 * POST - Completes a draft order in Shopify
 *
 * @param {Request} req - Request containing the draftOrderId
 * @returns {NextResponse} - Returns the completed draft order data or error message
 *
 * This endpoint:
 * 1. Takes a draft order ID
 * 2. Calls Shopify's Admin API to complete the draft order
 * 3. Returns the API response or handles any errors
 *
 * Note: Requires proper Shopify API credentials in environment variables
 * Uses Shopify Admin API version 2023-07
 */
export async function POST(req: Request) {
  try {
    // Extract draft order ID from request body
    const { draftOrderId } = await req.json();

    // Call Shopify's Admin API to complete the draft order
    const response = await fetch(
      `https://${shopifyDomain}/admin/api/2023-07/draft_orders/${draftOrderId}/complete.json`,
      {
        method: "PUT",
        headers: {
          "X-Shopify-Access-Token": shopifyAccessToken
        }
      }
    );

    // Parse the API response
    const data = await response.json();

    // Handle any errors returned by Shopify's API
    if (data.errors) {
      return NextResponse.json({ error: data.errors }, { status: 400 });
    }

    // Return successful response with completed draft order data
    return NextResponse.json(data);
  } catch (error) {
    // Handle any unexpected errors (network issues, parsing errors, etc.)
    return NextResponse.json(
      { error: "Failed to complete draft order in Shopify." },
      { status: 500 }
    );
  }
}
