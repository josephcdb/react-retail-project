import PropTypes from "prop-types";
import { useMemo, useReducer, useEffect } from "react";
import { CartContext } from "./CartContext";
import { cartReducer, initialState } from "./cartReducer";

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialState,
    (initial) => {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : initial;
    }
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  const value = useMemo(() => {
    return {
      items: state.items,
      dispatch,
    };
  }, [state.items]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};