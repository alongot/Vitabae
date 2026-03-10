import React, { memo } from 'react';
import indiaMap from '@svg-maps/india';

/**
 * Real India map using @svg-maps/india with accurate pin positions.
 * Pins are placed at real state centers based on actual SVG path data.
 */

// Accurate positions within the SVG viewBox (0 0 612 696)
// Calculated from actual state path bounding boxes
const ingredientPositions = {
  'Ashwagandha': { x: 148, y: 225 },    // Rajasthan (center of state)
  'Amla':        { x: 270, y: 210 },     // Uttar Pradesh
  'Ginger':      { x: 163, y: 585 },     // Kerala
  'Moringa':     { x: 245, y: 490 },     // Andhra Pradesh
  'Shatavari':   { x: 248, y: 155 },     // Uttarakhand (Himalayas)
  'Garlic':      { x: 265, y: 310 },     // Madhya Pradesh
  'Cinnamon':    { x: 155, y: 570 },     // Kerala (south)
  'Licorice':    { x: 85, y: 340 },      // Gujarat
  'Giloy':       { x: 175, y: 420 },     // Maharashtra
  'Fennel':      { x: 95, y: 300 },      // Gujarat (north)
  'Fenugreek':   { x: 135, y: 205 },     // Rajasthan (east)
  'Lentil':      { x: 290, y: 290 },     // Madhya Pradesh (east)
};

// Map ingredient to state ID for highlighting
const ingredientStates = {
  'Ashwagandha': 'rj',
  'Amla': 'up',
  'Ginger': 'kl',
  'Moringa': 'ap',
  'Shatavari': 'ut',
  'Garlic': 'mp',
  'Cinnamon': 'kl',
  'Licorice': 'gj',
  'Giloy': 'mh',
  'Fennel': 'gj',
  'Fenugreek': 'rj',
  'Lentil': 'mp',
};

function IndiaMap({ ingredients, activeIngredient, onPinClick, onPinHover }) {
  const activeState = activeIngredient !== null
    ? ingredientStates[ingredients[activeIngredient]?.name]
    : null;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={indiaMap.viewBox}
      className="w-full h-full"
      aria-label={indiaMap.label}
    >
      {/* All Indian states */}
      {indiaMap.locations.map((location) => {
        const isHighlighted = location.id === activeState;
        return (
          <path
            key={location.id}
            d={location.path}
            fill={isHighlighted ? '#d4ddd0' : '#e8ece5'}
            stroke="#c8d1c4"
            strokeWidth="0.6"
            strokeLinejoin="round"
            style={{ transition: 'fill 0.3s ease' }}
            onMouseEnter={(e) => { if (!isHighlighted) e.target.style.fill = '#dce3d8'; }}
            onMouseLeave={(e) => { if (!isHighlighted) e.target.style.fill = '#e8ece5'; }}
          >
            <title>{location.name}</title>
          </path>
        );
      })}

      {/* Ingredient Pins */}
      {ingredients.map((ing, i) => {
        const pos = ingredientPositions[ing.name];
        if (!pos) return null;
        const isActive = activeIngredient === i;

        return (
          <g
            key={ing.name}
            style={{ cursor: 'pointer' }}
            onClick={() => onPinClick(i)}
            onMouseEnter={() => onPinHover && onPinHover(i)}
            onMouseLeave={() => onPinHover && onPinHover(null)}
          >
            {/* Animated pulse */}
            {isActive && (
              <circle cx={pos.x} cy={pos.y} r="6" fill="none" stroke={ing.color} strokeWidth="1.5" opacity="0.5">
                <animate attributeName="r" from="6" to="22" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite" />
              </circle>
            )}

            {/* Glow */}
            <circle
              cx={pos.x} cy={pos.y}
              r={isActive ? 9 : 6}
              fill={isActive ? `${ing.color}30` : 'rgba(30,42,58,0.06)'}
              style={{ transition: 'all 0.3s ease' }}
            />

            {/* Pin */}
            <circle
              cx={pos.x} cy={pos.y}
              r={isActive ? 5.5 : 3.5}
              fill={isActive ? ing.color : '#1E2A3A'}
              stroke="#FAFAF8"
              strokeWidth={isActive ? 1.5 : 0.6}
              style={{
                transition: 'all 0.3s ease',
                filter: isActive ? `drop-shadow(0 0 6px ${ing.color})` : 'none',
              }}
            />

            {/* Label */}
            {isActive && (
              <g>
                <rect
                  x={pos.x + 12}
                  y={pos.y - 12}
                  width={ing.name.length * 6.5 + 14}
                  height={20}
                  rx={4}
                  fill="white"
                  style={{ filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.2))' }}
                />
                <text
                  x={pos.x + 19}
                  y={pos.y + 2}
                  style={{
                    fontSize: '9px',
                    fontWeight: 600,
                    fill: '#1E2A3A',
                    fontFamily: '"DM Sans", sans-serif',
                  }}
                >
                  {ing.name}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export default memo(IndiaMap);
