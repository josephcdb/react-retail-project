import { Routes, Route } from "react-router-dom";
import { ProductsPage } from "./pages/ProductsPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { LoginPage } from "./pages/LoginPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Header } from "./components/Header";

export default function App() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <Header />
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/checkout" element=
          {
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}