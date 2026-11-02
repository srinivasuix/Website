import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Sparkles, ChevronRight } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenMemeStudio: () => void;
  currency: 'INR' | 'USD';
  onToggleCurrency: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  onOpenCart,
  onOpenMemeStudio,
  currency,
  onToggleCurrency,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cart.reduce((acc, item) => acc + item.product.priceInr * item.quantity, 0);

  const formattedCartTotal =
    currency === 'INR'
      ? `₹${totalAmount.toLocaleString('en-IN')}`
      : `$${Math.round(totalAmount / 85)}`;

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      {/* Slim Top Ticker Banner - strictly <= 36px high */}
      <div className="bg-zinc-950 border-b border-zinc-800/80 text-xs py-2 px-4 text-center tracking-wide text-zinc-400">
        <div className="flex items-center justify-center gap-3">
          <span className="font-semibold text-zinc-200">DROP 04 LIVE</span>
          <span className="text-zinc-600">·</span>
          <span>Free Express Shipping across India on orders above ₹999</span>
          <span className="text-zinc-600 hidden sm:inline">·</span>
          <span className="hidden sm:inline text-amber-400/90 font-medium">Cash on Delivery (COD) Available</span>
        </div>
      </div>

      {/* Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (4-5 Nav Links) — Zone 3 (1 Primary Action) */}
      <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="group text-left text-2xl font-black tracking-tighter text-white whitespace-nowrap shrink-0 flex items-center gap-1.5 focus:outline-none"
          >
            <span className="font-display tracking-tight text-white group-hover:text-amber-400 transition-colors">
              BAWAAL<span className="text-amber-400">.</span>
            </span>
          </button>

          {/* Zone 2: 4-5 single-line clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-zinc-300">
            <button
              onClick={() => handleLinkClick('collection')}
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              The Drop
            </button>
            <button
              onClick={() => handleLinkClick('meme-studio')}
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Drip Studio</span>
            </button>
            <button
              onClick={() => handleLinkClick('street-reels')}
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Street Reels
            </button>
            <button
              onClick={() => handleLinkClick('fabric-specs')}
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              240 GSM Specs
            </button>
            <button
              onClick={() => handleLinkClick('reviews')}
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Desi Reviews
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action + Currency toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onToggleCurrency}
              className="hidden sm:inline-flex items-center px-2.5 py-1.5 text-xs font-mono-num text-zinc-400 hover:text-white border border-zinc-800 rounded hover:border-zinc-700 transition-colors"
              title="Toggle INR / USD currency"
            >
              {currency === 'INR' ? '₹ INR' : '$ USD'}
            </button>

            <button
              onClick={onOpenCart}
              className="flex items-center gap-2.5 px-4 py-2 bg-amber-400 text-zinc-950 hover:bg-amber-300 text-xs font-bold uppercase tracking-wider rounded transition-all active:scale-95 shadow-md shadow-amber-500/10 whitespace-nowrap shrink-0"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Bag</span>
              <span className="font-mono-num bg-zinc-950/20 px-1.5 py-0.5 rounded text-[11px]">
                {totalItems}
              </span>
              {totalItems > 0 && (
                <span className="hidden md:inline font-mono-num pl-1 text-[11px] font-semibold border-l border-zinc-950/30">
                  {formattedCartTotal}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-400 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-zinc-950 border-b border-zinc-800 px-6 py-6 space-y-4">
            <div className="space-y-3">
              <button
                onClick={() => handleLinkClick('collection')}
                className="w-full flex items-center justify-between text-left py-2 text-base font-medium text-zinc-200 hover:text-white border-b border-zinc-900"
              >
                <span>The Drop (Drop 04)</span>
                <ChevronRight className="w-4 h-4 text-zinc-500" />
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMemeStudio();
                }}
                className="w-full flex items-center justify-between text-left py-2 text-base font-medium text-amber-400 hover:text-amber-300 border-b border-zinc-900"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Custom Drip Studio</span>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-500" />
              </button>
              <button
                onClick={() => handleLinkClick('street-reels')}
                className="w-full flex items-center justify-between text-left py-2 text-base font-medium text-zinc-200 hover:text-white border-b border-zinc-900"
              >
                <span>Street Reels (Mumbai & BLR)</span>
                <ChevronRight className="w-4 h-4 text-zinc-500" />
              </button>
              <button
                onClick={() => handleLinkClick('fabric-specs')}
                className="w-full flex items-center justify-between text-left py-2 text-base font-medium text-zinc-200 hover:text-white border-b border-zinc-900"
              >
                <span>240 GSM Fabric Guide</span>
                <ChevronRight className="w-4 h-4 text-zinc-500" />
              </button>
              <button
                onClick={() => handleLinkClick('reviews')}
                className="w-full flex items-center justify-between text-left py-2 text-base font-medium text-zinc-200 hover:text-white border-b border-zinc-900"
              >
                <span>Customer Reviews</span>
                <ChevronRight className="w-4 h-4 text-zinc-500" />
              </button>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-zinc-400">
              <span>Display Currency:</span>
              <button
                onClick={onToggleCurrency}
                className="px-3 py-1 font-mono-num text-zinc-200 bg-zinc-900 border border-zinc-800 rounded"
              >
                {currency === 'INR' ? '₹ INR (India)' : '$ USD (Global)'}
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
