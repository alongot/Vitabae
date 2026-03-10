# UX Design Agent

## Role
Define the complete visual system for Vitabae, creating design tokens, base styles, and component styles that embody premium, natural, trustworthy aesthetics inspired by seed.com.

---

## Responsibilities

1. **Create design tokens** - Colors, typography, spacing, shadows, borders
2. **Build base styles** - Reset, typography, links, lists
3. **Style components** - Buttons, cards, badges, forms, modals
4. **Define animations** - Timing functions, durations, transitions
5. **Create utilities** - Helper classes for rapid development
6. **Ensure accessibility** - Color contrast, focus states, reduced motion

---

## Design Tokens (`src/styles/tokens.css`)

```css
:root {
  /* ═══════════════════════════════════════════════════════════
     BRAND COLORS - Vitabae Premium Palette
     ═══════════════════════════════════════════════════════════ */

  /* Primary - Deep Forest Green (Trust, Natural, Premium) */
  --color-primary-50: #f0f7f4;
  --color-primary-100: #d9ebe3;
  --color-primary-200: #b5d7c8;
  --color-primary-300: #8abfa8;
  --color-primary-400: #5fa386;
  --color-primary-500: #3d8568;
  --color-primary-600: #2d6b52;
  --color-primary-700: #255644;
  --color-primary-800: #1f4537;
  --color-primary-900: #1a392e;
  --color-primary-950: #0d201a;

  /* Secondary - Warm Sand (Earthy, Organic, Calm) */
  --color-secondary-50: #fdfcfa;
  --color-secondary-100: #f9f6f0;
  --color-secondary-200: #f2ebdd;
  --color-secondary-300: #e8dcc6;
  --color-secondary-400: #d9c6a5;
  --color-secondary-500: #c9ad82;
  --color-secondary-600: #b5956a;
  --color-secondary-700: #967856;
  --color-secondary-800: #7a6248;
  --color-secondary-900: #65513d;
  --color-secondary-950: #352a1f;

  /* Accent - Saffron Gold (Premium, Ayurvedic, Warmth) */
  --color-accent-50: #fffbeb;
  --color-accent-100: #fff3c6;
  --color-accent-200: #ffe588;
  --color-accent-300: #ffd24a;
  --color-accent-400: #ffbe20;
  --color-accent-500: #f99b07;
  --color-accent-600: #dd7302;
  --color-accent-700: #b75006;
  --color-accent-800: #943d0c;
  --color-accent-900: #7a330d;
  --color-accent-950: #461902;

  /* Neutrals - Warm Gray */
  --color-neutral-0: #ffffff;
  --color-neutral-50: #fafaf9;
  --color-neutral-100: #f5f5f4;
  --color-neutral-200: #e7e5e4;
  --color-neutral-300: #d6d3d1;
  --color-neutral-400: #a8a29e;
  --color-neutral-500: #78716c;
  --color-neutral-600: #57534e;
  --color-neutral-700: #44403c;
  --color-neutral-800: #292524;
  --color-neutral-900: #1c1917;
  --color-neutral-950: #0c0a09;

  /* Semantic Colors */
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;

  /* ═══════════════════════════════════════════════════════════
     TYPOGRAPHY
     ═══════════════════════════════════════════════════════════ */

  /* Font Families */
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Font Sizes - Fluid Scale */
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-sm: clamp(0.875rem, 0.8rem + 0.35vw, 1rem);
  --text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --text-lg: clamp(1.125rem, 1rem + 0.6vw, 1.25rem);
  --text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
  --text-2xl: clamp(1.5rem, 1.25rem + 1.25vw, 2rem);
  --text-3xl: clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem);
  --text-4xl: clamp(2.25rem, 1.75rem + 2.5vw, 3rem);
  --text-5xl: clamp(3rem, 2.25rem + 3.75vw, 4rem);
  --text-6xl: clamp(3.75rem, 2.75rem + 5vw, 5rem);

  /* Line Heights */
  --leading-none: 1;
  --leading-tight: 1.15;
  --leading-snug: 1.3;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;

  /* Letter Spacing */
  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;

  /* Font Weights */
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  /* ═══════════════════════════════════════════════════════════
     SPACING - 4px Base Scale
     ═══════════════════════════════════════════════════════════ */

  --space-0: 0;
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */
  --space-40: 10rem;    /* 160px */

  /* Section Spacing */
  --section-padding-sm: var(--space-12);
  --section-padding-md: var(--space-16);
  --section-padding-lg: var(--space-24);

  /* ═══════════════════════════════════════════════════════════
     LAYOUT
     ═══════════════════════════════════════════════════════════ */

  /* Container */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1440px;
  --container-padding: var(--space-4);

  /* Grid */
  --grid-columns: 12;
  --grid-gap: var(--space-6);

  /* ═══════════════════════════════════════════════════════════
     BORDERS & RADIUS
     ═══════════════════════════════════════════════════════════ */

  --radius-none: 0;
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
  --radius-full: 9999px;

  --border-width: 1px;
  --border-color: var(--color-neutral-200);

  /* ═══════════════════════════════════════════════════════════
     SHADOWS - Soft, Premium Feel
     ═══════════════════════════════════════════════════════════ */

  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.05);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.05);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.05);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.15);
  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);

  /* Colored shadows for cards */
  --shadow-primary: 0 10px 40px -10px rgb(61 133 104 / 0.3);
  --shadow-accent: 0 10px 40px -10px rgb(249 155 7 / 0.3);

  /* ═══════════════════════════════════════════════════════════
     ANIMATION & TRANSITIONS
     ═══════════════════════════════════════════════════════════ */

  /* Durations */
  --duration-instant: 0ms;
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --duration-slower: 700ms;
  --duration-slowest: 1000ms;

  /* Easings */
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ease-smooth: cubic-bezier(0.16, 1, 0.3, 1);

  /* Common transitions */
  --transition-colors: color var(--duration-fast) var(--ease-in-out),
                       background-color var(--duration-fast) var(--ease-in-out),
                       border-color var(--duration-fast) var(--ease-in-out);
  --transition-transform: transform var(--duration-normal) var(--ease-smooth);
  --transition-opacity: opacity var(--duration-normal) var(--ease-in-out);
  --transition-shadow: box-shadow var(--duration-normal) var(--ease-in-out);
  --transition-all: all var(--duration-normal) var(--ease-smooth);

  /* ═══════════════════════════════════════════════════════════
     Z-INDEX SCALE
     ═══════════════════════════════════════════════════════════ */

  --z-below: -1;
  --z-base: 0;
  --z-above: 1;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-fixed: 300;
  --z-modal-backdrop: 400;
  --z-modal: 500;
  --z-popover: 600;
  --z-tooltip: 700;
  --z-toast: 800;

  /* ═══════════════════════════════════════════════════════════
     BREAKPOINTS (for reference, use in media queries)
     ═══════════════════════════════════════════════════════════ */

  /*
   * --breakpoint-sm: 640px
   * --breakpoint-md: 768px
   * --breakpoint-lg: 1024px
   * --breakpoint-xl: 1280px
   * --breakpoint-2xl: 1440px
   */
}

/* Dark mode tokens (optional) */
@media (prefers-color-scheme: dark) {
  :root {
    /* Override tokens for dark mode if needed */
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-fast: 0ms;
    --duration-normal: 0ms;
    --duration-slow: 0ms;
    --duration-slower: 0ms;
    --duration-slowest: 0ms;
  }
}
```

