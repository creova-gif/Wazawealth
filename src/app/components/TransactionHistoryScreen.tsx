// WAZA WEALTH — Transaction History Screen
// Complete audit trail with filters & export

import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Download, 
  Filter, 
  ArrowUpRight, 
  ArrowDownLeft, 
  DollarSign,
  TrendingUp,
  Banknote
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { mockTransactions } from '@/data/mockPortfolio';
import { formatMoney } from '@/utils/portfolioCalculations';
import { TransactionType } from '@/types/portfolio';

interface Props {
  language: 'sw' | 'en';
  onBack: () => void;
}

type FilterType = 'all' | 'buy' | 'sell' | 'dividend' | 'deposit' | 'withdrawal';

export function TransactionHistoryScreen({ language, onBack }: Props) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [showFilters, setShowFilters] = useState(false);

  const content = {
    sw: {
      history: 'Historia',
      allActivity: 'Shughuli Zote',
      export: 'Hamisha',
      filters: 'Vichujio',
      all: 'Vyote',
      buys: 'Nunua',
      sells: 'Uza',
      dividends: 'Magawio',
      deposits: 'Amana',
      withdrawals: 'Kutoa',
      buy: 'Nunua',
      sell: 'Uza',
      dividend: 'Gawio',
      deposit: 'Amana',
      withdrawal: 'Kutoa',
      fee: 'Ada',
      settled: 'Imesimamishwa',
      pending: 'Inasubiri',
      taxWithheld: 'Kodi Iliyozuiwa',
      fees: 'Ada',
      shares: 'hisa',
      at: 'kwa'
    },
    en: {
      history: 'History',
      allActivity: 'All Activity',
      export: 'Export',
      filters: 'Filters',
      all: 'All',
      buys: 'Buys',
      sells: 'Sells',
      dividends: 'Dividends',
      deposits: 'Deposits',
      withdrawals: 'Withdrawals',
      buy: 'Buy',
      sell: 'Sell',
      dividend: 'Dividend',
      deposit: 'Deposit',
      withdrawal: 'Withdrawal',
      fee: 'Fee',
      settled: 'Settled',
      pending: 'Pending',
      taxWithheld: 'Tax Withheld',
      fees: 'Fees',
      shares: 'shares',
      at: 'at'
    }
  };

  const t = content[language];
  const transactions = mockTransactions;

  // Filter transactions
  const filteredTransactions = filter === 'all' 
    ? transactions 
    : transactions.filter(tx => tx.type === filter);

  // Group by month
  const groupedByMonth = filteredTransactions.reduce((groups, tx) => {
    const monthYear = new Intl.DateTimeFormat(language === 'sw' ? 'sw-TZ' : 'en-US', {
      year: 'numeric',
      month: 'long'
    }).format(tx.tradeDate);
    
    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    groups[monthYear].push(tx);
    return groups;
  }, {} as Record<string, typeof transactions>);

  const getTransactionIcon = (type: TransactionType) => {
    switch (type) {
      case 'buy': return <ArrowDownLeft className="w-4 h-4" />;
      case 'sell': return <ArrowUpRight className="w-4 h-4" />;
      case 'dividend': return <TrendingUp className="w-4 h-4" />;
      case 'deposit': return <ArrowDownLeft className="w-4 h-4" />;
      case 'withdrawal': return <ArrowUpRight className="w-4 h-4" />;
      default: return <DollarSign className="w-4 h-4" />;
    }
  };

  const getTransactionColor = (type: TransactionType) => {
    switch (type) {
      case 'buy': return 'text-blue-600 bg-blue-50';
      case 'sell': return 'text-orange-600 bg-orange-50';
      case 'dividend': return 'text-green-600 bg-green-50';
      case 'deposit': return 'text-purple-600 bg-purple-50';
      case 'withdrawal': return 'text-red-600 bg-red-50';
      default: return 'text-zinc-600 bg-zinc-50';
    }
  };

  const handleExport = () => {
    // In production, generate CSV/PDF
    console.log('Exporting transactions...');
    alert(language === 'sw' 
      ? 'Kuhamisha kwa CSV/PDF kutakuja hivi karibuni'
      : 'Export to CSV/PDF coming soon');
  };

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
            <h1 className="text-xl font-light">{t.history}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center hover:bg-zinc-100"
            >
              <Filter className="w-5 h-5 text-zinc-700" />
            </button>
            <button
              onClick={handleExport}
              className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center hover:bg-zinc-100"
            >
              <Download className="w-5 h-5 text-zinc-700" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="border-t border-zinc-100 px-6 py-4"
          >
            <div className="flex gap-2 flex-wrap">
              {(['all', 'buy', 'sell', 'dividend', 'deposit', 'withdrawal'] as FilterType[]).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    filter === f
                      ? 'bg-black text-white'
                      : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                  }`}
                >
                  {t[f === 'all' ? 'all' : `${f}s` as keyof typeof t] || f}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Transactions by Month */}
      <div className="px-6 py-6">
        {Object.keys(groupedByMonth).length === 0 && (
          <Card className="p-12 border-zinc-200 text-center">
            <Banknote className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
            <p className="text-zinc-500">
              {language === 'sw' 
                ? 'Hakuna shughuli bado'
                : 'No transactions yet'}
            </p>
          </Card>
        )}

        {Object.entries(groupedByMonth).map(([month, txs], monthIdx) => (
          <div key={month} className="mb-8">
            <h3 className="text-sm font-medium text-zinc-500 mb-3 uppercase tracking-wide">
              {month}
            </h3>
            <div className="space-y-2">
              {txs.map((tx, idx) => (
                <motion.div
                  key={tx.transactionId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (monthIdx * 0.1) + (idx * 0.05) }}
                >
                  <Card className="p-4 border-zinc-200 hover:border-zinc-300 transition-colors">
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        getTransactionColor(tx.type)
                      }`}>
                        {getTransactionIcon(tx.type)}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <p className="font-medium capitalize">
                              {t[tx.type as keyof typeof t] || tx.type}
                              {tx.assetSymbol && ` · ${tx.assetSymbol}`}
                            </p>
                            <p className="text-xs text-zinc-500">
                              {tx.tradeDate.toLocaleDateString(language === 'sw' ? 'sw-TZ' : 'en-US')}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className={`font-medium ${
                              tx.type === 'buy' || tx.type === 'withdrawal' ? 'text-red-600' : 
                              tx.type === 'sell' || tx.type === 'deposit' || tx.type === 'dividend' ? 'text-green-600' :
                              'text-zinc-900'
                            }`}>
                              {tx.type === 'buy' || tx.type === 'withdrawal' ? '-' : '+'}
                              {formatMoney(tx.amount)}
                            </p>
                          </div>
                        </div>

                        {/* Transaction details */}
                        {tx.quantity && tx.price && (
                          <p className="text-xs text-zinc-600 mb-2">
                            {tx.quantity} {t.shares} {t.at} {formatMoney(tx.price)}
                          </p>
                        )}

                        {/* Fees & Tax */}
                        {(tx.totalFees.amount > 0 || tx.taxWithheld) && (
                          <div className="flex items-center gap-3 text-xs text-zinc-500 pt-2 border-t border-zinc-100">
                            {tx.totalFees.amount > 0 && (
                              <span>{t.fees}: {formatMoney(tx.totalFees)}</span>
                            )}
                            {tx.taxWithheld && (
                              <span>{t.taxWithheld}: {formatMoney(tx.taxWithheld)}</span>
                            )}
                          </div>
                        )}

                        {/* Status */}
                        <div className="mt-2">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${
                            tx.status === 'settled' ? 'bg-green-100 text-green-700' :
                            tx.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-zinc-100 text-zinc-700'
                          }`}>
                            {t[tx.status as keyof typeof t] || tx.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
