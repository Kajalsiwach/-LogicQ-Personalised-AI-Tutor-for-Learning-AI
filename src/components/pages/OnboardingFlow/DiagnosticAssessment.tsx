import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { DiagnosticQuestion } from '../../../types';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { Logo } from '../../common/Logo';

const questions: DiagnosticQuestion[] = [
  {
    id: 1,
    question: 'When evaluating a fraud detection model with severe class imbalance (99.5% legitimate transactions), which evaluation metric is least informative?',
    options: [
      'Raw Accuracy',
      'Area Under the Precision-Recall Curve (PR-AUC)',
      'F1-Score at optimal threshold',
      'Cost-Weighted Confusion Matrix',
    ],
    correctIndex: 0,
    explanation:
      'A trivial classifier predicting legitimate for every transaction achieves 99.5% accuracy while identifying zero fraudulent transactions. PR-AUC and cost-weighted metrics are far superior.',
  },
  {
    id: 2,
    question: 'What is the primary role of the Sigmoid activation function in Binary Logistic Regression?',
    codeSnippet: 'p = 1 / (1 + exp(-z)), where z = w^T * x + b',
    options: [
      'Normalizes unbounded linear logits into calibrated [0, 1] probability estimates',
      'Prevents weights from exploding during backward propagation',
      'Acts as an L1 lasso regularizer on sparse parameters',
      'Transforms the loss landscape into a non-convex surface',
    ],
    correctIndex: 0,
    explanation:
      'The logistic sigmoid smoothly maps the unbounded real range (-∞, +∞) of linear dot products into [0, 1], enabling interpretation as class posterior probabilities.',
  },
  {
    id: 3,
    question: 'If the training loss continues to decrease steadily while validation loss starts diverging upward, what phenomenon is occurring?',
    options: [
      'Overfitting (High Variance)',
      'Underfitting (High Bias)',
      'Vanishing Gradient Phenomenon',
      'Learning Rate Decay Collapse',
    ],
    correctIndex: 0,
    explanation:
      'When the model begins memorizing noise and idiosyncratic variations in training samples rather than true underlying concepts, validation loss diverges while train loss falls.',
  },
];

export const DiagnosticAssessment: React.FC = () => {
  const { recordDiagnosticAnswer, setOnboardingStep } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    recordDiagnosticAnswer(currentIndex, index);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setOnboardingStep('analysis');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-6 sm:p-12 bg-[#080C15]">
      {/* Header */}
      <header className="flex items-center justify-between z-10 max-w-3xl mx-auto w-full">
        <Logo />
        <div className="flex items-center gap-3 text-xs font-semibold text-slate-400">
          <span className="text-[#F5CAD6]">Step 2</span>
          <span>Question {currentIndex + 1} of {questions.length}</span>
        </div>
      </header>

      {/* Main Diagnostic Area */}
      <main className="max-w-3xl mx-auto w-full py-8 z-10">
        {/* Progress Tracker */}
        <div className="w-full h-1.5 bg-white/10 rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#7E2948] to-[#E598AC] transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        <div className="glass-card-dark rounded-3xl p-6 sm:p-8 border border-white/10">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#E598AC]">
            Diagnostic Calibration
          </span>

          <h2 className="font-heading font-bold text-xl sm:text-2xl text-white mt-2 mb-4 leading-snug">
            {currentQ.question}
          </h2>

          {currentQ.codeSnippet && (
            <div className="mb-6 p-4 rounded-xl bg-black/40 font-mono text-xs text-[#F5CAD6] border border-white/5">
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
                  style = 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200';
                } else if (isSelected && !isCorrect) {
                  style = 'bg-rose-950/40 border-rose-500/50 text-rose-200';
                } else {
                  style = 'bg-white/5 border-white/5 text-slate-500 opacity-60';
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
                Concept Insight:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {isAnswered && (
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="clay-btn-plum px-7 py-3 text-xs font-semibold flex items-center gap-2 cursor-pointer group"
              >
                <span>{currentIndex < questions.length - 1 ? 'Next Question' : 'Complete Assessment'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="max-w-3xl mx-auto w-full text-center text-xs text-slate-500">
        Diagnostic responses are used strictly to benchmark your foundational starting point.
      </footer>
    </div>
  );
};
