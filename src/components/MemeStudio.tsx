import React, { useState } from 'react';
import { Sparkles, ShoppingBag, Check, RotateCcw } from 'lucide-react';
import { Size } from '../types';

interface MemeStudioProps {
  currency: 'INR' | 'USD';
  onAddCustomTee: (customTee: {
    title: string;
    punchline: string;
    placement: 'front' | 'back';
    fontStyle: string;
    colorTone: string;
    size: Size;
    priceInr: number;
  }) => void;
}

const MEME_PRESETS = [
  '25 DIN MEIN PAISA DOUBLE',
  'PEAK BENGALURU: AUTO ANNA SAID NO',
  'YEH SAB DOGLAPAN HAI',
  'CONTROL UDAY CONTROL',
  'WORKS ON MY MACHINE // DOCKER DIED',
  'GAJAB BEIZZATI HAI',
  'JALDI WAHAN SE HATO',
  'CHAI SUTTA BREAK IN PROGRESS',
  'LAST ATTEMPT: UPSC REJECT CLUB',
  'APUN HI BHAGWAN HAI',
];

const FONTS = [
  { id: 'font-display', name: 'Brutalist Heavy', class: 'font-extrabold tracking-tighter uppercase font-display' },
  { id: 'font-mono', name: 'Terminal Code', class: 'font-mono uppercase tracking-widest' },
  { id: 'font-serif', name: 'Retro Vintage', class: 'font-serif tracking-normal italic' },
  { id: 'font-stencil', name: 'Distressed Stencil', class: 'font-black tracking-widest uppercase' },
];

const COLOR_TONES = [
  { id: 'gold', name: 'Retro Rupee Gold', hex: '#EAB308', glow: 'text-amber-400' },
  { id: 'cyan', name: 'Bengaluru Cyan', hex: '#06B6D4', glow: 'text-cyan-400' },
  { id: 'saffron', name: 'Acid Saffron', hex: '#F97316', glow: 'text-orange-500' },
  { id: 'white', name: 'Chalk White', hex: '#F4F4F5', glow: 'text-zinc-100' },
  { id: 'neon', name: 'Acid Lime', hex: '#84CC16', glow: 'text-lime-400' },
];