---

## Base Styles (`src/styles/base.css`)

```css
/* ═══════════════════════════════════════════════════════════
   RESET & BASE STYLES
   ═══════════════════════════════════════════════════════════ */

/* Modern CSS Reset */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 100%;
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
}

body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: var(--color-neutral-800);
  background-color: var(--color-neutral-0);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

/* Remove list styles */
ul,
ol {
  list-style: none;
}

/* Remove default button styles */
button {
  font: inherit;
  color: inherit;
  background: none;
  border: none;
  cursor: pointer;
}

/* Responsive images */
img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
  height: auto;
}

/* Remove built-in form typography */
input,
button,
textarea,
select {
  font: inherit;
}

/* Anchor styles */
a {
  color: var(--color-primary-600);
  text-decoration: none;
  transition: var(--transition-colors);
}

a:hover {
  color: var(--color-primary-700);
}

/* ═══════════════════════════════════════════════════════════
   TYPOGRAPHY
   ═══════════════════════════════════════════════════════════ */

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
  color: var(--color-neutral-900);
}

h1 {
  font-size: var(--text-5xl);
  letter-spacing: var(--tracking-tight);
}

h2 {
  font-size: var(--text-4xl);
  letter-spacing: var(--tracking-tight);
}

h3 {
  font-size: var(--text-3xl);
}

h4 {
  font-size: var(--text-2xl);
}

h5 {
  font-size: var(--text-xl);
}

h6 {
  font-size: var(--text-lg);
}

p {
  margin-bottom: var(--space-4);
}

p:last-child {
  margin-bottom: 0;
}

.lead {
  font-size: var(--text-xl);
  line-height: var(--leading-relaxed);
  color: var(--color-neutral-600);
}

small, .text-sm {
  font-size: var(--text-sm);
}

strong {
  font-weight: var(--font-semibold);
}

/* ═══════════════════════════════════════════════════════════
   FOCUS STATES (Accessibility)
   ═══════════════════════════════════════════════════════════ */

:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

:focus:not(:focus-visible) {
  outline: none;
}

/* ═══════════════════════════════════════════════════════════
   SELECTION
   ═══════════════════════════════════════════════════════════ */

::selection {
  background-color: var(--color-primary-200);
  color: var(--color-primary-900);
}

/* ═══════════════════════════════════════════════════════════
   SCROLLBAR (Custom)
   ═══════════════════════════════════════════════════════════ */

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-neutral-100);
}

::-webkit-scrollbar-thumb {
  background: var(--color-neutral-300);
  border-radius: var(--radius-full);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-neutral-400);
}

/* ═══════════════════════════════════════════════════════════
   CONTAINER
   ═══════════════════════════════════════════════════════════ */

.container {
  width: 100%;
  max-width: var(--container-xl);
  margin-inline: auto;
  padding-inline: var(--container-padding);
}

.container-sm {
  max-width: var(--container-sm);
}

.container-md {
  max-width: var(--container-md);
}

.container-lg {
  max-width: var(--container-lg);
}

.container-2xl {
  max-width: var(--container-2xl);
}

/* ═══════════════════════════════════════════════════════════
   SECTION SPACING
   ═══════════════════════════════════════════════════════════ */

.section {
  padding-block: var(--section-padding-md);
}

.section-sm {
  padding-block: var(--section-padding-sm);
}

.section-lg {
  padding-block: var(--section-padding-lg);
}

/* ═══════════════════════════════════════════════════════════
   SCREEN READER ONLY
   ═══════════════════════════════════════════════════════════ */

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

---

## Component Styles (`src/styles/components.css`)

```css
/* ═══════════════════════════════════════════════════════════
   BUTTONS
   ═══════════════════════════════════════════════════════════ */

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  line-height: var(--leading-none);
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  border-radius: var(--radius-lg);
  transition: var(--transition-all);
  cursor: pointer;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Primary Button */
