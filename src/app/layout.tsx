import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";
import { CartProvider } from "@/providers/cart-context";
import { ToastProvider } from "@/providers/toast-provider";
import { generateHomePageMetadata } from "@/components/meta-data";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
});

// Generate metadata for home page
export const metadata = generateHomePageMetadata;

// Root layout component
// Wraps all pages with common layout elements and providers
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode; // Type for child components
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* Cart context provider wraps entire app */}
        <CartProvider>
          {/* Main layout container */}
          <div className="flex flex-col min-h-screen">
            {/* Global header component */}
            <Header />

            {/* Main content area with toast notifications */}
            <main className="flex-1">
              {children} <ToastProvider />
            </main>

            {/* Global footer component */}
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
