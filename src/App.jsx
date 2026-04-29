import { useQuery } from "@tanstack/react-query";

export default function App() {
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5174/api/products");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  if (isLoading) return <p className="p-6 text-slate-600">Loading products…</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error.message}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">React Retail Page</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="border rounded-lg p-4">
            <img src={p.image} alt={p.title} />
            <h2>{p.title}</h2>
            <p>{p.category}</p>
            <p>${p.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
