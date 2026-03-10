# Interactive Features Agent

## Role
Build complex interactive components for the Vitabae website including the India ingredient map, 22-step process infographic, life-stage quiz, and product filtering/search functionality.

---

## Responsibilities

1. **India Ingredient Map** - Interactive map with markers, video overlays, region highlighting
2. **22-Step Process Infographic** - Animated step-by-step journey with expandable details
3. **Life-Stage Quiz** - Multi-step quiz with personalized product recommendations
4. **Product Filters** - Dynamic filtering with URL state management
5. **Tabs & Accordions** - Accessible tabbed content and expandable sections

---

## 1. India Ingredient Map (`src/scripts/map.js`)

### Features
- Leaflet-based interactive map of India
- Custom markers for ingredient sourcing locations
- Click marker → show ingredient detail panel
- Region video overlay on hover/click
- Smooth pan and zoom controls

### Implementation

```javascript
// src/scripts/map.js
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Ingredient data
const ingredients = [
  {
    id: 'ashwagandha',
    name: 'Ashwagandha',
    region: 'Rajasthan',
    lat: 26.8,
    lng: 75.8,
    description: 'Sourced from organic farms in the arid regions of Rajasthan, known for producing the highest quality ashwagandha root.',
    benefits: ['Stress reduction', 'Energy', 'Cognitive function'],
    video: '/videos/ashwagandha-farm.mp4',
    image: '/images/ingredients/ashwagandha.jpg',
  },
  {
    id: 'turmeric',
    name: 'Turmeric',
    region: 'Karnataka',
    lat: 15.3,
    lng: 75.7,
    description: 'Our turmeric comes from the lush farms of Karnataka, processed within hours of harvest to preserve maximum curcumin content.',
    benefits: ['Anti-inflammatory', 'Antioxidant', 'Joint health'],
    video: '/videos/turmeric-harvest.mp4',
    image: '/images/ingredients/turmeric.jpg',
  },
  {
    id: 'tulsi',
    name: 'Tulsi (Holy Basil)',
    region: 'Uttar Pradesh',
    lat: 26.9,
    lng: 80.9,
    description: 'Sacred tulsi leaves harvested from temple gardens in Uttar Pradesh, following traditional Ayurvedic cultivation methods.',
    benefits: ['Adaptogenic', 'Respiratory health', 'Immunity'],
    video: '/videos/tulsi-garden.mp4',
    image: '/images/ingredients/tulsi.jpg',
  },
  {
    id: 'brahmi',
    name: 'Brahmi',
    region: 'Kerala',
    lat: 10.8,
    lng: 76.2,
    description: 'Wild-crafted brahmi from the wetlands of Kerala, known for its superior cognitive-enhancing properties.',
    benefits: ['Memory', 'Focus', 'Mental clarity'],
    video: '/videos/brahmi-wetlands.mp4',
    image: '/images/ingredients/brahmi.jpg',
  },
  {
    id: 'shatavari',
    name: 'Shatavari',
    region: 'Himachal Pradesh',
    lat: 31.1,
    lng: 77.2,
    description: 'Mountain-grown shatavari from the foothills of the Himalayas, traditionally used for women\'s reproductive health.',
    benefits: ['Hormonal balance', 'Vitality', 'Rejuvenation'],
    video: '/videos/shatavari-hills.mp4',
    image: '/images/ingredients/shatavari.jpg',
  },
  {
    id: 'amla',
    name: 'Amla',
    region: 'Madhya Pradesh',
    lat: 23.2,
    lng: 77.4,
    description: 'Vitamin C-rich amla berries from the forests of Madhya Pradesh, wild-harvested by local communities.',
    benefits: ['Immunity', 'Antioxidant', 'Skin health'],
    video: '/videos/amla-forest.mp4',
    image: '/images/ingredients/amla.jpg',
  },
];

// Custom marker icon
const createMarkerIcon = (isActive = false) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="marker-pin ${isActive ? 'active' : ''}">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      </div>
    `,
    iconSize: [32, 40],
    iconAnchor: [16, 40],
  });
};

