import { Shield, Lock, GraduationCap, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

interface TrustIndicatorProps {
  language: 'sw' | 'en';
  variant?: 'full' | 'minimal' | 'badge';
  context?: 'signup' | 'invest' | 'general';
}

export function TrustIndicator({ language, variant = 'minimal', context = 'general' }: TrustIndicatorProps) {
  const t = language === 'sw' ? {
    regulated: 'Inaratibiwa na CMSA',
    simulation: 'Mazoezi salama - Pesa za kuigiza',
    education: 'Elimu kwanza',
    protected: 'Fedha zinawekwa kando',
    secure: 'Usalama wa juu',
    
    full: {
      title: 'Unaweza kutuamini',
      items: [
        {
          icon: Shield,
          title: 'Inaratibiwa rasmi',
          description: 'CMSA (Capital Markets & Securities Authority) inaangalia kazi zetu.'
        },
        {
          icon: Lock,
          title: 'Pesa zako ni salama',
          description: 'Fedha zinawekwa kando. Hazitumiwi mahali pengine.'
        },
        {
          icon: GraduationCap,
          title: 'Kujifunza kwanza',
          description: 'Unatumia pesa za kuigiza kabla ya pesa halisi. Jifunze bila hatari.'
        },
        {
          icon: CheckCircle,
          title: 'Wazi kabisa',
          description: 'Hakuna ada zilizofichwa. Tunakuambia kila kitu wazi.'
        }
      ]
    },
    
    contexts: {
      signup: 'Taarifa zako ni salama. Tunatumia usimbaji fiti wa kisasa.',
      invest: 'Hii ni mazoezi tu. Pesa halisi hazihatarishi.',
      general: 'Usalama wa juu • Inaratibiwa'
    }
  } : {
    regulated: 'Regulated by CMSA',
    simulation: 'Safe practice - Virtual money',
    education: 'Education first',
    protected: 'Funds held separately',
    secure: 'Bank-grade security',
    
    full: {
      title: 'You can trust us',
      items: [
        {
          icon: Shield,
          title: 'Officially regulated',
          description: 'CMSA (Capital Markets & Securities Authority) oversees our work.'
        },
        {
          icon: Lock,
          title: 'Your money is safe',
          description: 'Funds are held separately. Not used elsewhere.'
        },
        {
          icon: GraduationCap,
          title: 'Learn first',
          description: 'You use virtual money before real money. Learn without risk.'
        },
        {
          icon: CheckCircle,
          title: 'Completely transparent',
          description: 'No hidden fees. We tell you everything clearly.'
        }
      ]
    },
    
    contexts: {
      signup: 'Your information is secure. We use modern encryption.',
      invest: 'This is practice only. Real money is not at risk.',
      general: 'Bank-grade security • Regulated'
    }
  };

  if (variant === 'badge') {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
        <Shield className="w-3.5 h-3.5 text-gray-600" />
        <span className="text-xs text-gray-600 font-medium">
          {t.regulated}
        </span>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Shield className="w-4 h-4" />
        <span>{t.contexts[context]}</span>
      </div>
    );
  }

  // Full variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-3xl p-8 border border-gray-100"
    >
      <h3 className="text-2xl font-bold text-black mb-6">{t.full.title}</h3>
      
      <div className="space-y-6">
        {t.full.items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 text-gray-700" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-semibold text-black mb-1">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
