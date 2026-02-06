import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Book, TrendingUp, Target, Check, ChevronRight } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface Ritual {
  id: string;
  type: 'insight' | 'lesson' | 'reflection';
  title: string;
  content: string;
  duration: string;
  completed: boolean;
}

interface Props {
  language: 'sw' | 'en';
  onComplete: (ritualId: string) => void;
  onViewLesson: (lessonId: string) => void;
}

export function DailyRituals({ language, onComplete, onViewLesson }: Props) {
  const [rituals, setRituals] = useState<Ritual[]>([]);
  const [selectedRitual, setSelectedRitual] = useState<Ritual | null>(null);

  const content = {
    sw: {
      title: 'Leo',
      subtitle: 'Hatua ndogo, athari kubwa',
      todayInsight: 'Maarifa ya Leo',
      oneMinuteLesson: 'Somo la Dakika 1',
      reflection: 'Tafakari',
      complete: 'Kamilisha',
      viewLesson: 'Angalia Somo',
      done: 'Imekamilika',
      insights: {
        compound: {
          title: 'Uthabiti unafanya kazi',
          content: 'Hatua ndogo za kila siku zinakuwa matokeo makubwa baadaye. Wewe wa baadaye anakushukuru.'
        },
        timing: {
          title: 'Wakati si kila kitu',
          content: 'Muda uliokaa kwenye soko ni muhimu kuliko wakati ulioingia. Kuwa na subira kunalipwa.'
        },
        longterm: {
          title: 'Fikiria muda mrefu',
          content: 'Utajiri halishi haraka — unajengwa. Miaka 10 ijayo itafurahishwa na maamuzi ya leo.'
        }
      },
      lessons: {
        diversification: {
          title: 'Kwa nini ugawaji wa mali ni muhimu',
          content: 'Usiwe na yai yote kwenye kikapu kimoja. Ugawaji wa mali unapunguza hatari.'
        },
        volatility: {
          title: 'Kuelewa ugonjaji wa bei',
          content: 'Soko linabadilika — hii ni kawaida. Msimamo wa muda mrefu unasaidia kupita mabadiliko.'
        }
      },
      reflections: {
        progress: {
          title: 'Tazama jinsi ulivyosonga',
          content: 'Wiki hii, umefanya nini kuelekea malengo yako? Thamini hatua ndogo.'
        }
      }
    },
    en: {
      title: 'Today',
      subtitle: 'Small steps, big impact',
      todayInsight: "Today's Insight",
      oneMinuteLesson: '1-Minute Lesson',
      reflection: 'Reflection',
      complete: 'Complete',
      viewLesson: 'View Lesson',
      done: 'Completed',
      insights: {
        compound: {
          title: 'Consistency compounds',
          content: 'Small daily steps become big results later. Future you thanks you.'
        },
        timing: {
          title: "Timing isn't everything",
          content: 'Time in the market matters more than timing the market. Patience pays.'
        },
        longterm: {
          title: 'Think long-term',
          content: "Wealth isn't rushed — it's built. The next 10 years will thank today's choices."
        }
      },
      lessons: {
        diversification: {
          title: 'Why diversification matters',
          content: "Don't put all eggs in one basket. Spreading investments reduces risk."
        },
        volatility: {
          title: 'Understanding volatility',
          content: 'Markets fluctuate — this is normal. Long-term perspective helps weather changes.'
        }
      },
      reflections: {
        progress: {
          title: "See how far you've come",
          content: 'This week, what did you do toward your goals? Celebrate small steps.'
        }
      }
    }
  };

  const t = content[language];

  // Generate daily rituals
  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    
    const dailyRituals: Ritual[] = [];

    // Daily insight (rotates based on day)
    const insightKeys = Object.keys(t.insights) as Array<keyof typeof t.insights>;
    const insightKey = insightKeys[dayOfWeek % insightKeys.length];
    const insight = t.insights[insightKey];

    dailyRituals.push({
      id: 'daily-insight',
      type: 'insight',
      title: t.todayInsight,
      content: insight.content,
      duration: '30s',
      completed: false
    });

    // One-minute lesson (2-3 times per week)
    if (dayOfWeek % 3 === 0) {
      const lessonKeys = Object.keys(t.lessons) as Array<keyof typeof t.lessons>;
      const lessonKey = lessonKeys[Math.floor(dayOfWeek / 3) % lessonKeys.length];
      const lesson = t.lessons[lessonKey];

      dailyRituals.push({
        id: 'daily-lesson',
        type: 'lesson',
        title: t.oneMinuteLesson,
        content: lesson.content,
        duration: '1m',
        completed: false
      });
    }

    // Weekly reflection (once per week)
    if (dayOfWeek === 0) { // Sunday
      const reflectionKeys = Object.keys(t.reflections) as Array<keyof typeof t.reflections>;
      const reflectionKey = reflectionKeys[0];
      const reflection = t.reflections[reflectionKey];

      dailyRituals.push({
        id: 'weekly-reflection',
        type: 'reflection',
        title: t.reflection,
        content: reflection.content,
        duration: '2m',
        completed: false
      });
    }

    setRituals(dailyRituals);
  }, [language]);

  const handleComplete = (ritualId: string) => {
    setRituals(prev => 
      prev.map(r => r.id === ritualId ? { ...r, completed: true } : r)
    );
    setSelectedRitual(null);
    onComplete(ritualId);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'insight':
        return TrendingUp;
      case 'lesson':
        return Book;
      case 'reflection':
        return Target;
      default:
        return Book;
    }
  };

  return (
    <div className="py-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="px-6 mb-4">
          <h2 className="text-2xl font-light mb-1">{t.title}</h2>
          <p className="text-sm text-zinc-500">{t.subtitle}</p>
        </div>

        <div className="px-6 space-y-3">
          {rituals.map((ritual, index) => {
            const Icon = getIcon(ritual.type);
            return (
              <motion.div
                key={ritual.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card
                  className={`p-4 border-zinc-200 transition-all cursor-pointer ${
                    ritual.completed
                      ? 'bg-zinc-50 border-zinc-300'
                      : 'bg-white hover:border-zinc-400'
                  }`}
                  onClick={() => !ritual.completed && setSelectedRitual(ritual)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      ritual.completed ? 'bg-black' : 'bg-zinc-100'
                    }`}>
                      {ritual.completed ? (
                        <Check className="w-5 h-5 text-white" />
                      ) : (
                        <Icon className="w-5 h-5 text-zinc-700" />
                      )}
                    </div>

                    <div className="flex-1">
                      <p className={`text-sm font-medium ${
                        ritual.completed ? 'text-zinc-500' : 'text-black'
                      }`}>
                        {ritual.title}
                      </p>
                      <p className="text-xs text-zinc-500">{ritual.duration}</p>
                    </div>

                    {!ritual.completed && (
                      <ChevronRight className="w-5 h-5 text-zinc-400" />
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Ritual Detail Modal */}
      <AnimatePresence>
        {selectedRitual && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedRitual(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <Card className="p-8 bg-white border-zinc-200">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-zinc-100 mx-auto mb-4 flex items-center justify-center">
                    {(() => {
                      const Icon = getIcon(selectedRitual.type);
                      return <Icon className="w-8 h-8 text-black" />;
                    })()}
                  </div>
                  <h3 className="text-xl font-light mb-2">{selectedRitual.title}</h3>
                  <p className="text-xs text-zinc-500">{selectedRitual.duration}</p>
                </div>

                <p className="text-base text-zinc-700 leading-relaxed text-center mb-8">
                  {selectedRitual.content}
                </p>

                <div className="flex gap-3">
                  {selectedRitual.type === 'lesson' && (
                    <Button
                      onClick={() => {
                        onViewLesson(selectedRitual.id);
                        handleComplete(selectedRitual.id);
                      }}
                      className="flex-1 bg-black text-white hover:bg-zinc-800"
                    >
                      {t.viewLesson}
                    </Button>
                  )}
                  <Button
                    onClick={() => handleComplete(selectedRitual.id)}
                    className={selectedRitual.type === 'lesson' ? 'flex-1' : 'w-full'}
                    variant={selectedRitual.type === 'lesson' ? 'outline' : 'default'}
                  >
                    {t.complete}
                  </Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}