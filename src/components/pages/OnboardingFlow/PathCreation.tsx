import React from 'react';
import { useApp } from '../../../context/AppContext';
import { ArrowRight, CheckCircle2, Lock, Sparkles, Award } from 'lucide-react';
import { Logo } from '../../common/Logo';
import confetti from 'canvas-confetti';

export const PathCreation: React.FC = () => {
  const { setIsOnboardingActive, setActivePage } = useApp();

  const handleLaunchDashboard = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#F5CAD6', '#7E2948', '#38BDF8', '#FFFFFF'],
      });
    } catch {
      // safe fallback
    }
    setTimeout(() => {
      setIsOnboardingActive(false);
      setActivePage('dashboard');
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-6 sm:p-12 bg-[#080C15]">
      {/* Header */}
      <header className="flex items-center justify-between z-10 max-w-3xl mx-auto w-full">
        <Logo />
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <span className="text-[#F5CAD6]">Step 4</span>
          <span>of 4: Personalized Path Ready</span>
        </div>
      </header>

      {/* Main Path Reveal */}
      <main className="max-w-3xl mx-auto w-full py-6 z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF0F4]/10 text-[#F5CAD6] text-xs font-semibold mb-3 border border-[#F5CAD6]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curriculum Synthesized</span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-4xl text-white mb-2">
            YOUR CUSTOM AI/ML ROADMAP
          </h2>
          <p className="font-editorial italic text-slate-300 text-lg">
            Calibrated to your strengths, focusing directly on high-leverage concepts.
          </p>
        </div>

        {/* Roadmap Milestones Sequence */}
        <div className="glass-card-dark rounded-3xl p-6 sm:p-8 border border-white/10 mb-8 space-y-4">
          {/* Milestone 1: Foundations (Validated) */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-emerald-500/20">
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-white">
                  1. Mathematical Foundations
                </h4>
                <p className="text-xs text-slate-400">Calculus & Linear Algebra fundamentals</p>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
              Mastered
            </span>
          </div>

          {/* Milestone 2: Classification Models (Active Focus) */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF0F4]/15 border border-[#F5CAD6] shadow-sm">
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#F5CAD6] text-[#181B28] flex items-center justify-center shrink-0 font-bold text-sm">
                2
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-heading font-bold text-sm text-white">
                    2. Classification Models
                  </h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#7E2948] text-white">
                    Active Focus
                  </span>
                </div>
                <p className="text-xs text-slate-300">Logistic regression, boundaries & loss curves</p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#F5CAD6]">
              60% Ready
            </span>
          </div>

          {/* Milestone 3: Model Evaluation (Next) */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 opacity-80">
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 text-slate-300 flex items-center justify-center shrink-0 font-bold text-sm">
                3
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-slate-200">
                  3. Evaluation & Metrics
                </h4>
                <p className="text-xs text-slate-400">PR-AUC, ROC curves & threshold optimization</p>
              </div>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              Next Up
            </span>
          </div>

          {/* Milestone 4: Deep Neural Networks (Locked) */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 opacity-50">
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-white/5 text-slate-500 flex items-center justify-center shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-slate-300">
                  4. Deep Neural Networks
                </h4>
                <p className="text-xs text-slate-500">Backpropagation, attention & embeddings</p>
              </div>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Locked
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Award className="w-4 h-4 text-[#F5CAD6]" />
            <span>Path will sync automatically with your practice drills</span>
          </div>

          <button
            onClick={handleLaunchDashboard}
            className="w-full sm:w-auto clay-btn-plum px-8 py-3.5 text-sm font-semibold flex items-center justify-center gap-3 cursor-pointer group shadow-xl"
          >
            <span>Enter Dashboard</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </main>

      <footer className="max-w-3xl mx-auto w-full text-center text-xs text-slate-500">
        Free persistent navigation is now unlocked across all platform pages.
      </footer>
    </div>
  );
};
