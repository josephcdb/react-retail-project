import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { getCartTotal } from "../utils/cart";

export function CheckoutPage() {
  const { items, dispatch } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    ShippingAddress: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:5174/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          customer: form,
        }),
      });

      if (!res.ok) {
        throw new Error("Order failed");
      }

      const data = await res.json();
      setSuccess(data);

      // clear cart after success
      dispatch({ type: "CLEAR_CART" });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold text-green-600">
          Order Confirmed
        </h2>
        <p>Order ID: {success.id}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">

      <h1 className="text-2xl font-bold">Checkout</h1>

      {/* CART SUMMARY */}
      <div className="border p-4 rounded">
        <h2 className="font-semibold mb-2">Order Summary</h2>

        {items.length === 0 ? (
          <p className="text-gray-500">Cart is empty</p>
        ) : (
          <>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.title} × {item.quantity}
                </span>
                <span>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}

            <div className="mt-2 font-bold">
              Total: ${getCartTotal(items).toFixed(2)}
            </div>
          </>
        )}
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />

        <input
          name="email"
          placeholder="Enter your email address"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />

        <textarea
          name="address"
          placeholder="Enter your shipping address"
          value={form.address}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />

        <button
          disabled={loading || items.length === 0}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>

        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}
      </form>
    </div>
  );
}