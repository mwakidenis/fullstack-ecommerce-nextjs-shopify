import Image from "next/image";
import Link from "next/link";
import Navbar from "./navbar";
import { CartIcon } from "../products/cart/cart-icon";
import { HeaderSearch } from "./header-search";

export default async function Header() {
  return (
    <>
      {/* Main Navigation Bar */}
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        {/* Content wrapper with responsive max width and padding
            - Flexbox layout for spacing between elements
            - Wraps on smaller screens */}
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          {/* Logo Section
              - Links to homepage
              - Maintains consistent spacing in LTR/RTL layouts */}
          <Link
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
          </Link>

          {/* Search Component
              - Renders differently on mobile/desktop */}
          <HeaderSearch />

          {/* User Actions Section
              - Contains cart and login link */}
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            {/* Shopping Cart Icon with item counter */}
            <CartIcon />

            <Link
              href="/login/"
              className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Secondary Navigation Bar
          - Contains category navigation */}
      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            {/* Main Navigation Menu */}
            <Navbar active={1} />
          </div>
        </div>
      </nav>
    </>
  );
}
