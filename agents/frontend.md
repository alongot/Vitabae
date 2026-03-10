# Frontend Agent

## Role
Build page templates and sections for the Vitabae website using Shopify-compatible structure. Create semantic HTML with proper section/block patterns that can be migrated to Shopify Liquid.

---

## Responsibilities

1. **Create HTML templates** - Build complete page templates
2. **Build section components** - Reusable sections matching Shopify patterns
3. **Implement responsive layouts** - Mobile-first approach
4. **Structure for Shopify** - Use classes/attributes that map to Shopify sections
5. **Integrate design tokens** - Use CSS custom properties from UX Design Agent

---

## Page Templates to Build

| Page | File | Key Sections |
|------|------|--------------|
| Home | `index.html` | Hero, Trust Badges, Life Stages, Quiz CTA, Ingredient Map, Education |
| Collection | `collection.html` | Header, Filters, Product Grid, Pagination |
| Product | `product.html` | Hero, Gallery, Variants, Tabs, Related |
| Our Process | `process.html` | 22-Step Interactive Infographic |
| Science | `science.html` | Hero, Standards Grid, Testing Flow |
| Our Story | `story.html` | Timeline, Team, Values |
| Research | `research.html` | Search, Filter, Article Cards |

---

## Base Page Template

Every page follows this structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title | Vitabae</title>
  <meta name="description" content="Page description for SEO">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet">

  <!-- Styles -->
  <link rel="stylesheet" href="/styles/tokens.css">
  <link rel="stylesheet" href="/styles/base.css">
  <link rel="stylesheet" href="/styles/components.css">
  <link rel="stylesheet" href="/styles/sections.css">
  <link rel="stylesheet" href="/styles/utilities.css">

  <!-- Leaflet CSS (if using map) -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
</head>
<body data-page="home">
  <!-- Skip Link -->
  <a href="#main-content" class="sr-only">Skip to main content</a>

  <!-- Header -->
  <header class="site-header" data-section="header">
    <!-- Header content -->
  </header>

  <!-- Main Content -->
  <main id="main-content">
    <!-- Page sections go here -->
  </main>

  <!-- Footer -->
  <footer class="site-footer" data-section="footer">
    <!-- Footer content -->
  </footer>

  <!-- Scripts -->
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
  <script type="module" src="/scripts/main.js"></script>
</body>
</html>
```

---

## Section Templates

### 1. Header Section (`src/components/header.html`)

```html
<!-- Shopify: sections/header.liquid -->
<header class="site-header" data-section="header">
  <div class="header-announcement bg-primary text-white text-center py-2 text-sm">
    <p>Free shipping on orders over $50 | Subscribe & save 15%</p>
  </div>

  <nav class="header-nav container" x-data="{ mobileOpen: false, searchOpen: false }">
    <div class="header-nav-inner flex items-center justify-between py-4">
      <!-- Logo -->
      <a href="/" class="header-logo">
        <img src="/images/vitabae-logo.svg" alt="Vitabae" width="140" height="40">
      </a>

      <!-- Desktop Navigation -->
      <ul class="header-menu flex gap-6 lg:flex hidden">
        <li><a href="/pages/collection.html" class="nav-link">Shop All</a></li>
        <li class="nav-dropdown" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
          <button class="nav-link flex items-center gap-1">
            By Life Stage
            <i data-lucide="chevron-down" class="w-4 h-4"></i>
          </button>
          <div class="nav-dropdown-menu" x-show="open" x-transition>
            <a href="/pages/collection.html?stage=women">Women's Health</a>
            <a href="/pages/collection.html?stage=men">Men's Vitality</a>
            <a href="/pages/collection.html?stage=family">Family Wellness</a>
            <a href="/pages/collection.html?stage=active">Active Lifestyle</a>
          </div>
        </li>
        <li><a href="/pages/process.html" class="nav-link">Our Process</a></li>
        <li><a href="/pages/science.html" class="nav-link">Science</a></li>
        <li><a href="/pages/story.html" class="nav-link">Our Story</a></li>
        <li><a href="/pages/research.html" class="nav-link">Research</a></li>
      </ul>

      <!-- Right Actions -->
      <div class="header-actions flex items-center gap-4">
        <button class="btn-icon" @click="searchOpen = !searchOpen" aria-label="Search">
          <i data-lucide="search"></i>
        </button>
        <a href="/account" class="btn-icon lg:flex hidden" aria-label="Account">
          <i data-lucide="user"></i>
        </a>
        <a href="/cart" class="btn-icon relative" aria-label="Cart">
          <i data-lucide="shopping-bag"></i>
          <span class="cart-count badge badge-accent absolute -top-1 -right-1">0</span>
        </a>
        <button class="btn-icon lg:hidden" @click="mobileOpen = !mobileOpen" aria-label="Menu">
          <i data-lucide="menu"></i>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div class="mobile-menu lg:hidden" x-show="mobileOpen" x-transition>
      <ul class="mobile-menu-list">
        <li><a href="/pages/collection.html">Shop All</a></li>
        <li><a href="/pages/collection.html?stage=women">Women's Health</a></li>
        <li><a href="/pages/collection.html?stage=men">Men's Vitality</a></li>
        <li><a href="/pages/collection.html?stage=family">Family Wellness</a></li>
        <li><a href="/pages/collection.html?stage=active">Active Lifestyle</a></li>
        <li><a href="/pages/process.html">Our Process</a></li>
        <li><a href="/pages/science.html">Science</a></li>
        <li><a href="/pages/story.html">Our Story</a></li>
      </ul>
    </div>

    <!-- Search Overlay -->
    <div class="search-overlay" x-show="searchOpen" x-transition>
      <form class="search-form container">
        <input type="search" placeholder="Search products, ingredients, articles..." class="form-input">
        <button type="submit" class="btn btn-primary">Search</button>
      </form>
    </div>
  </nav>
