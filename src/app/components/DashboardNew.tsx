import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Trophy, Sparkles, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Globe } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BottomNav } from "./BottomNav";

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
    title: 'Habari',
    greeting: 'Karibu tena',
    balance: 'Salio • Balance',
    portfolio: 'Mkoba • Portfolio',
    total: 'Jumla • Total',
    positions: 'Hisa Zangu • My Stocks',
    topStocks: 'Hisa Bora DSE • Top DSE Stocks',
    aiSuggestions: 'Mapendekezo ya AI • AI Suggestions',
    educational: '📚 Maelezo tu • Educational Only',
    viewAll: 'Angalia Zote',
    noPositions: 'Huna hisa bado. Anza biashara!',
    change: 'Mabadiliko',
    startTrading: 'Anza Biashara'
  } : {
    title: 'Hello',
    greeting: 'Welcome back',
    balance: 'Balance • Salio',
    portfolio: 'Portfolio • Mkoba',
    total: 'Total • Jumla',
    positions: 'My Stocks • Hisa Zangu',
    topStocks: 'Top DSE Stocks • Hisa Bora DSE',
    aiSuggestions: 'AI Suggestions • Mapendekezo ya AI',
    educational: '📚 Educational Only • Maelezo tu',
    viewAll: 'View All',
    noPositions: 'No positions yet. Start trading!',
    change: 'Change',
    startTrading: 'Start Trading'
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const { projectId } = await import('@/utils/supabase/info');
      const apiUrl = `https://${projectId}.supabase.co/functions/v1/make-server-f0a5cca3`;

      console.log('Dashboard: Loading data...', { accessToken: accessToken ? 'present' : 'missing' });

      const [portfolioRes, stocksRes, badgesRes] = await Promise.all([
        fetch(`${apiUrl}/portfolio`, { headers: { 'Authorization': `Bearer ${accessToken}` } }),
        fetch(`${apiUrl}/stocks`, { headers: { 'Authorization': `Bearer ${accessToken}` } }),
        fetch(`${apiUrl}/badges`, { headers: { 'Authorization': `Bearer ${accessToken}` } })
      ]);

      console.log('Dashboard: Response status', { 
        portfolio: portfolioRes.status, 
        stocks: stocksRes.status, 
        badges: badgesRes.status 
      });

      const portfolioData = await portfolioRes.json();
      const stocksData = await stocksRes.json();
      const badgesData = await badgesRes.json();

      console.log('Dashboard: Data loaded', { portfolioData, stocksData, badgesData });

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
    return `TZS ${amount.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div 
            className="w-16 h-16 border-4 border-[#00A86B] border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-gray-600 font-medium">{currentLanguage === 'sw' ? 'Inapakia...' : 'Loading...'}</p>
        </motion.div>
      </div>
    );
  }

  const totalChange = portfolio?.totalValue - 10000000;
  const totalChangePercent = (totalChange / 10000000) * 100;

  return (
    <div className="min-h-screen bg-[#F8F8F8] pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#1E1E1E]">{t.greeting} 👋</h1>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentLanguage(currentLanguage === 'sw' ? 'en' : 'sw')}
              className="flex items-center gap-2 px-4 py-2 bg-[#F8F8F8] rounded-full hover:bg-gray-200 transition-colors"
            >
              <Globe className="w-4 h-4 text-[#00A86B]" />
              <span className="text-sm font-semibold text-[#1E1E1E]">
                {currentLanguage === 'sw' ? '🇹🇿 SW' : '🌍 EN'}
              </span>
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Portfolio Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 bg-gradient-to-br from-[#00A86B] to-[#00C77F] text-white shadow-xl rounded-3xl border-0 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
            
            <div className="relative z-10">
              <p className="text-white/80 text-sm font-medium mb-1">{t.total}</p>
              <motion.h2 
                className="text-4xl font-bold mb-4"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {formatCurrency(portfolio?.totalValue || 0)}
              </motion.h2>
              
              <div className="flex items-center gap-2 mb-6">
                {totalChange >= 0 ? (
                  <>
                    <ArrowUpRight className="w-5 h-5" />
                    <span className="text-lg font-semibold">+{formatCurrency(totalChange)}</span>
                    <span className="text-sm">({totalChangePercent.toFixed(2)}%)</span>
                  </>
                ) : (
                  <>
                    <ArrowDownRight className="w-5 h-5" />
                    <span className="text-lg font-semibold">{formatCurrency(totalChange)}</span>
                    <span className="text-sm">({totalChangePercent.toFixed(2)}%)</span>
                  </>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                <div>
                  <p className="text-white/70 text-xs mb-1">{t.balance}</p>
                  <p className="text-lg font-bold">{formatCurrency(portfolio?.balance || 0)}</p>
                </div>
                <div>
                  <p className="text-white/70 text-xs mb-1">{t.portfolio}</p>
                  <p className="text-lg font-bold">{formatCurrency(portfolio?.portfolioValue || 0)}</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* AI Suggestions Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 bg-gradient-to-br from-[#FFA500] to-[#FF8C00] text-white shadow-lg rounded-3xl border-0">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">{t.aiSuggestions}</h3>
                <p className="text-xs text-white/80">{t.educational}</p>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
              <p className="text-sm leading-relaxed">
                {currentLanguage === 'sw' 
                  ? "💡 Ona: NMB Bank imeongezeka 5% wiki hii. Fikiria kuongeza uwekezaji kwa mkoba wako wa muda mrefu."
                  : "💡 Insight: NMB Bank is up 5% this week. Consider increasing allocation for long-term growth portfolio."}
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('tutor')}
              className="mt-4 w-full bg-white text-[#FFA500] py-3 rounded-xl font-bold hover:bg-white/95 transition-colors"
            >
              {currentLanguage === 'sw' ? 'Uliza AI Zaidi' : 'Ask AI More'}
            </motion.button>
          </Card>
        </motion.div>

        {/* My Positions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#1E1E1E]">{t.positions}</h2>
            {portfolio?.positions?.length > 0 && (
              <Button variant="ghost" size="sm" onClick={() => onNavigate('portfolio')} className="text-[#00A86B] font-semibold">
                {t.viewAll}
              </Button>
            )}
          </div>

          {portfolio?.positions?.length > 0 ? (
            <div className="space-y-3">
              <AnimatePresence>
                {portfolio.positions.slice(0, 3).map((position: any, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                  >
                    <Card className="p-4 hover:shadow-lg transition-all rounded-2xl bg-white border-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#00A86B]/20 to-[#00C77F]/20 rounded-xl flex items-center justify-center">
                            <span className="font-bold text-[#00A86B]">{position.symbol.substring(0, 2)}</span>
                          </div>
                          <div>
                            <p className="font-bold text-[#1E1E1E]">{position.symbol}</p>
                            <p className="text-sm text-gray-600">{position.shares} shares</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-[#1E1E1E]">{formatCurrency(position.currentValue)}</p>
                          <div className="flex items-center justify-end gap-1">
                            {position.profitLoss >= 0 ? (
                              <>
                                <TrendingUp className="w-4 h-4 text-[#00A86B]" />
                                <span className="text-sm text-[#00A86B] font-semibold">+{position.profitLossPercent.toFixed(2)}%</span>
                              </>
                            ) : (
                              <>
                                <TrendingDown className="w-4 h-4 text-red-600" />
                                <span className="text-sm text-red-600 font-semibold">{position.profitLossPercent.toFixed(2)}%</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <Card className="p-8 text-center bg-white rounded-3xl border-0">
              <div className="w-20 h-20 bg-[#F8F8F8] rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-600 mb-4">{t.noPositions}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('trade')}
                className="bg-gradient-to-r from-[#00A86B] to-[#00C77F] text-white px-8 py-3 rounded-xl font-bold shadow-lg"
              >
                {t.startTrading}
              </motion.button>
            </Card>
          )}
        </motion.div>

        {/* Top DSE Stocks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-xl font-bold text-[#1E1E1E] mb-4">{t.topStocks}</h2>
          
          {stocks.length === 0 ? (
            <Card className="p-8 text-center bg-white rounded-3xl border-0">
              <p className="text-gray-600">
                {currentLanguage === 'sw' ? 'Hisa zinapakia...' : 'Loading stocks...'}
              </p>
            </Card>
          ) : (
            <div className="space-y-2">
              {stocks.slice(0, 5).map((stock, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + idx * 0.05 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Card 
                    className="p-4 cursor-pointer hover:shadow-md transition-all rounded-2xl bg-white border-0"
                    onClick={() => onNavigate(`stock-${stock.symbol}`)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-bold text-[#1E1E1E]">{stock.symbol}</p>
                        <p className="text-sm text-gray-600">{stock.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#1E1E1E]">{formatCurrency(stock.price)}</p>
                        <div className="flex items-center justify-end gap-1">
                          {stock.changePercent >= 0 ? (
                            <>
                              <TrendingUp className="w-4 h-4 text-[#00A86B]" />
                              <span className="text-sm text-[#00A86B] font-semibold">+{stock.changePercent.toFixed(2)}%</span>
                            </>
                          ) : (
                            <>
                              <TrendingDown className="w-4 h-4 text-red-600" />
                              <span className="text-sm text-red-600 font-semibold">{stock.changePercent.toFixed(2)}%</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
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
            <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl border-0">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-6 h-6 text-[#FFA500]" />
                <h3 className="font-bold text-[#1E1E1E] text-lg">
                  {currentLanguage === 'sw' ? 'Medali Mpya' : 'Recent Badges'}
                </h3>
              </div>
              
              <div className="flex gap-3 overflow-x-auto pb-2">
                {badges.earnedBadges.slice(0, 3).map((badge: any, idx: number) => (
                  <motion.div
                    key={idx}
                    className="flex-shrink-0 text-center p-4 bg-white rounded-2xl shadow-sm min-w-[120px]"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + idx * 0.1, type: "spring" }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-[#FFA500] to-[#FF8C00] rounded-full flex items-center justify-center mx-auto mb-2">
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <p className="font-semibold text-sm text-[#1E1E1E]">
                      {currentLanguage === 'sw' ? badge.name : badge.nameEn}
                    </p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav 
        language={currentLanguage} 
        activeScreen="dashboard" 
        onNavigate={onNavigate}
      />
    </div>
  );
}