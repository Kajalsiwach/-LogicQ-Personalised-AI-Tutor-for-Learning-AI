import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Flame,
  Clock,
  ArrowRight,
  CheckCircle2,
  Circle,
  Sparkles,
  Layers,
  Award,
  ChevronRight,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const {
    streakDays,
    overallProgress,
    weeklyHours,
    todayGoals,
    toggleGoal,
    recentActivities,
    setActivePage,
  } = useApp();

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Top 3 Metric Cards Trio (Subtle Dark Glass Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Metric 1: Streak */}
        <div className="glass-card-dark rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden group hover:border-white/15 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-orange-500/30 flex items-center justify-center border border-amber-400/20 shrink-0">
            <Flame className="w-6 h-6 text-amber-400 fill-amber-400/20 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="text-xl font-heading font-extrabold text-white tracking-tight">
              {streakDays} Day Streak
            </div>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Keep it going!</p>
          </div>
          <div className="absolute -right-3 -bottom-3 w-16 h-16 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />
        </div>

        {/* Metric 2: Overall Progress with Animated Circular Ring */}
        <div className="glass-card-dark rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden group hover:border-white/15 transition-all">
          <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
            <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-800"
                strokeWidth="3.2"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#E598AC]"
                strokeDasharray={`${overallProgress}, 100`}
                strokeWidth="3.2"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-[11px] font-heading font-bold text-white">
              {overallProgress}%
            </span>
          </div>
          <div>
            <div className="text-xl font-heading font-extrabold text-white tracking-tight">
              Overall Progress
            </div>
            <p className="text-xs text-[#F5CAD6] font-medium mt-0.5">AI/ML Path</p>
          </div>
          <div className="absolute -right-3 -bottom-3 w-16 h-16 bg-[#E598AC]/10 rounded-full blur-xl pointer-events-none" />
        </div>

        {/* Metric 3: Time Invested */}
        <div className="glass-card-dark rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden group hover:border-white/15 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#7E2948]/30 to-[#E598AC]/20 flex items-center justify-center border border-[#E598AC]/20 shrink-0">
            <Clock className="w-6 h-6 text-[#F5CAD6]" />
          </div>
          <div>
            <div className="text-xl font-heading font-extrabold text-white tracking-tight">
              {weeklyHours} hrs
            </div>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Learning Time this week</p>
          </div>
          <div className="absolute -right-3 -bottom-3 w-16 h-16 bg-[#7E2948]/15 rounded-full blur-xl pointer-events-none" />
        </div>
      </div>

      {/* Main 2x2 Interactive Content Grid (Tactile Light Clay Surfaces) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: Continue Learning (Primary Focus) */}
        <div className="clay-card-light p-6 sm:p-7 relative flex flex-col justify-between overflow-hidden">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7E2948]">
                Your Current Focus
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#7E2948]/10 text-[#7E2948]">
                Module 3 of 8
              </span>
            </div>

            <h3 className="font-heading font-extrabold text-2xl text-[#181B28] mb-2 tracking-tight">
              Classification Models
            </h3>
            <p className="font-editorial italic text-slate-600 text-sm mb-5">
              Decision boundaries, Logistic Regression, and Multi-class evaluation.
            </p>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                <span>Progress</span>
                <span className="text-[#7E2948]">60% Complete</span>
              </div>
              <div className="w-full h-2.5 bg-slate-200/80 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-[#7E2948] to-[#D4728C] rounded-full transition-all duration-500"
                  style={{ width: '60%' }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-500 font-medium">
              Next: Confusion Matrix & ROC Curves
            </span>
            <button
              onClick={() => setActivePage('learn')}
              className="clay-btn-plum px-5 py-2.5 text-xs font-semibold flex items-center gap-2 group cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Card 2: Today's Goal (Interactive Micro-Checklist) */}
        <div className="clay-card-light p-6 sm:p-7 relative flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7E2948]">
                Today's Daily Target
              </span>
              <span className="text-xs font-medium text-slate-500">
                {todayGoals.filter(g => g.completed).length} of {todayGoals.length} done
              </span>
            </div>

            <h3 className="font-heading font-extrabold text-2xl text-[#181B28] mb-4 tracking-tight">
              Daily Commitment
            </h3>

            {/* Interactive Goals */}
            <div className="space-y-3 mb-4">
              {todayGoals.map(goal => (
                <div
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all border ${
                    goal.completed
                      ? 'bg-white/80 border-[#E598AC]/40 shadow-xs'
                      : 'bg-white/40 border-slate-200/60 hover:bg-white/70'
                  }`}
                >
                  {goal.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-[#7E2948] shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      goal.completed
                        ? 'text-slate-800 line-through opacity-80'
                        : 'text-slate-700'
                    }`}
                  >
                    {goal.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-white/60 rounded-xl border border-slate-200/50 flex items-center gap-3">
            <Award className="w-4 h-4 text-[#7E2948] shrink-0" />
            <p className="text-xs text-slate-600 font-medium">
              Completing daily goals accelerates concept retention by 2.4x.
            </p>
          </div>
        </div>

        {/* Card 3: Recommended for You (Single High-Value Next Action) */}
        <div className="clay-card-light p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7E2948]">
                Recommended Next
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-full">
                High Match (94%)
              </span>
            </div>

            <h3 className="font-heading font-extrabold text-2xl text-[#181B28] mb-2 tracking-tight">
              Neural Networks
            </h3>
            <p className="font-editorial italic text-slate-600 text-sm mb-5">
              Based on your strong mastery of Linear Algebra and Gradient Descent.
            </p>

            <div className="flex items-center gap-2 mb-6">
              <span className="px-2.5 py-1 rounded-lg bg-white/70 text-slate-700 text-xs font-medium border border-slate-200">
                15 min quiz
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/70 text-slate-700 text-xs font-medium border border-slate-200">
                Foundations
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-500 font-medium">
              Ready when you are
            </span>
            <button
              onClick={() => setActivePage('practice')}
              className="clay-btn-plum px-5 py-2.5 text-xs font-semibold flex items-center gap-2 group cursor-pointer"
            >
              <span>Start</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Card 4: Recent Activity (Compact Summary Preview) */}
        <div className="clay-card-light p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7E2948]">
                Recent Sessions
              </span>
              <button
                onClick={() => setActivePage('history')}
                className="text-xs font-semibold text-[#7E2948] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View all</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <h3 className="font-heading font-extrabold text-2xl text-[#181B28] mb-4 tracking-tight">
              Activity Preview
            </h3>

            {/* List */}
            <div className="space-y-2.5">
              {recentActivities.map(activity => (
                <div
                  key={activity.id}
                  className="p-3 bg-white/70 rounded-2xl flex items-center justify-between border border-slate-200/50 hover:bg-white transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#FAF0F4] border border-[#F5CAD6] flex items-center justify-center shrink-0">
                      <Layers className="w-4 h-4 text-[#7E2948]" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-800">
                        {activity.title}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {activity.timestamp}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                      activity.score
                        ? 'bg-[#7E2948]/10 text-[#7E2948]'
                        : 'bg-emerald-100/70 text-emerald-800'
                    }`}
                  >
                    {activity.score || activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 text-center">
            <span className="text-[11px] text-slate-500 font-medium">
              Full performance history stored in History tab
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
