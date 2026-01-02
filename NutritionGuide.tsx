
import React, { useState, useEffect } from 'react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';

const EQ_DIFFERENCE = [
  { 
    title: "Balance", 
    text: "Our feed has balanced amino acids for better cell efficiency. Also, the total balance of the feed means no need for supplements, when fed in the proper amounts." 
  },
  { 
    title: "Grains", 
    text: "We use whole pulverized Oats, along with several other grain products to give a balanced diversity." 
  },
  { 
    title: "Oil", 
    text: "The oil we use is mechanically extracted so there are more nutrients and NO chemicals, like hexane." 
  },
  { 
    title: "Minerals", 
    text: "We use organic minerals all in a perfect balance from nature. A montmorillonite Clay which Contains 60+ colloidal minerals has been shown to be effective in absorbing toxins, increasing feed utilization, calming horses, and triggering hydration." 
  },
  { 
    title: "Yeast Culture", 
    text: "We use a fermented yeast culture, NOT just yeast cells therefore it is an effective food source for the digestive bacteria. Nutrition Studies show feeding Diamond V® yeast culture provides B Complex, enhances digestibility of roughage, and increases stamina." 
  },
  { 
    title: "Molasses", 
    text: "We have NO molasses in our feeds so our feeds are lower in simple sugars. A healthier choice for your horse." 
  },
  { 
    title: "Locked Formulas", 
    text: "EqFeeds™ are manufactured with 'locked' formulas, which means the SAME top quality ingredients in every bag. Horses stay on feed easier with fewer digestive upsets." 
  },
  { 
    title: "Salt", 
    text: "We use mineral sea salt from an ancient underground sea in Kansas therefore it doesn't have contaminants. It's one of the most important things you can offer your horse." 
  },
  { 
    title: "Selenium", 
    text: "We use selenium yeast instead of sodium selenite. Predominantly selenomethionine (60-80%), which is highly absorbable." 
  },
  { 
    title: "Flavor", 
    text: "No flavor enhancers! Why would you add flavor enhancers to good feed." 
  }
];

