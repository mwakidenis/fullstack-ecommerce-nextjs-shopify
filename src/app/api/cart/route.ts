import { NextResponse } from "next/server";
// import { shopifyClient } from '@/lib/shopify/client';
import { graphqlClient } from "@/lib/shopify/client";
import {
  CREATE_CART,
  ADD_TO_CART,
  UPDATE_CART,
  REMOVE_FROM_CART,
  GET_CART
} from "@/lib/shopify/queries";
import {
  GetCartResponse,
  CreateCartResponse,
  CartLinesAddResponse,
  CartLinesUpdateResponse,
  CartLinesRemoveResponse
} from "@/types";
import { cookies } from "next/headers";

/**
 * Helper function to transform cart line items and handle image structure
 */
function transformCartLineItem(node: any) {
  const productImage = node.merchandise.product.images?.edges[0]?.node;
  const variantImage = node.merchandise.image;

  return {
    id: node.id,
    quantity: node.quantity,
    merchandise: {
      id: node.merchandise.id,
      title: node.merchandise.title,
      price: node.merchandise.price,
      image: {
        url: variantImage?.url || productImage?.url || "",
        altText: variantImage?.altText || productImage?.altText || ""
      },
      product: {
        title: node.merchandise.product.title,
        image: {
          url: productImage?.url || "",
          altText: productImage?.altText || ""
        }
      }
    }
  };
}

/**
 * GET - Retrieves the current cart data
 * Returns transformed cart data including items, costs, and quantities
 * If no cart exists, returns an empty cart structure
 */
export async function GET() {
  try {
    const cookieStore = cookies();
    const cartId = cookieStore.get("cartId")?.value;

    // Return empty cart structure if no cartId exists
    if (!cartId) {
      return NextResponse.json({
        lines: [],
        cost: {
          subtotalAmount: { amount: "0.0", currencyCode: "CAD" },
          totalAmount: { amount: "0.0", currencyCode: "CAD" }
        },
        totalQuantity: 0
      });
    }

    // Fetch current cart data from Shopify using GraphQL
    // const { cart } = await graphqlClient.request(GET_CART, { cartId });
    const { cart } = await graphqlClient.request<GetCartResponse>(GET_CART, {
      cartId
    });

    // Transform the Shopify cart data into a simplified structure
    // This makes it easier to work with in the frontend
    const transformedCart = {
      id: cart.id,
      checkoutUrl: cart.checkoutUrl,
      totalQuantity: cart.totalQuantity,
      cost: cart.cost,
      lines: {
        edges: cart.lines.edges.map(({ node }) => ({
          node: transformCartLineItem(node)
        }))
      }
    };

    return NextResponse.json(transformedCart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json({ error: "Error fetching cart" }, { status: 500 });
  }
}

/**
 * POST - Creates a new cart or adds items to an existing cart
 * @param {Request} req - Request object containing cartId (optional), variantId, and quantity
 * @returns {NextResponse} - Returns the updated cart data
 */
export async function POST(req: Request) {
  try {
    const { cartId, variantId, quantity } = await req.json();

    // If no cartId exists, create a new cart
    if (!cartId) {
      const variables = {
        lines: [
          {
            merchandiseId: variantId,
            quantity
          }
        ]
      };

      // Create new cart using Shopify's GraphQL API
      const { cartCreate } = await graphqlClient.request<CreateCartResponse>(
        CREATE_CART,
        variables
      );

      // Transform the cart before returning
      const transformedCart = {
        ...cartCreate.cart,
        lines: {
          edges: cartCreate.cart.lines.edges.map(({ node }) => ({
            node: transformCartLineItem(node)
          }))
        }
      };

      // Create response with cart data and set cart ID cookie
      const response = NextResponse.json(transformedCart);
      response.cookies.set({
        name: "cartId",
        value: cartCreate.cart.id,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30 // 30 days
      });

      // console.log("Created new cart with ID:", cartCreate.cart.id); // Debug log
      return response;
    }

    // Add items to existing cart
    const variables = {
      cartId,
      lines: [
        {
          merchandiseId: variantId,
          quantity
        }
      ]
    };

    const { cartLinesAdd } = await graphqlClient.request<CartLinesAddResponse>(
      ADD_TO_CART,
      variables
    );
    // Transform the cart before returning
    const transformedCart = {
      ...cartLinesAdd.cart,
      lines: {
        edges: cartLinesAdd.cart.lines.edges.map(({ node }) => ({
          node: transformCartLineItem(node)
        }))
      }
    };
    return NextResponse.json(transformedCart);
  } catch (error) {
    console.error("Cart operation failed:", error);
    return NextResponse.json(
      { error: "Failed to perform cart operation" },
      { status: 500 }
    );
  }
}

/**
 * PUT - Updates the quantity of items in the cart
 * @param {Request} req - Request object containing cartId, lineId, and new quantity
 * @returns {NextResponse} - Returns the updated cart data
 */
export async function PUT(req: Request) {
  try {
    const { cartId, lineId, quantity } = await req.json();

    // Prepare variables for cart update
    const variables = {
      cartId,
      lines: [
        {
          id: lineId,
          quantity
        }
      ]
    };

    // Update cart using Shopify's GraphQL API
    const { cartLinesUpdate } =
      await graphqlClient.request<CartLinesUpdateResponse>(
        UPDATE_CART,
        variables
      );

    // Transform the cart before returning
    const transformedCart = {
      ...cartLinesUpdate.cart,
      lines: {
        edges: cartLinesUpdate.cart.lines.edges.map(({ node }) => ({
          node: transformCartLineItem(node)
        }))
      }
    };

    return NextResponse.json(transformedCart);
  } catch (error) {
    console.error("Failed to update cart:", error);
    return NextResponse.json(
      { error: "Failed to update cart" },
      { status: 500 }
    );
  }
}

/**
 * DELETE - Removes items from the cart
 * @param {Request} req - Request object containing cartId and lineId to remove
 * @returns {NextResponse} - Returns the updated cart data
 */
export async function DELETE(req: Request) {
  try {
    const { cartId, lineId } = await req.json();

    // Prepare variables for removing items
    const variables = {
      cartId,
      lineIds: [lineId]
    };

    // Remove items using Shopify's GraphQL API
    const { cartLinesRemove } =
      await graphqlClient.request<CartLinesRemoveResponse>(
        REMOVE_FROM_CART,
        variables
      );

    // Transform the cart before returning
    const transformedCart = {
      ...cartLinesRemove.cart,
      lines: {
        edges: cartLinesRemove.cart.lines.edges.map(({ node }) => ({
          node: transformCartLineItem(node)
        }))
      }
    };

    return NextResponse.json(transformedCart);
  } catch (error) {
    console.error("Failed to remove item from cart:", error);
    return NextResponse.json(
      { error: "Failed to remove item from cart" },
      { status: 500 }
    );
  }
}
