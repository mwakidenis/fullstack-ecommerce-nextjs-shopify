// "use client";
// import CheckoutForm from "@/components/products/checkout/checkout-form";
// import { cookies } from "next/headers";
import { generateCheckouttPageMetadata } from "@/components/meta-data";
import CheckoutSteps from "@/components/products/checkout/checkout-steps";
import PaymentForm from "@/components/products/checkout/payment-form";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import { convertToSubcurrency } from "@/lib/utils";
// import { getCart } from "@/lib/utils/cart-utils";
// import { useState } from "react";

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export const metadata = generateCheckouttPageMetadata();

// async function getCart() {
//   const cookieStore = cookies();
//   const cartCookie = cookieStore.get("cart")?.value;
//   return cartCookie ? JSON.parse(cartCookie) : [];
// }

// function calculateCartSummary(cart: any[]) {
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

export default function CheckoutPage() {
  // const cart = await getCart();
  // const amount = 49.99;

  // These codes are temporary for checking payment gateway
  // const searchParams = useSearchParams();
  // const productId = searchParams.get("productId");
  // const name = searchParams.get("name");
  // const amount = searchParams.get("price");
  // const cart = await getCart();
  // const { total } = calculateCartSummary(cart);

  return (
    <>
      <CheckoutSteps />
      <div className="bg-gray-100 dark:bg-gray-900 ">
        <div className="w-full max-w-3xl mx-auto p-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Checkout
            </h1>
            {/* <h2>Order Summary</h2>
            <p>Total: ${total.toFixed(2)}</p> */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">
                Payment Information
              </h2>
              {/* <CheckoutForm /> */}
              {/* <PaymentForm /> */}
              {/* <Elements
              stripe={stripePromise}
              options={{
                mode: "payment",
                amount: convertToSubcurrency(cart.totalPrice),
                currency: "cad"
              }}
            >
              <PaymentForm amount={cart.totalPrice} />
            </Elements> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
