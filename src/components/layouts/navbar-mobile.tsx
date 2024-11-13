"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { NavItem } from "@/types";

export function MobileNav({
  items,
  active
}: {
  items: NavItem[];
  active: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger button - now this will be rendered in the header */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 text-gray-600 hover:text-gray-900"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile menu dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-full sm:max-w-[425px] p-0">
          <div className="flex flex-col h-full bg-white">
            {/* Menu header with logo and close button */}
            <div className="flex items-center justify-between p-4 border-b">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/images/logo.png"
                  alt="OneStopShop"
                  width={80}
                  height={80}
                  className="h-6 w-auto"
                />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                {/* <X className="w-6 h-6" /> */}
              </button>
            </div>

            {/* Nav items */}
            <nav className="flex flex-col p-4">
              {items.map((item, index) => (
                <Link
                  key={index}
                  href={item.url}
                  className={`px-4 py-3 text-sm font-medium ${
                    active === index + 1
                      ? "text-[#ee9e36]"
                      : "text-gray-800 hover:text-[#ee9e36]"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
