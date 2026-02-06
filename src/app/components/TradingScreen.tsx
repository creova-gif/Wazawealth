import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ArrowLeft, TrendingUp, TrendingDown, Search } from "lucide-react";
import { toast } from "sonner";

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
  const [tradeAmount, setTradeAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const t = language === 'sw' ? {
    title: 'Biashara',
    search: 'Tafuta hisa...',
    buy: 'Nunua',
    sell: 'Uza',
    price: 'Bei',
    shares: 'Hisa',
    total: 'Jumla',
    balance: 'Salio',
    execute: 'Tekeleza',
    cancel: 'Ghairi',
    volume: 'Kiasi',
    change: 'Mabadiliko',
    buySuccess: 'Umenunua hisa!',
    sellSuccess: 'Umeuza hisa!',
    error: 'Kuna tatizo',
    insufficientFunds: 'Pesa hazitoshi',
    insufficientShares: 'Hisa hazitoshi'
  } : {
    title: 'Trading',
    search: 'Search stocks...',
    buy: 'Buy',
    sell: 'Sell',
    price: 'Price',
    shares: 'Shares',
    total: 'Total',
    balance: 'Balance',
    execute: 'Execute',
    cancel: 'Cancel',
    volume: 'Volume',
    change: 'Change',
    buySuccess: 'Shares purchased!',
    sellSuccess: 'Shares sold!',
    error: 'An error occurred',
    insufficientFunds: 'Insufficient funds',
    insufficientShares: 'Insufficient shares'
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const { projectId } = await import('@/utils/supabase/info');
      const apiUrl = `https://${projectId}.supabase.co/functions/v1/make-server-f0a5cca3`;

      // Load stocks
      const stocksRes = await fetch(`${apiUrl}/stocks`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      const stocksData = await stocksRes.json();
      setStocks(stocksData.stocks || []);

      // Load portfolio
      const portfolioRes = await fetch(`${apiUrl}/portfolio`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      const portfolioData = await portfolioRes.json();
      setPortfolio(portfolioData);

      // If a stock was pre-selected
      if (selectedStock && stocksData.stocks) {
        const stock = stocksData.stocks.find((s: any) => s.symbol === selectedStock);
        if (stock) {
          setSelectedStockData(stock);
        }
      }
    } catch (err) {
      console.error('Error loading trading data:', err);
    }
  };

  const executeTrade = async (action: 'buy' | 'sell') => {
    if (!selectedStockData || !tradeAmount) return;

    const shares = parseInt(tradeAmount);
    if (isNaN(shares) || shares <= 0) {
      toast.error(t.error);
      return;
    }

    const totalCost = shares * selectedStockData.price;

    // Validation
    if (action === 'buy' && totalCost > portfolio.balance) {
      toast.error(t.insufficientFunds);
      return;
    }

    if (action === 'sell') {
      const position = portfolio.positions.find((p: any) => p.symbol === selectedStockData.symbol);
      if (!position || position.shares < shares) {
        toast.error(t.insufficientShares);
        return;
      }
    }

    setLoading(true);

    try {
      const { projectId } = await import('@/utils/supabase/info');
      const apiUrl = `https://${projectId}.supabase.co/functions/v1/make-server-f0a5cca3`;

      const response = await fetch(`${apiUrl}/trade`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          action,
          symbol: selectedStockData.symbol,
          shares,
          price: selectedStockData.price
        })
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(action === 'buy' ? t.buySuccess : t.sellSuccess);
        setTradeAmount('');
        setSelectedStockData(null);
        loadData();
      } else {
        toast.error(result.error || t.error);
      }
    } catch (err) {
      console.error('Trade execution error:', err);
      toast.error(t.error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return `TZS ${amount.toLocaleString()}`;
  };

  const filteredStocks = stocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={onBack}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold">{t.title}</h1>
          </div>

          <div className="bg-white/20 backdrop-blur rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              <input
                type="text"
                placeholder={t.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none placeholder-white/70"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {selectedStockData ? (
          <Card className="p-6 bg-white">
            <div className="mb-6">
              <button onClick={() => setSelectedStockData(null)} className="text-emerald-600 text-sm mb-4">
                ← {language === 'sw' ? 'Rudi' : 'Back'}
              </button>
              
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedStockData.symbol}</h2>
                  <p className="text-gray-600">{selectedStockData.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(selectedStockData.price)}</p>
                  <div className="flex items-center justify-end gap-1">
                    {selectedStockData.changePercent >= 0 ? (
                      <>
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-600">+{selectedStockData.changePercent.toFixed(2)}%</span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="w-4 h-4 text-red-600" />
                        <span className="text-sm text-red-600">{selectedStockData.changePercent.toFixed(2)}%</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">{t.volume}</p>
                  <p className="font-semibold">{selectedStockData.volume.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t.balance}</p>
                  <p className="font-semibold">{formatCurrency(portfolio?.balance || 0)}</p>
                </div>
              </div>
            </div>

            <Tabs defaultValue="buy" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="buy" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
                  {t.buy}
                </TabsTrigger>
                <TabsTrigger value="sell" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                  {t.sell}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="buy" className="space-y-4 mt-6">
                <div>
                  <Label>{t.shares}</Label>
                  <Input
                    type="number"
                    min="1"
                    value={tradeAmount}
                    onChange={(e) => setTradeAmount(e.target.value)}
                    placeholder="0"
                    className="mt-1"
                  />
                </div>

                {tradeAmount && (
                  <div className="p-4 bg-emerald-50 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">{t.price}:</span>
                      <span className="font-semibold">{formatCurrency(selectedStockData.price)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.total}:</span>
                      <span className="font-bold text-lg">{formatCurrency(parseInt(tradeAmount) * selectedStockData.price)}</span>
                    </div>
                  </div>
                )}

                <Button
                  onClick={() => executeTrade('buy')}
                  disabled={!tradeAmount || loading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6"
                >
                  {loading ? (language === 'sw' ? 'Inasubiri...' : 'Processing...') : `${t.buy} ${selectedStockData.symbol}`}
                </Button>
              </TabsContent>

              <TabsContent value="sell" className="space-y-4 mt-6">
                <div>
                  <Label>{t.shares}</Label>
                  <Input
                    type="number"
                    min="1"
                    value={tradeAmount}
                    onChange={(e) => setTradeAmount(e.target.value)}
                    placeholder="0"
                    className="mt-1"
                  />
                  {portfolio?.positions?.find((p: any) => p.symbol === selectedStockData.symbol) && (
                    <p className="text-sm text-gray-600 mt-1">
                      {language === 'sw' ? 'Una' : 'You have'}: {portfolio.positions.find((p: any) => p.symbol === selectedStockData.symbol).shares} {t.shares.toLowerCase()}
                    </p>
                  )}
                </div>

                {tradeAmount && (
                  <div className="p-4 bg-red-50 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">{t.price}:</span>
                      <span className="font-semibold">{formatCurrency(selectedStockData.price)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.total}:</span>
                      <span className="font-bold text-lg">{formatCurrency(parseInt(tradeAmount) * selectedStockData.price)}</span>
                    </div>
                  </div>
                )}

                <Button
                  onClick={() => executeTrade('sell')}
                  disabled={!tradeAmount || loading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-6"
                >
                  {loading ? (language === 'sw' ? 'Inasubiri...' : 'Processing...') : `${t.sell} ${selectedStockData.symbol}`}
                </Button>
              </TabsContent>
            </Tabs>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredStocks.map((stock, idx) => (
              <Card
                key={idx}
                className="p-4 cursor-pointer hover:shadow-lg transition-shadow bg-white"
                onClick={() => setSelectedStockData(stock)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 text-lg">{stock.symbol}</p>
                    <p className="text-sm text-gray-600">{stock.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{stock.sector}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 text-lg">{formatCurrency(stock.price)}</p>
                    <div className="flex items-center justify-end gap-1">
                      {stock.changePercent >= 0 ? (
                        <>
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-600 font-semibold">+{stock.changePercent.toFixed(2)}%</span>
                        </>
                      ) : (
                        <>
                          <TrendingDown className="w-4 h-4 text-red-600" />
                          <span className="text-sm text-red-600 font-semibold">{stock.changePercent.toFixed(2)}%</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}