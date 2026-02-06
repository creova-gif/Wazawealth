import { useState } from "react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { motion, AnimatePresence } from "motion/react";
import { CircularProgress } from "./CircularProgress";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface RiskAssessmentScreenProps {
  language: 'sw' | 'en';
  accessToken: string;
  onComplete: (profile: any, suggestions: any) => void;
}

export function RiskAssessmentScreen({ language, accessToken, onComplete }: RiskAssessmentScreenProps) {
  const [step, setStep] = useState(0);
  const [age, setAge] = useState(25);
  const [investmentGoal, setInvestmentGoal] = useState('');
  const [riskTolerance, setRiskTolerance] = useState(50);
  const [experience, setExperience] = useState('');
  const [loading, setLoading] = useState(false);

  const t = language === 'sw' ? {
    title: 'Tunafahamu Wewe',
    subtitle: 'Tujue jinsi ya kukusaidia',
    age: 'Umri wako ni nini?',
    years: 'miaka',
    goal: 'Unawekeza kwa nini?',
    risk: 'Unaishi vipi na hatari?',
    experience: 'Uzoefu wako ni upi?',
    next: 'Endelea',
    back: 'Rudi',
    submit: 'Maliza',
    low: 'Ninapenda usalama',
    moderate: 'Nina uwiano',
    high: 'Ninaweza kuchukua hatari',
    beginner: 'Ninaanza sasa',
    intermediate: 'Nina maarifa machache',
    advanced: 'Nina uzoefu',
    goals: {
      education: 'Kujengea elimu',
      retirement: 'Kujengea siku zijazo',
      business: 'Kuanza biashara',
      wealth: 'Kuongeza mali'
    },
    goalDesc: {
      education: 'Kusoma, kujifunza, au kujengea watoto',
      retirement: 'Kujiandaa kwa wakati nitakapoacha kazi',
      business: 'Kuanza au kuongeza biashara yangu',
      wealth: 'Kuongeza mali yangu kwa muda mrefu'
    },
    riskDesc: {
      low: 'Ninapenda usalama. Sina haraka.',
      moderate: 'Ninaweza kuchukua hatari kidogo kwa faida ya muda mrefu.',
      high: 'Ninaweza kuona bei ikiteremka bila wasiwasi.'
    },
    step: 'Hatua',
    ageHelper: 'Hii itatusaidia kukupa ushauri unaofaa'
  } : {
    title: 'Getting to know you',
    subtitle: 'Help us understand you',
    age: 'How old are you?',
    years: 'years old',
    goal: 'What are you saving for?',
    risk: 'How do you feel about ups and downs?',
    experience: 'Have you invested before?',
    next: 'Continue',
    back: 'Back',
    submit: 'Complete',
    low: 'I prefer safety',
    moderate: 'I can handle some risk',
    high: 'I can handle volatility',
    beginner: "I'm just starting",
    intermediate: 'I know a bit',
    advanced: 'I have experience',
    goals: {
      education: 'Education',
      retirement: 'Future security',
      business: 'Start a business',
      wealth: 'Build wealth'
    },
    goalDesc: {
      education: 'Saving for school, learning, or my kids',
      retirement: 'Planning for when I stop working',
      business: 'Starting or growing my business',
      wealth: 'Growing my wealth over time'
    },
    riskDesc: {
      low: 'I prefer safety. No rush.',
      moderate: 'I can take some risk for long-term gains.',
      high: 'I can watch prices drop without worry.'
    },
    step: 'Step',
    ageHelper: 'This helps us give you the right advice'
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { projectId } = await import('@/utils/supabase/info');
      const apiUrl = `https://${projectId}.supabase.co/functions/v1/make-server-f0a5cca3`;

      const riskLevel = riskTolerance < 40 ? 'low' : riskTolerance > 70 ? 'high' : 'moderate';

      const response = await fetch(`${apiUrl}/risk-assessment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          age,
          investmentGoal,
          riskTolerance: riskLevel,
          experience
        })
      });

      const data = await response.json();
      onComplete(data.riskProfile, data.portfolioSuggestions);
    } catch (error) {
      console.error('Risk assessment error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = () => {
    // Changed to grayscale for calm, minimal look
    if (riskTolerance < 40) return '#000000'; // Black
    if (riskTolerance > 70) return '#000000'; // Black
    return '#000000'; // Black - all same for minimal design
  };

  const getRiskLabel = () => {
    if (riskTolerance < 40) return t.low;
    if (riskTolerance > 70) return t.high;
    return t.moderate;
  };

  const steps = [
    // Step 0: Age
    <motion.div
      key="age"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-12"
    >
      <div className="text-center mb-12">
        <h3 className="text-4xl font-bold text-black mb-3 tracking-tight">{t.age}</h3>
        <p className="text-base text-gray-500">{t.ageHelper}</p>
      </div>

      <div className="flex justify-center mb-12">
        <CircularProgress
          percentage={(age / 100) * 100}
          size={200}
          color="#000000"
        >
          <div className="text-center">
            <div className="text-6xl font-bold text-black">{age}</div>
            <div className="text-sm text-gray-500 uppercase tracking-wider mt-2">{t.years}</div>
          </div>
        </CircularProgress>
      </div>

      <div className="space-y-4">
        <Slider
          value={[age]}
          onValueChange={(value) => setAge(value[0])}
          min={18}
          max={100}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-400 font-medium">
          <span>18</span>
          <span>100</span>
        </div>
      </div>
    </motion.div>,

    // Step 1: Investment Goal
    <motion.div
      key="goal"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="text-center mb-12">
        <h3 className="text-4xl font-bold text-black mb-3 tracking-tight">{t.goal}</h3>
        <p className="text-base text-gray-500">What are you investing for?</p>
      </div>

      <div className="space-y-3">
        {[
          { id: 'education', label: t.goals.education, desc: t.goalDesc.education },
          { id: 'retirement', label: t.goals.retirement, desc: t.goalDesc.retirement },
          { id: 'business', label: t.goals.business, desc: t.goalDesc.business },
          { id: 'wealth', label: t.goals.wealth, desc: t.goalDesc.wealth }
        ].map((goal, idx) => (
          <motion.button
            key={goal.id}
            onClick={() => setInvestmentGoal(goal.id)}
            className={`w-full p-6 rounded-2xl border-2 transition-all text-left ${
              investmentGoal === goal.id
                ? 'border-black bg-black text-white'
                : 'border-gray-200 bg-white text-black hover:border-gray-400'
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + idx * 0.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <p className="font-semibold text-lg mb-1">{goal.label}</p>
            <p className={`text-sm ${investmentGoal === goal.id ? 'text-gray-300' : 'text-gray-500'}`}>
              {goal.desc}
            </p>
          </motion.button>
        ))}
      </div>
    </motion.div>,

    // Step 2: Risk Tolerance
    <motion.div
      key="risk"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-12"
    >
      <div className="text-center mb-12">
        <h3 className="text-4xl font-bold text-black mb-3 tracking-tight">{t.risk}</h3>
        <p className="text-base text-gray-500">How comfortable are you with market fluctuations?</p>
      </div>

      <div className="flex justify-center mb-12">
        <CircularProgress
          percentage={riskTolerance}
          size={220}
          color={getRiskColor()}
          showPercentage={false}
        >
          <div className="text-center">
            <div className="text-6xl font-bold text-black">{riskTolerance}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mt-3">
              {getRiskLabel()}
            </div>
            <p className="text-sm text-gray-500">{t.riskDesc[getRiskLabel()]}</p>
          </div>
        </CircularProgress>
      </div>

      <div className="space-y-4">
        <Slider
          value={[riskTolerance]}
          onValueChange={(value) => setRiskTolerance(value[0])}
          min={0}
          max={100}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-400 font-medium">
          <span>{t.low}</span>
          <span>{t.moderate}</span>
          <span>{t.high}</span>
        </div>
      </div>
    </motion.div>,

    // Step 3: Experience
    <motion.div
      key="experience"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="text-center mb-12">
        <h3 className="text-4xl font-bold text-black mb-3 tracking-tight">{t.experience}</h3>
        <p className="text-base text-gray-500">How experienced are you with investing?</p>
      </div>

      <div className="space-y-3">
        {[
          { id: 'beginner', label: t.beginner },
          { id: 'intermediate', label: t.intermediate },
          { id: 'advanced', label: t.advanced }
        ].map((exp, idx) => (
          <motion.button
            key={exp.id}
            onClick={() => setExperience(exp.id)}
            className={`w-full p-6 rounded-2xl border-2 transition-all text-left ${
              experience === exp.id
                ? 'border-black bg-black text-white'
                : 'border-gray-200 bg-white text-black hover:border-gray-400'
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + idx * 0.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <p className="font-semibold text-lg">{exp.label}</p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  ];

  const canProgress = () => {
    if (step === 0) return age >= 18;
    if (step === 1) return investmentGoal !== '';
    if (step === 2) return true;
    if (step === 3) return experience !== '';
    return false;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-md mx-auto">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
            {t.step} {step + 1} / 4
          </p>
          <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-gray-100 h-1">
        <motion.div
          className="bg-gray-900 h-full"
          initial={{ width: 0 }}
          animate={{ width: `${((step + 1) / 4) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-12 overflow-y-auto">
        <div className="max-w-md mx-auto">
          <AnimatePresence mode="wait">
            {steps[step]}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer with buttons */}
      <div className="bg-white border-t border-gray-100 px-6 py-6">
        <div className="max-w-md mx-auto flex gap-4">
          {step > 0 && (
            <Button
              onClick={() => setStep(step - 1)}
              variant="outline"
              className="flex-1 py-6 rounded-xl border-2 border-gray-300 font-semibold text-gray-900 hover:bg-gray-50"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              {t.back}
            </Button>
          )}

          <Button
            onClick={() => {
              if (step < 3) {
                setStep(step + 1);
              } else {
                handleSubmit();
              }
            }}
            disabled={!canProgress() || loading}
            className={`${step === 0 ? 'w-full' : 'flex-1'} bg-gray-900 hover:bg-gray-800 text-white py-6 rounded-xl font-semibold border-0 disabled:opacity-50`}
          >
            {loading ? (
              <motion.div
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              <>
                {step === 3 ? t.submit : t.next}
                {step < 3 && <ChevronRight className="w-5 h-5 ml-2" />}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}