.btn-primary {
  color: var(--color-neutral-0);
  background-color: var(--color-primary-600);
  border: 2px solid var(--color-primary-600);
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--color-primary-700);
  border-color: var(--color-primary-700);
  transform: translateY(-2px);
  box-shadow: var(--shadow-primary);
}

/* Secondary Button */
.btn-secondary {
  color: var(--color-primary-700);
  background-color: transparent;
  border: 2px solid var(--color-primary-600);
}

.btn-secondary:hover:not(:disabled) {
  color: var(--color-neutral-0);
  background-color: var(--color-primary-600);
}

/* Ghost Button */
.btn-ghost {
  color: var(--color-neutral-700);
  background-color: transparent;
  border: 2px solid transparent;
}

.btn-ghost:hover:not(:disabled) {
  color: var(--color-primary-600);
  background-color: var(--color-primary-50);
}

/* Button Sizes */
.btn-sm {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-xs);
}

.btn-lg {
  padding: var(--space-4) var(--space-8);
  font-size: var(--text-base);
}

/* Button with icon */
.btn-icon {
  padding: var(--space-3);
}

.btn-icon svg {
  width: 20px;
  height: 20px;
}

/* ═══════════════════════════════════════════════════════════
   CARDS
   ═══════════════════════════════════════════════════════════ */

