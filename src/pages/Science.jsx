import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  ArrowRight, FlaskConical, ShieldCheck, Leaf, Award, FileCheck, Sparkles,
  BookOpen, Beaker, Scale, Factory, Eye, ChevronDown, ChevronRight,
  CheckCircle2, AlertTriangle, Microscope, GraduationCap
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Certification data ── */
const CERTIFICATIONS = [
  {
    id: 'formulation',
    icon: Beaker,
    title: 'In-House Formulation',
    copy: 'Our formulas are developed and tested by Vitabae\'s own R&D team. They are not purchased as finished blends or white-labeled products. This allows tighter control over what goes into each capsule and ensures the formula on the label matches the formula in the bottle.',
  },
  {
    id: 'cgmp',
    icon: Factory,
    title: 'cGMP-Compliant Manufacturing',
    copy: 'Every batch is produced under strict cGMP guidelines, with written procedures governing each stage of production. Equipment is qualified, processes are validated, and cleaning and sanitation protocols are documented and verified. Each batch undergoes a formal quality review before release. This is not simply a label; it is the operational standard behind every product we produce.',
  },
  {
    id: 'organic',
    icon: Leaf,
    title: '100% Organic',
    copy: 'Every ingredient is certified organic. Our raw materials comply with USDA Organic standards and India\'s National Programme for Organic Production (NPOP). Supplier certificates are verified, and full chain-of-custody documentation is maintained from farm to capsule. Organic regulations vary: the United States allows 95% content for an "organic" label, while India and the European Union require 100%. We follow the stricter 100% standard.',
  },
  {
    id: 'vegan',
    icon: Sparkles,
    title: 'Certified Vegan',
    copy: 'No animal-derived ingredients or processing aids are used. Ingredient origins are verified during supplier qualification, prior to any certification claim.',
  },
  {
    id: 'clean',
    icon: Eye,
    title: 'Clean Label',
    copy: 'Ingredient lists are concise and transparent. No unnecessary artificial additives. No obscure chemical names. For organic products, no artificial ingredients are used. For other formats, only minimal approved excipients required for stability or manufacturability are included.',
  },
];

