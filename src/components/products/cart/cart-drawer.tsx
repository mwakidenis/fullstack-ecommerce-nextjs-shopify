import { useCartContext } from "@/providers/cart-context";
import MiniCart from "./mini-cart";

// Props for the CartDrawer sliding panel
interface CartDrawerProps {
  isOpen: boolean; // Controls drawer visibility
  onClose: () => void; // Callback to handle drawer close action
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  // Get cart data from context to display total quantity
  const { cart } = useCartContext();

  return (
    // Main drawer container with sliding animation
    // Uses transform translate for better performance compared to width/margin
    <div
      className={`fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
    >
      {/* Flex column layout to properly structure the drawer content */}
      <div className="h-full flex flex-col">
        {/* Header section with cart title and close button */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-medium">
            Shopping Cart ({cart?.totalQuantity || 0})
          </h2>
          {/* Close button with accessible label */}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Close</span>
            {/* Close icon using inline SVG for better control */}
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {/* Scrollable content area containing cart items */}
        <div className="flex-1 overflow-y-auto">
          <MiniCart />
        </div>
      </div>
    </div>
  );
}
