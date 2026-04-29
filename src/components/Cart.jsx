import { useCart } from "../hooks/useCart";
import { getCartTotal, getCartCount } from "../utils/cart";

export function Cart() {
  const { items, dispatch } = useCart();

  if (items.length === 0) {
    return <p className="text-gray-500">Cart is empty 🛒</p>;
  }

  return (
    <div className="p-4 border rounded">
      <h2>Cart ({getCartCount(items)})</h2>

      {items.map((item) => (
        <div key={item.id} className="flex gap-2 items-center mb-2">
          <p className="flex-1">{item.title}</p>
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
              className="cursor-pointer w-8 h-8 flex items-center justify-center rounded text-white bg-blue-600 hover:bg-gray-200 hover:text-gray-700 font-bold"
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
              className="cursor-pointer w-8 h-8 flex items-center justify-center rounded text-white bg-blue-600 hover:bg-gray-200 hover:text-gray-700 font-bold"
            >
              +
            </button>
          </div>

          <button
            onClick={() =>
              dispatch({
                type: "REMOVE_ITEM",
                payload: item.id,
              })
            }
            className="cursor-pointer ml-3 text-sm text-red-600 hover:text-red-800 hover:underline transition"
          >
            Remove
          </button>
        </div>
      ))}

      <hr />

      <p className="mt-2">
        Total: ${getCartTotal(items).toFixed(2)}
      </p>
    </div>
  );
}