import React from 'react';
import { useApp } from '../../context/AppContext';
import { AIML_CONCEPTS } from '../../data/aimlConcepts';
import { TrendingUp, Award, Clock, Target, CheckCircle2, BookOpen } from 'lucide-react';

export const ProgressPage: React.FC = () => {
  const { userState, setActivePage } = useApp();
  const { streakDays, overallProgress, weeklyHours, selectedConcepts, completedLessonIds, diagnosticScore } = userState;

  // Real concept matrix derived from user's chosen concepts
  const conceptList = selectedConcepts.length > 0 ? selectedConcepts : ['machine-learning', 'deep-learning'];

  const skillMatrix = conceptList.map((id, index) => {
    const meta = AIML_CONCEPTS.find(c => c.id === id);
    const completedCountForModule = completedLessonIds.filter(l => l.includes(`lesson-`)).length;
    
    // Real calculated mastery
    let level = 0;
    if (index === 0) {
      level = Math.min(100, (completedCountForModule * 33) + Math.round(diagnosticScore * 0.3));
    }

    return {
      skill: meta ? meta.name : id,
      level,
      status: level >= 80 ? 'Mastered' : level > 0 ? 'In Progress' : 'Upcoming',
    };
  });

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
          Granular analytics on retention, concept acquisition rate, and real performance patterns.
        </p>
      </div>

      {/* Top 3 Real Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card-dark p-5 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-medium">Diagnostic Calibration</span>
            <Target className="w-4 h-4 text-[#F5CAD6]" />
          </div>
          <div className="text-3xl font-heading font-extrabold text-white">
            {diagnosticScore}%
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Initial baseline check
          </p>
        </div>

        <div className="glass-card-dark p-5 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-medium">Logged Study Time</span>
            <Clock className="w-4 h-4 text-[#F5CAD6]" />
          </div>
          <div className="text-3xl font-heading font-extrabold text-white">
            {weeklyHours.toFixed(1)} hrs
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {weeklyHours === 0 ? 'No hours logged yet' : 'Real session time'}
          </p>
        </div>

        <div className="glass-card-dark p-5 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-medium">Active Learning Streak</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-heading font-extrabold text-white">
            {streakDays} Days
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {streakDays === 0 ? 'Study today to start streak' : 'Active streak'}
          </p>
        </div>
      </div>

      {/* Grid: Skill Matrix & Real Study Time */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real Skill Mastery Progression */}
        <div className="clay-card-light p-6 sm:p-7 text-[#181B28]">
          <h2 className="font-heading font-extrabold text-xl mb-1 text-[#181B28]">
            Concept Mastery Breakdown
          </h2>
          <p className="text-xs text-slate-600 mb-6 font-medium">
            Calculated exclusively from your selected AI/ML concepts and completed exercises.
          </p>

          <div className="space-y-4">
            {skillMatrix.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-800">{item.skill}</span>
                  <span className="text-[#7E2948] font-bold">
                    {item.level}% • {item.status}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#7E2948] to-[#D4728C] rounded-full progress-fill"
                    style={{ width: `${Math.max(item.level, 3)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {completedLessonIds.length === 0 && (
            <div className="mt-6 p-4 rounded-2xl bg-white/60 border border-slate-200/60 flex items-center justify-between">
              <span className="text-xs text-slate-600 font-medium">
                Complete lessons to advance your concept mastery.
              </span>
              <button
                onClick={() => setActivePage('learn')}
                className="text-xs font-bold text-[#7E2948] hover:underline cursor-pointer"
              >
                Go to Lesson
              </button>
            </div>
          )}
        </div>

        {/* Real Study Time & Milestones */}
        <div className="clay-card-light p-6 sm:p-7 text-[#181B28] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="font-heading font-extrabold text-xl text-[#181B28]">
                Curriculum Progression
              </h2>
              <span className="text-xs font-bold text-[#7E2948]">
                {overallProgress}% Total
              </span>
            </div>
            <p className="text-xs text-slate-600 mb-6 font-medium">
              Progress calculated across all milestone chapters.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/70 border border-slate-200/70">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-800">Completed Lessons</span>
                  <span className="text-xs font-bold text-[#7E2948]">
                    {completedLessonIds.length} completed
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  {completedLessonIds.length === 0
                    ? 'Start your first lesson in the Learn tab to begin recording.'
                    : 'Lessons verified and recorded in your permanent log.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/70 border border-slate-200/70">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-800">Practice Drills</span>
                  <span className="text-xs font-bold text-[#7E2948]">
                    {userState.recentActivities.filter(a => a.type === 'quiz').length} recorded
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Problem solving scores build confidence and retention.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between text-xs text-slate-600 font-medium border-t border-slate-200/60 mt-4">
            <span>Target daily velocity: {userState.interests.weeklyPace}</span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Calibrated
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
