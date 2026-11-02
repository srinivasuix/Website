import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles, ArrowRight, ShieldCheck, Truck, RefreshCw, Eye } from 'lucide-react';
import { Product } from '../types';

interface HeroProps {
  onShopDrop: () => void;
  onOpenMemeStudio: () => void;
  onQuickView: (product: Product) => void;
  featuredProduct: Product;
}

const REELS = [
  {
    id: 'mumbai-alley',
    title: 'Midnight in Bandra Alleyways',
    tag: 'Mumbai Street Series',
    image: '/src/assets/images/hero_urban_streetwear_1793627355150.jpg',
    model: 'Tara & Kabir · 5\'10" & 6\'1" wearing Size L',
    teeName: '25 Din Mein Paisa Double',
    teePrice: '₹1,299',
    vibe: 'Heavyweight 240 GSM drop-shoulder drape under city neon',
  },
  {
    id: 'colaba-street',
    title: 'Chai Sutta & Late Night Shakes',
    tag: 'Colaba Causeway',
    image: '/src/assets/images/lookbook_street_model_1793627358197.jpg',
    model: 'Rohan V. · 5\'11" wearing Size XL',
    teeName: 'Weapon of Mass Distraction',
    teePrice: '₹1,499',
    vibe: 'Raw 35mm grain, vintage wash terry cotton',
  },
  {
    id: 'studio-macro',
    title: 'High-Density Puff Texture',
    tag: 'Studio Macro Lab',
    image: '/src/assets/images/tee_paisa_double_1793627356304.jpg',
    model: 'Studio Flat-lay on Black Raw Slate',
    teeName: 'Paisa Double Investment Club',
    teePrice: '₹1,299',
    vibe: 'Zero-crack plastisol puff screenprint with metallic rupee ink',
  },
];

