import { useCartContext } from "@/providers/cart-context";
import { calculateTotalCartAmount } from "@/lib/utils";

export const CartSummary = () => {
  // Get cart data from global context
  const { cart } = useCartContext();

  // Early return if cart is not available
  if (!cart) return null;

  // Calculate various price components for the order
  const { subtotal, shipping, tax, total } = calculateTotalCartAmount(cart);

  /**
   * Normalizes cart item structure to handle different API responses
   * Some APIs return items in a node structure, others return direct items
   */
  const normalizeCartItem = (item: any) => {
    if (item.node) {
      return item.node;
    }
    return item;
  };

  // Handle different cart data structures (edges/nodes pattern vs direct array)
  // Ensures consistent item format regardless of API response structure
  const cartItems = cart?.lines?.edges
    ? cart.lines.edges.map(normalizeCartItem)
    : Array.isArray(cart?.lines)
    ? cart.lines.map(normalizeCartItem)
    : [];

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-4">Order Summary</h3>
      <div className="space-y-2">
        {/* Item list with individual prices */}
        {cartItems.map((item: any) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>
              {item.merchandise.product.title} ({item.merchandise.title}) (x
              {item.quantity})
            </span>
            <span>${item.merchandise.price.amount}</span>
          </div>
        ))}

        {/* Order totals breakdown */}
        <div className="border-t pt-2 mt-2">
          {/* Subtotal (before shipping and tax) */}
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          {/* Shipping costs */}
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>${shipping}</span>
          </div>
          {/* Tax amount */}
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>${tax}</span>
          </div>
          {/* Final total with all costs included */}
          <div className="flex justify-between font-medium text-base mt-2 border-t pt-2">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
