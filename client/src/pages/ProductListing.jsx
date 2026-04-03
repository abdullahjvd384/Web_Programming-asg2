import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { LayoutGrid, List } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useProducts, useCategories } from "@/hooks/use-products";

const ProductListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category") || "";
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("relevance");
  const [primeOnly, setPrimeOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);

  const { data: products = [], isLoading } = useProducts(categoryFilter || undefined);
  const { data: categories = [] } = useCategories();

  const filtered = useMemo(() => {
    let result = [...products];
    if (primeOnly) result = result.filter((p) => p.isPrime);
    if (minRating > 0) result = result.filter((p) => p.rating >= minRating);

    switch (sortBy) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "reviews": result.sort((a, b) => b.reviewCount - a.reviewCount); break;
    }
    return result;
  }, [products, sortBy, primeOnly, minRating]);

  const categoryName = categories.find((c) => c.id === categoryFilter)?.name || "All Products";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-4">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside className="hidden md:block w-56 shrink-0">
            <div className="sticky top-32 space-y-6">
              <div>
                <h3 className="font-bold text-foreground mb-2">Category</h3>
                <ul className="space-y-1">
                  <li>
                    <button onClick={() => setSearchParams({})} className={`text-sm ${!categoryFilter ? "font-bold text-foreground" : "amazon-link"}`}>
                      All
                    </button>
                  </li>
                  {categories.map((c) => (
                    <li key={c.id}>
                      <button
                        onClick={() => setSearchParams({ category: c.id })}
                        className={`text-sm ${categoryFilter === c.id ? "font-bold text-foreground" : "amazon-link"}`}
                      >
                        {c.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">Customer Review</h3>
                {[4, 3, 2, 1].map((r) => (
                  <button key={r} onClick={() => setMinRating(r)} className={`block text-sm py-0.5 ${minRating === r ? "font-bold" : ""} text-amazon-star`}>
                    {"★".repeat(r)}{"☆".repeat(5 - r)} & Up
                  </button>
                ))}
                <button onClick={() => setMinRating(0)} className="text-xs amazon-link mt-1">Clear</button>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm text-foreground">
                  <input type="checkbox" checked={primeOnly} onChange={(e) => setPrimeOnly(e.target.checked)} className="accent-amazon-orange" />
                  Prime Eligible
                </label>
              </div>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div>
                <h1 className="text-xl font-bold text-foreground">{categoryName}</h1>
                <p className="text-sm text-muted-foreground">{filtered.length} results</p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border border-border rounded px-2 py-1 bg-card text-foreground"
                >
                  <option value="relevance">Sort by: Relevance</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Avg. Customer Review</option>
                  <option value="reviews">Most Reviews</option>
                </select>
                <div className="flex gap-1">
                  <button onClick={() => setViewMode("grid")} className={`p-1.5 rounded ${viewMode === "grid" ? "bg-amazon-dark text-secondary-foreground" : "text-muted-foreground"}`}>
                    <LayoutGrid size={18} />
                  </button>
                  <button onClick={() => setViewMode("list")} className={`p-1.5 rounded ${viewMode === "list" ? "bg-amazon-dark text-secondary-foreground" : "text-muted-foreground"}`}>
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>
            {isLoading ? (
              <div className="text-center py-16 text-muted-foreground">Loading products...</div>
            ) : (
              <>
                <div className={viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" : "space-y-4"}>
                  {filtered.map((p) => (
                    <ProductCard key={p._id} product={p} viewMode={viewMode} />
                  ))}
                </div>
                {filtered.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductListing;
