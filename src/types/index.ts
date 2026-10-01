export type PageId =
  | 'dashboard'
  | 'path'
  | 'learn'
  | 'practice'
  | 'progress'
  | 'history'
  | 'profile'
  | 'settings';

export type UserMode = 'first-time' | 'returning';

export type OnboardingStep =
  | 'welcome'
  | 'goals'
  | 'diagnostic'
  | 'analysis'
  | 'path-created';

export interface GoalTrack {
  id: string;
  title: string;
  tagline: string;
  duration: string;
  topicsCount: number;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface DiagnosticQuestion {
  id: number;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LearningNode {
  id: string;
  title: string;
  category: string;
  status: 'completed' | 'current' | 'upcoming';
  progress: number;
  lessonsCount: number;
  estimatedHours: number;
  skills: string[];
}

export interface ActivityItem {
  id: string;
  title: string;
  type: 'quiz' | 'lesson' | 'practice';
  timestamp: string;
  score?: string;
  status: string;
}

export interface TodayGoal {
  id: string;
  label: string;
  completed: boolean;
}
