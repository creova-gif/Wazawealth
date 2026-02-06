import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ChevronLeft, Info, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

interface InvestStoryBasedProps {
  language: 'sw' | 'en';
  accessToken: string;
  onBack: () => void;
}

type InvestmentType = 'stocks' | 'bonds' | 'etfs';

export function InvestStoryBased({ language, accessToken, onBack }: InvestStoryBasedProps) {
  const [activeTab, setActiveTab] = useState<InvestmentType>('stocks');
  const [stocks, setStocks] = useState<any[]>([]);
  const [bonds, setBonds] = useState<any[]>([]);
  const [etfs, setEtfs] = useState<any[]>([]);
  const [portfolio, setPortfolio] = useState<any>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [amount, setAmount] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);

  const t = language === 'sw' ? {
    title: 'Wekeza',
    subtitle: 'Chagua kile unachoamini',
    available: 'Pesa Zinazotumika',
    tabs: {
      stocks: 'Kampuni',
      bonds: 'Bondi',
      etfs: 'Vikundi'
    },
    tabSubtext: {
      stocks: 'Miliki sehemu ya biashara',
      bonds: 'Kopesha serikali',
      etfs: 'Sambaza hatari'
    },
    howMuch: 'Kiasi gani?',
    confirm: 'Thibitisha',
    cancel: 'Sitisha',
    success: 'Umefanikiwa!',
    invested: 'Umewekeza',
    safe: 'Hii ni mazoezi - pesa za kuigiza tu',
    educational: 'Kwa kujifunza tu',
    
    // Story-based content for stocks
    stockStories: {
      'NMB': {
        why: 'Benki kubwa ya Tanzania',
        story: 'NMB inawasaidia Watanzania kwa mikopo, akaunti, na huduma za fedha. Wakati benki inafanya vizuri, hisa yako inaongezeka.',
        risk: 'Wastani'
      },
      'CRDB': {
        why: 'Benki ya jamii',
        story: 'CRDB imeenea Tanzania nzima. Inawasaidia wafanyabiashara wadogo na wakubwa. Ukuaji wao ni ukuaji wako.',
        risk: 'Wastani'
      },
      'TBL': {
        why: 'Biashara ya pombe',
        story: 'Tanzania Breweries inatengeneza bia na vinywaji. Kampuni kubwa na imara. Faida zao zinaendelea vizuri.',
        risk: 'Chini'
      }
    },
    
    bondStories: {
      'TZB-5Y': {
        why: 'Salama na ya kawaida',
        story: 'Serikali inahitaji mkopo kwa miradi ya maendeleo. Wewe unawapa mkopo, wao wanakulipa riba kila mwezi. Baada ya miaka 5, unapata pesa zako zote.',
        guarantee: 'Serikali inaaahidi'
      },
      'TZB-10Y': {
        why: 'Muda mrefu, riba kubwa',
        story: 'Mkopo wa muda mrefu kwa serikali. Riba ni kubwa zaidi kwa sababu unaweka pesa muda mrefu. Nzuri kwa watu wanaopanga mbali.',
        guarantee: 'Serikali inaaahidi'
      }
    },
    
    etfStories: {
      'DSE-ALL': {
        why: 'Wekeza kila mahali',
        story: 'Badala ya kuchagua kampuni moja, hii inakupa sehemu ya kampuni zote za DSE. Ikiwa moja inashuka, nyingine zinaongezeka. Salama zaidi.',
        benefit: 'Hatari ndogo'
      },
      'TZ-BANK': {
        why: 'Benki zote pamoja',
        story: 'Wekeza kwenye benki zote kubwa za Tanzania kwa wakati mmoja. Sekta ya benki ni muhimu sana kwa uchumi. Hii ni njia salama.',
        benefit: 'Sambazwa vizuri'
      }
    }
  } : {
    title: 'Invest',
    subtitle: 'Choose what you believe in',
    available: 'Available to Invest',
    tabs: {
      stocks: 'Companies',
      bonds: 'Bonds',
      etfs: 'Bundles'
    },
    tabSubtext: {
      stocks: 'Own part of a business',
      bonds: 'Lend to government',
      etfs: 'Spread your risk'
    },
    howMuch: 'How much?',
    confirm: 'Confirm',
    cancel: 'Cancel',
    success: 'Success!',
    invested: 'You invested in',
    safe: 'This is practice - virtual money only',
    educational: 'Educational only',
    
    stockStories: {
      'NMB': {
        why: 'A major Tanzanian bank',
        story: 'NMB helps Tanzanians with loans, accounts, and financial services. When the bank does well, your shares grow.',
        risk: 'Medium'
      },
      'CRDB': {
        why: 'A community bank',
        story: 'CRDB has spread across Tanzania. They help small and large businesses. Their growth is your growth.',
        risk: 'Medium'
      },
      'TBL': {
        why: 'Beverage business',
        story: 'Tanzania Breweries makes beer and drinks. A large, stable company. Their profits continue well.',
        risk: 'Low'
      }
    },
    
    bondStories: {
      'TZB-5Y': {
        why: 'Safe and steady',
        story: 'Government needs loans for development projects. You give them a loan, they pay you interest monthly. After 5 years, you get all your money back.',
        guarantee: 'Government guarantees'
      },
      'TZB-10Y': {
        why: 'Longer time, bigger return',
        story: 'A long-term loan to government. Interest is higher because you commit money longer. Good for people planning far ahead.',
        guarantee: 'Government guarantees'
      }
    },
    
    etfStories: {
      'DSE-ALL': {
        why: 'Invest everywhere',
        story: 'Instead of choosing one company, this gives you a piece of all DSE companies. If one drops, others rise. Much safer.',
        benefit: 'Lower risk'
      },
      'TZ-BANK': {
        why: 'All banks together',
        story: 'Invest in all major Tanzanian banks at once. Banking sector is crucial for the economy. This is a safe approach.',
        benefit: 'Well diversified'
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

      // Mock bonds
      setBonds([
        {
          id: 'TZB-5Y',
          name: language === 'sw' ? 'Bondi ya Serikali - Miaka 5' : 'Government Bond 5-Year',
          yield: 12.5,
          maturity: 5,
          minInvestment: 1000000
        },
        {
          id: 'TZB-10Y',
          name: language === 'sw' ? 'Bondi ya Serikali - Miaka 10' : 'Government Bond 10-Year',
          yield: 14.2,
          maturity: 10,
          minInvestment: 1000000
        }
      ]);

      // Mock ETFs
      setEtfs([
        {
          id: 'DSE-ALL',
          symbol: 'DSE ALL',
          name: language === 'sw' ? 'Kikundi cha Hisa Zote' : 'All Companies Fund',
          price: 50000,
          companies: 25
        },
        {
          id: 'TZ-BANK',
          symbol: 'TZ BANK',
          name: language === 'sw' ? 'Kikundi cha Benki' : 'Banking Sector Fund',
          price: 75000,
          companies: 8
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
        // Mock success for bonds/ETFs
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

  const getStory = (item: any) => {
    if (activeTab === 'stocks') {
      return t.stockStories[item.symbol as keyof typeof t.stockStories] || null;
    } else if (activeTab === 'bonds') {
      return t.bondStories[item.id as keyof typeof t.bondStories] || null;
    } else {
      return t.etfStories[item.id as keyof typeof t.etfStories] || null;
    }
  };

  const totalCost = selectedItem && amount ? parseFloat(amount) : 0;
  const canAfford = portfolio?.balance >= totalCost && totalCost > 0;

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
                {t.invested} {selectedItem?.symbol || selectedItem?.name}
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
              <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2">
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
                      onClick={() => setActiveTab(tab)}
                      className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                        activeTab === tab
                          ? 'bg-white text-black shadow-sm'
                          : 'bg-transparent text-gray-400'
                      }`}
                    >
                      <div className="text-sm">{t.tabs[tab]}</div>
                      <div className="text-xs font-normal mt-0.5 opacity-70">
                        {t.tabSubtext[tab]}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Story-based Cards */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              {getCurrentList().map((item, idx) => {
                const story = getStory(item);
                if (!story) return null;
                
                return (
                  <motion.button
                    key={item.id || item.symbol}
                    onClick={() => setSelectedItem(item)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.05 }}
                    className="w-full bg-white border-2 border-gray-100 hover:border-gray-300 rounded-3xl p-6 text-left transition-all"
                  >
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-black mb-2">
                      {activeTab === 'stocks' ? item.symbol : item.name}
                    </h3>
                    
                    {/* Why subtitle */}
                    <p className="text-sm text-gray-500 mb-4">{story.why}</p>
                    
                    {/* Story */}
                    <p className="text-base text-gray-700 leading-relaxed mb-4">
                      {story.story}
                    </p>
                    
                    {/* Footer info */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs text-gray-500 uppercase tracking-wider">
                        {story.risk || story.guarantee || story.benefit}
                      </span>
                      {activeTab === 'stocks' && (
                        <span className="text-lg font-bold text-black">
                          {formatCurrency(item.price)}
                        </span>
                      )}
                      {activeTab === 'bonds' && (
                        <span className="text-lg font-bold text-black">
                          {item.yield}% {language === 'sw' ? 'kwa mwaka' : 'yearly'}
                        </span>
                      )}
                      {activeTab === 'etfs' && (
                        <span className="text-sm text-gray-600">
                          {item.companies} {language === 'sw' ? 'kampuni' : 'companies'}
                        </span>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          </>
        ) : (
          <>
            {/* Investment Amount Screen */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <button
                onClick={() => {
                  setSelectedItem(null);
                  setAmount('');
                }}
                className="text-sm text-gray-500 hover:text-black transition-colors"
              >
                ← {language === 'sw' ? 'Rudi' : 'Back'}
              </button>
              
              <div>
                <h2 className="text-3xl font-bold text-black mb-2">
                  {selectedItem.symbol || selectedItem.name}
                </h2>
                <p className="text-base text-gray-600">
                  {getStory(selectedItem)?.why}
                </p>
              </div>

              {/* Amount input */}
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-3 block">
                  {t.howMuch}
                </label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-300">
                    TZS
                  </span>
                  <Input
                    type="number"
                    min="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    className="text-4xl font-bold text-black border-2 border-gray-200 rounded-2xl pl-28 pr-6 py-8 focus:border-black focus:ring-0"
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 space-y-3">
                <Button
                  onClick={handleInvestment}
                  disabled={!amount || parseFloat(amount) <= 0 || !canAfford || loading}
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

              <p className="text-xs text-gray-400 text-center">{t.educational}</p>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}