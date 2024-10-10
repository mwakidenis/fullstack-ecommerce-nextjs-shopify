import Link from "next/link";

interface NavItem {
  title: string;
  url: string;
}

interface NavbarProps {
  active: number;
}

export default async function Navbar(params: NavbarProps) {
  const navItems: NavItem[] = [
    {
      title: "Home",
      url: "/"
    },
    {
      title: "Best Selling",
      url: "/best-selling"
    },
    {
      title: "Products",
      url: "/products"
    },
    {
      title: "Events",
      url: "/events"
    },
    {
      title: "FAQ",
      url: "/faq"
    }
  ];

  return (
    <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
      {navItems &&
        navItems.map((i, index) => (
          <div className="flex" key={index}>
            <Link
              href={i.url}
              className={`$text-black 800px:text-[#000] pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer hover:underline}`}
            >
            {/* <Link
              href={i.url}
              className={`${
                active === index + 1
                  ? "text-[#17dd1f]"
                  : "text-black 800px:text-[#000]"
              } pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer hover:underline}`}
            > */}
              {i.title}
            </Link>
          </div>
        ))}
      {/* <li>
        <a
          href="/"
          className="text-gray-900 dark:text-white hover:underline"
          aria-current="page"
        >
          HOME
        </a>
      </li> */}
    </ul>
  );
}
