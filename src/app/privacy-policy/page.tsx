import { Metadata } from "next";
import { generatePrivacyPageMetadata } from "@/components/meta-data";

// Generate SEO metadata for privacy policy page
// Uses Next.js Metadata type for type safety
export const metadata = generatePrivacyPageMetadata();

// Privacy Policy page component
// Displays company privacy policy using readable typography
export default function PrivacyPolicy() {
  // Using max-w-prose for optimal reading width
  // space-y-3 provides consistent vertical spacing between elements
  return (
    <div className="max-w-prose m-auto space-y-3">
      <h1 className="text-3xl text-center font-bold">Privacy Policy</h1>

      {/* TODO: Replace with actual privacy policy content */}
      <p>Here will be the contents of privacy policy page.</p>
    </div>
  );
}
