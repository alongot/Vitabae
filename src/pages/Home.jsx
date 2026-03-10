import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Shield, MapPin, CheckCircle2, ChevronDown, Play, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import TiltBottle from '@/components/TiltBottle';
import IndiaMap from '@/components/IndiaMap';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Life-stage data ── */
const lifeStages = [
  { label: 'Reproductive Age', desc: 'Explore supplements commonly chosen during the reproductive years.', color: '#E8A598', path: '/Collection?stage=reproductive' },
  { label: 'Pre-Conception', desc: 'Discover products often considered when preparing for pregnancy.', color: '#C8D6B9', path: '/Collection?stage=preconception' },
  { label: 'Pregnancy', desc: 'Browse supplements formulated for use during pregnancy.', color: '#F5E6A3', path: '/Collection?stage=pregnancy' },
  { label: 'Post-Pregnancy & Lactation', desc: 'Explore options commonly selected during postpartum and breastfeeding stages.', color: '#D4B896', path: '/Collection?stage=postpartum' },
  { label: 'Perimenopause', desc: 'View supplements often chosen during the perimenopausal transition.', color: '#B8C9E0', path: '/Collection?stage=perimenopause' },
  { label: 'Menopause', desc: 'Explore products associated with the menopausal stage of life.', color: '#D4A0C0', path: '/Collection?stage=menopause' },
  { label: 'Post-Menopause', desc: 'Browse supplements commonly selected after menopause.', color: '#A8BC96', path: '/Collection?stage=postmenopause' },
];

/* ── Ingredient data with map positions (positioned on India outline) ── */
const ingredients = [
  {
    name: 'Ashwagandha',
    scientific: 'Withania somnifera',
    region: 'Rajasthan, India',
    x: '38%', y: '32%',
    partnership: 'Directly sourced from selected partner farms known for consistent agricultural practices and regional expertise.',
    plantPart: '100% root only',
    traceability: 'Each production lot is documented and linked back to its agricultural source. Documentation available upon request.',
    color: '#D4A574',
  },
  {
    name: 'Amla',
    scientific: 'Phyllanthus emblica',
    region: 'Uttar Pradesh, India',
    x: '52%', y: '28%',
    partnership: 'Sourced from organic farms in Uttar Pradesh with long-standing agricultural traditions.',
    plantPart: 'Whole fruit',
    traceability: 'Full lot documentation from harvest to final product.',
    color: '#A8C686',
  },
  {
    name: 'Ginger',
    scientific: 'Zingiber officinale',
    region: 'Kerala, India',
    x: '42%', y: '72%',
    partnership: 'Family farms in Kerala\'s Western Ghats using traditional organic methods.',
    plantPart: 'Root (rhizome)',
    traceability: 'Each batch tested for gingerol content and linked to source farms.',
    color: '#E8C547',
  },
  {
    name: 'Moringa Leaf',
    scientific: 'Moringa oleifera',
    region: 'Andhra Pradesh, India',
    x: '48%', y: '58%',
    partnership: 'Small family farms using organic practices in Andhra Pradesh.',
    plantPart: 'Young leaves',
    traceability: 'Nutrient content verified per harvest cycle.',
    color: '#7FB069',
  },
  {
    name: 'Shatavari',
    scientific: 'Asparagus racemosus',
    region: 'Himalayan Foothills, India',
    x: '48%', y: '18%',
    partnership: 'Sustainably wild-crafted from Himalayan foothills with minimal environmental impact.',
    plantPart: 'Root',
    traceability: 'Standardized to 40% saponins with full identity testing.',
    color: '#E8A598',
  },
  {
    name: 'Garlic',
    scientific: 'Allium sativum',
    region: 'Madhya Pradesh, India',
    x: '40%', y: '38%',
    partnership: 'Organic garlic from central India farms with rich alluvial soil.',
    plantPart: 'Bulb',
    traceability: 'Allicin content verified per batch.',
    color: '#F5F0DC',
  },
  {
    name: 'Cinnamon',
    scientific: 'Cinnamomum verum',
    region: 'Kerala, India',
    x: '40%', y: '76%',
    partnership: 'Sourced from traditional spice gardens in Kerala.',
    plantPart: 'Inner bark',
    traceability: 'Tested for cinnamaldehyde content and authenticity.',
    color: '#C4834C',
  },
  {
    name: 'Licorice',
    scientific: 'Glycyrrhiza glabra',
    region: 'Gujarat, India',
    x: '30%', y: '36%',
    partnership: 'Partner farms in Gujarat specializing in licorice root cultivation.',
    plantPart: 'Root',
    traceability: 'Glycyrrhizin content standardized per lot.',
    color: '#C9A227',
  },
  {
    name: 'Giloy',
    scientific: 'Tinospora cordifolia',
    region: 'Maharashtra, India',
    x: '38%', y: '48%',
    partnership: 'Harvested from managed forest areas with sustainability protocols.',
    plantPart: 'Stem',
    traceability: 'Identity-verified using botanical authentication.',
    color: '#6B8F5E',
  },
  {
    name: 'Fennel',
    scientific: 'Foeniculum vulgare',
    region: 'Gujarat, India',
    x: '28%', y: '32%',
    partnership: 'Traditional fennel farms in Gujarat\'s semi-arid climate.',
    plantPart: 'Seeds',
    traceability: 'Volatile oil content tested per batch.',
    color: '#B8D4A3',
  },
  {
    name: 'Fenugreek',
    scientific: 'Trigonella foenum-graecum',
    region: 'Rajasthan, India',
    x: '35%', y: '28%',
    partnership: 'Organic farms in Rajasthan with generations of fenugreek expertise.',
    plantPart: 'Seeds',
    traceability: 'Saponin content verified and documented.',
    color: '#D4B896',
  },
];

