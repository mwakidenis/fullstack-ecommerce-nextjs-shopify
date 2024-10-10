"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@/components/products/checkout/checkout-form";
import { convertToSubcurrency } from "@/lib/utils";
// import PaymentForm from "@/components/products/checkout/payment-form";
// import { cookies } from "next/headers";
// import { generateCheckouttPageMetadata } from "@/components/meta-data";

// export const metadata = generateCheckouttPageMetadata();

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

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

export default async function PaymentPage() {
  const amount = 49.99;
  // const cart = await getCart();
  // const { total } = calculateCartSummary(cart);
  // const clientSecret = await createPaymentIntent();

  return (
    <div className="bg-gray-100 dark:bg-gray-900 ">
      <div className="w-full max-w-3xl mx-auto p-8">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Checkout
          </h1>

          {/* {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : ( */}
          <>
            {/* <!-- Shipping Address --> */}

            {/* <!-- Payment Information --> */}

            <div>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">
                Payment Information
              </h2>
              {/* <div className="grid grid-cols-2 gap-4 mt-4"> */}
              <Elements
                stripe={stripePromise}
                options={{
                  mode: "payment",
                  amount: convertToSubcurrency(amount),
                  currency: "usd"
                }}
              >
                <CheckoutForm amount={amount} />
              </Elements>
              {/* </div> */}
            </div>
          </>
          {/* )} */}
        </div>
      </div>
    </div>
  );
}
