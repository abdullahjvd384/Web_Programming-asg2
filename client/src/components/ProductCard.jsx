import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";
import { toast } from "sonner";

const ProductCard = ({ product, viewMode = "grid" }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({
      id: product._id,
      title: product.title,
      price: product.price,
      image: product.image,
      isPrime: product.isPrime,
    }));
    toast.success("Added to cart");
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={i < Math.floor(rating) ? "fill-amazon-star text-amazon-star" : "text-muted-foreground"}
      />
    ));
  };

  if (viewMode === "list") {
    return (
      <Link to={`/product/${product._id}`} className="flex gap-4 bg-card p-4 rounded border border-border hover:shadow-md transition-shadow">
        <img src={product.image} alt={product.title} className="w-48 h-48 object-cover rounded shrink-0" loading="lazy" />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg text-amazon-blue hover:text-amazon-orange hover:underline line-clamp-2">{product.title}</h3>
          <div className="flex items-center gap-1 mt-1">
            {renderStars(product.rating)}
            <span className="text-amazon-blue text-sm ml-1">{product.reviewCount.toLocaleString()}</span>
          </div>
          <div className="mt-2">
            <span className="amazon-price text-2xl">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <>
                <span className="text-muted-foreground text-sm line-through ml-2">₹{product.originalPrice.toLocaleString()}</span>
                <span className="text-amazon-deal text-sm ml-2">({product.discount}% off)</span>
              </>
            )}
          </div>
          {product.isPrime && <span className="prime-badge">prime</span>}
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
          <button onClick={handleAddToCart} className="amazon-btn mt-3">Add to Cart</button>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/product/${product._id}`} className="bg-card rounded border border-border hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      <div className="relative p-4 bg-card flex items-center justify-center h-52">
        <img src={product.image} alt={product.title} className="max-h-full object-contain" loading="lazy" />
        {product.discount > 0 && (
          <span className="absolute top-2 left-2 bg-amazon-deal text-destructive-foreground text-xs font-bold px-2 py-0.5 rounded">
            {product.discount}% off
          </span>
        )}
      </div>
      <div className="p-3 flex-1 flex flex-col">
        <h3 className="text-sm text-card-foreground hover:text-amazon-orange line-clamp-2 flex-1">{product.title}</h3>
        <div className="flex items-center gap-0.5 mt-1">
          {renderStars(product.rating)}
          <span className="text-amazon-blue text-xs ml-1">{product.reviewCount.toLocaleString()}</span>
        </div>
        <div className="mt-1">
          <span className="amazon-price text-lg">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-muted-foreground text-xs line-through ml-1">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
        {product.isPrime && <span className="prime-badge">prime</span>}
        <button onClick={handleAddToCart} className="amazon-btn mt-2 w-full text-center">Add to Cart</button>
      </div>
    </Link>
  );
};

export default ProductCard;
