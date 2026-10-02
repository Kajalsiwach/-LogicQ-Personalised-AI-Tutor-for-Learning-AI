import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Bell, Sparkles, RefreshCcw, RotateCcw } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    resetToFreshUser,
    setIsReturningWelcomeActive,
    setIsOnboardingActive,
    setActivePage,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [showFlowMenu, setShowFlowMenu] = useState(false);

  return (
    <header className="sticky top-0 z-20 backdrop-blur-xl bg-[#070B14]/75 border-b border-white/[0.07] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Left: Dynamic Greeting based on Page */}
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-slate-100 tracking-tight">
            Good morning, Alex
          </h2>
          <span className="text-xl inline-block animate-pulse">👋</span>
        </div>
        <p className="font-editorial italic text-slate-400 text-sm mt-0.5">
          Ready to explore your personalized AI/ML curriculum!
        </p>
      </div>

      {/* Right Controls: Search, Flow Switcher, Notifications, Avatar */}
      <div className="flex items-center gap-3">
        {/* Glass Search Pill */}
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search AI/ML concepts..."
            className="glass-pill pl-9 pr-4 py-1.5 rounded-full text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#E598AC]/50 w-44 sm:w-56 transition-all"
          />
        </div>

        {/* Prototype Flow Switcher & Reset Control */}
        <div className="relative">
          <button
            onClick={() => setShowFlowMenu(prev => !prev)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#F5CAD6] bg-[#FAF0F4]/10 hover:bg-[#FAF0F4]/15 border border-[#F5CAD6]/20 transition-all cursor-pointer"
            title="User state simulation & reset"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden md:inline">User State</span>
          </button>

          {showFlowMenu && (
            <div className="absolute right-0 mt-2 w-60 glass-card-dark rounded-2xl p-2 z-50 border border-white/10 shadow-2xl">
              <div className="text-[10px] font-mono uppercase text-slate-400 px-3 py-1.5 font-semibold">
                Simulate State
              </div>
              <button
                onClick={() => {
                  resetToFreshUser();
                  setShowFlowMenu(false);
                }}
                className="w-full text-left px-3 py-2 text-xs rounded-xl text-rose-300 hover:bg-rose-950/40 flex items-center justify-between"
              >
                <span>Reset to Fresh New User</span>
                <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
              </button>
              <button
                onClick={() => {
                  setIsReturningWelcomeActive(true);
                  setIsOnboardingActive(false);
                  setShowFlowMenu(false);
                }}
                className="w-full text-left px-3 py-2 text-xs rounded-xl text-slate-200 hover:bg-white/10 flex items-center justify-between"
              >
                <span>Returning Resume Screen</span>
                <span className="text-[10px] text-sky-400">Resume</span>
              </button>
              <button
                onClick={() => {
                  setIsOnboardingActive(false);
                  setIsReturningWelcomeActive(false);
                  setActivePage('dashboard');
                  setShowFlowMenu(false);
                }}
                className="w-full text-left px-3 py-2 text-xs rounded-xl text-slate-200 hover:bg-white/10 flex items-center justify-between border-t border-white/5 mt-1 pt-1.5"
              >
                <span>Direct Dashboard</span>
                <RefreshCcw className="w-3 h-3 text-slate-400" />
              </button>
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <button
          className="relative p-2 rounded-full glass-pill text-slate-300 hover:text-white transition-colors cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E598AC]" />
        </button>

        {/* User Profile Avatar */}
        <button
          onClick={() => setActivePage('profile')}
          className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-[#E598AC]/40 transition-all cursor-pointer"
          title="Alex Profile"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#7E2948] to-[#F5CAD6] p-[1.5px]">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt="Alex"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </button>
      </div>
    </header>
  );
};