export default function Science() {
  const heroRef = useRef(null);
  const [expandedCert, setExpandedCert] = useState(null);
  const [activeSection, setActiveSection] = useState(0);

  // Section refs for scroll spy
  const sectionRefs = {
    hero: useRef(null),
    meaning: useRef(null),
    dosing: useRef(null),
    formulate: useRef(null),
    certs: useRef(null),
    transparency: useRef(null),
  };

  const NAV_ITEMS = [
    { label: 'Overview', ref: 'hero' },
    { label: 'Science-Based', ref: 'meaning' },
    { label: 'Dosing', ref: 'dosing' },
    { label: 'Formulation', ref: 'formulate' },
    { label: 'Certifications', ref: 'certs' },
    { label: 'Transparency', ref: 'transparency' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .fromTo('.sci-hero-label', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
        .fromTo('.sci-hero-title', { y: 80, opacity: 0, clipPath: 'inset(100% 0 0 0)' }, { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1.2 }, '-=0.2')
        .fromTo('.sci-hero-sub', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.4')
        .fromTo('.sci-hero-pillar', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, '-=0.3');

      // Scroll-triggered sections
      document.querySelectorAll('.sci-section').forEach((el) => {
        gsap.fromTo(el,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%' } }
        );
      });

      // Scroll spy
      Object.entries(sectionRefs).forEach(([key, ref], i) => {
        if (ref.current) {
          ScrollTrigger.create({
            trigger: ref.current,
            start: 'top 40%',
            end: 'bottom 40%',
            onEnter: () => setActiveSection(i),
            onEnterBack: () => setActiveSection(i),
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToSection = (refKey) => {
    const ref = sectionRefs[refKey];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-[#FFFBF5] min-h-screen">

      {/* Sticky Section Nav */}
      <div className="sticky top-16 z-40 bg-white/95 backdrop-blur border-b border-gray-100 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto no-scrollbar">
            {NAV_ITEMS.map((item, i) => (
              <button
                key={item.ref}
                onClick={() => scrollToSection(item.ref)}
                className={`whitespace-nowrap px-5 py-3.5 text-[10px] uppercase tracking-[0.12em] font-medium border-b-2 transition-colors ${
                  activeSection === i
                    ? 'border-[#1E2A3A] text-[#1E2A3A]'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1 — HERO
          ═══════════════════════════════════════════════════════════════ */}
      <section ref={sectionRefs.hero} className="bg-[#1E2A3A] text-white py-24 md:py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="sci-hero-label text-[10px] uppercase tracking-[0.3em] text-[#E8A598] font-semibold mb-3 block">
            Our Research Methodology
          </span>
          <div className="overflow-hidden">
            <h1 className="sci-hero-title text-4xl md:text-6xl lg:text-7xl mb-6">
              <span className="font-light">Science-based </span>
              <span className="font-serif italic">supplements</span>
            </h1>
          </div>
          <p className="sci-hero-sub text-gray-400 text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto mb-10">
            Evidence-bounded formulation defines our approach.
          </p>

          {/* Three pillars */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8">
            {[
              { icon: BookOpen, text: 'Published human research sets the standard' },
              { icon: FlaskConical, text: 'Independent third-party testing provides verification' },
              { icon: Scale, text: 'Conservative dosing protects long-term safety' },
            ].map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={i} className="sci-hero-pillar flex items-center gap-3 text-left">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-[#E8A598]" />
                  </div>
                  <p className="text-xs text-gray-400 leading-snug max-w-[180px]">{p.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2 — WHAT WE MEAN BY SCIENCE-BASED
          ═══════════════════════════════════════════════════════════════ */}
      <section ref={sectionRefs.meaning} className="py-20 px-4 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="sci-section grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-12 items-start">
            {/* Left — sticky heading */}
            <div className="md:sticky md:top-32">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#E8A598] font-bold mb-3 block">What It Means</span>
              <h2 className="text-2xl md:text-3xl font-light text-[#1E2A3A] mb-4">
                What we mean by <span className="font-serif italic">science-based</span>
              </h2>
            </div>

            {/* Right — content */}
            <div>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Every formula begins with published human research, not broad claims. We look closely at who was studied, how many participants were involved, what dose was used, and for how long. We prioritize randomized, double-blind, placebo-controlled human trials and rigorously evaluate study design, dosage range, duration, and measured endpoints before an ingredient is ever considered.
              </p>

              {/* Interactive evidence hierarchy */}
              <div className="bg-white border border-gray-100 rounded-xl p-6 mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Evidence Hierarchy We Follow</h4>
                <div className="space-y-2">
                  {[
                    { level: 1, label: 'Meta-analyses & Systematic Reviews', bar: '100%', color: '#1E2A3A' },
                    { level: 2, label: 'Randomized, Double-Blind, Placebo-Controlled Trials', bar: '85%', color: '#2d4a5a' },
                    { level: 3, label: 'Open-Label Human Studies', bar: '60%', color: '#5B8DB8' },
                    { level: 4, label: 'Traditional Use Documentation', bar: '40%', color: '#C8D6B9' },
                    { level: 5, label: 'In Vitro / Animal Studies', bar: '20%', color: '#E8A598' },
                  ].map((item) => (
                    <div key={item.level} className="group">
                      <div className="flex items-center gap-3">
                        <span className="text-[9px] font-bold text-gray-400 w-4">{item.level}</span>
                        <div className="flex-grow">
                          <div className="h-8 rounded-md relative overflow-hidden bg-gray-50">
                            <div
                              className="h-full rounded-md transition-all duration-700 flex items-center px-3"
                              style={{ width: item.bar, backgroundColor: item.color }}
                            >
                              <span className="text-[10px] font-medium text-white truncate">{item.label}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-gray-400 mt-3 text-center">We formulate from the top down. In vitro data alone never qualifies an ingredient.</p>
              </div>

              <div className="bg-[#FAF8F5] border border-gray-100 rounded-xl p-6">
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  When science is still developing, we say so. If human research isn't there, neither is the ingredient.
                </p>
                <p className="text-sm text-gray-700 font-medium">
                  That is not a limitation. It is how science-based supplementation is meant to work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3 — DOSING APPROACH
          ═══════════════════════════════════════════════════════════════ */}
      <section ref={sectionRefs.dosing} className="py-20 px-4 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="sci-section mb-12">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#E8A598] font-bold mb-3 block">Dosing Methodology</span>
            <h2 className="text-2xl md:text-3xl font-light text-[#1E2A3A] mb-6">
              Understanding our <span className="font-serif italic">dosing approach</span>
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              A woman's body changes throughout adulthood — from metabolism and digestion to hormonal balance, stress response, and nutrient needs. Our supplement dosing methodology accounts for these transitions while considering your specific life stage.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              At the same time, research has not answered every question. Most clinical trials study broad adult populations. For a science-backed women's supplement, that means we prioritize trials conducted in female participants — but an ingredient shown to support stress response in women aged 20–45 does not clarify whether a 25-year-old requires a different dose than a 42-year-old. When that level of specificity is unavailable, we do not extend conclusions beyond the available evidence.
            </p>
          </div>

          {/* Conservative by Design — Interactive Visual */}
          <div className="sci-section bg-white border border-gray-100 rounded-2xl overflow-hidden">
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#1E2A3A] flex items-center justify-center">
                  <ShieldCheck size={18} className="text-white" />
                </div>
                <h3 className="text-lg font-medium text-[#1E2A3A]">Conservative by design</h3>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Just because an ingredient is natural does not mean it is safe at any amount. So how are supplement doses determined?
              </p>

              {/* Dosing Philosophy Visual */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-[#F0F9F0] border border-[#C8D6B9]/30 rounded-xl p-5 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#C8D6B9]/30 flex items-center justify-center mx-auto mb-3">
                    <Scale size={20} className="text-[#6B8E23]" />
                  </div>
                  <h4 className="text-xs font-bold text-[#1E2A3A] uppercase tracking-wider mb-2">Safety Margins</h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed">Conservative safety margins built into every formula for long-term daily use.</p>
                </div>
                <div className="bg-[#FAF8F5] border border-gray-100 rounded-xl p-5 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#E8A598]/20 flex items-center justify-center mx-auto mb-3">
                    <BookOpen size={20} className="text-[#E8A598]" />
                  </div>
                  <h4 className="text-xs font-bold text-[#1E2A3A] uppercase tracking-wider mb-2">Research-Backed</h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed">Amounts supported by published research, not doses designed to impress on a label.</p>
                </div>
                <div className="bg-[#FAF8F5] border border-gray-100 rounded-xl p-5 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#5B8DB8]/15 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 size={20} className="text-[#5B8DB8]" />
                  </div>
                  <h4 className="text-xs font-bold text-[#1E2A3A] uppercase tracking-wider mb-2">Consistent Delivery</h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed">Appropriate dosing delivered consistently, because more is not inherently better.</p>
                </div>
              </div>

              <p className="text-xs text-gray-500 italic text-center">
                What matters is appropriate dosing, supported by research and delivered consistently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4 — HOW WE FORMULATE
          ═══════════════════════════════════════════════════════════════ */}
      <section ref={sectionRefs.formulate} className="py-20 px-4 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="sci-section mb-12">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#E8A598] font-bold mb-3 block">Formulation Process</span>
            <h2 className="text-2xl md:text-3xl font-light text-[#1E2A3A] mb-6">
              How we <span className="font-serif italic">formulate</span>
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Every formula begins in the literature. Evidence-based supplement formulation means peer-reviewed studies, meta-analyses, established safety references, and documented traditional use.
            </p>
          </div>

          {/* Interactive Pipeline */}
          <div className="sci-section relative">
            {/* Vertical connector line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200 hidden md:block" />

            {[
              {
                icon: BookOpen,
                title: 'Literature Review',
                text: 'Peer-reviewed studies, meta-analyses, established safety references, and documented traditional use form the foundation.',
                color: '#1E2A3A',
              },
              {
                icon: Beaker,
                title: 'Production Trials',
                text: 'Research becomes reality. We evaluate particle size (consistent absorption), blend uniformity (same composition per capsule), capsule fill accuracy, disintegration, and stability over time.',
                color: '#5B8DB8',
              },
              {
                icon: Microscope,
                title: 'HPLC Quantification',
                text: 'Active compounds are quantified using High-Performance Liquid Chromatography (HPLC) — an analytical method that precisely measures the concentration of key bioactive ingredients.',
                color: '#D4A0C0',
              },
              {
                icon: FlaskConical,
                title: 'Stability Testing',
                text: 'Formulations undergo stability testing under carefully defined temperature and humidity conditions to confirm potency is maintained throughout the product\'s shelf life.',
                color: '#E8A598',
              },
              {
                icon: CheckCircle2,
                title: 'Validation & Release',
                text: 'A formula advances only when testing confirms it performs exactly as intended. By the time it reaches your bottle, it hasn\'t just been assembled — it has been measured, verified, and validated.',
                color: '#6B8E23',
              },
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="relative flex items-start gap-5 mb-6 group">
                  {/* Node */}
                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center border-[3px] border-white shadow-sm transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${step.color}18` }}
                    >
                      <Icon size={18} style={{ color: step.color }} />
                    </div>
                  </div>
                  {/* Card */}
                  <div className="flex-grow bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md hover:border-gray-200 transition-all">
                    <h4 className="text-sm font-medium text-[#1E2A3A] mb-1.5">{step.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{step.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="sci-section mt-8 text-center">
            <p className="text-sm text-gray-600 font-medium">
              Each stage is documented. Every result is reviewed.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5 — CERTIFICATIONS
          ═══════════════════════════════════════════════════════════════ */}
      <section ref={sectionRefs.certs} className="py-20 px-4 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="sci-section text-center mb-12">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#E8A598] font-bold mb-3 block">Certifications</span>
            <h2 className="text-2xl md:text-3xl font-light text-[#1E2A3A] mb-3">
              What our certifications <span className="font-serif italic">mean</span>
            </h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto">
              Every certification on our label has a process behind it. Here's what each one means in practice.
            </p>
          </div>

          {/* Accordion-style certification cards */}
          <div className="sci-section space-y-3">
            {CERTIFICATIONS.map((cert) => {
              const Icon = cert.icon;
              const isOpen = expandedCert === cert.id;

              return (
                <div
                  key={cert.id}
                  className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${
                    isOpen ? 'border-gray-300 shadow-md' : 'border-gray-100 hover:border-gray-200'
                  }`}
                  onClick={() => setExpandedCert(isOpen ? null : cert.id)}
                >
                  <div className="flex items-center gap-4 p-5 md:p-6">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      isOpen ? 'bg-[#1E2A3A]' : 'bg-[#FAF8F5]'
                    }`}>
                      <Icon size={18} className={isOpen ? 'text-white' : 'text-[#1E2A3A]'} />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-sm font-medium text-[#1E2A3A]">{cert.title}</h3>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`text-gray-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </div>

                  {isOpen && (
                    <div className="px-5 md:px-6 pb-6 pt-0 animate-in fade-in duration-300">
                      <div className="ml-15 pl-15">
                        <p className="text-sm text-gray-600 leading-relaxed">{cert.copy}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <p className="sci-section text-xs text-gray-500 italic text-center mt-6">
            If we state it, it is backed by records we can provide.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 6 — TRANSPARENCY
          ═══════════════════════════════════════════════════════════════ */}
      <section ref={sectionRefs.transparency} className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="sci-section text-center mb-12">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#E8A598] font-bold mb-3 block">Our Commitment</span>
            <h2 className="text-2xl md:text-3xl font-light text-[#1E2A3A] mb-6">
              Transparency as <span className="font-serif italic">practice</span>
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              We document every formulation decision. We distinguish between strong evidence and emerging research. We state clearly what the data show and what they do not.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              That sounds simple. In this industry, it is not.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Trust is not built through dramatic claims. It is built through consistency — alignment between the label, the website, and the lab records. It also means acknowledging when a question does not yet have a clear answer. That is what transparency looks like here.
            </p>
          </div>

          {/* Interactive trust signal */}
          <div className="sci-section bg-[#1E2A3A] rounded-2xl p-8 md:p-10 text-white text-center mb-12">
            <h3 className="text-lg font-light mb-3">Review it for yourself.</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-8">
              The research is open. The process is documented. The products reflect the work behind them.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="bg-[#E8A598] hover:bg-[#d4897c] text-white rounded-none px-8 py-5 text-[11px] uppercase tracking-[0.2em] font-medium group">
                <Link to="/Library">
                  Visit Our Library
                  <ArrowRight size={14} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-none px-8 py-5 text-[11px] uppercase tracking-[0.2em] border-white/20 text-white hover:bg-white/10 hover:text-white">
                <Link to="/OurProcess">
                  Discover Our Process
                  <ArrowRight size={14} className="ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-none px-8 py-5 text-[11px] uppercase tracking-[0.2em] border-white/20 text-white hover:bg-white/10 hover:text-white">
                <Link to="/Collection">
                  Shop Supplements
                  <ArrowRight size={14} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-[10px] text-gray-400 leading-relaxed italic text-center max-w-xl mx-auto">
            These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Individual results may vary. Always consult your healthcare provider before starting any new dietary supplement, especially if you are pregnant, nursing, taking medications, or have a medical condition. The information on this website is for educational purposes only and is not intended as medical advice.
          </p>
        </div>
      </section>
    </div>
  );
}
