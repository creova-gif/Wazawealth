// WAZA WEALTH — Enhanced Portfolio Page
// Multi-asset, multi-currency, allocation breakdown

import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Filter, TrendingUp, TrendingDown, ChevronRight, Globe, Coins } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { mockPortfolio, mockFXRates } from '@/data/mockPortfolio';
import { formatMoney, formatPercent } from '@/utils/portfolioCalculations';
import { AssetClass, Currency } from '@/types/portfolio';

interface Props {
  language: 'sw' | 'en';
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

type FilterType = 'all' | 'stocks' | 'etfs' | 'crypto' | 'cash';
type CurrencyFilter = 'all' | 'TZS' | 'KES' | 'USD';

export function EnhancedPortfolioPage({ language, onBack, onNavigate }: Props) {
  const [assetFilter, setAssetFilter] = useState<FilterType>('all');
  const [currencyFilter, setCurrencyFilter] = useState<CurrencyFilter>('all');
  const [showFilters, setShowFilters] = useState(false);

  const content = {
    sw: {
      portfolio: 'Portfolio',
      totalValue: 'Jumla ya Thamani',
      today: 'Leo',
      allTime: 'Wakati Wote',
      allocation: 'Mgao',
      holdings: 'Vipande',
      filters: 'Vichujio',
      all: 'Vyote',
      stocks: 'Hisa',
      etfs: 'ETFs',
      crypto: 'Crypto',
      cash: 'Pesa Taslimu',
      currency: 'Sarafu',
      assetType: 'Aina ya Mali',
      viewDetail: 'Angalia Maelezo',
      shares: 'hisa',
      bookCost: 'Gharama ya Kitabu',
      currentValue: 'Thamani ya Sasa',
      performance: 'Utendaji',
      diversification: 'Utofauti',
      risk: 'Hatari',
      moderate: 'Wastani',
      good: 'Nzuri',
      analytics: 'Uchambuzi'
    },
    en: {
      portfolio: 'Portfolio',
      totalValue: 'Total Value',
      today: 'Today',
      allTime: 'All Time',
      allocation: 'Allocation',
      holdings: 'Holdings',
      filters: 'Filters',
      all: 'All',
      stocks: 'Stocks',
      etfs: 'ETFs',
      crypto: 'Crypto',
      cash: 'Cash',
      currency: 'Currency',
      assetType: 'Asset Type',
      viewDetail: 'View Detail',
      shares: 'shares',
      bookCost: 'Book Cost',
      currentValue: 'Current Value',
      performance: 'Performance',
      diversification: 'Diversification',
      risk: 'Risk',
      moderate: 'Moderate',
      good: 'Good',
      analytics: 'Analytics'
    }
  };

  const t = content[language];
  const portfolio = mockPortfolio;

  // Filter holdings
  const allHoldings = portfolio.accounts.flatMap(acc => acc.holdings);
  const filteredHoldings = allHoldings.filter(holding => {
    const assetMatch = assetFilter === 'all' || 
      (assetFilter === 'stocks' && holding.asset.assetClass === 'stock') ||
      (assetFilter === 'etfs' && holding.asset.assetClass === 'etf') ||
      (assetFilter === 'crypto' && holding.asset.assetClass === 'crypto');
    
    const currencyMatch = currencyFilter === 'all' || 
      holding.currentMarketValue.currency === currencyFilter;
    
    return assetMatch && currencyMatch;
  });

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-zinc-100 z-10">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center hover:bg-zinc-100"
            >
              <ArrowLeft className="w-5 h-5 text-zinc-700" />
            </button>
            <h1 className="text-xl font-light">{t.portfolio}</h1>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center hover:bg-zinc-100"
          >
            <Filter className="w-5 h-5 text-zinc-700" />
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-zinc-100 px-6 py-4 space-y-4"
          >
            {/* Asset Type Filter */}
            <div>
              <p className="text-xs text-zinc-500 mb-2">{t.assetType}</p>
              <div className="flex gap-2 flex-wrap">
                {(['all', 'stocks', 'etfs', 'crypto', 'cash'] as FilterType[]).map(filter => (
                  <button
                    key={filter}
                    onClick={() => setAssetFilter(filter)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      assetFilter === filter
                        ? 'bg-black text-white'
                        : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                    }`}
                  >
                    {t[filter]}
                  </button>
                ))}
              </div>
            </div>

            {/* Currency Filter */}
            <div>
              <p className="text-xs text-zinc-500 mb-2">{t.currency}</p>
              <div className="flex gap-2">
                {(['all', 'TZS', 'KES', 'USD'] as CurrencyFilter[]).map(curr => (
                  <button
                    key={curr}
                    onClick={() => setCurrencyFilter(curr)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      currencyFilter === curr
                        ? 'bg-black text-white'
                        : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                    }`}
                  >
                    {curr === 'all' ? t.all : curr}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Total Value Card */}
      <div className="px-6 pt-6 pb-4">
        <Card className="p-8 border-zinc-200">
          <div className="mb-6">
            <p className="text-xs text-zinc-500 mb-1 uppercase tracking-wide">{t.totalValue}</p>
            <h2 className="text-5xl font-light tracking-tight mb-2">
              {formatMoney(portfolio.totalWealthNormalized, true)}
            </h2>
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-1 ${
                portfolio.totalReturnPercentNormalized >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {portfolio.totalReturnPercentNormalized >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">
                  {formatPercent(portfolio.totalReturnPercentNormalized)}
                </span>
              </div>
              <span className="text-sm text-zinc-500">{t.allTime}</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-200">
            <div>
              <p className="text-xs text-zinc-500 mb-1">{t.diversification}</p>
              <p className="text-lg font-medium">{portfolio.diversificationScore}/100</p>
              <p className="text-xs text-green-600">{t.good}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 mb-1">{t.risk}</p>
              <p className="text-lg font-medium">{portfolio.riskScore}/100</p>
              <p className="text-xs text-zinc-600">{t.moderate}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 mb-1">{t.holdings}</p>
              <p className="text-lg font-medium">{allHoldings.length}</p>
              <p className="text-xs text-zinc-600">{t.stocks}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Allocation Breakdown */}
      <div className="px-6 py-4">
        <h3 className="text-lg font-light mb-4">{t.allocation}</h3>
        <Card className="p-6 border-zinc-200">
          {/* Visual allocation bars */}
          <div className="space-y-3">
            {portfolio.allocationByAssetClass.map((alloc, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-zinc-700 capitalize">
                    {alloc.assetClass === 'stock' ? t.stocks : alloc.assetClass}
                  </span>
                  <span className="text-sm font-medium">{alloc.percent.toFixed(1)}%</span>
                </div>
                <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${alloc.percent}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    className={`h-full ${
                      alloc.assetClass === 'stock' ? 'bg-blue-600' :
                      alloc.assetClass === 'crypto' ? 'bg-orange-500' :
                      'bg-green-600'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Holdings List */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-light">
            {t.holdings} ({filteredHoldings.length})
          </h3>
        </div>

        <div className="space-y-3">
          {filteredHoldings.map((holding, idx) => (
            <motion.div
              key={holding.holdingId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card
                className="p-5 border-zinc-200 hover:border-zinc-300 transition-all cursor-pointer"
                onClick={() => onNavigate('stock-detail', holding.asset)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{holding.asset.symbol}</h4>
                      {holding.asset.exchange === 'DSE' && <span className="text-xs text-zinc-500">🇹🇿</span>}
                      {holding.asset.exchange === 'NSE' && <span className="text-xs text-zinc-500">🇰🇪</span>}
                      {holding.asset.exchange === 'CRYPTO' && <span className="text-xs text-zinc-500">⚠️</span>}
                    </div>
                    <p className="text-sm text-zinc-600 mb-3">{holding.asset.name}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-zinc-500">
                      <span>{holding.quantity} {t.shares}</span>
                      <span>•</span>
                      <span>{holding.percentOfTotal.toFixed(1)}% of portfolio</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-medium mb-1">
                      {formatMoney(holding.currentMarketValue, true)}
                    </p>
                    <div className={`text-sm ${
                      holding.unrealizedPLPercent >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatPercent(holding.unrealizedPLPercent)}
                    </div>
                  </div>
                </div>

                {/* Mini metrics */}
                <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-zinc-100 text-xs">
                  <div>
                    <p className="text-zinc-500 mb-0.5">{t.bookCost}</p>
                    <p className="font-medium">{formatMoney(holding.bookCost, true)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-zinc-500 mb-0.5">{t.currentValue}</p>
                    <p className="font-medium">{formatMoney(holding.currentMarketValue, true)}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredHoldings.length === 0 && (
          <Card className="p-12 border-zinc-200 text-center">
            <p className="text-zinc-500">
              {language === 'sw' 
                ? 'Hakuna vipande vinavyolingana na vichujio vyako'
                : 'No holdings match your filters'}
            </p>
          </Card>
        )}
      </div>

      {/* Analytics CTA */}
      <div className="px-6 py-4">
        <Button
          variant="outline"
          className="w-full h-14 border-2 border-zinc-300 hover:border-zinc-500"
          onClick={() => onNavigate('portfolio-analytics')}
        >
          <Globe className="w-5 h-5 mr-2" />
          {language === 'sw' ? 'Angalia Uchambuzi Kamili' : 'View Full Analytics'}
        </Button>
      </div>
    </div>
  );
}
