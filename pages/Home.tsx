
import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';

const Home: React.FC = () => {
  const featuredProducts = PRODUCTS.slice(0, 3);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80&w=1920" 
            alt="Beautiful horses in a misty meadow" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-emerald-950/45"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-3xl">
            <span className="inline-block bg-amber-600 text-white px-3 py-1 text-[10px] uppercase font-bold tracking-[0.3em] mb-6 rounded-sm">Premium Organic Equine Supply</span>
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-[1.1] serif-font">
              Nurture the <span className="italic">Spirit</span> Within.
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-stone-100 font-light leading-relaxed max-w-2xl">
              Clean, non-GMO, and scientifically formulated. We believe every bag should be a matter of conscience.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/feed-finder" className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-5 rounded-sm font-bold uppercase tracking-widest text-xs transition text-center min-w-[240px] shadow-2xl">
                Find the Perfect Feed
              </Link>
              <Link to="/products" className="bg-white text-emerald-950 hover:bg-stone-100 px-10 py-5 rounded-sm font-bold uppercase tracking-widest text-xs transition text-center min-w-[240px]">
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold serif-font text-emerald-900">Pure Ingredients</h3>
            <p className="text-stone-600 text-sm leading-relaxed px-4">
              No chemical additives, GMOs, or synthetic preservatives. Just clean, wholesome grains and forages.
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold serif-font text-emerald-900">Scientifically Backed</h3>
            <p className="text-stone-600 text-sm leading-relaxed px-4">
              Formulated by PhD equine nutritionists to ensure optimal nutrient absorption and metabolic health.
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="text-xl font-bold serif-font text-emerald-900">Eco-Friendly</h3>
            <p className="text-stone-600 text-sm leading-relaxed px-4">
              Sustainable sourcing and biodegradable packaging help us give back to the land we love.
            </p>
          </div>
        </div>
      </section>

      {/* Feed Finder CTA Section */}
      <section className="container mx-auto px-4">
        <div className="bg-stone-900 text-white rounded-[3rem] p-12 md:p-24 overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-1/3 h-full hidden md:block opacity-20 group-hover:opacity-30 transition-opacity">
            <img src="https://images.unsplash.com/photo-1599421141315-f09b5756461f?auto=format&fit=crop&q=80&w=800" className="h-full object-cover" alt="Feeding horse" />
          </div>
          <div className="relative z-10 max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold serif-font mb-6 leading-tight">Unsure what your horse needs?</h2>
            <p className="text-stone-400 text-lg mb-10">Our interactive Feed Recommendation Engine uses PhD-led nutritional profiles to find the perfect match for your horse's life stage and activity level.</p>
            <Link to="/feed-finder" className="inline-flex items-center space-x-4 bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-xs transition">
              <span>Start the Finder</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-stone-100 py-28">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold serif-font mb-4 text-emerald-900">Featured Formulations</h2>
              <p className="text-stone-500 italic max-w-lg">Our most-loved organic solutions, trusted by top professionals and caring owners alike.</p>
            </div>
            <Link to="/products" className="text-emerald-900 font-bold border-b-2 border-amber-600 pb-1 hover:text-amber-600 transition uppercase tracking-[0.2em] text-[11px]">
              View Full Collection
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featuredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group">
                <div className="relative h-72 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-6 left-6 bg-amber-600 text-white text-[10px] uppercase font-bold px-3 py-1 tracking-[0.2em] rounded-sm">
                    {product.category}
                  </div>
                </div>
                <div className="p-10">
                  <h3 className="text-2xl font-bold mb-4 serif-font text-emerald-950">{product.name}</h3>
                  <p className="text-stone-500 text-sm mb-8 leading-relaxed line-clamp-3">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold text-emerald-900">${product.price.toFixed(2)}</span>
                    <button className="bg-stone-950 text-white px-6 py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-amber-600 transition duration-300 rounded-sm">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organic Commitment */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-[#022c22] text-white rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl">
          <div className="md:w-1/2 h-[400px] md:h-auto">
            <img 
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200" 
              alt="Organic farm field at sunrise" 
              className="w-full h-full object-cover opacity-70" 
            />
          </div>
          <div className="md:w-1/2 p-12 md:p-24 flex flex-col justify-center">
            <h2 className="text-5xl font-bold mb-8 serif-font leading-tight italic">Why Organic Matters.</h2>
            <p className="text-emerald-100/70 mb-10 text-lg leading-relaxed font-light">
              Traditional feeds often contain glyphosate-treated grains and industrial by-products. At EQ Feeds, we believe in a better way. Our organic commitment means zero synthetic pesticides, no GMOs, and ingredients that support your horse's natural digestive biome.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 mb-12">
              {[
                "Certified Organic Grains",
                "Non-GMO Assurance",
                "Soy-Free Formulations",
                "No Synthetic Fillers",
                "Traceable Sourcing",
                "PhDPure Nutrition"
              ].map((item, i) => (
                <li key={i} className="flex items-center space-x-3 group">
                  <div className="w-5 h-5 rounded-full bg-amber-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/about" className="inline-flex items-center text-amber-500 font-bold uppercase tracking-[0.25em] text-xs hover:text-white transition group">
              <span>Read Our Mission</span>
              <span className="ml-3 transition-transform group-hover:translate-x-2">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