export const MemeStudio: React.FC<MemeStudioProps> = ({ currency, onAddCustomTee }) => {
  const [customText, setCustomText] = useState('25 DIN MEIN PAISA DOUBLE');
  const [selectedPlacement, setSelectedPlacement] = useState<'back' | 'front'>('back');
  const [selectedFont, setSelectedFont] = useState(FONTS[0]);
  const [selectedTone, setSelectedTone] = useState(COLOR_TONES[0]);
  const [selectedSize, setSelectedSize] = useState<Size>('L');
  const [teeStyle, setTeeStyle] = useState<'jet-black' | 'mineral-wash'>('jet-black');
  const [addedNotice, setAddedNotice] = useState(false);

  const priceInr = 1499;
  const formattedPrice = currency === 'INR' ? `₹${priceInr}` : `$${Math.round(priceInr / 85)}`;

  const handleAdd = () => {
    onAddCustomTee({
      title: `Custom Drip: "${customText}"`,
      punchline: `Custom Meme Studio Edition · ${selectedPlacement.toUpperCase()} PRINT`,
      placement: selectedPlacement,
      fontStyle: selectedFont.name,
      colorTone: selectedTone.name,
      size: selectedSize,
      priceInr,
    });
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <section id="meme-studio" className="py-16 bg-zinc-950 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Drip Customizer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display uppercase">
            Bawaal Meme Studio
          </h2>
          <p className="text-sm text-zinc-400">
            Design your own heavyweight black meme tee. Pick an iconic Indian punchline or write your own unhinged slogan. Screenprinted on 240 GSM heavy French Terry.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Interactive Canvas Mockup */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full max-w-md aspect-[4/5] bg-zinc-900/80 rounded-2xl border border-zinc-800 p-6 flex items-center justify-center shadow-2xl overflow-hidden group">
              
              {/* T-Shirt Silhouette Container */}
              <div
                className={`relative w-72 sm:w-80 h-96 sm:h-104 rounded-3xl transition-all flex flex-col items-center justify-center border shadow-2xl ${
                  teeStyle === 'jet-black'
                    ? 'bg-zinc-950 border-zinc-800/90'
                    : 'bg-zinc-900 border-zinc-700/80'
                }`}
                style={{
                  backgroundImage:
                    teeStyle === 'mineral-wash'
                      ? 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 80%)'
                      : 'none',
                }}
              >
                {/* Collar Ribbing Graphic */}
                <div className="absolute top-0 w-28 h-8 rounded-b-full border-b-2 border-zinc-800 bg-zinc-900/60" />
                
                {/* Neck Tag Label */}
                <div className="absolute top-10 text-[9px] uppercase tracking-widest text-zinc-600 font-mono-num">
                  BAWAAL · 240 GSM · SIZE {selectedSize}
                </div>

                {/* Print Placement Box */}
                <div
                  className={`relative transition-all duration-300 text-center p-4 border border-dashed rounded-lg ${
                    selectedPlacement === 'back'
                      ? 'w-56 h-56 flex flex-col items-center justify-center border-zinc-700/60 bg-zinc-950/40'
                      : 'w-24 h-24 absolute top-20 left-12 flex flex-col items-center justify-center border-zinc-700/60 bg-zinc-950/40'
                  }`}
                >
                  <div
                    className={`${selectedFont.class} ${selectedTone.glow} transition-all duration-200 leading-tight ${
                      selectedPlacement === 'back' ? 'text-lg sm:text-xl font-bold' : 'text-[10px] font-bold'
                    }`}
                    style={{ color: selectedTone.hex }}
                  >
                    {customText || 'YOUR MEME HERE'}
                  </div>

                  {selectedPlacement === 'back' && (
                    <div className="mt-2 text-[9px] font-mono-num text-zinc-500 uppercase tracking-widest">
                      EST. 2026 · BAWAAL APPAREL INDIA
                    </div>
                  )}
                </div>

                {/* Placement indicator badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] text-zinc-500 font-mono-num">
                  <span>{selectedPlacement === 'back' ? 'OVERSIZED BACK PRINT' : 'POCKET CREST PRINT'}</span>
                  <span>100% FRENCH TERRY</span>
                </div>
              </div>

              {/* View Angle Pill */}
              <div className="absolute top-4 right-4 bg-zinc-950/90 border border-zinc-800 px-3 py-1 text-xs text-zinc-300 rounded">
                Live 240 GSM Preview
              </div>
            </div>

            {/* Quick Tee Shade Switcher */}
            <div className="mt-4 flex items-center gap-3 text-xs text-zinc-400">
              <span className="font-medium">Fabric Base:</span>
              <button
                type="button"
                onClick={() => setTeeStyle('jet-black')}
                className={`px-3 py-1 rounded text-xs transition-colors ${
                  teeStyle === 'jet-black'
                    ? 'bg-zinc-800 text-white border border-amber-400'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                Jet Black (Deep Noir)
              </button>
              <button
                type="button"
                onClick={() => setTeeStyle('mineral-wash')}
                className={`px-3 py-1 rounded text-xs transition-colors ${
                  teeStyle === 'mineral-wash'
                    ? 'bg-zinc-800 text-white border border-amber-400'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                Mineral Acid Wash (Charcoal)
              </button>
            </div>
          </div>

          {/* Right: Customization Controls */}
          <div className="lg:col-span-6 space-y-6 bg-zinc-900/40 p-6 sm:p-8 rounded-2xl border border-zinc-800">
            
            {/* Step 1: Punchline Text & Presets */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
                1. Enter Slogan / Meme Text
              </label>
              <input
                type="text"
                maxLength={45}
                value={customText}
                onChange={(e) => setCustomText(e.target.value.toUpperCase())}
                placeholder="TYPE YOUR MEME HERE..."
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-lg text-sm font-bold text-white uppercase focus:outline-none focus:border-amber-400 transition-colors"
              />

              {/* Quick Presets Cloud */}
              <div className="space-y-1.5">
                <span className="text-[11px] text-zinc-400">Or pick an iconic Indian meme preset:</span>
                <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1">
                  {MEME_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setCustomText(preset)}
                      className={`text-[11px] px-2.5 py-1 rounded transition-colors text-left truncate max-w-full ${
                        customText === preset
                          ? 'bg-amber-400 text-zinc-950 font-bold'
                          : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 2: Placement & Font Style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
                  2. Print Placement
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPlacement('back')}
                    className={`flex-1 py-2 px-3 text-xs font-semibold rounded border transition-colors ${
                      selectedPlacement === 'back'
                        ? 'bg-amber-400 text-zinc-950 border-amber-400'
                        : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:bg-zinc-800'
                    }`}
                  >
                    Oversized Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPlacement('front')}
                    className={`flex-1 py-2 px-3 text-xs font-semibold rounded border transition-colors ${
                      selectedPlacement === 'front'
                        ? 'bg-amber-400 text-zinc-950 border-amber-400'
                        : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:bg-zinc-800'
                    }`}
                  >
                    Chest Pocket
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
                  3. Typography Style
                </label>
                <select
                  value={selectedFont.id}
                  onChange={(e) => {
                    const f = FONTS.find((item) => item.id === e.target.value);
                    if (f) setSelectedFont(f);
                  }}
                  className="w-full py-2 px-3 bg-zinc-950 text-zinc-200 border border-zinc-800 rounded text-xs focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  {FONTS.map((font) => (
                    <option key={font.id} value={font.id} className="bg-zinc-950">
                      {font.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 3: Ink Tone & Size Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
                  4. Micro-Puff Ink Tone
                </label>
                <div className="flex items-center gap-2">
                  {COLOR_TONES.map((tone) => (
                    <button
                      key={tone.id}
                      type="button"
                      onClick={() => setSelectedTone(tone)}
                      className={`w-7 h-7 rounded-full transition-transform flex items-center justify-center ${
                        selectedTone.id === tone.id ? 'ring-2 ring-white scale-110' : 'opacity-80 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: tone.hex }}
                      title={tone.name}
                    >
                      {selectedTone.id === tone.id && <Check className="w-3.5 h-3.5 text-black" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
                  5. Oversized Size
                </label>
                <div className="flex items-center gap-1.5">
                  {(['S', 'M', 'L', 'XL', 'XXL'] as Size[]).map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`flex-1 py-1.5 text-xs font-mono-num font-semibold rounded transition-colors ${
                        selectedSize === sz
                          ? 'bg-amber-400 text-zinc-950'
                          : 'bg-zinc-950 text-zinc-300 hover:bg-zinc-800'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary & Direct Add to Bag */}
            <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <div className="text-xs text-zinc-400">Custom Screenprint Price:</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white font-mono-num">{formattedPrice}</span>
                  <span className="text-xs text-emerald-400 font-medium">Free Custom Print Fee</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className={`w-full sm:w-auto px-6 py-3 font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  addedNotice
                    ? 'bg-emerald-500 text-zinc-950'
                    : 'bg-amber-400 hover:bg-amber-300 text-zinc-950 active:scale-95 shadow-lg shadow-amber-400/20'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{addedNotice ? 'Custom Tee Added to Bag!' : 'Add Custom Tee to Bag'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
