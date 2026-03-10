/**
 * Smooth Scroll with Lenis
 * Silky smooth scrolling experience
 */

import Lenis from 'lenis';

let lenisInstance = null;

/**
 * Initialize Lenis smooth scroll
 * @param {Object} options - Configuration options
 * @returns {Lenis} Lenis instance
 */
export function initSmoothScroll(options = {}) {
  const {
    lerp = 0.1,
    duration = 1.2,
    smoothWheel = true,
    wheelMultiplier = 1,
    touchMultiplier = 2,
    infinite = false
  } = options;

  // Destroy existing instance if any
  if (lenisInstance) {
    lenisInstance.destroy();
  }

  // Create new Lenis instance
  lenisInstance = new Lenis({
    lerp,
    duration,
    smoothWheel,
    wheelMultiplier,
    touchMultiplier,
    infinite,
    orientation: 'vertical',
    gestureOrientation: 'vertical'
  });

  // Animation frame loop
  function raf(time) {
    lenisInstance.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Integrate with GSAP ScrollTrigger if available
  if (typeof ScrollTrigger !== 'undefined') {
    lenisInstance.on('scroll', ScrollTrigger.update);
  }

  return lenisInstance;
}

/**
 * Scroll to a specific element or position
 * @param {string|number|HTMLElement} target - Target element, selector, or position
 * @param {Object} options - Scroll options
 */
export function scrollTo(target, options = {}) {
  if (!lenisInstance) {
    initSmoothScroll();
  }

  const {
    offset = 0,
    duration = 1.2,
    immediate = false,
    onComplete = null
  } = options;

  lenisInstance.scrollTo(target, {
    offset,
    duration: immediate ? 0 : duration,
    onComplete
  });
}

/**
 * Stop smooth scroll (useful for modals)
 */
export function stopScroll() {
  if (lenisInstance) {
    lenisInstance.stop();
  }
}

/**
 * Resume smooth scroll
 */
export function startScroll() {
  if (lenisInstance) {
    lenisInstance.start();
  }
}

/**
 * Get current scroll position
 * @returns {number} Current scroll position
 */
export function getScrollPosition() {
  return lenisInstance ? lenisInstance.scroll : window.scrollY;
}

/**
 * Initialize anchor link smooth scrolling
 */
export function initAnchorLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();

        // Get header height for offset
        const header = document.querySelector('.site-header');
        const headerHeight = header ? header.offsetHeight : 0;

        scrollTo(target, {
          offset: -headerHeight - 20
        });

        // Update URL without jumping
        history.pushState(null, '', href);
      }
    });
  });
}

/**
 * Scroll to top
 * @param {number} duration - Animation duration
 */
export function scrollToTop(duration = 1.2) {
  scrollTo(0, { duration });
}

/**
 * Initialize back-to-top button
 * @param {string} buttonSelector - Selector for button
 * @param {number} showAfter - Show button after scrolling this many pixels
 */
export function initBackToTop(buttonSelector = '.back-to-top', showAfter = 300) {
  const button = document.querySelector(buttonSelector);
  if (!button) return;

  // Show/hide based on scroll position
  if (lenisInstance) {
    lenisInstance.on('scroll', ({ scroll }) => {
      button.classList.toggle('visible', scroll > showAfter);
    });
  } else {
    window.addEventListener('scroll', () => {
      button.classList.toggle('visible', window.scrollY > showAfter);
    });
  }

  // Click handler
  button.addEventListener('click', () => scrollToTop());
}

/**
 * Get Lenis instance
 * @returns {Lenis|null} Current Lenis instance
 */
export function getLenis() {
  return lenisInstance;
}

/**
 * Destroy Lenis instance
 */
export function destroySmoothScroll() {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}

export default {
  init: initSmoothScroll,
  scrollTo,
  stop: stopScroll,
  start: startScroll,
  getPosition: getScrollPosition,
  initAnchorLinks,
  scrollToTop,
  initBackToTop,
  getInstance: getLenis,
  destroy: destroySmoothScroll
};
