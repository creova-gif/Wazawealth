import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X } from "lucide-react";

interface AIWealthCopilotProps {
  language: 'sw' | 'en';
  userActivity: {
    lastVisit?: Date;
    hesitationScreen?: string;
    daysInactive?: number;
    hasInvested?: boolean;
    riskLevel?: string;
    goalProgress?: number;
  };
  onDismiss?: () => void;
}

export function AIWealthCopilot({ language, userActivity, onDismiss }: AIWealthCopilotProps) {
  const [insight, setInsight] = useState<any>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    generateInsight();
  }, [userActivity, language]);

  const generateInsight = () => {
    // Silent intelligence - only show when truly helpful
    const insights = getContextualInsights();
    if (insights.length > 0) {
      const selectedInsight = insights[0];
      setInsight(selectedInsight);
      setVisible(true);
    }
  };

  const getContextualInsights = () => {
    const insights: any[] = [];

    const t = language === 'sw' ? {
      insights: {
        // Inactivity (no guilt)
        inactive_week: {
          title: 'Karibu tena',
          message: 'Hukuwekeza wiki hii — sawa kabisa. Uthabiti wa muda mrefu ndio muhimu zaidi.',
          type: 'encouragement'
        },
        // Hesitation detection
        hesitation_invest: {
          title: 'Unahisi wasiwasi?',
          message: 'Kumbuka: hizi ni pesa za kujifunzia tu. Hakuna hatari ya kweli. Jaribu kwa uhuru.',
          type: 'reassurance'
        },
        // Market context (calm)
        market_down: {
          title: 'Soko limeteremka kidogo',
          message: 'Hii ni kawaida. Wawekezaji wazuri wanajua kwamba bei zinainuka na kushuka. Muda mrefu ndio muhimu.',
          type: 'context'
        },
        // First investment
        first_time: {
          title: 'Hatua yako ya kwanza',
          message: 'Kujaribu ni mwanzo wa kujifunza. Unafanya vizuri. Endelea polepole.',
          type: 'celebration'
        },
        // Goal progress
        goal_milestone: {
          title: 'Unaendelea vizuri',
          message: 'Lengo lako linaonekana wazi zaidi. Uthabiti wako unakusukuma mbele.',
          type: 'progress'
        },
        // Learning momentum
        learning_streak: {
          title: 'Unajifunza kila siku',
          message: 'Elimu ni uwekezaji bora zaidi. Unajenga msingi imara.',
          type: 'encouragement'
        }
      }
    } : {
      insights: {
        inactive_week: {
          title: 'Welcome back',
          message: "You didn't invest this week — that's okay. Long-term consistency matters more.",
          type: 'encouragement'
        },
        hesitation_invest: {
          title: 'Feeling uncertain?',
          message: "Remember: this is practice money only. No real risk. Try freely.",
          type: 'reassurance'
        },
        market_down: {
          title: 'Market dipped slightly',
          message: 'This is normal. Good investors know prices go up and down. Long-term is what matters.',
          type: 'context'
        },
        first_time: {
          title: 'Your first step',
          message: "Trying is the beginning of learning. You're doing well. Keep going slowly.",
          type: 'celebration'
        },
        goal_milestone: {
          title: 'You\'re making progress',
          message: "Your goal is becoming clearer. Your consistency is moving you forward.",
          type: 'progress'
        },
        learning_streak: {
          title: 'You\'re learning daily',
          message: "Education is the best investment. You're building a strong foundation.",
          type: 'encouragement'
        }
      }
    };

    // Context-aware intelligence
    if (userActivity.daysInactive && userActivity.daysInactive >= 7) {
      insights.push(t.insights.inactive_week);
    }

    if (userActivity.hesitationScreen === 'invest') {
      insights.push(t.insights.hesitation_invest);
    }

    if (!userActivity.hasInvested) {
      insights.push(t.insights.first_time);
    }

    if (userActivity.goalProgress && userActivity.goalProgress >= 25) {
      insights.push(t.insights.goal_milestone);
    }

    return insights;
  };

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(() => {
      if (onDismiss) onDismiss();
    }, 300);
  };

  if (!insight) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-24 left-4 right-4 max-w-md mx-auto z-40"
        >
          <div className="bg-black text-white rounded-3xl p-6 shadow-2xl border border-gray-800">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-semibold text-white mb-2">
                  {insight.title}
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {insight.message}
                </p>
              </div>

              <button
                onClick={handleDismiss}
                className="flex-shrink-0 p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}