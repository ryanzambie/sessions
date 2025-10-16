import React from 'react';

// SVG basketball lines background, faded and abstract
const BasketballLinesBg = () => (
  <svg width="100%" height="100%" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }}>
    <g opacity="0.07">
      <circle cx="400" cy="300" r="220" stroke="#FFA726" strokeWidth="18" />
      <circle cx="1200" cy="700" r="180" stroke="#FFA726" strokeWidth="14" />
      <path d="M180 0 Q720 450 1260 0" stroke="#FFA726" strokeWidth="10" />
      <path d="M0 800 Q720 450 1440 800" stroke="#FFA726" strokeWidth="10" />
      <path d="M400 80 Q720 450 1040 80" stroke="#FFA726" strokeWidth="6" />
      <path d="M400 820 Q720 450 1040 820" stroke="#FFA726" strokeWidth="6" />
      <path d="M720 0 L720 900" stroke="#FFA726" strokeWidth="8" />
    </g>
  </svg>
);

export default BasketballLinesBg;
