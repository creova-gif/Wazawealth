import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ChevronLeft, Search, Info, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

interface TradingScreenProps {
  language: 'sw' | 'en';
  accessToken: string;
  onBack: () => void;
  selectedStock?: string;
}

export function TradingScreen({ language, accessToken, onBack, selectedStock }: TradingScreenProps) {
  const [stocks, setStocks] = useState<any[]>([]);
  const [portfolio, setPortfolio] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStockData, setSelectedStockData] = useState<any>(null);
  const [shares, setShares] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);

  const t = language === 'sw' ? {
    title: 'Jifunze Kuwekeza',
    search: 'Tafuta hisa...',
    available: 'Inapatikana',
    selectStock: 'Chagua hisa',
    stockInfo: 'Maelezo',
    howMany: 'Hisa ngapi?',
    shares: 'Hisa',
    total: 'Jumla',
    review: 'Angalia',
    confirm: 'Thibitisha',
    cancel: 'Sitisha',
    success: 'Umefanikiwa!',
    purchased: 'Umenunua hisa',
    safe: 'Hii ni mazoezi - pesa ni ya kuigiza',
    whatHappens: 'Kinachotokea?',
    explanation: 'Utachukua hisa hizi na bei itafuata soko la DSE. Unaweza kuuza wakati wowote.',
    educational: 'Kwa kujifunza tu',
    viewPortfolio: 'Angalia mkoba wako'
  } : {
    title: 'Learn to Invest',
    search: 'Search stocks...',
    available: 'Available',
    selectStock: 'Select a stock',
    stockInfo: 'About this stock',
    howMany: 'How many shares?',
    shares: 'shares',
    total: 'Total cost',
    review: 'Review',
    confirm: 'Confirm purchase',
    cancel: 'Cancel',
    success: 'Success!',
    purchased: 'You purchased shares',
    safe: 'This is practice - virtual money only',
    whatHappens: 'What happens next?',
    explanation: "You'll own these shares and the price will follow the real DSE market. You can sell anytime.",
    educational: 'Educational only',
    viewPortfolio: 'View your portfolio'
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

      if (selectedStock) {
        const stock = stocksData.stocks?.find((s: any) => s.symbol === selectedStock);
        if (stock) setSelectedStockData(stock);
      }
    } catch (err) {
      console.error('Error loading data:', err);
    }
  };

  const formatCurrency = (amount: number) => {
    return `TZS ${amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  };

  const handlePurchase = async () => {
    if (!selectedStockData || !shares) return;
    
    setLoading(true);
    try {
      const { projectId } = await import('/utils/supabase/info');
      const apiUrl = `https://${projectId}.supabase.co/functions/v1/make-server-f0a5cca3`;

      const response = await fetch(`${apiUrl}/trade`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          symbol: selectedStockData.symbol,
          shares: parseInt(shares),
          action: 'buy'
        })
      });

      if (response.ok) {
        setShowConfirmation(true);
        await loadData();
        setTimeout(() => {
          setShowConfirmation(false);
          setSelectedStockData(null);
          setShares('');
        }, 3000);
      } else {
        const error = await response.json();
        toast.error(error.error || t.error);
      }
    } catch (err) {
      console.error('Trade error:', err);
      toast.error(language === 'sw' ? 'Kuna tatizo' : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const filteredStocks = stocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCost = selectedStockData && shares ? selectedStockData.price * parseInt(shares || '0') : 0;
  const canAfford = portfolio?.balance >= totalCost;

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
                {t.purchased} {selectedStockData?.symbol}
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
            <p className="text-xs text-gray-400 uppercase tracking-wide">{t.educational}</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        {!selectedStockData ? (
          <>
            {/* Available Balance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">
                {t.available}
              </p>
              <h2 className="text-4xl font-bold text-black">
                {formatCurrency(portfolio?.balance || 0)}
              </h2>
            </motion.div>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
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

            {/* Stock List */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-3"
            >
              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-4">
                {t.selectStock}
              </p>
              
              {filteredStocks.map((stock, idx) => (
                <motion.button
                  key={stock.symbol}
                  onClick={() => setSelectedStockData(stock)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.05 }}
                  className="w-full bg-white border-2 border-gray-100 hover:border-gray-300 rounded-2xl p-5 text-left transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-black text-lg mb-1">{stock.symbol}</h3>
                      <p className="text-sm text-gray-500">{stock.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-black text-lg">{formatCurrency(stock.price)}</p>
                      <p className={`text-sm font-medium ${
                        stock.changePercent >= 0 ? 'text-black' : 'text-gray-500'
                      }`}>
                        {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </>
        ) : (
          <>
            {/* Selected Stock Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Stock header */}
              <div>
                <button
                  onClick={() => {
                    setSelectedStockData(null);
                    setShares('');
                  }}
                  className="text-sm text-gray-500 mb-4 hover:text-black transition-colors"
                >
                  ← Back to stocks
                </button>
                
                <h2 className="text-3xl font-bold text-black mb-2">{selectedStockData.symbol}</h2>
                <p className="text-base text-gray-600 mb-4">{selectedStockData.name}</p>
                
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">
                    Current price
                  </p>
                  <p className="text-4xl font-bold text-black">
                    {formatCurrency(selectedStockData.price)}
                  </p>
                </div>
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
                      {t.explanation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Shares input */}
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-3 block">
                  {t.howMany}
                </label>
                <Input
                  type="number"
                  min="1"
                  value={shares}
                  onChange={(e) => setShares(e.target.value)}
                  placeholder="0"
                  className="text-3xl font-bold text-black border-2 border-gray-200 rounded-2xl px-6 py-6 focus:border-black focus:ring-0"
                />
                <p className="text-sm text-gray-500 mt-2">{t.shares}</p>
              </div>

              {/* Total */}
              {shares && parseInt(shares) > 0 && (
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
                      {language === 'sw' ? 'Salio hazishtoshi' : 'Insufficient balance'}
                    </p>
                  )}
                </motion.div>
              )}

              {/* Action buttons */}
              <div className="pt-4 space-y-3">
                <Button
                  onClick={handlePurchase}
                  disabled={!shares || parseInt(shares) <= 0 || !canAfford || loading}
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
                    setSelectedStockData(null);
                    setShares('');
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