/**
 * GSAP Animations - Enhanced Edition
 * Shopify Editions-inspired scroll effects
 * ==========================================
 * - Parallax backgrounds & images
 * - Horizontal scroll sections
 * - Sticky transformations
 * - Text reveal animations
 * - Scroll progress indicators
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Initialize all page animations
 */
export function initAnimations() {
  initHeroAnimations();
  initScrollAnimations();
  initCardAnimations();
  initTextAnimations();
  initParallax();
  initHorizontalScroll();
  initStickyTransforms();
  initImageReveals();
  initScrollProgress();
  initMagneticElements();
  initSectionReveals();
}

/**
 * Hero section animations with enhanced parallax
 */
export function initHeroAnimations() {
  const heroes = document.querySelectorAll('.hero-modern, .page-hero, .hero-section');

  heroes.forEach(hero => {
    const title = hero.querySelector('h1, .display-xl, .display-lg');
    const subtitle = hero.querySelector('.hero-subtitle, .lead, p');
    const eyebrow = hero.querySelector('.hero-eyebrow, .text-overline');
    const buttons = hero.querySelectorAll('.btn-modern, .btn');
    const video = hero.querySelector('video');
    const scrollIndicator = hero.querySelector('.hero-scroll-indicator');

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Eyebrow
    if (eyebrow) {
      tl.fromTo(eyebrow,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      );
    }

    // Title with character split effect
    if (title) {
      tl.fromTo(title,
        { opacity: 0, y: 60, clipPath: 'inset(100% 0 0 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 1.2 },
        eyebrow ? '-=0.3' : 0
      );
    }

    // Subtitle
    if (subtitle) {
      tl.fromTo(subtitle,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.6'
      );
    }

    // Buttons
    if (buttons.length) {
      tl.fromTo(buttons,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
        '-=0.4'
      );
    }

    // Scroll indicator
    if (scrollIndicator) {
      tl.fromTo(scrollIndicator,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        '-=0.2'
      );
    }

    // Hero video parallax on scroll
    if (video) {
      gsap.to(video, {
        yPercent: 30,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5
        }
      });
    }

    // Fade out hero content on scroll
    const heroContent = hero.querySelector('.hero-content');
    if (heroContent) {
      gsap.to(heroContent, {
        opacity: 0,
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: '50% top',
          scrub: true
        }
      });
    }
  });
}

/**
 * Enhanced scroll-triggered animations
 */
