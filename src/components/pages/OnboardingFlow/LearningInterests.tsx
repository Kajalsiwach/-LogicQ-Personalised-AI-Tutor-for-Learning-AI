import React from 'react';
import { useApp } from '../../../context/AppContext';
import { LearningInterests as InterestsType } from '../../../types';
import { ArrowRight, ChevronLeft, Sparkles, CheckCircle2, Circle } from 'lucide-react';
import { Logo } from '../../common/Logo';

export const LearningInterests: React.FC = () => {
  const { interests, setInterests, setOnboardingStep } = useApp();

  const handleLevelChange = (level: InterestsType['experienceLevel']) => {
    setInterests({ ...interests, experienceLevel: level });
  };

  const handleGoalChange = (goal: InterestsType['primaryGoal']) => {
    setInterests({ ...interests, primaryGoal: goal });
  };

  const handlePaceChange = (pace: InterestsType['weeklyPace']) => {
    setInterests({ ...interests, weeklyPace: pace });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-6 sm:p-12 bg-[#070B14]">
      {/* Top Header */}
      <header className="flex items-center justify-between z-10 max-w-4xl mx-auto w-full">
        <Logo />
        <div className="flex items-center gap-3 text-xs font-semibold text-slate-400">
          <span className="text-[#F5CAD6]">Step 2 of 5</span>
          <span>•</span>
          <span>Learning Preferences</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto w-full py-8 z-10">
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-[#F5CAD6] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pace & Calibration</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white mb-2 tracking-tight">
            YOUR AI/ML LEARNING PROFILE
          </h2>
          <p className="font-editorial italic text-slate-300 text-lg sm:text-xl">
            Tell us where you are starting from and how you prefer to learn.
          </p>
        </div>

        <div className="space-y-8 mb-10">
          {/* Section 1: Experience Level */}
          <div>
            <h3 className="font-heading font-bold text-sm text-slate-300 uppercase tracking-wider mb-3">
              1. Current Familiarity
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: 'Beginner',
                  title: 'Beginner',
                  desc: 'New to gradient calculus, matrix algebra, and ML pipelines.',
                },
                {
                  id: 'Intermediate',
                  title: 'Intermediate',
                  desc: 'Comfortable with basic models; ready for deep networks & LLMs.',
                },
                {
                  id: 'Advanced',
                  title: 'Advanced',
                  desc: 'Experienced practitioner targeting agentic loops & research depth.',
                },
              ].map(lvl => {
                const isSelected = interests.experienceLevel === lvl.id;
                return (
                  <div
                    key={lvl.id}
                    onClick={() => handleLevelChange(lvl.id as InterestsType['experienceLevel'])}
                    className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'clay-card-light'
                        : 'glass-card-dark border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className={`font-heading font-extrabold text-sm ${
                          isSelected ? 'text-[#181B28]' : 'text-white'
                        }`}
                      >
                        {lvl.title}
                      </span>
                      {isSelected ? (
                        <CheckCircle2 className="w-4 h-4 text-[#7E2948]" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-500" />
                      )}
                    </div>
                    <p
                      className={`text-xs ${
                        isSelected ? 'text-slate-600' : 'text-slate-400'
                      }`}
                    >
                      {lvl.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Primary Goal */}
          <div>
            <h3 className="font-heading font-bold text-sm text-slate-300 uppercase tracking-wider mb-3">
              2. Core Ambition
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: 'Industry Career',
                  title: 'Industry Engineering',
                  desc: 'Build scalable AI pipelines and deploy models into production.',
                },
                {
                  id: 'Academic Research',
                  title: 'Academic Research',
                  desc: 'Delve into mathematical rigor, loss theorems, and papers.',
                },
                {
                  id: 'Skill Expansion',
                  title: 'Rapid Prototyping',
                  desc: 'Quickly master generative tools, prompt flows, and agent orchestration.',
                },
              ].map(goal => {
                const isSelected = interests.primaryGoal === goal.id;
                return (
                  <div
                    key={goal.id}
                    onClick={() => handleGoalChange(goal.id as InterestsType['primaryGoal'])}
                    className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'clay-card-light'
                        : 'glass-card-dark border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className={`font-heading font-extrabold text-sm ${
                          isSelected ? 'text-[#181B28]' : 'text-white'
                        }`}
                      >
                        {goal.title}
                      </span>
                      {isSelected ? (
                        <CheckCircle2 className="w-4 h-4 text-[#7E2948]" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-500" />
                      )}
                    </div>
                    <p
                      className={`text-xs ${
                        isSelected ? 'text-slate-600' : 'text-slate-400'
                      }`}
                    >
                      {goal.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Study Pace */}
          <div>
            <h3 className="font-heading font-bold text-sm text-slate-300 uppercase tracking-wider mb-3">
              3. Daily Study Velocity
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: 'Casual (15m/day)',
                  title: '15 mins / day',
                  desc: 'Bite-sized concept readings and single quiz checkpoints.',
                },
                {
                  id: 'Steady (30m/day)',
                  title: '30 mins / day',
                  desc: 'Balanced pace for steady mastery and practice drills.',
                },
                {
                  id: 'Intensive (45m+/day)',
                  title: '45+ mins / day',
                  desc: 'Full-focus acceleration through multi-step exercises.',
                },
              ].map(pace => {
                const isSelected = interests.weeklyPace === pace.id;
                return (
                  <div
                    key={pace.id}
                    onClick={() => handlePaceChange(pace.id as InterestsType['weeklyPace'])}
                    className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'clay-card-light'
                        : 'glass-card-dark border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className={`font-heading font-extrabold text-sm ${
                          isSelected ? 'text-[#181B28]' : 'text-white'
                        }`}
                      >
                        {pace.title}
                      </span>
                      {isSelected ? (
                        <CheckCircle2 className="w-4 h-4 text-[#7E2948]" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-500" />
                      )}
                    </div>
                    <p
                      className={`text-xs ${
                        isSelected ? 'text-slate-600' : 'text-slate-400'
                      }`}
                    >
                      {pace.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <button
            onClick={() => setOnboardingStep('concepts')}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Concepts</span>
          </button>

          <button
            onClick={() => setOnboardingStep('diagnostic')}
            className="clay-btn-plum px-8 py-3.5 text-xs font-semibold flex items-center gap-2 cursor-pointer group"
          >
            <span>Proceed to Diagnostic Assessment</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </main>

      <footer className="max-w-4xl mx-auto w-full text-center text-xs text-slate-500">
        You can adjust your goals and study pace anytime in your profile settings.
      </footer>
    </div>
  );
};
