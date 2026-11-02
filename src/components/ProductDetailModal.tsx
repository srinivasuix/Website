import React, { useState } from 'react';
import { X, Star, ShoppingBag, Truck, ShieldCheck, RefreshCw, Sparkles, MapPin, Check } from 'lucide-react';
import { Product, Size } from '../types';
import { PINCODE_DATABASE } from '../data/products';

interface ProductDetailModalProps {
  product: Product | null;
  currency: 'INR' | 'USD';
  onClose: () => void;
  onAddToCart: (product: Product, size: Size, quantity: number) => void;
  onOpenSizeGuide: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  currency,
  onClose,
  onAddToCart,
  onOpenSizeGuide,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<Size>('L');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image);
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState<{ city: string; days: number } | null>(null);
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

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pincode.trim();
    if (cleanPin in PINCODE_DATABASE) {
      setPincodeResult(PINCODE_DATABASE[cleanPin]);
    } else if (cleanPin.length === 6 && /^\d+$/.test(cleanPin)) {
      setPincodeResult({ city: 'All India Metros', days: 3 });
    } else {
      setPincodeResult(null);
    }
  };

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
    }, 1200);
  };

  const currentStock = product.stockLeft[selectedSize] ?? 5;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors border border-zinc-800"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column: Product Gallery */}
          <div className="md:col-span-6 p-6 sm:p-8 bg-zinc-900/30 border-b md:border-b-0 md:border-r border-zinc-800 flex flex-col gap-4">
            {/* Main Stage */}
            <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800">
              <img
                src={activeImage}
                alt={product.title}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold text-amber-400 border border-zinc-800 rounded uppercase">
                {product.tags[0] || 'Drop 04'}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveImage(product.image)}
                className={`w-16 h-16 rounded-lg overflow-hidden border transition-all ${
                  activeImage === product.image ? 'border-amber-400 ring-1 ring-amber-400' : 'border-zinc-800 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={product.image} alt="Front View" className="w-full h-full object-cover" />
              </button>

              {product.hoverImage && (
                <button
                  onClick={() => setActiveImage(product.hoverImage!)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border transition-all ${
                    activeImage === product.hoverImage ? 'border-amber-400 ring-1 ring-amber-400' : 'border-zinc-800 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={product.hoverImage} alt="Lifestyle Angle" className="w-full h-full object-cover" />
                </button>
              )}
            </div>

            {/* Fabric Snapshot */}
            <div className="mt-auto pt-4 border-t border-zinc-800/80 text-xs text-zinc-400 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Fabric Weight:</span>
                <span className="font-semibold text-white">{product.fabricGsm} GSM French Terry</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Print Execution:</span>
                <span className="font-semibold text-white">{product.printType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Silicone Bio-Wash:</span>
                <span className="font-semibold text-emerald-400">Yes · Pre-Shrunk</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            
            <div className="space-y-4">
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="uppercase tracking-wider font-semibold text-amber-400">
                  {product.category} · Meme Heavyweight
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="font-mono-num text-white font-bold">{product.rating}</span>
                  <span className="text-zinc-500">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title & Punchline */}
              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-black text-white font-display leading-tight">
                  {product.title}
                </h2>
                <p className="text-xs text-zinc-400 italic">
                  "{product.punchline}"
                </p>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-2xl font-black text-white font-mono-num">
                  {formattedPrice}
                </span>
                <span className="line-through text-sm text-zinc-500 font-mono-num">
                  {formattedOriginalPrice}
                </span>
                <span className="text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                  SAVE {discountPercent}%
                </span>
                <span className="text-[11px] text-zinc-500">GST Included</span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {product.description}
              </p>

              {/* Size Selector with Size Guide Button */}
              <div className="space-y-2 pt-2 border-t border-zinc-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-zinc-300 uppercase tracking-wide">
                    Select Size (Oversized Drop Fit):
                  </span>
                  <button
                    type="button"
                    onClick={onOpenSizeGuide}
                    className="text-amber-400 hover:text-amber-300 underline font-medium cursor-pointer"
                  >
                    Size Guide (Inches)
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((sz) => {
                    const isSelected = selectedSize === sz;
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        className={`py-2 text-xs font-mono-num font-bold rounded border transition-all ${
                          isSelected
                            ? 'bg-amber-400 text-zinc-950 border-amber-400 shadow-md'
                            : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>

                <div className="text-[11px] text-zinc-400 flex items-center justify-between pt-1">
                  <span>Stock availability:</span>
                  <span className={currentStock <= 3 ? 'text-amber-400 font-semibold' : 'text-emerald-400'}>
                    {currentStock <= 3 ? `Only ${currentStock} left in Size ${selectedSize}!` : 'Ready to Dispatch'}
                  </span>
                </div>
              </div>

              {/* Pincode Delivery Estimator */}
              <div className="pt-2 border-t border-zinc-800 space-y-2">
                <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Check Delivery Date & COD:</span>
                </label>
                <form onSubmit={handleCheckPincode} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit Pincode (e.g. 560001)"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-mono-num"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 rounded border border-zinc-700 cursor-pointer"
                  >
                    Check
                  </button>
                </form>

                {pincodeResult && (
                  <div className="p-2.5 bg-zinc-900/60 rounded border border-zinc-800 text-xs text-zinc-300 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      Express delivery to <strong className="text-white">{pincodeResult.city}</strong> in {pincodeResult.days} business days. Cash on delivery active.
                    </span>
                  </div>
                )}
              </div>

            </div>

            {/* Action Row & Add to Cart */}
            <div className="pt-4 border-t border-zinc-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-zinc-800 rounded bg-zinc-900">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-zinc-400 hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-mono-num font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-zinc-400 hover:text-white"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  className={`flex-1 py-3 px-6 text-xs font-bold uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    addedNotice
                      ? 'bg-emerald-500 text-zinc-950 font-black'
                      : 'bg-amber-400 hover:bg-amber-300 text-zinc-950 shadow-lg shadow-amber-400/20 active:scale-95'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{addedNotice ? 'Added to Bag!' : `Add to Bag · ${formattedPrice}`}</span>
                </button>
              </div>

              <div className="flex items-center justify-around text-[11px] text-zinc-400 pt-1">
                <span>Pan-India 48h Dispatch</span>
                <span>·</span>
                <span>Free Size Replacement</span>
                <span>·</span>
                <span>Cash On Delivery</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
