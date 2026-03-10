import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Star, Crown, Gift, Calendar } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function InnerCircle() {
  const heroRef = useRef(null);
  const cardsRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ===== HERO ICON + TITLE ENTRANCE =====
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .fromTo('.circle-hero-icon',
          { y: -40, opacity: 0, scale: 0.6, rotation: -15 },
          { y: 0, opacity: 1, scale: 1, rotation: 0, duration: 1, ease: 'back.out(2)' }
        )
        .fromTo('.circle-hero-title',
          { y: 100, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
          { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1.2 },
          '-=0.5'
        )
        .fromTo('.circle-hero-subtitle',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.5'
        );

      // ===== BENEFIT CARDS STAGGER WITH SCALE + OPACITY =====
      gsap.fromTo('.circle-benefit-card',
        { y: 80, opacity: 0, scale: 0.85 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.18, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 85%' }
        }
      );

      // Card icons bounce in after cards appear
      gsap.fromTo('.circle-card-icon',
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.5, stagger: 0.18, ease: 'back.out(3)',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' }
        }
      );

      // ===== SIGNUP FORM SLIDE UP =====
      gsap.fromTo('.circle-signup-form',
        { y: 100, opacity: 0, scale: 0.92 },
        {
          y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 85%' }
        }
      );

      // Form inner elements stagger
      gsap.fromTo('.circle-form-inner > *',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 80%' }
        }
      );

    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#1E2A3A] min-h-screen text-white">
       <div className="container mx-auto px-4 py-24 text-center">
          <div ref={heroRef}>
            <Crown className="circle-hero-icon mx-auto w-16 h-16 text-[#F4A492] mb-6" />
            <h1 className="circle-hero-title text-5xl md:text-7xl font-serif mb-8 text-[#F4A492]">The Inner Circle</h1>
            <p className="circle-hero-subtitle text-xl text-gray-300 max-w-2xl mx-auto mb-12 font-light">
               More than a loyalty program. A community dedicated to longevity and vitality.
            </p>
          </div>

          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
             <div className="circle-benefit-card bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-sm">
                <Gift className="circle-card-icon w-10 h-10 text-[#F4A492] mx-auto mb-4" />
                <h3 className="text-xl font-serif mb-2">Member Gifts</h3>
                <p className="text-gray-400 text-sm">Exclusive merchandise and full-size product samples with every 3rd shipment.</p>
             </div>
             <div className="circle-benefit-card bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-sm">
                <Star className="circle-card-icon w-10 h-10 text-[#F4A492] mx-auto mb-4" />
                <h3 className="text-xl font-serif mb-2">Early Access</h3>
                <p className="text-gray-400 text-sm">Be the first to try new formulations before they launch to the public.</p>
             </div>
             <div className="circle-benefit-card bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-sm">
                <Calendar className="circle-card-icon w-10 h-10 text-[#F4A492] mx-auto mb-4" />
                <h3 className="text-xl font-serif mb-2">Expert Events</h3>
                <p className="text-gray-400 text-sm">Monthly Q&A webinars with our Chief Scientific Officer and guest nutritionists.</p>
             </div>
          </div>

          <div ref={formRef}>
            <div className="circle-signup-form bg-[#F4A492] text-[#1E2A3A] max-w-lg mx-auto p-8 rounded-2xl shadow-2xl">
               <div className="circle-form-inner">
                 <h3 className="text-2xl font-serif mb-4">Join Now</h3>
                 <p className="mb-6 opacity-80">Free to join. Infinite value.</p>
                 <input type="email" placeholder="Your email address" className="w-full px-4 py-3 rounded-lg mb-4 bg-white/90 border-0 text-[#1E2A3A]" />
                 <Button className="w-full bg-[#1E2A3A] text-white hover:bg-black py-6 text-xs uppercase tracking-widest font-bold">
                    Unlock Benefits
                 </Button>
               </div>
            </div>
          </div>
       </div>
    </div>
  );
}