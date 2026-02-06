import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Area, AreaChart, ResponsiveContainer, Line, LineChart, ReferenceLine } from "recharts";
import { TrendingUp, Settings } from "lucide-react";
import { DailyHabitEngine } from "./DailyHabitEngine";
import { TrustIndicator } from "./TrustIndicator";

interface AdaptiveDashboardProps {
  language: 'sw' | 'en';
  accessToken: string;
  onNavigate: (screen: string) => void;
  userLevel?: 'beginner' | 'intermediate' | 'advanced';
  goal?: any;
}

export function AdaptiveDashboard({ language, accessToken, onNavigate, userLevel = 'beginner', goal }: AdaptiveDashboardProps) {
  const [portfolio, setPortfolio] = useState<any>(null);
  const [timeframe, setTimeframe] = useState<'1W' | '1M' | '3M' | '6M' | '1Y'>('1M');
  const [graphData, setGraphData] = useState<any[]>([]);
  const [projectionData, setProjectionData] = useState<any[]>([]);
  const [insight, setInsight] = useState<string>('');
  const [showSettings, setShowSettings] = useState(false);

  const t = language === 'sw' ? {
    yourPortfolio: 'Mkoba wako',
    yourGoal: 'Lengo lako',
    progress: 'Maendeleo',
    invested: 'Umeweka',
    available: 'Inayotumika',
    performance: 'Utendaji',
    allocation: 'Mgawanyo',
    projection: 'Makadirio',
    whatIf: 'Kama...?',
    viewDetails: 'Angalia zaidi',
    startInvesting: 'Anza kuwekeza',
    learn: 'Jifunze',
    home: 'Nyumbani',
    portfolio: 'Mkoba',
    invest: 'Wekeza',
    setGoal: 'Weka lengo',
    monthly: 'kila mwezi',
    onTrack: 'Upo njiani',
    ahead: 'Umejitangulia',
    behind: 'Umechelewa kidogo',
    confidenceBand: 'Uwezo wa kufikia',
    bestCase: 'Bora zaidi',
    worstCase: 'Mbaya zaidi',
    likely: 'Uwezekano',
    insights: {
      building: 'Unajenga uthabiti. Hii ni muhimu zaidi ya kasi.',
      growing: 'Ukuaji wako ni wa kawaida. Endelea hivyo.',
      steady: 'Uwekezaji wako ni imara. Hii ni ishara nzuri.',
      goalProgress: 'Unaelekea kwenye lengo lako. Uthabiti wako unakuleta karibu.',
      patience: 'Subira ni ufunguo. Unaelekea vizuri.'
    }
  } : {
    yourPortfolio: 'Your portfolio',
    yourGoal: 'Your goal',
    progress: 'Progress',
    invested: 'Invested',
    available: 'Available',
    performance: 'Performance',
    allocation: 'Allocation',
    projection: 'Projection',
    whatIf: 'What if?',
    viewDetails: 'View details',
    startInvesting: 'Start investing',
    learn: 'Learn',
    home: 'Home',
    portfolio: 'Portfolio',
    invest: 'Invest',
    setGoal: 'Set goal',
    monthly: 'monthly',
    onTrack: 'On track',
    ahead: 'Ahead',
    behind: 'Slightly behind',
    confidenceBand: 'Confidence range',
    bestCase: 'Best case',
    worstCase: 'Worst case',
    likely: 'Likely',
    insights: {
      building: "You're building consistency. That matters more than speed.",
      growing: 'Your growth is steady. Keep going.',
      steady: 'Your investments are stable. This is a good sign.',
      goalProgress: "You're heading toward your goal. Your consistency is bringing you closer.",
      patience: "Patience is key. You're heading in the right direction."
    }
  };

  useEffect(() => {
    loadData();
    generateGraphData();
    generateProjectionData();
    selectRandomInsight();
  }, [timeframe]);

  const loadData = async () => {
    try {
      const { projectId } = await import('@/utils/supabase/info');
      const apiUrl = `https://${projectId}.supabase.co/functions/v1/make-server-f0a5cca3`;

      const portfolioRes = await fetch(`${apiUrl}/portfolio`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });

      const portfolioData = await portfolioRes.json();
      setPortfolio(portfolioData);
    } catch (err) {
      console.error('Error loading portfolio:', err);
    }
  };

  const generateGraphData = () => {
    const points = timeframe === '1W' ? 7 : timeframe === '1M' ? 30 : timeframe === '3M' ? 90 : timeframe === '6M' ? 180 : 365;
    const baseValue = 10000000;
    
    const data = [];
    let currentValue = baseValue * 0.95;
    
    for (let i = 0; i < points; i++) {
      const trend = (i / points) * (baseValue * 0.08);
      const noise = (Math.random() - 0.5) * (baseValue * 0.02);
      currentValue = baseValue * 0.95 + trend + noise;
      
      data.push({
        value: Math.round(currentValue),
        index: i,
        // For intermediate/advanced: add high/low bands
        high: Math.round(currentValue * 1.05),
        low: Math.round(currentValue * 0.95)
      });
    }
    
    setGraphData(data);
  };

  const generateProjectionData = () => {
    if (!goal) return;
    
    const months = goal.years * 12;
    const monthlyContribution = goal.monthlyContribution || 0;
    const data = [];
    
    let currentValue = portfolio?.totalValue || 10000000;
    const monthlyReturn = 0.01; // 12% annual
    
    for (let i = 0; i <= months; i++) {
      currentValue = currentValue * (1 + monthlyReturn) + monthlyContribution;
      
      data.push({
        month: i,
        value: Math.round(currentValue),
        target: goal.targetAmount,
        // Confidence bands
        optimistic: Math.round(currentValue * 1.15), // +15%
        pessimistic: Math.round(currentValue * 0.85) // -15%
      });
    }
    
    setProjectionData(data);
  };

  const selectRandomInsight = () => {
    const insightKeys = Object.keys(t.insights);
    const randomKey = insightKeys[Math.floor(Math.random() * insightKeys.length)];
    setInsight(t.insights[randomKey as keyof typeof t.insights]);
  };

  const formatCurrency = (amount: number) => {
    return `TZS ${amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  };

  const calculateGoalProgress = () => {
    if (!goal) return 0;
    const current = portfolio?.totalValue || 0;
    return Math.min((current / goal.targetAmount) * 100, 100);
  };

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          className="w-12 h-12 border-2 border-black border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  const totalValue = portfolio?.totalValue || 10000000;
  const change = graphData.length > 0 ? graphData[graphData.length - 1].value - graphData[0].value : 0;
  const isPositive = change >= 0;
  const goalProgress = calculateGoalProgress();

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="max-w-2xl mx-auto px-6 pt-12 pb-8">
        
        {/* BEGINNER VIEW - Extreme simplicity */}
        {userLevel === 'beginner' && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-12"
            >
              <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-3">
                {t.yourPortfolio}
              </p>
              <h1 className="text-7xl font-bold text-black mb-4 leading-none">
                {formatCurrency(totalValue)}
              </h1>
              <p className="text-base text-gray-600">
                {isPositive ? '+' : ''}{formatCurrency(Math.abs(change))} {' '}
                <span className="text-gray-400">
                  {timeframe === '1W' ? (language === 'sw' ? 'wiki hii' : 'this week') : (language === 'sw' ? 'mwezi huu' : 'this month')}
                </span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mb-8"
            >
              <div className="flex items-center justify-center gap-6 mb-6">
                {(['1W', '1M', '3M', '6M'] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`text-sm font-medium transition-colors ${
                      timeframe === tf ? 'text-black' : 'text-gray-300'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={graphData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#000000" stopOpacity={0.08} />
                        <stop offset="100%" stopColor="#000000" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#000000"
                      strokeWidth={2}
                      fill="url(#portfolioGradient)"
                      animationDuration={1200}
                      animationEasing="ease-in-out"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="bg-gray-50 rounded-3xl p-8 mb-8 border border-gray-100"
            >
              <p className="text-lg text-gray-900 leading-relaxed">
                "{insight}"
              </p>
            </motion.div>
          </>
        )}

        {/* INTERMEDIATE VIEW - Add goal progress + allocation */}
        {userLevel === 'intermediate' && (
          <>
            {goal && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-3">
                  {t.yourGoal}
                </p>
                <h2 className="text-2xl font-bold text-black mb-2">{goal.name}</h2>
                
                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">{goalProgress.toFixed(0)}% {t.progress}</span>
                    <span className="text-sm font-semibold text-black">
                      {formatCurrency(goal.targetAmount)}
                    </span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${goalProgress}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-black rounded-full"
                    />
                  </div>
                </div>
                
                <p className="text-sm text-gray-600">
                  {formatCurrency(goal.monthlyContribution)} {t.monthly}
                </p>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-3">
                {t.yourPortfolio}
              </p>
              <h1 className="text-6xl font-bold text-black mb-6">
                {formatCurrency(totalValue)}
              </h1>

              {/* Allocation bar */}
              {portfolio?.positions?.length > 0 && (
                <div className="space-y-2 mb-6">
                  <p className="text-xs text-gray-400 uppercase tracking-wider">
                    {t.allocation}
                  </p>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden flex">
                    {portfolio.positions.map((pos: any, idx: number) => {
                      const percentage = (pos.currentValue / totalValue) * 100;
                      return (
                        <div
                          key={idx}
                          style={{ width: `${percentage}%` }}
                          className="h-full bg-black"
                          title={`${pos.symbol}: ${percentage.toFixed(1)}%`}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="h-48 w-full mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={graphData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="portfolioGradient2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#000000" stopOpacity={0.08} />
                        <stop offset="100%" stopColor="#000000" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#000000"
                      strokeWidth={2}
                      fill="url(#portfolioGradient2)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">{t.invested}</p>
                  <p className="text-xl font-bold text-black">
                    {formatCurrency(portfolio?.totalInvested || 0)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">{t.available}</p>
                  <p className="text-xl font-bold text-black">
                    {formatCurrency(portfolio?.balance || 0)}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {/* ADVANCED VIEW - Add projections + confidence bands */}
        {userLevel === 'advanced' && (
          <>
            {goal && projectionData.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-3">
                  {t.projection}
                </p>
                <h2 className="text-2xl font-bold text-black mb-4">{goal.name}</h2>
                
                {/* Projection graph with confidence bands */}
                <div className="h-64 w-full mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={projectionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="confidenceBand" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#000000" stopOpacity={0.05} />
                          <stop offset="100%" stopColor="#000000" stopOpacity={0.02} />
                        </linearGradient>
                      </defs>
                      
                      {/* Confidence band (shaded area between optimistic and pessimistic) */}
                      <Area
                        type="monotone"
                        dataKey="optimistic"
                        stroke="none"
                        fill="url(#confidenceBand)"
                        fillOpacity={0.3}
                      />
                      <Area
                        type="monotone"
                        dataKey="pessimistic"
                        stroke="none"
                        fill="#ffffff"
                      />
                      
                      {/* Target line */}
                      <ReferenceLine
                        y={goal.targetAmount}
                        stroke="#666666"
                        strokeDasharray="3 3"
                        strokeWidth={1}
                      />
                      
                      {/* Projected value */}
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#000000"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <p className="text-gray-400 mb-1">{t.bestCase}</p>
                    <p className="font-semibold text-black">
                      {formatCurrency(projectionData[projectionData.length - 1]?.optimistic || 0)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 mb-1">{t.likely}</p>
                    <p className="font-semibold text-black">
                      {formatCurrency(projectionData[projectionData.length - 1]?.value || 0)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 mb-1">{t.worstCase}</p>
                    <p className="font-semibold text-black">
                      {formatCurrency(projectionData[projectionData.length - 1]?.pessimistic || 0)}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-3">
                {t.yourPortfolio}
              </p>
              <div className="flex items-baseline gap-4 mb-6">
                <h1 className="text-5xl font-bold text-black">
                  {formatCurrency(totalValue)}
                </h1>
                <span className={`text-lg font-semibold ${isPositive ? 'text-gray-900' : 'text-gray-600'}`}>
                  {isPositive ? '+' : ''}{((change / graphData[0]?.value) * 100).toFixed(1)}%
                </span>
              </div>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={graphData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="portfolioGradient3" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#000000" stopOpacity={0.08} />
                        <stop offset="100%" stopColor="#000000" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    {/* High/Low bands */}
                    <Area type="monotone" dataKey="high" stroke="none" fill="#f3f4f6" />
                    <Area type="monotone" dataKey="low" stroke="none" fill="#ffffff" />
                    {/* Main line */}
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#000000"
                      strokeWidth={2}
                      fill="url(#portfolioGradient3)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="space-y-3"
        >
          {portfolio?.positions?.length > 0 ? (
            <button
              onClick={() => onNavigate('portfolio')}
              className="w-full bg-black text-white py-6 rounded-full font-semibold hover:bg-gray-900 transition-colors"
            >
              {t.viewDetails}
            </button>
          ) : (
            <button
              onClick={() => onNavigate('invest')}
              className="w-full bg-black text-white py-6 rounded-full font-semibold hover:bg-gray-900 transition-colors"
            >
              {t.startInvesting}
            </button>
          )}
          
          {!goal && (
            <button
              onClick={() => onNavigate('goals')}
              className="w-full bg-white text-gray-600 py-6 rounded-full font-medium hover:text-black border-2 border-gray-100 hover:border-gray-200 transition-colors"
            >
              {t.setGoal}
            </button>
          )}
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-100 z-50">
        <div className="max-w-2xl mx-auto px-6 py-3">
          <div className="flex items-center justify-around">
            {[
              { id: 'dashboard', label: t.home },
              { id: 'portfolio', label: t.portfolio },
              { id: 'tutor', label: t.learn },
              { id: 'invest', label: t.invest }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center py-3 px-4 min-w-[70px] transition-colors ${
                  item.id === 'dashboard' ? 'text-black' : 'text-gray-400'
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full mb-2 ${
                  item.id === 'dashboard' ? 'bg-black' : 'bg-transparent'
                }`}></div>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}