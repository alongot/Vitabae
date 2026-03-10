/**
 * Interactive India Ingredient Map
 * Uses Leaflet.js to display ingredient sourcing regions
 */

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom marker icon
const createMarkerIcon = (color = '#2d6b52') => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="marker-pin" style="background-color: ${color}">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="none">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      </div>
    `,
    iconSize: [40, 50],
    iconAnchor: [20, 50],
    popupAnchor: [0, -50]
  });
};

// Map configuration
const mapConfig = {
  center: [20.5937, 78.9629], // Center of India
  zoom: 5,
  minZoom: 4,
  maxZoom: 8,
  maxBounds: [
    [5, 65],   // Southwest
    [37, 100]  // Northeast
  ]
};

// Ingredient data with coordinates and botanical images
const ingredientRegions = [
  {
    id: 'kerala',
    name: 'Kerala',
    coordinates: [10.8505, 76.2711],
    ingredients: ['Ginger', 'Black Pepper'],
    description: 'Known as the "Spice Garden of India", Kerala\'s Western Ghats provide ideal conditions for ginger and pepper cultivation.',
    image: '/images/ilona-isha.jpg'
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    coordinates: [27.0238, 74.2179],
    ingredients: ['Ashwagandha'],
    description: 'The arid climate naturally stresses plants, producing ashwagandha with higher withanolide concentrations.',
    image: '/images/ilona-isha.jpg'
  },
  {
    id: 'tamil-nadu',
    name: 'Tamil Nadu',
    coordinates: [11.1271, 78.6569],
    ingredients: ['Turmeric'],
    description: 'The Erode district is known as the "Turmeric City", producing India\'s finest high-curcumin turmeric.',
    image: '/images/ilona-isha.jpg'
  },
  {
    id: 'andhra-pradesh',
    name: 'Andhra Pradesh',
    coordinates: [15.9129, 79.7400],
    ingredients: ['Moringa'],
    description: 'Warm climate and fertile soil create ideal conditions for nutrient-dense moringa cultivation.',
    image: '/images/ilona-isha.jpg'
  },
  {
    id: 'himalayas',
    name: 'Himalayan Foothills',
    coordinates: [30.0668, 79.0193],
    ingredients: ['Shatavari'],
    description: 'Pristine mountain environment produces wild-crafted herbs of exceptional quality.',
    image: '/images/ilona-isha.jpg'
  },
  {
    id: 'uttar-pradesh',
    name: 'Uttar Pradesh',
    coordinates: [26.8467, 80.9462],
    ingredients: ['Holy Basil (Tulsi)'],
    description: 'Traditional growing region for sacred tulsi, cultivated in temple gardens and family farms.',
    image: '/images/ilona-isha.jpg'
  }
];

/**
 * Initialize the ingredient map
 * @param {string} containerId - The ID of the container element
 * @param {Function} onRegionSelect - Callback when a region is selected
 */
export function initIngredientMap(containerId, onRegionSelect = null) {
  const container = document.getElementById(containerId);
  if (!container) return null;

  // Create map instance
  const map = L.map(containerId, {
    center: mapConfig.center,
    zoom: mapConfig.zoom,
    minZoom: mapConfig.minZoom,
    maxZoom: mapConfig.maxZoom,
    maxBounds: mapConfig.maxBounds,
    scrollWheelZoom: false,
    attributionControl: false
  });

  // Add tile layer (using a simple, elegant style)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  // Add custom attribution
  L.control.attribution({
    prefix: false,
    position: 'bottomright'
  }).addTo(map).addAttribution('Vitabae Sourcing Regions');

  // Track active marker
  let activeMarker = null;

  // Add markers for each region
  ingredientRegions.forEach(region => {
    const marker = L.marker(region.coordinates, {
      icon: createMarkerIcon()
    }).addTo(map);

    // Create popup content
    const popupContent = `
      <div class="map-popup">
        <div class="map-popup-image">
          <img src="${region.image}" alt="${region.name}" loading="lazy">
        </div>
        <div class="map-popup-content">
          <h3 class="map-popup-title">${region.name}</h3>
          <div class="map-popup-ingredients">
            ${region.ingredients.map(i => `<span class="map-popup-tag">${i}</span>`).join('')}
          </div>
          <p class="map-popup-description">${region.description}</p>
          <button class="map-popup-btn" data-region="${region.id}">Learn More</button>
        </div>
      </div>
    `;

    marker.bindPopup(popupContent, {
      maxWidth: 320,
      className: 'custom-popup'
    });

    // Handle marker click
    marker.on('click', () => {
      if (activeMarker) {
        activeMarker.setIcon(createMarkerIcon());
      }
      marker.setIcon(createMarkerIcon('#d4a853'));
      activeMarker = marker;
    });

    // Handle popup close
    marker.on('popupclose', () => {
      marker.setIcon(createMarkerIcon());
      activeMarker = null;
    });
  });

  // Handle "Learn More" button clicks in popups
  map.on('popupopen', (e) => {
    const btn = e.popup._contentNode.querySelector('.map-popup-btn');
    if (btn && onRegionSelect) {
      btn.addEventListener('click', () => {
        const regionId = btn.dataset.region;
        const region = ingredientRegions.find(r => r.id === regionId);
        if (region) {
          onRegionSelect(region);
        }
      });
    }
  });

  // Add zoom controls
  L.control.zoom({
    position: 'topright'
  }).addTo(map);

  return {
    map,
    focusRegion: (regionId) => {
      const region = ingredientRegions.find(r => r.id === regionId);
      if (region) {
        map.setView(region.coordinates, 7, { animate: true });
      }
    },
    resetView: () => {
      map.setView(mapConfig.center, mapConfig.zoom, { animate: true });
    }
  };
}

/**
 * Create a simple static map for smaller displays
 * @param {string} containerId - The ID of the container element
 */
export function initSimpleMap(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Create a simple SVG-based map for mobile/fallback
  container.innerHTML = `
    <div class="simple-map">
      <svg viewBox="0 0 400 450" class="simple-map-svg">
        <!-- Simplified India outline -->
        <path class="simple-map-outline" d="M180,50 Q250,45 280,60 L320,80 Q350,100 360,140 L370,200 Q375,250 360,300 L340,350 Q300,400 250,420 L200,430 Q150,425 120,400 L90,360 Q60,300 55,250 L50,180 Q55,120 80,80 L120,50 Q150,45 180,50 Z" fill="#f0efe9" stroke="#2d6b52" stroke-width="2"/>

        <!-- Region markers -->
        ${ingredientRegions.map((region, i) => {
          const x = 100 + (region.coordinates[1] - 70) * 4;
          const y = 450 - (region.coordinates[0] * 10);
          return `
            <g class="simple-map-marker" data-region="${region.id}">
              <circle cx="${x}" cy="${y}" r="12" fill="#2d6b52"/>
              <circle cx="${x}" cy="${y}" r="6" fill="white"/>
            </g>
          `;
        }).join('')}
      </svg>

      <div class="simple-map-legend">
        ${ingredientRegions.map(region => `
          <button class="simple-map-legend-item" data-region="${region.id}">
            <span class="simple-map-legend-dot"></span>
            <span class="simple-map-legend-name">${region.name}</span>
            <span class="simple-map-legend-ingredient">${region.ingredients[0]}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;

  // Add click handlers for legend items
  container.querySelectorAll('.simple-map-legend-item').forEach(item => {
    item.addEventListener('click', () => {
      const regionId = item.dataset.region;
      // Highlight the marker
      container.querySelectorAll('.simple-map-marker').forEach(marker => {
        marker.classList.remove('active');
      });
      const marker = container.querySelector(`.simple-map-marker[data-region="${regionId}"]`);
      if (marker) {
        marker.classList.add('active');
      }

      // Dispatch custom event
      container.dispatchEvent(new CustomEvent('regionselect', {
        detail: ingredientRegions.find(r => r.id === regionId)
      }));
    });
  });
}

// Export regions data for use elsewhere
export { ingredientRegions };
