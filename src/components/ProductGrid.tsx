import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Product, CategoryId, Size } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  currency: 'INR' | 'USD';
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: Size) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  currency,
  onQuickView,
  onAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: CategoryId; label: string; count: number }[] = [
    { id: 'all', label: 'All Meme Drops', count: products.length },
    { id: 'bollywood', label: 'Bollywood Cult', count: products.filter(p => p.category === 'bollywood').length },
    { id: 'techbro', label: 'Startup & Tech Bro', count: products.filter(p => p.category === 'techbro').length },
    { id: 'genz', label: 'Viral Gen-Z Desi', count: products.filter(p => p.category === 'genz').length },
    { id: 'darkhumor', label: 'Midnight Dark Humor', count: products.filter(p => p.category === 'darkhumor').length },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        const matchesSearch =
          searchQuery.trim() === '' ||
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.punchline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceInr - b.priceInr;
        if (sortBy === 'price-desc') return b.priceInr - a.priceInr;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, sortBy, searchQuery]);

  return (
    <section id="collection" className="py-16 bg-zinc-950 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800/80 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
              <span>Drop 04 · Active Batch</span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-400">Strictly 240+ GSM Combed Terry</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display uppercase">
              The Meme Vault
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl">
              Each t-shirt is screenprinted with high-density micro puff inks that don't crack.
              Cut in our signature oversized drop-shoulder boxy pattern.
            </p>
          </div>

          {/* Quick Search & Sort Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search meme e.g. Paisa, Bengaluru..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs text-zinc-300 focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-zinc-900 text-white">Featured Drops</option>
                <option value="price-asc" className="bg-zinc-900 text-white">Price: Low to High</option>
                <option value="price-desc" className="bg-zinc-900 text-white">Price: High to Low</option>
                <option value="rating" className="bg-zinc-900 text-white">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Tabs (Segmented Button Control §1.A) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-semibold rounded whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-zinc-950 font-bold shadow-sm'
                    : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-800/80'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[11px] font-mono-num px-1.5 py-0.2 rounded ${
                    isActive ? 'bg-zinc-950/20 text-zinc-950' : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 3-Column Desktop Grid (§2.A 3-column with gap-8) */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currency={currency}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-zinc-900/40 rounded-xl border border-zinc-800 p-8 space-y-4">
            <p className="text-zinc-400 text-sm">
              No meme t-shirt found matching "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-amber-400 text-zinc-950 text-xs font-bold rounded uppercase cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
