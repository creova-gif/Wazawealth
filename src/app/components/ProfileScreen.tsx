import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, User, Bell, Shield, HelpCircle, Settings, ChevronRight, LogOut, Globe } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';

interface Props {
  language: 'sw' | 'en';
  onBack: () => void;
  onLogout: () => void;
  onChangeLanguage: (lang: 'sw' | 'en') => void;
}

export function ProfileScreen({ language, onBack, onLogout, onChangeLanguage }: Props) {
  const [notifications, setNotifications] = useState(true);
  const [biometric, setBiometric] = useState(false);

  const content = {
    sw: {
      title: 'Profaili',
      account: 'Akaunti',
      settings: 'Mipangilio',
      help: 'Msaada',
      personalInfo: 'Taarifa Binafsi',
      notifications: 'Arifa',
      notificationsDesc: 'Pata taarifa za maendeleo',
      security: 'Usalama',
      securityDesc: 'Alama za vidole na PIN',
      language: 'Lugha',
      languageDesc: 'Chagua lugha',
      helpCenter: 'Kituo cha Msaada',
      helpDesc: 'Maswali na majibu',
      about: 'Kuhusu Waza',
      aboutDesc: 'Toleo na leseni',
      logout: 'Toka',
      version: 'Toleo 1.0.0',
      regulated: 'Inasimamiwa na CMSA',
      biometric: 'Alama za Vidole',
      biometricDesc: 'Tumia alama za vidole kuingia',
      back: 'Rudi'
    },
    en: {
      title: 'Profile',
      account: 'Account',
      settings: 'Settings',
      help: 'Help',
      personalInfo: 'Personal Information',
      notifications: 'Notifications',
      notificationsDesc: 'Get updates on progress',
      security: 'Security',
      securityDesc: 'Biometric and PIN',
      language: 'Language',
      languageDesc: 'Choose language',
      helpCenter: 'Help Center',
      helpDesc: 'Questions and answers',
      about: 'About Waza',
      aboutDesc: 'Version and licensing',
      logout: 'Log Out',
      version: 'Version 1.0.0',
      regulated: 'Regulated by CMSA',
      biometric: 'Biometric Login',
      biometricDesc: 'Use fingerprint to sign in',
      back: 'Back'
    }
  };

  const t = content[language];

  const accountItems = [
    {
      icon: User,
      title: t.personalInfo,
      description: language === 'sw' ? 'Jina, barua pepe, simu' : 'Name, email, phone',
      action: () => console.log('Personal info')
    },
    {
      icon: Shield,
      title: t.security,
      description: t.securityDesc,
      action: () => console.log('Security')
    },
    {
      icon: Globe,
      title: t.language,
      description: language === 'sw' ? (language === 'sw' ? 'Kiswahili' : 'English') : (language === 'en' ? 'English' : 'Kiswahili'),
      action: () => {
        const newLang = language === 'sw' ? 'en' : 'sw';
        onChangeLanguage(newLang);
      }
    }
  ];

  const helpItems = [
    {
      icon: HelpCircle,
      title: t.helpCenter,
      description: t.helpDesc,
      action: () => console.log('Help center')
    },
    {
      icon: Settings,
      title: t.about,
      description: t.aboutDesc,
      action: () => console.log('About')
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-24">
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
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="p-6 border-zinc-200">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center">
                <span className="text-white text-2xl font-light">W</span>
              </div>
              <div className="flex-1">
                <p className="text-lg font-medium">Waza User</p>
                <p className="text-sm text-zinc-500">user@waza.co.tz</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Account Settings */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-lg font-light mb-4">{t.account}</h2>
          <div className="space-y-3">
            {accountItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card
                  key={index}
                  className="p-4 border-zinc-200 hover:border-zinc-400 transition-all cursor-pointer"
                  onClick={item.action}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-zinc-700" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-zinc-500">{item.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-zinc-400" />
                  </div>
                </Card>
              );
            })}
          </div>
        </motion.div>

        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-lg font-light mb-4">{t.settings}</h2>
          <Card className="divide-y divide-zinc-100 border-zinc-200">
            {/* Notifications */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-zinc-700" />
                </div>
                <div>
                  <p className="text-sm font-medium">{t.notifications}</p>
                  <p className="text-xs text-zinc-500">{t.notificationsDesc}</p>
                </div>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>

            {/* Biometric */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-zinc-700" />
                </div>
                <div>
                  <p className="text-sm font-medium">{t.biometric}</p>
                  <p className="text-xs text-zinc-500">{t.biometricDesc}</p>
                </div>
              </div>
              <Switch
                checked={biometric}
                onCheckedChange={setBiometric}
              />
            </div>
          </Card>
        </motion.div>

        {/* Help */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-lg font-light mb-4">{t.help}</h2>
          <div className="space-y-3">
            {helpItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card
                  key={index}
                  className="p-4 border-zinc-200 hover:border-zinc-400 transition-all cursor-pointer"
                  onClick={item.action}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-zinc-700" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-zinc-500">{item.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-zinc-400" />
                  </div>
                </Card>
              );
            })}
          </div>
        </motion.div>

        {/* Trust Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <Card className="p-4 bg-zinc-50 border-zinc-200">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-zinc-600" />
              <div>
                <p className="text-xs text-zinc-600">{t.regulated}</p>
                <p className="text-xs text-zinc-500">{t.version}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full h-12 border-zinc-300 text-zinc-700 hover:bg-zinc-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            {t.logout}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}