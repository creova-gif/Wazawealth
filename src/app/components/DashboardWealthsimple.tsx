import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ChevronRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface DashboardProps {
  language: 'sw' | 'en';
  accessToken: string;
  onNavigate: (screen: string) => void;
}

export function Dashboard({ language, accessToken, onNavigate }: DashboardProps) {
  const [portfolio, setPortfolio] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const t = language === 'sw' ? {
    portfolio: 'Mkoba Wako',
    invested: 'Umewekeza',
    change: 'Mabadiliko',
    today: 'Leo',
    aiTitle: 'Ushauri wa Leo',
    viewPortfolio: 'Angalia Mkoba',
    startInvesting: 'Anza Kuwekeza',
    educational: 'Kwa Kujifunza Tu',
    virtualMoney: 'Pesa ya mazoezi'
  } : {
    portfolio: 'Your Portfolio',
    invested: 'Invested',
    change: 'Change',
    today: 'Today',
    aiTitle: "Today's insight",
    viewPortfolio: 'View portfolio',
    startInvesting: 'Start investing',
    educational: 'Educational Only',
    virtualMoney: 'Virtual money'
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
      console.error('Error loading dashboard data:', err);
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
  const totalChange = totalValue - 10000000;
  const isPositive = totalChange >= 0;

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header - Minimal */}
      <div className="bg-white px-6 pt-8 pb-4">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">
            {t.today}
          </p>
          <h1 className="text-2xl font-bold text-black">{t.portfolio}</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 space-y-8">
        {/* Dominant Portfolio Value - Wealthsimple Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="py-12 text-center"
        >
          {/* Large total value */}
          <div className="mb-8">
            <h2 className="text-7xl font-bold text-black tracking-tight mb-6">
              {formatCurrency(totalValue)}
            </h2>
            
            {/* Change indicator - subtle */}
            <div className="flex items-center justify-center gap-3">
              <div className={`text-lg font-medium ${isPositive ? 'text-black' : 'text-gray-600'}`}>
                {isPositive ? '+' : ''}{formatCurrency(totalChange)}
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="text-sm text-gray-500 uppercase tracking-wide">
                {t.change}
              </div>
            </div>
          </div>

          {/* Simple breakdown - two numbers only */}
          <div className="max-w-xs mx-auto space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-sm text-gray-500">{t.invested}</span>
              <span className="text-base font-semibold text-black">{formatCurrency(invested)}</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-gray-500">{t.virtualMoney}</span>
              <span className="text-base font-semibold text-black">{formatCurrency(balance)}</span>
            </div>
          </div>
        </motion.div>

        {/* Single AI Insight Card - Prominent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-gray-50 rounded-3xl p-8 shadow-sm border border-gray-100"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-black text-lg mb-2">{t.aiTitle}</h3>
              <p className="text-gray-600 leading-relaxed">
                {language === 'sw' 
                  ? "Unafanya vizuri! Jifunze zaidi kuhusu uwekezaji wa muda mrefu ili kuongeza mali yako kwa usalama."
                  : "You're doing great! Learn more about long-term investing to grow your wealth safely."}
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('tutor')}
            className="w-full mt-4 bg-white text-black py-4 px-6 rounded-2xl font-semibold hover:bg-gray-100 transition-colors text-left flex items-center justify-between group border border-gray-200"
          >
            <span>{language === 'sw' ? 'Jifunze Zaidi' : 'Learn more'}</span>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
          </button>
        </motion.div>

        {/* Single Primary Action - Clear CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="pt-4"
        >
          {portfolio?.positions?.length > 0 ? (
            <button
              onClick={() => onNavigate('portfolio')}
              className="w-full bg-black text-white py-6 px-6 rounded-full font-semibold hover:bg-gray-900 transition-colors text-center flex items-center justify-center gap-2"
            >
              {t.viewPortfolio}
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => onNavigate('invest')}
              className="w-full bg-black text-white py-6 px-6 rounded-full font-semibold hover:bg-gray-900 transition-colors text-center"
            >
              {t.startInvesting}
            </button>
          )}
          
          <p className="text-xs text-center text-gray-400 mt-4">
            {t.educational}
          </p>
        </motion.div>

        {/* Minimal positions preview - if exists */}
        {portfolio?.positions?.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="pt-8"
          >
            <h3 className="text-sm text-gray-500 uppercase tracking-wider font-medium mb-4">
              {language === 'sw' ? 'Hisa Zangu' : 'My investments'}
            </h3>
            
            <div className="space-y-2">
              {portfolio.positions.slice(0, 3).map((position: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-4 px-5 bg-gray-50 rounded-2xl border border-gray-100"
                >
                  <div>
                    <p className="font-semibold text-black">{position.symbol}</p>
                    <p className="text-xs text-gray-500">{position.shares} shares</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-black">{formatCurrency(position.currentValue)}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Navigation - Minimal */}
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