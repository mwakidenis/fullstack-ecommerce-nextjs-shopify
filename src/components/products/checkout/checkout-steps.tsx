"use client";

import React, { useState } from "react";
// import { useCart } from "@/context/CartContext";
import { useCart } from "@/app/context/cart-context";

enum CheckoutStep {
  Shipping,
  Payment
}

export default function CheckoutSteps() {
  const [step, setStep] = useState(CheckoutStep.Shipping);
  const { cart, isLoading } = useCart();
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
    postalCode: ""
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });

  if (isLoading) {
    return <div>Loading checkout...</div>;
  }

  if (!cart) {
    return <div>Unable to load cart. Please try again.</div>;
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(CheckoutStep.Payment);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the order to your backend/Shopify
    console.log("Order placed", { shippingDetails, paymentDetails });
    // Redirect to a thank you page or show a success message
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {step === CheckoutStep.Shipping ? (
        <form onSubmit={handleShippingSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold">Shipping Details</h2>
          <input
            type="text"
            placeholder="Full Name"
            value={shippingDetails.name}
            onChange={(e) =>
              setShippingDetails({ ...shippingDetails, name: e.target.value })
            }
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Address"
            value={shippingDetails.address}
            onChange={(e) =>
              setShippingDetails({
                ...shippingDetails,
                address: e.target.value
              })
            }
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="City"
            value={shippingDetails.city}
            onChange={(e) =>
              setShippingDetails({ ...shippingDetails, city: e.target.value })
            }
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Country"
            value={shippingDetails.country}
            onChange={(e) =>
              setShippingDetails({
                ...shippingDetails,
                country: e.target.value
              })
            }
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Postal Code"
            value={shippingDetails.postalCode}
            onChange={(e) =>
              setShippingDetails({
                ...shippingDetails,
                postalCode: e.target.value
              })
            }
            required
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Continue to Payment
          </button>
        </form>
      ) : (
        <form onSubmit={handlePaymentSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold">Payment Details</h2>
          <input
            type="text"
            placeholder="Card Number"
            value={paymentDetails.cardNumber}
            onChange={(e) =>
              setPaymentDetails({
                ...paymentDetails,
                cardNumber: e.target.value
              })
            }
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Expiry Date (MM/YY)"
            value={paymentDetails.expiryDate}
            onChange={(e) =>
              setPaymentDetails({
                ...paymentDetails,
                expiryDate: e.target.value
              })
            }
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="CVV"
            value={paymentDetails.cvv}
            onChange={(e) =>
              setPaymentDetails({ ...paymentDetails, cvv: e.target.value })
            }
            required
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Place Order
          </button>
        </form>
      )}
    </div>
  );
}
