import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { getCartTotal } from "../utils/cart";

export function OrderConfirmationPage() {
    const location = useLocation();
    let order = location.state?.order;

    if (!order) {
        try {
            const saved = localStorage.getItem("lastOrder");
            order = saved ? JSON.parse(saved) : null;
        } catch {
            order = null;
        }
    }

    useEffect(() => {
        return () => {
            localStorage.removeItem("lastOrder");
        };
    }, []);

    if (!order) {
        return (
            <div className="p-6 text-center">
                <h2 className="text-xl font-bold text-red-600">
                    Your order could not be found. It may have expired or the page was refreshed.
                </h2>
                <Link to="/" className="text-blue-600 underline">Go back to products</Link>
            </div>
        );
    }

    const { id, items, customer, createdAt } = order;

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold text-green-600">Order Confirmed!</h1>

        {/* ORDER INFO */}
        <div className="border p-4 rounded">
            <p><strong>Order ID:</strong> {id}</p>
            <p><strong>Date:</strong> {new Date(createdAt).toLocaleString()}</p>
        </div>

        {/* CUSTOMER INFO */}
        {customer && (<div className="border p-4 rounded">
            <h2 className="font-semibold mb-2">Customer Details</h2>
            <p>{customer.name}</p>
            <p>{customer.email}</p>
            <p>{customer.address}</p>
        </div>
        )}

        {/* ORDER SUMMARY */}
        <div className="border p-4 rounded">
            <h2 className="font-semibold mb-2">Order Summary</h2>

            {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm mb-1">
                <span>{item.title} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
            ))}

            <div className="mt-2 text-right font-bold">
                Total: ${getCartTotal(items).toFixed(2)}
            </div>
        </div>

        {/* ACTION */}
        <Link to="/" className="block text-center bg-blue-600 text-white py-2 rounded"
        > Continue Shopping
        </Link>
        </div>
    );
}