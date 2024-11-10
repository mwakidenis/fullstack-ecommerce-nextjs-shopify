import { useCart } from "@/hooks/cart/use-cart";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

export default function MiniCart() {
  // Get cart state and management functions from custom hook
  const { cart, isLoading, updateCartItem, removeFromCart } = useCart();

  // Display empty state if cart is empty or not initialized
  if (!cart || cart.lines.length === 0) {
    return <div className="p-4 text-center">Your cart is empty</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {/* Cart items list */}
      <div className="space-y-4">
        {cart.lines.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-4"
          >
            {/* Product information section */}
            <div className="flex items-center gap-4">
              {/* Product image - only shown if available */}
              {item.merchandise.image && (
                <Image
                  src={item.merchandise.image.url}
                  alt={item.merchandise.image.altText || ""}
                  className="w-16 h-16 object-cover"
                  width={400}
                  height={400}
                />
              )}
              {/* Product details */}
              <div>
                <h3 className="font-medium">{item.merchandise.title}</h3>
                <p className="text-sm text-gray-500">
                  {formatPrice(
                    parseFloat(item.merchandise.price.amount),
                    item.merchandise.price.currencyCode
                  )}
                </p>
              </div>
            </div>
            {/* Quantity selector and remove button */}
            <div className="flex items-center gap-4">
              {/* Quantity dropdown with options 1-10 */}
              <select
                value={item.quantity}
                onChange={(e) =>
                  updateCartItem(item.id, Number(e.target.value))
                }
                className="select select-bordered w-20"
                disabled={isLoading}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              {/* Remove item button */}
              <button
                onClick={() => removeFromCart(item.id)}
                disabled={isLoading}
                className="btn btn-ghost text-red-500"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Cart summary and checkout section */}
      <div className="mt-6">
        {/* Subtotal display */}
        <div className="flex justify-between text-lg font-medium">
          <span>Subtotal</span>
          <span>
            {formatPrice(
              parseFloat(cart.cost.subtotalAmount.amount),
              cart.cost.subtotalAmount.currencyCode
            )}
          </span>
        </div>
        {/* Checkout button - opens in new tab for secure checkout */}
        <a
          href={cart.checkoutUrl}
          className="btn btn-primary w-full mt-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          Proceed to Checkout
        </a>
      </div>
    </div>
  );
}
