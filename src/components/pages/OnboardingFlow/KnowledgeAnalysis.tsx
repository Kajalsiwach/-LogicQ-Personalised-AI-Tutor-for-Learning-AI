import React from 'react';
import { useApp } from '../../../context/AppContext';
import { ArrowRight, CheckCircle2, TrendingUp, Target, Sparkles, Brain, Award } from 'lucide-react';
import { Logo } from '../../common/Logo';

export const KnowledgeAnalysis: React.FC = () => {
  const { userState, setOnboardingStep } = useApp();

  const {
    diagnosticScore,
    totalDiagnosticQuestions,
    diagnosticLevel,
    diagnosticStrengths,
    diagnosticGaps,
    conceptBreakdown,
    interests,
  } = userState;

  return (
    <div className="min-h-screen flex flex-col justify-between p-6 sm:p-12 bg-[#070B14]">
      {/* Top Header */}
      <header className="flex items-center justify-between z-10 max-w-4xl mx-auto w-full">
        <Logo />
        <div className="flex items-center gap-3 text-xs font-semibold text-slate-400">
          <span className="text-[#F5CAD6]">Step 4 of 5</span>
          <span>•</span>
          <span>Knowledge Analysis</span>
        </div>
      </header>

      {/* Main Analysis Results */}
      <main className="max-w-4xl mx-auto w-full py-8 z-10">
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-[#F5CAD6] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Diagnostic Calibration Results</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white mb-2 tracking-tight">
            YOUR AI/ML KNOWLEDGE PROFILE
          </h2>
          <p className="font-editorial italic text-slate-300 text-lg sm:text-xl">
            Derived from your {totalDiagnosticQuestions || 12}-question adaptive assessment across your chosen concepts.
          </p>
        </div>

        {/* Score & Profile Summary Banner */}
        <div className="glass-card-dark rounded-3xl p-6 sm:p-7 border border-white/10 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#7E2948] to-[#E598AC] flex flex-col items-center justify-center text-white shrink-0 shadow-lg border border-white/20">
              <span className="font-heading font-black text-3xl leading-none">{diagnosticScore}%</span>
              <span className="text-[10px] font-mono text-pink-200 mt-1 uppercase font-bold">Accuracy</span>
            </div>
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-[#F5CAD6]">
                Assessed Profile Level
              </div>
              <h3 className="font-heading font-extrabold text-2xl text-white">
                {diagnosticLevel || 'Core Practitioner'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Evaluated against {totalDiagnosticQuestions || 12} foundational & intermediate checkpoints
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 self-stretch sm:self-auto flex flex-col justify-center">
            <span className="text-[11px] font-semibold text-slate-400">Planned Velocity</span>
            <span className="text-xs font-bold text-[#F5CAD6]">{interests.weeklyPace}</span>
            <span className="text-[11px] text-slate-500 mt-0.5">{interests.primaryGoal}</span>
          </div>
        </div>

        {/* Concept Breakdown Grid */}
        {conceptBreakdown && conceptBreakdown.length > 0 && (
          <div className="glass-card-dark rounded-3xl p-6 sm:p-7 border border-white/10 mb-6">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#F5CAD6]" />
              <span>Concept-by-Concept Proficiency</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {conceptBreakdown.map(item => (
                <div key={item.conceptId} className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex justify-between text-xs font-semibold mb-1.5">
                    <span className="text-slate-200">{item.conceptName}</span>
                    <span className="text-[#F5CAD6] font-bold">
                      {item.correct}/{item.total} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#7E2948] to-[#E598AC] rounded-full"
                      style={{ width: `${Math.max(item.percentage, 5)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2-column breakdown: Strengths vs Growth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Strengths Card */}
          <div className="clay-card-light p-6 sm:p-7 text-[#181B28]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-lg text-[#181B28]">
                  Verified Strengths
                </h4>
                <p className="text-xs text-slate-600">Concepts validated in your check</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {diagnosticStrengths.map((str, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-white/70 border border-slate-200/60 flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs font-semibold text-slate-800">{str}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Growth Opportunities */}
          <div className="clay-card-light p-6 sm:p-7 text-[#181B28]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#7E2948]/12 text-[#7E2948] flex items-center justify-center font-bold">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-lg text-[#181B28]">
                  Primary Focus Areas
                </h4>
                <p className="text-xs text-slate-600">Where your personalized lessons start</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {diagnosticGaps.map((gap, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-white/70 border border-slate-200/60 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#7E2948] shrink-0" />
                  <span className="text-xs font-semibold text-slate-800">{gap}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={() => setOnboardingStep('path-created')}
            className="clay-btn-plum px-8 py-3.5 text-xs font-semibold flex items-center gap-2 cursor-pointer group shadow-xl"
          >
            <span>Generate Personalized AI/ML Path</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </main>

      <footer className="max-w-4xl mx-auto w-full text-center text-xs text-slate-500">
        Your curriculum is generated specifically from your answers, skipping unneeded intro material.
      </footer>
    </div>
  );
};
