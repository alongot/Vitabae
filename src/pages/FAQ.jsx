import React, { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Search, Phone, Mail, MessageSquare } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FAQ_DATA = {
  product: [
    { q: "How do I know which formula is right for my age?", a: "We've simplified this by categorizing our products into 4 distinct age groups (18-30, 31-50, 51-70, 70+). Simply filter by your age group to see products formulated for your biological needs." },
    { q: "Are your supplements vegan?", a: "Yes, 100% of our products are certified vegan. We use plant-based capsules and source nutrients from whole foods." },
    { q: "Can I take multiple Vitabae products together?", a: "Generally, yes. Our products are designed to be complementary. However, we always recommend consulting with your healthcare provider if you are on medication." }
  ],
  shipping: [
    { q: "Where do you ship?", a: "We currently ship to the US, Canada, UK, and EU." },
    { q: "How long does shipping take?", a: "US orders typically arrive within 3-5 business days. International orders take 7-14 days." },
    { q: "What is your return policy?", a: "We offer a 30-day happiness guarantee. If you're not satisfied, return the bottle (even if empty) for a full refund." }
  ],
  subscription: [
    { q: "How does the subscription work?", a: "You save 15% on every order. We ship your refill automatically every 30 days. You can pause, skip, or cancel anytime." },
    { q: "Can I change my delivery date?", a: "Yes, you can manage all your subscription details from your account portal." }
  ]
};

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const heroRef = useRef(null);
  const tabsRef = useRef(null);
  const accordionRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ===== HERO REVEAL =====
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .fromTo('.faq-hero-title',
          { y: 80, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
          { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1.2 }
        )
        .fromTo('.faq-hero-search',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          '-=0.5'
        );

      // ===== TAB SECTION ENTRANCE =====
      gsap.fromTo('.faq-tabs-container',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: tabsRef.current, start: 'top 85%' }
        }
      );

      // ===== FAQ ACCORDION ITEMS STAGGER =====
      gsap.fromTo('.faq-accordion-item',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: tabsRef.current, start: 'top 80%' }
        }
      );

      // ===== CONTACT BLOCK ENTRANCE =====
      const contactTl = gsap.timeline({
        scrollTrigger: { trigger: contactRef.current, start: 'top 85%' }
      });
      contactTl
        .fromTo('.faq-contact-heading',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
        )
        .fromTo('.faq-contact-card',
          { y: 60, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out' },
          '-=0.3'
        );

    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
       <div ref={heroRef} className="bg-[#1E2A3A] text-white py-20 text-center px-4">
          <h1 className="faq-hero-title text-4xl md:text-5xl font-serif mb-6">How can we help?</h1>
          <div className="faq-hero-search relative max-w-lg mx-auto">
             <Input
                placeholder="Search for answers..."
                className="pl-12 h-14 rounded-full text-gray-900 border-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
             />
             <Search className="absolute left-4 top-4 text-gray-400" />
          </div>
       </div>

       <div ref={tabsRef} className="container mx-auto px-4 py-16 max-w-4xl">
          <Tabs defaultValue="product" className="faq-tabs-container w-full">
             <TabsList className="w-full flex flex-wrap justify-center bg-transparent gap-4 mb-12 h-auto">
                <TabsTrigger value="product" className="bg-white border border-gray-200 data-[state=active]:bg-[#F4A492] data-[state=active]:text-white px-6 py-3 rounded-full">Product & Science</TabsTrigger>
                <TabsTrigger value="shipping" className="bg-white border border-gray-200 data-[state=active]:bg-[#F4A492] data-[state=active]:text-white px-6 py-3 rounded-full">Shipping & Returns</TabsTrigger>
                <TabsTrigger value="subscription" className="bg-white border border-gray-200 data-[state=active]:bg-[#F4A492] data-[state=active]:text-white px-6 py-3 rounded-full">Subscriptions</TabsTrigger>
             </TabsList>

             {Object.entries(FAQ_DATA).map(([key, questions]) => (
                <TabsContent key={key} value={key} className="space-y-4">
                   <Accordion type="single" collapsible className="w-full space-y-4">
                      {questions.map((item, i) => (
                         <AccordionItem key={i} value={`item-${i}`} className="faq-accordion-item bg-white border border-gray-100 rounded-xl px-6 py-2 shadow-sm">
                            <AccordionTrigger className="text-lg font-serif text-[#1E2A3A] hover:text-[#F4A492] hover:no-underline text-left">{item.q}</AccordionTrigger>
                            <AccordionContent className="text-gray-600 leading-relaxed pb-4">
                               {item.a}
                            </AccordionContent>
                         </AccordionItem>
                      ))}
                   </Accordion>
                </TabsContent>
             ))}
          </Tabs>

          {/* Contact Block */}
          <div ref={contactRef} className="mt-20 bg-white p-8 md:p-12 rounded-2xl border border-gray-200 text-center">
             <h3 className="faq-contact-heading text-2xl font-serif mb-6">Still have questions?</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="faq-contact-card flex flex-col items-center">
                   <div className="w-12 h-12 bg-[#FAF8F5] rounded-full flex items-center justify-center mb-4 text-[#F4A492]">
                      <Mail size={24} />
                   </div>
                   <h4 className="font-bold text-sm uppercase tracking-wider mb-2">Email Us</h4>
                   <p className="text-gray-500 text-sm">hello@vitabae.com</p>
                </div>
                <div className="faq-contact-card flex flex-col items-center">
                   <div className="w-12 h-12 bg-[#FAF8F5] rounded-full flex items-center justify-center mb-4 text-[#F4A492]">
                      <MessageSquare size={24} />
                   </div>
                   <h4 className="font-bold text-sm uppercase tracking-wider mb-2">Live Chat</h4>
                   <p className="text-gray-500 text-sm">Mon-Fri, 9am - 5pm EST</p>
                </div>
                <div className="faq-contact-card flex flex-col items-center">
                   <div className="w-12 h-12 bg-[#FAF8F5] rounded-full flex items-center justify-center mb-4 text-[#F4A492]">
                      <Phone size={24} />
                   </div>
                   <h4 className="font-bold text-sm uppercase tracking-wider mb-2">Call Us</h4>
                   <p className="text-gray-500 text-sm">+1 (800) 555-0123</p>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}