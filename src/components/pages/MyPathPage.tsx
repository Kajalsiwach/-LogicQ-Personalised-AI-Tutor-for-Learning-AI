import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { generateCurriculumRoadmap } from '../../data/aimlConcepts';
import {
  CheckCircle2,
  PlayCircle,
  Lock,
  ArrowRight,
  Clock,
  BookOpen,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  Activity,
  Binary,
  Compass,
  Zap,
  Quote as QuoteIcon,
  Check,
} from 'lucide-react';

/* =========================================================================
   Pedagogical Concept Visual Diagrams (Crisp, High-Precision SVGs)
   ========================================================================= */

// 1. Supervised 2D Feature Space & Decision Boundary Hyperplane
const ClassificationBoundaryDiagram: React.FC = () => (
  <div className="w-full bg-[#080C16] rounded-2xl p-4 border border-white/[0.08] relative overflow-hidden">
    <div className="flex items-center justify-between text-[11px] font-ui text-slate-400 mb-2">
      <span className="font-semibold text-slate-300">2D Feature Space Mapping</span>
      <span className="font-mono text-[10px] text-[#F5CAD6]">wᵀx + b = 0</span>
    </div>

    <svg viewBox="0 0 320 180" className="w-full h-auto max-h-48 select-none">
      <defs>
        <linearGradient id="boundaryGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7E2948" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#E598AC" stopOpacity="1" />
          <stop offset="100%" stopColor="#F5CAD6" stopOpacity="0.7" />
        </linearGradient>
        <radialGradient id="regionClass0" cx="25%" cy="80%" r="60%">
          <stop offset="0%" stopColor="#1E293B" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#0B101E" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="regionClass1" cx="80%" cy="25%" r="60%">
          <stop offset="0%" stopColor="#4A1E2E" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0B101E" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background Regions */}
      <rect x="0" y="0" width="320" height="180" fill="#090E1A" rx="8" />
      <rect x="0" y="0" width="320" height="180" fill="url(#regionClass0)" />
      <rect x="0" y="0" width="320" height="180" fill="url(#regionClass1)" />

      {/* Grid Lines */}
      <line x1="40" y1="20" x2="40" y2="155" stroke="#1E293B" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="120" y1="20" x2="120" y2="155" stroke="#1E293B" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="200" y1="20" x2="200" y2="155" stroke="#1E293B" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="280" y1="20" x2="280" y2="155" stroke="#1E293B" strokeWidth="1" strokeDasharray="3 3" />

      <line x1="30" y1="40" x2="295" y2="40" stroke="#1E293B" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="30" y1="90" x2="295" y2="90" stroke="#1E293B" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="30" y1="140" x2="295" y2="140" stroke="#1E293B" strokeWidth="1" strokeDasharray="3 3" />

      {/* Coordinate Axes */}
      <line x1="35" y1="155" x2="300" y2="155" stroke="#334155" strokeWidth="1.5" />
      <line x1="35" y1="20" x2="35" y2="155" stroke="#334155" strokeWidth="1.5" />
      <text x="300" y="168" fill="#64748B" fontSize="9" fontFamily="Inter" textAnchor="end">Feature x₁</text>
      <text x="30" y="15" fill="#64748B" fontSize="9" fontFamily="Inter">Feature x₂</text>

      {/* Margin Bounds (dashed) */}
      <line x1="20" y1="175" x2="270" y2="15" stroke="#E598AC" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.35" />
      <line x1="60" y1="180" x2="310" y2="20" stroke="#E598AC" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.35" />

      {/* Optimal Decision Boundary Hyperplane */}
      <line x1="40" y1="180" x2="290" y2="18" stroke="url(#boundaryGrad)" strokeWidth="2.5" />

      {/* Weight Vector Normal arrow w */}
      <line x1="165" y1="99" x2="195" y2="60" stroke="#F5CAD6" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <circle cx="165" cy="99" r="2.5" fill="#F5CAD6" />
      <text x="202" y="58" fill="#F5CAD6" fontSize="9" fontWeight="bold" fontFamily="Inter">w⃗ (normal)</text>

      {/* Class 0 Datapoints (Lower Region - Slate Blue Circles) */}
      <circle cx="65" cy="125" r="4.5" fill="#38BDF8" fillOpacity="0.85" stroke="#0284C7" strokeWidth="1" />
      <circle cx="85" cy="140" r="4" fill="#38BDF8" fillOpacity="0.85" stroke="#0284C7" strokeWidth="1" />
      <circle cx="110" cy="115" r="5" fill="#38BDF8" fillOpacity="0.85" stroke="#0284C7" strokeWidth="1" />
      <circle cx="130" cy="135" r="4" fill="#38BDF8" fillOpacity="0.85" stroke="#0284C7" strokeWidth="1" />
      <circle cx="75" cy="95" r="4.5" fill="#38BDF8" fillOpacity="0.85" stroke="#0284C7" strokeWidth="1" />
      <circle cx="100" cy="148" r="3.5" fill="#38BDF8" fillOpacity="0.85" stroke="#0284C7" strokeWidth="1" />

      {/* Class 1 Datapoints (Upper Region - Blush Pink Diamonds/Circles) */}
      <circle cx="170" cy="55" r="5" fill="#F472B6" fillOpacity="0.9" stroke="#DB2777" strokeWidth="1" />
      <circle cx="210" cy="40" r="4.5" fill="#F472B6" fillOpacity="0.9" stroke="#DB2777" strokeWidth="1" />
      <circle cx="235" cy="65" r="4.5" fill="#F472B6" fillOpacity="0.9" stroke="#DB2777" strokeWidth="1" />
      <circle cx="195" cy="80" r="4" fill="#F472B6" fillOpacity="0.9" stroke="#DB2777" strokeWidth="1" />
      <circle cx="260" cy="45" r="5" fill="#F472B6" fillOpacity="0.9" stroke="#DB2777" strokeWidth="1" />
      <circle cx="240" cy="95" r="4" fill="#F472B6" fillOpacity="0.9" stroke="#DB2777" strokeWidth="1" />

      {/* Legend Badge */}
      <rect x="180" y="145" width="125" height="22" rx="6" fill="#0C101D" fillOpacity="0.9" stroke="#334155" strokeWidth="0.8" />
      <circle cx="192" cy="156" r="3" fill="#38BDF8" />
      <text x="200" y="159" fill="#94A3B8" fontSize="8" fontFamily="Inter">y = 0</text>
      <circle cx="232" cy="156" r="3" fill="#F472B6" />
      <text x="240" y="159" fill="#94A3B8" fontSize="8" fontFamily="Inter">y = 1</text>
      <line x1="265" y1="156" x2="278" y2="156" stroke="#E598AC" strokeWidth="1.5" />
      <text x="283" y="159" fill="#94A3B8" fontSize="8" fontFamily="Inter">wᵀx+b</text>
    </svg>
    <div className="mt-2 text-[11px] font-ui text-slate-400 text-center">
      Boundary divides feature space where predicted probability{' '}
      <span className="font-mono text-[#F5CAD6]">P(y=1|x) = 0.50</span>
    </div>
  </div>
);

