"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@/components/products/checkout/checkout-form";
import { convertToSubcurrency } from "@/lib/utils";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

// async function createPaymentIntent() {
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: 1000, // Amount in cents
//     currency: "usd"
//   });

//   return paymentIntent.client_secret;
// }

export default function CheckoutPage() {
  const amount = 49.99;
  // const clientSecret = await createPaymentIntent();

  return (
    <div className="bg-gray-100 dark:bg-gray-900 ">
      <div className="w-full max-w-3xl mx-auto p-8">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Checkout
          </h1>

          {/* <!-- Shipping Address --> */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">
              Shipping Address
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="first_name"
                  className="block text-gray-700 dark:text-white mb-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                />
              </div>
              <div>
                <label
                  htmlFor="last_name"
                  className="block text-gray-700 dark:text-white mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                />
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="address"
                className="block text-gray-700 dark:text-white mb-1"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="city"
                className="block text-gray-700 dark:text-white mb-1"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label
                  htmlFor="state"
                  className="block text-gray-700 dark:text-white mb-1"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                />
              </div>
              <div>
                <label
                  htmlFor="zip"
                  className="block text-gray-700 dark:text-white mb-1"
                >
                  ZIP Code
                </label>
                <input
                  type="text"
                  id="zip"
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                />
              </div>
            </div>
          </div>

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
        </div>
      </div>
    </div>
  );
}
