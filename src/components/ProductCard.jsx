import PropTypes from 'prop-types';
import { useCart } from "../hooks/useCart";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export function ProductCard({ product }) {
  const { dispatch } = useCart();

  return (
    <div className="border text-center rounded-lg p-4">
      <Link to={`/products/${product.id}`}>
        <img src={product.image} alt={product.title} />
        <h2><b>{product.title}</b></h2>
      </Link>
      <p>{product.category}</p>
      <p>${product.price.toFixed(2)}</p>
      <button onClick={() => {
          dispatch({ type: "ADD_ITEM", payload: product });
          toast.success(`${product.title} added to cart`);
        }}
        className="mt-2 w-full text-center bg-blue-600 text-white px-3 py-1 rounded"
        aria-label={`Add ${product.title} to cart`}
      > Add to Cart
      </button>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};