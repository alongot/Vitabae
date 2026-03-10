import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, Factory, Handshake, Eye, ShieldCheck, Users, MessageCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function OurStory() {

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .fromTo('.story-label', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
        .fromTo('.story-title', { y: 80, opacity: 0, clipPath: 'inset(100% 0 0 0)' }, { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1.2 }, '-=0.2')
        .fromTo('.story-sub', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.4')
        .fromTo('.story-copy', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.3');

      // Sections
      document.querySelectorAll('.story-section').forEach((el) => {
        gsap.fromTo(el,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%' } }
        );
      });

      // Image grayscale
      const img = document.querySelector('.story-img');
      if (img) {
        gsap.fromTo(img,
          { filter: 'grayscale(100%)' },
          { filter: 'grayscale(0%)', scrollTrigger: { trigger: img, start: 'top 70%', end: 'bottom 50%', scrub: 1 } }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#FFFBF5] min-h-screen text-[#1E2A3A]">

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1 — OUR STORY (HERO)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-[#1E2A3A] text-white py-24 md:py-32 px-4">
        <div className="max-w-3xl mx-auto">
          <span className="story-label text-[10px] uppercase tracking-[0.3em] text-[#E8A598] font-semibold mb-6 block text-center">
            Our Story
          </span>
          <div className="overflow-hidden text-center">
            <h1 className="story-title text-3xl md:text-5xl lg:text-6xl font-light leading-tight mb-4">
              Vitabae began with a moment of <span className="font-serif italic">doubt.</span>
            </h1>
          </div>
          <p className="story-sub text-gray-500 text-sm text-center mb-10">
            At a time when clarity mattered most, it was missing.
          </p>

          <div className="story-copy max-w-2xl mx-auto">
            <p className="text-sm text-gray-300 leading-relaxed mb-5">
              When Isaac Bracha and his wife Anna were expecting their first child, choosing a prenatal supplement seemed simple. Until it wasn't.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              The market offered reassuring promises: natural ingredients, scientific formulations, implied validations. But reassurance is not the same as clarity.
            </p>

            <div className="border-l-2 border-[#E8A598] pl-5 my-8">
              <p className="text-sm text-gray-400 leading-relaxed mb-2">Behind the packaging, fundamental questions remained unanswered:</p>
              <ul className="space-y-1.5 text-sm text-gray-500">
                <li>Where were the ingredients grown?</li>
                <li>Under what agricultural conditions?</li>
                <li>Who processed them?</li>
                <li>Who verified their safety?</li>
                <li>Who assumed responsibility if something went wrong?</li>
              </ul>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              The deeper they researched, the clearer the reality became: Most brands communicate outcomes. Very few expose their system.
            </p>
            <p className="text-sm text-gray-300 leading-relaxed font-medium">
              Vitabae was not created to launch another supplement. It was built to create something accountable.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2 — A DIFFERENT APPROACH
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="story-section grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-12 items-start">
            {/* Left — heading */}
            <div className="md:sticky md:top-28">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#E8A598] font-bold mb-3 block">A Different Approach</span>
              <h2 className="text-2xl md:text-3xl font-light text-[#1E2A3A]">
                Quality requires <span className="font-serif italic">proximity.</span>
              </h2>
            </div>

            {/* Right — content */}
            <div>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                The supplement industry is structured around efficiency. Formulation is often separated from manufacturing. Manufacturing is separated from sourcing. Sourcing is handled through intermediaries.
              </p>
              <p className="text-sm text-gray-500 leading-relaxed mb-5">
                This model works at scale. But it disperses accountability.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed mb-5 font-medium">
                We chose a different structure.
              </p>

              {/* Visual comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-white border border-gray-100 rounded-xl p-5">
                  <Factory size={20} className="text-[#1E2A3A] mb-3" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">What We Own</h4>
                  <ul className="space-y-1.5 text-sm text-gray-600">
                    <li>Our own manufacturing facility</li>
                    <li>Direct farmer relationships</li>
                    <li>Complete sourcing oversight</li>
                    <li>In-house testing & encapsulation</li>
                  </ul>
                </div>
                <div className="bg-white border border-gray-100 rounded-xl p-5">
                  <Handshake size={20} className="text-[#1E2A3A] mb-3" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Why It Matters</h4>
                  <ul className="space-y-1.5 text-sm text-gray-600">
                    <li>Continuity from farm to capsule</li>
                    <li>Responsibility remains visible</li>
                    <li>Standards cannot be diluted</li>
                    <li>Every step is documented</li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#FAF8F5] border border-gray-100 rounded-xl p-5">
                <p className="text-sm text-gray-600 leading-relaxed">
                  This model is more demanding. It requires time, investment, and continuous oversight. But it creates something rare in this industry: <strong className="text-[#1E2A3A]">continuity.</strong>
                </p>
                <p className="text-xs text-gray-500 italic mt-2">Because quality is not declared. It is managed.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3 — FROM RESEARCH TO RESPONSIBILITY
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="story-section grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
            {/* Image */}
            <div className="rounded-2xl overflow-hidden bg-[#EBEAE6]">
              <img
                src="/images/ilona-isha.jpg"
                alt="Isaac in the field"
                className="story-img w-full h-[400px] object-cover"
              />
            </div>

            {/* Content */}
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#E8A598] font-bold mb-3 block">From Research to Responsibility</span>
              <h2 className="text-2xl md:text-3xl font-light text-[#1E2A3A] mb-6">
                Responsibility begins at <span className="font-serif italic">origin.</span>
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Before infrastructure came understanding. Isaac spent several years studying formulation science and nutrition. But theory alone was not enough. To truly understand sourcing, he needed to go to the source.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                He traveled to India to understand growing conditions, supply chains, and on-the-ground realities.
              </p>
            </div>
          </div>

          <div className="story-section max-w-3xl mx-auto">
            {/* What he observed */}
            <div className="border-l-2 border-[#E8A598] pl-6 mb-8">
              <ul className="space-y-2 text-sm text-gray-600">
                <li>To observe agricultural practices.</li>
                <li>To understand soil composition, climate, and seasonal cycles.</li>
                <li>To meet farmers directly.</li>
                <li>To see how raw materials are actually processed.</li>
              </ul>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed mb-4 font-medium">
              Trust was built face-to-face.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Owning a manufacturing facility was never about excessive control. It was about eliminating the distance between decision and consequence.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              When standards are defined internally, they cannot be diluted. When production is managed internally, responsibility cannot be transferred.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed font-medium">
              That choice continues to guide every operational decision we make.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4 — TRANSPARENCY IN PRACTICE
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="story-section text-center mb-12">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#E8A598] font-bold mb-3 block">Transparency in Practice</span>
            <h2 className="text-2xl md:text-3xl font-light text-[#1E2A3A] mb-4">
              Transparency should be <span className="font-serif italic">visible.</span>
            </h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              Transparency is often claimed. We believe it should be documented.
            </p>
          </div>

          {/* What we share */}
          <div className="story-section bg-white border border-gray-100 rounded-2xl p-8 md:p-10 mb-10">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-5">We openly share:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                'The origin of our ingredients',
                'The agricultural regions involved',
                'The testing methods applied to raw materials',
                'The processing steps',
                'The standards governing each phase',
                'Full batch documentation & traceability',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 bg-[#FAF8F5] rounded-lg p-3.5">
                  <Eye size={14} className="text-[#E8A598] flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Standards */}
          <div className="story-section bg-[#1E2A3A] rounded-2xl p-8 md:p-10 text-white mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'cGMP', sub: '21 CFR Part 111', desc: 'Current Good Manufacturing Practices for dietary supplements' },
                { label: 'Food Safety', sub: 'Recognized Frameworks', desc: 'Quality management systems following industry food safety standards' },
                { label: 'Full Traceability', sub: 'Farm to Capsule', desc: 'Each batch fully documented and traceable from origin to finished product' },
              ].map((item, i) => (
                <div key={i} className="bg-white/10 rounded-xl p-5">
                  <ShieldCheck size={18} className="text-[#E8A598] mb-3" />
                  <p className="text-xs font-bold uppercase tracking-wider text-white mb-0.5">{item.label}</p>
                  <p className="text-[10px] text-gray-400 mb-2">{item.sub}</p>
                  <p className="text-xs text-gray-300 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="story-section text-center mb-4">
            <p className="text-sm text-gray-600 mb-1">We do not simplify the process to make it more appealing.</p>
            <p className="text-sm text-gray-700 font-medium">Trust should not rely on tone. It should rely on evidence.</p>
          </div>

          {/* CTAs */}
          <div className="story-section grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
            {[
              { text: 'Explore Our Processes', link: '/OurProcess' },
              { text: 'Science & Standards', link: '/Science' },
              { text: 'Browse Products', link: '/Collection' },
              { text: 'Meet Our Farmers', link: '/Library' },
            ].map((item, i) => (
              <Link
                key={i}
                to={item.link}
                className="group bg-white border border-gray-100 rounded-xl p-4 text-center hover:border-[#E8A598] hover:shadow-md transition-all"
              >
                <span className="text-xs font-medium text-[#1E2A3A] group-hover:text-[#E8A598] transition-colors block mb-1">{item.text}</span>
                <ArrowRight size={12} className="mx-auto text-gray-300 group-hover:text-[#E8A598] transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5 — WHO WE BUILD FOR
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          <div className="story-section text-center mb-10">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#E8A598] font-bold mb-3 block">Who We Build For</span>
            <h2 className="text-2xl md:text-3xl font-light text-[#1E2A3A] mb-6">
              Built for women who seek understanding, <span className="font-serif italic">not reassurance.</span>
            </h2>
          </div>

          <div className="story-section">
            <p className="text-sm text-gray-600 leading-relaxed mb-5 text-center">
              Vitabae is for women who look beyond slogans.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {[
                'Read labels carefully',
                'Compare sourcing details',
                'Question marketing language',
                'Look for structure behind claims',
              ].map((trait, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-xl p-4 text-center">
                  <Users size={16} className="mx-auto text-[#E8A598] mb-2" />
                  <p className="text-xs text-gray-600 leading-snug">{trait}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                For mothers who want more than comforting words. For families who prefer documentation over decoration.
              </p>
              <p className="text-sm text-gray-700 leading-relaxed mb-3 font-medium">
                We created the brand we wished had existed when clarity mattered most.
              </p>
              <p className="text-sm text-gray-500 leading-relaxed italic mb-8">
                Not louder. Not trend-driven. Not designed to impress. Designed to withstand scrutiny.
              </p>

              <Button asChild className="bg-[#1E2A3A] hover:bg-[#2d3d4d] text-white rounded-none px-10 py-6 text-[11px] uppercase tracking-[0.2em] font-medium group">
                <Link to="/Collection">
                  Browse Our Products
                  <ArrowRight size={14} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 6 — VERIFICATION & FAQ
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          <div className="story-section text-center mb-10">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#E8A598] font-bold mb-3 block">Verification</span>
            <h2 className="text-2xl md:text-3xl font-light text-[#1E2A3A]">
              Frequently Asked <span className="font-serif italic">Questions</span>
            </h2>
          </div>

          <Accordion type="single" collapsible className="story-section w-full space-y-3">
            {[
              {
                q: 'Does Vitabae control its own manufacturing?',
                a: 'Yes. Vitabae owns and operates its own production facility, allowing us to oversee every step from raw material intake to final encapsulation.',
              },
              {
                q: 'How is product safety verified?',
                a: 'Each batch undergoes internal quality control testing as well as independent third-party laboratory analysis before release.',
              },
              {
                q: 'What regulatory standards apply to Vitabae?',
                a: 'Our operations follow current Good Manufacturing Practices (cGMP) in accordance with 21 CFR Part 111, along with structured food safety management systems.',
              },
            ].map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-gray-100 rounded-xl px-6 bg-white data-[state=open]:bg-[#FAF8F5] data-[state=open]:border-gray-200"
              >
                <AccordionTrigger className="hover:no-underline text-left font-medium text-[#1E2A3A] py-5 text-sm">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600 pb-5 leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 7 — OPEN INVITATION
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="story-section">
            <div className="w-14 h-14 rounded-full bg-[#E8A598]/10 flex items-center justify-center mx-auto mb-6">
              <MessageCircle size={24} className="text-[#E8A598]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-[#1E2A3A] mb-4">
              Still have a <span className="font-serif italic">question?</span>
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              If you cannot find the information you are looking for, we invite you to contact us directly. We are prepared to provide detailed information about sourcing, processing parameters, testing procedures, and documentation.
            </p>
            <p className="text-sm text-gray-700 font-medium mb-8">
              Transparency does not stop at the website.
            </p>

            <Button asChild variant="outline" className="rounded-none px-10 py-6 text-[11px] uppercase tracking-[0.2em] border-[#1E2A3A] text-[#1E2A3A] hover:bg-[#1E2A3A] hover:text-white">
              <Link to="/FAQ">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-8 bg-[#1E2A3A]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Important Information</p>
          <p className="text-[10px] text-gray-500 leading-relaxed max-w-2xl mx-auto">
            These statements have not been evaluated by the Food and Drug Administration (FDA). Vitabae products are not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </section>
    </div>
  );
}
