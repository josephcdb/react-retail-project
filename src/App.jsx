import { ProductsPage } from "./pages/ProductsPage";
import { Cart } from "./components/Cart"

export default function App() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">React Retail Page</h1>
      <Cart />
      <ProductsPage />
    </div>
  );
}