// 2. Neural Computational Graph & Backpropagation Flow
const NeuralBackpropDiagram: React.FC = () => (
  <div className="w-full bg-[#080C16] rounded-2xl p-4 border border-white/[0.08] relative overflow-hidden">
    <div className="flex items-center justify-between text-[11px] font-ui text-slate-400 mb-2">
      <span className="font-semibold text-slate-300">Multi-Layer Computational Graph</span>
      <span className="font-mono text-[10px] text-[#F5CAD6]">
        {"δ^{[l]} = (W^{[l+1]T}δ^{[l+1]}) ⊙ σ'(z^{[l]})"}
      </span>
    </div>

    <svg viewBox="0 0 320 160" className="w-full h-auto max-h-44 select-none">
      {/* Input Nodes x1, x2, x3 */}
      <g>
        <circle cx="45" cy="40" r="12" fill="#151E32" stroke="#38BDF8" strokeWidth="1.5" />
        <text x="45" y="44" fill="#E2E8F0" fontSize="9" fontFamily="Inter" textAnchor="middle">x₁</text>

        <circle cx="45" cy="80" r="12" fill="#151E32" stroke="#38BDF8" strokeWidth="1.5" />
        <text x="45" y="84" fill="#E2E8F0" fontSize="9" fontFamily="Inter" textAnchor="middle">x₂</text>

        <circle cx="45" cy="120" r="12" fill="#151E32" stroke="#38BDF8" strokeWidth="1.5" />
        <text x="45" y="124" fill="#E2E8F0" fontSize="9" fontFamily="Inter" textAnchor="middle">x₃</text>
      </g>

      {/* Hidden Nodes h1, h2, h3, h4 */}
      <g>
        <circle cx="160" cy="30" r="12" fill="#251624" stroke="#E598AC" strokeWidth="1.5" />
        <text x="160" y="34" fill="#FCE7F3" fontSize="9" fontFamily="Inter" textAnchor="middle">h₁</text>

        <circle cx="160" cy="65" r="12" fill="#251624" stroke="#E598AC" strokeWidth="1.5" />
        <text x="160" y="69" fill="#FCE7F3" fontSize="9" fontFamily="Inter" textAnchor="middle">h₂</text>

        <circle cx="160" cy="95" r="12" fill="#251624" stroke="#E598AC" strokeWidth="1.5" />
        <text x="160" y="99" fill="#FCE7F3" fontSize="9" fontFamily="Inter" textAnchor="middle">h₃</text>

        <circle cx="160" cy="130" r="12" fill="#251624" stroke="#E598AC" strokeWidth="1.5" />
        <text x="160" y="134" fill="#FCE7F3" fontSize="9" fontFamily="Inter" textAnchor="middle">h₄</text>
      </g>

      {/* Output Node y_hat */}
      <g>
        <circle cx="275" cy="80" r="14" fill="#3D1A2B" stroke="#F5CAD6" strokeWidth="2" />
        <text x="275" y="84" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="Inter" textAnchor="middle">ŷ</text>
      </g>

      {/* Forward Pass Connections */}
      <g stroke="#334155" strokeWidth="1" strokeOpacity="0.6">
        <line x1="57" y1="40" x2="148" y2="30" />
        <line x1="57" y1="40" x2="148" y2="65" />
        <line x1="57" y1="40" x2="148" y2="95" />

        <line x1="57" y1="80" x2="148" y2="30" />
        <line x1="57" y1="80" x2="148" y2="65" />
        <line x1="57" y1="80" x2="148" y2="95" />
        <line x1="57" y1="80" x2="148" y2="130" />

        <line x1="57" y1="120" x2="148" y2="65" />
        <line x1="57" y1="120" x2="148" y2="95" />
        <line x1="57" y1="120" x2="148" y2="130" />

        <line x1="172" y1="30" x2="261" y2="80" />
        <line x1="172" y1="65" x2="261" y2="80" />
        <line x1="172" y1="95" x2="261" y2="80" />
        <line x1="172" y1="130" x2="261" y2="80" />
      </g>

      {/* Reverse Backprop Gradient Flow Highlight (Curved pink dashed vector) */}
      <path
        d="M 261 74 C 220 50, 200 45, 175 35"
        fill="none"
        stroke="#F472B6"
        strokeWidth="2"
        strokeDasharray="4 2"
      />
      <path
        d="M 148 68 C 110 70, 90 75, 59 78"
        fill="none"
        stroke="#F472B6"
        strokeWidth="2"
        strokeDasharray="4 2"
      />

      {/* Annotation Flow Badges */}
      <text x="100" y="20" fill="#38BDF8" fontSize="8" fontFamily="Inter">
        {"Forward: a^{[l]} = σ(z)"}
      </text>
      <text x="210" y="45" fill="#F472B6" fontSize="8" fontFamily="Inter" fontWeight="bold">∂L/∂W Gradient</text>
    </svg>
    <div className="mt-2 text-[11px] font-ui text-slate-400 text-center">
      Dynamic programming cache computes exact parameter gradients with linear complexity{' '}
      <span className="font-mono text-[#F5CAD6]">O(|E|)</span>
    </div>
  </div>
);

