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
  | 'concepts'
  | 'interests'
  | 'diagnostic'
  | 'analysis'
  | 'path-created';

export interface AIMLConcept {
  id: string;
  name: string;
  category: string;
  description: string;
  skills: string[];
  complexity: 'foundational' | 'moderate' | 'broad_complex';
  breadthWeight: number;
  isPopular?: boolean;
}

export interface LearningInterests {
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  primaryGoal: 'Industry Career' | 'Academic Research' | 'Skill Expansion';
  weeklyPace: 'Casual (15m/day)' | 'Steady (30m/day)' | 'Intensive (45m+/day)';
}

export interface DiagnosticQuestion {
  id: number;
  conceptId: string;
  difficulty: 'foundational' | 'intermediate';
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ConceptMasteryScore {
  conceptId: string;
  conceptName: string;
  correct: number;
  total: number;
  percentage: number;
}

export interface LearningNode {
  id: string;
  title: string;
  category: string;
  conceptId: string;
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

// Lesson & Practice Flow Types
export interface LessonKeyTerm {
  term: string;
  definition: string;
  analogy: string;
}

export interface LessonSection {
  id: string;
  title: string;
  intro: string;
  technicalConcept: string;
  formula?: string;
  formulaMeaning?: string;
  realWorldExample: string;
  codeSnippet?: {
    language: string;
    code: string;
    explanation: string;
  };
  keyTakeaway: string;
}

export interface LessonPracticeQuestion {
  id: string;
  question: string;
  conceptTag: string;
  options: string[];
  correctIndex: number;
  whyCorrect: string;
  whyIncorrect: string;
  lessonConnection: string;
}

export interface PracticeReportData {
  totalQuestions: number;
  correctCount: number;
  scorePercentage: number;
  isPassed: boolean;
  strongConcepts: string[];
  needsReviewConcepts: string[];
  summaryMessage: string;
  recommendedAction: string;
}

export interface LessonData {
  id: string;
  conceptId: string;
  title: string;
  subtitle: string;
  estimatedReadTime: string;
  keyTerms: LessonKeyTerm[];
  sections: LessonSection[];
  practiceSet: LessonPracticeQuestion[];
  recoveryPracticeSet: LessonPracticeQuestion[];
  recoveryNotes: Record<string, string>;
}

// -------------------------------------------------------------
// Upgraded Structured Pedagogical Lesson Types (LLM & Programmatic Engine)
// -------------------------------------------------------------

export type VisualRequirementType = 'graph' | 'diagram' | 'flowchart' | 'table' | 'none';

export interface VisualGraphData {
  kind: 'sigmoid' | 'loss-curve' | 'decision-boundary' | 'gradient-descent';
  title: string;
  xLabel: string;
  yLabel: string;
  curveFormula?: string;
  initialValue?: number;
}

export interface VisualFlowchartStep {
  stepNumber: number;
  title: string;
  description: string;
  tag: string;
}

export interface VisualDiagramLayer {
  name: string;
  nodeCount: number;
  role: string;
  activation?: string;
}

export interface VisualTableData {
  headers: string[];
  rows: string[][];
}

export interface LessonVisualSpec {
  type: VisualRequirementType;
  title: string;
  caption: string;
  whyVisualNeeded: string;
  graphData?: VisualGraphData;
  flowchartData?: {
    steps: VisualFlowchartStep[];
  };
  diagramData?: {
    architectureKind: 'perceptron' | 'transformer-attention' | 'neural-layers';
    layers: VisualDiagramLayer[];
  };
  tableData?: VisualTableData;
}

export interface StructuredLessonData {
  id: string;
  conceptId: string;
  title: string;
  subtitle: string;
  estimatedReadTime: string;
  personalizationNote?: string;
  // 1. Intuition / "Why It Exists"
  intuition: {
    hook: string;
    whyItExists: string;
    everydayAnalogy: string;
  };
  // 2. Core Concept
  coreConcept: {
    definition: string;
    detailedExplanation: string;
  };
  // 3. Key Technical Terms
  keyTerms: LessonKeyTerm[];
  // 4. Mathematical Explanation (if applicable)
  mathematics?: {
    formula: string;
    plainEnglishMeaning: string;
    parameterBreakdown: Array<{ symbol: string; explanation: string }>;
    intuitionNote: string;
  };
  // 5. Visual Requirement (Graph, Flowchart, Diagram, Table, None)
  visual: LessonVisualSpec;
  // 6. Worked Example
  workedExample: {
    problemStatement: string;
    stepByStep: Array<{ step: string; computation: string; insight: string }>;
    finalOutcome: string;
  };
  // 7. Real-world / AI-ML Application
  realWorldApplication: {
    domain: string;
    systemName: string;
    howItWorks: string;
    concreteImpact: string;
  };
  // 8. Key Takeaways
  keyTakeaways: string[];
  // 9. Practice Preparation
  practicePreparation: string;
  practiceSet: LessonPracticeQuestion[];
  recoveryPracticeSet: LessonPracticeQuestion[];
  recoveryNotes: Record<string, string>;
}

export interface UserLearningState {
  hasCompletedOnboarding: boolean;
  selectedConcepts: string[];
  interests: LearningInterests;
  diagnosticScore: number;
  totalDiagnosticQuestions: number;
  diagnosticLevel: string;
  diagnosticStrengths: string[];
  diagnosticGaps: string[];
  conceptBreakdown: ConceptMasteryScore[];
  currentFocus: {
    topic: string;
    subtopic: string;
    progress: number;
    nodeId: string;
  };
  streakDays: number;
  overallProgress: number;
  weeklyHours: number;
  todayGoals: TodayGoal[];
  recentActivities: ActivityItem[];
  pathNodes: LearningNode[];
  completedLessonIds: string[];
}
