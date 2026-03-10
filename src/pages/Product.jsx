import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight, Check, CheckCircle2, Info, Leaf, ShieldCheck, AlertTriangle, Clock, Pill, FlaskConical, BookOpen, Heart, Users, Baby, Flower2, ChevronRight } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// ─── GINGER PRODUCT DATA ───────────────────────────────────────────────────────
const GINGER_DATA = {
  name: 'Organic Ginger',
  scientificName: 'Zingiber officinale',
  headline: 'Organic Ginger for Digestive Comfort',
  tagline: 'Ginger Rhizome (Zingiber officinale)',
  benefits: [
    'Digestive Comfort & Support',
    'Menstrual & Pregnancy Wellness',
    'Antioxidant & Comfort Support',
  ],
  description: 'Organic Ginger rhizome powder, rich in naturally occurring gingerols and shogaols. Each capsule delivers the time-honored benefits of whole Ginger root — supporting digestive comfort, promoting menstrual wellness, and providing antioxidant support. Gently vacuum-dried at low temperatures to preserve the root\'s natural bioactive compounds.*',
  variants: [
    { label: 'Medium Capsule (#0)', dosage: '2 per day' },
    { label: 'Small Capsule (#1)', dosage: '3 per day' },
  ],
};

// ─── FEATURES TAB DATA ─────────────────────────────────────────────────────────
const FEATURE_TABS = [
  { id: 'benefits', label: 'Benefits' },
  { id: 'formula', label: 'Formula' },
  { id: 'science', label: 'Scientific Support' },
  { id: 'how-to-use', label: 'How to Use' },
  { id: 'compatibility', label: 'Compatibility' },
  { id: 'safety', label: 'Safety' },
];

