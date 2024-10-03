import type { HomeHerosProps } from "@/components/heros/home-heros.d";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

const HomeHeros = ({ upper_title, title, text }: HomeHerosProps) => {
  return (
    <section className="px-3 py-5 bg-neutral-100 lg:py-10">
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <div className="grid lg:grid-cols-2 items-center justify-items-center gap-5">
              <div className="order-2 lg:order-1 flex flex-col justify-center items-center">
                <p className="text-4xl font-bold md:text-7xl text-orange-600">
                  {upper_title}
                </p>
                <p className="text-4xl font-bold md:text-7xl">{title}</p>
                <p className="mt-2 text-sm md:text-lg">{text}</p>
                <button className="text-lg md:text-2xl bg-black text-white py-2 px-5 mt-10 hover:bg-zinc-800">
                  Shop Now
                </button>
              </div>
              <div className="order-1 lg:order-2">
                <Image
                  className="h-80 w-80 object-cover lg:w-[500px] lg:h-[500px]"
                  width={500}
                  height={500}
                  src="https://images.unsplash.com/photo-1615397349754-cfa2066a298e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
                  alt="Product"
                />
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="grid lg:grid-cols-2 items-center justify-items-center gap-5">
              <div className="order-2 lg:order-1 flex flex-col justify-center items-center">
                <p className="text-4xl font-bold md:text-7xl text-orange-600">
                  {upper_title}
                </p>
                <p className="text-4xl font-bold md:text-7xl">{title}</p>
                <p className="mt-2 text-sm md:text-lg">{text}</p>
                <button className="text-lg md:text-2xl bg-black text-white py-2 px-5 mt-10 hover:bg-zinc-800">
                  Shop Now
                </button>
              </div>
              <div className="order-1 lg:order-2">
                <Image
                  className="h-80 w-80 object-cover lg:w-[500px] lg:h-[500px]"
                  width={500}
                  height={500}
                  src="https://images.unsplash.com/photo-1615397349754-cfa2066a298e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
                  alt="Product"
                />
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default HomeHeros;
