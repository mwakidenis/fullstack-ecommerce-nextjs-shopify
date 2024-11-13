"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { useCartContext } from "@/providers/cart-context";
import Loader from "@/components/layouts/loader";
import { showToast } from "@/lib/utils/toast";
import Link from "next/link";

// Separate component for payment processing logic
function PaymentProcessor() {
  // Get cart context functions for cleanup after successful payment
  const { isLoading, isFetched, clearCart } = useCartContext();

  // State for payment confirmation details
  const [amount, setAmount] = useState<number | null>(null);
  const [currency, setCurrency] = useState<string | null>(null);

  // Hooks for URL parameters and navigation
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Extract payment intent ID from URL parameters
    const paymentIntent = searchParams.get("payment_intent");

    // Redirect to home if no payment intent is found
    if (!paymentIntent) {
      showToast.error("Invalid payment session. Redirecting to home...");
      router.push("/");
      return;
    }

    /**
     * Fetch and verify payment details from the backend
     * Confirms payment success and retrieves final amount
     */
    const fetchPaymentDetails = async () => {
      try {
        // Call backend API to verify payment intent
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/api/checkout/get-payment-intent`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ payment_intent: paymentIntent })
          }
        );

        const data = await response.json();

        // Handle error response from API
        if (data.error) {
          console.error("Error fetching payment details:", data.error);
          showToast.error("Failed to verify payment. Please contact support.");
          router.push("/");
          return;
        }

        // Update state with payment details
        setAmount(data.amount);
        setCurrency(data.currency.toUpperCase());

        // Clear cart and show success message
        clearCart();
        showToast.success(
          "Thank you for your purchase! Your order has been confirmed."
        );
      } catch (error) {
        // Handle network or other errors
        console.error("Error:", error);
        showToast.error("Failed to verify payment. Please contact support.");
        router.push("/");
      }
    };

    fetchPaymentDetails();
  }, [searchParams, router, clearCart]);

  // Show loading state while verifying payment
  if (!isFetched) {
    return <Loader />;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      {/* Success message and payment details */}
      <h1 className="text-3xl font-bold mb-4">Thank You for Your Purchase!</h1>
      {amount !== null && currency && (
        <p className="text-lg mb-4">
          You have successfully paid{" "}
          <span className="font-semibold">
            {currency} ${amount.toFixed(2)}
          </span>
          .
        </p>
      )}
      <p className="text-gray-600">A receipt has been sent to your email.</p>

      {/* Return to shopping link */}
      <Link
        href="/"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md mt-6 hover:bg-blue-700 transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

// Main component wrapped with Suspense because we are using useSearchParams which is a client component hook that requires Suspense boundaries
export default function PaymentSuccess() {
  return (
    <Suspense fallback={<Loader />}>
      <PaymentProcessor />
    </Suspense>
  );
}
