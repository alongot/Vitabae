import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BlogPreview() {
  const articles = [
    {
      category: "Wellness",
      title: "The Science of Cellular Aging",
      img: "/images/ilona-isha.jpg"
    },
    {
      category: "Nutrition",
      title: "Why Traceability Matters",
      img: "/images/ilona-isha.jpg"
    },
    {
      category: "Lifestyle",
      title: "Morning Rituals for Hormonal Balance",
      img: "/images/ilona-isha.jpg"
    }
  ];

  return (
    <section className="py-24 bg-white">
       <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif text-[#1E2A3A] text-center mb-16">From The Journal</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {articles.map((article, i) => (
                <Link key={i} to="/Blog" className="group block">
                   <div className="overflow-hidden rounded-lg mb-6 aspect-[4/3]">
                      <img 
                        src={article.img} 
                        alt={article.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                   </div>
                   <span className="text-xs font-bold uppercase tracking-widest text-[#F4A492] mb-2 block">{article.category}</span>
                   <h3 className="text-xl font-serif text-[#1E2A3A] group-hover:text-[#F4A492] transition-colors flex items-center justify-between">
                      {article.title}
                      <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                   </h3>
                </Link>
             ))}
          </div>
       </div>
    </section>
  );
}