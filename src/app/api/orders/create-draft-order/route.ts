import { NextResponse } from "next/server";

/**
 * Shopify API credentials from environment variables
 * Required for authenticating with Shopify's Admin API
 *
 * SHOPIFY_ACCESS_TOKEN: Private app access token with draft order permissions
 * SHOPIFY_STORE_DOMAIN: Your store's myshopify.com domain (e.g., store-name.myshopify.com)
 *
 * Make sure these environment variables are properly set before deployment
 */
const shopifyAccessToken = process.env.SHOPIFY_ACCESS_TOKEN!;
const shopifyDomain = process.env.SHOPIFY_STORE_DOMAIN!;

/**
 * POST - Creates a new draft order in Shopify from cart items
 *
 * @param {Request} req - Request containing the cartItems array
 * @returns {NextResponse} - Returns the created draft order data or error message
 *
 * Expected cartItems format:
 * [
 *   {
 *     title: string,    // Product title
 *     quantity: number, // Quantity ordered
 *     price: string     // Item price
 *   },
 *   ...
 * ]
 *
 * This endpoint:
 * 1. Receives cart items from the request
 * 2. Transforms them into Shopify's draft order format
 * 3. Creates a draft order via Shopify's Admin API
 * 4. Returns the created draft order or handles any errors
 *
 * Note: Uses Shopify Admin API version 2023-07
 */
export async function POST(req: Request) {
  try {
    // Extract cart items from request body
    const { cartItems } = await req.json();

    // Make API request to create draft order in Shopify
    const response = await fetch(
      `https://${shopifyDomain}/admin/api/2023-07/draft_orders.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": shopifyAccessToken
        },
        // Transform cart items into Shopify's expected format
        body: JSON.stringify({
          draft_order: {
            // Map cart items to Shopify line items format
            line_items: cartItems.map((item: any) => ({
              title: item.title,
              quantity: item.quantity,
              price: item.price
            })),
            currency: "CAD", // Set default currency
            use_customer_default_address: true // Use customer's default address if available
          }
        })
      }
    );

    // Parse the API response
    const data = await response.json();

    // Handle any errors returned by Shopify's API
    if (data.errors) {
      return NextResponse.json({ error: data.errors }, { status: 400 });
    }

    // Return the created draft order data
    return NextResponse.json(data.draft_order);
  } catch (error) {
    // Handle any unexpected errors (network issues, parsing errors, etc.)
    return NextResponse.json(
      { error: "Failed to create draft order in Shopify." },
      { status: 500 }
    );
  }
}
