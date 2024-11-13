import CheckoutForm from "@/components/products/checkout/checkout-form";
import { generateCheckouttPageMetadata } from "@/components/meta-data";

// Generate SEO metadata for the checkout page
export const metadata = generateCheckouttPageMetadata();

// Main checkout page component
// Provides responsive container and styling for checkout form
export default function CheckoutPage() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-5xl mx-auto py-4 md:py-8">
          <div className="bg-white dark:bg-gray-800 p-4 md:p-8 rounded-lg shadow-md border dark:border-gray-700">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Checkout
            </h1>
            <div className="mb-6">
              <CheckoutForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