export function initScrollAnimations() {
  // Fade up animations
  gsap.utils.toArray('[data-animate="fade-up"]').forEach(element => {
    gsap.fromTo(element,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Reveal class elements
  gsap.utils.toArray('.reveal').forEach(element => {
    gsap.fromTo(element,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Stagger reveal
  gsap.utils.toArray('.reveal-stagger').forEach(container => {
    const children = container.children;
    gsap.fromTo(children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Slide animations
  gsap.utils.toArray('[data-animate="slide-left"]').forEach(element => {
    gsap.fromTo(element,
      { opacity: 0, x: -80 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  gsap.utils.toArray('[data-animate="slide-right"]').forEach(element => {
    gsap.fromTo(element,
      { opacity: 0, x: 80 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Scale reveal
  gsap.utils.toArray('[data-animate="scale-up"]').forEach(element => {
    gsap.fromTo(element,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Rotate in
  gsap.utils.toArray('[data-animate="rotate-in"]').forEach(element => {
    gsap.fromTo(element,
      { opacity: 0, rotation: -10, y: 30 },
      {
        opacity: 1,
        rotation: 0,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

/**
 * Card animations with enhanced hover effects
 */
export function initCardAnimations() {
  // Life stage cards
  gsap.utils.toArray('.life-stage-modern').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 60, rotateX: 10 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card.parentElement,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Enhanced hover
    const image = card.querySelector('img');
    const content = card.querySelector('.life-stage-modern-content');

    card.addEventListener('mouseenter', () => {
      gsap.to(card, { y: -10, duration: 0.4, ease: 'power2.out' });
      if (image) gsap.to(image, { scale: 1.1, duration: 0.6, ease: 'power2.out' });
      if (content) gsap.to(content, { y: -5, duration: 0.4, ease: 'power2.out' });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, { y: 0, duration: 0.4, ease: 'power2.out' });
      if (image) gsap.to(image, { scale: 1, duration: 0.6, ease: 'power2.out' });
      if (content) gsap.to(content, { y: 0, duration: 0.4, ease: 'power2.out' });
    });
  });

  // Product cards
  gsap.utils.toArray('.product-modern').forEach(card => {
    const image = card.querySelector('img');

    card.addEventListener('mouseenter', () => {
      gsap.to(card, { y: -8, duration: 0.3, ease: 'power2.out' });
      if (image) gsap.to(image, { scale: 1.08, duration: 0.5, ease: 'power2.out' });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' });
      if (image) gsap.to(image, { scale: 1, duration: 0.5, ease: 'power2.out' });
    });
  });

  // Trust badges
  gsap.utils.toArray('.trust-modern-item').forEach((item, i) => {
    gsap.fromTo(item,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item.parentElement,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

/**
 * Advanced text animations
 */
export function initTextAnimations() {
  // Split headline animation
  gsap.utils.toArray('[data-animate="split-text"]').forEach(element => {
    const text = element.textContent;
    const words = text.split(' ');

    element.innerHTML = words.map(word =>
      `<span class="word" style="display: inline-block; overflow: hidden;"><span class="word-inner" style="display: inline-block;">${word}</span></span>`
    ).join(' ');

    const wordInners = element.querySelectorAll('.word-inner');

    gsap.fromTo(wordInners,
      { y: '110%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration: 0.8,
        stagger: 0.04,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Character by character animation
  gsap.utils.toArray('[data-animate="chars"]').forEach(element => {
    const text = element.textContent;
    element.innerHTML = text.split('').map(char =>
      char === ' ' ? ' ' : `<span class="char" style="display: inline-block;">${char}</span>`
    ).join('');

    const chars = element.querySelectorAll('.char');

    gsap.fromTo(chars,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.02,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Line reveal
  gsap.utils.toArray('[data-animate="line-reveal"]').forEach(element => {
    gsap.fromTo(element,
      { clipPath: 'inset(0 100% 0 0)' },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Counter animations
  gsap.utils.toArray('.stat-modern-number, [data-count]').forEach(counter => {
    const target = parseInt(counter.dataset.count || counter.textContent);
    const suffix = counter.textContent.includes('%') ? '%' : '';

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 85%',
      onEnter: () => {
        gsap.fromTo(counter,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            onUpdate: function() {
              counter.textContent = Math.round(gsap.getProperty(counter, 'textContent')) + suffix;
            }
          }
        );
      },
      once: true
    });
  });
}

/**
 * Enhanced parallax effects
 */
export function initParallax() {
  // Section backgrounds
  gsap.utils.toArray('.section-split-media img, .section-split-media video').forEach(media => {
    gsap.to(media, {
      yPercent: -15,
      ease: 'none',
      scrollTrigger: {
        trigger: media.closest('section'),
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
  });

  // Video sections
  gsap.utils.toArray('.video-section video').forEach(video => {
    gsap.to(video, {
      yPercent: 20,
      scale: 1.15,
      ease: 'none',
      scrollTrigger: {
        trigger: video.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      }
    });
  });

  // Generic parallax
  gsap.utils.toArray('[data-parallax]').forEach(element => {
    const speed = parseFloat(element.dataset.parallax) || 0.2;
    gsap.to(element, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: element.closest('section') || element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });

  // Background parallax
  gsap.utils.toArray('[data-speed]').forEach(element => {
    const speed = parseFloat(element.dataset.speed);
    gsap.to(element, {
      y: () => (1 - speed) * ScrollTrigger.maxScroll(window) * 0.1,
      ease: 'none',
      scrollTrigger: {
        start: 0,
        end: 'max',
        scrub: true,
        invalidateOnRefresh: true
      }
    });
  });
}

/**
 * Horizontal scroll sections
 */
export function initHorizontalScroll() {
  gsap.utils.toArray('.horizontal-scroll').forEach(section => {
    const container = section.querySelector('.horizontal-scroll-container');
    if (!container) return;

    const items = container.children;
    const totalWidth = container.scrollWidth - window.innerWidth;

    gsap.to(container, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    // Animate items as they enter viewport
    gsap.utils.toArray(items).forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0.3, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: item,
            containerAnimation: gsap.getTweensOf(container)[0],
            start: 'left 80%',
            end: 'left 20%',
            scrub: true
          }
        }
      );
    });
  });
}

/**
 * Sticky section transformations
 */
export function initStickyTransforms() {
  // Sticky progress sections
  gsap.utils.toArray('.sticky-progress').forEach(section => {
    const steps = section.querySelectorAll('.progress-step');
    const progressBar = section.querySelector('.progress-bar-fill');

    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      pin: section.querySelector('.sticky-content'),
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        if (progressBar) {
          gsap.to(progressBar, { scaleX: progress, duration: 0.1 });
        }

        steps.forEach((step, i) => {
          const stepProgress = (i + 1) / steps.length;
          if (progress >= stepProgress - 0.1) {
            step.classList.add('active');
          } else {
            step.classList.remove('active');
          }
        });
      }
    });
  });

  // Image reveal on scroll
  gsap.utils.toArray('.sticky-image-reveal').forEach(section => {
    const images = section.querySelectorAll('.reveal-image');
    const content = section.querySelectorAll('.reveal-content');

    images.forEach((img, i) => {
      ScrollTrigger.create({
        trigger: content[i] || section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          gsap.to(images, { opacity: 0, duration: 0.3 });
          gsap.to(img, { opacity: 1, duration: 0.5 });
        },
        onEnterBack: () => {
          gsap.to(images, { opacity: 0, duration: 0.3 });
          gsap.to(img, { opacity: 1, duration: 0.5 });
        }
      });
    });
  });
}

/**
 * Image reveal animations
 */
export function initImageReveals() {
  // Clip path reveal
  gsap.utils.toArray('.image-reveal').forEach(wrapper => {
    const img = wrapper.querySelector('img');

    gsap.fromTo(wrapper,
      { clipPath: 'inset(0 100% 0 0)' },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    if (img) {
      gsap.fromTo(img,
        { scale: 1.3 },
        {
          scale: 1,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  });

  // Scale reveal
  gsap.utils.toArray('.image-scale-reveal').forEach(wrapper => {
    gsap.fromTo(wrapper,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

/**
 * Scroll progress indicator
 */
export function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) return;

  gsap.to(progressBar, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      start: 0,
      end: 'max',
      scrub: 0.3
    }
  });
}

/**
 * Magnetic hover effect for buttons
 */
export function initMagneticElements() {
  gsap.utils.toArray('.btn-modern, .magnetic').forEach(element => {
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  });
}

/**
 * Section reveal animations
 */
export function initSectionReveals() {
  gsap.utils.toArray('section').forEach(section => {
    const header = section.querySelector('.section-header, .text-center h2');

    if (header) {
      gsap.fromTo(header,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  });
}

/**
 * Navigation animations
 */
export function initNavAnimations() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let lastScroll = 0;

  ScrollTrigger.create({
    start: 'top top',
    end: 'max',
    onUpdate: (self) => {
      const currentScroll = self.scroll();
      const isScrolled = currentScroll > 50;
      header.classList.toggle('scrolled', isScrolled);
      lastScroll = currentScroll;
    }
  });
}

/**
 * Refresh ScrollTrigger
 */
export function refreshAnimations() {
  ScrollTrigger.refresh();
}

/**
 * Kill all ScrollTrigger instances
 */
export function destroyAnimations() {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
}

export default {
  init: initAnimations,
  hero: initHeroAnimations,
  scroll: initScrollAnimations,
  cards: initCardAnimations,
  text: initTextAnimations,
  parallax: initParallax,
  horizontal: initHorizontalScroll,
  sticky: initStickyTransforms,
  imageReveals: initImageReveals,
  progress: initScrollProgress,
  magnetic: initMagneticElements,
  sections: initSectionReveals,
  nav: initNavAnimations,
  refresh: refreshAnimations,
  destroy: destroyAnimations
};