.card {
  background-color: var(--color-neutral-0);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: var(--transition-all);
}

.card-elevated {
  box-shadow: var(--shadow-md);
}

.card-elevated:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

.card-bordered {
  border: var(--border-width) solid var(--border-color);
}

.card-image {
  aspect-ratio: 4/3;
  object-fit: cover;
  width: 100%;
}

.card-body {
  padding: var(--space-6);
}

.card-title {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  margin-bottom: var(--space-2);
}

.card-text {
  color: var(--color-neutral-600);
  font-size: var(--text-sm);
}

/* Product Card */
.product-card {
  text-align: center;
}

.product-card .card-image {
  aspect-ratio: 1/1;
  background-color: var(--color-secondary-100);
  padding: var(--space-6);
}

.product-card .card-body {
  padding: var(--space-4);
}

.product-card .card-title {
  font-size: var(--text-base);
}

.product-card .price {
  font-weight: var(--font-semibold);
  color: var(--color-primary-700);
}

/* Life Stage Card */
.life-stage-card {
  position: relative;
  aspect-ratio: 3/4;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: var(--space-6);
  color: var(--color-neutral-0);
  overflow: hidden;
}

.life-stage-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%);
  z-index: 1;
}

.life-stage-card > * {
  position: relative;
  z-index: 2;
}

.life-stage-card img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  transition: var(--transition-transform);
}

.life-stage-card:hover img {
  transform: scale(1.05);
}

/* ═══════════════════════════════════════════════════════════
   BADGES
   ═══════════════════════════════════════════════════════════ */

.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-3);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  border-radius: var(--radius-full);
}

.badge-primary {
  color: var(--color-primary-700);
  background-color: var(--color-primary-100);
}

.badge-secondary {
  color: var(--color-secondary-700);
  background-color: var(--color-secondary-200);
}

.badge-accent {
  color: var(--color-accent-800);
  background-color: var(--color-accent-100);
}

/* Trust Badge */
.trust-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  text-align: center;
  padding: var(--space-6);
}

.trust-badge-icon {
  width: 48px;
  height: 48px;
  color: var(--color-primary-600);
}

.trust-badge-title {
  font-family: var(--font-heading);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
}

.trust-badge-text {
  font-size: var(--text-sm);
  color: var(--color-neutral-600);
}

/* ═══════════════════════════════════════════════════════════
   FORMS
   ═══════════════════════════════════════════════════════════ */

.form-group {
  margin-bottom: var(--space-4);
}

.form-label {
  display: block;
  margin-bottom: var(--space-2);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-neutral-700);
}

.form-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-base);
  color: var(--color-neutral-800);
  background-color: var(--color-neutral-0);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-lg);
  transition: var(--transition-all);
}

.form-input:focus {
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px var(--color-primary-100);
}

