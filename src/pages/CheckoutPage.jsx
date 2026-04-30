import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { getCartTotal } from "../utils/cart";
import { createOrder } from "../api/orders";
import { useMutation } from "@tanstack/react-query";

export function CheckoutPage() {
  const { items, dispatch } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });

  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      // persist order
      localStorage.setItem("lastOrder", JSON.stringify(data));

      // clear cart
      dispatch({ type: "CLEAR_CART" });

      // redirect to order confirmation page
      navigate("/order-confirmation", {
        state: { order: data }
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ items, customer: form });
  };

  const handleClear = () => {
    setForm({
      name: "",
      email: "",
      address: "",
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center">Checkout Details</h1>

      {/* CART SUMMARY */}
      <div className="border p-4 rounded">
        <h2 className="font-semibold mb-2">Order Summary</h2>

        {(items.length === 0) ? (
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

            <div className="mt-3 text-right font-bold">
              Total: ${getCartTotal(items).toFixed(2)}
            </div>
          </>
        )}
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="name"
          id="name"
          autoComplete="name"
          placeholder="Enter your name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="w-full border p-2"
          required
        />

        <input name="email"
          type="email" 
          id="email"
          autoComplete="email"
          placeholder="Enter your email address"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="w-full border p-2"
          required
        />

        <textarea name="address"
          id="address"
          autoComplete="address"
          placeholder="Enter your shipping address"
          value={form.address}
          onChange={(e) =>
            setForm({ ...form, address: e.target.value })
          }
          className="w-full border p-2"
          required
        />

        <div className="flex justify-center gap-4 mt-4">
          <button disabled={mutation.isPending || (items.length === 0)}
            aria-disabled={mutation.isPending || items.length === 0}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          > {mutation.isPending ? "Placing Order..." : "Place Order"}
          </button>

          <button type="button"
            aria-disabled={items.length === 0}
            disabled={!form.name.trim() && !form.email.trim() && !form.address.trim()}
            className="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
            onClick={handleClear}
          > Clear
          </button>
        </div>

        {mutation.isError && (
          <p className="text-red-600 text-sm">
            {mutation.error.message}
          </p>
        )}
      </form>
    </div>
  );
}