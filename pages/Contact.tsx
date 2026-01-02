
import React, { useState } from 'react';
import { CONTACT_INFO } from '../constants';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would use a backend service.
    setSubmitted(true);
  };

  return (
    <div className="bg-stone-50 py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold serif-font text-emerald-900 mb-8">Get In Touch</h1>
            <p className="text-stone-600 mb-12 leading-relaxed">
              We're here to help you find the best nutritional solution for your horses and farm animals. Visit us or reach out via phone or email.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-emerald-100 p-3 rounded-full text-emerald-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-emerald-950 uppercase text-xs tracking-widest mb-1">Our Location</h4>
                  <p className="text-stone-600">{CONTACT_INFO.address}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-emerald-100 p-3 rounded-full text-emerald-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-emerald-950 uppercase text-xs tracking-widest mb-1">Contact Details</h4>
                  <p className="text-stone-600">Phone: {CONTACT_INFO.phone}</p>
                  <p className="text-stone-600">Fax: {CONTACT_INFO.fax}</p>
                  <p className="text-stone-600">Email: {CONTACT_INFO.email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-emerald-100 p-3 rounded-full text-emerald-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-emerald-950 uppercase text-xs tracking-widest mb-1">Owner</h4>
                  <p className="text-stone-600">{CONTACT_INFO.owner}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-stone-100">
            {submitted ? (
              <div className="text-center py-12 animate-fade-in">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold serif-font text-emerald-900 mb-2">Message Sent!</h3>
                <p className="text-stone-500">Thank you for reaching out. We will get back to you shortly at {CONTACT_INFO.email}.</p>
                <button onClick={() => setSubmitted(false)} className="mt-8 text-emerald-800 font-bold uppercase text-xs tracking-widest">Send another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-bold serif-font text-emerald-950 mb-6">Send us a message</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-stone-400 mb-2 tracking-widest">Full Name</label>
                    <input required type="text" className="w-full bg-stone-50 border-none rounded-lg p-3 focus:ring-1 focus:ring-amber-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-stone-400 mb-2 tracking-widest">Email Address</label>
                    <input required type="email" className="w-full bg-stone-50 border-none rounded-lg p-3 focus:ring-1 focus:ring-amber-500 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-stone-400 mb-2 tracking-widest">Subject</label>
                  <input required type="text" className="w-full bg-stone-50 border-none rounded-lg p-3 focus:ring-1 focus:ring-amber-500 outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-stone-400 mb-2 tracking-widest">Your Message</label>
                  <textarea required rows={5} className="w-full bg-stone-50 border-none rounded-lg p-3 focus:ring-1 focus:ring-amber-500 outline-none resize-none"></textarea>
                </div>
                <button type="submit" className="w-full bg-emerald-900 text-white font-bold uppercase tracking-widest text-xs py-4 rounded-lg hover:bg-amber-600 transition shadow-lg">
                  Submit Form
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
