import React from 'react';
import { Instagram } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function InstagramFeed() {
  const images = [
    "/images/ilona-isha.jpg",
    "/images/ilona-isha.jpg",
    "/images/ilona-isha.jpg",
    "/images/ilona-isha.jpg"
  ];

  return (
    <section className="py-24 bg-[#FAF8F5]">
       <div className="container mx-auto px-4 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Follow Us</span>
          <h2 className="text-3xl font-serif text-[#1E2A3A] mb-12">On Instagram</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
             {images.map((img, i) => (
                <div key={i} className="relative group aspect-square overflow-hidden bg-gray-100">
                   <img src={img} alt="Instagram" className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Instagram className="text-white" />
                   </div>
                </div>
             ))}
          </div>

          <Button asChild className="bg-[#1E2A3A] text-white hover:bg-gray-800 uppercase tracking-widest text-xs px-8 py-6 rounded-none">
             <a href="https://www.instagram.com/thevitabae/" target="_blank" rel="noopener noreferrer">@thevitabae</a>
          </Button>
       </div>
    </section>
  );
}