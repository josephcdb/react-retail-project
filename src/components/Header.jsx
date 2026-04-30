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
        <button onClick={() => setOpen(!open)} className="relative whitespace-nowrap">
          Cart ({getCartCount(items)})
        </button>

        {isAuthenticated ? (
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-xs sm:text-sm">
            Welcome, {user?.name}
          </span>

          <button
            onClick={() => authDispatch({ type: "LOGOUT" })}
            className="text-red-600 text-xs sm:text-sm"
          >
          Logout
          </button>
        </div>
        ) : (
        <Link to="/login" className="whitespace-nowrap">Login</Link>
        )}

        {/* DROPDOWN */}
        {open && (
          <div className="absolute right-0 top-10 w-64 sm:w-72 bg-white border shadow-lg p-3 rounded z-50">
            <h3 className="font-bold mb-2">Cart</h3>
            {items.length === 0 && (
              <p className="text-sm text-gray-500">
                Cart is empty
              </p>
            )}

            <div className="space-y-3 max-h-64 overflow-auto">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-start text-sm py-2 border-b last:border-b-0"
                >
                  <div className="flex-1">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-gray-500">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(item, -1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item, 1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 border-t pt-2 text-sm">
              <p className="font-semibold">
                Total: ${getCartTotal(items).toFixed(2)}
              </p>
            </div>

            <Link
              to="/checkout"
              onClick={() => setOpen(false)}
              className="block mt-2 text-center bg-blue-600 text-white py-1 rounded"
            >
              Go to Checkout
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}