// 3. Scaled Dot-Product Attention Heatmap & Flow
const AttentionMatrixDiagram: React.FC = () => (
  <div className="w-full bg-[#080C16] rounded-2xl p-4 border border-white/[0.08] relative overflow-hidden">
    <div className="flex items-center justify-between text-[11px] font-ui text-slate-400 mb-2">
      <span className="font-semibold text-slate-300">Scaled Dot-Product Attention Map</span>
      <span className="font-mono text-[10px] text-[#F5CAD6]">softmax(QKᵀ / √dₖ) V</span>
    </div>

    <div className="grid grid-cols-2 gap-3 items-center">
      {/* 4x4 Attention Weight Heatmap */}
      <div className="bg-[#0C111F] p-2.5 rounded-xl border border-white/5">
        <div className="text-[10px] font-mono text-slate-400 mb-1.5 flex justify-between">
          <span>Tokens</span>
          <span className="text-[#E598AC]">Softmax Weights</span>
        </div>
        <div className="grid grid-cols-4 gap-1 text-[9px] font-mono text-center">
          <div className="bg-[#7E2948]/70 text-white p-1 rounded font-bold">0.82</div>
          <div className="bg-[#7E2948]/20 text-slate-300 p-1 rounded">0.08</div>
          <div className="bg-[#7E2948]/15 text-slate-400 p-1 rounded">0.06</div>
          <div className="bg-[#7E2948]/10 text-slate-500 p-1 rounded">0.04</div>

          <div className="bg-[#7E2948]/25 text-slate-300 p-1 rounded">0.12</div>
          <div className="bg-[#7E2948]/80 text-white p-1 rounded font-bold">0.68</div>
          <div className="bg-[#7E2948]/25 text-slate-300 p-1 rounded">0.14</div>
          <div className="bg-[#7E2948]/15 text-slate-400 p-1 rounded">0.06</div>

          <div className="bg-[#7E2948]/15 text-slate-400 p-1 rounded">0.05</div>
          <div className="bg-[#7E2948]/30 text-slate-300 p-1 rounded">0.22</div>
          <div className="bg-[#7E2948]/75 text-white p-1 rounded font-bold">0.65</div>
          <div className="bg-[#7E2948]/15 text-slate-400 p-1 rounded">0.08</div>

          <div className="bg-[#7E2948]/10 text-slate-500 p-1 rounded">0.03</div>
          <div className="bg-[#7E2948]/15 text-slate-400 p-1 rounded">0.07</div>
          <div className="bg-[#7E2948]/25 text-slate-300 p-1 rounded">0.18</div>
          <div className="bg-[#7E2948]/85 text-white p-1 rounded font-bold">0.72</div>
        </div>
        <div className="flex justify-between text-[8px] font-mono text-slate-500 mt-1">
          <span>&quot;The&quot;</span>
          <span>&quot;bank&quot;</span>
          <span>&quot;of&quot;</span>
          <span>&quot;river&quot;</span>
        </div>
      </div>

      {/* Projection Flow Architecture */}
      <div className="space-y-1.5 text-xs font-ui">
        <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
          <span className="text-slate-300 font-medium">Query (Q)</span>
          <span className="text-[10px] font-mono text-slate-400">&quot;What am I looking for?&quot;</span>
        </div>
        <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
          <span className="text-slate-300 font-medium">Key (K)</span>
          <span className="text-[10px] font-mono text-slate-400">&quot;What identity do I offer?&quot;</span>
        </div>
        <div className="p-2 rounded-xl bg-[#FAF0F4]/10 border border-[#F5CAD6]/20 flex items-center justify-between">
          <span className="text-[#F5CAD6] font-semibold">Value (V)</span>
          <span className="text-[10px] font-mono text-rose-200">&quot;The actual information pooled&quot;</span>
        </div>
      </div>
    </div>

    <div className="mt-2 text-[11px] font-ui text-slate-400 text-center">
      Scaling factor <span className="font-mono text-[#F5CAD6]">1 / √dₖ</span> prevents dot-products from saturating the softmax in high dimensions.
    </div>
  </div>
);

// 4. Gradient Optimization Loss Contour
const LossLandscapeDiagram: React.FC = () => (
  <div className="w-full bg-[#080C16] rounded-2xl p-4 border border-white/[0.08] relative overflow-hidden">
    <div className="flex items-center justify-between text-[11px] font-ui text-slate-400 mb-2">
      <span className="font-semibold text-slate-300">Convex Loss Contour & Optimizer Step</span>
      <span className="font-mono text-[10px] text-[#F5CAD6]">
        {"θ_t = θ_{t-1} - η ∇L(θ)"}
      </span>
    </div>

    <svg viewBox="0 0 320 150" className="w-full h-auto max-h-40 select-none">
      {/* Concentric Ellipses (Loss Contours) */}
      <ellipse cx="160" cy="75" rx="140" ry="60" fill="none" stroke="#1E293B" strokeWidth="1" />
      <ellipse cx="160" cy="75" rx="105" ry="45" fill="none" stroke="#334155" strokeWidth="1.2" />
      <ellipse cx="160" cy="75" rx="70" ry="30" fill="none" stroke="#475569" strokeWidth="1.2" />
      <ellipse cx="160" cy="75" rx="35" ry="15" fill="none" stroke="#E598AC" strokeWidth="1.5" strokeOpacity="0.8" />

      {/* Global Minimum Star */}
      <circle cx="160" cy="75" r="4" fill="#F5CAD6" />
      <text x="160" y="93" fill="#F5CAD6" fontSize="9" fontWeight="bold" fontFamily="Inter" textAnchor="middle">Global Minimum θ*</text>

      {/* Gradient Descent Trajectory Path */}
      <polyline
        points="40,25 75,50 95,35 120,62 135,68 152,73 160,75"
        fill="none"
        stroke="#38BDF8"
        strokeWidth="2"
        strokeDasharray="4 2"
      />
      <circle cx="40" cy="25" r="4" fill="#38BDF8" />
      <text x="45" y="20" fill="#38BDF8" fontSize="8" fontFamily="Inter">Start θ₀</text>

      <circle cx="95" cy="35" r="2.5" fill="#38BDF8" />
      <circle cx="120" cy="62" r="2.5" fill="#38BDF8" />
      <circle cx="152" cy="73" r="2.5" fill="#38BDF8" />
    </svg>
    <div className="mt-1 text-[11px] font-ui text-slate-400 text-center">
      Momentum dampens transverse oscillations while accelerating down the steep loss gradient.
    </div>
  </div>
);

