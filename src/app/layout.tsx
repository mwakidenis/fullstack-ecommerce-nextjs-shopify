import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";

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

// import generateMetaData from "@/components/meta";
import { defaultMetadata } from "@/components/meta";

export const metadata = defaultMetadata;

// export const metadata: Metadata = generateMetaData;
// export const metadata: Metadata = {
//   title: "Fullstack Ecommerce Project",
//   description: "Shopping Made Easier"
// };

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header
          title="Fullstack Ecommerce Project"
          description="Shopping Made Easier"
          keywords="{params.keywords}"
          image=""
          url=""
          // url={process.env.NEXT_PUBLIC_SITE_DOMAIN}
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
