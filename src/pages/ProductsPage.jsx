import { useProducts } from "../hooks/useProducts";
import { ProductGrid } from "../components/ProductGrid";

export function ProductsPage() {
  const { data: products = [], isLoading, error } = useProducts();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  return <ProductGrid products={products} />;
}