import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { TrendingUp, TrendingDown, Wallet, PieChart, Trophy, BookOpen, Bell, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface DashboardProps {
  language: 'sw' | 'en';
  accessToken: string;
  onNavigate: (screen: string) => void;
}

export function Dashboard({ language, accessToken, onNavigate }: DashboardProps) {
  const [portfolio, setPortfolio] = useState<any>(null);
  const [stocks, setStocks] = useState<any[]>([]);
  const [badges, setBadges] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const t = language === 'sw' ? {
    title: 'Dashibodi',
    balance: 'Salio',
    portfolio: 'Mkoba',
    total: 'Jumla',
    positions: 'Hisa Zangu',
    topStocks: 'Hisa Bora DSE',
    recentBadges: 'Medali Mpya',
    viewAll: 'Angalia Zote',
    trade: 'Biashara',
    tutor: 'Mwalimu AI',
    viewBadges: 'Medali',
    noPositions: 'Huna hisa bado. Anza kuuza!',
    change: 'Mabadiliko'
  } : {
    title: 'Dashboard',
    balance: 'Cash Balance',
    portfolio: 'Portfolio',
    total: 'Total Value',
    positions: 'My Positions',
    topStocks: 'Top DSE Stocks',
    recentBadges: 'Recent Badges',
    viewAll: 'View All',
    trade: 'Trade',
    tutor: 'AI Tutor',
    viewBadges: 'Badges',
    noPositions: 'No positions yet. Start trading!',
    change: 'Change'
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const { projectId } = await import('@/utils/supabase/info');
      const apiUrl = `https://${projectId}.supabase.co/functions/v1/make-server-f0a5cca3`;

      // Load portfolio
      const portfolioRes = await fetch(`${apiUrl}/portfolio`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      const portfolioData = await portfolioRes.json();
      setPortfolio(portfolioData);

      // Load stocks
      const stocksRes = await fetch(`${apiUrl}/stocks`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      const stocksData = await stocksRes.json();
      setStocks(stocksData.stocks);

      // Load badges
      const badgesRes = await fetch(`${apiUrl}/badges`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      const badgesData = await badgesRes.json();
      setBadges(badgesData);

    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return `TZS ${amount.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">{language === 'sw' ? 'Inapakia...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">WAZA INVEST</h1>
            <button onClick={() => onNavigate('notifications')} className="relative">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
          </div>

          {/* Account Summary */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-emerald-100 text-sm mb-1">{t.balance}</p>
              <p className="text-xl font-bold">{formatCurrency(portfolio?.balance || 0)}</p>
            </div>
            <div>
              <p className="text-emerald-100 text-sm mb-1">{t.portfolio}</p>
              <p className="text-xl font-bold">{formatCurrency(portfolio?.portfolioValue || 0)}</p>
            </div>
            <div>
              <p className="text-emerald-100 text-sm mb-1">{t.total}</p>
              <p className="text-xl font-bold">{formatCurrency(portfolio?.totalValue || 0)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 -mt-16 pb-8 space-y-4">
        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          <Card 
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow bg-white"
            onClick={() => onNavigate('trade')}
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <p className="font-semibold text-sm">{t.trade}</p>
            </div>
          </Card>

          <Card 
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow bg-white"
            onClick={() => onNavigate('tutor')}
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <BookOpen className="w-6 h-6 text-teal-600" />
              </div>
              <p className="font-semibold text-sm">{t.tutor}</p>
            </div>
          </Card>

          <Card 
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow bg-white"
            onClick={() => onNavigate('badges')}
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Trophy className="w-6 h-6 text-amber-600" />
              </div>
              <p className="font-semibold text-sm">{t.viewBadges}</p>
            </div>
          </Card>
        </div>

        {/* My Positions */}
        <Card className="p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">{t.positions}</h2>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('portfolio')}>
              {t.viewAll}
            </Button>
          </div>

          {portfolio?.positions?.length > 0 ? (
            <div className="space-y-3">
              {portfolio.positions.slice(0, 3).map((position: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{position.symbol}</p>
                    <p className="text-sm text-gray-600">{position.shares} {language === 'sw' ? 'hisa' : 'shares'}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatCurrency(position.currentValue)}</p>
                    <div className="flex items-center justify-end gap-1">
                      {position.profitLoss >= 0 ? (
                        <>
                          <ArrowUpRight className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-600">+{position.profitLossPercent.toFixed(2)}%</span>
                        </>
                      ) : (
                        <>
                          <ArrowDownRight className="w-4 h-4 text-red-600" />
                          <span className="text-sm text-red-600">{position.profitLossPercent.toFixed(2)}%</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <PieChart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>{t.noPositions}</p>
            </div>
          )}
        </Card>

        {/* Top DSE Stocks */}
        <Card className="p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">{t.topStocks}</h2>
          </div>

          <div className="space-y-2">
            {(stocks || []).slice(0, 5).map((stock, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                onClick={() => onNavigate(`stock-${stock.symbol}`)}
              >
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{stock.symbol}</p>
                  <p className="text-sm text-gray-600">{stock.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{formatCurrency(stock.price)}</p>
                  <div className="flex items-center justify-end gap-1">
                    {stock.changePercent >= 0 ? (
                      <>
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-600">+{stock.changePercent.toFixed(2)}%</span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="w-4 h-4 text-red-600" />
                        <span className="text-sm text-red-600">{stock.changePercent.toFixed(2)}%</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Badges */}
        {badges?.earnedBadges?.length > 0 && (
          <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{t.recentBadges}</h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {badges.earnedBadges.slice(0, 3).map((badge: any, idx: number) => (
                <div key={idx} className="flex-shrink-0 text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <p className="font-semibold text-sm">{language === 'sw' ? badge.name : badge.nameEn}</p>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}