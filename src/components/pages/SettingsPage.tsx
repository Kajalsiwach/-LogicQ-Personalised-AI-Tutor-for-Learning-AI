import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Moon, Sparkles, Check, Volume2, Shield } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [reminders, setReminders] = useState(true);
  const [motion, setMotion] = useState(true);
  const [instantFeedback, setInstantFeedback] = useState(true);
  const [soundFeedback, setSoundFeedback] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 w-full pb-20 md:pb-8">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#E598AC]">
          System Controls
        </span>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight mt-1">
          APPLICATION SETTINGS
        </h1>
        <p className="font-editorial italic text-slate-300 text-sm sm:text-base mt-1">
          Configure application interface, notifications, and interaction dynamics.
        </p>
      </div>

      {/* Main Settings Card */}
      <div className="glass-card-dark p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        {/* Section 1: Visual Theme (Fixed) */}
        <div className="pb-6 border-b border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <Moon className="w-5 h-5 text-[#F5CAD6]" />
            <h3 className="font-heading font-bold text-lg text-white">
              Visual Theme Architecture
            </h3>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Fixed primary visual theme crafted for long-form student focus.
          </p>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-white">Midnight Blue + Blush Pink</div>
              <div className="text-[11px] text-slate-400">Deep obsidian background with soft organic blush accents</div>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#FAF0F4]/15 text-[#F5CAD6] border border-[#F5CAD6]/30">
              Active V1
            </span>
          </div>
        </div>

        {/* Section 2: Motion & Interaction */}
        <div className="pb-6 border-b border-white/10 space-y-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#F5CAD6]" />
            <h3 className="font-heading font-bold text-lg text-white">
              Interaction & Motion
            </h3>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5">
            <div>
              <div className="text-xs font-semibold text-white">Purposeful Motion Transitions</div>
              <div className="text-[11px] text-slate-400">Smooth 250ms page shifts and subtle tactile card feedback</div>
            </div>
            <input
              type="checkbox"
              checked={motion}
              onChange={(e) => setMotion(e.target.checked)}
              className="w-4 h-4 accent-[#7E2948] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5">
            <div>
              <div className="text-xs font-semibold text-white">Instant Quiz Feedback</div>
              <div className="text-[11px] text-slate-400">Reveal solution insights immediately after answering practice challenges</div>
            </div>
            <input
              type="checkbox"
              checked={instantFeedback}
              onChange={(e) => setInstantFeedback(e.target.checked)}
              className="w-4 h-4 accent-[#7E2948] cursor-pointer"
            />
          </div>
        </div>

        {/* Section 3: Study Notifications */}
        <div className="pb-6 border-b border-white/10 space-y-4">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-[#F5CAD6]" />
            <h3 className="font-heading font-bold text-lg text-white">
              Notifications & Reminders
            </h3>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5">
            <div>
              <div className="text-xs font-semibold text-white">Daily Learning Streak Reminder</div>
              <div className="text-[11px] text-slate-400">Notify me daily at 9:00 AM to keep the 7-day streak alive</div>
            </div>
            <input
              type="checkbox"
              checked={reminders}
              onChange={(e) => setReminders(e.target.checked)}
              className="w-4 h-4 accent-[#7E2948] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5">
            <div>
              <div className="text-xs font-semibold text-white">Interactive Sound Cues</div>
              <div className="text-[11px] text-slate-400">Play subtle confirmation tone upon challenge completion</div>
            </div>
            <input
              type="checkbox"
              checked={soundFeedback}
              onChange={(e) => setSoundFeedback(e.target.checked)}
              className="w-4 h-4 accent-[#7E2948] cursor-pointer"
            />
          </div>
        </div>

        {/* Save CTA */}
        <div className="flex justify-end pt-2">
          <button
            onClick={handleSave}
            className="clay-btn-plum px-7 py-3 text-xs font-semibold flex items-center gap-2 cursor-pointer"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Settings Saved</span>
              </>
            ) : (
              <span>Save Application Settings</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