</header>
```

### 2. Hero Section (`src/sections/hero.html`)

```html
<!-- Shopify: sections/hero.liquid -->
<section class="hero section-lg relative overflow-hidden" data-section="hero">
  <div class="hero-bg absolute inset-0">
    <img src="/images/hero-bg.jpg" alt="" class="w-full h-full object-cover">
    <div class="hero-overlay absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
  </div>

  <div class="container relative z-10">
    <div class="hero-content max-w-2xl text-white" data-animate="fade-up">
      <span class="badge badge-accent mb-4">Ayurvedic Wisdom, Modern Science</span>
      <h1 class="hero-title mb-6">
        Premium Supplements for Every Stage of Life
      </h1>
      <p class="hero-text lead mb-8">
        Clinically-formulated, third-party tested supplements rooted in 5,000 years of Ayurvedic tradition.
      </p>
      <div class="hero-actions flex flex-wrap gap-4">
        <a href="/pages/collection.html" class="btn btn-primary btn-lg">
          Shop Now
          <i data-lucide="arrow-right"></i>
        </a>
        <a href="#quiz" class="btn btn-secondary btn-lg" style="--color-primary-600: white; border-color: white; color: white;">
          Take the Quiz
        </a>
      </div>
    </div>
  </div>
</section>
```

### 3. Trust Badges Section (`src/sections/trust-badges.html`)

```html
<!-- Shopify: sections/trust-badges.liquid -->
<section class="trust-badges-section section bg-cream" data-section="trust-badges">
  <div class="container">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
      <!-- Badge 1 -->
      <div class="trust-badge" data-animate="fade-up">
        <div class="trust-badge-icon">
          <i data-lucide="shield-check"></i>
        </div>
        <h3 class="trust-badge-title">Third-Party Tested</h3>
        <p class="trust-badge-text">Every batch verified for purity and potency</p>
      </div>

      <!-- Badge 2 -->
      <div class="trust-badge" data-animate="fade-up">
        <div class="trust-badge-icon">
          <i data-lucide="leaf"></i>
        </div>
        <h3 class="trust-badge-title">Sustainably Sourced</h3>
        <p class="trust-badge-text">Direct partnerships with organic farms in India</p>
      </div>

      <!-- Badge 3 -->
      <div class="trust-badge" data-animate="fade-up">
        <div class="trust-badge-icon">
          <i data-lucide="flask-conical"></i>
        </div>
        <h3 class="trust-badge-title">Clinically Dosed</h3>
        <p class="trust-badge-text">Therapeutic amounts backed by research</p>
      </div>

      <!-- Badge 4 -->
      <div class="trust-badge" data-animate="fade-up">
        <div class="trust-badge-icon">
          <i data-lucide="award"></i>
        </div>
        <h3 class="trust-badge-title">GMP Certified</h3>
        <p class="trust-badge-text">Manufactured in FDA-registered facilities</p>
      </div>
    </div>
  </div>
