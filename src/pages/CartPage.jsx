import { useCart } from "../hooks/useCart";
import { getCartTotal } from "../utils/cart";
import { useNavigate } from "react-router-dom";

export function CartPage() {
  const { items, dispatch } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">Cart is empty</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Your Cart</h1>

      {items.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center border p-3 rounded"
        >
          <div>
            <p className="font-medium">{item.title}</p>
            <p className="text-sm text-gray-500">
              ${item.price.toFixed(2)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                dispatch({
                  type: "UPDATE_QUANTITY",
                  payload: {
                    id: item.id,
                    quantity: item.quantity - 1,
                  },
                })
              }
              className="px-2 bg-gray-200 rounded"
            >
              -
            </button>

            <span>{item.quantity}</span>

            <button
              onClick={() =>
                dispatch({
                  type: "UPDATE_QUANTITY",
                  payload: {
                    id: item.id,
                    quantity: item.quantity + 1,
                  },
                })
              }
              className="px-2 bg-gray-200 rounded"
            >
              +
            </button>

            <button
              onClick={() =>
                dispatch({ type: "REMOVE_ITEM", payload: item.id })
              }
              className="text-red-600 text-sm ml-3"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="text-right font-bold text-lg">
        Total: ${getCartTotal(items).toFixed(2)}
      </div>

      <button
        onClick={() => navigate("/checkout")}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}