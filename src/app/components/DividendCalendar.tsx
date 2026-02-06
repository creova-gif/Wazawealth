import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft, ChevronLeft, ChevronRight, Calendar as CalendarIcon,
  DollarSign, TrendingUp, Sparkles, Bell
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface Props {
  language: 'sw' | 'en';
  onBack: () => void;
}

interface DividendEvent {
  stock: string;
  companyName: string;
  exchange: string;
  exDate: string;
  paymentDate: string;
  amount: number;
  shares: number;
  total: number;
  type: 'Quarterly' | 'Annual' | 'Special';
}

export function DividendCalendar({ language, onBack }: Props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedView, setSelectedView] = useState<'calendar' | 'forecast'>('calendar');

  const microcopy = {
    en: {
      title: 'Dividend Calendar',
      calendar: 'Calendar',
      forecast: 'Income Forecast',
      thisMonth: 'This Month',
      nextMonth: 'Next',
      prevMonth: 'Previous',
      upcomingPayments: 'Upcoming Payments',
      totalExpected: 'Total Expected',
      exDate: 'Ex-Date',
      paymentDate: 'Payment',
      amount: 'Amount',
      shares: 'Shares',
      total: 'Total',
      setReminder: 'Set Reminder',
      aiInsight: 'AI Insight',
      forecastMessage: 'Based on your current holdings, you can expect approximately TZS 85,000 in dividend income over the next 12 months',
      monthlyAverage: 'Monthly Average',
      annualProjection: 'Annual Projection',
      quarterlyBreakdown: 'Quarterly Breakdown',
      q1: 'Q1',
      q2: 'Q2',
      q3: 'Q3',
      q4: 'Q4',
      noPayments: 'No dividend payments',
      thisPeriod: 'this period',
      quarterly: 'Quarterly',
      annual: 'Annual',
      special: 'Special'
    },
    sw: {
      title: 'Kalenda ya Magawio',
      calendar: 'Kalenda',
      forecast: 'Makadirio ya Mapato',
      thisMonth: 'Mwezi Huu',
      nextMonth: 'Ijayo',
      prevMonth: 'Iliyopita',
      upcomingPayments: 'Malipo Yanayokuja',
      totalExpected: 'Jumla Inayotarajiwa',
      exDate: 'Tarehe ya Mwisho',
      paymentDate: 'Malipo',
      amount: 'Kiasi',
      shares: 'Hisa',
      total: 'Jumla',
      setReminder: 'Weka Kikumbusho',
      aiInsight: 'Uchambuzi wa AI',
      forecastMessage: 'Kulingana na vipande vyako vya sasa, unaweza kutarajia takriban TZS 85,000 kwa mapato ya gawio katika miezi 12 ijayo',
      monthlyAverage: 'Wastani wa Mwezi',
      annualProjection: 'Makadirio ya Mwaka',
      quarterlyBreakdown: 'Mgawanyiko wa Robo',
      q1: 'Robo 1',
      q2: 'Robo 2',
      q3: 'Robo 3',
      q4: 'Robo 4',
      noPayments: 'Hakuna malipo ya gawio',
      thisPeriod: 'kipindi hiki',
      quarterly: 'Robo ya Mwaka',
      annual: 'Kila Mwaka',
      special: 'Maalum'
    }
  };

  const t = microcopy[language];

  // Sample dividend events
  const dividendEvents: DividendEvent[] = [
    {
      stock: 'CRDB',
      companyName: 'CRDB Bank',
      exchange: '🇹🇿',
      exDate: '2026-02-01',
      paymentDate: '2026-02-15',
      amount: 28,
      shares: 450,
      total: 12600,
      type: 'Quarterly'
    },
    {
      stock: 'EQUITY',
      companyName: 'Equity Bank',
      exchange: '🇰🇪',
      exDate: '2026-02-10',
      paymentDate: '2026-02-28',
      amount: 12,
      shares: 500,
      total: 6000,
      type: 'Quarterly'
    },
    {
      stock: 'TBL',
      companyName: 'Tanzania Breweries',
      exchange: '🇹🇿',
      exDate: '2026-03-01',
      paymentDate: '2026-03-15',
      amount: 156,
      shares: 100,
      total: 15600,
      type: 'Quarterly'
    }
  ];

  const quarterlyForecast = [
    { quarter: t.q1, amount: 22000, months: ['Jan', 'Feb', 'Mar'] },
    { quarter: t.q2, amount: 21500, months: ['Apr', 'May', 'Jun'] },
    { quarter: t.q3, amount: 20800, months: ['Jul', 'Aug', 'Sep'] },
    { quarter: t.q4, amount: 20700, months: ['Oct', 'Nov', 'Dec'] }
  ];

  const totalAnnual = quarterlyForecast.reduce((sum, q) => sum + q.amount, 0);
  const monthlyAverage = totalAnnual / 12;

  const formatCurrency = (amount: number) => {
    return `TZS ${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'sw-TZ', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getEventsForMonth = (month: Date) => {
    return dividendEvents.filter(event => {
      const paymentDate = new Date(event.paymentDate);
      return (
        paymentDate.getMonth() === month.getMonth() &&
        paymentDate.getFullYear() === month.getFullYear()
      );
    });
  };

  const currentMonthEvents = getEventsForMonth(currentMonth);
  const totalThisMonth = currentMonthEvents.reduce((sum, event) => sum + event.total, 0);

  const changeMonth = (direction: 'next' | 'prev') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'next') {
      newMonth.setMonth(newMonth.getMonth() + 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() - 1);
    }
    setCurrentMonth(newMonth);
  };

  const monthName = currentMonth.toLocaleDateString(language === 'en' ? 'en-US' : 'sw-TZ', {
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-zinc-100 z-10">
        <div className="px-6 py-4 flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center hover:bg-zinc-100"
          >
            <ArrowLeft className="w-5 h-5 text-zinc-700" />
          </button>
          <h1 className="text-xl font-light">{t.title}</h1>
        </div>

        {/* Tabs */}
        <div className="px-6 flex gap-4">
          {[
            { id: 'calendar' as const, label: t.calendar },
            { id: 'forecast' as const, label: t.forecast }
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setSelectedView(id)}
              className={`pb-3 px-2 text-sm font-medium border-b-2 transition-colors ${
                selectedView === id
                  ? 'border-black text-black'
                  : 'border-transparent text-zinc-500 hover:text-zinc-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 pt-6 space-y-6">
        {selectedView === 'calendar' && (
          <>
            {/* Month Navigator */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => changeMonth('prev')}
                className="w-10 h-10 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-light">{monthName}</h2>
              <button
                onClick={() => changeMonth('next')}
                className="w-10 h-10 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Month Summary */}
            <Card className="p-6 bg-green-50 border-green-100">
              <div className="flex items-center gap-3 mb-3">
                <DollarSign className="w-6 h-6 text-green-700" />
                <p className="text-sm font-medium text-green-900">{t.totalExpected}</p>
              </div>
              <p className="text-4xl font-light text-green-900">
                {formatCurrency(totalThisMonth)}
              </p>
              <p className="text-sm text-green-700 mt-2">
                {currentMonthEvents.length} {language === 'en' ? 'payments' : 'malipo'}
              </p>
            </Card>

            {/* Upcoming Payments */}
            <div>
              <h3 className="text-lg font-medium mb-4">{t.upcomingPayments}</h3>
              
              {currentMonthEvents.length > 0 ? (
                <div className="space-y-3">
                  {currentMonthEvents.map((event, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <Card className="border-zinc-200 overflow-hidden">
                        <div className="p-5">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{event.exchange}</span>
                              <div>
                                <p className="text-lg font-medium">{event.stock}</p>
                                <p className="text-sm text-zinc-600">{event.companyName}</p>
                              </div>
                            </div>
                            <span className="text-xs px-2 py-1 rounded bg-zinc-100 text-zinc-600">
                              {event.type}
                            </span>
                          </div>

                          {/* Dates & Amount */}
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-xs text-zinc-500 mb-1">{t.exDate}</p>
                              <p className="text-sm font-medium">{formatDate(event.exDate)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-zinc-500 mb-1">{t.paymentDate}</p>
                              <p className="text-sm font-medium">{formatDate(event.paymentDate)}</p>
                            </div>
                          </div>

                          {/* Calculation */}
                          <div className="p-4 rounded-lg bg-zinc-50 mb-3">
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span className="text-zinc-600">
                                {event.shares} {t.shares} × {formatCurrency(event.amount)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-zinc-200">
                              <span className="text-sm font-medium">{t.total}</span>
                              <span className="text-2xl font-light">{formatCurrency(event.total)}</span>
                            </div>
                          </div>

                          {/* Action */}
                          <Button
                            variant="ghost"
                            className="w-full text-sm"
                            onClick={() => {}}
                          >
                            <Bell className="w-4 h-4 mr-2" />
                            {t.setReminder}
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <Card className="p-12 border-zinc-200 text-center">
                  <CalendarIcon className="w-12 h-12 text-zinc-400 mx-auto mb-3" />
                  <p className="text-base text-zinc-600">
                    {t.noPayments} {t.thisPeriod}
                  </p>
                </Card>
              )}
            </div>
          </>
        )}

        {selectedView === 'forecast' && (
          <>
            {/* AI Insight */}
            <Card className="p-6 bg-blue-50 border-blue-100">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900 mb-1">{t.aiInsight}</p>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    {t.forecastMessage}
                  </p>
                </div>
              </div>
            </Card>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 border-zinc-200">
                <p className="text-xs text-zinc-500 uppercase tracking-wide mb-2">
                  {t.monthlyAverage}
                </p>
                <p className="text-3xl font-light mb-1">{formatCurrency(monthlyAverage)}</p>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>+5.2%</span>
                </div>
              </Card>

              <Card className="p-6 border-zinc-200">
                <p className="text-xs text-zinc-500 uppercase tracking-wide mb-2">
                  {t.annualProjection}
                </p>
                <p className="text-3xl font-light mb-1">{formatCurrency(totalAnnual)}</p>
                <p className="text-sm text-zinc-600">
                  {language === 'en' ? '12 months' : 'Miezi 12'}
                </p>
              </Card>
            </div>

            {/* Quarterly Breakdown */}
            <div>
              <h3 className="text-lg font-medium mb-4">{t.quarterlyBreakdown}</h3>
              <div className="space-y-3">
                {quarterlyForecast.map((quarter, idx) => (
                  <motion.div
                    key={quarter.quarter}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="p-5 border-zinc-200">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-base font-medium">{quarter.quarter}</p>
                          <p className="text-sm text-zinc-600">
                            {quarter.months.join(' • ')}
                          </p>
                        </div>
                        <p className="text-2xl font-light">{formatCurrency(quarter.amount)}</p>
                      </div>

                      {/* Progress Bar */}
                      <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full transition-all duration-1000"
                          style={{ width: `${(quarter.amount / Math.max(...quarterlyForecast.map(q => q.amount))) * 100}%` }}
                        />
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Visual Chart Placeholder */}
            <Card className="p-6 border-zinc-200 h-64 flex items-center justify-center bg-zinc-50">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-zinc-400 mx-auto mb-3" />
                <p className="text-sm text-zinc-600">
                  {language === 'en' ? 'Dividend income trend' : 'Mwelekeo wa mapato ya gawio'}
                </p>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
