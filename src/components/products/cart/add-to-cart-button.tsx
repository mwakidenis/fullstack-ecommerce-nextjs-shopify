"use client";
import React, { useState, memo } from "react";
import { ShoppingCart, Eye, Heart, Minus, Plus } from "lucide-react";
import { useCartContext } from "@/providers/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { showToast } from "@/lib/utils/toast";

// Props for the AddToCartButton component
interface AddToCartButtonProps {
  variantId: string; // Unique identifier for the product variant
  availableForSale: boolean; // Stock status flag
  maxQuantity: number; // Maximum quantity that can be added to cart
  isProductCard?: boolean; // Flag to render a simplified version for product cards
  productTitle?: string; // Product name for toast messages
}

// Memoized to prevent unnecessary re-renders when parent components update
const AddToCartButton = memo(function AddToCartButton({
  variantId,
  availableForSale,
  maxQuantity = 10,
  isProductCard = false,
  productTitle = "Product"
}: AddToCartButtonProps) {
  const { addToCart } = useCartContext();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Handles the cart addition process and shows appropriate toast messages
  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      // Use quantity 1 for product cards, otherwise use selected quantity
      await addToCart(variantId, isProductCard ? 1 : quantity);
      showToast.success(
        isProductCard
          ? `${productTitle} added to cart!`
          : `${productTitle} (${quantity}) added to cart!`
      );
    } catch (error) {
      showToast.error("Failed to add to cart. Please try again.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Updates quantity while ensuring it stays within valid range (1 to maxQuantity)
  const updateQuantity = (value: number) => {
    setQuantity(Math.min(Math.max(1, value), maxQuantity));
  };

  // Render disabled button for out-of-stock products
  if (!availableForSale) {
    return (
      <Button disabled className="w-full bg-gray-200 text-black-600">
        Out of Stock
      </Button>
    );
  }

  // Simplified version for product cards - single add to cart button
  if (isProductCard) {
    return (
      <Button
        className="w-full gap-2"
        onClick={handleAddToCart}
        disabled={isAddingToCart}
      >
        <ShoppingCart className="h-4 w-4" />
        {isAddingToCart ? "Adding..." : "Add to Cart"}
      </Button>
    );
  }

  // Full version with quantity selector and add to cart button
  return (
    <div className="flex gap-3 items-center w-full mb-2">
      {/* Quantity selector with increment/decrement buttons */}
      <div className="flex items-center border rounded-md">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-none"
          onClick={() => updateQuantity(quantity - 1)}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          min="1"
          max={maxQuantity}
          value={quantity}
          onChange={(e) => updateQuantity(parseInt(e.target.value) || 1)}
          className="h-9 w-14 rounded-none border-x text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-none"
          onClick={() => updateQuantity(quantity + 1)}
          disabled={quantity >= maxQuantity}
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {/* Add to cart button with loading state */}
      <Button
        className="flex-1"
        onClick={handleAddToCart}
        disabled={isAddingToCart}
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        {isAddingToCart ? "Adding..." : "Add to Cart"}
      </Button>
    </div>
  );
});

export default AddToCartButton;
