import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, Filter, TrendingUp, TrendingDown, Sparkles, ChevronRight,
  Building2, Phone, ShoppingBag, Factory, Zap, Home, X, Info
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface Props {
  language: 'sw' | 'en';
  onStockSelect: (stock: Stock) => void;
  userGoals?: string[];
}

interface Stock {
  symbol: string;
  name: string;
  exchange: 'DSE' | 'NSE' | 'USE' | 'RSE';
  country: 'Tanzania' | 'Kenya' | 'Uganda' | 'Rwanda';
  sector: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  dividendYield?: number;
  aiInsight?: string;
  matchesGoal?: string;
}

export function UnifiedMarketDiscovery({ language, onStockSelect, userGoals = [] }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'all' | 'suggested'>('all');

  const microcopy = {
    en: {
      title: 'Discover',
      searchPlaceholder: 'Search stocks across DSE, NSE, USE, RSE...',
      filters: 'Filters',
      allStocks: 'All Stocks',
      suggested: 'For Your Goals',
      countries: 'Markets',
      sectors: 'Sectors',
      all: 'All',
      topMovers: 'Top Movers',
      matchesGoal: 'Matches your',
      goal: 'goal',
      viewDetails: 'View Details',
      addToWatchlist: 'Add to Watchlist',
      marketCap: 'Market Cap',
      volume: 'Volume',
      dividend: 'Dividend',
      // Sectors
      financials: 'Financials',
      telecommunications: 'Telecommunications',
      consumerGoods: 'Consumer Goods',
      manufacturing: 'Manufacturing',
      energy: 'Energy',
      realEstate: 'Real Estate',
      // Countries
      tanzania: 'Tanzania',
      kenya: 'Kenya',
      uganda: 'Uganda',
      rwanda: 'Rwanda',
      // Goals
      retirement: 'Retirement',
      growth: 'Growth',
      income: 'Income',
      // Empty
      noResults: 'No stocks found',
      tryAdjusting: 'Try adjusting your filters or search term',
      // Insights
      stableGrowth: 'Stable long-term growth expected',
      strongDividend: 'Strong dividend payer, good for income',
      growthPotential: 'High growth potential, moderate risk'
    },
    sw: {
      title: 'Gundua',
      searchPlaceholder: 'Tafuta hisa katika DSE, NSE, USE, RSE...',
      filters: 'Chuja',
      allStocks: 'Hisa Zote',
      suggested: 'Kwa Malengo Yako',
      countries: 'Masoko',
      sectors: 'Sekta',
      all: 'Zote',
      topMovers: 'Zinazoongoza',
      matchesGoal: 'Inafaa',
      goal: 'lengo lako',
      viewDetails: 'Angalia Maelezo',
      addToWatchlist: 'Ongeza kwenye Orodha',
      marketCap: 'Thamani ya Soko',
      volume: 'Kiasi',
      dividend: 'Gawio',
      // Sectors
      financials: 'Fedha',
      telecommunications: 'Mawasiliano',
      consumerGoods: 'Bidhaa za Matumizi',
      manufacturing: 'Utengenezaji',
      energy: 'Nishati',
      realEstate: 'Mali Isiyohamishika',
      // Countries
      tanzania: 'Tanzania',
      kenya: 'Kenya',
      uganda: 'Uganda',
      rwanda: 'Rwanda',
      // Goals
      retirement: 'Ustaafu',
      growth: 'Ukuaji',
      income: 'Mapato',
      // Empty
      noResults: 'Hakuna hisa zilizopatikana',
      tryAdjusting: 'Jaribu kubadilisha vichujio au maneno ya utafutaji',
      // Insights
      stableGrowth: 'Ukuaji thabiti wa muda mrefu unatarajiwa',
      strongDividend: 'Mlipaji mzuri wa gawio, nzuri kwa mapato',
      growthPotential: 'Uwezekano mkubwa wa ukuaji, hatari ya wastani'
    }
  };

  const t = microcopy[language];

  // Sample stock data
  const allStocks: Stock[] = [
    {
      symbol: 'CRDB',
      name: 'CRDB Bank',
      exchange: 'DSE',
      country: 'Tanzania',
      sector: 'Financials',
      currentPrice: 450,
      change: 10,
      changePercent: 2.3,
      volume: 125000,
      marketCap: 850000000000,
      dividendYield: 6.2,
      aiInsight: t.strongDividend,
      matchesGoal: 'income'
    },
    {
      symbol: 'SAFARICOM',
      name: 'Safaricom PLC',
      exchange: 'NSE',
      country: 'Kenya',
      sector: 'Telecommunications',
      currentPrice: 31.2,
      change: 2.1,
      changePercent: 7.2,
      volume: 8500000,
      marketCap: 1250000000000,
      dividendYield: 4.8,
      aiInsight: t.growthPotential,
      matchesGoal: 'growth'
    },
    {
      symbol: 'EQUITY',
      name: 'Equity Bank',
      exchange: 'NSE',
      country: 'Kenya',
      sector: 'Financials',
      currentPrice: 45.5,
      change: 3.2,
      changePercent: 7.6,
      volume: 3200000,
      marketCap: 920000000000,
      dividendYield: 5.5,
      aiInsight: t.stableGrowth,
      matchesGoal: 'retirement'
    },
    {
      symbol: 'TBL',
      name: 'Tanzania Breweries',
      exchange: 'DSE',
      country: 'Tanzania',
      sector: 'Consumer Goods',
      currentPrice: 5200,
      change: -80,
      changePercent: -1.5,
      volume: 8500,
      marketCap: 520000000000,
      dividendYield: 7.8,
      aiInsight: t.strongDividend,
      matchesGoal: 'income'
    },
    {
      symbol: 'EABL',
      name: 'East African Breweries',
      exchange: 'NSE',
      country: 'Kenya',
      sector: 'Consumer Goods',
      currentPrice: 185,
      change: 5,
      changePercent: 2.8,
      volume: 450000,
      marketCap: 680000000000,
      dividendYield: 6.1,
      aiInsight: t.stableGrowth,
      matchesGoal: 'income'
    }
  ];

  const exchangeInfo = {
    DSE: { country: 'Tanzania', flag: '🇹🇿', fullName: 'DSE' },
    NSE: { country: 'Kenya', flag: '🇰🇪', fullName: 'NSE' },
    USE: { country: 'Uganda', flag: '🇺🇬', fullName: 'USE' },
    RSE: { country: 'Rwanda', flag: '🇷🇼', fullName: 'RSE' }
  };

  const sectorIcons = {
    Financials: Building2,
    Telecommunications: Phone,
    'Consumer Goods': ShoppingBag,
    Manufacturing: Factory,
    Energy: Zap,
    'Real Estate': Home
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `TZS ${(amount / 1000000000).toFixed(1)}B`;
    }
    if (amount >= 1000000) {
      return `TZS ${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `TZS ${(amount / 1000).toFixed(1)}K`;
    }
    return `TZS ${amount}`;
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) return `${(volume / 1000000).toFixed(1)}M`;
    if (volume >= 1000) return `${(volume / 1000).toFixed(0)}K`;
    return volume.toString();
  };

  // Filter stocks
  const filteredStocks = useMemo(() => {
    let filtered = allStocks;

    // Search
    if (searchQuery) {
      filtered = filtered.filter(s =>
        s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.sector.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Country filter
    if (selectedCountry !== 'all') {
      filtered = filtered.filter(s => s.country === selectedCountry);
    }

    // Sector filter
    if (selectedSector !== 'all') {
      filtered = filtered.filter(s => s.sector === selectedSector);
    }

    // Goal-based suggestions
    if (viewMode === 'suggested' && userGoals.length > 0) {
      filtered = filtered.filter(s => 
        s.matchesGoal && userGoals.includes(s.matchesGoal)
      );
    }

    return filtered;
  }, [searchQuery, selectedCountry, selectedSector, viewMode, userGoals, allStocks]);

  // Group by exchange
  const groupedStocks = useMemo(() => {
    const grouped: { [key: string]: Stock[] } = {};
    filteredStocks.forEach(stock => {
      if (!grouped[stock.exchange]) grouped[stock.exchange] = [];
      grouped[stock.exchange].push(stock);
    });
    return grouped;
  }, [filteredStocks]);

  // Top movers (highest abs % change)
  const topMovers = useMemo(() => {
    return [...allStocks]
      .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
      .slice(0, 3);
  }, [allStocks]);

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-zinc-100 z-20">
        <div className="px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-light">{t.title}</h1>
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
              className="w-full h-12 pl-12 pr-12 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:border-black focus:ring-2 focus:ring-zinc-100 transition-all"
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

        {/* View Mode Toggle */}
        {userGoals.length > 0 && (
          <div className="px-6 pb-3 flex gap-2">
            <button
              onClick={() => setViewMode('all')}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                viewMode === 'all'
                  ? 'bg-black text-white'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              {t.allStocks}
            </button>
            <button
              onClick={() => setViewMode('suggested')}
              className={`px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${
                viewMode === 'suggested'
                  ? 'bg-black text-white'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              {t.suggested}
            </button>
          </div>
        )}

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
                {/* Country Filter */}
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wide mb-2">{t.countries}</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedCountry('all')}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        selectedCountry === 'all'
                          ? 'bg-black text-white'
                          : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                      }`}
                    >
                      {t.all}
                    </button>
                    {Object.entries(exchangeInfo).map(([exchange, info]) => (
                      <button
                        key={exchange}
                        onClick={() => setSelectedCountry(info.country)}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${
                          selectedCountry === info.country
                            ? 'bg-black text-white'
                            : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                        }`}
                      >
                        {info.flag} {info.country}
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
                    {Object.keys(sectorIcons).map(sector => (
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

                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCountry('all');
                      setSelectedSector('all');
                    }}
                    className="flex-1"
                  >
                    {language === 'en' ? 'Clear All' : 'Futa Zote'}
                  </Button>
                  <Button
                    onClick={() => setShowFilters(false)}
                    className="flex-1 bg-black text-white hover:bg-zinc-800"
                  >
                    {language === 'en' ? 'Apply' : 'Tekeleza'}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="px-6 pt-6 space-y-6">
        {/* Top Movers */}
        {viewMode === 'all' && !searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-lg font-medium mb-3">{t.topMovers}</h2>
            <div className="grid grid-cols-1 gap-3">
              {topMovers.map((stock, idx) => (
                <motion.div
                  key={stock.symbol}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="p-4 border-zinc-200 hover:border-zinc-400 cursor-pointer transition-all">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-base font-medium">{stock.symbol}</p>
                          <span className="text-xs px-2 py-0.5 rounded bg-zinc-100 text-zinc-600">
                            {exchangeInfo[stock.exchange].flag} {stock.exchange}
                          </span>
                        </div>
                        <p className="text-sm text-zinc-600">{stock.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-medium">{formatCurrency(stock.currentPrice)}</p>
                        <div className={`flex items-center gap-1 justify-end text-sm ${
                          stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stock.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          <span>{stock.change >= 0 ? '+' : ''}{stock.changePercent}%</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Grouped Stocks */}
        {Object.entries(groupedStocks).map(([exchange, stocks], groupIdx) => (
          <motion.div
            key={exchange}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: groupIdx * 0.1 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{exchangeInfo[exchange as keyof typeof exchangeInfo].flag}</span>
              <h3 className="text-lg font-medium">
                {exchangeInfo[exchange as keyof typeof exchangeInfo].country}
              </h3>
              <span className="text-sm text-zinc-500">({stocks.length})</span>
            </div>

            <div className="space-y-3">
              {stocks.map((stock, stockIdx) => {
                const SectorIcon = sectorIcons[stock.sector as keyof typeof sectorIcons] || Building2;
                
                return (
                  <motion.div
                    key={stock.symbol}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: stockIdx * 0.05 }}
                  >
                    <Card
                      className="border-zinc-200 hover:border-zinc-400 cursor-pointer transition-all overflow-hidden"
                      onClick={() => onStockSelect(stock)}
                    >
                      <div className="p-5">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <SectorIcon className="w-4 h-4 text-zinc-600" />
                              <p className="text-lg font-medium">{stock.symbol}</p>
                              {stock.matchesGoal && viewMode === 'suggested' && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 flex items-center gap-1">
                                  <Sparkles className="w-3 h-3" />
                                  {t.matchesGoal} {stock.matchesGoal}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-zinc-600 mb-2">{stock.name}</p>
                            <div className="flex items-center gap-3 text-xs text-zinc-500">
                              <span>{stock.sector}</span>
                              <span>•</span>
                              <span>{t.volume}: {formatVolume(stock.volume)}</span>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-2xl font-light mb-1">{formatCurrency(stock.currentPrice)}</p>
                            <div className={`flex items-center gap-1 justify-end ${
                              stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {stock.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                              <span className="text-sm font-medium">
                                {stock.change >= 0 ? '+' : ''}{stock.changePercent}%
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-4 pb-3 border-b border-zinc-100">
                          <div>
                            <p className="text-xs text-zinc-500">{t.marketCap}</p>
                            <p className="text-sm font-medium">{formatCurrency(stock.marketCap)}</p>
                          </div>
                          {stock.dividendYield && (
                            <div>
                              <p className="text-xs text-zinc-500">{t.dividend}</p>
                              <p className="text-sm font-medium">{stock.dividendYield}%</p>
                            </div>
                          )}
                        </div>

                        {/* AI Insight */}
                        {stock.aiInsight && (
                          <div className="mt-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
                            <div className="flex items-start gap-2">
                              <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                              <p className="text-sm text-blue-900">{stock.aiInsight}</p>
                            </div>
                          </div>
                        )}

                        {/* Action */}
                        <div className="mt-4 flex items-center justify-between">
                          <Button
                            variant="ghost"
                            className="text-sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Add to watchlist
                            }}
                          >
                            {t.addToWatchlist}
                          </Button>
                          <Button
                            variant="ghost"
                            className="text-sm flex items-center gap-1"
                          >
                            {t.viewDetails}
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}

        {/* Empty State */}
        {filteredStocks.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-zinc-400" />
            </div>
            <h3 className="text-xl font-light mb-2">{t.noResults}</h3>
            <p className="text-sm text-zinc-600">{t.tryAdjusting}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
