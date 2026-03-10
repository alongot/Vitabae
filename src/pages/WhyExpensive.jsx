import React from 'react';
import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

export default function WhyExpensive() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen">
       <div className="container mx-auto px-4 py-20 max-w-4xl">
          <div className="text-center mb-16">
             <h1 className="text-4xl md:text-5xl font-serif text-[#1E2A3A] mb-6">Why Does It Cost More?</h1>
             <p className="text-xl text-gray-600 font-light">Because quality isn't cheap. And your health isn't the place to cut corners.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-16">
             <div className="grid grid-cols-3 bg-[#1E2A3A] text-white p-6 text-sm font-bold uppercase tracking-wider">
                <div className="col-span-1">Feature</div>
                <div className="col-span-1 text-center text-[#F4A492]">Vitabae</div>
                <div className="col-span-1 text-center text-gray-400">Industry Standard</div>
             </div>
             
             {[
                { name: "Ingredient Source", us: "Single-origin Organic Farms", them: "Mass Market Aggregators" },
                { name: "Extraction Method", us: "Cold-Press (Preserves Nutrients)", them: "Heat/Chemical (Cheaper)" },
                { name: "Testing Frequency", us: "3x Per Batch", them: "Random Spot Checks" },
                { name: "Fillers & Binders", us: "None (Rice Hull only)", them: "Magnesium Stearate, Silica" },
                { name: "Packaging", us: "UV-Glass (Protects Potency)", them: "Plastic (Leaches toxins)" },
                { name: "Traceability", us: "100% Farm-to-Bottle", them: "Unknown" }
             ].map((row, i) => (
                <div key={i} className="grid grid-cols-3 p-6 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                   <div className="font-bold text-[#1E2A3A]">{row.name}</div>
                   <div className="text-center flex justify-center items-center gap-2 text-[#1E2A3A]">
                      <Check className="text-green-500 w-4 h-4" /> {row.us}
                   </div>
                   <div className="text-center flex justify-center items-center gap-2 text-gray-400">
                      {row.them.includes('Unknown') ? <X className="text-red-400 w-4 h-4" /> : null} {row.them}
                   </div>
                </div>
             ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
             <div>
                <h3 className="text-2xl font-serif mb-4">The Cost of Purity</h3>
                <p className="text-gray-600 leading-relaxed">
                   Generic vitamins often use synthetic ingredients made in labs because they are 90% cheaper to produce. We use whole-food sources. For example, our Vitamin C comes from organic Acerola Cherries, not synthetic ascorbic acid derived from GMO corn syrup.
                </p>
             </div>
             <div>
                <h3 className="text-2xl font-serif mb-4">Fair Wages</h3>
                <p className="text-gray-600 leading-relaxed">
                   We pay our farming partners 20% above fair trade standards. This ensures they can maintain sustainable practices and don't have to resort to using pesticides to maximize yield at the cost of quality.
                </p>
             </div>
          </div>

          <div className="text-center bg-[#DDD6C9] p-12 rounded-2xl">
             <h2 className="text-3xl font-serif mb-6">Invest In Yourself</h2>
             <p className="mb-8 text-gray-600">You get one body. Treat it with the respect it deserves.</p>
             <Button asChild className="bg-[#1E2A3A] text-white px-8 py-6 rounded-full uppercase tracking-wider">
                <Link to="/Collection">Shop Premium</Link>
             </Button>
          </div>
       </div>
    </div>
  );
}