# UI Packages Agent

## Role
Research, select, install, and configure modern UI packages for the Vitabae website. Ensure all packages are Shopify-compatible and production-ready.

---

## Responsibilities

1. **Initialize project** - Set up npm project with correct structure
2. **Install dependencies** - Add all required packages
3. **Configure build tools** - Set up Vite for multi-page development
4. **Create folder structure** - Establish organized project architecture
5. **Document usage** - Provide examples for each package

---

## Package List

### Core Build Tool
```bash
npm create vite@latest . -- --template vanilla
```

### Animation & Scroll
```bash
npm install gsap @studio-freight/lenis
```
- **GSAP** - Premium animation library for scroll triggers, timelines, morphing
- **Lenis** - Buttery smooth scroll with native-like feel

### UI Components
```bash
npm install swiper alpinejs lucide
```
- **Swiper** - Touch-enabled carousels and sliders
- **Alpine.js** - Lightweight reactivity (Shopify-compatible, no build step needed)
- **Lucide** - Beautiful open-source icons

### Map
```bash
npm install leaflet
```
- **Leaflet** - Interactive maps with custom markers and overlays

### Development
```bash
npm install -D vite-plugin-html sass
```

---

## Full Install Command

```bash
# Initialize and install all at once
npm init -y
npm install gsap @studio-freight/lenis swiper alpinejs lucide leaflet
npm install -D vite vite-plugin-html sass
```

---

## Vite Configuration

Create `vite.config.js`:

```javascript
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/pages/index.html'),
        collection: resolve(__dirname, 'src/pages/collection.html'),
        product: resolve(__dirname, 'src/pages/product.html'),
        process: resolve(__dirname, 'src/pages/process.html'),
        science: resolve(__dirname, 'src/pages/science.html'),
        story: resolve(__dirname, 'src/pages/story.html'),
        research: resolve(__dirname, 'src/pages/research.html'),
      },
    },
  },
  server: {
    port: 5173,
    open: '/pages/index.html',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@styles': resolve(__dirname, 'src/styles'),
      '@scripts': resolve(__dirname, 'src/scripts'),
      '@components': resolve(__dirname, 'src/components'),
    },
  },
});
```

---

## Package.json Scripts

```json
{
  "name": "vitabae-website",
  "version": "1.0.0",
  "description": "Vitabae premium supplement website mockup",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src/**/*.js"
  }
}
```

---

## Folder Structure Creation

```bash
# Create all directories
mkdir -p src/styles
mkdir -p src/scripts
mkdir -p src/components
mkdir -p src/sections
mkdir -p src/pages
mkdir -p public/images
mkdir -p public/videos
mkdir -p public/fonts
mkdir -p data
mkdir -p content
```

---

## Package Usage Examples

### GSAP - Scroll Animations
```javascript
// src/scripts/animations.js
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Fade in on scroll
export function initScrollAnimations() {
  gsap.utils.toArray('[data-animate="fade-up"]').forEach(el => {
    gsap.from(el, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  });
}

// Stagger children
export function staggerCards(container) {
  gsap.from(container.children, {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: container,
      start: 'top 80%'
    }
  });
}
```

### Lenis - Smooth Scroll
```javascript
// src/scripts/smooth-scroll.js
import Lenis from '@studio-freight/lenis';

export function initSmoothScroll() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Connect to GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  return lenis;
}
```

### Alpine.js - Lightweight Reactivity
```html
<!-- Include via CDN for Shopify compatibility -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

<!-- Or import in JS -->
<script type="module">
  import Alpine from 'alpinejs';
  window.Alpine = Alpine;
  Alpine.start();
</script>

<!-- Usage example - Tabs -->
<div x-data="{ activeTab: 'benefits' }">
  <button @click="activeTab = 'benefits'" :class="{ 'active': activeTab === 'benefits' }">
    Benefits
  </button>
  <button @click="activeTab = 'ingredients'" :class="{ 'active': activeTab === 'ingredients' }">
    Ingredients
  </button>

  <div x-show="activeTab === 'benefits'">Benefits content...</div>
  <div x-show="activeTab === 'ingredients'">Ingredients content...</div>
</div>
```

### Swiper - Carousels
```javascript
// src/scripts/carousels.js
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function initProductCarousel() {
  return new Swiper('.product-carousel', {
    modules: [Navigation, Pagination, Autoplay],
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
      1280: { slidesPerView: 4 },
    },
  });
}
```

### Leaflet - India Map
```javascript
// src/scripts/map.js
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export function initIngredientMap() {
  const map = L.map('india-map', {
    center: [20.5937, 78.9629], // Center of India
    zoom: 5,
    zoomControl: false,
    scrollWheelZoom: false,
  });

  // Custom tile layer (or use image overlay)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

  // Add ingredient markers
  const ingredients = [
    { name: 'Ashwagandha', lat: 26.8, lng: 75.8, region: 'Rajasthan' },
    { name: 'Turmeric', lat: 15.3, lng: 75.7, region: 'Karnataka' },
    { name: 'Tulsi', lat: 26.9, lng: 80.9, region: 'Uttar Pradesh' },
  ];

  ingredients.forEach(ing => {
    const marker = L.marker([ing.lat, ing.lng])
      .addTo(map)
      .bindPopup(`<strong>${ing.name}</strong><br>${ing.region}`);
  });

  return map;
}
```

### Lucide - Icons
```javascript
// src/scripts/icons.js
import { createIcons, Leaf, Shield, Award, FlaskConical, ChevronRight } from 'lucide';

export function initIcons() {
  createIcons({
    icons: {
      Leaf,
      Shield,
      Award,
      FlaskConical,
      ChevronRight,
    },
  });
}

// Usage in HTML:
// <i data-lucide="leaf"></i>
// <i data-lucide="shield"></i>
```

---

## Entry Point Setup

Create `src/scripts/main.js`:

```javascript
// Main entry point
import { initSmoothScroll } from './smooth-scroll.js';
import { initScrollAnimations, staggerCards } from './animations.js';
import { initIcons } from './icons.js';

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Core
  initSmoothScroll();
  initIcons();

  // Animations
  initScrollAnimations();

  // Page-specific initializations
  const page = document.body.dataset.page;

  if (page === 'home') {
    import('./map.js').then(m => m.initIngredientMap());
  }

  if (page === 'collection') {
    import('./filters.js').then(m => m.initFilters());
  }

  if (page === 'product') {
    import('./tabs.js').then(m => m.initProductTabs());
  }

  if (page === 'process') {
    import('./process.js').then(m => m.initProcessSteps());
  }
});
```

---

## Deliverables Checklist

- [ ] `package.json` with all dependencies listed
- [ ] `vite.config.js` with multi-page setup
- [ ] `src/scripts/main.js` entry point
- [ ] `src/scripts/smooth-scroll.js` Lenis setup
- [ ] `src/scripts/animations.js` GSAP utilities
- [ ] `src/scripts/icons.js` Lucide setup
- [ ] All folders created per structure
- [ ] `npm run dev` works
- [ ] `npm run build` produces dist folder

---

## Shopify Compatibility Notes

- Alpine.js can be loaded via CDN in theme.liquid (no build step)
- GSAP and Lenis can be loaded via CDN or bundled
- Swiper available via CDN
- Leaflet available via CDN
- All packages work without Node.js in production
- Structure scripts to work with Shopify's asset pipeline
