import Link from "next/link";
import { fetchCategories } from "@/services/shopify-client";

interface NavItem {
  title: string;
  url: string;
}

interface Category {
  title: string;
  handle: string;
}

interface NavbarProps {
  active: number;
}

export default async function Navbar({ active }: NavbarProps) {
  // Fetch categories from Shopify
  const categories = await fetchCategories();

  // Define static nav items
  const staticNavItems: NavItem[] = [
    {
      title: "HOME",
      url: "/"
    },
    {
      title: "PRODUCTS",
      url: "/products"
    }
  ];

  // Convert categories to nav items
  const categoryNavItems: NavItem[] = categories.map((category: Category) => ({
    title: category.title,
    url: `/product-category/${category.handle}`
  }));

  // Combine static and dynamic nav items
  const allNavItems = [...staticNavItems, ...categoryNavItems];

  return (
    <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
      {allNavItems.map((item, index) => (
        <div className="flex" key={index}>
          <Link
            href={item.url}
            className={`${
              active === index + 1
                ? "text-[#ee9e36]"
                : "text-black 800px:text-[#000]"
            } pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer hover:underline`}
          >
            {item.title}
          </Link>
        </div>
      ))}
    </ul>
  );
}
