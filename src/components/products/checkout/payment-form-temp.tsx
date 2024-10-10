"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import { getCart } from '../../lib/cart';
import { getCart } from "@/lib/utils/cart-utils";

export default function PaymentPage() {
  const router = useRouter();
  const [cart, setCart] = useState<any>(null);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expirationDate: "",
    cvv: ""
  });

  useEffect(() => {
    async function fetchCart() {
      const cartData = await getCart();
      setCart(cartData);
    }
    fetchCart();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically process the payment using a payment gateway
    // For this example, we'll just simulate a successful payment
    alert("Payment processed successfully!");
    // Clear the cart and redirect to a confirmation page
    // You would typically handle this on your backend
    router.push("/checkout/confirmation");
  };

  if (!cart) return <div>Loading...</div>;

  return (
    <div>
      <h1>Payment Details</h1>
      <div>
        <h2>Order Summary</h2>
        {cart.items.map((item: any) => (
          <div key={item.handle}>
            <p>
              {item.title} - ${item.price} x {item.quantity}
            </p>
          </div>
        ))}
        <p>Total: ${cart.totalPrice}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          name="cardNumber"
          value={paymentDetails.cardNumber}
          onChange={handleChange}
          placeholder="Card Number"
          required
        />
        <input
          name="cardHolder"
          value={paymentDetails.cardHolder}
          onChange={handleChange}
          placeholder="Card Holder Name"
          required
        />
        <input
          name="expirationDate"
          value={paymentDetails.expirationDate}
          onChange={handleChange}
          placeholder="Expiration Date (MM/YY)"
          required
        />
        <input
          name="cvv"
          value={paymentDetails.cvv}
          onChange={handleChange}
          placeholder="CVV"
          required
        />
        <button type="submit">Complete Purchase</button>
      </form>
    </div>
  );
}
