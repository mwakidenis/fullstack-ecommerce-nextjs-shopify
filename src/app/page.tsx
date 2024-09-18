import HomeHeros from "@/components/heros/home-heros";
import HomeLatestProducts from "@/components/products/home-latest-products";
import HomeTrendingProducts from "@/components/products/home-trending-products";

export default function Home() {
  return (
    <>
      <HomeHeros
        upper_title={"25% OFF"}
        title={"SUMMER SALE"}
        text={"For limited time only!"}
      />
      <HomeLatestProducts />
      <HomeTrendingProducts />
    </>
  );
}
