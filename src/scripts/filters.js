/**
 * Collection Filters
 * Product filtering and search functionality
 */

/**
 * Initialize collection filters
 * @param {Object} options - Configuration options
 */
export function initCollectionFilters(options = {}) {
  const {
    productsSelector = '.product-card',
    filterSelector = '[data-filter]',
    searchSelector = '[data-search]',
    sortSelector = '[data-sort]',
    noResultsMessage = 'No products match your criteria.',
    animationDuration = 300
  } = options;

  const products = document.querySelectorAll(productsSelector);
  const filters = document.querySelectorAll(filterSelector);
  const searchInput = document.querySelector(searchSelector);
  const sortSelect = document.querySelector(sortSelector);

  if (products.length === 0) return null;

  const state = {
    activeFilters: {
      lifeStage: [],
      ingredient: [],
      category: []
    },
    searchQuery: '',
    sortBy: 'featured'
  };

  // Get filter values from URL params
  function initFromURL() {
    const params = new URLSearchParams(window.location.search);

    if (params.has('stage')) {
      state.activeFilters.lifeStage = [params.get('stage')];
    }
    if (params.has('ingredient')) {
      state.activeFilters.ingredient = [params.get('ingredient')];
    }
    if (params.has('category')) {
      state.activeFilters.category = [params.get('category')];
    }
    if (params.has('q')) {
      state.searchQuery = params.get('q');
      if (searchInput) searchInput.value = state.searchQuery;
    }
    if (params.has('sort')) {
      state.sortBy = params.get('sort');
      if (sortSelect) sortSelect.value = state.sortBy;
    }

    // Update filter UI
    updateFilterUI();
    applyFilters();
  }

  // Update URL with current filters
  function updateURL() {
    const params = new URLSearchParams();

    if (state.activeFilters.lifeStage.length > 0) {
      params.set('stage', state.activeFilters.lifeStage[0]);
    }
    if (state.activeFilters.ingredient.length > 0) {
      params.set('ingredient', state.activeFilters.ingredient[0]);
    }
    if (state.activeFilters.category.length > 0) {
      params.set('category', state.activeFilters.category[0]);
    }
    if (state.searchQuery) {
      params.set('q', state.searchQuery);
    }
    if (state.sortBy !== 'featured') {
      params.set('sort', state.sortBy);
    }

    const newURL = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    window.history.replaceState({}, '', newURL);
  }

  // Update filter button states
  function updateFilterUI() {
    filters.forEach(filter => {
      const filterType = filter.dataset.filterType;
      const filterValue = filter.dataset.filter;

      if (filterType && filterValue) {
        const isActive = state.activeFilters[filterType]?.includes(filterValue);
        filter.classList.toggle('active', isActive);
        filter.setAttribute('aria-pressed', isActive);
      }
    });
  }

  // Apply filters to products
  function applyFilters() {
    let visibleCount = 0;

    products.forEach(product => {
      const productData = {
        lifeStages: (product.dataset.lifeStages || '').split(',').map(s => s.trim()),
        ingredients: (product.dataset.ingredients || '').split(',').map(s => s.trim()),
        categories: (product.dataset.categories || '').split(',').map(s => s.trim()),
        name: (product.dataset.name || product.querySelector('.product-card-title')?.textContent || '').toLowerCase(),
        description: (product.dataset.description || '').toLowerCase()
      };

      // Check each filter type
      const matchesLifeStage = state.activeFilters.lifeStage.length === 0 ||
        state.activeFilters.lifeStage.some(f => productData.lifeStages.includes(f));

      const matchesIngredient = state.activeFilters.ingredient.length === 0 ||
        state.activeFilters.ingredient.some(f => productData.ingredients.includes(f));

      const matchesCategory = state.activeFilters.category.length === 0 ||
        state.activeFilters.category.some(f => productData.categories.includes(f));

      // Check search query
      const matchesSearch = !state.searchQuery ||
        productData.name.includes(state.searchQuery.toLowerCase()) ||
        productData.description.includes(state.searchQuery.toLowerCase());

      // Determine visibility
      const isVisible = matchesLifeStage && matchesIngredient && matchesCategory && matchesSearch;

      if (isVisible) {
        product.style.display = '';
        product.classList.remove('filtered-out');
        visibleCount++;

        // Animate in
        setTimeout(() => {
          product.style.opacity = '1';
          product.style.transform = 'translateY(0)';
        }, 50);
      } else {
        product.classList.add('filtered-out');
        product.style.opacity = '0';
        product.style.transform = 'translateY(20px)';

        setTimeout(() => {
          if (product.classList.contains('filtered-out')) {
            product.style.display = 'none';
          }
        }, animationDuration);
      }
    });

    // Show/hide no results message
    updateNoResults(visibleCount);

    // Update count display
    updateResultCount(visibleCount);

    return visibleCount;
  }

  // Sort products
  function sortProducts() {
    const container = document.querySelector('.product-grid');
    if (!container) return;

    const productArray = Array.from(products);

    productArray.sort((a, b) => {
      switch (state.sortBy) {
        case 'name-asc':
          return (a.dataset.name || '').localeCompare(b.dataset.name || '');
        case 'name-desc':
          return (b.dataset.name || '').localeCompare(a.dataset.name || '');
        case 'price-asc':
          return parseFloat(a.dataset.price || 0) - parseFloat(b.dataset.price || 0);
        case 'price-desc':
          return parseFloat(b.dataset.price || 0) - parseFloat(a.dataset.price || 0);
        case 'newest':
          return (b.dataset.date || '').localeCompare(a.dataset.date || '');
        default: // 'featured'
          return (b.dataset.featured === 'true' ? 1 : 0) - (a.dataset.featured === 'true' ? 1 : 0);
      }
    });

    // Reorder DOM
    productArray.forEach(product => {
      container.appendChild(product);
    });
  }

  // Update no results message
  function updateNoResults(count) {
    let noResultsEl = document.querySelector('.no-results-message');

    if (count === 0) {
      if (!noResultsEl) {
        noResultsEl = document.createElement('div');
        noResultsEl.className = 'no-results-message';
        noResultsEl.innerHTML = `
          <div class="no-results-content">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
            <p>${noResultsMessage}</p>
            <button class="btn btn-secondary btn-sm" data-action="clear-filters">Clear Filters</button>
          </div>
        `;
        const grid = document.querySelector('.product-grid');
        if (grid) {
          grid.parentNode.insertBefore(noResultsEl, grid.nextSibling);
        }

        // Add clear filters handler
        noResultsEl.querySelector('[data-action="clear-filters"]')?.addEventListener('click', clearAllFilters);
      }
      noResultsEl.style.display = 'block';
    } else if (noResultsEl) {
      noResultsEl.style.display = 'none';
    }
  }

  // Update result count
  function updateResultCount(count) {
    const countEl = document.querySelector('.filter-result-count');
    if (countEl) {
      countEl.textContent = `${count} product${count !== 1 ? 's' : ''}`;
    }
  }

  // Clear all filters
  function clearAllFilters() {
    state.activeFilters = {
      lifeStage: [],
      ingredient: [],
      category: []
    };
    state.searchQuery = '';

    if (searchInput) searchInput.value = '';

    updateFilterUI();
    updateURL();
    applyFilters();
  }

  // Event listeners
  filters.forEach(filter => {
    filter.addEventListener('click', () => {
      const filterType = filter.dataset.filterType;
      const filterValue = filter.dataset.filter;

      if (!filterType || !filterValue) return;

      // Toggle filter
      const index = state.activeFilters[filterType]?.indexOf(filterValue);
      if (index > -1) {
        state.activeFilters[filterType].splice(index, 1);
      } else {
        // For single-select filters, replace; for multi-select, add
        if (filter.dataset.multiSelect === 'true') {
          state.activeFilters[filterType].push(filterValue);
        } else {
          state.activeFilters[filterType] = [filterValue];
        }
      }

      updateFilterUI();
      updateURL();
      applyFilters();
    });
  });

  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        state.searchQuery = e.target.value;
        updateURL();
        applyFilters();
      }, 300);
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      updateURL();
      sortProducts();
    });
  }

  // Initialize
  initFromURL();

  return {
    applyFilters,
    clearFilters: clearAllFilters,
    setFilter: (type, value) => {
      state.activeFilters[type] = Array.isArray(value) ? value : [value];
      updateFilterUI();
      updateURL();
      applyFilters();
    },
    getActiveFilters: () => ({ ...state.activeFilters }),
    getSearchQuery: () => state.searchQuery
  };
}

