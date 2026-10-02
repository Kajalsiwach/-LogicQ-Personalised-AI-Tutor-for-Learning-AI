import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { StructuredLessonData, LessonPracticeQuestion, PracticeReportData } from '../../types';
import { generateStructuredLesson, getLLMConfig, saveLLMConfig } from '../../services/llmService';
import { LessonVisualRenderer } from '../common/LessonVisualRenderer';
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  BookOpen,
  Sparkles,
  RotateCcw,
  BookMarked,
  Cpu,
  Layers,
  Settings2,
  X,
  Compass,
  Check,
  Brain,
  HelpCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

type LearnPhase = 'EXPLANATION' | 'PRACTICE_TEST' | 'PRACTICE_REPORT';

export const LearnPage: React.FC = () => {
  const { userState, completeLesson, recordPracticeResult, setActivePage } = useApp();

  // Active concept from user selection or focus
  const activeConceptId = userState.selectedConcepts[0] || 'machine-learning';

  // LLM / Educational Engine State
  const [lesson, setLesson] = useState<StructuredLessonData | null>(null);
  const [engineSource, setEngineSource] = useState<'llm-live' | 'curated-synthesis'>('curated-synthesis');
  const [isLoadingLesson, setIsLoadingLesson] = useState<boolean>(true);

  // Settings Flyout Modal for Configurable LLM
  const [showConfigModal, setShowConfigModal] = useState<boolean>(false);
  const [llmConfig, setLlmConfig] = useState(getLLMConfig());
  const [inputKey, setInputKey] = useState<string>(llmConfig.apiKey);
  const [inputModel, setInputModel] = useState<string>(llmConfig.model);
  const [configSaveNotice, setConfigSaveNotice] = useState<string>('');

  // Learning workflow state
  const [phase, setPhase] = useState<LearnPhase>('EXPLANATION');

  // Practice state
  const [isUsingRecoverySet, setIsUsingRecoverySet] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [practiceAnswers, setPracticeAnswers] = useState<
    Array<{ question: LessonPracticeQuestion; chosenIndex: number; isCorrect: boolean }>
  >([]);

  // Recovery UI state
  const [showQuickReview, setShowQuickReview] = useState(false);
  const [reportData, setReportData] = useState<PracticeReportData | null>(null);

  // Fetch or synthesize structured lesson
  const loadLesson = async () => {
    setIsLoadingLesson(true);
    try {
      const result = await generateStructuredLesson({
        conceptId: activeConceptId,
        conceptName: activeConceptId === 'machine-learning' ? 'Machine Learning' : activeConceptId,
        lessonTitle: 'Supervised Classification & Decision Surfaces',
        studentState: {
          diagnosticScore: userState.diagnosticScore,
          diagnosticLevel: userState.diagnosticLevel,
          diagnosticGaps: userState.diagnosticGaps,
          diagnosticStrengths: userState.diagnosticStrengths,
          completedLessonIds: userState.completedLessonIds,
          selectedConcepts: userState.selectedConcepts,
        },
      });
      setLesson(result.lesson);
      setEngineSource(result.source);
    } catch (err) {
      console.error('Failed to generate lesson:', err);
    } finally {
      setIsLoadingLesson(false);
    }
  };

  useEffect(() => {
    loadLesson();
  }, [activeConceptId]);

  // Questions source based on primary vs recovery set
  const activeQuestions: LessonPracticeQuestion[] = React.useMemo(() => {
    if (!lesson) return [];
    return isUsingRecoverySet ? lesson.recoveryPracticeSet : lesson.practiceSet;
  }, [lesson, isUsingRecoverySet]);

  const currentQ = activeQuestions[questionIndex];

  // -------------------------------------------------------------
  // HANDLERS: Practice & Configuration
  // -------------------------------------------------------------
  const handleStartPractice = () => {
    setPhase('PRACTICE_TEST');
    setQuestionIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setPracticeAnswers([]);
    setShowQuickReview(false);
  };

  const handleSelectOption = (index: number) => {
    if (isSubmitted || !currentQ) return;
    setSelectedOption(index);
    setIsSubmitted(true);

    const isCorrect = index === currentQ.correctIndex;
    setPracticeAnswers(prev => [
      ...prev,
      { question: currentQ, chosenIndex: index, isCorrect },
    ]);
  };

  const handleNextQuestion = () => {
    if (questionIndex < activeQuestions.length - 1) {
      setQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      // Evaluate practice report
      const total = activeQuestions.length;
      const correct = practiceAnswers.filter(a => a.isCorrect).length;
      const scorePct = Math.round((correct / Math.max(1, total)) * 100);
      const isPassed = scorePct >= 75;

      const strong: string[] = [];
      const weak: string[] = [];

      practiceAnswers.forEach(ans => {
        if (ans.isCorrect) {
          if (!strong.includes(ans.question.conceptTag)) strong.push(ans.question.conceptTag);
        } else {
          if (!weak.includes(ans.question.conceptTag)) weak.push(ans.question.conceptTag);
        }
      });

      if (isPassed) {
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#F5CAD6', '#7E2948', '#38BDF8'],
          });
        } catch {
          // ignore
        }
      }

      setReportData({
        totalQuestions: total,
        correctCount: correct,
        scorePercentage: scorePct,
        isPassed,
        strongConcepts: strong,
        needsReviewConcepts: weak,
        summaryMessage: isPassed
          ? 'Exceptional mastery! You demonstrated a complete conceptual and mathematical grasp.'
          : "You're getting there! Let's reinforce the core mechanisms before advancing.",
        recommendedAction: isPassed ? 'advance' : 'review-recovery',
      });

      if (lesson) {
        recordPracticeResult(lesson.title, `${scorePct}%`, isPassed);
      }

      setPhase('PRACTICE_REPORT');
    }
  };

  const handleSaveConfig = () => {
    saveLLMConfig({ apiKey: inputKey.trim(), model: inputModel.trim() });
    setLlmConfig(getLLMConfig());
    setConfigSaveNotice('Configuration updated successfully!');
    setTimeout(() => {
      setConfigSaveNotice('');
      setShowConfigModal(false);
      loadLesson();
    }, 1000);
  };

  // Loading Screen
  if (isLoadingLesson || !lesson) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 rounded-full border-2 border-[#E598AC] border-t-transparent animate-spin" />
        <p className="font-editorial italic text-slate-300 text-lg">
          Synthesizing structured lesson for {activeConceptId}...
        </p>
        <span className="text-xs font-ui text-slate-500">
          Tailoring mathematics, visual specifications, and worked examples to your profile.
        </span>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: PHASE 1 — UPGRADED PEDAGOGICAL EXPLANATION
  // -------------------------------------------------------------
  if (phase === 'EXPLANATION') {
    return (
      <div className="space-y-8 w-full pb-16 animate-page-entrance">
        {/* Top Header & Engine Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-ui font-bold uppercase tracking-wider text-[#E598AC] flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Lesson Phase
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-xs font-ui text-slate-400">{lesson.estimatedReadTime}</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              {lesson.title}
            </h1>
            <p className="font-editorial italic text-slate-300 text-base mt-1">
              {lesson.subtitle}
            </p>
          </div>

          {/* Configurable AI Engine Pill */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setShowConfigModal(true)}
              className="glass-pill px-3 py-1.5 rounded-full text-xs font-ui flex items-center gap-2 text-slate-300 hover:text-white cursor-pointer transition-all border border-white/10"
              title="Configure LLM Provider & Model"
            >
              <Cpu className="w-3.5 h-3.5 text-[#E598AC]" />
              <span className="hidden md:inline font-mono text-[11px]">
                {engineSource === 'llm-live' ? `Gemini API (${llmConfig.model})` : 'Curated Professor Engine'}
              </span>
              <span className="md:hidden font-mono text-[11px]">AI Engine</span>
              <Settings2 className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Personalization Callout */}
        {lesson.personalizationNote && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#7E2948]/20 via-[#E598AC]/10 to-transparent border border-[#E598AC]/25 flex items-center gap-3">
            <Compass className="w-4 h-4 text-[#F5CAD6] shrink-0" />
            <p className="text-xs font-ui text-slate-200">
              <strong className="text-[#F5CAD6] font-semibold">Personalized Learning Note: </strong>
              {lesson.personalizationNote}
            </p>
          </div>
        )}

        {/* 1. INTUITION: The "Why It Exists" Hook */}
        <div className="calm-surface p-6 sm:p-8 space-y-4 rounded-3xl border border-white/[0.08]">
          <div className="flex items-center gap-2 text-xs font-ui font-bold uppercase tracking-wider text-[#E598AC]">
            <Brain className="w-4 h-4" />
            1. Conceptual Intuition &amp; The Problem
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
            <p className="font-ui text-sm sm:text-base font-semibold text-white leading-relaxed">
              &quot;{lesson.intuition.hook}&quot;
            </p>
            <p className="font-ui text-xs sm:text-sm text-slate-300 leading-relaxed">
              {lesson.intuition.whyItExists}
            </p>
          </div>

          {/* Everyday Analogy */}
          <div className="p-4 rounded-2xl bg-[#7E2948]/15 border border-[#E598AC]/20 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-[#F5CAD6] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-[11px] font-ui uppercase font-bold tracking-wider text-[#F5CAD6]">
                Everyday Analogy
              </span>
              <p className="font-editorial italic text-base sm:text-lg text-slate-100 leading-relaxed">
                {lesson.intuition.everydayAnalogy}
              </p>
            </div>
          </div>
        </div>

        {/* 2. CORE CONCEPT & KEY TERMINOLOGY */}
        <div className="calm-surface p-6 sm:p-8 space-y-6 rounded-3xl border border-white/[0.08]">
          <div className="flex items-center gap-2 text-xs font-ui font-bold uppercase tracking-wider text-[#E598AC]">
            <Layers className="w-4 h-4" />
            2. Core Concept &amp; Technical Definition
          </div>

          <div className="space-y-3 font-ui text-sm leading-relaxed text-slate-200">
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 font-medium text-white">
              {lesson.coreConcept.definition}
            </div>
            <p className="text-slate-300 pt-1">
              {lesson.coreConcept.detailedExplanation}
            </p>
          </div>

          {/* Key Terms Deck */}
          <div>
            <span className="text-xs font-ui font-bold uppercase tracking-wider text-slate-400 block mb-3">
              Essential Technical Vocabulary
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {lesson.keyTerms.map((term, tIdx) => (
                <div key={tIdx} className="p-4 rounded-2xl bg-[#090E1A] border border-white/5 space-y-1.5">
                  <span className="text-xs font-bold text-[#F5CAD6] block font-ui">
                    {term.term}
                  </span>
                  <p className="text-xs font-ui text-slate-300 leading-relaxed">
                    {term.definition}
                  </p>
                  <p className="text-[11px] font-ui text-slate-400 italic pt-1 border-t border-white/5">
                    <strong className="text-slate-300 not-italic font-semibold">Analogy: </strong>
                    {term.analogy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. MATHEMATICAL EXPLANATION (If Applicable) */}
        {lesson.mathematics && (
          <div className="calm-surface p-6 sm:p-8 space-y-5 rounded-3xl border border-white/[0.08]">
            <div className="flex items-center justify-between text-xs font-ui">
              <span className="font-bold uppercase tracking-wider text-[#E598AC] flex items-center gap-1.5">
                <Compass className="w-4 h-4" />
                3. Mathematical Formulation
              </span>
              <span className="font-mono text-[10px] text-slate-400">Analytical Mechanics</span>
            </div>

            {/* Formula Callout */}
            <div className="p-4 rounded-2xl bg-[#070B16] border border-white/10 font-mono text-center text-sm sm:text-base font-bold text-[#F5CAD6] overflow-x-auto">
              {lesson.mathematics.formula}
            </div>

            <p className="text-xs font-ui text-slate-300 italic text-center">
              &quot;{lesson.mathematics.plainEnglishMeaning}&quot;
            </p>

            {/* Parameter Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {lesson.mathematics.parameterBreakdown.map((p, pIdx) => (
                <div key={pIdx} className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs font-ui flex items-start gap-2">
                  <span className="font-mono font-bold text-[#E598AC] shrink-0">{p.symbol}:</span>
                  <span className="text-slate-300">{p.explanation}</span>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs font-ui text-slate-300">
              <strong className="text-[#F5CAD6]">Mathematical Intuition: </strong>
              {lesson.mathematics.intuitionNote}
            </div>
          </div>
        )}

        {/* 4. DYNAMIC PROGRAMMATIC VISUAL EXPLANATION */}
        {lesson.visual.type !== 'none' && (
          <div className="space-y-2">
            <div className="text-xs font-ui font-bold uppercase tracking-wider text-[#E598AC] px-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              4. Visual &amp; Geometric Analysis
            </div>
            <LessonVisualRenderer spec={lesson.visual} />
          </div>
        )}

        {/* 5. WORKED STEP-BY-STEP EXAMPLE */}
        <div className="calm-surface p-6 sm:p-8 space-y-5 rounded-3xl border border-white/[0.08]">
          <div className="flex items-center gap-2 text-xs font-ui font-bold uppercase tracking-wider text-[#E598AC]">
            <BookMarked className="w-4 h-4" />
            5. Concrete Worked Example
          </div>

          <div className="p-4 rounded-2xl bg-[#090E1A] border border-white/5 text-xs sm:text-sm font-ui text-slate-200">
            <span className="font-bold text-white block mb-1">Problem Scenario:</span>
            {lesson.workedExample.problemStatement}
          </div>

          <div className="space-y-3">
            {lesson.workedExample.stepByStep.map((stepItem, sIdx) => (
              <div key={sIdx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-ui">
                  <span className="font-bold text-[#F5CAD6]">
                    Step {sIdx + 1}: {stepItem.step}
                  </span>
                </div>
                <div className="font-mono text-xs text-[#38BDF8] bg-black/40 p-2.5 rounded-xl overflow-x-auto">
                  {stepItem.computation}
                </div>
                <p className="text-xs font-ui text-slate-400">
                  <strong className="text-slate-300 font-semibold">Insight: </strong>
                  {stepItem.insight}
                </p>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs font-ui text-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Outcome: </strong>
              {lesson.workedExample.finalOutcome}
            </span>
          </div>
        </div>

        {/* 6. REAL-WORLD INDUSTRY APPLICATION */}
        <div className="p-6 sm:p-7 rounded-3xl bg-[#7E2948]/15 border border-[#E598AC]/25 flex flex-col sm:flex-row items-start gap-4">
          <Lightbulb className="w-6 h-6 text-[#F5CAD6] shrink-0 mt-1" />
          <div className="space-y-1.5 flex-1 font-ui">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#E598AC]">
                Real-World AI/ML System: {lesson.realWorldApplication.domain}
              </span>
              <span className="text-xs font-mono text-[#F5CAD6]">
                {lesson.realWorldApplication.systemName}
              </span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              {lesson.realWorldApplication.howItWorks}
            </p>
            <div className="text-xs font-mono text-emerald-400 pt-1">
              Impact: {lesson.realWorldApplication.concreteImpact}
            </div>
          </div>
        </div>

        {/* 7. KEY TAKEAWAYS & PRACTICE PREPARATION */}
        <div className="calm-surface p-6 sm:p-8 space-y-5 rounded-3xl border border-white/[0.08]">
          <div className="flex items-center gap-2 text-xs font-ui font-bold uppercase tracking-wider text-[#E598AC]">
            <Sparkles className="w-4 h-4" />
            7. Core Takeaways &amp; Practice Preparation
          </div>

          <div className="space-y-2">
            {lesson.keyTakeaways.map((point, kIdx) => (
              <div key={kIdx} className="flex items-start gap-3 text-xs sm:text-sm font-ui text-slate-200">
                <Check className="w-4 h-4 text-[#E598AC] shrink-0 mt-0.5" />
                <span>{point}</span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-xs font-ui text-slate-300">
            {lesson.practicePreparation}
          </div>

          {/* Action Button: Start Practice Test */}
          <div className="flex justify-end pt-4 border-t border-white/10">
            <button
              onClick={handleStartPractice}
              className="clay-btn-plum px-8 py-3.5 text-xs sm:text-sm font-ui font-semibold flex items-center gap-2.5 cursor-pointer group shadow-xl"
            >
              <span>I’m ready — Start Practice</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Config Modal for LLM Provider/Model */}
        {showConfigModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <div className="w-full max-w-md glass-card-dark p-6 rounded-3xl border border-white/15 space-y-5 animate-page-entrance shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#E598AC]" />
                  <h3 className="font-ui font-bold text-sm text-white">AI Engine Configuration</h3>
                </div>
                <button
                  onClick={() => setShowConfigModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 font-ui text-xs">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Provider</label>
                  <select
                    value={llmConfig.provider}
                    disabled
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-slate-200"
                  >
                    <option value="gemini">Google Gemini API (Official)</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Model Name</label>
                  <input
                    type="text"
                    value={inputModel}
                    onChange={(e) => setInputModel(e.target.value)}
                    placeholder="gemini-2.5-flash"
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-slate-200 font-mono text-xs focus:outline-none focus:border-[#E598AC]"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Recommended: gemini-2.5-flash or gemini-1.5-pro
                  </span>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Gemini API Key</label>
                  <input
                    type="password"
                    value={inputKey}
                    onChange={(e) => setInputKey(e.target.value)}
                    placeholder="Enter your Gemini API Key..."
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-slate-200 font-mono text-xs focus:outline-none focus:border-[#E598AC]"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    If omitted, LOGIQ operates seamlessly using its offline educational synthesis engine.
                  </span>
                </div>

                {configSaveNotice && (
                  <div className="p-2 rounded-xl bg-emerald-950/40 text-emerald-300 text-xs font-semibold text-center border border-emerald-500/20">
                    {configSaveNotice}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-white/5">
                <button
                  onClick={() => setShowConfigModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white glass-pill"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveConfig}
                  className="clay-btn-plum px-5 py-2 text-xs font-semibold"
                >
                  Save Configuration
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: PHASE 2 — PRACTICE TEST (3–4 QUESTIONS WITH IMMEDIATE FEEDBACK)
  // -------------------------------------------------------------
  if (phase === 'PRACTICE_TEST' && currentQ) {
    return (
      <div className="space-y-6 w-full max-w-5xl mx-auto pb-16 animate-page-entrance">
        {/* Practice Header with Progress Tracker */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-ui font-bold uppercase tracking-wider text-[#E598AC]">
              {isUsingRecoverySet ? 'Recovery Practice Set' : 'Concept Practice Test'}
            </span>
            <h2 className="font-heading font-extrabold text-xl text-white tracking-tight mt-0.5">
              Question {questionIndex + 1} of {activeQuestions.length}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">
              {Math.round(((questionIndex + 1) / activeQuestions.length) * 100)}%
            </span>
            <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#7E2948] to-[#E598AC] rounded-full progress-fill"
                style={{ width: `${((questionIndex + 1) / activeQuestions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="calm-surface p-6 sm:p-8 space-y-6 rounded-3xl border border-white/[0.08]">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-white/10 text-slate-300">
                Tag: {currentQ.conceptTag}
              </span>
            </div>
            <h3 className="font-ui font-semibold text-base sm:text-lg text-white leading-relaxed">
              {currentQ.question}
            </h3>
          </div>

          {/* Options List */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectAnswer = idx === currentQ.correctIndex;

              let optionStyle =
                'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10 hover:border-white/20';

              if (isSubmitted) {
                if (isCorrectAnswer) {
                  optionStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold';
                } else if (isSelected && !isCorrectAnswer) {
                  optionStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                } else {
                  optionStyle = 'bg-white/5 border-white/5 text-slate-500 opacity-60';
                }
              } else if (isSelected) {
                optionStyle = 'bg-[#FAF0F4]/15 border-[#F5CAD6] text-[#F5CAD6] font-semibold';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isSubmitted}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 cursor-pointer font-ui text-xs sm:text-sm leading-relaxed ${optionStyle}`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-mono text-xs font-bold ${
                      isSubmitted && isCorrectAnswer
                        ? 'bg-emerald-500 text-white'
                        : isSubmitted && isSelected && !isCorrectAnswer
                        ? 'bg-rose-500 text-white'
                        : 'bg-white/10 text-slate-300'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 mt-0.5">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Immediate Pedagogical Feedback Breakdown */}
          {isSubmitted && (
            <div className="space-y-3 pt-4 border-t border-white/10 animate-page-entrance">
              <div
                className={`p-4 rounded-2xl border flex items-start gap-3 ${
                  selectedOption === currentQ.correctIndex
                    ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                    : 'bg-rose-950/30 border-rose-500/30 text-rose-200'
                }`}
              >
                {selectedOption === currentQ.correctIndex ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1 text-xs font-ui">
                  <div className="font-bold text-sm">
                    {selectedOption === currentQ.correctIndex
                      ? 'Correct! Excellent comprehension.'
                      : 'Incorrect — Let’s understand why.'}
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    <strong className="text-white">Why correct: </strong>
                    {currentQ.whyCorrect}
                  </p>
                  {selectedOption !== currentQ.correctIndex && (
                    <p className="text-slate-400 leading-relaxed pt-1">
                      <strong className="text-rose-300">Why your answer was off: </strong>
                      {currentQ.whyIncorrect}
                    </p>
                  )}
                  <p className="text-[11px] text-[#F5CAD6] pt-1">
                    <strong>Lesson Connection: </strong>
                    {currentQ.lessonConnection}
                  </p>
                </div>
              </div>

              {/* Next Question CTA */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNextQuestion}
                  className="clay-btn-plum px-6 py-2.5 text-xs font-ui font-semibold flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>
                    {questionIndex < activeQuestions.length - 1
                      ? 'Next Question →'
                      : 'View Practice Report →'}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: PHASE 3 — PRACTICE REPORT & LOW-SCORE RECOVERY
  // -------------------------------------------------------------
  if (phase === 'PRACTICE_REPORT' && reportData) {
    const isSuccess = reportData.isPassed;

    return (
      <div className="space-y-8 w-full max-w-5xl mx-auto pb-16 animate-page-entrance">
        {/* Report Banner */}
        <div
          className={`p-8 rounded-3xl border text-center space-y-4 ${
            isSuccess
              ? 'glass-card-dark border-emerald-500/30 shadow-2xl'
              : 'glass-card-dark border-rose-500/30 shadow-2xl'
          }`}
        >
          <div
            className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center text-2xl font-bold ${
              isSuccess
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                : 'bg-rose-950 text-rose-400 border border-rose-500/40'
            }`}
          >
            {isSuccess ? '✓' : '!'}
          </div>

          <div className="space-y-1">
            <span className="text-xs font-ui font-bold uppercase tracking-wider text-slate-400">
              Practice Performance Report
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              {reportData.scorePercentage}% Score ({reportData.correctCount} / {reportData.totalQuestions} Correct)
            </h2>
            <p className="font-editorial italic text-base sm:text-lg text-slate-300 max-w-md mx-auto">
              {reportData.summaryMessage}
            </p>
          </div>

          {/* Concepts Breakdown Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-left">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
              <span className="text-[11px] font-ui font-bold uppercase text-emerald-400 block">
                Mastered Concepts ({reportData.strongConcepts.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {reportData.strongConcepts.length > 0 ? (
                  reportData.strongConcepts.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-lg text-xs font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-500/30"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500 italic">None yet</span>
                )}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
              <span className="text-[11px] font-ui font-bold uppercase text-rose-400 block">
                Concepts Needing Review ({reportData.needsReviewConcepts.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {reportData.needsReviewConcepts.length > 0 ? (
                  reportData.needsReviewConcepts.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-lg text-xs font-mono bg-rose-950/60 text-rose-300 border border-rose-500/30"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500 italic">All concepts mastered!</span>
                )}
              </div>
            </div>
          </div>

          {/* Low Score Recovery Mechanism (< 75%) */}
          {!isSuccess && (
            <div className="p-5 rounded-2xl bg-[#7E2948]/20 border border-[#E598AC]/30 text-left space-y-3">
              <div className="flex items-center gap-2 text-xs font-ui font-bold uppercase tracking-wider text-[#F5CAD6]">
                <RotateCcw className="w-4 h-4" />
                Adaptive Recovery Workflow
              </div>
              <p className="text-xs font-ui text-slate-300 leading-relaxed">
                You didn’t hit the 75% threshold, but that is a natural part of deep learning. We’ve isolated your weak tags and prepared a quick review plus a recovery practice set with completely fresh questions.
              </p>

              {/* Quick Review Notes Toggle */}
              {reportData.needsReviewConcepts.length > 0 && (
                <div className="pt-2">
                  <button
                    onClick={() => setShowQuickReview(prev => !prev)}
                    className="text-xs font-ui font-semibold text-[#E598AC] hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <span>{showQuickReview ? 'Hide Quick Review Notes' : 'View Quick Review Notes for Weak Tags'}</span>
                  </button>

                  {showQuickReview && (
                    <div className="mt-2 space-y-2 p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs font-ui text-slate-300">
                      {reportData.needsReviewConcepts.map((tag, i) => (
                        <div key={i}>
                          <span className="font-bold text-[#F5CAD6] font-mono">{tag}: </span>
                          <span>{lesson.recoveryNotes[tag] || 'Review mathematical boundaries and definitions.'}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Action Decisions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-white/10">
            {isSuccess ? (
              <>
                <button
                  onClick={() => {
                    completeLesson(lesson.id, lesson.title);
                    setActivePage('path');
                  }}
                  className="clay-btn-plum px-7 py-3 text-xs font-ui font-semibold flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>Mark Lesson Complete &amp; View Path</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActivePage('dashboard')}
                  className="glass-pill px-5 py-3 rounded-full text-xs font-ui font-semibold text-slate-300 hover:text-white cursor-pointer"
                >
                  Go to Dashboard
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setIsUsingRecoverySet(true);
                    handleStartPractice();
                  }}
                  className="clay-btn-plum px-7 py-3 text-xs font-ui font-semibold flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Try Recovery Practice Set (Fresh Questions)</span>
                </button>
                <button
                  onClick={() => setPhase('EXPLANATION')}
                  className="glass-pill px-5 py-3 rounded-full text-xs font-ui font-semibold text-slate-300 hover:text-white cursor-pointer"
                >
                  Re-read Lesson Material
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};
