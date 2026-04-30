import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";

// create stable mock
const dispatchMock = vi.fn();

// mock hook
vi.mock("../hooks/useCart", () => ({
  useCart: () => ({
    dispatch: dispatchMock,
  }),
}));

const renderWithRouter = (ui) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

// Create an integration test to test 2 test suites on product card
describe("ProductCard", () => {
  // Test Suite 1: Make sure it renders product correctly
  it("renders product correctly", () => {
    const product = {
      image: "test.jpg",
      title: "Test Product",
      category: "Shoes",
      price: 99.99,
    };

    renderWithRouter(<ProductCard product={product} />);
    
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  // Test Suite 2: Make sure a product can be added upon clicking "Add to Cart" button
  it("dispatches ADD_ITEM on click", async () => {
    const user = userEvent.setup();

    const product = {
      image: "test.jpg",
      title: "Test Product",
      category: "Shoes",
      price: 99.99,
    };

    renderWithRouter(<ProductCard product={product} />);
    
    const button = screen.getByRole("button", {
      name: new RegExp(`add ${product.title} to cart`, "i")
    });

    await user.click(button);

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith({
      type: "ADD_ITEM",
      payload: product,
    });
  });
});