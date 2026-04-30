import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { getCartCount, getCartTotal } from "../utils/cart";

export function Header() {
  const { items, dispatch } = useCart();
  const { isAuthenticated, user, dispatch: authDispatch } = useAuth();
  const [open, setOpen] = useState(false);

  const updateQty = (item, delta) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: {
        id: item.id,
        quantity: item.quantity + delta,
      },
    });
  };

  return (
    <header className="flex justify-between items-center p-4 border-b mb-6 relative">
      <Link to="/" className="font-bold text-xs sm:text-sm">React Retail Page</Link>
      <nav className="flex items-center gap-2 sm:gap-4 text-sm sm:text-base relative">
        <Link to="/" className="whitespace-nowrap">Products</Link>
        <Link to="/cart" className="whitespace-nowrap">Cart ({getCartCount(items)})</Link>

        {isAuthenticated ? (
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-xs sm:text-sm">
            Welcome, {user?.name}
          </span>

          <button onClick={() => authDispatch({ type: "LOGOUT" })}
            className="text-red-600 text-xs sm:text-sm"
          > Logout
          </button>
        </div>
        ) : (
        <Link to="/login" className="whitespace-nowrap">Login</Link>
        )}
      </nav>
    </header>
  );
}