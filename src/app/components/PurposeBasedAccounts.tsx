import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, Shield, Target, Heart, GraduationCap, ChevronRight, Info } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface Account {
  id: string;
  type: 'everyday' | 'retirement' | 'goals' | 'family' | 'learning';
  name: string;
  description: string;
  balance: number;
  growth: number;
  icon: any;
  color: string;
  purpose: string;
  backendAssets: string[];
}

interface Props {
  language: 'sw' | 'en';
  onAccountSelect: (accountId: string) => void;
  onCreateAccount: (type: string) => void;
}

export function PurposeBasedAccounts({ language, onAccountSelect, onCreateAccount }: Props) {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  const content = {
    sw: {
      title: 'Akaunti Zako',
      subtitle: 'Kila lengo lina mahali pake',
      totalWealth: 'Utajiri Wako Wote',
      accounts: {
        everyday: {
          name: 'Ukuaji wa Kila Siku',
          description: 'Pesa zako zikue, bado zipatikane',
          purpose: 'Ukuaji wa muda mrefu, upatikanaji wa fedha'
        },
        retirement: {
          name: 'Hifadhi ya Ustaafu',
          description: 'Wewe wa baadaye amelindwa',
          purpose: 'Usalama wa uzee, ukuaji wa kudumu'
        },
        goals: {
          name: 'Malengo na Akiba',
          description: 'Pesa unapolihitaji',
          purpose: 'Ada, dharura, au biashara'
        },
        family: {
          name: 'Urithi wa Familia',
          description: 'Utajiri unaoendelea',
          purpose: 'Watoto, familia, maisha yajayo'
        },
        learning: {
          name: 'Jifunze & Fanya Mazoezi',
          description: 'Jifunze bila hatari',
          purpose: 'Pata ujasiri, elewa masoko'
        }
      },
      createNew: 'Fungua Akaunti Mpya',
      viewDetails: 'Angalia Maelezo'
    },
    en: {
      title: 'Your Accounts',
      subtitle: 'Every goal has its place',
      totalWealth: 'Your Total Wealth',
      accounts: {
        everyday: {
          name: 'Everyday Growth',
          description: 'Money grows, stays accessible',
          purpose: 'Long-term growth, flexible access'
        },
        retirement: {
          name: 'Retirement Vault',
          description: 'Future you is protected',
          purpose: 'Old-age security, lasting growth'
        },
        goals: {
          name: 'Goals & Savings',
          description: 'Money when you need it',
          purpose: 'School fees, emergencies, business'
        },
        family: {
          name: 'Family Legacy',
          description: 'Wealth that continues',
          purpose: 'Children, family, future life'
        },
        learning: {
          name: 'Learn & Practice',
          description: 'Learn without risk',
          purpose: 'Build confidence, understand markets'
        }
      },
      createNew: 'Open New Account',
      viewDetails: 'View Details'
    }
  };

  const t = content[language];

  // Sample accounts - in production, fetch from backend
  const accounts: Account[] = [
    {
      id: 'everyday-1',
      type: 'everyday',
      name: t.accounts.everyday.name,
      description: t.accounts.everyday.description,
      balance: 2500000,
      growth: 12.5,
      icon: TrendingUp,
      color: 'text-black',
      purpose: t.accounts.everyday.purpose,
      backendAssets: ['DSE Stocks', 'Unit Trusts', 'ETFs']
    },
    {
      id: 'retirement-1',
      type: 'retirement',
      name: t.accounts.retirement.name,
      description: t.accounts.retirement.description,
      balance: 1500000,
      growth: 8.2,
      icon: Shield,
      color: 'text-black',
      purpose: t.accounts.retirement.purpose,
      backendAssets: ['Government Bonds', 'Conservative ETFs']
    },
    {
      id: 'goals-1',
      type: 'goals',
      name: t.accounts.goals.name,
      description: t.accounts.goals.description,
      balance: 750000,
      growth: 5.1,
      icon: Target,
      color: 'text-black',
      purpose: t.accounts.goals.purpose,
      backendAssets: ['Money Market Funds', 'Short-term Bonds']
    }
  ];

  const totalWealth = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  const accountTemplates = [
    { type: 'everyday', icon: TrendingUp, name: t.accounts.everyday.name },
    { type: 'retirement', icon: Shield, name: t.accounts.retirement.name },
    { type: 'goals', icon: Target, name: t.accounts.goals.name },
    { type: 'family', icon: Heart, name: t.accounts.family.name },
    { type: 'learning', icon: GraduationCap, name: t.accounts.learning.name }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 pt-12 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm text-zinc-500 mb-2">{t.subtitle}</p>
          <h1 className="text-3xl font-light mb-8">{t.title}</h1>

          {/* Total Wealth */}
          <div className="mb-8">
            <p className="text-sm text-zinc-500 mb-1">{t.totalWealth}</p>
            <p className="text-5xl font-light tracking-tight">
              TZS {(totalWealth / 1000000).toFixed(2)}M
            </p>
          </div>
        </motion.div>
      </div>

      {/* Accounts List */}
      <div className="px-6 space-y-4">
        <AnimatePresence>
          {accounts.map((account, index) => {
            const Icon = account.icon;
            return (
              <motion.div
                key={account.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className="p-6 border-zinc-200 hover:border-zinc-400 transition-all cursor-pointer bg-white"
                  onClick={() => onAccountSelect(account.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center">
                        <Icon className={`w-6 h-6 ${account.color}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-1">{account.name}</h3>
                        <p className="text-sm text-zinc-500">{account.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-zinc-400" />
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-light tracking-tight">
                        TZS {(account.balance / 1000).toLocaleString()}
                      </p>
                      <p className="text-xs text-zinc-500 mt-1">{account.purpose}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-black">+{account.growth}%</p>
                      <p className="text-xs text-zinc-500">
                        {language === 'sw' ? 'Mwaka huu' : 'This year'}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Create New Account */}
      <div className="px-6 mt-8 pb-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-sm text-zinc-500 mb-4">{t.createNew}</p>
          <div className="grid grid-cols-2 gap-3">
            {accountTemplates.map((template) => {
              const Icon = template.icon;
              const hasAccount = accounts.some(acc => acc.type === template.type);
              
              if (hasAccount) return null;

              return (
                <button
                  key={template.type}
                  onClick={() => onCreateAccount(template.type)}
                  className="p-4 border border-zinc-200 rounded-lg hover:border-zinc-400 transition-all text-left"
                >
                  <Icon className="w-5 h-5 text-zinc-700 mb-2" />
                  <p className="text-sm font-medium">{template.name}</p>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
