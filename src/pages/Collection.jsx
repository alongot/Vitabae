import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, ArrowRight, X, Check, Leaf, ShieldCheck, Eye } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════════════════════
   LIFE STAGE → INGREDIENT → BENEFIT MAPPING (from guide)
══════════════════════════════════════════════════════════ */
const LIFE_STAGE_DATA = {
  'Reproductive Age': {
    'Ginger':       ['Menstrual comfort'],
    'Cinnamon':     ['Supports healthy insulin levels', 'Menstrual comfort'],
    'Moringa Leaf': ['Oxidative balance support'],
    'Garlic':       ['Metabolic wellness'],
    'Shatavari':    ['Supports reproductive health'],
    'Fenugreek':    ['Menstrual comfort', 'Hormonal balance'],
    'Fennel':       ['Menstrual cycle comfort'],
    'Licorice':     ['Metabolic wellness support'],
    'Ashwagandha':  ['Supports reproductive wellness'],
  },
  'Pregnancy': {
    'Ginger':       ['Digestive comfort'],
  },
  'Post Pregnancy': {
    'Ginger':       ['Lactation support'],
    'Moringa Leaf': ['Lactation support'],
    'Shatavari':    ['Lactation support'],
    'Fenugreek':    ['Lactation support'],
    'Fennel':       ['Lactation support'],
  },
  'Perimenopause': {
    'Shatavari':    ['Menstrual discomfort relief'],
    'Giloy':        ['Comfort during hormonal changes'],
  },
  'Menopause': {
    'Ginger':       ['Supports comfort during menopause'],
    'Cinnamon':     ['Supports overall emotional balance & wellbeing'],
    'Fenugreek':    ['Menopausal comfort'],
    'Giloy':        ['Supports comfort during mid-life hormonal changes'],
    'Ashwagandha':  ['Supports stress balance during hormonal transition'],
  },
  'Post Menopause': {
    'Garlic':       ['Supports heart health'],
    'Shatavari':    ['Supports muscle function & vitality'],
    'Fennel':       ['Supports healthy hormonal balance'],
    'Licorice':     ['Supports overall women\'s wellness'],
    'Ashwagandha':  ['Supports emotional balance & healthy sleep patterns'],
    'Moringa Leaf': ['Antioxidant support'],
  },
};

const LIFE_STAGE_OPTIONS = Object.keys(LIFE_STAGE_DATA);

const STAGE_COLORS = {
  'Reproductive Age': '#E8A598',
  'Pregnancy': '#F5E6A3',
  'Post Pregnancy': '#D4B896',
  'Perimenopause': '#B8C9E0',
  'Menopause': '#D4A0C0',
  'Post Menopause': '#A8BC96',
};

/* ── All ingredients with base info ── */
const ALL_INGREDIENTS = [
  { name: 'Amla',         scientific: 'Phyllanthus emblica',       format: 'Capsule', dosage: '500mg', price: 32, generalBenefit: 'Antioxidant & vitality support' },
  { name: 'Ashwagandha',  scientific: 'Withania somnifera',        format: 'Capsule', dosage: '600mg', price: 38, generalBenefit: 'Adaptogenic stress & energy support' },
  { name: 'Cinnamon',     scientific: 'Cinnamomum verum',          format: 'Capsule', dosage: '500mg', price: 34, generalBenefit: 'Metabolic & blood sugar support' },
  { name: 'Fennel',       scientific: 'Foeniculum vulgare',        format: 'Capsule', dosage: '500mg', price: 32, generalBenefit: 'Digestive & hormonal comfort' },
  { name: 'Fenugreek',    scientific: 'Trigonella foenum-graecum', format: 'Capsule', dosage: '500mg', price: 34, generalBenefit: 'Hormonal balance & comfort' },
  { name: 'Garlic',       scientific: 'Allium sativum',            format: 'Capsule', dosage: '500mg', price: 30, generalBenefit: 'Heart & metabolic wellness' },
  { name: 'Ginger',       scientific: 'Zingiber officinale',       format: 'Capsule', dosage: '500mg', price: 34, generalBenefit: 'Digestive comfort & nausea relief' },
  { name: 'Giloy',        scientific: 'Tinospora cordifolia',      format: 'Capsule', dosage: '500mg', price: 34, generalBenefit: 'Immune & hormonal support' },
  { name: 'Licorice',     scientific: 'Glycyrrhiza glabra',        format: 'Capsule', dosage: '500mg', price: 32, generalBenefit: 'Digestive & respiratory wellness' },
  { name: 'Moringa Leaf', scientific: 'Moringa oleifera',          format: 'Capsule', dosage: '1000mg', price: 32, generalBenefit: 'Nutrient-dense vitality support' },
  { name: 'Shatavari',    scientific: 'Asparagus racemosus',       format: 'Capsule', dosage: '500mg', price: 36, generalBenefit: 'Women\'s reproductive wellness' },
];

