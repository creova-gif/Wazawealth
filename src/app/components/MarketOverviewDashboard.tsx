import { useState } from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp, TrendingDown, Minus, Building2, Phone, ShoppingBag,
  Factory, Zap, Home, ChevronRight, Sparkles, Info
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface Props {
  language: 'sw' | 'en';
  onNavigate: (screen: string, data?: any) => void;
}

export function MarketOverviewDashboard({ language, onNavigate }: Props) {
  const [selectedPeriod, setSelectedPeriod] = useState<'1D' | '1W' | '1M'>('1D');

  const microcopy = {
    en: {
      title: 'Markets',
      regionalSnapshot: 'Regional Snapshot',
      indices: 'Indices',
      topMovers: 'Top Movers',
      sectorPerformance: 'Sector Performance',
      todaysSummary: "Today's Summary",
      aiInsight: 'AI Insight',
      viewAll: 'View All',
      // Indices
      dsei: 'DSEI',
      nse20: 'NSE 20',
      eac20: 'EAC 20',
      // Stats
      change: 'Change',
      volume: 'Volume',
      trades: 'Trades',
      // Sectors
      financials: 'Financials',
      telecommunications: 'Telecommunications',
      consumerGoods: 'Consumer Goods',
      manufacturing: 'Manufacturing',
      energy: 'Energy',
      realEstate: 'Real Estate',
      // Summary
      marketOpen: 'Markets are open',
      marketClosed: 'Markets are closed',
      nextOpen: 'Next open',
      // AI
      regionalSummary: 'East African markets showed mixed performance today. Banking sector leads gains.',
      investorTip: 'Good time to review your diversification across the region'
    },
    sw: {
      title: 'Masoko',
      regionalSnapshot: 'Muhtasari wa Mkoa',
      indices: 'Viashiria',
      topMovers: 'Zinazoongoza',
      sectorPerformance: 'Utendaji wa Sekta',
      todaysSummary: 'Muhtasari wa Leo',
      aiInsight: 'Uchambuzi wa AI',
      viewAll: 'Angalia Zote',
      // Indices
      dsei: 'DSEI',
      nse20: 'NSE 20',
      eac20: 'EAC 20',
      // Stats
      change: 'Mabadiliko',
      volume: 'Kiasi',
      trades: 'Biashara',
      // Sectors
      financials: 'Fedha',
      telecommunications: 'Mawasiliano',
      consumerGoods: 'Bidhaa za Matumizi',
      manufacturing: 'Utengenezaji',
      energy: 'Nishati',
      realEstate: 'Mali Isiyohamishika',
      // Summary
      marketOpen: 'Masoko yamefunguka',
      marketClosed: 'Masoko yamefungwa',
      nextOpen: 'Kufungua kufuatayo',
      // AI
      regionalSummary: 'Masoko ya Afrika Mashariki yameonyesha utendaji mchanganyiko leo. Sekta ya benki inaongoza faida.',
      investorTip: 'Wakati mzuri wa kukagua utawanyiko wako kote mkoa'
    }
  };

  const t = microcopy[language];

  // Sample index data
  const indices = [
    {
      name: 'DSEI',
      fullName: 'Dar es Salaam Stock Exchange Index',
      value: 2145.67,
      change: 12.34,
      changePercent: 0.58,
      country: 'Tanzania',
      flag: '🇹🇿'
    },
    {
      name: 'NSE 20',
      fullName: 'NSE 20 Share Index',
      value: 1876.23,
      change: -8.45,
      changePercent: -0.45,
      country: 'Kenya',
      flag: '🇰🇪'
    },
    {
      name: 'EAC 20',
      fullName: 'East African Combined Benchmark',
      value: 2012.45,
      change: 5.67,
      changePercent: 0.28,
      country: 'Regional',
      flag: '🌍'
    }
  ];

  // Sample sector data
  const sectors = [
    { name: t.financials, change: 2.3, icon: Building2, color: 'blue' },
    { name: t.telecommunications, change: 1.8, icon: Phone, color: 'purple' },
    { name: t.consumerGoods, change: -0.5, icon: ShoppingBag, color: 'orange' },
    { name: t.manufacturing, change: 0.8, icon: Factory, color: 'gray' },
    { name: t.energy, change: -1.2, icon: Zap, color: 'yellow' },
    { name: t.realEstate, change: 0.3, icon: Home, color: 'green' }
  ];

  // Sample top movers
  const topMovers = [
    { symbol: 'CRDB', name: 'CRDB Bank', change: 3.2, price: 450, exchange: '🇹🇿' },
    { symbol: 'SAFARICOM', name: 'Safaricom PLC', change: 2.8, price: 31.2, exchange: '🇰🇪' },
    { symbol: 'EQUITY', name: 'Equity Bank', change: -1.5, price: 45.5, exchange: '🇰🇪' }
  ];

  const isMarketOpen = () => {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();
    // Simplified: 9am-3pm, Mon-Fri
    return day >= 1 && day <= 5 && hour >= 9 && hour < 15;
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-zinc-100 z-10 px-6 py-4">
        <h1 className="text-xl font-light">{t.title}</h1>
      </div>

      <div className="px-6 pt-6 space-y-6">
        {/* Market Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className={`p-6 ${
            isMarketOpen() 
              ? 'bg-green-50 border-green-100' 
              : 'bg-zinc-50 border-zinc-200'
          }`}>
            <div className="flex items-center gap-3">
              <motion.div
                className={`w-3 h-3 rounded-full ${
                  isMarketOpen() ? 'bg-green-500' : 'bg-zinc-400'
                }`}
                animate={isMarketOpen() ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div>
                <p className="text-base font-medium">
                  {isMarketOpen() ? t.marketOpen : t.marketClosed}
                </p>
                {!isMarketOpen() && (
                  <p className="text-sm text-zinc-600">
                    {t.nextOpen}: {language === 'en' ? 'Monday 9:00 AM' : 'Jumatatu 9:00 AM'}
                  </p>
                )}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Indices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">{t.indices}</h2>
            <div className="flex gap-1 bg-zinc-100 p-1 rounded-lg">
              {(['1D', '1W', '1M'] as const).map(period => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-3 py-1 rounded text-sm transition-all ${
                    selectedPeriod === period
                      ? 'bg-white text-black shadow-sm'
                      : 'text-zinc-600 hover:text-black'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {indices.map((index, idx) => (
              <motion.div
                key={index.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
              >
                <Card className="p-5 border-zinc-200 hover:border-zinc-400 cursor-pointer transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{index.flag}</span>
                        <p className="text-lg font-medium">{index.name}</p>
                      </div>
                      <p className="text-sm text-zinc-600">{index.fullName}</p>
                    </div>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-light">{index.value.toFixed(2)}</p>
                      <div className={`flex items-center gap-1 mt-1 ${
                        index.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {index.change >= 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span className="text-sm font-medium">
                          {index.change >= 0 ? '+' : ''}{index.change} ({index.changePercent >= 0 ? '+' : ''}{index.changePercent}%)
                        </span>
                      </div>
                    </div>

                    {/* Mini sparkline placeholder */}
                    <div className="w-24 h-12 flex items-end gap-1">
                      {[45, 52, 48, 55, 58, 54, 60].map((height, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-t ${
                            index.change >= 0 ? 'bg-green-200' : 'bg-red-200'
                          }`}
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sector Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">{t.sectorPerformance}</h2>
            <Button
              variant="ghost"
              onClick={() => onNavigate('sectors')}
              className="text-sm"
            >
              {t.viewAll}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {sectors.map((sector, idx) => {
              const Icon = sector.icon;
              return (
                <motion.div
                  key={sector.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + idx * 0.05 }}
                >
                  <Card className="p-4 border-zinc-200 hover:border-zinc-400 cursor-pointer transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-zinc-700" />
                      </div>
                      <div className={`text-sm font-medium ${
                        sector.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {sector.change >= 0 ? '+' : ''}{sector.change}%
                      </div>
                    </div>
                    <p className="text-sm font-medium leading-tight">{sector.name}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Top Movers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">{t.topMovers}</h2>
            <Button
              variant="ghost"
              onClick={() => onNavigate('discover')}
              className="text-sm"
            >
              {t.viewAll}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="space-y-3">
            {topMovers.map((stock, idx) => (
              <motion.div
                key={stock.symbol}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + idx * 0.1 }}
              >
                <Card className="p-4 border-zinc-200 hover:border-zinc-400 cursor-pointer transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{stock.exchange}</span>
                      <div>
                        <p className="text-base font-medium">{stock.symbol}</p>
                        <p className="text-sm text-zinc-600">{stock.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-medium">TZS {stock.price}</p>
                      <div className={`flex items-center gap-1 justify-end text-sm ${
                        stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stock.change >= 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span>{stock.change >= 0 ? '+' : ''}{stock.change}%</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Market Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-lg font-medium mb-4">{t.aiInsight}</h2>
          <Card className="p-6 bg-blue-50 border-blue-100">
            <div className="flex items-start gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900 mb-1">
                  {t.todaysSummary}
                </p>
                <p className="text-sm text-blue-800 leading-relaxed mb-3">
                  {t.regionalSummary}
                </p>
                <p className="text-sm text-blue-700 font-medium">
                  💡 {t.investorTip}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Regulatory Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="p-5 border-zinc-200 bg-zinc-50">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-zinc-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-zinc-700 leading-relaxed">
                  {language === 'en'
                    ? 'Markets regulated by CMSA (Tanzania) and CMA (Kenya). Data delayed by 15 minutes for free tier.'
                    : 'Masoko yanadhibitiwa na CMSA (Tanzania) na CMA (Kenya). Data imechelewa dakika 15 kwa kiwango cha bure.'
                  }
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
