import React from 'react';
import { useApp } from '../../../context/AppContext';
import { GoalTrack } from '../../../types';
import { ArrowRight, CheckCircle2, Circle, Brain, Cpu, Database } from 'lucide-react';
import { Logo } from '../../common/Logo';

const availableTracks: (GoalTrack & { icon: React.ComponentType<{ className?: string }> })[] = [
  {
    id: 'ai-ml',
    title: 'Machine Learning & AI Systems',
    tagline: 'From Statistical Learning to Deep Neural Architectures',
    description: 'Master supervised learning, regularized regression, gradient tree boosting, and neural representations.',
    duration: '6-8 Weeks',
    topicsCount: 24,
    level: 'Intermediate',
    icon: Brain,
  },
  {
    id: 'deep-learning',
    title: 'Deep Learning & LLM Foundations',
    tagline: 'Transformers, Attention Mechanisms & Generative Models',
    description: 'Explore multi-head attention, diffusion dynamics, parameter-efficient fine-tuning, and alignment.',
    duration: '8-10 Weeks',
    topicsCount: 32,
    level: 'Advanced',
    icon: Cpu,
  },
  {
    id: 'data-algorithms',
    title: 'Algorithmic Systems & Data Structures',
    tagline: 'Computational Complexity & Scalable Architectures',
    description: 'Strengthen asymptotic complexity, graph traversals, dynamic programming, and concurrent data pipelines.',
    duration: '4-6 Weeks',
    topicsCount: 18,
    level: 'Beginner',
    icon: Database,
  },
];

export const GoalSelection: React.FC = () => {
  const { selectedGoal, setSelectedGoal, setOnboardingStep } = useApp();

  return (
    <div className="min-h-screen flex flex-col justify-between p-6 sm:p-12 bg-[#080C15]">
      {/* Top Bar with Step Indicator */}
      <header className="flex items-center justify-between z-10 max-w-4xl mx-auto w-full">
        <Logo />
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <span className="text-[#F5CAD6]">Step 1</span>
          <span>of 4: Choose Track</span>
        </div>
      </header>

      {/* Main Track Selection */}
      <main className="max-w-4xl mx-auto w-full py-10 z-10">
        <div className="mb-8 text-center sm:text-left">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white mb-3">
            SELECT YOUR CORE FOCUS
          </h2>
          <p className="font-editorial italic text-slate-300 text-lg sm:text-xl">
            Choose what you want to master. We will calibrate your diagnostic assessment accordingly.
          </p>
        </div>

        <div className="space-y-4 mb-10">
          {availableTracks.map(track => {
            const Icon = track.icon;
            const isSelected = selectedGoal === track.id;

            return (
              <div
                key={track.id}
                onClick={() => setSelectedGoal(track.id)}
                className={`p-6 rounded-3xl cursor-pointer transition-all border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 ${
                  isSelected
                    ? 'bg-[#FAF0F4]/15 border-[#F5CAD6] shadow-lg shadow-[#F5CAD6]/5'
                    : 'glass-card-dark border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-all ${
                      isSelected
                        ? 'bg-[#F5CAD6] text-[#151926] border-[#F5CAD6]'
                        : 'bg-white/5 text-slate-300 border-white/10'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-heading font-bold text-lg text-white">
                        {track.title}
                      </h3>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                        {track.level}
                      </span>
                    </div>
                    <p className="font-editorial italic text-sm text-[#F5CAD6] mb-1">
                      {track.tagline}
                    </p>
                    <p className="text-xs text-slate-400 max-w-xl">
                      {track.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
                  <span className="text-xs text-slate-400 font-mono">
                    {track.topicsCount} Topics
                  </span>
                  {isSelected ? (
                    <CheckCircle2 className="w-6 h-6 text-[#F5CAD6]" />
                  ) : (
                    <Circle className="w-6 h-6 text-slate-500" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => setOnboardingStep('diagnostic')}
            className="clay-btn-plum px-8 py-3.5 text-sm font-semibold flex items-center gap-3 cursor-pointer group"
          >
            <span>Start Diagnostic</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </main>

      <footer className="max-w-4xl mx-auto w-full text-center text-xs text-slate-500">
        You can change or add secondary tracks anytime in your Profile.
      </footer>
    </div>
  );
};
