import React from 'react';
import { useApp } from '../../../context/AppContext';
import { generateCurriculumRoadmap } from '../../../data/aimlConcepts';
import { ArrowRight, CheckCircle2, Lock, Sparkles, BookOpen, Clock } from 'lucide-react';
import { Logo } from '../../common/Logo';
import confetti from 'canvas-confetti';

export const PathCreation: React.FC = () => {
  const { selectedConcepts, userState, finalizeOnboarding } = useApp();

  const generatedNodes = React.useMemo(() => {
    return generateCurriculumRoadmap(
      selectedConcepts.length > 0
        ? selectedConcepts
        : ['machine-learning', 'deep-learning'],
      userState.diagnosticScore
    );
  }, [selectedConcepts, userState.diagnosticScore]);

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
      finalizeOnboarding();
    }, 350);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-6 sm:p-12 bg-[#070B14]">
      {/* Top Header */}
      <header className="flex items-center justify-between z-10 max-w-4xl mx-auto w-full">
        <Logo />
        <div className="flex items-center gap-3 text-xs font-semibold text-slate-400">
          <span className="text-[#F5CAD6]">Step 5 of 5</span>
          <span>•</span>
          <span>Curriculum Ready</span>
        </div>
      </header>

      {/* Main Path Reveal */}
      <main className="max-w-4xl mx-auto w-full py-6 z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-[#F5CAD6] text-xs font-semibold mb-3 border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Personalized AI/ML Curriculum</span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white mb-2 tracking-tight">
            YOUR AI/ML LEARNING ROADMAP
          </h2>
          <p className="font-editorial italic text-slate-300 text-lg">
            Structured step-by-step from foundational models to advanced architectures.
          </p>
        </div>

        {/* Dynamic Nodes Sequence */}
        <div className="glass-card-dark rounded-3xl p-6 sm:p-8 border border-white/10 mb-8 space-y-3.5">
          {generatedNodes.map((node, index) => {
            const isFirst = index === 0;

            return (
              <div
                key={node.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border transition-all ${
                  isFirst
                    ? 'clay-card-light'
                    : 'bg-white/5 border-white/5 opacity-80'
                }`}
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm ${
                      isFirst
                        ? 'bg-[#7E2948] text-white'
                        : 'bg-white/10 text-slate-300'
                    }`}
                  >
                    {index + 1}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4
                        className={`font-heading font-bold text-sm ${
                          isFirst ? 'text-[#181B28]' : 'text-white'
                        }`}
                      >
                        {node.title}
                      </h4>
                      {isFirst ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#7E2948] text-white">
                          Current Focus
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400">
                          Upcoming
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className={isFirst ? 'text-slate-600' : 'text-slate-400'}>
                        {node.category}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" /> {node.lessonsCount} lessons
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  {isFirst ? (
                    <span className="text-xs font-bold text-[#7E2948] bg-[#7E2948]/10 px-2.5 py-1 rounded-lg">
                      0% • Ready to Start
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" /> Locked
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Launch */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <p className="text-xs text-slate-400">
            All progress and quiz scores will update your real stats automatically.
          </p>

          <button
            onClick={handleLaunchDashboard}
            className="w-full sm:w-auto clay-btn-plum px-8 py-3.5 text-xs font-semibold flex items-center justify-center gap-3 cursor-pointer group shadow-xl"
          >
            <span>Enter Dashboard</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </main>

      <footer className="max-w-4xl mx-auto w-full text-center text-xs text-slate-500">
        LOGIQ stores your roadmap and activity in your browser session.
      </footer>
    </div>
  );
};
