"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  Elements
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { convertToSubcurrency } from "@/lib/utils";
// import { getCart, getCartTotalAmount, clearCart } from "@/lib/utils/cart-utils";
import { getCart } from "@/lib/utils/cart-utils";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

// interface PaymentProps {
//   amount: number;
// }

// const PaymentForm = ({ amount }: { amount: number }) => {
export default async function PaymentForm () {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  const cart = await getCart();
  const amount = cart.totalPrice;

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/api/checkout/create-payment-intent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount: convertToSubcurrency(amount) })
      }
    )
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/payment-success?amount=${amount}`
      }
    });

    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      setErrorMessage(error.message);
    } else {
      // The payment UI automatically closes with a success animation.
      // Customer is redirected to `return_url`.
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: "payment",
        amount: convertToSubcurrency(cart.totalPrice),
        currency: "cad"
      }}
    >
      <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
        {clientSecret && <PaymentElement />}

        {errorMessage && <div>{errorMessage}</div>}

        <button
          disabled={!stripe || loading}
          className="text-white w-full p-5 bg-teal-500 mt-5 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse hover:bg-teal-700 dark:bg-teal-600 dark:text-white dark:hover:bg-teal-900"
        >
          {!loading ? `Place Order ( $${amount} )` : "Processing..."}
        </button>
      </form>
    </Elements>
  );
};
