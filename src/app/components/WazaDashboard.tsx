import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, User, Plus, TrendingUp, Shield, Target, ChevronRight, Sparkles, X, BarChart3, Calendar, Zap } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { StoryGraph } from './StoryGraph';
import { DailyRituals } from './DailyRituals';
import { TrustIndicator } from './TrustIndicator';

interface Props {
  language: 'sw' | 'en';
  accessToken: string;
  onNavigate: (destination: string) => void;
  userLevel: 'beginner' | 'intermediate' | 'advanced';
  goal: any;
}

export function WazaDashboard({ language, accessToken, onNavigate, userLevel, goal }: Props) {
  const [totalWealth, setTotalWealth] = useState(4750000);
  const [wealthGrowth, setWealthGrowth] = useState(11.3);
  const [showInsight, setShowInsight] = useState(false);
  const [showDailyCoach, setShowDailyCoach] = useState(false);

  const content = {
    sw: {
      yourWealth: 'Utajiri Wako',
      growth: 'Ukuaji',
      thisMonth: 'mwezi huu',
      accounts: 'Akaunti Zako',
      viewAll: 'Angalia Zote',
      addMoney: 'Ongeza Pesa',
      aiInsight: 'Maarifa ya AI',
      todayInsight: 'Unafanya vizuri zaidi kuliko awali. Lengo lako la TZS 6M linakaribia.',
      quickActions: 'Vitendo vya Haraka',
      onTrack: 'Unafanya Vizuri',
      markets: 'Masoko',
      dividendCalendar: 'Ratiba ya Gawio',
      dailyCoach: 'Utajiri wako uliongezeka TZS 12,000 usiku. Endelea hivyo!',
      welcomeBack: 'Karibu tena'
    },
    en: {
      yourWealth: 'Your Wealth',
      growth: 'Growth',
      thisMonth: 'this month',
      accounts: 'Your Accounts',
      viewAll: 'View All',
      addMoney: 'Add Money',
      aiInsight: 'AI Insight',
      todayInsight: 'You\'re ahead of schedule. Your TZS 6M goal is on track.',
      quickActions: 'Quick Actions',
      onTrack: 'On Track',
      markets: 'Markets',
      dividendCalendar: 'Dividend Calendar',
      dailyCoach: 'Your wealth grew TZS 12,000 overnight. Keep going!',
      welcomeBack: 'Welcome back'
    }
  };

  const t = content[language];

  // Sample portfolio data
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

  // Sample accounts
  const accounts = [
    {
      id: 'everyday',
      name: language === 'sw' ? 'Ukuaji wa Kila Siku' : 'Everyday Growth',
      balance: 2500000,
      growth: 12.5,
      icon: TrendingUp,
      color: 'text-black'
    },
    {
      id: 'retirement',
      name: language === 'sw' ? 'Hifadhi ya Ustaafu' : 'Retirement Vault',
      balance: 1500000,
      growth: 8.2,
      icon: Shield,
      color: 'text-black'
    },
    {
      id: 'goals',
      name: language === 'sw' ? 'Malengo na Akiba' : 'Goals & Savings',
      balance: 750000,
      growth: 5.1,
      icon: Target,
      color: 'text-black'
    }
  ];

  // Show AI insight after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInsight(true);
    }, 3000);
    const coachTimer = setTimeout(() => {
      setShowDailyCoach(true);
    }, 1500);
    return () => {
      clearTimeout(timer);
      clearTimeout(coachTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header - Cleaner, more spacious */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-zinc-100 z-10">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-black flex items-center justify-center">
              <span className="text-white text-base font-medium">W</span>
            </div>
            <div>
              <p className="text-xs text-zinc-500">
                {t.welcomeBack}
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

      {/* Daily Coach Card - Behavioral Nudge */}
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
                  {t.dailyCoach}
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Wealth Card - Vesto-inspired: Big numbers, minimal noise */}
      <div className="px-6 pt-6 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="p-8 border-zinc-200 bg-white">
            <p className="text-xs text-zinc-500 mb-2 tracking-wide uppercase">{t.yourWealth}</p>
            <div className="flex items-end justify-between mb-6">
              <h1 className="text-7xl font-light tracking-tight leading-none">
                {(totalWealth / 1000000).toFixed(2)}M
              </h1>
              <div className="text-right pb-2">
                <div className="flex items-center gap-1.5 text-green-600 mb-1">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-lg font-medium">+{wealthGrowth}%</span>
                </div>
                <p className="text-xs text-zinc-500">{t.thisMonth}</p>
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

            {/* AI Insight - Inline */}
            {showInsight && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center gap-2 text-sm text-zinc-600"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                <span>{t.onTrack} · {t.todayInsight}</span>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </div>

      {/* Daily Rituals */}
      <DailyRituals
        language={language}
        onComplete={(id) => console.log('Completed:', id)}
        onViewLesson={(id) => onNavigate('tutor')}
      />

      {/* Accounts */}
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-light">{t.accounts}</h2>
          <button
            onClick={() => onNavigate('accounts')}
            className="text-sm text-zinc-600 hover:text-black transition-colors flex items-center gap-1"
          >
            {t.viewAll}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {accounts.map((account, index) => {
            const Icon = account.icon;
            return (
              <motion.div
                key={account.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              >
                <Card
                  className="p-4 border-zinc-200 hover:border-zinc-400 transition-all cursor-pointer"
                  onClick={() => onNavigate(`account-${account.id}`)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center">
                        <Icon className={`w-5 h-5 ${account.color}`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{account.name}</p>
                        <p className="text-lg font-light">
                          TZS {(account.balance / 1000).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-black">+{account.growth}%</p>
                      <ChevronRight className="w-5 h-5 text-zinc-400" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
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
            className="h-24 border-zinc-300 hover:border-zinc-500 flex flex-col items-center justify-center gap-2"
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
            {t.dividendCalendar}
          </Button>
          <Button
            onClick={() => onNavigate('scenario-planner')}
            variant="ghost"
            className="h-12 text-zinc-600 hover:text-black hover:bg-zinc-50"
          >
            <Target className="w-4 h-4 mr-2" />
            {language === 'sw' ? 'Panga' : 'Plan'}
          </Button>
        </div>
        
        {/* New Features Button */}
        <Button
          onClick={() => onNavigate('advanced-features')}
          variant="outline"
          className="w-full h-12 mt-3 border-2 border-blue-300 hover:border-blue-500 bg-blue-50 hover:bg-blue-100 text-blue-700"
        >
          <Zap className="w-4 h-4 mr-2" />
          <span className="font-medium">
            {language === 'sw' ? '✨ Vipengele Vipya (MVP Demo)' : '✨ New Features (MVP Demo)'}
          </span>
        </Button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200">
        <div className="flex items-center justify-around py-3 px-6">
          <button className="flex flex-col items-center gap-1">
            <TrendingUp className="w-6 h-6 text-black" />
            <span className="text-xs text-black font-medium">
              {language === 'sw' ? 'Nyumbani' : 'Home'}
            </span>
          </button>
          <button
            onClick={() => onNavigate('portfolio')}
            className="flex flex-col items-center gap-1"
          >
            <Shield className="w-6 h-6 text-zinc-400" />
            <span className="text-xs text-zinc-400">
              {language === 'sw' ? 'Akaunti' : 'Accounts'}
            </span>
          </button>
          <button
            onClick={() => onNavigate('tutor')}
            className="flex flex-col items-center gap-1"
          >
            <Target className="w-6 h-6 text-zinc-400" />
            <span className="text-xs text-zinc-400">
              {language === 'sw' ? 'Jifunze' : 'Learn'}
            </span>
          </button>
          <button
            onClick={() => onNavigate('profile')}
            className="flex flex-col items-center gap-1"
          >
            <User className="w-6 h-6 text-zinc-400" />
            <span className="text-xs text-zinc-400">
              {language === 'sw' ? 'Profaili' : 'Profile'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}