import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, MapPin, ChevronDown, Menu } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/authSlice";
import { clearCart } from "@/store/cartSlice";
import api from "@/lib/api";

const navCategories = ["Electronics", "Mobile Phones", "Fashion", "Home & Kitchen", "Books", "Appliances"];
const searchCategories = ["All", ...navCategories];

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector((s) => s.auth);
  const cartItems = useAppSelector((s) => s.cart.items);
  const dispatch = useAppDispatch();

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Real-time search with debounce (300ms)
  const handleSearchInput = (e) => {
    const val = e.target.value;
    setSearchQuery(val);

    clearTimeout(debounceRef.current);
    if (val.trim().length >= 1) {
      debounceRef.current = setTimeout(async () => {
        try {
          const { data } = await api.get("/products/search", { params: { q: val.trim() } });
          setSuggestions(data.slice(0, 8));
          setShowSuggestions(true);
        } catch {
          setSuggestions([]);
        }
      }, 300);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}&category=${encodeURIComponent(selectedCategory)}`);
    }
  };

  const handleSuggestionClick = (product) => {
    setShowSuggestions(false);
    setSearchQuery("");
    navigate(`/product/${product._id}`);
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

        {/* Search with real-time suggestions */}
        <div className="flex-1 relative" ref={searchRef}>
          <form onSubmit={handleSearch} className="flex h-10 rounded-md overflow-hidden">
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
              onChange={handleSearchInput}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              placeholder="Search Amazon.in"
              className="flex-1 px-3 text-sm text-foreground bg-card focus:outline-none"
            />
            <button type="submit" className="bg-amazon-yellow px-3 hover:brightness-95 rounded-r-md">
              <Search size={20} className="text-amazon-dark-text" />
            </button>
          </form>

          {/* Live search suggestions dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-card border border-border rounded-b-md shadow-lg z-50 max-h-96 overflow-y-auto">
              {suggestions.map((product) => (
                <div
                  key={product._id}
                  onClick={() => handleSuggestionClick(product)}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted cursor-pointer border-b border-border/50 transition-colors"
                >
                  <img
                    src={product.image}
                    alt=""
                    className="w-10 h-10 object-contain shrink-0 rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{product.title}</p>
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                  </div>
                  <p className="text-sm font-medium text-amazon-price shrink-0">
                    ₹{product.price.toLocaleString()}
                  </p>
                </div>
              ))}
              <div
                onClick={handleSearch}
                className="px-4 py-2 text-sm text-amazon-blue hover:bg-muted cursor-pointer text-center font-medium"
              >
                See all results for "{searchQuery}"
              </div>
            </div>
          )}
        </div>

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
