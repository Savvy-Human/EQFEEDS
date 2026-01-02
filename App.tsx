
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import NutritionGuide from './pages/NutritionGuide';
import FeedFinder from './pages/FeedFinder';
import Contact from './pages/Contact';
import FeedCalculator from './pages/FeedCalculator';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-stone-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/nutrition" element={<NutritionGuide />} />
            <Route path="/feed-finder" element={<FeedFinder />} />
            <Route path="/calculator" element={<FeedCalculator />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </Router>
  );
};

export default App;
