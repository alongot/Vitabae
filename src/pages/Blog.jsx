import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ["All", "Energy", "Stress & Mood", "Sleep", "Hormones", "Digestion", "Immunity", "Skin/Hair", "Lifestyle Tips", "Healthy Nutrition"];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const heroRef = useRef(null);
  const categoriesRef = useRef(null);
  const articlesRef = useRef(null);
  const ctaRef = useRef(null);

  const { data: articles } = useQuery({
    queryKey: ['articles'],
    queryFn: () => base44.entities.Article.list(),
    initialData: []
  });

  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === "All" || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ===== HERO ANIMATIONS =====
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .fromTo('.blog-hero-title',
          { y: 80, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
          { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1.2 }
        )
        .fromTo('.blog-hero-subtitle',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.5'
        )
        .fromTo('.blog-hero-search',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.4'
        );

      // ===== CATEGORY BAR FADE IN =====
      gsap.fromTo('.blog-category-bar',
        { y: -20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: categoriesRef.current, start: 'top 90%' }
        }
      );

      // ===== ARTICLE CARDS STAGGER =====
      gsap.fromTo('.blog-article-card',
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: articlesRef.current, start: 'top 85%' }
        }
      );

      // ===== COMMUNITY CTA REVEAL =====
      const ctaTl = gsap.timeline({
        scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' }
      });
      ctaTl
        .fromTo('.blog-cta-heading',
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
        )
        .fromTo('.blog-cta-text',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.4'
        )
        .fromTo('.blog-cta-button',
          { y: 30, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5 },
          '-=0.3'
        );

    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
       {/* Hero */}
       <div ref={heroRef} className="bg-[#DDD6C9] py-20 text-center px-4">
          <h1 className="blog-hero-title text-4xl md:text-5xl font-serif text-[#1E2A3A] mb-4">The Vitabae Journal</h1>
          <p className="blog-hero-subtitle text-gray-600 max-w-xl mx-auto mb-8">Science-backed insights for living better, longer.</p>

          <div className="blog-hero-search max-w-md mx-auto relative">
             <Input
                placeholder="Search topics..."
                className="pl-10 bg-white border-none h-12 shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
             />
             <Search className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
          </div>
       </div>

       {/* Categories */}
       <div ref={categoriesRef} className="blog-category-bar border-b border-gray-200 bg-white sticky top-20 z-30 overflow-x-auto hide-scrollbar">
          <div className="container mx-auto px-4">
             <div className="flex space-x-8 py-4 min-w-max">
                {CATEGORIES.map(cat => (
                   <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`text-sm uppercase tracking-wider transition-colors ${activeCategory === cat ? 'text-[#F4A492] font-bold' : 'text-gray-500 hover:text-[#1E2A3A]'}`}
                   >
                      {cat}
                   </button>
                ))}
             </div>
          </div>
       </div>

       {/* Articles Grid */}
       <div ref={articlesRef} className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {filteredArticles.map((article) => (
                <div key={article.id} className="blog-article-card group cursor-pointer flex flex-col">
                   <div className="rounded-xl overflow-hidden aspect-[3/2] mb-6 relative">
                      <img src={article.image_url} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <span className="absolute top-4 left-4 bg-white text-xs font-bold uppercase px-3 py-1 rounded-sm">
                         {article.category}
                      </span>
                   </div>
                   <div className="flex-1">
                      <h3 className="text-2xl font-serif mb-3 group-hover:text-[#F4A492] transition-colors leading-tight">{article.title}</h3>
                      <p className="text-gray-500 text-sm mb-4 line-clamp-2">{article.summary}</p>
                   </div>
                   <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wider">
                         <span>{article.author}</span>
                         <span>•</span>
                         <span>{new Date(article.publish_date).toLocaleDateString()}</span>
                      </div>
                      <span className="text-[#F4A492] group-hover:translate-x-1 transition-transform"><ArrowRight size={16} /></span>
                   </div>
                </div>
             ))}
          </div>

          {filteredArticles.length === 0 && (
             <div className="text-center py-20 opacity-50">
                No articles found.
             </div>
          )}
       </div>

       {/* Community CTA */}
       <section ref={ctaRef} className="bg-[#F4A492] py-16 text-white text-center px-4">
          <h2 className="blog-cta-heading text-3xl font-serif mb-4">Join the Conversation</h2>
          <p className="blog-cta-text mb-8 max-w-lg mx-auto opacity-90">Connect with thousands of women sharing their wellness journey.</p>
          <Button variant="outline" className="blog-cta-button bg-transparent text-white border-white hover:bg-white hover:text-[#F4A492]">
             Join Community
          </Button>
       </section>
    </div>
  );
}