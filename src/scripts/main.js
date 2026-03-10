/**
 * Vitabae Website - Main Entry Point
 * ===================================
 * Initializes all core functionality:
 * - Alpine.js for reactivity
 * - Lenis for smooth scrolling
 * - GSAP for animations
 * - Lucide icons
 * - Interactive features
 */

// Alpine.js
import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';

// Smooth scroll
import Lenis from 'lenis';

// Animation library
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Icons
import { createIcons, icons } from 'lucide';

// Internal modules
import { initAnimations, initNavAnimations, refreshAnimations } from './animations.js';
import { initAnchorLinks, scrollTo } from './smooth-scroll.js';
import { initTabs, initAccordion, initScrollReveal } from './tabs.js';
import { initCollectionFilters, initAlphabetNav } from './filters.js';
import { initProcessTimeline, initCounters } from './process.js';
import { initQuiz } from './quiz.js';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize Alpine plugins
Alpine.plugin(collapse);

// Make Alpine available globally
window.Alpine = Alpine;

// Initialize Lenis smooth scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
});

// Connect Lenis to GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Make lenis available globally for other modules
window.lenis = lenis;

// Stop Lenis when modal opens
window.stopScroll = () => lenis.stop();
window.startScroll = () => lenis.start();

/**
 * Initialize page-specific features
 */
function initPageFeatures() {
  const page = document.body.dataset.page || getPageFromPath();

  switch (page) {
    case 'home':
      initHomeFeatures();
      break;
    case 'collection':
      initCollectionFeatures();
      break;
    case 'product':
      initProductFeatures();
      break;
    case 'process':
      initProcessFeatures();
      break;
    case 'research':
      initResearchFeatures();
      break;
    default:
      // Common features for all pages
      break;
  }
}

/**
 * Get page name from URL path
 */
function getPageFromPath() {
  const path = window.location.pathname;
  if (path.includes('collection')) return 'collection';
  if (path.includes('product')) return 'product';
  if (path.includes('process')) return 'process';
  if (path.includes('research')) return 'research';
  if (path.includes('science')) return 'science';
  if (path.includes('story')) return 'story';
  if (path === '/' || path.includes('index')) return 'home';
  return 'default';
}

/**
 * Home page features
 */
function initHomeFeatures() {
  // Initialize quiz if container exists
  const quizContainer = document.getElementById('quiz-container');
  if (quizContainer) {
    initQuiz('quiz-container');
  }

  // Initialize map if container exists
  const mapContainer = document.getElementById('ingredient-map');
  if (mapContainer) {
    // Dynamically import map module (Leaflet is heavy)
    import('./map.js').then(({ initIngredientMap }) => {
      initIngredientMap('ingredient-map', (region) => {
        // Handle region selection
        console.log('Selected region:', region);
      });
    }).catch(err => {
      console.warn('Map module not loaded:', err);
    });
  }

  // Life stage cards hover effect
  document.querySelectorAll('.life-stage-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { y: -8, duration: 0.3, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' });
    });
  });
}

/**
 * Collection page features
 */
function initCollectionFeatures() {
  initCollectionFilters({
    productsSelector: '.product-card',
    filterSelector: '[data-filter]',
    searchSelector: '#product-search',
    sortSelector: '#product-sort'
  });
}

/**
 * Product page features
 */
