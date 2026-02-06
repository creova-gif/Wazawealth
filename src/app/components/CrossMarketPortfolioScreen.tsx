import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Search, Filter, TrendingUp, TrendingDown, Minus,
  ChevronDown, ChevronRight, Info, Sparkles, X, Check
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface Props {
  language: 'sw' | 'en';
  onBack: () => void;
  onNavigateToStock: (symbol: string) => void;
}

interface Position {
  symbol: string;
  name: string;
  exchange: 'DSE' | 'NSE' | 'USE' | 'RSE';
  country: 'Tanzania' | 'Kenya' | 'Uganda' | 'Rwanda';
  shares: number;
  avgCost: number;
  currentPrice: number;
  currentValue: number;
  profitLoss: number;
  profitLossPercent: number;
  sector: string;
  dividendYield?: number;
  aiInsight?: string;
}

export function CrossMarketPortfolioScreen({ language, onBack, onNavigateToStock }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedExchange, setSelectedExchange] = useState<string>('all');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [expandedStock, setExpandedStock] = useState<string | null>(null);
  const [groupBy, setGroupBy] = useState<'country' | 'sector'>('country');

  const microcopy = {
    en: {
      title: 'Portfolio',
      search: 'Search stocks...',
      filters: 'Filters',
      all: 'All',
      groupByCountry: 'Group by country',
      groupBySector: 'Group by sector',
      totalValue: 'Total Value',
      totalGain: 'Total Gain',
      onTrack: 'On track',
      holdings: 'Holdings',
      shares: 'shares',
      avgCost: 'Avg. Cost',
      currentPrice: 'Current',
      gain: 'Gain',
      loss: 'Loss',
      dividendYield: 'Dividend Yield',
      aiInsight: 'AI Insight',
      viewDetails: 'View Details',
      noHoldings: 'No holdings yet',
      startInvesting: 'Start Investing',
      emptyMessage: 'Build wealth across East Africa',
      exchanges: 'Exchanges',
      sectors: 'Sectors',
      optimized: 'Optimized for your growth plan',
      diversified: 'Well diversified across regions',
      needsDiversity: 'Consider adding more regional diversity',
      searchPlaceholder: 'Search across DSE, NSE, USE, RSE...',
      applyFilters: 'Apply Filters',
      clearFilters: 'Clear All'
    },
    sw: {
      title: 'Mkoba',
      search: 'Tafuta hisa...',
      filters: 'Chuja',
      all: 'Yote',
      groupByCountry: 'Panga kwa nchi',
      groupBySector: 'Panga kwa sekta',
      totalValue: 'Jumla',
      totalGain: 'Faida Jumla',
      onTrack: 'Unafanya Vizuri',
      holdings: 'Vipande',
      shares: 'hisa',
      avgCost: 'Bei ya Wastani',
      currentPrice: 'Bei ya Sasa',
      gain: 'Faida',
      loss: 'Hasara',
      dividendYield: 'Mapato ya Gawio',
      aiInsight: 'Uchambuzi wa AI',
      viewDetails: 'Angalia Maelezo',
      noHoldings: 'Bado huna vipande',
      startInvesting: 'Anza Kuwekeza',
      emptyMessage: 'Jenga utajiri kote Afrika Mashariki',
      exchanges: 'Masoko',
      sectors: 'Sekta',
      optimized: 'Imeboreshwa kwa mpango wako wa ukuaji',
      diversified: 'Imetawanyika vizuri kwa mikoa',
      needsDiversity: 'Fikiria kuongeza utofauti wa kimkoa',
      searchPlaceholder: 'Tafuta katika DSE, NSE, USE, RSE...',
      applyFilters: 'Tekeleza',
      clearFilters: 'Futa Zote'
    }
  };

  const t = microcopy[language];

  // Sample data - in production, this comes from API
  const positions: Position[] = [
    {
      symbol: 'CRDB',
      name: 'CRDB Bank',
      exchange: 'DSE',
      country: 'Tanzania',
      shares: 450,
      avgCost: 440,
      currentPrice: 450,
      currentValue: 202500,
      profitLoss: 4500,
      profitLossPercent: 2.3,
      sector: 'Banking',
      dividendYield: 6.2,
      aiInsight: language === 'en' 
        ? 'Strong fundamentals, consistent dividend history'
        : 'Misingi imara, historia thabiti ya gawio'
    },
    {
      symbol: 'SAFARICOM',
      name: 'Safaricom PLC',
      exchange: 'NSE',
      country: 'Kenya',
      shares: 300,
      avgCost: 28.5,
      currentPrice: 31.2,
      currentValue: 9360,
      profitLoss: 810,
      profitLossPercent: 9.5,
      sector: 'Telecommunications',
      dividendYield: 4.8,
      aiInsight: language === 'en'
        ? 'Market leader, strong growth potential'
        : 'Kiongozi wa soko, uwezekano mkubwa wa ukuaji'
    },
    {
      symbol: 'EQUITY',
      name: 'Equity Bank',
      exchange: 'NSE',
      country: 'Kenya',
      shares: 500,
      avgCost: 42.0,
      currentPrice: 45.5,
      currentValue: 22750,
      profitLoss: 1750,
      profitLossPercent: 8.3,
      sector: 'Banking',
      dividendYield: 5.5,
      aiInsight: language === 'en'
        ? 'Regional expansion driving growth'
        : 'Upanuzi wa kikanda unaendesha ukuaji'
    },
    {
      symbol: 'STANBIC',
      name: 'Stanbic Uganda',
      exchange: 'USE',
      country: 'Uganda',
      shares: 200,
      avgCost: 18.0,
      currentPrice: 19.5,
      currentValue: 3900,
      profitLoss: 300,
      profitLossPercent: 8.3,
      sector: 'Banking',
      dividendYield: 7.1
    }
  ];

  const totalValue = positions.reduce((sum, p) => sum + p.currentValue, 0);
  const totalCost = positions.reduce((sum, p) => sum + (p.avgCost * p.shares), 0);
  const totalGain = totalValue - totalCost;
  const totalGainPercent = (totalGain / totalCost) * 100;

  // Group positions
  const groupedPositions = useMemo(() => {
    let filtered = positions;

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by exchange
    if (selectedExchange !== 'all') {
      filtered = filtered.filter(p => p.exchange === selectedExchange);
    }

    // Filter by sector
    if (selectedSector !== 'all') {
      filtered = filtered.filter(p => p.sector === selectedSector);
    }

    // Group
    const grouped: { [key: string]: Position[] } = {};
    filtered.forEach(position => {
      const key = groupBy === 'country' ? position.country : position.sector;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(position);
    });

    return grouped;
  }, [positions, searchQuery, selectedExchange, selectedSector, groupBy]);

  const exchanges = ['DSE', 'NSE', 'USE', 'RSE'];
  const sectors = ['Banking', 'Telecommunications', 'Manufacturing', 'Agriculture', 'Energy'];

  const exchangeInfo = {
    DSE: { country: 'Tanzania', flag: '🇹🇿' },
    NSE: { country: 'Kenya', flag: '🇰🇪' },
    USE: { country: 'Uganda', flag: '🇺🇬' },
    RSE: { country: 'Rwanda', flag: '🇷🇼' }
  };

  const formatCurrency = (amount: number, abbrev = false) => {
    if (abbrev && amount >= 1000) {
      return `TZS ${(amount / 1000).toFixed(1)}K`;
    }
    return `TZS ${amount.toLocaleString()}`;
  };

  const getAIStatus = () => {
    const uniqueCountries = new Set(positions.map(p => p.country)).size;
    if (uniqueCountries >= 3) return { message: t.diversified, color: 'green' };
    if (uniqueCountries === 2) return { message: t.optimized, color: 'blue' };
    return { message: t.needsDiversity, color: 'amber' };
  };

  const aiStatus = getAIStatus();

  // Empty state
  if (positions.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-zinc-100 z-10">
          <div className="px-6 py-4 flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center hover:bg-zinc-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-zinc-700" />
            </button>
            <h1 className="text-xl font-light">{t.title}</h1>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md text-center"
          >
            <div className="w-24 h-24 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-6">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M20 4L20 36M20 4L12 12M20 4L28 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-zinc-400"/>
              </svg>
            </div>
            <h2 className="text-3xl font-light mb-3">{t.noHoldings}</h2>
            <p className="text-base text-zinc-600 mb-8">{t.emptyMessage}</p>
            <Button className="h-14 px-8 bg-black text-white hover:bg-zinc-800">
              {t.startInvesting}
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-zinc-100 z-20">
        <div className="px-6 py-4 flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center hover:bg-zinc-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-zinc-700" />
          </button>
          <h1 className="text-xl font-light flex-1">{t.title}</h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              showFilters ? 'bg-black text-white' : 'bg-zinc-50 text-zinc-700 hover:bg-zinc-100'
            }`}
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-6 pb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:border-black focus:ring-2 focus:ring-zinc-100 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-zinc-200 hover:bg-zinc-300 flex items-center justify-center"
              >
                <X className="w-3.5 h-3.5 text-zinc-600" />
              </button>
            )}
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-zinc-100"
            >
              <div className="px-6 py-4 space-y-4">
                {/* Exchange Filter */}
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wide mb-2">{t.exchanges}</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedExchange('all')}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        selectedExchange === 'all'
                          ? 'bg-black text-white'
                          : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                      }`}
                    >
                      {t.all}
                    </button>
                    {exchanges.map(ex => (
                      <button
                        key={ex}
                        onClick={() => setSelectedExchange(ex)}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${
                          selectedExchange === ex
                            ? 'bg-black text-white'
                            : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                        }`}
                      >
                        {exchangeInfo[ex as keyof typeof exchangeInfo].flag} {ex}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sector Filter */}
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wide mb-2">{t.sectors}</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedSector('all')}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        selectedSector === 'all'
                          ? 'bg-black text-white'
                          : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                      }`}
                    >
                      {t.all}
                    </button>
                    {sectors.map(sector => (
                      <button
                        key={sector}
                        onClick={() => setSelectedSector(sector)}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${
                          selectedSector === sector
                            ? 'bg-black text-white'
                            : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                        }`}
                      >
                        {sector}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedExchange('all');
                      setSelectedSector('all');
                    }}
                    className="flex-1"
                  >
                    {t.clearFilters}
                  </Button>
                  <Button
                    onClick={() => setShowFilters(false)}
                    className="flex-1 bg-black text-white hover:bg-zinc-800"
                  >
                    {t.applyFilters}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hero Summary Card */}
      <div className="px-6 pt-6 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 border-zinc-200">
            <p className="text-xs text-zinc-400 uppercase tracking-[0.1em] mb-3">{t.totalValue}</p>
            
            <div className="flex items-end justify-between mb-6">
              <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-7xl font-light tracking-tight leading-none"
              >
                {(totalValue / 1000).toFixed(1)}K
              </motion.h2>

              <div className="flex flex-col items-end pb-2">
                <div className={`flex items-center gap-1.5 ${
                  totalGain >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {totalGain >= 0 ? (
                    <TrendingUp className="w-5 h-5" />
                  ) : (
                    <TrendingDown className="w-5 h-5" />
                  )}
                  <span className="text-2xl font-light tracking-tight tabular-nums">
                    {totalGain >= 0 ? '+' : ''}{totalGainPercent.toFixed(1)}%
                  </span>
                </div>
                <span className="text-xs text-zinc-500 mt-0.5">
                  {totalGain >= 0 ? t.gain : t.loss}
                </span>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 text-sm text-zinc-600">
              <motion.span
                className="w-2 h-2 rounded-full bg-green-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span>{t.onTrack}</span>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* AI Insight Card */}
      <div className="px-6 py-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className={`p-6 ${
            aiStatus.color === 'green' ? 'bg-green-50 border-green-100' :
            aiStatus.color === 'blue' ? 'bg-blue-50 border-blue-100' :
            'bg-amber-50 border-amber-100'
          }`}>
            <div className="flex items-start gap-3">
              <Sparkles className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                aiStatus.color === 'green' ? 'text-green-700' :
                aiStatus.color === 'blue' ? 'text-blue-700' :
                'text-amber-700'
              }`} />
              <p className={`text-sm leading-relaxed ${
                aiStatus.color === 'green' ? 'text-green-900' :
                aiStatus.color === 'blue' ? 'text-blue-900' :
                'text-amber-900'
              }`}>
                {aiStatus.message}
              </p>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Group Toggle */}
      <div className="px-6 py-2">
        <div className="flex gap-2">
          <button
            onClick={() => setGroupBy('country')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              groupBy === 'country'
                ? 'bg-zinc-900 text-white'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            {t.groupByCountry}
          </button>
          <button
            onClick={() => setGroupBy('sector')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              groupBy === 'sector'
                ? 'bg-zinc-900 text-white'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            {t.groupBySector}
          </button>
        </div>
      </div>

      {/* Holdings by Group */}
      <div className="px-6 pt-4 pb-8 space-y-6">
        {Object.entries(groupedPositions).map(([groupName, groupPositions], groupIdx) => (
          <motion.div
            key={groupName}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + groupIdx * 0.1 }}
          >
            {/* Group Header */}
            <div className="flex items-center gap-2 mb-3">
              {groupBy === 'country' && (
                <span className="text-2xl">
                  {groupName === 'Tanzania' ? '🇹🇿' :
                   groupName === 'Kenya' ? '🇰🇪' :
                   groupName === 'Uganda' ? '🇺🇬' :
                   '🇷🇼'}
                </span>
              )}
              <h3 className="text-lg font-medium text-zinc-900">{groupName}</h3>
              <span className="text-sm text-zinc-500">
                ({groupPositions.length})
              </span>
            </div>

            {/* Position Cards */}
            <div className="space-y-3">
              {groupPositions.map((position, posIdx) => (
                <motion.div
                  key={position.symbol}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + groupIdx * 0.1 + posIdx * 0.05 }}
                >
                  <Card
                    className="border-zinc-200 hover:border-zinc-400 transition-all cursor-pointer overflow-hidden"
                    onClick={() => setExpandedStock(expandedStock === position.symbol ? null : position.symbol)}
                  >
                    {/* Collapsed View */}
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-base font-medium">{position.symbol}</h4>
                            <span className="text-xs px-2 py-0.5 rounded bg-zinc-100 text-zinc-600">
                              {position.exchange}
                            </span>
                          </div>
                          <p className="text-sm text-zinc-600">{position.name}</p>
                        </div>

                        <div className="text-right">
                          <p className="text-xl font-light tabular-nums">
                            {formatCurrency(position.currentValue, true)}
                          </p>
                          <div className={`flex items-center gap-1 justify-end mt-1 ${
                            position.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {position.profitLoss >= 0 ? (
                              <TrendingUp className="w-4 h-4" />
                            ) : (
                              <TrendingDown className="w-4 h-4" />
                            )}
                            <span className="text-sm font-medium tabular-nums">
                              {position.profitLoss >= 0 ? '+' : ''}{position.profitLossPercent.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="flex items-center gap-4 text-xs text-zinc-600">
                        <span>{position.shares} {t.shares}</span>
                        <span>•</span>
                        <span>{formatCurrency(position.currentPrice)}</span>
                        {position.dividendYield && (
                          <>
                            <span>•</span>
                            <span>{position.dividendYield}% {t.dividendYield}</span>
                          </>
                        )}
                      </div>

                      {/* Expand Indicator */}
                      <div className="flex items-center justify-center mt-3 pt-3 border-t border-zinc-100">
                        <motion.div
                          animate={{ rotate: expandedStock === position.symbol ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-5 h-5 text-zinc-400" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Expanded View */}
                    <AnimatePresence>
                      {expandedStock === position.symbol && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-zinc-100"
                        >
                          <div className="p-5 space-y-4 bg-zinc-50">
                            {/* Detailed Stats */}
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-xs text-zinc-500 mb-1">{t.avgCost}</p>
                                <p className="text-base font-medium tabular-nums">
                                  {formatCurrency(position.avgCost)}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-zinc-500 mb-1">{t.currentPrice}</p>
                                <p className="text-base font-medium tabular-nums">
                                  {formatCurrency(position.currentPrice)}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-zinc-500 mb-1">{t.shares}</p>
                                <p className="text-base font-medium tabular-nums">
                                  {position.shares}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-zinc-500 mb-1">
                                  {position.profitLoss >= 0 ? t.gain : t.loss}
                                </p>
                                <p className={`text-base font-medium tabular-nums ${
                                  position.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {position.profitLoss >= 0 ? '+' : ''}{formatCurrency(position.profitLoss)}
                                </p>
                              </div>
                            </div>

                            {/* AI Insight */}
                            {position.aiInsight && (
                              <Card className="p-4 bg-white border-zinc-200">
                                <div className="flex items-start gap-2">
                                  <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                  <p className="text-sm text-zinc-700 leading-relaxed">
                                    {position.aiInsight}
                                  </p>
                                </div>
                              </Card>
                            )}

                            {/* Actions */}
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                onNavigateToStock(position.symbol);
                              }}
                              className="w-full h-12 bg-black text-white hover:bg-zinc-800"
                            >
                              {t.viewDetails}
                              <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
