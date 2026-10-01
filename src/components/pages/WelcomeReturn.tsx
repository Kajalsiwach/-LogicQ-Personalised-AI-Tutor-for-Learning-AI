import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, LayoutDashboard, Sparkles } from 'lucide-react';
import { Logo } from '../common/Logo';

export const WelcomeReturn: React.FC = () => {
  const { setActivePage, setIsReturningWelcomeActive } = useApp();

  const handleResume = () => {
    setIsReturningWelcomeActive(false);
    setActivePage('learn');
  };

  const handleGoToDashboard = () => {
    setIsReturningWelcomeActive(false);
    setActivePage('dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-6 sm:p-12 bg-[#080C15]">
      {/* Top Bar */}
      <header className="flex items-center justify-between z-10 max-w-3xl mx-auto w-full">
        <Logo />
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-medium">Returning Student Session</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-xl mx-auto w-full py-12 z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[#F5CAD6] text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Active Learning In Progress</span>
        </div>

        <h1 className="font-heading font-black text-3xl sm:text-5xl text-white mb-2 tracking-tight">
          WELCOME BACK
        </h1>
        <p className="font-editorial italic text-xl text-slate-300 mb-8">
          Continue where you left off in your personalized study flow.
        </p>

        {/* Unfinished Session Card (Clay Card) */}
        <div className="clay-card-light p-7 text-left mb-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7E2948]">
              Unfinished Session
            </span>
            <span className="text-xs font-bold text-[#7E2948] bg-[#7E2948]/10 px-2.5 py-0.5 rounded-full">
              72% Complete
            </span>
          </div>

          <h3 className="font-heading font-extrabold text-2xl text-[#181B28] mb-1">
            Classification Models
          </h3>
          <p className="text-xs text-slate-600 mb-5">
            Module 3: Evaluating Multi-Class ROC Curves & Calibration
          </p>

          {/* Progress Bar */}
          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-gradient-to-r from-[#7E2948] to-[#D4728C] rounded-full"
              style={{ width: '72%' }}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">
              Last active 4 hours ago
            </span>
            <button
              onClick={handleResume}
              className="clay-btn-plum px-6 py-2.5 text-xs font-semibold flex items-center gap-2 group cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Alternative Action */}
        <div>
          <button
            onClick={handleGoToDashboard}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Go to Dashboard instead</span>
          </button>
        </div>
      </main>

      <footer className="max-w-3xl mx-auto w-full text-center text-xs text-slate-500">
        LOGIQ remembers your exact spot across topics and quiz attempts.
      </footer>
    </div>
  );
};
