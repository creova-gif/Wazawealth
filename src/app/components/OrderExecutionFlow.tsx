import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, X, ChevronRight, Check, Sparkles, Info, AlertCircle, CreditCard
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface Props {
  language: 'sw' | 'en';
  type: 'buy' | 'sell';
  stock: {
    symbol: string;
    name: string;
    exchange: string;
    currentPrice: number;
  };
  onClose: () => void;
  onComplete: (order: Order) => void;
  availableShares?: number; // For sell orders
}

interface Order {
  type: 'buy' | 'sell';
  stock: string;
  orderType: 'market' | 'limit';
  quantity: number;
  limitPrice?: number;
  accountType: string;
  estimatedTotal: number;
}

export function OrderExecutionFlow({
  language,
  type,
  stock,
  onClose,
  onComplete,
  availableShares = 0
}: Props) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [quantity, setQuantity] = useState(1);
  const [limitPrice, setLimitPrice] = useState(stock.currentPrice);
  const [accountType, setAccountType] = useState('everyday-growth');

  const microcopy = {
    en: {
      // Header
      buyTitle: 'Buy',
      sellTitle: 'Sell',
      step: 'Step',
      of: 'of',
      // Step 1: Order Type
      chooseOrderType: 'Choose order type',
      market: 'Market Order',
      marketDesc: 'Execute immediately at current price',
      limit: 'Limit Order',
      limitDesc: 'Execute only at your specified price or better',
      recommended: 'Recommended',
      // Step 2: Quantity & Price
      howMany: 'How many shares?',
      shares: 'shares',
      available: 'Available',
      limitPriceLabel: 'Limit price per share',
      currentPrice: 'Current price',
      estimatedCost: 'Estimated cost',
      estimatedProceeds: 'Estimated proceeds',
      fees: 'Fees',
      total: 'Total',
      // Step 3: Account & Review
      selectAccount: 'Select account',
      everydayGrowth: 'Everyday Growth',
      retirementVault: 'Retirement Vault',
      goalsAndSavings: 'Goals & Savings',
      reviewOrder: 'Review your order',
      orderType: 'Order Type',
      quantity: 'Quantity',
      priceLabel: 'Price',
      account: 'Account',
      aiGuidance: 'AI Guidance',
      aiMessageBuy: 'This purchase aligns with your growth goal. Consider dollar-cost averaging for better results.',
      aiMessageSell: 'Consider tax implications before selling. Hold time affects capital gains.',
      disclaimer: 'Settlement in 3 business days (T+3). Orders may not execute if limit price not met.',
      confirmOrder: 'Confirm Order',
      // Success
      orderPlaced: 'Order Placed',
      buySuccess: 'Your buy order has been submitted',
      sellSuccess: 'Your sell order has been submitted',
      orderNumber: 'Order',
      pending: 'Pending execution',
      viewOrders: 'View Orders',
      done: 'Done',
      // Common
      continue: 'Continue',
      back: 'Back',
      cancel: 'Cancel',
      // Errors
      insufficientFunds: 'Insufficient funds',
      insufficientShares: 'You only have',
      sharesAvailable: 'shares available',
      minQuantity: 'Minimum 1 share required'
    },
    sw: {
      // Header
      buyTitle: 'Nunua',
      sellTitle: 'Uza',
      step: 'Hatua',
      of: 'ya',
      // Step 1: Order Type
      chooseOrderType: 'Chagua aina ya agizo',
      market: 'Agizo la Soko',
      marketDesc: 'Tekeleza mara moja kwa bei ya sasa',
      limit: 'Agizo la Kikomo',
      limitDesc: 'Tekeleza tu kwa bei uliyoweka au bora zaidi',
      recommended: 'Inapendekezwa',
      // Step 2: Quantity & Price
      howMany: 'Hisa ngapi?',
      shares: 'hisa',
      available: 'Zinazopatikana',
      limitPriceLabel: 'Bei ya kikomo kwa hisa',
      currentPrice: 'Bei ya sasa',
      estimatedCost: 'Gharama inayokadiria',
      estimatedProceeds: 'Mapato yanayokadiria',
      fees: 'Ada',
      total: 'Jumla',
      // Step 3: Account & Review
      selectAccount: 'Chagua akaunti',
      everydayGrowth: 'Ukuaji wa Kila Siku',
      retirementVault: 'Hifadhi ya Ustaafu',
      goalsAndSavings: 'Malengo na Akiba',
      reviewOrder: 'Kagua agizo lako',
      orderType: 'Aina ya Agizo',
      quantity: 'Kiasi',
      priceLabel: 'Bei',
      account: 'Akaunti',
      aiGuidance: 'Mwongozo wa AI',
      aiMessageBuy: 'Ununuzi huu unafaa na lengo lako la ukuaji. Fikiria wastani wa bei kwa matokeo bora.',
      aiMessageSell: 'Fikiria athari za kodi kabla ya kuuza. Muda wa kushikilia unaathiri faida za mtaji.',
      disclaimer: 'Malipo katika siku 3 za biashara (T+3). Maagizo yanaweza kutotekelezwa kama bei ya kikomo haikutana.',
      confirmOrder: 'Thibitisha Agizo',
      // Success
      orderPlaced: 'Agizo Limewekwa',
      buySuccess: 'Agizo lako la ununuzi limewasilishwa',
      sellSuccess: 'Agizo lako la mauzo limewasilishwa',
      orderNumber: 'Agizo',
      pending: 'Inasubiri utekelezaji',
      viewOrders: 'Angalia Maagizo',
      done: 'Imekamilika',
      // Common
      continue: 'Endelea',
      back: 'Rudi',
      cancel: 'Ghairi',
      // Errors
      insufficientFunds: 'Fedha hazitoshi',
      insufficientShares: 'Una',
      sharesAvailable: 'hisa zinazopatikana tu',
      minQuantity: 'Hisa 1 kwa chini inahitajika'
    }
  };

  const t = microcopy[language];

  const accounts = [
    { id: 'everyday-growth', name: t.everydayGrowth, balance: 2450000, icon: '📈' },
    { id: 'retirement-vault', name: t.retirementVault, balance: 8500000, icon: '🏦' },
    { id: 'goals-and-savings', name: t.goalsAndSavings, balance: 1250000, icon: '🎯' }
  ];

  const feeRate = 0.015; // 1.5%
  const executePrice = orderType === 'market' ? stock.currentPrice : limitPrice;
  const subtotal = executePrice * quantity;
  const fees = subtotal * feeRate;
  const total = type === 'buy' ? subtotal + fees : subtotal - fees;

  const selectedAccount = accounts.find(a => a.id === accountType);
  const hasEnoughFunds = type === 'buy' ? (selectedAccount?.balance || 0) >= total : true;
  const hasEnoughShares = type === 'sell' ? availableShares >= quantity : true;

  const canContinue = () => {
    if (step === 1) return true;
    if (step === 2) {
      if (quantity < 1) return false;
      if (type === 'sell' && !hasEnoughShares) return false;
      return true;
    }
    return hasEnoughFunds;
  };

  const formatCurrency = (amount: number) => {
    return `TZS ${amount.toLocaleString()}`;
  };

  const handleComplete = () => {
    const order: Order = {
      type,
      stock: stock.symbol,
      orderType,
      quantity,
      limitPrice: orderType === 'limit' ? limitPrice : undefined,
      accountType,
      estimatedTotal: total
    };
    onComplete(order);
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
            <div>
              <h1 className="text-xl font-light">
                {type === 'buy' ? t.buyTitle : t.sellTitle} {stock.symbol}
              </h1>
              <p className="text-sm text-zinc-600">{stock.name}</p>
            </div>
          </div>
          <div className="text-sm text-zinc-500">
            {t.step} {step} {t.of} 3
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-zinc-100">
          <motion.div
            className="h-full bg-black"
            initial={{ width: '0%' }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Order Type */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-light mb-6">{t.chooseOrderType}</h2>

              <div className="space-y-3">
                {/* Market Order */}
                <Card
                  className={`p-6 cursor-pointer transition-all ${
                    orderType === 'market'
                      ? 'border-2 border-black bg-zinc-50'
                      : 'border-2 border-zinc-200 hover:border-zinc-400'
                  }`}
                  onClick={() => setOrderType('market')}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-medium">{t.market}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                          {t.recommended}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-600">{t.marketDesc}</p>
                    </div>
                    {orderType === 'market' && (
                      <Check className="w-5 h-5 text-black flex-shrink-0 ml-3" />
                    )}
                  </div>
                </Card>

                {/* Limit Order */}
                <Card
                  className={`p-6 cursor-pointer transition-all ${
                    orderType === 'limit'
                      ? 'border-2 border-black bg-zinc-50'
                      : 'border-2 border-zinc-200 hover:border-zinc-400'
                  }`}
                  onClick={() => setOrderType('limit')}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium mb-1">{t.limit}</h3>
                      <p className="text-sm text-zinc-600">{t.limitDesc}</p>
                    </div>
                    {orderType === 'limit' && (
                      <Check className="w-5 h-5 text-black flex-shrink-0 ml-3" />
                    )}
                  </div>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Step 2: Quantity & Price */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-light mb-6">{t.howMany}</h2>

              {/* Quantity Input */}
              <div>
                <div className="relative mb-2">
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                    min="1"
                    max={type === 'sell' ? availableShares : undefined}
                    className="w-full h-20 px-4 border-2 border-zinc-200 rounded-xl text-4xl font-light text-right focus:border-black focus:ring-2 focus:ring-zinc-100"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-zinc-500 pointer-events-none">
                    {t.shares}
                  </span>
                </div>

                {type === 'sell' && (
                  <p className="text-sm text-zinc-600">
                    {t.available}: {availableShares} {t.shares}
                  </p>
                )}

                {type === 'sell' && !hasEnoughShares && (
                  <div className="mt-2 p-3 rounded-lg bg-red-50 border border-red-100 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">
                      {t.insufficientShares} {availableShares} {t.sharesAvailable}
                    </p>
                  </div>
                )}
              </div>

              {/* Limit Price (if applicable) */}
              {orderType === 'limit' && (
                <div>
                  <p className="text-sm text-zinc-600 mb-3">
                    {t.limitPriceLabel}
                  </p>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-lg">
                      TZS
                    </span>
                    <input
                      type="number"
                      value={limitPrice}
                      onChange={(e) => setLimitPrice(Number(e.target.value))}
                      className="w-full h-16 pl-20 pr-4 border-2 border-zinc-200 rounded-xl text-3xl font-light focus:border-black focus:ring-2 focus:ring-zinc-100"
                    />
                  </div>
                  <p className="text-sm text-zinc-600 mt-2">
                    {t.currentPrice}: {formatCurrency(stock.currentPrice)}
                  </p>
                </div>
              )}

              {/* Cost Summary */}
              <Card className="p-6 bg-zinc-50 border-zinc-200">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-zinc-600">
                      {type === 'buy' ? t.estimatedCost : t.estimatedProceeds}
                    </p>
                    <p className="text-base font-medium">{formatCurrency(subtotal)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-zinc-600">{t.fees} (1.5%)</p>
                    <p className="text-base font-medium">{formatCurrency(fees)}</p>
                  </div>
                  <div className="pt-3 border-t border-zinc-200 flex items-center justify-between">
                    <p className="text-base font-medium">{t.total}</p>
                    <p className="text-2xl font-light">{formatCurrency(total)}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Account & Review */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-light mb-6">{t.reviewOrder}</h2>

              {/* Account Selection */}
              {type === 'buy' && (
                <div className="mb-6">
                  <p className="text-sm text-zinc-600 mb-3">{t.selectAccount}</p>
                  <div className="space-y-2">
                    {accounts.map(account => (
                      <Card
                        key={account.id}
                        className={`p-4 cursor-pointer transition-all ${
                          accountType === account.id
                            ? 'border-2 border-black bg-zinc-50'
                            : 'border-2 border-zinc-200 hover:border-zinc-400'
                        }`}
                        onClick={() => setAccountType(account.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{account.icon}</span>
                            <div>
                              <p className="text-sm font-medium">{account.name}</p>
                              <p className="text-xs text-zinc-600">
                                {formatCurrency(account.balance)}
                              </p>
                            </div>
                          </div>
                          {accountType === account.id && (
                            <Check className="w-5 h-5 text-black" />
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Order Summary */}
              <Card className="p-6 bg-zinc-50 border-zinc-200">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-zinc-500 uppercase mb-1">{t.orderType}</p>
                    <p className="text-base font-medium">
                      {orderType === 'market' ? t.market : t.limit}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-zinc-500 uppercase mb-1">{t.quantity}</p>
                      <p className="text-base font-medium">{quantity} {t.shares}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 uppercase mb-1">{t.priceLabel}</p>
                      <p className="text-base font-medium">{formatCurrency(executePrice)}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-zinc-200">
                    <p className="text-xs text-zinc-500 uppercase mb-1">{t.total}</p>
                    <p className="text-3xl font-light">{formatCurrency(total)}</p>
                  </div>
                </div>
              </Card>

              {/* AI Guidance */}
              <Card className="p-6 bg-blue-50 border-blue-100">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900 mb-1">{t.aiGuidance}</p>
                    <p className="text-sm text-blue-800 leading-relaxed">
                      {type === 'buy' ? t.aiMessageBuy : t.aiMessageSell}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Disclaimer */}
              <Card className="p-5 border-zinc-200">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-zinc-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    {t.disclaimer}
                  </p>
                </div>
              </Card>

              {/* Insufficient Funds Warning */}
              {!hasEnoughFunds && type === 'buy' && (
                <div className="p-4 rounded-lg bg-red-50 border border-red-100 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-900 mb-1">
                      {t.insufficientFunds}
                    </p>
                    <p className="text-sm text-red-700">
                      {language === 'en'
                        ? `You need ${formatCurrency(total - (selectedAccount?.balance || 0))} more`
                        : `Unahitaji ${formatCurrency(total - (selectedAccount?.balance || 0))} zaidi`
                      }
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Actions */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-100 p-6 z-10">
          <div className="max-w-2xl mx-auto flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 h-14 border-2"
            >
              {t.cancel}
            </Button>
            {step < 3 ? (
              <Button
                onClick={() => setStep((step + 1) as any)}
                disabled={!canContinue()}
                className="flex-1 h-14 bg-black text-white hover:bg-zinc-800 disabled:bg-zinc-300"
              >
                {t.continue}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                disabled={!canContinue()}
                className={`flex-1 h-14 text-white hover:opacity-90 disabled:bg-zinc-300 ${
                  type === 'buy' ? 'bg-green-600' : 'bg-red-600'
                }`}
              >
                {t.confirmOrder}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
