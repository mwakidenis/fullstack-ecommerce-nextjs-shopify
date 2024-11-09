import Image from "next/image";
import Link from "next/link";
import { Twitter, Instagram, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Link href={"/"} className="flex justify-center ">
            <Image
              src={"/images/logo.png"}
              className="w-40 h-8 flex justify-center"
              alt="OneStopShop"
              width={400}
              height={400}
            />
          </Link>
          <ul className="text-lg flex items-center justify-center flex-col gap-7 md:flex-row md:gap-12 transition-all duration-500 py-16 mb-10 border-b border-gray-200">
            <li>
              <a href="#" className="text-gray-800 hover:text-gray-900">
                OneStopShop
              </a>
            </li>
            <li>
              <a href="#" className=" text-gray-800 hover:text-gray-900">
                Products
              </a>
            </li>
            <li>
              <a href="#" className=" text-gray-800 hover:text-gray-900">
                Resources
              </a>
            </li>
            <li>
              <a href="#" className=" text-gray-800 hover:text-gray-900">
                Blogs
              </a>
            </li>
            <li>
              <a href="#" className=" text-gray-800 hover:text-gray-900">
                Support
              </a>
            </li>
          </ul>
          <div className="flex space-x-10 justify-center items-center mb-14">
            <a
              href="#"
              className="block text-gray-900 transition-all duration-500 hover:text-indigo-600"
            >
              <Twitter size={27} />
            </a>
            <a
              href="#"
              className="block text-gray-900 transition-all duration-500 hover:text-indigo-600"
            >
              <Instagram size={27} />
            </a>
            <a
              href="#"
              className="block text-gray-900 transition-all duration-500 hover:text-indigo-600"
            >
              <Facebook size={27} />
            </a>
            <a
              href="#"
              className="block text-gray-900 transition-all duration-500 hover:text-indigo-600"
            >
              <Youtube size={27} />
            </a>
          </div>
          <span className="text-lg text-gray-500 text-center block">
            ©<a href="https://samikaranadhikari.com.np/">OneStopShop</a> 2024,
            All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
