import { useCart } from "../hooks/useCart";
import { getCartTotal } from "../utils/cart";
import { useAuth } from "../hooks/useAuth";

export function CheckoutPage() {
  const { items } = useCart();
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Checkout</h2>

      <p className="mb-4">Logged in as: {user?.name}</p>

      {items.map((item) => (
        <div key={item.id}>
          {item.title} × {item.quantity}
        </div>
      ))}

      <hr className="my-4" />

      <p>Total: ${getCartTotal(items).toFixed(2)}</p>

      <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
        Place Order
      </button>
    </div>
  );
}