/* ══════════════════════════════════════════════════════════
   QUICK VIEW MODAL
══════════════════════════════════════════════════════════ */
function QuickViewModal({ ingredient, selectedStages, onClose, onNavigate }) {
  // Get all benefits across all matching life stages
  const allBenefits = [];
  const stageMatches = [];
  LIFE_STAGE_OPTIONS.forEach(stage => {
    const stageData = LIFE_STAGE_DATA[stage];
    if (stageData && stageData[ingredient.name]) {
      stageMatches.push(stage);
      stageData[ingredient.name].forEach(b => {
        if (!allBenefits.includes(b)) allBenefits.push(b);
      });
    }
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative bg-white max-w-3xl w-full max-h-[85vh] overflow-y-auto rounded-xl shadow-2xl animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
          <X size={16} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left — Image + Video */}
          <div className="relative bg-[#EBEAE6] aspect-square md:aspect-auto md:min-h-[400px]">
            <img src="/images/ilona-isha.jpg" alt={ingredient.name} className="w-full h-full object-cover mix-blend-multiply opacity-90" />
            <video
              src="/videos/bottle-spin.mp4"
              autoPlay muted loop playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <span className="absolute top-3 left-3 bg-[#1E2A3A] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1">
              100% Organic
            </span>
          </div>

          {/* Right — Details */}
          <div className="p-6 md:p-8">
            <p className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-semibold mb-1">Single Ingredient</p>
            <h2 className="text-2xl text-[#1E2A3A] font-light mb-1">{ingredient.name}</h2>
            <p className="text-sm text-gray-400 font-serif italic mb-4">{ingredient.scientific}</p>

            <div className="flex items-center gap-3 text-xs text-gray-500 mb-6">
              <span>{ingredient.format}</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <span>{ingredient.dosage}</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <span className="font-semibold text-[#1E2A3A]">${ingredient.price.toFixed(2)}</span>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-6">{ingredient.generalBenefit}</p>

            {/* Life stage benefits */}
            {stageMatches.length > 0 && (
              <div className="mb-6">
                <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400 font-semibold mb-3">Benefits by Life Stage</p>
                <div className="space-y-2">
                  {stageMatches.map(stage => (
                    <div key={stage} className="flex items-start gap-2.5 text-sm">
                      <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: STAGE_COLORS[stage] }} />
                      <div>
                        <span className="font-medium text-[#1E2A3A] text-xs">{stage}:</span>{' '}
                        <span className="text-gray-500 text-xs">{LIFE_STAGE_DATA[stage][ingredient.name].join(', ')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trust badges */}
            <div className="flex gap-4 mb-6 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-1.5 text-[10px] text-gray-500 uppercase tracking-wider">
                <Leaf size={12} className="text-[#9CB496]" /> Organic
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-gray-500 uppercase tracking-wider">
                <ShieldCheck size={12} className="text-[#9CB496]" /> Lab Tested
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-gray-500 uppercase tracking-wider">
                <Check size={12} className="text-[#9CB496]" /> Plant-Based
              </div>
            </div>

            <Button
              className="w-full bg-[#1E2A3A] hover:bg-[#2d3d4d] text-white rounded-none py-5 text-[10px] uppercase tracking-[0.2em] font-medium"
              onClick={() => {
                const productId = ingredient.name.toLowerCase().replace(/\s*\(.*?\)\s*/g, '').trim().replace(/\s+/g, '-') + '-capsules';
                onClose();
                onNavigate(productId);
              }}
            >
              View Full Details
              <ArrowRight size={12} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   COMPARE DRAWER
══════════════════════════════════════════════════════════ */
function CompareDrawer({ items, onRemove, onClose }) {
  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-2xl animate-fade-in">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1E2A3A]">
            Compare ({items.length}/3)
          </p>
          <button onClick={onClose} className="text-xs text-gray-400 hover:text-[#1E2A3A] uppercase tracking-wider transition-colors">
            Clear All
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {items.map(ing => (
            <div key={ing.name} className="bg-[#FAFAF8] border border-gray-100 rounded-lg p-3 relative">
              <button onClick={() => onRemove(ing.name)} className="absolute top-1 right-1 w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300">
                <X size={10} />
              </button>
              <p className="text-sm font-medium text-[#1E2A3A]">{ing.name}</p>
              <p className="text-[10px] text-gray-400">{ing.dosage} · ${ing.price.toFixed(2)}</p>
              <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">{ing.generalBenefit}</p>
            </div>
          ))}
          {Array.from({ length: 3 - items.length }).map((_, i) => (
            <div key={`empty-${i}`} className="border-2 border-dashed border-gray-200 rounded-lg p-3 flex items-center justify-center">
              <p className="text-[10px] text-gray-300 uppercase tracking-wider">Select a product</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PRODUCT CARD
══════════════════════════════════════════════════════════ */
const ProductCard = ({ ingredient, selectedStages, selectedBenefits, onQuickView, isComparing, onToggleCompare }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (isHovered && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [isHovered]);

  const getContextualInfo = () => {
    if (selectedStages.length === 0) {
      return { benefit: ingredient.generalBenefit, stages: [], allBenefits: [] };
    }
    const matchedStages = [];
    const benefits = [];
    selectedStages.forEach(stage => {
      const stageData = LIFE_STAGE_DATA[stage];
      if (stageData && stageData[ingredient.name]) {
        matchedStages.push(stage);
        stageData[ingredient.name].forEach(b => {
          if (!benefits.includes(b)) benefits.push(b);
        });
      }
    });
    return {
      benefit: benefits.length > 0 ? benefits[0] : ingredient.generalBenefit,
      stages: matchedStages,
      allBenefits: benefits,
    };
  };

  const { benefit, stages, allBenefits } = getContextualInfo();

  return (
    <div className="group block h-full">
      {/* Image / Video */}
      <div
        className="relative bg-[#EBEAE6] overflow-hidden aspect-square mb-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="absolute top-0 left-0 bg-[#1E2A3A] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 z-10">
          100% Organic
        </span>

        <img
          src="/images/ilona-isha.jpg"
          alt={ingredient.name}
          className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        <video
          ref={videoRef}
          src="/videos/bottle-spin.mp4"
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Hover overlay with Quick View + Compare */}
        <div className={`absolute inset-0 bg-black/30 flex flex-col items-center justify-center gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={(e) => { e.preventDefault(); onQuickView(ingredient); }}
            className="bg-white text-[#1E2A3A] text-[10px] uppercase tracking-[0.15em] font-semibold px-5 py-2.5 hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            <Eye size={12} /> Quick View
          </button>
          <button
            onClick={(e) => { e.preventDefault(); onToggleCompare(ingredient); }}
            className={`text-[10px] uppercase tracking-[0.15em] font-semibold px-5 py-2 border transition-colors flex items-center gap-2 ${
              isComparing
                ? 'bg-white text-[#1E2A3A] border-white'
                : 'bg-transparent text-white border-white/60 hover:bg-white/10'
            }`}
          >
            {isComparing ? <><Check size={10} /> Comparing</> : 'Compare'}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col items-start space-y-1">
        <h3 className="font-medium text-[#1E2A3A] text-base group-hover:text-[#F4A492] transition-colors">
          {ingredient.name}
        </h3>
        <p className="text-[11px] text-gray-400 font-serif italic">{ingredient.scientific}</p>
        <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wide">
          <span>{ingredient.format}</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full" />
          <span>{ingredient.dosage}</span>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed mt-1">{benefit}</p>
        {allBenefits.length > 1 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {allBenefits.slice(1).map(b => (
              <span key={b} className="text-[9px] text-[#9CB496] bg-[#f0f7ec] px-1.5 py-0.5 rounded">
                + {b}
              </span>
            ))}
          </div>
        )}
        {stages.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {stages.map(s => (
              <span key={s} className="text-[9px] border text-gray-500 px-2 py-0.5 uppercase tracking-wider" style={{ borderColor: STAGE_COLORS[s], backgroundColor: `${STAGE_COLORS[s]}15` }}>
                {s}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between w-full mt-2">
          <span className="font-medium text-gray-900">${ingredient.price.toFixed(2)}</span>
          <Link
            to={`/Product?id=${ingredient.name.toLowerCase().replace(/\s*\(.*?\)\s*/g, '').trim().replace(/\s+/g, '-')}-capsules`}
            className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#F4A492] hover:text-[#1E2A3A] transition-colors inline-flex items-center gap-1"
          >
            Learn More <ArrowRight size={10} />
          </Link>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   COLLECTION PAGE
══════════════════════════════════════════════════════════ */
export default function Collection() {
  const [searchParams] = useSearchParams();
  const initialStage = searchParams.get('stage');
  const navigate = useNavigate();

  const [filters, setFilters] = useState({ lifeStage: [], benefit: [] });
  const [sortBy, setSortBy] = useState('name');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [compareItems, setCompareItems] = useState([]);

  // Map URL param to life stage name
  useEffect(() => {
    if (initialStage) {
      const stageMap = {
        'reproductive': 'Reproductive Age',
        'pregnancy': 'Pregnancy',
        'postpartum': 'Post Pregnancy',
        'perimenopause': 'Perimenopause',
        'menopause': 'Menopause',
        'postmenopause': 'Post Menopause',
      };
      const mapped = stageMap[initialStage];
      if (mapped && !filters.lifeStage.includes(mapped)) {
        setFilters(prev => ({ ...prev, lifeStage: [mapped] }));
      }
    }
  }, [initialStage]);

  const handleFilterChange = (type, value) => {
    setFilters(prev => {
      const current = prev[type];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      if (type === 'lifeStage') {
        return { ...prev, lifeStage: updated, benefit: [] };
      }
      return { ...prev, [type]: updated };
    });
  };

  const toggleCompare = useCallback((ingredient) => {
    setCompareItems(prev => {
      const exists = prev.find(i => i.name === ingredient.name);
      if (exists) return prev.filter(i => i.name !== ingredient.name);
      if (prev.length >= 3) return prev;
      return [...prev, ingredient];
    });
  }, []);

  const getAvailableBenefits = () => {
    if (filters.lifeStage.length === 0) return [];
    const benefitsSet = new Set();
    filters.lifeStage.forEach(stage => {
      const stageData = LIFE_STAGE_DATA[stage];
      if (stageData) {
        Object.values(stageData).forEach(benefits => {
          benefits.forEach(b => benefitsSet.add(b));
        });
      }
    });
    return Array.from(benefitsSet).sort();
  };

  const availableBenefits = getAvailableBenefits();

  const filteredIngredients = ALL_INGREDIENTS.filter(ing => {
    if (filters.lifeStage.length === 0) return true;
    const inStage = filters.lifeStage.some(stage => {
      const stageData = LIFE_STAGE_DATA[stage];
      return stageData && stageData[ing.name];
    });
    if (!inStage) return false;
    if (filters.benefit.length > 0) {
      const hasBenefit = filters.lifeStage.some(stage => {
        const stageData = LIFE_STAGE_DATA[stage];
        if (!stageData || !stageData[ing.name]) return false;
        return stageData[ing.name].some(b => filters.benefit.includes(b));
      });
      if (!hasBenefit) return false;
    }
    return true;
  });

  const sortedIngredients = [...filteredIngredients].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return a.name.localeCompare(b.name);
  });

  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const guidanceRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.collection-title-line',
        { y: 120, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
        { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1.2, stagger: 0.15, ease: 'power3.out' }
      );
      gsap.fromTo('.collection-subtitle',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.6, ease: 'power3.out' }
      );
      gsap.fromTo('.guidance-card',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: guidanceRef.current, start: 'top 85%' } }
      );
      gsap.fromTo('.guidance-header',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: guidanceRef.current, start: 'top 90%' } }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (sortedIngredients.length === 0) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.product-card-item',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power3.out' }
      );
    }, gridRef);
    return () => ctx.revert();
  }, [filters, sortBy, sortedIngredients.length]);

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-8 pb-24">
      <div className="container mx-auto px-4">

        {/* PAGE HEADER */}
        <div className="mb-12" ref={headerRef}>
          <div className="overflow-hidden">
            <h1 className="text-4xl md:text-6xl text-[#1E2A3A] mb-4 leading-[1.1]">
              <span className="collection-title-line block font-light tracking-tight">Single-Ingredient</span>
              <span className="collection-title-line block font-serif italic">Wellness</span>
            </h1>
          </div>
          <p className="collection-subtitle text-gray-600 max-w-2xl text-lg font-light leading-relaxed">
            Pure, single-ingredient supplements designed for women. Same formulation, contextual support for every life stage.
          </p>
        </div>

        {/* ── VISUAL LIFE STAGE TIMELINE ── */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif text-[#1E2A3A] mb-6">Shop by Life Stage</h2>
          <div className="relative">
            {/* Timeline line removed */}
            <div className="flex flex-wrap md:flex-nowrap gap-3 md:gap-0 md:justify-between">
              {LIFE_STAGE_OPTIONS.map((stage) => {
                const isActive = filters.lifeStage.includes(stage);
                const color = STAGE_COLORS[stage];
                const count = LIFE_STAGE_DATA[stage] ? Object.keys(LIFE_STAGE_DATA[stage]).length : 0;
                return (
                  <button
                    key={stage}
                    onClick={() => handleFilterChange('lifeStage', stage)}
                    className="relative flex flex-col items-center group flex-1 min-w-0"
                  >
                    {/* Dot */}
                    <div
                      className={`w-10 h-10 rounded-full transition-all duration-300 z-10 border-0 ${
                        isActive
                          ? 'scale-110 shadow-lg ring-2 ring-offset-2'
                          : 'opacity-70 group-hover:opacity-100 group-hover:scale-105'
                      }`}
                      style={{ backgroundColor: color, ringColor: color, outline: 'none' }}
                    />
                    {/* Label */}
                    <span className={`text-[10px] text-center mt-2 uppercase tracking-wider transition-colors leading-tight ${
                      isActive ? 'text-[#1E2A3A] font-semibold' : 'text-gray-400 group-hover:text-gray-600'
                    }`}>
                      {stage}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          {filters.lifeStage.length > 0 && (
            <p className="text-xs text-gray-400 mt-4">
              Showing {sortedIngredients.length} products for{' '}
              <span className="font-semibold text-[#1E2A3A]">{filters.lifeStage.join(', ')}</span>
              <button onClick={() => setFilters({ lifeStage: [], benefit: [] })} className="ml-2 text-[#F4A492] hover:text-[#1E2A3A] transition-colors">
                Clear
              </button>
            </p>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-12">

          {/* SIDEBAR FILTERS */}
          <aside className={`w-full md:w-64 flex-shrink-0 pr-4 ${isMobileFiltersOpen ? 'block' : 'hidden md:block'}`}>
            <div className="sticky top-24">
              <Accordion type="multiple" defaultValue={['lifeStage', 'benefit']} className="w-full space-y-6">

                <AccordionItem value="lifeStage" className="border-none">
                  <AccordionTrigger className="py-2 hover:no-underline text-xs font-bold uppercase tracking-widest text-[#1E2A3A]">
                    Life Stage
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pt-4">
                      {LIFE_STAGE_OPTIONS.map((stage) => (
                        <div key={stage} className="flex items-center space-x-3">
                          <Checkbox
                            id={`stage-${stage}`}
                            checked={filters.lifeStage.includes(stage)}
                            onCheckedChange={() => handleFilterChange('lifeStage', stage)}
                            className="w-4 h-4 border-gray-300 rounded-sm data-[state=checked]:bg-[#1E2A3A] data-[state=checked]:border-[#1E2A3A]"
                          />
                          <Label htmlFor={`stage-${stage}`} className="text-gray-600 cursor-pointer text-sm font-normal hover:text-[#F4A492] transition-colors flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: STAGE_COLORS[stage] }} />
                            {stage}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="benefit" className="border-none">
                  <AccordionTrigger className="py-2 hover:no-underline text-xs font-bold uppercase tracking-widest text-[#1E2A3A]">
                    Benefit
                  </AccordionTrigger>
                  <AccordionContent>
                    {filters.lifeStage.length === 0 ? (
                      <div className="pt-4 text-xs text-gray-400 italic">Please select a life stage first to see relevant benefits.</div>
                    ) : availableBenefits.length === 0 ? (
                      <div className="pt-4 text-xs text-gray-400 italic">No benefits available for selected life stage.</div>
                    ) : (
                      <div className="space-y-3 pt-4">
                        {availableBenefits.map((benefit) => (
                          <div key={benefit} className="flex items-center space-x-3">
                            <Checkbox
                              id={`benefit-${benefit}`}
                              checked={filters.benefit.includes(benefit)}
                              onCheckedChange={() => handleFilterChange('benefit', benefit)}
                              className="w-4 h-4 border-gray-300 rounded-sm data-[state=checked]:bg-[#1E2A3A] data-[state=checked]:border-[#1E2A3A]"
                            />
                            <Label htmlFor={`benefit-${benefit}`} className="text-gray-600 cursor-pointer text-sm font-normal hover:text-[#F4A492] transition-colors">
                              {benefit}
                            </Label>
                          </div>
                        ))}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>

              </Accordion>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <button
                  onClick={() => setFilters({ lifeStage: [], benefit: [] })}
                  className="text-xs uppercase tracking-wider text-gray-400 hover:text-[#1E2A3A] transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>
          </aside>

          {/* RIGHT SIDE */}
          <div className="flex-1">

            {/* Top Bar */}
            <div className="flex flex-row justify-between items-center mb-8 pb-4">
              <div className="flex items-center gap-4">
                <Button variant="ghost" className="md:hidden p-0 hover:bg-transparent" onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}>
                  <SlidersHorizontal className="w-5 h-5 mr-2 text-[#1E2A3A]" />
                </Button>
                <p className="text-sm text-gray-500 font-medium">{sortedIngredients.length} products</p>
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px] border-none bg-[#F2F0ED] rounded-md h-10 px-4 text-sm font-medium text-[#1E2A3A] focus:ring-0">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent align="end" className="bg-white border-gray-100">
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                  <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Product Grid */}
            <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mb-16">
              {sortedIngredients.map((ingredient) => (
                <div key={ingredient.name} className="product-card-item">
                  <ProductCard
                    ingredient={ingredient}
                    selectedStages={filters.lifeStage}
                    selectedBenefits={filters.benefit}
                    onQuickView={setQuickViewItem}
                    isComparing={!!compareItems.find(c => c.name === ingredient.name)}
                    onToggleCompare={toggleCompare}
                  />
                </div>
              ))}
            </div>

            {sortedIngredients.length === 0 && (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                <p className="text-gray-500 font-serif text-xl">No products found matching your criteria.</p>
                <Button variant="link" onClick={() => setFilters({ lifeStage: [], benefit: [] })}>Clear Filters</Button>
              </div>
            )}

            {/* EDUCATIONAL SUPPORT */}
            <div ref={guidanceRef} className="bg-[#FAF8F5] rounded-xl p-12 border border-gray-100">
              <div className="guidance-header mb-10">
                <h3 className="text-2xl text-[#1E2A3A] mb-2">
                  <span className="font-light">Need </span>
                  <span className="font-serif italic">Guidance?</span>
                </h3>
                <div className="h-0.5 w-12 bg-[#F4A492]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="guidance-card">
                  <h4 className="font-serif text-lg mb-2 text-[#1E2A3A]">Wellness Blog</h4>
                  <p className="text-sm text-gray-500 mb-3 leading-relaxed">Expert articles and daily guidance for women at every stage of life.</p>
                  <Link to="/Blog" className="text-xs font-bold uppercase tracking-wider text-[#F4A492] hover:text-[#1E2A3A] transition-colors">Read More &rarr;</Link>
                </div>
                <div className="guidance-card">
                  <h4 className="font-serif text-lg mb-2 text-[#1E2A3A]">Ingredient Library</h4>
                  <p className="text-sm text-gray-500 mb-3 leading-relaxed">Explore the science, origins, and clinical research behind each botanical.</p>
                  <Link to="/Library" className="text-xs font-bold uppercase tracking-wider text-[#F4A492] hover:text-[#1E2A3A] transition-colors">Discover &rarr;</Link>
                </div>
                <div className="guidance-card">
                  <h4 className="font-serif text-lg mb-2 text-[#1E2A3A]">Our Process</h4>
                  <p className="text-sm text-gray-500 mb-3 leading-relaxed">From farm to formula: full transparency on sourcing and testing.</p>
                  <Link to="/OurProcess" className="text-xs font-bold uppercase tracking-wider text-[#F4A492] hover:text-[#1E2A3A] transition-colors">Learn How &rarr;</Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Quick View Modal — portal to escape Lenis transform */}
      {quickViewItem && createPortal(
        <QuickViewModal
          ingredient={quickViewItem}
          selectedStages={filters.lifeStage}
          onClose={() => setQuickViewItem(null)}
          onNavigate={(productId) => {
            window.scrollTo(0, 0);
            navigate(`/Product?id=${productId}`);
          }}
        />,
        document.body
      )}

      {/* Compare Drawer — portal to escape Lenis transform */}
      {createPortal(
        <CompareDrawer
          items={compareItems}
          onRemove={(name) => setCompareItems(prev => prev.filter(i => i.name !== name))}
          onClose={() => setCompareItems([])}
        />,
        document.body
      )}
    </div>
  );
}
