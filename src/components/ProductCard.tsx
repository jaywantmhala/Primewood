"use client";
import Link from "next/link";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export function ProductCard({ product, showPrice = true }: { product: Product; showPrice?: boolean }) {
  const { addToCart } = useCart();

  // Dynamically parse warranty from product description
  const warrantyMatch = product.description.match(/(\d+)-Years? Warranty/i);
  const warrantyText = warrantyMatch ? `${warrantyMatch[1]} year warranty` : "3 year warranty";

  return (
    <div className="bg-white hover-scale relative group flex flex-col h-full rounded-2xl overflow-hidden p-2">
      {/* Image Container with premium warm beige studio background and responsive height */}
      <div className="relative h-[340px] sm:h-[380px] md:h-[420px] lg:h-[440px] xl:h-[460px] bg-[#f5f1eb]/70 rounded-xl overflow-hidden mb-3 flex-shrink-0 flex items-center justify-center">
        <Link href={`/product/${product.id}`} className="absolute inset-0 w-full h-full">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out" 
          />
        </Link>

        {/* Top-Left Warranty Badge (matching the screenshot exactly) */}
        <div className="absolute top-4 left-4 bg-[#eae3db] text-[#5e5347] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-sm z-10 shadow-sm">
          {warrantyText}
        </div>

        {/* Bottom-Left Rating Pill (overlaying the image container) */}
        <div className="absolute bottom-4 left-4 bg-[#dfd7cd]/90 text-[#4c3f32] text-[10px] font-extrabold px-2 py-1 rounded-sm flex items-center space-x-1 z-10">
          <span>★</span>
          <span>{product.rating.toFixed(1)}</span>
        </div>

        {/* Bottom-Right Wishlist Heart Button inside a white circle */}
        <button className="absolute bottom-4 right-4 bg-white hover:bg-gray-50 text-gray-700 hover:text-red-500 rounded-full w-9 h-9 shadow-md flex items-center justify-center transition-all duration-300 hover:scale-105 z-10">
          <i className="far fa-heart text-base"></i>
        </button>
      </div>

      {/* Product Details Section */}
      <div className="px-2 pb-2 flex-grow flex flex-col justify-between">
        <div className="flex items-start justify-between gap-3 mt-1">
          {/* Left Column: Title and subtitle/description */}
          <div className="flex-1 space-y-1">
            <Link href={`/product/${product.id}`}>
              <h3 className="font-semibold text-gray-900 hover:text-primary leading-snug text-[15px] md:text-[16px] line-clamp-2 transition-colors">
                {product.name}
              </h3>
            </Link>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Right Column: Prices stack (only visible when showPrice is true) */}
          {showPrice && (
            <div className="flex flex-col items-end text-right flex-shrink-0 min-w-[80px]">
              <span className="text-base md:text-[17px] font-extrabold text-gray-900">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through mt-0.5">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
              {product.discount && (
                <span className="text-xs text-red-500 font-bold mt-1 text-[11px] uppercase tracking-wider">
                  {product.discount.replace(" OFF", " off")}
                </span>
              )}
            </div>
          )}
        </div>

        {/* direct Add to Cart only when showPrice is true (retaining utility while maintaining catalog aesthetic on grids) */}
        {showPrice && (
          <button 
            onClick={() => addToCart(product.id, 1)} 
            className="w-full mt-4 bg-white border-2 border-primary text-primary font-bold py-2 rounded-lg hover:bg-primary hover:text-white transition duration-300"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

