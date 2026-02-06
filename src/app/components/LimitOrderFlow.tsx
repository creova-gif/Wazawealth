// WAZA WEALTH — Limit Order Flow
// Price-targeted buying with confirmation

import { useState } from 'react';
import { motion } from 'motion/react';
import { X, AlertCircle, TrendingDown, Clock } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Asset, Money, TimeInForce } from '@/types/portfolio';
import { formatMoney } from '@/utils/portfolioCalculations';

interface Props {
  asset: Asset;
  language: 'sw' | 'en';
  onClose: () => void;
  onConfirm: (orderDetails: any) => void;
}

export function LimitOrderFlow({ asset, language, onClose, onConfirm }: Props) {
  const [quantity, setQuantity] = useState('');
  const [limitPrice, setLimitPrice] = useState('');
  const [timeInForce, setTimeInForce] = useState<TimeInForce>('day');
  const [step, setStep] = useState<'input' | 'confirm'>('input');

  const content = {
    sw: {
      limitOrder: 'Agizo la Kikomo',
      quantity: 'Kiasi',
      shares: 'hisa',
      enterShares: 'Weka idadi ya hisa...',
      limitPrice: 'Bei ya Kikomo',
      enterPrice: 'Weka bei yako ya lengo...',
      currentPrice: 'Bei ya Sasa',
      timeInForce: 'Wakati wa Nguvu',
      day: 'Siku (hadi soko lifunge)',
      gtc: 'Hadi Kughairiwa (hadi 90 siku)',
      ioc: 'Kujaza Mara Moja au Kughairi',
      estimatedCost: 'Gharama Inayokadiriwa',
      fees: 'Ada',
      total: 'Jumla',
      continue: 'Endelea',
      confirm: 'Thibitisha Agizo',
      cancel: 'Ghairi',
      warning: 'Tahadhari',
      limitWarning: 'Agizo lako litatumwa tu ikiwa bei itafikia {price} au chini. Hii inaweza kuchukua muda au kamwe isifanyike.',
      belowMarket: 'Chini ya soko kwa',
      aboveMarket: 'Juu ya soko kwa',
      orderSummary: 'Muhtasari wa Agizo',
      willExecute: 'Litatekelezwa wakati bei ≤',
      goodUntil: 'Nzuri hadi'
    },
    en: {
      limitOrder: 'Limit Order',
      quantity: 'Quantity',
      shares: 'shares',
      enterShares: 'Enter number of shares...',
      limitPrice: 'Limit Price',
      enterPrice: 'Enter your target price...',
      currentPrice: 'Current Price',
      timeInForce: 'Time in Force',
      day: 'Day (until market close)',
      gtc: 'Good Till Cancelled (up to 90 days)',
      ioc: 'Immediate or Cancel',
      estimatedCost: 'Estimated Cost',
      fees: 'Fees',
      total: 'Total',
      continue: 'Continue',
      confirm: 'Confirm Order',
      cancel: 'Cancel',
      warning: 'Warning',
      limitWarning: 'Your order will only execute if the price reaches {price} or below. This may take time or never happen.',
      belowMarket: 'Below market by',
      aboveMarket: 'Above market by',
      orderSummary: 'Order Summary',
      willExecute: 'Will execute when price ≤',
      goodUntil: 'Good until'
    }
  };

  const t = content[language];

  const qty = parseInt(quantity) || 0;
  const limit = parseFloat(limitPrice) || 0;
  const currentPrice = asset.currentPrice;
  
  const estimatedCost = qty * limit;
  const brokerageFee = estimatedCost * 0.015; // 1.5%
  const exchangeFee = estimatedCost * 0.002; // 0.2%
  const totalFees = brokerageFee + exchangeFee;
  const totalRequired = estimatedCost + totalFees;

  const priceDifference = limit - currentPrice;
  const priceDifferencePercent = currentPrice > 0 ? (priceDifference / currentPrice) * 100 : 0;

  const isValid = qty > 0 && limit > 0;

  const handleContinue = () => {
    if (!isValid) return;
    setStep('confirm');
  };

  const handleConfirm = () => {
    onConfirm({
      assetId: asset.assetId,
      orderType: 'limit',
      side: 'buy',
      quantity: qty,
      limitPrice: { amount: limit, currency: asset.currency },
      timeInForce,
      estimatedCost: { amount: totalRequired, currency: asset.currency }
    });
    onClose();
  };

  if (step === 'confirm') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      >
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-lg max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-zinc-200 px-6 py-4 flex items-center justify-between rounded-t-3xl">
            <h2 className="text-xl font-light">{t.confirm}</h2>
            <button
              onClick={() => setStep('input')}
              className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-zinc-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="px-6 py-6 space-y-6">
            {/* Order Summary */}
            <div>
              <p className="text-sm text-zinc-500 mb-3">{t.orderSummary}</p>
              <Card className="p-5 border-zinc-200 bg-zinc-50">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-zinc-600">Asset</span>
                    <span className="font-medium">{asset.symbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600">{t.quantity}</span>
                    <span className="font-medium">{qty} {t.shares}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600">{t.limitPrice}</span>
                    <span className="font-medium">{asset.currency} {limit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600">{t.timeInForce}</span>
                    <span className="font-medium text-xs">{t[timeInForce]}</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Cost Breakdown */}
            <div>
              <p className="text-sm text-zinc-500 mb-3">{t.estimatedCost}</p>
              <Card className="p-5 border-zinc-200">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-600">{t.shares}</span>
                    <span>{asset.currency} {estimatedCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-zinc-500">
                    <span>{t.fees}</span>
                    <span>{asset.currency} {totalFees.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-zinc-200 font-medium">
                    <span>{t.total}</span>
                    <span>{asset.currency} {totalRequired.toLocaleString()}</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Warning */}
            <Card className="p-4 bg-amber-50 border-amber-200">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-900 mb-1">{t.warning}</p>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    {t.limitWarning.replace('{price}', `${asset.currency} ${limit.toLocaleString()}`)}
                  </p>
                  {priceDifference < 0 && (
                    <p className="text-xs text-amber-700 mt-2">
                      {t.belowMarket} {Math.abs(priceDifferencePercent).toFixed(1)}%
                    </p>
                  )}
                </div>
              </div>
            </Card>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep('input')}
                className="flex-1 h-14 border-2"
              >
                {t.cancel}
              </Button>
              <Button
                onClick={handleConfirm}
                className="flex-1 h-14 bg-black text-white hover:bg-zinc-800"
              >
                {t.confirm}
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-lg max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-zinc-200 px-6 py-4 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-xl font-light">{t.limitOrder}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-zinc-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Asset Info */}
          <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-xl">
            <div>
              <p className="text-sm text-zinc-500">{asset.name}</p>
              <p className="text-2xl font-light">{asset.currency} {currentPrice.toLocaleString()}</p>
              <p className="text-xs text-zinc-500">{t.currentPrice}</p>
            </div>
          </div>

          {/* Quantity Input */}
          <div>
            <label className="text-sm text-zinc-600 mb-2 block">{t.quantity}</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder={t.enterShares}
              className="w-full h-14 px-4 border-2 border-zinc-300 rounded-xl focus:border-black focus:outline-none text-lg"
            />
            <p className="text-xs text-zinc-500 mt-1">
              {language === 'sw' ? 'Kiwango cha chini: 10 hisa' : 'Minimum: 10 shares'}
            </p>
          </div>

          {/* Limit Price Input */}
          <div>
            <label className="text-sm text-zinc-600 mb-2 block">{t.limitPrice}</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                {asset.currency}
              </span>
              <input
                type="number"
                value={limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
                placeholder={t.enterPrice}
                step="0.01"
                className="w-full h-14 pl-16 pr-4 border-2 border-zinc-300 rounded-xl focus:border-black focus:outline-none text-lg"
              />
            </div>
            {limit > 0 && limit !== currentPrice && (
              <div className={`flex items-center gap-2 mt-2 text-xs ${
                priceDifference < 0 ? 'text-green-600' : 'text-amber-600'
              }`}>
                <TrendingDown className="w-3 h-3" />
                <span>
                  {priceDifference < 0 ? t.belowMarket : t.aboveMarket} {Math.abs(priceDifferencePercent).toFixed(1)}%
                </span>
              </div>
            )}
          </div>

          {/* Time in Force */}
          <div>
            <label className="text-sm text-zinc-600 mb-3 block">{t.timeInForce}</label>
            <div className="space-y-2">
              {(['day', 'gtc'] as TimeInForce[]).map(tif => (
                <button
                  key={tif}
                  onClick={() => setTimeInForce(tif)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    timeInForce === tif
                      ? 'border-black bg-zinc-50'
                      : 'border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-zinc-500" />
                    <p className="text-sm font-medium">{t[tif]}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Cost Preview */}
          {isValid && (
            <Card className="p-4 bg-blue-50 border-blue-200">
              <p className="text-xs text-blue-600 mb-2">{t.estimatedCost}</p>
              <p className="text-2xl font-light text-blue-900">
                {asset.currency} {totalRequired.toLocaleString()}
              </p>
              <p className="text-xs text-blue-700 mt-1">
                {language === 'sw' ? 'Ikijumuisha ada' : 'Including fees'}
              </p>
            </Card>
          )}

          {/* Submit */}
          <Button
            onClick={handleContinue}
            disabled={!isValid}
            className="w-full h-14 bg-black text-white hover:bg-zinc-800 disabled:bg-zinc-300"
          >
            {t.continue}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
