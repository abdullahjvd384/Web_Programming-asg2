import { Link } from "react-router-dom";
import { useCategories } from "@/hooks/use-products";

const CategoryTiles = () => {
  const { data: categories = [], isLoading } = useCategories();

  if (isLoading || categories.length === 0) return null;

  return (
    <div className="relative -mt-24 md:-mt-40 z-10 px-4 pb-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/products?category=${cat.id}`}
            className="bg-card p-4 rounded shadow hover:shadow-md transition-shadow"
          >
            <h3 className="font-bold text-lg text-card-foreground mb-2">{cat.name}</h3>
            <img src={cat.image} alt={cat.name} className="w-full h-40 object-cover rounded" loading="lazy" />
            <p className="amazon-link mt-2 text-sm">See more</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryTiles;
