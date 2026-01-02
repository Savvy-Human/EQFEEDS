
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-400 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white font-bold mb-4 serif-font text-xl">EQ Feeds</h3>
          <p className="text-sm leading-relaxed">
            Elevating equine health through premium organic nutrition. Non-GMO, soy-free, and crafted with care in Taylorville, IL.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 uppercase text-xs tracking-widest">Shop</h4>
          <ul className="text-sm space-y-2">
            <li><Link to="/products" className="hover:text-amber-500 transition text-stone-300">SUMMIT Performance</Link></li>
            <li><Link to="/products" className="hover:text-amber-500 transition text-stone-300">SILVER Senior</Link></li>
            <li><Link to="/products" className="hover:text-amber-500 transition text-stone-300">THRIVE Maintenance</Link></li>
            <li><Link to="/products" className="hover:text-amber-500 transition text-stone-300">ReNu Special Care</Link></li>
            <li><Link to="/products" className="hover:text-amber-500 transition text-stone-300">BABY BLOOM Growth</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 uppercase text-xs tracking-widest">Support</h4>
          <ul className="text-sm space-y-2">
            <li><Link to="/contact" className="hover:text-amber-500 transition">Contact Us</Link></li>
            <li><Link to="/calculator" className="hover:text-amber-500 transition">Feed Calculator</Link></li>
            <li><Link to="/feed-finder" className="hover:text-amber-500 transition text-stone-300">Feed Finder</Link></li>
            <li><Link to="/nutrition" className="hover:text-amber-500 transition">Nutrition Guide</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 uppercase text-xs tracking-widest">Newsletter</h4>
          <p className="text-xs mb-4">Get organic feeding tips delivered to your inbox.</p>
          <div className="flex">
            <input type="email" placeholder="Email address" className="bg-stone-800 border-none px-3 py-2 text-sm w-full focus:ring-1 focus:ring-amber-500 outline-none" />
            <button className="bg-amber-600 text-white px-4 py-2 text-sm hover:bg-amber-700 transition">Join</button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-stone-800 text-center text-xs">
        &copy; {new Date().getFullYear()} EQ Feeds Organic Equine Supply. Laura A. Macke.
      </div>
    </footer>
  );
};

export default Footer;
