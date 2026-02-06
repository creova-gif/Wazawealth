import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, Info } from "lucide-react";
import { motion } from "motion/react";

interface PortfolioScreenProps {
  language: 'sw' | 'en';
  accessToken: string;
  onNavigate: (screen: string) => void;
}

export function PortfolioScreen({ language, accessToken, onNavigate }: PortfolioScreenProps) {
  const [portfolio, setPortfolio] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const t = language === 'sw' ? {
    title: 'Mkoba Wako',
    back: 'Rudi',
    totalValue: 'Jumla',
    invested: 'Umewekeza',
    available: 'Inapatikana',
    positions: 'Uwekezaji Wako',
    shares: 'hisa',
    boughtAt: 'Ulinunua kwa',
    currentValue: 'Bei ya Sasa',
    performance: 'Jinsi Inavyofanya',
    noPositions: 'Bado huna uwekezaji',
    startInvesting: 'Anza Kuwekeza',
    educational: 'Kwa kujifunza tu - pesa ya mazoezi',
    whatThis: 'Hii ni nini?',
    explanation: 'Hizi ni hisa ulizozinunua kwa pesa ya mazoezi. Bei hubadilika kufuatana na soko la DSE.'
  } : {
    title: 'Your Portfolio',
    back: 'Back',
    totalValue: 'Total Value',
    invested: 'Invested',
    available: 'Available',
    positions: 'Your Investments',
    shares: 'shares',
    boughtAt: 'Bought at',
    currentValue: 'Current Value',
    performance: 'How it is doing',
    noPositions: 'No investments yet',
    startInvesting: 'Start Investing',
    educational: 'Educational only - virtual money',
    whatThis: 'What is this?',
    explanation: 'These are stocks you bought with virtual money. Prices move with the real DSE market.'
  };

  useEffect(() => {
    loadData();
  }, []);

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
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return `TZS ${amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  };

  if (loading) {
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
  const balance = portfolio?.balance || 10000000;
  const invested = totalValue - balance;

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <button
            onClick={() => onNavigate('dashboard')}
            className="p-2 hover:bg-gray-50 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-black" />
          </button>
          <h1 className="text-2xl font-bold text-black">{t.title}</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-8">
        {/* Summary Card - Simple */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          {/* Hero Value Card */}
          <div className="bg-white border border-zinc-200 rounded-3xl p-8 mb-4">
            {/* Micro Label */}
            <p className="text-xs text-zinc-400 uppercase tracking-[0.1em] font-medium mb-3">
              {t.totalValue}
            </p>
            
            {/* Hero Number with Growth */}
            <div className="flex items-end justify-between mb-6">
              <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-7xl font-light tracking-tight leading-none text-black"
              >
                {formatCurrency(totalValue).split(' ')[1]?.charAt(0) === '0' 
                  ? formatCurrency(totalValue)
                  : `${(totalValue / 1000000).toFixed(2)}M`
                }
              </motion.h2>
              
              {/* Growth Indicator */}
              {totalValue > invested && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="flex flex-col items-end pb-2"
                >
                  <div className="flex items-center gap-1.5 text-green-600">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 4L10 16M10 4L6 8M10 4L14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-2xl font-light tracking-tight tabular-nums">
                      +{(((totalValue - invested) / invested) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <span className="text-xs text-zinc-500 mt-0.5">
                    {language === 'sw' ? 'faida' : 'gain'}
                  </span>
                </motion.div>
              )}
            </div>

            {/* Status Indicator */}
            <div className="flex items-center gap-2 text-sm text-zinc-600 mb-6">
              <motion.span
                className="w-2 h-2 rounded-full bg-green-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span>{language === 'sw' ? 'Unafanya vizuri' : 'On track'}</span>
            </div>

            {/* Interactive Allocation Bar */}
            {portfolio?.positions?.length > 0 && (
              <div className="space-y-3 mb-6 pb-6 border-b border-zinc-100">
                <p className="text-xs text-zinc-400 uppercase tracking-[0.1em]">
                  {language === 'sw' ? 'Mgawanyo' : 'Allocation'}
                </p>
                
                {/* Enhanced Segmented Bar */}
                <div className="relative group">
                  <div className="w-full h-3 bg-zinc-100 rounded-full overflow-hidden flex gap-[2px]">
                    {portfolio.positions.map((pos: any, idx: number) => {
                      const percentage = (pos.currentValue / totalValue) * 100;
                      const colors = [
                        'bg-black',
                        'bg-zinc-700',
                        'bg-zinc-500',
                        'bg-zinc-400',
                        'bg-zinc-300'
                      ];
                      return (
                        <motion.div
                          key={idx}
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8, delay: 0.5 + (idx * 0.1), ease: "easeOut" }}
                          style={{ width: `${percentage}%` }}
                          className={`h-full ${colors[idx % colors.length]} transition-all duration-200 hover:opacity-80 cursor-pointer first:rounded-l-full last:rounded-r-full`}
                          title={`${pos.symbol}: ${percentage.toFixed(1)}%`}
                        />
                      );
                    })}
                  </div>
                  
                  {/* Hover tooltip hint */}
                  <p className="text-xs text-zinc-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {language === 'sw' ? 'Gusa kuona maelezo' : 'Hover to see details'}
                  </p>
                </div>

                {/* Top Holdings Preview */}
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {portfolio.positions.slice(0, 2).map((pos: any, idx: number) => {
                    const percentage = (pos.currentValue / totalValue) * 100;
                    return (
                      <div key={idx} className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          idx === 0 ? 'bg-black' : 'bg-zinc-700'
                        }`} />
                        <span className="text-xs text-zinc-600">
                          {pos.symbol} · {percentage.toFixed(0)}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Financial Breakdown */}
            <div className="space-y-4">
              <div className="flex items-center justify-between group">
                <span className="text-sm text-zinc-500">{t.invested}</span>
                <span className="text-xl font-light text-black group-hover:text-zinc-600 transition-colors">
                  {formatCurrency(invested)}
                </span>
              </div>
              
              <div className="flex items-center justify-between group">
                <span className="text-sm text-zinc-500">{t.available}</span>
                <span className="text-xl font-light text-black group-hover:text-zinc-600 transition-colors">
                  {formatCurrency(balance)}
                </span>
              </div>
              
              {/* Total Gain/Loss */}
              {totalValue !== invested && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="pt-4 border-t border-zinc-100"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-500">
                      {language === 'sw' ? 'Jumla ya faida' : 'Total gain'}
                    </span>
                    <span className={`text-xl font-medium ${
                      totalValue > invested ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {totalValue > invested ? '+' : ''}{formatCurrency(totalValue - invested)}
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Quick Insight Card */}
          {totalValue > invested && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="bg-green-50 border border-green-100 rounded-2xl p-4 flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 12V8M8 4H8.01M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8Z" fill="currentColor" className="text-green-600"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-green-900 leading-relaxed">
                  {language === 'sw' 
                    ? `Mkoba wako umeongezeka ${(((totalValue - invested) / invested) * 100).toFixed(0)}% tangu ulipoanza. Endelea hivyo!`
                    : `Your portfolio has grown ${(((totalValue - invested) / invested) * 100).toFixed(0)}% since you started. Keep it up!`
                  }
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Educational Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="bg-white rounded-2xl p-5 border border-gray-200"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Info className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <h3 className="font-semibold text-black text-sm mb-1">{t.whatThis}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {t.explanation}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Positions - Card Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h3 className="text-sm text-gray-500 uppercase tracking-wider font-medium mb-4">
            {t.positions}
          </h3>

          {portfolio?.positions?.length > 0 ? (
            <div className="space-y-4">
              {portfolio.positions.map((position: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.05, duration: 0.5 }}
                  className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-gray-200 transition-colors"
                >
                  {/* Stock header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-black mb-1">{position.symbol}</h4>
                      <p className="text-sm text-gray-500">
                        {position.shares} {t.shares}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-black">
                        {formatCurrency(position.currentValue)}
                      </p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="pt-4 border-t border-gray-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 uppercase tracking-wider">
                        {t.boughtAt}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatCurrency(position.purchasePrice)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 uppercase tracking-wider">
                        {t.performance}
                      </span>
                      <div className="text-right">
                        <span className={`text-sm font-semibold ${
                          position.profitLoss >= 0 ? 'text-black' : 'text-gray-600'
                        }`}>
                          {position.profitLoss >= 0 ? '+' : ''}{formatCurrency(position.profitLoss)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Educational explanation */}
                  <div className="mt-4 pt-4 border-t border-gray-50">
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {position.profitLoss >= 0 
                        ? (language === 'sw' 
                          ? `Hongera! Hisa hii imeongezeka. Hii ni utendaji mzuri wa muda mfupi.`
                          : `Nice! This stock is up. This is good short-term performance.`)
                        : (language === 'sw'
                          ? `Bei imeteremka kidogo. Hii ni kawaida - thamani ya muda mrefu ndio muhimu.`
                          : `The price dropped a bit. This is normal - long-term value matters most.`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-3xl p-12 text-center border border-gray-100">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              </div>
              <h3 className="font-bold text-black text-lg mb-2">{t.noPositions}</h3>
              <p className="text-sm text-gray-500 mb-6">
                {language === 'sw' 
                  ? 'Anza safari yako ya kujifunza uwekezaji'
                  : 'Start your investing learning journey'}
              </p>
              <button
                onClick={() => onNavigate('trade')}
                className="bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-900 transition-colors"
              >
                {t.startInvesting}
              </button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-100 z-50">
        <div className="max-w-2xl mx-auto px-6 py-3">
          <div className="flex items-center justify-around">
            {[
              { id: 'dashboard', label: language === 'sw' ? 'Nyumbani' : 'Home' },
              { id: 'portfolio', label: language === 'sw' ? 'Mkoba' : 'Portfolio' },
              { id: 'tutor', label: language === 'sw' ? 'Jifunze' : 'Learn' },
              { id: 'invest', label: language === 'sw' ? 'Wekeza' : 'Invest' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center py-3 px-4 min-w-[70px] transition-colors ${
                  item.id === 'portfolio' ? 'text-black' : 'text-gray-400'
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full mb-2 ${
                  item.id === 'portfolio' ? 'bg-black' : 'bg-transparent'
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