export function initIngredientMap() {
  const mapContainer = document.getElementById('india-map');
  if (!mapContainer) return;

  // Initialize map
  const map = L.map('india-map', {
    center: [22.5, 78.9],
    zoom: 5,
    minZoom: 4,
    maxZoom: 8,
    zoomControl: false,
    scrollWheelZoom: false,
  });

  // Add zoom control to top-right
  L.control.zoom({ position: 'topright' }).addTo(map);

  // Custom tile layer (muted style)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '',
    subdomains: 'abcd',
  }).addTo(map);

  // Add India boundary overlay (optional)
  // Could load GeoJSON of India boundary

  // State for active ingredient
  let activeIngredient = null;
  const markers = {};

  // Add markers for each ingredient
  ingredients.forEach((ing) => {
    const marker = L.marker([ing.lat, ing.lng], {
      icon: createMarkerIcon(),
    }).addTo(map);

    marker.on('click', () => {
      selectIngredient(ing.id);
    });

    marker.on('mouseover', () => {
      if (activeIngredient !== ing.id) {
        marker.setIcon(createMarkerIcon(true));
      }
    });

    marker.on('mouseout', () => {
      if (activeIngredient !== ing.id) {
        marker.setIcon(createMarkerIcon(false));
      }
    });

    markers[ing.id] = marker;
  });

  // Select ingredient function
  function selectIngredient(id) {
    // Reset previous active marker
    if (activeIngredient && markers[activeIngredient]) {
      markers[activeIngredient].setIcon(createMarkerIcon(false));
    }

    // Set new active
    activeIngredient = id;
    markers[id].setIcon(createMarkerIcon(true));

    // Pan to marker
    const ing = ingredients.find((i) => i.id === id);
    map.flyTo([ing.lat, ing.lng], 6, { duration: 0.5 });

    // Update detail panel
    updateDetailPanel(ing);

    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('ingredient-selected', { detail: ing }));
  }

  // Update detail panel
  function updateDetailPanel(ingredient) {
    const panel = document.getElementById('ingredient-detail-panel');
    if (!panel) return;

    panel.innerHTML = `
      <div class="ingredient-detail-inner">
        <div class="ingredient-media mb-4">
          <img src="${ingredient.image}" alt="${ingredient.name}" class="w-full h-48 object-cover rounded-lg">
          ${ingredient.video ? `
            <button class="play-video-btn absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg" onclick="playIngredientVideo('${ingredient.video}')">
              <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
          ` : ''}
        </div>
        <h3 class="text-xl font-semibold mb-1">${ingredient.name}</h3>
        <p class="text-sm text-primary-600 mb-3">${ingredient.region}, India</p>
        <p class="text-muted mb-4">${ingredient.description}</p>
        <div class="ingredient-benefits">
          <h4 class="text-sm font-medium mb-2">Key Benefits:</h4>
          <div class="flex flex-wrap gap-2">
            ${ingredient.benefits.map((b) => `<span class="badge badge-secondary">${b}</span>`).join('')}
          </div>
        </div>
        <a href="/pages/research.html?ingredient=${ingredient.id}" class="btn btn-secondary btn-sm w-full mt-4">
          View Research
        </a>
      </div>
    `;

    panel.classList.add('active');
  }

  // Connect to ingredient list clicks
  document.querySelectorAll('[data-ingredient]').forEach((el) => {
    el.addEventListener('click', () => {
      selectIngredient(el.dataset.ingredient);
    });
  });

  // Enable scroll zoom on focus
  mapContainer.addEventListener('click', () => {
    map.scrollWheelZoom.enable();
  });

  mapContainer.addEventListener('mouseleave', () => {
    map.scrollWheelZoom.disable();
  });

  return { map, selectIngredient };
}

// Video modal for ingredient videos
window.playIngredientVideo = function (videoUrl) {
  const modal = document.getElementById('video-modal');
  const videoEl = modal.querySelector('video');
  videoEl.src = videoUrl;
  modal.classList.add('active');
  videoEl.play();
};
```

### CSS for Map

```css
/* src/styles/sections.css - Map styles */
.custom-marker {
  background: none;
  border: none;
}

.marker-pin {
  color: var(--color-primary-600);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  transition: transform 0.2s ease, color 0.2s ease;
}

.marker-pin:hover,
.marker-pin.active {
  color: var(--color-accent-500);
  transform: scale(1.2);
}

#india-map {
  background-color: var(--color-secondary-100);
}

.ingredient-detail-panel {
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
}

