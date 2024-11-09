import CheckoutForm from "@/components/products/checkout/checkout-form";
import { generateCheckouttPageMetadata } from "@/components/meta-data";

// Generate SEO metadata for the checkout page
export const metadata = generateCheckouttPageMetadata();

// Main checkout page component
// Provides responsive container and styling for checkout form
export default function CheckoutPage() {
  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-900 ">
        {/* Centered container with max width for content */}
        <div className="w-full max-w-5xl mx-auto p-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Checkout
            </h1>

            {/* Checkout form wrapper with bottom margin */}
            <div className="mb-6">
              <CheckoutForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
