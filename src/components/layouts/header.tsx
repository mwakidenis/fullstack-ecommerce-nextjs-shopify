import Image from "next/image";
import Link from "next/link";
import Navbar from "./navbar";
import { CartIcon } from "../products/cart/cart-icon";
import { HeaderSearch } from "./header-search";
import { MobileNav } from "./navbar-mobile";
import { fetchCategories } from "@/services/shopify-client";

export default async function Header() {
  // Fetch categories for mobile nav
  const categories = await fetchCategories();
  const staticNavItems = [
    { title: "HOME", url: "/" },
    { title: "PRODUCTS", url: "/products" }
  ];
  const categoryNavItems =
    categories?.map((category) => ({
      title: category.title,
      url: `/product-category/${category.handle}`
    })) ?? [];
  const allNavItems = [...staticNavItems, ...categoryNavItems];

  return (
    <>
      {/* Main header */}
      <nav className="bg-white border-gray-200">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              src="/images/logo.png"
              className="h-6 md:h-8 w-auto"
              alt="OneStopShop"
              height={100}
              width={100}
              priority
            />
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-xl mx-4">
            <HeaderSearch />
          </div>

          {/* Cart, mobile menu, and auth */}
          <div className="flex items-center space-x-4">
            <CartIcon />
            {/* Mobile Nav moved here */}
            <MobileNav items={allNavItems} active={1} />
            <Link
              href="/login/"
              className="text-sm text-blue-600 hover:underline hidden sm:inline-block"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Category nav - desktop only */}
      <nav className="bg-gray-50 hidden md:block">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <Navbar active={1} />
        </div>
      </nav>
    </>
  );
}
