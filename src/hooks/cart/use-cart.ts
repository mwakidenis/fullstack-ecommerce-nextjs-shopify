"use client";

import { useState, useEffect, useMemo } from "react";
import { Cart } from "@/types";

// Track ongoing fetch promise to prevent duplicate requests
let currentFetchPromise: Promise<any> | null = null;

/**
 * Custom hook for managing shopping cart operations
 * Provides cart state and methods for cart manipulation
 * Implements request deduplication and local storage persistence
 */
export function useCart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  /**
   * Fetches current cart state from the API
   * Implements request deduplication to prevent multiple simultaneous fetches
   * Persists cart ID to local storage
   */
  const fetchCart = async () => {
    // Return existing promise if a fetch is already in progress
    if (currentFetchPromise) {
      return currentFetchPromise;
    }

    setIsLoading(true);

    // Create and store new fetch promise
    currentFetchPromise = fetch(
      `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/api/cart`
    )
      .then(async (response) => {
        const data = await response.json();
        if (!data.error) {
          setCart(data);
          if (data.id) {
            localStorage.setItem("cartId", data.id);
          }
        }
        return data;
      })
      .catch((error) => {
        console.error("Error fetching cart:", error);
      })
      .finally(() => {
        setIsLoading(false);
        setIsFetched(true);
        currentFetchPromise = null; // Reset promise reference
      });

    return currentFetchPromise;
  };

  /**
   * Initialize cart on mount
   * Checks local storage for existing cart ID
   */
  useEffect(() => {
    const savedCart = localStorage.getItem("cartId");
    if (savedCart) {
      fetchCart();
    } else {
      setIsFetched(true);
    }
  }, []);

  /**
   * Adds item to cart
   * Creates new cart if none exists
   * @param variantId - Product variant identifier
   * @param quantity - Number of items to add (default: 1)
   */
  const addToCart = async (variantId: string, quantity: number = 1) => {
    setIsLoading(true);
    try {
      const cartId = localStorage.getItem("cartId");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/api/cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            cartId,
            variantId,
            quantity
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }

      const newCart = await response.json();
      setCart(newCart);

      if (newCart.id) {
        localStorage.setItem("cartId", newCart.id);
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
      throw error; // Re-throw for component error handling
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Updates quantity of existing cart item
   * @param lineId - Cart line item identifier
   * @param quantity - New quantity to set
   */
  const updateCartItem = async (lineId: string, quantity: number) => {
    setIsLoading(true);
    try {
      const cartId = localStorage.getItem("cartId");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/api/cart`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            cartId,
            lineId,
            quantity
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update cart");
      }

      const updatedCart = await response.json();
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to update cart:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Removes item from cart
   * @param lineId - Cart line item identifier
   */
  const removeFromCart = async (lineId: string) => {
    setIsLoading(true);
    try {
      const cartId = localStorage.getItem("cartId");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/api/cart`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            cartId,
            lineId
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove from cart");
      }

      const updatedCart = await response.json();
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to remove from cart:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Clears cart state and removes cart ID from storage
   * Used after successful checkout or for cart abandonment
   */
  const clearCart = () => {
    setCart(null);
    localStorage.removeItem("cartId");
  };

  // Memoize return value to prevent unnecessary re-renders in consuming components
  const value = useMemo(
    () => ({
      cart, // Current cart state
      isLoading, // Loading state for async operations
      isFetched, // Indicates if initial fetch completed
      addToCart, // Method to add items
      updateCartItem, // Method to update quantities
      removeFromCart, // Method to remove items
      clearCart, // Method to clear cart
      refreshCart: fetchCart // Method to manually refresh cart state
    }),
    [cart, isLoading, isFetched]
  );

  return value;
}
