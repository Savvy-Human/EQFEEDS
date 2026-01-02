
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="pb-24 bg-stone-50">
      {/* Hero / Header Section */}
      <section className="bg-emerald-950 text-white py-24 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold serif-font italic mb-6">ABOUT US</h1>
          <p className="text-xl md:text-2xl text-emerald-200 max-w-3xl mx-auto font-light leading-relaxed">
            Founded on knowledge, experience, and a deep-seated love for the animals we serve.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-stone-100">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Image Column - Updated to reflect Laura Macke with Horse */}
            <div className="relative min-h-[500px] lg:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1594495894542-a47cc33994cd?auto=format&fit=crop&q=80&w=1200" 
                alt="Laura Macke with a grazing horse" 
                className="absolute inset-0 w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-emerald-950/10 to-transparent"></div>
              <div className="absolute bottom-12 left-12 right-12">
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 text-white">
                  <h4 className="font-bold text-xl serif-font mb-2 italic">The EQ Promise</h4>
                  <p className="text-sm leading-relaxed font-light">
                    "Selling feed that provided quality nutrition became a matter of conscience. Every bag contains the same quality ingredients, batch after batch."
                  </p>
                  <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-amber-500">— Laura A. Macke</p>
                </div>
              </div>
            </div>

            {/* Text Column */}
            <div className="p-8 md:p-16 lg:p-20 space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 serif-font leading-tight">A Matter of Conscience</h2>
                <div className="w-24 h-1.5 bg-amber-500 rounded-full"></div>
              </div>
              
              <div className="space-y-6 text-stone-700 leading-relaxed text-lg font-light">
                <p>
                  With experience raising horses, cattle, hogs, and ducks, feed sales was an obvious career choice for Laura Macke. While working as a feed sales person in the 1990's Laura gained knowledge and experience.
                </p>
                <p>
                  Because of her love for horses and her hands on experience as a cattle and hog producer, to Laura, <span className="text-emerald-900 font-bold italic">selling feed that provided quality nutrition became a matter of conscience.</span>
                </p>
                <p>
                  As a sales person Laura came to the realization that the goals of feed companies were not always aligned with her ideals of providing the very best for the animals and their owners. She learned that quoted percentages on a tag did not necessarily indicate the digestibility of the ingredients or absorbability of the nutritional content.
                </p>
                <p className="bg-stone-50 p-6 rounded-2xl border-l-4 border-amber-500 italic text-stone-600">
                  "Crude Protein", "Crude Fiber", and "Crude Fat" meant that ingredients and quality could vary batch to batch. She learned that the source and processing of each individual ingredient could produce a benefit or a health threat.
                </p>
                <p>
                  In 1999, Laura employed her knowledge, experience, and love for horses to start <strong className="text-emerald-900">EqFeeds™</strong>. Because she was both manufacturer and retailer, she was able to maintain high quality at an attractive retail price. Though commodity prices move, she has never compromised quality. Her mission was then and is today to provide the finest nutrition available.
                </p>
                <p>
                  In 2004, she became acquainted with a well-known professor of Veterinary Science. At his recommendation, the formulas were <span className="font-bold text-emerald-900">"fine tuned"</span> and a natural mineral sea salt and montmorillonite clay were added to all EqFeeds™ to enhance the profile.
                </p>
              </div>

              <div className="pt-12 border-t border-stone-100 grid grid-cols-2 gap-8">
                <div>
                  <span className="block text-6xl font-black text-[#f59e0b] leading-none mb-2">1999</span>
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-stone-400">Established Taylorville, IL</span>
                </div>
                <div>
                  <span className="block text-6xl font-black text-[#f59e0b] leading-none mb-2 italic">Locked</span>
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-stone-400">Formula Consistency</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#022c22] text-white py-28 mt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <h2 className="text-4xl md:text-6xl font-bold serif-font italic leading-tight">No substitutions, no compromising.</h2>
            <p className="text-xl md:text-2xl text-emerald-100 font-light leading-relaxed">
              We are confident that any side-by-side comparison with any other feed will prove the quality of our product line. 
            </p>
            <div className="pt-8">
              <p className="text-3xl md:text-4xl serif-font italic text-amber-500">
                Try EqFeeds™ and see the results in your horses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
