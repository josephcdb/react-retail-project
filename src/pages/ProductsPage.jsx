import { useProducts } from "../hooks/useProducts";
import { ProductGrid } from "../components/ProductGrid";

export function ProductsPage() {
  const { data: products = [], isLoading, error } = useProducts();

  if (isLoading) {
    return <p className="animate-pulse text-gray-500">Loading product...</p>
  }
  
  if (error) {
    return <p className="text-red-600">Error loading products. Please try again!</p>
  }
  
  if (products.length === 0) {
    return <p className="text-gray-500">No products available.</p>
  }

  return <ProductGrid products={products} />;
}