import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AIML_CONCEPTS } from '../../data/aimlConcepts';
import { Flame, Award, Save, Check, RotateCcw } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { userState, setInterests, resetToFreshUser } = useApp();
  const { streakDays, overallProgress, selectedConcepts, interests } = userState;

  const [saved, setSaved] = useState(false);
  const [name, setName] = useState('Alex');
  const [primaryGoal, setPrimaryGoal] = useState(interests.primaryGoal);
  const [dailyPace, setDailyPace] = useState(interests.weeklyPace);

  const handleSave = () => {
    setInterests({
      ...interests,
      primaryGoal: primaryGoal as any,
      weeklyPace: dailyPace as any,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 w-full pb-20 md:pb-8">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#E598AC]">
          Account & Preferences
        </span>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight mt-1">
          STUDENT PROFILE
        </h1>
        <p className="font-editorial italic text-slate-300 text-sm sm:text-base mt-1">
          Personalize learning pace, track commitments, and academic milestones.
        </p>
      </div>

      {/* Main Profile Card */}
      <div className="clay-card-light p-6 sm:p-8 text-[#181B28]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-slate-200">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#7E2948] to-[#F5CAD6] p-1 shadow-md shrink-0">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
              alt="Alex"
              className="w-full h-full object-cover rounded-[20px]"
            />
          </div>

          <div className="space-y-1">
            <h2 className="font-heading font-extrabold text-2xl text-[#181B28]">
              {name}
            </h2>
            <p className="text-xs font-semibold text-[#7E2948] uppercase tracking-wider">
              {interests.experienceLevel} • {interests.primaryGoal}
            </p>
            <div className="flex items-center gap-4 pt-1 text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-1">
                <Flame className="w-4 h-4 text-amber-500" /> {streakDays} Day Streak
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Award className="w-4 h-4 text-[#7E2948]" /> {overallProgress}% Path Completion
              </span>
            </div>
          </div>
        </div>

        {/* Selected Concepts Pill View */}
        <div className="py-5 border-b border-slate-200">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2.5">
            Active AI/ML Concepts ({selectedConcepts.length})
          </span>
          <div className="flex flex-wrap gap-2">
            {selectedConcepts.map(id => {
              const meta = AIML_CONCEPTS.find(c => c.id === id);
              return (
                <span
                  key={id}
                  className="px-3 py-1 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-xs"
                >
                  {meta ? meta.name : id}
                </span>
              );
            })}
          </div>
        </div>

        {/* Edit Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#7E2948]/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Primary Goal
            </label>
            <select
              value={primaryGoal}
              onChange={(e) => setPrimaryGoal(e.target.value as any)}
              className="w-full p-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#7E2948]/20"
            >
              <option value="Industry Career">Industry Career</option>
              <option value="Academic Research">Academic Research</option>
              <option value="Skill Expansion">Skill Expansion</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Daily Target Pace
            </label>
            <select
              value={dailyPace}
              onChange={(e) => setDailyPace(e.target.value as any)}
              className="w-full p-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#7E2948]/20"
            >
              <option value="Casual (15m/day)">Casual (15m/day)</option>
              <option value="Steady (30m/day)">Steady (30m/day)</option>
              <option value="Intensive (45m+/day)">Intensive (45m+/day)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Current Calibration Level
            </label>
            <input
              type="text"
              disabled
              value={interests.experienceLevel}
              className="w-full p-3 rounded-xl bg-slate-100 border border-slate-200 text-sm text-slate-500 font-medium cursor-not-allowed"
            />
          </div>
        </div>

        {/* Buttons: Save & Reset */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 mt-6 border-t border-slate-200">
          <button
            onClick={resetToFreshUser}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to New User State</span>
          </button>

          <button
            onClick={handleSave}
            className="clay-btn-plum px-7 py-3 text-xs font-semibold flex items-center gap-2 cursor-pointer"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Saved Changes</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Profile Preferences</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
