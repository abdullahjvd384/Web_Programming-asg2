import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { banners } from "@/data/products";

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % banners.length), []);
  const prev = () => setCurrent((c) => (c - 1 + banners.length) % banners.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative w-full h-[200px] md:h-[350px] lg:h-[400px] overflow-hidden bg-foreground/5">
      {banners.map((banner, i) => (
        <img
          key={banner.id}
          src={banner.image}
          alt={banner.alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      {/* Gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      <button onClick={prev} className="absolute left-0 top-0 bottom-16 w-12 flex items-center justify-center hover:bg-foreground/10 transition-colors">
        <ChevronLeft size={36} className="text-foreground" />
      </button>
      <button onClick={next} className="absolute right-0 top-0 bottom-16 w-12 flex items-center justify-center hover:bg-foreground/10 transition-colors">
        <ChevronRight size={36} className="text-foreground" />
      </button>
    </div>
  );
};

export default HeroCarousel;