</section>
```

### 4. Life Stages Section (`src/sections/life-stages.html`)

```html
<!-- Shopify: sections/life-stages.liquid -->
<section class="life-stages-section section" data-section="life-stages">
  <div class="container">
    <header class="section-header text-center mb-12" data-animate="fade-up">
      <h2 class="section-title">Formulated for Your Life Stage</h2>
      <p class="section-subtitle lead">Targeted nutrition for every chapter of your wellness journey</p>
    </header>

    <div class="life-stages-grid grid grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Women's Health -->
      <a href="/pages/collection.html?stage=women" class="life-stage-card card card-elevated" data-animate="fade-up">
        <img src="/images/life-stage-women.jpg" alt="Women's Health">
        <div class="life-stage-content">
          <h3 class="card-title text-white">Women's Health</h3>
          <p class="text-sm text-white/80">Hormone balance, fertility, menopause support</p>
          <span class="btn btn-sm btn-ghost text-white mt-2">
            Explore <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </span>
        </div>
      </a>

      <!-- Men's Vitality -->
      <a href="/pages/collection.html?stage=men" class="life-stage-card card card-elevated" data-animate="fade-up">
        <img src="/images/life-stage-men.jpg" alt="Men's Vitality">
        <div class="life-stage-content">
          <h3 class="card-title text-white">Men's Vitality</h3>
          <p class="text-sm text-white/80">Energy, performance, prostate health</p>
          <span class="btn btn-sm btn-ghost text-white mt-2">
            Explore <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </span>
        </div>
      </a>

      <!-- Family Wellness -->
      <a href="/pages/collection.html?stage=family" class="life-stage-card card card-elevated" data-animate="fade-up">
        <img src="/images/life-stage-family.jpg" alt="Family Wellness">
        <div class="life-stage-content">
          <h3 class="card-title text-white">Family Wellness</h3>
          <p class="text-sm text-white/80">Immunity, digestion, everyday vitality</p>
          <span class="btn btn-sm btn-ghost text-white mt-2">
            Explore <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </span>
        </div>
      </a>

      <!-- Active Lifestyle -->
      <a href="/pages/collection.html?stage=active" class="life-stage-card card card-elevated" data-animate="fade-up">
        <img src="/images/life-stage-active.jpg" alt="Active Lifestyle">
        <div class="life-stage-content">
          <h3 class="card-title text-white">Active Lifestyle</h3>
          <p class="text-sm text-white/80">Recovery, endurance, joint support</p>
          <span class="btn btn-sm btn-ghost text-white mt-2">
            Explore <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </span>
        </div>
      </a>
    </div>
  </div>
</section>
```

### 5. Quiz CTA Section (`src/sections/quiz-cta.html`)

```html
<!-- Shopify: sections/quiz-cta.liquid -->
<section id="quiz" class="quiz-cta-section section bg-primary text-white" data-section="quiz-cta">
  <div class="container">
    <div class="quiz-cta-inner flex flex-col lg:flex-row items-center gap-12">
      <div class="quiz-cta-content flex-1" data-animate="fade-up">
        <span class="badge badge-accent mb-4">Personalized Recommendations</span>
        <h2 class="section-title text-white mb-4">Not Sure Where to Start?</h2>
        <p class="lead text-white/80 mb-6">
          Take our 2-minute quiz to discover the perfect supplements for your unique needs, goals, and lifestyle.
        </p>
        <ul class="quiz-benefits space-y-3 mb-8">
          <li class="flex items-center gap-3">
            <i data-lucide="check-circle" class="text-accent-400"></i>
            <span>Personalized formula recommendations</span>
          </li>
          <li class="flex items-center gap-3">
            <i data-lucide="check-circle" class="text-accent-400"></i>
            <span>Based on your health goals & concerns</span>
          </li>
          <li class="flex items-center gap-3">
            <i data-lucide="check-circle" class="text-accent-400"></i>
            <span>Science-backed dosing suggestions</span>
          </li>
        </ul>
        <button class="btn btn-lg" style="background: white; color: var(--color-primary-700);" onclick="openQuizModal()">
          Start the Quiz
          <i data-lucide="arrow-right"></i>
        </button>
      </div>

      <div class="quiz-cta-visual flex-1" data-animate="fade-up">
        <img src="/images/quiz-illustration.svg" alt="Take the quiz" class="w-full max-w-md mx-auto">
      </div>
    </div>
  </div>
