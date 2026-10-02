import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Flame,
  Clock,
  ArrowRight,
  CheckCircle2,
  Circle,
  Layers,
  Award,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const {
    userState,
    toggleGoal,
    setActivePage,
  } = useApp();

  const {
    streakDays,
    overallProgress,
    weeklyHours,
    todayGoals,
    recentActivities,
    currentFocus,
    pathNodes,
    interests,
  } = userState;

  // Active topic
  const activeTopic = currentFocus.topic || (pathNodes[0] ? pathNodes[0].title : 'Foundations of AI/ML');
  const activeSubtopic = currentFocus.subtopic || (pathNodes[0] ? pathNodes[0].skills[0] : 'Linear Algebra & Calculus');
  const focusProgress = currentFocus.progress || 0;

  // Recommended next topic (node 1 if exists, or advanced concept)
  const recommendedNode = pathNodes[1] || pathNodes[0];
  const recommendedTitle = recommendedNode ? recommendedNode.title : 'Deep Learning Fundamentals';
  const recommendedSub = recommendedNode ? recommendedNode.skills[0] || 'Neural Representations' : 'Gradient Optimization';

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Top 3 Metric Cards Trio (Reflects genuine user stats) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Metric 1: Streak */}
        <div className="glass-card-dark rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden group hover:border-amber-400/30 animate-stagger-1">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500/25 to-orange-500/35 flex items-center justify-center border border-amber-400/30 shrink-0 shadow-lg shadow-amber-500/10 group-hover:scale-105 transition-transform">
            <Flame className="w-6 h-6 text-amber-300 fill-amber-400/30" />
          </div>
          <div>
            <div className="text-2xl font-heading font-extrabold text-white tracking-tight">
              {streakDays} Day Streak
            </div>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              {streakDays === 0 ? 'Start your first lesson today' : 'Keep it going!'}
            </p>
          </div>
          <div className="absolute -right-3 -bottom-3 w-20 h-20 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Metric 2: Overall Progress with Animated Circular Ring */}
        <div className="glass-card-dark rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden group hover:border-[#E598AC]/30 animate-stagger-2">
          <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
            <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-800/80"
                strokeWidth="3.2"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#E598AC] transition-all duration-1000 ease-out"
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
            <div className="text-2xl font-heading font-extrabold text-white tracking-tight">
              Overall Progress
            </div>
            <p className="text-xs text-[#F5CAD6] font-medium mt-0.5">
              {overallProgress === 0 ? 'Generated path ready' : 'AI/ML Curriculum'}
            </p>
          </div>
          <div className="absolute -right-3 -bottom-3 w-20 h-20 bg-[#E598AC]/15 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Metric 3: Time Invested */}
        <div className="glass-card-dark rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden group hover:border-[#F5CAD6]/30 animate-stagger-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#7E2948]/40 to-[#E598AC]/30 flex items-center justify-center border border-[#E598AC]/30 shrink-0 shadow-lg shadow-[#7E2948]/20 group-hover:scale-105 transition-transform">
            <Clock className="w-6 h-6 text-[#F5CAD6]" />
          </div>
          <div>
            <div className="text-2xl font-heading font-extrabold text-white tracking-tight">
              {weeklyHours.toFixed(1)} hrs
            </div>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              {weeklyHours === 0 ? 'Begin learning to track time' : 'Learning time this week'}
            </p>
          </div>
          <div className="absolute -right-3 -bottom-3 w-20 h-20 bg-[#7E2948]/20 rounded-full blur-2xl pointer-events-none" />
        </div>
      </div>

      {/* Main 2x2 Interactive Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: Continue Learning (Primary Focus based on user's path) */}
        <div className="clay-card-light p-6 sm:p-8 relative flex flex-col justify-between overflow-hidden animate-stagger-1">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7E2948]">
                Your Current Focus
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#7E2948]/12 text-[#7E2948] border border-[#7E2948]/15">
                Module 1 of {pathNodes.length || 3}
              </span>
            </div>

            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#181B28] mb-2 tracking-tight">
              {activeTopic}
            </h3>
            <p className="font-editorial italic text-slate-600 text-base mb-6">
              Focus area: {activeSubtopic}
            </p>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-2">
                <span>Module Progress</span>
                <span className="text-[#7E2948] font-bold">{focusProgress}% Complete</span>
              </div>
              <div className="w-full h-3 bg-slate-200/90 rounded-full overflow-hidden p-0.5 shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-[#7E2948] via-[#B84E72] to-[#E598AC] rounded-full progress-fill shadow-sm"
                  style={{ width: `${Math.max(focusProgress, 4)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
            <span className="text-xs text-slate-500 font-medium">
              Pace: {interests.weeklyPace}
            </span>
            <button
              onClick={() => setActivePage('learn')}
              className="clay-btn-plum px-6 py-2.5 text-xs font-semibold flex items-center gap-2 group cursor-pointer"
            >
              <span>{focusProgress === 0 ? 'Start First Lesson' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Card 2: Today's Goal (Interactive Micro-Checklist) */}
        <div className="clay-card-light p-6 sm:p-8 relative flex flex-col justify-between animate-stagger-2">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7E2948]">
                Daily Target
              </span>
              <span className="text-xs font-semibold text-slate-600 bg-white/70 px-2.5 py-0.5 rounded-full border border-slate-200">
                {todayGoals.filter(g => g.completed).length} of {todayGoals.length} completed
              </span>
            </div>

            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#181B28] mb-4 tracking-tight">
              Today's Goals
            </h3>

            {/* Interactive Goals */}
            <div className="space-y-3 mb-5">
              {todayGoals.map(goal => (
                <div
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`flex items-center gap-3.5 p-3.5 rounded-2xl cursor-pointer transition-all border ${
                    goal.completed
                      ? 'bg-white/85 border-[#E598AC]/40 shadow-xs'
                      : 'bg-white/45 border-slate-200/70 hover:bg-white/80 hover:border-slate-300'
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
                        ? 'text-slate-800 line-through opacity-75'
                        : 'text-slate-800'
                    }`}
                  >
                    {goal.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 bg-white/70 rounded-2xl border border-slate-200/70 flex items-center gap-3">
            <Award className="w-4 h-4 text-[#7E2948] shrink-0" />
            <p className="text-xs text-slate-600 font-medium">
              Daily practice increases concept retention by 2.4x.
            </p>
          </div>
        </div>

        {/* Card 3: Recommended for You (Based on chosen curriculum) */}
        <div className="clay-card-light p-6 sm:p-8 flex flex-col justify-between animate-stagger-3">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7E2948]">
                Recommended Next
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Curriculum Milestone
              </span>
            </div>

            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#181B28] mb-2 tracking-tight">
              {recommendedTitle}
            </h3>
            <p className="font-editorial italic text-slate-600 text-base mb-6">
              Foundational skill: {recommendedSub}
            </p>

            <div className="flex items-center gap-2 mb-6">
              <span className="px-3 py-1 rounded-xl bg-white/80 text-slate-800 text-xs font-semibold border border-slate-200">
                Practice Drills
              </span>
              <span className="px-3 py-1 rounded-xl bg-white/80 text-slate-800 text-xs font-semibold border border-slate-200">
                {interests.experienceLevel} Level
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
            <span className="text-xs text-slate-500 font-medium">
              Ready when you are
            </span>
            <button
              onClick={() => setActivePage('practice')}
              className="clay-btn-plum px-6 py-2.5 text-xs font-semibold flex items-center gap-2 group cursor-pointer"
            >
              <span>Practice Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Card 4: Recent Activity (Genuine Empty State or Real Activity Feed) */}
        <div className="clay-card-light p-6 sm:p-8 flex flex-col justify-between animate-stagger-4">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7E2948]">
                Recent Activity
              </span>
              {recentActivities.length > 0 && (
                <button
                  onClick={() => setActivePage('history')}
                  className="text-xs font-bold text-[#7E2948] hover:text-[#9E375E] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>View all</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#181B28] mb-4 tracking-tight">
              Learning Activity
            </h3>

            {/* If zero activities: intentional clean empty state */}
            {recentActivities.length === 0 ? (
              <div className="p-6 bg-white/60 rounded-2xl border border-slate-200/60 text-center space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-[#7E2948]/10 text-[#7E2948] flex items-center justify-center mx-auto">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 mb-1">
                    No activity recorded yet
                  </h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                    Complete your first lesson or practice quiz to build your learning history.
                  </p>
                </div>
                <button
                  onClick={() => setActivePage('learn')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7E2948] hover:underline cursor-pointer"
                >
                  <span>Start your first lesson</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {recentActivities.slice(0, 3).map(activity => (
                  <div
                    key={activity.id}
                    className="p-3.5 bg-white/75 rounded-2xl flex items-center justify-between border border-slate-200/60 hover:bg-white transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#FAF0F4] border border-[#F5CAD6] flex items-center justify-center shrink-0">
                        <Layers className="w-4 h-4 text-[#7E2948]" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">
                          {activity.title}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {activity.timestamp}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-xl ${
                        activity.score
                          ? 'bg-[#7E2948]/12 text-[#7E2948]'
                          : 'bg-emerald-100/80 text-emerald-800'
                      }`}
                    >
                      {activity.score || activity.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-3 text-center border-t border-slate-200/60 mt-4">
            <span className="text-[11px] text-slate-500 font-medium">
              {recentActivities.length === 0
                ? 'Your progress will appear here automatically'
                : 'Full performance history stored in History tab'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
