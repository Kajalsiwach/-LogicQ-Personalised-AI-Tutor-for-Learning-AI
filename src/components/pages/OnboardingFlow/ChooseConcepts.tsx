import React from 'react';
import { useApp } from '../../../context/AppContext';
import { AIML_CONCEPTS } from '../../../data/aimlConcepts';
import { ArrowRight, CheckCircle2, Circle, Sparkles, Check, ChevronLeft } from 'lucide-react';
import { Logo } from '../../common/Logo';

export const ChooseConcepts: React.FC = () => {
  const {
    selectedConcepts,
    toggleConceptSelection,
    setOnboardingStep,
  } = useApp();

  const handleNext = () => {
    if (selectedConcepts.length === 0) return;
    setOnboardingStep('interests');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-6 sm:p-12 bg-[#070B14]">
      {/* Top Header */}
      <header className="flex items-center justify-between z-10 max-w-5xl mx-auto w-full">
        <Logo />
        <div className="flex items-center gap-3 text-xs font-semibold text-slate-400">
          <span className="text-[#F5CAD6]">Step 1 of 5</span>
          <span>•</span>
          <span>Choose AI/ML Concepts</span>
        </div>
      </header>

      {/* Main Concept Selector */}
      <main className="max-w-5xl mx-auto w-full py-8 z-10">
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-[#F5CAD6] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curriculum Customizer</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white mb-2 tracking-tight">
            SELECT YOUR AI/ML CONCEPTS
          </h2>
          <p className="font-editorial italic text-slate-300 text-lg sm:text-xl">
            Pick the foundational and advanced areas you want to study. Select at least one to personalize your path.
          </p>
        </div>

        {/* 2x4 Concept Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {AIML_CONCEPTS.map(concept => {
            const isSelected = selectedConcepts.includes(concept.id);

            return (
              <div
                key={concept.id}
                onClick={() => toggleConceptSelection(concept.id)}
                className={`p-5 sm:p-6 rounded-3xl cursor-pointer transition-all duration-200 border flex flex-col justify-between select-none ${
                  isSelected
                    ? 'clay-card-light'
                    : 'glass-card-dark border-white/5 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-[#7E2948]/12 text-[#7E2948]'
                          : 'bg-white/5 text-slate-400 border border-white/10'
                      }`}
                    >
                      {concept.category}
                    </span>

                    <div className="flex items-center gap-2">
                      {concept.isPopular && !isSelected && (
                        <span className="text-[10px] font-semibold text-[#F5CAD6] bg-[#FAF0F4]/10 px-2 py-0.5 rounded-full">
                          Core
                        </span>
                      )}
                      {isSelected ? (
                        <div className="w-6 h-6 rounded-full bg-[#7E2948] text-white flex items-center justify-center shadow-sm">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      ) : (
                        <Circle className="w-6 h-6 text-slate-500" />
                      )}
                    </div>
                  </div>

                  <h3
                    className={`font-heading font-extrabold text-lg sm:text-xl mb-1.5 tracking-tight ${
                      isSelected ? 'text-[#181B28]' : 'text-white'
                    }`}
                  >
                    {concept.name}
                  </h3>

                  <p
                    className={`text-xs leading-relaxed mb-4 ${
                      isSelected ? 'text-slate-700' : 'text-slate-400'
                    }`}
                  >
                    {concept.description}
                  </p>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200/50 dark:border-white/5">
                  {concept.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-lg ${
                        isSelected
                          ? 'bg-white/90 text-slate-800 border border-slate-200'
                          : 'bg-white/5 text-slate-400'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Control Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOnboardingStep('welcome')}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <span className="text-xs font-semibold text-slate-300">
              {selectedConcepts.length === 0 ? (
                <span className="text-amber-300">Please choose at least 1 concept</span>
              ) : (
                <span className="text-[#F5CAD6]">{selectedConcepts.length} concept(s) selected</span>
              )}
            </span>
          </div>

          <button
            onClick={handleNext}
            disabled={selectedConcepts.length === 0}
            className={`clay-btn-plum px-8 py-3.5 text-xs font-semibold flex items-center gap-2 cursor-pointer group ${
              selectedConcepts.length === 0 ? 'opacity-40 pointer-events-none' : ''
            }`}
          >
            <span>Next: Define Learning Interests</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </main>

      <footer className="max-w-5xl mx-auto w-full text-center text-xs text-slate-500">
        You can always add more AI/ML concepts anytime after onboarding.
      </footer>
    </div>
  );
};
