import React, { useState } from 'react';
import { ShoppingBag, Eye, Star, Flame } from 'lucide-react';
import { Product, Size } from '../types';

interface ProductCardProps {
  product: Product;
  currency: 'INR' | 'USD';
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: Size) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  onQuickView,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<Size>('L');
  const [isHovered, setIsHovered] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  const formattedPrice =
    currency === 'INR'
      ? `₹${product.priceInr.toLocaleString('en-IN')}`
      : `$${Math.round(product.priceInr / 85)}`;

  const formattedOriginalPrice =
    currency === 'INR'
      ? `₹${product.originalPriceInr.toLocaleString('en-IN')}`
      : `$${Math.round(product.originalPriceInr / 85)}`;

  const discountPercent = Math.round(
    ((product.originalPriceInr - product.priceInr) / product.originalPriceInr) * 100
  );

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 1800);
  };

  const currentStock = product.stockLeft[selectedSize] ?? 4;
  const isLowStock = currentStock <= 3;

  return (
    <div
      onClick={() => onQuickView(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col bg-zinc-900/60 rounded-xl border border-zinc-800/80 hover:border-zinc-700 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 cursor-pointer"
    >
      {/* Product Image Stage (65-75% height) */}
      <div className="relative aspect-[4/3] bg-zinc-950 overflow-hidden">
        <img
          src={isHovered && product.hoverImage ? product.hoverImage : product.image}
          alt={product.title}
          className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Subtle Top Tag (max 1 tag, unboxed clean text) */}
        {product.tags?.[0] && (
          <div className="absolute top-3 left-3 bg-zinc-950/85 backdrop-blur-md border border-zinc-800 px-2.5 py-1 text-[11px] font-semibold text-amber-400 tracking-wider uppercase rounded">
            {product.tags[0]}
          </div>
        )}

        {/* Quick View trigger on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="px-4 py-2 bg-zinc-950/90 hover:bg-zinc-900 text-white border border-zinc-700 text-xs font-semibold rounded flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>Quick View Specs</span>
          </button>
        </div>
      </div>

      {/* Card Body & Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Unboxed Metadata Line (§1.A Zero-Pill) */}
        <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
          <span>{product.fabricGsm} GSM French Terry</span>
          <span aria-hidden="true" className="text-zinc-600">·</span>
          <span>{product.fit}</span>
        </div>

        {/* Title & Meme Punchline */}
        <div className="space-y-1">
          <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1 font-display">
            {product.title}
          </h3>
          <p className="text-xs text-zinc-400 font-normal line-clamp-1">
            "{product.punchline}"
          </p>
        </div>

        {/* Price & Rating Row */}
        <div className="flex items-baseline justify-between pt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-black text-white font-mono-num">
              {formattedPrice}
            </span>
            <span className="line-through text-xs text-zinc-500 font-mono-num">
              {formattedOriginalPrice}
            </span>
            <span className="text-emerald-400 text-xs font-semibold">
              -{discountPercent}%
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs text-zinc-400">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="font-mono-num text-zinc-300 font-semibold">{product.rating}</span>
            <span className="text-[11px] text-zinc-500">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Size Selection Row & Quick Add Button */}
        <div className="pt-2 border-t border-zinc-800/80 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400 font-medium">Size (Oversized):</span>
            {isLowStock ? (
              <span className="text-amber-400 text-[11px] font-semibold flex items-center gap-1">
                <Flame className="w-3 h-3" />
                <span>Only {currentStock} left in {selectedSize}</span>
              </span>
            ) : (
              <span className="text-emerald-400 text-[11px]">In Stock</span>
            )}
          </div>

          {/* Size Pills (Functional Button Segmented Control) */}
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {product.sizes.map((sz) => {
              const isSelected = selectedSize === sz;
              return (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setSelectedSize(sz)}
                  className={`flex-1 py-1.5 text-xs font-mono-num font-semibold rounded transition-colors ${
                    isSelected
                      ? 'bg-amber-400 text-zinc-950 font-bold'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
                  }`}
                >
                  {sz}
                </button>
              );
            })}
          </div>

          {/* Add to Cart CTA */}
          <button
            type="button"
            onClick={handleAdd}
            className={`w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-all cursor-pointer ${
              addedNotice
                ? 'bg-emerald-500 text-zinc-950'
                : 'bg-zinc-800 hover:bg-amber-400 hover:text-zinc-950 text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{addedNotice ? 'Added to Bag!' : `Add Size ${selectedSize} to Bag`}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