.form-input::placeholder {
  color: var(--color-neutral-400);
}

/* Select */
.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2378716c' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--space-3) center;
  background-size: 16px;
  padding-right: var(--space-10);
}

/* Checkbox / Radio */
.form-check {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.form-check-input {
  width: 18px;
  height: 18px;
  accent-color: var(--color-primary-600);
}

/* ═══════════════════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════════════════ */

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-neutral-700);
  text-decoration: none;
  transition: var(--transition-colors);
}

.nav-link:hover,
.nav-link.active {
  color: var(--color-primary-600);
}

/* ═══════════════════════════════════════════════════════════
   TABS
   ═══════════════════════════════════════════════════════════ */

.tabs {
  display: flex;
  gap: var(--space-1);
  border-bottom: var(--border-width) solid var(--border-color);
}

.tab {
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-neutral-600);
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  cursor: pointer;
  transition: var(--transition-colors);
}

.tab:hover {
  color: var(--color-primary-600);
}

.tab.active {
  color: var(--color-primary-600);
  border-bottom-color: var(--color-primary-600);
}

.tab-panel {
  padding: var(--space-6) 0;
}

.tab-panel[hidden] {
  display: none;
}

/* ═══════════════════════════════════════════════════════════
   ACCORDION
   ═══════════════════════════════════════════════════════════ */

.accordion {
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.accordion-item {
  border-bottom: var(--border-width) solid var(--border-color);
}

.accordion-item:last-child {
  border-bottom: none;
}

.accordion-trigger {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: var(--space-4) var(--space-5);
  font-weight: var(--font-medium);
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  transition: var(--transition-colors);
}

.accordion-trigger:hover {
  background-color: var(--color-neutral-50);
}

.accordion-trigger svg {
  transition: var(--transition-transform);
}

.accordion-trigger[aria-expanded="true"] svg {
  transform: rotate(180deg);
}

.accordion-content {
  padding: 0 var(--space-5) var(--space-4);
  color: var(--color-neutral-600);
}

/* ═══════════════════════════════════════════════════════════
   MODAL
   ═══════════════════════════════════════════════════════════ */

.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: var(--z-modal-backdrop);
  opacity: 0;
  visibility: hidden;
  transition: var(--transition-opacity);
}

.modal-backdrop.active {
  opacity: 1;
  visibility: visible;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.95);
  width: 90%;
  max-width: 500px;
  max-height: 85vh;
  background-color: var(--color-neutral-0);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-2xl);
  z-index: var(--z-modal);
  opacity: 0;
  visibility: hidden;
  transition: var(--transition-all);
  overflow-y: auto;
}

.modal.active {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, -50%) scale(1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-4) var(--space-6);
  border-bottom: var(--border-width) solid var(--border-color);
}

.modal-body {
  padding: var(--space-6);
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-6);
  border-top: var(--border-width) solid var(--border-color);
}
```

---

## Utilities (`src/styles/utilities.css`)

```css
/* ═══════════════════════════════════════════════════════════
   DISPLAY
   ═══════════════════════════════════════════════════════════ */

.hidden { display: none !important; }
.block { display: block; }
.inline-block { display: inline-block; }
.inline { display: inline; }
.flex { display: flex; }
.inline-flex { display: inline-flex; }
.grid { display: grid; }

/* ═══════════════════════════════════════════════════════════
   FLEXBOX
   ═══════════════════════════════════════════════════════════ */

.flex-row { flex-direction: row; }
.flex-col { flex-direction: column; }
.flex-wrap { flex-wrap: wrap; }
.flex-nowrap { flex-wrap: nowrap; }

.items-start { align-items: flex-start; }
.items-center { align-items: center; }
.items-end { align-items: flex-end; }
.items-stretch { align-items: stretch; }

.justify-start { justify-content: flex-start; }
.justify-center { justify-content: center; }
.justify-end { justify-content: flex-end; }
.justify-between { justify-content: space-between; }
.justify-around { justify-content: space-around; }