// 5. Ambient Computational Neural Mesh (Atmospheric whitespace element)
const AmbientNeuralLattice: React.FC = () => (
  <div className="w-full relative h-48 select-none overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B101E]/80 via-[#101428]/60 to-[#180F1E]/70 border border-white/[0.08] p-4 flex flex-col justify-between">
    <div className="flex items-center justify-between text-[11px] font-ui">
      <span className="flex items-center gap-1.5 text-slate-300 font-semibold tracking-wide uppercase text-[10px]">
        <Compass className="w-3.5 h-3.5 text-[#E598AC]" />
        Computational Tensor Topology
      </span>
      <span className="font-mono text-[10px] text-slate-500">X ∈ ℝ^(B × T × D)</span>
    </div>

    <svg viewBox="0 0 340 120" className="w-full h-full opacity-65">
      <defs>
        <linearGradient id="wireGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#E598AC" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#F5CAD6" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Ambient Grid Vectors */}
      <line x1="20" y1="20" x2="100" y2="40" stroke="url(#wireGrad)" strokeWidth="1" />
      <line x1="100" y1="40" x2="180" y2="25" stroke="url(#wireGrad)" strokeWidth="1" />
      <line x1="180" y1="25" x2="260" y2="50" stroke="url(#wireGrad)" strokeWidth="1" />
      <line x1="260" y1="50" x2="320" y2="30" stroke="url(#wireGrad)" strokeWidth="1" />

      <line x1="40" y1="90" x2="110" y2="70" stroke="url(#wireGrad)" strokeWidth="1" />
      <line x1="110" y1="70" x2="190" y2="95" stroke="url(#wireGrad)" strokeWidth="1" />
      <line x1="190" y1="95" x2="270" y2="75" stroke="url(#wireGrad)" strokeWidth="1" />

      {/* Cross Lattice Lines */}
      <line x1="100" y1="40" x2="110" y2="70" stroke="#334155" strokeWidth="0.8" strokeDasharray="3 3" />
      <line x1="180" y1="25" x2="190" y2="95" stroke="#334155" strokeWidth="0.8" strokeDasharray="3 3" />
      <line x1="260" y1="50" x2="270" y2="75" stroke="#334155" strokeWidth="0.8" strokeDasharray="3 3" />

      {/* Nodes */}
      <circle cx="20" cy="20" r="3.5" fill="#38BDF8" />
      <circle cx="100" cy="40" r="4.5" fill="#E598AC" />
      <circle cx="180" cy="25" r="4" fill="#F5CAD6" />
      <circle cx="260" cy="50" r="5" fill="#E598AC" />
      <circle cx="320" cy="30" r="3.5" fill="#38BDF8" />

      <circle cx="40" cy="90" r="3" fill="#38BDF8" />
      <circle cx="110" cy="70" r="4" fill="#F5CAD6" />
      <circle cx="190" cy="95" r="4.5" fill="#E598AC" />
      <circle cx="270" cy="75" r="4" fill="#38BDF8" />
    </svg>

    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
      <span>Latent Dimension: d_model = 768</span>
      <span className="text-[#F5CAD6]">Active Manifold</span>
    </div>
  </div>
);

/* =========================================================================
   Curriculum Module Pedagogical Data Model
   ========================================================================= */

interface PedagogicalModuleData {
  conceptId: string;
  moduleIndex: string;
  eyebrow: string;
  title: string;
  conceptualPrimer: string;
  visualComponent: React.ComponentType;
  equation: {
    title: string;
    formula: string;
    variables: { symbol: string; meaning: string }[];
  };
  whyItMatters: string;
  comparison: {
    title: string;
    left: { label: string; desc: string };
    right: { label: string; desc: string };
  };
  realWorldApp: {
    domain: string;
    scenario: string;
    benchmark: string;
  };
  lessonsList: {
    title: string;
    duration: string;
    focus: string;
  }[];
}

