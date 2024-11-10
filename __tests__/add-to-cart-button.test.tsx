import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddToCartButton from "@/components/products/cart/add-to-cart-button";
import * as CartContext from "@/providers/cart-context";
import * as Toast from "@/lib/utils/toast";

// Mock the dependencies
jest.mock("@/providers/cart-context", () => ({
  useCartContext: jest.fn()
}));

jest.mock("@/lib/utils/toast", () => ({
  showToast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

// Mock the Lucide icons
jest.mock("lucide-react", () => ({
  ShoppingCart: () => <div data-testid="shopping-cart-icon" />,
  Eye: () => <div data-testid="eye-icon" />,
  Heart: () => <div data-testid="heart-icon" />,
  Plus: () => <div data-testid="plus-icon" />,
  Minus: () => <div data-testid="minus-icon" />
}));

// Test props
const defaultProps = {
  variantId: "test-variant-123",
  availableForSale: true,
  maxQuantity: 10,
  productTitle: "Test Product"
};

describe("AddToCartButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (CartContext.useCartContext as jest.Mock).mockReturnValue({
      addToCart: jest.fn().mockResolvedValue(undefined)
    });
  });

  it("renders the basic add to cart button for product card", () => {
    render(<AddToCartButton {...defaultProps} isProductCard={true} />);

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Add to Cart");
    expect(screen.queryByRole("spinbutton")).not.toBeInTheDocument();
  });

  it("renders quantity selector and add to cart button for detail view", () => {
    render(<AddToCartButton {...defaultProps} />);

    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add to cart/i })
    ).toBeInTheDocument();
  });

  it("renders out of stock button when not available for sale", () => {
    render(<AddToCartButton {...defaultProps} availableForSale={false} />);

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Out of Stock");
    expect(button).toBeDisabled();
  });

  it("updates quantity correctly when using increment/decrement buttons", () => {
    render(<AddToCartButton {...defaultProps} />);

    const input = screen.getByRole("spinbutton") as HTMLInputElement;
    const incrementButton = screen.getByRole("button", {
      name: /increase quantity/i
    });
    const decrementButton = screen.getByRole("button", {
      name: /decrease quantity/i
    });

    // Test increment
    fireEvent.click(incrementButton);
    expect(input.value).toBe("2");

    // Test decrement
    fireEvent.click(decrementButton);
    expect(input.value).toBe("1");
  });

  it("prevents quantity from going below 1 or above maxQuantity", () => {
    render(<AddToCartButton {...defaultProps} maxQuantity={5} />);

    const input = screen.getByRole("spinbutton") as HTMLInputElement;
    const incrementButton = screen.getByRole("button", {
      name: /increase quantity/i
    });
    const decrementButton = screen.getByRole("button", {
      name: /decrease quantity/i
    });

    // Try to go below 1
    fireEvent.click(decrementButton);
    expect(input.value).toBe("1");
    expect(decrementButton).toBeDisabled();

    // Try to go above maxQuantity
    for (let i = 0; i < 6; i++) {
      fireEvent.click(incrementButton);
    }
    expect(input.value).toBe("5");
    expect(incrementButton).toBeDisabled();
  });

  it("handles manual input of quantity correctly", () => {
    render(<AddToCartButton {...defaultProps} maxQuantity={5} />);

    const input = screen.getByRole("spinbutton") as HTMLInputElement;

    // Test valid input
    fireEvent.change(input, { target: { value: "3" } });
    expect(input.value).toBe("3");

    // Test input below minimum
    fireEvent.change(input, { target: { value: "0" } });
    expect(input.value).toBe("1");

    // Test input above maximum
    fireEvent.change(input, { target: { value: "10" } });
    expect(input.value).toBe("5");
  });

  it("successfully adds to cart and shows success toast for product card", async () => {
    const addToCart = jest.fn().mockResolvedValue(undefined);
    (CartContext.useCartContext as jest.Mock).mockReturnValue({ addToCart });

    render(<AddToCartButton {...defaultProps} isProductCard={true} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(addToCart).toHaveBeenCalledWith("test-variant-123", 1);
      expect(Toast.showToast.success).toHaveBeenCalledWith(
        "Test Product added to cart!"
      );
    });
  });

  it("successfully adds to cart and shows success toast with quantity for detail view", async () => {
    const addToCart = jest.fn().mockResolvedValue(undefined);
    (CartContext.useCartContext as jest.Mock).mockReturnValue({ addToCart });

    render(<AddToCartButton {...defaultProps} />);

    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "3" } });

    const button = screen.getByRole("button", { name: /add to cart/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(addToCart).toHaveBeenCalledWith("test-variant-123", 3);
      expect(Toast.showToast.success).toHaveBeenCalledWith(
        "Test Product (3) added to cart!"
      );
    });
  });

  it("handles add to cart failure correctly", async () => {
    const addToCart = jest.fn().mockRejectedValue(new Error("Failed to add"));
    (CartContext.useCartContext as jest.Mock).mockReturnValue({ addToCart });

    render(<AddToCartButton {...defaultProps} />);

    const button = screen.getByRole("button", { name: /add to cart/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(Toast.showToast.error).toHaveBeenCalledWith(
        "Failed to add to cart. Please try again."
      );
    });
  });

  it("handles loading state during add to cart", async () => {
    const addToCart = jest
      .fn()
      .mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );
    (CartContext.useCartContext as jest.Mock).mockReturnValue({ addToCart });

    render(<AddToCartButton {...defaultProps} />);

    const button = screen.getByRole("button", { name: /add to cart/i });
    fireEvent.click(button);

    expect(button).toHaveTextContent("Adding...");
    expect(button).toBeDisabled();

    await waitFor(() => {
      expect(button).toHaveTextContent("Add to Cart");
      expect(button).not.toBeDisabled();
    });
  });

  // Additional test to verify disabled states
  it("disables increment/decrement buttons at quantity limits", () => {
    render(<AddToCartButton {...defaultProps} maxQuantity={5} />);

    const incrementButton = screen.getByRole("button", {
      name: /increase quantity/i
    });
    const decrementButton = screen.getByRole("button", {
      name: /decrease quantity/i
    });

    // Initial state: quantity is 1, decrement should be disabled
    expect(decrementButton).toBeDisabled();
    expect(incrementButton).not.toBeDisabled();

    // Click increment until max quantity
    for (let i = 0; i < 4; i++) {
      fireEvent.click(incrementButton);
    }

    // At max quantity: increment should be disabled
    expect(incrementButton).toBeDisabled();
    expect(decrementButton).not.toBeDisabled();
  });
});
