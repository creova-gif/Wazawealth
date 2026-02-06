import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Sliders, TrendingUp, Info } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { StoryGraph } from './StoryGraph';

interface Props {
  language: 'sw' | 'en';
  onBack: () => void;
  currentBalance: number;
}

export function ScenarioPlanner({ language, onBack, currentBalance }: Props) {
  const [monthlyDeposit, setMonthlyDeposit] = useState(100000);
  const [years, setYears] = useState(10);
  const [returnRate, setReturnRate] = useState(8);

  const content = {
    sw: {
      title: 'Panga Mustakabali Wako',
      subtitle: 'Angalia jinsi pesa zako zinavyoweza kukua',
      monthlyDeposit: 'Uwekaji wa Kila Mwezi',
      timeHorizon: 'Muda (Miaka)',
      expectedReturn: 'Ukuaji Unaotarajiwa',
      projection: 'Makadirio',
      yourFuture: 'Wewe wa Baadaye',
      in: 'Baada ya',
      years: 'miaka',
      youCouldHave: 'unaweza kuwa na',
      breakdown: 'Muhtasari',
      totalDeposits: 'Jumla ya Uwekaji',
      growthEarned: 'Ukuaji Uliopatikana',
      assumptions: 'Makadirio haya yanategemea ukuaji thabiti. Matokeo halisi yanaweza kutofautiana.',
      startPlanning: 'Anza Kupanga'
    },
    en: {
      title: 'Plan Your Future',
      subtitle: 'See how your money could grow',
      monthlyDeposit: 'Monthly Deposit',
      timeHorizon: 'Time Horizon (Years)',
      expectedReturn: 'Expected Growth',
      projection: 'Projection',
      yourFuture: 'Your Future',
      in: 'In',
      years: 'years',
      youCouldHave: 'you could have',
      breakdown: 'Breakdown',
      totalDeposits: 'Total Deposits',
      growthEarned: 'Growth Earned',
      assumptions: 'These projections assume steady growth. Actual results may vary.',
      startPlanning: 'Start Planning'
    }
  };

  const t = content[language];

  // Calculate future value
  const calculateFutureValue = () => {
    const monthlyRate = returnRate / 100 / 12;
    const months = years * 12;
    
    // Future value of current balance
    const futureValueCurrent = currentBalance * Math.pow(1 + monthlyRate, months);
    
    // Future value of monthly deposits (annuity)
    const futureValueDeposits = monthlyDeposit * 
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    
    return futureValueCurrent + futureValueDeposits;
  };

  const futureValue = calculateFutureValue();
  const totalDeposits = currentBalance + (monthlyDeposit * years * 12);
  const growthEarned = futureValue - totalDeposits;

  // Generate projection data
  const projectionData = Array.from({ length: years + 1 }, (_, i) => {
    const yearMonths = i * 12;
    const monthlyRate = returnRate / 100 / 12;
    
    const fvCurrent = currentBalance * Math.pow(1 + monthlyRate, yearMonths);
    const fvDeposits = i === 0 ? 0 : monthlyDeposit * 
      ((Math.pow(1 + monthlyRate, yearMonths) - 1) / monthlyRate);
    
    const value = fvCurrent + fvDeposits;
    
    // Add confidence bands for future years
    const confidenceLow = i === 0 ? undefined : value * 0.85;
    const confidenceHigh = i === 0 ? undefined : value * 1.15;
    
    return {
      date: `Year ${i}`,
      value: value,
      projectedLow: confidenceLow,
      projectedHigh: confidenceHigh
    };
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-zinc-100 z-10">
        <div className="px-6 py-4 flex items-center">
          <button onClick={onBack} className="flex items-center gap-2 text-zinc-600">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">{language === 'sw' ? 'Rudi' : 'Back'}</span>
          </button>
        </div>
      </div>

      <div className="px-6 py-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-light mb-2">{t.title}</h1>
          <p className="text-sm text-zinc-500">{t.subtitle}</p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6 mb-8"
        >
          {/* Monthly Deposit */}
          <Card className="p-6 border-zinc-200">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium">{t.monthlyDeposit}</label>
              <span className="text-lg font-light">
                TZS {monthlyDeposit.toLocaleString()}
              </span>
            </div>
            <Slider
              value={[monthlyDeposit]}
              onValueChange={(value) => setMonthlyDeposit(value[0])}
              min={10000}
              max={1000000}
              step={10000}
              className="w-full"
            />
          </Card>

          {/* Time Horizon */}
          <Card className="p-6 border-zinc-200">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium">{t.timeHorizon}</label>
              <span className="text-lg font-light">{years} {t.years}</span>
            </div>
            <Slider
              value={[years]}
              onValueChange={(value) => setYears(value[0])}
              min={1}
              max={30}
              step={1}
              className="w-full"
            />
          </Card>

          {/* Expected Return */}
          <Card className="p-6 border-zinc-200">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium">{t.expectedReturn}</label>
              <span className="text-lg font-light">{returnRate}%</span>
            </div>
            <Slider
              value={[returnRate]}
              onValueChange={(value) => setReturnRate(value[0])}
              min={3}
              max={15}
              step={0.5}
              className="w-full"
            />
          </Card>
        </motion.div>

        {/* Projection Result */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card className="p-8 bg-zinc-50 border-zinc-200">
            <div className="text-center mb-6">
              <p className="text-sm text-zinc-500 mb-2">{t.yourFuture}</p>
              <p className="text-base text-zinc-600 mb-2">
                {t.in} {years} {t.years}, {t.youCouldHave}
              </p>
              <p className="text-5xl font-light tracking-tight">
                TZS {(futureValue / 1000000).toFixed(2)}M
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-zinc-500 bg-white p-3 rounded-lg">
              <Info className="w-4 h-4 flex-shrink-0" />
              <p>{t.assumptions}</p>
            </div>
          </Card>
        </motion.div>

        {/* Graph */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <Card className="p-6 border-zinc-200">
            <StoryGraph
              data={projectionData}
              height={250}
              showProjection={true}
              showConfidenceBands={true}
              title={t.projection}
            />
          </Card>
        </motion.div>

        {/* Breakdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-8"
        >
          <h3 className="text-lg font-light mb-4">{t.breakdown}</h3>
          <Card className="p-6 border-zinc-200">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-600">{t.totalDeposits}</span>
                <span className="text-lg font-light">
                  TZS {(totalDeposits / 1000000).toFixed(2)}M
                </span>
              </div>
              <div className="h-px bg-zinc-200" />
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-600">{t.growthEarned}</span>
                <span className="text-lg font-light text-black">
                  +TZS {(growthEarned / 1000000).toFixed(2)}M
                </span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Button
            onClick={() => onBack()}
            className="w-full h-12 bg-black text-white hover:bg-zinc-800"
          >
            {t.startPlanning}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
