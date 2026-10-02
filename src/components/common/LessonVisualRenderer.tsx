import React, { useState } from 'react';
import { LessonVisualSpec } from '../../types';
import { Activity, ArrowRight, Layers, Table as TableIcon, GitBranch, Compass, Sparkles } from 'lucide-react';

interface Props {
  spec: LessonVisualSpec;
}

// -------------------------------------------------------------
// 1. Interactive Sigmoid Graph Component
// -------------------------------------------------------------
const InteractiveSigmoidGraph: React.FC<{ initialZ?: number }> = ({ initialZ = 0 }) => {
  const [zValue, setZValue] = useState<number>(initialZ);

  // Compute sigmoid: σ(z) = 1 / (1 + e^-z)
  const sigmoidVal = 1 / (1 + Math.exp(-zValue));
  const pct = (sigmoidVal * 100).toFixed(1);

  // Generate SVG curve points from z = -6 to +6 (SVG width 360, height 180)
  // Mapping: x: [-6, 6] -> [40, 320]
  //          y: [0, 1]  -> [150, 30] (inverted in SVG)
  const mapZtoX = (z: number) => 40 + ((z + 6) / 12) * 280;
  const mapYtoSvgY = (y: number) => 150 - y * 120;

  const points: string[] = [];
  for (let stepZ = -6; stepZ <= 6; stepZ += 0.25) {
    const val = 1 / (1 + Math.exp(-stepZ));
    points.push(`${mapZtoX(stepZ).toFixed(1)},${mapYtoSvgY(val).toFixed(1)}`);
  }
  const pathD = `M ${points.join(' L ')}`;

  const currentPointX = mapZtoX(zValue);
  const currentPointY = mapYtoSvgY(sigmoidVal);

  // Pedagogical insight based on current z value
  let dynamicInsight = '';
  if (Math.abs(zValue) < 0.2) {
    dynamicInsight = 'At z ≈ 0, σ(0) = 0.50. The model is at maximum uncertainty, directly on the decision boundary.';
  } else if (zValue > 2.5) {
    dynamicInsight = `As z = ${zValue.toFixed(1)} >> 0, e⁻ᶻ → 0, pushing σ(z) = ${sigmoidVal.toFixed(4)} asymptotically toward 1.0 (Confident Positive Class).`;
  } else if (zValue < -2.5) {
    dynamicInsight = `As z = ${zValue.toFixed(1)} << 0, e⁻ᶻ → ∞, driving σ(z) = ${sigmoidVal.toFixed(4)} asymptotically toward 0.0 (Confident Negative Class).`;
  } else if (zValue > 0) {
    dynamicInsight = `z = ${zValue.toFixed(1)} > 0 yields σ(z) = ${sigmoidVal.toFixed(4)} > 0.50, predicting Class 1 with ${pct}% confidence.`;
  } else {
    dynamicInsight = `z = ${zValue.toFixed(1)} < 0 yields σ(z) = ${sigmoidVal.toFixed(4)} < 0.50, predicting Class 0 with ${(100 - Number(pct)).toFixed(1)}% confidence.`;
  }

  return (
    <div className="space-y-4">
      {/* SVG Canvas */}
      <div className="relative bg-[#070B16] rounded-2xl p-4 border border-white/[0.08] overflow-hidden select-none">
        <svg viewBox="0 0 360 190" className="w-full h-auto max-h-52">
          <defs>
            <linearGradient id="sigmoidStroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="50%" stopColor="#E598AC" />
              <stop offset="100%" stopColor="#F5CAD6" />
            </linearGradient>
            <radialGradient id="glowPoint" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F5CAD6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#7E2948" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Coordinate Grid */}
          <line x1="40" y1="30" x2="320" y2="30" stroke="#1E293B" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="40" y1="90" x2="320" y2="90" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="40" y1="150" x2="320" y2="150" stroke="#1E293B" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="180" y1="20" x2="180" y2="160" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />

          {/* Axis Labels */}
          <text x="32" y="34" fill="#64748B" fontSize="9" fontFamily="Inter" textAnchor="end">1.0</text>
          <text x="32" y="93" fill="#E598AC" fontSize="9" fontFamily="Inter" textAnchor="end" fontWeight="bold">0.5</text>
          <text x="32" y="153" fill="#64748B" fontSize="9" fontFamily="Inter" textAnchor="end">0.0</text>

          <text x="40" y="168" fill="#64748B" fontSize="8" fontFamily="Inter" textAnchor="middle">-6</text>
          <text x="110" y="168" fill="#64748B" fontSize="8" fontFamily="Inter" textAnchor="middle">-3</text>
          <text x="180" y="168" fill="#94A3B8" fontSize="8" fontFamily="Inter" textAnchor="middle" fontWeight="bold">0</text>
          <text x="250" y="168" fill="#64748B" fontSize="8" fontFamily="Inter" textAnchor="middle">+3</text>
          <text x="320" y="168" fill="#64748B" fontSize="8" fontFamily="Inter" textAnchor="middle">+6</text>

          {/* Threshold Line at y = 0.50 */}
          <line x1="40" y1="90" x2="320" y2="90" stroke="#E598AC" strokeWidth="1" strokeOpacity="0.4" />

          {/* Sigmoid S-Curve */}
          <path d={pathD} fill="none" stroke="url(#sigmoidStroke)" strokeWidth="3" strokeLinecap="round" />

          {/* Vertical indicator line for current z */}
          <line
            x1={currentPointX}
            y1="150"
            x2={currentPointX}
            y2={currentPointY}
            stroke="#F5CAD6"
            strokeWidth="1.2"
            strokeDasharray="2 2"
            strokeOpacity="0.6"
          />

          {/* Active Interactive Point */}
          <circle cx={currentPointX} cy={currentPointY} r="12" fill="url(#glowPoint)" />
          <circle cx={currentPointX} cy={currentPointY} r="5.5" fill="#F5CAD6" stroke="#151926" strokeWidth="2" />
        </svg>

        {/* Live Calculation Badge */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-xs font-ui">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Current Linear Score:</span>
            <span className="font-mono font-bold text-[#38BDF8]">z = {zValue.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Sigmoid Probability:</span>
            <span className="font-mono font-bold text-[#F5CAD6]">σ(z) = {sigmoidVal.toFixed(4)} ({pct}%)</span>
          </div>
        </div>
      </div>

      {/* Interactive Range Slider */}
      <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/5 space-y-2">
        <div className="flex items-center justify-between text-xs font-ui">
          <span className="font-medium text-slate-300">Interact: Drag Score z to test probability response</span>
          <span className="font-mono text-[11px] text-[#E598AC]">z ∈ [-6.0, +6.0]</span>
        </div>
        <input
          type="range"
          min="-6"
          max="6"
          step="0.1"
          value={zValue}
          onChange={(e) => setZValue(parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#E598AC]"
        />
        <div className="flex justify-between text-[10px] font-mono text-slate-500">
          <span>-6.0 (Far Negative)</span>
          <span>0.0 (Decision Boundary)</span>
          <span>+6.0 (Far Positive)</span>
        </div>
      </div>

      {/* Connected Educational Reflection */}
      <div className="p-3.5 rounded-xl bg-[#7E2948]/15 border border-[#E598AC]/20 text-xs font-ui flex items-start gap-2.5 text-slate-200">
        <Sparkles className="w-4 h-4 text-[#F5CAD6] shrink-0 mt-0.5" />
        <p className="leading-relaxed">{dynamicInsight}</p>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 2. Programmatic Flowchart Component
// -------------------------------------------------------------
const FlowchartRenderer: React.FC<{
  steps: Array<{ stepNumber: number; title: string; description: string; tag: string }>;
}> = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="space-y-4">
      {/* Step Sequence Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
        {steps.map((st, idx) => {
          const isSelected = activeStep === idx;
          return (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#FAF0F4]/15 border-[#F5CAD6]/40 shadow-lg text-white'
                  : 'bg-white/[0.03] border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/[0.06]'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center font-mono ${
                    isSelected ? 'bg-[#7E2948] text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {st.stepNumber}
                </span>
                <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/5">
                  {st.tag}
                </span>
              </div>
              <div className="font-ui text-xs font-semibold truncate">{st.title}</div>
            </button>
          );
        })}
      </div>

      {/* Selected Step Deep Dive Card */}
      <div className="p-4 rounded-2xl bg-[#090E1A] border border-white/10 space-y-1.5">
        <div className="flex items-center justify-between text-xs font-ui">
          <span className="font-bold text-[#F5CAD6]">
            Phase {steps[activeStep].stepNumber}: {steps[activeStep].title}
          </span>
          <span className="font-mono text-[10px] text-slate-400">Step {activeStep + 1} of {steps.length}</span>
        </div>
        <p className="text-xs font-ui text-slate-300 leading-relaxed">
          {steps[activeStep].description}
        </p>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 3. Programmatic Architecture Diagram Component
// -------------------------------------------------------------
const DiagramRenderer: React.FC<{
  layers: Array<{ name: string; nodeCount: number; role: string; activation?: string }>;
}> = ({ layers }) => {
  return (
    <div className="bg-[#080C16] rounded-2xl p-4 border border-white/[0.08] space-y-3">
      <div className="flex items-center justify-between text-xs font-ui text-slate-300 pb-2 border-b border-white/5">
        <span className="font-semibold">Neural Architecture Layer Topology</span>
        <span className="font-mono text-[10px] text-[#E598AC]">{layers.length} Stages</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {layers.map((layer, idx) => (
          <div key={idx} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white font-ui">{layer.name}</span>
              <span className="text-[10px] font-mono text-[#F5CAD6] px-2 py-0.5 rounded bg-white/5">
                {layer.nodeCount} units
              </span>
            </div>
            <p className="text-[11px] font-ui text-slate-400 leading-normal">{layer.role}</p>
            {layer.activation && (
              <div className="text-[10px] font-mono text-[#38BDF8]">
                Activation: {layer.activation}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 4. Comparison Table Component
// -------------------------------------------------------------
const TableRenderer: React.FC<{ headers: string[]; rows: string[][] }> = ({ headers, rows }) => {
  return (
    <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#080C16]">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-ui">
          <thead className="bg-white/5 border-b border-white/10 text-slate-300 font-semibold">
            <tr>
              {headers.map((h, idx) => (
                <th key={idx} className="p-3 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {rows.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-white/[0.02] transition-colors">
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className={`p-3 ${cIdx === 0 ? 'font-semibold text-white' : ''}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// Main Visual Component Orchestrator
// -------------------------------------------------------------
export const LessonVisualRenderer: React.FC<Props> = ({ spec }) => {
  // If visual requirement is 'none', gracefully omit without rendering clutter
  if (spec.type === 'none') {
    return null;
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#090D1C]/80 p-5 sm:p-6 space-y-4">
      {/* Visual Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          {spec.type === 'graph' && <Activity className="w-4 h-4 text-[#E598AC]" />}
          {spec.type === 'flowchart' && <GitBranch className="w-4 h-4 text-[#38BDF8]" />}
          {spec.type === 'diagram' && <Layers className="w-4 h-4 text-[#F5CAD6]" />}
          {spec.type === 'table' && <TableIcon className="w-4 h-4 text-[#A78BFA]" />}
          <h3 className="font-ui font-bold text-sm sm:text-base text-white">{spec.title}</h3>
        </div>
        <span className="text-[11px] font-mono text-slate-400 capitalize px-2.5 py-0.5 rounded-full bg-white/5 self-start sm:self-auto">
          {spec.type} analysis
        </span>
      </div>

      {/* Render Specific Visual Mechanism */}
      {spec.type === 'graph' && (
        <InteractiveSigmoidGraph initialZ={spec.graphData?.initialValue ?? 0} />
      )}

      {spec.type === 'flowchart' && spec.flowchartData && (
        <FlowchartRenderer steps={spec.flowchartData.steps} />
      )}

      {spec.type === 'diagram' && spec.diagramData && (
        <DiagramRenderer layers={spec.diagramData.layers} />
      )}

      {spec.type === 'table' && spec.tableData && (
        <TableRenderer headers={spec.tableData.headers} rows={spec.tableData.rows} />
      )}

      {/* Pedagogical Caption */}
      {spec.caption && (
        <p className="text-xs font-ui text-slate-400 text-center italic pt-1">
          {spec.caption}
        </p>
      )}
    </div>
  );
};
