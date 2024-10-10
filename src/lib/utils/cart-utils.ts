import { cookies } from "next/headers";
import { shopify, graphqlClient } from "../shopify";
import { GET_CART_QUERY, CREATE_CART_MUTATION } from "../shopify-queries";

export type Checkout = {
  id: string;
  webUrl: string;
  lineItems: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        variant: {
          id: string;
          title: string;
          price: { amount: string };
          product: { handle: string };
          image: { src: string };
        };
        quantity: number;
      };
    }>;
  };
  totalPriceV2: { amount: string };
};

export interface CartItem {
  id: string;
  handle: string;
  title: string;
  price: number;
  quantity: number;
  variant: {
    id: string;
    title: string;
  };
  imageUrl: string;
}

export interface Cart {
  id: string;
  items: CartItem[];
  totalPrice: number;
}

export async function getCart(): Promise<Cart> {
  const cartId = cookies().get("cartId")?.value;
  if (cartId) {
    try {
      const response = await graphqlClient.request<{ node: Checkout }>(
        GET_CART_QUERY,
        { id: cartId }
      );
      return formatCart(response.node);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }

  // If no cart exists or there was an error, create a new one
  const variables = { input: {} };
  const response = await graphqlClient.request<{
    checkoutCreate: { checkout: Checkout };
  }>(CREATE_CART_MUTATION, variables);
  const newCart = response.checkoutCreate.checkout;
  cookies().set("cartId", newCart.id);
  return formatCart(newCart);
}

export function formatCart(shopifyCart: Checkout): Cart {
  return {
    id: shopifyCart.id,
    items: shopifyCart.lineItems.edges.map(({ node }) => ({
      id: node.id,
      handle: node.variant.product.handle,
      title: node.title,
      price: parseFloat(node.variant.price.amount),
      quantity: node.quantity,
      variant: {
        id: node.variant.id,
        title: node.variant.title
      },
      imageUrl: node.variant.image ? node.variant.image.src : ""
    })),
    totalPrice: parseFloat(shopifyCart.totalPriceV2.amount)
  };
}
