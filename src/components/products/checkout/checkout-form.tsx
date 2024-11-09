"use client";
import React, { useState, useEffect } from "react";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCartContext } from "@/providers/cart-context";
import { useRouter } from "next/navigation";
import { CartSummary } from "../cart/cart-summary";
import { ShippingDetails } from "@/types";
import Loader from "@/components/layouts/loader";
import { showToast } from "@/lib/utils/toast";

// Load Stripe with public key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const CheckoutForm = () => {
  // Initialize cart context and router
  const { cart, isLoading, isFetched, clearCart } = useCartContext();
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1); // Track checkout steps
  const [clientSecret, setClientSecret] = useState<string>("");

  // Redirect to cart if empty
  useEffect(() => {
    if (isFetched && !isLoading && (!cart || cart.lines.length === 0)) {
      router.push("/cart");
    }
  }, [cart, isLoading, isFetched, router]);

  // Handle payment form and Stripe integration
  const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);

    // Process payment submission
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!stripe || !elements) {
        return;
      }

      setProcessing(true);

      try {
        // Confirm payment with Stripe
        const { error: submitError } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/payment-success`
          }
        });

        if (submitError) {
          showToast.error(
            submitError.message ?? "Payment failed. Please try again."
          );
          setError(submitError.message ?? "An error occurred");
          setProcessing(false);
        } else {
          clearCart();
          showToast.success("Payment successful! Redirecting...");
        }
      } catch (error) {
        showToast.error("Something went wrong. Please try again.");
        setProcessing(false);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <PaymentElement />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          disabled={!stripe || processing}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {processing ? "Processing..." : "Pay Now"}
        </button>
        <button
          type="button"
          onClick={() => setStep(1)}
          className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50"
        >
          Back to Shipping Details
        </button>
      </form>
    );
  };

  // Handle shipping information collection
  const ShippingForm = () => {
    const [loading, setLoading] = useState(false);
    const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
      name: "",
      email: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: ""
    });

    // Update shipping form fields
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setShippingDetails((prev) => ({
        ...prev,
        [name]: value
      }));
    };

    // Submit shipping details and create payment intent
    const handleShippingSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/api/checkout/create-payment-intent`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              cart,
              shippingDetails
            })
          }
        );

        const data = await response.json();

        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
          setStep(2);
          showToast.success("Shipping details saved successfully!");
        } else {
          showToast.error(
            "Failed to process shipping details. Please try again."
          );
        }
      } catch (error) {
        console.error("Error:", error);
        showToast.error("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    return (
      <form onSubmit={handleShippingSubmit} className="space-y-4">
        {/* Name input field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border py-2 px-3"
            value={shippingDetails.name}
            onChange={handleInputChange}
          />
        </div>

        {/* Email input field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border py-2 px-3"
            value={shippingDetails.email}
            onChange={handleInputChange}
          />
        </div>

        {/* Address input field */}
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border py-2 px-3"
            value={shippingDetails.address}
            onChange={handleInputChange}
          />
        </div>

        {/* City and State fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border py-2 px-3"
              value={shippingDetails.city}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700"
            >
              State
            </label>
            <input
              id="state"
              name="state"
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border py-2 px-3"
              value={shippingDetails.state}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Postal Code and Country fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="postalCode"
              className="block text-sm font-medium text-gray-700"
            >
              Postal Code
            </label>
            <input
              id="postalCode"
              name="postalCode"
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border py-2 px-3"
              value={shippingDetails.postalCode}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country
            </label>
            <input
              id="country"
              name="country"
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border py-2 px-3"
              value={shippingDetails.country}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Continue to Payment"}
        </button>
      </form>
    );
  };

  // Show loading state while cart data is being fetched
  if (isLoading) {
    return <Loader />;
  }

  // Main checkout layout
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Progress indicator */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`text-sm ${
                    step === 1 ? "text-blue-600 font-medium" : "text-gray-500"
                  }`}
                >
                  1. Shipping
                </span>
                <span className="text-gray-500">→</span>
                <span
                  className={`text-sm ${
                    step === 2 ? "text-blue-600 font-medium" : "text-gray-500"
                  }`}
                >
                  2. Payment
                </span>
              </div>
            </div>

            {/* Render shipping or payment form based on current step */}
            {step === 1 ? (
              <ShippingForm />
            ) : (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <PaymentForm />
              </Elements>
            )}
          </div>
        </div>

        {/* Cart summary sidebar */}
        <div className="space-y-6">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
