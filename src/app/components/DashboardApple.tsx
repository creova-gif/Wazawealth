import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Trophy, Sparkles, TrendingUp, TrendingDown, Plus, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { ActivityRings } from "./ActivityRings";
import { CircularProgress } from "./CircularProgress";

interface DashboardProps {
  language: 'sw' | 'en';
  accessToken: string;
  onNavigate: (screen: string) => void;
}

export function Dashboard({ language, accessToken, onNavigate }: DashboardProps) {
  const [portfolio, setPortfolio] = useState<any>(null);
  const [stocks, setStocks] = useState<any[]>([]);
  const [badges, setBadges] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState(language);

  const t = currentLanguage === 'sw' ? {
    summary: 'Muhtasari',
    portfolio: 'Mkoba Wako',
    total: 'Jumla',
    balance: 'Salio',
    invested: 'Umewekeza',
    positions: 'Hisa Zangu',
    topStocks: 'Hisa Bora DSE',
    aiInsights: 'Maarifa ya AI',
    performance: 'Utendaji',
    viewAll: 'Angalia Zote',
    startTrading: 'Anza Biashara',
    noPositions: 'Bado huna hisa',
    growth: 'Ukuaji',
    educational: 'Maelezo tu',
    today: 'Leo'
  } : {
    summary: 'Summary',
    portfolio: 'Your Portfolio',
    total: 'Total Value',
    balance: 'Cash Balance',
    invested: 'Invested',
    positions: 'My Positions',
    topStocks: 'Top DSE Stocks',
    aiInsights: 'AI Insights',
    performance: 'Performance',
    viewAll: 'View All',
    startTrading: 'Start Trading',
    noPositions: 'No positions yet',
    growth: 'Growth',
    educational: 'Educational Only',
    today: 'Today'
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const { projectId } = await import('@/utils/supabase/info');
      const apiUrl = `https://${projectId}.supabase.co/functions/v1/make-server-f0a5cca3`;

      const [portfolioRes, stocksRes, badgesRes] = await Promise.all([
        fetch(`${apiUrl}/portfolio`, { headers: { 'Authorization': `Bearer ${accessToken}` } }),
        fetch(`${apiUrl}/stocks`, { headers: { 'Authorization': `Bearer ${accessToken}` } }),
        fetch(`${apiUrl}/badges`, { headers: { 'Authorization': `Bearer ${accessToken}` } })
      ]);

      const portfolioData = await portfolioRes.json();
      const stocksData = await stocksRes.json();
      const badgesData = await badgesRes.json();

      setPortfolio(portfolioData);
      setStocks(stocksData.stocks || []);
      setBadges(badgesData);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return `${(amount / 1000000).toFixed(1)}M`;
  };

  const formatCurrencyFull = (amount: number) => {
    return `TZS ${amount.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          className="w-16 h-16 border-4 border-[#00A86B] border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  const totalValue = portfolio?.totalValue || 10000000;
  const balance = portfolio?.balance || 10000000;
  const invested = totalValue - balance;
  const totalChange = totalValue - 10000000;
  const totalChangePercent = (totalChange / 10000000) * 100;

  // Calculate ring percentages for activity rings
  const investedPercent = (invested / 10000000) * 100;
  const balancePercent = (balance / 10000000) * 100;
  const growthPercent = Math.max(0, Math.min(100, totalChangePercent + 50));

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">{t.today}</p>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{t.summary}</h1>
            </div>
            <button
              onClick={() => setCurrentLanguage(currentLanguage === 'sw' ? 'en' : 'sw')}
              className="px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-700 hover:bg-gray-200 transition-colors"
            >
              {currentLanguage === 'sw' ? 'EN' : 'SW'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-8">
        {/* Activity Rings Section - Apple Health Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <ActivityRings
              size={220}
              rings={[
                { percentage: investedPercent, color: '#00A86B' },
                { percentage: balancePercent, color: '#34C759' },
                { percentage: growthPercent, color: '#007AFF' }
              ]}
            />
          </div>

          {/* Large total value */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-1">{t.total}</p>
            <h2 className="text-5xl font-bold text-gray-900 mb-2">{formatCurrencyFull(totalValue)}</h2>
            <div className="flex items-center justify-center gap-2">
              {totalChange >= 0 ? (
                <>
                  <TrendingUp className="w-5 h-5 text-[#34C759]" />
                  <span className="text-lg font-semibold text-[#34C759]">+{formatCurrencyFull(totalChange)}</span>
                  <span className="text-sm text-gray-500">({totalChangePercent.toFixed(2)}%)</span>
                </>
              ) : (
                <>
                  <TrendingDown className="w-5 h-5 text-[#FF3B30]" />
                  <span className="text-lg font-semibold text-[#FF3B30]">{formatCurrencyFull(totalChange)}</span>
                  <span className="text-sm text-gray-500">({totalChangePercent.toFixed(2)}%)</span>
                </>
              )}
            </div>
          </motion.div>

          {/* Ring legend */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="text-center">
              <div className="w-8 h-8 rounded-full bg-[#00A86B] mx-auto mb-2"></div>
              <p className="text-xs text-gray-500 mb-1">{t.invested}</p>
              <p className="text-sm font-bold text-gray-900">{formatCurrency(invested)}</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 rounded-full bg-[#34C759] mx-auto mb-2"></div>
              <p className="text-xs text-gray-500 mb-1">{t.balance}</p>
              <p className="text-sm font-bold text-gray-900">{formatCurrency(balance)}</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 rounded-full bg-[#007AFF] mx-auto mb-2"></div>
              <p className="text-xs text-gray-500 mb-1">{t.growth}</p>
              <p className="text-sm font-bold text-gray-900">{totalChangePercent > 0 ? '+' : ''}{totalChangePercent.toFixed(1)}%</p>
            </div>
          </div>
        </motion.div>

        {/* AI Insights Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-6 border border-purple-100"
        >
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-lg mb-1">{t.aiInsights}</h3>
              <p className="text-xs text-gray-500 uppercase tracking-wide">{t.educational}</p>
            </div>
          </div>
          
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            {currentLanguage === 'sw' 
              ? "💡 NMB Bank imeongezeka 5% wiki hii. Fikiria kuongeza uwekezaji kwa mkoba wako wa muda mrefu."
              : "💡 NMB Bank is up 5% this week. Consider increasing allocation for long-term growth."}
          </p>

          <button
            onClick={() => onNavigate('tutor')}
            className="w-full bg-white text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            {currentLanguage === 'sw' ? 'Uliza AI Zaidi' : 'Ask AI More'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* My Positions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{t.positions}</h2>
            {portfolio?.positions?.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onNavigate('portfolio')}
                className="text-[#007AFF] font-semibold hover:bg-blue-50"
              >
                {t.viewAll}
              </Button>
            )}
          </div>

          {portfolio?.positions?.length > 0 ? (
            <div className="space-y-3">
              {portfolio.positions.slice(0, 3).map((position: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#00A86B] to-[#34C759] rounded-full flex items-center justify-center">
                        <span className="font-bold text-white text-sm">{position.symbol.substring(0, 2)}</span>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{position.symbol}</p>
                        <p className="text-sm text-gray-500">{position.shares} shares</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{formatCurrencyFull(position.currentValue)}</p>
                      <div className="flex items-center justify-end gap-1">
                        {position.profitLoss >= 0 ? (
                          <span className="text-sm text-[#34C759] font-semibold">+{position.profitLossPercent.toFixed(2)}%</span>
                        ) : (
                          <span className="text-sm text-[#FF3B30] font-semibold">{position.profitLossPercent.toFixed(2)}%</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-3xl p-12 text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 mb-6">{t.noPositions}</p>
              <button
                onClick={() => onNavigate('trade')}
                className="bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                {t.startTrading}
              </button>
            </div>
          )}
        </motion.div>

        {/* Top DSE Stocks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.topStocks}</h2>
          
          {stocks.length === 0 ? (
            <div className="bg-gray-50 rounded-3xl p-8 text-center">
              <p className="text-gray-600">{currentLanguage === 'sw' ? 'Inapakia...' : 'Loading...'}</p>
            </div>
          ) : (
            <div className="space-y-2">
              {stocks.slice(0, 5).map((stock, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + idx * 0.05 }}
                  onClick={() => onNavigate('trade')}
                  className="bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gray-900">{stock.symbol}</p>
                      <p className="text-sm text-gray-500">{stock.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{formatCurrencyFull(stock.price)}</p>
                      <div className="flex items-center justify-end gap-1">
                        {stock.changePercent >= 0 ? (
                          <>
                            <TrendingUp className="w-4 h-4 text-[#34C759]" />
                            <span className="text-sm text-[#34C759] font-semibold">+{stock.changePercent.toFixed(2)}%</span>
                          </>
                        ) : (
                          <>
                            <TrendingDown className="w-4 h-4 text-[#FF3B30]" />
                            <span className="text-sm text-[#FF3B30] font-semibold">{stock.changePercent.toFixed(2)}%</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Recent Badges */}
        {badges?.earnedBadges?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {currentLanguage === 'sw' ? 'Mafanikio' : 'Achievements'}
            </h2>
            
            <div className="flex gap-3 overflow-x-auto pb-2">
              {badges.earnedBadges.slice(0, 3).map((badge: any, idx: number) => (
                <motion.div
                  key={idx}
                  className="flex-shrink-0 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 min-w-[140px] text-center border border-orange-100"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + idx * 0.1, type: "spring" }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <p className="font-semibold text-sm text-gray-900">
                    {currentLanguage === 'sw' ? badge.name : badge.nameEn}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Tab Bar - Apple Style */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-200 z-50">
        <div className="max-w-2xl mx-auto px-6 py-2">
          <div className="flex items-center justify-around">
            {[
              { id: 'dashboard', icon: '📊', label: currentLanguage === 'sw' ? 'Nyumbani' : 'Summary' },
              { id: 'trade', icon: '💹', label: currentLanguage === 'sw' ? 'Biashara' : 'Trade' },
              { id: 'tutor', icon: '🎓', label: currentLanguage === 'sw' ? 'Jifunze' : 'Learn' },
              { id: 'badges', icon: '🏆', label: currentLanguage === 'sw' ? 'Medali' : 'Awards' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="flex flex-col items-center py-2 px-4 min-w-[70px] transition-colors"
              >
                <span className="text-2xl mb-1">{item.icon}</span>
                <span className={`text-xs font-medium ${item.id === 'dashboard' ? 'text-[#007AFF]' : 'text-gray-600'}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}