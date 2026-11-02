import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, QrCode, Truck, ArrowRight, Smartphone, CreditCard, Banknote } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  currency: 'INR' | 'USD';
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  currency,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'card'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: 'Siddharth Sharma',
    phone: '9876543210',
    email: 'siddharth@example.com',
    address: 'Flat 402, Skyline Residency, 100ft Road, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
  });

  const totalAmount = cart.reduce((acc, item) => acc + item.product.priceInr * item.quantity, 0);

  const formatMoney = (amount: number) => {
    return currency === 'INR'
      ? `₹${amount.toLocaleString('en-IN')}`
      : `$${Math.round(amount / 85)}`;
  };

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address || !formData.pincode) return;
    setStep('payment');
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      onOrderSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white font-display uppercase tracking-wide">
              {step === 'success' ? 'Order Confirmed' : 'Instant Express Checkout'}
            </h2>
          </div>
          {step !== 'success' && (
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content based on Step */}
        <div className="p-6">
          {step === 'details' && (
            <form onSubmit={handleNextToPayment} className="space-y-4">
              <div className="text-xs text-zinc-400">
                Step 1 of 2: Shipping Destination in India
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-300">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-300">WhatsApp Mobile Number *</label>
                  <div className="flex">
                    <span className="px-3 py-2 bg-zinc-900 border border-r-0 border-zinc-800 rounded-l text-xs text-zinc-400">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-r text-xs text-white focus:outline-none focus:border-amber-400 font-mono-num"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-300">Flat, Wing, Street & Landmark *</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-300">6-Digit PIN *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded text-xs text-white focus:outline-none focus:border-amber-400 font-mono-num"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-300">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-300">State *</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                <div className="text-xs text-zinc-400">
                  Total Payable: <strong className="text-white font-mono-num">{formatMoney(totalAmount)}</strong>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 'payment' && (
            <div className="space-y-5">
              <div className="text-xs text-zinc-400">
                Step 2 of 2: Select Secure Indian Payment Method
              </div>

              <div className="space-y-3">
                {/* Option 1: Instant UPI */}
                <label
                  onClick={() => setPaymentMethod('upi')}
                  className={`flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                    paymentMethod === 'upi'
                      ? 'bg-zinc-900 border-amber-400 ring-1 ring-amber-400'
                      : 'bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="mt-1 text-amber-400"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold text-white uppercase">
                        Instant UPI (GPay / PhonePe / Paytm / BHIM)
                      </span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-bold">
                        FASTEST
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      Scan QR code or pay directly from your UPI app. Zero extra charges.
                    </p>
                  </div>
                </label>

                {/* Option 2: Cash on Delivery */}
                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'bg-zinc-900 border-amber-400 ring-1 ring-amber-400'
                      : 'bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-1 text-amber-400"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-bold text-white uppercase">
                        Cash on Delivery (COD)
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      Pay via Cash or UPI to delivery agent upon parcel arrival.
                    </p>
                  </div>
                </label>

                {/* Option 3: Credit / Debit Cards & Netbanking */}
                <label
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'bg-zinc-900 border-amber-400 ring-1 ring-amber-400'
                      : 'bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="mt-1 text-amber-400"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-bold text-white uppercase">
                        Credit / Debit Card / Netbanking
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      Visa, Mastercard, RuPay, HDFC, ICICI, SBI, Axis.
                    </p>
                  </div>
                </label>
              </div>

              {/* Order Summary Recap */}
              <div className="p-3.5 bg-zinc-900/40 rounded-lg border border-zinc-800 text-xs space-y-1">
                <div className="flex justify-between text-zinc-400">
                  <span>Shipping Address:</span>
                  <span className="text-zinc-200 truncate max-w-xs">{formData.address}, {formData.city}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>WhatsApp Updates to:</span>
                  <span className="text-zinc-200 font-mono-num">+91 {formData.phone}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="text-xs text-zinc-400 hover:text-white"
                >
                  ← Back to Details
                </button>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handlePlaceOrder}
                  className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded flex items-center gap-2 cursor-pointer shadow-lg active:scale-95 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>Confirming Order...</span>
                  ) : (
                    <span>Place Order · {formatMoney(totalAmount)}</span>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-black text-white font-display uppercase">
                  Bawaal Order Confirmed!
                </h3>
                <p className="text-xs text-zinc-400 font-mono-num">
                  Order ID: <strong className="text-amber-400">#BWL-84920</strong>
                </p>
              </div>

              <div className="max-w-md mx-auto p-4 bg-zinc-900 rounded-xl border border-zinc-800 text-xs text-left space-y-2">
                <div className="flex items-center justify-between text-zinc-300">
                  <span>Estimated Delivery:</span>
                  <strong className="text-white">Within 48-72 Hours</strong>
                </div>
                <div className="flex items-center justify-between text-zinc-300">
                  <span>Carrier:</span>
                  <span>Bluedart Air Express (Trackable)</span>
                </div>
                <div className="flex items-center justify-between text-zinc-300">
                  <span>WhatsApp Notifications:</span>
                  <span className="text-emerald-400 font-medium">Dispatched to +91 {formData.phone}</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded cursor-pointer"
                >
                  Back to Bawaal Drops
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
