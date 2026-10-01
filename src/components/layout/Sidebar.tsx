import React from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';
import { PageId } from '../../types';
import {
  LayoutDashboard,
  Network,
  BookOpen,
  PenSquare,
  BarChart2,
  Clock,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface NavItem {
  id: PageId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const primaryNavItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'path', label: 'My Path', icon: Network },
  { id: 'learn', label: 'Learn', icon: BookOpen },
  { id: 'practice', label: 'Practice', icon: PenSquare },
  { id: 'progress', label: 'Progress', icon: BarChart2 },
  { id: 'history', label: 'History', icon: Clock },
];

const secondaryNavItems: NavItem[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    sidebarCollapsed,
    setSidebarCollapsed,
    setIsOnboardingActive,
    setIsReturningWelcomeActive,
  } = useApp();

  const handleNavClick = (pageId: PageId) => {
    setIsOnboardingActive(false);
    setIsReturningWelcomeActive(false);
    setActivePage(pageId);
  };

  return (
    <aside
      className={`hidden md:flex flex-col justify-between h-screen sticky top-0 transition-all duration-300 z-30 glass-sidebar ${
        sidebarCollapsed ? 'w-20 px-3 py-6' : 'w-64 px-5 py-6'
      }`}
    >
      {/* Top Header & Branding */}
      <div>
        <div className="flex items-center justify-between mb-8 px-1">
          <Logo collapsed={sidebarCollapsed} />
          <button
            onClick={() => setSidebarCollapsed(prev => !prev)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-colors"
            title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Primary Navigation List */}
        <nav className="space-y-1.5">
          {primaryNavItems.map(item => {
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 select-none ${
                  isActive
                    ? 'clay-pill-active font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 transition-transform ${
                    isActive ? 'text-[#151926] stroke-[2.2]' : 'stroke-[1.8]'
                  }`}
                />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="my-5 border-t border-white/[0.06]" />

        {/* Secondary Navigation List (Profile, Settings) */}
        <div className="space-y-1.5">
          {secondaryNavItems.map(item => {
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 select-none ${
                  isActive
                    ? 'clay-pill-active font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 ${
                    isActive ? 'text-[#151926] stroke-[2.2]' : 'stroke-[1.8]'
                  }`}
                />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Brand Motto */}
      {!sidebarCollapsed ? (
        <div className="pt-4 border-t border-white/[0.05] px-1">
          <p className="font-editorial text-base text-slate-300 leading-tight">
            Better Learning
          </p>
          <p className="font-editorial text-base text-[#F5CAD6] leading-tight">
            Brighter Future
          </p>
          <p className="text-[11px] text-slate-500 mt-1">LOGIQ Platform v1.0</p>
        </div>
      ) : (
        <div className="text-center text-[10px] text-slate-500 font-mono">v1</div>
      )}
    </aside>
  );
};
