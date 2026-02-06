import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, TrendingUp, Shield, Target, Info } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface Insight {
  id: string;
  type: 'encouragement' | 'advice' | 'opportunity' | 'education' | 'warning';
  title: string;
  message: string;
  action?: {
    label: string;
    onAction: () => void;
  };
  priority: number;
}

interface Props {
  language: 'sw' | 'en';
  userActivity: {
    lastVisit: Date;
    daysInactive: number;
    hasInvested: boolean;
    currentScreen?: string;
    hesitationScreen?: string;
    accountBalances?: any;
    goalProgress?: number;
  };
  onDismiss: () => void;
  onAction?: (action: string) => void;
}

export function EnhancedAICopilot({ language, userActivity, onDismiss, onAction }: Props) {
  const [currentInsight, setCurrentInsight] = useState<Insight | null>(null);
  const [dismissed, setDismissed] = useState(false);

  const content = {
    sw: {
      insights: {
        firstInvestment: {
          title: 'Tayari kuanza?',
          message: 'Hatua ya kwanza ndiyo muhimu zaidi. Anza na kiasi kidogo — utajiri unajengwa polepole.',
          action: 'Weka TZS 50,000'
        },
        consistency: {
          title: 'Uthabiti ni ufunguo',
          message: 'Umeonyesha mtindo mzuri. Hatua ndogo za kawaida zinazalisha matokeo makubwa.',
          action: null
        },
        goalProgress: {
          title: 'Unakaribia lengo lako',
          message: 'Uko karibu zaidi kuliko ulivyowahi kuwa. Endelea tu — wewe wa baadaye atashukuru.',
          action: null
        },
        marketOpportunity: {
          title: 'Fursa ya soko',
          message: 'DSE imeonyesha uthabiti. Wakati mzuri wa kuongeza uwekezaji wako wa muda mrefu.',
          action: 'Angalia Fursa'
        },
        inactiveReturn: {
          title: 'Tumekukosa',
          message: 'Hakuna hatari. Akaunti yako salama na inaendelea kukua. Karibu tena.',
          action: null
        },
        education: {
          title: 'Ujuzi mpya',
          message: 'Kuelewa ugonjaji wa bei kunasaidia kuwa na subira wakati wa utengamano wa soko.',
          action: 'Jifunze Zaidi'
        }
      },
      dismiss: 'Sawa'
    },
    en: {
      insights: {
        firstInvestment: {
          title: 'Ready to begin?',
          message: 'The first step matters most. Start small — wealth is built gradually.',
          action: 'Invest TZS 50,000'
        },
        consistency: {
          title: 'Consistency is key',
          message: "You're showing good patterns. Small, regular steps produce big results.",
          action: null
        },
        goalProgress: {
          title: "You're nearing your goal",
          message: "You're closer than you've ever been. Keep going — future you will thank you.",
          action: null
        },
        marketOpportunity: {
          title: 'Market opportunity',
          message: 'DSE is showing stability. Good time to add to your long-term investments.',
          action: 'View Opportunities'
        },
        inactiveReturn: {
          title: "We've missed you",
          message: "No worries. Your account is safe and still growing. Welcome back.",
          action: null
        },
        education: {
          title: 'New insight',
          message: 'Understanding volatility helps you stay patient during market swings.',
          action: 'Learn More'
        }
      },
      dismiss: 'Got it'
    }
  };

  const t = content[language];

  // AI Logic: Determine which insight to show
  useEffect(() => {
    const insights: Insight[] = [];

    // First-time investor hesitation
    if (userActivity.hesitationScreen === 'invest' && !userActivity.hasInvested) {
      insights.push({
        id: 'first-investment',
        type: 'encouragement',
        title: t.insights.firstInvestment.title,
        message: t.insights.firstInvestment.message,
        action: t.insights.firstInvestment.action ? {
          label: t.insights.firstInvestment.action,
          onAction: () => onAction?.('start-small-investment')
        } : undefined,
        priority: 10
      });
    }

    // Returning after inactivity
    if (userActivity.daysInactive > 7) {
      insights.push({
        id: 'inactive-return',
        type: 'encouragement',
        title: t.insights.inactiveReturn.title,
        message: t.insights.inactiveReturn.message,
        priority: 8
      });
    }

    // Goal progress recognition
    if (userActivity.goalProgress && userActivity.goalProgress > 70) {
      insights.push({
        id: 'goal-progress',
        type: 'encouragement',
        title: t.insights.goalProgress.title,
        message: t.insights.goalProgress.message,
        priority: 7
      });
    }

    // Educational moment
    if (Math.random() > 0.7) { // 30% chance to show education
      insights.push({
        id: 'education',
        type: 'education',
        title: t.insights.education.title,
        message: t.insights.education.message,
        action: t.insights.education.action ? {
          label: t.insights.education.action,
          onAction: () => onAction?.('view-education')
        } : undefined,
        priority: 5
      });
    }

    // Consistency encouragement
    if (userActivity.hasInvested) {
      insights.push({
        id: 'consistency',
        type: 'encouragement',
        title: t.insights.consistency.title,
        message: t.insights.consistency.message,
        priority: 6
      });
    }

    // Pick highest priority insight
    if (insights.length > 0) {
      insights.sort((a, b) => b.priority - a.priority);
      setCurrentInsight(insights[0]);
    }
  }, [userActivity]);

  const handleDismiss = () => {
    setDismissed(true);
    setTimeout(() => {
      onDismiss();
    }, 300);
  };

  if (!currentInsight) return null;

  const getIcon = () => {
    switch (currentInsight.type) {
      case 'encouragement':
        return Sparkles;
      case 'advice':
        return Info;
      case 'opportunity':
        return TrendingUp;
      case 'education':
        return Target;
      case 'warning':
        return Shield;
      default:
        return Sparkles;
    }
  };

  const Icon = getIcon();

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
          onClick={handleDismiss}
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md"
          >
            <Card className="p-6 bg-white border-zinc-200 shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-2">{currentInsight.title}</h3>
                  <p className="text-sm text-zinc-600 mb-4 leading-relaxed">
                    {currentInsight.message}
                  </p>

                  <div className="flex gap-3">
                    {currentInsight.action && (
                      <Button
                        onClick={currentInsight.action.onAction}
                        className="bg-black text-white hover:bg-zinc-800"
                      >
                        {currentInsight.action.label}
                      </Button>
                    )}
                    <Button
                      onClick={handleDismiss}
                      variant="ghost"
                      className="text-zinc-600"
                    >
                      {t.dismiss}
                    </Button>
                  </div>
                </div>

                <button
                  onClick={handleDismiss}
                  className="text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