</section>
```

### 6. Ingredient Map Section (`src/sections/ingredient-map.html`)

```html
<!-- Shopify: sections/ingredient-map.liquid -->
<section class="ingredient-map-section section" data-section="ingredient-map">
  <div class="container">
    <header class="section-header text-center mb-12" data-animate="fade-up">
      <span class="badge badge-secondary mb-4">Traced to Source</span>
      <h2 class="section-title">Where Our Ingredients Come From</h2>
      <p class="section-subtitle lead">Direct partnerships with organic farms across India</p>
    </header>

    <div class="map-container flex flex-col lg:flex-row gap-8">
      <!-- Map -->
      <div class="map-wrapper flex-1 rounded-xl overflow-hidden shadow-lg" data-animate="fade-up">
        <div id="india-map" class="h-96 lg:h-[500px]"></div>
      </div>

      <!-- Ingredient Detail Panel -->
      <div class="ingredient-detail flex-1 lg:max-w-md" x-data="{ selected: null }">
        <div class="ingredient-list space-y-3">
          <!-- Ingredient Item -->
          <button
            class="ingredient-item card card-bordered w-full text-left p-4 flex items-center gap-4"
            @click="selected = 'ashwagandha'"
            :class="{ 'border-primary-500 bg-primary-50': selected === 'ashwagandha' }"
          >
            <img src="/images/ingredients/ashwagandha.jpg" alt="" class="w-16 h-16 rounded-lg object-cover">
            <div>
              <h4 class="font-semibold">Ashwagandha</h4>
              <p class="text-sm text-muted">Rajasthan, India</p>
            </div>
          </button>

          <button
            class="ingredient-item card card-bordered w-full text-left p-4 flex items-center gap-4"
            @click="selected = 'turmeric'"
            :class="{ 'border-primary-500 bg-primary-50': selected === 'turmeric' }"
          >
            <img src="/images/ingredients/turmeric.jpg" alt="" class="w-16 h-16 rounded-lg object-cover">
            <div>
              <h4 class="font-semibold">Turmeric</h4>
              <p class="text-sm text-muted">Karnataka, India</p>
            </div>
          </button>

          <button
            class="ingredient-item card card-bordered w-full text-left p-4 flex items-center gap-4"
            @click="selected = 'tulsi'"
            :class="{ 'border-primary-500 bg-primary-50': selected === 'tulsi' }"
          >
            <img src="/images/ingredients/tulsi.jpg" alt="" class="w-16 h-16 rounded-lg object-cover">
            <div>
              <h4 class="font-semibold">Tulsi (Holy Basil)</h4>
              <p class="text-sm text-muted">Uttar Pradesh, India</p>
            </div>
          </button>
        </div>

        <!-- Detail View -->
        <div class="ingredient-detail-view mt-6 p-6 bg-cream rounded-xl" x-show="selected" x-transition>
          <template x-if="selected === 'ashwagandha'">
            <div>
              <h3 class="text-xl font-semibold mb-2">Ashwagandha</h3>
              <p class="text-muted mb-4">
                Sourced from organic farms in Rajasthan, our KSM-66 ashwagandha is the most
                clinically studied form, extracted using a green chemistry process.
              </p>
              <a href="/pages/research.html?ingredient=ashwagandha" class="btn btn-sm btn-secondary">
                View Research
              </a>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</section>
```

### 7. Footer Section (`src/components/footer.html`)

```html
<!-- Shopify: sections/footer.liquid -->
<footer class="site-footer bg-dark text-white section" data-section="footer">
  <div class="container">
    <div class="footer-grid grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
      <!-- Brand Column -->
      <div class="footer-brand col-span-2 lg:col-span-1">
        <img src="/images/vitabae-logo-white.svg" alt="Vitabae" class="mb-4" width="120">
        <p class="text-sm text-neutral-400 mb-4">
          Premium Ayurvedic supplements backed by modern science.
        </p>
        <div class="social-links flex gap-3">
          <a href="#" class="text-neutral-400 hover:text-white"><i data-lucide="instagram"></i></a>
          <a href="#" class="text-neutral-400 hover:text-white"><i data-lucide="facebook"></i></a>
          <a href="#" class="text-neutral-400 hover:text-white"><i data-lucide="twitter"></i></a>
          <a href="#" class="text-neutral-400 hover:text-white"><i data-lucide="youtube"></i></a>
        </div>
      </div>

      <!-- Shop -->
      <div class="footer-nav">
        <h4 class="footer-nav-title font-semibold mb-4">Shop</h4>
        <ul class="space-y-2">
          <li><a href="/pages/collection.html" class="text-neutral-400 hover:text-white text-sm">All Products</a></li>
          <li><a href="/pages/collection.html?stage=women" class="text-neutral-400 hover:text-white text-sm">Women's Health</a></li>
          <li><a href="/pages/collection.html?stage=men" class="text-neutral-400 hover:text-white text-sm">Men's Vitality</a></li>
          <li><a href="/pages/collection.html?stage=family" class="text-neutral-400 hover:text-white text-sm">Family Wellness</a></li>
          <li><a href="#" class="text-neutral-400 hover:text-white text-sm">Bundles & Kits</a></li>
        </ul>
      </div>

      <!-- Learn -->
      <div class="footer-nav">
        <h4 class="footer-nav-title font-semibold mb-4">Learn</h4>
        <ul class="space-y-2">
          <li><a href="/pages/process.html" class="text-neutral-400 hover:text-white text-sm">Our Process</a></li>
          <li><a href="/pages/science.html" class="text-neutral-400 hover:text-white text-sm">Science & Standards</a></li>
          <li><a href="/pages/story.html" class="text-neutral-400 hover:text-white text-sm">Our Story</a></li>
          <li><a href="/pages/research.html" class="text-neutral-400 hover:text-white text-sm">Research Library</a></li>
          <li><a href="#" class="text-neutral-400 hover:text-white text-sm">Blog</a></li>
        </ul>
      </div>

      <!-- Support -->
      <div class="footer-nav">
        <h4 class="footer-nav-title font-semibold mb-4">Support</h4>
        <ul class="space-y-2">
          <li><a href="#" class="text-neutral-400 hover:text-white text-sm">Contact Us</a></li>
          <li><a href="#" class="text-neutral-400 hover:text-white text-sm">FAQ</a></li>
          <li><a href="#" class="text-neutral-400 hover:text-white text-sm">Shipping & Returns</a></li>
          <li><a href="#" class="text-neutral-400 hover:text-white text-sm">Track Order</a></li>
          <li><a href="#" class="text-neutral-400 hover:text-white text-sm">Subscription Management</a></li>
        </ul>
      </div>

      <!-- Newsletter -->
      <div class="footer-newsletter col-span-2 md:col-span-4 lg:col-span-1">
        <h4 class="footer-nav-title font-semibold mb-4">Stay Updated</h4>
        <p class="text-sm text-neutral-400 mb-4">Subscribe for wellness tips and exclusive offers.</p>
        <form class="newsletter-form flex gap-2">
          <input type="email" placeholder="Enter email" class="form-input flex-1 bg-neutral-800 border-neutral-700 text-white text-sm">
          <button type="submit" class="btn btn-primary btn-sm">Join</button>
        </form>
      </div>
    </div>

    <!-- Footer Bottom -->
    <div class="footer-bottom pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4">
      <p class="text-sm text-neutral-500">&copy; 2024 Vitabae. All rights reserved.</p>
      <div class="footer-legal flex gap-6">
        <a href="#" class="text-sm text-neutral-500 hover:text-white">Privacy Policy</a>
        <a href="#" class="text-sm text-neutral-500 hover:text-white">Terms of Service</a>
        <a href="#" class="text-sm text-neutral-500 hover:text-white">Accessibility</a>
      </div>
    </div>
  </div>
