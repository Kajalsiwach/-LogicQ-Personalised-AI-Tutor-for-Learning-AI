import React from 'react';
import { useApp } from '../../context/AppContext';
import { TrendingUp, Award, Clock, Target, Calendar, CheckCircle2 } from 'lucide-react';

export const ProgressPage: React.FC = () => {
  const { streakDays, overallProgress, weeklyHours } = useApp();

  const skillMatrix = [
    { skill: 'Linear Algebra & Gradients', level: 94, status: 'Mastered' },
    { skill: 'Logistic Regression & Boundaries', level: 72, status: 'In Progress' },
    { skill: 'Model Evaluation (ROC / PR-AUC)', level: 48, status: 'Practicing' },
    { skill: 'Regularization (L1 / L2)', level: 25, status: 'Introduced' },
    { skill: 'Deep Neural Architectures', level: 10, status: 'Locked' },
  ];

  const weeklyDays = [
    { day: 'Mon', hours: 0.8, active: true },
    { day: 'Tue', hours: 0.6, active: true },
    { day: 'Wed', hours: 0.9, active: true },
    { day: 'Thu', hours: 0.5, active: true },
    { day: 'Fri', hours: 0.4, active: true },
    { day: 'Sat', hours: 0.0, active: false },
    { day: 'Sun', hours: 0.0, active: false },
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#E598AC]">
          Detailed Analytics
        </span>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight mt-1">
          LEARNING PROGRESS & MASTERY
        </h1>
        <p className="font-editorial italic text-slate-300 text-sm sm:text-base mt-1">
          Granular analytics on retention, concept acquisition rate, and performance patterns.
        </p>
      </div>

      {/* Top 3 Detailed Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card-dark p-5 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-medium">Concept Retention Rate</span>
            <Target className="w-4 h-4 text-[#F5CAD6]" />
          </div>
          <div className="text-3xl font-heading font-extrabold text-white">88.4%</div>
          <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +4.2% from last week
          </p>
        </div>

        <div className="glass-card-dark p-5 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-medium">Average Solution Velocity</span>
            <Clock className="w-4 h-4 text-[#F5CAD6]" />
          </div>
          <div className="text-3xl font-heading font-extrabold text-white">42s</div>
          <p className="text-[11px] text-slate-400 mt-1">per practice challenge</p>
        </div>

        <div className="glass-card-dark p-5 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-medium">Active Learning Streak</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-heading font-extrabold text-white">{streakDays} Days</div>
          <p className="text-[11px] text-slate-400 mt-1">Longest recorded: 14 days</p>
        </div>
      </div>

      {/* Grid: Skill Matrix & Weekly Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Mastery Progression */}
        <div className="clay-card-light p-6 sm:p-7 text-[#181B28]">
          <h2 className="font-heading font-extrabold text-xl mb-1 text-[#181B28]">
            Concept Mastery Breakdown
          </h2>
          <p className="text-xs text-slate-600 mb-6 font-medium">
            Calculated via diagnostic checks and active practice retrieval scores.
          </p>

          <div className="space-y-4">
            {skillMatrix.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-800">{item.skill}</span>
                  <span className="text-[#7E2948] font-bold">{item.level}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#7E2948] to-[#D4728C] rounded-full transition-all duration-500"
                    style={{ width: `${item.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Study Time Chart */}
        <div className="clay-card-light p-6 sm:p-7 text-[#181B28] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="font-heading font-extrabold text-xl text-[#181B28]">
                Weekly Study Time
              </h2>
              <span className="text-xs font-bold text-[#7E2948]">
                {weeklyHours} hrs Total
              </span>
            </div>
            <p className="text-xs text-slate-600 mb-6 font-medium">
              Daily minutes spent on readings, practice drills, and quizzes.
            </p>

            {/* Custom Bar Graph */}
            <div className="flex items-end justify-between h-40 pt-4 border-b border-slate-200 px-2">
              {weeklyDays.map((d, i) => {
                const heightPercent = Math.max((d.hours / 1.0) * 100, 8);
                return (
                  <div key={i} className="flex flex-col items-center gap-2 group w-10">
                    <div className="text-[10px] font-semibold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      {d.hours}h
                    </div>
                    <div
                      className={`w-full rounded-t-xl transition-all ${
                        d.active
                          ? 'bg-gradient-to-t from-[#7E2948] to-[#E598AC]'
                          : 'bg-slate-200'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                    <span className="text-xs font-medium text-slate-600">{d.day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between text-xs text-slate-600 font-medium">
            <span>Optimal study window: 45m / day</span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> On Target
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
