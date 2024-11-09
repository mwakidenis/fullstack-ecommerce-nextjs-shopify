"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCartContext } from "@/providers/cart-context";
import { useEffect } from "react";

export function CartIcon() {
  // Access cart data from the global cart context
  const { cart } = useCartContext();

  // Calculate total quantity handling different cart data structures
  // Some cart implementations use edges/nodes pattern, others use direct totalQuantity
  const totalQuantity = cart?.lines?.edges
    ? cart.lines.edges.reduce(
        (total, edge) => total + (edge.node.quantity || 0),
        0
      )
    : cart?.totalQuantity || 0;

  return (
    // Cart link with hover effects and accessibility label
    <Link
      href="/cart/"
      className="relative flex items-center group p-2"
      aria-label={`Cart with ${totalQuantity} items`}
    >
      {/* Shopping cart icon with hover color transition */}
      <ShoppingCart className="h-6 w-6 text-gray-600 group-hover:text-gray-900" />

      {/* Quantity badge - only shown when cart has items */}
      {totalQuantity > 0 && (
        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {totalQuantity}
        </span>
      )}
    </Link>
  );
}
