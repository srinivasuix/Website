import React, { useState } from 'react';
import { X, Ruler, Check, HelpCircle } from 'lucide-react';
import { Size } from '../types';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SIZE_CHART = [
  { size: 'S', chest: '42"', length: '28.5"', shoulder: '21"', height: '5\'4" – 5\'7"' },
  { size: 'M', chest: '44"', length: '29.5"', shoulder: '22"', height: '5\'7" – 5\'10"' },
  { size: 'L', chest: '46"', length: '30.5"', shoulder: '23"', height: '5\'10" – 6\'1"' },
  { size: 'XL', chest: '48"', length: '31.5"', shoulder: '24"', height: '6\'0" – 6\'3"' },
  { size: 'XXL', chest: '50"', length: '32.5"', shoulder: '25"', height: '6\'2" – 6\'6"' },
];

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [heightFt, setHeightFt] = useState('5.9');
  const [weightKg, setWeightKg] = useState('72');
  const [fitPreference, setFitPreference] = useState<'relaxed' | 'ultra-boxy'>('relaxed');

  const calculateRecommendation = (): Size => {
    const w = parseFloat(weightKg) || 70;
    if (w < 60) return fitPreference === 'ultra-boxy' ? 'M' : 'S';
    if (w < 72) return fitPreference === 'ultra-boxy' ? 'L' : 'M';
    if (w < 84) return fitPreference === 'ultra-boxy' ? 'XL' : 'L';
    if (w < 95) return fitPreference === 'ultra-boxy' ? 'XXL' : 'XL';
    return 'XXL';
  };

  const recommendedSize = calculateRecommendation();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white font-display uppercase tracking-wide">
              Oversized Fit Guide & Calculator
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Fit Note */}
          <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800 text-xs text-zinc-300 space-y-1">
            <div className="font-bold text-amber-400 uppercase tracking-wide">
              Note on Bawaal Oversized Silhouette:
            </div>
            <p>
              Our tees are already cut intentionally oversized with dropped shoulders and a boxy chest drape. If you prefer the authentic streetwear look, <strong>order your true regular size</strong>. Only size down if you want a conventional standard fit.
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="p-5 bg-zinc-900/30 rounded-xl border border-zinc-800 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span>Smart Fit Advisor</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] text-zinc-400 block mb-1">Height (e.g. 5.9 ft):</label>
                <input
                  type="text"
                  value={heightFt}
                  onChange={(e) => setHeightFt(e.target.value)}
                  className="w-full px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded text-xs text-white font-mono-num focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-[11px] text-zinc-400 block mb-1">Weight (in kg):</label>
                <input
                  type="text"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  className="w-full px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded text-xs text-white font-mono-num focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-[11px] text-zinc-400 block mb-1">Desired Vibe:</label>
                <select
                  value={fitPreference}
                  onChange={(e) => setFitPreference(e.target.value as any)}
                  className="w-full px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="relaxed">Relaxed Street Drape</option>
                  <option value="ultra-boxy">Ultra-Boxy Oversized</option>
                </select>
              </div>
            </div>

            <div className="p-3 bg-amber-400/10 border border-amber-400/30 rounded-lg flex items-center justify-between">
              <span className="text-xs text-zinc-300">Recommended Size for you:</span>
              <span className="text-sm font-black font-mono-num text-amber-400 px-3 py-0.5 bg-amber-400/20 rounded">
                SIZE {recommendedSize}
              </span>
            </div>
          </div>

          {/* Sizing Table */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Garment Dimensions (Inches)
            </h3>
            
            <div className="overflow-x-auto border border-zinc-800 rounded-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-900 text-zinc-400 border-b border-zinc-800">
                  <tr>
                    <th className="py-2.5 px-4 font-semibold">Size</th>
                    <th className="py-2.5 px-4 font-semibold">Chest (Inches)</th>
                    <th className="py-2.5 px-4 font-semibold">Length (Inches)</th>
                    <th className="py-2.5 px-4 font-semibold">Shoulder Drop</th>
                    <th className="py-2.5 px-4 font-semibold">Best Fits Height</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/80 font-mono-num text-zinc-300">
                  {SIZE_CHART.map((row) => (
                    <tr
                      key={row.size}
                      className={recommendedSize === row.size ? 'bg-amber-400/10 text-white font-bold' : ''}
                    >
                      <td className="py-3 px-4 font-bold text-amber-400">{row.size}</td>
                      <td className="py-3 px-4">{row.chest}</td>
                      <td className="py-3 px-4">{row.length}</td>
                      <td className="py-3 px-4">{row.shoulder}</td>
                      <td className="py-3 px-4 text-zinc-400">{row.height}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded uppercase cursor-pointer"
            >
              Got It, Back to Product
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
