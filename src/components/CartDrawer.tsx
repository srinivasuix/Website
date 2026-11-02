import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, Check, Tag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  currency: 'INR' | 'USD';
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent: number; flat: number } | null>(null);
  const [promoError, setPromoError] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + item.product.priceInr * item.quantity, 0);
  
  // Free shipping threshold = ₹999
  const freeShippingThreshold = 999;
  const isFreeShipping = subtotal >= freeShippingThreshold || cart.length === 0;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  let discountAmount = 0;
  if (appliedDiscount) {
    if (appliedDiscount.percent > 0) {
      discountAmount = Math.round((subtotal * appliedDiscount.percent) / 100);
    } else if (appliedDiscount.flat > 0) {
      discountAmount = Math.min(subtotal, appliedDiscount.flat);
    }
  }

  const finalTotal = Math.max(0, subtotal - discountAmount);

  const formatMoney = (amount: number) => {
    return currency === 'INR'
      ? `₹${amount.toLocaleString('en-IN')}`
      : `$${Math.round(amount / 85)}`;
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'DESI10') {
      setAppliedDiscount({ code: 'DESI10', percent: 10, flat: 0 });
    } else if (code === 'BAWAAL200') {
      setAppliedDiscount({ code: 'BAWAAL200', percent: 0, flat: 200 });
    } else {
      setPromoError('Invalid coupon. Try DESI10 or BAWAAL200');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-zinc-950 border-l border-zinc-800 h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white font-display uppercase tracking-wide">
              Your Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition-colors"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-zinc-900/60 p-3.5 border-b border-zinc-800 text-xs space-y-1.5">
          <div className="flex items-center justify-between font-medium">
            {isFreeShipping ? (
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>You unlocked FREE Express Shipping across India!</span>
              </span>
            ) : (
              <span className="text-zinc-300">
                Add <strong className="text-amber-400 font-mono-num">{formatMoney(remainingForFreeShipping)}</strong> more for FREE Express Shipping
              </span>
            )}
            <span className="font-mono-num text-zinc-500">{shippingProgress}%</span>
          </div>

          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                isFreeShipping ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag className="w-12 h-12 text-zinc-700 mx-auto" />
              <p className="text-zinc-400 text-sm">Your bag is currently empty.</p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-amber-400 text-zinc-950 font-bold text-xs uppercase rounded cursor-pointer"
              >
                Explore Drop 04
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3 bg-zinc-900/50 rounded-xl border border-zinc-800/80"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-zinc-950 shrink-0 border border-zinc-800">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-white truncate font-display">
                        {item.product.title}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-zinc-500 hover:text-red-400 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-zinc-400 flex items-center gap-2">
                      <span>Size: <strong className="text-white font-mono-num">{item.size}</strong></span>
                      <span>·</span>
                      <span>{item.product.fabricGsm} GSM</span>
                    </div>

                    {item.isCustom && item.customText && (
                      <div className="text-[10px] text-amber-400 truncate">
                        Custom: "{item.customText}"
                      </div>
                    )}
                  </div>

                  {/* Quantity Stepper & Price */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-zinc-800 rounded bg-zinc-950 text-xs">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-2 py-0.5 text-zinc-400 hover:text-white"
                      >
                        -
                      </button>
                      <span className="px-2 font-mono-num font-bold text-white text-[11px]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-2 py-0.5 text-zinc-400 hover:text-white"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs font-bold font-mono-num text-white">
                      {formatMoney(item.product.priceInr * item.quantity)}
                    </span>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>

        {/* Promo Code Input & Checkout Footer */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-zinc-800 space-y-4 bg-zinc-950">
            
            {/* Promo Form */}
            <form onSubmit={handleApplyPromo} className="space-y-1.5">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Coupon: DESI10 or BAWAAL200"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded text-xs text-white placeholder-zinc-500 uppercase focus:outline-none focus:border-amber-400 font-mono-num"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 rounded border border-zinc-700"
                >
                  Apply
                </button>
              </div>

              {promoError && (
                <div className="text-[11px] text-red-400">{promoError}</div>
              )}
              {appliedDiscount && (
                <div className="text-[11px] text-emerald-400 flex items-center justify-between">
                  <span>Coupon {appliedDiscount.code} applied!</span>
                  <button
                    type="button"
                    onClick={() => setAppliedDiscount(null)}
                    className="text-zinc-500 hover:text-zinc-300 underline"
                  >
                    Remove
                  </button>
                </div>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-zinc-400 pt-2 border-t border-zinc-800/80">
              <div className="flex items-center justify-between">
                <span>Items Subtotal:</span>
                <span className="font-mono-num text-zinc-200">{formatMoney(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex items-center justify-between text-emerald-400">
                  <span>Discount ({appliedDiscount?.code}):</span>
                  <span className="font-mono-num">-{formatMoney(discountAmount)}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span>Pan-India Express Shipping:</span>
                <span className="font-mono-num text-emerald-400">
                  {isFreeShipping ? 'FREE' : '₹99'}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm font-bold text-white pt-2 border-t border-zinc-800">
                <span>Total Amount:</span>
                <span className="text-base font-black text-amber-400 font-mono-num">
                  {formatMoney(finalTotal)}
                </span>
              </div>
            </div>

            {/* Proceed to Checkout CTA */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 px-4 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98 shadow-lg shadow-amber-400/20"
            >
              <span>Proceed to Checkout ({formatMoney(finalTotal)})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center text-[10px] text-zinc-500">
              100% Encrypted UPI · Instant GPay/PhonePe · Cash on Delivery Supported
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
