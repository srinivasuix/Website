import React, { useState } from 'react';
import { Send, Check, ShieldCheck, Truck, RefreshCw, Smartphone } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenSizeGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSizeGuide }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmailOrPhone('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400 text-xs">
      {/* Upper Footer: Value Pillars */}
      <div className="border-b border-zinc-900 bg-zinc-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <div className="font-bold text-white">Pan-India Express</div>
              <div className="text-[11px] text-zinc-400">Bluedart & Delhivery Air</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Smartphone className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <div className="font-bold text-white">Instant UPI & COD</div>
              <div className="text-[11px] text-zinc-400">GPay, PhonePe or Cash</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <div className="font-bold text-white">7-Day Free Exchange</div>
              <div className="text-[11px] text-zinc-400">Hassle-free size replacement</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <div className="font-bold text-white">100% Combed Terry</div>
              <div className="text-[11px] text-zinc-400">Zero synthetic polyester</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & VIP Drop Alerts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand & Manifesto */}
          <div className="md:col-span-5 space-y-4">
            <div className="text-2xl font-black text-white font-display tracking-tight">
              BAWAAL<span className="text-amber-400">.</span>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              India's niche streetwear label dedicated to internet culture, cult Bollywood cinema, and tech bro existentialism. Knitted from 240+ GSM combed French Terry in Tirupur, Tamil Nadu.
            </p>
            <div className="text-[11px] text-zinc-400 space-y-0.5">
              <div>Customer Support: <span className="text-zinc-200">help@bawaal.co</span></div>
              <div>WhatsApp VIP Desk: <span className="text-zinc-200 font-mono-num">+91 91234 56789</span></div>
              <div>Dispatch Hubs: Mumbai · Bengaluru · Delhi NCR</div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('collection')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Drop 04 Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('meme-studio')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Interactive Drip Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('street-reels')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Lookbook & Street Reels
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('fabric-specs')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  240 GSM Fabric Guide
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSizeGuide}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left text-amber-400/90 font-medium"
                >
                  Size Calculator & Dimensions
                </button>
              </li>
            </ul>
          </div>

          {/* VIP Drop Alerts Early Access */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              VIP Secret Drop Alerts
            </h4>
            <p className="text-xs text-zinc-400">
              Our batches are capped at 240 units per meme design. Enter your WhatsApp or Email for 1-hour early access before drops go live on Instagram.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="WhatsApp number or email..."
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-800 rounded text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase rounded flex items-center justify-center gap-1 cursor-pointer"
                >
                  {subscribed ? <Check className="w-4 h-4 text-black" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
              {subscribed && (
                <div className="text-[11px] text-emerald-400">
                  You're on the VIP list. Watch your WhatsApp for Drop 05!
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Sub-Footer (§1.B Anti-Slop Cleanliness) */}
        <div className="mt-12 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <div>
            © {new Date().getFullYear()} BAWAAL APPAREL PVT. LTD. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            <span>Engineered in Tirupur</span>
            <span>·</span>
            <span>Pan-India Logistics</span>
            <span>·</span>
            <span>GSTIN: 29AABCU9603R1ZM</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
