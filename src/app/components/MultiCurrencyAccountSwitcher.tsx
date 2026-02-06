// WAZA WEALTH — Multi-Currency Account Switcher
// Switch between TZS, KES, USD accounts

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, TrendingUp, TrendingDown, X } from 'lucide-react';
import { Card } from './ui/card';
import { Account, Currency } from '@/types/portfolio';
import { formatMoney, formatPercent } from '@/utils/portfolioCalculations';

interface Props {
  accounts: Account[];
  selectedCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  language: 'sw' | 'en';
}

export function MultiCurrencyAccountSwitcher({
  accounts,
  selectedCurrency,
  onCurrencyChange,
  language
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const content = {
    sw: {
      switchAccount: 'Badilisha Akaunti',
      viewAll: 'Angalia Zote',
      cash: 'Pesa Taslimu',
      invested: 'Imewekeza',
      total: 'Jumla'
    },
    en: {
      switchAccount: 'Switch Account',
      viewAll: 'View All',
      cash: 'Cash',
      invested: 'Invested',
      total: 'Total'
    }
  };

  const t = content[language];
  const selectedAccount = accounts.find(acc => acc.currency === selectedCurrency);
  const otherAccounts = accounts.filter(acc => acc.currency !== selectedCurrency);

  const getCurrencyFlag = (currency: Currency) => {
    switch (currency) {
      case 'TZS': return '🇹🇿';
      case 'KES': return '🇰🇪';
      case 'USD': return '🇺🇸';
      default: return '';
    }
  };

  const getCurrencyName = (currency: Currency) => {
    switch (currency) {
      case 'TZS': return language === 'sw' ? 'Akaunti ya TZS' : 'TZS Account';
      case 'KES': return language === 'sw' ? 'Akaunti ya KES' : 'KES Account';
      case 'USD': return language === 'sw' ? 'Akaunti ya USD' : 'USD Account';
      default: return '';
    }
  };

  if (!selectedAccount) return null;

  return (
    <div className="relative">
      {/* Current Account Card (Clickable) */}
      <motion.div
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer"
      >
        <Card className="p-6 border-zinc-200 hover:border-zinc-300 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{getCurrencyFlag(selectedAccount.currency)}</span>
              <div>
                <p className="text-xs text-zinc-500">{getCurrencyName(selectedAccount.currency)}</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-light">
                    {formatMoney(selectedAccount.totalBalance, true)}
                  </h3>
                  <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`} />
                </div>
              </div>
            </div>
            <div className={`flex items-center gap-1 ${
              selectedAccount.totalReturnPercent >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {selectedAccount.totalReturnPercent >= 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">
                {formatPercent(selectedAccount.totalReturnPercent)}
              </span>
            </div>
          </div>

          {/* Balance breakdown */}
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div>
              <p className="text-zinc-500 mb-0.5">{t.cash}</p>
              <p className="font-medium">{formatMoney(selectedAccount.cashBalance, true)}</p>
            </div>
            <div>
              <p className="text-zinc-500 mb-0.5">{t.invested}</p>
              <p className="font-medium">{formatMoney(selectedAccount.investedBalance, true)}</p>
            </div>
            <div className="text-right">
              <p className="text-zinc-500 mb-0.5">{t.total}</p>
              <p className="font-medium">{formatMoney(selectedAccount.totalBalance, true)}</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Account Selection Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 z-50"
            >
              <Card className="p-4 border-zinc-200 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium">{t.switchAccount}</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-zinc-200"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>

                <div className="space-y-2">
                  {otherAccounts.map(account => (
                    <motion.button
                      key={account.accountId}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        onCurrencyChange(account.currency);
                        setIsOpen(false);
                      }}
                      className="w-full p-4 rounded-xl bg-zinc-50 hover:bg-zinc-100 transition-colors text-left"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{getCurrencyFlag(account.currency)}</span>
                          <div>
                            <p className="text-xs text-zinc-500">{getCurrencyName(account.currency)}</p>
                            <p className="text-base font-medium">
                              {formatMoney(account.totalBalance, true)}
                            </p>
                          </div>
                        </div>
                        <div className={`text-xs font-medium ${
                          account.totalReturnPercent >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {formatPercent(account.totalReturnPercent)}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* View All Accounts Option */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    // Navigate to multi-currency overview
                  }}
                  className="w-full mt-3 py-2 text-sm text-zinc-600 hover:text-black transition-colors"
                >
                  {t.viewAll} →
                </button>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