/**
 * Initialize quick filter chips
 * @param {string} containerId - Container ID
 */
export function initQuickFilters(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const chips = container.querySelectorAll('.filter-chip');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      // Toggle active state
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      // Dispatch filter event
      const filterValue = chip.dataset.value;
      const filterType = chip.dataset.type;

      container.dispatchEvent(new CustomEvent('filterchange', {
        detail: { type: filterType, value: filterValue }
      }));
    });
  });
}

/**
 * Initialize alphabet navigation for research library
 * @param {string} navSelector - Selector for alphabet nav
 * @param {string} itemSelector - Selector for items
 */
export function initAlphabetNav(navSelector, itemSelector) {
  const nav = document.querySelector(navSelector);
  const items = document.querySelectorAll(itemSelector);

  if (!nav || items.length === 0) return;

  // Get unique first letters
  const letters = new Set();
  items.forEach(item => {
    const name = item.dataset.name || item.textContent;
    if (name) {
      letters.add(name.charAt(0).toUpperCase());
    }
  });

  // Create alphabet buttons
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  nav.innerHTML = alphabet.map(letter => `
    <button
      class="alphabet-btn ${letters.has(letter) ? '' : 'disabled'}"
      data-letter="${letter}"
      ${letters.has(letter) ? '' : 'disabled'}
    >
      ${letter}
    </button>
  `).join('');

  // Handle clicks
  nav.addEventListener('click', (e) => {
    if (e.target.matches('.alphabet-btn:not(.disabled)')) {
      const letter = e.target.dataset.letter;

      // Update active state
      nav.querySelectorAll('.alphabet-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.letter === letter);
      });

      // Scroll to first matching item
      const target = Array.from(items).find(item => {
        const name = item.dataset.name || item.textContent;
        return name.charAt(0).toUpperCase() === letter;
      });

      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
}
