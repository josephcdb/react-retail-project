import { describe, it, expect } from "vitest";
import { cartReducer, initialState } from "../context/cartReducer";

// Create an unit test to test card reducer
describe("cartReducer", () => {
  it("adds a new item with quantity 1", () => {
    const action = {
      type: "ADD_ITEM",
      payload: { id: 1, name: "Shoes" },
    };

    const state = cartReducer(initialState, action);

    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual({
      id: 1,
      name: "Shoes",
      quantity: 1,
    });
  });

  it("increases quantity if item already exists", () => {
    const startState = {
      items: [{ id: 1, name: "Shoes", quantity: 1 }],
    };

    const action = {
      type: "ADD_ITEM",
      payload: { id: 1, name: "Shoes" },
    };

    const state = cartReducer(startState, action);

    expect(state.items[0].quantity).toBe(2);
  });

  it("removes item from cart", () => {
    const startState = {
      items: [{ id: 1, name: "Shoes", quantity: 2 }],
    };

    const action = {
      type: "REMOVE_ITEM",
      payload: 1,
    };

    const state = cartReducer(startState, action);

    expect(state.items).toHaveLength(0);
  });

  it("updates item quantity", () => {
    const startState = {
      items: [{ id: 1, name: "Shoes", quantity: 1 }],
    };

    const action = {
      type: "UPDATE_QUANTITY",
      payload: { id: 1, quantity: 5 },
    };

    const state = cartReducer(startState, action);

    expect(state.items[0].quantity).toBe(5);
  });

  it("removes item if quantity is set to 0", () => {
    const startState = {
      items: [{ id: 1, name: "Shoes", quantity: 2 }],
    };

    const action = {
      type: "UPDATE_QUANTITY",
      payload: { id: 1, quantity: 0 },
    };

    const state = cartReducer(startState, action);

    expect(state.items).toHaveLength(0);
  });

  it("clears the cart", () => {
    const startState = {
      items: [
        { id: 1, name: "Shoes", quantity: 2 },
        { id: 2, name: "Hat", quantity: 1 },
      ],
    };

    const action = { type: "CLEAR_CART" };
    const state = cartReducer(startState, action);

    expect(state.items).toEqual([]);
  });

  it("returns same state for unknown action", () => {
    const startState = {
      items: [{ id: 1, name: "Shoes", quantity: 1 }],
    };

    const action = { type: "UNKNOWN_ACTION" };
    const state = cartReducer(startState, action);

    expect(state).toEqual(startState);
  });
});