export default function Home() {
  const heroRef = useRef(null);
  const trustRef = useRef(null);
  const stagesRef = useRef(null);
  const quizRef = useRef(null);
  const mapRef = useRef(null);
  const ingredientDetailRef = useRef(null);

  const innerCircleRef = useRef(null);

  const [activeIngredient, setActiveIngredient] = useState(null);  // clicked — full detail
  const [hoveredPin, setHoveredPin] = useState(null);             // hovered — tooltip only
  const [showVideo, setShowVideo] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [hoveredStage, setHoveredStage] = useState(null);
  const [showAllStages, setShowAllStages] = useState(false);
  const stageVideoRefs = useRef([]);

  /* ── Quiz questions ── */
  const quizQuestions = [
    {
      id: 1,
      question: 'Which best describes your current life stage?',
      options: [
        { text: 'Reproductive age (18–35)', value: 'reproductive', description: 'Everyday wellness & cycle support' },
        { text: 'Preparing for pregnancy', value: 'trying-to-conceive', description: 'Optimizing health before conception' },
        { text: 'Currently pregnant', value: 'pregnancy', description: 'Supporting you and your baby' },
        { text: 'Post-pregnancy / Lactation', value: 'postpartum', description: 'Recovery and new motherhood' },
        { text: 'Perimenopause', value: 'perimenopause', description: 'Navigating the transition' },
        { text: 'Menopause', value: 'menopause', description: 'Hormonal balance & vitality' },
        { text: 'Post-menopause', value: 'postmenopause', description: 'Long-term wellness support' },
      ],
    },
    {
      id: 2,
      question: 'What\'s your primary wellness goal?',
      options: [
        { text: 'Energy & vitality', value: 'energy' },
        { text: 'Stress & mood balance', value: 'stress' },
        { text: 'Digestive comfort', value: 'digestive' },
        { text: 'Hormonal harmony', value: 'hormonal' },
        { text: 'Sleep support', value: 'sleep' },
        { text: 'Skin & hair vitality', value: 'beauty' },
      ],
    },
    {
      id: 3,
      question: 'How would you describe your stress levels?',
      options: [
        { text: 'High — stressed most days', value: 'high' },
        { text: 'Moderate — occasional stress', value: 'moderate' },
        { text: 'Low — I manage stress well', value: 'low' },
      ],
    },
    {
      id: 4,
      question: 'Do you experience occasional digestive discomfort?',
      options: [
        { text: 'Yes, frequently', value: 'frequent' },
        { text: 'Sometimes', value: 'sometimes' },
        { text: 'Rarely or never', value: 'rarely' },
      ],
    },
  ];

  /* ── Video hover for life stage cards ── */
  useEffect(() => {
    stageVideoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (hoveredStage === i) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [hoveredStage]);

  /* ── GSAP Animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {

      /* HERO */
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .fromTo('.hero-title-line',
          { y: 120, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
          { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1.2, stagger: 0.15 }
        )
        .fromTo('.hero-subtitle',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.5'
        )
        .fromTo('.hero-cta',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.4'
        )
        .fromTo('.hero-image',
          { y: 60, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' },
          '-=0.8'
        )
        .fromTo('.hero-scroll-hint',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.3'
        );

      // Hero parallax
      gsap.to('.hero-image', {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1.5 }
      });
      gsap.to('.hero-content', {
        opacity: 0, y: -60, ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: '30% top', end: '70% top', scrub: true }
      });

      /* TRUST BADGES */
      gsap.fromTo('.trust-badge',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: trustRef.current, start: 'top 85%' }
        }
      );

      /* LIFE STAGES */
      gsap.fromTo('.stages-header',
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: stagesRef.current, start: 'top 80%' }
        }
      );
      gsap.fromTo('.stage-card',
        { y: 80, opacity: 0, rotateX: 10 },
        {
          y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.stage-cards-grid', start: 'top 85%' }
        }
      );

      /* QUIZ */
      gsap.fromTo('.quiz-inner > *',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: quizRef.current, start: 'top 80%' }
        }
      );

      /* MAP */
      const mapTl = gsap.timeline({
        scrollTrigger: { trigger: mapRef.current, start: 'top 75%' }
      });
      mapTl
        .fromTo('.map-header', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
        .fromTo('.map-container', { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'power2.out' }, '-=0.4')
        .fromTo('.map-pin', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.04, ease: 'back.out(2)' }, '-=0.5');

      /* INNER CIRCLE */
      gsap.fromTo('.circle-inner > *',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: innerCircleRef.current, start: 'top 80%' }
        }
      );

    });
    return () => ctx.revert();
  }, []);

  // Animate ingredient detail when it appears
  useEffect(() => {
    if (activeIngredient !== null && ingredientDetailRef.current) {
      gsap.fromTo(ingredientDetailRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );
      // Scroll to detail
      setTimeout(() => {
        ingredientDetailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [activeIngredient]);

  const selected = activeIngredient !== null ? ingredients[activeIngredient] : null;

  return (
    <div className="bg-white w-full overflow-x-hidden font-sans">

      {/* ══════════════════════════════════════════════════════════
          SECTION 1 — HERO  (Is this for me?)
      ══════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center bg-gradient-to-b from-[#FFFBF5] to-[#FAF5EE] overflow-hidden">
        <div className="container mx-auto px-6 lg:px-16 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left — Copy */}
            <div className="hero-content relative z-10 max-w-xl">
              <div className="overflow-visible">
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] text-[#1E2A3A] leading-[1.15] tracking-tight pb-2">
                  <span className="hero-title-line block font-light">Dietary supplements</span>
                  <span className="hero-title-line block font-light">designed around</span>
                  <span className="hero-title-line block font-serif italic">your life stages.</span>
                </h1>
              </div>

              <p className="hero-subtitle text-gray-500 text-[15px] md:text-base max-w-md mt-7 leading-relaxed">
                Vitabae offers organic dietary supplements organized by life stage.
                Our approach is built on transparency, traceability, and responsible formulation, so you can make informed choices with confidence.
              </p>

              <div className="hero-cta mt-10">
                <Button asChild className="bg-[#1E2A3A] hover:bg-[#2d3d4d] text-white rounded-none px-10 py-7 text-[11px] uppercase tracking-[0.2em] font-medium inline-flex items-center gap-3 group">
                  <Link to="/Collection">
                    Explore Formulas by Life Stage
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right — Product Bottle 360° spin video */}
            <TiltBottle className="hero-image relative" maxTilt={6} scale={1.02}>
              <div className="relative max-w-[520px] mx-auto">
                <video
                  src="/videos/bottle-spin.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full rounded-2xl"
                  poster="/images/ilona-isha.jpg"
                />
              </div>
            </TiltBottle>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 2 — TRUST & STANDARDS  (Rolling marquee)
      ══════════════════════════════════════════════════════════ */}
      <section ref={trustRef} className="py-5 bg-white border-y border-gray-100 overflow-hidden">
        <div className="trust-marquee flex whitespace-nowrap">
          {[...Array(4)].map((_, rep) => (
            <div key={rep} className="flex items-center gap-12 md:gap-20 px-8 animate-marquee shrink-0">
              {[
                { icon: <Leaf size={18} />, label: '100% Organic' },
                { icon: <Shield size={18} />, label: 'Life-stage\u2013based formulas' },
                { icon: <MapPin size={18} />, label: 'Fully traceable ingredients' },
                { icon: <CheckCircle2 size={18} />, label: 'Batch Tested' },
              ].map((badge, i) => (
                <div key={i} className="trust-badge flex items-center gap-2.5 shrink-0">
                  <div className="text-[#E8A598]">{badge.icon}</div>
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#1E2A3A]/70">{badge.label}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CINEMATIC DIVIDER — Capsule Close-up
      ══════════════════════════════════════════════════════════ */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          src="/videos/capsule-firefly.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/60 mb-4 font-medium">What's Inside Matters</p>
          <h2 className="text-3xl md:text-5xl text-white leading-tight max-w-2xl">
            <span className="font-light">Pure ingredient.</span>
            <br />
            <span className="font-serif italic">Nothing else.</span>
          </h2>
          <p className="text-white/50 text-sm mt-5 max-w-md leading-relaxed">
            Single-ingredient formulas in plant-based capsules. No fillers, no blends, no compromises.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 3 — LIFE-STAGE APPROACH  (Where do I fit?)
      ══════════════════════════════════════════════════════════ */}
      <section ref={stagesRef} className="py-20 md:py-28 bg-white">
        <div className="mx-auto px-6 lg:px-12 max-w-[1400px]">
          <div className="stages-header text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-[2.75rem] text-[#1E2A3A] leading-tight mb-5">
              <span className="font-light">Because life doesn't stay the same</span>
              <br />
              <span className="font-serif italic">and neither do your needs.</span>
            </h2>
            <p className="text-gray-500 text-[15px] leading-relaxed">
              Nutritional needs may vary across different stages of life.
              That's why Vitabae offers distinct formulas organized by life stage, designed to make exploration simpler and easier to understand.
            </p>
          </div>

          {/* Life stage cards — show 4 initially, expand to all */}
          <div className="stage-cards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(showAllStages ? lifeStages : lifeStages.slice(0, 4)).map((stage, i) => (
              <Link key={stage.label} to={stage.path} className="stage-card group block">
                <div className="relative bg-[#FAFAF8] rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-lg h-full flex flex-col overflow-hidden">
                  {/* Product image + video hover */}
                  <div
                    className="relative aspect-[4/5] overflow-hidden"
                    style={{ backgroundColor: `${stage.color}15` }}
                    onMouseEnter={() => setHoveredStage(i)}
                    onMouseLeave={() => setHoveredStage(null)}
                  >
                    <img
                      src="/images/ilona-isha.jpg"
                      alt={stage.label}
                      className="w-full h-full object-cover mix-blend-multiply opacity-85 group-hover:scale-110 transition-transform duration-700"
                    />
                    <video
                      ref={el => stageVideoRefs.current[i] = el}
                      src="/videos/bottle-spin.mp4"
                      muted
                      loop
                      playsInline
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${hoveredStage === i ? 'opacity-100' : 'opacity-0'}`}
                    />
                  </div>
                  {/* Text content */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-[#1E2A3A] mb-2 leading-tight">{stage.label}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-grow">{stage.desc}</p>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#1E2A3A] inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                      View Collection <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View more / View less button */}
          {!showAllStages && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllStages(true)}
                className="inline-flex items-center gap-2 px-8 py-3 border border-[#1E2A3A] text-[#1E2A3A] rounded-full text-sm font-semibold tracking-wide hover:bg-[#1E2A3A] hover:text-white transition-all duration-300"
              >
                View All Stages <ArrowRight size={14} />
              </button>
            </div>
          )}
          {showAllStages && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllStages(false)}
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#1E2A3A] transition-colors"
              >
                Show Less
              </button>
            </div>
          )}

          <p className="text-center text-[11px] text-gray-400 mt-6 italic">
            Selection is based on life stage categories and is not intended as medical advice.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 4 — GUIDED DISCOVERY / QUIZ  (Help me without deciding for me)
      ══════════════════════════════════════════════════════════ */}
      <section ref={quizRef} className="py-16 md:py-24 bg-[#FFFBF5]">
        <div className="container mx-auto px-6">
          <div className="quiz-inner max-w-4xl mx-auto">

            {/* Quiz not started — card layout */}
            {quizStep === 0 && (
              <div className="relative bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="grid md:grid-cols-2">
                  {/* Left — visual side */}
                  <div className="relative bg-gradient-to-br from-[#1E2A3A] to-[#2d4a5a] p-10 md:p-14 flex flex-col justify-center text-white">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#E8A598] font-semibold mb-4 relative z-10">Personalized Wellness</p>
                    <h2 className="text-3xl md:text-4xl leading-tight mb-5 relative z-10">
                      <span className="font-light">Find Your</span>
                      <br />
                      <span className="font-serif italic">Personalized Formula</span>
                    </h2>
                    <p className="text-white/60 text-sm leading-relaxed relative z-10">
                      Smart recommendations based on your specific age, lifestyle, and wellness goals. Takes less than 2 minutes.
                    </p>
                    {/* Decorative dots */}
                    <div className="flex gap-2 mt-8 relative z-10">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full bg-[#E8A598]" style={{ opacity: 1 - i * 0.3 }} />
                      ))}
                    </div>
                  </div>
                  {/* Right — CTA side */}
                  <div className="p-10 md:p-14 flex flex-col justify-center items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-[#FFFBF5] border border-gray-100 flex items-center justify-center mb-6">
                      <Leaf size={24} className="text-[#E8A598]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1E2A3A] mb-3">Discover What's Right For You</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-xs">
                      Answer a few quick questions about your life stage and goals — we'll match you with the right formulas. No accounts, no commitments.
                    </p>
                    <Button onClick={() => setQuizStep(1)} className="bg-[#1E2A3A] hover:bg-[#2d3d4d] text-white rounded-full px-10 py-6 text-[11px] uppercase tracking-[0.2em] font-medium group w-full max-w-xs">
                      Start Discovery Quiz
                      <ArrowRight size={14} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                    <p className="text-[10px] text-gray-400 mt-4">No sign-up required</p>
                  </div>
                </div>
              </div>
            )}

            {/* Quiz questions */}
            {quizStep >= 1 && quizStep <= quizQuestions.length && (() => {
              const q = quizQuestions[quizStep - 1];
              return (
                <div className="animate-fade-in">
                  {/* Progress bar */}
                  <div className="w-full h-1 bg-gray-200 rounded-full mb-10">
                    <div
                      className="h-full bg-[#1E2A3A] rounded-full transition-all duration-500"
                      style={{ width: `${(quizStep / quizQuestions.length) * 100}%` }}
                    />
                  </div>

                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold mb-3 text-center">
                    Question {quizStep} of {quizQuestions.length}
                  </p>
                  <h3 className="text-2xl md:text-3xl text-[#1E2A3A] text-center mb-10 font-light">
                    {q.question}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {q.options.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          const newAnswers = { ...quizAnswers, [q.id]: opt.value };
                          setQuizAnswers(newAnswers);
                          // Auto-advance after selection
                          setTimeout(() => setQuizStep(quizStep + 1), 300);
                        }}
                        className={`text-left p-5 border rounded-xl transition-all duration-300 hover:border-[#1E2A3A] hover:shadow-md ${
                          quizAnswers[q.id] === opt.value
                            ? 'border-[#1E2A3A] bg-[#1E2A3A]/5 shadow-md'
                            : 'border-gray-200 bg-white'
                        }`}
                      >
                        <span className="text-sm font-medium text-[#1E2A3A] block">{opt.text}</span>
                        {opt.description && (
                          <span className="text-xs text-gray-400 mt-1 block">{opt.description}</span>
                        )}
                      </button>
                    ))}
                  </div>

                  {quizStep > 1 && (
                    <button
                      onClick={() => setQuizStep(quizStep - 1)}
                      className="mt-6 text-xs text-gray-400 hover:text-[#1E2A3A] uppercase tracking-wider transition-colors mx-auto block"
                    >
                      &larr; Back
                    </button>
                  )}
                </div>
              );
            })()}

            {/* Quiz results */}
            {quizStep > quizQuestions.length && (() => {
              const lifeStageAnswer = quizAnswers[1];
              const resultMap = {
                'reproductive': { stage: 'Reproductive Age', path: '/Collection?stage=reproductive', ingredients: ['Ashwagandha', 'Shatavari', 'Amla'] },
                'trying-to-conceive': { stage: 'Pre-Conception', path: '/Collection?stage=preconception', ingredients: ['Shatavari', 'Ashwagandha', 'Moringa'] },
                'pregnancy': { stage: 'Pregnancy', path: '/Collection?stage=pregnancy', ingredients: ['Ginger', 'Moringa', 'Amla'] },
                'postpartum': { stage: 'Post-Pregnancy', path: '/Collection?stage=postpartum', ingredients: ['Shatavari', 'Moringa', 'Ashwagandha'] },
                'perimenopause': { stage: 'Perimenopause', path: '/Collection?stage=perimenopause', ingredients: ['Ashwagandha', 'Shatavari', 'Amla'] },
                'menopause': { stage: 'Menopause', path: '/Collection?stage=menopause', ingredients: ['Ashwagandha', 'Shatavari', 'Amla'] },
                'postmenopause': { stage: 'Post-Menopause', path: '/Collection?stage=postmenopause', ingredients: ['Ashwagandha', 'Moringa', 'Amla'] },
              };
              const result = resultMap[lifeStageAnswer] || resultMap['reproductive'];

              return (
                <div className="animate-fade-in text-center">
                  <div className="w-16 h-16 rounded-full bg-[#C8D6B9] flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={28} className="text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl text-[#1E2A3A] mb-3">
                    <span className="font-light">Your stage: </span>
                    <span className="font-serif italic">{result.stage}</span>
                  </h3>
                  <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto leading-relaxed">
                    Based on your answers, here are ingredients commonly explored during this life stage.
                  </p>

                  <div className="grid grid-cols-3 gap-4 mb-10 max-w-lg mx-auto">
                    {result.ingredients.map((ing) => (
                      <div key={ing} className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
                        <img src="/images/ilona-isha.jpg" alt={ing} className="w-full aspect-square object-cover rounded-lg mb-3 mix-blend-multiply bg-[#EBEAE6]" />
                        <p className="text-xs font-semibold text-[#1E2A3A]">{ing}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild className="bg-[#1E2A3A] hover:bg-[#2d3d4d] text-white rounded-none px-10 py-6 text-[11px] uppercase tracking-[0.2em] font-medium">
                      <Link to={result.path}>
                        View {result.stage} Collection
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => { setQuizStep(0); setQuizAnswers({}); }}
                      className="rounded-none px-8 py-6 text-[11px] uppercase tracking-[0.2em] border-gray-300 text-gray-500 hover:text-[#1E2A3A]"
                    >
                      Retake Quiz
                    </Button>
                  </div>

                  <p className="text-[10px] text-gray-400 mt-6 italic max-w-sm mx-auto">
                    These suggestions are for educational purposes only and are not intended as medical advice. Consult your healthcare provider before starting any supplement.
                  </p>
                </div>
              );
            })()}

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 5 & 6 — MAP + INGREDIENT DETAIL
          (Show me — don't tell me / Prove it)
      ══════════════════════════════════════════════════════════ */}
      <section ref={mapRef} className="py-20 md:py-28 bg-white">
        <div className="mx-auto px-6 lg:px-12 max-w-[1400px]">
          <div className="map-header text-center mb-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-[2.75rem] text-[#1E2A3A] leading-tight mb-5">
              <span className="font-light">See where your ingredients </span>
              <span className="font-serif italic">come from.</span>
            </h2>
            <p className="text-gray-500 text-[15px] leading-relaxed">
              We work directly with partner farms so you can see where each plant is grown and who grows it.
            </p>
          </div>

          {/* Map — full width when no selection, side-by-side when selected */}
          <div className="map-container">

            {/* No ingredient selected — full-width map */}
            {!selected && (
              <div className="relative bg-[#1E2A3A] rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative" style={{ height: 'clamp(450px, 60vw, 680px)' }}>
                  <IndiaMap
                    ingredients={ingredients}
                    activeIngredient={hoveredPin}
                    onPinClick={(i) => {
                      setActiveIngredient(i);
                      setShowVideo(false);
                    }}
                    onPinHover={(i) => setHoveredPin(i)}
                  />

                  {/* Hover tooltip */}
                  {hoveredPin !== null && (() => {
                    const hovered = ingredients[hoveredPin];
                    return (
                      <div className="absolute top-6 right-6 bg-white rounded-xl shadow-xl overflow-hidden max-w-[240px] pointer-events-none animate-fade-in z-10">
                        <div className="relative w-full h-32 bg-[#1E2A3A]">
                          <img src="/images/ilona-isha.jpg" alt={hovered.name} className="w-full h-full object-cover opacity-80" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                              <Play size={16} className="text-[#1E2A3A] ml-0.5" />
                            </div>
                          </div>
                        </div>
                        <div className="p-3.5">
                          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#E8A598] mb-0.5">{hovered.region}</p>
                          <p className="text-sm font-semibold text-[#1E2A3A]">{hovered.name}</p>
                          <p className="text-[11px] text-gray-400 font-serif italic mb-1">{hovered.scientific}</p>
                          <p className="text-[9px] text-gray-400">Click to explore details</p>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Bottom ingredient list */}
                <div className="px-5 md:px-8 pb-5 md:pb-6">
                  <div className="border-t border-white/10 pt-4">
                    <div className="flex flex-wrap justify-center gap-x-1.5 gap-y-1">
                      {ingredients.map((ing, i) => (
                        <button
                          key={ing.name}
                          onClick={() => { setActiveIngredient(i); setShowVideo(false); }}
                          onMouseEnter={() => setHoveredPin(i)}
                          onMouseLeave={() => setHoveredPin(null)}
                          className={`text-[9px] md:text-[10px] py-0.5 px-2 rounded-full transition-all duration-200 ${
                            hoveredPin === i
                              ? 'bg-white/10 text-white/80'
                              : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                          }`}
                        >
                          {ing.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Ingredient selected — full-width detail panel */}
            {selected && (
              <div ref={ingredientDetailRef} className="bg-[#FAFAF8] rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Left — Image & map context */}
                  <div className="relative bg-[#1E2A3A] min-h-[350px] lg:min-h-[500px]">
                    <IndiaMap
                      ingredients={ingredients}
                      activeIngredient={activeIngredient}
                      onPinClick={(i) => {
                        setActiveIngredient(i);
                        setShowVideo(false);
                      }}
                      onPinHover={(i) => setHoveredPin(i)}
                    />
                    {/* Ingredient label overlay */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex flex-wrap gap-1.5">
                        {ingredients.map((ing, i) => (
                          <button
                            key={ing.name}
                            onClick={() => { setActiveIngredient(i); setShowVideo(false); }}
                            className={`text-[9px] py-0.5 px-2 rounded-full transition-all duration-200 ${
                              activeIngredient === i
                                ? 'bg-white/20 text-white font-semibold'
                                : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                            }`}
                          >
                            {ing.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right — Detail */}
                  <div className="p-8 md:p-10 lg:p-12">
                    <div className="flex items-start justify-between mb-6">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E8A598]">
                        Every ingredient has a source. This is ours.
                      </p>
                      <button
                        onClick={() => setActiveIngredient(null)}
                        className="text-gray-400 hover:text-[#1E2A3A] transition-colors p-1"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <h3 className="text-3xl text-[#1E2A3A] font-light mb-1">{selected.name}</h3>
                    <p className="text-sm text-gray-400 font-serif italic mb-8">{selected.scientific}</p>

                    <div className="space-y-0">
                      {[
                        { label: 'Source', value: selected.region },
                        { label: 'Farming Partnership', value: selected.partnership },
                        { label: 'Plant Part Used', value: selected.plantPart },
                        { label: 'Traceability', value: selected.traceability },
                      ].map((item, i) => (
                        <div key={i} className="py-4 border-b border-gray-200 last:border-0">
                          <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-gray-400 block mb-1">
                            {item.label}
                          </span>
                          <span className="text-sm text-[#1E2A3A] leading-relaxed">{item.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8">
                      <Button asChild className="w-full bg-[#1E2A3A] hover:bg-[#2d3d4d] text-white rounded-none py-5 text-[10px] uppercase tracking-[0.2em] font-medium group transition-colors justify-center">
                        <Link to="/Collection">
                          View products with {selected.name}
                          <ArrowRight size={12} className="ml-2 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <p className="text-center text-[11px] text-gray-400 mt-6 italic max-w-lg mx-auto">
              All information presented is provided for transparency and educational purposes only.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          INNER CIRCLE — Private Facebook Group
      ══════════════════════════════════════════════════════════ */}
      <section ref={innerCircleRef} className="py-14 md:py-20 bg-[#1E2A3A]">
        <div className="container mx-auto px-6">
          <div className="circle-inner max-w-3xl mx-auto text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#E8A598] font-semibold mb-3">Join The Inner Circle</p>
            <h2 className="text-2xl md:text-3xl text-white leading-tight mb-4">
              <span className="font-light">Get expert wellness tips, early access to new formulas, </span>
              <span className="font-serif italic">and exclusive community benefits.</span>
            </h2>

            {/* CTA to Facebook group */}
            <div className="mt-8 mb-8">
              <Button asChild className="bg-[#E8A598] hover:bg-[#d4917f] text-white rounded-none px-10 py-6 text-[11px] uppercase tracking-[0.2em] font-medium group">
                <a href="https://www.facebook.com/groups/235593375864742" target="_blank" rel="noopener noreferrer">
                  Join Our Private Community
                  <ArrowRight size={14} className="ml-2 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>

            {/* Perks */}
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { label: 'Exclusive Perks' },
                { label: 'Expert Content' },
                { label: 'Member Events' },
              ].map((perk, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#E8A598]" />
                  <span className="text-xs text-white/70 font-medium">{perk.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
