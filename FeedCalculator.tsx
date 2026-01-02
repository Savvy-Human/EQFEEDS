
import React, { useState, useEffect } from 'react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';

const FeedCalculator: React.FC = () => {
  const [weight, setWeight] = useState<number>(1100);
  const [activity, setActivity] = useState<string>('maintenance');
  const [selectedProductId, setSelectedProductId] = useState<string>(PRODUCTS[2].id); // Default to Thrive
  const [result, setResult] = useState<{ lbsPerDay: number; forageLbs: number } | null>(null);

  const calculateFeeding = () => {
    // Basic logic based on equine nutritional standards and EQ Feed guidelines (0.4% - 0.8% of BW)
    let feedMultiplier = 0.005; // 0.5% default

    switch (activity) {
      case 'maintenance': feedMultiplier = 0.005; break;
      case 'light': feedMultiplier = 0.006; break;
      case 'moderate': feedMultiplier = 0.007; break;
      case 'heavy': feedMultiplier = 0.0085; break;
      case 'intense': feedMultiplier = 0.01; break;
    }

    // Special cases for formulas
    if (selectedProductId === 'renu') feedMultiplier *= 0.8; // Lower concentrate due to NSC concerns
    if (selectedProductId === 'summit') feedMultiplier *= 1.1; // Higher energy requirement
    if (selectedProductId === 'baby-bloom') feedMultiplier *= 1.2; // Growing needs

    const lbsPerDay = weight * feedMultiplier;
    const forageLbs = Math.max(weight * 0.015, (weight * 0.02) - lbsPerDay); // Standard 1.5% - 2% total BW intake

    setResult({ lbsPerDay: parseFloat(lbsPerDay.toFixed(1)), forageLbs: parseFloat(forageLbs.toFixed(1)) });
  };

  useEffect(() => {
    calculateFeeding();
  }, [weight, activity, selectedProductId]);

  return (
    <div className="bg-stone-50 pb-24 min-h-screen">
      <div className="bg-emerald-950 text-white py-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 serif-font italic">Feed Calculator</h1>
          <p className="text-emerald-200 max-w-2xl mx-auto text-xl font-light">
            Optimize your horse's daily intake with our precision nutritional tool.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16">
        <div className="bg-white rounded-[3rem] shadow-2xl p-8 md:p-16 border border-stone-100 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Input Column */}
            <div className="space-y-10">
              <h2 className="text-3xl font-bold serif-font text-emerald-900 border-b border-stone-100 pb-4">Horse Profile</h2>
              
              <div className="space-y-8">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-4">Estimated Weight (lbs)</label>
                  <div className="flex items-center space-x-6">
                    <input 
                      type="range" 
                      min="200" 
                      max="2200" 
                      step="25"
                      value={weight}
                      onChange={(e) => setWeight(parseInt(e.target.value))}
                      className="flex-1 accent-amber-500 h-2 bg-stone-100 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-2xl font-black text-emerald-950 w-24 text-center">{weight} lbs</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-4">Activity Level</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['maintenance', 'light', 'moderate', 'heavy', 'intense'].map((lvl) => (
                      <button 
                        key={lvl}
                        onClick={() => setActivity(lvl)}
                        className={`px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all ${
                          activity === lvl 
                            ? 'bg-emerald-900 text-white border-emerald-900 shadow-lg' 
                            : 'bg-white text-stone-400 border-stone-100 hover:border-emerald-200 hover:bg-emerald-50'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-4">Select EQ Formula</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {PRODUCTS.filter(p => p.id !== 'mineral-salt').map((p) => (
                      <button 
                        key={p.id}
                        onClick={() => setSelectedProductId(p.id)}
                        className={`flex items-center p-4 rounded-2xl border transition-all text-left ${
                          selectedProductId === p.id 
                            ? 'bg-amber-50 border-amber-500 shadow-md ring-1 ring-amber-500' 
                            : 'bg-stone-50 border-stone-100 hover:bg-stone-100'
                        }`}
                      >
                        <div className="w-12 h-12 rounded-xl overflow-hidden mr-4">
                          <img src={p.image} className="w-full h-full object-cover" alt={p.name} />
                        </div>
                        <div>
                          <h4 className="font-bold text-emerald-950 text-sm leading-none mb-1">{p.name}</h4>
                          <span className="text-[10px] text-stone-400 uppercase font-black tracking-widest">{p.category}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results Column */}
            <div className="bg-[#022c22] rounded-[2.5rem] p-10 md:p-14 text-white shadow-2xl relative overflow-hidden flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
              
              <div className="relative z-10 space-y-12">
                <div className="text-center">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500 mb-4">Recommended Daily Ration</h3>
                  <div className="flex items-baseline justify-center space-x-2">
                    <span className="text-8xl font-black serif-font italic">{result?.lbsPerDay}</span>
                    <span className="text-2xl font-bold text-emerald-200">lbs / day</span>
                  </div>
                  <p className="mt-4 text-emerald-100/60 font-light text-sm">
                    of {PRODUCTS.find(p => p.id === selectedProductId)?.name}
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-200">Suggested Forage</span>
                    <span className="text-2xl font-bold">{result?.forageLbs} lbs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-200">Total Dry Matter</span>
                    <span className="text-2xl font-bold">{(result!?.lbsPerDay + result!?.forageLbs).toFixed(1)} lbs</span>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10">
                  <p className="text-xs text-emerald-100/40 italic text-center leading-relaxed">
                    *This calculator provides general guidelines based on weight and activity. Individual metabolism and forage quality may vary. Always monitor horse condition and consult Laura Macke for specialized concerns.
                  </p>
                </div>

                <div className="flex justify-center pt-4">
                  <a href="#/contact" className="bg-amber-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-emerald-950 transition-all shadow-xl">
                    Request Specialist Review
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCalculator;
