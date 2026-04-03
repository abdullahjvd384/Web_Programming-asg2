import { Link } from "react-router-dom";
import { useProducts } from "@/hooks/use-products";
import ProductCard from "@/components/ProductCard";

const DealStrip = ({ title, category, filter }) => {
  const { data: products = [], isLoading } = useProducts(category);

  let displayed = products.slice(0, 4);
  if (filter === "deals") {
    displayed = products.filter((p) => p.discount >= 30).slice(0, 4);
  }

  if (isLoading) {
    return (
      <div className="bg-card p-4 rounded shadow">
        <h2 className="font-bold text-xl text-card-foreground mb-3">{title}</h2>
        <div className="text-center py-8 text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (displayed.length === 0) return null;

  return (
    <div className="bg-card p-4 rounded shadow">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-xl text-card-foreground">{title}</h2>
        <Link to={`/products${category ? `?category=${category}` : ""}`} className="amazon-link">See all deals</Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {displayed.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default DealStrip;