export const Hero: React.FC<HeroProps> = ({
  onShopDrop,
  onOpenMemeStudio,
  onQuickView,
  featuredProduct,
}) => {
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Auto reel cycling when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveReelIndex((prev) => (prev + 1) % REELS.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentReel = REELS[activeReelIndex];

  return (
    <section className="relative overflow-hidden bg-zinc-950 border-b border-zinc-800">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Brand Statement & Conversion Engine */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            {/* Clean unboxed metadata kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase">
              <span>Drop 04 Live</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-300">Edition of 240 Units</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-400">Made in Tirupur, India</span>
            </div>

            {/* Display Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase font-display leading-[1.05]">
                Desi Memes<span className="text-amber-400">.</span>
                <br />
                <span className="text-zinc-100">Heavyweight</span>
                <br />
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">
                  Street Drip.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-zinc-400 max-w-xl font-normal leading-relaxed pt-2">
                India's cult meme apparel brand engineered on 240+ GSM combed French Terry cotton.
                No flimsy polyester. No peeling stickers. Pure unadulterated desi internet chaos.
              </p>
            </div>

            {/* Price & Guarantee Callout */}
            <div className="pt-1 flex flex-wrap items-center gap-4 text-xs text-zinc-400">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-white font-mono-num">₹1,299</span>
                <span className="line-through text-zinc-500 font-mono-num text-sm">₹2,199</span>
                <span className="text-emerald-400 font-semibold">(41% OFF)</span>
              </div>
              <span className="text-zinc-700">|</span>
              <span className="text-zinc-300 font-medium">Free Shipping above ₹999</span>
              <span className="text-zinc-700">|</span>
              <span className="text-amber-400 font-medium">COD Available</span>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onShopDrop}
                className="px-6 py-3.5 bg-amber-400 text-zinc-950 hover:bg-amber-300 font-bold text-sm tracking-wide uppercase rounded flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-amber-400/10 cursor-pointer"
              >
                <span>Shop The Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenMemeStudio}
                className="px-5 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 hover:border-zinc-500 font-semibold text-sm rounded flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Custom Drip Studio</span>
              </button>
            </div>

            {/* Quick Reel Selector Tabs */}
            <div className="pt-4 border-t border-zinc-800/80">
              <div className="text-xs uppercase tracking-wider text-zinc-300 mb-2 font-semibold">
                Lookbook Switcher
              </div>
              <div className="flex items-center gap-2">
                {REELS.map((reel, idx) => (
                  <button
                    key={reel.id}
                    onClick={() => setActiveReelIndex(idx)}
                    className={`px-3 py-1.5 text-xs font-medium rounded transition-all cursor-pointer text-left ${
                      activeReelIndex === idx
                        ? 'bg-zinc-800 text-white border border-amber-400/50 shadow-sm'
                        : 'bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                    }`}
                  >
                    <span className="font-mono-num text-[11px] text-amber-400/80 mr-1.5">
                      0{idx + 1}
                    </span>
                    <span>{reel.tag}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Immersive Visual Reel Centerpiece */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl group">
              
              {/* Media Reel Frame */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-zinc-950">
                <img
                  src={currentReel.image}
                  alt={currentReel.title}
                  className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />

                {/* Scrim overlay for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-zinc-950/40" />

                {/* Top Overlay Badge Controls */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
                  <div className="bg-zinc-950/80 backdrop-blur-md border border-zinc-800/80 px-3 py-1 rounded text-xs font-medium text-zinc-200 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="uppercase tracking-wider font-semibold text-[11px]">
                      Reel {activeReelIndex + 1}/{REELS.length}
                    </span>
                    <span className="text-zinc-600">·</span>
                    <span className="text-zinc-400">{currentReel.tag}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Play/Pause Reel Loop */}
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-2 rounded bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-zinc-300 hover:text-white transition-colors"
                      title={isPlaying ? 'Pause reel' : 'Play reel'}
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>

                    {/* Ambient Street Vibe Audio Toggle */}
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-2 rounded bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-zinc-300 hover:text-white transition-colors"
                      title={isMuted ? 'Turn street sound ON' : 'Mute street sound'}
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
                    </button>
                  </div>
                </div>

                {/* Bottom Overlay: Direct Outfit Details & Quick Buy */}
                <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/90 backdrop-blur-md border border-zinc-800/90 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pointer-events-auto">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <span className="text-amber-400 font-semibold">{currentReel.teeName}</span>
                      <span className="text-zinc-600">·</span>
                      <span className="font-mono-num text-white font-bold">{currentReel.teePrice}</span>
                    </div>
                    <p className="text-xs text-zinc-400 font-normal line-clamp-1">
                      {currentReel.vibe}
                    </p>
                    <p className="text-[11px] text-zinc-500 font-normal">
                      Model spec: {currentReel.model}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onQuickView(featuredProduct)}
                      className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 rounded flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Specs</span>
                    </button>
                    <button
                      onClick={onShopDrop}
                      className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-bold uppercase tracking-wider rounded transition-all cursor-pointer"
                    >
                      Shop Look
                    </button>
                  </div>
                </div>
              </div>

              {/* Looping Progress Bar */}
              <div className="h-1 bg-zinc-800 w-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 transition-all duration-300"
                  style={{
                    width: `${((activeReelIndex + 1) / REELS.length) * 100}%`,
                  }}
                />
              </div>

            </div>
          </div>

        </div>

        {/* Full-width 4-Column Trust Strip below hero (§13 Spatial Math) */}
        <div className="mt-12 pt-8 border-t border-zinc-800 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-zinc-900 rounded border border-zinc-800 text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">240+ GSM Heavyweight</div>
              <div className="text-xs text-zinc-400">100% Combed French Terry Cotton</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-zinc-900 rounded border border-zinc-800 text-amber-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Pan-India Express (48h)</div>
              <div className="text-xs text-zinc-400">Bluedart & Delhivery to 19,000+ PIN codes</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-zinc-900 rounded border border-zinc-800 text-amber-400 shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">7-Day Free Size Exchange</div>
              <div className="text-xs text-zinc-400">Doorstep pickup with zero hassle</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-zinc-900 rounded border border-zinc-800 text-amber-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Zero-Crack Puff Prints</div>
              <div className="text-xs text-zinc-400">Tested to withstand 100+ machine washes</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
