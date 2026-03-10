import React, { useEffect, useRef } from 'react';
import { Microscope, ShieldCheck, Globe, Activity } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Labs() {
  const heroRef = useRef(null);
  const expansionRef = useRef(null);
  const protocolRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ===== HERO PARALLAX IMAGE + TEXT REVEAL =====
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .fromTo('.labs-hero-title',
          { y: 100, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
          { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1.2 }
        )
        .fromTo('.labs-hero-subtitle',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.5'
        );

      // Hero parallax on scroll
      gsap.to('.labs-hero-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5
        }
      });

      // Hero content fade out on scroll
      gsap.to('.labs-hero-content', {
        opacity: 0,
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: '30% top',
          end: '70% top',
          scrub: true
        }
      });

      // ===== INDIA EXPANSION - IMAGE CLIP-PATH REVEAL =====
      gsap.fromTo('.labs-expansion-label',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: expansionRef.current, start: 'top 80%' }
        }
      );

      gsap.fromTo('.labs-expansion-heading',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: expansionRef.current, start: 'top 78%' }
        }
      );

      gsap.fromTo('.labs-expansion-text',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: expansionRef.current, start: 'top 75%' }
        }
      );

      // Staggered feature items
      gsap.fromTo('.labs-feature-item',
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.labs-features-list', start: 'top 85%' }
        }
      );

      // Image clip-path reveal
      gsap.fromTo('.labs-expansion-image',
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 1.2, ease: 'power3.inOut',
          scrollTrigger: { trigger: expansionRef.current, start: 'top 70%' }
        }
      );

      // ===== QUALITY PROTOCOL CARDS STAGGER =====
      gsap.fromTo('.labs-protocol-heading',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: protocolRef.current, start: 'top 80%' }
        }
      );

      gsap.fromTo('.labs-protocol-card',
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.labs-protocol-grid', start: 'top 85%' }
        }
      );

      // Protocol card icons bounce
      gsap.fromTo('.labs-protocol-icon',
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.5, stagger: 0.12, ease: 'back.out(3)',
          scrollTrigger: { trigger: '.labs-protocol-grid', start: 'top 80%' }
        }
      );

    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-white min-h-screen">
       {/* Hero */}
       <div ref={heroRef} className="relative h-[60vh] bg-black flex items-center justify-center overflow-hidden">
          <div className="labs-hero-bg absolute inset-0 opacity-40">
             <img src="/images/ilona-isha.jpg" alt="Lab" className="w-full h-full object-cover" />
          </div>
          <div className="labs-hero-content relative z-10 text-center px-4">
             <h1 className="labs-hero-title text-5xl md:text-7xl font-serif text-white mb-6">Vitabae Labs</h1>
             <p className="labs-hero-subtitle text-xl text-gray-200 max-w-2xl mx-auto font-light">
                Setting the global standard for purity, potency, and transparency.
             </p>
          </div>
       </div>

       {/* India Expansion */}
       <div ref={expansionRef} className="container mx-auto px-4 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div>
                <span className="labs-expansion-label text-[#F4A492] text-xs font-bold uppercase tracking-widest mb-4 block">Global Innovation</span>
                <h2 className="labs-expansion-heading text-4xl font-serif text-[#1E2A3A] mb-6">Expanding to India</h2>
                <p className="labs-expansion-text text-gray-600 mb-6 text-lg leading-relaxed">
                   Vitabae Labs is proud to announce our newest state-of-the-art facility in Hyderabad.
                   This expansion allows us to be closer to our sourcing partners for key ayurvedic ingredients
                   like Ashwagandha and Turmeric, ensuring minimal time between harvest and extraction.
                </p>
                <div className="labs-features-list flex flex-col gap-4">
                   <div className="labs-feature-item flex items-center gap-3 text-gray-700">
                      <Globe className="text-[#F4A492]" /> <span>Direct-from-farm sourcing hub</span>
                   </div>
                   <div className="labs-feature-item flex items-center gap-3 text-gray-700">
                      <Microscope className="text-[#F4A492]" /> <span>Advanced chromatography testing</span>
                   </div>
                   <div className="labs-feature-item flex items-center gap-3 text-gray-700">
                      <Activity className="text-[#F4A492]" /> <span>Clinical research center</span>
                   </div>
                </div>
             </div>
             <div className="labs-expansion-image relative h-[500px] bg-gray-100 rounded-2xl overflow-hidden">
                <img src="/images/ilona-isha.jpg" alt="Scientists" className="w-full h-full object-cover" />
             </div>
          </div>
       </div>

       {/* Testing Standards */}
       <div ref={protocolRef} className="bg-[#FAF8F5] py-24 px-4">
          <div className="container mx-auto text-center max-w-4xl">
             <h2 className="labs-protocol-heading text-3xl font-serif text-[#1E2A3A] mb-12">The 5-Step Quality Protocol</h2>
             <div className="labs-protocol-grid grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                   "Raw Material ID", "Heavy Metal Screen", "Microbial Testing", "Potency Analysis", "Stability Check"
                ].map((step, i) => (
                   <div key={i} className="labs-protocol-card bg-white p-6 rounded-lg shadow-sm">
                      <ShieldCheck className="labs-protocol-icon text-[#F4A492] mx-auto mb-4" />
                      <h4 className="font-bold text-[#1E2A3A] text-sm uppercase">{step}</h4>
                   </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
}