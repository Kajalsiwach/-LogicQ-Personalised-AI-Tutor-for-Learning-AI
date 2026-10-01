import React, { createContext, useContext, useState, useEffect } from 'react';
import { PageId, UserMode, OnboardingStep, TodayGoal, ActivityItem } from '../types';

interface AppContextType {
  activePage: PageId;
  setActivePage: (page: PageId) => void;
  userMode: UserMode;
  setUserMode: (mode: UserMode) => void;
  isOnboardingActive: boolean;
  setIsOnboardingActive: (active: boolean) => void;
  isReturningWelcomeActive: boolean;
  setIsReturningWelcomeActive: (active: boolean) => void;
  onboardingStep: OnboardingStep;
  setOnboardingStep: (step: OnboardingStep) => void;
  selectedGoal: string;
  setSelectedGoal: (goal: string) => void;
  diagnosticAnswers: Record<number, number>;
  recordDiagnosticAnswer: (qIndex: number, optionIndex: number) => void;
  todayGoals: TodayGoal[];
  toggleGoal: (id: string) => void;
  streakDays: number;
  overallProgress: number;
  weeklyHours: number;
  recentActivities: ActivityItem[];
  addActivity: (item: ActivityItem) => void;
  triggerFirstTimeFlow: () => void;
  triggerReturningFlow: () => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
}

const initialGoals: TodayGoal[] = [
  { id: '1', label: 'Learn one topic', completed: true },
  { id: '2', label: 'Complete practice', completed: false },
];

const initialActivities: ActivityItem[] = [
  { id: '1', title: 'Classification Quiz', type: 'quiz', timestamp: '2 hours ago', score: '80%', status: 'Passed' },
  { id: '2', title: 'Learning Session', type: 'lesson', timestamp: '4 hours ago', status: 'Completed' },
  { id: '3', title: 'Practice Session', type: 'practice', timestamp: '1 day ago', score: '60%', status: 'Reviewed' },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<PageId>('dashboard');
  const [userMode, setUserMode] = useState<UserMode>('returning');
  const [isOnboardingActive, setIsOnboardingActive] = useState<boolean>(false);
  const [isReturningWelcomeActive, setIsReturningWelcomeActive] = useState<boolean>(false);
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>('welcome');
  const [selectedGoal, setSelectedGoal] = useState<string>('ai-ml');
  const [diagnosticAnswers, setDiagnosticAnswers] = useState<Record<number, number>>({});
  const [todayGoals, setTodayGoals] = useState<TodayGoal[]>(initialGoals);
  const [streakDays, setStreakDays] = useState<number>(7);
  const [overallProgress, setOverallProgress] = useState<number>(42);
  const [weeklyHours, setWeeklyHours] = useState<number>(3.2);
  const [recentActivities, setRecentActivities] = useState<ActivityItem[]>(initialActivities);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  const recordDiagnosticAnswer = (qIndex: number, optionIndex: number) => {
    setDiagnosticAnswers(prev => ({ ...prev, [qIndex]: optionIndex }));
  };

  const toggleGoal = (id: string) => {
    setTodayGoals(prev =>
      prev.map(g => (g.id === id ? { ...g, completed: !g.completed } : g))
    );
  };

  const addActivity = (item: ActivityItem) => {
    setRecentActivities(prev => [item, ...prev]);
  };

  const triggerFirstTimeFlow = () => {
    setUserMode('first-time');
    setIsOnboardingActive(true);
    setIsReturningWelcomeActive(false);
    setOnboardingStep('welcome');
  };

  const triggerReturningFlow = () => {
    setUserMode('returning');
    setIsOnboardingActive(false);
    setIsReturningWelcomeActive(true);
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        userMode,
        setUserMode,
        isOnboardingActive,
        setIsOnboardingActive,
        isReturningWelcomeActive,
        setIsReturningWelcomeActive,
        onboardingStep,
        setOnboardingStep,
        selectedGoal,
        setSelectedGoal,
        diagnosticAnswers,
        recordDiagnosticAnswer,
        todayGoals,
        toggleGoal,
        streakDays,
        overallProgress,
        weeklyHours,
        recentActivities,
        addActivity,
        triggerFirstTimeFlow,
        triggerReturningFlow,
        sidebarCollapsed,
        setSidebarCollapsed,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
