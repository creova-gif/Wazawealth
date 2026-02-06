import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, TrendingUp, Sparkles } from 'lucide-react';
import { Card } from './ui/card';

interface Props {
  language: 'sw' | 'en';
  onBack: () => void;
}

export function DividendCalendarScreen({ language, onBack }: Props) {
  const [selectedQuarter, setSelectedQuarter] = useState('Q1');

  const content = {
    sw: {
      title: 'Ratiba ya Gawio',
      expectedQuarter: 'Inatarajiwa Robo Hii',
      upcomingPayments: 'Malipo Yanayokuja',
      annualForecast: 'Makadirio ya Mwaka',
      forecastText: 'Mapato yako ya gawio yanaelekea kuwa TZS 180,000 kwa mwaka',
      paid: 'Imelipwa',
      pending: 'Inasubiri',
      quarters: {
        Q1: 'Robo 1',
        Q2: 'Robo 2',
        Q3: 'Robo 3',
        Q4: 'Robo 4'
      }
    },
    en: {
      title: 'Dividend Calendar',
      expectedQuarter: 'Expected This Quarter',
      upcomingPayments: 'Upcoming Payments',
      annualForecast: 'Annual Forecast',
      forecastText: 'Your dividend income is on track for TZS 180,000/year',
      paid: 'Paid',
      pending: 'Pending',
      quarters: {
        Q1: 'Q1 2026',
        Q2: 'Q2 2026',
        Q3: 'Q3 2026',
        Q4: 'Q4 2026'
      }
    }
  };

  const t = content[language];

  const upcomingDividends = [
    {
      date: 'Jan 15, 2026',
      company: 'CRDB Bank',
      amount: 12000,
      status: 'pending' as const,
      yield: 6.2
    },
    {
      date: 'Jan 22, 2026',
      company: 'Vodacom Tanzania',
      amount: 8500,
      status: 'pending' as const,
      yield: 5.8
    },
    {
      date: 'Feb 05, 2026',
      company: 'NICO Insurance',
      amount: 22000,
      status: 'pending' as const,
      yield: 7.1
    },
    {
      date: 'Dec 20, 2025',
      company: 'Tanzania Breweries',
      amount: 15000,
      status: 'paid' as const,
      yield: 4.5
    }
  ];

  const quarterlyTotals = {
    Q1: 42500,
    Q2: 45000,
    Q3: 46000,
    Q4: 46500
  };

  const pendingTotal = upcomingDividends
    .filter(d => d.status === 'pending')
    .reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="min-h-screen bg-white pb-24">
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

      {/* Expected This Quarter - Hero Card */}
      <div className="px-6 pt-6 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="p-8 border-zinc-200">
            <p className="text-xs text-zinc-500 mb-2 tracking-wide uppercase">
              {t.expectedQuarter}
            </p>
            <div className="flex items-end justify-between mb-4">
              <h2 className="text-6xl font-light tracking-tight">
                {(pendingTotal / 1000).toFixed(1)}K
              </h2>
              <div className="flex items-center gap-1.5 text-green-600 pb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-lg font-medium">+8.2%</span>
              </div>
            </div>
            <p className="text-sm text-zinc-600">
              TZS {pendingTotal.toLocaleString()}
            </p>
          </Card>
        </motion.div>
      </div>

      {/* Quarter Selector */}
      <div className="px-6 py-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {Object.keys(quarterlyTotals).map((quarter) => (
            <button
              key={quarter}
              onClick={() => setSelectedQuarter(quarter)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                ${selectedQuarter === quarter
                  ? 'bg-black text-white'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }
              `}
            >
              {t.quarters[quarter as keyof typeof t.quarters]}
            </button>
          ))}
        </div>
      </div>

      {/* Upcoming Payments */}
      <div className="px-6 py-6">
        <h3 className="text-xl font-light mb-4">{t.upcomingPayments}</h3>
        
        <div className="space-y-3">
          {upcomingDividends.map((dividend, index) => (
            <motion.div
              key={`${dividend.company}-${dividend.date}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className={`p-5 border-zinc-200 ${
                dividend.status === 'paid' ? 'opacity-50' : ''
              }`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-zinc-500" />
                      <p className="text-sm text-zinc-600">{dividend.date}</p>
                    </div>
                    <p className="text-base font-medium">{dividend.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-light">
                      {(dividend.amount / 1000).toFixed(1)}K
                    </p>
                    <p className="text-xs text-zinc-500">
                      {dividend.yield}% yield
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-zinc-500">
                    TZS {dividend.amount.toLocaleString()}
                  </p>
                  <span className={`
                    text-xs px-2 py-1 rounded-full
                    ${dividend.status === 'paid'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-amber-50 text-amber-700'
                    }
                  `}>
                    {dividend.status === 'paid' ? t.paid : t.pending}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Annual Forecast */}
      <div className="px-6 py-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 bg-blue-50 border-blue-100">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900 mb-2">
                  {t.annualForecast}
                </p>
                <p className="text-sm text-blue-800 leading-relaxed">
                  {t.forecastText}
                </p>
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {Object.entries(quarterlyTotals).map(([quarter, amount]) => (
                    <div key={quarter} className="text-center">
                      <p className="text-xs text-blue-700 mb-1">{quarter}</p>
                      <p className="text-sm font-medium text-blue-900">
                        {(amount / 1000).toFixed(0)}K
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
