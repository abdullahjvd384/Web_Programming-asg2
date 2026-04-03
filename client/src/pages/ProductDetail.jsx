import { useParams, Link, useNavigate } from "react-router-dom";
import { Star, ShieldCheck, Truck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useProduct } from "@/hooks/use-products";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: product, isLoading } = useProduct(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Product not found</h1>
            <Link to="/products" className="amazon-link mt-4 block">Browse all products</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ id: product._id, title: product.title, price: product.price, image: product.image, isPrime: product.isPrime }));
    toast.success("Added to cart");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        <p className="text-xs text-muted-foreground mb-4">
          <Link to="/" className="amazon-link">Home</Link> &gt;{" "}
          <Link to={`/products?category=${product.category}`} className="amazon-link">{product.category}</Link> &gt;{" "}
          <span className="text-foreground">{product.title}</span>
        </p>
        <div className="bg-card rounded p-6 flex flex-col md:flex-row gap-8">
          {/* Image */}
          <div className="md:w-2/5 flex items-center justify-center bg-card p-4">
            <img src={product.image} alt={product.title} className="max-h-96 object-contain" />
          </div>

          {/* Details */}
          <div className="md:w-2/5 flex-1">
            <h1 className="text-xl md:text-2xl text-card-foreground">{product.title}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={16} className={i < Math.floor(product.rating) ? "fill-amazon-star text-amazon-star" : "text-muted-foreground"} />
                ))}
              </div>
              <span className="amazon-link text-sm">{product.reviewCount.toLocaleString()} ratings</span>
            </div>
            <hr className="my-3 border-border" />
            {product.discount > 0 && <p className="text-amazon-deal text-sm">-{product.discount}%</p>}
            <div className="flex items-baseline gap-1">
              <span className="text-sm align-top">₹</span>
              <span className="text-3xl font-medium text-foreground">{product.price.toLocaleString()}</span>
            </div>
            {product.originalPrice > product.price && (
              <p className="text-sm text-muted-foreground">M.R.P.: <span className="line-through">₹{product.originalPrice.toLocaleString()}</span></p>
            )}
            {product.isPrime && (
              <div className="flex items-center gap-2 mt-2">
                <span className="prime-badge">prime</span>
                <span className="text-sm text-muted-foreground">FREE Delivery</span>
              </div>
            )}
            <p className="text-sm text-amazon-green font-medium mt-3">{product.inStock ? "In stock" : "Out of stock"}</p>
            <p className="text-sm text-foreground mt-4">{product.description}</p>
          </div>

          {/* Buy Box */}
          <div className="md:w-1/5 border border-border rounded p-4 space-y-3 h-fit">
            <p className="text-lg amazon-price">₹{product.price.toLocaleString()}</p>
            {product.isPrime && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Truck size={16} /> FREE Delivery
              </div>
            )}
            <p className={`text-sm font-medium ${product.inStock ? "text-amazon-green" : "text-amazon-deal"}`}>
              {product.inStock ? "In stock" : "Out of stock"}
            </p>
            <button onClick={handleAddToCart} className="amazon-btn w-full">Add to Cart</button>
            <button onClick={handleBuyNow} className="amazon-btn-orange w-full">Buy Now</button>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <ShieldCheck size={14} /> Secure transaction
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