function initProductFeatures() {
  // Initialize product tabs
  const tabsContainer = document.getElementById('product-tabs');
  if (tabsContainer) {
    initTabs('product-tabs');
  }

  // Initialize FAQ accordion
  const faqContainer = document.getElementById('product-faq');
  if (faqContainer) {
    initAccordion('product-faq', { allowMultiple: false });
  }

  // Product image gallery
  const thumbnails = document.querySelectorAll('.product-thumbnail');
  const mainImage = document.querySelector('.product-main-image img');

  if (thumbnails.length && mainImage) {
    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const newSrc = thumb.dataset.src || thumb.querySelector('img')?.src;
        if (newSrc) {
          gsap.to(mainImage, {
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
              mainImage.src = newSrc;
              gsap.to(mainImage, { opacity: 1, duration: 0.2 });
            }
          });

          thumbnails.forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');
        }
      });
    });
  }

  // Quantity selector
  const qtyInput = document.querySelector('.quantity-input');
  const qtyMinus = document.querySelector('.qty-minus');
  const qtyPlus = document.querySelector('.qty-plus');

  if (qtyInput && qtyMinus && qtyPlus) {
    qtyMinus.addEventListener('click', () => {
      const val = parseInt(qtyInput.value) || 1;
      if (val > 1) qtyInput.value = val - 1;
    });

    qtyPlus.addEventListener('click', () => {
      const val = parseInt(qtyInput.value) || 1;
      const max = parseInt(qtyInput.max) || 99;
      if (val < max) qtyInput.value = val + 1;
    });
  }
}

/**
 * Process page features
 */
function initProcessFeatures() {
  const processContainer = document.getElementById('process-timeline');
  if (processContainer) {
    initProcessTimeline('process-timeline');
  }

  // Initialize counters
  initCounters('.stat-number');
}

/**
 * Research page features
 */
function initResearchFeatures() {
  // Initialize alphabet navigation
  const alphabetNav = document.querySelector('.alphabet-nav');
  const researchItems = document.querySelectorAll('.research-card');

  if (alphabetNav && researchItems.length) {
    initAlphabetNav('.alphabet-nav', '.research-card');
  }

  // Search functionality
  const searchInput = document.getElementById('research-search');
  if (searchInput) {
    let debounce;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        const query = e.target.value.toLowerCase();
        researchItems.forEach(item => {
          const text = item.textContent.toLowerCase();
          const matches = text.includes(query);
          item.style.display = matches ? '' : 'none';
        });
      }, 300);
    });
  }

  // Category filters
  const categoryFilters = document.querySelectorAll('.research-category-btn');
  categoryFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;

      categoryFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      researchItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Initialize header functionality
 */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  // Mobile menu toggle is handled by Alpine.js

  // Scroll behavior
  let lastScroll = 0;
  const scrollThreshold = 50;

  lenis.on('scroll', ({ scroll }) => {
    // Add/remove scrolled class
    header.classList.toggle('scrolled', scroll > scrollThreshold);

    // Optional: hide/show on scroll direction
    // const direction = scroll > lastScroll ? 'down' : 'up';
    // header.classList.toggle('hidden', direction === 'down' && scroll > 200);

    lastScroll = scroll;
  });
}

/**
 * Initialize common features
 */
function initCommonFeatures() {
  // Scroll reveal animations
  initScrollReveal('[data-reveal]');

  // Anchor link smooth scrolling
  initAnchorLinks();

  // Back to top button
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    lenis.on('scroll', ({ scroll }) => {
      backToTop.classList.toggle('visible', scroll > 500);
    });

    backToTop.addEventListener('click', () => {
      scrollTo(0, { duration: 1.2 });
    });
  }

  // External links - open in new tab
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.href.includes(window.location.hostname)) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

  // Form validation styling
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      const invalidInputs = form.querySelectorAll(':invalid');
      invalidInputs.forEach(input => {
        input.classList.add('error');
      });

      if (invalidInputs.length > 0) {
        e.preventDefault();
        invalidInputs[0].focus();
      }
    });
  });
}

/**
 * Main initialization
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  createIcons({ icons });

  // Initialize header
  initHeader();

  // Initialize GSAP animations
  initAnimations();
  initNavAnimations();

  // Initialize common features
  initCommonFeatures();

  // Initialize page-specific features
  initPageFeatures();

  // Start Alpine
  Alpine.start();

  // Refresh animations after images load
  window.addEventListener('load', () => {
    refreshAnimations();
  });

  console.log('Vitabae website initialized');
});

// Handle page transitions (if using)
window.addEventListener('beforeunload', () => {
  lenis.destroy();
});

// Export for use in other modules
export { lenis, gsap, ScrollTrigger, Alpine };
