import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, User, Plus, TrendingUp, Shield, Target, ChevronRight, Sparkles, X, BarChart3, Calendar, Home } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { StoryGraph } from './StoryGraph';

interface Props {
  language: 'sw' | 'en';
  onNavigate: (destination: string) => void;
  userData: {
    name: string;
    totalWealth: number;
    wealthGrowth: number;
    hasInvestments: boolean;
  };
}

export function EnhancedDashboard({ language, onNavigate, userData }: Props) {
  const [showDailyCoach, setShowDailyCoach] = useState(false);
  const [showInsight, setShowInsight] = useState(false);
  const [expandedInsight, setExpandedInsight] = useState(false);

  const microcopy = {
    en: {
      greeting: {
        morning: 'Good morning',
        afternoon: 'Good afternoon',
        evening: 'Good evening'
      },
      yourWealth: 'Your Wealth',
      onTrack: 'On track',
      todayInsight: 'Today's Insight',
      learnMore: 'Learn more',
      yourGoals: 'Your Goals',
      addGoal: 'Add Goal',
      quickActions: 'Quick Actions',
      addMoney: 'Add Money',
      invest: 'Invest',
      markets: 'Markets',
      dividendCalendar: 'Dividend Calendar',
      home: 'Home',
      accounts: 'Accounts',
      learn: 'Learn',
      profile: 'Profile',
      toGoal: 'to goal',
      viewAll: 'View All',
      welcomeTitle: 'Welcome to Waza',
      welcomeSubtitle: 'Start your wealth journey',
      welcomeStep1: 'Add money (M-Pesa/Bank)',
      welcomeStep2: 'Choose your goals',
      welcomeStep3: 'Track your progress',
      getStarted: 'Get Started',
      aiCoachLearning: 'Your AI coach is learning',
      aiCoachMessage: 'Add funds to get personalized insights about your wealth journey',
      consistency: 'You're saving 15% more than last quarter. Keep this momentum going!',
      dailyCoachMessage: 'Your wealth grew TZS 12,000 overnight. Keep going!'
    },
    sw: {
      greeting: {
        morning: 'Habari za asubuhi',
        afternoon: 'Habari za mchana',
        evening: 'Habari za jioni'
      },
      yourWealth: 'Utajiri Wako',
      onTrack: 'Unafanya Vizuri',
      todayInsight: 'Maarifa ya Leo',
      learnMore: 'Jifunze zaidi',
      yourGoals: 'Malengo Yako',
      addGoal: 'Ongeza Lengo',
      quickActions: 'Vitendo vya Haraka',
      addMoney: 'Ongeza Pesa',
      invest: 'Wekeza',
      markets: 'Masoko',
      dividendCalendar: 'Ratiba ya Gawio',
      home: 'Nyumbani',
      accounts: 'Akaunti',
      learn: 'Jifunze',
      profile: 'Profaili',
      toGoal: 'kwa lengo',
      viewAll: 'Angalia Zote',
      welcomeTitle: 'Karibu Waza',
      welcomeSubtitle: 'Anza safari yako ya utajiri',
      welcomeStep1: 'Ongeza pesa (M-Pesa/Benki)',
      welcomeStep2: 'Chagua malengo yako',
      welcomeStep3: 'Fuatilia maendeleo yako',
      getStarted: 'Anza Sasa',
      aiCoachLearning: 'Kocha wako wa AI anajifunza',
      aiCoachMessage: 'Ongeza fedha ili kupata maarifa maalum kuhusu safari yako ya utajiri',
      consistency: 'Unahifadhi zaidi 15% kuliko robo iliyopita. Endelea hivyo!',
      dailyCoachMessage: 'Utajiri wako uliongezeka TZS 12,000 usiku. Endelea hivyo!'
    }
  };

  const t = microcopy[language];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t.greeting.morning;
    if (hour < 18) return t.greeting.afternoon;
    return t.greeting.evening;
  };

  // Portfolio data
  const portfolioData = [
    { date: 'Jan', value: 4100000 },
    { date: 'Feb', value: 4200000 },
    { date: 'Mar', value: 4150000 },
    { date: 'Apr', value: 4300000 },
    { date: 'May', value: 4400000 },
    { date: 'Jun', value: 4450000 },
    { date: 'Jul', value: 4550000 },
    { date: 'Aug', value: 4600000 },
    { date: 'Sep', value: 4650000 },
    { date: 'Oct', value: 4700000 },
    { date: 'Nov', value: 4750000 },
    { date: 'Dec', value: 4750000, projectedLow: 5200000, projectedHigh: 6100000 }
  ];

  // Sample accounts/goals
  const accounts = [
    {
      id: 'everyday',
      icon: '🎯',
      name: language === 'sw' ? 'Ukuaji wa Kila Siku' : 'Everyday Growth',
      balance: 2500000,
      goal: 3000000,
      growth: 12.5,
      progress: 83,
      status: 'on-track' as const
    },
    {
      id: 'retirement',
      icon: '🛡️',
      name: language === 'sw' ? 'Hifadhi ya Ustaafu' : 'Retirement Vault',
      balance: 1500000,
      goal: 2000000,
      growth: 8.2,
      progress: 75,
      status: 'on-track' as const
    },
    {
      id: 'goals',
      icon: '💰',
      name: language === 'sw' ? 'Malengo na Akiba' : 'Goals & Savings',
      balance: 750000,
      goal: 1500000,
      growth: 5.1,
      progress: 50,
      status: 'needs-attention' as const
    }
  ];

  // Show daily coach after delay
  useEffect(() => {
    if (userData.hasInvestments) {
      const coachTimer = setTimeout(() => {
        setShowDailyCoach(true);
      }, 1500);
      const insightTimer = setTimeout(() => {
        setShowInsight(true);
      }, 3000);
      return () => {
        clearTimeout(coachTimer);
        clearTimeout(insightTimer);
      };
    }
  }, [userData.hasInvestments]);

  // Empty state (new user)
  if (!userData.hasInvestments) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-zinc-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-black flex items-center justify-center">
              <span className="text-white text-base font-medium">W</span>
            </div>
            <p className="text-sm font-medium tracking-tight">Waza Wealth</p>
          </div>
          <button
            onClick={() => onNavigate('profile')}
            className="w-11 h-11 rounded-full bg-zinc-50 flex items-center justify-center hover:bg-zinc-100 transition-colors"
          >
            <User className="w-5 h-5 text-zinc-700" />
          </button>
        </div>

        {/* Empty State Content */}
        <div className="flex-1 flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md text-center"
          >
            <h1 className="text-4xl font-light mb-2">{t.welcomeTitle}</h1>
            <p className="text-lg text-zinc-600 mb-12">{t.welcomeSubtitle}</p>

            {/* Simple illustration - minimal lines */}
            <div className="mb-12">
              <svg width="200" height="120" viewBox="0 0 200 120" className="mx-auto">
                <motion.path
                  d="M 20 100 L 60 70 L 100 50 L 140 30 L 180 20"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-black"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: 'easeInOut' }}
                />
              </svg>
            </div>

            <div className="space-y-4 mb-12 text-left">
              {[t.welcomeStep1, t.welcomeStep2, t.welcomeStep3].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.2 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-sm text-zinc-700">{step}</p>
                </motion.div>
              ))}
            </div>

            <Button
              onClick={() => onNavigate('mobilemoney')}
              className="w-full h-14 bg-black text-white hover:bg-zinc-800"
            >
              {t.getStarted}
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  // Default state (with investments)
  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-zinc-100 z-10">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-black flex items-center justify-center">
              <span className="text-white text-base font-medium">W</span>
            </div>
            <div>
              <p className="text-xs text-zinc-500">
                {getGreeting()}, {userData.name}
              </p>
              <p className="text-sm font-medium tracking-tight">Waza Wealth</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('notifications')}
              className="w-11 h-11 rounded-full bg-zinc-50 flex items-center justify-center hover:bg-zinc-100 transition-colors"
            >
              <Bell className="w-5 h-5 text-zinc-700" />
            </button>
            <button
              onClick={() => onNavigate('profile')}
              className="w-11 h-11 rounded-full bg-zinc-50 flex items-center justify-center hover:bg-zinc-100 transition-colors"
            >
              <User className="w-5 h-5 text-zinc-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Daily Coach Card */}
      <AnimatePresence>
        {showDailyCoach && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="px-6 pt-4"
          >
            <Card className="p-4 bg-zinc-50 border-zinc-200 relative">
              <button
                onClick={() => setShowDailyCoach(false)}
                className="absolute top-3 right-3 w-6 h-6 rounded-full bg-zinc-200 flex items-center justify-center hover:bg-zinc-300 transition-colors"
              >
                <X className="w-3.5 h-3.5 text-zinc-600" />
              </button>
              <div className="flex items-start gap-3 pr-8">
                <Sparkles className="w-5 h-5 text-zinc-700 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-zinc-700 leading-relaxed">
                  {t.dailyCoachMessage}
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Wealth Card */}
      <div className="px-6 pt-6 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="p-8 border-zinc-200 bg-white hover:border-zinc-300 transition-colors">
            <p className="text-xs text-zinc-500 mb-2 tracking-wide uppercase">{t.yourWealth}</p>
            <div className="flex items-end justify-between mb-6">
              <motion.h1
                className="text-7xl font-light tracking-tight leading-none"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                {(userData.totalWealth / 1000000).toFixed(2)}M
              </motion.h1>
              <div className="text-right pb-2">
                <div className="flex items-center gap-1.5 text-green-600 mb-1">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-lg font-medium">+{userData.wealthGrowth}%</span>
                </div>
                <p className="text-xs text-zinc-500">
                  {language === 'en' ? 'this month' : 'mwezi huu'}
                </p>
              </div>
            </div>
            
            {/* Minimal sparkline */}
            <div className="h-16 mb-4">
              <StoryGraph
                data={portfolioData}
                height={64}
                showProjection={false}
                showConfidenceBands={false}
                minimal={true}
              />
            </div>

            {/* Status indicator */}
            {showInsight && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center gap-2 text-sm text-zinc-600"
              >
                <motion.span
                  className="w-2 h-2 rounded-full bg-green-500"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span>{t.onTrack}</span>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </div>

      {/* AI Insight Card */}
      {showInsight && (
        <div className="px-6 py-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card
              className="p-6 bg-zinc-50 border-zinc-200 cursor-pointer hover:bg-zinc-100 transition-colors"
              onClick={() => setExpandedInsight(true)}
            >
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-zinc-700 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-zinc-900 mb-2">{t.todayInsight}</p>
                  <p className="text-sm text-zinc-700 leading-relaxed mb-3">
                    {t.consistency}
                  </p>
                  <button className="text-sm text-zinc-700 hover:text-black font-medium flex items-center gap-1">
                    {t.learnMore}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      )}

      {/* Goals Section */}
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-light">{t.yourGoals}</h2>
          <button
            onClick={() => onNavigate('goals')}
            className="text-sm text-zinc-600 hover:text-black transition-colors flex items-center gap-1"
          >
            {t.viewAll}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {accounts.map((account, index) => (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
            >
              <Card
                className="p-5 border-zinc-200 hover:border-zinc-400 transition-all cursor-pointer"
                onClick={() => onNavigate(`goal-${account.id}`)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{account.icon}</span>
                    <div>
                      <p className="text-base font-medium">{account.name}</p>
                      <p className="text-2xl font-light mt-1">
                        TZS {(account.balance / 1000000).toFixed(1)}M
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-600">+{account.growth}%</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-2">
                  <div className="h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-black rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${account.progress}%` }}
                      transition={{ duration: 1, delay: 0.8 + index * 0.1, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-zinc-600">
                    {account.progress}% {t.toGoal}
                  </p>
                  {account.status === 'on-track' && (
                    <div className="flex items-center gap-1.5 text-xs text-green-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      <span>{t.onTrack}</span>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}

          <Button
            variant="ghost"
            onClick={() => onNavigate('add-goal')}
            className="w-full h-12 border-2 border-dashed border-zinc-300 hover:border-zinc-500 text-zinc-600 hover:text-black hover:bg-zinc-50"
          >
            <Plus className="w-5 h-5 mr-2" />
            {t.addGoal}
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 pb-8">
        <h2 className="text-xl font-light mb-4">{t.quickActions}</h2>
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => onNavigate('mobilemoney')}
            className="h-24 bg-black text-white hover:bg-zinc-800 flex flex-col items-center justify-center gap-2"
          >
            <Plus className="w-6 h-6" />
            <span className="text-sm">{t.addMoney}</span>
          </Button>
          <Button
            onClick={() => onNavigate('markets')}
            variant="outline"
            className="h-24 border-2 border-zinc-300 hover:border-zinc-500 hover:bg-zinc-50 flex flex-col items-center justify-center gap-2"
          >
            <BarChart3 className="w-6 h-6" />
            <span className="text-sm">{t.markets}</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mt-3">
          <Button
            onClick={() => onNavigate('dividend-calendar')}
            variant="ghost"
            className="h-12 text-zinc-600 hover:text-black hover:bg-zinc-50"
          >
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">{t.dividendCalendar}</span>
          </Button>
          <Button
            onClick={() => onNavigate('invest')}
            variant="ghost"
            className="h-12 text-zinc-600 hover:text-black hover:bg-zinc-50"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            <span className="text-sm">{t.invest}</span>
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 z-20">
        <div className="flex items-center justify-around py-3 px-6">
          <button className="flex flex-col items-center gap-1">
            <Home className="w-6 h-6 text-black" />
            <span className="text-xs text-black font-medium">{t.home}</span>
          </button>
          <button
            onClick={() => onNavigate('portfolio')}
            className="flex flex-col items-center gap-1"
          >
            <Shield className="w-6 h-6 text-zinc-400" />
            <span className="text-xs text-zinc-400">{t.accounts}</span>
          </button>
          <button
            onClick={() => onNavigate('tutor')}
            className="flex flex-col items-center gap-1"
          >
            <Target className="w-6 h-6 text-zinc-400" />
            <span className="text-xs text-zinc-400">{t.learn}</span>
          </button>
          <button
            onClick={() => onNavigate('profile')}
            className="flex flex-col items-center gap-1"
          >
            <User className="w-6 h-6 text-zinc-400" />
            <span className="text-xs text-zinc-400">{t.profile}</span>
          </button>
        </div>
      </div>

      {/* Expanded Insight Modal */}
      <AnimatePresence>
        {expandedInsight && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-30"
              onClick={() => setExpandedInsight(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-40 max-h-[80vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-zinc-200 px-6 py-4 flex items-center justify-between rounded-t-3xl">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-zinc-700" />
                  <h2 className="text-lg font-medium">
                    {language === 'en' ? 'Why this matters' : 'Kwa nini hii ni muhimu'}
                  </h2>
                </div>
                <button
                  onClick={() => setExpandedInsight(false)}
                  className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-zinc-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="px-6 py-6">
                <p className="text-base leading-relaxed text-zinc-700 mb-6">
                  {t.consistency}
                </p>

                <div className="mb-6">
                  <StoryGraph
                    data={portfolioData}
                    height={180}
                    showProjection={false}
                    showConfidenceBands={false}
                  />
                </div>

                <div className="bg-zinc-50 rounded-xl p-5 mb-6">
                  <p className="text-sm font-medium mb-3">
                    {language === 'en' ? 'What you can do:' : 'Unaweza kufanya:'}
                  </p>
                  <ul className="space-y-2 text-sm text-zinc-700">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0 mt-1.5" />
                      <span>
                        {language === 'en'
                          ? 'Continue your monthly contributions'
                          : 'Endelea na michango yako ya kila mwezi'}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0 mt-1.5" />
                      <span>
                        {language === 'en'
                          ? 'Review your portfolio balance'
                          : 'Kagua usawa wa mkoba wako'}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0 mt-1.5" />
                      <span>
                        {language === 'en'
                          ? 'Stay consistent with your goals'
                          : 'Kuwa thabiti na malengo yako'}
                      </span>
                    </li>
                  </ul>
                </div>

                <Button
                  onClick={() => setExpandedInsight(false)}
                  className="w-full h-12 bg-black text-white hover:bg-zinc-800"
                >
                  {language === 'en' ? 'Got it' : 'Nimeelewa'}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
