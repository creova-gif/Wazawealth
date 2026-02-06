import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, X, ChevronRight, Calendar, Clock, TrendingUp,
  Sparkles, Info, Check, AlertCircle, CreditCard, Building2
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface Props {
  language: 'sw' | 'en';
  onClose: () => void;
  onComplete: (trade: ScheduledTrade) => void;
  preSelectedStock?: {
    symbol: string;
    name: string;
    currentPrice: number;
    exchange: string;
  };
}

interface ScheduledTrade {
  stock: string;
  amount: number;
  schedule: 'once' | 'daily' | 'weekly' | 'monthly';
  scheduleDate?: string;
  dayOfWeek?: number;
  dayOfMonth?: number;
  condition?: {
    type: 'price-above' | 'price-below' | 'none';
    targetPrice?: number;
  };
  fundingSource: string;
}

export function ScheduledTradeFlow({ language, onClose, onComplete, preSelectedStock }: Props) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedStock, setSelectedStock] = useState(preSelectedStock || null);
  const [amount, setAmount] = useState(100000);
  const [schedule, setSchedule] = useState<'once' | 'daily' | 'weekly' | 'monthly'>('monthly');
  const [scheduleDate, setScheduleDate] = useState<string>('');
  const [dayOfWeek, setDayOfWeek] = useState(1); // Monday
  const [dayOfMonth, setDayOfMonth] = useState(1);
  const [conditionType, setConditionType] = useState<'price-above' | 'price-below' | 'none'>('none');
  const [targetPrice, setTargetPrice] = useState(0);
  const [fundingSource, setFundingSource] = useState('waza-account');
  const [showFundingOptions, setShowFundingOptions] = useState(false);

  const microcopy = {
    en: {
      title: 'Schedule Trade',
      step: 'Step',
      of: 'of',
      // Step 1
      selectStock: 'What do you want to invest in?',
      searchStocks: 'Search stocks...',
      popularChoices: 'Popular Choices',
      // Step 2
      howMuch: 'How much?',
      quickAmounts: 'Quick amounts',
      willBuy: 'This will buy approximately',
      shares: 'shares',
      fundingFrom: 'Funding from',
      changeFunding: 'Change',
      // Step 3
      whenSchedule: 'When should this happen?',
      once: 'Once (specific date)',
      daily: 'Daily',
      weekly: 'Weekly',
      monthly: 'Monthly',
      on: 'On',
      starting: 'Starting',
      selectDate: 'Select date',
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      everyMonth: 'Every month on the',
      addCondition: 'Add a condition?',
      noCondition: 'No condition',
      priceBelow: 'Only if price drops to',
      priceAbove: 'Only if price rises to',
      currentPrice: 'Current price',
      // Step 4
      reviewTrade: 'Review your scheduled trade',
      stock: 'Stock',
      investment: 'Investment',
      scheduleLabel: 'Schedule',
      condition: 'Condition',
      onlyIf: 'Only if',
      aiInsight: 'AI Insight',
      aiMessage: 'Scheduling this trade helps you maintain your investment plan consistently',
      disclaimer: 'Funds will be deducted when the trade executes. You can cancel anytime.',
      confirmTrade: 'Confirm Trade',
      // Success
      successTitle: 'Trade Scheduled',
      successMessage: 'Your recurring investment starts on',
      viewSchedule: 'View Schedule',
      done: 'Done',
      // Common
      continue: 'Continue',
      back: 'Back',
      cancel: 'Cancel',
      edit: 'Edit'
    },
    sw: {
      title: 'Panga Biashara',
      step: 'Hatua',
      of: 'ya',
      // Step 1
      selectStock: 'Unataka kuwekeza nini?',
      searchStocks: 'Tafuta hisa...',
      popularChoices: 'Chaguo Maarufu',
      // Step 2
      howMuch: 'Kiasi gani?',
      quickAmounts: 'Kiasi cha haraka',
      willBuy: 'Hii itanunua takriban',
      shares: 'hisa',
      fundingFrom: 'Fedha kutoka',
      changeFunding: 'Badilisha',
      // Step 3
      whenSchedule: 'Hii inatokea lini?',
      once: 'Mara moja (tarehe maalum)',
      daily: 'Kila siku',
      weekly: 'Kila wiki',
      monthly: 'Kila mwezi',
      on: 'Siku ya',
      starting: 'Kuanzia',
      selectDate: 'Chagua tarehe',
      monday: 'Jumatatu',
      tuesday: 'Jumanne',
      wednesday: 'Jumatano',
      thursday: 'Alhamisi',
      friday: 'Ijumaa',
      everyMonth: 'Kila mwezi tarehe',
      addCondition: 'Ongeza hali?',
      noCondition: 'Hakuna hali',
      priceBelow: 'Tu kama bei inashuka hadi',
      priceAbove: 'Tu kama bei inapanda hadi',
      currentPrice: 'Bei ya sasa',
      // Step 4
      reviewTrade: 'Kagua biashara yako iliyopangwa',
      stock: 'Hisa',
      investment: 'Uwekezaji',
      scheduleLabel: 'Mpangilio',
      condition: 'Hali',
      onlyIf: 'Tu kama',
      aiInsight: 'Uchambuzi wa AI',
      aiMessage: 'Kupanga biashara hii kunakusaidia kuendelea na mpango wako wa uwekezaji',
      disclaimer: 'Fedha zitachukuliwa biashara inapotekelezwa. Unaweza kughairi wakati wowote.',
      confirmTrade: 'Thibitisha Biashara',
      // Success
      successTitle: 'Biashara Imepangwa',
      successMessage: 'Uwekezaji wako wa mara kwa mara unaanza',
      viewSchedule: 'Angalia Mpangilio',
      done: 'Imekamilika',
      // Common
      continue: 'Endelea',
      back: 'Rudi',
      cancel: 'Ghairi',
      edit: 'Hariri'
    }
  };

  const t = microcopy[language];

  const popularStocks = [
    { symbol: 'CRDB', name: 'CRDB Bank', price: 450, exchange: 'DSE' },
    { symbol: 'SAFARICOM', name: 'Safaricom PLC', price: 31.2, exchange: 'NSE' },
    { symbol: 'EQUITY', name: 'Equity Bank', price: 45.5, exchange: 'NSE' }
  ];

  const weekDays = language === 'en' 
    ? ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    : ['Jumatatu', 'Jumanne', 'Jumatano', 'Alhamisi', 'Ijumaa'];

  const formatCurrency = (amount: number) => {
    return `TZS ${amount.toLocaleString()}`;
  };

  const getScheduleText = () => {
    if (schedule === 'once') {
      return scheduleDate || t.selectDate;
    }
    if (schedule === 'daily') {
      return language === 'en' ? 'Every day' : 'Kila siku';
    }
    if (schedule === 'weekly') {
      return `${language === 'en' ? 'Every' : 'Kila'} ${weekDays[dayOfWeek]}`;
    }
    if (schedule === 'monthly') {
      return `${t.everyMonth} ${dayOfMonth}`;
    }
  };

  const handleComplete = () => {
    const trade: ScheduledTrade = {
      stock: selectedStock!.symbol,
      amount,
      schedule,
      scheduleDate: schedule === 'once' ? scheduleDate : undefined,
      dayOfWeek: schedule === 'weekly' ? dayOfWeek : undefined,
      dayOfMonth: schedule === 'monthly' ? dayOfMonth : undefined,
      condition: conditionType !== 'none' 
        ? { type: conditionType, targetPrice }
        : undefined,
      fundingSource
    };
    onComplete(trade);
  };

  const canContinue = () => {
    if (step === 1) return selectedStock !== null;
    if (step === 2) return amount > 0;
    if (step === 3) {
      if (schedule === 'once') return scheduleDate !== '';
      return true;
    }
    return true;
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-zinc-100 z-20">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {step > 1 ? (
              <button
                onClick={() => setStep((step - 1) as any)}
                className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center hover:bg-zinc-100"
              >
                <ArrowLeft className="w-5 h-5 text-zinc-700" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center hover:bg-zinc-100"
              >
                <X className="w-5 h-5 text-zinc-700" />
              </button>
            )}
            <h1 className="text-xl font-light">{t.title}</h1>
          </div>
          <div className="text-sm text-zinc-500">
            {t.step} {step} {t.of} 4
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-zinc-100">
          <motion.div
            className="h-full bg-black"
            initial={{ width: '0%' }}
            animate={{ width: `${(step / 4) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Select Stock */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-light mb-6">{t.selectStock}</h2>

              {/* Search */}
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder={t.searchStocks}
                  className="w-full h-14 px-4 border-2 border-zinc-200 rounded-xl text-base focus:border-black focus:ring-2 focus:ring-zinc-100 transition-all"
                />
              </div>

              {/* Popular Choices */}
              <div>
                <p className="text-sm text-zinc-500 mb-3">{t.popularChoices}</p>
                <div className="space-y-3">
                  {popularStocks.map((stock) => (
                    <Card
                      key={stock.symbol}
                      className={`p-5 cursor-pointer transition-all ${
                        selectedStock?.symbol === stock.symbol
                          ? 'border-2 border-black bg-zinc-50'
                          : 'border-2 border-zinc-200 hover:border-zinc-400'
                      }`}
                      onClick={() => setSelectedStock(stock)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-lg font-medium">{stock.symbol}</p>
                            <span className="text-xs px-2 py-0.5 rounded bg-zinc-100 text-zinc-600">
                              {stock.exchange}
                            </span>
                          </div>
                          <p className="text-sm text-zinc-600">{stock.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-light">{formatCurrency(stock.price)}</p>
                          {selectedStock?.symbol === stock.symbol && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="mt-1"
                            >
                              <Check className="w-5 h-5 text-black ml-auto" />
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Amount & Funding */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-light mb-6">{t.howMuch}</h2>

              {/* Amount Input */}
              <div className="mb-6">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-lg">
                    TZS
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full h-20 pl-20 pr-4 border-2 border-zinc-200 rounded-xl text-4xl font-light focus:border-black focus:ring-2 focus:ring-zinc-100 transition-all"
                  />
                </div>

                {/* Quick Amounts */}
                <div className="mt-4">
                  <p className="text-sm text-zinc-500 mb-2">{t.quickAmounts}</p>
                  <div className="grid grid-cols-4 gap-2">
                    {[50000, 100000, 250000, 500000].map(amt => (
                      <button
                        key={amt}
                        onClick={() => setAmount(amt)}
                        className={`h-12 rounded-lg text-sm font-medium transition-all ${
                          amount === amt
                            ? 'bg-black text-white'
                            : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                        }`}
                      >
                        {(amt / 1000).toFixed(0)}K
                      </button>
                    ))}
                  </div>
                </div>

                {/* Shares Calculation */}
                {selectedStock && (
                  <p className="text-sm text-zinc-600 mt-4">
                    {t.willBuy} <span className="font-medium">
                      {Math.floor(amount / selectedStock.price)}
                    </span> {t.shares}
                  </p>
                )}
              </div>

              {/* Funding Source */}
              <Card className="p-5 border-zinc-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-zinc-500 mb-1">{t.fundingFrom}</p>
                    <div className="flex items-center gap-2">
                      {fundingSource === 'waza-account' && (
                        <>
                          <CreditCard className="w-4 h-4 text-zinc-700" />
                          <p className="text-base font-medium">
                            {language === 'en' ? 'Waza Account' : 'Akaunti ya Waza'}
                          </p>
                        </>
                      )}
                      {fundingSource === 'mpesa' && (
                        <>
                          <Building2 className="w-4 h-4 text-zinc-700" />
                          <p className="text-base font-medium">M-Pesa</p>
                        </>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setShowFundingOptions(true)}
                    className="text-sm text-zinc-700 hover:text-black font-medium"
                  >
                    {t.changeFunding}
                  </button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Schedule & Condition */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-light mb-6">{t.whenSchedule}</h2>

              {/* Schedule Type */}
              <div className="space-y-3 mb-6">
                {[
                  { value: 'once' as const, label: t.once, icon: Calendar },
                  { value: 'weekly' as const, label: t.weekly, icon: Clock },
                  { value: 'monthly' as const, label: t.monthly, icon: TrendingUp }
                ].map(({ value, label, icon: Icon }) => (
                  <Card
                    key={value}
                    className={`p-5 cursor-pointer transition-all ${
                      schedule === value
                        ? 'border-2 border-black bg-zinc-50'
                        : 'border-2 border-zinc-200 hover:border-zinc-400'
                    }`}
                    onClick={() => setSchedule(value)}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-zinc-700" />
                      <p className="text-base font-medium">{label}</p>
                      {schedule === value && (
                        <Check className="w-5 h-5 text-black ml-auto" />
                      )}
                    </div>
                  </Card>
                ))}
              </div>

              {/* Schedule Details */}
              <AnimatePresence mode="wait">
                {schedule === 'once' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <Card className="p-5 border-zinc-200">
                      <p className="text-sm text-zinc-600 mb-3">{t.selectDate}</p>
                      <input
                        type="date"
                        value={scheduleDate}
                        onChange={(e) => setScheduleDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full h-12 px-4 border-2 border-zinc-200 rounded-lg focus:border-black"
                      />
                    </Card>
                  </motion.div>
                )}

                {schedule === 'weekly' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <Card className="p-5 border-zinc-200">
                      <p className="text-sm text-zinc-600 mb-3">{t.on}</p>
                      <div className="grid grid-cols-5 gap-2">
                        {weekDays.map((day, idx) => (
                          <button
                            key={idx}
                            onClick={() => setDayOfWeek(idx)}
                            className={`h-12 rounded-lg text-sm transition-all ${
                              dayOfWeek === idx
                                ? 'bg-black text-white'
                                : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                            }`}
                          >
                            {day.slice(0, 3)}
                          </button>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                )}

                {schedule === 'monthly' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <Card className="p-5 border-zinc-200">
                      <p className="text-sm text-zinc-600 mb-3">{t.everyMonth}</p>
                      <input
                        type="range"
                        min="1"
                        max="28"
                        value={dayOfMonth}
                        onChange={(e) => setDayOfMonth(Number(e.target.value))}
                        className="w-full h-2 bg-zinc-200 rounded-full accent-black"
                      />
                      <p className="text-center mt-3 text-3xl font-light">{dayOfMonth}</p>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Condition */}
              <div className="mt-8">
                <p className="text-lg font-light mb-4">{t.addCondition}</p>
                <div className="space-y-3">
                  {[
                    { value: 'none' as const, label: t.noCondition },
                    { value: 'price-below' as const, label: t.priceBelow },
                    { value: 'price-above' as const, label: t.priceAbove }
                  ].map(({ value, label }) => (
                    <Card
                      key={value}
                      className={`p-4 cursor-pointer transition-all ${
                        conditionType === value
                          ? 'border-2 border-black bg-zinc-50'
                          : 'border-2 border-zinc-200 hover:border-zinc-400'
                      }`}
                      onClick={() => setConditionType(value)}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{label}</p>
                        {conditionType === value && (
                          <Check className="w-5 h-5 text-black" />
                        )}
                      </div>
                    </Card>
                  ))}
                </div>

                {conditionType !== 'none' && selectedStock && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 overflow-hidden"
                  >
                    <Card className="p-5 border-zinc-200">
                      <p className="text-sm text-zinc-600 mb-3">
                        {t.currentPrice}: {formatCurrency(selectedStock.price)}
                      </p>
                      <input
                        type="number"
                        value={targetPrice || selectedStock.price}
                        onChange={(e) => setTargetPrice(Number(e.target.value))}
                        className="w-full h-14 px-4 border-2 border-zinc-200 rounded-lg text-2xl font-light focus:border-black"
                      />
                      <div className="mt-3 text-sm text-zinc-600">
                        {conditionType === 'price-below' && targetPrice < selectedStock.price && (
                          <p className="text-amber-700">
                            {((selectedStock.price - targetPrice) / selectedStock.price * 100).toFixed(1)}% {language === 'en' ? 'below current' : 'chini ya bei ya sasa'}
                          </p>
                        )}
                        {conditionType === 'price-above' && targetPrice > selectedStock.price && (
                          <p className="text-green-700">
                            {((targetPrice - selectedStock.price) / selectedStock.price * 100).toFixed(1)}% {language === 'en' ? 'above current' : 'juu ya bei ya sasa'}
                          </p>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 4: Review & Confirm */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-light mb-6">{t.reviewTrade}</h2>

              {/* Summary Card */}
              <Card className="p-8 border-zinc-200 bg-zinc-50">
                <div className="space-y-6">
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wide mb-2">{t.stock}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-light">{selectedStock?.symbol}</p>
                      <span className="text-xs px-2 py-0.5 rounded bg-zinc-200 text-zinc-600">
                        {selectedStock?.exchange}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-600 mt-1">{selectedStock?.name}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wide mb-2">{t.investment}</p>
                      <p className="text-3xl font-light">{formatCurrency(amount)}</p>
                      <p className="text-sm text-zinc-600 mt-1">
                        ≈ {Math.floor(amount / (selectedStock?.price || 1))} {t.shares}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wide mb-2">{t.scheduleLabel}</p>
                      <p className="text-lg font-medium">{getScheduleText()}</p>
                    </div>
                  </div>

                  {conditionType !== 'none' && (
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wide mb-2">{t.condition}</p>
                      <p className="text-base">
                        {t.onlyIf} {conditionType === 'price-below' ? '≤' : '≥'} {formatCurrency(targetPrice)}
                      </p>
                    </div>
                  )}
                </div>
              </Card>

              {/* AI Insight */}
              <Card className="p-6 bg-blue-50 border-blue-100">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900 mb-1">{t.aiInsight}</p>
                    <p className="text-sm text-blue-800 leading-relaxed">
                      {t.aiMessage}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Disclaimer */}
              <Card className="p-5 border-zinc-200 bg-white">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-zinc-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    {t.disclaimer}
                  </p>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Actions */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-100 p-6 z-10">
          <div className="max-w-2xl mx-auto flex gap-3">
            {step < 4 ? (
              <>
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 h-14 border-2"
                >
                  {t.cancel}
                </Button>
                <Button
                  onClick={() => setStep((step + 1) as any)}
                  disabled={!canContinue()}
                  className="flex-1 h-14 bg-black text-white hover:bg-zinc-800 disabled:bg-zinc-300"
                >
                  {t.continue}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </>
            ) : (
              <Button
                onClick={handleComplete}
                className="w-full h-14 bg-black text-white hover:bg-zinc-800"
              >
                {t.confirmTrade}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Funding Options Modal */}
      <AnimatePresence>
        {showFundingOptions && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-30"
              onClick={() => setShowFundingOptions(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-40 p-6"
            >
              <div className="max-w-2xl mx-auto">
                <h3 className="text-xl font-light mb-6">
                  {language === 'en' ? 'Choose funding source' : 'Chagua chanzo cha fedha'}
                </h3>
                
                <div className="space-y-3 mb-6">
                  {[
                    { id: 'waza-account', label: language === 'en' ? 'Waza Account' : 'Akaunti ya Waza', icon: CreditCard },
                    { id: 'mpesa', label: 'M-Pesa', icon: Building2 },
                    { id: 'bank', label: language === 'en' ? 'Bank Account' : 'Akaunti ya Benki', icon: Building2 }
                  ].map(({ id, label, icon: Icon }) => (
                    <Card
                      key={id}
                      className={`p-5 cursor-pointer transition-all ${
                        fundingSource === id
                          ? 'border-2 border-black bg-zinc-50'
                          : 'border-2 border-zinc-200 hover:border-zinc-400'
                      }`}
                      onClick={() => {
                        setFundingSource(id);
                        setShowFundingOptions(false);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-zinc-700" />
                        <p className="text-base font-medium">{label}</p>
                        {fundingSource === id && (
                          <Check className="w-5 h-5 text-black ml-auto" />
                        )}
                      </div>
                    </Card>
                  ))}
                </div>

                <Button
                  variant="outline"
                  onClick={() => setShowFundingOptions(false)}
                  className="w-full h-12"
                >
                  {t.cancel}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
