"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ShippingPage() {
  const router = useRouter();
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
    postalCode: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the shipping details to your backend or local storage
    localStorage.setItem("shippingDetails", JSON.stringify(shippingDetails));
    router.push("/checkout/payment");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Shipping Details</h1>
      <input
        name="name"
        value={shippingDetails.name}
        onChange={handleChange}
        placeholder="Full Name"
        required
      />
      <input
        name="address"
        value={shippingDetails.address}
        onChange={handleChange}
        placeholder="Address"
        required
      />
      <input
        name="city"
        value={shippingDetails.city}
        onChange={handleChange}
        placeholder="City"
        required
      />
      <input
        name="country"
        value={shippingDetails.country}
        onChange={handleChange}
        placeholder="Country"
        required
      />
      <input
        name="postalCode"
        value={shippingDetails.postalCode}
        onChange={handleChange}
        placeholder="Postal Code"
        required
      />
      <button type="submit">Proceed to Payment</button>
    </form>
  );
}
