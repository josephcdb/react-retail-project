import PropTypes from 'prop-types';

export function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-4">
      <img src={product.image} alt={product.title} />
      <h2>{product.title}</h2>
      <p>{product.category}</p>
      <p>${product.price.toFixed(2)}</p>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};