const PEDAGOGICAL_MODULES: Record<string, PedagogicalModuleData> = {
  'machine-learning': {
    conceptId: 'machine-learning',
    moduleIndex: '01',
    eyebrow: 'Supervised Learning & Boundaries',
    title: 'Supervised Classification & Decision Surfaces',
    conceptualPrimer:
      'Machines learn by formulating hyperplanes that partition multi-dimensional feature space, maximizing confidence margins between distinct categorical classes.',
    visualComponent: ClassificationBoundaryDiagram,
    equation: {
      title: 'Hypothesis & Boundary Equation',
      formula: 'P(y = 1 | x) = σ(wᵀx + b) = 1 / (1 + e^{-(wᵀx + b)})',
      variables: [
        { symbol: 'wᵀx', meaning: 'Inner product measuring feature alignment along learned weight vector' },
        { symbol: 'b', meaning: 'Bias offset allowing the boundary to shift freely without passing through origin' },
        { symbol: 'σ(z)', meaning: 'Logistic sigmoid compressing unbounded real scores into probability space [0, 1]' },
      ],
    },
    whyItMatters:
      'Understanding where decision boundaries break down is the foundation of preventing classification failures, adversarial susceptibility, and model hallucination.',
    comparison: {
      title: 'Loss Behavior: Mean Squared Error vs Binary Cross-Entropy',
      left: {
        label: 'MSE Loss (Fails for Classification)',
        desc: 'Produces non-convex loss surfaces riddled with flat local plateaus that cause gradient descent to stall.',
      },
      right: {
        label: 'BCE Loss (Optimal Formulation)',
        desc: 'Strictly convex formulation that penalizes confident incorrect predictions with exponential loss gradients.',
      },
    },
    realWorldApp: {
      domain: 'Automated Clinical Screening',
      scenario: 'Classifying biopsy tissue cytology features (mean radius vs texture irregularity) to isolate malignancy.',
      benchmark: '99.4% ROC-AUC on NIH Biopsy Benchmark',
    },
    lessonsList: [
      { title: 'Supervised Classification & Decision Boundaries', duration: '22 min', focus: 'Hypothesis Formulation' },
      { title: 'Convex Optimization & Binary Cross-Entropy', duration: '18 min', focus: 'Loss Surface Geometry' },
      { title: 'Regularization & Margin Maximization (L1 vs L2)', duration: '25 min', focus: 'Sparsity & Overfitting Control' },
    ],
  },
  'deep-learning': {
    conceptId: 'deep-learning',
    moduleIndex: '02',
    eyebrow: 'Representation Learning',
    title: 'Multi-Layer Perceptrons & Backpropagation',
    conceptualPrimer:
      'Stacking layers of affine transformations with non-linear activations warps high-dimensional geometric space, allowing networks to solve linearly non-separable problems.',
    visualComponent: NeuralBackpropDiagram,
    equation: {
      title: 'Multivariate Chain Rule Gradient Flow',
      formula: "δ^{[l]} = (W^{[l+1]T} δ^{[l+1]}) ⊙ σ'(z^{[l]}),   ∂L/∂W^{[l]} = δ^{[l]} (a^{[l-1]})^T",
      variables: [
        { symbol: 'δ^{[l]}', meaning: 'Error vector propagated recursively backwards from layer l+1' },
        { symbol: '⊙', meaning: 'Hadamard element-wise product with the activation derivative' },
        { symbol: '∂L/∂W', meaning: 'Analytical partial gradient used for gradient descent parameter updates' },
      ],
    },
    whyItMatters:
      'Backpropagation enables deep networks to learn rich hierarchical representations without manual feature engineering.',
    comparison: {
      title: 'Activation Dynamics: Sigmoid vs Rectified Linear Unit (ReLU)',
      left: {
        label: 'Sigmoid / Tanh',
        desc: 'Derivatives peak at 0.25; gradients vanish exponentially in deep networks, freezing early layers.',
      },
      right: {
        label: 'ReLU / GELU',
        desc: 'Constant unit gradient for positive activations preserves gradient flow across hundreds of stacked layers.',
      },
    },
    realWorldApp: {
      domain: 'Autonomous Robotics & Sensor Fusion',
      scenario: 'Mapping raw multi-channel IMU and LiDAR telemetry directly to motor steering torque vectors in real time.',
      benchmark: 'Sub-3ms inference latency under dynamic loads',
    },
    lessonsList: [
      { title: 'From Perceptrons to Multi-Layer Architectures', duration: '24 min', focus: 'Non-Linear Separability' },
      { title: 'The Computational Graph & Backpropagation', duration: '28 min', focus: 'Chain Rule Mechanics' },
      { title: 'Activation Engineering: ReLU, GELU & Swish', duration: '20 min', focus: 'Gradient Highway Design' },
    ],
  },
  'genai-llms': {
    conceptId: 'genai-llms',
    moduleIndex: '03',
    eyebrow: 'Sequence & Generative Modeling',
    title: 'Transformer Self-Attention & Generative Architectures',
    conceptualPrimer:
      'Self-attention calculates dynamic pairwise relationships between all tokens in a sequence simultaneously, replacing sequential recurrence with massive parallel computation.',
    visualComponent: AttentionMatrixDiagram,
    equation: {
      title: 'Scaled Dot-Product Attention Formulation',
      formula: 'Attention(Q, K, V) = softmax( (Q Kᵀ) / √dₖ ) V',
      variables: [
        { symbol: 'Q, K', meaning: 'Query and Key representations whose dot-product measures semantic affinity' },
        { symbol: '√dₖ', meaning: 'Dimensional scaling factor preventing softmax saturation into vanishing gradient zones' },
        { symbol: 'V', meaning: 'Value matrix aggregated proportionally to calculated attention weights' },
      ],
    },
    whyItMatters:
      'Self-attention powers modern language models, reasoning agents, and multimodal foundation models by providing unlimited effective context paths.',
    comparison: {
      title: 'Architecture Comparison: Recurrent Networks vs Transformers',
      left: {
        label: 'Recurrent RNN / LSTM',
        desc: 'Sequential bottleneck: token t requires token t-1. Information decays over long sequences.',
      },
      right: {
        label: 'Transformer Attention',
        desc: 'Full O(1) path length between any two tokens; fully parallelizable matrix operations across GPUs.',
      },
    },
    realWorldApp: {
      domain: 'Code Synthesis & Autonomous Reasoning',
      scenario: 'Attending across 100k+ token context windows to debug intricate distributed systems.',
      benchmark: 'State-of-the-art multi-file code editing',
    },
    lessonsList: [
      { title: 'Token Embeddings & Positional Encodings', duration: '22 min', focus: 'Vector Semantic Spaces' },
      { title: 'Multi-Head Attention Mechanics', duration: '26 min', focus: 'Subspace Affinity Projection' },
      { title: 'Autoregressive Decoding & KV-Caching', duration: '24 min', focus: 'Generation Inference Loop' },
    ],
  },
  'ml-math': {
    conceptId: 'ml-math',
    moduleIndex: '04',
    eyebrow: 'Mathematical Foundations',
    title: 'Optimization Surfaces, Linear Algebra & Calculus',
    conceptualPrimer:
      'Understanding the geometry of high-dimensional loss functions, eigenvalues, and matrix factorizations ensures deep intuition for why learning algorithms converge.',
    visualComponent: LossLandscapeDiagram,
    equation: {
      title: 'Adaptive Moment Estimation (Adam)',
      formula: 'θ_t = θ_{t-1} - (η / (√(v̂_t) + ε)) m̂_t',
      variables: [
        { symbol: 'm̂_t', meaning: 'Bias-corrected first moment (exponential moving average of gradients)' },
        { symbol: 'v̂_t', meaning: 'Bias-corrected second moment (moving average of squared gradients)' },
        { symbol: 'η', meaning: 'Base learning rate scaled per parameter inversely with gradient variance' },
      ],
    },
    whyItMatters:
      'Without mathematical foundations, hyperparameter tuning becomes blind guesswork instead of principled engineering.',
    comparison: {
      title: 'Convex vs Non-Convex Loss Landscapes',
      left: {
        label: 'Convex Optimization',
        desc: 'Any local minimum is guaranteed to be the global minimum; analytical guarantees apply.',
      },
      right: {
        label: 'Deep Non-Convex Landscapes',
        desc: 'Riddled with saddle points; modern optimizers leverage momentum and adaptive learning rates to escape.',
      },
    },
    realWorldApp: {
      domain: 'Large-Scale Distributed Training',
      scenario: 'Stabilizing FP16/BF16 mixed-precision gradient descent across 10,000 TPU clusters.',
      benchmark: 'Zero divergence across 30-day continuous pre-training runs',
    },
    lessonsList: [
      { title: 'Eigenvalues, Covariance & PCA Manifolds', duration: '24 min', focus: 'Dimensionality Geometry' },
      { title: 'Vector Calculus & Jacobians/Hessians', duration: '20 min', focus: 'Second-Order Curvature' },
      { title: 'Optimizer Dynamics: SGD to AdamW', duration: '22 min', focus: 'Loss Trajectory Smoothing' },
    ],
  },
};

// Fallback generator for other chosen concepts
function getPedagogicalModule(conceptId: string, index: number, title: string): PedagogicalModuleData {
  if (PEDAGOGICAL_MODULES[conceptId]) {
    return PEDAGOGICAL_MODULES[conceptId];
  }

  // Create a structured fallback matching the rigorous pedagogical standard
  return {
    conceptId,
    moduleIndex: String(index + 1).padStart(2, '0'),
    eyebrow: 'Specialized Topic Track',
    title: title.replace(/^\d+\.\s*/, ''),
    conceptualPrimer:
      'Synthesizing theoretical principles with mathematical rigor and computational implementations to master advanced artificial intelligence.',
    visualComponent: AmbientNeuralLattice,
    equation: {
      title: 'Core Governing Formulation',
      formula: 'y* = argmax_{y} P(y | x; θ)',
      variables: [
        { symbol: 'x', meaning: 'High-dimensional input tensor from the problem domain' },
        { symbol: 'θ', meaning: 'Learned parameter weights optimized via empirical risk minimization' },
        { symbol: 'y*', meaning: 'Optimal target prediction maximizing likelihood confidence' },
      ],
    },
    whyItMatters:
      'Provides the domain-specific mental models needed to bridge foundational theory with production deployment.',
    comparison: {
      title: 'Empirical Trade-off Analysis',
      left: {
        label: 'Heuristic Baseline',
        desc: 'Rule-based approaches lack adaptive capacity when operating on unconstrained natural data.',
      },
      right: {
        label: 'Learned Neural Policy',
        desc: 'Extracts latent invariants and generalizes reliably to out-of-distribution inputs.',
      },
    },
    realWorldApp: {
      domain: 'Industrial AI Systems',
      scenario: 'Deploying high-throughput low-latency inference pipelines in safety-critical production workflows.',
      benchmark: 'Production SLA target met with 99.9% uptime',
    },
    lessonsList: [
      { title: `${title} - Fundamental Theory`, duration: '20 min', focus: 'Mental Models' },
      { title: `${title} - Mathematical Mechanics`, duration: '24 min', focus: 'Formulation' },
      { title: `${title} - Real-World Application`, duration: '22 min', focus: 'Implementation' },
    ],
  };
}

