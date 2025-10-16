import React from 'react';

// SVG basketball with grooves, faded style
const BasketballBg = () => (
  <svg width="320" height="320" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', opacity: 0.08 }}>
    <circle cx="160" cy="160" r="150" fill="#FFA726" />
    <path d="M160 10 A150 150 0 0 1 160 310" stroke="#FF9900" strokeWidth="8" />
    <path d="M10 160 A150 150 0 0 1 310 160" stroke="#FF9900" strokeWidth="8" />
    <path d="M60 60 Q160 160 260 60" stroke="#FF9900" strokeWidth="4" />
    <path d="M60 260 Q160 160 260 260" stroke="#FF9900" strokeWidth="4" />
  </svg>
);

export default BasketballBg;