</footer>
```

---

## Product Card Component (`src/components/product-card.html`)

```html
<!-- Shopify: snippets/product-card.liquid -->
<article class="product-card card card-elevated" data-product-id="{{ product.id }}">
  <a href="/pages/product.html?id={{ product.id }}" class="product-card-link">
    <div class="product-card-image">
      <img src="{{ product.image }}" alt="{{ product.title }}" loading="lazy">
      <!-- Badges -->
      <div class="product-badges absolute top-3 left-3 flex flex-col gap-2">
        <span class="badge badge-primary" x-show="product.isNew">New</span>
        <span class="badge badge-accent" x-show="product.isBestseller">Bestseller</span>
      </div>
    </div>

    <div class="card-body">
      <p class="product-category text-xs text-muted uppercase tracking-wider mb-1">{{ product.category }}</p>
      <h3 class="card-title">{{ product.title }}</h3>
      <p class="product-tagline text-sm text-muted mb-3">{{ product.tagline }}</p>

      <div class="product-pricing flex items-center gap-2">
        <span class="price font-semibold">{{ product.price }}</span>
        <span class="price-compare text-sm text-muted line-through" x-show="product.comparePrice">
          {{ product.comparePrice }}
        </span>
      </div>

      <!-- Quick Add -->
      <button class="btn btn-secondary btn-sm w-full mt-3" @click.prevent="addToCart(product)">
        Add to Cart
      </button>
    </div>
  </a>
