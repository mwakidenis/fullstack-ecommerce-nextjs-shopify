import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
// import { cookies } from "next/headers";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToSubcurrency(amount: number, factor = 100) {
  return Math.round(amount * factor);
}

export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// export async function getCart() {
//   const cookieStore = cookies();
//   const cartCookie = cookieStore.get("cart")?.value;
//   return cartCookie ? JSON.parse(cartCookie) : [];
// }

// export async function calculateCartSummary(cart: any[]) {
//   const TAX_RATE = 0.1;
//   const SHIPPING_COST = 10;
//   const subtotal = cart.reduce(
//     (acc: number, item: any) => acc + item.price * item.quantity,
//     0
//   );
//   const taxes = subtotal * TAX_RATE;
//   const shipping = cart.length > 0 ? SHIPPING_COST : 0;
//   const total = subtotal + taxes + shipping;

//   return { subtotal, taxes, shipping, total };
// }
