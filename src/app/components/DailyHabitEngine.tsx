import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Sparkles, Calendar, TrendingUp, Book, CheckCircle } from "lucide-react";

interface DailyHabitEngineProps {
  language: 'sw' | 'en';
  onComplete?: (habitType: string) => void;
}

export function DailyHabitEngine({ language, onComplete }: DailyHabitEngineProps) {
  const [currentHabit, setCurrentHabit] = useState<any>(null);
  const [completedToday, setCompletedToday] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    loadDailyHabit();
    loadStreak();
  }, [language]);

  const t = language === 'sw' ? {
    title: 'Leo',
    subtitle: 'Muda wako wa kujifunza',
    insight: 'Funzo la Leo',
    reflection: 'Tafakari',
    progress: 'Maendeleo Yako',
    streak: 'Siku za Kuendelea',
    days: 'siku',
    complete: 'Nimekamilisha',
    skip: 'Ruka',
    noStreak: 'Hakuna shinikizo',
    
    habits: {
      insight: {
        title: 'Funzo la Leo',
        subtitle: 'Dakika 1',
        icon: Sparkles,
        content: [
          {
            title: 'Bei za hisa zinabadilika',
            message: 'Bei inainuka na kushuka kila siku. Hii ni kawaida. Wawekezaji wazuri wanazingatia muda mrefu, si siku moja.'
          },
          {
            title: 'Sambaza uwekezaji wako',
            message: 'Usiweke vyote mahali pamoja. Weka katika kampuni tofauti, bondi, na ETF. Hii inakuokoa.'
          },
          {
            title: 'Subira ni mali',
            message: 'Uwekezaji ni kama kupanda mti. Unalima leo, lakini matunda unayavuna baadaye. Endelea kuweka, endelea kusubiri.'
          },
          {
            title: 'Elimu ni uwekezaji bora',
            message: 'Kila somo unalojifunza linakusaidia kufanya maamuzi bora. Watu wenye elimu wanafanya mapato bora.'
          },
          {
            title: 'Familia ni muhimu',
            message: 'Kuwekeza ni kujenga mustakabali wa familia yako. Unawapa usalama na fursa. Hii ni kazi nzuri.'
          }
        ]
      },
      reflection: {
        title: 'Tafakari ya Leo',
        subtitle: 'Angalia nyuma',
        icon: Book,
        questions: [
          'Je, umejifunza kitu kipya leo?',
          'Je, uwekezaji wako unaelekea lengo lako?',
          'Je, una swali lolote?',
          'Je, unajisikia kuridhika na maendeleo yako?'
        ]
      },
      progress: {
        title: 'Maendeleo Yako',
        subtitle: 'Angalia safari yako',
        icon: TrendingUp
      }
    }
  } : {
    title: 'Today',
    subtitle: 'Your learning moment',
    insight: "Today's Insight",
    reflection: 'Reflection',
    progress: 'Your Progress',
    streak: 'Day Streak',
    days: 'days',
    complete: 'Done',
    skip: 'Skip',
    noStreak: 'No pressure',
    
    habits: {
      insight: {
        title: "Today's Insight",
        subtitle: '1 minute',
        icon: Sparkles,
        content: [
          {
            title: 'Stock prices change',
            message: 'Prices go up and down every day. This is normal. Good investors focus on the long term, not one day.'
          },
          {
            title: 'Diversify your investments',
            message: "Don't put everything in one place. Invest in different companies, bonds, and ETFs. This protects you."
          },
          {
            title: 'Patience is wealth',
            message: 'Investing is like planting a tree. You plant today, but harvest later. Keep investing, keep waiting.'
          },
          {
            title: 'Education is the best investment',
            message: 'Every lesson you learn helps you make better decisions. Educated people earn better returns.'
          },
          {
            title: 'Family matters',
            message: "Investing is building your family's future. You're giving them security and opportunity. This is good work."
          }
        ]
      },
      reflection: {
        title: "Today's Reflection",
        subtitle: 'Look back',
        icon: Book,
        questions: [
          'Did you learn something new today?',
          'Is your investing aligned with your goal?',
          'Do you have any questions?',
          'Do you feel satisfied with your progress?'
        ]
      },
      progress: {
        title: 'Your Progress',
        subtitle: 'See your journey',
        icon: TrendingUp
      }
    }
  };

  const loadDailyHabit = () => {
    // Select today's insight
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const insightIndex = dayOfYear % t.habits.insight.content.length;
    
    setCurrentHabit({
      type: 'insight',
      ...t.habits.insight.content[insightIndex]
    });
  };

  const loadStreak = () => {
    // Mock streak data
    setStreak(7);
  };

  const handleComplete = () => {
    setCompletedToday([...completedToday, 'insight']);
    if (onComplete) {
      onComplete('insight');
    }
  };

  if (!currentHabit) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100 shadow-lg"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm text-gray-400 uppercase tracking-wider font-medium">
            {t.title}
          </h3>
          <p className="text-xs text-gray-500">{t.subtitle}</p>
        </div>
        
        {/* Streak (no guilt) */}
        {streak > 0 && (
          <div className="text-right">
            <div className="text-2xl font-bold text-black">{streak}</div>
            <div className="text-xs text-gray-400">{t.days}</div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-black mb-3">
          {currentHabit.title}
        </h2>
        <p className="text-base text-gray-700 leading-relaxed">
          {currentHabit.message}
        </p>
      </div>

      {/* Gentle CTA */}
      {!completedToday.includes('insight') ? (
        <div className="flex items-center gap-3">
          <button
            onClick={handleComplete}
            className="flex-1 bg-black text-white py-4 rounded-full font-semibold hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            {t.complete}
          </button>
          <button
            onClick={handleComplete}
            className="px-6 py-4 text-gray-400 hover:text-gray-600 font-medium transition-colors"
          >
            {t.skip}
          </button>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-black" />
          <span className="text-sm text-gray-600">
            {language === 'sw' ? 'Umekamilisha leo!' : 'Completed today!'}
          </span>
        </div>
      )}

      {/* No pressure message */}
      <p className="text-xs text-gray-400 text-center mt-4">
        {t.noStreak} • {language === 'sw' ? 'Rudi wakati wowote' : 'Come back anytime'}
      </p>
    </motion.div>
  );
}
