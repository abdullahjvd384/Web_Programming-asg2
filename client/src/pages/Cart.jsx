import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { removeFromCart, updateQuantity, clearCart } from "@/store/cartSlice";

const Cart = () => {
  const { items } = useAppSelector((s) => s.cart);
  const { isAuthenticated } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="bg-card p-6 rounded">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-card-foreground">Shopping Cart</h1>
                {items.length > 0 && (
                  <button onClick={() => dispatch(clearCart())} className="text-sm amazon-link">
                    Clear Cart
                  </button>
                )}
              </div>
              <p className="text-sm text-muted-foreground text-right mb-2">Price</p>
              <hr className="border-border" />

              {items.length === 0 ? (
                <div className="py-12 text-center">
                  <h2 className="text-xl text-foreground">Your Amazon Cart is empty</h2>
                  <Link to="/products" className="amazon-link mt-2 block">Shop today's deals</Link>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 py-4">
                      <Link to={`/product/${item.id}`}>
                        <img src={item.image} alt={item.title} className="w-32 h-32 object-cover rounded" />
                      </Link>
                      <div className="flex-1">
                        <Link to={`/product/${item.id}`} className="text-card-foreground hover:text-amazon-orange">
                          {item.title}
                        </Link>
                        {item.isPrime && <p className="prime-badge mt-1">prime</p>}
                        <p className="text-sm text-amazon-green mt-1">In stock</p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center border border-border rounded">
                            <button
                              onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                              className="px-2 py-1 hover:bg-muted text-foreground"
                            >
                              −
                            </button>
                            <span className="px-3 py-1 bg-muted text-sm font-medium text-foreground">{item.quantity}</span>
                            <button
                              onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                              className="px-2 py-1 hover:bg-muted text-foreground"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-muted-foreground">|</span>
                          <button onClick={() => dispatch(removeFromCart(item.id))} className="amazon-link text-sm">
                            Delete
                          </button>
                        </div>
                      </div>
                      <p className="amazon-price text-lg font-bold shrink-0">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              )}
              {items.length > 0 && (
                <p className="text-right text-lg mt-4 text-foreground">
                  Subtotal ({itemCount} items): <span className="font-bold">₹{subtotal.toLocaleString()}</span>
                </p>
              )}
            </div>
          </div>

          {/* Subtotal Box */}
          {items.length > 0 && (
            <div className="lg:w-72 shrink-0">
              <div className="bg-card p-4 rounded border border-border sticky top-32">
                <p className="text-lg text-foreground">
                  Subtotal ({itemCount} items):{" "}
                  <span className="font-bold">₹{subtotal.toLocaleString()}</span>
                </p>
                {isAuthenticated ? (
                  <button className="amazon-btn w-full mt-4">Proceed to Buy</button>
                ) : (
                  <Link to="/signin" className="amazon-btn w-full mt-4 block text-center">
                    Sign in to Checkout
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
