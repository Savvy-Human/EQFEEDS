
import React, { useState, useEffect } from 'react';
import { PRODUCTS, CONTACT_INFO } from '../constants';
import { Category, Product, CartItem } from '../types';

const Products: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [retrieveId, setRetrieveId] = useState('');
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Load cart on initial mount
  useEffect(() => {
    const savedCart = localStorage.getItem('eq_active_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse saved cart", e);
      }
    }
  }, []);

  // Persist cart on changes
  useEffect(() => {
    localStorage.setItem('eq_active_cart', JSON.stringify(cart));
  }, [cart]);

  const saveCartToId = () => {
    const newId = Math.random().toString(36).substring(2, 9).toUpperCase();
    localStorage.setItem(`eq_cart_${newId}`, JSON.stringify(cart));
    setCartId(newId);
    alert(`Cart shared! Your Cart ID is: ${newId}. You can use this ID to retrieve this specific configuration later.`);
  };

  const retrieveCartById = () => {
    const saved = localStorage.getItem(`eq_cart_${retrieveId.toUpperCase()}`);
    if (saved) {
      setCart(JSON.parse(saved));
      setCartId(retrieveId.toUpperCase());
    } else {
      alert("Cart ID not found.");
    }
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(0, item.quantity + delta) };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const printCart = () => {
    window.print();
  };

  const emailCart = () => {
    const body = cart.map(item => `${item.name} x ${item.quantity}`).join('%0D%0A');
    window.location.href = `mailto:?subject=My EQ Feeds Cart&body=Items:%0D%0A${body}`;
  };

  const submitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderConfirmed(true);
    setTimeout(() => {
      setShowOrderModal(false);
      setCart([]);
      setOrderConfirmed(false);
    }, 5000);
  };

  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row gap-12">
      <div className="flex-1">
        <div className="max-w-4xl mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 serif-font">Shop Feed</h1>
          <p className="text-stone-500 mb-6">Explore our range of organic, nutrient-dense feeds. Our cart persists automatically for your convenience.</p>
          <div className="bg-amber-50 p-6 border border-amber-100 rounded-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-3xl">💰</span>
              <div>
                <p className="text-sm text-amber-900 font-bold leading-tight">Bulk & Commercial Pricing</p>
                <p className="text-xs text-amber-800">Established accounts receive preferred rates.</p>
              </div>
            </div>
            <button onClick={() => setShowApplyModal(true)} className="bg-amber-600 text-white px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-amber-700 transition">
              Apply for Account
            </button>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2 mb-12">
          <button 
            onClick={() => setActiveCategory('All')}
            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition ${activeCategory === 'All' ? 'bg-emerald-900 text-white shadow-lg' : 'bg-stone-200 text-stone-600 hover:bg-stone-300'}`}
          >
            All Products
          </button>
          {Object.values(Category).map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition ${activeCategory === cat ? 'bg-emerald-900 text-white shadow-lg' : 'bg-stone-200 text-stone-600 hover:bg-stone-300'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="group bg-white rounded-3xl border border-stone-100 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
              <div className="relative h-64 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-amber-600 text-[10px] uppercase font-bold tracking-widest">{product.category}</span>
                  <div className="flex space-x-1">
                    {product.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="bg-stone-100 text-stone-400 text-[9px] px-2 py-0.5 rounded-full uppercase font-bold tracking-tighter">{tag}</span>
                    ))}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 serif-font text-emerald-950">{product.name}</h3>
                <p className="text-stone-500 text-sm mb-8 flex-1 leading-relaxed">{product.description}</p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-3xl font-bold text-emerald-950">${product.price.toFixed(2)}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-emerald-950 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-amber-600 transition-all shadow-md active:scale-95"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar Cart */}
      <div className="lg:w-96 print:hidden">
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-stone-100 p-8 sticky top-32">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-stone-100">
            <h3 className="text-2xl font-bold serif-font text-emerald-950 italic">Your Cart</h3>
            {cartId && <span className="text-[10px] font-bold text-amber-600 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-widest">ID: {cartId}</span>}
          </div>

          {cart.length === 0 ? (
            <div className="py-12 text-center text-stone-400 space-y-6">
              <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-sm italic">Your shopping cart is currently empty.</p>
              <div className="pt-8 border-t border-stone-100">
                <p className="text-[10px] uppercase font-bold text-stone-300 mb-4 tracking-widest">Retrieve a Shared Cart</p>
                <div className="flex p-1 bg-stone-100 rounded-xl">
                  <input 
                    value={retrieveId}
                    onChange={(e) => setRetrieveId(e.target.value)}
                    placeholder="Enter Cart ID..." 
                    className="flex-1 bg-transparent px-4 py-2 text-xs outline-none" 
                  />
                  <button onClick={retrieveCartById} className="bg-emerald-900 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest">Load</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="max-h-[350px] overflow-y-auto space-y-5 pr-2 custom-scrollbar">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center group">
                    <div className="flex-1">
                      <p className="font-bold text-sm text-emerald-950 group-hover:text-amber-600 transition-colors">{item.name}</p>
                      <p className="text-[10px] text-stone-400 font-bold uppercase">${item.price.toFixed(2)} / unit</p>
                    </div>
                    <div className="flex items-center space-x-3 bg-stone-50 px-3 py-1.5 rounded-full border border-stone-100">
                      <button onClick={() => updateQty(item.id, -1)} className="w-5 h-5 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-stone-100 transition-colors">-</button>
                      <span className="font-bold text-xs w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="w-5 h-5 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-stone-100 transition-colors">+</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-stone-100 space-y-6">
                <div className="flex justify-between text-2xl font-bold serif-font text-emerald-950">
                  <span className="italic">Subtotal</span>
                  <span className="text-amber-600">${totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={saveCartToId} className="text-[9px] uppercase font-bold py-3 border border-stone-200 rounded-xl hover:bg-emerald-50 hover:border-emerald-200 transition-all tracking-widest">Share Cart</button>
                  <button onClick={emailCart} className="text-[9px] uppercase font-bold py-3 border border-stone-200 rounded-xl hover:bg-emerald-50 hover:border-emerald-200 transition-all tracking-widest">Email Items</button>
                  <button onClick={printCart} className="text-[9px] uppercase font-bold py-3 border border-stone-200 rounded-xl hover:bg-emerald-50 hover:border-emerald-200 transition-all tracking-widest">Print Form</button>
                  <button onClick={() => setCart([])} className="text-[9px] uppercase font-bold py-3 border border-red-100 text-red-400 rounded-xl hover:bg-red-50 transition-all tracking-widest">Empty Cart</button>
                </div>

                <button 
                  onClick={() => setShowOrderModal(true)}
                  className="w-full bg-emerald-900 text-white font-bold uppercase tracking-[0.2em] text-xs py-5 rounded-2xl hover:bg-amber-600 transition shadow-xl active:scale-95"
                >
                  Submit Order Inquiry
                </button>
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                  <p className="text-[9px] text-stone-500 text-center leading-relaxed italic">
                    Note: Your cart is automatically saved locally. Submitting an inquiry sends your list to {CONTACT_INFO.owner} for finalized pricing and pickup scheduling.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Account Application Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-emerald-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative border border-white/20">
            <button onClick={() => setShowApplyModal(false)} className="absolute top-8 right-8 text-stone-300 hover:text-stone-950 transition-colors">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h2 className="text-3xl font-bold serif-font text-emerald-900 mb-4 italic">Establish Your Account</h2>
            <p className="text-stone-500 text-sm mb-8 leading-relaxed">Establish an account with <span className="font-bold text-emerald-800">Equine & Farm Supply</span> for bulk discounts and prioritized logistics.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Application submitted to info@eqfeeds.com. We'll contact you shortly."); setShowApplyModal(false); }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="Business Name" className="w-full bg-stone-50 p-4 rounded-xl border border-stone-100 focus:ring-1 focus:ring-amber-500 outline-none text-sm transition-all" />
                <input required placeholder="Contact Person" className="w-full bg-stone-50 p-4 rounded-xl border border-stone-100 focus:ring-1 focus:ring-amber-500 outline-none text-sm transition-all" />
              </div>
              <input required type="email" placeholder="Email Address" className="w-full bg-stone-50 p-4 rounded-xl border border-stone-100 focus:ring-1 focus:ring-amber-500 outline-none text-sm transition-all" />
              <input required type="tel" placeholder="Phone Number" className="w-full bg-stone-50 p-4 rounded-xl border border-stone-100 focus:ring-1 focus:ring-amber-500 outline-none text-sm transition-all" />
              <textarea placeholder="Describe your estimated monthly feed volume..." className="w-full bg-stone-50 p-4 rounded-xl border border-stone-100 focus:ring-1 focus:ring-amber-500 outline-none text-sm h-32 resize-none transition-all"></textarea>
              <button type="submit" className="w-full bg-emerald-900 text-white font-bold py-5 rounded-2xl uppercase tracking-[0.2em] text-xs hover:bg-amber-600 transition shadow-lg active:scale-95">Send Application</button>
            </form>
          </div>
        </div>
      )}

      {/* Order Submission Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-emerald-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative border border-white/20">
            {orderConfirmed ? (
              <div className="text-center py-12 animate-fade-in">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-3xl font-bold serif-font text-emerald-900 mb-4 italic">Inquiry Submitted!</h3>
                <p className="text-stone-500 leading-relaxed mb-8">A confirmation email has been sent to your address. {CONTACT_INFO.owner} will review your cart and contact you to finalize the order.</p>
                <div className="bg-stone-50 p-4 rounded-2xl">
                   <p className="text-[10px] text-stone-400 uppercase font-bold tracking-widest">Next Step</p>
                   <p className="text-sm font-medium text-stone-600">Expect a call from {CONTACT_INFO.phone} within 24 hours.</p>
                </div>
              </div>
            ) : (
              <>
                <button onClick={() => setShowOrderModal(false)} className="absolute top-8 right-8 text-stone-300 hover:text-stone-950 transition-colors">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <h2 className="text-3xl font-bold serif-font text-emerald-900 mb-6 italic">Submit Order Inquiry</h2>
                <form onSubmit={submitOrder} className="space-y-4">
                  <input required placeholder="Your Full Name" className="w-full bg-stone-50 p-4 rounded-xl border border-stone-100 focus:ring-1 focus:ring-amber-500 outline-none text-sm transition-all" />
                  <input required type="email" placeholder="Email Address" className="w-full bg-stone-50 p-4 rounded-xl border border-stone-100 focus:ring-1 focus:ring-amber-500 outline-none text-sm transition-all" />
                  <input placeholder="Account Name (If established)" className="w-full bg-stone-50 p-4 rounded-xl border border-stone-100 focus:ring-1 focus:ring-amber-500 outline-none text-sm transition-all" />
                  <div className="p-5 bg-stone-50 rounded-2xl text-[11px] text-stone-500 border border-stone-100 max-h-40 overflow-y-auto">
                    <p className="font-black mb-3 text-stone-400 uppercase tracking-widest border-b pb-2">Pending Items List:</p>
                    {cart.map(i => (
                      <div key={i.id} className="flex justify-between mb-2 pb-2 border-b border-stone-200/50 last:border-none last:pb-0">
                        <span className="font-bold text-stone-700">{i.name}</span>
                        <span className="text-emerald-800">Qty: {i.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <button type="submit" className="w-full bg-emerald-900 text-white font-bold py-5 rounded-2xl uppercase tracking-[0.2em] text-xs hover:bg-amber-600 transition shadow-xl active:scale-95">Send to EQ Feeds</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
