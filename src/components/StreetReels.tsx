import React, { useState } from 'react';
import { Heart, MapPin, ShoppingBag, Eye, Play } from 'lucide-react';
import { STREET_REELS, PRODUCTS } from '../data/products';
import { Product } from '../types';

interface StreetReelsProps {
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const StreetReels: React.FC<StreetReelsProps> = ({ onQuickView, onAddToCart }) => {
  const [likesState, setLikesState] = useState<Record<string, { count: number; liked: boolean }>>({
    'reel-1': { count: 14200, liked: false },
    'reel-2': { count: 19800, liked: false },
    'reel-3': { count: 28400, liked: true },
    'reel-4': { count: 11500, liked: false },
  });

  const toggleLike = (reelId: string) => {
    setLikesState((prev) => {
      const current = prev[reelId] || { count: 1000, liked: false };
      return {
        ...prev,
        [reelId]: {
          count: current.liked ? current.count - 1 : current.count + 1,
          liked: !current.liked,
        },
      };
    });
  };

  return (
    <section id="street-reels" className="py-16 bg-zinc-950 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800/80 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
              <span>Street Editorial Lookbook</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-400">Captured in Mumbai, BLR & Delhi</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display uppercase">
              Street Reels
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl">
              Real desi streetwear heads styling our 240 GSM drops across urban Indian alleyways, midnight chai taps, and tech corridors.
            </p>
          </div>

          <div className="text-xs text-zinc-400 flex items-center gap-2">
            <span>Tag us on IG:</span>
            <span className="font-bold text-amber-400">@bawaal.co #BawaalStreet</span>
          </div>
        </div>

        {/* 4-Column Vertical Reel Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STREET_REELS.map((reel) => {
            const product = PRODUCTS.find((p) => p.id === reel.productId) || PRODUCTS[0];
            const likeData = likesState[reel.id] || { count: 1000, liked: false };

            return (
              <div
                key={reel.id}
                className="group relative aspect-[9/14] sm:aspect-[9/15] rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-xl transition-all duration-300 hover:border-zinc-700 hover:-translate-y-1"
              >
                {/* Reel Lifestyle Background Image */}
                <img
                  src={reel.image}
                  alt={reel.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Dark Gradient Scrim Overlay for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-zinc-950/40" />

                {/* Top Location & Model Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 bg-zinc-950/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] text-zinc-300 border border-zinc-800">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span className="truncate max-w-[150px]">{reel.location}</span>
                  </div>

                  {/* Like Button with Real-time Count */}
                  <button
                    onClick={() => toggleLike(reel.id)}
                    className="flex items-center gap-1 bg-zinc-950/80 backdrop-blur-md px-2 py-1 rounded text-[11px] font-mono-num text-zinc-300 border border-zinc-800 transition-colors"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        likeData.liked ? 'text-red-500 fill-red-500' : 'text-zinc-400'
                      }`}
                    />
                    <span>{(likeData.count / 1000).toFixed(1)}k</span>
                  </button>
                </div>

                {/* Play Simulation Indicator */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-zinc-950/60 backdrop-blur-md border border-zinc-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-5 h-5 text-amber-400 ml-0.5 fill-amber-400" />
                </div>

                {/* Bottom Card Content & Action Bar */}
                <div className="absolute bottom-4 left-4 right-4 space-y-3">
                  <div className="space-y-1">
                    <div className="text-[11px] font-mono-num text-amber-400 uppercase tracking-wider">
                      {reel.model}
                    </div>
                    <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">
                      {reel.title}
                    </h3>
                    <p className="text-[11px] text-zinc-400 line-clamp-1">
                      {reel.vibe}
                    </p>
                  </div>

                  {/* Direct Buy Strip */}
                  <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onQuickView(product)}
                      className="flex-1 py-1.5 px-2 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 text-xs font-semibold rounded border border-zinc-700 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3 h-3 text-amber-400" />
                      <span>Details</span>
                    </button>

                    <button
                      onClick={() => onAddToCart(product)}
                      className="flex-1 py-1.5 px-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-bold uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Cop Fit</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
