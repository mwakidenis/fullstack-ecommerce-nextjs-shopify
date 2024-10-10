import Image from "next/image";
import Link from "next/link";
import Navbar from "./navbar";
import React from "react";
// import { getCartTotalNumber } from "@/lib/utils/cart-utils";
import { cookies } from "next/headers";

// async function getCartItemCount() {
//   const cookieStore = cookies();
//   const cartCookie = cookieStore.get("cart")?.value;
//   const cart = cartCookie ? JSON.parse(cartCookie) : [];

//   // Sum the total number of items in the cart
//   return cart.reduce((total: number, item: any) => total + item.quantity, 0);
// }

export default async function Header() {
  // const totalCart = getCartTotalNumber();
  // const cartItemCount = await getCartItemCount();
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              src={"/images/logo.png"}
              className="h-8"
              alt="OneStopShop"
              height={100}
              width={100}
            />
          </a>
          <div className="flex space-x-3">
            <button
              type="button"
              data-collapse-toggle="navbar-search"
              aria-controls="navbar-search"
              aria-expanded="false"
              className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
          </div>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <Link
              href="/cart/"
              className="text-sm  text-gray-500 dark:text-white hover:underline"
            >
              Cart (0){/* Cart ({totalCart}) */}
            </Link>
            <Link
              href="/login/"
              className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>
      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <Navbar active={1} />
            {/* <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-900 dark:text-white hover:underline"
                  aria-current="page"
                >
                  HOME
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-gray-900 dark:text-white hover:underline"
                  aria-current="page"
                >
                  MENS
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-900 dark:text-white hover:underline"
                  aria-current="page"
                >
                  WOMENS
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-900 dark:text-white hover:underline"
                  aria-current="page"
                >
                  TRENDING
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-900 dark:text-white hover:underline"
                  aria-current="page"
                >
                  WINTER
                </Link>
              </li>
            </ul> */}
          </div>
        </div>
      </nav>
    </>
  );
}
