import React from 'react';
import { useApp } from '../../context/AppContext';
import { LearningNode } from '../../types';
import { CheckCircle2, PlayCircle, Lock, ArrowRight, Clock, BookOpen } from 'lucide-react';

const pathNodes: LearningNode[] = [
  {
    id: 'foundations',
    title: '1. Mathematical Foundations',
    category: 'Mathematics & Linear Algebra',
    status: 'completed',
    progress: 100,
    lessonsCount: 6,
    estimatedHours: 4.5,
    skills: ['Matrix Decompositions', 'Vector Calculus', 'Gradient Vectors', 'Probability Densities'],
  },
  {
    id: 'classification',
    title: '2. Classification Models',
    category: 'Supervised Learning',
    status: 'current',
    progress: 60,
    lessonsCount: 8,
    estimatedHours: 6.0,
    skills: ['Binary Logistic', 'Decision Boundaries', 'Cross-Entropy Loss', 'Multi-Class Softmax'],
  },
  {
    id: 'evaluation',
    title: '3. Model Evaluation & Validation',
    category: 'Diagnostics & Metrics',
    status: 'upcoming',
    progress: 0,
    lessonsCount: 5,
    estimatedHours: 3.5,
    skills: ['ROC & PR Curves', 'Confusion Matrices', 'Cross-Validation Strategies', 'Data Leakage'],
  },
  {
    id: 'regularization',
    title: '4. Regularization & Generalization',
    category: 'Model Optimization',
    status: 'upcoming',
    progress: 0,
    lessonsCount: 6,
    estimatedHours: 4.0,
    skills: ['L1 Lasso', 'L2 Ridge', 'Elastic Net', 'Early Stopping', 'Dropout'],
  },
  {
    id: 'neural-networks',
    title: '5. Deep Neural Networks',
    category: 'Representation Learning',
    status: 'upcoming',
    progress: 0,
    lessonsCount: 10,
    estimatedHours: 9.0,
    skills: ['Multi-Layer Perceptrons', 'Backpropagation', 'Activation Functions', 'Optimizers'],
  },
];

export const MyPathPage: React.FC = () => {
  const { setActivePage } = useApp();

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#E598AC]">
            Interactive Roadmap
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight mt-1">
            MY LEARNING PATH
          </h2>
          <p className="font-editorial italic text-slate-300 text-sm sm:text-base mt-1">
            Your personalized progression tree through Machine Learning & AI Systems.
          </p>
        </div>

        {/* Overall Progress Indicator */}
        <div className="glass-card-dark px-4 py-3 rounded-2xl flex items-center gap-4 self-start sm:self-auto border border-white/10">
          <div>
            <div className="text-[11px] font-semibold text-slate-400">Total Path Progress</div>
            <div className="text-lg font-heading font-bold text-[#F5CAD6]">42% Completed</div>
          </div>
          <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div className="w-[42%] h-full bg-[#E598AC] rounded-full" />
          </div>
        </div>
      </div>

      {/* Path Roadmap Timeline */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-[#E598AC] before:to-slate-700">
        {pathNodes.map((node) => {
          const isCompleted = node.status === 'completed';
          const isCurrent = node.status === 'current';
          const isUpcoming = node.status === 'upcoming';

          return (
            <div key={node.id} className="relative group">
              {/* Timeline Pin */}
              <div
                className={`absolute -left-6 sm:-left-8 top-5 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-transform ${
                  isCompleted
                    ? 'bg-emerald-950 border-emerald-400 text-emerald-400'
                    : isCurrent
                    ? 'bg-[#080C15] border-[#F5CAD6] text-[#F5CAD6] ring-4 ring-[#F5CAD6]/20'
                    : 'bg-[#0C101D] border-slate-700 text-slate-600'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : isCurrent ? (
                  <PlayCircle className="w-3.5 h-3.5" />
                ) : (
                  <Lock className="w-3 h-3" />
                )}
              </div>

              {/* Node Card */}
              <div
                className={`p-6 rounded-3xl transition-all border ${
                  isCurrent
                    ? 'clay-card-light'
                    : 'glass-card-dark border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-xs font-semibold uppercase tracking-wider ${
                          isCurrent ? 'text-[#7E2948]' : 'text-slate-400'
                        }`}
                      >
                        {node.category}
                      </span>
                      {isCurrent && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#7E2948] text-white">
                          Current Focus
                        </span>
                      )}
                    </div>
                    <h3
                      className={`font-heading font-extrabold text-xl tracking-tight ${
                        isCurrent ? 'text-[#181B28]' : 'text-white'
                      }`}
                    >
                      {node.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <span
                      className={`flex items-center gap-1.5 font-medium ${
                        isCurrent ? 'text-slate-600' : 'text-slate-400'
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      {node.lessonsCount} lessons
                    </span>
                    <span
                      className={`flex items-center gap-1.5 font-medium ${
                        isCurrent ? 'text-slate-600' : 'text-slate-400'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      {node.estimatedHours} hrs
                    </span>
                  </div>
                </div>

                {/* Progress bar inside current card */}
                {isCurrent && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>Module Progress</span>
                      <span className="text-[#7E2948]">{node.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#7E2948] to-[#D4728C] rounded-full"
                        style={{ width: `${node.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Concept Chips */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {node.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className={`text-xs px-2.5 py-1 rounded-xl font-medium border ${
                        isCurrent
                          ? 'bg-white/80 border-slate-200 text-slate-800'
                          : 'bg-white/5 border-white/5 text-slate-400'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Action Trigger */}
                <div className="flex justify-end pt-2">
                  {isCurrent ? (
                    <button
                      onClick={() => setActivePage('learn')}
                      className="clay-btn-plum px-5 py-2.5 text-xs font-semibold flex items-center gap-2 cursor-pointer group"
                    >
                      <span>Resume Learning</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : isCompleted ? (
                    <button
                      onClick={() => setActivePage('practice')}
                      className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Review Exercises</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <span className="text-xs text-slate-500 flex items-center gap-1.5">
                      <Lock className="w-3 h-3" /> Unlocks after Module 2
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
