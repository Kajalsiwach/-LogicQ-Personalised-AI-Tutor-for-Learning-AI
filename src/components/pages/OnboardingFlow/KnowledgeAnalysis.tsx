import React from 'react';
import { useApp } from '../../../context/AppContext';
import { ArrowRight, CheckCircle2, TrendingUp, ShieldAlert, Sparkles } from 'lucide-react';
import { Logo } from '../../common/Logo';

export const KnowledgeAnalysis: React.FC = () => {
  const { setOnboardingStep } = useApp();

  return (
    <div className="min-h-screen flex flex-col justify-between p-6 sm:p-12 bg-[#080C15]">
      {/* Header */}
      <header className="flex items-center justify-between z-10 max-w-4xl mx-auto w-full">
        <Logo />
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <span className="text-[#F5CAD6]">Step 3</span>
          <span>of 4: Knowledge Analysis</span>
        </div>
      </header>

      {/* Main Analysis Results */}
      <main className="max-w-4xl mx-auto w-full py-8 z-10">
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E598AC]/10 text-[#F5CAD6] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Calibration Complete</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-white mb-2">
            YOUR DIAGNOSTIC SYNTHESIS
          </h2>
          <p className="font-editorial italic text-slate-300 text-lg sm:text-xl">
            We have calibrated your baseline profile to bypass redundant modules and fast-track to your growth edge.
          </p>
        </div>

        {/* 2-column breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Strengths Card */}
          <div className="glass-card-dark rounded-3xl p-6 border border-emerald-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-white">
                  Validated Foundations
                </h3>
                <p className="text-xs text-slate-400">Ready to skip or skim</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-white/5 flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-slate-200">
                    Loss Functions & Probabilities
                  </div>
                  <div className="text-[11px] text-slate-400">
                    95% proficiency in Sigmoid mapping & Log Loss
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-slate-200">
                    Bias-Variance Tradeoff
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Strong grasp of generalization curves and overfitting
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Growth Area Card */}
          <div className="glass-card-dark rounded-3xl p-6 border border-[#E598AC]/25">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#7E2948]/20 flex items-center justify-center text-[#F5CAD6]">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-white">
                  Targeted Learning Edge
                </h3>
                <p className="text-xs text-slate-400">Primary recommended focus</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-white/5 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#E598AC] shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-slate-200">
                    Imbalanced Data Metrics
                  </div>
                  <div className="text-[11px] text-slate-400">
                    PR-AUC, precision/recall threshold tuning & F-beta
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#E598AC] shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-slate-200">
                    Multi-Class Decision Boundaries
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Softmax calibration & multi-category error analysis
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => setOnboardingStep('path-created')}
            className="clay-btn-plum px-8 py-3.5 text-sm font-semibold flex items-center gap-3 cursor-pointer group"
          >
            <span>Personalize My Path</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </main>

      <footer className="max-w-4xl mx-auto w-full text-center text-xs text-slate-500">
        Your curriculum sequence adjusts dynamically based on future practice velocity.
      </footer>
    </div>
  );
};
