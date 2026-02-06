import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, TrendingUp, TrendingDown, Plus, Sparkles, Info,
  Calendar, DollarSign, BarChart3, Building2, Shield, Eye
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface Props {
  language: 'sw' | 'en';
  stock: {
    symbol: string;
    name: string;
    exchange: 'DSE' | 'NSE' | 'USE' | 'RSE';
    country: string;
    currentPrice: number;
    change: number;
    changePercent: number;
    sector: string;
    marketCap: number;
    volume: number;
    dividendYield?: number;
  };
  onBack: () => void;
  onBuy: () => void;
  onSell: () => void;
  userGoals?: string[];
}

export function EnhancedStockDetailScreen({
  language,
  stock,
  onBack,
  onBuy,
  onSell,
  userGoals = []
}: Props) {
  const [selectedPeriod, setSelectedPeriod] = useState<'1W' | '1M' | '3M' | '6M' | '1Y'>('1M');
  const [selectedTab, setSelectedTab] = useState<'overview' | 'dividends' | 'info'>('overview');

  const microcopy = {
    en: {
      // Header
      buy: 'Buy',
      sell: 'Sell',
      addToSimulation: 'Add to Simulation',
      // Tabs
      overview: 'Overview',
      dividends: 'Dividends',
      info: 'Company Info',
      // Stats
      open: 'Open',
      high: 'High',
      low: 'Low',
      volume: 'Volume',
      marketCap: 'Market Cap',
      peRatio: 'P/E Ratio',
      dividendYield: 'Dividend Yield',
      // AI
      aiInsight: 'AI Insight',
      whyThisMatters: 'Why this stock matters',
      stableGrowth: 'Stable long-term performer with consistent dividend history. Good fit for retirement and income goals.',
      riskLevel: 'Risk Level',
      moderate: 'Moderate',
      // Dividends
      dividendHistory: 'Dividend History',
      paymentDate: 'Payment Date',
      amount: 'Amount',
      exDate: 'Ex-Dividend Date',
      nextDividend: 'Next Expected Dividend',
      estimated: 'Estimated',
      // Company
      about: 'About',
      sector: 'Sector',
      founded: 'Founded',
      employees: 'Employees',
      // Regulatory
      regulatory: 'Regulatory Information',
      regulatedBy: 'Regulated by',
      cmsa: 'Capital Markets and Securities Authority (CMSA)',
      cma: 'Capital Markets Authority (CMA)',
      riskWarning: 'Investment involves risk. Past performance does not guarantee future results.',
      settlementNote: 'Settlement: T+3 (3 business days)',
      // Chart
      price: 'Price',
      change: 'Change',
      // Goals
      matchesGoal: 'Matches your',
      retirement: 'Retirement',
      growth: 'Growth',
      income: 'Income'
    },
    sw: {
      // Header
      buy: 'Nunua',
      sell: 'Uza',
      addToSimulation: 'Ongeza kwenye Majaribio',
      // Tabs
      overview: 'Muhtasari',
      dividends: 'Magawio',
      info: 'Taarifa',
      // Stats
      open: 'Fungua',
      high: 'Juu',
      low: 'Chini',
      volume: 'Kiasi',
      marketCap: 'Thamani ya Soko',
      peRatio: 'Uwiano wa P/E',
      dividendYield: 'Mapato ya Gawio',
      // AI
      aiInsight: 'Uchambuzi wa AI',
      whyThisMatters: 'Kwa nini hisa hii ni muhimu',
      stableGrowth: 'Mtendaji thabiti wa muda mrefu na historia ya gawio thabiti. Inafaa kwa malengo ya ustaafu na mapato.',
      riskLevel: 'Kiwango cha Hatari',
      moderate: 'Wastani',
      // Dividends
      dividendHistory: 'Historia ya Magawio',
      paymentDate: 'Tarehe ya Malipo',
      amount: 'Kiasi',
      exDate: 'Tarehe ya Mwisho',
      nextDividend: 'Gawio Linalotarajiwa',
      estimated: 'Makadirio',
      // Company
      about: 'Kuhusu',
      sector: 'Sekta',
      founded: 'Ilianzishwa',
      employees: 'Wafanyakazi',
      // Regulatory
      regulatory: 'Taarifa za Udhibiti',
      regulatedBy: 'Inadhibitiwa na',
      cmsa: 'Mamlaka ya Masoko ya Mtaji na Usalama (CMSA)',
      cma: 'Mamlaka ya Masoko ya Mtaji (CMA)',
      riskWarning: 'Uwekezaji una hatari. Utendaji wa awali hauhakikishi matokeo ya siku zijazo.',
      settlementNote: 'Malipo: T+3 (siku 3 za biashara)',
      // Chart
      price: 'Bei',
      change: 'Mabadiliko',
      // Goals
      matchesGoal: 'Inafaa',
      retirement: 'Ustaafu',
      growth: 'Ukuaji',
      income: 'Mapato'
    }
  };

  const t = microcopy[language];

  const exchangeInfo = {
    DSE: { country: 'Tanzania', flag: '🇹🇿', regulator: t.cmsa },
    NSE: { country: 'Kenya', flag: '🇰🇪', regulator: t.cma },
    USE: { country: 'Uganda', flag: '🇺🇬', regulator: 'USE' },
    RSE: { country: 'Rwanda', flag: '🇷🇼', regulator: 'RSE' }
  };

  // Sample data
  const stockStats = {
    open: stock.currentPrice - 5,
    high: stock.currentPrice + 8,
    low: stock.currentPrice - 12,
    peRatio: 12.5,
    fiftyTwoWeekHigh: stock.currentPrice * 1.15,
    fiftyTwoWeekLow: stock.currentPrice * 0.85
  };

  const dividendHistory = [
    { date: '2025-12-15', exDate: '2025-12-01', amount: 28, type: 'Quarterly' },
    { date: '2025-09-15', exDate: '2025-09-01', amount: 28, type: 'Quarterly' },
    { date: '2025-06-15', exDate: '2025-06-01', amount: 25, type: 'Quarterly' },
    { date: '2025-03-15', exDate: '2025-03-01', amount: 25, type: 'Quarterly' }
  ];

  const companyInfo = {
    description: language === 'en'
      ? 'Leading financial institution in Tanzania with over 200 branches nationwide. Provides retail and corporate banking services.'
      : 'Taasisi kuu ya kifedha nchini Tanzania yenye zaidi ya matawi 200 nchi nzima. Inatoa huduma za benki kwa watu binafsi na makampuni.',
    founded: '1996',
    employees: '2,500+',
    headquarters: stock.country
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) return `TZS ${(amount / 1000000000).toFixed(1)}B`;
    if (amount >= 1000000) return `TZS ${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `TZS ${(amount / 1000).toFixed(1)}K`;
    return `TZS ${amount}`;
  };

  const matchedGoal = userGoals.find(goal => {
    if (goal === 'retirement' && stock.dividendYield && stock.dividendYield > 5) return true;
    if (goal === 'income' && stock.dividendYield && stock.dividendYield > 4) return true;
    if (goal === 'growth' && stock.changePercent > 5) return true;
    return false;
  });

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-zinc-100 z-20">
        <div className="px-6 py-4 flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center hover:bg-zinc-100"
          >
            <ArrowLeft className="w-5 h-5 text-zinc-700" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-light">{stock.symbol}</h1>
              <span className="text-xs px-2 py-0.5 rounded bg-zinc-100 text-zinc-600">
                {exchangeInfo[stock.exchange].flag} {stock.exchange}
              </span>
              {matchedGoal && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {t.matchesGoal} {matchedGoal}
                </span>
              )}
            </div>
            <p className="text-sm text-zinc-600">{stock.name}</p>
          </div>
        </div>
      </div>

      {/* Price Hero */}
      <div className="px-6 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-8 border-zinc-200">
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-xs text-zinc-400 uppercase tracking-wide mb-2">
                  {t.price}
                </p>
                <h2 className="text-6xl font-light tracking-tight">
                  {formatCurrency(stock.currentPrice)}
                </h2>
              </div>
              <div className={`flex items-center gap-2 pb-2 ${
                stock.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {stock.change >= 0 ? (
                  <TrendingUp className="w-6 h-6" />
                ) : (
                  <TrendingDown className="w-6 h-6" />
                )}
                <div className="text-right">
                  <p className="text-2xl font-light">
                    {stock.change >= 0 ? '+' : ''}{stock.changePercent}%
                  </p>
                  <p className="text-sm">
                    {stock.change >= 0 ? '+' : ''}{formatCurrency(stock.change)}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-100">
              <div>
                <p className="text-xs text-zinc-500 mb-1">{t.open}</p>
                <p className="text-base font-medium">{formatCurrency(stockStats.open)}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-1">{t.high}</p>
                <p className="text-base font-medium">{formatCurrency(stockStats.high)}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-1">{t.low}</p>
                <p className="text-base font-medium">{formatCurrency(stockStats.low)}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Chart Period Selector */}
      <div className="px-6 pt-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {(['1W', '1M', '3M', '6M', '1Y'] as const).map(period => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                selectedPeriod === period
                  ? 'bg-black text-white'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="px-6 pt-4">
        <Card className="p-6 border-zinc-200 h-64 flex items-center justify-center bg-zinc-50">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-zinc-400 mx-auto mb-3" />
            <p className="text-sm text-zinc-600">
              {language === 'en' ? 'Price chart' : 'Chati ya bei'} ({selectedPeriod})
            </p>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="px-6 pt-6">
        <div className="flex gap-4 border-b border-zinc-100">
          {[
            { id: 'overview' as const, label: t.overview },
            { id: 'dividends' as const, label: t.dividends },
            { id: 'info' as const, label: t.info }
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setSelectedTab(id)}
              className={`pb-3 px-2 text-sm font-medium border-b-2 transition-colors ${
                selectedTab === id
                  ? 'border-black text-black'
                  : 'border-transparent text-zinc-500 hover:text-zinc-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-6 pt-6 space-y-6">
        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {selectedTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* AI Insight */}
              <Card className="p-6 bg-blue-50 border-blue-100">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900 mb-1">
                      {t.whyThisMatters}
                    </p>
                    <p className="text-sm text-blue-800 leading-relaxed">
                      {t.stableGrowth}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-blue-700" />
                      <span className="text-xs text-blue-700 font-medium">
                        {t.riskLevel}: {t.moderate}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Key Metrics */}
              <Card className="p-6 border-zinc-200">
                <h3 className="text-base font-medium mb-4">
                  {language === 'en' ? 'Key Metrics' : 'Vipimo Muhimu'}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-zinc-500 mb-1">{t.marketCap}</p>
                    <p className="text-lg font-medium">{formatCurrency(stock.marketCap)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 mb-1">{t.volume}</p>
                    <p className="text-lg font-medium">
                      {stock.volume >= 1000000 
                        ? `${(stock.volume / 1000000).toFixed(1)}M`
                        : `${(stock.volume / 1000).toFixed(0)}K`
                      }
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 mb-1">{t.peRatio}</p>
                    <p className="text-lg font-medium">{stockStats.peRatio}</p>
                  </div>
                  {stock.dividendYield && (
                    <div>
                      <p className="text-xs text-zinc-500 mb-1">{t.dividendYield}</p>
                      <p className="text-lg font-medium">{stock.dividendYield}%</p>
                    </div>
                  )}
                </div>
              </Card>

              {/* Regulatory */}
              <Card className="p-5 border-zinc-200 bg-zinc-50">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-zinc-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-zinc-700 space-y-2">
                    <p>
                      <span className="font-medium">{t.regulatedBy}:</span>{' '}
                      {exchangeInfo[stock.exchange].regulator}
                    </p>
                    <p className="text-zinc-600">{t.riskWarning}</p>
                    <p className="text-zinc-600">{t.settlementNote}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Dividends Tab */}
          {selectedTab === 'dividends' && (
            <motion.div
              key="dividends"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Next Dividend */}
              <Card className="p-6 bg-green-50 border-green-100">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-900 mb-1">
                      {t.nextDividend}
                    </p>
                    <p className="text-2xl font-light text-green-900 mb-1">
                      TZS 28
                    </p>
                    <p className="text-sm text-green-700">
                      {t.exDate}: Dec 1, 2026 • {t.estimated}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Dividend History */}
              <div>
                <h3 className="text-base font-medium mb-3">{t.dividendHistory}</h3>
                <div className="space-y-3">
                  {dividendHistory.map((dividend, idx) => (
                    <Card key={idx} className="p-5 border-zinc-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-base font-medium mb-1">
                            TZS {dividend.amount}
                          </p>
                          <p className="text-sm text-zinc-600">
                            {t.paymentDate}: {dividend.date}
                          </p>
                          <p className="text-xs text-zinc-500 mt-1">
                            {t.exDate}: {dividend.exDate}
                          </p>
                        </div>
                        <span className="text-xs px-3 py-1 rounded-full bg-zinc-100 text-zinc-600">
                          {dividend.type}
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Company Info Tab */}
          {selectedTab === 'info' && (
            <motion.div
              key="info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* About */}
              <Card className="p-6 border-zinc-200">
                <h3 className="text-base font-medium mb-3">{t.about}</h3>
                <p className="text-sm text-zinc-700 leading-relaxed mb-4">
                  {companyInfo.description}
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-100">
                  <div>
                    <p className="text-xs text-zinc-500 mb-1">{t.sector}</p>
                    <p className="text-sm font-medium">{stock.sector}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 mb-1">{t.founded}</p>
                    <p className="text-sm font-medium">{companyInfo.founded}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 mb-1">{t.employees}</p>
                    <p className="text-sm font-medium">{companyInfo.employees}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 mb-1">
                      {language === 'en' ? 'Headquarters' : 'Makao Makuu'}
                    </p>
                    <p className="text-sm font-medium">{companyInfo.headquarters}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-100 p-6 z-10">
        <div className="max-w-2xl mx-auto grid grid-cols-3 gap-3">
          <Button
            variant="outline"
            onClick={() => {}}
            className="h-14 border-2"
          >
            <Plus className="w-5 h-5 mr-2" />
            {language === 'en' ? 'Watch' : 'Fuatilia'}
          </Button>
          <Button
            onClick={onBuy}
            className="h-14 bg-green-600 text-white hover:bg-green-700"
          >
            {t.buy}
          </Button>
          <Button
            onClick={onSell}
            variant="outline"
            className="h-14 border-2 border-red-200 text-red-600 hover:bg-red-50"
          >
            {t.sell}
          </Button>
        </div>
      </div>
    </div>
  );
}