const NutritionGuide: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [viewMode, setViewMode] = useState<'specs' | 'compare' | 'calculator'>('specs');
  
  // Calculator State
  const [weight, setWeight] = useState<number>(1100);
  const [activity, setActivity] = useState<string>('maintenance');
  const [calcResult, setCalcResult] = useState<{ lbsPerDay: number; forageLbs: number } | null>(null);

  const calculateFeeding = () => {
    let feedMultiplier = 0.005; // 0.5% default base

    switch (activity) {
      case 'maintenance': feedMultiplier = 0.005; break;
      case 'light': feedMultiplier = 0.006; break;
      case 'moderate': feedMultiplier = 0.007; break;
      case 'heavy': feedMultiplier = 0.0085; break;
      case 'intense': feedMultiplier = 0.01; break;
    }

    // Formula specific adjustments
    if (selectedProduct.id === 'renu') feedMultiplier *= 0.8;
    if (selectedProduct.id === 'summit') feedMultiplier *= 1.1;
    if (selectedProduct.id === 'baby-bloom') feedMultiplier *= 1.2;

    const lbsPerDay = weight * feedMultiplier;
    const forageLbs = Math.max(weight * 0.015, (weight * 0.02) - lbsPerDay);

    setCalcResult({ 
      lbsPerDay: parseFloat(lbsPerDay.toFixed(1)), 
      forageLbs: parseFloat(forageLbs.toFixed(1)) 
    });
  };

  useEffect(() => {
    calculateFeeding();
  }, [weight, activity, selectedProduct]);

  const competitorIngredients = [
    { name: "Processed Grain By-products", risk: "Low Quality Filler", note: "Cheap floor sweepings" },
    { name: "Cane Molasses", risk: "High Sugar Spike", note: "Causes metabolic stress" },
    { name: "Animal Protein Products", risk: "Bio-Security Hazard", note: "Undefined sources" },
    { name: "Artificial Flavorings", risk: "Chemical Additive", note: "Masks stale ingredients" },
    { name: "Sodium Selenite", risk: "Low Absorption", note: "Industrial inorganic source" },
    { name: "Hexane Extracted Oils", risk: "Chemical Residue", note: "Toxic solvent used" },
    { name: "Propionic Acid", risk: "Synthetic Preservative", note: "Gut microbiome irritant" },
    { name: "Undefined 'Hulls'", risk: "Indigestible Fiber", note: "Provides zero nutrition" }
  ];

  const getEQBenefit = (ing: string) => {
    if (ing.includes('Oats')) return "Whole Grains";
    if (ing.includes('Oil')) return "Mechanical Extraction";
    if (ing.includes('Yeast')) return "Fermented Probiotic";
    if (ing.includes('Clay')) return "Toxin Binder";
    if (ing.includes('Salt')) return "Pure Mineral";
    return "Organic / Non-GMO";
  };

  return (
    <div className="bg-stone-50 pb-24">
      {/* Page Header (Hero Section) with Product Selection Menu */}
      <div className="bg-[#022c22] text-white py-20 md:py-32 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-8xl font-bold mb-8 serif-font italic leading-none">The EQ Difference</h1>
          <p className="text-emerald-200 max-w-2xl mx-auto text-xl font-light leading-relaxed mb-16">
            Explore our science-led organic nutrition. Select a formula below to begin your analysis.
          </p>

          <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
            {PRODUCTS.map(p => (
              <button 
                key={p.id}
                onClick={() => setSelectedProduct(p)}
                className={`px-8 py-4 rounded-full font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500 border ${
                  selectedProduct.id === p.id 
                    ? 'bg-amber-500 border-amber-500 text-white shadow-2xl scale-110' 
                    : 'bg-emerald-900/40 border-emerald-800/50 text-emerald-100 hover:bg-emerald-800 hover:border-emerald-600'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16">
        <div className="bg-white rounded-[4rem] shadow-2xl p-6 md:p-12 lg:p-16 space-y-24 overflow-hidden border border-stone-100">
          
          {/* Analysis & Comparison Section */}
          <section className="scroll-mt-32">
            <div className="bg-white rounded-[3.5rem] border border-stone-200 shadow-2xl overflow-hidden flex flex-col min-h-[700px]">
              {/* Mode Switcher Tabs */}
              <div className="flex bg-stone-50 border-b border-stone-100">
                <button 
                  onClick={() => setViewMode('specs')}
                  className={`flex-1 py-10 text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] transition-all relative flex items-center justify-center space-x-3 ${
                    viewMode === 'specs' ? 'text-emerald-900 bg-white' : 'text-stone-400 hover:text-stone-600'
                  }`}
                >
                  <span>Nutritional Specs</span>
                  {viewMode === 'specs' && <div className="absolute bottom-0 left-0 w-full h-[4px] bg-emerald-700"></div>}
                </button>
                <button 
                  onClick={() => setViewMode('compare')}
                  className={`flex-1 py-10 text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] transition-all relative flex items-center justify-center space-x-3 ${
                    viewMode === 'compare' ? 'text-emerald-900 bg-white' : 'text-stone-400 hover:text-stone-600'
                  }`}
                >
                  <span>Ingredient "Showdown"</span>
                  {viewMode === 'compare' && <div className="absolute bottom-0 left-0 w-full h-[4px] bg-red-600"></div>}
                </button>
                <button 
                  onClick={() => setViewMode('calculator')}
                  className={`flex-1 py-10 text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] transition-all relative flex items-center justify-center space-x-3 ${
                    viewMode === 'calculator' ? 'text-emerald-900 bg-white' : 'text-stone-400 hover:text-stone-600'
                  }`}
                >
                  <span className="hidden sm:inline text-amber-600">★</span>
                  <span>Ration Calculator</span>
                  {viewMode === 'calculator' && <div className="absolute bottom-0 left-0 w-full h-[4px] bg-amber-500"></div>}
                </button>
              </div>

              <div className="p-8 md:p-12 lg:p-20 flex-grow">
                {viewMode === 'specs' && (
                  <div className="animate-fade-in space-y-16">
                    <div className="flex flex-col lg:flex-row gap-16">
                      <div className="lg:w-2/5">
                        <div className="relative group overflow-hidden rounded-[3rem] shadow-2xl h-[500px]">
                          <img 
                            src={selectedProduct.image} 
                            alt={selectedProduct.name} 
                            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/20 to-transparent"></div>
                          <div className="absolute bottom-10 left-10 text-white">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] bg-amber-600 px-4 py-2 rounded-xl mb-6 inline-block shadow-2xl">Analysis for {selectedProduct.name}</span>
                            <h3 className="text-5xl font-bold serif-font italic leading-none">{selectedProduct.name}</h3>
                          </div>
                        </div>
                      </div>
                      <div className="lg:w-3/5 space-y-12">
                        <div>
                          <h4 className="text-[10px] uppercase font-black text-amber-600 mb-6 tracking-[0.4em]">Formula Intent</h4>
                          <p className="text-stone-700 leading-relaxed text-2xl font-light serif-font italic">{selectedProduct.description}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                          <div className="bg-stone-50 p-8 rounded-[2.5rem] border border-stone-100 shadow-sm">
                            <h5 className="font-black text-emerald-900 text-xs uppercase mb-8 tracking-widest border-b pb-4 border-emerald-900/10">Primary Levels</h5>
                            <div className="space-y-4">
                              {Object.entries(selectedProduct.guaranteedAnalysis).slice(0, 4).map(([key, val]) => (
                                <div key={key} className="flex justify-between text-sm items-center">
                                  <span className="text-stone-400 uppercase font-black tracking-tight text-[10px]">{key.replace(/([A-Z])/g, ' $1')}</span>
                                  <span className="font-black text-emerald-950 text-lg">{val}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="bg-emerald-50/40 p-8 rounded-[2.5rem] border border-emerald-100 shadow-sm">
                            <h5 className="font-black text-emerald-900 text-xs uppercase mb-8 tracking-widest border-b pb-4 border-emerald-900/10">Critical Minerals</h5>
                            <div className="space-y-4">
                              {Object.entries(selectedProduct.guaranteedAnalysis).slice(4, 8).map(([key, val]) => (
                                <div key={key} className="flex justify-between text-sm items-center">
                                  <span className="text-stone-400 uppercase font-black tracking-tight text-[10px]">{key.replace(/([A-Z])/g, ' $1')}</span>
                                  <span className="font-black text-emerald-950 text-lg">{val}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-16 border-t border-stone-100">
                      <div>
                        <h5 className="font-black text-emerald-950 uppercase text-[10px] tracking-widest mb-8 ml-2">Locked Batch Ingredients</h5>
                        <div className="flex flex-wrap gap-4">
                          {selectedProduct.ingredients.map((ing, i) => (
                            <span key={i} className="bg-white text-emerald-900 border border-stone-200 px-6 py-3 rounded-2xl text-sm font-bold shadow-sm hover:shadow-xl hover:bg-emerald-950 hover:text-white transition-all cursor-default">
                              {ing}
                            </span>
                          ))}
                        </div>
                      </div>
                      {selectedProduct.feedingDirections && (
                        <div className="bg-emerald-950 text-emerald-100 p-12 rounded-[4rem] shadow-[0_40px_80px_-20px_rgba(2,44,34,0.4)] relative overflow-hidden group">
                          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                             <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 9V5a1 1 0 112 0v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4z"/></svg>
                          </div>
                          <h5 className="font-black text-amber-500 uppercase text-[10px] tracking-[0.4em] mb-8 border-b border-white/10 pb-4">Professional Feeding Guidelines</h5>
                          <p className="text-2xl serif-font italic leading-relaxed group-hover:scale-105 transition-transform duration-700">"{selectedProduct.feedingDirections}"</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {viewMode === 'compare' && (
                  <div className="animate-fade-in space-y-16">
                    <div className="text-center bg-stone-900 text-white py-10 rounded-[2.5rem] mb-16 shadow-2xl relative overflow-hidden">
                       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                       <h4 className="text-sm font-black uppercase tracking-[0.5em] relative z-10">Ingredient Sourcing: EQ Feeds vs. The Industry</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                      <div className="space-y-12">
                        <div className="flex items-center space-x-6 mb-10">
                          <div className="w-16 h-16 bg-amber-500 rounded-3xl flex items-center justify-center font-black text-white text-3xl shadow-[0_20px_50px_rgba(245,158,11,0.4)] rotate-6">EQ</div>
                          <div>
                             <h4 className="text-4xl font-bold serif-font text-emerald-950 italic">{selectedProduct.name}</h4>
                             <span className="text-[11px] font-black uppercase text-emerald-600 tracking-[0.2em]">Source Purity Guaranteed</span>
                          </div>
                        </div>
                        
                        <div className="space-y-5">
                          {selectedProduct.ingredients.slice(0, 8).map((ing, i) => (
                            <div key={i} className="group flex items-center p-6 rounded-[2rem] bg-emerald-50 border border-emerald-100 transition-all hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(2,44,34,0.1)] hover:-translate-x-3">
                              <div className="w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center mr-6 shadow-lg group-hover:rotate-12 transition-transform">
                                <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="flex-1">
                                <span className="text-lg font-black text-emerald-900 serif-font italic">{ing}</span>
                                <span className="block text-[10px] font-black text-emerald-600 uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-all">
                                  {getEQBenefit(ing)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-12 opacity-80">
                        <div className="flex items-center justify-between mb-10">
                          <div>
                             <h4 className="text-4xl font-bold serif-font text-stone-300 italic">Market Standard</h4>
                             <span className="text-[11px] font-black uppercase text-red-500 tracking-[0.2em]">Least-Cost Commodity Formulation</span>
                          </div>
                          <div className="w-16 h-16 bg-stone-200 rounded-3xl flex items-center justify-center font-black text-stone-400 text-3xl shadow-inner -rotate-6">X</div>
                        </div>

                        <div className="space-y-5">
                          {competitorIngredients.map((comp, i) => (
                            <div key={i} className="group flex items-center p-6 rounded-[2rem] bg-red-50/40 border border-red-100 transition-all hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(153,27,27,0.1)] hover:translate-x-3">
                              <div className="w-10 h-10 rounded-2xl bg-red-100 flex items-center justify-center mr-6 border border-red-200 group-hover:-rotate-12 transition-transform">
                                <svg className="h-6 w-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="flex-1">
                                <span className="text-lg font-bold text-red-900/40 line-through group-hover:text-red-900/60 transition-colors serif-font italic">{comp.name}</span>
                                <div className="flex items-center space-x-3 mt-1">
                                  <span className="text-[10px] font-black text-red-600 uppercase tracking-widest bg-red-100/50 px-2 py-0.5 rounded-lg">{comp.risk}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {viewMode === 'calculator' && (
                  <div className="animate-fade-in">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                      {/* Left: Inputs */}
                      <div className="space-y-12">
                         <div className="flex items-center space-x-6 border-b border-stone-100 pb-8">
                            <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-white text-xl">🧮</div>
                            <div>
                               <h4 className="text-3xl font-bold serif-font text-emerald-950 italic">{selectedProduct.name} Calculator</h4>
                               <p className="text-[10px] font-black uppercase text-stone-400 tracking-widest">Personalized Feeding Assessment</p>
                            </div>
                         </div>

                         <div className="space-y-10">
                            <div>
                              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-6">Horse Weight: <span className="text-emerald-900 text-lg ml-2">{weight} lbs</span></label>
                              <input 
                                type="range" 
                                min="200" 
                                max="2200" 
                                step="25"
                                value={weight}
                                onChange={(e) => setWeight(parseInt(e.target.value))}
                                className="w-full accent-amber-500 h-2 bg-stone-100 rounded-lg appearance-none cursor-pointer"
                              />
                              <div className="flex justify-between text-[8px] font-bold text-stone-300 uppercase tracking-tighter mt-2">
                                 <span>Pony</span>
                                 <span>Standard Horse</span>
                                 <span>Draft</span>
                              </div>
                            </div>

                            <div>
                              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-6">Horse Activity Level</label>
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {['maintenance', 'light', 'moderate', 'heavy', 'intense'].map((lvl) => (
                                  <button 
                                    key={lvl}
                                    onClick={() => setActivity(lvl)}
                                    className={`px-4 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${
                                      activity === lvl 
                                        ? 'bg-emerald-900 text-white border-emerald-900 shadow-lg scale-105' 
                                        : 'bg-white text-stone-400 border-stone-100 hover:border-emerald-200 hover:bg-emerald-50'
                                    }`}
                                  >
                                    {lvl}
                                  </button>
                                ))}
                              </div>
                            </div>
                         </div>
                      </div>

                      {/* Right: Results Display */}
                      <div className="bg-[#022c22] rounded-[3rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden flex flex-col justify-center border border-emerald-800">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                        <div className="relative z-10 space-y-10 text-center">
                           <div>
                              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500 mb-6">Recommended Daily Ration</p>
                              <div className="flex items-baseline justify-center space-x-3">
                                <span className="text-8xl font-black serif-font italic leading-none">{calcResult?.lbsPerDay}</span>
                                <span className="text-2xl font-bold text-emerald-300">lbs</span>
                              </div>
                              <p className="mt-6 text-emerald-100/60 font-medium text-xs tracking-wide">
                                of {selectedProduct.name} Formula
                              </p>
                           </div>

                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                                 <span className="block text-[9px] font-black uppercase tracking-widest text-emerald-400 mb-2">Suggested Forage</span>
                                 <span className="text-xl font-black">{calcResult?.forageLbs} lbs</span>
                              </div>
                              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                                 <span className="block text-[9px] font-black uppercase tracking-widest text-emerald-400 mb-2">Total DM Intake</span>
                                 <span className="text-xl font-black">{(calcResult!?.lbsPerDay + calcResult!?.forageLbs).toFixed(1)} lbs</span>
                              </div>
                           </div>

                           <p className="text-[9px] text-emerald-100/30 italic px-6 leading-relaxed">
                             Guidelines based on NRC equine nutritional standards and EQ Feed energy density. Individual needs may vary based on forage quality.
                           </p>

                           <div className="pt-4">
                              <button onClick={() => {
                                 const chatBtn = document.querySelector('button[class*="fixed"]');
                                 if (chatBtn instanceof HTMLElement) chatBtn.click();
                               }} className="bg-amber-600 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-emerald-950 transition-all shadow-xl">
                                 Request Specialist Tuning
                              </button>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* 10 Points Section */}
          <section className="bg-stone-50 -mx-6 md:-mx-12 lg:-mx-16 px-6 md:px-12 lg:px-16 py-24">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-5xl font-bold serif-font text-emerald-900 mb-8 italic leading-none">The 10 Cornerstones of EQ</h2>
              <p className="text-stone-500 text-lg font-light">Our uncompromising standards are built upon these ten foundational nutritional principles.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {EQ_DIFFERENCE.map((point, i) => (
                <div key={i} className="group p-10 rounded-[2.5rem] bg-white hover:bg-emerald-50 transition-all duration-700 border border-stone-200 shadow-sm hover:shadow-2xl hover:-translate-y-2">
                  <div className="flex items-center space-x-6 mb-8">
                    <span className="text-5xl font-black text-amber-500/20 group-hover:text-amber-500 transition-colors duration-700 serif-font">{i + 1}</span>
                    <h4 className="text-2xl font-bold text-emerald-950 serif-font italic">{point.title}</h4>
                  </div>
                  <p className="text-stone-600 leading-relaxed font-light">{point.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Consultation CTA */}
          <section className="bg-emerald-900 text-white rounded-[5rem] p-16 md:p-32 text-center shadow-[0_60px_120px_-20px_rgba(2,44,34,0.4)] relative overflow-hidden">
             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px] -mr-80 -mt-80"></div>
             <div className="relative z-10 space-y-12">
                <h2 className="text-6xl md:text-8xl font-bold serif-font italic leading-none tracking-tight">Expert Consultation.</h2>
                <p className="text-2xl text-emerald-100/90 max-w-3xl mx-auto font-light leading-relaxed">
                  Confused by labels? Our digital nutrition expert is available 24/7 to help you transition your horse to a clean, organic diet.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-6">
                  <button 
                    onClick={() => {
                      const chatBtn = document.querySelector('button[class*="fixed"]');
                      if (chatBtn instanceof HTMLElement) chatBtn.click();
                    }}
                    className="bg-amber-600 text-white px-20 py-8 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-sm hover:bg-white hover:text-emerald-950 transition-all shadow-[0_30px_60px_-15px_rgba(245,158,11,0.5)] hover:-translate-y-3"
                  >
                    Start Consult Now
                  </button>
                </div>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default NutritionGuide;
