"use server";

import { getCart, FormattedCart, formatCart, Cart } from "@/lib/utils/cart-utils";
import { graphqlClient } from "@/lib/shopify";
import {
  ADD_TO_CART_MUTATION,
  REMOVE_FROM_CART_MUTATION,
  UPDATE_CART_MUTATION
} from "@/lib/shopify-queries";

export async function addToCart(
  variantId: string,
  quantity: number
): Promise<FormattedCart> {
  const cart = await getCart();

  const variables = {
    cartId: cart.id,
    lines: [{ merchandiseId: variantId, quantity }]
  };

  const response = await graphqlClient.request<{
    cartLinesAdd: { cart: Cart };
  }>(ADD_TO_CART_MUTATION, variables);

  return formatCart(response.cartLinesAdd.cart);
}

export async function removeFromCart(lineId: string): Promise<FormattedCart> {
  const cart = await getCart();

  const variables = {
    cartId: cart.id,
    lineIds: [lineId]
  };

  const response = await graphqlClient.request<{
    cartLinesRemove: { cart: Cart };
  }>(REMOVE_FROM_CART_MUTATION, variables);

  return formatCart(response.cartLinesRemove.cart);
}

export async function updateQuantity(
  lineId: string,
  quantity: number
): Promise<FormattedCart> {
  const cart = await getCart();

  const variables = {
    cartId: cart.id,
    lines: [{ id: lineId, quantity }]
  };

  const response = await graphqlClient.request<{
    cartLinesUpdate: { cart: Cart };
  }>(UPDATE_CART_MUTATION, variables);

  return formatCart(response.cartLinesUpdate.cart);
}