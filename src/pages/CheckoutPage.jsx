import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { getCartTotal } from "../utils/cart";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../api/orders";

export function CheckoutPage() {
  const { items, dispatch } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });

  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      dispatch({ type: "CLEAR_CART" });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate({
      items,
      customer: form,
    });
  };

  if (mutation.isSuccess) {
    return (
      <div className="p-6">
        <h2 className="text-green-600 text-xl font-bold">
          Order Confirmed
        </h2>

        <p>Order ID: {mutation.data.id}</p>
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
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="w-full border p-2"
          required
        />

        <input
          name="email"
          placeholder="Enter your Email Address"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="w-full border p-2"
          required
        />

        <textarea
          name="address"
          placeholder="Enter your Shipping Address"
          value={form.address}
          onChange={(e) =>
            setForm({ ...form, address: e.target.value })
          }
          className="w-full border p-2"
          required
        />

        <button
          disabled={mutation.isPending || items.length === 0}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {mutation.isPending ? "Placing Order..." : "Place Order"}
        </button>

        {mutation.isError && (
          <p className="text-red-600 text-sm">
            {mutation.error.message}
          </p>
        )}
      </form>
    </div>
  );
}