import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useSearchProducts } from "@/hooks/use-products";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "All";

  const { data: results = [], isLoading } = useSearchProducts(query);

  const filtered = category !== "All"
    ? results.filter((p) => p.category.toLowerCase() === category.toLowerCase())
    : results;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-4">
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {isLoading ? "Searching..." : (
              <>
                {filtered.length} results for <span className="font-bold text-amazon-orange">"{query}"</span>
                {category !== "All" && <span> in {category}</span>}
              </>
            )}
          </p>
        </div>
        {!isLoading && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
            {filtered.length === 0 && query && (
              <div className="text-center py-16">
                <h2 className="text-xl font-bold text-foreground">No results found</h2>
                <p className="text-muted-foreground mt-2">Try checking your spelling or use more general terms</p>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SearchResults;