/* =========================================================================
   Main Component: MyPathPage
   ========================================================================= */

export const MyPathPage: React.FC = () => {
  const { userState, setActivePage } = useApp();
  const { pathNodes, overallProgress, selectedConcepts } = userState;

  // Active module inspection state (which modules have their deep dive expanded)
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    'machine-learning': true, // default first focus expanded
  });

  const toggleModuleExpand = (moduleId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  // Generate or retrieve current roadmap nodes
  const displayNodes = React.useMemo(() => {
    if (pathNodes && pathNodes.length > 0) return pathNodes;
    return generateCurriculumRoadmap(
      selectedConcepts.length > 0 ? selectedConcepts : ['machine-learning', 'deep-learning', 'genai-llms'],
      userState.diagnosticScore
    );
  }, [pathNodes, selectedConcepts, userState.diagnosticScore]);

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Page Header with Typographic Balance */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.06] pb-6">
        <div>
          <span className="text-[11px] font-ui font-bold uppercase tracking-wider text-[#E598AC] flex items-center gap-2">
            <Compass className="w-3.5 h-3.5" />
            Curriculum Architecture &amp; Progression
          </span>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight mt-1.5">
            MY LEARNING PATH
          </h1>
          <p className="font-editorial italic text-slate-300 text-sm sm:text-base mt-1 max-w-2xl leading-relaxed">
            From foundational loss surfaces to generative multi-agent systems — structured for conceptual depth, mathematical clarity, and practical mastery.
          </p>
        </div>

        {/* Global Path Metrics Card */}
        <div className="glass-card-dark px-5 py-3.5 rounded-2xl flex items-center gap-5 border border-white/10 shrink-0 self-start md:self-auto">
          <div>
            <div className="text-[11px] font-ui font-medium text-slate-400">Total Path Progress</div>
            <div className="text-xl font-heading font-bold text-[#F5CAD6]">
              {overallProgress}% <span className="text-xs font-ui font-normal text-slate-400">Mastered</span>
            </div>
          </div>
          <div className="w-20 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#7E2948] to-[#E598AC] rounded-full progress-fill"
              style={{ width: `${Math.max(overallProgress, 3)}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. Main Two-Column Architectural Layout: Rebalancing Whitespace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols): Detailed Progression Roadmap Stream */}
        <div className="lg:col-span-7 xl:col-span-7 space-y-8">
          {displayNodes.map((node, index) => {
            const isCompleted =
              node.status === 'completed' || userState.completedLessonIds.length >= (index + 1) * 3;
            const isCurrent = index === 0 && !isCompleted;
            const isUpcoming = !isCompleted && !isCurrent;

            const moduleData = getPedagogicalModule(node.id, index, node.title);
            const isExpanded = expandedModules[node.id] ?? isCurrent;
            const VisualComponent = moduleData.visualComponent;

            return (
              <React.Fragment key={node.id}>
                {/* Milestone Node Card */}
                <div
                  className={`rounded-3xl transition-all border relative overflow-hidden ${
                    isCurrent
                      ? 'clay-card-light text-slate-900 border-white/80 shadow-2xl'
                      : isCompleted
                      ? 'glass-card-dark border-emerald-500/20 hover:border-emerald-500/35'
                      : 'glass-card-dark border-white/5 hover:border-white/15'
                  }`}
                >
                  {/* Card Header & Status Banner */}
                  <div
                    className={`p-6 sm:p-7 border-b ${
                      isCurrent ? 'border-slate-300/40' : 'border-white/[0.06]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`text-xs font-mono font-bold tracking-wider px-2.5 py-1 rounded-lg ${
                            isCurrent
                              ? 'bg-[#7E2948] text-white'
                              : isCompleted
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                              : 'bg-white/5 text-slate-400'
                          }`}
                        >
                          MODULE {moduleData.moduleIndex}
                        </span>
                        <span
                          className={`text-xs font-ui font-semibold uppercase tracking-wider ${
                            isCurrent ? 'text-[#7E2948]' : 'text-slate-400'
                          }`}
                        >
                          {moduleData.eyebrow}
                        </span>
                      </div>

                      {/* Status Badges */}
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs font-ui font-medium flex items-center gap-1.5 ${
                            isCurrent ? 'text-slate-600' : 'text-slate-400'
                          }`}
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          {node.lessonsCount} lessons
                        </span>
                        <span
                          className={`text-xs font-ui font-medium flex items-center gap-1.5 ${
                            isCurrent ? 'text-slate-600' : 'text-slate-400'
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5" />
                          {node.estimatedHours} hrs
                        </span>
                      </div>
                    </div>

                    {/* Milestone Title */}
                    <h2
                      className={`font-heading font-extrabold text-xl sm:text-2xl tracking-tight mt-1 ${
                        isCurrent ? 'text-[#151926]' : 'text-white'
                      }`}
                    >
                      {moduleData.title}
                    </h2>

                    {/* Conceptual Primer: Student-Friendly Mental Model */}
                    <p
                      className={`font-ui text-sm mt-2 leading-relaxed ${
                        isCurrent ? 'text-slate-700' : 'text-slate-300'
                      }`}
                    >
                      {moduleData.conceptualPrimer}
                    </p>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {node.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className={`text-xs font-ui px-2.5 py-1 rounded-xl font-medium border ${
                            isCurrent
                              ? 'bg-white/80 border-slate-300 text-slate-800'
                              : 'bg-white/[0.04] border-white/5 text-slate-300'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Deep Dive Section: Visuals, Equations & Applications */}
                  {isExpanded && (
                    <div className="p-6 sm:p-7 space-y-6">
                      {/* 1. Visual Diagram / Graph Component */}
                      <div>
                        <div
                          className={`text-xs font-ui font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${
                            isCurrent ? 'text-slate-700' : 'text-[#F5CAD6]'
                          }`}
                        >
                          <Activity className="w-3.5 h-3.5" />
                          Visual Interpretation &amp; Geometry
                        </div>
                        <VisualComponent />
                      </div>

                      {/* 2. Mathematical Mechanics Equation Callout */}
                      <div
                        className={`p-4 rounded-2xl border ${
                          isCurrent
                            ? 'bg-white/70 border-slate-300/80 text-slate-800'
                            : 'bg-[#0A0F1E] border-white/[0.08] text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-ui font-semibold mb-2">
                          <span className={isCurrent ? 'text-[#7E2948]' : 'text-[#E598AC]'}>
                            {moduleData.equation.title}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">Governing Formulation</span>
                        </div>

                        {/* Equation Box */}
                        <div
                          className={`p-3 rounded-xl font-mono text-xs sm:text-sm text-center font-bold tracking-wide overflow-x-auto my-2 ${
                            isCurrent
                              ? 'bg-[#151926] text-[#F5CAD6]'
                              : 'bg-[#060A14] text-[#F5CAD6] border border-white/5'
                          }`}
                        >
                          {moduleData.equation.formula}
                        </div>

                        {/* Variable Descriptions */}
                        <div className="space-y-1.5 mt-3 text-xs font-ui">
                          {moduleData.equation.variables.map((v, vIdx) => (
                            <div key={vIdx} className="flex items-start gap-2">
                              <span className="font-mono font-bold text-[#E598AC] shrink-0">{v.symbol}:</span>
                              <span className={isCurrent ? 'text-slate-600' : 'text-slate-400'}>{v.meaning}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 3. Comparison & Trade-off Layout */}
                      <div
                        className={`p-4 rounded-2xl border ${
                          isCurrent
                            ? 'bg-white/60 border-slate-300'
                            : 'bg-white/[0.02] border-white/5'
                        }`}
                      >
                        <div
                          className={`text-xs font-ui font-semibold uppercase tracking-wider mb-2.5 ${
                            isCurrent ? 'text-slate-800' : 'text-slate-300'
                          }`}
                        >
                          {moduleData.comparison.title}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-ui">
                          <div
                            className={`p-3 rounded-xl border ${
                              isCurrent
                                ? 'bg-slate-100 border-slate-200'
                                : 'bg-[#0C101D] border-white/5'
                            }`}
                          >
                            <div className="font-semibold text-rose-400 mb-1">
                              {moduleData.comparison.left.label}
                            </div>
                            <p className={isCurrent ? 'text-slate-600' : 'text-slate-400'}>
                              {moduleData.comparison.left.desc}
                            </p>
                          </div>
                          <div
                            className={`p-3 rounded-xl border ${
                              isCurrent
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                                : 'bg-emerald-950/20 border-emerald-500/20 text-emerald-200'
                            }`}
                          >
                            <div className="font-semibold text-emerald-400 mb-1">
                              {moduleData.comparison.right.label}
                            </div>
                            <p className={isCurrent ? 'text-slate-700' : 'text-slate-300'}>
                              {moduleData.comparison.right.desc}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* 4. Real-World Application Callout */}
                      <div
                        className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isCurrent
                            ? 'bg-[#7E2948]/10 border-[#7E2948]/25'
                            : 'bg-[#FAF0F4]/[0.03] border-white/10'
                        }`}
                      >
                        <div>
                          <div className="text-[10px] font-ui uppercase font-bold tracking-wider text-[#E598AC]">
                            Real-World Application: {moduleData.realWorldApp.domain}
                          </div>
                          <p
                            className={`text-xs font-ui mt-1 ${
                              isCurrent ? 'text-slate-700' : 'text-slate-300'
                            }`}
                          >
                            {moduleData.realWorldApp.scenario}
                          </p>
                        </div>
                        <span
                          className={`text-[11px] font-mono px-3 py-1 rounded-full shrink-0 ${
                            isCurrent
                              ? 'bg-[#7E2948] text-white font-semibold'
                              : 'bg-white/10 text-slate-300'
                          }`}
                        >
                          {moduleData.realWorldApp.benchmark}
                        </span>
                      </div>

                      {/* 5. Sequence Lessons Breakdown */}
                      <div className="space-y-2 pt-2">
                        <div
                          className={`text-xs font-ui font-semibold uppercase tracking-wider ${
                            isCurrent ? 'text-slate-700' : 'text-slate-400'
                          }`}
                        >
                          Curriculum Sequence Lessons
                        </div>
                        <div className="space-y-1.5">
                          {moduleData.lessonsList.map((lesson, lIdx) => (
                            <div
                              key={lIdx}
                              className={`p-2.5 rounded-xl text-xs font-ui flex items-center justify-between border ${
                                isCurrent
                                  ? 'bg-white/70 border-slate-200'
                                  : 'bg-white/[0.02] border-white/5'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <span
                                  className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                                    isCompleted
                                      ? 'bg-emerald-950 text-emerald-400'
                                      : lIdx === 0 && isCurrent
                                      ? 'bg-[#7E2948] text-white'
                                      : 'bg-slate-800 text-slate-400'
                                  }`}
                                >
                                  {isCompleted ? <Check className="w-3 h-3" /> : lIdx + 1}
                                </span>
                                <span
                                  className={`font-medium ${
                                    isCurrent ? 'text-slate-900' : 'text-slate-200'
                                  }`}
                                >
                                  {lesson.title}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                                <span className="hidden sm:inline font-mono text-[10px]">
                                  {lesson.focus}
                                </span>
                                <span>{lesson.duration}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Card Action Footer */}
                  <div
                    className={`px-6 py-4 flex items-center justify-between border-t ${
                      isCurrent
                        ? 'bg-white/40 border-slate-300/50'
                        : 'bg-white/[0.01] border-white/[0.06]'
                    }`}
                  >
                    {/* Deep Dive Inspection Toggle */}
                    <button
                      onClick={() => toggleModuleExpand(node.id)}
                      className={`text-xs font-ui font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isCurrent
                          ? 'text-[#7E2948] hover:text-[#5E1E35]'
                          : 'text-[#E598AC] hover:text-white'
                      }`}
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="w-4 h-4" />
                          <span>Collapse Deep Dive</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          <span>Inspect Module Anatomy</span>
                        </>
                      )}
                    </button>

                    {/* Action Execution Button */}
                    <div>
                      {isCurrent ? (
                        <button
                          onClick={() => setActivePage('learn')}
                          className="clay-btn-plum px-6 py-2.5 text-xs font-ui font-semibold flex items-center gap-2 cursor-pointer group shadow-lg"
                        >
                          <span>
                            {userState.currentFocus.progress === 0
                              ? 'Start First Lesson'
                              : 'Resume Active Lesson'}
                          </span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      ) : isCompleted ? (
                        <button
                          onClick={() => setActivePage('practice')}
                          className="text-xs font-ui font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>Review Exercises</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <span className="text-xs font-ui text-slate-500 flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5" /> Prerequisite Locked
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. Selective Thought/Quote Placed Intentionally in Whitespace */}
                {index === 1 && (
                  <div className="py-2 px-6 rounded-3xl bg-gradient-to-r from-transparent via-[#7E2948]/15 to-transparent border-y border-white/[0.06] text-center my-4">
                    <QuoteIcon className="w-4 h-4 text-[#E598AC] mx-auto mb-2 opacity-75" />
                    <p className="font-editorial italic text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl mx-auto">
                      &quot;The Analytical Engine weaves algebraical patterns just as the Jacquard loom weaves flowers and leaves.&quot;
                    </p>
                    <span className="block text-[11px] font-ui uppercase tracking-wider text-[#E598AC] font-semibold mt-1.5">
                      — Ada Lovelace, 1843
                    </span>
                  </div>
                )}

                {index === 3 && (
                  <div className="py-2 px-6 rounded-3xl bg-gradient-to-r from-transparent via-[#251A32]/35 to-transparent border-y border-white/[0.06] text-center my-4">
                    <QuoteIcon className="w-4 h-4 text-[#E598AC] mx-auto mb-2 opacity-75" />
                    <p className="font-editorial italic text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl mx-auto">
                      &quot;Intelligence is the computational ability to achieve complex goals in dynamic environments.&quot;
                    </p>
                    <span className="block text-[11px] font-ui uppercase tracking-wider text-[#E598AC] font-semibold mt-1.5">
                      — Demis Hassabis
                    </span>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Right Column (5 cols): Sticky Ambient Intelligence Canvas (Whitespace Rebalancing) */}
        <div className="hidden lg:block lg:col-span-5 xl:col-span-5 sticky top-24 space-y-6">
          {/* 1. Atmospheric AI Technology Visual */}
          <AmbientNeuralLattice />

          {/* 2. Feynman Master Learning Quote */}
          <div className="calm-surface p-6 rounded-3xl border border-white/[0.08] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E598AC]/10 rounded-full blur-2xl pointer-events-none" />
            <QuoteIcon className="w-5 h-5 text-[#E598AC] mb-3 opacity-80" />
            <p className="font-editorial italic text-lg sm:text-xl text-slate-100 leading-relaxed">
              &quot;What I cannot create, I do not understand.&quot;
            </p>
            <div className="text-xs font-ui font-semibold text-[#F5CAD6] mt-2">
              — Richard Feynman, Caltech Blackboard
            </div>
            <p className="font-ui text-xs text-slate-400 mt-3 leading-relaxed border-t border-white/[0.06] pt-3">
              LOGIQ builds mastery from first principles: deriving equations, inspecting geometric manifolds, and implementing working models.
            </p>
          </div>

          {/* 3. LOGIQ Pedagogy Architecture Map */}
          <div className="glass-card-dark p-6 rounded-3xl border border-white/[0.08]">
            <div className="flex items-center gap-2 text-xs font-ui font-bold uppercase tracking-wider text-[#E598AC] mb-4">
              <Sparkles className="w-4 h-4" />
              The 5-Stage Mastery Loop
            </div>

            <div className="space-y-3 font-ui text-xs">
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="w-5 h-5 rounded-full bg-[#7E2948] text-white flex items-center justify-center font-bold text-[10px]">
                  1
                </span>
                <div>
                  <div className="font-semibold text-slate-200">Intuitive Mental Model</div>
                  <div className="text-[11px] text-slate-400">Plain-language analogy &amp; problem definition</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="w-5 h-5 rounded-full bg-[#7E2948] text-white flex items-center justify-center font-bold text-[10px]">
                  2
                </span>
                <div>
                  <div className="font-semibold text-slate-200">Mathematical Mechanics</div>
                  <div className="text-[11px] text-slate-400">Governing equations &amp; parameter derivations</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="w-5 h-5 rounded-full bg-[#7E2948] text-white flex items-center justify-center font-bold text-[10px]">
                  3
                </span>
                <div>
                  <div className="font-semibold text-slate-200">Geometric Visualization</div>
                  <div className="text-[11px] text-slate-400">Decision boundaries &amp; loss contours</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="w-5 h-5 rounded-full bg-[#7E2948] text-white flex items-center justify-center font-bold text-[10px]">
                  4
                </span>
                <div>
                  <div className="font-semibold text-slate-200">Adaptive Practice Test</div>
                  <div className="text-[11px] text-slate-400">Immediate pedagogical feedback &amp; recovery</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#FAF0F4]/10 border border-[#F5CAD6]/20">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-[10px]">
                  5
                </span>
                <div>
                  <div className="font-semibold text-[#F5CAD6]">Production Application</div>
                  <div className="text-[11px] text-slate-300">Engineering real-world AI systems</div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Curriculum Milestone Navigator */}
          <div className="glass-card-dark p-5 rounded-3xl border border-white/[0.08]">
            <div className="flex items-center justify-between text-xs font-ui font-semibold text-slate-300 mb-3">
              <span>Curriculum Milestone Index</span>
              <span className="text-[10px] font-mono text-[#E598AC]">
                {displayNodes.length} Milestones
              </span>
            </div>

            <div className="space-y-1.5">
              {displayNodes.map((item, idx) => {
                const isItemCompleted =
                  item.status === 'completed' ||
                  userState.completedLessonIds.length >= (idx + 1) * 3;
                const isItemCurrent = idx === 0 && !isItemCompleted;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setExpandedModules(prev => ({
                        ...prev,
                        [item.id]: true,
                      }));
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs font-ui flex items-center justify-between transition-colors cursor-pointer ${
                      isItemCurrent
                        ? 'bg-[#FAF0F4]/15 text-[#F5CAD6] font-semibold border border-[#F5CAD6]/25'
                        : isItemCompleted
                        ? 'text-emerald-400 hover:bg-white/5'
                        : 'text-slate-400 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-mono text-[10px] opacity-75">
                        {String(idx + 1).padStart(2, '0')}.
                      </span>
                      <span className="truncate">{item.title.replace(/^\d+\.\s*/, '')}</span>
                    </div>

                    {isItemCompleted ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : isItemCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-[#E598AC] animate-pulse shrink-0" />
                    ) : (
                      <Lock className="w-3 h-3 text-slate-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
