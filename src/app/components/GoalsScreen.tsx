import { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, GraduationCap, Home, Briefcase, ShieldCheck, Target, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface GoalsScreenProps {
  language: 'sw' | 'en';
  onBack: () => void;
  onComplete: (goal: any) => void;
}

export function GoalsScreen({ language, onBack, onComplete }: GoalsScreenProps) {
  const [step, setStep] = useState<'select' | 'amount' | 'timeline'>('select');
  const [selectedGoal, setSelectedGoal] = useState<any>(null);
  const [targetAmount, setTargetAmount] = useState('');
  const [years, setYears] = useState(5);

  const t = language === 'sw' ? {
    title: 'Lengo lako ni nini?',
    subtitle: 'Tunaelewa vizuri unapotueleza malengo yako',
    goals: {
      education: {
        name: 'Ada za shule',
        description: 'Elimu ya watoto wako',
        icon: GraduationCap,
        timeframe: '3-10 miaka',
        risk: 'wastani'
      },
      business: {
        name: 'Anza biashara',
        description: 'Wekeza katika ndoto yako',
        icon: Briefcase,
        timeframe: '2-5 miaka',
        risk: 'juu'
      },
      emergency: {
        name: 'Akiba ya dharura',
        description: 'Ulinzi wa familia',
        icon: ShieldCheck,
        timeframe: '1-2 miaka',
        risk: 'chini'
      },
      home: {
        name: 'Nyumba au ardhi',
        description: 'Mali isiyohamishika',
        icon: Home,
        timeframe: '5-15 miaka',
        risk: 'wastani'
      },
      retirement: {
        name: 'Staafu',
        description: 'Amani baadaye',
        icon: Target,
        timeframe: '10-30 miaka',
        risk: 'wastani'
      }
    },
    howMuch: 'Kiasi gani unahitaji?',
    whenNeeded: 'Utahitaji lini?',
    years: 'miaka',
    continue: 'Endelea',
    back: 'Rudi',
    monthly: 'Kila mwezi',
    youNeed: 'Unahitaji kuweka',
    toReach: 'kufikia lengo lako',
    recommended: 'Tunapendekeza'
  } : {
    title: "What's your goal?",
    subtitle: 'We understand better when you tell us your goals',
    goals: {
      education: {
        name: 'School fees',
        description: "Your children's education",
        icon: GraduationCap,
        timeframe: '3-10 years',
        risk: 'medium'
      },
      business: {
        name: 'Start a business',
        description: 'Invest in your dream',
        icon: Briefcase,
        timeframe: '2-5 years',
        risk: 'high'
      },
      emergency: {
        name: 'Emergency fund',
        description: 'Family protection',
        icon: ShieldCheck,
        timeframe: '1-2 years',
        risk: 'low'
      },
      home: {
        name: 'Home or land',
        description: 'Immovable asset',
        icon: Home,
        timeframe: '5-15 years',
        risk: 'medium'
      },
      retirement: {
        name: 'Retirement',
        description: 'Peace later',
        icon: Target,
        timeframe: '10-30 years',
        risk: 'medium'
      }
    },
    howMuch: 'How much do you need?',
    whenNeeded: 'When will you need it?',
    years: 'years',
    continue: 'Continue',
    back: 'Back',
    monthly: 'Monthly',
    youNeed: 'You need to invest',
    toReach: 'to reach your goal',
    recommended: 'Recommended'
  };

  const goalsList = Object.entries(t.goals);

  const calculateMonthly = () => {
    if (!targetAmount || !years) return 0;
    const target = parseFloat(targetAmount);
    const months = years * 12;
    const monthlyReturn = 0.01; // 12% annual = 1% monthly (simplified)
    
    // Simple future value calculation with compound interest
    const monthly = target / ((Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn);
    return Math.round(monthly);
  };

  const handleGoalSelect = (goalKey: string) => {
    setSelectedGoal({
      key: goalKey,
      ...t.goals[goalKey as keyof typeof t.goals]
    });
    setStep('amount');
  };

  const handleComplete = () => {
    const goal = {
      type: selectedGoal.key,
      name: selectedGoal.name,
      targetAmount: parseFloat(targetAmount),
      years: years,
      monthlyContribution: calculateMonthly(),
      riskLevel: selectedGoal.risk
    };
    onComplete(goal);
  };

  const formatCurrency = (amount: number) => {
    return `TZS ${amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <button
            onClick={() => {
              if (step === 'select') {
                onBack();
              } else if (step === 'amount') {
                setStep('select');
              } else {
                setStep('amount');
              }
            }}
            className="p-2 hover:bg-gray-50 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-black" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-black">{t.title}</h1>
            <p className="text-xs text-gray-400">{t.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Step 1: Select Goal */}
        {step === 'select' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {goalsList.map(([key, goal], idx) => {
              const Icon = goal.icon;
              return (
                <motion.button
                  key={key}
                  onClick={() => handleGoalSelect(key)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="w-full bg-white border-2 border-gray-100 hover:border-black rounded-3xl p-6 text-left transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-black transition-colors">
                      <Icon className="w-7 h-7 text-gray-600 group-hover:text-white transition-colors" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-black mb-1">
                        {goal.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {goal.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span>{goal.timeframe}</span>
                        <span>•</span>
                        <span className="capitalize">{goal.risk} {language === 'sw' ? 'hatari' : 'risk'}</span>
                      </div>
                    </div>

                    <ChevronRight className="w-5 h-5 text-gray-300 flex-shrink-0 group-hover:text-black transition-colors" />
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        )}

        {/* Step 2: Target Amount */}
        {step === 'amount' && selectedGoal && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-black mb-2">
                {selectedGoal.name}
              </h2>
              <p className="text-base text-gray-600">
                {selectedGoal.description}
              </p>
            </div>

            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-3 block">
                {t.howMuch}
              </label>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-300">
                  TZS
                </span>
                <Input
                  type="number"
                  min="0"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                  placeholder="0"
                  className="text-4xl font-bold text-black border-2 border-gray-200 rounded-2xl pl-28 pr-6 py-8 focus:border-black focus:ring-0"
                />
              </div>
            </div>

            <Button
              onClick={() => setStep('timeline')}
              disabled={!targetAmount || parseFloat(targetAmount) <= 0}
              className="w-full bg-black text-white py-6 rounded-full font-semibold hover:bg-gray-900 transition-colors disabled:opacity-30"
            >
              {t.continue}
            </Button>
          </motion.div>
        )}

        {/* Step 3: Timeline */}
        {step === 'timeline' && selectedGoal && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-black mb-2">
                {selectedGoal.name}
              </h2>
              <p className="text-base text-gray-600">
                {formatCurrency(parseFloat(targetAmount))}
              </p>
            </div>

            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-3 block">
                {t.whenNeeded}
              </label>
              
              {/* Visual slider */}
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl font-bold text-black mb-2">
                    {years}
                  </div>
                  <div className="text-sm text-gray-500">{t.years}</div>
                </div>

                <input
                  type="range"
                  min="1"
                  max="30"
                  value={years}
                  onChange={(e) => setYears(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #000000 0%, #000000 ${(years / 30) * 100}%, #f3f4f6 ${(years / 30) * 100}%, #f3f4f6 100%)`
                  }}
                />
              </div>
            </div>

            {/* Recommendation */}
            <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
              <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-3">
                {t.recommended}
              </p>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold text-black">
                  {formatCurrency(calculateMonthly())}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {t.monthly} • {years} {t.years}
              </p>
            </div>

            <Button
              onClick={handleComplete}
              className="w-full bg-black text-white py-6 rounded-full font-semibold hover:bg-gray-900 transition-colors"
            >
              {t.continue}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}