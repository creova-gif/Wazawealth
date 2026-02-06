import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Search, TrendingUp, TrendingDown, Star, ChevronRight, Flame, BarChart3 } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface Props {
  language: 'sw' | 'en';
  onBack: () => void;
  onNavigate: (destination: string, data?: any) => void;
}

export function CrossMarketScreen({ language, onBack, onNavigate }: Props) {
  const [selectedMarket, setSelectedMarket] = useState<'all' | 'DSE' | 'NSE' | 'USE' | 'RSE'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const content = {
    sw: {
      markets: 'Masoko',
      search: 'Tafuta hisa...',
      trending: 'Zinazovuma Tanzania',
      indexes: 'Indexes za Kikanda',
      baskets: 'Bakuli za Haraka',
      allMarkets: 'Yote',
      buyNow: 'Nunua Sasa',
      schedule: 'Panga',
      stocks: 'hisa',
      diversified: 'Tofauti'
    },
    en: {
      markets: 'Markets',
      search: 'Search stocks...',
      trending: 'Trending in Tanzania',
      indexes: 'Regional Indexes',
      baskets: 'One-Tap Baskets',
      allMarkets: 'All Markets',
      buyNow: 'Buy Now',
      schedule: 'Schedule',
      stocks: 'stocks',
      diversified: 'Diversified'
    }
  };

  const t = content[language];

  const markets = [
    { id: 'all', name: t.allMarkets, flag: '🌍' },
    { id: 'DSE', name: 'DSE', flag: '🇹🇿' },
    { id: 'NSE', name: 'NSE', flag: '🇰🇪' },
    { id: 'USE', name: 'USE', flag: '🇺🇬' },
    { id: 'RSE', name: 'RSE', flag: '🇷🇼' }
  ];

  const trendingStocks = [
    {
      symbol: 'CRDB',
      name: 'CRDB Bank',
      market: 'DSE',
      price: 450,
      change: 2.3,
      currency: 'TZS'
    },
    {
      symbol: 'VOD',
      name: 'Vodacom Tanzania',
      market: 'DSE',
      price: 890,
      change: -0.8,
      currency: 'TZS'
    },
    {
      symbol: 'NIC',
      name: 'NICO Insurance',
      market: 'DSE',
      price: 1200,
      change: 5.1,
      currency: 'TZS'
    },
    {
      symbol: 'SCOM',
      name: 'Safaricom',
      market: 'NSE',
      price: 28.5,
      change: 1.2,
      currency: 'KES'
    }
  ];

  const indexes = [
    { name: 'DSE All Share', change: 1.2, market: 'DSE' },
    { name: 'NSE 20', change: 0.8, market: 'NSE' },
    { name: 'EAC Composite', change: 1.5, market: 'Regional' }
  ];

  const baskets = [
    {
      id: 'tz-growth',
      name: language === 'sw' ? 'Ukuaji wa Tanzania' : 'Tanzania Growth',
      stocks: 15,
      performance: 12.3,
      markets: ['DSE']
    },
    {
      id: 'eac-blend',
      name: language === 'sw' ? 'Mchanganyiko wa Afrika Mashariki' : 'East Africa Blend',
      stocks: 25,
      performance: 10.8,
      markets: ['DSE', 'NSE', 'USE', 'RSE']
    },
    {
      id: 'dividend',
      name: language === 'sw' ? 'Viongozi wa Gawio' : 'Dividend Leaders',
      stocks: 12,
      performance: 8.5,
      markets: ['DSE', 'NSE']
    }
  ];

  const filteredStocks = trendingStocks.filter(stock => {
    const matchesMarket = selectedMarket === 'all' || stock.market === selectedMarket;
    const matchesSearch = stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         stock.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMarket && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-zinc-100 z-10">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center hover:bg-zinc-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-zinc-700" />
            </button>
            <h1 className="text-xl font-light">{t.markets}</h1>
          </div>
          <button className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center hover:bg-zinc-100 transition-colors">
            <Search className="w-5 h-5 text-zinc-700" />
          </button>
        </div>

        {/* Market Tabs */}
        <div className="px-6 pb-4 flex gap-2 overflow-x-auto scrollbar-hide">
          {markets.map((market) => (
            <button
              key={market.id}
              onClick={() => setSelectedMarket(market.id as any)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                ${selectedMarket === market.id
                  ? 'bg-black text-white'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }
              `}
            >
              {market.flag} {market.name}
            </button>
          ))}
        </div>
      </div>

      {/* Trending Stocks */}
      <div className="px-6 py-6">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-orange-500" />
          <h2 className="text-xl font-light">{t.trending}</h2>
        </div>

        <div className="space-y-3">
          {filteredStocks.map((stock, index) => (
            <motion.div
              key={stock.symbol}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card
                className="p-4 border-zinc-200 hover:border-zinc-400 transition-all cursor-pointer"
                onClick={() => onNavigate('stock-detail', stock)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs px-2 py-0.5 rounded bg-zinc-100 text-zinc-600">
                        {stock.market}
                      </span>
                      <button className="text-zinc-400 hover:text-yellow-500 transition-colors">
                        <Star className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-base font-medium">{stock.name}</p>
                    <p className="text-2xl font-light mt-1">
                      {stock.currency} {stock.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`flex items-center gap-1 justify-end ${
                      stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stock.change >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="text-sm font-medium">
                        {stock.change >= 0 ? '+' : ''}{stock.change}%
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-zinc-400 mt-2" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Regional Indexes */}
      <div className="px-6 py-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-zinc-700" />
          <h2 className="text-xl font-light">{t.indexes}</h2>
        </div>

        <div className="space-y-3">
          {indexes.map((index, i) => (
            <motion.div
              key={index.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <Card className="p-4 border-zinc-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-zinc-500 mb-1">{index.market}</p>
                    <p className="text-base font-medium">{index.name}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-lg font-medium">+{index.change}%</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* One-Tap Baskets */}
      <div className="px-6 py-6">
        <h2 className="text-xl font-light mb-4">{t.baskets}</h2>

        <div className="space-y-3">
          {baskets.map((basket, i) => (
            <motion.div
              key={basket.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <Card
                className="p-6 border-zinc-200 hover:border-zinc-400 transition-all cursor-pointer"
                onClick={() => onNavigate('basket-detail', basket)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-lg font-medium mb-1">{basket.name}</p>
                    <p className="text-sm text-zinc-500">
                      {basket.stocks} {t.stocks} · {t.diversified}
                    </p>
                    <div className="flex gap-1 mt-2">
                      {basket.markets.map(market => (
                        <span
                          key={market}
                          className="text-xs px-2 py-0.5 rounded bg-zinc-100 text-zinc-600"
                        >
                          {market}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-lg font-medium">+{basket.performance}%</span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1">1 year</p>
                  </div>
                </div>
                <Button className="w-full bg-black text-white hover:bg-zinc-800 h-11">
                  {language === 'sw' ? 'Wekeza Sasa' : 'Invest Now'}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
