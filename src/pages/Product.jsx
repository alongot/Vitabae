import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight, ArrowLeft, Check, CheckCircle2, Info, Leaf, ShieldCheck, AlertTriangle, Clock, Pill, FlaskConical, BookOpen, Heart, Users, Baby, Flower2, ChevronRight, MapPin, Droplets, Sun, Wind, Sparkles, Plus } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import productsData from '../../data/products.json';

// ─── PRODUCT DATA BY ID ───────────────────────────────────────────────────────
const PRODUCT_DATA = {
  'ginger-capsules': {
    name: 'Organic Ginger',
    scientificName: 'Zingiber officinale',
    headline: 'Organic Ginger for Digestive Comfort',
    tagline: 'Ginger Rhizome (Zingiber officinale)',
    benefits: ['Digestive Comfort & Support', 'Menstrual & Pregnancy Wellness', 'Antioxidant & Comfort Support'],
    description: 'Organic Ginger rhizome powder, rich in naturally occurring gingerols and shogaols. Each capsule delivers the time-honored benefits of whole Ginger root — supporting digestive comfort, promoting menstrual wellness, and providing antioxidant support. Gently vacuum-dried at low temperatures to preserve the root\'s natural bioactive compounds.*',
    variants: [{ label: 'Medium Capsule (#0)', dosage: '2 per day' }, { label: 'Small Capsule (#1)', dosage: '3 per day' }],
  },
  'ashwagandha-capsules': {
    name: 'Organic Ashwagandha',
    scientificName: 'Withania somnifera',
    headline: 'Organic Ashwagandha for Stress & Vitality',
    tagline: 'Ashwagandha Root (Withania somnifera)',
    benefits: ['Stress Resilience & Calm', 'Balanced Energy & Vitality', 'Adaptogenic Support'],
    description: 'Organic Ashwagandha root powder, standardized to 5% withanolides. This time-honored adaptogenic herb supports a healthy stress response, promotes balanced energy, and helps maintain overall vitality. Cultivated in the arid soils of Rajasthan and gently processed to preserve bioactive compounds.*',
    variants: [{ label: 'Medium Capsule (#0)', dosage: '2 per day' }, { label: 'Small Capsule (#1)', dosage: '3 per day' }],
  },
  'turmeric-capsules': {
    name: 'Organic Turmeric',
    scientificName: 'Curcuma longa',
    headline: 'Organic Turmeric for Comfort & Wellness',
    tagline: 'Turmeric Rhizome (Curcuma longa)',
    benefits: ['Comfort & Joint Support', 'Antioxidant Protection', 'Digestive Wellness'],
    description: 'Organic Turmeric rhizome powder paired with organic black pepper extract for enhanced curcuminoid absorption. Supports comfort, joint health, and provides powerful antioxidant protection. Sourced from organic farms in Tamil Nadu, India.*',
    variants: [{ label: 'Medium Capsule (#0)', dosage: '2 per day' }, { label: 'Small Capsule (#1)', dosage: '3 per day' }],
  },
  'moringa-capsules': {
    name: 'Organic Moringa Leaf',
    scientificName: 'Moringa oleifera',
    headline: 'Organic Moringa for Nutritional Wellness',
    tagline: 'Moringa Leaf (Moringa oleifera)',
    benefits: ['Nutritional Wellness', 'Antioxidant Balance', 'Overall Vitality'],
    description: 'Organic Moringa leaf powder, one of nature\'s most nutrient-dense superfoods. Rich in vitamins, minerals, and antioxidants, each capsule supports nutritional wellness, antioxidant balance, and overall vitality. Hand-picked at dawn and shade-dried to preserve peak nutrient content.*',
    variants: [{ label: 'Medium Capsule (#0)', dosage: '2 per day' }, { label: 'Small Capsule (#1)', dosage: '3 per day' }],
  },
  'shatavari-capsules': {
    name: 'Organic Shatavari',
    scientificName: 'Asparagus racemosus',
    headline: 'Organic Shatavari for Women\'s Wellness',
    tagline: 'Shatavari Root (Asparagus racemosus)',
    benefits: ['Hormonal Balance', 'Reproductive Wellness', 'Lactation Support'],
    description: 'Organic Shatavari root powder, standardized to 40% saponins. This revered Ayurvedic herb supports hormonal balance, reproductive wellness, and lactation. Sustainably wildcrafted from the Himalayan foothills and gently processed to preserve its natural bioactive compounds.*',
    variants: [{ label: 'Medium Capsule (#0)', dosage: '2 per day' }, { label: 'Small Capsule (#1)', dosage: '3 per day' }],
  },
  'holy-basil-capsules': {
    name: 'Organic Holy Basil',
    scientificName: 'Ocimum tenuiflorum',
    headline: 'Organic Holy Basil for Calm & Clarity',
    tagline: 'Holy Basil / Tulsi (Ocimum tenuiflorum)',
    benefits: ['Stress & Mood Support', 'Immune Wellness', 'Respiratory Health'],
    description: 'Organic Holy Basil (Tulsi) leaf powder, rich in ursolic acid and other bioactive compounds. This sacred herb supports stress management, immune function, and respiratory health. Harvested from traditional gardens in Uttar Pradesh and shade-dried to preserve volatile oils.*',
    variants: [{ label: 'Medium Capsule (#0)', dosage: '2 per day' }, { label: 'Small Capsule (#1)', dosage: '3 per day' }],
  },
  'amla-capsules': {
    name: 'Organic Amla',
    scientificName: 'Phyllanthus emblica',
    headline: 'Organic Amla for Antioxidant Wellness',
    tagline: 'Amla Fruit (Phyllanthus emblica)',
    benefits: ['Antioxidant Wellness', 'Immune Health', 'Metabolic Balance'],
    description: 'Organic Amla fruit powder, one of nature\'s richest sources of Vitamin C. Each capsule supports antioxidant wellness, immune health, and metabolic balance. Sourced from organic farms in Uttar Pradesh with full lot documentation from harvest to final product.*',
    variants: [{ label: 'Medium Capsule (#0)', dosage: '2 per day' }, { label: 'Small Capsule (#1)', dosage: '3 per day' }],
  },
  'garlic-capsules': {
    name: 'Organic Garlic',
    scientificName: 'Allium sativum',
    headline: 'Organic Garlic for Cardiovascular Wellness',
    tagline: 'Garlic Bulb (Allium sativum)',
    benefits: ['Cardiovascular Wellness', 'Immune Support', 'Metabolic Balance'],
    description: 'Organic Garlic bulb powder, rich in naturally occurring allicin and sulfur compounds. Each capsule supports cardiovascular wellness, immune function, and metabolic balance. Sourced from organic farms in central India with rich alluvial soil.*',
    variants: [{ label: 'Medium Capsule (#0)', dosage: '2 per day' }, { label: 'Small Capsule (#1)', dosage: '3 per day' }],
  },
  'cinnamon-capsules': {
    name: 'Organic Cinnamon',
    scientificName: 'Cinnamomum verum',
    headline: 'Organic Cinnamon for Metabolic Wellness',
    tagline: 'Ceylon Cinnamon Bark (Cinnamomum verum)',
    benefits: ['Metabolic Wellness', 'Blood Sugar Balance', 'Digestive Comfort'],
    description: 'Organic Ceylon Cinnamon bark powder, rich in cinnamaldehyde. Each capsule supports metabolic wellness, healthy blood sugar levels, and digestive comfort. Sourced from traditional spice gardens in Kerala, India.*',
    variants: [{ label: 'Medium Capsule (#0)', dosage: '2 per day' }, { label: 'Small Capsule (#1)', dosage: '3 per day' }],
  },
  'licorice-capsules': {
    name: 'Organic Licorice',
    scientificName: 'Glycyrrhiza glabra',
    headline: 'Organic Licorice for Digestive & Respiratory Support',
    tagline: 'Licorice Root (Glycyrrhiza glabra)',
    benefits: ['Digestive Comfort', 'Respiratory Wellness', 'Adrenal Support'],
    description: 'Organic Licorice root powder, standardized for glycyrrhizin content. Each capsule supports digestive comfort, respiratory wellness, and adrenal health. Sourced from partner farms in Gujarat specializing in licorice root cultivation.*',
    variants: [{ label: 'Medium Capsule (#0)', dosage: '2 per day' }, { label: 'Small Capsule (#1)', dosage: '3 per day' }],
  },
  'giloy-capsules': {
    name: 'Organic Giloy',
    scientificName: 'Tinospora cordifolia',
    headline: 'Organic Giloy for Immune Resilience',
    tagline: 'Giloy Stem (Tinospora cordifolia)',
    benefits: ['Immune Function', 'Detoxification Support', 'Overall Vitality'],
    description: 'Organic Giloy stem powder, identity-verified using botanical authentication. Each capsule supports immune function, detoxification, and overall vitality. Harvested from managed forest areas with sustainability protocols.*',
    variants: [{ label: 'Medium Capsule (#0)', dosage: '2 per day' }, { label: 'Small Capsule (#1)', dosage: '3 per day' }],
  },
  'fennel-capsules': {
    name: 'Organic Fennel',
    scientificName: 'Foeniculum vulgare',
    headline: 'Organic Fennel for Digestive Harmony',
    tagline: 'Fennel Seed (Foeniculum vulgare)',
    benefits: ['Digestive Comfort', 'Bloating Relief', 'Hormonal Balance'],
    description: 'Organic Fennel seed powder, rich in volatile oils. Each capsule supports digestive comfort, bloating relief, and hormonal balance. Sourced from traditional fennel farms in Gujarat\'s semi-arid climate.*',
    variants: [{ label: 'Medium Capsule (#0)', dosage: '2 per day' }, { label: 'Small Capsule (#1)', dosage: '3 per day' }],
  },
  'fenugreek-capsules': {
    name: 'Organic Fenugreek',
    scientificName: 'Trigonella foenum-graecum',
    headline: 'Organic Fenugreek for Women\'s Wellness',
    tagline: 'Fenugreek Seed (Trigonella foenum-graecum)',
    benefits: ['Lactation Support', 'Digestive Wellness', 'Hormonal Balance'],
    description: 'Organic Fenugreek seed powder, with verified saponin content. Each capsule supports lactation, digestive wellness, and hormonal balance. Sourced from organic farms in Rajasthan with generations of fenugreek expertise.*',
    variants: [{ label: 'Medium Capsule (#0)', dosage: '2 per day' }, { label: 'Small Capsule (#1)', dosage: '3 per day' }],
  },
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

// ─── INGREDIENT PROCESS DATA ────────────────────────────────────────────────
const INGREDIENT_DETAILS = {
  'ginger-capsules': {
    name: 'Organic Ginger',
    scientific: 'Zingiber officinale',
    origin: 'Kerala, India',
    activeCompound: 'Gingerols & Shogaols',
    process: 'Fresh ginger rhizomes are hand-harvested at peak maturity, cleaned, and sliced thin. They are then dried using a vacuum tray dryer at low temperature under reduced pressure — a gentle method that preserves heat-sensitive gingerols and shogaols. The dried root is finely milled into a uniform powder and encapsulated.',
    color: '#F4A492',
    icon: 'sun',
  },
  'ashwagandha-capsules': {
    name: 'Organic Ashwagandha',
    scientific: 'Withania somnifera',
    origin: 'Rajasthan, India',
    activeCompound: 'Withanolides (5%)',
    process: 'Ashwagandha roots are cultivated in the arid soils of Rajasthan, harvested after 150–180 days of growth, then washed and shade-dried to preserve the root\'s withanolide content. The dried roots are carefully milled and standardized before encapsulation.',
    color: '#C8D6B9',
    icon: 'wind',
  },
  'turmeric-capsules': {
    name: 'Organic Turmeric',
    scientific: 'Curcuma longa',
    origin: 'Tamil Nadu, India',
    activeCompound: 'Curcuminoids (95%)',
    process: 'Turmeric rhizomes are harvested from organic farms in Tamil Nadu, boiled briefly to activate curcuminoids, then sun-dried and polished. The dried rhizomes are ground into a fine powder, paired with organic black pepper extract for enhanced absorption, and encapsulated.',
    color: '#E8C547',
    icon: 'sun',
  },
  'moringa-capsules': {
    name: 'Organic Moringa',
    scientific: 'Moringa oleifera',
    origin: 'Andhra Pradesh, India',
    activeCompound: 'Whole Leaf Nutrients',
    process: 'Moringa leaves are hand-picked at dawn when nutrient density is highest, washed in purified water, and shade-dried at low temperatures to lock in vitamins, minerals, and antioxidants. The dried leaves are milled into a fine, nutrient-dense powder.',
    color: '#6B8E23',
    icon: 'droplets',
  },
  'shatavari-capsules': {
    name: 'Organic Shatavari',
    scientific: 'Asparagus racemosus',
    origin: 'Himalayan Foothills, India',
    activeCompound: 'Saponins (40%)',
    process: 'Shatavari roots are wildcrafted from the Himalayan foothills, carefully cleaned, and sliced. They undergo low-temperature drying to preserve saponin content, then are milled and standardized for consistent potency in each capsule.',
    color: '#B48EC6',
    icon: 'sparkles',
  },
  'holy-basil-capsules': {
    name: 'Organic Holy Basil',
    scientific: 'Ocimum tenuiflorum',
    origin: 'Uttar Pradesh, India',
    activeCompound: 'Ursolic Acid (2.5%)',
    process: 'Tulsi leaves are harvested from sacred gardens in Uttar Pradesh, air-dried in the shade to preserve volatile oils and ursolic acid, then gently ground into a fine powder. The whole-leaf approach retains the plant\'s full spectrum of bioactive compounds.',
    color: '#7BAF5A',
    icon: 'wind',
  },
  'amla-capsules': {
    name: 'Organic Amla', scientific: 'Phyllanthus emblica', origin: 'Uttar Pradesh, India',
    activeCompound: 'Vitamin C & Polyphenols', color: '#A8C686', icon: 'sun',
    process: 'Amla fruits are hand-picked at peak ripeness, washed, and deseeded. The fruit is then dried at low temperature to preserve its exceptionally high Vitamin C content and polyphenol profile, before being milled into a fine powder.',
  },
  'garlic-capsules': {
    name: 'Organic Garlic', scientific: 'Allium sativum', origin: 'Madhya Pradesh, India',
    activeCompound: 'Allicin', color: '#F5F0DC', icon: 'sparkles',
    process: 'Organic garlic bulbs are harvested, cleaned, and carefully sliced. They undergo low-temperature drying to preserve allicin and sulfur compounds, then are milled into a fine powder for encapsulation.',
  },
  'cinnamon-capsules': {
    name: 'Organic Cinnamon', scientific: 'Cinnamomum verum', origin: 'Kerala, India',
    activeCompound: 'Cinnamaldehyde', color: '#C4834C', icon: 'sun',
    process: 'Ceylon cinnamon bark is harvested from traditional spice gardens, the inner bark carefully peeled, and dried naturally. The bark is then ground into a fine powder, preserving cinnamaldehyde content and authentic flavor.',
  },
  'licorice-capsules': {
    name: 'Organic Licorice', scientific: 'Glycyrrhiza glabra', origin: 'Gujarat, India',
    activeCompound: 'Glycyrrhizin', color: '#C9A227', icon: 'droplets',
    process: 'Licorice roots are carefully harvested, washed, and sun-dried. The roots are then ground and standardized for glycyrrhizin content before encapsulation.',
  },
  'giloy-capsules': {
    name: 'Organic Giloy', scientific: 'Tinospora cordifolia', origin: 'Maharashtra, India',
    activeCompound: 'Tinosporin', color: '#6B8F5E', icon: 'wind',
    process: 'Giloy stems are sustainably harvested from managed forest areas, cleaned, and dried using shade drying methods. The stems are identity-verified through botanical authentication before milling.',
  },
  'fennel-capsules': {
    name: 'Organic Fennel', scientific: 'Foeniculum vulgare', origin: 'Gujarat, India',
    activeCompound: 'Volatile Oils', color: '#B8D4A3', icon: 'droplets',
    process: 'Fennel seeds are harvested at maturity, cleaned, and dried to preserve volatile oil content. The seeds are then gently milled into a fine powder for encapsulation.',
  },
  'fenugreek-capsules': {
    name: 'Organic Fenugreek', scientific: 'Trigonella foenum-graecum', origin: 'Rajasthan, India',
    activeCompound: 'Saponins', color: '#D4B896', icon: 'sparkles',
    process: 'Fenugreek seeds are sourced from organic farms in Rajasthan, cleaned, and dried. Saponin content is verified per batch before the seeds are milled and encapsulated.',
  },
};

function IngredientProcess() {
  return (
    <section className="bg-black">
      <div className="w-full aspect-video max-h-[70vh] overflow-hidden">
        <video
          src="/videos/farm-documentary.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}

function RecommendedProducts({ currentProductId }) {
  const allProducts = productsData.products;
  const recommended = allProducts.filter(p => p.id !== currentProductId);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector('.rec-card');
    el.scrollBy({ left: dir * ((card?.offsetWidth || 300) + 20), behavior: 'smooth' });
  };

  const goToProduct = (productId) => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    navigate(`/Product?id=${productId}`);
  };

  return (
    <section className="bg-[#FAF8F5] py-14">
      <div className="flex items-center justify-between mb-10 px-6 lg:px-8">
        <div className="flex-1" />
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-[#1E2A3A] leading-tight text-center">
          <span className="font-light">You may also </span>
          <span className="font-serif italic">like</span>
        </h2>
        <div className="flex-1 flex items-center justify-end gap-2">
          <button onClick={() => scroll(-1)} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#1E2A3A] hover:text-white hover:border-[#1E2A3A] transition-all">
            <ArrowLeft size={16} />
          </button>
          <button onClick={() => scroll(1)} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#1E2A3A] hover:text-white hover:border-[#1E2A3A] transition-all">
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="overflow-x-auto w-full px-6 lg:px-8 no-scrollbar scroll-smooth">
        <div className="flex gap-5 w-max">
          {recommended.map((product, i) => (
            <div
              key={`${product.id}-${i}`}
              onClick={() => goToProduct(product.id)}
              className="rec-card group block flex-shrink-0 w-[80vw] sm:w-[45vw] md:w-[30vw] lg:w-[22vw] cursor-pointer"
            >
              <div className="relative bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-lg h-full flex flex-col overflow-hidden">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#F5F3EF]">
                  <img
                    src="/images/ilona-isha.jpg"
                    alt={product.name}
                    className="w-full h-full object-cover mix-blend-multiply opacity-85 group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-[#1E2A3A] mb-1 leading-tight">{product.name}</h3>
                  <p className="text-sm text-gray-400 italic mb-2">{product.tagline}</p>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-grow line-clamp-2">{product.shortDescription}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-lg font-light text-[#1E2A3A]">${product.price.toFixed(2)}</span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#1E2A3A] inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                      View <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ProductPageWrapper() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id') || 'ginger-capsules';
  return <ProductPage key={id} productId={id} />;
}

function ProductPage({ productId }) {
  const id = productId;
  const currentProductData = PRODUCT_DATA[id] || PRODUCT_DATA['ginger-capsules'];
  const ingredientName = currentProductData.name.replace('Organic ', '');
  const ingredientDetail = INGREDIENT_DETAILS[id] || INGREDIENT_DETAILS['ginger-capsules'];
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [activeTab, setActiveTab] = useState('benefits');
  const [activeView, setActiveView] = useState('product');
  const [isImageHovered, setIsImageHovered] = useState(false);
  const heroVideoRef = useRef(null);
  const tabsRef = useRef(null);

  const PRODUCT_VIEWS = [
    { id: 'product', label: 'Product' },
    { id: 'capsule', label: 'Capsule Size' },
    { id: 'powder', label: 'Ingredient Powder' },
    { id: 'routine', label: 'Daily Routine' },
    { id: 'flat-lay', label: 'Flat Lay' },
  ];

  useEffect(() => {
    if (isImageHovered && heroVideoRef.current) {
      heroVideoRef.current.currentTime = 0;
      heroVideoRef.current.play().catch(() => {});
    } else if (heroVideoRef.current) {
      heroVideoRef.current.pause();
    }
  }, [isImageHovered]);

  // Look up product from local JSON data
  const product = productsData.products.find(p => p.id === id) || productsData.products[0];

  if (!product) {
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
    <div key={id} className="bg-[#FFFBF5] min-h-screen font-sans text-[#1E2A3A]">

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1 — HERO
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white">
        <div className="container mx-auto px-4 md:px-8 pt-10 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Product Image / Views */}
            <div className="space-y-4">
              {/* Main View Area */}
              <div className="aspect-square bg-[#FAF8F5] rounded-2xl relative overflow-hidden">
                {/* Product View */}
                {activeView === 'product' && (
                  <div
                    className="w-full h-full p-10 cursor-pointer"
                    onMouseEnter={() => setIsImageHovered(true)}
                    onMouseLeave={() => setIsImageHovered(false)}
                  >
                    <img
                      src={product.image_url || product.image}
                      alt={currentProductData.name}
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
                )}

                {/* Capsule Size View */}
                {activeView === 'capsule' && (
                  <div className="w-full h-full flex flex-col items-center justify-center p-10 gap-6">
                    <div className="flex items-end gap-10">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-14 h-28 rounded-full bg-[#E8E4DC] border border-gray-200" />
                        <span className="text-xs font-medium text-[#1E2A3A]">Medium</span>
                        <span className="text-[10px] text-gray-400">2 per day</span>
                      </div>
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-11 h-22 rounded-full bg-[#E8E4DC] border border-gray-200" />
                        <span className="text-xs font-medium text-[#1E2A3A]">Small</span>
                        <span className="text-[10px] text-gray-400">3 per day</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 text-center max-w-xs">Both sizes contain the same organic ginger formula — choose the size that's easiest for you to swallow.</p>
                  </div>
                )}

                {/* Ingredient Powder View */}
                {activeView === 'powder' && (
                  <div className="w-full h-full flex flex-col items-center justify-center p-10 gap-4">
                    <div className="w-40 h-40 rounded-full bg-[#E8C97E]/30 border-2 border-dashed border-[#E8C97E]/50 flex items-center justify-center">
                      <div className="w-28 h-28 rounded-full bg-[#E8C97E]/50 flex items-center justify-center">
                        <span className="text-sm font-medium text-[#8B6914]">{currentProductData.name}</span>
                      </div>
                    </div>
                    <div className="text-center mt-4">
                      <p className="text-sm font-medium text-[#1E2A3A]">100% {currentProductData.name}</p>
                      <p className="text-xs text-gray-500 mt-1">Gently processed to preserve bioactive compounds</p>
                      <p className="text-[10px] text-[#E8A598] font-medium mt-2 uppercase tracking-wider">No fillers · No binders · No additives</p>
                    </div>
                  </div>
                )}

                {/* Daily Routine View */}
                {activeView === 'routine' && (
                  <div className="w-full h-full flex flex-col items-center justify-center p-10 gap-6">
                    <div className="space-y-5 w-full max-w-xs">
                      {[
                        { time: 'Morning', icon: '☀️', text: 'Take with breakfast for digestive support' },
                        { time: 'Midday', icon: '🌿', text: 'Optional second dose with lunch' },
                        { time: 'Evening', icon: '🌙', text: 'Third dose with dinner if needed' },
                      ].map((step, i) => (
                        <div key={i} className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-base flex-shrink-0 shadow-sm">
                            {step.icon}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#1E2A3A]">{step.time}</p>
                            <p className="text-xs text-gray-500">{step.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-gray-400 text-center">Always take with meals for best absorption</p>
                  </div>
                )}

                {/* Flat Lay View */}
                {activeView === 'flat-lay' && (
                  <div className="w-full h-full flex flex-col items-center justify-center p-10 gap-4">
                    <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
                      <div className="aspect-square rounded-xl bg-[#EBE6DD] flex items-center justify-center">
                        <Leaf size={24} className="text-[#6B8E23]" />
                      </div>
                      <div className="aspect-square rounded-xl bg-[#E8E4DC] flex items-center justify-center row-span-2 col-span-2">
                        <div className="text-center">
                          <img src={product.image_url || product.image} alt={currentProductData.name} className="w-20 h-20 object-contain mx-auto mix-blend-multiply" />
                        </div>
                      </div>
                      <div className="aspect-square rounded-xl bg-[#F4E8DC] flex items-center justify-center">
                        <Pill size={20} className="text-[#C8946A]" />
                      </div>
                      <div className="aspect-square rounded-xl bg-[#DCE8D6] flex items-center justify-center">
                        <ShieldCheck size={20} className="text-[#6B8E23]" />
                      </div>
                      <div className="aspect-square rounded-xl bg-[#F0EBE3] flex items-center justify-center col-span-2">
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">USDA Organic · Lab Tested · cGMP</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Clickable View Tabs */}
              <div className="grid grid-cols-5 gap-2">
                {PRODUCT_VIEWS.map((view) => (
                  <button
                    key={view.id}
                    onClick={() => setActiveView(view.id)}
                    className={`aspect-square rounded-lg border flex items-center justify-center transition-all ${
                      activeView === view.id
                        ? 'border-[#1E2A3A] bg-[#1E2A3A]/5'
                        : 'border-gray-100 bg-[#FAF8F5] hover:border-gray-300'
                    }`}
                  >
                    <span className={`text-[8px] uppercase tracking-wider text-center px-1 font-medium ${
                      activeView === view.id ? 'text-[#1E2A3A]' : 'text-gray-400'
                    }`}>{view.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:sticky lg:top-24">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#E8A598] font-semibold mb-3">Single Ingredient</p>

              <h1 className="text-3xl md:text-4xl text-[#1E2A3A] mb-2 font-light">
                {currentProductData.headline}
              </h1>

              <p className="text-base text-gray-500 font-light italic mb-5">
                {currentProductData.tagline}
              </p>

              {/* Associated Benefits */}
              <div className="flex flex-wrap gap-2 mb-6">
                {currentProductData.benefits.map((b) => (
                  <span key={b} className="text-[10px] uppercase tracking-wider bg-[#FAF8F5] border border-gray-100 px-3 py-1.5 text-gray-600">{b}</span>
                ))}
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed mb-8">
                {currentProductData.description}
              </p>

              {/* Variant Selector */}
              <div className="mb-6">
                <p className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-semibold mb-3">Select Size</p>
                <div className="grid grid-cols-2 gap-3">
                  {currentProductData.variants.map((v, i) => (
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
          SECTION 2 — FEATURES (Vertical Column Navigation)
          ═══════════════════════════════════════════════════════════════════════ */}
      <section ref={tabsRef} className="bg-white border-t border-gray-100">
        {/* Full-width tab bar */}
        <div className="border-b border-gray-100">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-0">
              {FEATURE_TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                const tabIcons = {
                  benefits: <Heart size={18} />,
                  formula: <FlaskConical size={18} />,
                  science: <BookOpen size={18} />,
                  'how-to-use': <Pill size={18} />,
                  compatibility: <CheckCircle2 size={18} />,
                  safety: <ShieldCheck size={18} />,
                };
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`group flex flex-col items-center gap-2.5 py-6 md:py-8 px-3 transition-all border-b-[3px] ${
                      isActive
                        ? 'border-b-[#E8A598] bg-[#FAF8F5] text-[#1E2A3A]'
                        : 'border-b-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50/50'
                    }`}
                  >
                    <span className={`transition-colors ${isActive ? 'text-[#E8A598]' : 'text-gray-300 group-hover:text-gray-400'}`}>
                      {tabIcons[tab.id]}
                    </span>
                    <span className="text-[10px] md:text-[11px] uppercase tracking-[0.1em] font-medium leading-tight text-center">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 md:px-8 py-14">
          <div className="max-w-4xl mx-auto">
            <div>

            {/* ── TAB 1: BENEFITS ──────────────────────────────────────────── */}
            {activeTab === 'benefits' && (
              <div className="animate-in fade-in duration-300">
                <h3 className="text-2xl md:text-3xl font-light text-[#1E2A3A] mb-10">
                  How {currentProductData.name.replace('Organic ', '')} Can Support Your Life Stage
                </h3>

                <div className="space-y-6">
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
                      {ingredientName} is generally safe for adults aged 60+ when taken as directed. Seniors taking blood-thinning or blood sugar–lowering medications should consult a healthcare professional before use. Do not exceed the recommended serving size.
                    </p>
                  </div>
                </div>

                {/* FDA Disclaimer */}
                <p className="text-[10px] text-gray-400 italic mt-8">
                  *These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
                </p>

                {/* Why It Matters */}
                <div className="mt-10 bg-[#FAF8F5] rounded-xl p-8 border border-gray-100">
                  <h4 className="text-lg font-medium text-[#1E2A3A] mb-4">Why It Matters</h4>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {ingredientName}'s naturally occurring bioactive compounds play a role in overall wellness and comfort.* Valued across cultures for centuries, this whole-food powder supports health and vitality throughout women's life stages.*
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
                <h2 className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold mb-2">Formula</h2>
                <h3 className="text-2xl md:text-3xl font-light text-[#1E2A3A] mb-10">
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
                        <td className="px-6 py-5 text-sm font-medium text-[#1E2A3A]">{currentProductData.name} Powder</td>
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

                <p className="text-sm text-gray-500 mb-10 font-medium">No fillers, binders, preservatives, or artificial additives</p>

                {/* Sourcing & Quality */}
                <div className="bg-[#FAF8F5] rounded-xl p-8 border border-gray-100 mb-8">
                  <h3 className="text-lg font-medium text-[#1E2A3A] mb-5">Ingredient Sourcing & Quality</h3>
                  <ul className="space-y-3">
                    {[
                      { bold: '100% Organic:', text: `USDA Certified ${currentProductData.name} from sustainably cultivated plants in India` },
                      { bold: 'Whole Rhizome Powder:', text: 'Complete nutritional profile with naturally occurring bioactive compounds' },
                      { bold: 'Gentle Processing:', text: 'Vacuum tray drying at low temperature under reduced pressure to preserve heat-sensitive gingerols and shogaols' },
                      { bold: 'Peak Harvest:', text: 'Rhizomes harvested at peak maturity for maximum potency and bioactive content' },
                      { bold: 'Traditional Source:', text: `Sourced from India where ${ingredientName} has been cultivated for centuries in wellness practices` },
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
                    We chose whole {ingredientName} powder instead of extracts or isolates to preserve the naturally occurring bioactive compounds in their original ratios. This whole-food form reflects traditional use, supports natural nutrient synergy, and avoids over-processing that can alter or concentrate individual compounds.*
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {ingredientDetail.process}
                  </p>
                </div>

                <p className="text-[10px] text-gray-400 italic">
                  *These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
                </p>
              </div>
            )}

            {/* ── TAB 3: SCIENTIFIC SUPPORT ────────────────────────────────── */}
            {activeTab === 'science' && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold mb-2">Scientific Support</h2>
                <p className="text-sm text-gray-500 leading-relaxed max-w-2xl mb-10">
                  The compounds below reflect what is naturally present in whole {ingredientName} and what traditional use and emerging research suggest about their role in overall wellness. This information is provided for transparency — it does not represent established therapeutic mechanisms, and this product is not intended to replace medical treatment or advice.
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
                        <td className="px-6 py-5 text-sm font-medium text-[#1E2A3A]">{ingredientDetail.activeCompound}</td>
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
                    `Studies support ${ingredientName}'s role in supporting overall wellness`,
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

                <div className="mb-10">
                  <h5 className="text-sm font-medium text-[#1E2A3A] mb-2">Want to explore the research?</h5>
                  <Link to="/Library" className="text-sm text-[#E8A598] hover:text-[#d4897c] inline-flex items-center gap-1 transition-colors">
                    View our full library of research that guides our formulation <ChevronRight size={14} />
                  </Link>
                </div>

                <p className="text-[10px] text-gray-400 italic mb-10">
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
                <h3 className="text-2xl md:text-3xl font-light text-[#1E2A3A] mb-8">Daily Use</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="bg-[#FAF8F5] rounded-xl p-6 border border-gray-100 text-center">
                    <Pill size={24} className="mx-auto mb-3 text-[#1E2A3A]" />
                    <p className="text-sm font-medium text-[#1E2A3A]">Medium Capsule</p>
                    <p className="text-sm text-gray-500">Take 2 capsules daily with meals</p>
                  </div>
                  <div className="bg-[#FAF8F5] rounded-xl p-6 border border-gray-100 text-center">
                    <Pill size={20} className="mx-auto mb-3 text-[#1E2A3A]" />
                    <p className="text-sm font-medium text-[#1E2A3A]">Small Capsule</p>
                    <p className="text-sm text-gray-500">Take 3 capsules daily with meals</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-10">Or as directed by your healthcare practitioner.</p>

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
                      `Take ${ingredientName} with meals to support digestion and reduce the chance of stomach upset`,
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

                <p className="text-[10px] text-gray-400 italic">
                  *These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
                </p>
              </div>
            )}

            {/* ── TAB 5: COMPATIBILITY ─────────────────────────────────────── */}
            {activeTab === 'compatibility' && (
              <div className="animate-in fade-in duration-300">
                {/* Suitable With */}
                <h3 className="text-2xl md:text-3xl font-light text-[#1E2A3A] mb-10">Compatibility</h3>

                <div className="space-y-6 mb-10">
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
                        `Individuals with known allergies to ${ingredientName}`,
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
                      <strong>Critical:</strong> {ingredientName} may interact with certain medications. Pregnant women should use only under medical supervision. If you have a medical condition or take medications, consult your healthcare provider before use.
                    </p>
                  </div>
                </div>

                <p className="text-[10px] text-gray-400 italic mt-6">
                  *These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
                </p>
              </div>
            )}

            {/* ── TAB 6: SAFETY ────────────────────────────────────────────── */}
            {activeTab === 'safety' && (
              <div className="animate-in fade-in duration-300">
                <h3 className="text-2xl md:text-3xl font-light text-[#1E2A3A] mb-10">Safety Information</h3>

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
                      <li>• Mild nausea (uncommon)</li>
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
                      <p className="text-sm text-red-800">{ingredientName} may interact with certain medications including anticoagulants. Consult your healthcare provider before use.</p>
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
                      { bold: 'Bleeding Risk:', text: `${ingredientName} may increase the risk of bleeding when taken with anticoagulant or antiplatelet medications. Individuals with bleeding disorders should not use without medical supervision.` },
                      { bold: 'Gallstones:', text: 'Those with gallstones should consult a healthcare professional before use.' },
                      { bold: 'Blood Sugar:', text: `${ingredientName} may affect blood sugar levels. Those on diabetes medications should monitor levels carefully and consult a healthcare provider.` },
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
                    <strong>Important:</strong> Do not exceed recommended dosage. {ingredientName} may interact with certain medications. Individual responses vary. If you have bleeding disorders, gallstones, diabetes, or take blood-thinning, blood pressure, or diabetes medications, medical supervision is strongly recommended.
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
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 3 — INGREDIENT PROCESS + RECOMMENDED PRODUCTS
          ═══════════════════════════════════════════════════════════════════════ */}
      <IngredientProcess />

      {/* ═══════════════════════════════════════════════════════════════════════
          RECOMMENDED PRODUCTS
          ═══════════════════════════════════════════════════════════════════════ */}
      <RecommendedProducts currentProductId={id} />

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 4 — FAQ (split panel)
          ═══════════════════════════════════════════════════════════════════════ */}
      <ProductFAQ />

      {/* ═══════════════════════════════════════════════════════════════════════
          REVIEWS — Real People, Real Results
          ═══════════════════════════════════════════════════════════════════════ */}
      <ProductReviews />

    </div>
  );
}

/* ─── FAQ COMPONENT (split panel design) ─────────────────────────────────── */
function ProductFAQ() {
  const [activeCategory, setActiveCategory] = useState('Ingredient');
  const [openItem, setOpenItem] = useState(null);

  const categories = ['Ingredient', 'Safety', 'Health'];

  const faqData = {
    Ingredient: [
      { q: 'Is this the same product for all life stages?', a: 'Yes. This product contains a single ingredient. The formula does not change. What may differ is how individuals experience its benefits at different life stages.' },
      { q: 'How is the ingredient processed?', a: 'Fresh ingredients are cleaned, sliced, and dried using a vacuum tray dryer at low temperature under reduced pressure. This gentle method preserves heat-sensitive bioactive compounds.' },
      { q: 'Why do the benefits change by life stage?', a: 'The ingredient remains the same. Different life stages come with different physiological needs, which may influence how it is experienced.' },
      { q: 'Is this product tested for purity?', a: 'Yes. Each batch is third-party tested for purity, heavy metals, and contaminants. Certificates of Analysis are available upon request.' },
      { q: 'Why single-ingredient formulas?', a: 'Single-ingredient formulas allow for full transparency, precise dosing, and the ability to customize your supplement routine based on your individual needs.' },
    ],
    Safety: [
      { q: 'Is this product safe during pregnancy?', a: 'Pregnant women should consult their healthcare provider before use. Some ingredients have a long history of traditional use during pregnancy, but medical supervision is recommended.' },
      { q: 'What if I take blood-thinning medications?', a: 'Some ingredients may interact with anticoagulant or antiplatelet medications. Consult your healthcare provider before using this product.' },
      { q: 'Are there any side effects?', a: 'Our products are generally well-tolerated. As with any supplement, individual responses may vary. Discontinue use and consult a doctor if you experience adverse effects.' },
    ],
    Health: [
      { q: 'Does this product treat or prevent any condition?', a: 'No. This product is intended to support general wellness and is not intended to diagnose, treat, cure, or prevent any disease.' },
      { q: 'Can I take this long-term?', a: 'Many of our ingredients are commonly used as part of a daily wellness routine. For long-term use, consult a healthcare professional.' },
      { q: 'Can I combine multiple Vitabae products?', a: 'Yes. Our single-ingredient approach is designed for stacking. However, consult your healthcare provider for personalized guidance.' },
    ],
  };

  const items = faqData[activeCategory] || [];

  return (
    <section className="bg-white py-0">
      <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] min-h-[500px]">
        {/* Left */}
        <div className="bg-white px-8 lg:px-12 py-14 flex flex-col justify-center border-r border-gray-100">
          <h2 className="text-6xl lg:text-7xl font-bold text-[#1E2A3A] mb-12 leading-none">FAQ</h2>
          <nav className="flex flex-row md:flex-col gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setOpenItem(null); }}
                className={`text-base text-left py-2 px-3 rounded-lg transition-all ${
                  activeCategory === cat
                    ? 'text-[#E8A598] font-medium bg-[#E8A598]/5'
                    : 'text-[#2c2622] hover:text-[#E8A598] hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>
        </div>

        {/* Right */}
        <div className="bg-[#f5f2ee] px-8 lg:px-14 py-14 flex flex-col justify-center">
          {items.map((item, i) => (
            <div key={i} className={`border-b border-[#e0dbd4] ${i === 0 ? 'border-t' : ''}`}>
              <button
                onClick={() => setOpenItem(openItem === i ? null : i)}
                className="w-full flex items-center justify-between py-6 gap-6 text-left"
              >
                <span className="text-[15px] text-[#3a3530] leading-[1.4]">{item.q}</span>
                <Plus
                  size={22}
                  className={`text-[#3a3530] shrink-0 transition-transform duration-300 ${
                    openItem === i ? 'rotate-45 text-[#E8A598]' : ''
                  }`}
                />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${
                openItem === i ? 'max-h-[250px] pb-6' : 'max-h-0'
              }`}>
                <p className="text-[14px] font-light text-[#6a6460] leading-[1.75]">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── REVIEWS COMPONENT ──────────────────────────────────────────────────── */
function ProductReviews() {
  const reviews = [
    { name: 'Priya M.', text: 'I finally found supplements I can trust. The single-ingredient approach gives me confidence in exactly what I\'m taking.', img: 'https://i.pravatar.cc/400?img=32', product: 'Organic Shatavari', productId: 'shatavari-capsules' },
    { name: 'Sarah K.', text: 'The Ashwagandha has been a game-changer for my stress levels. I feel more balanced than I have in years.', img: 'https://i.pravatar.cc/400?img=25', product: 'Organic Ashwagandha', productId: 'ashwagandha-capsules' },
    { name: 'Anita R.', text: 'Love the transparency — knowing exactly where each ingredient comes from and that it\'s been batch tested.', img: 'https://i.pravatar.cc/400?img=44', product: 'Organic Amla', productId: 'amla-capsules' },
    { name: 'Maya L.', text: 'Clean, simple, and effective. No fillers, no guessing. Just pure ingredients that actually work.', img: 'https://i.pravatar.cc/400?img=47', product: 'Organic Moringa', productId: 'moringa-leaf-capsules' },
    { name: 'Kavitha N.', text: 'The Moringa has been incredible for my energy levels postpartum. I recommend it to all new moms.', img: 'https://i.pravatar.cc/400?img=9', product: 'Organic Moringa', productId: 'moringa-leaf-capsules' },
    { name: 'Rhea T.', text: 'The Shatavari has helped me so much through menopause. I love that it\'s sourced from the Himalayas.', img: 'https://i.pravatar.cc/400?img=23', product: 'Organic Shatavari', productId: 'shatavari-capsules' },
    { name: 'Neha P.', text: 'I\'ve tried so many brands. Vitabae is the first one where I actually feel a difference — and I trust the sourcing.', img: 'https://i.pravatar.cc/400?img=19', product: 'Organic Ashwagandha', productId: 'ashwagandha-capsules' },
    { name: 'Deepa S.', text: 'My doctor was impressed by the quality and traceability. These are the supplements I\'ll stick with.', img: 'https://i.pravatar.cc/400?img=45', product: 'Organic Ginger', productId: 'ginger-capsules' },
  ];

  return (
    <section className="py-14 md:py-20 bg-[#FFF5ED] overflow-hidden">
      <style>{`
        @keyframes productReviewsScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className="px-6 lg:px-8 mb-10">
        <h2 className="text-3xl md:text-5xl lg:text-6xl text-[#1E2A3A] leading-tight">
          <span className="font-light">Real people, </span>
          <span className="font-serif italic">real results.</span>
        </h2>
      </div>

      <div>
        <div className="flex w-max hover:[animation-play-state:paused]" style={{ animation: 'productReviewsScroll 60s linear infinite' }}>
          {[...reviews, ...reviews].map((review, i) => (
            <div key={i} className="flex-shrink-0 w-[520px] h-[280px] mx-3 bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-row">
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
              <div className="w-[200px] shrink-0">
                <img src={review.img} alt={review.name} className="w-full h-full object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}