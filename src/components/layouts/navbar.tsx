import Link from "next/link";
import { fetchCategories } from "@/services/shopify-client";
import { MobileNav } from "./navbar-mobile";
import { NavbarProps, NavItem, Category } from "@/types";

export default async function Navbar({ active }: NavbarProps) {
  const categories = await fetchCategories();

  const staticNavItems: NavItem[] = [
    { title: "HOME", url: "/" },
    { title: "PRODUCTS", url: "/products" }
  ];

  const categoryNavItems: NavItem[] =
    categories?.map((category: Category) => ({
      title: category.title,
      url: `/product-category/${category.handle}`
    })) ?? [];

  const allNavItems = [...staticNavItems, ...categoryNavItems];

  return (
    <div className="hidden md:flex justify-between items-center w-full">
      {/* Desktop nav */}
      <ul className="flex flex-row font-medium space-x-8 rtl:space-x-reverse text-sm">
        {allNavItems.map((item, index) => (
          <li className="flex" key={index}>
            <Link
              href={item.url}
              className={`${
                active === index + 1
                  ? "text-[#ee9e36]"
                  : "text-black hover:text-[#ee9e36]"
              } font-[500] px-6 cursor-pointer hover:underline`}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
