import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Input } from "@/components/ui/input";
import { Search, Book, ExternalLink, Filter } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Library() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLetter, setActiveLetter] = useState("All");
  const heroRef = useRef(null);
  const alphabetRef = useRef(null);
  const cardsRef = useRef(null);

  const { data: claims } = useQuery({
    queryKey: ['claims'],
    queryFn: () => base44.entities.Claim.list(),
    initialData: []
  });

  const alphabet = ["All", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];

  const filteredClaims = claims.filter(claim => {
    const matchesSearch = claim.title.toLowerCase().includes(searchQuery.toLowerCase()) || claim.abstract.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLetter = activeLetter === "All" || claim.title.startsWith(activeLetter);
    return matchesSearch && matchesLetter;
  });

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ===== HERO TEXT REVEAL (clip-path) =====
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .fromTo('.library-hero-label',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 }
        )
        .fromTo('.library-hero-title',
          { y: 120, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
          { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1.2 },
          '-=0.3'
        )
        .fromTo('.library-hero-subtitle',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.5'
        )
        .fromTo('.library-hero-search',
          { y: 30, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7 },
          '-=0.4'
        );

      // ===== ALPHABET NAVIGATION LETTERS ANIMATE IN =====
      gsap.fromTo('.alphabet-letter',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.4, stagger: 0.02, ease: 'power2.out',
          scrollTrigger: {
            trigger: alphabetRef.current,
            start: 'top 95%',
          }
        }
      );

      // ===== RESULTS HEADER =====
      gsap.fromTo('.library-results-header',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 90%' }
        }
      );

      // ===== STUDY CARDS STAGGER ENTRANCE =====
      gsap.fromTo('.study-card',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 85%' }
        }
      );

    });

    return () => ctx.revert();
  }, [filteredClaims]);

  return (
    <div className="bg-white min-h-screen w-full overflow-x-hidden">

      {/* Hero Section */}
      <div ref={heroRef} className="bg-[#1E2A3A] text-white py-28 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <span className="library-hero-label uppercase tracking-widest text-[#E8A598] text-xs font-bold mb-6 block">
            Evidence Database
          </span>
          <div className="overflow-hidden">
            <h1 className="library-hero-title text-4xl md:text-6xl mb-6">
              <span className="font-light">Proof Behind </span>
              <span className="font-serif italic">Every Claim</span>
            </h1>
          </div>
          <p className="library-hero-subtitle text-gray-300 mb-10 text-lg font-light max-w-lg mx-auto">
            Browse our repository of clinical studies and scientific literature.
          </p>

          <div className="library-hero-search relative max-w-xl mx-auto text-gray-900">
            <Input
              placeholder="Search by ingredient, condition, or study title..."
              className="pl-12 h-14 rounded-full shadow-lg border-none bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Alphabet Navigation */}
      <div ref={alphabetRef} className="border-b border-gray-100 bg-[#FAF8F5]">
        <div className="container mx-auto px-4 overflow-x-auto hide-scrollbar">
          <div className="flex space-x-4 py-4 min-w-max text-xs font-medium text-gray-500">
            {alphabet.map(char => (
              <button
                key={char}
                onClick={() => setActiveLetter(char)}
                className={`alphabet-letter hover:text-[#E8A598] transition-all duration-300 ${
                  activeLetter === char
                    ? 'text-[#E8A598] font-bold scale-125'
                    : ''
                }`}
              >
                {char}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div ref={cardsRef} className="container mx-auto px-4 py-28 max-w-5xl">
        <div className="library-results-header flex justify-between items-center mb-10">
          <p className="text-gray-400 text-xs uppercase tracking-widest font-bold">
            {filteredClaims.length} Studies Found
          </p>
          <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1E2A3A] hover:text-[#E8A598] transition-colors">
            <Filter size={14} /> Filter
          </button>
        </div>

        <div className="space-y-8">
          {filteredClaims.map((claim) => (
            <div
              key={claim.id}
              className="study-card border border-gray-100 rounded-xl p-8 hover:shadow-lg transition-all duration-500 bg-[#FAF8F5] hover:bg-white group"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <h3 className="text-xl text-[#1E2A3A] max-w-2xl">
                  <span className="font-light">{claim.title}</span>
                </h3>
                <div className="flex gap-2 flex-wrap flex-shrink-0">
                  {claim.age_relevance?.map(age => (
                    <Badge key={age} variant="outline" className="bg-white text-gray-500 border-gray-200 text-[10px] uppercase tracking-wider">
                      {age}
                    </Badge>
                  ))}
                  <Badge className="bg-[#EBE6DD] text-[#1E2A3A] hover:bg-[#E8A598] hover:text-white transition-colors text-[10px] uppercase tracking-wider">
                    {claim.category}
                  </Badge>
                </div>
              </div>

              <p className="text-gray-500 text-sm mb-6 leading-relaxed font-light">{claim.abstract}</p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200/50">
                <p className="text-xs text-gray-400 font-serif italic">{claim.reference}</p>
                <a
                  href={claim.link}
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#E8A598] hover:text-[#1E2A3A] transition-colors group-hover:gap-3 duration-300"
                >
                  Read Study PDF <ExternalLink size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
