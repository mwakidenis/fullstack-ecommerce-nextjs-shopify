import { generateCartPageMetadata } from "@/components/meta-data";
import Image from "next/image";
import Link from "next/link";
// import { getCart } from '../lib/cart';
import { getCart } from "@/lib/utils/cart-utils";
import { removeFromCart, updateQuantity } from "../actions/cart-actions";

// import { cookies } from "next/headers";

const TAX_RATE = 0.13; // 10% tax
const SHIPPING_COST = 10; // Flat shipping cost

// async function getCart() {
//   const cookieStore = cookies();
//   const cartCookie = cookieStore.get("cart")?.value;
//   return cartCookie ? JSON.parse(cartCookie) : [];
// }

// function calculateCartSummary(cart: any[]) {
//   const subtotal = cart.reduce(
//     (acc: number, item: any) => acc + item.price * item.quantity,
//     0
//   );
//   const taxes = subtotal * TAX_RATE;
//   const shipping = cart.length > 0 ? SHIPPING_COST : 0;
//   const total = subtotal + taxes + shipping;

//   return { subtotal, taxes, shipping, total };
// }

export const metadata = generateCartPageMetadata();

export default async function Cart() {
  // const { cart, removeFromCart, clearCart } = useCart();
  const cart = await getCart();
  // console.log("Cart: ", cart);

  // if (cart.length === 0) {
  //   return (
  //     <div className="max-w-prose m-auto space-y-3">
  //       <h1 className="text-3xl text-center font-bold">Cart</h1>
  //       <p>Your cart is empty.</p>
  //     </div>
  //   );
  // }

  // const totalPrice = cart.reduce(
  //   (total, item) => total + item.price * item.quantity,
  //   0
  // );

  return (
    <>
      <div className="bg-gray-100 h-screen  w-full max-w-7xl mx-auto py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-semibold mb-4">My Shopping Cart</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-3/4">
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold">Product</th>
                      <th className="text-left font-semibold">Price</th>
                      <th className="text-left font-semibold">Quantity</th>
                      <th className="text-left font-semibold">Total</th>
                      <th className="text-left font-semibold"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.items.map((item) => (
                      <>
                        <tr key={item.handle}>
                          <td className="py-4">
                            <div className="flex items-center">
                              <Image
                                className="h-16 w-16 mr-4"
                                src={item.imageUrl}
                                alt={item.title}
                                height={500}
                                width={500}
                              />
                              <span className="font-semibold">
                                {item.title} - ${item.price} x {item.quantity}
                              </span>
                            </div>
                          </td>
                          <td className="py-4">${item.price}</td>
                          <td className="py-4">
                            <div className="flex items-center">
                              <form action={updateQuantity}>
                                <input
                                  type="hidden"
                                  name="lineItemId"
                                  value={item.variantId}
                                />
                                <input
                                  type="number"
                                  name="quantity"
                                  defaultValue={item.quantity}
                                  min="1"
                                />
                                <button type="submit">Update Quantity</button>
                              </form>

                              {/* <button className="border rounded-md py-2 px-4 mr-2">
                                -
                              </button>
                              <span className="text-center w-8">1</span>
                              <button className="border rounded-md py-2 px-4 ml-2">
                                +
                              </button> */}
                            </div>
                          </td>

                          <td className="py-4">${item.price * item.quantity}</td>
                          <td>
                            <form action={removeFromCart}>
                              <input
                                type="hidden"
                                name="lineItemId"
                                value={item.variantId}
                              />
                              <button type="submit">Remove</button>
                            </form>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="md:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${cart.totalPrice}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Taxes</span>
                  <span>$1.99</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>$0.00</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">$21.98</span>
                </div>
                {cart.items.length > 0 && (
                  <Link
                    href="/checkout"
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
                  >
                    Proceed to Checkout
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
