import React from 'react';
import { Button } from "@/components/ui/button";

export default function GlucoseGoddess() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
       <div className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
             <span className="text-[#F4A492] font-bold uppercase tracking-widest text-xs mb-4 block">Exclusive Collaboration</span>
             <h1 className="text-5xl md:text-7xl font-serif text-[#1E2A3A] mb-8">Vitabae x Glucose Goddess</h1>
             <p className="text-xl text-gray-600 mb-12 leading-relaxed font-light">
                A scientific partnership to revolutionize metabolic health. 
                Combining Vitabae's precision formulation with Jessie Inchauspé's 
                groundbreaking research on glucose spikes.
             </p>
             
             <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                   <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                      <img src="/images/ilona-isha.jpg" alt="Healthy Food" className="w-full h-full object-cover" />
                   </div>
                   <div className="text-left">
                      <h3 className="text-3xl font-serif text-[#1E2A3A] mb-4">The Anti-Spike Complex</h3>
                      <ul className="space-y-4 mb-8">
                         <li className="flex items-center gap-3 text-gray-600">
                            <span className="w-6 h-6 rounded-full bg-[#F4A492] text-white flex items-center justify-center text-xs">1</span>
                            Clinical dose of Mulberry Leaf
                         </li>
                         <li className="flex items-center gap-3 text-gray-600">
                            <span className="w-6 h-6 rounded-full bg-[#F4A492] text-white flex items-center justify-center text-xs">2</span>
                            Organic Lemon Extract
                         </li>
                         <li className="flex items-center gap-3 text-gray-600">
                            <span className="w-6 h-6 rounded-full bg-[#F4A492] text-white flex items-center justify-center text-xs">3</span>
                            Apple Cider Vinegar Matrix
                         </li>
                      </ul>
                      <Button className="bg-[#1E2A3A] text-white w-full py-6 uppercase tracking-widest text-xs">
                         Join Waitlist
                      </Button>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}