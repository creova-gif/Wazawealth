import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

interface DashboardCalmProps {
  language: 'sw' | 'en';
  accessToken: string;
  onNavigate: (screen: string) => void;
}

export function DashboardCalm({ language, accessToken, onNavigate }: DashboardCalmProps) {
  const [portfolio, setPortfolio] = useState<any>(null);
  const [timeframe, setTimeframe] = useState<'1W' | '1M' | '3M' | '6M'>('1M');
  const [graphData, setGraphData] = useState<any[]>([]);
  const [insight, setInsight] = useState<string>('');

  const t = language === 'sw' ? {
    yourPortfolio: 'Mkoba wako',
    upThisMonth: 'Imeongezeka mwezi huu',
    downThisMonth: 'Imeteremka mwezi huu',
    steady: 'Imara',
    viewDetails: 'Angalia zaidi',
    startInvesting: 'Anza kuwekeza',
    learn: 'Jifunze',
    home: 'Nyumbani',
    portfolio: 'Mkoba',
    invest: 'Wekeza',
    insights: {
      building: 'Unajenga uthabiti. Hii ni muhimu zaidi ya kasi.',
      growing: 'Ukuaji wako ni wa kawaida. Endelea hivyo.',
      steady: 'Uwekezaji wako ni imara. Hii ni ishara nzuri.',
      learning: 'Kila hatua ni somo. Unafanya vizuri.',
      patience: 'Subira ni ufunguo. Unaelekea vizuri.'
    }
  } : {
    yourPortfolio: 'Your portfolio',
    upThisMonth: 'Up this month',
    downThisMonth: 'Down this month',
    steady: 'Steady',
    viewDetails: 'View details',
    startInvesting: 'Start investing',
    learn: 'Learn',
    home: 'Home',
    portfolio: 'Portfolio',
    invest: 'Invest',
    insights: {
      building: "You're building consistency. That matters more than speed.",
      growing: 'Your growth is steady. Keep going.',
      steady: 'Your investments are stable. This is a good sign.',
      learning: "Every step is a lesson. You're doing well.",
      patience: "Patience is key. You're heading in the right direction."
    }
  };

  useEffect(() => {
    loadData();
    generateGraphData();
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
    // Generate smooth, emotional graph data (not volatile)
    const points = timeframe === '1W' ? 7 : timeframe === '1M' ? 30 : timeframe === '3M' ? 90 : 180;
    const baseValue = 10000000;
    const maxChange = 0.05; // 5% max variation for calm feeling
    
    const data = [];
    let currentValue = baseValue * 0.95; // Start slightly lower
    
    for (let i = 0; i < points; i++) {
      // Gradual upward trend with gentle variations
      const trend = (i / points) * (baseValue * 0.08); // 8% growth over period
      const noise = (Math.random() - 0.5) * (baseValue * 0.02); // Small random variation
      currentValue = baseValue * 0.95 + trend + noise;
      
      data.push({
        value: Math.round(currentValue),
        index: i
      });
    }
    
    setGraphData(data);
  };

  const selectRandomInsight = () => {
    const insightKeys = Object.keys(t.insights);
    const randomKey = insightKeys[Math.floor(Math.random() * insightKeys.length)];
    setInsight(t.insights[randomKey as keyof typeof t.insights]);
  };

  const formatCurrency = (amount: number) => {
    return `TZS ${amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
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
  const changePercent = graphData.length > 0 ? ((change / graphData[0].value) * 100) : 0;
  const isPositive = change >= 0;

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Main Content - Extreme Simplicity */}
      <div className="max-w-2xl mx-auto px-6 pt-12 pb-8">
        
        {/* ONE NUMBER - This is everything */}
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
              {timeframe === '1W' 
                ? (language === 'sw' ? 'wiki hii' : 'this week')
                : timeframe === '1M'
                ? (language === 'sw' ? 'mwezi huu' : 'this month')
                : timeframe === '3M'
                ? (language === 'sw' ? 'miezi 3' : '3 months')
                : (language === 'sw' ? 'miezi 6' : '6 months')
              }
            </span>
          </p>
        </motion.div>

        {/* ONE GRAPH - Emotional, not analytical */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mb-8"
        >
          {/* Timeframe selector - minimal */}
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

          {/* The Graph - Soft, calm, emotional */}
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={graphData}
                margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
              >
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

        {/* ONE INSIGHT - AI-generated feeling */}
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

        {/* ONE ACTION - Clear next step */}
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
          
          <button
            onClick={() => onNavigate('tutor')}
            className="w-full bg-white text-gray-600 py-6 rounded-full font-medium hover:text-black border-2 border-gray-100 hover:border-gray-200 transition-colors"
          >
            {t.learn}
          </button>
        </motion.div>
      </div>

      {/* Bottom Navigation - Minimal */}
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