import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomeHeros from "./home-heros";

// Mock the next/image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  }
}));

// Mock the Carousel components
jest.mock("../components/ui/carousel", () => ({
  Carousel: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="carousel">{children}</div>
  ),
  CarouselContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="carousel-content">{children}</div>
  ),
  CarouselItem: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="carousel-item">{children}</div>
  ),
  CarouselNext: () => <button>Next</button>,
  CarouselPrevious: () => <button>Previous</button>
}));

describe("HomeHeros", () => {
  it("renders the carousel with correct content", () => {
    render(<HomeHeros />);

    // Check if the carousel components are rendered
    expect(screen.getByTestId("carousel")).toBeInTheDocument();
    expect(screen.getByTestId("carousel-content")).toBeInTheDocument();
    expect(screen.getAllByTestId("carousel-item")).toHaveLength(2);

    // Check if the first carousel item is rendered
    expect(screen.getByText("New Arrivals")).toBeInTheDocument();
    expect(screen.getByText("Summer Collection")).toBeInTheDocument();
    expect(
      screen.getByText("Explore our latest summer collection.")
    ).toBeInTheDocument();

    // Check if the second carousel item is rendered
    expect(screen.getByText("Best Sellers")).toBeInTheDocument();
    expect(screen.getByText("Winter Collection")).toBeInTheDocument();
    expect(
      screen.getByText("Check out our best-selling winter collection.")
    ).toBeInTheDocument();

    // Check if the "Shop Now" button is present
    expect(screen.getAllByText("Shop Now")).toHaveLength(2);

    // Check if images are rendered
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute("alt", "Product 1");
    expect(images[1]).toHaveAttribute("alt", "Product 2");
  });

  it("applies correct styling to elements", () => {
    render(<HomeHeros />);

    const upperTitles = screen.getAllByText(/New Arrivals|Best Sellers/);
    upperTitles.forEach((title) => {
      expect(title).toHaveClass(
        "text-4xl font-bold md:text-7xl text-orange-600"
      );
    });

    const shopNowButtons = screen.getAllByText("Shop Now");
    shopNowButtons.forEach((button) => {
      expect(button).toHaveClass(
        "text-lg md:text-2xl bg-black text-white py-2 px-5 mt-10 hover:bg-zinc-800"
      );
    });
  });
});