.ingredient-detail-panel.active {
  opacity: 1;
  transform: translateY(0);
}
```

---

## 2. 22-Step Process Infographic (`src/scripts/process.js`)

### Features
- Vertical timeline with step indicators
- Expand/collapse step details
- Scroll-triggered animations
- Progress indicator
- Step navigation

### Implementation

```javascript
// src/scripts/process.js
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Process steps data
const processSteps = [
  {
    id: 1,
    phase: 'Sourcing',
    title: 'Farm Partnership Selection',
    description: 'We evaluate and select organic farms across India based on soil quality, farming practices, and sustainability certifications.',
    icon: 'search',
    details: [
      'Soil testing and quality assessment',
      'Organic certification verification',
      'Fair trade partnership agreements',
      'Sustainability practice audit',
    ],
  },
  {
    id: 2,
    phase: 'Sourcing',
    title: 'Seed Selection & Planting',
    description: 'Native, non-GMO seeds are carefully selected and planted following traditional Ayurvedic timing principles.',
    icon: 'sprout',
    details: [
      'Heirloom seed preservation',
      'Lunar planting calendar adherence',
      'Companion planting techniques',
      'Natural pest management',
    ],
  },
  {
    id: 3,
    phase: 'Sourcing',
    title: 'Organic Cultivation',
    description: 'Plants are grown using traditional organic methods without synthetic pesticides or fertilizers.',
    icon: 'leaf',
    details: [
      'No synthetic chemicals',
      'Natural composting',
      'Water conservation',
      'Biodiversity preservation',
    ],
  },
  {
    id: 4,
    phase: 'Sourcing',
    title: 'Optimal Harvest Timing',
    description: 'Each herb is harvested at peak potency, following traditional knowledge of optimal timing.',
    icon: 'sun',
    details: [
      'Potency testing pre-harvest',
      'Traditional timing methods',
      'Hand harvesting',
      'Same-day processing',
    ],
  },
  {
    id: 5,
    phase: 'Sourcing',
    title: 'Field Quality Check',
    description: 'Initial quality assessment is performed on-site before transport to processing facilities.',
    icon: 'clipboard-check',
    details: [
      'Visual inspection',
      'Moisture content check',
      'Contamination screening',
      'Batch documentation',
    ],
  },
  // ... Add remaining 17 steps for Testing, Manufacturing, Verification
  {
    id: 6,
    phase: 'Testing',
    title: 'Identity Verification',
    description: 'Each botanical is tested to confirm species identity using DNA barcoding and microscopy.',
    icon: 'microscope',
    details: [
      'DNA barcoding analysis',
      'Microscopic examination',
      'Organoleptic testing',
      'Reference standard comparison',
    ],
  },
  {
    id: 7,
    phase: 'Testing',
    title: 'Potency Analysis',
    description: 'Active compound levels are measured using HPLC and other analytical methods.',
    icon: 'flask-conical',
    details: [
      'HPLC analysis',
      'Active compound quantification',
      'Standardization verification',
      'Batch consistency check',
    ],
  },
  {
    id: 8,
    phase: 'Testing',
    title: 'Heavy Metal Testing',
    description: 'Rigorous testing for lead, mercury, arsenic, and cadmium contamination.',
    icon: 'shield-alert',
    details: [
      'ICP-MS analysis',
      'Below detectable limits',
      'California Prop 65 compliant',
      'USP standards adherence',
    ],
  },
  {
    id: 9,
    phase: 'Testing',
    title: 'Microbial Screening',
    description: 'Testing for bacteria, yeast, mold, and pathogens to ensure safety.',
    icon: 'bug',
    details: [
      'Total plate count',
      'Yeast and mold screening',
      'E. coli and Salmonella testing',
      'Pathogen-free verification',
    ],
  },
  {
    id: 10,
    phase: 'Testing',
    title: 'Pesticide Residue Testing',
    description: 'Screening for 500+ pesticide residues to ensure organic purity.',
    icon: 'scan',
    details: [
      'LC-MS/MS analysis',
      '500+ pesticide panel',
      'Organic certification support',
      'Non-detectable limits',
    ],
  },
  {
    id: 11,
    phase: 'Manufacturing',
    title: 'Extraction & Processing',
    description: 'Gentle extraction methods preserve active compounds while removing unwanted materials.',
    icon: 'filter',
    details: [
      'Water-based extraction',
      'Low-temperature processing',
      'No harsh solvents',
      'Active compound preservation',
    ],
  },
  {
    id: 12,
    phase: 'Manufacturing',
    title: 'Formulation Development',
    description: 'Expert formulators combine ingredients in clinically-studied ratios.',
    icon: 'beaker',
    details: [
      'Clinical dosing',
      'Synergistic combinations',
      'Bioavailability optimization',
      'Stability testing',
    ],
  },
  {
    id: 13,
    phase: 'Manufacturing',
    title: 'GMP Manufacturing',
    description: 'Production in FDA-registered, GMP-certified facilities.',
    icon: 'factory',
    details: [
      'FDA-registered facility',
      'cGMP compliance',
      'Clean room processing',
      'Equipment calibration',
    ],
  },
  {
    id: 14,
    phase: 'Manufacturing',
    title: 'Encapsulation',
    description: 'Precise filling of plant-based capsules with exact dosages.',
    icon: 'pill',
    details: [
      'Vegetarian capsules',
      'Weight verification',
      'No fillers or additives',
      'Consistent dosing',
    ],
  },
  {
    id: 15,
    phase: 'Manufacturing',
    title: 'In-Process Testing',
    description: 'Quality checks at every stage of manufacturing.',
    icon: 'clipboard-list',
    details: [
      'Weight uniformity',
      'Disintegration testing',
      'Visual inspection',
      'Batch sampling',
    ],
  },
  {
    id: 16,
    phase: 'Verification',
    title: 'Third-Party Lab Testing',
    description: 'Independent lab verification of purity, potency, and safety.',
    icon: 'building-2',
    details: [
      'ISO-certified labs',
      'Blind sample testing',
      'COA generation',
      'Public transparency',
    ],
  },
  {
    id: 17,
    phase: 'Verification',
    title: 'Stability Testing',
    description: 'Long-term stability studies to ensure potency through expiration.',
    icon: 'clock',
    details: [
      'Accelerated stability',
      'Real-time testing',
      'Expiration validation',
      'Storage condition verification',
    ],
  },
  {
    id: 18,
    phase: 'Verification',
    title: 'Label Accuracy Verification',
    description: 'Independent verification that label claims match actual content.',
    icon: 'check-square',
    details: [
      'Label claim testing',
      'Allergen verification',
      'Regulatory compliance',
      'Consumer protection',
    ],
  },
  {
    id: 19,
    phase: 'Verification',
    title: 'Batch Documentation',
    description: 'Complete traceability documentation for every batch.',
    icon: 'file-text',
    details: [
      'Farm-to-bottle tracking',
      'Lot number assignment',
      'Digital record keeping',
      'Audit trail maintenance',
    ],
  },
  {
    id: 20,
    phase: 'Verification',
    title: 'Quality Assurance Release',
    description: 'Final QA review and release authorization.',
    icon: 'badge-check',
    details: [
      'QA manager review',
      'Specification compliance',
      'Release authorization',
      'Distribution approval',
    ],
  },
  {
    id: 21,
    phase: 'Verification',
    title: 'Eco-Friendly Packaging',
    description: 'Sustainable packaging with minimal environmental impact.',
    icon: 'recycle',
    details: [
      'Recyclable materials',
      'Minimal plastic',
      'Soy-based inks',
      'Carbon-neutral shipping',
    ],
  },
  {
    id: 22,
    phase: 'Verification',
    title: 'Customer Delivery',
    description: 'Fast, secure delivery with satisfaction guarantee.',
    icon: 'package',
    details: [
      'Climate-controlled storage',
      'Secure packaging',
      'Tracking provided',
      '60-day guarantee',
    ],
  },
];

