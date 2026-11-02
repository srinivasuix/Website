import React from 'react';
import { Star, ShieldCheck, MapPin } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/products';

export const CustomerReviews: React.FC = () => {
  return (
    <section id="reviews" className="py-16 bg-zinc-950 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800/80 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
              <span>Street Verified Feedback</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-400">100% Real Buyers Across India</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display uppercase">
              What The Cult Says
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl">
              From tech founders in Bengaluru to indie filmmakers in Mumbai, read how our 240 GSM heavy French Terry stands up to real desi life.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-zinc-900/60 border border-zinc-800 px-4 py-3 rounded-xl">
            <div className="text-center border-r border-zinc-800 pr-4">
              <div className="text-2xl font-black text-white font-mono-num">4.9</div>
              <div className="flex items-center justify-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400" />
                ))}
              </div>
            </div>
            <div className="text-xs text-zinc-400">
              <div>Based on <strong>1,840+ verified</strong> deliveries</div>
              <div className="text-emerald-400 font-medium">98.4% Would Recommend</div>
            </div>
          </div>
        </div>

        {/* 3 Attributable Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CUSTOMER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-zinc-900/40 rounded-xl border border-zinc-800 p-6 flex flex-col justify-between space-y-4 hover:border-zinc-700 transition-colors"
            >
              <div className="space-y-3">
                {/* Rating & Verified Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>

                  <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Buyer</span>
                  </span>
                </div>

                {/* Headline & Body */}
                <h4 className="text-sm font-bold text-white font-display leading-snug">
                  "{rev.headline}"
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              {/* Author & Product Tag Footer */}
              <div className="pt-4 border-t border-zinc-800/80 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-zinc-200">{rev.author}</span>
                  <span className="text-[11px] text-zinc-500 font-mono-num">{rev.date}</span>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-zinc-400">
                  <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>{rev.city}</span>
                </div>

                <div className="text-[11px] text-amber-400/90 font-mono-num truncate pt-0.5">
                  Purchased: {rev.productTitle} (Size {rev.sizeBought})
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
