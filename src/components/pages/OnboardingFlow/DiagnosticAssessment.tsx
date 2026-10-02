import React, { useState, useMemo } from 'react';
import { useApp } from '../../../context/AppContext';
import { DiagnosticQuestion, ConceptMasteryScore } from '../../../types';
import { buildAdaptiveAssessment, AIML_CONCEPTS } from '../../../data/aimlConcepts';
import { ArrowRight, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import { Logo } from '../../common/Logo';

export const DiagnosticAssessment: React.FC = () => {
  const {
    selectedConcepts,
    interests,
    recordDiagnosticAnswer,
    finishDiagnostic,
    setOnboardingStep,
  } = useApp();

  // Build adaptive assessment: 10 to 15 questions based on complexity, breadth, and chosen concepts
  const { questions, totalCount } = useMemo(() => {
    return buildAdaptiveAssessment(selectedConcepts, interests.experienceLevel);
  }, [selectedConcepts, interests.experienceLevel]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Performance tracking per question
  const [answersRecord, setAnswersRecord] = useState<
    Array<{ question: DiagnosticQuestion; chosenIndex: number; isCorrect: boolean }>
  >([]);

  const currentQ = questions[currentIndex];
  const conceptMeta = AIML_CONCEPTS.find(c => c.id === currentQ?.conceptId);

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    recordDiagnosticAnswer(currentIndex, index);

    const isCorrect = index === currentQ.correctIndex;
    setAnswersRecord(prev => [
      ...prev,
      { question: currentQ, chosenIndex: index, isCorrect },
    ]);
  };

  const handleNext = () => {
    if (currentIndex < totalCount - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Assessment completed: calculate granular analysis
      const totalAnswered = answersRecord.length;
      const totalCorrect = answersRecord.filter(a => a.isCorrect).length;
      const scorePercentage = Math.round((totalCorrect / Math.max(1, totalAnswered)) * 100);

      // Determine Knowledge Level
      let levelTitle = 'Core Practitioner';
      if (scorePercentage >= 80) {
        levelTitle = 'Advanced Specialist';
      } else if (scorePercentage >= 60) {
        levelTitle = 'Core Practitioner';
      } else if (scorePercentage >= 40) {
        levelTitle = 'Developing Learner';
      } else {
        levelTitle = 'Foundational Explorer';
      }

      // Compute concept-by-concept breakdown
      const conceptStats: Record<string, { correct: number; total: number }> = {};
      answersRecord.forEach(ans => {
        const cId = ans.question.conceptId;
        if (!conceptStats[cId]) {
          conceptStats[cId] = { correct: 0, total: 0 };
        }
        conceptStats[cId].total += 1;
        if (ans.isCorrect) {
          conceptStats[cId].correct += 1;
        }
      });

      const breakdown: ConceptMasteryScore[] = Object.keys(conceptStats).map(cId => {
        const meta = AIML_CONCEPTS.find(c => c.id === cId);
        const st = conceptStats[cId];
        return {
          conceptId: cId,
          conceptName: meta ? meta.name : cId,
          correct: st.correct,
          total: st.total,
          percentage: Math.round((st.correct / st.total) * 100),
        };
      });

      // Extract specific strengths and gaps
      const strengths: string[] = [];
      const gaps: string[] = [];

      breakdown.forEach(item => {
        if (item.percentage >= 60) {
          strengths.push(`${item.conceptName} (${item.correct}/${item.total} verified)`);
        } else {
          gaps.push(`${item.conceptName} (Priority reinforcement)`);
        }
      });

      if (strengths.length === 0) {
        strengths.push('Growth baseline established across core mathematics & intuition');
      }
      if (gaps.length === 0) {
        gaps.push('Advanced production architectures and scaling optimizations');
      }

      finishDiagnostic(scorePercentage, totalCount, levelTitle, strengths, gaps, breakdown);
      setOnboardingStep('analysis');
    }
  };

  if (!currentQ) return null;

  return (
    <div className="min-h-screen flex flex-col justify-between p-6 sm:p-12 bg-[#070B14]">
      {/* Top Header */}
      <header className="flex items-center justify-between z-10 max-w-3xl mx-auto w-full">
        <Logo />
        <div className="flex items-center gap-3 text-xs font-semibold text-slate-400">
          <span className="text-[#F5CAD6]">Step 3 of 5</span>
          <span>•</span>
          <span className="text-white font-mono">
            Question {currentIndex + 1} of {totalCount}
          </span>
        </div>
      </header>

      {/* Main Diagnostic Area */}
      <main className="max-w-3xl mx-auto w-full py-8 z-10">
        {/* Dynamic Progress Bar */}
        <div className="w-full h-2 bg-white/10 rounded-full mb-8 overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-[#7E2948] via-[#B84E72] to-[#E598AC] rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalCount) * 100}%` }}
          />
        </div>

        <div className="glass-card-dark rounded-3xl p-6 sm:p-8 border border-white/10">
          {/* Concept & Difficulty Badges */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#E598AC] flex items-center gap-1.5">
              <span>Adaptive Check</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300 capitalize">{currentQ.difficulty}</span>
            </span>

            {conceptMeta && (
              <span className="text-[11px] font-semibold text-[#F5CAD6] bg-[#FAF0F4]/10 px-3 py-1 rounded-full border border-[#F5CAD6]/20">
                {conceptMeta.name}
              </span>
            )}
          </div>

          <h2 className="font-heading font-bold text-xl sm:text-2xl text-white mt-1 mb-4 leading-snug">
            {currentQ.question}
          </h2>

          {currentQ.codeSnippet && (
            <div className="mb-6 p-4 rounded-xl bg-black/45 font-mono text-xs text-[#F5CAD6] border border-white/5">
              <code>{currentQ.codeSnippet}</code>
            </div>
          )}

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let style = 'bg-white/5 border-white/10 hover:border-white/20 text-slate-200';
              if (isAnswered) {
                if (isCorrect) {
                  style = 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200 font-semibold';
                } else if (isSelected && !isCorrect) {
                  style = 'bg-rose-950/40 border-rose-500/50 text-rose-200';
                } else {
                  style = 'bg-white/5 border-white/5 text-slate-500 opacity-50';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-2xl border transition-all text-sm font-medium flex items-center justify-between gap-4 cursor-pointer ${style}`}
                >
                  <span>{option}</span>
                  {isAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation reveal */}
          {isAnswered && (
            <div className="p-4 rounded-2xl bg-[#7E2948]/15 border border-[#E598AC]/25 mb-6">
              <span className="text-xs font-bold text-[#F5CAD6] block mb-1">
                Insight:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {isAnswered && (
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400 font-mono">
                {currentIndex + 1} / {totalCount} completed
              </span>

              <button
                onClick={handleNext}
                className="clay-btn-plum px-7 py-3 text-xs font-semibold flex items-center gap-2 cursor-pointer group"
              >
                <span>
                  {currentIndex < totalCount - 1
                    ? 'Next Question'
                    : 'Complete Assessment & View Analysis'}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="max-w-3xl mx-auto w-full text-center text-xs text-slate-500">
        Assessment size ({totalCount} questions) was calibrated from your selected topics' complexity and breadth.
      </footer>
    </div>
  );
};
