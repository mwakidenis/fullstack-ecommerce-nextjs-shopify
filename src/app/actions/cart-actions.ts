"use server";

import { cookies } from "next/headers";
import { getCart, Cart, formatCart } from "@/lib/utils/cart-utils";
import { shopify } from "@/lib/shopify";
import { graphqlClient } from "@/lib/shopify";
import {
  ADD_TO_CART_MUTATION,
  REMOVE_FROM_CART_MUTATION,
  UPDATE_CART_MUTATION
} from "@/lib/shopify-queries";

type Money = {
  amount: string;
};

type ImageEdge = {
  node: {
    src: string;
  };
};

type ProductVariant = {
  id: string;
  title: string;
  price: Money;
  product: {
    handle: string;
  };
  image: {
    src: string;
  };
};

type CheckoutLineItem = {
  id: string;
  title: string;
  variant: ProductVariant;
  quantity: number;
};

type Checkout = {
  id: string;
  webUrl: string;
  lineItems: {
    edges: Array<{
      node: CheckoutLineItem;
    }>;
  };
  totalPriceV2: Money;
};

type CheckoutUserError = {
  field: string[];
  message: string;
};

type CheckoutCreateResponse = {
  checkoutCreate: {
    checkout: Checkout;
    checkoutUserErrors: CheckoutUserError[];
  };
};

type CheckoutLineItemsAddResponse = {
  checkoutLineItemsAdd: {
    checkout: Checkout;
    checkoutUserErrors: CheckoutUserError[];
  };
};

type CheckoutResponse = {
  checkout: Checkout;
  checkoutUserErrors: Array<{ field: string[]; message: string }>;
};

export async function addToCart(
  variantId: string,
  quantity: number
): Promise<Cart> {
  const cart = await getCart();

  const variables = {
    checkoutId: cart.id,
    lineItems: [{ variantId, quantity }]
  };

  const response = await graphqlClient.request<{
    checkoutLineItemsAdd: CheckoutResponse;
  }>(ADD_TO_CART_MUTATION, variables);

  if (response.checkoutLineItemsAdd.checkoutUserErrors.length > 0) {
    throw new Error(
      response.checkoutLineItemsAdd.checkoutUserErrors[0].message
    );
  }

  return formatCart(response.checkoutLineItemsAdd.checkout);
}

export async function removeFromCart(lineItemId: string): Promise<Cart> {
  const cart = await getCart();

  const variables = {
    checkoutId: cart.id,
    lineItemIds: [lineItemId]
  };

  const response = await graphqlClient.request<{
    checkoutLineItemsRemove: CheckoutResponse;
  }>(REMOVE_FROM_CART_MUTATION, variables);

  if (response.checkoutLineItemsRemove.checkoutUserErrors.length > 0) {
    throw new Error(
      response.checkoutLineItemsRemove.checkoutUserErrors[0].message
    );
  }

  return formatCart(response.checkoutLineItemsRemove.checkout);
}

export async function updateQuantity(
  lineItemId: string,
  quantity: number
): Promise<Cart> {
  const cart = await getCart();

  const variables = {
    checkoutId: cart.id,
    lineItems: [{ id: lineItemId, quantity }]
  };

  const response = await graphqlClient.request<{
    checkoutLineItemsUpdate: CheckoutResponse;
  }>(UPDATE_CART_MUTATION, variables);

  if (response.checkoutLineItemsUpdate.checkoutUserErrors.length > 0) {
    throw new Error(
      response.checkoutLineItemsUpdate.checkoutUserErrors[0].message
    );
  }

  return formatCart(response.checkoutLineItemsUpdate.checkout);
}
