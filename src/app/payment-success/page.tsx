import { generatePaymentSuccesstPageMetadata } from "@/components/meta-data";
import PaymentSuccess from "@/components/products/checkout/payment-success";

// Generate SEO metadata for the payment success page
// This includes common tags like title and description
export const metadata = generatePaymentSuccesstPageMetadata();

// Thank you page shown after successful payment
// Simple wrapper around PaymentSuccess component
export default function ThankYouPage() {
  // PaymentSuccess component handles all success messaging and next steps
  return <PaymentSuccess />;
}
