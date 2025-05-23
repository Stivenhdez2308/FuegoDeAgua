import React from 'react';

export const models = {
  classic: (
    <ellipse cx="50" cy="80" rx="30" ry="40" fill="currentColor" />
  ),
  square: (
    <rect x="20" y="40" width="60" height="80" rx="10" fill="currentColor" />
  ),
  round: (
    <circle cx="50" cy="90" r="35" fill="currentColor" />
  ),
};

const PreviewCandle = ({ model, waxColor, containerColor, text }) => (
  <svg width="120" height="160" viewBox="0 0 100 160">
    {/* Recipiente */}
    <g color={containerColor}>
      {models[model]}
    </g>
    {/* Cera */}
    <ellipse cx="50" cy="90" rx="25" ry="30" fill={waxColor} />
    {/* Mecha */}
    <rect x="47" y="30" width="6" height="30" fill="#333" rx="2" />
    {/* Llama */}
    <ellipse cx="50" cy="28" rx="6" ry="10" fill="#FFD700" />
    {/* Texto */}
    {text && (
      <text x="50" y="140" textAnchor="middle" fontSize="10" fill="#333">{text}</text>
    )}
  </svg>
);

export default PreviewCandle; 