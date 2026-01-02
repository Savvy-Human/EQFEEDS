
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop Feed', path: '/products' },
    { name: 'Nutrition Guide', path: '/nutrition' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const toolsLinks = [
    { name: 'Feed Finder', path: '/feed-finder', desc: 'Find the ideal formula for your horse.' },
    { name: 'Ration Calculator', path: '/calculator', desc: 'Calculate exact daily feeding amounts.' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-emerald-950 text-white sticky top-0 z-50 shadow-lg py-4 border-b border-emerald-900/50">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between items-center gap-y-4">
        <Link to="/" className="flex flex-col group">
          <span className="text-2xl md:text-3xl font-bold tracking-tight serif-font italic leading-none whitespace-nowrap">
            EQ Feeds <span className="text-amber-500">-</span> <span className="text-lg md:text-xl opacity-90">Equine and Farm Supply</span>
          </span>
          <span className="text-[9px] uppercase tracking-[0.4em] font-black text-amber-500/80 mt-1">
            Quality Organic Nutrition
          </span>
        </Link>

        {/* Persistent Nav Menu */}
        <nav className="flex flex-wrap justify-center items-center gap-x-4 md:gap-x-6 lg:gap-x-8 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] md:tracking-[0.2em]">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`transition-all duration-300 relative py-1 md:py-2 ${
                isActive(link.path) 
                  ? 'text-amber-500' 
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-amber-500 rounded-full animate-fade-in"></span>
              )}
            </Link>
          ))}

          {/* Nutrition Tools Dropdown */}
          <div 
            className="relative group py-1 md:py-2"
            onMouseEnter={() => setIsToolsOpen(true)}
            onMouseLeave={() => setIsToolsOpen(false)}
          >
            <button className={`flex items-center space-x-1 transition-all duration-300 font-bold uppercase ${
              toolsLinks.some(l => isActive(l.path)) ? 'text-amber-400' : 'text-amber-500 hover:text-white'
            }`}>
              <span>Nutrition Tools</span>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 transition-transform duration-300 ${isToolsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div className={`absolute top-full right-0 lg:left-1/2 lg:-translate-x-1/2 pt-4 w-64 transition-all duration-300 transform ${
              isToolsOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}>
              <div className="bg-emerald-900 border border-emerald-800 rounded-2xl shadow-2xl overflow-hidden">
                {toolsLinks.map((link) => (
                  <Link 
                    key={link.path}
                    to={link.path}
                    className="block p-4 hover:bg-emerald-800 transition-colors group/item"
                  >
                    <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isActive(link.path) ? 'text-amber-500' : 'text-white'}`}>
                      {link.name}
                    </p>
                    <p className="text-[9px] text-emerald-300 font-medium leading-tight group-hover/item:text-emerald-100">
                      {link.desc}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
