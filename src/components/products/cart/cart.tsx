"use client";

import { useCartContext } from "@/providers/cart-context";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { calculateTotalCartAmount } from "@/lib/utils";
import Loader from "@/components/layouts/loader";
import { showToast } from "@/lib/utils/toast";
import Image from "next/image";
import { X } from "lucide-react";

export default function Cart() {
  // Get cart state and methods from context
  const { cart, isLoading, updateCartItem, removeFromCart } = useCartContext();

  /**
   * Normalizes cart item structure to handle different API response formats
   * Some APIs return items wrapped in node structure, others return direct items
   */
  const normalizeCartItem = (item: any) => {
    if (item.node) {
      return item.node;
    }
    return item;
  };

  /**
   * Handles removal of items from cart
   * Displays success/error messages via toast notifications
   */
  const handleRemoveItem = async (itemId: string, productTitle: string) => {
    try {
      await removeFromCart(itemId);
      showToast.success(`${productTitle} removed from cart`);
    } catch (error) {
      showToast.error("Failed to remove item from cart. Please try again.");
    }
  };

  /**
   * Handles quantity updates for cart items
   * Updates state and shows appropriate success/error messages
   */
  const handleUpdateQuantity = async (
    itemId: string,
    quantity: number,
    productTitle: string
  ) => {
    try {
      await updateCartItem(itemId, quantity);
      showToast.success(`Updated ${productTitle} quantity to ${quantity}`);
    } catch (error) {
      showToast.error("Failed to update quantity. Please try again.");
    }
  };

  // Process cart items to handle different API response structures
  const cartItems = cart?.lines?.edges
    ? cart.lines.edges.map(normalizeCartItem)
    : Array.isArray(cart?.lines)
      ? cart.lines.map(normalizeCartItem)
      : [];

  // Show loading state while cart data is being fetched
  if (isLoading) {
    return <Loader />;
  }

  // Show empty cart state with CTA to continue shopping
  if (!cart || cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4 min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">
          Looks like you haven&apos;t added anything to your cart yet.
        </p>
        <Link
          href="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  // Calculate order totals including tax and shipping
  const { subtotal, shipping, tax, total } = calculateTotalCartAmount(cart);

  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
      {/* Cart Items Section */}
      <div className="lg:col-span-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              {/* Table headers for cart items */}
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    Product
                  </th>
                  <th
                    scope="col"
                    className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    Total
                  </th>
                  <th
                    scope="col"
                    className="relative px-4 sm:px-6 py-3 w-[50px]"
                  >
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              {/* Cart items list */}
              <tbody className="bg-white divide-y divide-gray-200">
                {cartItems.map((item: any) => {
                  // Extract and normalize product details from cart item
                  const merchandise = item?.merchandise;
                  const productTitle =
                    merchandise?.product?.title || merchandise?.title;
                  const variantTitle = merchandise?.title;
                  const image =
                    merchandise?.product?.image || merchandise?.image;
                  const price = merchandise?.price;
                  // Calculate individual item total
                  const itemTotal =
                    parseFloat(price?.amount || "0") * (item?.quantity || 0);

                  return (
                    <tr key={item.id}>
                      {/* Product details cell with image and title */}
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {image?.url && (
                            <div className="flex-shrink-0 h-12 w-12 sm:h-16 sm:w-16">
                              <Image
                                className="h-12 w-12 sm:h-16 sm:w-16 object-cover rounded"
                                src={image.url}
                                alt={
                                  image.altText ||
                                  productTitle ||
                                  "Product image"
                                }
                                width={400}
                                height={400}
                              />
                            </div>
                          )}
                          <div className="ml-3 sm:ml-4">
                            <div className="text-xs sm:text-sm font-medium text-gray-900 max-w-[120px] sm:max-w-[200px] truncate">
                              {productTitle}
                            </div>
                            {/* Show variant title if different from product title */}
                            {variantTitle && variantTitle !== productTitle && (
                              <div className="text-xs sm:text-sm text-gray-500 max-w-[120px] sm:max-w-[200px] truncate">
                                ({variantTitle})
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      {/* Unit price cell */}
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-xs sm:text-sm text-gray-900">
                          {formatPrice(
                            parseFloat(price?.amount || "0"),
                            price?.currencyCode
                          )}
                        </div>
                      </td>
                      {/* Quantity selector */}
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <select
                          value={item.quantity}
                          onChange={(e) =>
                            handleUpdateQuantity(
                              item.id,
                              Number(e.target.value),
                              productTitle
                            )
                          }
                          className="block w-16 sm:w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs sm:text-sm"
                          disabled={isLoading}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                      </td>
                      {/* Item total price */}
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                        {formatPrice(itemTotal, price?.currencyCode)}
                      </td>
                      {/* Remove item button */}
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right">
                        <button
                          onClick={() =>
                            handleRemoveItem(item.id, productTitle)
                          }
                          disabled={isLoading}
                          className="text-red-600 hover:text-red-900"
                        >
                          <X className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Order Summary Section */}
      <div className="lg:col-span-4 mt-8 lg:mt-0">
        <div className="border rounded-lg p-4 sm:p-6 space-y-4 bg-gray-50">
          <h2 className="text-base sm:text-lg font-medium">Order Summary</h2>

          {/* Price breakdown */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs sm:text-sm">
              <span>Subtotal</span>
              <span>
                {formatPrice(subtotal, cart.cost.subtotalAmount.currencyCode)}
              </span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm">
              <span>Shipping</span>
              <span>
                {shipping === 0
                  ? "Free"
                  : formatPrice(
                      shipping,
                      cart.cost.subtotalAmount.currencyCode
                    )}
              </span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm">
              <span>Tax</span>
              <span>
                {formatPrice(tax, cart.cost.subtotalAmount.currencyCode)}
              </span>
            </div>

            {/* Order total */}
            <div className="border-t pt-2 flex justify-between font-medium text-sm sm:text-base">
              <span>Order total</span>
              <span>
                {formatPrice(total, cart.cost.totalAmount.currencyCode)}
              </span>
            </div>
          </div>
          {/* Action buttons */}
          <div className="space-y-3">
            <Link
              href="/checkout"
              className="w-full bg-blue-600 text-white py-2 sm:py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center text-sm sm:text-base"
            >
              Proceed to Checkout
            </Link>
            <Link
              href="/"
              className="w-full bg-white text-gray-600 py-2 sm:py-3 px-4 rounded-md border hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center text-sm sm:text-base"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
