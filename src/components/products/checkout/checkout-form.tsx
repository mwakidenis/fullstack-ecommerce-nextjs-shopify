"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export interface PaymentProps {
  total: string;
}

export default function CheckoutForm() {
  // const { total } = amount;
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const name = searchParams.get("name");
  const price = searchParams.get("price");
  return (
    <form>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="first_name"
            className="block text-gray-700 dark:text-white mb-1"
          >
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
          />
        </div>
        <div>
          <label
            htmlFor="last_name"
            className="block text-gray-700 dark:text-white mb-1"
          >
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
          />
        </div>
      </div>

      <div className="mt-4">
        <label
          htmlFor="address"
          className="block text-gray-700 dark:text-white mb-1"
        >
          Address
        </label>
        <input
          type="text"
          id="address"
          className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="city"
          className="block text-gray-700 dark:text-white mb-1"
        >
          City
        </label>
        <input
          type="text"
          id="city"
          className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label
            htmlFor="state"
            className="block text-gray-700 dark:text-white mb-1"
          >
            State
          </label>
          <input
            type="text"
            id="state"
            className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
          />
        </div>
        <div>
          <label
            htmlFor="zip"
            className="block text-gray-700 dark:text-white mb-1"
          >
            ZIP Code
          </label>
          <input
            type="text"
            id="zip"
            className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
          />
        </div>
      </div>
      <button className="text-white w-full p-5 bg-teal-500 mt-5 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse hover:bg-teal-700 dark:bg-teal-600 dark:text-white dark:hover:bg-teal-900">
        Proceed to Pay ({price})
      </button>
    </form>
  );
}
