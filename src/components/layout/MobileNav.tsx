import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageId } from '../../types';
import {
  LayoutDashboard,
  Network,
  BookOpen,
  PenSquare,
  BarChart2,
  User,
} from 'lucide-react';

interface MobileNavItem {
  id: PageId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const mobileItems: MobileNavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'path', label: 'Path', icon: Network },
  { id: 'learn', label: 'Learn', icon: BookOpen },
  { id: 'practice', label: 'Practice', icon: PenSquare },
  { id: 'progress', label: 'Progress', icon: BarChart2 },
  { id: 'profile', label: 'Profile', icon: User },
];

export const MobileNav: React.FC = () => {
  const { activePage, setActivePage, setIsOnboardingActive, setIsReturningWelcomeActive } = useApp();

  const handleNavClick = (pageId: PageId) => {
    setIsOnboardingActive(false);
    setIsReturningWelcomeActive(false);
    setActivePage(pageId);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0C101D]/90 backdrop-blur-xl border-t border-white/[0.08] px-3 py-2 flex items-center justify-around">
      {mobileItems.map((item) => {
        const Icon = item.icon;
        const isActive = activePage === item.id;

        return (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all ${
              isActive
                ? 'text-[#F5CAD6]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div
              className={`p-1.5 rounded-lg transition-all ${
                isActive ? 'bg-[#FAF0F4]/15' : ''
              }`}
            >
              <Icon className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-medium tracking-tight">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
