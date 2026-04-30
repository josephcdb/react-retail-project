import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../api/products";
import { useCart } from "../hooks/useCart";

export function ProductDetailPage() {
  const { id } = useParams();
  const { dispatch } = useCart();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
  });

  if (isLoading) return <p>Loading product...</p>;
  if (error) return <p>Product not found</p>;
  if (!product) return <p>No product data</p>;

  return (
    <div className="max-w-3xl mx-auto">
      <img src={product.image} alt={product.title} />

      <h1 className="text-2xl font-bold mt-4">
        {product.title}
      </h1>

      <p className="text-gray-500">{product.category}</p>

      <p className="mt-2">{product.description}</p>

      <p className="text-lg font-semibold mt-4">
        ${product.price.toFixed(2)}
      </p>

      <button
        onClick={() =>
          dispatch({ type: "ADD_ITEM", payload: product })
        }
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}