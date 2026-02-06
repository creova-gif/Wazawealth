import { Home, TrendingUp, BookOpen, Bell, User } from "lucide-react";
import { motion } from "motion/react";

interface BottomNavProps {
  language: 'sw' | 'en';
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

export function BottomNav({ language, activeScreen, onNavigate }: BottomNavProps) {
  const navItems = [
    { 
      id: 'dashboard', 
      icon: Home, 
      labelSw: 'Nyumbani', 
      labelEn: 'Home' 
    },
    { 
      id: 'trade', 
      icon: TrendingUp, 
      labelSw: 'Biashara', 
      labelEn: 'Trade' 
    },
    { 
      id: 'tutor', 
      icon: BookOpen, 
      labelSw: 'Jifunze', 
      labelEn: 'Learn' 
    },
    { 
      id: 'notifications', 
      icon: Bell, 
      labelSw: 'Arifa', 
      labelEn: 'Alerts' 
    },
    { 
      id: 'badges', 
      icon: User, 
      labelSw: 'Profaili', 
      labelEn: 'Profile' 
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-bottom">
      <div className="max-w-6xl mx-auto px-2 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;
            const label = language === 'sw' ? item.labelSw : item.labelEn;

            return (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="flex flex-col items-center justify-center py-2 px-4 min-w-[64px] relative"
                whileTap={{ scale: 0.95 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#00A86B]/10 rounded-2xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                
                <div className="relative z-10">
                  <motion.div
                    animate={{ 
                      scale: isActive ? 1.1 : 1,
                      y: isActive ? -2 : 0
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Icon 
                      className={`w-6 h-6 ${isActive ? 'text-[#00A86B]' : 'text-gray-500'}`}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                  </motion.div>
                  <p className={`text-xs mt-1 font-medium ${isActive ? 'text-[#00A86B]' : 'text-gray-600'}`}>
                    {label}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
