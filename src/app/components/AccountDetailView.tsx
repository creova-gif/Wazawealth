import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, TrendingUp, Info, Plus, ArrowUpRight, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { StoryGraph } from './StoryGraph';

interface Props {
  accountId: string;
  language: 'sw' | 'en';
  onBack: () => void;
  onDeposit: () => void;
  onWithdraw: () => void;
}

export function AccountDetailView({ accountId, language, onBack, onDeposit, onWithdraw }: Props) {
  const [timeframe, setTimeframe] = useState<'1M' | '3M' | '1Y' | 'ALL'>('1Y');

  const content = {
    sw: {
      back: 'Rudi',
      balance: 'Salio',
      growth: 'Ukuaji',
      thisYear: 'Mwaka huu',
      performance: 'Utendaji',
      assets: 'Mali',
      deposit: 'Weka Pesa',
      withdraw: 'Toa Pesa',
      about: 'Kuhusu Akaunti Hii',
      purpose: 'Kusudi',
      riskLevel: 'Kiwango cha Hatari',
      projected: 'Makadirio',
      in10Years: 'Baada ya miaka 10',
      consistency: 'Uthabiti unafanya kazi',
      insights: 'Maarifa',
      allocation: 'Ugawaji wa Mali'
    },
    en: {
      back: 'Back',
      balance: 'Balance',
      growth: 'Growth',
      thisYear: 'This year',
      performance: 'Performance',
      assets: 'Assets',
      deposit: 'Deposit',
      withdraw: 'Withdraw',
      about: 'About This Account',
      purpose: 'Purpose',
      riskLevel: 'Risk Level',
      projected: 'Projected',
      in10Years: 'In 10 years',
      consistency: 'Consistency compounds',
      insights: 'Insights',
      allocation: 'Asset Allocation'
    }
  };

  const t = content[language];

  // Sample data - in production, fetch based on accountId
  const accountData = {
    name: 'Everyday Growth',
    balance: 2500000,
    growth: 12.5,
    growthAmount: 278125,
    purpose: 'Long-term wealth growth with flexible access',
    riskLevel: 'Moderate',
    projectedValue: 6890000,
    assets: [
      { name: 'DSE Stocks', allocation: 45, amount: 1125000 },
      { name: 'Unit Trusts', allocation: 35, amount: 875000 },
      { name: 'ETFs', allocation: 20, amount: 500000 }
    ],
    historicalData: [
      { date: 'Jan', value: 2100000 },
      { date: 'Feb', value: 2150000 },
      { date: 'Mar', value: 2180000 },
      { date: 'Apr', value: 2250000 },
      { date: 'May', value: 2300000 },
      { date: 'Jun', value: 2280000 },
      { date: 'Jul', value: 2350000 },
      { date: 'Aug', value: 2400000 },
      { date: 'Sep', value: 2380000 },
      { date: 'Oct', value: 2450000 },
      { date: 'Nov', value: 2480000 },
      { date: 'Dec', value: 2500000, projectedLow: 3200000, projectedHigh: 4100000 }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-zinc-100 z-10">
        <div className="px-6 py-4 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-zinc-600">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">{t.back}</span>
          </button>
          <button className="p-2">
            <Settings className="w-5 h-5 text-zinc-600" />
          </button>
        </div>
      </div>

      <div className="px-6 py-8">
        {/* Account Name & Balance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-light mb-6">{accountData.name}</h1>
          
          <div className="mb-2">
            <p className="text-xs text-zinc-500 mb-1">{t.balance}</p>
            <p className="text-5xl font-light tracking-tight">
              TZS {(accountData.balance / 1000000).toFixed(2)}M
            </p>
          </div>

          <div className="flex items-center gap-2 text-black">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">+{accountData.growth}%</span>
            <span className="text-xs text-zinc-500">
              (+TZS {(accountData.growthAmount / 1000).toLocaleString()}) {t.thisYear}
            </span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex gap-3 mb-8"
        >
          <Button
            onClick={onDeposit}
            className="flex-1 bg-black text-white hover:bg-zinc-800 h-12"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t.deposit}
          </Button>
          <Button
            onClick={onWithdraw}
            variant="outline"
            className="flex-1 h-12 border-zinc-300"
          >
            <ArrowUpRight className="w-4 h-4 mr-2" />
            {t.withdraw}
          </Button>
        </motion.div>

        {/* Performance Graph */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card className="p-6 border-zinc-200">
            <StoryGraph
              data={accountData.historicalData}
              height={240}
              showProjection={true}
              showConfidenceBands={true}
              title={t.performance}
              subtitle={t.consistency}
            />

            {/* Timeframe Selector */}
            <div className="flex gap-2 mt-6 justify-center">
              {(['1M', '3M', '1Y', 'ALL'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-4 py-1.5 text-xs rounded-full transition-all ${
                    timeframe === tf
                      ? 'bg-black text-white'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Projection Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <Card className="p-6 bg-zinc-50 border-zinc-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-zinc-500 mb-1">{t.projected} {t.in10Years}</p>
                <p className="text-3xl font-light tracking-tight">
                  TZS {(accountData.projectedValue / 1000000).toFixed(1)}M
                </p>
                <p className="text-xs text-zinc-600 mt-2">
                  {language === 'sw' 
                    ? 'Kwa kuweka TZS 100,000 kila mwezi'
                    : 'With TZS 100,000 monthly deposits'
                  }
                </p>
              </div>
              <Info className="w-5 h-5 text-zinc-400" />
            </div>
          </Card>
        </motion.div>

        {/* Asset Allocation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-8"
        >
          <h3 className="text-lg font-light mb-4">{t.allocation}</h3>
          <Card className="p-6 border-zinc-200">
            <div className="space-y-4">
              {accountData.assets.map((asset, index) => (
                <div key={asset.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{asset.name}</span>
                    <div className="text-right">
                      <p className="text-sm font-medium">{asset.allocation}%</p>
                      <p className="text-xs text-zinc-500">
                        TZS {(asset.amount / 1000).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-black"
                      initial={{ width: 0 }}
                      animate={{ width: `${asset.allocation}%` }}
                      transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <h3 className="text-lg font-light mb-4">{t.about}</h3>
          <Card className="p-6 border-zinc-200">
            <div className="space-y-4">
              <div>
                <p className="text-xs text-zinc-500 mb-1">{t.purpose}</p>
                <p className="text-sm">{accountData.purpose}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-1">{t.riskLevel}</p>
                <p className="text-sm">{accountData.riskLevel}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
