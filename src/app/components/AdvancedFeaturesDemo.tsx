// WAZA WEALTH — Advanced Features Demo
// Showcase all new MVP features

import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  TrendingUp, 
  Shield, 
  DollarSign, 
  Clock,
  Globe,
  Lock,
  FileText,
  AlertCircle
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { EnhancedPortfolioPage } from './EnhancedPortfolioPage';
import { TransactionHistoryScreen } from './TransactionHistoryScreen';
import { LimitOrderFlow } from './LimitOrderFlow';
import { KYCUpgradeFlow } from './KYCUpgradeFlow';
import { CryptoAwarenessFlow } from './CryptoAwarenessFlow';
import { MultiCurrencyAccountSwitcher } from './MultiCurrencyAccountSwitcher';
import { mockPortfolio, mockAssets } from '@/data/mockPortfolio';

interface Props {
  language: 'sw' | 'en';
  onBack: () => void;
  onNavigate?: (screen: string) => void;
}

type DemoScreen = 
  | 'menu' 
  | 'portfolio' 
  | 'history' 
  | 'limit_order' 
  | 'kyc_upgrade' 
  | 'crypto_awareness';

export function AdvancedFeaturesDemo({ language, onBack, onNavigate }: Props) {
  const [currentScreen, setCurrentScreen] = useState<DemoScreen>('menu');
  const [showLimitOrder, setShowLimitOrder] = useState(false);
  const [showKYCUpgrade, setShowKYCUpgrade] = useState(false);
  const [showCryptoFlow, setShowCryptoFlow] = useState(false);

  const content = {
    sw: {
      advancedFeatures: 'Vipengele vya Hali ya Juu',
      newFeatures: 'Vipengele Vipya',
      portfolioManagement: 'Usimamizi wa Portfolio',
      portfolioDesc: 'Portfolio iliyobadilishwa na vichujio, mgao, na uchambuzi wa P/L',
      transactionHistory: 'Historia ya Miamala',
      historyDesc: 'Ukaguzi kamili wa biashara, magawio, na ada',
      limitOrders: 'Maagizo ya Kikomo',
      limitDesc: 'Nunua kwenye bei zako za lengo',
      scheduledInvesting: 'Uwekezaji Uliopangwa',
      scheduledDesc: 'DCA wa kiotomatiki wa kila wiki/mwezi',
      kycUpgrade: 'Kuboresha KYC',
      kycDesc: 'Boresha hadi uthibitishaji wa kiwango cha juu',
      cryptoAwareness: 'Upatikanaji wa Crypto',
      cryptoDesc: 'Elimu ya kwanza, inayozingatia nchi',
      multiCurrency: 'Akaunti Nyingi za Sarafu',
      multiDesc: 'TZS, KES, USD na ubadilishaji wa FX',
      systemIntegrations: 'Muunganisho wa Mfumo',
      systemDesc: 'Adapta za soko, AI, utii - zote zinafanya kazi',
      tryIt: 'Jaribu',
      comingSoon: 'Inakuja Hivi Karibuni',
      demo: 'Onyesho'
    },
    en: {
      advancedFeatures: 'Advanced Features',
      newFeatures: 'New Features',
      portfolioManagement: 'Portfolio Management',
      portfolioDesc: 'Enhanced portfolio with filters, allocation, and P/L analytics',
      transactionHistory: 'Transaction History',
      historyDesc: 'Complete audit trail of trades, dividends, and fees',
      limitOrders: 'Limit Orders',
      limitDesc: 'Buy at your target prices',
      scheduledInvesting: 'Scheduled Investing',
      scheduledDesc: 'Automatic weekly/monthly DCA',
      kycUpgrade: 'KYC Upgrade',
      kycDesc: 'Upgrade to advanced-level verification',
      cryptoAwareness: 'Crypto Availability',
      cryptoDesc: 'Education-first, country-aware gating',
      multiCurrency: 'Multi-Currency Accounts',
      multiDesc: 'TZS, KES, USD with FX conversion',
      systemIntegrations: 'System Integrations',
      systemDesc: 'Market adapters, AI, utilities - all working together',
      tryIt: 'Try It',
      comingSoon: 'Coming Soon',
      demo: 'Demo'
    }
  };

  const t = content[language];

  const features = [
    {
      id: 'portfolio',
      icon: TrendingUp,
      title: t.portfolioManagement,
      description: t.portfolioDesc,
      color: 'bg-blue-50 text-blue-600',
      available: true
    },
    {
      id: 'history',
      icon: FileText,
      title: t.transactionHistory,
      description: t.historyDesc,
      color: 'bg-green-50 text-green-600',
      available: true
    },
    {
      id: 'limit_order',
      icon: DollarSign,
      title: t.limitOrders,
      description: t.limitDesc,
      color: 'bg-purple-50 text-purple-600',
      available: true
    },
    {
      id: 'scheduled',
      icon: Clock,
      title: t.scheduledInvesting,
      description: t.scheduledDesc,
      color: 'bg-amber-50 text-amber-600',
      available: false // Demo shows this is coming
    },
    {
      id: 'kyc_upgrade',
      icon: Shield,
      title: t.kycUpgrade,
      description: t.kycDesc,
      color: 'bg-indigo-50 text-indigo-600',
      available: true
    },
    {
      id: 'crypto_awareness',
      icon: Lock,
      title: t.cryptoAwareness,
      description: t.cryptoDesc,
      color: 'bg-red-50 text-red-600',
      available: true
    },
    {
      id: 'multi_currency',
      icon: Globe,
      title: t.multiCurrency,
      description: t.multiDesc,
      color: 'bg-cyan-50 text-cyan-600',
      available: true
    },
    {
      id: 'system_integrations',
      icon: Globe,
      title: t.systemIntegrations,
      description: t.systemDesc,
      color: 'bg-gray-50 text-gray-600',
      available: true
    }
  ];

  const handleFeatureClick = (id: string) => {
    switch (id) {
      case 'portfolio':
        setCurrentScreen('portfolio');
        break;
      case 'history':
        setCurrentScreen('history');
        break;
      case 'limit_order':
        setShowLimitOrder(true);
        break;
      case 'kyc_upgrade':
        setShowKYCUpgrade(true);
        break;
      case 'crypto_awareness':
        setShowCryptoFlow(true);
        break;
      case 'system_integrations':
        if (onNavigate) {
          onNavigate('system-integrations');
        }
        break;
      default:
        alert(language === 'sw' ? 'Inakuja hivi karibuni!' : 'Coming soon!');
    }
  };

  // Show full-screen components
  if (currentScreen === 'portfolio') {
    return (
      <EnhancedPortfolioPage
        language={language}
        onBack={() => setCurrentScreen('menu')}
        onNavigate={(screen) => console.log('Navigate to:', screen)}
      />
    );
  }

  if (currentScreen === 'history') {
    return (
      <TransactionHistoryScreen
        language={language}
        onBack={() => setCurrentScreen('menu')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-zinc-100 z-10">
        <div className="px-6 py-4 flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center hover:bg-zinc-100"
          >
            <ArrowLeft className="w-5 h-5 text-zinc-700" />
          </button>
          <div>
            <h1 className="text-xl font-light">{t.advancedFeatures}</h1>
            <p className="text-xs text-zinc-500">{t.demo}</p>
          </div>
        </div>
      </div>

      {/* Multi-Currency Switcher Demo */}
      <div className="px-6 pt-6 pb-4">
        <p className="text-sm font-medium text-zinc-600 mb-3">{t.multiCurrency}</p>
        <MultiCurrencyAccountSwitcher
          accounts={mockPortfolio?.accounts || []}
          selectedCurrency="TZS"
          onCurrencyChange={(curr) => console.log('Switch to:', curr)}
          language={language}
        />
      </div>

      {/* Feature Grid */}
      <div className="px-6 py-4">
        <h2 className="text-lg font-light mb-4">{t.newFeatures}</h2>
        <div className="grid gap-3">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card
                className={`p-5 border-zinc-200 hover:border-zinc-300 transition-all ${
                  feature.available ? 'cursor-pointer' : 'opacity-60'
                }`}
                onClick={() => feature.available && handleFeatureClick(feature.id)}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center flex-shrink-0`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium">{feature.title}</h3>
                      {!feature.available && (
                        <span className="text-xs text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">
                          {t.comingSoon}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-zinc-600 mb-3">{feature.description}</p>
                    {feature.available && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 text-xs"
                      >
                        {t.tryIt} →
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Feature Info */}
      <div className="px-6 py-4">
        <Card className="p-5 bg-blue-50 border-blue-200">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-medium mb-1">
                {language === 'sw' ? 'Vipengele vya MVP' : 'MVP Features'}
              </p>
              <p className="text-blue-800">
                {language === 'sw'
                  ? 'Vipengele hivi vimeundwa kwa biashara halisi, uthibitishaji wa udhibiti, na usalama wa mtumiaji. Vyote vimejengwa kwa utulivu wa Wealthsimple na elimu ya kwanza.'
                  : 'These features are built for real trading, regulatory compliance, and user safety. All designed with Wealthsimple calm and education-first principles.'}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Modals */}
      {showLimitOrder && (
        <LimitOrderFlow
          asset={mockAssets[0]} // CRDB
          language={language}
          onClose={() => setShowLimitOrder(false)}
          onConfirm={(details) => {
            console.log('Limit order placed:', details);
            setShowLimitOrder(false);
            alert(language === 'sw' 
              ? 'Agizo la kikomo limewekwa!' 
              : 'Limit order placed!');
          }}
        />
      )}

      {showKYCUpgrade && (
        <KYCUpgradeFlow
          currentLevel="basic"
          language={language}
          onClose={() => setShowKYCUpgrade(false)}
          onComplete={(newLevel) => {
            console.log('KYC upgraded to:', newLevel);
            setShowKYCUpgrade(false);
            alert(language === 'sw' 
              ? 'KYC imeboreshwa kwa mafanikio!' 
              : 'KYC upgraded successfully!');
          }}
        />
      )}

      {showCryptoFlow && (
        <CryptoAwarenessFlow
          userCountry="KE" // Change to "TZ" to see Tanzania restriction
          kycLevel="basic"
          language={language}
          onClose={() => setShowCryptoFlow(false)}
          onApproved={() => {
            console.log('Crypto trading enabled');
            setShowCryptoFlow(false);
            alert(language === 'sw' 
              ? 'Biashara ya Crypto imewashwa!' 
              : 'Crypto trading enabled!');
          }}
          onUpgradeKYC={() => {
            setShowCryptoFlow(false);
            setShowKYCUpgrade(true);
          }}
        />
      )}
    </div>
  );
}