// import { cookies } from "next/headers";
import Cookies from "js-cookie";
import { graphqlClient } from "../shopify";
import { GET_CART_QUERY, CREATE_CART_MUTATION } from "../shopify-queries";

export type Cart = {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: Array<{
      node: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
          title: string;
          priceV2: { amount: string };
          product: { handle: string };
          image: { url: string };
        };
      };
    }>;
  };
  estimatedCost: {
    totalAmount: { amount: string };
  };
};

export interface CartItem {
  id: string;
  handle: string;
  title: string;
  price: number;
  quantity: number;
  variantId: string;
  imageUrl: string;
}

export interface FormattedCart {
  id: string;
  checkoutUrl: string;
  items: CartItem[];
  totalPrice: number;
  // totalTax: number;
  // totalShipping: number;
  // grandTotalPrice: number;
}

export async function getCart(): Promise<FormattedCart> {
  const cartId = Cookies.get("cartId");
  // const cartId = cookies().get("cartId")?.value;
  if (cartId) {
    try {
      const response = await graphqlClient.request<{ cart: Cart }>(
        GET_CART_QUERY,
        { id: cartId }
      );
      return formatCart(response.cart);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }

  // If no cart exists or there was an error, create a new one
  const response = await graphqlClient.request<{
    cartCreate: { cart: Cart };
  }>(CREATE_CART_MUTATION);
  const newCart = response.cartCreate.cart;
  Cookies.set("cartId", newCart.id);
  // cookies().set("cartId", newCart.id);
  return formatCart(newCart);

  // // get cart from API
  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/api/cart`
  // );
  // if (!response.ok) {
  //   throw new Error("Failed to fetch cart");
  // }
  // return response.json();
}

export function formatCart(shopifyCart: Cart): FormattedCart {
  return {
    id: shopifyCart.id,
    checkoutUrl: shopifyCart.checkoutUrl,
    items: shopifyCart.lines.edges.map(({ node }) => ({
      id: node.id,
      handle: node.merchandise.product.handle,
      title: node.merchandise.title,
      price: parseFloat(node.merchandise.priceV2.amount),
      quantity: node.quantity,
      variantId: node.merchandise.id,
      imageUrl: node.merchandise.image ? node.merchandise.image.url : ""
    })),
    totalPrice: parseFloat(shopifyCart.estimatedCost.totalAmount.amount)
    // totalTax: parseFloat(shopifyCart.estimatedCost.totalAmount.amount),
    // totalShipping: parseFloat(shopifyCart.estimatedCost.totalAmount.amount),
    // grandTotalPrice: parseFloat(shopifyCart.estimatedCost.totalAmount.amount)
  };
}
