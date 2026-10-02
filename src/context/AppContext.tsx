import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PageId,
  UserMode,
  OnboardingStep,
  TodayGoal,
  ActivityItem,
  LearningNode,
  LearningInterests,
  UserLearningState,
  ConceptMasteryScore,
} from '../types';
import { generateCurriculumRoadmap } from '../data/aimlConcepts';

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

  // Real user state
  userState: UserLearningState;
  selectedConcepts: string[];
  toggleConceptSelection: (id: string) => void;
  setSelectedConcepts: (ids: string[]) => void;
  interests: LearningInterests;
  setInterests: (interests: LearningInterests) => void;
  diagnosticAnswers: Record<number, number>;
  recordDiagnosticAnswer: (qIndex: number, optionIndex: number) => void;
  finishDiagnostic: (
    score: number,
    totalQuestions: number,
    level: string,
    strengths: string[],
    gaps: string[],
    conceptBreakdown: ConceptMasteryScore[]
  ) => void;
  finalizeOnboarding: () => void;

  // Real learning progress & activity
  completeLesson: (lessonId: string, lessonTitle: string) => void;
  recordPracticeResult: (title: string, scoreStr: string, isPassed: boolean) => void;
  toggleGoal: (id: string) => void;
  resetToFreshUser: () => void;

  // Navigation
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
}

const STORAGE_KEY = 'LOGIQ_LEARNING_STATE_V1';

const defaultInterests: LearningInterests = {
  experienceLevel: 'Beginner',
  primaryGoal: 'Industry Career',
  weeklyPace: 'Steady (30m/day)',
};

