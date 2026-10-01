import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, CheckCircle2, Bookmark, Lightbulb, Code2 } from 'lucide-react';

export const LearnPage: React.FC = () => {
  const { setActivePage } = useApp();
  const [activeChapter, setActiveChapter] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20 md:pb-8">
      {/* Page Title & Context */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E598AC] mb-1">
          <span>Module 2</span>
          <span>•</span>
          <span>Lesson 4 of 8</span>
        </div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-tight mb-2">
          LOGISTIC REGRESSION & DECISION BOUNDARIES
        </h1>
        <p className="font-editorial italic text-slate-300 text-lg">
          Transforming unbounded linear combinations into robust probability distributions.
        </p>
      </div>

      {/* Chapter Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto">
        {[
          { num: 1, title: '1. The Logit Function' },
          { num: 2, title: '2. Sigmoid Geometry' },
          { num: 3, title: '3. Cross-Entropy Loss' },
        ].map((chap) => (
          <button
            key={chap.num}
            onClick={() => setActiveChapter(chap.num)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeChapter === chap.num
                ? 'bg-[#FAF0F4] text-[#151926] shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            {chap.title}
          </button>
        ))}
      </div>

      {/* Main Calm Reading Container (Dedicated Calm Flat Surface for Maximum Readability) */}
      <div className="calm-surface p-6 sm:p-10 space-y-8">
        {activeChapter === 1 && (
          <>
            <section className="space-y-4">
              <h2 className="font-heading font-bold text-xl text-white">
                Why Standard Linear Regression Fails for Classification
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                When predicting binary outcomes (such as $y \in \{0, 1\}$), ordinary least squares (OLS) regression models output continuous real values across $(-\infty, +\infty)$. This exposes two fundamental failure modes:
              </p>
              <ul className="list-disc list-inside text-sm text-slate-300 space-y-2 pl-2">
                <li>
                  <strong className="text-white">Unbounded Extrapolations:</strong> OLS produces probabilities greater than 1 or less than 0 for extreme feature magnitudes.
                </li>
                <li>
                  <strong className="text-white">Sensitivity to Outliers:</strong> An extreme positive example far to the right unexpectedly skews the decision threshold, degrading accuracy on border points.
                </li>
              </ul>
            </section>

            {/* Code Snippet Box */}
            <div className="rounded-2xl bg-black/50 border border-white/10 p-5 font-mono text-xs text-slate-300">
              <div className="flex items-center justify-between text-slate-500 mb-3 text-[11px] border-b border-white/5 pb-2">
                <span className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#F5CAD6]" />
                  <span>python / numpy</span>
                </span>
                <span>logit_transform.py</span>
              </div>
              <pre className="overflow-x-auto text-[#E2E8F0]">
{`import numpy as np

def sigmoid(z):
    """Numerically stable sigmoid function."""
    return np.where(z >= 0, 1 / (1 + np.exp(-z)), np.exp(z) / (1 + np.exp(z)))

def compute_logits(X, weights, bias):
    """Compute z = X.w + b and subsequent probabilities."""
    z = np.dot(X, weights) + bias
    return sigmoid(z)`}
              </pre>
            </div>

            {/* Editorial Key Insight Callout */}
            <div className="p-5 rounded-2xl bg-[#7E2948]/15 border border-[#E598AC]/30 flex items-start gap-4">
              <Lightbulb className="w-5 h-5 text-[#F5CAD6] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-editorial text-lg text-white mb-1">
                  The Core Mental Model
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The logit is nothing more than the log-odds: $\ln(p / (1 - p))$. When we fit a linear hyperplane to log-odds, the inverse map is the standard logistic sigmoid.
                </p>
              </div>
            </div>
          </>
        )}

        {activeChapter === 2 && (
          <section className="space-y-4">
            <h2 className="font-heading font-bold text-xl text-white">
              Geometry of the Decision Boundary
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              The decision boundary represents the subspace where the classifier is completely indifferent between classes: $P(Y=1|X) = 0.5$. This occurs precisely when the linear logit $z = w^T x + b = 0$.
            </p>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="font-mono text-sm text-[#F5CAD6]">w_1 * x_1 + w_2 * x_2 + ... + b = 0</span>
              <p className="text-xs text-slate-400 mt-2">
                In 2D feature space, this corresponds to a straight line separating positive and negative regions.
              </p>
            </div>
          </section>
        )}

        {activeChapter === 3 && (
          <section className="space-y-4">
            <h2 className="font-heading font-bold text-xl text-white">
              Maximum Likelihood & Cross-Entropy Loss
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Because mean squared error with sigmoid outputs yields non-convex local minima, we minimize Binary Cross-Entropy (Negative Log-Likelihood), which guarantees convex optimization:
            </p>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center font-mono text-sm text-[#F5CAD6]">
              J(w) = - 1/m * Σ [ y * log(p) + (1 - y) * log(1 - p) ]
            </div>
          </section>
        )}

        {/* Completion & Next Page Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
          <button
            onClick={() => setIsCompleted(!isCompleted)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              isCompleted
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                : 'glass-pill text-slate-300 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompleted ? 'Marked as Learned' : 'Mark Lesson Complete'}</span>
          </button>

          <button
            onClick={() => setActivePage('practice')}
            className="clay-btn-plum px-6 py-3 text-xs font-semibold flex items-center gap-2 cursor-pointer group"
          >
            <span>Proceed to Practice Drills</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
