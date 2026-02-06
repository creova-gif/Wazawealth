import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ChevronLeft, CheckCircle, Smartphone, Info, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "./ui/card";

interface MobileMoneyScreenProps {
  language: 'sw' | 'en';
  accessToken: string;
  onBack: () => void;
}

type ActionType = 'deposit' | 'withdraw';
type Provider = 'mpesa' | 'tigopesa' | 'airtelmoney' | 'halopesa';

export function MobileMoneyScreen({ language, accessToken, onBack }: MobileMoneyScreenProps) {
  const [action, setAction] = useState<ActionType>('deposit');
  const [provider, setProvider] = useState<Provider | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(10000000);

  const t = language === 'sw' ? {
    title: 'Ongeza Pesa',
    subtitle: 'Weka pesa kwa njia ya simu',
    deposit: 'Weka Pesa',
    withdraw: 'Toa Pesa',
    currentBalance: 'Salio Lako',
    selectProvider: 'Chagua huduma ya simu',
    phoneNumber: 'Nambari ya Simu',
    phonePlaceholder: '0712 345 678',
    amount: 'Kiasi',
    amountPlaceholder: '10,000',
    confirm: 'Thibitisha',
    cancel: 'Sitisha',
    back: 'Rudi',
    success: 'Umefanikiwa!',
    depositSuccess: 'Pesa zimewekwa',
    withdrawSuccess: 'Pesa zimetolewa',
    processing: 'Inasubiri uthibitisho',
    instructions: 'Fuata maelekezo',
    depositInstructions: 'Utapokea ujumbe wa kuthibitisha kwenye simu yako. Ingiza PIN yako ya M-Pesa ili kukamilisha.',
    withdrawInstructions: 'Pesa zitatumwa kwenye nambari yako ya simu moja kwa moja.',
    safe: 'Hii ni mazoezi - hakuna pesa halisi zitakazohamishwa',
    educational: 'Kwa kujifunza tu',
    minAmount: 'Kiwango cha chini ni TZS 1,000',
    invalidPhone: 'Nambari si sahihi',
    insufficientBalance: 'Salio hazishtoshi',
    quickAmounts: 'Kiasi cha Haraka',
    continue: 'Endelea'
  } : {
    title: 'Add Money',
    subtitle: 'Deposit via mobile money',
    deposit: 'Deposit',
    withdraw: 'Withdraw',
    currentBalance: 'Your Balance',
    selectProvider: 'Select mobile money provider',
    phoneNumber: 'Phone Number',
    phonePlaceholder: '0712 345 678',
    amount: 'Amount',
    amountPlaceholder: '10,000',
    confirm: 'Confirm',
    cancel: 'Cancel',
    back: 'Back',
    success: 'Success!',
    depositSuccess: 'Money deposited',
    withdrawSuccess: 'Money withdrawn',
    processing: 'Waiting for confirmation',
    instructions: 'Follow instructions',
    depositInstructions: 'You will receive a confirmation message on your phone. Enter your M-Pesa PIN to complete.',
    withdrawInstructions: 'Money will be sent to your phone number directly.',
    safe: 'This is practice - no real money will be moved',
    educational: 'For learning only',
    minAmount: 'Minimum amount is TZS 1,000',
    invalidPhone: 'Invalid phone number',
    insufficientBalance: 'Insufficient balance',
    quickAmounts: 'Quick Amounts',
    continue: 'Continue'
  };

  const providers = [
    { id: 'mpesa' as Provider, name: 'M-Pesa', logo: '📱', color: 'bg-green-50 border-green-200' },
    { id: 'tigopesa' as Provider, name: 'Tigo Pesa', logo: '📲', color: 'bg-blue-50 border-blue-200' },
    { id: 'airtelmoney' as Provider, name: 'Airtel Money', logo: '💳', color: 'bg-red-50 border-red-200' },
  ];

  const quickAmounts = [50000, 100000, 250000, 500000];

  const handleSubmit = async () => {
    if (!provider || !phoneNumber || !amount) {
      toast.error(language === 'sw' ? 'Jaza taarifa zote' : 'Fill all fields');
      return;
    }

    setLoading(true);
    setShowConfirmation(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success(action === 'deposit' ? t.depositSuccess : t.withdrawSuccess);
      setTimeout(() => {
        onBack();
      }, 2000);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-zinc-100 z-10">
        <div className="px-6 py-4 flex items-center">
          <button onClick={onBack} className="flex items-center gap-2 text-zinc-600">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">{t.back}</span>
          </button>
        </div>
      </div>

      <div className="px-6 py-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-light mb-2">{t.title}</h1>
          <p className="text-sm text-zinc-500">{t.subtitle}</p>
        </motion.div>

        {/* Provider Selection */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <p className="text-sm font-medium mb-4">{t.selectProvider}</p>
          <div className="space-y-3">
            {providers.map((p, index) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card
                  className={`p-4 cursor-pointer transition-all ${
                    provider === p.id
                      ? 'border-black bg-zinc-50'
                      : 'border-zinc-200 hover:border-zinc-400'
                  }`}
                  onClick={() => setProvider(p.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{p.logo}</div>
                    <div className="flex-1">
                      <p className="font-medium">{p.name}</p>
                    </div>
                    {provider === p.id && (
                      <CheckCircle className="w-5 h-5 text-black" />
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Amount */}
        {provider && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <p className="text-sm font-medium mb-3">{t.amount}</p>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={t.amountPlaceholder}
              className="h-14 text-lg border-zinc-300 mb-3"
            />
            
            {/* Quick Amount Buttons */}
            <p className="text-xs text-zinc-500 mb-3">{t.quickAmounts}</p>
            <div className="grid grid-cols-4 gap-2">
              {quickAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAmount(amt.toString())}
                  className="px-3 py-2 text-xs border border-zinc-200 rounded-lg hover:border-zinc-400 transition-colors"
                >
                  {(amt / 1000).toFixed(0)}K
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Phone Number */}
        {provider && amount && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <p className="text-sm font-medium mb-3">{t.phoneNumber}</p>
            <Input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder={t.phonePlaceholder}
              className="h-14 text-lg border-zinc-300"
            />
          </motion.div>
        )}

        {/* Submit Button */}
        {provider && amount && phoneNumber && !showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Button
              onClick={handleSubmit}
              className="w-full h-14 bg-black text-white hover:bg-zinc-800 text-base"
            >
              {t.continue}
            </Button>
          </motion.div>
        )}

        {/* Confirmation State */}
        <AnimatePresence>
          {showConfirmation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <Card className="p-8 border-zinc-200 text-center">
                <div className="w-16 h-16 rounded-full bg-black mx-auto mb-4 flex items-center justify-center">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-light mb-2">{t.processing}</h3>
                <p className="text-sm text-zinc-600 mb-6">{t.depositInstructions}</p>
                
                {loading && (
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                  </div>
                )}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}