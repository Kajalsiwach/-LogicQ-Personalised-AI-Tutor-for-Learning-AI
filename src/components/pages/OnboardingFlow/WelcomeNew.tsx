import React from 'react';
import { useApp } from '../../../context/AppContext';
import { ArrowRight, Sparkles, Brain, Compass } from 'lucide-react';
import { Logo } from '../../common/Logo';

export const WelcomeNew: React.FC = () => {
  const { setOnboardingStep } = useApp();

  return (
    <div className="min-h-screen flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden bg-[#070B14]">
      {/* Top Bar */}
      <header className="flex items-center justify-between z-10 max-w-6xl mx-auto w-full">
        <Logo />
        <div className="flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs text-slate-400">
          <Brain className="w-3.5 h-3.5 text-[#F5CAD6]" />
          <span>AI/ML Intelligent Learning</span>
        </div>
      </header>

      {/* Main Hero Content */}
      <main className="max-w-4xl mx-auto w-full py-12 z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-[#F5CAD6] text-xs font-semibold mb-8 border border-white/10">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Personalized Adaptive Learning</span>
        </div>

        <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08] mb-6">
          LEARN SMARTER.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F5CAD6] to-[#E598AC]">
            BUILD BETTER.
          </span>
        </h1>

        <p className="font-editorial italic text-2xl sm:text-3xl text-slate-300 max-w-2xl leading-relaxed mb-10">
          Select your target AI/ML concepts and calibrate your personalized curriculum.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <button
            onClick={() => setOnboardingStep('concepts')}
            className="clay-btn-plum px-8 py-4 text-base font-semibold flex items-center justify-center gap-3 cursor-pointer group shadow-xl"
          >
            <span>Choose AI/ML Concepts</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </button>

          <div className="flex items-center gap-2.5 px-4 py-3.5 rounded-2xl glass-pill text-xs text-slate-300">
            <Compass className="w-4 h-4 text-[#F5CAD6]" />
            <span>Foundations, LLMs, Agents, Vision & Reasoning</span>
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="max-w-6xl mx-auto w-full z-10 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4 pt-8 border-t border-white/[0.05]">
        <p>© LOGIQ Intelligent Learning. Dedicated AI/ML Specialization.</p>
        <div className="flex items-center gap-6">
          <span>Targeted Mastery</span>
          <span>•</span>
          <span>Adaptive Knowledge Tree</span>
          <span>•</span>
          <span>Zero Fabricated Metrics</span>
        </div>
      </footer>
    </div>
  );
};
