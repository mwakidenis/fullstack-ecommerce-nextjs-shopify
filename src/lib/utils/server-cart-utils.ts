import { cookies } from "next/headers";
import { graphqlClient } from "../shopify";
import { GET_CART_QUERY, CREATE_CART_MUTATION } from "../shopify-queries";
import { Cart, FormattedCart, formatCart } from "./cart-utils";

export async function getServerCart(): Promise<FormattedCart> {
  const cartId = cookies().get("cartId")?.value;
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
  cookies().set("cartId", newCart.id);
  return formatCart(newCart);
}
