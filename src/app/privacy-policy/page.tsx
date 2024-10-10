import { Metadata } from "next";
import { generatePrivacyPageMetadata } from "@/components/meta-data";

export const metadata = generatePrivacyPageMetadata();

export default function PrivacyPolicy() {
  return (
    <div className="max-w-prose m-auto space-y-3">
      <h1 className="text-3xl text-center font-bold">Privacy Policy</h1>
      <p>Here will be the contents of privacy policy page.</p>
    </div>
  );
}
