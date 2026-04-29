import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductCard } from "../components/ProductCard";

// Create an integration test to test product card
// create stable mock
const dispatchMock = vi.fn();

// mock hook
vi.mock("../hooks/useCart", () => ({
  useCart: () => ({
    dispatch: dispatchMock,
  }),
}));

describe("ProductCard", () => {
  it("renders product correctly", () => {
    const product = {
      image: "test.jpg",
      title: "Test Product",
      category: "Shoes",
      price: 99.99,
    };

    render(<ProductCard product={product} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  it("dispatches ADD_ITEM on click", async () => {
    const user = userEvent.setup();

    const product = {
      image: "test.jpg",
      title: "Test Product",
      category: "Shoes",
      price: 99.99,
    };

    render(<ProductCard product={product} />);

    await user.click(screen.getByText(/add to cart/i));

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith({
      type: "ADD_ITEM",
      payload: product,
    });
  });
});