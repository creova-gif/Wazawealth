// WAZA WEALTH — Crypto Awareness & Gating Flow
// Education-first, country-aware, compliance-safe

import { useState } from 'react';
import { motion } from 'motion/react';
import { X, AlertTriangle, Lock, BookOpen, CheckSquare, Square, Globe } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface Props {
  userCountry: 'TZ' | 'KE';
  kycLevel: 'none' | 'basic' | 'advanced';
  language: 'sw' | 'en';
  onClose: () => void;
  onApproved: () => void;
  onUpgradeKYC: () => void;
}

type Step = 'education' | 'country_check' | 'kyc_gate' | 'risk_quiz' | 'disclosure';

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export function CryptoAwarenessFlow({ 
  userCountry, 
  kycLevel, 
  language, 
  onClose,
  onApproved,
  onUpgradeKYC 
}: Props) {
  const [step, setStep] = useState<Step>('education');
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [disclosuresAccepted, setDisclosuresAccepted] = useState<boolean[]>([false, false, false]);

  const content = {
    sw: {
      cryptoAwareness: 'Uelewa wa Crypto',
      learnFirst: 'Jifunze Kwanza',
      education: 'Elimu',
      riskAssessment: 'Tathmini ya Hatari',
      disclosure: 'Ufunuo',
      continue: 'Endelea',
      cancel: 'Ghairi',
      whatIsCrypto: 'Cryptocurrency ni Nini?',
      cryptoDesc: 'Cryptocurrency ni mali ya dijiti inayotumia kriptografia kwa usalama. Haijadhibitiwa na serikali yoyote na inaweza kubadilika sana.',
      riskTitle: 'Hatari za Crypto',
      risk1: 'Mabadiliko makubwa ya bei (>50% kwa siku)',
      risk2: 'Hakuna dhamana za serikali',
      risk3: 'Mazingira ya udhibiti yanabadilika',
      risk4: 'Kodi tata',
      risk5: 'Unaweza kupoteza uwekezaji wako wote',
      countryTitle: 'Upatikanaji wa Nchi',
      tzWarning: 'Crypto bado haijaidhinishwa kwa ujumla nchini Tanzania. Huwezi kununua crypto kupitia WAZA.',
      keWarning: 'Kenya inaruhusu biashara ya crypto lakini na angalizo na maagizo ya kodi. Hakikisha unaelewa athari za kodi.',
      kycRequired: 'KYC Iliyoendelea Inahitajika',
      kycDesc: 'Kwa sababu za udhibiti, biashara ya crypto inahitaji uthibitishaji wa kiwango cha juu.',
      upgradeKYC: 'Boresha KYC',
      quizTitle: 'Jaribio la Uelewa',
      quizDesc: 'Jibu maswali 3 ili kuthibitisha unaelewa hatari.',
      question: 'Swali',
      quizQuestion1: 'Cryptocurrency inaweza:',
      quizAnswer1A: 'Kupanda tu kwa muda',
      quizAnswer1B: 'Kushuka hadi 50% au zaidi kwa siku moja',
      quizAnswer1C: 'Kubaki thabiti kama amana za benki',
      quizAnswer1D: 'Kuhakikishwa na serikali',
      quizQuestion2: 'Crypto inafaa zaidi kwa:',
      quizAnswer2A: 'Mahitaji ya haraka ya pesa',
      quizAnswer2B: 'Uwekezaji wa muda mrefu bila hatari',
      quizAnswer2C: 'Wale wanaoweza kupoteza pesa wanazowekeza',
      quizAnswer2D: 'Wawekezaji wapya',
      quizQuestion3: 'Ikiwa bei ya crypto inashuka 60%, unafanya nini?',
      quizAnswer3A: 'Uza haraka',
      quizAnswer3B: 'Nunua zaidi',
      quizAnswer3C: 'Kaa kimya - hili ni hatari niliyokubaliana',
      quizAnswer3D: 'Lalamika kwa WAZA',
      tryAgain: 'Jaribu Tena',
      disclosureTitle: 'Uthibitisho wa Hatari',
      disclosure1: 'Naelewa kuwa crypto ni hatari sana na ninaweza kupoteza pesa zote nilizowekeza.',
      disclosure2: 'Ninakubali kuwa hakuna dhamana za serikali na crypto haijadhibitiwa kamili.',
      disclosure3: 'Sitawekeza pesa ninazohitaji kwa hivi karibuni au nisiyoweza kupoteza.',
      agreeAll: 'Nakubali na uthibitisho wote',
      enableCrypto: 'Washa Biashara ya Crypto',
      educationMode: 'Angalia Bei Tu'
    },
    en: {
      cryptoAwareness: 'Crypto Awareness',
      learnFirst: 'Learn First',
      education: 'Education',
      riskAssessment: 'Risk Assessment',
      disclosure: 'Disclosure',
      continue: 'Continue',
      cancel: 'Cancel',
      whatIsCrypto: 'What is Cryptocurrency?',
      cryptoDesc: 'Cryptocurrency is a digital asset that uses cryptography for security. It is not controlled by any government and can be highly volatile.',
      riskTitle: 'Crypto Risks',
      risk1: 'Extreme price volatility (>50% in a day)',
      risk2: 'No government backing or insurance',
      risk3: 'Evolving regulatory landscape',
      risk4: 'Complex tax implications',
      risk5: 'You can lose your entire investment',
      countryTitle: 'Country Availability',
      tzWarning: 'Crypto is not yet fully authorized in Tanzania. You cannot buy crypto through WAZA.',
      keWarning: 'Kenya permits crypto trading but with caution and tax guidance. Make sure you understand tax implications.',
      kycRequired: 'Advanced KYC Required',
      kycDesc: 'For regulatory reasons, crypto trading requires advanced-level verification.',
      upgradeKYC: 'Upgrade KYC',
      quizTitle: 'Understanding Quiz',
      quizDesc: 'Answer 3 questions to confirm you understand the risks.',
      question: 'Question',
      quizQuestion1: 'Cryptocurrency can:',
      quizAnswer1A: 'Only go up over time',
      quizAnswer1B: 'Drop 50% or more in a single day',
      quizAnswer1C: 'Stay stable like bank deposits',
      quizAnswer1D: 'Be guaranteed by government',
      quizQuestion2: 'Crypto is best suited for:',
      quizAnswer2A: 'Short-term cash needs',
      quizAnswer2B: 'Low-risk long-term investing',
      quizAnswer2C: 'Those who can afford to lose the money',
      quizAnswer2D: 'New investors',
      quizQuestion3: 'If crypto price drops 60%, you should:',
      quizAnswer3A: 'Sell immediately',
      quizAnswer3B: 'Buy more',
      quizAnswer3C: 'Stay calm - this is a risk I accepted',
      quizAnswer3D: 'Complain to WAZA',
      tryAgain: 'Try Again',
      disclosureTitle: 'Risk Acknowledgment',
      disclosure1: 'I understand that crypto is highly risky and I can lose all invested money.',
      disclosure2: 'I accept that there is no government guarantee and crypto is not fully regulated.',
      disclosure3: 'I will not invest money I need soon or cannot afford to lose.',
      agreeAll: 'I agree to all disclosures',
      enableCrypto: 'Enable Crypto Trading',
      educationMode: 'View Prices Only'
    }
  };

  const t = content[language];

  const quizQuestions: QuizQuestion[] = [
    {
      question: t.quizQuestion1,
      options: [t.quizAnswer1A, t.quizAnswer1B, t.quizAnswer1C, t.quizAnswer1D],
      correctIndex: 1 // Answer B
    },
    {
      question: t.quizQuestion2,
      options: [t.quizAnswer2A, t.quizAnswer2B, t.quizAnswer2C, t.quizAnswer2D],
      correctIndex: 2 // Answer C
    },
    {
      question: t.quizQuestion3,
      options: [t.quizAnswer3A, t.quizAnswer3B, t.quizAnswer3C, t.quizAnswer3D],
      correctIndex: 2 // Answer C
    }
  ];

  const handleQuizAnswer = (answerIndex: number) => {
    const newAnswers = [...quizAnswers, answerIndex];
    setQuizAnswers(newAnswers);

    if (currentQuizQuestion < quizQuestions.length - 1) {
      setCurrentQuizQuestion(currentQuizQuestion + 1);
    } else {
      // Quiz complete - check if all correct
      const allCorrect = newAnswers.every((ans, idx) => ans === quizQuestions[idx].correctIndex);
      if (allCorrect) {
        setStep('disclosure');
      } else {
        // Failed quiz - reset
        alert(language === 'sw' 
          ? 'Majibu sio sahihi. Tafadhali soma elimu tena.'
          : 'Incorrect answers. Please review the education again.');
        setQuizAnswers([]);
        setCurrentQuizQuestion(0);
        setStep('education');
      }
    }
  };

  const handleEnableCrypto = () => {
    const allAccepted = disclosuresAccepted.every(d => d);
    if (!allAccepted) {
      alert(language === 'sw' 
        ? 'Tafadhali kubali uthibitisho wote'
        : 'Please accept all disclosures');
      return;
    }
    onApproved();
  };

  const renderContent = () => {
    switch (step) {
      case 'education':
        return (
          <div className="space-y-6">
            {/* What is Crypto */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-medium">{t.whatIsCrypto}</h3>
              </div>
              <Card className="p-5 border-zinc-200 bg-zinc-50">
                <p className="text-sm text-zinc-700 leading-relaxed">{t.cryptoDesc}</p>
              </Card>
            </div>

            {/* Risks */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-medium">{t.riskTitle}</h3>
              </div>
              <Card className="p-5 border-red-200 bg-red-50">
                <ul className="space-y-2">
                  {[t.risk1, t.risk2, t.risk3, t.risk4, t.risk5].map((risk, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-red-900">
                      <span className="text-red-600 font-bold">•</span>
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Country Check */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-medium">{t.countryTitle}</h3>
              </div>
              <Card className={`p-5 ${
                userCountry === 'TZ' ? 'border-red-200 bg-red-50' : 'border-amber-200 bg-amber-50'
              }`}>
                <p className={`text-sm leading-relaxed ${
                  userCountry === 'TZ' ? 'text-red-900' : 'text-amber-900'
                }`}>
                  {userCountry === 'TZ' ? t.tzWarning : t.keWarning}
                </p>
              </Card>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              {userCountry === 'KE' && (
                <Button
                  onClick={() => {
                    if (kycLevel === 'advanced') {
                      setStep('risk_quiz');
                    } else {
                      setStep('kyc_gate');
                    }
                  }}
                  className="w-full h-14 bg-black text-white hover:bg-zinc-800"
                >
                  {t.continue}
                </Button>
              )}
              <Button
                variant="outline"
                onClick={onClose}
                className="w-full h-12 border-2"
              >
                {userCountry === 'TZ' ? t.educationMode : t.cancel}
              </Button>
            </div>
          </div>
        );

      case 'kyc_gate':
        return (
          <div className="space-y-6 text-center py-8">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">{t.kycRequired}</h3>
              <p className="text-sm text-zinc-600 max-w-sm mx-auto">{t.kycDesc}</p>
            </div>
            <Card className="p-5 border-zinc-200 bg-zinc-50 text-left">
              <p className="text-xs text-zinc-500 mb-2">
                {language === 'sw' ? 'Kiwango cha Sasa' : 'Current Tier'}
              </p>
              <p className="text-lg font-medium capitalize">{kycLevel}</p>
            </Card>
            <div className="space-y-3">
              <Button
                onClick={onUpgradeKYC}
                className="w-full h-14 bg-black text-white hover:bg-zinc-800"
              >
                {t.upgradeKYC}
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                className="w-full h-12 border-2"
              >
                {t.cancel}
              </Button>
            </div>
          </div>
        );

      case 'risk_quiz':
        const currentQ = quizQuestions[currentQuizQuestion];
        return (
          <div className="space-y-6">
            <div>
              <p className="text-sm text-zinc-500 mb-2">
                {t.question} {currentQuizQuestion + 1} / {quizQuestions.length}
              </p>
              <h3 className="text-lg font-medium">{currentQ.question}</h3>
            </div>

            <div className="space-y-2">
              {currentQ.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuizAnswer(idx)}
                  className="w-full p-4 text-left rounded-xl border-2 border-zinc-200 hover:border-zinc-400 transition-colors"
                >
                  <p className="text-sm">{option}</p>
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={onClose}
              className="w-full h-12 border-2"
            >
              {t.cancel}
            </Button>
          </div>
        );

      case 'disclosure':
        return (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-medium">{t.disclosureTitle}</h3>
              </div>
            </div>

            <div className="space-y-3">
              {[t.disclosure1, t.disclosure2, t.disclosure3].map((disclosure, idx) => (
                <Card key={idx} className="p-4 border-zinc-200">
                  <button
                    onClick={() => {
                      const newDisclosures = [...disclosuresAccepted];
                      newDisclosures[idx] = !newDisclosures[idx];
                      setDisclosuresAccepted(newDisclosures);
                    }}
                    className="flex items-start gap-3 w-full text-left"
                  >
                    {disclosuresAccepted[idx] ? (
                      <CheckSquare className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-5 h-5 text-zinc-400 flex-shrink-0 mt-0.5" />
                    )}
                    <p className="text-sm text-zinc-700">{disclosure}</p>
                  </button>
                </Card>
              ))}
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleEnableCrypto}
                disabled={!disclosuresAccepted.every(d => d)}
                className="w-full h-14 bg-red-600 text-white hover:bg-red-700 disabled:bg-zinc-300"
              >
                {t.enableCrypto}
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                className="w-full h-12 border-2"
              >
                {t.cancel}
              </Button>
            </div>
          </div>
        );
    }
  };

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
          <h2 className="text-xl font-light">{t.cryptoAwareness}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-zinc-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="px-6 py-3 border-b border-zinc-100">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span className={step === 'education' ? 'text-black font-medium' : ''}>{t.education}</span>
            <span>→</span>
            <span className={step === 'risk_quiz' ? 'text-black font-medium' : ''}>{t.riskAssessment}</span>
            <span>→</span>
            <span className={step === 'disclosure' ? 'text-black font-medium' : ''}>{t.disclosure}</span>
          </div>
        </div>

        <div className="px-6 py-6">
          {renderContent()}
        </div>
      </motion.div>
    </motion.div>
  );
}
