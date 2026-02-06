import { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { SignupScreen } from './components/SignupScreen';
import { RiskAssessmentScreen } from './components/RiskAssessmentScreen';
import { OnboardingTutorial } from './components/OnboardingTutorial';
import { WazaDashboard } from './components/WazaDashboard';
import { PurposeBasedAccounts } from './components/PurposeBasedAccounts';
import { AccountDetailView } from './components/AccountDetailView';
import { InvestStoryBased } from './components/InvestStoryBased';
import { ExpandedTutor } from './components/ExpandedTutor';
import { BadgesScreen } from './components/BadgesScreen';
import { PortfolioScreen } from './components/PortfolioScreen';
import { MobileMoneyScreen } from './components/MobileMoneyScreen';
import { GoalsScreen } from './components/GoalsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { ScenarioPlanner } from './components/ScenarioPlanner';
import { CrossMarketScreen } from './components/CrossMarketScreen';
import { StockDetailScreen } from './components/StockDetailScreen';
import { DividendCalendarScreen } from './components/DividendCalendarScreen';
import { EnhancedAICopilot } from './components/EnhancedAICopilot';
import { DailyHabitEngine } from './components/DailyHabitEngine';
import { AdvancedFeaturesDemo } from './components/AdvancedFeaturesDemo';
import { SystemIntegrationsDemo } from './components/SystemIntegrationsDemo';
import { Toaster } from './components/ui/sonner';

type Screen = 'welcome' | 'signup' | 'risk-assessment' | 'onboarding' | 'dashboard' | 'accounts' | 'account-detail' | 'invest' | 'tutor' | 'badges' | 'portfolio' | 'mobilemoney' | 'notifications' | 'goals' | 'profile' | 'scenario-planner' | 'markets' | 'stock-detail' | 'dividend-calendar' | 'basket-detail' | 'advanced-features' | 'system-integrations';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [language, setLanguage] = useState<'sw' | 'en'>('sw');
  const [user, setUser] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string>('');
  const [riskProfile, setRiskProfile] = useState<any>(null);
  const [portfolioSuggestions, setPortfolioSuggestions] = useState<any[]>([]);
  const [selectedStock, setSelectedStock] = useState<any>(null);
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const [userLevel, setUserLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [goal, setGoal] = useState<any>(null);
  const [showAICopilot, setShowAICopilot] = useState(false);
  const [userActivity, setUserActivity] = useState<any>({
    lastVisit: new Date(),
    daysInactive: 0,
    hasInvested: false
  });

  // Check for existing session on mount
  useEffect(() => {
    checkSession();
  }, []);

  // AI Copilot intelligence - watches user behavior
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentScreen === 'invest' && !userActivity.hasInvested) {
        setUserActivity(prev => ({ ...prev, hesitationScreen: 'invest' }));
        setShowAICopilot(true);
      }
    }, 8000); // Show after 8 seconds of hesitation

    return () => clearTimeout(timer);
  }, [currentScreen]);

  const checkSession = async () => {
    try {
      const { getSupabaseClient } = await import('@/utils/supabase/client');
      const supabase = getSupabaseClient();
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user && session?.access_token) {
        setUser(session.user);
        setAccessToken(session.access_token);
        setCurrentScreen('dashboard');
        
        // Check user level based on activity
        // In production, this would come from backend
        const activityLevel = session.user.user_metadata?.activityLevel || 'beginner';
        setUserLevel(activityLevel);
      }
    } catch (err) {
      console.error('Session check error:', err);
    }
  };

  const handleLanguageSelect = (lang: 'sw' | 'en') => {
    setLanguage(lang);
    setCurrentScreen('signup');
  };

  const handleSignupComplete = (userData: any, token: string) => {
    setUser(userData);
    setAccessToken(token);
    setCurrentScreen('risk-assessment');
  };

  const handleRiskAssessmentComplete = (profile: any, suggestions: any) => {
    setRiskProfile(profile);
    setPortfolioSuggestions(suggestions);
    setCurrentScreen('goals'); // Start with goal-setting
  };

  const handleGoalComplete = (goalData: any) => {
    setGoal(goalData);
    setCurrentScreen('dashboard');
  };

  const handleNavigate = (destination: string) => {
    if (destination.startsWith('account-')) {
      setSelectedAccount(destination.replace('account-', ''));
      setCurrentScreen('account-detail');
    } else {
      setCurrentScreen(destination as Screen);
    }
  };

  const handleAccountSelect = (accountId: string) => {
    setSelectedAccount(accountId);
    setCurrentScreen('account-detail');
  };

  const handleCreateAccount = (type: string) => {
    // In production, create account via backend
    console.log('Creating account:', type);
  };

  return (
    <div className="size-full bg-white">
      <Toaster position="top-center" />
      
      {currentScreen === 'welcome' && (
        <WelcomeScreen onLanguageSelect={handleLanguageSelect} />
      )}

      {currentScreen === 'signup' && (
        <SignupScreen
          language={language}
          onSignupComplete={handleSignupComplete}
        />
      )}

      {currentScreen === 'risk-assessment' && (
        <RiskAssessmentScreen
          language={language}
          accessToken={accessToken}
          onComplete={handleRiskAssessmentComplete}
        />
      )}

      {currentScreen === 'onboarding' && (
        <OnboardingTutorial
          language={language}
          onComplete={() => setCurrentScreen('dashboard')}
        />
      )}

      {currentScreen === 'dashboard' && (
        <WazaDashboard
          language={language}
          accessToken={accessToken}
          onNavigate={handleNavigate}
          userLevel={userLevel}
          goal={goal}
        />
      )}

      {currentScreen === 'accounts' && (
        <PurposeBasedAccounts
          language={language}
          onAccountSelect={handleAccountSelect}
          onCreateAccount={handleCreateAccount}
        />
      )}

      {currentScreen === 'account-detail' && (
        <AccountDetailView
          accountId={selectedAccount}
          language={language}
          onBack={() => setCurrentScreen('accounts')}
          onDeposit={() => setCurrentScreen('mobilemoney')}
          onWithdraw={() => console.log('Withdraw')}
        />
      )}

      {currentScreen === 'invest' && (
        <InvestStoryBased
          language={language}
          accessToken={accessToken}
          onBack={() => setCurrentScreen('dashboard')}
        />
      )}

      {currentScreen === 'tutor' && (
        <ExpandedTutor
          language={language}
          accessToken={accessToken}
          onBack={() => setCurrentScreen('dashboard')}
        />
      )}

      {currentScreen === 'badges' && (
        <BadgesScreen
          language={language}
          accessToken={accessToken}
          onBack={() => setCurrentScreen('dashboard')}
        />
      )}

      {currentScreen === 'portfolio' && (
        <PortfolioScreen
          language={language}
          accessToken={accessToken}
          onNavigate={handleNavigate}
        />
      )}

      {currentScreen === 'mobilemoney' && (
        <MobileMoneyScreen
          language={language}
          accessToken={accessToken}
          onBack={() => setCurrentScreen('dashboard')}
        />
      )}

      {currentScreen === 'goals' && (
        <GoalsScreen
          language={language}
          onBack={() => setCurrentScreen('dashboard')}
          onComplete={handleGoalComplete}
        />
      )}

      {currentScreen === 'profile' && (
        <ProfileScreen
          language={language}
          onBack={() => setCurrentScreen('dashboard')}
          onLogout={() => {
            setUser(null);
            setAccessToken('');
            setCurrentScreen('welcome');
          }}
          onChangeLanguage={(lang) => setLanguage(lang)}
        />
      )}

      {currentScreen === 'scenario-planner' && (
        <ScenarioPlanner
          language={language}
          onBack={() => setCurrentScreen('dashboard')}
          currentBalance={2500000}
        />
      )}

      {currentScreen === 'markets' && (
        <CrossMarketScreen
          language={language}
          onBack={() => setCurrentScreen('dashboard')}
          onNavigate={(dest, data) => {
            if (dest === 'stock-detail') {
              setSelectedStock(data);
              setCurrentScreen('stock-detail');
            } else if (dest === 'basket-detail') {
              setCurrentScreen('basket-detail');
            }
          }}
        />
      )}

      {currentScreen === 'stock-detail' && (
        <StockDetailScreen
          language={language}
          stock={selectedStock}
          onBack={() => setCurrentScreen('markets')}
        />
      )}

      {currentScreen === 'dividend-calendar' && (
        <DividendCalendarScreen
          language={language}
          onBack={() => setCurrentScreen('dashboard')}
        />
      )}

      {/* AI Wealth Copilot - Silent intelligence */}
      {showAICopilot && (
        <EnhancedAICopilot
          language={language}
          userActivity={userActivity}
          onDismiss={() => setShowAICopilot(false)}
          onAction={(action) => {
            console.log('AI action:', action);
            setShowAICopilot(false);
          }}
        />
      )}

      {/* Advanced Features Demo */}
      {currentScreen === 'advanced-features' && (
        <AdvancedFeaturesDemo
          language={language}
          onBack={() => setCurrentScreen('dashboard')}
          onNavigate={handleNavigate}
        />
      )}

      {/* System Integrations Demo */}
      {currentScreen === 'system-integrations' && (
        <SystemIntegrationsDemo
          language={language}
          onBack={() => setCurrentScreen('dashboard')}
        />
      )}
    </div>
  );
}