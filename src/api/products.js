export async function fetchProducts() {
  const res = await fetch("http://localhost:5174/api/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchProduct(id) {
  const res = await fetch(`http://localhost:5174/api/products/${id}`);
  if (!res.ok) throw new Error("Product not found");
  return res.json();
}