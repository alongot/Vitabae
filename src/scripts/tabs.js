/**
 * Tab Navigation Components
 * Accessible tabbed interfaces
 */

/**
 * Initialize tabs with ARIA support
 * @param {string} containerId - Container ID
 * @param {Object} options - Configuration options
 */
export function initTabs(containerId, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return null;

  const {
    tabSelector = '[role="tab"]',
    panelSelector = '[role="tabpanel"]',
    initialTab = 0,
    onChange = null
  } = options;

  const tabs = container.querySelectorAll(tabSelector);
  const panels = container.querySelectorAll(panelSelector);

  if (tabs.length === 0 || panels.length === 0) return null;

  let currentIndex = initialTab;

  function activateTab(index) {
    if (index < 0 || index >= tabs.length) return;

    // Deactivate all tabs
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', 'false');
      tab.setAttribute('tabindex', '-1');
      tab.classList.remove('active');
    });

    panels.forEach(panel => {
      panel.hidden = true;
      panel.classList.remove('active');
    });

    // Activate selected tab
    const selectedTab = tabs[index];
    const selectedPanel = panels[index];

    selectedTab.setAttribute('aria-selected', 'true');
    selectedTab.setAttribute('tabindex', '0');
    selectedTab.classList.add('active');

    selectedPanel.hidden = false;
    selectedPanel.classList.add('active');

    currentIndex = index;

    // Callback
    if (onChange) {
      onChange({
        index,
        tabId: selectedTab.id,
        panelId: selectedPanel.id
      });
    }
  }

  // Click handlers
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(index));
  });

  // Keyboard navigation
  container.addEventListener('keydown', (e) => {
    const isTab = e.target.matches(tabSelector);
    if (!isTab) return;

    let newIndex = currentIndex;

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = tabs.length - 1;
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        newIndex = currentIndex + 1;
        if (newIndex >= tabs.length) newIndex = 0;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    e.preventDefault();
    activateTab(newIndex);
    tabs[newIndex].focus();
  });

  // Initialize
  activateTab(initialTab);

  return {
    activateTab,
    getCurrentIndex: () => currentIndex,
    next: () => activateTab((currentIndex + 1) % tabs.length),
    prev: () => activateTab((currentIndex - 1 + tabs.length) % tabs.length)
  };
}

/**
 * Initialize accordion component
 * @param {string} containerId - Container ID
 * @param {Object} options - Configuration options
 */
export function initAccordion(containerId, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return null;

  const {
    itemSelector = '.accordion-item',
    triggerSelector = '.accordion-trigger',
    contentSelector = '.accordion-content',
    allowMultiple = false,
    initialOpen = null
  } = options;

  const items = container.querySelectorAll(itemSelector);

  function toggleItem(item, forceState = null) {
    const trigger = item.querySelector(triggerSelector);
    const content = item.querySelector(contentSelector);
    if (!trigger || !content) return;

    const isExpanded = forceState !== null
      ? forceState
      : trigger.getAttribute('aria-expanded') !== 'true';

    // Close others if not allowing multiple
    if (!allowMultiple && isExpanded) {
      items.forEach(otherItem => {
        if (otherItem !== item) {
          toggleItem(otherItem, false);
        }
      });
    }

    trigger.setAttribute('aria-expanded', isExpanded);
    content.hidden = !isExpanded;
    item.classList.toggle('expanded', isExpanded);

    // Animate
    if (isExpanded) {
      content.style.maxHeight = content.scrollHeight + 'px';
    } else {
      content.style.maxHeight = '0';
    }
  }

  // Click handlers
  items.forEach((item, index) => {
    const trigger = item.querySelector(triggerSelector);
    if (trigger) {
      trigger.addEventListener('click', () => toggleItem(item));

      // Initialize state
      if (index === initialOpen) {
        toggleItem(item, true);
      }
    }
  });

  // Keyboard navigation
  container.addEventListener('keydown', (e) => {
    if (!e.target.matches(triggerSelector)) return;

    const currentItem = e.target.closest(itemSelector);
    const itemArray = Array.from(items);
    const currentIndex = itemArray.indexOf(currentItem);

    let targetIndex;

    switch (e.key) {
      case 'ArrowDown':
        targetIndex = (currentIndex + 1) % items.length;
        break;
      case 'ArrowUp':
        targetIndex = (currentIndex - 1 + items.length) % items.length;
        break;
      case 'Home':
        targetIndex = 0;
        break;
      case 'End':
        targetIndex = items.length - 1;
        break;
      default:
        return;
    }

    e.preventDefault();
    items[targetIndex].querySelector(triggerSelector)?.focus();
  });

  return {
    toggle: (index) => {
      if (items[index]) toggleItem(items[index]);
    },
    openAll: () => items.forEach(item => toggleItem(item, true)),
    closeAll: () => items.forEach(item => toggleItem(item, false))
  };
}

/**
 * Initialize toggle/switch component
 * @param {string} selector - Selector for toggle elements
 */
export function initToggles(selector = '[data-toggle]') {
  const toggles = document.querySelectorAll(selector);

  toggles.forEach(toggle => {
    const target = document.getElementById(toggle.dataset.toggle);
    if (!target) return;

    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !isExpanded);
      target.hidden = isExpanded;
      target.classList.toggle('show', !isExpanded);
    });
  });
}

/**
 * Initialize content reveal on scroll
 * @param {string} selector - Selector for elements to reveal
 */
export function initScrollReveal(selector = '[data-reveal]') {
  const elements = document.querySelectorAll(selector);

  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => {
    el.classList.add('reveal-hidden');
    observer.observe(el);
  });
}
