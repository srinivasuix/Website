import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { MemeStudio } from './components/MemeStudio';
import { StreetReels } from './components/StreetReels';
import { FabricSpecs } from './components/FabricSpecs';
import { CustomerReviews } from './components/CustomerReviews';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { PRODUCTS } from './data/products';
import { Product, CartItem, Size } from './types';
import { ShoppingBag, Sparkles, Check } from 'lucide-react';

export default function App() {
  // Pre-seed cart with 1 bestseller so users immediately experience the rich cart interactions
  const [cart, setCart] = useState<CartItem[]>(() => {
    return [
      {
        id: 'initial-item-1',
        productId: 'tee-paisa-double',
        product: PRODUCTS[0],
        size: 'L',
        quantity: 1,
      },
    ];
  });

  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [activeSection, setActiveSection] = useState('hero');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddToCart = (product: Product, size: Size = 'L', quantity: number = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.size === size && !item.isCustom
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          id: `item-${Date.now()}-${Math.random()}`,
          productId: product.id,
          product,
          size,
          quantity,
        };
        return [...prev, newItem];
      }
    });

    showToast(`Added ${product.title} (Size ${size}) to Bag!`);
  };

  const handleAddCustomTee = (customData: {
    title: string;
    punchline: string;
    placement: 'front' | 'back';
    fontStyle: string;
    colorTone: string;
    size: Size;
    priceInr: number;
  }) => {
    const customProduct: Product = {
      id: `custom-${Date.now()}`,
      title: customData.title,
      punchline: customData.punchline,
      category: 'genz',
      priceInr: customData.priceInr,
      originalPriceInr: 2299,
      image: PRODUCTS[0].image,
      hoverImage: PRODUCTS[1].image,
      fit: 'Oversized Boxy Custom Cut',
      fabricGsm: 240,
      composition: '100% Super-Combed French Terry Cotton',
      printType: `Custom Micro-Puff (${customData.colorTone})`,
      description: `Custom one-off meme tee made in Meme Studio. Slogan: "${customData.title}" in ${customData.fontStyle} typography.`,
      sizes: [customData.size],
      stockLeft: { S: 1, M: 1, L: 1, XL: 1, XXL: 1 },
      rating: 5.0,
      reviewsCount: 1,
      tags: ['Custom Drip', '1-of-1', '240 GSM'],
    };

    const newItem: CartItem = {
      id: `custom-item-${Date.now()}`,
      productId: customProduct.id,
      product: customProduct,
      size: customData.size,
      quantity: 1,
      isCustom: true,
      customText: customData.title,
      customPlacement: customData.placement,
    };

    setCart((prev) => [...prev, newItem]);
    setIsCartOpen(true);
    showToast(`Custom Tee "${customData.title}" added to Bag!`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOrderSuccess = () => {
    setCart([]);
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    if (id === 'meme-studio') {
      const el = document.getElementById('meme-studio');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'collection') {
      const el = document.getElementById('collection');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'street-reels') {
      const el = document.getElementById('street-reels');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'fabric-specs') {
      const el = document.getElementById('fabric-specs');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'reviews') {
      const el = document.getElementById('reviews');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      
      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-zinc-900/95 border border-amber-400/80 text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 backdrop-blur-md animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar adhering to Top Bar Contract */}
      <Navbar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMemeStudio={() => scrollToSection('meme-studio')}
        currency={currency}
        onToggleCurrency={() => setCurrency(currency === 'INR' ? 'USD' : 'INR')}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Centerpiece Hero Section */}
        <Hero
          onShopDrop={() => scrollToSection('collection')}
          onOpenMemeStudio={() => scrollToSection('meme-studio')}
          onQuickView={(p) => setQuickViewProduct(p)}
          featuredProduct={PRODUCTS[0]}
        />

        {/* Featured Product Grid (Drop 04) */}
        <ProductGrid
          products={PRODUCTS}
          currency={currency}
          onQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={(p, sz) => handleAddToCart(p, sz, 1)}
        />

        {/* Interactive Meme Drip Studio Customizer */}
        <MemeStudio
          currency={currency}
          onAddCustomTee={handleAddCustomTee}
        />

        {/* Lifestyle Lookbook & Street Reels Showcase */}
        <StreetReels
          onQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={(p) => handleAddToCart(p, 'L', 1)}
        />

        {/* 240 GSM Fabric Engineering & Comparison */}
        <FabricSpecs />

        {/* Authentic Customer Reviews & Social Proof */}
        <CustomerReviews />
      </main>

      {/* Quiet Anti-Slop Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      {/* Sticky Bottom Bar for Mobile (<15% mobile viewport cap §1.I) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800 px-4 py-2.5 flex items-center justify-between gap-3 shadow-2xl">
        <button
          onClick={() => scrollToSection('collection')}
          className="flex-1 py-2 bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-200 rounded flex items-center justify-center gap-1.5"
        >
          <span>Drop 04 Vault</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex-1 py-2 bg-amber-400 text-zinc-950 text-xs font-bold uppercase rounded flex items-center justify-center gap-1.5 shadow-md shadow-amber-400/20 active:scale-95"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Bag ({totalCartCount})</span>
        </button>
      </div>

      {/* Product Detail Modal (PDP Contiguous Purchase Module) */}
      <ProductDetailModal
        product={quickViewProduct}
        currency={currency}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p, sz, qty) => handleAddToCart(p, sz, qty)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      {/* Cart Slide-Out Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Checkout Modal (UPI & COD) */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        currency={currency}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Size Guide & Fit Advisor Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

    </div>
  );
}