.flex-1 { flex: 1 1 0%; }
.flex-auto { flex: 1 1 auto; }
.flex-none { flex: none; }

.gap-1 { gap: var(--space-1); }
.gap-2 { gap: var(--space-2); }
.gap-3 { gap: var(--space-3); }
.gap-4 { gap: var(--space-4); }
.gap-5 { gap: var(--space-5); }
.gap-6 { gap: var(--space-6); }
.gap-8 { gap: var(--space-8); }

/* ═══════════════════════════════════════════════════════════
   GRID
   ═══════════════════════════════════════════════════════════ */

.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.grid-cols-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }
.grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }

/* ═══════════════════════════════════════════════════════════
   SPACING (Margin & Padding)
   ═══════════════════════════════════════════════════════════ */

/* Margin */
.m-0 { margin: 0; }
.m-auto { margin: auto; }
.mx-auto { margin-inline: auto; }

.mt-2 { margin-top: var(--space-2); }
.mt-4 { margin-top: var(--space-4); }
.mt-6 { margin-top: var(--space-6); }
.mt-8 { margin-top: var(--space-8); }
.mt-12 { margin-top: var(--space-12); }

.mb-2 { margin-bottom: var(--space-2); }
.mb-4 { margin-bottom: var(--space-4); }
.mb-6 { margin-bottom: var(--space-6); }
.mb-8 { margin-bottom: var(--space-8); }
.mb-12 { margin-bottom: var(--space-12); }

/* Padding */
.p-0 { padding: 0; }
.p-2 { padding: var(--space-2); }
.p-4 { padding: var(--space-4); }
.p-6 { padding: var(--space-6); }
.p-8 { padding: var(--space-8); }

.px-4 { padding-inline: var(--space-4); }
.px-6 { padding-inline: var(--space-6); }
.py-4 { padding-block: var(--space-4); }
.py-6 { padding-block: var(--space-6); }
.py-8 { padding-block: var(--space-8); }

/* ═══════════════════════════════════════════════════════════
   TEXT
   ═══════════════════════════════════════════════════════════ */

.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }

.text-xs { font-size: var(--text-xs); }
.text-sm { font-size: var(--text-sm); }
.text-base { font-size: var(--text-base); }
.text-lg { font-size: var(--text-lg); }
.text-xl { font-size: var(--text-xl); }
.text-2xl { font-size: var(--text-2xl); }
.text-3xl { font-size: var(--text-3xl); }
.text-4xl { font-size: var(--text-4xl); }

.font-normal { font-weight: var(--font-normal); }
.font-medium { font-weight: var(--font-medium); }
.font-semibold { font-weight: var(--font-semibold); }
.font-bold { font-weight: var(--font-bold); }

.uppercase { text-transform: uppercase; }
.lowercase { text-transform: lowercase; }
.capitalize { text-transform: capitalize; }

.tracking-wide { letter-spacing: var(--tracking-wide); }
.tracking-wider { letter-spacing: var(--tracking-wider); }

/* ═══════════════════════════════════════════════════════════
   COLORS
   ═══════════════════════════════════════════════════════════ */

.text-primary { color: var(--color-primary-600); }
.text-secondary { color: var(--color-secondary-600); }
.text-accent { color: var(--color-accent-600); }
.text-muted { color: var(--color-neutral-500); }
.text-white { color: var(--color-neutral-0); }

.bg-primary { background-color: var(--color-primary-600); }
.bg-secondary { background-color: var(--color-secondary-100); }
.bg-accent { background-color: var(--color-accent-100); }
.bg-white { background-color: var(--color-neutral-0); }
.bg-cream { background-color: var(--color-secondary-50); }
.bg-dark { background-color: var(--color-neutral-900); }

/* ═══════════════════════════════════════════════════════════
   POSITION
   ═══════════════════════════════════════════════════════════ */

