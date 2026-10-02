import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CURATED_LESSONS } from '../../data/lessonsData';
import { LessonPracticeQuestion, PracticeReportData } from '../../types';
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Target,
  RotateCcw,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const PracticePage: React.FC = () => {
  const { userState, recordPracticeResult, setActivePage } = useApp();

  const activeConceptId = userState.selectedConcepts[0] || 'machine-learning';
  const lessonData = CURATED_LESSONS[activeConceptId] || CURATED_LESSONS['machine-learning'];

  const [isUsingRecoverySet, setIsUsingRecoverySet] = useState(false);
  const activeQuestions = isUsingRecoverySet
    ? lessonData.recoveryPracticeSet
    : lessonData.practiceSet;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answers, setAnswers] = useState<
    Array<{ question: LessonPracticeQuestion; chosenIndex: number; isCorrect: boolean }>
  >([]);

  const [report, setReport] = useState<PracticeReportData | null>(null);
  const [showRevisionNotes, setShowRevisionNotes] = useState(false);

  const currentQ = activeQuestions[questionIndex];

  const handleSelect = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
    setIsSubmitted(true);

    const isCorrect = idx === currentQ.correctIndex;
    setAnswers(prev => [
      ...prev,
      { question: currentQ, chosenIndex: idx, isCorrect },
    ]);
  };

  const handleNext = () => {
    if (questionIndex < activeQuestions.length - 1) {
      setQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      // Completed all questions
      const total = activeQuestions.length;
      const correct = answers.filter(a => a.isCorrect).length;
      const scorePct = Math.round((correct / Math.max(1, total)) * 100);
      const isPassed = scorePct >= 75;

      const strong: string[] = [];
      const weak: string[] = [];

      answers.forEach(a => {
        if (a.isCorrect) {
          if (!strong.includes(a.question.conceptTag)) strong.push(a.question.conceptTag);
        } else {
          if (!weak.includes(a.question.conceptTag)) weak.push(a.question.conceptTag);
        }
      });

      if (isPassed) {
        try {
          confetti({
            particleCount: 40,
            spread: 50,
            origin: { y: 0.6 },
            colors: ['#F5CAD6', '#7E2948', '#38BDF8'],
          });
        } catch {
          // safe fallback
        }
      }

      // Record real result in AppContext
      recordPracticeResult(
        `Practice: ${lessonData.title}`,
        `${correct}/${total} (${scorePct}%)`,
        isPassed
      );

      setReport({
        totalQuestions: total,
        correctCount: correct,
        scorePercentage: scorePct,
        isPassed,
        strongConcepts: strong.length > 0 ? strong : ['Fundamental Intuition'],
        needsReviewConcepts: weak,
        summaryMessage: isPassed
          ? 'Strong performance! You have grasped the technical mechanisms taught in this module.'
          : "You're getting there. This concept needs a little more practice before moving on.",
        recommendedAction: isPassed
          ? 'Proceed to your dashboard or continue to the next chapter.'
          : 'Review weak areas below and attempt another practice set.',
      });
    }
  };

  const handleResetOrTryNew = () => {
    setIsUsingRecoverySet(prev => !prev);
    setQuestionIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setAnswers([]);
    setReport(null);
    setShowRevisionNotes(false);
  };

  return (
    <div className="space-y-6 w-full max-w-5xl mx-auto pb-20 md:pb-8 animate-page-entrance">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#E598AC]">
            Interactive Practice Arena
          </span>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight mt-1">
            PRACTICE TEST & MASTERY DRILLS
          </h1>
          <p className="font-editorial italic text-slate-300 text-sm sm:text-base mt-1">
            {lessonData.title}
          </p>
        </div>

        {!report && (
          <div className="px-3.5 py-1.5 rounded-full glass-pill text-xs font-mono font-bold text-[#F5CAD6] self-start sm:self-auto">
            Question {questionIndex + 1} of {activeQuestions.length}
          </div>
        )}
      </div>

      {!report ? (
        <>
          {/* Progress bar */}
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-[#7E2948] via-[#B84E72] to-[#E598AC] rounded-full transition-all duration-300"
              style={{ width: `${((questionIndex + 1) / activeQuestions.length) * 100}%` }}
            />
          </div>

          {/* Practice Question Card */}
          <div className="clay-card-light p-6 sm:p-9 text-[#181B28]">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-[#7E2948]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7E2948]">
                {currentQ.conceptTag}
              </span>
            </div>

            <h3 className="font-heading font-bold text-lg sm:text-xl text-[#181B28] mb-5 leading-snug">
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;

                let style = 'bg-white/70 border-slate-200/80 hover:bg-white text-slate-800';
                if (isSubmitted) {
                  if (isCorrect) {
                    style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold shadow-xs';
                  } else if (isSelected && !isCorrect) {
                    style = 'bg-rose-50 border-rose-400 text-rose-950 font-semibold';
                  } else {
                    style = 'bg-white/35 border-slate-200 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={isSubmitted}
                    className={`w-full text-left p-4 rounded-2xl border transition-all text-xs sm:text-sm flex items-center justify-between gap-4 cursor-pointer ${style}`}
                  >
                    <span>{option}</span>
                    {isSubmitted && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isSubmitted && isSelected && !isCorrect && (
                      <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Immediate Answer Feedback */}
            {isSubmitted && (
              <div
                className={`p-5 rounded-2xl border mb-6 transition-all ${
                  selectedOption === currentQ.correctIndex
                    ? 'bg-emerald-950/20 border-emerald-500/40'
                    : 'bg-[#7E2948]/12 border-[#7E2948]/30'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {selectedOption === currentQ.correctIndex ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span className="text-xs font-bold text-emerald-800">
                        Correct answer verified!
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-[#7E2948]" />
                      <span className="text-xs font-bold text-[#7E2948]">
                        Not quite yet — Here is why:
                      </span>
                    </>
                  )}
                </div>

                <div className="space-y-2 text-xs text-slate-700 font-medium leading-relaxed">
                  <p>
                    <strong>Why it is correct: </strong>
                    {currentQ.whyCorrect}
                  </p>
                  {selectedOption !== currentQ.correctIndex && (
                    <p>
                      <strong>Why other options are incorrect: </strong>
                      {currentQ.whyIncorrect}
                    </p>
                  )}
                  <p className="text-[11px] text-slate-500 italic pt-1 border-t border-slate-200/50">
                    {currentQ.lessonConnection}
                  </p>
                </div>
              </div>
            )}

            {/* Action Trigger */}
            {isSubmitted && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNext}
                  className="clay-btn-plum px-7 py-3 text-xs font-semibold flex items-center gap-2 group cursor-pointer shadow-lg"
                >
                  <span>
                    {questionIndex < activeQuestions.length - 1
                      ? 'Next Question'
                      : 'Generate Practice Report'}
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        /* PRACTICE REPORT VIEW */
        <div className="clay-card-light p-6 sm:p-9 text-[#181B28] space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-4">
              <div
                className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-bold text-white shadow-md ${
                  report.isPassed
                    ? 'bg-gradient-to-tr from-[#7E2948] to-[#E598AC]'
                    : 'bg-gradient-to-tr from-slate-700 to-slate-900'
                }`}
              >
                <span className="font-heading font-black text-2xl leading-none">
                  {report.scorePercentage}%
                </span>
                <span className="text-[10px] font-mono mt-0.5">
                  {report.correctCount}/{report.totalQuestions}
                </span>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#7E2948]">
                  Practice Evaluation
                </span>
                <h3 className="font-heading font-extrabold text-xl text-[#181B28]">
                  {report.correctCount} of {report.totalQuestions} Correct
                </h3>
              </div>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                report.isPassed
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {report.isPassed ? 'Target Passed ✓' : 'Practice In Progress'}
            </span>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-800">
              {report.summaryMessage}
            </p>
            <p className="text-xs text-slate-600">
              <strong>Next Action: </strong>
              {report.recommendedAction}
            </p>
          </div>

          {/* Strong vs Needs Review Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3">
            <div className="p-4 rounded-2xl bg-white/70 border border-slate-200/70 space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>Strong Understanding</span>
              </div>
              <div className="space-y-1">
                {report.strongConcepts.map((item, idx) => (
                  <div key={idx} className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/70 border border-slate-200/70 space-y-2">
              <div className="flex items-center gap-2 text-[#7E2948] font-bold text-xs uppercase tracking-wider">
                <AlertCircle className="w-4 h-4" />
                <span>Needs Reinforcement</span>
              </div>
              <div className="space-y-1">
                {report.needsReviewConcepts.length > 0 ? (
                  report.needsReviewConcepts.map((item, idx) => (
                    <div key={idx} className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7E2948]" />
                      <span>{item}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 italic">
                    None! All concepts answered correctly.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Quick Review Notes */}
          {report.needsReviewConcepts.length > 0 && showRevisionNotes && (
            <div className="p-4 rounded-2xl bg-[#FAF0F4] border border-[#F5CAD6] space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7E2948] block">
                Targeted Concept Revision Notes:
              </span>
              {report.needsReviewConcepts.map((conceptTag, idx) => {
                const note = lessonData.recoveryNotes[conceptTag];
                return (
                  <div key={idx} className="text-xs text-slate-700 space-y-0.5">
                    <strong className="text-slate-900 block">• {conceptTag}:</strong>
                    <p className="pl-3 text-slate-600 font-medium">
                      {note || 'Review the core definitions in the lesson explanation.'}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-3">
              {report.needsReviewConcepts.length > 0 && (
                <button
                  onClick={() => setShowRevisionNotes(prev => !prev)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-white cursor-pointer"
                >
                  {showRevisionNotes ? 'Hide Revision Notes' : 'Quick Review Weak Areas'}
                </button>
              )}
              <button
                onClick={() => setActivePage('learn')}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Go to Lesson Explanation
              </button>
            </div>

            <button
              onClick={handleResetOrTryNew}
              className="clay-btn-plum px-7 py-3 text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{report.isPassed ? 'Practice Another Set' : 'Try Another Practice Set'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
