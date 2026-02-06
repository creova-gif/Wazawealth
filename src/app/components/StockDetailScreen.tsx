import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Star, TrendingUp, Sparkles, Calendar, X, ChevronDown } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { StoryGraph } from './StoryGraph';

interface Props {
  language: 'sw' | 'en';
  stock: any;
  onBack: () => void;
}

export function StockDetailScreen({ language, stock, onBack }: Props) {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [condition, setCondition] = useState<'immediate' | 'price' | 'date'>('immediate');
  const [targetPrice, setTargetPrice] = useState('');
  const [targetDate, setTargetDate] = useState('');

  const content = {
    sw: {
      buyNow: 'Nunua Sasa',
      scheduleTrade: 'Panga Biashara',
      aiAnalysis: 'Uchambuzi wa AI',
      performance: 'Utendaji',
      dividend: 'Gawio',
      nextPayment: 'Malipo Yanayokuja',
      yield: 'Mapato',
      scheduleTitle: 'Panga Biashara',
      amount: 'Kiasi',
      condition: 'Hali (Si Lazima)',
      immediate: 'Nunua Mara Moja',
      whenPrice: 'Wakati bei',
      onDate: 'Tarehe Maalum',
      enterAmount: 'Weka kiasi...',
      enterPrice: 'Weka bei...',
      schedule: 'Panga',
      cancel: 'Ghairi',
      strong: 'yenye nguvu',
      consistent: 'thabiti'
    },
    en: {
      buyNow: 'Buy Now',
      scheduleTrade: 'Schedule Trade',
      aiAnalysis: 'AI Analysis',
      performance: 'Performance',
      dividend: 'Dividend',
      nextPayment: 'Next Payment',
      yield: 'Yield',
      scheduleTitle: 'Schedule Trade',
      amount: 'Amount',
      condition: 'Condition (Optional)',
      immediate: 'Buy Immediately',
      whenPrice: 'When price ≤',
      onDate: 'On specific date',
      enterAmount: 'Enter amount...',
      enterPrice: 'Enter target price...',
      schedule: 'Schedule Trade',
      cancel: 'Cancel',
      strong: 'strong',
      consistent: 'consistent'
    }
  };

  const t = content[language];

  // Sample stock data
  const stockData = stock || {
    symbol: 'CRDB',
    name: 'CRDB Bank',
    market: 'DSE',
    price: 450,
    change: 2.3,
    currency: 'TZS'
  };

  const priceHistory = [
    { date: 'Jan', value: 420 },
    { date: 'Feb', value: 425 },
    { date: 'Mar', value: 418 },
    { date: 'Apr', value: 430 },
    { date: 'May', value: 435 },
    { date: 'Jun', value: 440 },
    { date: 'Jul', value: 445 },
    { date: 'Aug', value: 450 }
  ];

  const handleScheduleTrade = () => {
    // Handle trade scheduling
    console.log('Scheduling trade:', { amount, condition, targetPrice, targetDate });
    setShowScheduleModal(false);
    // Show success toast
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-zinc-100 z-10">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center hover:bg-zinc-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-zinc-700" />
            </button>
            <div>
              <p className="text-sm text-zinc-500">{stockData.market}</p>
              <h1 className="text-lg font-medium">{stockData.name}</h1>
            </div>
          </div>
          <button className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center hover:bg-zinc-100 transition-colors">
            <Star className="w-5 h-5 text-zinc-400 hover:text-yellow-500" />
          </button>
        </div>
      </div>

      {/* Price Card */}
      <div className="px-6 pt-6 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="p-8 border-zinc-200">
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-xs text-zinc-500 mb-1 uppercase tracking-wide">Current Price</p>
                <h2 className="text-6xl font-light tracking-tight">
                  {stockData.price}
                </h2>
                <p className="text-sm text-zinc-500 mt-1">{stockData.currency}</p>
              </div>
              <div className={`flex items-center gap-1.5 pb-2 ${
                stockData.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp className="w-5 h-5" />
                <span className="text-xl font-medium">
                  {stockData.change >= 0 ? '+' : ''}{stockData.change}%
                </span>
              </div>
            </div>

            {/* Mini chart */}
            <div className="h-20 mb-4">
              <StoryGraph
                data={priceHistory}
                height={80}
                minimal={true}
                showProjection={false}
                showConfidenceBands={false}
              />
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                className="h-14 bg-black text-white hover:bg-zinc-800 text-base font-medium"
                onClick={() => {/* Handle immediate buy */}}
              >
                {t.buyNow}
              </Button>
              <Button
                variant="outline"
                className="h-14 border-2 border-zinc-300 hover:border-zinc-500 text-base font-medium"
                onClick={() => setShowScheduleModal(true)}
              >
                <Calendar className="w-5 h-5 mr-2" />
                {t.scheduleTrade}
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* AI Analysis */}
      <div className="px-6 py-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 bg-blue-50 border-blue-100">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900 mb-2">{t.aiAnalysis}</p>
                <p className="text-sm text-blue-800 leading-relaxed">
                  {language === 'sw' 
                    ? `${stockData.name} ina misingi imara na historia thabiti ya magawio. Inafaa kwa wawekezaji wa muda mrefu.`
                    : `${stockData.name} has strong fundamentals and consistent dividend history. Suitable for long-term investors.`}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Performance Stats */}
      <div className="px-6 py-4">
        <h3 className="text-xl font-light mb-4">{t.performance}</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: '1W', value: '+1.2%' },
            { label: '1M', value: '+4.5%' },
            { label: '1Y', value: '+18.0%' }
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <Card className="p-4 border-zinc-200 text-center">
                <p className="text-xs text-zinc-500 mb-1">{stat.label}</p>
                <p className="text-lg font-medium text-green-600">{stat.value}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dividend Info */}
      <div className="px-6 py-4">
        <h3 className="text-xl font-light mb-4">{t.dividend}</h3>
        <Card className="p-6 border-zinc-200">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-zinc-500 mb-1">{t.nextPayment}</p>
              <p className="text-lg font-medium">Jan 15, 2026</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 mb-1">{t.yield}</p>
              <p className="text-lg font-medium">6.2%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Schedule Trade Modal */}
      <AnimatePresence>
        {showScheduleModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setShowScheduleModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[85vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-zinc-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-light">{t.scheduleTitle}</h2>
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-zinc-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="px-6 py-6 space-y-6">
                {/* Amount Input */}
                <div>
                  <label className="text-sm text-zinc-600 mb-2 block">{t.amount}</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                      {stockData.currency}
                    </span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder={t.enterAmount}
                      className="w-full h-14 pl-16 pr-4 border-2 border-zinc-300 rounded-xl focus:border-black focus:outline-none text-lg"
                    />
                  </div>
                  <div className="flex gap-2 mt-3">
                    {[50000, 100000, 250000, 500000].map(preset => (
                      <button
                        key={preset}
                        onClick={() => setAmount(preset.toString())}
                        className="px-3 py-1.5 text-sm bg-zinc-100 rounded-lg hover:bg-zinc-200"
                      >
                        {(preset / 1000).toFixed(0)}K
                      </button>
                    ))}
                  </div>
                </div>

                {/* Condition */}
                <div>
                  <label className="text-sm text-zinc-600 mb-3 block">{t.condition}</label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setCondition('immediate')}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        condition === 'immediate'
                          ? 'border-black bg-zinc-50'
                          : 'border-zinc-200 hover:border-zinc-300'
                      }`}
                    >
                      <p className="font-medium">{t.immediate}</p>
                    </button>
                    <button
                      onClick={() => setCondition('price')}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        condition === 'price'
                          ? 'border-black bg-zinc-50'
                          : 'border-zinc-200 hover:border-zinc-300'
                      }`}
                    >
                      <p className="font-medium">{t.whenPrice}</p>
                      {condition === 'price' && (
                        <input
                          type="number"
                          value={targetPrice}
                          onChange={(e) => setTargetPrice(e.target.value)}
                          placeholder={t.enterPrice}
                          className="mt-2 w-full h-10 px-3 border border-zinc-300 rounded-lg focus:border-black focus:outline-none"
                        />
                      )}
                    </button>
                    <button
                      onClick={() => setCondition('date')}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        condition === 'date'
                          ? 'border-black bg-zinc-50'
                          : 'border-zinc-200 hover:border-zinc-300'
                      }`}
                    >
                      <p className="font-medium">{t.onDate}</p>
                      {condition === 'date' && (
                        <input
                          type="date"
                          value={targetDate}
                          onChange={(e) => setTargetDate(e.target.value)}
                          className="mt-2 w-full h-10 px-3 border border-zinc-300 rounded-lg focus:border-black focus:outline-none"
                        />
                      )}
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowScheduleModal(false)}
                    className="flex-1 h-14 border-2"
                  >
                    {t.cancel}
                  </Button>
                  <Button
                    onClick={handleScheduleTrade}
                    disabled={!amount}
                    className="flex-1 h-14 bg-black text-white hover:bg-zinc-800 disabled:bg-zinc-300"
                  >
                    {t.schedule}
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}