export default function ProductPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [activeTab, setActiveTab] = useState('benefits');
  const [isImageHovered, setIsImageHovered] = useState(false);
  const heroVideoRef = useRef(null);
  const tabsRef = useRef(null);

  useEffect(() => {
    if (isImageHovered && heroVideoRef.current) {
      heroVideoRef.current.currentTime = 0;
      heroVideoRef.current.play().catch(() => {});
    } else if (heroVideoRef.current) {
      heroVideoRef.current.pause();
    }
  }, [isImageHovered]);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const products = await base44.entities.Product.list();
      return products.find(p => p.id === id) || products[0];
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#E8A598] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-2xl font-light text-[#1E2A3A] mb-4">Product Not Found</h1>
        <Button asChild variant="outline"><Link to="/Collection">Return to Shop</Link></Button>
      </div>
    );
  }

  const scrollToTabs = (tabId) => {
    setActiveTab(tabId);
    if (tabsRef.current) {
      tabsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-[#FFFBF5] min-h-screen font-sans text-[#1E2A3A]">

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1 — HERO
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white">
        <div className="container mx-auto px-4 md:px-8 pt-10 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Product Image / Video */}
            <div className="space-y-4">
              <div
                className="aspect-square bg-[#FAF8F5] rounded-2xl p-10 relative overflow-hidden cursor-pointer group"
                onMouseEnter={() => setIsImageHovered(true)}
                onMouseLeave={() => setIsImageHovered(false)}
              >
                <img
                  src={product.image_url}
                  alt={GINGER_DATA.name}
                  className="w-full h-full object-contain mix-blend-multiply"
                />
                <video
                  ref={heroVideoRef}
                  src="/videos/bottle-spin.mp4"
                  muted
                  loop
                  playsInline
                  className={`absolute inset-0 w-full h-full object-contain p-10 transition-opacity duration-500 ${isImageHovered ? 'opacity-100' : 'opacity-0'}`}
                />
                <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-[10px] uppercase tracking-wider px-4 py-1.5 rounded-full transition-opacity duration-300 ${isImageHovered ? 'opacity-100' : 'opacity-0'}`}>
                  360° View
                </div>
              </div>

              {/* Thumbnail strip placeholder */}
              <div className="grid grid-cols-5 gap-2">
                {['Product', 'Capsule Size', 'Powder', 'Routine', 'Flat Lay'].map((label, i) => (
                  <div key={i} className="aspect-square bg-[#FAF8F5] rounded-lg border border-gray-100 flex items-center justify-center">
                    <span className="text-[8px] text-gray-400 uppercase tracking-wider text-center px-1">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:sticky lg:top-24">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#E8A598] font-semibold mb-3">Single Ingredient</p>

              <h1 className="text-3xl md:text-4xl text-[#1E2A3A] mb-2 font-light">
                {GINGER_DATA.headline}
              </h1>

              <p className="text-base text-gray-500 font-light italic mb-5">
                {GINGER_DATA.tagline}
              </p>

              {/* Associated Benefits */}
              <div className="flex flex-wrap gap-2 mb-6">
                {GINGER_DATA.benefits.map((b) => (
                  <span key={b} className="text-[10px] uppercase tracking-wider bg-[#FAF8F5] border border-gray-100 px-3 py-1.5 text-gray-600">{b}</span>
                ))}
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed mb-8">
                {GINGER_DATA.description}
              </p>

              {/* Variant Selector */}
              <div className="mb-6">
                <p className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-semibold mb-3">Select Size</p>
                <div className="grid grid-cols-2 gap-3">
                  {GINGER_DATA.variants.map((v, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedVariant(i)}
                      className={`p-4 border rounded-lg text-left transition-all ${
                        selectedVariant === i
                          ? 'border-[#1E2A3A] bg-[#1E2A3A]/5'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <span className="text-sm font-medium block text-[#1E2A3A]">{v.label}</span>
                      <span className="text-xs text-gray-500">{v.dosage}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price & CTA */}
              <div className="space-y-3 mb-6">
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-3xl font-light text-[#1E2A3A]">${product.price}</span>
                  <span className="text-sm text-gray-400 mb-1">.00</span>
                </div>

                <Button className="w-full h-13 bg-[#E8A598] hover:bg-[#d4897c] text-white text-[11px] uppercase tracking-[0.2em] font-medium rounded-none">
                  Subscribe & Save 20%
                </Button>

                <Button className="w-full h-13 bg-[#1E2A3A] hover:bg-[#2d3d4d] text-white text-[11px] uppercase tracking-[0.2em] font-medium rounded-none">
                  Add to Cart
                </Button>
              </div>

              {/* Trust Row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: <Leaf size={14} />, label: 'USDA Organic' },
                  { icon: <ShieldCheck size={14} />, label: 'Lab Tested' },
                  { icon: <Check size={14} />, label: 'cGMP Certified' },
                ].map((t, i) => (
                  <div key={i} className="flex items-center justify-center gap-1.5 py-2.5 bg-[#FAF8F5] rounded text-gray-500">
                    {t.icon}
                    <span className="text-[9px] uppercase tracking-wider font-medium">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2 — FEATURES (Tabbed Navigation)
          ═══════════════════════════════════════════════════════════════════════ */}
      <section ref={tabsRef} className="bg-white border-t border-gray-100">
        {/* Tab Navigation */}
        <div className="sticky top-16 z-40 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto no-scrollbar">
              {FEATURE_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap px-5 py-4 text-[11px] uppercase tracking-[0.1em] font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#1E2A3A] text-[#1E2A3A]'
                      : 'border-transparent text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-8 py-14">
          <div className="max-w-4xl mx-auto">

            {/* ── TAB 1: BENEFITS ──────────────────────────────────────────── */}
            {activeTab === 'benefits' && (
              <div className="animate-in fade-in duration-300">
                <h3 className="text-2xl md:text-3xl font-light text-[#1E2A3A] mb-10 text-center">
                  How Ginger Can Support Your Life Stage
                </h3>

                <div className="space-y-8">
                  {/* Reproductive Age */}
                  <div className="border border-gray-100 rounded-xl p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-[#E8A598]/20 flex items-center justify-center">
                        <Heart size={14} className="text-[#E8A598]" />
                      </div>
                      <h4 className="text-lg font-medium text-[#1E2A3A]">Reproductive Age</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600 ml-11">
                      <li>Aids in maintaining general comfort during menstrual cycles*</li>
                      <li className="text-gray-500 italic text-xs">Recommended duration: Use during the early days of the menstrual cycle as needed; taking three times daily promotes comfort*</li>
                    </ul>
                  </div>

                  {/* Pregnancy */}
                  <div className="border border-gray-100 rounded-xl p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-[#C8D6B9]/30 flex items-center justify-center">
                        <Baby size={14} className="text-[#6B8E23]" />
                      </div>
                      <h4 className="text-lg font-medium text-[#1E2A3A]">Pregnancy</h4>
                    </div>
                    <div className="ml-11">
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                        <p className="text-xs text-amber-800">
                          <strong>Important:</strong> This section is for pregnant women seeking occasional digestive comfort support. Use only under medical supervision. Intended for short-term use only.
                        </p>
                      </div>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>Aids in easing occasional pregnancy-related nausea*</li>
                        <li>Intended for short-term use under medical supervision</li>
                        <li className="text-amber-700 font-medium text-xs">Critical: Pregnant women should use only under medical supervision</li>
                      </ul>
                    </div>
                  </div>

                  {/* Post-Pregnancy */}
                  <div className="border border-gray-100 rounded-xl p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <Users size={14} className="text-purple-600" />
                      </div>
                      <h4 className="text-lg font-medium text-[#1E2A3A]">Post-Pregnancy</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600 ml-11">
                      <li>Supports Lactation*</li>
                    </ul>
                  </div>

                  {/* Menopause Comfort */}
                  <div className="border border-gray-100 rounded-xl p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-[#E8A598]/20 flex items-center justify-center">
                        <Flower2 size={14} className="text-[#E8A598]" />
                      </div>
                      <h4 className="text-lg font-medium text-[#1E2A3A]">Menopause Comfort</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600 ml-11">
                      <li>Contributes to overall comfort and wellbeing*</li>
                      <li>Provides nutritional foundation for digestive wellness*</li>
                      <li>Helps maintain daily comfort and vitality*</li>
                    </ul>
                  </div>

                  {/* Seniors */}
                  <div className="border border-gray-100 rounded-xl p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                        <Users size={14} className="text-blue-500" />
                      </div>
                      <h4 className="text-lg font-medium text-[#1E2A3A]">Suitable for Seniors (60+)?</h4>
                    </div>
                    <p className="text-sm text-gray-600 ml-11">
                      Ginger is generally safe for adults aged 60+ when taken as directed. Seniors taking blood-thinning or blood sugar–lowering medications should consult a healthcare professional before use. Do not exceed the recommended serving size.
                    </p>
                  </div>
                </div>

                {/* FDA Disclaimer */}
                <p className="text-[10px] text-gray-400 italic mt-8 text-center">
                  *These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
                </p>

                {/* Why It Matters */}
                <div className="mt-12 bg-[#FAF8F5] rounded-xl p-8 border border-gray-100">
                  <h4 className="text-lg font-medium text-[#1E2A3A] mb-4">Why It Matters</h4>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    Ginger's naturally occurring gingerols and shogaols play a role in digestive function, comfort, and antioxidant protection.* Valued across cultures for centuries, this whole-food rhizome powder aids in maintaining digestive health, menstrual comfort, and gentle nausea relief throughout women's life stages.*
                  </p>
                  <p className="text-[10px] text-gray-400 italic">
                    *These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
                  </p>
                </div>
              </div>
            )}

            {/* ── TAB 2: FORMULA ───────────────────────────────────────────── */}
            {activeTab === 'formula' && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold mb-2 text-center">Formula</h2>
                <h3 className="text-2xl md:text-3xl font-light text-[#1E2A3A] mb-10 text-center">
                  Complete Formula Breakdown
                </h3>

                {/* Formula Table */}
                <div className="border border-gray-100 rounded-xl overflow-hidden mb-8">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#FAF8F5]">
                        <th className="text-left text-[10px] uppercase tracking-wider text-gray-400 font-semibold px-6 py-4">Ingredient</th>
                        <th className="text-left text-[10px] uppercase tracking-wider text-gray-400 font-semibold px-6 py-4">Form</th>
                        <th className="text-left text-[10px] uppercase tracking-wider text-gray-400 font-semibold px-6 py-4">Purpose</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-gray-100">
                        <td className="px-6 py-5 text-sm font-medium text-[#1E2A3A]">Organic Ginger Rhizome Powder</td>
                        <td className="px-6 py-5 text-sm text-gray-600">Whole rhizome powder</td>
                        <td className="px-6 py-5 text-sm text-gray-600">Provides naturally occurring gingerols, shogaols, and polyphenols in their complete profile</td>
                      </tr>
                      <tr className="border-t border-gray-100">
                        <td className="px-6 py-5 text-sm font-medium text-[#1E2A3A]">Vegan Capsule</td>
                        <td className="px-6 py-5 text-sm text-gray-600">USDA Certified</td>
                        <td className="px-6 py-5 text-sm text-gray-600">Clean, plant-based delivery</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-sm text-gray-500 text-center mb-10 font-medium">No fillers, binders, preservatives, or artificial additives</p>

                {/* Sourcing & Quality */}
                <div className="bg-[#FAF8F5] rounded-xl p-8 border border-gray-100 mb-8">
                  <h3 className="text-lg font-medium text-[#1E2A3A] mb-5">Ingredient Sourcing & Quality</h3>
                  <ul className="space-y-3">
                    {[
                      { bold: '100% Organic:', text: 'USDA Certified Organic Ginger from sustainably cultivated plants in India' },
                      { bold: 'Whole Rhizome Powder:', text: 'Complete nutritional profile with naturally occurring bioactive compounds' },
                      { bold: 'Gentle Processing:', text: 'Vacuum tray drying at low temperature under reduced pressure to preserve heat-sensitive gingerols and shogaols' },
                      { bold: 'Peak Harvest:', text: 'Rhizomes harvested at peak maturity for maximum potency and bioactive content' },
                      { bold: 'Traditional Source:', text: 'Sourced from India where Ginger has been cultivated for centuries in wellness practices' },
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <Check size={14} className="text-[#6B8E23] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600"><strong className="text-[#1E2A3A]">{item.bold}</strong> {item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Why This Formula Works */}
                <div className="border border-gray-100 rounded-xl p-8 mb-8">
                  <h3 className="text-lg font-medium text-[#1E2A3A] mb-4">Why This Formula Works</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    We chose whole Ginger rhizome powder instead of extracts or isolates to preserve the root's naturally occurring gingerols, shogaols, and polyphenols in their original ratios. This whole-food form reflects traditional use, supports natural nutrient synergy, and avoids over-processing that can alter or concentrate individual compounds.*
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Fresh ginger rhizomes are cleaned, sliced, and dried using a vacuum tray dryer at low temperature under reduced pressure. This gentle method protects heat-sensitive bioactive compounds such as gingerols and shogaols, minimizes thermal degradation, supports nutrient retention, and maintains the integrity of the root's natural compounds. The dried root is then finely milled into a uniform powder suitable for encapsulation, ensuring consistent quality, potency, and efficacy in each capsule.
                  </p>
                </div>

                <p className="text-[10px] text-gray-400 italic text-center">
                  *These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
                </p>
              </div>
            )}

            {/* ── TAB 3: SCIENTIFIC SUPPORT ────────────────────────────────── */}
            {activeTab === 'science' && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold mb-2 text-center">Scientific Support</h2>
                <p className="text-sm text-gray-500 leading-relaxed text-center max-w-2xl mx-auto mb-10">
                  The compounds below reflect what is naturally present in whole Ginger and what traditional use and emerging research suggest about their role in overall wellness. This information is provided for transparency — it does not represent established therapeutic mechanisms, and this product is not intended to replace medical treatment or advice.
                </p>

                {/* Compounds Table */}
                <h3 className="text-lg font-medium text-[#1E2A3A] mb-5">Key Compounds & Research</h3>
                <div className="border border-gray-100 rounded-xl overflow-hidden mb-10">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#FAF8F5]">
                        <th className="text-left text-[10px] uppercase tracking-wider text-gray-400 font-semibold px-6 py-4">Compound</th>
                        <th className="text-left text-[10px] uppercase tracking-wider text-gray-400 font-semibold px-6 py-4">Traditional Role</th>
                        <th className="text-left text-[10px] uppercase tracking-wider text-gray-400 font-semibold px-6 py-4">Supporting Context</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-gray-100">
                        <td className="px-6 py-5 text-sm font-medium text-[#1E2A3A]">Gingerols & Shogaols</td>
                        <td className="px-6 py-5 text-sm text-gray-600">Support digestive comfort, help ease occasional nausea, and calm stomach upset*</td>
                        <td className="px-6 py-5 text-sm text-gray-600">Research demonstrates benefits for digestive wellness and nausea support</td>
                      </tr>
                      <tr className="border-t border-gray-100">
                        <td className="px-6 py-5 text-sm font-medium text-[#1E2A3A]">Polyphenols</td>
                        <td className="px-6 py-5 text-sm text-gray-600">Provide antioxidant support for cellular health*</td>
                        <td className="px-6 py-5 text-sm text-gray-600">Studies support antioxidant activity and cellular protection</td>
                      </tr>
                      <tr className="border-t border-gray-100">
                        <td className="px-6 py-5 text-sm font-medium text-[#1E2A3A]">Bioactive Compounds</td>
                        <td className="px-6 py-5 text-sm text-gray-600">Help support comfort and immune function*</td>
                        <td className="px-6 py-5 text-sm text-gray-600">Traditional use and research support overall wellness and comfort</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* What the Research Shows */}
                <h3 className="text-lg font-medium text-[#1E2A3A] mb-5">What the Research Shows</h3>
                <div className="space-y-3 mb-8">
                  {[
                    'Studies support Ginger\'s role in helping ease occasional nausea and digestive discomfort',
                    'Research indicates potential benefits for menstrual comfort and overall wellbeing',
                    'Evidence suggests support for digestive function and occasional pregnancy-related nausea',
                    'Traditional culinary and wellness use across cultures for thousands of years',
                    'Most wellness benefits develop with consistent use over 1–2 weeks for digestive support; 4–6 weeks for menstrual comfort',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-[#C8D6B9] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-600">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-[#FAF8F5] rounded-xl p-6 border border-gray-100 mb-8">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    <strong>Note:</strong> Individual results vary. Study results can vary depending on dose, form (whole root vs. extract), and duration. Most trials are small or short-term. Bioactive levels can differ between products. Research mainly supports general wellness rather than specific medical conditions.
                  </p>
                </div>

                <div className="text-center mb-10">
                  <h5 className="text-sm font-medium text-[#1E2A3A] mb-2">Want to explore the research?</h5>
                  <Link to="/Library" className="text-sm text-[#E8A598] hover:text-[#d4897c] inline-flex items-center gap-1 transition-colors">
                    View our full library of research that guides our formulation <ChevronRight size={14} />
                  </Link>
                </div>

                <p className="text-[10px] text-gray-400 italic text-center mb-10">
                  *These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
                </p>

                {/* Our Standards */}
                <div className="bg-[#FAF8F5] rounded-xl p-8 border border-gray-100">
                  <h3 className="text-lg font-medium text-[#1E2A3A] mb-5">Our Standards</h3>
                  <ul className="space-y-3">
                    {[
                      'Manufactured in facilities operating under current Good Manufacturing Practices (cGMP) in accordance with 21 CFR Part 111',
                      'FSSC 22000 Version 6 food safety system certification',
                      'ISO 22000:2018 food safety management standards',
                      'Each batch tested for purity, heavy metals, and contaminants',
                      'Certificates of Analysis available upon request',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <ShieldCheck size={14} className="text-[#6B8E23] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* ── TAB 4: HOW TO USE ────────────────────────────────────────── */}
            {activeTab === 'how-to-use' && (
              <div className="animate-in fade-in duration-300">
                {/* Daily Use */}
                <h3 className="text-2xl md:text-3xl font-light text-[#1E2A3A] mb-8 text-center">Daily Use</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="bg-[#FAF8F5] rounded-xl p-6 border border-gray-100 text-center">
                    <Pill size={24} className="mx-auto mb-3 text-[#1E2A3A]" />
                    <p className="text-sm font-medium text-[#1E2A3A]">Big Capsule (#0)</p>
                    <p className="text-sm text-gray-500">Take 2 capsules daily with meals</p>
                  </div>
                  <div className="bg-[#FAF8F5] rounded-xl p-6 border border-gray-100 text-center">
                    <Pill size={20} className="mx-auto mb-3 text-[#1E2A3A]" />
                    <p className="text-sm font-medium text-[#1E2A3A]">Small Capsule (#1)</p>
                    <p className="text-sm text-gray-500">Take 3 capsules daily with meals</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 text-center mb-10">Or as directed by your healthcare practitioner.</p>

                {/* Best Time */}
                <div className="border border-gray-100 rounded-xl p-8 mb-8">
                  <h3 className="text-lg font-medium text-[#1E2A3A] mb-3">Best Time to Take</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Take with meals, and divide doses throughout the day if needed for nausea or menstrual comfort. Taking with food helps support digestion and reduce the chance of stomach upset.*
                  </p>
                </div>

                {/* Duration & Timeline */}
                <div className="border border-gray-100 rounded-xl p-8 mb-8">
                  <h3 className="text-lg font-medium text-[#1E2A3A] mb-4">Duration & Timeline</h3>
                  <p className="text-sm text-gray-600 mb-4">For best results, use consistently for:</p>
                  <div className="space-y-3">
                    {[
                      { stage: 'Menstrual Comfort (Reproductive Age)', text: 'May help support comfort during the early days of the menstrual cycle when taken three times daily.*' },
                      { stage: 'Pregnancy-Related Nausea', text: 'May support occasional digestive comfort during pregnancy. Intended for short-term use under medical supervision.*' },
                      { stage: 'Post-Pregnancy / Lactation', text: 'Daily use for approximately 2–3 weeks may help support digestion and overall wellness during the post-pregnancy period.*' },
                      { stage: 'Menopause Comfort', text: 'Regular use for approximately 4–6 weeks may help support comfort and overall wellbeing during menopause.*' },
                      { stage: 'General Digestive Support', text: 'May be used as needed to support occasional digestive discomfort.*' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Clock size={14} className="text-[#E8A598] flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-600">
                          <strong className="text-[#1E2A3A]">{item.stage}:</strong> {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-4 italic">Benefits develop with consistent use.* Individual responses vary.</p>
                </div>

                {/* Tips */}
                <div className="bg-[#FAF8F5] rounded-xl p-8 border border-gray-100 mb-8">
                  <h3 className="text-lg font-medium text-[#1E2A3A] mb-4">Tips for Best Results</h3>
                  <ul className="space-y-3">
                    {[
                      'Take Ginger with meals to support digestion and reduce the chance of stomach upset',
                      'Use consistently for the recommended duration to evaluate your response',
                      'Pair with a balanced diet and active lifestyle for optimal digestive and overall wellness support',
                      'Stay well-hydrated throughout the day',
                      'For menstrual comfort, begin taking during early cycle days for best support',
                      'Allow adequate time to assess your individual experience',
                    ].map((tip, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <Check size={14} className="text-[#6B8E23] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-[10px] text-gray-400 italic text-center">
                  *These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
                </p>
              </div>
            )}

            {/* ── TAB 5: COMPATIBILITY ─────────────────────────────────────── */}
            {activeTab === 'compatibility' && (
              <div className="animate-in fade-in duration-300">
                {/* Suitable With */}
                <h3 className="text-2xl md:text-3xl font-light text-[#1E2A3A] mb-10 text-center">Compatibility</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  {/* Supplements */}
                  <div className="border border-gray-100 rounded-xl p-6">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Supplements</h4>
                    <ul className="space-y-2 text-sm text-gray-600 mb-4">
                      <li className="flex items-start gap-2"><Check size={12} className="text-[#6B8E23] flex-shrink-0 mt-1" /> Vitamins and minerals for general wellness</li>
                      <li className="flex items-start gap-2"><Check size={12} className="text-[#6B8E23] flex-shrink-0 mt-1" /> Herbal supplements for digestive support</li>
                      <li className="flex items-start gap-2"><Check size={12} className="text-[#6B8E23] flex-shrink-0 mt-1" /> Most other nutritional supplements</li>
                    </ul>
                    <p className="text-xs text-amber-700 font-medium mb-2">Exercise caution if taking:</p>
                    <ul className="space-y-1 text-xs text-gray-500">
                      <li>• Anticoagulant or antiplatelet medications</li>
                      <li>• Blood sugar–lowering medications</li>
                      <li>• Blood pressure medications</li>
                    </ul>
                  </div>

                  {/* Diet Types */}
                  <div className="border border-gray-100 rounded-xl p-6">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Diet Types</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2"><Check size={12} className="text-[#6B8E23] flex-shrink-0 mt-1" /> Vegan & Vegetarian</li>
                      <li className="flex items-start gap-2"><Check size={12} className="text-[#6B8E23] flex-shrink-0 mt-1" /> Gluten-Free, Dairy-Free, Soy-Free</li>
                      <li className="flex items-start gap-2"><Check size={12} className="text-[#6B8E23] flex-shrink-0 mt-1" /> Compatible with most dietary patterns</li>
                    </ul>
                  </div>

                  {/* Best Practices */}
                  <div className="border border-gray-100 rounded-xl p-6">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Best Practices</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>Always take with meals for optimal support</li>
                      <li>Monitor your response if combining with multiple supplements</li>
                      <li>Inform healthcare providers about all supplements you take</li>
                      <li>Use caution with supplements that may affect bleeding</li>
                    </ul>
                  </div>
                </div>

                {/* Suitable For */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <div className="bg-[#F0F9F0] rounded-xl p-6 border border-[#C8D6B9]/30">
                    <h3 className="text-lg font-medium text-[#1E2A3A] mb-4">Suitable For</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {[
                        'Adults 18+ across adult life stages',
                        'Those seeking digestive comfort and wellness support*',
                        'Women looking for menstrual cycle comfort*',
                        'Pregnant women experiencing occasional nausea (short-term use under medical supervision only)*',
                        'Women in post-pregnancy/lactation seeking digestive wellness*',
                        'Those seeking antioxidant and overall wellness support*',
                        'Seniors 60+ (with medical consultation if taking medications)',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check size={12} className="text-[#6B8E23] flex-shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-red-50/50 rounded-xl p-6 border border-red-100">
                    <h3 className="text-lg font-medium text-[#1E2A3A] mb-4">Not Suitable For</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {[
                        'Individuals under 18 years of age',
                        'Those with bleeding disorders',
                        'Those with gallstones',
                        'Individuals scheduled for surgery',
                        'Those taking blood thinners without medical supervision',
                        'Those taking blood pressure medications without medical guidance',
                        'Pregnant women without medical supervision',
                        'Individuals with known allergies to Ginger',
                        'Anyone with a medical condition without healthcare provider consultation',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-red-400 flex-shrink-0 mt-1">✕</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Warning */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-800">
                      <strong>Critical:</strong> Ginger may increase the risk of bleeding when taken with anticoagulant or antiplatelet medications. Pregnant women should use only under medical supervision. If you have a medical condition or take medications, consult your healthcare provider before use.
                    </p>
                  </div>
                </div>

                <p className="text-[10px] text-gray-400 italic text-center mt-6">
                  *These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
                </p>
              </div>
            )}

            {/* ── TAB 6: SAFETY ────────────────────────────────────────────── */}
            {activeTab === 'safety' && (
              <div className="animate-in fade-in duration-300">
                <h3 className="text-2xl md:text-3xl font-light text-[#1E2A3A] mb-10 text-center">Safety Information</h3>

                {/* Side Effects */}
                <div className="space-y-6 mb-10">
                  <div className="border border-gray-100 rounded-xl p-6 md:p-8">
                    <h4 className="text-lg font-medium text-[#1E2A3A] mb-2">Generally Well Tolerated</h4>
                    <p className="text-sm text-gray-600">Most people experience no side effects when used as directed.</p>
                  </div>

                  <div className="border border-gray-100 rounded-xl p-6 md:p-8">
                    <h4 className="text-lg font-medium text-[#1E2A3A] mb-3">Mild Effects (Uncommon)</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Mild digestive discomfort</li>
                      <li>• Heartburn</li>
                      <li>• Mild nausea (rare, as Ginger typically helps with nausea)</li>
                    </ul>
                    <p className="text-xs text-gray-500 mt-3 italic">If side effects persist or worsen, discontinue use and consult a healthcare professional.</p>
                  </div>

                  <div className="border border-amber-100 bg-amber-50/30 rounded-xl p-6 md:p-8">
                    <h4 className="text-lg font-medium text-[#1E2A3A] mb-3">Rare Effects</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• High doses may rarely cause bleeding issues, particularly in individuals taking blood-thinning medications</li>
                      <li>• Allergic reactions such as rash, itching, or swelling in sensitive individuals</li>
                    </ul>
                    <p className="text-xs text-gray-500 mt-3 italic">If you experience any unusual symptoms, discontinue use and consult a healthcare professional immediately.</p>
                  </div>
                </div>

                {/* Warnings & Precautions */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 md:p-8 mb-8">
                  <div className="flex items-start gap-3 mb-4">
                    <AlertTriangle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-base font-bold text-red-900 mb-1">CRITICAL</h4>
                      <p className="text-sm text-red-800">Ginger may increase the risk of bleeding when taken with anticoagulant or antiplatelet medications.</p>
                    </div>
                  </div>
                  <p className="text-sm text-red-800 mb-3 font-medium">Consult your healthcare provider before use if:</p>
                  <ul className="space-y-1.5 text-sm text-red-800 ml-4">
                    {[
                      'You are under 18 years of age',
                      'You have bleeding disorders',
                      'You have gallstones',
                      'You have diabetes or take diabetes medications',
                      'You are taking anticoagulant or antiplatelet medications (blood thinners)',
                      'You are taking blood pressure medications',
                      'You are planning surgery',
                      'You are pregnant (use only under medical supervision)',
                      'You are breastfeeding',
                      'You have any chronic medical conditions',
                      'You are a senior (60+) taking medications',
                      'You are taking any prescription or over-the-counter medications',
                    ].map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>

                {/* Special Warnings */}
                <div className="border border-gray-100 rounded-xl p-6 md:p-8 mb-8">
                  <h4 className="text-lg font-medium text-[#1E2A3A] mb-4">Special Warnings</h4>
                  <div className="space-y-3 text-sm text-gray-600">
                    {[
                      { bold: 'Bleeding Risk:', text: 'Ginger may increase the risk of bleeding when taken with anticoagulant or antiplatelet medications. Individuals with bleeding disorders should not use without medical supervision.' },
                      { bold: 'Gallstones:', text: 'Those with gallstones should consult a healthcare professional before use.' },
                      { bold: 'Blood Sugar:', text: 'Ginger may affect blood sugar levels. Those on diabetes medications should monitor levels carefully and consult a healthcare provider.' },
                      { bold: 'Blood Pressure:', text: 'May affect blood pressure. Those taking antihypertensive medications should consult a healthcare provider before use.' },
                      { bold: 'Surgery:', text: 'May need to discontinue use before planned surgery. Consult your healthcare provider regarding timing.' },
                      { bold: 'Pregnancy:', text: 'Pregnant women should use only under medical supervision. Intended for short-term use during pregnancy.' },
                      { bold: 'Nursing:', text: 'Consult healthcare professional before use if breastfeeding.' },
                    ].map((item, i) => (
                      <p key={i}><strong className="text-[#1E2A3A]">{item.bold}</strong> {item.text}</p>
                    ))}
                  </div>
                </div>

                {/* Discontinue */}
                <div className="border border-gray-100 rounded-xl p-6 md:p-8 mb-8">
                  <h4 className="text-lg font-medium text-[#1E2A3A] mb-4">Discontinue use and consult your healthcare provider if you experience:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {[
                      'Any adverse reactions or side effects',
                      'Unusual bleeding or bruising',
                      'Digestive discomfort that persists',
                      'Allergic symptoms (rash, itching, swelling, difficulty breathing)',
                      'Any unusual or unwanted symptoms',
                      'Any symptoms before planned surgery',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <AlertTriangle size={12} className="text-amber-500 flex-shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-red-600 font-medium mt-4">Seek immediate medical attention for severe reactions.</p>
                </div>

                {/* Important Notice */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
                  <p className="text-sm text-amber-800">
                    <strong>Important:</strong> Do not exceed recommended dosage. Ginger may increase the risk of bleeding when taken with anticoagulant or antiplatelet medications. Individual responses vary. If you have bleeding disorders, gallstones, diabetes, or take blood-thinning, blood pressure, or diabetes medications, medical supervision is strongly recommended.
                  </p>
                </div>

                {/* Testing & Compliance */}
                <div className="bg-[#FAF8F5] rounded-xl p-6 md:p-8 border border-gray-100 mb-8">
                  <h3 className="text-lg font-medium text-[#1E2A3A] mb-4">Testing & Compliance</h3>
                  <ul className="space-y-3">
                    {[
                      { bold: 'Third-Party Tested:', text: 'Each batch undergoes rigorous testing for purity and safety' },
                      { bold: 'cGMP Certified:', text: 'Manufactured in FDA-compliant facilities following Good Manufacturing Practices' },
                      { bold: 'Quality Systems:', text: 'FSSC 22000 and ISO 22000:2018 certified operations' },
                      { bold: 'Certificates of Analysis:', text: 'Available for every batch upon request with lot number' },
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <ShieldCheck size={14} className="text-[#6B8E23] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600"><strong className="text-[#1E2A3A]">{item.bold}</strong> {item.text}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-[10px] text-gray-400 leading-relaxed">
                      Regulatory Statement: Dietary supplements are regulated by FDA but are not approved by FDA before marketing. This product is manufactured in accordance with current Good Manufacturing Practices (cGMP) for dietary supplements (21 CFR Part 111).
                    </p>
                  </div>
                </div>

                {/* Storage */}
                <div className="border border-gray-100 rounded-xl p-6 md:p-8">
                  <h3 className="text-lg font-medium text-[#1E2A3A] mb-4">Storage & Shelf Life</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Store at room temperature in a cool, dry place</li>
                    <li>• Keep container tightly closed when not in use</li>
                    <li>• Protect from excessive heat and humidity</li>
                    <li>• Keep out of reach of children</li>
                    <li>• Use within expiration date on label</li>
                  </ul>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 3 — INGREDIENT PROCESS (VIDEO)
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#1E2A3A] py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#E8A598] font-semibold mb-3">Our Process</p>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
              From Root to Capsule
            </h2>
            <p className="text-sm text-gray-400 max-w-xl mx-auto">
              Watch how we transform organic Ginger rhizome into a potent, bioactive powder — preserving gingerols and shogaols through gentle vacuum drying.
            </p>
          </div>
          <div className="max-w-4xl mx-auto aspect-video bg-black/30 rounded-2xl overflow-hidden relative">
            <video
              src="/videos/capsule-firefly.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 4 — FAQ
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold mb-3 text-center">FAQ</p>
            <h2 className="text-2xl md:text-3xl font-light text-[#1E2A3A] mb-10 text-center">
              Frequently Asked Questions
            </h2>

            <Accordion type="single" collapsible className="w-full space-y-3">
              {[
                { q: 'Is this the same product for all life stages?', a: 'Yes. This product contains a single ingredient — organic Ginger rhizome powder. The formula does not change. What may differ is how individuals experience its benefits at different life stages.' },
                { q: 'Is this product safe during pregnancy?', a: 'Ginger has a long history of traditional use during pregnancy for occasional nausea. However, pregnant women should use only under medical supervision. This product is intended for short-term use during pregnancy.' },
                { q: 'Why do the benefits change by life stage?', a: 'The ingredient remains the same. Different life stages come with different physiological needs, which may influence how Ginger is experienced — from menstrual comfort to digestive wellness during menopause.' },
                { q: 'Does this product treat or prevent any condition?', a: 'No. This product is intended to support general wellness and is not intended to diagnose, treat, cure, or prevent any disease.' },
                { q: 'Can I take this long-term?', a: 'Ginger is commonly used as part of a daily wellness routine. For long-term use, consult a healthcare professional, especially if you take medications or have a medical condition.' },
                { q: 'What if I take blood-thinning medications?', a: 'Ginger may increase the risk of bleeding when taken with anticoagulant or antiplatelet medications. You should consult your healthcare provider before using this product.' },
                { q: 'How is the Ginger processed?', a: 'Fresh ginger rhizomes are cleaned, sliced, and dried using a vacuum tray dryer at low temperature under reduced pressure. This gentle method preserves heat-sensitive bioactive compounds. The dried root is then finely milled into a uniform powder for encapsulation.' },
                { q: 'Is this product tested for purity?', a: 'Yes. Each batch is third-party tested for purity, heavy metals, and contaminants. Certificates of Analysis are available upon request with your lot number.' },
              ].map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border border-gray-100 rounded-xl px-6 data-[state=open]:bg-[#FAF8F5]">
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
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 5 — BLOG / RELATED CONTENT
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#FAF8F5] py-16 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold mb-3">From the Blog</p>
            <h2 className="text-2xl md:text-3xl font-light text-[#1E2A3A]">
              Learn More About Ginger
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: 'The Science Behind Gingerols & Shogaols', category: 'Research', excerpt: 'Understanding the bioactive compounds that make Ginger a centuries-old wellness staple.' },
              { title: 'Ginger Through Every Life Stage', category: 'Wellness', excerpt: 'How this versatile rhizome supports women from reproductive years through menopause.' },
              { title: 'Why We Choose Whole Root Over Extracts', category: 'Process', excerpt: 'The science and philosophy behind our whole-food approach to Ginger supplementation.' },
            ].map((post, i) => (
              <Link key={i} to="/Blog" className="group">
                <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="aspect-[16/10] bg-[#EBEAE6]" />
                  <div className="p-5">
                    <span className="text-[9px] uppercase tracking-wider text-[#E8A598] font-semibold">{post.category}</span>
                    <h3 className="text-sm font-medium text-[#1E2A3A] mt-1 mb-2 group-hover:text-[#E8A598] transition-colors">{post.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{post.excerpt}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="outline" className="rounded-none px-8 py-5 text-[11px] uppercase tracking-[0.2em] border-gray-300 text-gray-500 hover:text-[#1E2A3A] hover:border-[#1E2A3A]">
              <Link to="/Blog">
                View All Articles <ArrowRight size={14} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Global Disclaimer */}
      <section className="py-8 bg-[#1E2A3A]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[10px] text-gray-400 leading-relaxed max-w-3xl mx-auto">
            *These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </section>

    </div>
  );
}