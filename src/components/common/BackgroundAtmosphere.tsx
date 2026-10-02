import React from 'react';

/**
 * BackgroundAtmosphere
 * 
 * Multi-layered, atmospheric technology environment for LOGIQ:
 * - Base: Midnight Blue (#080C15) dominant foundation.
 * - Deep multi-zone ambient gradients (deep indigo, plum, restrained blush pink).
 * - Hairline geometric grids, subtle coordinate ticks, circuit-like conduits, and faint neural vectors.
 * - Central vignette keeping the reading zone calm and high-contrast.
 * - Subtle, slow ambient breathing (28s cycle) without distraction.
 */
export const BackgroundAtmosphere: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden bg-[#080C15]"
    >
      {/* 1. Primary Deep Multi-Zone Radial Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_85%_10%,rgba(229,152,172,0.18)_0%,rgba(126,41,72,0.14)_30%,rgba(27,18,38,0.45)_55%,transparent_75%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_10%_90%,rgba(24,36,66,0.5)_0%,rgba(15,22,42,0.35)_40%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_35%,rgba(8,12,21,0.8)_85%,#080C15_100%)]" />

      {/* 2. Soft Ambient Breathing Glows */}
      <div className="ambient-nebula-top" />
      <div className="ambient-nebula-bottom" />
      <div className="ambient-lateral-glow" />

      {/* 3. Hairline Geometric Grid & Topographic Coordinates (Faint Vector Overlay) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40 mix-blend-screen"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle 80px technical coordinate grid */}
          <pattern id="techGrid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="rgba(245, 202, 214, 0.035)"
              strokeWidth="0.75"
            />
            {/* Small crosshair tick at grid intersections */}
            <path
              d="M 0 4 L 0 -4 M -4 0 L 4 0"
              stroke="rgba(245, 202, 214, 0.08)"
              strokeWidth="0.8"
            />
          </pattern>

          {/* Mask to keep center content area calm */}
          <radialGradient id="centerFadeMask" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.1" />
            <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.9" />
          </radialGradient>
          <mask id="gridVignetteMask">
            <rect width="100%" height="100%" fill="url(#centerFadeMask)" />
          </mask>

          {/* Gradient for circuit conduits */}
          <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#E598AC" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#7E2948" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Masked Grid */}
        <rect width="100%" height="100%" fill="url(#techGrid)" mask="url(#gridVignetteMask)" />

        {/* 4. Peripheral Technology Traces & Circuit-Like Paths */}
        {/* Top-Right Circuit Cluster */}
        <g stroke="url(#circuitGrad)" strokeWidth="0.8" fill="none">
          <path d="M 900 40 L 1150 40 L 1220 110 L 1400 110" />
          <path d="M 1150 40 L 1180 10 L 1320 10" />
          <circle cx="1220" cy="110" r="2" fill="rgba(229,152,172,0.3)" />
          <circle cx="1400" cy="110" r="1.5" fill="rgba(229,152,172,0.2)" />
          <circle cx="1180" cy="10" r="1.5" fill="rgba(56,189,248,0.25)" />
        </g>

        {/* Bottom-Left Circuit Cluster */}
        <g stroke="url(#circuitGrad)" strokeWidth="0.8" fill="none">
          <path d="M 80 820 L 220 820 L 300 740 L 480 740" />
          <path d="M 220 820 L 260 860 L 380 860" />
          <circle cx="300" cy="740" r="2" fill="rgba(229,152,172,0.25)" />
          <circle cx="260" cy="860" r="1.5" fill="rgba(56,189,248,0.2)" />
        </g>

        {/* Very Faint Neural-Network Constellation Vectors (Upper-Left Periphery) */}
        <g stroke="rgba(245,202,214,0.06)" strokeWidth="0.6" fill="none">
          <line x1="80" y1="120" x2="160" y2="160" />
          <line x1="160" y1="160" x2="220" y2="110" />
          <line x1="160" y1="160" x2="190" y2="230" />
          <circle cx="80" cy="120" r="2" fill="rgba(245,202,214,0.12)" />
          <circle cx="160" cy="160" r="2.5" fill="rgba(229,152,172,0.18)" />
          <circle cx="220" cy="110" r="1.5" fill="rgba(56,189,248,0.14)" />
          <circle cx="190" cy="230" r="1.5" fill="rgba(245,202,214,0.12)" />
        </g>

        {/* Coordinate Label Accents in Faint Monospace */}
        <text x="45" y="65" fill="rgba(255,255,255,0.08)" fontSize="8" fontFamily="monospace">
          SYS_LAT::42.08°N 71.02°W
        </text>
        <text x="45" y="78" fill="rgba(229,152,172,0.09)" fontSize="7" fontFamily="monospace">
          TENSOR_FRAMEWORK::v1.0.4
        </text>
      </svg>

      {/* 5. Subtle Vignette Border Rim (Enhances Screen Frame Depth) */}
      <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.65)] pointer-events-none" />
    </div>
  );
};
