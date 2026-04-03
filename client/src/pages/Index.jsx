import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryTiles from "@/components/CategoryTiles";
import DealStrip from "@/components/DealStrip";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <HeroCarousel />
        <CategoryTiles />
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
          <DealStrip title="Today's Deals" filter="deals" />
          <DealStrip title="Best in Electronics" category="Electronics" />
          <DealStrip title="Mobile Phones" category="Mobile Phones" />
          <DealStrip title="Fashion Picks" category="Fashion" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
