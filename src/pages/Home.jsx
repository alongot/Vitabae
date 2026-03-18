import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Leaf, Shield, MapPin, CheckCircle2, ChevronDown, Play } from 'lucide-react';
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

  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [hoveredStage, setHoveredStage] = useState(null);
  const stageVideoRefs = useRef([]);
  const stageScrollRef = useRef(null);

  const scrollStages = (direction) => {
    const container = stageScrollRef.current;
    if (!container) return;
    const cardWidth = container.querySelector('.stage-card')?.offsetWidth || 340;
    container.scrollBy({ left: direction * (cardWidth + 20), behavior: 'smooth' });
  };

  /* ── Quiz questions ── */
  const quizQuestions = [
    {
      id: 1,
      question: 'Which best describes your current life stage?',
      cols: 2,
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
      question: 'What matters most to you right now?',
      cols: 3,
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
      cols: 3,
      options: [
        { text: 'High', value: 'high', description: 'Stressed most days' },
        { text: 'Moderate', value: 'moderate', description: 'Occasional stress' },
        { text: 'Low', value: 'low', description: 'I manage stress well' },
      ],
    },
    {
      id: 4,
      question: 'How is your digestion lately?',
      cols: 3,
      options: [
        { text: 'Needs help', value: 'frequent', description: 'Frequent discomfort' },
        { text: 'So-so', value: 'sometimes', description: 'Occasional issues' },
        { text: 'Great', value: 'rarely', description: 'Rarely any issues' },
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
          { y: 120, opacity: 0, clipPath: 'inset(100% 0 -10% 0)' },
          { y: 0, opacity: 1, clipPath: 'inset(0% 0 -10% 0)', duration: 1.2, stagger: 0.15 }
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
      gsap.to('.hero-image img', {
        yPercent: -8,
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

      /* LIFE STAGES — staggered left/right pop-up */
      const stagesTl = gsap.timeline({
        scrollTrigger: { trigger: stagesRef.current, start: 'top 75%' }
      });
      stagesTl
        .fromTo('.stages-left',
          { x: -80, opacity: 0, scale: 0.95 },
          { x: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }
        )
        .fromTo('.stages-divider',
          { scaleY: 0, opacity: 0, transformOrigin: 'top center' },
          { scaleY: 1, opacity: 1, duration: 0.8, ease: 'power3.inOut' },
          '-=0.7'
        )
        .fromTo('.stages-right',
          { x: 80, opacity: 0, y: 20 },
          { x: 0, opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
          '-=0.5'
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

      /* INSTAGRAM */
      const igTl = gsap.timeline({
        scrollTrigger: { trigger: '.ig-text', start: 'top 85%' }
      });
      igTl
        .fromTo('.ig-text',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
        )
        .fromTo('.ig-img',
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' },
          '-=0.4'
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
      <section ref={heroRef} className="relative min-h-[100vh] flex items-stretch bg-[#F5F1EC] overflow-hidden">
        <style>{`
          @keyframes heroMarble {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
        `}</style>

        {/* Left — Product image (50%), image fills the entire half */}
        <div className="hero-image hidden lg:block w-1/2 relative bg-[#F5F1EC]">
          <img
            src="/images/ilona-isha.jpg"
            alt="Vitabae bottle"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>

        {/* Right — Marble texture (50%) */}
        <div className="hidden lg:block w-1/2 relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(ellipse at 20% 50%, rgba(180,170,200,0.6) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 20%, rgba(200,195,210,0.5) 0%, transparent 45%),
                radial-gradient(ellipse at 60% 80%, rgba(160,155,185,0.4) 0%, transparent 50%),
                radial-gradient(ellipse at 40% 30%, rgba(220,215,230,0.7) 0%, transparent 40%),
                radial-gradient(ellipse at 90% 60%, rgba(175,168,195,0.5) 0%, transparent 45%),
                radial-gradient(ellipse at 10% 80%, rgba(195,188,210,0.4) 0%, transparent 50%),
                linear-gradient(135deg, #C5BED0 0%, #B8B0C5 25%, #D0C8DC 50%, #AEA5BE 75%, #C2BAD0 100%)
              `,
              backgroundSize: '200% 200%, 200% 200%, 200% 200%, 200% 200%, 200% 200%, 200% 200%, 100% 100%',
              animation: 'heroMarble 20s ease-in-out infinite',
            }}
          >
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `
                linear-gradient(125deg, transparent 30%, rgba(255,255,255,0.4) 32%, transparent 34%),
                linear-gradient(200deg, transparent 55%, rgba(255,255,255,0.3) 57%, transparent 59%),
                linear-gradient(340deg, transparent 40%, rgba(255,255,255,0.25) 42%, transparent 44%),
                linear-gradient(160deg, transparent 65%, rgba(200,195,220,0.3) 67%, transparent 69%),
                linear-gradient(80deg, transparent 20%, rgba(255,255,255,0.2) 22%, transparent 24%)
              `,
            }} />
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `
                radial-gradient(circle at 30% 40%, rgba(255,255,255,0.5) 0%, transparent 25%),
                radial-gradient(circle at 70% 60%, rgba(180,175,200,0.4) 0%, transparent 30%),
                radial-gradient(circle at 50% 20%, rgba(255,255,255,0.3) 0%, transparent 20%)
              `,
            }} />
          </div>
        </div>

        {/* Mobile product image */}
        <div className="hero-image lg:hidden absolute top-0 left-0 w-full h-full">
          <img
            src="/images/ilona-isha.jpg"
            alt="Vitabae bottle"
            className="w-full h-full object-cover object-center opacity-30"
          />
        </div>

        {/* Text — dead center of the entire hero, on top of everything */}
        <div className="hero-content absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-8">
          <h1 className="text-white leading-[1.15] tracking-tight drop-shadow-md">
            <span className="hero-title-line block font-light text-3xl md:text-4xl lg:text-5xl xl:text-6xl whitespace-nowrap">Dietary supplements designed around</span>
            <span className="hero-title-line block font-serif italic mt-2 text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-wide">your life stages.</span>
          </h1>

          <div className="hero-cta mt-10">
            <Button asChild className="bg-[#1E2A3A] hover:bg-[#2d3d4d] text-white rounded-none px-10 py-6 text-[11px] uppercase tracking-[0.2em] font-medium inline-flex items-center gap-3 group">
              <Link to="/Collection">
                Explore our formula
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
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
          LIFE-STAGE INTRO + ROLLING PRODUCTS
      ══════════════════════════════════════════════════════════ */}
      <section ref={stagesRef} className="py-10 md:py-14 bg-white">
        <div className="w-full px-0">
          <div className="stages-header flex flex-col md:flex-row items-start gap-6 md:gap-0 mb-10 px-6 lg:px-8">
            {/* Left — heading */}
            <div className="stages-left md:w-1/2 md:pr-10">
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#1E2A3A] leading-[1.1] text-left">
                <span className="font-light">Because life doesn't stay the same</span>
                <br />
                <span className="font-serif italic">and neither do your needs.</span>
              </h2>
            </div>

            {/* Divider */}
            <div className="stages-divider hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-[#1E2A3A]/15 to-transparent origin-top" />

            {/* Right — description */}
            <div className="stages-right md:w-1/2 md:pl-10 flex items-center">
              <p className="text-gray-500 text-lg md:text-xl leading-[1.8]">
                Nutritional needs may vary across different stages of life.
                That's why Vitabae offers distinct formulas organized by life stage, designed to make exploration simpler and easier to understand.
              </p>
            </div>
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center justify-end gap-2 mb-5 px-6 lg:px-12">
            <button
              onClick={() => scrollStages(-1)}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#1E2A3A] hover:text-white hover:border-[#1E2A3A] transition-all duration-300"
              aria-label="Previous"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() => scrollStages(1)}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#1E2A3A] hover:text-white hover:border-[#1E2A3A] transition-all duration-300"
              aria-label="Next"
            >
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Auto-rolling product cards with manual scroll */}
          <div ref={stageScrollRef} className="stage-cards-grid overflow-hidden w-full">
            <div className="flex gap-5 animate-stage-scroll hover:[animation-play-state:paused] w-max">
              {[...lifeStages, ...lifeStages].map((stage, i) => {
                const realIndex = i % lifeStages.length;
                return (
                  <Link key={`${stage.label}-${i}`} to={stage.path} className="stage-card group block flex-shrink-0 w-[80vw] sm:w-[45vw] md:w-[30vw] lg:w-[22vw]">
                    <div className="relative bg-[#FAFAF8] rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-lg h-full flex flex-col overflow-hidden">
                      {/* Product image + video hover */}
                      <div
                        className="relative aspect-[4/5] overflow-hidden"
                        style={{ backgroundColor: `${stage.color}15` }}
                        onMouseEnter={() => setHoveredStage(realIndex)}
                        onMouseLeave={() => setHoveredStage(null)}
                      >
                        <img
                          src="/images/ilona-isha.jpg"
                          alt={stage.label}
                          className="w-full h-full object-cover mix-blend-multiply opacity-85 group-hover:scale-110 transition-transform duration-700"
                        />
                        <video
                          ref={el => { if (i < lifeStages.length) stageVideoRefs.current[realIndex] = el; }}
                          src="/videos/bottle-spin.mp4"
                          muted
                          loop
                          playsInline
                          className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-500 ${hoveredStage === realIndex ? 'opacity-100' : 'opacity-0'}`}
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
                );
              })}
            </div>
          </div>

          <p className="text-center text-[11px] text-gray-400 mt-6 italic px-6">
            Selection is based on life stage categories and is not intended as medical advice.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 4 — GUIDED DISCOVERY / QUIZ  (Help me without deciding for me)
      ══════════════════════════════════════════════════════════ */}
      <section ref={quizRef} className="py-16 md:py-24 bg-[#FFFBF5]">
        <div className="container mx-auto px-6">
          <div className="quiz-inner max-w-5xl mx-auto">

            {/* Quiz not started */}
            {quizStep === 0 && (
              <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
                {/* Left — spinning life stages circle */}
                <div className="relative flex-shrink-0 w-[320px] h-[320px] md:w-[380px] md:h-[380px]">
                  {/* Outer dashed orbit ring */}
                  <div className="absolute inset-4 rounded-full border-[1.5px] border-dashed border-[#1E2A3A]/12" />

                  {/* Spinning life stage labels around the orbit */}
                  <div className="absolute inset-0 animate-spin-orbit" style={{ transformOrigin: 'center center' }}>
                    {lifeStages.map((stage, i) => {
                      const angle = (360 / lifeStages.length) * i;
                      const rad = (angle * Math.PI) / 180;
                      // Radius of orbit (half the container minus some padding)
                      const r = 145;
                      const x = Math.cos(rad - Math.PI / 2) * r;
                      const y = Math.sin(rad - Math.PI / 2) * r;
                      return (
                        <div
                          key={stage.label}
                          className="absolute"
                          style={{
                            left: '50%',
                            top: '50%',
                            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                          }}
                        >
                          <span
                            className="whitespace-nowrap text-[10px] md:text-[11px] font-medium tracking-wide px-3 py-1.5 rounded-full border bg-white/90 backdrop-blur-sm shadow-sm animate-counter-spin-orbit block"
                            style={{
                              color: stage.color === '#F5E6A3' ? '#8B7A2B' : stage.color,
                              borderColor: `${stage.color}50`,
                            }}
                          >
                            {stage.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Center circle — segmented life stage colors */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[130px] h-[130px] md:w-[150px] md:h-[150px] rounded-full shadow-2xl overflow-hidden"
                      style={{
                        background: `conic-gradient(
                          ${lifeStages[0].color} 0deg ${360/7}deg,
                          ${lifeStages[1].color} ${360/7}deg ${2*360/7}deg,
                          ${lifeStages[2].color} ${2*360/7}deg ${3*360/7}deg,
                          ${lifeStages[3].color} ${3*360/7}deg ${4*360/7}deg,
                          ${lifeStages[4].color} ${4*360/7}deg ${5*360/7}deg,
                          ${lifeStages[5].color} ${5*360/7}deg ${6*360/7}deg,
                          ${lifeStages[6].color} ${6*360/7}deg 360deg
                        )`,
                      }}
                    />
                  </div>
                </div>

                {/* Right — text content */}
                <div className="flex-1 text-center md:text-left">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#E8A598] font-semibold mb-4">Personalized Wellness</p>
                  <h2 className="text-3xl md:text-5xl text-[#1E2A3A] leading-tight mb-5">
                    <span className="font-light">Find Your</span>{' '}
                    <span className="font-serif italic">Personalized Formula</span>
                  </h2>
                  <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-lg mb-8">
                    Smart recommendations based on your specific age, lifestyle, and wellness goals. Takes less than 2 minutes.
                  </p>

                  <Button onClick={() => setQuizStep(1)} className="bg-[#1E2A3A] hover:bg-[#2d3d4d] text-white rounded-full px-12 py-7 text-[12px] uppercase tracking-[0.2em] font-medium group">
                    Start Discovery Quiz
                    <ArrowRight size={15} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <p className="text-[10px] text-gray-400 mt-4">No sign-up required</p>
                </div>
              </div>
            )}

            {/* Quiz questions */}
            {quizStep >= 1 && quizStep <= quizQuestions.length && (() => {
              const q = quizQuestions[quizStep - 1];
              return (
                <div className="animate-fade-in">
                  {/* Step indicators */}
                  <div className="flex items-center justify-center gap-2 mb-8">
                    {quizQuestions.map((_, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300 ${
                          i + 1 < quizStep ? 'bg-[#C8D6B9] text-white' :
                          i + 1 === quizStep ? 'bg-[#1E2A3A] text-white scale-110' :
                          'bg-gray-100 text-gray-400'
                        }`}>
                          {i + 1 < quizStep ? <CheckCircle2 size={14} /> : i + 1}
                        </div>
                        {i < quizQuestions.length - 1 && (
                          <div className={`w-10 h-0.5 rounded transition-colors duration-300 ${i + 1 < quizStep ? 'bg-[#C8D6B9]' : 'bg-gray-100'}`} />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Back button */}
                  {quizStep > 1 && (
                    <button
                      onClick={() => setQuizStep(quizStep - 1)}
                      className="text-[10px] text-gray-400 hover:text-[#1E2A3A] uppercase tracking-wider transition-colors flex items-center gap-1 mb-6"
                    >
                      <ArrowRight size={10} className="rotate-180" /> Back
                    </button>
                  )}

                  <h3 className="text-2xl md:text-4xl text-[#1E2A3A] text-center mb-10 font-light">
                    {q.question}
                  </h3>

                  <div className={`grid gap-3 max-w-2xl mx-auto ${
                    q.cols === 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'
                  }`}>
                    {q.options.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          const newAnswers = { ...quizAnswers, [q.id]: opt.value };
                          setQuizAnswers(newAnswers);
                          setTimeout(() => setQuizStep(quizStep + 1), 400);
                        }}
                        className={`text-center p-5 border-2 rounded-2xl transition-all duration-300 hover:border-[#1E2A3A] hover:shadow-lg hover:-translate-y-1 ${
                          quizAnswers[q.id] === opt.value
                            ? 'border-[#1E2A3A] bg-[#1E2A3A]/5 shadow-lg -translate-y-1'
                            : 'border-gray-100 bg-white'
                        }`}
                      >
                        <span className="text-sm font-semibold text-[#1E2A3A] block">{opt.text}</span>
                        {opt.description && (
                          <span className="text-[11px] text-gray-400 mt-1 block leading-relaxed">{opt.description}</span>
                        )}
                      </button>
                    ))}
                  </div>
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
                  {/* Completed steps */}
                  <div className="flex items-center justify-center gap-2 mb-8">
                    {quizQuestions.map((_, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#C8D6B9] text-white flex items-center justify-center">
                          <CheckCircle2 size={14} />
                        </div>
                        {i < quizQuestions.length - 1 && <div className="w-10 h-0.5 rounded bg-[#C8D6B9]" />}
                      </div>
                    ))}
                  </div>

                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#E8A598] font-semibold mb-3">Your Results</p>
                  <h3 className="text-3xl md:text-4xl text-[#1E2A3A] mb-3">
                    <span className="font-light">We recommend: </span>
                    <span className="font-serif italic">{result.stage}</span>
                  </h3>
                  <p className="text-gray-500 text-sm mb-10 max-w-md mx-auto leading-relaxed">
                    Based on your answers, here are ingredients commonly explored during this life stage.
                  </p>

                  <div className="grid grid-cols-3 gap-5 mb-10 max-w-lg mx-auto">
                    {result.ingredients.map((ing) => (
                      <div key={ing} className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                        <img src="/images/ilona-isha.jpg" alt={ing} className="w-full aspect-square object-cover rounded-xl mb-3 mix-blend-multiply bg-[#EBEAE6]" />
                        <p className="text-sm font-semibold text-[#1E2A3A]">{ing}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild className="bg-[#1E2A3A] hover:bg-[#2d3d4d] text-white rounded-full px-10 py-6 text-[11px] uppercase tracking-[0.2em] font-medium">
                      <Link to={result.path}>
                        View {result.stage} Collection
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => { setQuizStep(0); setQuizAnswers({}); }}
                      className="rounded-full px-8 py-6 text-[11px] uppercase tracking-[0.2em] border-gray-200 text-gray-500 hover:text-[#1E2A3A] hover:border-[#1E2A3A]"
                    >
                      Retake Quiz
                    </Button>
                  </div>

                  <p className="text-[10px] text-gray-300 mt-8 italic max-w-sm mx-auto">
                    These suggestions are for educational purposes only and are not intended as medical advice.
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
      <section ref={mapRef} className="bg-white">
        <div className="w-full">

          {/* Map — full width when no selection, side-by-side when selected */}
          <div className="map-container">

            {/* No ingredient selected — full-width map */}
            {!selected && (
              <div className="relative bg-[#FAFAF8] overflow-hidden w-full">
                {/* Header — above the map */}
                <div className="pt-14 md:pt-20 pb-8 px-6 text-center">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#E8A598] font-semibold mb-4">Sourced With Intention</p>
                  <h2 className="text-3xl md:text-5xl text-[#1E2A3A] leading-tight mb-4">
                    <span className="font-light">See where your ingredients </span>
                    <span className="font-serif italic">come from.</span>
                  </h2>
                  <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
                    We work directly with partner farms so you can see where each plant is grown and who grows it.
                  </p>
                </div>

                {/* Map */}
                <div className="relative w-full" style={{ height: 'clamp(400px, 75vh, 900px)', minHeight: '400px' }}>
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
                <div className="px-5 md:px-8 pb-3 md:pb-4">
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex flex-wrap justify-center gap-x-1.5 gap-y-1">
                      {ingredients.map((ing, i) => (
                        <button
                          key={ing.name}
                          onClick={() => { setActiveIngredient(i); setShowVideo(false); }}
                          onMouseEnter={() => setHoveredPin(i)}
                          onMouseLeave={() => setHoveredPin(null)}
                          className={`text-[9px] md:text-[10px] py-0.5 px-2 rounded-full transition-all duration-200 ${
                            hoveredPin === i
                              ? 'bg-[#1E2A3A]/10 text-[#1E2A3A]'
                              : 'text-gray-400 hover:text-[#1E2A3A] hover:bg-gray-100'
                          }`}
                        >
                          {ing.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-center text-[10px] text-gray-300 pb-5 italic px-6">
                  All information presented is provided for transparency and educational purposes only.
                </p>
              </div>
            )}

            {/* Ingredient selected — full-width detail panel */}
            {selected && (
              <div ref={ingredientDetailRef} className="bg-[#FAFAF8] overflow-hidden w-full">
                {/* Ingredient switcher bar */}
                <div className="bg-white border-b border-gray-100 px-5 md:px-8 py-3">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setActiveIngredient(null)}
                      className="text-[10px] text-gray-400 hover:text-[#1E2A3A] uppercase tracking-wider transition-colors flex items-center gap-1.5 mr-4 flex-shrink-0"
                    >
                      <ArrowLeft size={12} /> Back to map
                    </button>
                    <div className="flex flex-wrap gap-1.5">
                      {ingredients.map((ing, i) => (
                        <button
                          key={ing.name}
                          onClick={() => { setActiveIngredient(i); setShowVideo(false); }}
                          className={`text-[9px] md:text-[10px] py-1 px-2.5 rounded-full transition-all duration-200 ${
                            activeIngredient === i
                              ? 'bg-[#1E2A3A] text-white font-semibold'
                              : 'text-gray-400 hover:text-[#1E2A3A] hover:bg-gray-100'
                          }`}
                        >
                          {ing.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 bg-[#F5F1EC]">
                  {/* Left — Farm Video */}
                  <div className="relative h-[300px] sm:h-[380px] lg:h-full min-h-[450px] overflow-hidden">
                    <video
                      src="/videos/farm-documentary.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover opacity-70"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent p-6 md:p-8">
                      <p className="text-[9px] uppercase tracking-[0.25em] text-[#E8A598] font-semibold mb-1">Farm to Formula</p>
                      <p className="text-white text-lg md:text-xl font-light">{selected.region}</p>
                    </div>
                  </div>

                  {/* Right — Ingredient Detail Card */}
                  <div className="bg-[#f0ece3] flex items-center justify-center py-10 px-6 lg:px-10">
                    <div className="w-full max-w-[520px] border border-[#d8d0c0] px-8 py-8 md:px-10 md:py-10 bg-[#f0ece3]">

                      {/* Eyebrow with line */}
                      <div className="flex items-center gap-4 mb-5">
                        <span className="text-[0.6rem] uppercase tracking-[0.22em] text-[#8a7e6a] whitespace-nowrap font-medium">Every ingredient has a source.</span>
                        <span className="flex-1 h-px bg-[#b5a88a]" />
                      </div>

                      {/* Title */}
                      <div className="mb-7">
                        <h3 className="text-[3.2rem] leading-[1.05] text-[#2a2418] font-normal font-serif tracking-tight mb-1">{selected.name}</h3>
                        <p className="text-[1.05rem] text-[#5a5040] font-serif italic font-light tracking-wide">{selected.scientific}</p>
                      </div>

                      {/* Info table */}
                      <div className="border border-[#d8d0c0] mb-7">
                        {[
                          { label: 'Source', value: selected.region },
                          { label: 'Partnership', value: selected.partnership },
                          { label: 'Part Used', value: selected.plantPart },
                          { label: 'Traceability', value: selected.traceability },
                        ].map((item, i, arr) => (
                          <div key={i} className={`grid grid-cols-[130px_1fr] ${i < arr.length - 1 ? 'border-b border-[#d8d0c0]' : ''}`}>
                            <span className="text-[0.6rem] uppercase tracking-[0.2em] text-[#8a7e6a] px-4 py-4 border-r border-[#d8d0c0] flex items-start pt-[1.1rem]">
                              {item.label}
                            </span>
                            <span className="text-[0.95rem] leading-[1.6] text-[#2a2418] px-4 py-4 font-serif">
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <Link
                        to="/Collection"
                        className="block w-full bg-[#2e4030] hover:bg-[#3d5441] text-[#f0ece3] text-center py-4 text-[0.65rem] uppercase tracking-[0.22em] font-medium transition-colors"
                      >
                        View products containing this ingredient
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          REVIEWS — Real People, Real Results
      ══════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-[#FFF5ED] overflow-hidden">
        <style>{`
          @keyframes reviewsScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>

        {/* Heading left-aligned */}
        <div className="px-6 lg:px-8 mb-10">
          <h2 className="text-3xl md:text-5xl lg:text-6xl text-[#1E2A3A] leading-tight">
            <span className="font-light">Real people, </span>
            <span className="font-serif italic">real results.</span>
          </h2>
        </div>

        {/* Single scrolling row */}
        <div>
          <div className="flex w-max hover:[animation-play-state:paused]" style={{ animation: 'reviewsScroll 60s linear infinite' }}>
            {(() => {
              const reviews = [
                { name: 'Priya M.', text: 'I finally found supplements I can trust during pregnancy. The single-ingredient approach gives me confidence in exactly what I\'m taking.', img: 'https://i.pravatar.cc/400?img=32', product: 'Organic Shatavari', productId: 'shatavari-capsules' },
                { name: 'Sarah K.', text: 'The Ashwagandha has been a game-changer for my stress levels. I feel more balanced than I have in years.', img: 'https://i.pravatar.cc/400?img=25', product: 'Organic Ashwagandha', productId: 'ashwagandha-capsules' },
                { name: 'Anita R.', text: 'Love the transparency — knowing exactly where each ingredient comes from and that it\'s been batch tested.', img: 'https://i.pravatar.cc/400?img=44', product: 'Organic Amla', productId: 'amla-capsules' },
                { name: 'Maya L.', text: 'Clean, simple, and effective. No fillers, no guessing. Just pure ingredients that actually work.', img: 'https://i.pravatar.cc/400?img=47', product: 'Organic Moringa', productId: 'moringa-leaf-capsules' },
                { name: 'Deepa S.', text: 'My doctor was impressed by the quality and traceability. These are the supplements I\'ll stick with.', img: 'https://i.pravatar.cc/400?img=45', product: 'Organic Ginger', productId: 'ginger-capsules' },
                { name: 'Kavitha N.', text: 'The Moringa has been incredible for my energy levels postpartum. I recommend it to all new moms.', img: 'https://i.pravatar.cc/400?img=9', product: 'Organic Moringa', productId: 'moringa-leaf-capsules' },
                { name: 'Rhea T.', text: 'The Shatavari has helped me so much through menopause. I love that it\'s sourced from the Himalayas.', img: 'https://i.pravatar.cc/400?img=23', product: 'Organic Shatavari', productId: 'shatavari-capsules' },
                { name: 'Neha P.', text: 'I\'ve tried so many brands. Vitabae is the first one where I actually feel a difference — and I trust the sourcing.', img: 'https://i.pravatar.cc/400?img=19', product: 'Organic Ashwagandha', productId: 'ashwagandha-capsules' },
              ];
              return [...reviews, ...reviews].map((review, i) => (
                <div key={i} className="flex-shrink-0 w-[520px] h-[280px] mx-3 bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-row">
                  {/* Left — Name + Review + Product */}
                  <div className="flex-1 p-7 flex flex-col">
                    <p className="text-[#1E2A3A] font-semibold text-lg mb-2">{review.name}</p>
                    <p className="text-gray-500 text-[14px] leading-relaxed flex-1">"{review.text}"</p>
                    <Link to={`/Product?id=${review.productId}`} className="mt-4 flex items-center gap-3 group">
                      <img src="/images/ilona-isha.jpg" alt={review.product} className="w-11 h-11 rounded-lg object-cover" />
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.15em] text-gray-400">Product used</p>
                        <p className="text-[#1E2A3A] font-medium text-sm group-hover:text-[#E8A598] transition-colors">{review.product}</p>
                      </div>
                      <ArrowRight size={12} className="ml-auto text-gray-300 group-hover:text-[#E8A598] group-hover:translate-x-1 transition-all" />
                    </Link>
                  </div>

                  {/* Right — Person image */}
                  <div className="w-[200px] shrink-0">
                    <img src={review.img} alt={review.name} className="w-full h-full object-cover" />
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          NEWSLETTER
      ══════════════════════════════════════════════════════════ */}
      <section ref={innerCircleRef} className="py-12 md:py-16 bg-[#FAF8F5]">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-5xl lg:text-6xl text-[#1E2A3A] leading-[1.1] mb-3">
            <span className="font-light">Join the </span>
            <span className="font-serif italic">Vitabae Club</span>
          </h2>
          <p className="text-gray-400 text-sm mb-8">Subscribe for updates and discounts.</p>
          <div className="relative w-full max-w-lg mx-auto mb-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-white border border-gray-200 text-[#1E2A3A] placeholder-gray-400 px-5 py-3.5 pr-12 text-sm focus:outline-none focus:border-[#1E2A3A] rounded-full transition-colors"
            />
            <button className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#1E2A3A] flex items-center justify-center hover:bg-[#2d3d4d] transition-colors">
              <ArrowRight size={14} className="text-white" />
            </button>
          </div>
          <p className="text-gray-400 text-[11px]">
            By subscribing you agree to our <Link to="/Terms" className="underline hover:text-[#1E2A3A] transition-colors">Terms of Service</Link> and <Link to="/Privacy" className="underline hover:text-[#1E2A3A] transition-colors">Privacy Policy</Link>.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          INSTAGRAM
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#f5f0eb]">
        <div
          className="w-full overflow-hidden hidden lg:grid"
          style={{
            gridTemplateColumns: '1fr 1fr 1.4fr 1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            height: '400px',
          }}
        >
          {/* Row 1 left */}
          <div className="ig-img overflow-hidden" style={{ gridColumn: 1, gridRow: 1 }}>
            <img src="/images/ilona-isha.jpg" alt="Vitabae" className="w-full h-full object-cover hover:scale-[1.06] transition-transform duration-500" />
          </div>
          <div className="ig-img overflow-hidden" style={{ gridColumn: 2, gridRow: 1 }}>
            <img src="/images/ilona-isha.jpg" alt="Vitabae" className="w-full h-full object-cover brightness-95 hover:scale-[1.06] transition-transform duration-500" />
          </div>

          {/* CTA center — spans both rows */}
          <div className="ig-text bg-[#e8e0d5] flex flex-col items-center justify-center px-8 py-9 text-center" style={{ gridColumn: 3, gridRow: '1 / 3' }}>
            <span className="text-[10px] font-medium tracking-[0.22em] uppercase text-[#5a5248] mb-3">Follow Us</span>
            <h2 className="font-serif text-[38px] font-normal text-[#2c2622] leading-[1.15] mb-4">On Instagram</h2>
            <p className="text-[13px] font-light text-[#5a5248] leading-[1.65] mb-7 max-w-[220px]">
              Tag <strong className="font-medium text-[#2c2622]">@thevitabae</strong> in your Instagram photos for a chance to be featured here.
            </p>
            <a
              href="https://www.instagram.com/thevitabae/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1e1b18] hover:bg-[#3d3530] text-[#f0ebe4] text-[10.5px] font-semibold tracking-[0.22em] uppercase px-8 py-3.5 rounded-full transition-all hover:-translate-y-px"
            >
              Follow Us
            </a>
          </div>

          {/* Row 1 right */}
          <div className="ig-img overflow-hidden" style={{ gridColumn: 4, gridRow: 1 }}>
            <img src="/images/ilona-isha.jpg" alt="Vitabae" className="w-full h-full object-cover saturate-[0.9] hover:scale-[1.06] transition-transform duration-500" />
          </div>
          <div className="ig-img overflow-hidden" style={{ gridColumn: 5, gridRow: 1 }}>
            <img src="/images/ilona-isha.jpg" alt="Vitabae" className="w-full h-full object-cover brightness-105 hover:scale-[1.06] transition-transform duration-500" />
          </div>

          {/* Row 2 left */}
          <div className="ig-img overflow-hidden" style={{ gridColumn: 1, gridRow: 2 }}>
            <img src="/images/ilona-isha.jpg" alt="Vitabae" className="w-full h-full object-cover brightness-105 hover:scale-[1.06] transition-transform duration-500" />
          </div>
          <div className="ig-img overflow-hidden" style={{ gridColumn: 2, gridRow: 2 }}>
            <img src="/images/ilona-isha.jpg" alt="Vitabae" className="w-full h-full object-cover saturate-[0.85] hover:scale-[1.06] transition-transform duration-500" />
          </div>

          {/* Row 2 right */}
          <div className="ig-img overflow-hidden" style={{ gridColumn: 4, gridRow: 2 }}>
            <img src="/images/ilona-isha.jpg" alt="Vitabae" className="w-full h-full object-cover hover:scale-[1.06] transition-transform duration-500" />
          </div>
          <div className="ig-img overflow-hidden" style={{ gridColumn: 5, gridRow: 2 }}>
            <img src="/images/ilona-isha.jpg" alt="Vitabae" className="w-full h-full object-cover brightness-95 hover:scale-[1.06] transition-transform duration-500" />
          </div>
        </div>

        {/* Mobile fallback */}
        <div className="lg:hidden px-4">
          <div className="text-center mb-6">
            <span className="text-[10px] font-medium tracking-[0.22em] uppercase text-[#5a5248] block mb-2">Follow Us</span>
            <h2 className="font-serif text-3xl text-[#2c2622] mb-3">On Instagram</h2>
            <p className="text-[12px] text-[#5a5248] leading-relaxed mb-5 max-w-[240px] mx-auto">
              Tag <strong className="font-medium text-[#2c2622]">@thevitabae</strong> in your Instagram photos for a chance to be featured here.
            </p>
            <a href="https://www.instagram.com/thevitabae/" target="_blank" rel="noopener noreferrer" className="bg-[#1e1b18] text-[#f0ebe4] text-[10px] font-semibold tracking-[0.22em] uppercase px-7 py-3 rounded-full inline-block">Follow Us</a>
          </div>
          <div className="grid grid-cols-4 gap-1">
            <img src="/images/ilona-isha.jpg" alt="Vitabae" className="w-full aspect-square object-cover" />
            <img src="/images/ilona-isha.jpg" alt="Vitabae" className="w-full aspect-square object-cover brightness-95" />
            <img src="/images/ilona-isha.jpg" alt="Vitabae" className="w-full aspect-square object-cover brightness-105" />
            <img src="/images/ilona-isha.jpg" alt="Vitabae" className="w-full aspect-square object-cover saturate-[0.9]" />
          </div>
        </div>
      </section>

    </div>
  );
}
