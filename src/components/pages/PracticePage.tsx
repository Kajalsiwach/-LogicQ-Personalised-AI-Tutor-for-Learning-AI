import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, ArrowRight, RotateCcw, Target, Sparkles, Zap } from 'lucide-react';

interface PracticeProblem {
  id: number;
  question: string;
  context: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const practiceSet: PracticeProblem[] = [
  {
    id: 1,
    question: 'You lower the classification threshold of a cancer detection model from 0.50 to 0.20. What effect does this have on Precision and Recall?',
    context: 'Recall measures sensitivity to positives; Precision measures purity of positive predictions.',
    options: [
      'Recall increases (fewer false negatives), but Precision decreases (more false positives).',
      'Both Precision and Recall simultaneously increase.',
      'Precision increases, but Recall decreases.',
      'Neither metric changes because model weights are fixed.',
    ],
    correctIndex: 0,
    explanation:
      'Lowering the threshold makes the model more eager to flag positives. You catch more actual cancer cases (higher Recall), but at the expense of predicting more healthy patients as positive (lower Precision).',
  },
  {
    id: 2,
    question: 'Under what condition does the ROC curve become identical to random guessing?',
    context: 'Evaluating True Positive Rate vs False Positive Rate.',
    options: [
      'When the curve traces the diagonal identity line y = x (AUC = 0.50).',
      'When the curve reaches the top-left corner (0, 1).',
      'When the Area Under the Curve equals 1.0.',
      'When accuracy matches the base rate of the negative class.',
    ],
    correctIndex: 0,
    explanation:
      'A completely uninformative classifier outputs predictions uncorrelated with the ground truth, producing equal TPR and FPR at any threshold (diagonal line with AUC = 0.50).',
  },
];

export const PracticePage: React.FC = () => {
  const { addActivity } = useApp();
  const [mode, setMode] = useState<'standard' | 'weak-area' | 'speed'>('standard');
  const [problemIndex, setProblemIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [scoreCount, setScoreCount] = useState(0);

  const problem = practiceSet[problemIndex];

  const handleSelect = (idx: number) => {
    if (submitted) return;
    setSelectedAnswer(idx);
    setSubmitted(true);
    if (idx === problem.correctIndex) {
      setScoreCount(prev => prev + 1);
      addActivity({
        id: Date.now().toString(),
        title: 'Precision-Recall Drill',
        type: 'practice',
        timestamp: 'Just now',
        score: '100%',
        status: 'Correct',
      });
    }
  };

  const handleNextProblem = () => {
    if (problemIndex < practiceSet.length - 1) {
      setProblemIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setSubmitted(false);
    } else {
      // reset for replay
      setProblemIndex(0);
      setSelectedAnswer(null);
      setSubmitted(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20 md:pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#E598AC]">
            Active Problem Solving
          </span>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight mt-1">
            PRACTICE & ASSESSMENT
          </h1>
          <p className="font-editorial italic text-slate-300 text-sm sm:text-base mt-1">
            Apply conceptual models under test conditions with immediate feedback.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="glass-card-dark p-1 rounded-2xl flex items-center border border-white/10 self-start sm:self-auto">
          <button
            onClick={() => setMode('standard')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              mode === 'standard' ? 'clay-pill-active font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Topic Drill
          </button>
          <button
            onClick={() => setMode('weak-area')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              mode === 'weak-area' ? 'clay-pill-active font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Weak Area Drill
          </button>
          <button
            onClick={() => setMode('speed')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              mode === 'speed' ? 'clay-pill-active font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Rapid Check
          </button>
        </div>
      </div>

      {/* Main Practice Question Surface */}
      <div className="clay-card-light p-6 sm:p-10 text-[#181B28]">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-[#7E2948]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#7E2948]">
              Problem {problemIndex + 1} of {practiceSet.length}
            </span>
          </div>
          <span className="text-xs font-semibold text-slate-600 bg-white/70 px-3 py-1 rounded-full border border-slate-200">
            Score: {scoreCount} Correct
          </span>
        </div>

        <h2 className="font-heading font-bold text-xl sm:text-2xl mb-3 text-[#181B28] leading-snug">
          {problem.question}
        </h2>
        <p className="font-editorial italic text-slate-600 text-sm mb-6">
          {problem.context}
        </p>

        {/* Choices */}
        <div className="space-y-3 mb-6">
          {problem.options.map((option, idx) => {
            const isSelected = selectedAnswer === idx;
            const isCorrect = idx === problem.correctIndex;

            let cardStyle = 'bg-white/70 border-slate-200/80 hover:bg-white text-slate-800';
            if (submitted) {
              if (isCorrect) {
                cardStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold shadow-xs';
              } else if (isSelected && !isCorrect) {
                cardStyle = 'bg-rose-50 border-rose-400 text-rose-950 font-semibold';
              } else {
                cardStyle = 'bg-white/30 border-slate-200 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={submitted}
                className={`w-full text-left p-4 rounded-2xl border transition-all text-sm flex items-center justify-between gap-4 cursor-pointer ${cardStyle}`}
              >
                <span>{option}</span>
                {submitted && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {submitted && isSelected && !isCorrect && (
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback Section */}
        {submitted && (
          <div className="p-5 rounded-2xl bg-[#7E2948]/10 border border-[#7E2948]/20 mb-6">
            <span className="text-xs font-bold text-[#7E2948] block mb-1">
              Feedback & Solution Analysis:
            </span>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {problem.explanation}
            </p>
          </div>
        )}

        {/* Action Button */}
        {submitted && (
          <div className="flex justify-end pt-2">
            <button
              onClick={handleNextProblem}
              className="clay-btn-plum px-6 py-2.5 text-xs font-semibold flex items-center gap-2 group cursor-pointer"
            >
              <span>{problemIndex < practiceSet.length - 1 ? 'Next Question' : 'Restart Practice Set'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
