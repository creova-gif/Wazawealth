import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Sparkles, TrendingUp, CheckCircle, X } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { StoryGraph } from './StoryGraph';

interface Props {
  language: 'sw' | 'en';
  onBack: () => void;
  currentGoal: {
    name: string;
    currentValue: number;
    targetValue: number;
    monthlyContribution: number;
    timeHorizon: number; // months
  };
}

export function EnhancedScenarioBuilder({ language, onBack, currentGoal }: Props) {
  const [monthlyContribution, setMonthlyContribution] = useState(currentGoal.monthlyContribution);
  const [timeHorizon, setTimeHorizon] = useState(currentGoal.timeHorizon);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const microcopy = {
    en: {
      title: 'Scenario Builder',
      currentPlan: 'Current Plan',
      newScenario: 'New Scenario',
      monthlyContribution: 'Monthly Contribution',
      timeHorizon: 'Time Horizon',
      months: 'months',
      years: 'years',
      projectedValue: 'Projected Value',
      by: 'by',
      confidence: 'Confidence',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      aiInsight: {
        positive: 'This scenario works',
        stretch: 'Ambitious target',
        unrealistic: "Let's adjust"
      },
      applyChanges: 'Apply Changes',
      reset: 'Reset',
      adjustTimeline: 'Adjust Timeline',
      reduceGoal: 'Reduce Goal',
      extendTime: 'Extend Time',
      applyTitle: 'Apply changes to your goal?',
      newPlan: 'Your new plan',
      monthly: 'Monthly',
      timeline: 'Timeline',
      reminder: "We'll remind you to stay on track",
      apply: 'Apply',
      cancel: 'Cancel',
      successTitle: 'Goal Updated',
      successMessage: "Your new plan is active. We'll send a reminder on the 1st of each month.",
      viewGoal: 'View Goal',
      done: 'Done',
      willBuy: 'This will buy approximately',
      shares: 'shares per month',
      totalShares: 'Total shares by target date',
      confidenceDesc: {
        high: 'Very likely to achieve with current market conditions',
        medium: 'Achievable with consistent contributions',
        low: 'May require adjustments or extended timeline'
      }
    },
    sw: {
      title: 'Mjenzi wa Mipango',
      currentPlan: 'Mpango wa Sasa',
      newScenario: 'Mpango Mpya',
      monthlyContribution: 'Mchango wa Kila Mwezi',
      timeHorizon: 'Muda',
      months: 'miezi',
      years: 'miaka',
      projectedValue: 'Thamani Inayotarajiwa',
      by: 'ifikapo',
      confidence: 'Imani',
      high: 'Juu',
      medium: 'Wastani',
      low: 'Chini',
      aiInsight: {
        positive: 'Mpango huu unafanya kazi',
        stretch: 'Lengo zito',
        unrealistic: 'Hebu turekebishe'
      },
      applyChanges: 'Tekeleza Mabadiliko',
      reset: 'Weka Upya',
      adjustTimeline: 'Rekebisha Muda',
      reduceGoal: 'Punguza Lengo',
      extendTime: 'Ongeza Muda',
      applyTitle: 'Tekeleza mabadiliko kwa lengo lako?',
      newPlan: 'Mpango wako mpya',
      monthly: 'Kila mwezi',
      timeline: 'Muda',
      reminder: 'Tutakukumbusha kukaa kwenye njia',
      apply: 'Tekeleza',
      cancel: 'Ghairi',
      successTitle: 'Lengo Limesasishwa',
      successMessage: 'Mpango wako mpya umeanza. Tutakutumia ukumbusho tarehe 1 kila mwezi.',
      viewGoal: 'Angalia Lengo',
      done: 'Imekamilika',
      willBuy: 'Hii itanunua takriban',
      shares: 'hisa kwa mwezi',
      totalShares: 'Jumla ya hisa kwa tarehe ya lengo',
      confidenceDesc: {
        high: 'Inawezekana sana kufikia kwa hali ya sasa ya soko',
        medium: 'Inawezekana na michango thabiti',
        low: 'Inaweza kuhitaji marekebisho au muda zaidi'
      }
    }
  };

  const t = microcopy[language];

  // Calculate projected value (simplified)
  const calculateProjectedValue = (contribution: number, months: number) => {
    const annualReturn = 0.12; // 12% annual return assumption
    const monthlyReturn = annualReturn / 12;
    let value = currentGoal.currentValue;
    
    for (let i = 0; i < months; i++) {
      value = value * (1 + monthlyReturn) + contribution;
    }
    
    return value;
  };

  const projectedValue = calculateProjectedValue(monthlyContribution, timeHorizon);
  const currentProjectedValue = calculateProjectedValue(currentGoal.monthlyContribution, currentGoal.timeHorizon);
  
  // Calculate confidence level
  const getConfidenceLevel = () => {
    const progress = (projectedValue / currentGoal.targetValue) * 100;
    if (progress >= 95) return 'high';
    if (progress >= 75) return 'medium';
    return 'low';
  };

  const confidenceLevel = getConfidenceLevel();

  // Get AI insight
  const getAIInsight = () => {
    const progress = (projectedValue / currentGoal.targetValue) * 100;
    if (progress >= 95) return t.aiInsight.positive;
    if (progress >= 75) return t.aiInsight.stretch;
    return t.aiInsight.unrealistic;
  };

  // Generate projection data for graph
  const generateProjectionData = () => {
    const data = [];
    const monthsToShow = Math.max(timeHorizon, currentGoal.timeHorizon);
    const step = Math.ceil(monthsToShow / 12);
    
    for (let i = 0; i <= monthsToShow; i += step) {
      const value = i === 0 ? currentGoal.currentValue : calculateProjectedValue(monthlyContribution, i);
      const currentValue = i === 0 ? currentGoal.currentValue : calculateProjectedValue(currentGoal.monthlyContribution, i);
      
      data.push({
        date: `M${i}`,
        value: currentValue,
        projectedLow: value * 0.9,
        projectedHigh: value * 1.1
      });
    }
    
    return data;
  };

  const handleApply = () => {
    setShowApplyModal(false);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onBack();
    }, 3000);
  };

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

      {/* Current vs New Comparison */}
      <div className="px-6 pt-6 pb-4">
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 border-zinc-200 bg-zinc-50">
            <p className="text-xs text-zinc-500 mb-1 uppercase tracking-wide">{t.currentPlan}</p>
            <p className="text-2xl font-light">
              {(currentProjectedValue / 1000000).toFixed(1)}M
            </p>
            <p className="text-xs text-zinc-600 mt-1">
              TZS {currentGoal.monthlyContribution.toLocaleString()}/mo
            </p>
          </Card>

          <Card className={`p-4 border-2 ${
            confidenceLevel === 'high' ? 'border-green-500 bg-green-50' :
            confidenceLevel === 'medium' ? 'border-amber-500 bg-amber-50' :
            'border-red-500 bg-red-50'
          }`}>
            <p className="text-xs text-zinc-700 mb-1 uppercase tracking-wide">{t.newScenario}</p>
            <p className="text-2xl font-light">
              {(projectedValue / 1000000).toFixed(1)}M
            </p>
            <p className="text-xs text-zinc-700 mt-1">
              TZS {monthlyContribution.toLocaleString()}/mo
            </p>
          </Card>
        </div>
      </div>

      {/* Projection Graph */}
      <div className="px-6 py-4">
        <Card className="p-6 border-zinc-200">
          <StoryGraph
            data={generateProjectionData()}
            height={200}
            showProjection={true}
            showConfidenceBands={true}
            title={t.projectedValue}
            subtitle={`${t.by} ${new Date(Date.now() + timeHorizon * 30 * 24 * 60 * 60 * 1000).getFullYear()}`}
          />
        </Card>
      </div>

      {/* AI Insight */}
      <div className="px-6 py-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className={`p-6 ${
            confidenceLevel === 'high' ? 'bg-green-50 border-green-100' :
            confidenceLevel === 'medium' ? 'bg-blue-50 border-blue-100' :
            'bg-amber-50 border-amber-100'
          }`}>
            <div className="flex items-start gap-3 mb-4">
              <Sparkles className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                confidenceLevel === 'high' ? 'text-green-700' :
                confidenceLevel === 'medium' ? 'text-blue-700' :
                'text-amber-700'
              }`} />
              <div className="flex-1">
                <p className={`text-sm font-medium mb-2 ${
                  confidenceLevel === 'high' ? 'text-green-900' :
                  confidenceLevel === 'medium' ? 'text-blue-900' :
                  'text-amber-900'
                }`}>
                  {getAIInsight()}
                </p>
                <p className={`text-sm ${
                  confidenceLevel === 'high' ? 'text-green-800' :
                  confidenceLevel === 'medium' ? 'text-blue-800' :
                  'text-amber-800'
                }`}>
                  {t.confidenceDesc[confidenceLevel]}
                </p>
              </div>
            </div>

            {/* Confidence Indicator */}
            <div>
              <p className="text-xs text-zinc-600 mb-2">{t.confidence}</p>
              <div className="flex gap-1">
                {[1, 2, 3].map((level) => (
                  <div
                    key={level}
                    className={`h-2 flex-1 rounded-full ${
                      (confidenceLevel === 'high' && level <= 3) ||
                      (confidenceLevel === 'medium' && level <= 2) ||
                      (confidenceLevel === 'low' && level <= 1)
                        ? confidenceLevel === 'high' ? 'bg-green-600' :
                          confidenceLevel === 'medium' ? 'bg-blue-600' :
                          'bg-amber-600'
                        : 'bg-zinc-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="px-6 py-6 space-y-6">
        {/* Monthly Contribution Slider */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium">{t.monthlyContribution}</label>
            <p className="text-lg font-light">TZS {monthlyContribution.toLocaleString()}</p>
          </div>
          <input
            type="range"
            min="10000"
            max="1000000"
            step="10000"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
            className="w-full h-2 bg-zinc-200 rounded-full appearance-none cursor-pointer accent-black"
          />
          <div className="flex justify-between mt-2">
            <button
              onClick={() => setMonthlyContribution(Math.max(10000, monthlyContribution - 50000))}
              className="text-sm text-zinc-600 hover:text-black"
            >
              -50K
            </button>
            <button
              onClick={() => setMonthlyContribution(monthlyContribution + 50000)}
              className="text-sm text-zinc-600 hover:text-black"
            >
              +50K
            </button>
          </div>
        </div>

        {/* Time Horizon Slider */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium">{t.timeHorizon}</label>
            <p className="text-lg font-light">
              {timeHorizon >= 12 
                ? `${Math.floor(timeHorizon / 12)} ${t.years}`
                : `${timeHorizon} ${t.months}`
              }
            </p>
          </div>
          <input
            type="range"
            min="6"
            max="240"
            step="6"
            value={timeHorizon}
            onChange={(e) => setTimeHorizon(Number(e.target.value))}
            className="w-full h-2 bg-zinc-200 rounded-full appearance-none cursor-pointer accent-black"
          />
          <div className="flex justify-between mt-2">
            <button
              onClick={() => setTimeHorizon(Math.max(6, timeHorizon - 12))}
              className="text-sm text-zinc-600 hover:text-black"
            >
              -1 {language === 'en' ? 'year' : 'mwaka'}
            </button>
            <button
              onClick={() => setTimeHorizon(timeHorizon + 12)}
              className="text-sm text-zinc-600 hover:text-black"
            >
              +1 {language === 'en' ? 'year' : 'mwaka'}
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-8 space-y-3">
        <Button
          onClick={() => setShowApplyModal(true)}
          className="w-full h-14 bg-black text-white hover:bg-zinc-800"
        >
          {t.applyChanges}
        </Button>
        <Button
          onClick={() => {
            setMonthlyContribution(currentGoal.monthlyContribution);
            setTimeHorizon(currentGoal.timeHorizon);
          }}
          variant="outline"
          className="w-full h-12 border-2 border-zinc-300 hover:border-zinc-500"
        >
          {t.reset}
        </Button>
      </div>

      {/* Apply Confirmation Modal */}
      <AnimatePresence>
        {showApplyModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setShowApplyModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 p-6"
            >
              <h2 className="text-2xl font-light mb-6">{t.applyTitle}</h2>

              <Card className="p-6 border-zinc-200 bg-zinc-50 mb-6">
                <p className="text-sm text-zinc-600 mb-4">{t.newPlan}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-zinc-700">{t.monthly}</p>
                    <p className="text-lg font-light">TZS {monthlyContribution.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-zinc-700">{t.timeline}</p>
                    <p className="text-lg font-light">
                      {timeHorizon >= 12 
                        ? `${Math.floor(timeHorizon / 12)} ${t.years}`
                        : `${timeHorizon} ${t.months}`
                      }
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-zinc-200">
                    <p className="text-sm font-medium">{t.projectedValue}</p>
                    <p className="text-2xl font-light">{(projectedValue / 1000000).toFixed(1)}M</p>
                  </div>
                </div>
              </Card>

              <p className="text-sm text-zinc-600 text-center mb-6">{t.reminder}</p>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowApplyModal(false)}
                  className="flex-1 h-12 border-2"
                >
                  {t.cancel}
                </Button>
                <Button
                  onClick={handleApply}
                  className="flex-1 h-12 bg-black text-white hover:bg-zinc-800"
                >
                  {t.apply}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-50 flex items-center justify-center p-6"
          >
            <div className="text-center max-w-md">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.6 }}
                className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-12 h-12 text-green-600" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-3xl font-light mb-3">{t.successTitle}</h2>
                <p className="text-base text-zinc-600 mb-8">{t.successMessage}</p>
                
                <Button
                  onClick={() => {
                    setShowSuccess(false);
                    onBack();
                  }}
                  className="w-full h-12 bg-black text-white hover:bg-zinc-800"
                >
                  {t.done}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