</article>
```

---

## Collection Page Template (`src/pages/collection.html`)

```html
<!-- Collection Page -->
<main id="main-content">
  <!-- Collection Header -->
  <section class="collection-header section-sm bg-cream">
    <div class="container">
      <h1 class="text-3xl font-semibold mb-2">Shop All Products</h1>
      <p class="text-muted">Discover our full range of Ayurvedic supplements</p>
    </div>
  </section>

  <!-- Collection Content -->
  <section class="collection-content section">
    <div class="container">
      <div class="collection-layout flex flex-col lg:flex-row gap-8">
        <!-- Filters Sidebar -->
        <aside class="collection-filters w-full lg:w-64 flex-shrink-0" x-data="{ filtersOpen: false }">
          <button class="btn btn-secondary w-full lg:hidden mb-4" @click="filtersOpen = !filtersOpen">
            <i data-lucide="sliders"></i>
            Filters
          </button>

          <div class="filters-panel" :class="{ 'hidden lg:block': !filtersOpen }">
            <!-- Life Stage Filter -->
            <div class="filter-group mb-6">
              <h4 class="font-semibold mb-3">Life Stage</h4>
              <div class="space-y-2">
                <label class="form-check">
                  <input type="checkbox" class="form-check-input" value="women">
                  <span>Women's Health</span>
                </label>
                <label class="form-check">
                  <input type="checkbox" class="form-check-input" value="men">
                  <span>Men's Vitality</span>
                </label>
                <label class="form-check">
                  <input type="checkbox" class="form-check-input" value="family">
                  <span>Family Wellness</span>
                </label>
                <label class="form-check">
                  <input type="checkbox" class="form-check-input" value="active">
                  <span>Active Lifestyle</span>
                </label>
              </div>
            </div>

            <!-- Health Concern Filter -->
            <div class="filter-group mb-6">
              <h4 class="font-semibold mb-3">Health Concern</h4>
              <div class="space-y-2">
                <label class="form-check">
                  <input type="checkbox" class="form-check-input" value="stress">
                  <span>Stress & Anxiety</span>
                </label>
                <label class="form-check">
                  <input type="checkbox" class="form-check-input" value="energy">
                  <span>Energy & Vitality</span>
                </label>
                <label class="form-check">
                  <input type="checkbox" class="form-check-input" value="sleep">
                  <span>Sleep & Relaxation</span>
                </label>
                <label class="form-check">
                  <input type="checkbox" class="form-check-input" value="immunity">
                  <span>Immunity</span>
                </label>
                <label class="form-check">
                  <input type="checkbox" class="form-check-input" value="digestion">
                  <span>Digestion</span>
                </label>
              </div>
            </div>

            <!-- Format Filter -->
            <div class="filter-group">
              <h4 class="font-semibold mb-3">Format</h4>
              <div class="space-y-2">
                <label class="form-check">
                  <input type="checkbox" class="form-check-input" value="capsules">
                  <span>Capsules</span>
                </label>
                <label class="form-check">
                  <input type="checkbox" class="form-check-input" value="powder">
                  <span>Powder</span>
                </label>
                <label class="form-check">
                  <input type="checkbox" class="form-check-input" value="liquid">
                  <span>Liquid</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        <!-- Product Grid -->
        <div class="collection-products flex-1">
          <!-- Toolbar -->
          <div class="collection-toolbar flex justify-between items-center mb-6">
            <p class="text-sm text-muted"><span id="product-count">24</span> products</p>
            <select class="form-select form-input w-auto">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
              <option>Best Selling</option>
            </select>
          </div>

          <!-- Grid -->
          <div class="product-grid grid grid-cols-2 lg:grid-cols-3 gap-6" id="product-grid">
            <!-- Product cards rendered here -->
          </div>

          <!-- Pagination -->
          <nav class="pagination flex justify-center gap-2 mt-12">
            <button class="btn btn-ghost btn-sm" disabled>&larr; Previous</button>
            <button class="btn btn-primary btn-sm">1</button>
            <button class="btn btn-ghost btn-sm">2</button>
            <button class="btn btn-ghost btn-sm">3</button>
            <button class="btn btn-ghost btn-sm">Next &rarr;</button>
          </nav>
        </div>
      </div>
    </div>
  </section>
