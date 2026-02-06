import { Button } from "./ui/button";
import { motion } from "motion/react";

interface WelcomeScreenProps {
  onLanguageSelect: (language: 'sw' | 'en') => void;
}

export function WelcomeScreen({ onLanguageSelect }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between p-8 overflow-hidden">
      {/* Top section with logo and title */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-lg w-full">
        {/* Minimal icon - simple and calm */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="relative w-20 h-20">
            {/* Simple C logo for Waza */}
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="text-black">
              <path 
                d="M 60 40 A 20 20 0 1 0 40 60" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="40" cy="40" r="5" fill="currentColor"/>
            </svg>
          </div>
        </motion.div>
        
        {/* Large, light typography - Calm and confident */}
        <motion.div
          className="text-center mb-20 space-y-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-6xl font-light text-black mb-2 tracking-tight leading-none">
            Waza
          </h1>
          <h2 className="text-2xl font-light text-black mb-6 tracking-wide leading-none">
            WEALTH
          </h2>
          <p className="text-base text-zinc-600 max-w-sm mx-auto leading-relaxed">
            A calm, intelligent companion<br/>for saving, investing, and growing wealth.
          </p>
        </motion.div>
        
        {/* Simple feature list - minimal text */}
        <motion.div 
          className="space-y-3 w-full max-w-xs mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {[
            'Purpose-based accounts',
            'Silent AI guidance',
            'Real DSE markets'
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-3 py-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + idx * 0.1, duration: 0.6, ease: "easeOut" }}
            >
              <div className="w-1 h-1 bg-black rounded-full flex-shrink-0"></div>
              <p className="text-sm text-zinc-600 font-light">{feature}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Bottom section with language selection - clean and simple */}
      <motion.div 
        className="w-full max-w-sm space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <p className="text-center text-xs text-zinc-400 font-light mb-6 tracking-wide">
          Choose your language
        </p>
        
        <Button 
          onClick={() => onLanguageSelect('sw')}
          className="w-full bg-black hover:bg-zinc-800 text-white py-6 text-base font-light rounded-lg shadow-sm border-0 transition-all"
        >
          Kiswahili
        </Button>
        
        <Button 
          onClick={() => onLanguageSelect('en')}
          variant="outline"
          className="w-full py-6 text-base font-light rounded-lg border border-zinc-300 text-black hover:bg-zinc-50 transition-all"
        >
          English
        </Button>
        
        <p className="text-xs text-center text-zinc-400 pt-6 font-light">
          Built for Tanzania & East Africa
        </p>
      </motion.div>
    </div>
  );
}