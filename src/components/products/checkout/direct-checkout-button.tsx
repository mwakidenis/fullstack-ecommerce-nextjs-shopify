"use client";

import { useRouter } from "next/navigation";

interface CheckoutButtonProps {
  productId: string;
  name: string;
  price: number;
}

const DirectCheckoutButton = ({
  productId,
  name,
  price
}: CheckoutButtonProps) => {
  const router = useRouter();

  const handleCheckout = () => {
    router.push(`/checkout?productId=${productId}&name=${name}&price=${price}`);
  };

  return (
    <button
      className="bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
      onClick={handleCheckout}
    >
      Buy Now
    </button>
  );
};

export default DirectCheckoutButton;
