/**
 * 22-Step Process Interactive Infographic
 * Animated timeline showing the manufacturing process
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Process phases configuration
const phases = [
  { id: 'sourcing', name: 'Sourcing', steps: [1, 2, 3, 4, 5, 6], color: '#2d6b52' },
  { id: 'verification', name: 'Verification', steps: [7, 8, 9, 10, 11], color: '#3d7a5f' },
  { id: 'processing', name: 'Processing', steps: [12, 13, 14, 15], color: '#4d8a6c' },
  { id: 'formulation', name: 'Formulation', steps: [16, 17, 18, 19], color: '#5d9a79' },
  { id: 'quality', name: 'Quality Assurance', steps: [20, 21, 22], color: '#6daa86' }
];

/**
 * Initialize the process timeline
 * @param {string} containerId - The ID of the timeline container
 */
export function initProcessTimeline(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return null;

  const state = {
    activeStep: null,
    activePhase: 'sourcing'
  };

  // Create timeline structure
  function createTimeline() {
    const steps = container.querySelectorAll('.process-step');
    if (steps.length === 0) return;

    // Animate steps on scroll
    steps.forEach((step, index) => {
      gsap.fromTo(step,
        {
          opacity: 0,
          x: index % 2 === 0 ? -50 : 50
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Add click handler
      step.addEventListener('click', () => {
        toggleStepDetails(step);
      });
    });

    // Create timeline line animation
    const timeline = container.querySelector('.process-timeline-line');
    if (timeline) {
      gsap.fromTo(timeline,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.out',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: container,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1
          }
        }
      );
    }
  }

  // Toggle step details
  function toggleStepDetails(step) {
    const stepNumber = step.dataset.step;
    const details = step.querySelector('.process-step-details');

    // Close other open steps
    container.querySelectorAll('.process-step.expanded').forEach(s => {
      if (s !== step) {
        s.classList.remove('expanded');
        const d = s.querySelector('.process-step-details');
        if (d) {
          gsap.to(d, { height: 0, opacity: 0, duration: 0.3 });
        }
      }
    });

    // Toggle current step
    if (step.classList.contains('expanded')) {
      step.classList.remove('expanded');
      if (details) {
        gsap.to(details, { height: 0, opacity: 0, duration: 0.3 });
      }
      state.activeStep = null;
    } else {
      step.classList.add('expanded');
      if (details) {
        gsap.to(details, { height: 'auto', opacity: 1, duration: 0.4 });
      }
      state.activeStep = stepNumber;

      // Scroll step into view
      step.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // Phase navigation
  function initPhaseNav() {
    const phaseNav = container.querySelector('.process-phase-nav');
    if (!phaseNav) return;

    phases.forEach(phase => {
      const btn = phaseNav.querySelector(`[data-phase="${phase.id}"]`);
      if (btn) {
        btn.addEventListener('click', () => {
          scrollToPhase(phase.id);
          setActivePhase(phase.id);
        });
      }
    });

    // Update active phase on scroll
    phases.forEach(phase => {
      const firstStep = container.querySelector(`[data-step="${phase.steps[0]}"]`);
      if (firstStep) {
        ScrollTrigger.create({
          trigger: firstStep,
          start: 'top center',
          onEnter: () => setActivePhase(phase.id),
          onEnterBack: () => {
            const prevPhase = phases[phases.indexOf(phase) - 1];
            if (prevPhase) setActivePhase(prevPhase.id);
          }
        });
      }
    });
  }

  function scrollToPhase(phaseId) {
    const phase = phases.find(p => p.id === phaseId);
    if (phase) {
      const firstStep = container.querySelector(`[data-step="${phase.steps[0]}"]`);
      if (firstStep) {
        firstStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  function setActivePhase(phaseId) {
    state.activePhase = phaseId;
    const phaseNav = container.querySelector('.process-phase-nav');
    if (phaseNav) {
      phaseNav.querySelectorAll('.process-phase-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.phase === phaseId);
      });
    }
  }

  // Initialize
  createTimeline();
  initPhaseNav();

  return {
    goToStep: (stepNumber) => {
      const step = container.querySelector(`[data-step="${stepNumber}"]`);
      if (step) {
        step.scrollIntoView({ behavior: 'smooth', block: 'center' });
        toggleStepDetails(step);
      }
    },
    goToPhase: scrollToPhase,
    getCurrentStep: () => state.activeStep,
    getCurrentPhase: () => state.activePhase
  };
}

/**
 * Create a mini process indicator for product pages
 * @param {string} containerId - The ID of the container
 * @param {number[]} highlightSteps - Steps to highlight
 */
export function initMiniProcess(containerId, highlightSteps = []) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="mini-process">
      <div class="mini-process-phases">
        ${phases.map(phase => `
          <div class="mini-process-phase" data-phase="${phase.id}">
            <div class="mini-process-phase-label">${phase.name}</div>
            <div class="mini-process-steps">
              ${phase.steps.map(step => `
                <div
                  class="mini-process-step ${highlightSteps.includes(step) ? 'highlighted' : ''}"
                  data-step="${step}"
                  title="Step ${step}"
                ></div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
      <a href="process.html" class="mini-process-link">
        View full 22-step process
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
      </a>
    </div>
  `;

  // Add hover effects
  container.querySelectorAll('.mini-process-step').forEach(step => {
    step.addEventListener('mouseenter', () => {
      const stepNum = step.dataset.step;
      // Could show tooltip with step name
    });
  });
}

/**
 * Animated counter for statistics
 * @param {string} selector - CSS selector for counter elements
 */
export function initCounters(selector = '.stat-number') {
  const counters = document.querySelectorAll(selector);

  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target || counter.textContent);
    const duration = parseFloat(counter.dataset.duration || 2);
    const suffix = counter.dataset.suffix || '';

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          innerHTML: target,
          duration: duration,
          ease: 'power2.out',
          snap: { innerHTML: 1 },
          onUpdate: function() {
            counter.textContent = Math.round(parseFloat(counter.textContent)) + suffix;
          }
        });
      }
    });
  });
}

export { phases };
