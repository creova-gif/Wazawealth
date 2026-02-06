import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, Sparkles, CheckCircle, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ExpandedTutorProps {
  language: 'sw' | 'en';
  accessToken: string;
  onBack: () => void;
}

type Category = 'basics' | 'dse' | 'bonds' | 'etfs' | 'strategy';

export function ExpandedTutor({ language, accessToken, onBack }: ExpandedTutorProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const categories = language === 'sw' ? {
    basics: {
      title: 'Msingi wa Uwekezaji',
      description: 'Elimu ya msingi kwa wanaoanza',
      lessons: [
        {
          id: 'basics-1',
          title: 'Hisa ni nini?',
          content: 'Hisa ni sehemu ndogo ya kampuni. Unapokuwa na hisa, wewe ni mmiliki mdogo wa kampuni hiyo. Kampuni ikifanya vizuri, bei ya hisa yako inaongezeka.',
          tip: 'Kumbuka: Bei ya hisa hubadilika kila siku kulingana na jinsi kampuni inavyofanya.'
        },
        {
          id: 'basics-2',
          title: 'Kwa nini bei hubadilika?',
          content: 'Bei ya hisa huongezeka wakati watu wengi wanataka kununua, na kushuka wakati wengi wanataka kuuza. Hii inategemea jinsi kampuni inavyofanya biashara.',
          tip: 'Hii ni kawaida kabisa. Usijali mabadiliko ya kila siku.'
        },
        {
          id: 'basics-3',
          title: 'Uwekezaji wa muda mrefu',
          content: 'Watu wenye mafanikio hufanya vizuri kwa kuweka pesa kwa muda mrefu - miaka 5, 10, au zaidi. Subira ni muhimu sana.',
          tip: 'Subiri. Usitafute faida ya haraka - tafuta ukuaji wa muda mrefu.'
        },
        {
          id: 'basics-4',
          title: 'Hatari na Thawabu',
          content: 'Uwekezaji wa hisa una hatari kubwa lakini thawabu kubwa pia. Bondi zina hatari ndogo lakini thawabu ndogo. Chagua kulingana na hali yako.',
          tip: 'Usiogope hatari, lakini uielewe.'
        }
      ]
    },
    dse: {
      title: 'Soko la DSE',
      description: 'Soko la Hisa la Dar es Salaam',
      lessons: [
        {
          id: 'dse-1',
          title: 'DSE ni nini?',
          content: 'Dar es Salaam Stock Exchange (DSE) ni soko la hisa hapa Tanzania. Kampuni kubwa kama NMB, CRDB, TBL, na TCCL zinauza hisa hapa.',
          tip: 'DSE liko wazi Jumatatu hadi Ijumaa, saa 10:00 - 3:00.'
        },
        {
          id: 'dse-2',
          title: 'Kampuni gani zipo DSE?',
          content: 'Kuna kampuni za benki (NMB, CRDB), mawasiliano (Vodacom, Airtel), biashara (TBL), na nyingine. Kampuni zote lazima zitimize masharti makali.',
          tip: 'Kampuni zinazoorodheshwa DSE ni za kibiashara na zinasimamishwa vizuri.'
        },
        {
          id: 'dse-3',
          title: 'Jinsi ya kusoma data za DSE',
          content: 'Bei ya hisa inaonyesha thamani ya sasa. "Change" inaonyesha mabadiliko ya leo. Volume inaonyesha watu wangapi wanafanya biashara.',
          tip: 'Angalia mwenendo wa miezi mingi, si siku moja tu.'
        },
        {
          id: 'dse-4',
          title: 'Saa za biashara',
          content: 'DSE linafungua Jumatatu-Ijumaa, 10:00 asubuhi hadi 3:00 alasiri. Bei hubadilika wakati tu soko likiwa wazi. Wiki ya likizo hakuna mabadiliko.',
          tip: 'Unaweza kuona bei wakati wowote, lakini zinabadilika tu wakati soko likiwa wazi.'
        }
      ]
    },
    bonds: {
      title: 'Bondi za Serikali',
      description: 'Mkopo unaompa serikali',
      lessons: [
        {
          id: 'bonds-1',
          title: 'Bondi ni nini?',
          content: 'Bondi ni mkopo unaompa serikali. Serikali inakuahidi kukulipa riba kila mwezi na kukurudishia pesa zako baada ya muda fulani.',
          tip: 'Bondi ni salama zaidi kuliko hisa kwa sababu serikali inaaahidi kukulipa.'
        },
        {
          id: 'bonds-2',
          title: 'Jinsi Bondi Zinavyofanya',
          content: 'Unaweka TZS 1,000,000 kwa miaka 5 kwa riba ya 12%. Serikali itakulipa TZS 10,000 kila mwezi (12% ya mwaka), na baada ya miaka 5 utapata TZS 1,000,000 zako kurudi.',
          tip: 'Riba inakuja moja kwa moja kwenye akaunti yako kila mwezi.'
        },
        {
          id: 'bonds-3',
          title: 'Aina za Bondi',
          content: 'Kuna Treasury Bills (miaka 1-2), Government Bonds (miaka 5-10+), na Corporate Bonds (kutoka kampuni). Muda mrefu maana riba kubwa.',
          tip: 'Anza na Treasury Bills - muda mfupi na salama.'
        },
        {
          id: 'bonds-4',
          title: 'Lini kutumia Bondi',
          content: 'Bondi ni nzuri kwa watu wanaotaka mapato ya kawaida na usalama. Wazee, wazazi, au yeyote anayetaka pesa salama wanatumia bondi.',
          tip: 'Mchanganyo wa hisa na bondi ni salama zaidi.'
        }
      ]
    },
    etfs: {
      title: 'Vikundi vya Hisa (ETFs)',
      description: 'Wekeza kwenye kampuni nyingi kwa wakati mmoja',
      lessons: [
        {
          id: 'etfs-1',
          title: 'ETF ni nini?',
          content: 'ETF (Exchange Traded Fund) ni kikundi cha hisa nyingi. Badala ya kununua hisa moja, unawekeza kwenye kampuni 10, 20, au 50 kwa wakati mmoja.',
          tip: 'Hii inaitwa "diversification" - ni salama zaidi.'
        },
        {
          id: 'etfs-2',
          title: 'Kwa nini ETFs ni bora?',
          content: 'Ikiwa hisa moja inashuka, nyingine zinaweza kuongezeka. Unapunguza hatari kwa kusambaza pesa zako. Hii ni njia salama kwa wanaoanza.',
          tip: 'Wataalam wa uwekezaji wanashauri kusambaza uwekezaji.'
        },
        {
          id: 'etfs-3',
          title: 'Aina za ETFs',
          content: 'DSE All-Share ETF ina kampuni zote za DSE. Banking ETF ina benki tu. Telecom ETF ina kampuni za mawasiliano. Chagua kulingana na maoni yako.',
          tip: 'Anza na All-Share ETF - ina aina zote za biashara.'
        },
        {
          id: 'etfs-4',
          title: 'ETFs vs Hisa Moja',
          content: 'Hisa moja inaweza kukupa faida kubwa lakini hatari kubwa pia. ETF ina hatari ndogo lakini faida wastani. Kwa wanaoanza, ETF ni salama zaidi.',
          tip: 'Unaweza kuwa na ETFs NA hisa moja - mchanganyo ni bora.'
        }
      ]
    },
    strategy: {
      title: 'Mikakati ya Uwekezaji',
      description: 'Jinsi ya kufanya vizuri',
      lessons: [
        {
          id: 'strategy-1',
          title: 'Usambaze uwekezaji wako',
          content: 'Usiweke pesa zako zote kwenye hisa moja. Sambaza kwenye hisa 5-10 tofauti, au tumia ETFs. Hii inakulinda.',
          tip: 'Kanuni ya kifahari: Usiweke zaidi ya 20% kwenye hisa moja.'
        },
        {
          id: 'strategy-2',
          title: 'Wekeza mara kwa mara',
          content: 'Badala ya kuweka kiasi kikubwa mara moja, weka kidogo kila mwezi. Hii inakusaidia kununua bei mbalimbali na kupunguza hatari.',
          tip: 'TZS 50,000 kila mwezi ni bora kuliko TZS 600,000 mara moja.'
        },
        {
          id: 'strategy-3',
          title: 'Jiepushe na hofu na tamaa',
          content: 'Bei ikishuka, watu wanauza kwa hofu. Bei ikiongezeka, watu wananunua kwa tamaa. Hii ni makosa. Fuata mpango wako, si hisia zako.',
          tip: 'Watu bora hufanya kinyume na umati.'
        },
        {
          id: 'strategy-4',
          title: 'Jifunze daima',
          content: 'Soma habari za biashara, angalia taarifa za kampuni, jifunze kila siku. Elimu ni uwekezaji bora zaidi unaweza kufanya.',
          tip: 'Dakika 10 za kusoma kila siku zitakufanya mwekezaji bora.'
        }
      ]
    }
  } : {
    basics: {
      title: 'Investment Basics',
      description: 'Fundamental knowledge for beginners',
      lessons: [
        {
          id: 'basics-1',
          title: 'What is a stock?',
          content: 'A stock is a small piece of a company. When you own stock, you are a small owner of that company. If the company does well, your stock value goes up.',
          tip: 'Remember: Stock prices change daily based on how the company is doing.'
        },
        {
          id: 'basics-2',
          title: 'Why do prices change?',
          content: 'Stock prices go up when more people want to buy, and down when more people want to sell. This depends on how the company is performing.',
          tip: "This is completely normal. Don't worry about daily changes."
        },
        {
          id: 'basics-3',
          title: 'Long-term investing',
          content: 'Successful investors do well by holding onto investments for the long term - 5, 10, or more years. Patience is very important.',
          tip: 'Be patient. Look for long-term growth, not quick profits.'
        },
        {
          id: 'basics-4',
          title: 'Risk and Reward',
          content: 'Stock investing has higher risk but higher rewards. Bonds have lower risk but lower rewards. Choose based on your situation.',
          tip: "Don't fear risk, but understand it."
        }
      ]
    },
    dse: {
      title: 'DSE Market',
      description: 'Dar es Salaam Stock Exchange',
      lessons: [
        {
          id: 'dse-1',
          title: 'What is DSE?',
          content: 'The Dar es Salaam Stock Exchange (DSE) is the stock market in Tanzania. Big companies like NMB, CRDB, TBL, and TCCL sell shares here.',
          tip: 'DSE is open Monday to Friday, 10:00 AM - 3:00 PM.'
        },
        {
          id: 'dse-2',
          title: 'Which companies are on DSE?',
          content: 'There are banking companies (NMB, CRDB), telecom (Vodacom, Airtel), commercial (TBL), and others. All companies must meet strict requirements.',
          tip: 'DSE-listed companies are established and well-regulated.'
        },
        {
          id: 'dse-3',
          title: 'How to read DSE data',
          content: 'Stock price shows current value. "Change" shows today\'s movement. Volume shows how many people are trading.',
          tip: 'Look at trends over months, not just one day.'
        },
        {
          id: 'dse-4',
          title: 'Trading hours',
          content: 'DSE opens Monday-Friday, 10:00 AM to 3:00 PM. Prices only change when the market is open. No changes on holidays or weekends.',
          tip: 'You can view prices anytime, but they only update when market is open.'
        }
      ]
    },
    bonds: {
      title: 'Government Bonds',
      description: 'Loans you give to government',
      lessons: [
        {
          id: 'bonds-1',
          title: 'What is a bond?',
          content: 'A bond is a loan you give to the government. The government promises to pay you interest monthly and return your money after a set time.',
          tip: 'Bonds are safer than stocks because government guarantees payment.'
        },
        {
          id: 'bonds-2',
          title: 'How bonds work',
          content: 'You invest TZS 1,000,000 for 5 years at 12% interest. Government pays you TZS 10,000 monthly (12% yearly), and after 5 years you get your TZS 1,000,000 back.',
          tip: 'Interest goes directly to your account every month.'
        },
        {
          id: 'bonds-3',
          title: 'Types of bonds',
          content: 'There are Treasury Bills (1-2 years), Government Bonds (5-10+ years), and Corporate Bonds (from companies). Longer duration means higher interest.',
          tip: 'Start with Treasury Bills - shorter duration and safe.'
        },
        {
          id: 'bonds-4',
          title: 'When to use bonds',
          content: 'Bonds are good for people who want regular income and safety. Retirees, parents, or anyone who wants secure money use bonds.',
          tip: 'Mix of stocks and bonds is safer.'
        }
      ]
    },
    etfs: {
      title: 'Stock Bundles (ETFs)',
      description: 'Invest in many companies at once',
      lessons: [
        {
          id: 'etfs-1',
          title: 'What is an ETF?',
          content: 'An ETF (Exchange Traded Fund) is a bundle of many stocks. Instead of buying one stock, you invest in 10, 20, or 50 companies at once.',
          tip: 'This is called "diversification" - it\'s safer.'
        },
        {
          id: 'etfs-2',
          title: 'Why ETFs are good',
          content: 'If one stock goes down, others might go up. You reduce risk by spreading your money. This is a safe approach for beginners.',
          tip: 'Investment experts recommend spreading investments.'
        },
        {
          id: 'etfs-3',
          title: 'Types of ETFs',
          content: 'DSE All-Share ETF has all DSE companies. Banking ETF has only banks. Telecom ETF has telecom companies. Choose based on your view.',
          tip: 'Start with All-Share ETF - it has all business types.'
        },
        {
          id: 'etfs-4',
          title: 'ETFs vs Single Stocks',
          content: 'A single stock can give big profits but big risks too. ETFs have lower risk but average profits. For beginners, ETFs are safer.',
          tip: 'You can have ETFs AND single stocks - mixing is best.'
        }
      ]
    },
    strategy: {
      title: 'Investment Strategy',
      description: 'How to do well',
      lessons: [
        {
          id: 'strategy-1',
          title: 'Spread your investments',
          content: "Don't put all your money in one stock. Spread across 5-10 different stocks, or use ETFs. This protects you.",
          tip: 'Golden rule: Don\'t put more than 20% in one stock.'
        },
        {
          id: 'strategy-2',
          title: 'Invest regularly',
          content: 'Instead of investing a large amount once, invest small amounts monthly. This helps you buy at different prices and reduces risk.',
          tip: 'TZS 50,000 monthly is better than TZS 600,000 once.'
        },
        {
          id: 'strategy-3',
          title: 'Avoid fear and greed',
          content: 'When prices drop, people sell from fear. When prices rise, people buy from greed. This is wrong. Follow your plan, not emotions.',
          tip: 'Best investors do opposite of the crowd.'
        },
        {
          id: 'strategy-4',
          title: 'Always learn',
          content: 'Read business news, check company reports, learn daily. Education is the best investment you can make.',
          tip: '10 minutes of reading daily will make you a better investor.'
        }
      ]
    }
  };

  const t = language === 'sw' ? {
    title: 'Jifunze',
    back: 'Rudi',
    selectCategory: 'Chagua mada',
    lessons: 'masomo',
    completed: 'Umekamilisha',
    gotIt: 'Nimeelewa',
    next: 'Ijayo',
    finish: 'Maliza',
    backToCategories: 'Rudi kwenye mada',
    allDone: 'Hongera! Umekamilisha mada hii',
    keepLearning: 'Endelea kujifunza mada nyingine'
  } : {
    title: 'Learn',
    back: 'Back',
    selectCategory: 'Select a topic',
    lessons: 'lessons',
    completed: 'Completed',
    gotIt: 'Got it',
    next: 'Next',
    finish: 'Finish',
    backToCategories: 'Back to topics',
    allDone: 'Congratulations! You completed this topic',
    keepLearning: 'Keep learning other topics'
  };

  const getCurrentLessons = () => {
    if (!selectedCategory) return [];
    return categories[selectedCategory].lessons;
  };

  const lessons = getCurrentLessons();
  const isLastLesson = currentLesson === lessons.length - 1;
  const categoryLessonsCompleted = selectedCategory 
    ? lessons.every(l => completedLessons.includes(l.id))
    : false;

  const handleComplete = () => {
    if (!selectedCategory) return;
    
    const lessonId = lessons[currentLesson].id;
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
    
    if (isLastLesson) {
      // Show completion, then go back to categories
      setTimeout(() => {
        setSelectedCategory(null);
        setCurrentLesson(0);
      }, 2000);
    } else {
      setCurrentLesson(currentLesson + 1);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <button
            onClick={() => {
              if (selectedCategory) {
                setSelectedCategory(null);
                setCurrentLesson(0);
              } else {
                onBack();
              }
            }}
            className="p-2 hover:bg-gray-50 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-black" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-black">{t.title}</h1>
            {selectedCategory && (
              <p className="text-xs text-gray-400">
                {categories[selectedCategory].title}
              </p>
            )}
          </div>
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-black" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        {!selectedCategory ? (
          // Category Selection
          <div className="max-w-2xl mx-auto px-6 py-8 space-y-4">
            <p className="text-sm text-gray-500 mb-6">{t.selectCategory}</p>
            
            {(Object.keys(categories) as Category[]).map((catKey, idx) => {
              const cat = categories[catKey];
              const totalLessons = cat.lessons.length;
              const completed = cat.lessons.filter(l => completedLessons.includes(l.id)).length;
              const progress = (completed / totalLessons) * 100;
              
              return (
                <motion.button
                  key={catKey}
                  onClick={() => {
                    setSelectedCategory(catKey);
                    setCurrentLesson(0);
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="w-full bg-white border-2 border-gray-100 hover:border-gray-300 rounded-2xl p-6 text-left transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-black text-lg mb-1">{cat.title}</h3>
                      <p className="text-sm text-gray-500 mb-3">{cat.description}</p>
                      <p className="text-xs text-gray-400">
                        {totalLessons} {t.lessons} • {completed} {t.completed}
                      </p>
                    </div>
                    {completed === totalLessons && (
                      <CheckCircle className="w-6 h-6 text-black flex-shrink-0" />
                    )}
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="bg-black h-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </motion.button>
              );
            })}
          </div>
        ) : categoryLessonsCompleted ? (
          // Completion screen
          <div className="flex items-center justify-center px-6 py-12 h-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center max-w-md"
            >
              <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-black mb-4">{t.allDone}</h2>
              <p className="text-base text-gray-600">{t.keepLearning}</p>
            </motion.div>
          </div>
        ) : (
          // Lesson display
          <div className="flex items-center justify-center px-6 py-12 h-full">
            <div className="max-w-md w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedCategory}-${currentLesson}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl p-8 border-2 border-gray-100 shadow-sm"
                >
                  {/* Lesson number */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{currentLesson + 1}</span>
                    </div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider">
                      {language === 'sw' ? 'Somo' : 'Lesson'} {currentLesson + 1} {language === 'sw' ? 'ya' : 'of'} {lessons.length}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl font-bold text-black mb-6 leading-tight">
                    {lessons[currentLesson].title}
                  </h2>

                  {/* Content */}
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    {lessons[currentLesson].content}
                  </p>

                  {/* Tip */}
                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">
                      {language === 'sw' ? 'Kidokezo' : 'Key Tip'}
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {lessons[currentLesson].tip}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      {selectedCategory && !categoryLessonsCompleted && (
        <div className="bg-white border-t border-gray-100 px-6 py-6">
          <div className="max-w-md mx-auto">
            <Button
              onClick={handleComplete}
              className="w-full bg-black text-white py-6 rounded-full font-semibold hover:bg-gray-900 transition-colors"
            >
              {isLastLesson ? t.finish : t.gotIt}
            </Button>
            
            {/* Progress dots */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {lessons.map((_, idx) => (
                <div
                  key={idx}
                  className={`transition-all rounded-full ${
                    idx === currentLesson
                      ? 'w-8 h-2 bg-black'
                      : idx < currentLesson
                      ? 'w-2 h-2 bg-black'
                      : 'w-2 h-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
