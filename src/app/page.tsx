import HomeHeros from "@/components/heros/home-heros";
import HomeLatestProducts from "@/components/products/home-latest-products";
import HomeTrendingProducts from "@/components/products/home-trending-products";
import HomeProductsByCategory from "@/components/products/home-products-by-category";

export default function Home() {
  const category1: number = 5;
  return (
    <div>
      <HomeHeros />
      <HomeLatestProducts />
      {/* <HomeTrendingProducts /> */}
      {/* <HomeProductsByCategory slug={"womens"} limit={6} /> */}
    </div>
  );
}
