import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { MobileNav } from './components/layout/MobileNav';

// Onboarding Pages
import { WelcomeNew } from './components/pages/OnboardingFlow/WelcomeNew';
import { ChooseConcepts } from './components/pages/OnboardingFlow/ChooseConcepts';
import { LearningInterests } from './components/pages/OnboardingFlow/LearningInterests';
import { DiagnosticAssessment } from './components/pages/OnboardingFlow/DiagnosticAssessment';
import { KnowledgeAnalysis } from './components/pages/OnboardingFlow/KnowledgeAnalysis';
import { PathCreation } from './components/pages/OnboardingFlow/PathCreation';

// Returning User Welcome
import { WelcomeReturn } from './components/pages/WelcomeReturn';

// Main Application Pages
import { DashboardPage } from './components/pages/DashboardPage';
import { MyPathPage } from './components/pages/MyPathPage';
import { LearnPage } from './components/pages/LearnPage';
import { PracticePage } from './components/pages/PracticePage';
import { ProgressPage } from './components/pages/ProgressPage';
import { HistoryPage } from './components/pages/HistoryPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { SettingsPage } from './components/pages/SettingsPage';
import { BackgroundAtmosphere } from './components/common/BackgroundAtmosphere';

const AppContent: React.FC = () => {
  const {
    activePage,
    isOnboardingActive,
    onboardingStep,
    isReturningWelcomeActive,
  } = useApp();

  // If first-time onboarding flow is active
  if (isOnboardingActive) {
    return (
      <div className="min-h-screen relative bg-[#080C15] text-slate-100 overflow-x-hidden">
        <BackgroundAtmosphere />
        <div className="relative z-10 animate-page-entrance" key={onboardingStep}>
          {onboardingStep === 'welcome' && <WelcomeNew />}
          {onboardingStep === 'concepts' && <ChooseConcepts />}
          {onboardingStep === 'interests' && <LearningInterests />}
          {onboardingStep === 'diagnostic' && <DiagnosticAssessment />}
          {onboardingStep === 'analysis' && <KnowledgeAnalysis />}
          {onboardingStep === 'path-created' && <PathCreation />}
        </div>
      </div>
    );
  }

  // If returning-user resume flow is active
  if (isReturningWelcomeActive) {
    return (
      <div className="min-h-screen relative bg-[#080C15] text-slate-100 overflow-x-hidden">
        <BackgroundAtmosphere />
        <div className="relative z-10 animate-page-entrance">
          <WelcomeReturn />
        </div>
      </div>
    );
  }

  // Persistent Multi-Page Application Shell: 100% Viewport Desktop Layout
  return (
    <div className="h-screen w-screen flex bg-[#080C15] text-slate-100 overflow-hidden relative">
      {/* Layered Atmospheric Technology Background */}
      <BackgroundAtmosphere />

      {/* Persistent Glass Sidebar - Fixed to full viewport height */}
      <Sidebar />

      {/* Main View Area - Extends naturally across 100% of remaining viewport width */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto relative z-10 overflow-x-hidden">
        <Header />

        <main
          key={activePage}
          className="flex-1 px-4 sm:px-6 lg:px-8 py-5 w-full min-w-0 animate-page-entrance pb-16 md:pb-8"
        >
          {activePage === 'dashboard' && <DashboardPage />}
          {activePage === 'path' && <MyPathPage />}
          {activePage === 'learn' && <LearnPage />}
          {activePage === 'practice' && <PracticePage />}
          {activePage === 'progress' && <ProgressPage />}
          {activePage === 'history' && <HistoryPage />}
          {activePage === 'profile' && <ProfilePage />}
          {activePage === 'settings' && <SettingsPage />}
        </main>
      </div>

      {/* Mobile Responsive Navigation Bar */}
      <MobileNav />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
