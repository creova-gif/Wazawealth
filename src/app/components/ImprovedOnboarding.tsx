import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Lock, Building2, CheckCircle, ChevronRight } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface Props {
  onComplete: (data: OnboardingData) => void;
  language: 'sw' | 'en';
  onLanguageChange: (lang: 'sw' | 'en') => void;
}

interface OnboardingData {
  language: 'sw' | 'en';
  goals: string[];
  riskProfile: 'steady' | 'balanced' | 'volatile';
  experience: 'beginner' | 'comfortable' | 'advanced';
}

export function ImprovedOnboarding({ onComplete, language, onLanguageChange }: Props) {
  const [step, setStep] = useState<'language' | 'goals' | 'risk' | 'experience' | 'trust'>('language');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [riskProfile, setRiskProfile] = useState<'steady' | 'balanced' | 'volatile' | null>(null);
  const [experience, setExperience] = useState<'beginner' | 'comfortable' | 'advanced' | null>(null);

  const microcopy = {
    language: {
      title: {
        en: 'Choose Your Language',
        sw: 'Chagua Lugha Yako'
      },
      subtitle: {
        en: 'You can change this anytime',
        sw: 'Unaweza kubadilisha wakati wowote'
      },
      englishDesc: {
        en: 'Clear financial insights',
        sw: 'Maarifa wazi ya kifedha'
      },
      swahiliDesc: {
        en: 'Maarifa wazi ya kifedha',
        sw: 'Maarifa wazi ya kifedha'
      }
    },
    goals: {
      title: {
        en: 'What brings you here?',
        sw: 'Je, ni nini kinachokuja hapa?'
      },
      subtitle: {
        en: 'Select one or more goals',
        sw: 'Chagua lengo moja au zaidi'
      },
      everydayGrowth: {
        en: 'Everyday Growth',
        sw: 'Ukuaji wa Kila Siku'
      },
      everydayGrowthDesc: {
        en: 'Build wealth daily',
        sw: 'Jenga utajiri kila siku'
      },
      retirementVault: {
        en: 'Retirement Vault',
        sw: 'Hifadhi ya Ustaafu'
      },
      retirementVaultDesc: {
        en: 'Secure your future',
        sw: 'Linda mustakabali wako'
      },
      emergencyFund: {
        en: 'Emergency Fund',
        sw: 'Fedha za Dharura'
      },
      emergencyFundDesc: {
        en: 'Ready when you need it',
        sw: 'Tayari unapohitaji'
      },
      familyLegacy: {
        en: 'Family Legacy',
        sw: 'Urithi wa Familia'
      },
      familyLegacyDesc: {
        en: 'Build generational wealth',
        sw: 'Jenga utajiri wa vizazi'
      }
    },
    risk: {
      title: {
        en: 'How do market changes feel?',
        sw: 'Je, mabadiliko ya soko yanasikiaje?'
      },
      subtitle: {
        en: "There's no wrong answer",
        sw: 'Hakuna jibu lisilo sahihi'
      },
      steadyGrowth: {
        en: 'I prefer steady growth',
        sw: 'Napendelea ukuaji thabiti'
      },
      steadyGrowthDesc: {
        en: 'Minimal ups and downs, slower growth',
        sw: 'Mabadiliko madogo, ukuaji wa polepole'
      },
      balanced: {
        en: 'I can handle some ups and downs',
        sw: 'Naweza kushughulikia mabadiliko'
      },
      balancedDesc: {
        en: 'Moderate changes, balanced returns',
        sw: 'Mabadiliko ya wastani, mapato ya usawa'
      },
      volatile: {
        en: "I'm comfortable with volatility",
        sw: 'Niko tayari kwa mabadiliko makubwa'
      },
      volatileDesc: {
        en: 'Larger swings, potential for higher growth',
        sw: 'Mabadiliko makubwa, uwezekano wa ukuaji mkubwa'
      }
    },
    experience: {
      title: {
        en: 'Your investing experience?',
        sw: 'Je, una uzoefu gani wa uwekezaji?'
      },
      beginner: {
        en: "I'm just starting",
        sw: 'Ninaanza tu'
      },
      beginnerDesc: {
        en: 'New to investing, want to learn',
        sw: 'Mpya katika uwekezaji, nataka kujifunza'
      },
      comfortable: {
        en: "I've invested before",
        sw: 'Nimewahi kuwekeza'
      },
      comfortableDesc: {
        en: 'Some experience, know the basics',
        sw: 'Uzoefu kidogo, nafahamu msingi'
      },
      advanced: {
        en: "I'm an active investor",
        sw: 'Ni mwekezaji hai'
      },
      advancedDesc: {
        en: 'Experienced, manage my portfolio',
        sw: 'Nina uzoefu, ninasimamia mkoba wangu'
      }
    },
    trust: {
      title: {
        en: 'Your security matters',
        sw: 'Usalama wako una umuhimu'
      },
      regulated: {
        en: 'Regulated by CMSA',
        sw: 'Inasimamiwa na CMSA'
      },
      regulatedDesc: {
        en: 'Tanzania Capital Markets & Securities Authority',
        sw: 'Mamlaka ya Soko la Mtaji na Usalama wa Tanzania'
      },
      encrypted: {
        en: 'Bank-level encryption',
        sw: 'Usimbuaji wa kiwango cha benki'
      },
      encryptedDesc: {
        en: 'Your data is protected',
        sw: 'Data yako inalindwa'
      },
      custody: {
        en: 'Funds held in custody',
        sw: 'Fedha zinashikiliwa kwa usalama'
      },
      custodyDesc: {
        en: 'Separated from our accounts',
        sw: 'Zimetengwa na akaunti zetu'
      },
      continue: {
        en: 'Continue to Dashboard',
        sw: 'Endelea kwa Dashibodi'
      }
    }
  };

  const goals = [
    { id: 'everyday', icon: '🎯', name: 'everydayGrowth', desc: 'everydayGrowthDesc' },
    { id: 'retirement', icon: '🛡️', name: 'retirementVault', desc: 'retirementVaultDesc' },
    { id: 'emergency', icon: '🏥', name: 'emergencyFund', desc: 'emergencyFundDesc' },
    { id: 'legacy', icon: '👨‍👩‍👧‍👦', name: 'familyLegacy', desc: 'familyLegacyDesc' }
  ];

  const handleGoalToggle = (goalId: string) => {
    if (selectedGoals.includes(goalId)) {
      setSelectedGoals(selectedGoals.filter(g => g !== goalId));
    } else if (selectedGoals.length < 3) {
      setSelectedGoals([...selectedGoals, goalId]);
    }
  };

  const handleComplete = () => {
    onComplete({
      language,
      goals: selectedGoals,
      riskProfile: riskProfile!,
      experience: experience!
    });
  };

  const getStepProgress = () => {
    const steps = ['language', 'goals', 'risk', 'experience', 'trust'];
    return steps.indexOf(step) + 1;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Progress Indicator */}
      {step !== 'language' && (
        <div className="px-6 pt-6 pb-4">
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className={`h-1 flex-1 rounded-full transition-all duration-400 ${
                  num <= getStepProgress() ? 'bg-black' : 'bg-zinc-200'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 px-6 py-8 overflow-y-auto">
        <AnimatePresence mode="wait">
          {/* Language Selection */}
          {step === 'language' && (
            <motion.div
              key="language"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-lg mx-auto"
            >
              <h1 className="text-3xl font-light mb-2 text-center">
                {microcopy.language.title[language]}
              </h1>
              <p className="text-sm text-zinc-500 mb-12 text-center">
                {microcopy.language.subtitle[language]}
              </p>

              <div className="space-y-3">
                <motion.div whileTap={{ scale: 0.98 }}>
                  <Card
                    className={`p-6 cursor-pointer transition-all duration-200 ${
                      language === 'en'
                        ? 'border-2 border-black bg-zinc-50 shadow-md'
                        : 'border-2 border-zinc-200 hover:border-zinc-400'
                    }`}
                    onClick={() => {
                      onLanguageChange('en');
                      setTimeout(() => setStep('goals'), 300);
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">🇬🇧</span>
                          <p className="text-lg font-medium">English</p>
                        </div>
                        <p className="text-sm text-zinc-600">
                          {microcopy.language.englishDesc.en}
                        </p>
                      </div>
                      {language === 'en' && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', duration: 0.4 }}
                        >
                          <CheckCircle className="w-6 h-6 text-black" />
                        </motion.div>
                      )}
                    </div>
                  </Card>
                </motion.div>

                <motion.div whileTap={{ scale: 0.98 }}>
                  <Card
                    className={`p-6 cursor-pointer transition-all duration-200 ${
                      language === 'sw'
                        ? 'border-2 border-black bg-zinc-50 shadow-md'
                        : 'border-2 border-zinc-200 hover:border-zinc-400'
                    }`}
                    onClick={() => {
                      onLanguageChange('sw');
                      setTimeout(() => setStep('goals'), 300);
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">🇹🇿</span>
                          <p className="text-lg font-medium">Kiswahili</p>
                        </div>
                        <p className="text-sm text-zinc-600">
                          {microcopy.language.swahiliDesc.sw}
                        </p>
                      </div>
                      {language === 'sw' && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', duration: 0.4 }}
                        >
                          <CheckCircle className="w-6 h-6 text-black" />
                        </motion.div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Goal Selection */}
          {step === 'goals' && (
            <motion.div
              key="goals"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-lg mx-auto"
            >
              <h1 className="text-3xl font-light mb-2">
                {microcopy.goals.title[language]}
              </h1>
              <p className="text-sm text-zinc-500 mb-8">
                {microcopy.goals.subtitle[language]}
              </p>

              <div className="space-y-3 mb-8">
                {goals.map((goal, i) => (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      className={`p-5 cursor-pointer transition-all duration-200 ${
                        selectedGoals.includes(goal.id)
                          ? 'border-2 border-black bg-zinc-50'
                          : 'border-2 border-zinc-200 hover:border-zinc-400'
                      }`}
                      onClick={() => handleGoalToggle(goal.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex gap-3">
                          <span className="text-3xl">{goal.icon}</span>
                          <div>
                            <p className="text-lg font-medium mb-1">
                              {microcopy.goals[goal.name as keyof typeof microcopy.goals][language]}
                            </p>
                            <p className="text-sm text-zinc-600">
                              {microcopy.goals[goal.desc as keyof typeof microcopy.goals][language]}
                            </p>
                          </div>
                        </div>
                        {selectedGoals.includes(goal.id) && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', duration: 0.4 }}
                          >
                            <CheckCircle className="w-6 h-6 text-black flex-shrink-0" />
                          </motion.div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {selectedGoals.length === 3 && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-amber-700 mb-4 text-center"
                >
                  {language === 'en'
                    ? 'Maximum 3 goals. Remove one to add another.'
                    : 'Malengo 3 tu. Ondoa moja ili kuongeza lingine.'}
                </motion.p>
              )}

              <Button
                onClick={() => setStep('risk')}
                disabled={selectedGoals.length === 0}
                className="w-full h-14 bg-black text-white hover:bg-zinc-800 disabled:bg-zinc-300 disabled:text-zinc-500"
              >
                {language === 'en' ? 'Continue' : 'Endelea'}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>

              {selectedGoals.length === 0 && (
                <p className="text-xs text-zinc-500 mt-3 text-center">
                  {language === 'en'
                    ? 'Select at least one goal to continue'
                    : 'Chagua lengo moja au zaidi kuendelea'}
                </p>
              )}
            </motion.div>
          )}

          {/* Risk Profile */}
          {step === 'risk' && (
            <motion.div
              key="risk"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-lg mx-auto"
            >
              <h1 className="text-3xl font-light mb-2">
                {microcopy.risk.title[language]}
              </h1>
              <p className="text-sm text-zinc-500 mb-8">
                {microcopy.risk.subtitle[language]}
              </p>

              <div className="space-y-3 mb-8">
                {(['steady', 'balanced', 'volatile'] as const).map((profile, i) => {
                  const nameKey = profile === 'steady' ? 'steadyGrowth' : profile;
                  const descKey = profile === 'steady' ? 'steadyGrowthDesc' : `${profile}Desc`;
                  
                  return (
                    <motion.div
                      key={profile}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        className={`p-6 cursor-pointer transition-all duration-200 ${
                          riskProfile === profile
                            ? 'border-2 border-black bg-zinc-50'
                            : 'border-2 border-zinc-200 hover:border-zinc-400'
                        }`}
                        onClick={() => setRiskProfile(profile)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-base font-medium">
                            {microcopy.risk[nameKey as keyof typeof microcopy.risk][language]}
                          </p>
                          {riskProfile === profile && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: 'spring' }}
                            >
                              <CheckCircle className="w-6 h-6 text-black" />
                            </motion.div>
                          )}
                        </div>
                        
                        {/* Visual Risk Indicator */}
                        <div className="h-12 mb-3 flex items-end gap-0.5">
                          {profile === 'steady' && (
                            <>
                              {[3, 3.5, 3, 3.5, 3].map((h, idx) => (
                                <div
                                  key={idx}
                                  className="flex-1 bg-zinc-800 rounded-t"
                                  style={{ height: `${h * 8}px` }}
                                />
                              ))}
                            </>
                          )}
                          {profile === 'balanced' && (
                            <>
                              {[2, 4, 3, 5, 2.5].map((h, idx) => (
                                <div
                                  key={idx}
                                  className="flex-1 bg-zinc-800 rounded-t"
                                  style={{ height: `${h * 8}px` }}
                                />
                              ))}
                            </>
                          )}
                          {profile === 'volatile' && (
                            <>
                              {[1, 5, 2, 6, 3].map((h, idx) => (
                                <div
                                  key={idx}
                                  className="flex-1 bg-zinc-800 rounded-t"
                                  style={{ height: `${h * 8}px` }}
                                />
                              ))}
                            </>
                          )}
                        </div>
                        
                        <p className="text-sm text-zinc-600">
                          {microcopy.risk[descKey as keyof typeof microcopy.risk][language]}
                        </p>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              <Button
                onClick={() => setStep('experience')}
                disabled={!riskProfile}
                className="w-full h-14 bg-black text-white hover:bg-zinc-800 disabled:bg-zinc-300"
              >
                {language === 'en' ? 'Continue' : 'Endelea'}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          )}

          {/* Experience Level */}
          {step === 'experience' && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-lg mx-auto"
            >
              <h1 className="text-3xl font-light mb-8">
                {microcopy.experience.title[language]}
              </h1>

              <div className="space-y-3 mb-8">
                {(['beginner', 'comfortable', 'advanced'] as const).map((level, i) => (
                  <motion.div
                    key={level}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      className={`p-6 cursor-pointer transition-all duration-200 ${
                        experience === level
                          ? 'border-2 border-black bg-zinc-50'
                          : 'border-2 border-zinc-200 hover:border-zinc-400'
                      }`}
                      onClick={() => setExperience(level)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-base font-medium mb-1">
                            {microcopy.experience[level][language]}
                          </p>
                          <p className="text-sm text-zinc-600">
                            {microcopy.experience[`${level}Desc` as keyof typeof microcopy.experience][language]}
                          </p>
                        </div>
                        {experience === level && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring' }}
                          >
                            <CheckCircle className="w-6 h-6 text-black flex-shrink-0" />
                          </motion.div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Button
                onClick={() => setStep('trust')}
                disabled={!experience}
                className="w-full h-14 bg-black text-white hover:bg-zinc-800 disabled:bg-zinc-300"
              >
                {language === 'en' ? 'Continue' : 'Endelea'}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          )}

          {/* Trust & Security */}
          {step === 'trust' && (
            <motion.div
              key="trust"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-lg mx-auto"
            >
              <h1 className="text-3xl font-light mb-8 text-center">
                {microcopy.trust.title[language]}
              </h1>

              <div className="space-y-4 mb-12">
                {[
                  { icon: Shield, title: 'regulated', desc: 'regulatedDesc' },
                  { icon: Lock, title: 'encrypted', desc: 'encryptedDesc' },
                  { icon: Building2, title: 'custody', desc: 'custodyDesc' }
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.15 }}
                    >
                      <Card className="p-6 border-zinc-200">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-6 h-6 text-zinc-700" />
                          </div>
                          <div>
                            <p className="text-base font-medium mb-1">
                              {microcopy.trust[item.title as keyof typeof microcopy.trust][language]}
                            </p>
                            <p className="text-sm text-zinc-600">
                              {microcopy.trust[item.desc as keyof typeof microcopy.trust][language]}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              <Button
                onClick={handleComplete}
                className="w-full h-14 bg-black text-white hover:bg-zinc-800"
              >
                {microcopy.trust.continue[language]}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
