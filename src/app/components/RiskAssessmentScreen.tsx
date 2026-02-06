import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Progress } from "./ui/progress";
import { Slider } from "./ui/slider";

interface RiskAssessmentScreenProps {
  language: 'sw' | 'en';
  accessToken: string;
  onComplete: (riskProfile: any, suggestions: any) => void;
}

export function RiskAssessmentScreen({ language, accessToken, onComplete }: RiskAssessmentScreenProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [assessment, setAssessment] = useState({
    age: '',
    investmentGoal: '',
    riskTolerance: 50, // 0-100 slider value
    experience: ''
  });

  const t = language === 'sw' ? {
    title: 'Tathmini ya Hatari',
    subtitle: 'Tutatumia majibu yako kutoa ushauri bora',
    age: 'Umri wako?',
    ageOptions: [
      { value: '18-25', label: '18-25' },
      { value: '26-35', label: '26-35' },
      { value: '36-50', label: '36-50' },
      { value: '51+', label: '51+' }
    ],
    goal: 'Lengo lako la uwekezaji?',
    goalOptions: [
      { value: 'save', label: 'Kuhifadhi pesa' },
      { value: 'grow', label: 'Kuongeza mali' },
      { value: 'income', label: 'Mapato ya kudumu' },
      { value: 'retire', label: 'Kustaafu' }
    ],
    risk: 'Unaweza kukubali hatari kiasi gani?',
    riskOptions: [
      { value: 'low', label: 'Ndogo - Salama zaidi' },
      { value: 'moderate', label: 'Wastani - Usawa' },
      { value: 'high', label: 'Kubwa - Ukuaji mkubwa' }
    ],
    riskLow: 'Ndogo (Salama)',
    riskModerate: 'Wastani',
    riskHigh: 'Kubwa (Ukuaji)',
    experience: 'Uzoefu wako wa uwekezaji?',
    expOptions: [
      { value: 'beginner', label: 'Mwanzo - Sijawahi' },
      { value: 'some', label: 'Kidogo - Nimewahi' },
      { value: 'experienced', label: 'Mzoefu' }
    ],
    next: 'Endelea',
    back: 'Rudi',
    submit: 'Maliza Tathmini',
    loading: 'Inasubiri...'
  } : {
    title: 'Risk Assessment',
    subtitle: "We'll use your answers to provide the best advice",
    age: 'What is your age?',
    ageOptions: [
      { value: '18-25', label: '18-25' },
      { value: '26-35', label: '26-35' },
      { value: '36-50', label: '36-50' },
      { value: '51+', label: '51+' }
    ],
    goal: 'What is your investment goal?',
    goalOptions: [
      { value: 'save', label: 'Save money' },
      { value: 'grow', label: 'Grow wealth' },
      { value: 'income', label: 'Steady income' },
      { value: 'retire', label: 'Retirement' }
    ],
    risk: 'How much risk can you accept?',
    riskOptions: [
      { value: 'low', label: 'Low - Safest' },
      { value: 'moderate', label: 'Moderate - Balanced' },
      { value: 'high', label: 'High - Maximum growth' }
    ],
    riskLow: 'Low (Safe)',
    riskModerate: 'Moderate',
    riskHigh: 'High (Growth)',
    experience: 'Your investment experience?',
    expOptions: [
      { value: 'beginner', label: 'Beginner - Never invested' },
      { value: 'some', label: 'Some - Invested before' },
      { value: 'experienced', label: 'Experienced' }
    ],
    next: 'Next',
    back: 'Back',
    submit: 'Complete Assessment',
    loading: 'Loading...'
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      const { projectId, publicAnonKey } = await import('@/utils/supabase/info');
      const apiUrl = `https://${projectId}.supabase.co/functions/v1/make-server-f0a5cca3`;
      
      const ageNumber = parseInt(assessment.age.split('-')[0]);
      
      // Convert slider value to risk tolerance
      let riskTolerance = 'moderate';
      if (assessment.riskTolerance < 33) riskTolerance = 'low';
      else if (assessment.riskTolerance > 66) riskTolerance = 'high';
      
      const response = await fetch(`${apiUrl}/risk-assessment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          age: ageNumber,
          investmentGoal: assessment.investmentGoal,
          riskTolerance: riskTolerance,
          experience: assessment.experience
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        onComplete(result.riskProfile, result.portfolioSuggestions);
      } else {
        console.error('Risk assessment error:', result.error);
      }
    } catch (err) {
      console.error('Risk assessment error:', err);
    } finally {
      setLoading(false);
    }
  };

  const progress = (step / 4) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 bg-white/95 backdrop-blur">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h2>
          <p className="text-sm text-gray-600 mb-4">{t.subtitle}</p>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-gray-500 mt-2">Hatua {step} / 4</p>
        </div>

        <div className="space-y-6">
          {step === 1 && (
            <div>
              <Label className="text-base font-semibold mb-3 block">{t.age}</Label>
              <RadioGroup value={assessment.age} onValueChange={(value) => setAssessment({...assessment, age: value})}>
                {t.ageOptions.map(option => (
                  <div key={option.value} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value={option.value} id={`age-${option.value}`} />
                    <Label htmlFor={`age-${option.value}`} className="flex-1 cursor-pointer">{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {step === 2 && (
            <div>
              <Label className="text-base font-semibold mb-3 block">{t.goal}</Label>
              <RadioGroup value={assessment.investmentGoal} onValueChange={(value) => setAssessment({...assessment, investmentGoal: value})}>
                {t.goalOptions.map(option => (
                  <div key={option.value} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value={option.value} id={`goal-${option.value}`} />
                    <Label htmlFor={`goal-${option.value}`} className="flex-1 cursor-pointer">{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {step === 3 && (
            <div>
              <Label className="text-base font-semibold mb-3 block">{t.risk}</Label>
              <div className="space-y-6 p-4 bg-gray-50 rounded-lg">
                <Slider
                  value={[assessment.riskTolerance]}
                  onValueChange={(value) => setAssessment({...assessment, riskTolerance: value[0]})}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm">
                  <span className={assessment.riskTolerance < 33 ? 'font-bold text-emerald-700' : 'text-gray-500'}>
                    {t.riskLow}
                  </span>
                  <span className={assessment.riskTolerance >= 33 && assessment.riskTolerance <= 66 ? 'font-bold text-teal-700' : 'text-gray-500'}>
                    {t.riskModerate}
                  </span>
                  <span className={assessment.riskTolerance > 66 ? 'font-bold text-orange-700' : 'text-gray-500'}>
                    {t.riskHigh}
                  </span>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border-2 border-emerald-200">
                  <p className="text-sm text-gray-600 mb-1">{language === 'sw' ? 'Kiwango chako' : 'Your level'}</p>
                  <p className="text-2xl font-bold text-emerald-700">{assessment.riskTolerance}%</p>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <Label className="text-base font-semibold mb-3 block">{t.experience}</Label>
              <RadioGroup value={assessment.experience} onValueChange={(value) => setAssessment({...assessment, experience: value})}>
                {t.expOptions.map(option => (
                  <div key={option.value} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value={option.value} id={`exp-${option.value}`} />
                    <Label htmlFor={`exp-${option.value}`} className="flex-1 cursor-pointer">{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-8">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              className="flex-1"
            >
              {t.back}
            </Button>
          )}
          
          {step < 4 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={
                (step === 1 && !assessment.age) ||
                (step === 2 && !assessment.investmentGoal) ||
                (step === 3 && !assessment.riskTolerance)
              }
              className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            >
              {t.next}
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!assessment.experience || loading}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            >
              {loading ? t.loading : t.submit}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}