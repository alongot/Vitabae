import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Handshake, Factory, FlaskConical, ShieldCheck, Thermometer, ClipboardCheck, Microscope, Lock, Leaf } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WhyPremium() {

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .fromTo('.wp-hero-label', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
        .fromTo('.wp-hero-title', { y: 60, opacity: 0, clipPath: 'inset(100% 0 0 0)' }, { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1 }, '-=0.2')
        .fromTo('.wp-hero-copy', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.4');

      // Scroll-triggered sections
      document.querySelectorAll('.wp-section').forEach((el) => {
        gsap.fromTo(el,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%' } }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#FFFBF5] min-h-screen">

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1 — HERO
          ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-[#1E2A3A] text-white py-24 md:py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="wp-hero-label text-[10px] uppercase tracking-[0.3em] text-[#E8A598] font-semibold mb-6 block">
              Why premium supplements cost more
            </span>
            <p className="wp-hero-label text-[10px] uppercase tracking-[0.15em] text-gray-500 mb-8">
              Transparency by design
            </p>
            <div className="overflow-hidden">
              <h1 className="wp-hero-title text-3xl md:text-5xl lg:text-6xl font-light leading-tight mb-8">
                You're not paying for a brand. You're paying for a <span className="font-serif italic">process.</span>
              </h1>
            </div>
            <p className="wp-hero-copy text-gray-400 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
              A process that controls, verifies, and documents every step from farm to finished capsule.
            </p>
          </div>

          {/* What separates... */}
          <div className="wp-section max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-xl md:text-2xl font-light text-white mb-4">
              What separates a good supplement from a <span className="font-serif italic">trustworthy</span> one?
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed mb-3">
              <strong className="text-gray-300">The Short Answer: control at every stage.</strong>
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              What's in it? Where did it come from? Who tested it? How was it stored? We built every system on this page so we could answer these clearly. That costs more. But you're never taking our word for it. You're trusting a process.
            </p>
          </div>

          {/* Three Pillar Cards */}
          <div className="wp-section grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: MapPin,
                title: 'Farm-Level Sourcing',
                copy: 'Every ingredient is traced to its source and qualified over multiple harvests before it enters production.',
                question: 'Where does it start?',
              },
              {
                icon: Handshake,
                title: 'Ethical Partnerships',
                copy: 'We pay fairly and build long-term partnerships with our producers. The same reliable ingredients, every time.',
                question: 'What keeps quality consistent?',
              },
              {
                icon: Factory,
                title: 'In-House Manufacturing',
                copy: 'We are. In our own facility. Under our own control. At every step.',
                question: "Who's actually making it?",
              },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 hover:bg-white/10 transition-colors">
                  <Icon size={24} className="text-[#E8A598] mb-4" />
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">{card.question}</p>
                  <h3 className="text-base font-medium text-white mb-3">{card.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{card.copy}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2 — FARM TO CAPSULE
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="wp-section mb-14">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#E8A598] font-bold">01</span>
              <span className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-semibold">Farm to Capsule — Sourcing & Verification</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-[#1E2A3A] mb-4">
              Your capsule starts with months of work <span className="font-serif italic">you'll never see.</span>
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Each ingredient goes through a multi-month, sometimes multi-year, qualification process before it's approved for production. We don't rush this step. It's the foundation of everything that follows — and that's reflected in the pricing.
            </p>
            <p className="text-sm text-gray-500 font-medium italic">
              Premium raw materials don't come cheap or fast. That's the point.
            </p>
          </div>

          {/* Subheading */}
          <div className="wp-section mb-8">
            <h3 className="text-lg font-medium text-[#1E2A3A] mb-2">Every ingredient has a name, a source, and a record</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              We approve suppliers based on documented evidence and demonstrated consistency across multiple harvest cycles. Not a single purchase order.
            </p>
          </div>

          {/* Four Pillar Cards */}
          <div className="wp-section grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {[
              {
                icon: ClipboardCheck,
                title: 'Traceability to Source',
                copy: 'Every raw material is linked to an identified farm or producer group, with lot and batch records maintained through every processing stage.',
              },
              {
                icon: Leaf,
                title: 'Multi-Season Assessment',
                copy: "We evaluate consistency across multiple harvests, not single-season snapshots, because nature varies and our products shouldn't.",
              },
              {
                icon: FlaskConical,
                title: 'Potency Confirmation',
                copy: "We verify what's in each ingredient and how much is active through both our own quality testing and independent lab analysis. Every batch.",
              },
              {
                icon: ShieldCheck,
                title: 'Post-Harvest Verification',
                copy: 'Drying protocols, storage conditions, and handling procedures are reviewed to prevent contamination or degradation before materials reach us.',
              },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <Icon size={20} className="text-[#1E2A3A] mb-3" />
                  <h3 className="text-sm font-medium text-[#1E2A3A] mb-2">{card.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{card.copy}</p>
                </div>
              );
            })}
          </div>

          <p className="wp-section text-sm text-gray-500 italic text-center">
            Premium raw materials aren't found overnight. That's the point.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3 — ETHICAL PARTNERSHIPS
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="wp-section mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#E8A598] font-bold">02</span>
              <span className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-semibold">Ethical Sourcing & Fair Partnerships</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-[#1E2A3A] mb-4">
              We pay more for our ingredients. <span className="font-serif italic">On purpose.</span>
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Ethical sourcing costs more. We could source cheaper materials. But the lowest-cost supplier is rarely the most reliable one. So we build long-term, equitable relationships with our agricultural producers.
            </p>
          </div>

          {/* What We Do vs What If We Didn't */}
          <div className="wp-section grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F0F9F0] border border-[#C8D6B9]/30 rounded-xl p-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#6B8E23] mb-5">What We Do</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6B8E23] flex-shrink-0 mt-1.5" />
                  We pay fair prices because it keeps quality consistent and supply chains stable.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6B8E23] flex-shrink-0 mt-1.5" />
                  Relationships are built over years, not single purchase orders.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6B8E23] flex-shrink-0 mt-1.5" />
                  Quality standards are shared across every step from soil to shipment.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6B8E23] flex-shrink-0 mt-1.5" />
                  The same reliable ingredients arrive every time.
                </li>
              </ul>
            </div>

            <div className="bg-red-50/50 border border-red-100 rounded-xl p-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-red-400 mb-5">What If We Didn't?</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 mt-1.5" />
                  Sourcing becomes unpredictable and supply chains break down.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 mt-1.5" />
                  Producers face pressure to cut corners.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 mt-1.5" />
                  Inconsistent materials start showing up in your capsules.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 mt-1.5" />
                  You'd be buying the same name, but not the same thing.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4 — IN-HOUSE ACCOUNTABILITY
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="wp-section mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#E8A598] font-bold">03</span>
              <span className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-semibold">In-House Manufacturing & Accountability</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-[#1E2A3A] mb-4">
              We don't let someone else produce what carries <span className="font-serif italic">our name.</span>
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Controlling where ingredients come from is only half the story. What happens to them in production matters just as much. We didn't want to share a room. So we built our own facility — <strong>Vitabae Labs India Pvt. Ltd.</strong> — with direct control over every single stage.
            </p>
            <p className="text-sm text-gray-500 italic mb-3">
              In-house manufacturing costs more than outsourcing. But it's the only way to control every stage.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              From material receipt to finished capsule, every operation is procedurally defined, documented, and quality-reviewed.
            </p>
          </div>

          {/* Six Capability Cards */}
          <div className="wp-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {[
              {
                icon: Lock,
                title: 'Controlled Intake & Quarantine',
                copy: 'Incoming materials are systematically sampled and held until Quality Assurance issues formal release authorization. Nothing moves forward unchecked.',
              },
              {
                icon: ClipboardCheck,
                title: 'Lot-Level Traceability',
                copy: 'Every raw material, intermediate stage, and finished capsule is linked through identification codes and manufacturing records, traceable back to specific production runs.',
              },
              {
                icon: Factory,
                title: 'Equipment Qualification',
                copy: 'All equipment follows Design, Installation, Operational, and Performance Qualification protocols with scheduled calibration programs preventing cross-contamination.',
              },
              {
                icon: Microscope,
                title: 'Test-to-Release Protocols',
                copy: 'Production batches remain quarantined until all internal and third-party analytical results pass quality review. Any deviation triggers formal investigation.',
              },
              {
                icon: ShieldCheck,
                title: 'Controlled Environments',
                copy: 'Critical operations are performed in classified clean environments with documented cleaning validation, line clearance, and hygiene verification protocols.',
              },
              {
                icon: Thermometer,
                title: 'Bioactive Protection',
                copy: 'Specialized processing equipment and in-house drying systems protect labile active constituents that are easily degraded by improper handling.',
              },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <Icon size={20} className="text-[#1E2A3A] mb-3" />
                  <h3 className="text-sm font-medium text-[#1E2A3A] mb-2">{card.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{card.copy}</p>
                </div>
              );
            })}
          </div>

          <div className="wp-section bg-[#FAF8F5] border border-gray-100 rounded-xl p-8 text-center">
            <p className="text-sm text-gray-600 leading-relaxed">
              This is how you get consistency. We own everything behind it. The facility. The equipment. The schedule. The standards. <strong className="text-[#1E2A3A]">All ours. The result is yours.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5 — IS IT WORTH IT?
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="wp-section">
            <h2 className="text-2xl md:text-3xl font-light text-[#1E2A3A] mb-6">
              So, is the cost of a premium supplement <span className="font-serif italic">worth it?</span>
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              We could have cut the price. We'd just have to cut the process too. Less testing. Less documentation. Less traceability. Less certainty. That's the real cost of quality supplement production — not just the ingredients, but everything behind them.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed font-medium mb-10">
              We don't take shortcuts with your trust. Every step on this page exists because of that.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
              <Button asChild className="bg-[#1E2A3A] hover:bg-[#2d3d4d] text-white rounded-none px-8 py-6 text-[11px] uppercase tracking-[0.2em] font-medium group">
                <Link to="/OurProcess">
                  Our Process
                  <ArrowRight size={14} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-none px-8 py-6 text-[11px] uppercase tracking-[0.2em] border-gray-300 text-gray-500 hover:text-[#1E2A3A] hover:border-[#1E2A3A]">
                <Link to="/Science">
                  Science & Standards
                  <ArrowRight size={14} className="ml-2" />
                </Link>
              </Button>
            </div>

            {/* Disclaimer */}
            <p className="text-[10px] text-gray-400 leading-relaxed italic max-w-xl mx-auto">
              These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Individual results may vary. Always consult your healthcare provider before starting any new dietary supplement, especially if you are pregnant, nursing, taking medications, or have a medical condition. The information on this website is for educational purposes only and is not intended as medical advice.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