export function initProcessSteps() {
  const container = document.getElementById('process-timeline');
  if (!container) return;

  // Render steps
  renderSteps(container);

  // Initialize scroll animations
  initScrollAnimations();

  // Initialize progress indicator
  initProgressIndicator();

  // Initialize step navigation
  initStepNavigation();
}

function renderSteps(container) {
  const phases = [...new Set(processSteps.map((s) => s.phase))];

  let html = '';

  phases.forEach((phase) => {
    const phaseSteps = processSteps.filter((s) => s.phase === phase);

    html += `
      <div class="process-phase" data-phase="${phase.toLowerCase()}">
        <div class="phase-header">
          <h3 class="phase-title">${phase}</h3>
          <span class="phase-count">${phaseSteps.length} steps</span>
        </div>
        <div class="phase-steps">
    `;

    phaseSteps.forEach((step) => {
      html += `
        <div class="process-step" data-step="${step.id}" x-data="{ expanded: false }">
          <div class="step-indicator">
            <div class="step-number">${step.id}</div>
            <div class="step-line"></div>
          </div>
          <div class="step-content">
            <button class="step-header" @click="expanded = !expanded" aria-expanded="false">
              <div class="step-icon">
                <i data-lucide="${step.icon}"></i>
              </div>
              <div class="step-info">
                <h4 class="step-title">${step.title}</h4>
                <p class="step-description">${step.description}</p>
              </div>
              <div class="step-toggle">
                <i data-lucide="chevron-down" :class="{ 'rotate-180': expanded }"></i>
              </div>
            </button>
            <div class="step-details" x-show="expanded" x-collapse>
              <ul class="step-details-list">
                ${step.details.map((d) => `<li><i data-lucide="check" class="w-4 h-4"></i> ${d}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function initScrollAnimations() {
  // Animate steps on scroll
  gsap.utils.toArray('.process-step').forEach((step, index) => {
    gsap.from(step, {
      opacity: 0,
      x: -30,
      duration: 0.6,
      delay: index * 0.05,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: step,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  // Animate step line growth
  gsap.utils.toArray('.step-line').forEach((line) => {
    gsap.from(line, {
      scaleY: 0,
      transformOrigin: 'top',
      duration: 0.4,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: line,
        start: 'top 80%',
      },
    });
  });
}

function initProgressIndicator() {
  const progressBar = document.getElementById('process-progress');
  if (!progressBar) return;

  ScrollTrigger.create({
    trigger: '#process-timeline',
    start: 'top center',
    end: 'bottom center',
    onUpdate: (self) => {
      const progress = Math.round(self.progress * 100);
      progressBar.style.width = `${progress}%`;
      progressBar.setAttribute('aria-valuenow', progress);

      // Update current step indicator
      const currentStep = Math.ceil(self.progress * 22) || 1;
      document.getElementById('current-step').textContent = currentStep;
    },
  });
}

function initStepNavigation() {
  // Phase navigation
  document.querySelectorAll('[data-goto-phase]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const phase = btn.dataset.gotoPhase;
      const target = document.querySelector(`[data-phase="${phase}"]`);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Step navigation
  document.querySelectorAll('[data-goto-step]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const stepNum = btn.dataset.gotoStep;
      const target = document.querySelector(`[data-step="${stepNum}"]`);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Expand the step
        target.querySelector('.step-header')?.click();
      }
    });
  });
}
```

### Process Page Section HTML

```html
<!-- Process Page Section -->
<section class="process-section section">
  <div class="container">
    <!-- Progress Bar -->
    <div class="process-progress-bar sticky top-20 z-10 bg-white py-4 mb-8 shadow-sm rounded-lg">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-medium">Step <span id="current-step">1</span> of 22</span>
        <div class="phase-nav flex gap-2">
          <button class="btn btn-sm btn-ghost" data-goto-phase="sourcing">Sourcing</button>
          <button class="btn btn-sm btn-ghost" data-goto-phase="testing">Testing</button>
          <button class="btn btn-sm btn-ghost" data-goto-phase="manufacturing">Manufacturing</button>
          <button class="btn btn-sm btn-ghost" data-goto-phase="verification">Verification</button>
        </div>
      </div>
      <div class="progress-track h-2 bg-neutral-200 rounded-full overflow-hidden">
        <div id="process-progress" class="progress-fill h-full bg-primary-600 rounded-full transition-all" style="width: 0%"></div>
      </div>
    </div>

    <!-- Timeline -->
    <div id="process-timeline" class="process-timeline">
      <!-- Steps rendered by JS -->
    </div>
  </div>
</section>
```

---

## 3. Life-Stage Quiz (`src/scripts/quiz.js`)

### Features
- Multi-step form wizard
- Progress indicator
- Conditional logic based on answers
- Animated transitions
- Personalized results with product recommendations

### Implementation

```javascript
// src/scripts/quiz.js
import gsap from 'gsap';

const quizQuestions = [
  {
    id: 'gender',
    type: 'single',
    question: 'What best describes you?',
    options: [
      { value: 'female', label: 'Female', icon: 'female' },
      { value: 'male', label: 'Male', icon: 'male' },
      { value: 'other', label: 'Prefer not to say', icon: 'user' },
    ],
  },
  {
    id: 'age',
    type: 'single',
    question: 'What is your age range?',
    options: [
      { value: '18-29', label: '18-29' },
      { value: '30-39', label: '30-39' },
      { value: '40-49', label: '40-49' },
      { value: '50-59', label: '50-59' },
      { value: '60+', label: '60+' },
    ],
  },
  {
    id: 'goals',
    type: 'multiple',
    question: 'What are your top health goals?',
    subtitle: 'Select up to 3',
    maxSelections: 3,
    options: [
      { value: 'energy', label: 'More Energy', icon: 'zap' },
      { value: 'stress', label: 'Stress Relief', icon: 'heart' },
      { value: 'sleep', label: 'Better Sleep', icon: 'moon' },
      { value: 'focus', label: 'Mental Clarity', icon: 'brain' },
      { value: 'immunity', label: 'Immune Support', icon: 'shield' },
      { value: 'digestion', label: 'Digestive Health', icon: 'activity' },
      { value: 'hormones', label: 'Hormone Balance', icon: 'sliders' },
      { value: 'fitness', label: 'Fitness & Recovery', icon: 'dumbbell' },
    ],
  },
  {
    id: 'concerns',
    type: 'multiple',
    question: 'Any specific health concerns?',
    subtitle: 'Select all that apply',
    options: [
      { value: 'anxiety', label: 'Anxiety/Worry' },
      { value: 'fatigue', label: 'Chronic Fatigue' },
      { value: 'joint', label: 'Joint Pain' },
      { value: 'skin', label: 'Skin Issues' },
      { value: 'weight', label: 'Weight Management' },
      { value: 'inflammation', label: 'Inflammation' },
      { value: 'none', label: 'None of the above' },
    ],
  },
  {
    id: 'diet',
    type: 'single',
    question: 'What describes your diet?',
    options: [
      { value: 'omnivore', label: 'Omnivore' },
      { value: 'vegetarian', label: 'Vegetarian' },
      { value: 'vegan', label: 'Vegan' },
      { value: 'pescatarian', label: 'Pescatarian' },
      { value: 'keto', label: 'Keto/Low-Carb' },
    ],
  },
  {
    id: 'supplements',
    type: 'single',
    question: 'How experienced are you with supplements?',
    options: [
      { value: 'new', label: "I'm new to supplements" },
      { value: 'some', label: 'I take a few supplements' },
      { value: 'regular', label: 'I take supplements regularly' },
      { value: 'ayurveda', label: "I'm familiar with Ayurveda" },
    ],
  },
];

export function initQuiz() {
  const quizContainer = document.getElementById('quiz-container');
  if (!quizContainer) return;

  return new Quiz(quizContainer);
}

class Quiz {
  constructor(container) {
    this.container = container;
    this.currentStep = 0;
    this.answers = {};
    this.init();
  }

  init() {
    this.render();
    this.bindEvents();
  }

  render() {
    this.container.innerHTML = `
      <div class="quiz-inner">
        <div class="quiz-progress mb-8">
          <div class="flex justify-between text-sm mb-2">
            <span>Question <span id="quiz-current">${this.currentStep + 1}</span> of ${quizQuestions.length}</span>
            <span id="quiz-percent">${Math.round(((this.currentStep + 1) / quizQuestions.length) * 100)}%</span>
          </div>
          <div class="progress-track h-2 bg-neutral-200 rounded-full overflow-hidden">
            <div id="quiz-progress-bar" class="progress-fill h-full bg-primary-600 rounded-full transition-all" style="width: ${((this.currentStep + 1) / quizQuestions.length) * 100}%"></div>
          </div>
        </div>

        <div id="quiz-questions" class="quiz-questions">
          ${this.renderQuestion(quizQuestions[this.currentStep])}
        </div>

        <div class="quiz-nav flex justify-between mt-8">
          <button id="quiz-prev" class="btn btn-ghost" ${this.currentStep === 0 ? 'disabled' : ''}>
            <i data-lucide="arrow-left"></i> Back
          </button>
          <button id="quiz-next" class="btn btn-primary" disabled>
            ${this.currentStep === quizQuestions.length - 1 ? 'See Results' : 'Next'} <i data-lucide="arrow-right"></i>
          </button>
        </div>
      </div>
    `;
  }

  renderQuestion(question) {
    const isMultiple = question.type === 'multiple';

    return `
      <div class="quiz-question" data-question="${question.id}">
        <h3 class="text-2xl font-semibold mb-2">${question.question}</h3>
        ${question.subtitle ? `<p class="text-muted mb-6">${question.subtitle}</p>` : '<div class="mb-6"></div>'}

        <div class="quiz-options grid ${question.options.length > 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2'} gap-3">
          ${question.options
            .map(
              (opt) => `
            <button class="quiz-option" data-value="${opt.value}" type="button">
              ${opt.icon ? `<i data-lucide="${opt.icon}" class="w-6 h-6 mb-2"></i>` : ''}
              <span>${opt.label}</span>
            </button>
          `
            )
            .join('')}
        </div>
      </div>
    `;
  }

  bindEvents() {
    // Option selection
    this.container.addEventListener('click', (e) => {
      const option = e.target.closest('.quiz-option');
      if (!option) return;

      const question = quizQuestions[this.currentStep];
      const value = option.dataset.value;

      if (question.type === 'multiple') {
        option.classList.toggle('selected');

        // Handle max selections
        const selected = this.container.querySelectorAll('.quiz-option.selected');
        if (question.maxSelections && selected.length > question.maxSelections) {
          option.classList.remove('selected');
          return;
        }

        // Store answers
        this.answers[question.id] = Array.from(selected).map((o) => o.dataset.value);
      } else {
        // Single selection
        this.container.querySelectorAll('.quiz-option').forEach((o) => o.classList.remove('selected'));
        option.classList.add('selected');
        this.answers[question.id] = value;
      }

      // Enable next button
      this.updateNavigation();
    });

    // Navigation
    this.container.querySelector('#quiz-prev')?.addEventListener('click', () => this.prevStep());
    this.container.querySelector('#quiz-next')?.addEventListener('click', () => this.nextStep());
  }

  updateNavigation() {
    const nextBtn = this.container.querySelector('#quiz-next');
    const question = quizQuestions[this.currentStep];
    const hasAnswer = this.answers[question.id] && (Array.isArray(this.answers[question.id]) ? this.answers[question.id].length > 0 : true);

    nextBtn.disabled = !hasAnswer;
  }

  nextStep() {
    if (this.currentStep < quizQuestions.length - 1) {
      this.currentStep++;
      this.animateTransition('next');
    } else {
      this.showResults();
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.animateTransition('prev');
    }
  }

  animateTransition(direction) {
    const questionsContainer = this.container.querySelector('#quiz-questions');
    const xOffset = direction === 'next' ? -50 : 50;

    gsap.to(questionsContainer, {
      opacity: 0,
      x: xOffset,
      duration: 0.2,
      onComplete: () => {
        questionsContainer.innerHTML = this.renderQuestion(quizQuestions[this.currentStep]);
        this.updateProgress();
        this.updateNavigation();

        gsap.fromTo(questionsContainer, { opacity: 0, x: -xOffset }, { opacity: 1, x: 0, duration: 0.3 });

        // Re-init icons
        if (window.lucide) {
          window.lucide.createIcons();
        }
      },
    });
  }

  updateProgress() {
    const progress = ((this.currentStep + 1) / quizQuestions.length) * 100;
    this.container.querySelector('#quiz-current').textContent = this.currentStep + 1;
    this.container.querySelector('#quiz-percent').textContent = `${Math.round(progress)}%`;
    this.container.querySelector('#quiz-progress-bar').style.width = `${progress}%`;

    const prevBtn = this.container.querySelector('#quiz-prev');
    const nextBtn = this.container.querySelector('#quiz-next');

    prevBtn.disabled = this.currentStep === 0;
    nextBtn.innerHTML = this.currentStep === quizQuestions.length - 1 ? 'See Results <i data-lucide="arrow-right"></i>' : 'Next <i data-lucide="arrow-right"></i>';
  }

  showResults() {
    const recommendations = this.calculateRecommendations();

    this.container.innerHTML = `
      <div class="quiz-results text-center">
        <div class="results-header mb-8">
          <i data-lucide="sparkles" class="w-12 h-12 text-accent-500 mx-auto mb-4"></i>
          <h2 class="text-3xl font-semibold mb-2">Your Personalized Plan</h2>
          <p class="text-muted">Based on your answers, we recommend:</p>
        </div>

        <div class="recommended-products grid md:grid-cols-3 gap-6 mb-8">
          ${recommendations.products
            .map(
              (product) => `
            <div class="product-card card card-elevated">
              <div class="card-image bg-secondary-100">
                <img src="${product.image}" alt="${product.name}">
              </div>
              <div class="card-body">
                <span class="badge badge-primary mb-2">${product.match}% Match</span>
                <h3 class="card-title">${product.name}</h3>
                <p class="text-sm text-muted mb-3">${product.benefit}</p>
                <p class="font-semibold mb-3">$${product.price}</p>
                <button class="btn btn-primary btn-sm w-full" onclick="addToCart('${product.id}')">
                  Add to Cart
                </button>
              </div>
            </div>
          `
            )
            .join('')}
        </div>

        <div class="results-actions flex justify-center gap-4">
          <button class="btn btn-secondary" onclick="window.quiz.restart()">
            Retake Quiz
          </button>
          <a href="/pages/collection.html" class="btn btn-primary">
            Shop All Products
          </a>
        </div>
      </div>
    `;

    // Re-init icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  calculateRecommendations() {
    // Logic to match answers to products
    const products = [];

    // Example matching logic
    if (this.answers.goals?.includes('stress')) {
      products.push({
        id: 'ashwagandha',
        name: 'Ashwagandha KSM-66',
        benefit: 'Adaptogenic stress support',
        price: 34.99,
        match: 95,
        image: '/images/products/ashwagandha.jpg',
      });
    }

    if (this.answers.goals?.includes('sleep')) {
      products.push({
        id: 'sleep-formula',
        name: 'Deep Sleep Formula',
        benefit: 'Natural sleep support',
        price: 29.99,
        match: 90,
        image: '/images/products/sleep.jpg',
      });
    }

    if (this.answers.goals?.includes('energy')) {
      products.push({
        id: 'energy-boost',
        name: 'Daily Energy Complex',
        benefit: 'Sustained natural energy',
        price: 39.99,
        match: 88,
        image: '/images/products/energy.jpg',
      });
    }

    // Ensure we have at least 3 products
    while (products.length < 3) {
      products.push({
        id: 'daily-essential',
        name: 'Daily Essentials',
        benefit: 'Complete daily wellness',
        price: 44.99,
        match: 85,
        image: '/images/products/essentials.jpg',
      });
    }

    return { products: products.slice(0, 3) };
  }

  restart() {
    this.currentStep = 0;
    this.answers = {};
    this.render();
    this.bindEvents();
  }
}

// Global reference for restart
window.quiz = null;

export function openQuizModal() {
  const modal = document.getElementById('quiz-modal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  if (!window.quiz) {
    window.quiz = initQuiz();
  }
}

export function closeQuizModal() {
  const modal = document.getElementById('quiz-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}
```

### Quiz Modal HTML

```html
<!-- Quiz Modal -->
<div id="quiz-modal" class="modal-backdrop">
  <div class="modal" style="max-width: 700px;">
    <div class="modal-header">
      <h2 class="text-lg font-semibold">Find Your Perfect Supplements</h2>
      <button class="btn btn-icon" onclick="closeQuizModal()">
        <i data-lucide="x"></i>
      </button>
    </div>
    <div class="modal-body">
      <div id="quiz-container"></div>
    </div>
  </div>
</div>
```

---

## 4. Product Filters (`src/scripts/filters.js`)

```javascript
// src/scripts/filters.js

export function initFilters() {
  const filterContainer = document.querySelector('.collection-filters');
  const productGrid = document.getElementById('product-grid');
  const productCount = document.getElementById('product-count');

  if (!filterContainer || !productGrid) return;

  // Load products from JSON
  let products = [];

  fetch('/data/products.json')
    .then((res) => res.json())
    .then((data) => {
      products = data;
      renderProducts(products);
      initFilterEvents();
    });

  function initFilterEvents() {
    // Checkbox filters
    filterContainer.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.addEventListener('change', applyFilters);
    });

    // Sort select
    document.querySelector('.collection-toolbar select')?.addEventListener('change', applyFilters);
  }

  function applyFilters() {
    // Gather active filters
    const activeFilters = {
      stage: [],
      concern: [],
      format: [],
    };

    filterContainer.querySelectorAll('input[type="checkbox"]:checked').forEach((checkbox) => {
      const group = checkbox.closest('.filter-group');
      const groupName = group.querySelector('h4').textContent.toLowerCase().replace("'", '').replace(' ', '_');

      if (groupName.includes('life')) activeFilters.stage.push(checkbox.value);
      if (groupName.includes('health')) activeFilters.concern.push(checkbox.value);
      if (groupName.includes('format')) activeFilters.format.push(checkbox.value);
    });

    // Filter products
    let filtered = products.filter((product) => {
      const stageMatch = activeFilters.stage.length === 0 || activeFilters.stage.some((s) => product.lifeStages.includes(s));
      const concernMatch = activeFilters.concern.length === 0 || activeFilters.concern.some((c) => product.concerns.includes(c));
      const formatMatch = activeFilters.format.length === 0 || activeFilters.format.includes(product.format);

      return stageMatch && concernMatch && formatMatch;
    });

    // Sort
    const sortValue = document.querySelector('.collection-toolbar select')?.value || '';
    if (sortValue.includes('Low to High')) {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortValue.includes('High to Low')) {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortValue.includes('Newest')) {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    // Update URL
    updateURL(activeFilters);

    // Render
    renderProducts(filtered);
  }

  function renderProducts(productsToRender) {
    productCount.textContent = productsToRender.length;

    if (productsToRender.length === 0) {
      productGrid.innerHTML = `
        <div class="col-span-full text-center py-12">
          <i data-lucide="search-x" class="w-12 h-12 text-neutral-300 mx-auto mb-4"></i>
          <h3 class="text-lg font-semibold mb-2">No products found</h3>
          <p class="text-muted">Try adjusting your filters</p>
        </div>
      `;
      return;
    }

    productGrid.innerHTML = productsToRender
      .map(
        (product) => `
      <article class="product-card card card-elevated">
        <a href="/pages/product.html?id=${product.id}">
          <div class="product-card-image">
            <img src="${product.image}" alt="${product.title}" loading="lazy">
            ${product.badges?.map((b) => `<span class="badge badge-${b.type} absolute top-3 left-3">${b.label}</span>`).join('') || ''}
          </div>
          <div class="card-body">
            <p class="text-xs text-muted uppercase tracking-wider mb-1">${product.category}</p>
            <h3 class="card-title">${product.title}</h3>
            <p class="text-sm text-muted mb-3">${product.tagline}</p>
            <p class="font-semibold">$${product.price}</p>
          </div>
        </a>
      </article>
    `
      )
      .join('');

    // Re-init icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function updateURL(filters) {
    const params = new URLSearchParams();

    if (filters.stage.length) params.set('stage', filters.stage.join(','));
    if (filters.concern.length) params.set('concern', filters.concern.join(','));
    if (filters.format.length) params.set('format', filters.format.join(','));

    const newURL = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState({}, '', newURL);
  }

  // Check URL for initial filters
  function applyURLFilters() {
    const params = new URLSearchParams(window.location.search);

    ['stage', 'concern', 'format'].forEach((key) => {
      const values = params.get(key)?.split(',') || [];
      values.forEach((value) => {
        const checkbox = filterContainer.querySelector(`input[value="${value}"]`);
        if (checkbox) checkbox.checked = true;
      });
    });

    if (params.toString()) {
      applyFilters();
    }
  }

  applyURLFilters();
}
```

---

## 5. Tabs Component (`src/scripts/tabs.js`)

```javascript
// src/scripts/tabs.js

export function initProductTabs() {
  document.querySelectorAll('[data-tabs]').forEach((tabContainer) => {
    const tabs = tabContainer.querySelectorAll('[role="tab"]');
    const panels = tabContainer.querySelectorAll('[role="tabpanel"]');

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        // Deactivate all
        tabs.forEach((t) => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        panels.forEach((p) => {
          p.hidden = true;
        });

        // Activate clicked
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        const panelId = tab.getAttribute('aria-controls');
        const panel = document.getElementById(panelId);
        if (panel) {
          panel.hidden = false;
        }
      });

      // Keyboard navigation
      tab.addEventListener('keydown', (e) => {
        const tabList = Array.from(tabs);
        const currentIndex = tabList.indexOf(tab);
        let newIndex;

        if (e.key === 'ArrowRight') {
          newIndex = currentIndex === tabList.length - 1 ? 0 : currentIndex + 1;
        } else if (e.key === 'ArrowLeft') {
          newIndex = currentIndex === 0 ? tabList.length - 1 : currentIndex - 1;
        } else {
          return;
        }

        e.preventDefault();
        tabList[newIndex].focus();
        tabList[newIndex].click();
      });
    });
  });
}
```

---

## Deliverables Checklist

- [ ] `src/scripts/map.js` - India ingredient map with Leaflet
- [ ] `src/scripts/process.js` - 22-step process infographic
- [ ] `src/scripts/quiz.js` - Life-stage quiz with recommendations
- [ ] `src/scripts/filters.js` - Product collection filters
- [ ] `src/scripts/tabs.js` - Accessible tabs component
- [ ] All interactive features work on mobile
- [ ] All features accessible via keyboard
- [ ] ARIA attributes properly applied
- [ ] Smooth animations (60fps)
- [ ] State persisted in URL where appropriate

---

## Testing Checklist

- [ ] Map markers clickable and show details
- [ ] Map video overlays play correctly
- [ ] Process steps expand/collapse
- [ ] Process scroll animations trigger correctly
- [ ] Quiz progresses through all questions
- [ ] Quiz shows personalized results
- [ ] Collection filters update products
- [ ] Filter state preserved in URL
- [ ] Tabs accessible via keyboard
- [ ] All features work without JavaScript (graceful degradation)
