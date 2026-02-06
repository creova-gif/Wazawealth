import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, Plus, CreditCard, Building2, Smartphone, Eye, EyeOff,
  Copy, Download, Settings, ChevronRight, Check, TrendingUp, Shield,
  Zap, Globe
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface Props {
  language: 'sw' | 'en';
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export function WazaBankingHub({ language, onBack, onNavigate }: Props) {
  const [selectedView, setSelectedView] = useState<'overview' | 'cards' | 'funding'>('overview');
  const [showBalance, setShowBalance] = useState(true);
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [addFundsMethod, setAddFundsMethod] = useState<'mpesa' | 'bank' | null>(null);

  const microcopy = {
    en: {
      title: 'Banking',
      overview: 'Overview',
      cards: 'Cards',
      funding: 'Funding',
      availableBalance: 'Available Balance',
      totalInvested: 'Total Invested',
      addFunds: 'Add Funds',
      withdraw: 'Withdraw',
      // Cards
      yourCards: 'Your Cards',
      virtualCard: 'Virtual Card',
      physicalCard: 'Physical Card',
      orderCard: 'Order Physical Card',
      cardNumber: 'Card Number',
      expires: 'Expires',
      cvv: 'CVV',
      showDetails: 'Show Details',
      hideDetails: 'Hide Details',
      copyNumber: 'Copy Number',
      freeze: 'Freeze Card',
      unfreeze: 'Unfreeze Card',
      // Account Tiers
      accountTier: 'Account Tier',
      starter: 'Starter',
      growth: 'Growth',
      wealth: 'Wealth',
      upgrade: 'Upgrade',
      tierBenefits: 'Benefits',
      // Funding
      fundingMethods: 'Funding Methods',
      mpesaTitle: 'M-Pesa',
      mpesaDesc: 'Instant transfer via M-Pesa',
      bankTitle: 'Bank Transfer',
      bankDesc: 'From your linked bank account',
      linkedAccounts: 'Linked Accounts',
      linkNew: 'Link New Account',
      // Add Funds Flow
      howMuchAdd: 'How much do you want to add?',
      enterAmount: 'Enter amount',
      paybillNumber: 'Paybill Number',
      accountNumber: 'Account Number',
      mpesaInstructions: 'Send money to this Lipa Na M-Pesa number',
      copyPaybill: 'Copy Paybill',
      copyAccount: 'Copy Account',
      waitingConfirmation: 'Waiting for payment confirmation...',
      fundsAdded: 'Funds Added Successfully',
      // Limits
      dailyLimit: 'Daily Limit',
      monthlyLimit: 'Monthly Limit',
      remaining: 'remaining',
      // Security
      securityFeatures: 'Security Features',
      twoFactor: 'Two-factor authentication',
      biometric: 'Biometric login',
      encryption: 'Bank-level encryption'
    },
    sw: {
      title: 'Benki',
      overview: 'Muhtasari',
      cards: 'Kadi',
      funding: 'Fedha',
      availableBalance: 'Salio Linalopatikana',
      totalInvested: 'Jumla Iliyowekeza',
      addFunds: 'Ongeza Fedha',
      withdraw: 'Toa Fedha',
      // Cards
      yourCards: 'Kadi Zako',
      virtualCard: 'Kadi ya Mtandao',
      physicalCard: 'Kadi ya Kimwili',
      orderCard: 'Agiza Kadi ya Kimwili',
      cardNumber: 'Nambari ya Kadi',
      expires: 'Inaisha',
      cvv: 'CVV',
      showDetails: 'Onyesha Maelezo',
      hideDetails: 'Ficha Maelezo',
      copyNumber: 'Nakili Nambari',
      freeze: 'Simamisha Kadi',
      unfreeze: 'Washa Kadi',
      // Account Tiers
      accountTier: 'Kiwango cha Akaunti',
      starter: 'Anza',
      growth: 'Ukuaji',
      wealth: 'Utajiri',
      upgrade: 'Boresha',
      tierBenefits: 'Faida',
      // Funding
      fundingMethods: 'Njia za Kuongeza Fedha',
      mpesaTitle: 'M-Pesa',
      mpesaDesc: 'Uhamisho wa haraka kupitia M-Pesa',
      bankTitle: 'Uhamisho wa Benki',
      bankDesc: 'Kutoka akaunti yako ya benki',
      linkedAccounts: 'Akaunti Zilizounganishwa',
      linkNew: 'Unganisha Akaunti Mpya',
      // Add Funds Flow
      howMuchAdd: 'Unataka kuongeza kiasi gani?',
      enterAmount: 'Weka kiasi',
      paybillNumber: 'Nambari ya Paybill',
      accountNumber: 'Nambari ya Akaunti',
      mpesaInstructions: 'Tuma pesa kwa nambari hii ya Lipa Na M-Pesa',
      copyPaybill: 'Nakili Paybill',
      copyAccount: 'Nakili Akaunti',
      waitingConfirmation: 'Inasubiri uthibitisho wa malipo...',
      fundsAdded: 'Fedha Zimeongezwa',
      // Limits
      dailyLimit: 'Kikomo cha Siku',
      monthlyLimit: 'Kikomo cha Mwezi',
      remaining: 'zimebaki',
      // Security
      securityFeatures: 'Vipengele vya Usalama',
      twoFactor: 'Uthibitishaji wa hatua mbili',
      biometric: 'Kuingia kwa biological',
      encryption: 'Usimbuaji wa kiwango cha benki'
    }
  };

  const t = microcopy[language];

  // Sample account data
  const accountBalance = 2450000;
  const totalInvested = 3750000;

  const accountTiers = {
    starter: {
      name: t.starter,
      dailyLimit: 500000,
      monthlyLimit: 5000000,
      benefits: [
        language === 'en' ? 'Virtual card' : 'Kadi ya mtandao',
        language === 'en' ? 'M-Pesa deposits' : 'Amana za M-Pesa',
        language === 'en' ? 'Basic analytics' : 'Uchambuzi wa msingi'
      ],
      color: 'zinc'
    },
    growth: {
      name: t.growth,
      dailyLimit: 2000000,
      monthlyLimit: 20000000,
      benefits: [
        language === 'en' ? 'Physical card' : 'Kadi ya kimwili',
        language === 'en' ? 'Priority support' : 'Msaada wa kipaumbele',
        language === 'en' ? 'Advanced analytics' : 'Uchambuzi wa juu',
        language === 'en' ? '0.5% cashback' : 'Marejesho ya 0.5%'
      ],
      color: 'blue'
    },
    wealth: {
      name: t.wealth,
      dailyLimit: 10000000,
      monthlyLimit: 100000000,
      benefits: [
        language === 'en' ? 'Premium metal card' : 'Kadi ya chuma bora',
        language === 'en' ? 'Dedicated advisor' : 'Mshauri maalum',
        language === 'en' ? 'Tax optimization' : 'Kuboresha kodi',
        language === 'en' ? '1% cashback' : 'Marejesho ya 1%',
        language === 'en' ? 'Airport lounge access' : 'Ufikiaji wa uwanja wa ndege'
      ],
      color: 'amber'
    }
  };

  const currentTier = 'starter';

  const formatCurrency = (amount: number) => {
    return `TZS ${amount.toLocaleString()}`;
  };

  const maskCardNumber = (show: boolean) => {
    if (show) return '5123 4567 8901 2345';
    return '•••• •••• •••• 2345';
  };

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
          <h1 className="text-xl font-light">{t.title}</h1>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 flex gap-4">
          {[
            { id: 'overview' as const, label: t.overview },
            { id: 'cards' as const, label: t.cards },
            { id: 'funding' as const, label: t.funding }
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setSelectedView(id)}
              className={`pb-3 px-2 text-sm font-medium border-b-2 transition-colors ${
                selectedView === id
                  ? 'border-black text-black'
                  : 'border-transparent text-zinc-500 hover:text-zinc-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">
        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {selectedView === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Balance Card */}
              <Card className="p-8 border-zinc-200 bg-gradient-to-br from-zinc-900 to-black text-white">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-wide mb-2">
                      {t.availableBalance}
                    </p>
                    <div className="flex items-center gap-3">
                      <motion.h2
                        className="text-5xl font-light"
                        animate={{ opacity: showBalance ? 1 : 0.3 }}
                      >
                        {showBalance ? formatCurrency(accountBalance) : '••••••'}
                      </motion.h2>
                      <button
                        onClick={() => setShowBalance(!showBalance)}
                        className="p-2 rounded-full hover:bg-white/10"
                      >
                        {showBalance ? (
                          <Eye className="w-5 h-5" />
                        ) : (
                          <EyeOff className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
                  <div>
                    <p className="text-xs text-zinc-400 mb-1">{t.totalInvested}</p>
                    <p className="text-xl font-light">{formatCurrency(totalInvested)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 mb-1">
                      {language === 'en' ? 'Total Return' : 'Jumla ya Faida'}
                    </p>
                    <p className="text-xl font-light text-green-400">+12.3%</p>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => setShowAddFunds(true)}
                  className="h-14 bg-black text-white hover:bg-zinc-800"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  {t.addFunds}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onNavigate('withdraw')}
                  className="h-14 border-2"
                >
                  <Download className="w-5 h-5 mr-2" />
                  {t.withdraw}
                </Button>
              </div>

              {/* Account Tier */}
              <Card className="p-6 border-zinc-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wide mb-1">
                      {t.accountTier}
                    </p>
                    <p className="text-xl font-medium">{accountTiers[currentTier].name}</p>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => onNavigate('upgrade')}
                    className="text-sm"
                  >
                    {t.upgrade}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-zinc-500 mb-2">{t.tierBenefits}</p>
                  {accountTiers[currentTier].benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-zinc-700">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Limits */}
                <div className="mt-6 pt-6 border-t border-zinc-100 space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-zinc-500">{t.dailyLimit}</p>
                      <p className="text-xs text-zinc-700">
                        {formatCurrency(accountTiers[currentTier].dailyLimit - 100000)} {t.remaining}
                      </p>
                    </div>
                    <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                      <div className="h-full bg-black rounded-full" style={{ width: '80%' }} />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Security */}
              <Card className="p-6 border-zinc-200">
                <p className="text-sm font-medium mb-4">{t.securityFeatures}</p>
                <div className="space-y-3">
                  {[
                    { icon: Shield, label: t.twoFactor, active: true },
                    { icon: Smartphone, label: t.biometric, active: true },
                    { icon: Globe, label: t.encryption, active: true }
                  ].map(({ icon: Icon, label, active }) => (
                    <div key={label} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-zinc-600" />
                        <span className="text-sm text-zinc-700">{label}</span>
                      </div>
                      {active && (
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {/* Cards Tab */}
          {selectedView === 'cards' && (
            <motion.div
              key="cards"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-light mb-6">{t.yourCards}</h2>

              {/* Virtual Card */}
              <Card className="p-0 border-0 overflow-hidden">
                <div className="relative h-56 bg-gradient-to-br from-black to-zinc-800 rounded-2xl p-6 text-white">
                  {/* Card Design */}
                  <div className="flex flex-col justify-between h-full">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs text-zinc-400 mb-1">{t.virtualCard}</p>
                        <p className="text-sm font-medium">Waza Wealth</p>
                      </div>
                      <CreditCard className="w-8 h-8 text-zinc-400" />
                    </div>

                    <div>
                      <p className="text-2xl font-light tracking-wider mb-4">
                        {maskCardNumber(showBalance)}
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-zinc-400">{t.expires}</p>
                          <p className="text-sm">{showBalance ? '12/28' : '••/••'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-zinc-400">{t.cvv}</p>
                          <p className="text-sm">{showBalance ? '123' : '•••'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chip */}
                  <div className="absolute top-20 left-6 w-12 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg opacity-80" />
                </div>

                {/* Card Actions */}
                <div className="p-4 bg-zinc-50 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-zinc-200 rounded-lg text-sm hover:border-zinc-400 transition-colors"
                  >
                    {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {showBalance ? t.hideDetails : t.showDetails}
                  </button>
                  <button
                    onClick={() => navigator.clipboard.writeText('5123456789012345')}
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-zinc-200 rounded-lg text-sm hover:border-zinc-400 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    {t.copyNumber}
                  </button>
                </div>
              </Card>

              {/* Physical Card CTA */}
              {currentTier === 'starter' && (
                <Card className="p-6 border-2 border-dashed border-zinc-300 bg-zinc-50">
                  <div className="text-center">
                    <CreditCard className="w-12 h-12 text-zinc-400 mx-auto mb-3" />
                    <p className="text-base font-medium mb-2">{t.physicalCard}</p>
                    <p className="text-sm text-zinc-600 mb-4">
                      {language === 'en'
                        ? 'Upgrade to Growth or Wealth tier to order a physical card'
                        : 'Boresha hadi kiwango cha Ukuaji au Utajiri ili kuagiza kadi ya kimwili'
                      }
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => onNavigate('upgrade')}
                      className="border-2"
                    >
                      {t.upgrade}
                    </Button>
                  </div>
                </Card>
              )}
            </motion.div>
          )}

          {/* Funding Tab */}
          {selectedView === 'funding' && (
            <motion.div
              key="funding"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-light mb-6">{t.fundingMethods}</h2>

              {/* M-Pesa */}
              <Card
                className="p-6 border-2 border-zinc-200 hover:border-zinc-400 cursor-pointer transition-all"
                onClick={() => {
                  setAddFundsMethod('mpesa');
                  setShowAddFunds(true);
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Smartphone className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium mb-1">{t.mpesaTitle}</h3>
                    <p className="text-sm text-zinc-600">{t.mpesaDesc}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-600" />
                      <span className="text-xs text-zinc-500">
                        {language === 'en' ? 'Instant' : 'Mara moja'}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-zinc-400" />
                </div>
              </Card>

              {/* Bank Transfer */}
              <Card
                className="p-6 border-2 border-zinc-200 hover:border-zinc-400 cursor-pointer transition-all"
                onClick={() => {
                  setAddFundsMethod('bank');
                  setShowAddFunds(true);
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium mb-1">{t.bankTitle}</h3>
                    <p className="text-sm text-zinc-600">{t.bankDesc}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-zinc-500" />
                      <span className="text-xs text-zinc-500">
                        {language === 'en' ? '1-2 business days' : 'Siku 1-2 za biashara'}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-zinc-400" />
                </div>
              </Card>

              {/* Linked Accounts */}
              <div className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-medium">{t.linkedAccounts}</h3>
                  <Button
                    variant="ghost"
                    onClick={() => onNavigate('link-account')}
                    className="text-sm"
                  >
                    {t.linkNew}
                  </Button>
                </div>

                <Card className="p-5 border-zinc-200">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-zinc-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">CRDB Bank</p>
                      <p className="text-xs text-zinc-500">•••• 4567</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded bg-green-50 text-green-700">
                      {language === 'en' ? 'Active' : 'Hai'}
                    </span>
                  </div>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Add Funds Modal */}
      <AnimatePresence>
        {showAddFunds && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setShowAddFunds(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-zinc-100 px-6 py-4 flex items-center justify-between rounded-t-3xl">
                <h2 className="text-xl font-light">{t.addFunds}</h2>
                <button
                  onClick={() => setShowAddFunds(false)}
                  className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {addFundsMethod === 'mpesa' && (
                  <>
                    <h3 className="text-lg font-medium">{t.mpesaInstructions}</h3>
                    
                    {/* Paybill Info */}
                    <Card className="p-6 bg-green-50 border-green-100">
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-green-700 mb-2">{t.paybillNumber}</p>
                          <div className="flex items-center justify-between">
                            <p className="text-3xl font-light">400200</p>
                            <button
                              onClick={() => navigator.clipboard.writeText('400200')}
                              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-sm"
                            >
                              <Copy className="w-4 h-4" />
                              {t.copyPaybill}
                            </button>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-green-700 mb-2">{t.accountNumber}</p>
                          <div className="flex items-center justify-between">
                            <p className="text-2xl font-light">WZ12345678</p>
                            <button
                              onClick={() => navigator.clipboard.writeText('WZ12345678')}
                              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-sm"
                            >
                              <Copy className="w-4 h-4" />
                              {t.copyAccount}
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Waiting State */}
                    <Card className="p-8 border-zinc-200 text-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="w-12 h-12 border-2 border-black border-t-transparent rounded-full mx-auto mb-4"
                      />
                      <p className="text-sm text-zinc-600">{t.waitingConfirmation}</p>
                    </Card>
                  </>
                )}

                <Button
                  variant="outline"
                  onClick={() => setShowAddFunds(false)}
                  className="w-full h-12"
                >
                  {language === 'en' ? 'Close' : 'Funga'}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
