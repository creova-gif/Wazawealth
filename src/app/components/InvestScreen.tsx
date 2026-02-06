import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ChevronLeft, Search, Info, CheckCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

interface InvestScreenProps {
  language: 'sw' | 'en';
  accessToken: string;
  onBack: () => void;
}

type InvestmentType = 'stocks' | 'bonds' | 'etfs';

export function InvestScreen({ language, accessToken, onBack }: InvestScreenProps) {
  const [activeTab, setActiveTab] = useState<InvestmentType>('stocks');
  const [stocks, setStocks] = useState<any[]>([]);
  const [bonds, setBonds] = useState<any[]>([]);
  const [etfs, setEtfs] = useState<any[]>([]);
  const [portfolio, setPortfolio] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [amount, setAmount] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);

  const t = language === 'sw' ? {
    title: 'Wekeza',
    subtitle: 'Chagua jinsi ya kuweka pesa zako',
    available: 'Pesa Zinazotumika',
    search: 'Tafuta...',
    tabs: {
      stocks: 'Hisa',
      bonds: 'Bondi',
      etfs: 'Vikundi'
    },
    tabExplainers: {
      stocks: 'Sehemu za kampuni',
      bonds: 'Mkopo wa serikali',
      etfs: 'Kikundi cha hisa nyingi'
    },
    selectItem: 'Chagua',
    howMuch: 'Kiasi gani?',
    total: 'Jumla',
    confirm: 'Thibitisha',
    cancel: 'Sitisha',
    success: 'Umefanikiwa!',
    purchased: 'Umewekeza',
    safe: 'Hii ni mazoezi - pesa za kuigiza tu',
    whatHappens: 'Kinachotokea?',
    stockExplanation: 'Utamiliki sehemu ndogo ya kampuni hii. Bei itafuata soko la DSE.',
    bondExplanation: 'Serikali itakulipa riba kila mwezi na kukurudishia pesa baadaye.',
    etfExplanation: 'Utawekeza kwenye kampuni nyingi kwa wakati mmoja - salama zaidi.',
    educational: 'Kwa kujifunza tu',
    viewPortfolio: 'Angalia mkoba wako',
    price: 'Bei',
    yield: 'Faida ya Mwaka',
    maturity: 'Muda',
    years: 'miaka',
    minInvestment: 'Kiwango cha Chini',
    companies: 'kampuni',
    diversified: 'Imesambaziwa',
    infoCards: {
      stocks: {
        title: 'Hisa ni nini?',
        content: 'Ni sehemu ndogo ya kampuni. Unapokuwa na hisa, wewe ni mmiliki mdogo wa kampuni hiyo.'
      },
      bonds: {
        title: 'Bondi ni nini?',
        content: 'Ni mkopo unaompa serikali. Wao watakulipa riba kila mwezi hadi muda utakapoisha.'
      },
      etfs: {
        title: 'Kikundi ni nini?',
        content: 'Badala ya kununua hisa moja, unawekeza kwenye kampuni nyingi kwa wakati mmoja. Salama zaidi.'
      }
    }
  } : {
    title: 'Invest',
    subtitle: 'Choose how to grow your money',
    available: 'Available to Invest',
    search: 'Search...',
    tabs: {
      stocks: 'Stocks',
      bonds: 'Bonds',
      etfs: 'ETFs'
    },
    tabExplainers: {
      stocks: 'Own part of companies',
      bonds: 'Lend to government',
      etfs: 'Bundle of many stocks'
    },
    selectItem: 'Select',
    howMuch: 'How much?',
    total: 'Total cost',
    confirm: 'Confirm investment',
    cancel: 'Cancel',
    success: 'Success!',
    purchased: 'You invested in',
    safe: 'This is practice - virtual money only',
    whatHappens: 'What happens next?',
    stockExplanation: "You'll own a small part of this company. Price follows the real DSE market.",
    bondExplanation: 'Government pays you interest monthly and returns your money later.',
    etfExplanation: "You'll invest in many companies at once - safer and more balanced.",
    educational: 'Educational only',
    viewPortfolio: 'View your portfolio',
    price: 'Price',
    yield: 'Yearly Return',
    maturity: 'Duration',
    years: 'years',
    minInvestment: 'Minimum',
    companies: 'companies',
    diversified: 'Diversified',
    infoCards: {
      stocks: {
        title: 'What are stocks?',
        content: 'A stock is a small piece of a company. When you own stock, you are a small owner of that company.'
      },
      bonds: {
        title: 'What are bonds?',
        content: 'A bond is a loan you give to the government. They pay you interest monthly until the time period ends.'
      },
      etfs: {
        title: 'What are ETFs?',
        content: 'Instead of buying one stock, you invest in many companies at once. Safer and more balanced.'
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const { projectId } = await import('@/utils/supabase/info');
      const apiUrl = `https://${projectId}.supabase.co/functions/v1/make-server-f0a5cca3`;

      const [stocksRes, portfolioRes] = await Promise.all([
        fetch(`${apiUrl}/stocks`, { headers: { 'Authorization': `Bearer ${accessToken}` } }),
        fetch(`${apiUrl}/portfolio`, { headers: { 'Authorization': `Bearer ${accessToken}` } })
      ]);

      const stocksData = await stocksRes.json();
      const portfolioData = await portfolioRes.json();

      setStocks(stocksData.stocks || []);
      setPortfolio(portfolioData);

      // Mock bonds data (in production, this would come from API)
      setBonds([
        {
          id: 'TZB-5Y',
          name: 'Tanzania Government Bond 5-Year',
          nameSwahili: 'Bondi ya Serikali - Miaka 5',
          yield: 12.5,
          maturity: 5,
          minInvestment: 1000000,
          type: 'government'
        },
        {
          id: 'TZB-10Y',
          name: 'Tanzania Government Bond 10-Year',
          nameSwahili: 'Bondi ya Serikali - Miaka 10',
          yield: 14.2,
          maturity: 10,
          minInvestment: 1000000,
          type: 'government'
        },
        {
          id: 'TZB-2Y',
          name: 'Treasury Bill 2-Year',
          nameSwahili: 'Hundi ya Hazina - Miaka 2',
          yield: 10.8,
          maturity: 2,
          minInvestment: 500000,
          type: 'treasury'
        }
      ]);

      // Mock ETF data
      setEtfs([
        {
          id: 'DSE-ALL',
          symbol: 'DSE ALL',
          name: 'DSE All Share Index Fund',
          nameSwahili: 'Kikundi cha Hisa Zote DSE',
          price: 50000,
          companies: 25,
          description: 'Invest in all companies listed on DSE'
        },
        {
          id: 'TZ-BANK',
          symbol: 'TZ BANK',
          name: 'Tanzania Banking Sector Fund',
          nameSwahili: 'Kikundi cha Benki za Tanzania',
          price: 75000,
          companies: 8,
          description: 'Focus on banking sector'
        },
        {
          id: 'TZ-TELECOM',
          symbol: 'TZ TELECOM',
          name: 'Tanzania Telecom Fund',
          nameSwahili: 'Kikundi cha Mawasiliano',
          price: 60000,
          companies: 5,
          description: 'Telecommunications companies'
        }
      ]);
    } catch (err) {
      console.error('Error loading data:', err);
    }
  };

  const formatCurrency = (amount: number) => {
    return `TZS ${amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  };

  const handleInvestment = async () => {
    if (!selectedItem || !amount) return;
    
    setLoading(true);
    try {
      const { projectId } = await import('@/utils/supabase/info');
      const apiUrl = `https://${projectId}.supabase.co/functions/v1/make-server-f0a5cca3`;

      // For stocks, use existing trade endpoint
      if (activeTab === 'stocks') {
        const shares = Math.floor(parseFloat(amount) / selectedItem.price);
        const response = await fetch(`${apiUrl}/trade`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            symbol: selectedItem.symbol,
            shares: shares,
            action: 'buy'
          })
        });

        if (response.ok) {
          setShowConfirmation(true);
          await loadData();
          setTimeout(() => {
            setShowConfirmation(false);
            setSelectedItem(null);
            setAmount('');
          }, 3000);
        } else {
          const error = await response.json();
          toast.error(error.error || (language === 'sw' ? 'Kuna tatizo' : 'An error occurred'));
        }
      } else {
        // For bonds and ETFs, show success (mock for now)
        setShowConfirmation(true);
        setTimeout(() => {
          setShowConfirmation(false);
          setSelectedItem(null);
          setAmount('');
        }, 3000);
      }
    } catch (err) {
      console.error('Investment error:', err);
      toast.error(language === 'sw' ? 'Kuna tatizo' : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentList = () => {
    switch (activeTab) {
      case 'stocks': return stocks;
      case 'bonds': return bonds;
      case 'etfs': return etfs;
    }
  };

  const filteredItems = getCurrentList().filter(item => {
    const searchLower = searchTerm.toLowerCase();
    if (activeTab === 'stocks') {
      return item.symbol.toLowerCase().includes(searchLower) || 
             item.name.toLowerCase().includes(searchLower);
    } else if (activeTab === 'bonds') {
      return item.name.toLowerCase().includes(searchLower) || 
             (language === 'sw' && item.nameSwahili.toLowerCase().includes(searchLower));
    } else {
      return item.symbol.toLowerCase().includes(searchLower) || 
             item.name.toLowerCase().includes(searchLower);
    }
  });

  const totalCost = selectedItem && amount ? parseFloat(amount) : 0;
  const canAfford = portfolio?.balance >= totalCost && totalCost > 0;

  // Check minimum investment for bonds
  const meetsMinimum = activeTab === 'bonds' 
    ? totalCost >= (selectedItem?.minInvestment || 0)
    : true;

  return (
    <div className="min-h-screen bg-white">
      {/* Success Overlay */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-center max-w-sm"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>
              
              <h2 className="text-3xl font-bold text-black mb-3">{t.success}</h2>
              <p className="text-base text-gray-600 mb-2">
                {t.purchased} {selectedItem?.symbol || selectedItem?.name}
              </p>
              <p className="text-sm text-gray-400">{t.safe}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-50 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-black" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-black">{t.title}</h1>
            <p className="text-xs text-gray-400">{t.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-6">
        {!selectedItem ? (
          <>
            {/* Available Balance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">
                {t.available}
              </p>
              <h2 className="text-4xl font-bold text-black">
                {formatCurrency(portfolio?.balance || 0)}
              </h2>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              <div className="bg-gray-50 rounded-2xl p-1.5 border border-gray-100">
                <div className="grid grid-cols-3 gap-1">
                  {(['stocks', 'bonds', 'etfs'] as InvestmentType[]).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab);
                        setSearchTerm('');
                      }}
                      className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                        activeTab === tab
                          ? 'bg-white text-black shadow-sm'
                          : 'bg-transparent text-gray-500'
                      }`}
                    >
                      <div className="text-sm">{t.tabs[tab]}</div>
                      <div className="text-xs font-normal mt-0.5 opacity-70">
                        {t.tabExplainers[tab]}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-5 border-2 border-gray-100 mb-6"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Info className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-black text-sm mb-1">
                    {t.infoCards[activeTab].title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {t.infoCards[activeTab].content}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder={t.search}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-black focus:ring-0 text-base"
                />
              </div>
            </motion.div>

            {/* List */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-3"
            >
              {filteredItems.map((item, idx) => (
                <motion.button
                  key={item.id || item.symbol}
                  onClick={() => setSelectedItem(item)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.05 }}
                  className="w-full bg-white border-2 border-gray-100 hover:border-gray-300 rounded-2xl p-5 text-left transition-all"
                >
                  {activeTab === 'stocks' && (
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-black text-lg mb-1">{item.symbol}</h3>
                        <p className="text-sm text-gray-500">{item.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-black text-lg">{formatCurrency(item.price)}</p>
                        <p className={`text-sm font-medium ${
                          item.changePercent >= 0 ? 'text-black' : 'text-gray-500'
                        }`}>
                          {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'bonds' && (
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-black text-lg mb-1">
                            {language === 'sw' ? item.nameSwahili : item.name}
                          </h3>
                          <p className="text-xs text-gray-500">{item.maturity} {t.years}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-black text-lg">{item.yield}%</p>
                          <p className="text-xs text-gray-500">{t.yield}</p>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-500">
                          {t.minInvestment}: {formatCurrency(item.minInvestment)}
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'etfs' && (
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-black text-lg mb-1">{item.symbol}</h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {language === 'sw' ? item.nameSwahili : item.name}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                            {item.companies} {t.companies}
                          </span>
                          <span className="text-xs text-gray-500">{t.diversified}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-black text-lg">{formatCurrency(item.price)}</p>
                      </div>
                    </div>
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        ) : (
          <>
            {/* Selected Item Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Back button */}
              <button
                onClick={() => {
                  setSelectedItem(null);
                  setAmount('');
                }}
                className="text-sm text-gray-500 hover:text-black transition-colors"
              >
                ← {language === 'sw' ? 'Rudi' : 'Back'}
              </button>
              
              {/* Item header */}
              <div>
                <h2 className="text-3xl font-bold text-black mb-2">
                  {selectedItem.symbol || (language === 'sw' ? selectedItem.nameSwahili : selectedItem.name)}
                </h2>
                <p className="text-base text-gray-600 mb-4">
                  {activeTab === 'stocks' && selectedItem.name}
                  {activeTab === 'bonds' && `${selectedItem.maturity} ${t.years} • ${selectedItem.yield}% ${t.yield}`}
                  {activeTab === 'etfs' && `${selectedItem.companies} ${t.companies}`}
                </p>
                
                {activeTab === 'stocks' && (
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">
                      {t.price}
                    </p>
                    <p className="text-4xl font-bold text-black">
                      {formatCurrency(selectedItem.price)}
                    </p>
                  </div>
                )}

                {activeTab === 'bonds' && (
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">
                          {t.yield}
                        </p>
                        <p className="text-3xl font-bold text-black">{selectedItem.yield}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">
                          {t.maturity}
                        </p>
                        <p className="text-3xl font-bold text-black">{selectedItem.maturity} {language === 'sw' ? 'miaka' : 'yrs'}</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'etfs' && (
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">
                      {t.price}
                    </p>
                    <p className="text-4xl font-bold text-black">
                      {formatCurrency(selectedItem.price)}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      {selectedItem.companies} {t.companies} • {t.diversified}
                    </p>
                  </div>
                )}
              </div>

              {/* Info card */}
              <div className="bg-white rounded-2xl p-5 border-2 border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Info className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black text-sm mb-1">{t.whatHappens}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {activeTab === 'stocks' && t.stockExplanation}
                      {activeTab === 'bonds' && t.bondExplanation}
                      {activeTab === 'etfs' && t.etfExplanation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Amount input */}
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-3 block">
                  {t.howMuch}
                </label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">
                    TZS
                  </span>
                  <Input
                    type="number"
                    min="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    className="text-3xl font-bold text-black border-2 border-gray-200 rounded-2xl pl-28 pr-6 py-6 focus:border-black focus:ring-0"
                  />
                </div>
                {activeTab === 'bonds' && (
                  <p className="text-xs text-gray-500 mt-2">
                    {t.minInvestment}: {formatCurrency(selectedItem.minInvestment)}
                  </p>
                )}
              </div>

              {/* Summary */}
              {amount && parseFloat(amount) > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">{t.total}</span>
                    <span className="text-2xl font-bold text-black">{formatCurrency(totalCost)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{t.available}</span>
                    <span className="text-sm font-medium text-gray-900">{formatCurrency(portfolio?.balance || 0)}</span>
                  </div>
                  
                  {!canAfford && (
                    <p className="text-xs text-gray-600 mt-3">
                      {language === 'sw' ? 'Pesa hazitoshi' : 'Insufficient balance'}
                    </p>
                  )}
                  
                  {activeTab === 'bonds' && !meetsMinimum && (
                    <p className="text-xs text-gray-600 mt-3">
                      {language === 'sw' 
                        ? `Kiwango cha chini ni ${formatCurrency(selectedItem.minInvestment)}`
                        : `Minimum investment is ${formatCurrency(selectedItem.minInvestment)}`}
                    </p>
                  )}
                </motion.div>
              )}

              {/* Action buttons */}
              <div className="pt-4 space-y-3">
                <Button
                  onClick={handleInvestment}
                  disabled={!amount || parseFloat(amount) <= 0 || !canAfford || !meetsMinimum || loading}
                  className="w-full bg-black text-white py-6 rounded-full font-semibold hover:bg-gray-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mx-auto"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  ) : (
                    t.confirm
                  )}
                </Button>
                
                <button
                  onClick={() => {
                    setSelectedItem(null);
                    setAmount('');
                  }}
                  className="w-full text-gray-600 py-4 rounded-full font-medium hover:text-black transition-colors"
                >
                  {t.cancel}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}