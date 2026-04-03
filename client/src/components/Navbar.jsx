import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, MapPin, ChevronDown, Menu } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/authSlice";
import { clearCart } from "@/store/cartSlice";

const navCategories = ["Electronics", "Mobile Phones", "Fashion", "Home & Kitchen", "Books", "Appliances"];
const searchCategories = ["All", ...navCategories];

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector((s) => s.auth);
  const cartItems = useAppSelector((s) => s.cart.items);
  const dispatch = useAppDispatch();

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}&category=${encodeURIComponent(selectedCategory)}`);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-amazon-nav flex items-center px-2 md:px-4 py-2 gap-2">
        <Link to="/" className="flex items-center px-2 py-1 border border-transparent hover:border-secondary-foreground rounded shrink-0">
          <span className="text-secondary-foreground font-bold text-xl tracking-tight">amazon</span>
          <span className="text-amazon-orange font-bold text-xl">.in</span>
        </Link>

        <div className="hidden md:flex items-center px-2 py-1 border border-transparent hover:border-secondary-foreground rounded cursor-pointer shrink-0">
          <MapPin size={16} className="text-secondary-foreground" />
          <div className="ml-1">
            <p className="text-xs text-muted-foreground leading-none">Deliver to</p>
            <p className="text-sm font-bold text-secondary-foreground leading-tight">Mumbai 400001</p>
          </div>
        </div>

        <form onSubmit={handleSearch} className="flex flex-1 h-10 rounded-md overflow-hidden">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="hidden md:block bg-muted text-foreground text-xs px-2 border-r border-border rounded-l-md focus:outline-none"
          >
            {searchCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Amazon.in"
            className="flex-1 px-3 text-sm text-foreground bg-card focus:outline-none"
          />
          <button type="submit" className="bg-amazon-yellow px-3 hover:brightness-95 rounded-r-md">
            <Search size={20} className="text-amazon-dark-text" />
          </button>
        </form>

        <div className="hidden md:block">
          {isAuthenticated ? (
            <div className="px-2 py-1 border border-transparent hover:border-secondary-foreground rounded cursor-pointer group relative">
              <p className="text-xs text-muted-foreground leading-none">Hello, {user?.name?.split(" ")[0]}</p>
              <p className="text-sm font-bold text-secondary-foreground leading-tight flex items-center">
                Account & Lists <ChevronDown size={12} className="ml-1" />
              </p>
              <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-md shadow-lg p-3 min-w-[180px] hidden group-hover:block z-50">
                <Link to="/cart" className="block text-sm text-foreground hover:text-amazon-orange py-1">Cart</Link>
                <button onClick={handleLogout} className="w-full text-left text-sm text-foreground hover:text-amazon-orange py-1">
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Link to="/signin" className="px-2 py-1 border border-transparent hover:border-secondary-foreground rounded block">
              <p className="text-xs text-muted-foreground leading-none">Hello, Sign in</p>
              <p className="text-sm font-bold text-secondary-foreground leading-tight flex items-center">
                Account & Lists <ChevronDown size={12} className="ml-1" />
              </p>
            </Link>
          )}
        </div>

        <Link to="/products" className="hidden md:block px-2 py-1 border border-transparent hover:border-secondary-foreground rounded">
          <p className="text-xs text-muted-foreground leading-none">Returns</p>
          <p className="text-sm font-bold text-secondary-foreground leading-tight">& Orders</p>
        </Link>

        <Link to="/cart" className="flex items-center px-2 py-1 border border-transparent hover:border-secondary-foreground rounded relative">
          <div className="relative">
            <ShoppingCart size={28} className="text-secondary-foreground" />
            <span className="absolute -top-1 right-0 text-amazon-orange font-bold text-sm">{cartCount}</span>
          </div>
          <span className="text-sm font-bold text-secondary-foreground ml-1 hidden md:inline">Cart</span>
        </Link>
      </div>

      <div className="bg-amazon-nav-secondary flex items-center px-4 py-1.5 gap-3 overflow-x-auto text-sm text-secondary-foreground">
        <Link to="/products" className="flex items-center gap-1 hover:brightness-125 shrink-0 font-bold">
          <Menu size={18} /> All
        </Link>
        {navCategories.map((cat) => (
          <Link key={cat} to={`/products?category=${encodeURIComponent(cat)}`} className="hover:brightness-125 shrink-0">
            {cat}
          </Link>
        ))}
        <Link to="/products" className="hover:brightness-125 shrink-0">Today's Deals</Link>
        <Link to="/products" className="hover:brightness-125 shrink-0">Prime</Link>
      </div>
    </header>
  );
};

export default Navbar;
