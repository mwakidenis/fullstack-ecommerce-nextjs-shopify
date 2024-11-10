"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Interface for banner slide data structure
interface BannerSlide {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  image: string;
}

// Banner slide content
// TODO: Move to CMS or API once available
const bannerData: BannerSlide[] = [
  {
    id: 1,
    title: "Winter Collection 2024",
    subtitle: "Discover the latest trends in winter fashion",
    buttonText: "Shop Now",
    buttonLink: "/product-category/mens",
    image:
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Be the first to try our newest products",
    buttonText: "Explore",
    buttonLink: "/product-category/womens",
    image:
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
  }
];

// Home page hero banner component with auto-sliding carousel
export function HomeHeroBanner() {
  // Track current slide index and animation state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Memoize the nextSlide function
  const nextSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % bannerData.length);
    }
  }, [isAnimating]);

  // Memoize the prevSlide function
  const prevSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide(
        (prev) => (prev - 1 + bannerData.length) % bannerData.length
      );
    }
  }, [isAnimating]);

  // Set up auto-advance timer
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Handle animation cooldown
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <div className="relative overflow-hidden bg-background">
      {/* Main carousel container */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {/* Render all slides */}
        {bannerData.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 w-full h-full transition-transform duration-500 ease-in-out",
              // Position slides based on current index
              index === currentSlide
                ? "translate-x-0"
                : index < currentSlide
                  ? "-translate-x-full"
                  : "translate-x-full"
            )}
          >
            {/* Slide background with overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Slide content with animations */}
            <div className="relative h-full max-w-[1200px] mx-auto px-4 flex items-center">
              <div className="max-w-xl text-white">
                <h2 className="text-5xl font-bold mb-4 animate-fade-up [animation-delay:200ms]">
                  {slide.title}
                </h2>
                <p className="text-xl mb-6 animate-fade-up [animation-delay:400ms]">
                  {slide.subtitle}
                </p>
                <Button
                  size="lg"
                  className="animate-fade-up [animation-delay:600ms]"
                  asChild
                >
                  <a href={slide.buttonLink}>{slide.buttonText}</a>
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center backdrop-blur-sm transition-all"
          disabled={isAnimating}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center backdrop-blur-sm transition-all"
          disabled={isAnimating}
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Slide indicator dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
          {bannerData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === currentSlide
                  ? "bg-white w-6"
                  : "bg-white/60 hover:bg-white/80"
              )}
              disabled={isAnimating}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
