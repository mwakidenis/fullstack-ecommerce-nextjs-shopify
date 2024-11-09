import Cart from "@/components/products/cart/cart";
import { generateCartPageMetadata } from "@/components/meta-data";

// Generate SEO metadata for the cart page
// This metadata is used by Next.js for page optimization
export const metadata = generateCartPageMetadata();

// Cart page component
// Renders the main shopping cart view with a responsive container
export default function CartPage() {
  // Using max-w-6xl to maintain consistent page width across the app
  // Added standard page padding and spacing for better mobile experience
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {/* Cart component handles all shopping cart functionality */}
      <Cart />
    </div>
  );
}
