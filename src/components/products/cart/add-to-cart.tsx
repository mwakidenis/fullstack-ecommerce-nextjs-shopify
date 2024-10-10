"use client";

import React, { useState } from "react";
import { addToCart } from "@/app/actions/cart-actions";

interface AddToCartProps {
  variantId: string;
  availableForSale: boolean;
}

export default function AddToCart({
  variantId,
  availableForSale
}: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);

  async function handleAddToCart() {
    try {
      await addToCart(variantId, quantity);
      // You might want to add some UI feedback here
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Handle error (e.g., show an error message to the user)
    }
  }

  return (
    <div>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
        min={1}
        className="border p-2 mr-2"
      />
      <button
        onClick={handleAddToCart}
        disabled={!availableForSale}
        className={`px-4 py-2 text-white ${
          availableForSale ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400"
        }`}
      >
        {availableForSale ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
}
