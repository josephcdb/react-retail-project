import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../api/products";
import { useCart } from "../hooks/useCart";
import toast from "react-hot-toast";

export function ProductDetailPage() {
  const { id } = useParams();
  const { dispatch } = useCart();
  const navigate = useNavigate();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
  });

  if (isLoading) return <p>Loading product...</p>;
  if (error) return <p>Product not found</p>;
  if (!product) return <p>No product data</p>;

  return (
    <div className="flex justify-center">
      <div className="max-w-3xl w-full text-center">
        <img className="mx-auto" src={product.image} alt={product.title} />
        <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
        <p className="text-gray-500">{product.category}</p>
        <p className="mt-2">{product.description}</p>
        <p className="text-lg font-semibold mt-4">${product.price.toFixed(2)}</p>
        <div className="flex justify-center gap-4 mt-4">
          <button onClick={() => {
            dispatch({ type: "ADD_ITEM", payload: product });
            toast.success(`${product.title} added to cart`);
          }}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          aria-label={`Add ${product.title} to cart`}
          > Add to Cart
          </button>
          <button onClick={() => navigate('/')}
            className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded"
            aria-label="Return back to product page"
          > Return back to products
          </button>
        </div>
      </div>
    </div>
  );
}