const freshInitialState: UserLearningState = {
  hasCompletedOnboarding: false,
  selectedConcepts: [],
  interests: defaultInterests,
  diagnosticScore: 0,
  totalDiagnosticQuestions: 0,
  diagnosticLevel: '',
  diagnosticStrengths: [],
  diagnosticGaps: [],
  conceptBreakdown: [],
  currentFocus: {
    topic: '',
    subtopic: '',
    progress: 0,
    nodeId: '',
  },
  streakDays: 0,
  overallProgress: 0,
  weeklyHours: 0.0,
  todayGoals: [
    { id: '1', label: 'Complete your first lesson', completed: false },
    { id: '2', label: 'Take your first practice quiz', completed: false },
  ],
  recentActivities: [],
  pathNodes: [],
  completedLessonIds: [],
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load persisted state or start fresh
  const [userState, setUserState] = useState<UserLearningState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.hasCompletedOnboarding === 'boolean') {
          return parsed;
        }
      }
    } catch {
      // safe fallback
    }
    return freshInitialState;
  });

  const [activePage, setActivePage] = useState<PageId>('dashboard');
  const [userMode, setUserMode] = useState<UserMode>(() =>
    userState.hasCompletedOnboarding ? 'returning' : 'first-time'
  );
  const [isOnboardingActive, setIsOnboardingActive] = useState<boolean>(() =>
    !userState.hasCompletedOnboarding
  );
  const [isReturningWelcomeActive, setIsReturningWelcomeActive] = useState<boolean>(false);
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>('welcome');
  const [diagnosticAnswers, setDiagnosticAnswers] = useState<Record<number, number>>({});
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  // Sync to localStorage whenever userState updates
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userState));
    } catch (err) {
      console.warn('Failed to save state to localStorage', err);
    }
  }, [userState]);

  const toggleConceptSelection = (id: string) => {
    setUserState(prev => {
      const exists = prev.selectedConcepts.includes(id);
      const updated = exists
        ? prev.selectedConcepts.filter(c => c !== id)
        : [...prev.selectedConcepts, id];
      return { ...prev, selectedConcepts: updated };
    });
  };

  const setSelectedConcepts = (ids: string[]) => {
    setUserState(prev => ({ ...prev, selectedConcepts: ids }));
  };

  const setInterests = (interests: LearningInterests) => {
    setUserState(prev => ({ ...prev, interests }));
  };

  const recordDiagnosticAnswer = (qIndex: number, optionIndex: number) => {
    setDiagnosticAnswers(prev => ({ ...prev, [qIndex]: optionIndex }));
  };

  const finishDiagnostic = (
    score: number,
    totalQuestions: number,
    level: string,
    strengths: string[],
    gaps: string[],
    conceptBreakdown: ConceptMasteryScore[]
  ) => {
    setUserState(prev => ({
      ...prev,
      diagnosticScore: score,
      totalDiagnosticQuestions: totalQuestions,
      diagnosticLevel: level,
      diagnosticStrengths: strengths,
      diagnosticGaps: gaps,
      conceptBreakdown,
    }));
  };

  const finalizeOnboarding = () => {
    const generatedNodes = generateCurriculumRoadmap(
      userState.selectedConcepts.length > 0
        ? userState.selectedConcepts
        : ['machine-learning', 'deep-learning'],
      userState.diagnosticScore
    );

    const firstNode = generatedNodes[0];

    setUserState(prev => ({
      ...prev,
      hasCompletedOnboarding: true,
      pathNodes: generatedNodes,
      currentFocus: {
        topic: firstNode.title,
        subtopic: firstNode.skills[0] || 'Core Mechanics',
        progress: 0,
        nodeId: firstNode.id,
      },
      streakDays: 1, // Day 1 streak started upon completing onboarding calibration
      overallProgress: 0,
      weeklyHours: 0.1,
    }));

    setIsOnboardingActive(false);
    setUserMode('returning');
    setActivePage('dashboard');
  };

  const completeLesson = (lessonId: string, lessonTitle: string) => {
    setUserState(prev => {
      if (prev.completedLessonIds.includes(lessonId)) return prev;

      const newCompleted = [...prev.completedLessonIds, lessonId];
      const newProgress = Math.min(100, prev.currentFocus.progress + 33);
      const newOverall = Math.min(100, Math.round((newCompleted.length / 12) * 100));

      const newActivity: ActivityItem = {
        id: Date.now().toString(),
        title: lessonTitle,
        type: 'lesson',
        timestamp: 'Just now',
        status: 'Completed',
      };

      const updatedGoals = prev.todayGoals.map(g =>
        g.id === '1' ? { ...g, completed: true } : g
      );

      return {
        ...prev,
        completedLessonIds: newCompleted,
        currentFocus: {
          ...prev.currentFocus,
          progress: newProgress,
        },
        streakDays: Math.max(1, prev.streakDays),
        overallProgress: newOverall,
        weeklyHours: +(prev.weeklyHours + 0.3).toFixed(1),
        todayGoals: updatedGoals,
        recentActivities: [newActivity, ...prev.recentActivities],
      };
    });
  };

  const recordPracticeResult = (title: string, scoreStr: string, isPassed: boolean) => {
    setUserState(prev => {
      const newActivity: ActivityItem = {
        id: Date.now().toString(),
        title,
        type: 'quiz',
        timestamp: 'Just now',
        score: scoreStr,
        status: isPassed ? 'Passed' : 'Reviewed',
      };

      const updatedGoals = prev.todayGoals.map(g =>
        g.id === '2' ? { ...g, completed: true } : g
      );

      return {
        ...prev,
        todayGoals: updatedGoals,
        weeklyHours: +(prev.weeklyHours + 0.2).toFixed(1),
        recentActivities: [newActivity, ...prev.recentActivities],
      };
    });
  };

  const toggleGoal = (id: string) => {
    setUserState(prev => ({
      ...prev,
      todayGoals: prev.todayGoals.map(g =>
        g.id === id ? { ...g, completed: !g.completed } : g
      ),
    }));
  };

  const resetToFreshUser = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // safe fallback
    }
    setUserState(freshInitialState);
    setUserMode('first-time');
    setIsOnboardingActive(true);
    setIsReturningWelcomeActive(false);
    setOnboardingStep('welcome');
    setActivePage('dashboard');
    setDiagnosticAnswers({});
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
        userState,
        selectedConcepts: userState.selectedConcepts,
        toggleConceptSelection,
        setSelectedConcepts,
        interests: userState.interests,
        setInterests,
        diagnosticAnswers,
        recordDiagnosticAnswer,
        finishDiagnostic,
        finalizeOnboarding,
        completeLesson,
        recordPracticeResult,
        toggleGoal,
        resetToFreshUser,
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
