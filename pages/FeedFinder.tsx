
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { Product, Category } from '../types';

type Step = 'age' | 'activity' | 'health' | 'result';

interface Selections {
  age: 'growing' | 'adult' | 'senior' | null;
  activity: 'maintenance' | 'performance' | 'competition' | null;
  health: 'none' | 'metabolic' | 'growth' | 'digestive' | null;
}

const FeedFinder: React.FC = () => {
  const [step, setStep] = useState<Step>('age');
  const [selections, setSelections] = useState<Selections>({
    age: null,
    activity: null,
    health: null,
  });

  const getRecommendation = (): Product => {
    // Logic based on EQ Feeds product line
    if (selections.health === 'metabolic') return PRODUCTS.find(p => p.id === 'renu')!;
    if (selections.age === 'growing' || selections.health === 'growth') return PRODUCTS.find(p => p.id === 'baby-bloom')!;
    if (selections.age === 'senior') return PRODUCTS.find(p => p.id === 'silver')!;
    if (selections.activity === 'performance' || selections.activity === 'competition') return PRODUCTS.find(p => p.id === 'summit')!;
    return PRODUCTS.find(p => p.id === 'thrive')!;
  };

  const renderStepHeader = () => {
    const steps: { key: Step; label: string }[] = [
      { key: 'age', label: 'Life Stage' },
      { key: 'activity', label: 'Activity' },
      { key: 'health', label: 'Health Needs' },
      { key: 'result', label: 'Result' },
    ];

    return (
      <div className="flex justify-between items-center mb-12 max-w-2xl mx-auto w-full px-4">
        {steps.map((s, i) => {
          const isActive = step === s.key;
          const isPast = steps.findIndex(stepObj => stepObj.key === step) > i;
          return (
            <div key={s.key} className="flex flex-col items-center flex-1 relative">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all z-10 ${
                isActive ? 'bg-amber-600 text-white scale-125' : isPast ? 'bg-emerald-800 text-white' : 'bg-stone-200 text-stone-400'
              }`}>
                {isPast ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : i + 1}
              </div>
              <span className={`mt-2 text-[10px] uppercase font-bold tracking-widest ${isActive ? 'text-emerald-900' : 'text-stone-400'}`}>
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <div className="absolute top-4 left-1/2 w-full h-[2px] bg-stone-200 -z-0">
                  <div className={`h-full bg-emerald-800 transition-all duration-500 ${isPast ? 'w-full' : 'w-0'}`}></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-start py-20 bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold serif-font text-emerald-900 mb-4 italic">Feed Recommendation Engine</h1>
          <p className="text-stone-500 max-w-xl mx-auto">Answer a few simple questions about your horse to find the scientifically ideal organic feed.</p>
        </div>

        {renderStepHeader()}

        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden min-h-[400px] flex items-stretch">
          {step === 'age' && (
            <div className="p-12 w-full animate-fade-in">
              <h2 className="text-2xl font-bold mb-8 serif-font text-center">What is your horse's current life stage?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { id: 'growing', label: 'Growing', sub: 'Foals, Yearlings, & Young Horses', img: 'https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&q=80&w=400' },
                  { id: 'adult', label: 'Adult', sub: 'Mature Horses in Work or Pleasure', img: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80&w=400' },
                  { id: 'senior', label: 'Senior', sub: 'Aged Horses & Retired Companions', img: 'https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?auto=format&fit=crop&q=80&w=400' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => { setSelections({ ...selections, age: opt.id as any }); setStep('activity'); }}
                    className="group relative h-64 rounded-2xl overflow-hidden border-2 border-transparent hover:border-amber-500 transition-all text-left"
                  >
                    <img src={opt.img} className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110" alt={opt.label} />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h4 className="text-white font-bold text-xl mb-1 serif-font">{opt.label}</h4>
                      <p className="text-stone-300 text-xs leading-tight">{opt.sub}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'activity' && (
            <div className="p-12 w-full animate-fade-in">
              <h2 className="text-2xl font-bold mb-8 serif-font text-center">What is their typical activity level?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { id: 'maintenance', label: 'Maintenance', sub: 'Pleasure riding, light work, or retirement.', icon: '🌿' },
                  { id: 'performance', label: 'Performance', sub: 'Regular work, training, and schooling.', icon: '🏇' },
                  { id: 'competition', label: 'Competition', sub: 'Heavy workload, high endurance, or showing.', icon: '🏆' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => { setSelections({ ...selections, activity: opt.id as any }); setStep('health'); }}
                    className="p-8 rounded-2xl border-2 border-stone-100 hover:border-amber-500 hover:bg-stone-50 transition-all text-center flex flex-col items-center justify-center space-y-4"
                  >
                    <span className="text-5xl">{opt.icon}</span>
                    <h4 className="text-emerald-900 font-bold text-xl serif-font">{opt.label}</h4>
                    <p className="text-stone-500 text-sm leading-relaxed">{opt.sub}</p>
                  </button>
                ))}
              </div>
              <button onClick={() => setStep('age')} className="mt-8 text-stone-400 font-bold uppercase text-xs tracking-widest hover:text-stone-600">← Back</button>
            </div>
          )}

          {step === 'health' && (
            <div className="p-12 w-full animate-fade-in">
              <h2 className="text-2xl font-bold mb-8 serif-font text-center">Any specific health concerns?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {[
                  { id: 'none', label: 'No Specific Concerns', sub: 'Maintaining general wellness and vitality.' },
                  { id: 'metabolic', label: 'Metabolic Support', sub: 'Founder prone, Laminitis risk, or Low NSC needs.' },
                  { id: 'growth', label: 'Optimal Growth', sub: 'Skeletal development and muscle tone for young stock.' },
                  { id: 'digestive', label: 'Digestive Sensitivity', sub: 'Ulcer prone or difficult keeping weight.' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => { setSelections({ ...selections, health: opt.id as any }); setStep('result'); }}
                    className="p-6 rounded-2xl border-2 border-stone-100 hover:border-amber-500 hover:bg-stone-50 transition-all text-left"
                  >
                    <h4 className="text-emerald-900 font-bold text-lg serif-font mb-2">{opt.label}</h4>
                    <p className="text-stone-500 text-xs leading-relaxed">{opt.sub}</p>
                  </button>
                ))}
              </div>
              <button onClick={() => setStep('activity')} className="mt-8 text-stone-400 font-bold uppercase text-xs tracking-widest hover:text-stone-600">← Back</button>
            </div>
          )}

          {step === 'result' && (
            <div className="w-full flex flex-col md:flex-row animate-fade-in">
              <div className="md:w-1/2 h-64 md:h-auto relative">
                <img src={getRecommendation().image} className="w-full h-full object-cover" alt={getRecommendation().name} />
                <div className="absolute top-8 left-8">
                  <span className="bg-amber-600 text-white px-4 py-2 text-[10px] uppercase font-bold tracking-[0.2em] shadow-lg">Your Best Match</span>
                </div>
              </div>
              <div className="md:w-1/2 p-12 flex flex-col justify-center">
                <span className="text-amber-600 text-[10px] uppercase font-bold tracking-widest mb-2">{getRecommendation().category}</span>
                <h2 className="text-4xl font-bold text-emerald-900 serif-font mb-6 italic">{getRecommendation().name}</h2>
                <p className="text-stone-600 leading-relaxed mb-8">
                  Based on your horse being in the <span className="font-bold text-emerald-800">{selections.age}</span> stage with a <span className="font-bold text-emerald-800">{selections.activity}</span> workload, we recommend <span className="font-bold">{getRecommendation().name}</span>. 
                  This formula provides the exact balance of organic nutrients needed to support their unique physiological demands.
                </p>
                <div className="flex flex-col space-y-4">
                  <Link to="/products" className="bg-emerald-900 text-white px-8 py-4 text-center font-bold uppercase tracking-widest text-xs hover:bg-amber-600 transition shadow-lg">
                    Add to Cart - ${getRecommendation().price.toFixed(2)}
                  </Link>
                  <button 
                    onClick={() => setStep('age')}
                    className="text-stone-400 font-bold uppercase text-[10px] tracking-widest hover:text-stone-600 transition"
                  >
                    Start Over
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {step === 'result' && (
          <div className="mt-12 p-8 bg-amber-50 border border-amber-100 rounded-3xl max-w-4xl mx-auto flex items-center space-x-6">
            <div className="text-4xl">🔬</div>
            <div>
              <h4 className="font-bold text-amber-900 mb-1">Expert Review Available</h4>
              <p className="text-sm text-amber-800 leading-relaxed">
                This recommendation is based on our standard nutritional profiles. If your horse has complex medical needs, use our <strong>Ask an Expert</strong> chat below for a personalized deep-dive analysis powered by our AI Nutritionist.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedFinder;
