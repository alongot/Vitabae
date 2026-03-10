import React from 'react';
import { Star } from 'lucide-react';

export default function ResultsSection() {
  const results = [
    {
       name: "Jared S.",
       title: "My skin has never felt this soft",
       quote: "Was it magic? No. Did it work wonders? Yes, but I'm glowing like never before! ✨✨",
       img: "/images/ilona-isha.jpg",
       product: "Exfoliating Daily Cleanser"
    },
    {
       name: "Alisa A.",
       title: "Did I apply a filter? No.",
       quote: "Does my skin look flawless? Yes. But this glow is giving effortlessly refreshed vibes! ✨❤️",
       img: "/images/ilona-isha.jpg",
       product: "Blue Retinol Mask"
    },
    {
       name: "Sophie R.",
       title: "Did I drink enough water? No.",
       quote: "Does my skin feel hydrated? No, but it's softer, plumper, and dewier than ever! 🤭🤭",
       img: "/images/ilona-isha.jpg",
       product: "Gentle Retinol Night Serum"
    }
  ];

  return (
    <section className="py-24 bg-[#FAF8F5]">
       <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
             <div>
                <h2 className="text-3xl font-serif text-[#1E2A3A] mb-2">Real People, Real Results</h2>
                <p className="text-gray-500">Stories from our community.</p>
             </div>
             <div className="flex gap-2">
                {/* Arrows could go here */}
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {results.map((res, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                   <div className="flex items-center justify-between mb-4">
                      <span className="font-bold text-sm text-[#1E2A3A]">{res.name}</span>
                      <div className="flex text-[#F4A492]">
                         {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="currentColor" />)}
                      </div>
                   </div>
                   <div className="flex gap-4 mb-4">
                      <img src={res.img} alt={res.name} className="w-20 h-24 object-cover rounded-lg flex-shrink-0" />
                      <div>
                         <h4 className="font-bold text-sm mb-2 leading-tight text-[#1E2A3A]">{res.title}</h4>
                         <p className="text-xs text-gray-500 leading-relaxed">{res.quote}</p>
                      </div>
                   </div>
                   <div className="pt-4 border-t border-gray-100 flex items-center gap-2">
                      <div className="w-6 h-8 bg-gray-100 rounded-sm"></div>
                      <span className="text-[10px] uppercase tracking-wider text-gray-400">{res.product}</span>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
}