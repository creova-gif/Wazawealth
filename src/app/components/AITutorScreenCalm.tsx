import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, Sparkles, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AITutorScreenProps {
  language: 'sw' | 'en';
  accessToken: string;
  onBack: () => void;
}

export function AITutorScreen({ language, accessToken, onBack }: AITutorScreenProps) {
  const [currentCard, setCurrentCard] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const lessons = language === 'sw' ? [
    {
      title: 'Hisa ni nini?',
      content: 'Hisa ni sehemu ndogo ya kampuni. Unapokuwa na hisa, una sehemu ya kampuni hiyo.',
      tip: 'Kumbuka: Bei ya hisa hubadilika kila siku kulingana na jinsi kampuni inavyofanya.'
    },
    {
      title: 'Kwa nini bei hubadilika?',
      content: 'Bei ya hisa huongezeka wakati watu wengi wanataka kununua, na kushuka wakati wengi wanataka kuuza.',
      tip: 'Hii ni kawaida kabisa. Usijali mabadiliko ya kila siku.'
    },
    {
      title: 'Uwekezaji wa muda mrefu',
      content: 'Watu wenye mafanikio hufanya vizuri kwa kuweka pesa kwa muda mrefu - miaka 5, 10, au zaidi.',
      tip: 'Subiri. Usitafute faida ya haraka - tafuta ukuaji wa muda mrefu.'
    },
    {
      title: 'Usambaze uwekezaji wako',
      content: 'Usiweke pesa zako zote kwenye hisa moja. Sambaza kwenye kampuni tofauti tofauti.',
      tip: 'Hii inaitwa "diversification" - ni njia salama zaidi.'
    },
    {
      title: 'DSE ni nini?',
      content: 'Dar es Salaam Stock Exchange (DSE) ni soko la hisa hapa Tanzania. Kampuni kubwa kama NMB, CRDB na TBL zinauza hisa hapa.',
      tip: 'Bei za DSE hubadilika kila siku wakati soko liko wazi.'
    },
    {
      title: 'Anza kidogo, jifunze',
      content: 'Hata uwekezaji mdogo unaweza kukuza mali yako kwa muda mrefu. Muhimu ni kuanza na kujifunza.',
      tip: 'Mazoezi ya leo yatakusaidia ujuzi wa kesho.'
    }
  ] : [
    {
      title: 'What is a stock?',
      content: 'A stock is a small piece of a company. When you own stock, you own a part of that company.',
      tip: 'Remember: Stock prices change daily based on how the company is doing.'
    },
    {
      title: 'Why do prices change?',
      content: 'Stock prices go up when more people want to buy, and down when more people want to sell.',
      tip: "This is completely normal. Don't worry about daily changes."
    },
    {
      title: 'Long-term investing',
      content: 'Successful investors do well by holding onto investments for the long term - 5, 10, or more years.',
      tip: 'Be patient. Look for long-term growth, not quick profits.'
    },
    {
      title: 'Spread your investments',
      content: "Don't put all your money in one stock. Spread it across different companies.",
      tip: 'This is called "diversification" - it\'s a safer approach.'
    },
    {
      title: 'What is DSE?',
      content: 'The Dar es Salaam Stock Exchange (DSE) is the stock market in Tanzania. Big companies like NMB, CRDB and TBL sell shares here.',
      tip: 'DSE prices change every day when the market is open.'
    },
    {
      title: 'Start small, learn',
      content: 'Even small investments can grow your wealth over time. The important thing is to start and learn.',
      tip: "Today's practice builds tomorrow's skills."
    }
  ];

  const handleComplete = () => {
    if (!completedLessons.includes(currentCard)) {
      setCompletedLessons([...completedLessons, currentCard]);
    }
    if (currentCard < lessons.length - 1) {
      setCurrentCard(currentCard + 1);
    }
  };

  const progress = ((completedLessons.length) / lessons.length) * 100;

  const t = language === 'sw' ? {
    title: 'Jifunze',
    completed: 'Umekamilisha',
    of: 'ya',
    lessons: 'masomo',
    continue: 'Endelea',
    gotIt: 'Nimeelewa',
    next: 'Ijayo',
    finish: 'Maliza',
    great: 'Vizuri sana!',
    allDone: 'Umekamilisha masomo yote',
    keepLearning: 'Endelea kujifunza kila siku'
  } : {
    title: 'Learn',
    completed: 'Completed',
    of: 'of',
    lessons: 'lessons',
    continue: 'Continue',
    gotIt: 'Got it',
    next: 'Next',
    finish: 'Finish',
    great: 'Great job!',
    allDone: "You've completed all lessons",
    keepLearning: 'Keep learning every day'
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-50 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-black" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-black">{t.title}</h1>
            <p className="text-xs text-gray-400">
              {t.completed} {completedLessons.length} {t.of} {lessons.length} {t.lessons}
            </p>
          </div>
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-black" />
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-gray-100 h-2">
        <motion.div
          className="bg-black h-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full">
          <AnimatePresence mode="wait">
            {completedLessons.length === lessons.length ? (
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-black mb-4">{t.great}</h2>
                <p className="text-lg text-gray-600 mb-2">{t.allDone}</p>
                <p className="text-sm text-gray-400">{t.keepLearning}</p>
              </motion.div>
            ) : (
              <motion.div
                key={currentCard}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl p-8 border-2 border-gray-100 shadow-sm"
              >
                {/* Card number */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{currentCard + 1}</span>
                  </div>
                  <span className="text-xs text-gray-400 uppercase tracking-wider">
                    Lesson {currentCard + 1} of {lessons.length}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-3xl font-bold text-black mb-6 leading-tight">
                  {lessons[currentCard].title}
                </h2>

                {/* Content */}
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {lessons[currentCard].content}
                </p>

                {/* Tip */}
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">
                    {language === 'sw' ? 'Kidokezo' : 'Key Tip'}
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {lessons[currentCard].tip}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      {completedLessons.length < lessons.length && (
        <div className="bg-white border-t border-gray-100 px-6 py-6">
          <div className="max-w-md mx-auto">
            <Button
              onClick={handleComplete}
              className="w-full bg-black text-white py-6 rounded-full font-semibold hover:bg-gray-900 transition-colors"
            >
              {currentCard === lessons.length - 1 ? t.finish : t.gotIt}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
