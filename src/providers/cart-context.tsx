"use client"; // Enable client-side features in Next.js 13+

import { createContext, useContext, ReactNode } from "react";
import { useCart } from "@/hooks/cart/use-cart";

// Create a typed context for cart functionality
// Initially undefined, will be populated by CartProvider
// Type is inferred from useCart hook's return type
const CartContext = createContext<ReturnType<typeof useCart> | undefined>(
  undefined
);

// Provider component that wraps parts of app that need cart access
// Makes cart state and methods available to all child components
// @param children - React components that will have access to cart context
export function CartProvider({ children }: { children: ReactNode }) {
  // Initialize cart state and methods using custom hook
  const cart = useCart();

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

// Custom hook to consume cart context
// Provides type-safe access to cart state and methods
// Throws error if used outside CartProvider
export function useCartContext() {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartProvider");
  }

  return context;
}