</main>
```

---

## Product Page Template (`src/pages/product.html`)

```html
<!-- Product Page -->
<main id="main-content" x-data="productPage()">
  <!-- Breadcrumb -->
  <nav class="breadcrumb section-sm bg-cream">
    <div class="container">
      <ol class="flex items-center gap-2 text-sm">
        <li><a href="/" class="text-muted hover:text-primary">Home</a></li>
        <li class="text-muted">/</li>
        <li><a href="/pages/collection.html" class="text-muted hover:text-primary">Shop</a></li>
        <li class="text-muted">/</li>
        <li class="text-primary">Ashwagandha KSM-66</li>
      </ol>
    </div>
  </nav>

  <!-- Product Hero -->
  <section class="product-hero section">
    <div class="container">
      <div class="product-layout grid lg:grid-cols-2 gap-12">
        <!-- Gallery -->
        <div class="product-gallery">
          <div class="gallery-main rounded-xl overflow-hidden bg-secondary-100 mb-4">
            <img :src="selectedImage" alt="Product image" class="w-full aspect-square object-contain p-8">
          </div>
          <div class="gallery-thumbs flex gap-3">
            <button
              class="gallery-thumb w-20 h-20 rounded-lg overflow-hidden border-2"
              :class="selectedImage === img ? 'border-primary-500' : 'border-transparent'"
              x-for="img in images"
              @click="selectedImage = img"
            >
              <img :src="img" alt="" class="w-full h-full object-cover">
            </button>
          </div>
        </div>

        <!-- Product Info -->
        <div class="product-info">
          <div class="product-badges flex gap-2 mb-4">
            <span class="badge badge-primary">Bestseller</span>
            <span class="badge badge-secondary">Vegan</span>
          </div>

          <h1 class="product-title text-3xl lg:text-4xl font-semibold mb-2">Ashwagandha KSM-66</h1>
          <p class="product-tagline text-lg text-muted mb-4">Adaptogenic Stress Support & Energy</p>

          <!-- Rating -->
          <div class="product-rating flex items-center gap-2 mb-6">
            <div class="stars flex text-accent-500">
              <i data-lucide="star" class="w-4 h-4 fill-current"></i>
              <i data-lucide="star" class="w-4 h-4 fill-current"></i>
              <i data-lucide="star" class="w-4 h-4 fill-current"></i>
              <i data-lucide="star" class="w-4 h-4 fill-current"></i>
              <i data-lucide="star" class="w-4 h-4 fill-current"></i>
            </div>
            <span class="text-sm text-muted">4.9 (1,247 reviews)</span>
          </div>

          <!-- Price -->
          <div class="product-price mb-6">
            <span class="text-3xl font-semibold">$34.99</span>
            <span class="text-muted text-sm ml-2">/ 60 capsules</span>
          </div>

          <!-- Variants -->
          <div class="product-variants mb-6">
            <h4 class="font-medium mb-3">Size</h4>
            <div class="variant-options flex gap-3">
              <button
                class="variant-btn px-4 py-2 border-2 rounded-lg"
                :class="selectedSize === '30' ? 'border-primary-500 bg-primary-50' : 'border-neutral-200'"
                @click="selectedSize = '30'"
              >
                30 Day <span class="text-sm text-muted">$19.99</span>
              </button>
              <button
                class="variant-btn px-4 py-2 border-2 rounded-lg"
                :class="selectedSize === '60' ? 'border-primary-500 bg-primary-50' : 'border-neutral-200'"
                @click="selectedSize = '60'"
              >
                60 Day <span class="text-sm text-muted">$34.99</span>
              </button>
              <button
                class="variant-btn px-4 py-2 border-2 rounded-lg"
                :class="selectedSize === '90' ? 'border-primary-500 bg-primary-50' : 'border-neutral-200'"
                @click="selectedSize = '90'"
              >
                90 Day <span class="text-sm text-muted">$49.99</span>
              </button>
            </div>
          </div>

          <!-- Subscribe Option -->
          <div class="subscribe-option mb-6 p-4 bg-cream rounded-xl">
            <label class="form-check">
              <input type="checkbox" class="form-check-input" x-model="subscribe">
              <span class="font-medium">Subscribe & Save 15%</span>
            </label>
            <p class="text-sm text-muted mt-1 ml-6">Free shipping, cancel anytime</p>
          </div>

          <!-- Add to Cart -->
          <div class="product-actions flex gap-4 mb-8">
            <div class="quantity-selector flex items-center border rounded-lg">
              <button class="px-3 py-2" @click="quantity > 1 && quantity--">-</button>
              <span class="px-4 py-2 border-x" x-text="quantity"></span>
              <button class="px-3 py-2" @click="quantity++">+</button>
            </div>
            <button class="btn btn-primary btn-lg flex-1">
              Add to Cart - <span x-text="'$' + totalPrice"></span>
            </button>
          </div>

          <!-- Trust Points -->
          <div class="trust-points grid grid-cols-2 gap-4 text-sm">
            <div class="flex items-center gap-2">
              <i data-lucide="truck" class="w-5 h-5 text-primary-600"></i>
              <span>Free shipping over $50</span>
            </div>
            <div class="flex items-center gap-2">
              <i data-lucide="shield-check" class="w-5 h-5 text-primary-600"></i>
              <span>Third-party tested</span>
            </div>
            <div class="flex items-center gap-2">
              <i data-lucide="rotate-ccw" class="w-5 h-5 text-primary-600"></i>
              <span>60-day guarantee</span>
            </div>
            <div class="flex items-center gap-2">
              <i data-lucide="leaf" class="w-5 h-5 text-primary-600"></i>
              <span>Sustainably sourced</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Product Tabs -->
  <section class="product-tabs section bg-cream">
    <div class="container">
      <div x-data="{ activeTab: 'benefits' }">
        <div class="tabs mb-0 border-b border-neutral-200">
          <button class="tab" :class="{ 'active': activeTab === 'benefits' }" @click="activeTab = 'benefits'">Benefits</button>
          <button class="tab" :class="{ 'active': activeTab === 'ingredients' }" @click="activeTab = 'ingredients'">Ingredients</button>
          <button class="tab" :class="{ 'active': activeTab === 'usage' }" @click="activeTab = 'usage'">How to Use</button>
          <button class="tab" :class="{ 'active': activeTab === 'faq' }" @click="activeTab = 'faq'">FAQ</button>
        </div>

        <div class="tab-content py-8">
          <!-- Benefits Tab -->
          <div class="tab-panel" x-show="activeTab === 'benefits'">
            <div class="grid md:grid-cols-2 gap-8">
              <div>
                <h3 class="text-xl font-semibold mb-4">Key Benefits</h3>
                <ul class="space-y-3">
                  <li class="flex gap-3">
                    <i data-lucide="check-circle" class="w-5 h-5 text-primary-600 flex-shrink-0"></i>
                    <span>Reduces cortisol and stress levels</span>
                  </li>
                  <li class="flex gap-3">
                    <i data-lucide="check-circle" class="w-5 h-5 text-primary-600 flex-shrink-0"></i>
                    <span>Supports healthy energy and stamina</span>
                  </li>
                  <li class="flex gap-3">
                    <i data-lucide="check-circle" class="w-5 h-5 text-primary-600 flex-shrink-0"></i>
                    <span>Promotes restful sleep quality</span>
                  </li>
                  <li class="flex gap-3">
                    <i data-lucide="check-circle" class="w-5 h-5 text-primary-600 flex-shrink-0"></i>
                    <span>Enhances cognitive function and focus</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-4">Clinical Research</h3>
                <p class="text-muted mb-4">
                  KSM-66 is backed by 24+ clinical studies demonstrating its efficacy for stress,
                  cognitive function, and overall well-being.
                </p>
                <a href="/pages/research.html?ingredient=ashwagandha" class="btn btn-secondary btn-sm">
                  View Research <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Ingredients Tab -->
          <div class="tab-panel" x-show="activeTab === 'ingredients'" style="display: none;">
            <h3 class="text-xl font-semibold mb-4">Supplement Facts</h3>
            <div class="supplement-facts bg-white p-6 rounded-xl max-w-md">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b-2 border-black">
                    <th class="text-left py-2">Amount Per Serving</th>
                    <th class="text-right py-2">% DV</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b">
                    <td class="py-2">Ashwagandha Root Extract (KSM-66)</td>
                    <td class="text-right">600mg</td>
                  </tr>
                  <tr class="border-b">
                    <td class="py-2 pl-4 text-muted">Withanolides (5%)</td>
                    <td class="text-right">30mg</td>
                  </tr>
                </tbody>
              </table>
              <p class="text-xs text-muted mt-4">
                Other ingredients: Vegetable cellulose capsule, organic rice hull concentrate.
              </p>
            </div>
          </div>

          <!-- Usage Tab -->
          <div class="tab-panel" x-show="activeTab === 'usage'" style="display: none;">
            <h3 class="text-xl font-semibold mb-4">Suggested Use</h3>
            <p class="mb-4">Take 1 capsule twice daily with food, or as directed by your healthcare provider.</p>
            <div class="bg-white p-4 rounded-xl">
              <h4 class="font-medium mb-2">Pro Tips:</h4>
              <ul class="space-y-2 text-sm text-muted">
                <li>• For stress support: Take in the morning and evening</li>
                <li>• For sleep: Take both capsules 1-2 hours before bed</li>
                <li>• Allow 4-6 weeks for full adaptogenic benefits</li>
              </ul>
            </div>
          </div>

          <!-- FAQ Tab -->
          <div class="tab-panel" x-show="activeTab === 'faq'" style="display: none;">
            <div class="accordion" x-data="{ open: null }">
              <div class="accordion-item">
                <button class="accordion-trigger" @click="open = open === 1 ? null : 1">
                  Is this product vegan?
                  <i data-lucide="chevron-down"></i>
                </button>
                <div class="accordion-content" x-show="open === 1" x-collapse>
                  Yes! Our Ashwagandha uses plant-based cellulose capsules and contains no animal products.
                </div>
              </div>
              <div class="accordion-item">
                <button class="accordion-trigger" @click="open = open === 2 ? null : 2">
                  Can I take this with other supplements?
                  <i data-lucide="chevron-down"></i>
                </button>
                <div class="accordion-content" x-show="open === 2" x-collapse>
                  Ashwagandha pairs well with most supplements. It's commonly taken with magnesium for enhanced relaxation benefits.
                </div>
              </div>
              <div class="accordion-item">
                <button class="accordion-trigger" @click="open = open === 3 ? null : 3">
                  What makes KSM-66 different?
                  <i data-lucide="chevron-down"></i>
                </button>
                <div class="accordion-content" x-show="open === 3" x-collapse>
                  KSM-66 is a full-spectrum root extract produced using a unique water-based extraction process, preserving the natural balance of compounds.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
```

---

## Deliverables Checklist

- [ ] `src/components/header.html`
- [ ] `src/components/footer.html`
- [ ] `src/components/product-card.html`
- [ ] `src/sections/hero.html`
- [ ] `src/sections/trust-badges.html`
- [ ] `src/sections/life-stages.html`
- [ ] `src/sections/quiz-cta.html`
- [ ] `src/sections/ingredient-map.html`
- [ ] `src/pages/index.html` (complete home page)
- [ ] `src/pages/collection.html`
- [ ] `src/pages/product.html`
- [ ] `src/pages/process.html`
- [ ] `src/pages/science.html`
- [ ] `src/pages/story.html`
- [ ] `src/pages/research.html`
- [ ] All pages responsive (mobile, tablet, desktop)
- [ ] All pages use design tokens consistently
- [ ] HTML validates (no errors)
- [ ] Semantic markup (proper heading hierarchy, landmarks)

---

## Shopify Migration Notes

Each section should map to Shopify sections:
- `data-section="hero"` → `sections/hero.liquid`
- `data-section="trust-badges"` → `sections/trust-badges.liquid`
- Components with `data-block` attributes → Shopify blocks within sections
- JSON data files → Shopify metafields or section settings