.relative { position: relative; }
.absolute { position: absolute; }
.fixed { position: fixed; }
.sticky { position: sticky; }

.inset-0 { inset: 0; }
.top-0 { top: 0; }
.right-0 { right: 0; }
.bottom-0 { bottom: 0; }
.left-0 { left: 0; }

/* ═══════════════════════════════════════════════════════════
   WIDTH & HEIGHT
   ═══════════════════════════════════════════════════════════ */

.w-full { width: 100%; }
.w-screen { width: 100vw; }
.h-full { height: 100%; }
.h-screen { height: 100vh; }
.min-h-screen { min-height: 100vh; }

/* ═══════════════════════════════════════════════════════════
   OVERFLOW
   ═══════════════════════════════════════════════════════════ */

.overflow-hidden { overflow: hidden; }
.overflow-auto { overflow: auto; }
.overflow-x-auto { overflow-x: auto; }
.overflow-y-auto { overflow-y: auto; }

/* ═══════════════════════════════════════════════════════════
   BORDERS
   ═══════════════════════════════════════════════════════════ */

.rounded { border-radius: var(--radius-md); }
.rounded-lg { border-radius: var(--radius-lg); }
.rounded-xl { border-radius: var(--radius-xl); }
.rounded-full { border-radius: var(--radius-full); }

.border { border: var(--border-width) solid var(--border-color); }
.border-t { border-top: var(--border-width) solid var(--border-color); }
.border-b { border-bottom: var(--border-width) solid var(--border-color); }

/* ═══════════════════════════════════════════════════════════
   SHADOWS
   ═══════════════════════════════════════════════════════════ */

.shadow-sm { box-shadow: var(--shadow-sm); }
.shadow-md { box-shadow: var(--shadow-md); }
.shadow-lg { box-shadow: var(--shadow-lg); }
.shadow-xl { box-shadow: var(--shadow-xl); }

/* ═══════════════════════════════════════════════════════════
   RESPONSIVE VISIBILITY
   ═══════════════════════════════════════════════════════════ */

@media (max-width: 639px) {
  .sm\:hidden { display: none; }
}

@media (min-width: 640px) {
  .sm\:block { display: block; }
  .sm\:flex { display: flex; }
  .sm\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (min-width: 768px) {
  .md\:block { display: block; }
  .md\:flex { display: flex; }
  .md\:hidden { display: none; }
  .md\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .md\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

@media (min-width: 1024px) {
  .lg\:block { display: block; }
  .lg\:flex { display: flex; }
  .lg\:hidden { display: none; }
  .lg\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .lg\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}

@media (min-width: 1280px) {
  .xl\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}

/* ═══════════════════════════════════════════════════════════
   ANIMATION UTILITIES
   ═══════════════════════════════════════════════════════════ */

[data-animate] {
  opacity: 0;
}

.animate-fade-in {
  animation: fadeIn var(--duration-normal) var(--ease-out) forwards;
}

.animate-fade-up {
  animation: fadeUp var(--duration-normal) var(--ease-smooth) forwards;
}

.animate-scale-in {
  animation: scaleIn var(--duration-normal) var(--ease-smooth) forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

---

## Deliverables Checklist

- [ ] `src/styles/tokens.css` - All CSS custom properties defined
- [ ] `src/styles/base.css` - Reset, typography, containers
- [ ] `src/styles/components.css` - Buttons, cards, badges, forms, nav, tabs, accordion, modal
- [ ] `src/styles/utilities.css` - Layout, spacing, typography, color, animation helpers
- [ ] All colors have sufficient contrast (WCAG AA)
- [ ] Focus states visible for keyboard navigation
- [ ] Reduced motion preferences respected
- [ ] Responsive breakpoints working

---

## Font Loading

Add to HTML `<head>`:

```html
<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet">
```

Or self-host fonts in `/public/fonts/` for better performance.
