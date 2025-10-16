import React from 'react';

// SVG: Full-page basketball with realistic lines
const BasketballFullBg = () => (
  <svg width="100%" height="100%" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }}>
    <g opacity="0.08">
      {/* Top curve */}
      <path d="M80 100 Q720 450 1360 100" stroke="#FFA726" strokeWidth="24" />
      {/* Bottom curve */}
      <path d="M80 800 Q720 450 1360 800" stroke="#FFA726" strokeWidth="24" />
      {/* Vertical line */}
      <line x1="720" y1="60" x2="720" y2="840" stroke="#FFA726" strokeWidth="18" />
      {/* Horizontal line (across middle) */}
      <line x1="120" y1="450" x2="1320" y2="450" stroke="#FFA726" strokeWidth="18" />
    </g>
  </svg>
);

export default BasketballFullBg;
