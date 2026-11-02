import React from 'react';
import { Layers, ShieldAlert, Sparkles, Check, X, Droplets, Wind, Scale } from 'lucide-react';

export const FabricSpecs: React.FC = () => {
  return (
    <section id="fabric-specs" className="py-16 bg-zinc-950 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
            <span>Fabric Engineering & Craft</span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-400">Tirupur Knitted · Bio-Washed</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display uppercase">
            Why 90% of Meme Tees in India Feel Like Tissue Paper
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Most brands slap a ₹50 heat transfer sticker onto a flimsy 160 GSM poly-cotton blank that warps after one wash. We built BAWAAL from the yarn up to feel like luxury Japanese streetwear.
          </p>
        </div>

        {/* 3 Key Engineering Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900/40 p-6 rounded-xl border border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-amber-400">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-display">240+ GSM Heavyweight Terry</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Knitted from 100% super-combed cotton loops. Substantial heft and structural drape that falls cleanly off your shoulders without clinging to your body in humid Indian summers.
            </p>
          </div>

          <div className="bg-zinc-900/40 p-6 rounded-xl border border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-display">Zero-Crack Micro-Puff Print</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              We use specialized high-density plastisol and water-based puff emulsions cured at 180°C. Tactile 3D embossed texture that survives harsh machine washing without cracking.
            </p>
          </div>

          <div className="bg-zinc-900/40 p-6 rounded-xl border border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-amber-400">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-display">1.25" Anti-Bacon Rib Collar</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Reinforced with 5% elastane threading and twin-needle topstitching. No loose, wrinkly bacon necks after three machine cycles. Remains razor-sharp wear after wear.
            </p>
          </div>
        </div>

        {/* Side-by-Side Comparison Table */}
        <div className="bg-zinc-900/30 rounded-xl border border-zinc-800 overflow-hidden">
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-display uppercase tracking-wide">
              The Reality Check: Side-by-Side Comparison
            </h3>
            <span className="text-xs text-zinc-400">Tirupur Lab Tested</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-900/80 text-zinc-400 border-b border-zinc-800">
                <tr>
                  <th className="py-3.5 px-6 font-semibold">Specification</th>
                  <th className="py-3.5 px-6 font-semibold text-amber-400">BAWAAL Heavyweight</th>
                  <th className="py-3.5 px-6 font-semibold text-zinc-400">Generic Instagram Brands</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                <tr>
                  <td className="py-4 px-6 font-medium text-white">Fabric Weight</td>
                  <td className="py-4 px-6 font-mono-num text-amber-400 font-bold flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>240 – 280 GSM Heavy French Terry</span>
                  </td>
                  <td className="py-4 px-6 font-mono-num text-zinc-400 flex items-center gap-2">
                    <X className="w-4 h-4 text-red-400" />
                    <span>140 – 170 GSM Flimsy Blend</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-white">Print Technique</td>
                  <td className="py-4 px-6 text-amber-400 font-bold flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>HD Micro-Puff Screenprint (Tactile)</span>
                  </td>
                  <td className="py-4 px-6 text-zinc-400 flex items-center gap-2">
                    <X className="w-4 h-4 text-red-400" />
                    <span>Cheap DTF Plastic Sticker (Peels Off)</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-white">Collar Construction</td>
                  <td className="py-4 px-6 text-amber-400 font-bold flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>1.25" Lycra Ribbed Twin-Needle</span>
                  </td>
                  <td className="py-4 px-6 text-zinc-400 flex items-center gap-2">
                    <X className="w-4 h-4 text-red-400" />
                    <span>Loose 0.75" Unreinforced (Warped)</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-white">Pre-Shrink Treatment</td>
                  <td className="py-4 px-6 text-amber-400 font-bold flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Bio-Washed & Silicon Softened</span>
                  </td>
                  <td className="py-4 px-6 text-zinc-400 flex items-center gap-2">
                    <X className="w-4 h-4 text-red-400" />
                    <span>Raw Unwashed (Shrinks 1-2 Sizes)</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-white">Manufacturing Origin</td>
                  <td className="py-4 px-6 text-amber-400 font-bold flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Tirupur, Tamil Nadu (Direct Mills)</span>
                  </td>
                  <td className="py-4 px-6 text-zinc-400 flex items-center gap-2">
                    <X className="w-4 h-4 text-red-400" />
                    <span>White-labeled dropship blanks</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
