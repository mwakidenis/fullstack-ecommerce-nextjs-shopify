"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getCart, FormattedCart } from "@/lib/utils/cart-utils";

interface CartContextType {
  cart: FormattedCart | null;
  updateCart: () => Promise<void>;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<FormattedCart | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const updateCart = async () => {
    setIsLoading(true);
    try {
      const updatedCart = await getCart();
      setCart(updatedCart);
    } catch (error) {
      console.error("Error updating cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    updateCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, updateCart, isLoading }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
