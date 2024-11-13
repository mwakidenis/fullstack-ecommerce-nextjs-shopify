import HomeLatestProducts from "@/components/products/home-latest-products";
import HomeTrendingProducts from "@/components/products/home-trending-products";
import HomeProductsByCategory from "@/components/products/home-products-by-category";
import { HomeHeroBanner } from "@/components/heros/home-hero-banner";

// Main home page component
// Composes various sections to create the landing page
export default function Home() {
  return (
    <div>
      {/* Hero banner section at the top of the page */}
      <HomeHeroBanner />

      {/* Display latest products section */}
      <HomeLatestProducts />

      {/* TODO: Re-enable trending products once API is ready */}
      {/* <HomeTrendingProducts /> */}

      {/* TODO: Re-enable category products after content review */}
      {/* <HomeProductsByCategory slug={"womens"} limit={6} /> */}
    </div>
  );
}
