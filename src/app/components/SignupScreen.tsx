import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface SignupScreenProps {
  language: 'sw' | 'en';
  onSignupComplete: (user: any, accessToken: string) => void;
}

export function SignupScreen({ language, onSignupComplete }: SignupScreenProps) {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    nationalId: '',
    phoneNumber: '',
    mobileMoneyProvider: 'mpesa'
  });

  const t = language === 'sw' ? {
    title: isLogin ? 'Ingia' : 'Jisajili',
    subtitle: isLogin ? 'Karibu tena' : 'Anza safari yako',
    name: 'Jina Kamili',
    email: 'Barua Pepe',
    password: 'Nywila',
    nationalId: 'Namba ya Kitambulisho',
    phone: 'Namba ya Simu',
    mobileMoney: 'Huduma ya Pesa',
    submit: isLogin ? 'Ingia' : 'Fungua Akaunti',
    toggle: isLogin ? 'Huna akaunti?' : 'Una akaunti?',
    toggleCta: isLogin ? 'Jisajili' : 'Ingia',
    loading: 'Inasubiri...',
    providers: {
      mpesa: 'M-Pesa',
      tigopesa: 'Tigo Pesa',
      airtel: 'Airtel Money',
      halopesa: 'Halo Pesa'
    }
  } : {
    title: isLogin ? 'Sign In' : 'Sign Up',
    subtitle: isLogin ? 'Welcome back' : 'Start your journey',
    name: 'Full Name',
    email: 'Email Address',
    password: 'Password',
    nationalId: 'National ID',
    phone: 'Phone Number',
    mobileMoney: 'Mobile Money',
    submit: isLogin ? 'Sign In' : 'Create Account',
    toggle: isLogin ? "Don't have an account?" : 'Have an account?',
    toggleCta: isLogin ? 'Sign up' : 'Sign in',
    loading: 'Loading...',
    providers: {
      mpesa: 'M-Pesa',
      tigopesa: 'Tigo Pesa',
      airtel: 'Airtel Money',
      halopesa: 'Halo Pesa'
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { projectId, publicAnonKey } = await import('@/utils/supabase/info');
      const apiUrl = `https://${projectId}.supabase.co/functions/v1/make-server-f0a5cca3`;
      
      if (isLogin) {
        // Sign in with Supabase
        const { getSupabaseClient } = await import('@/utils/supabase/client');
        const supabase = getSupabaseClient();
        
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (signInError) {
          setError(signInError.message);
          setLoading(false);
          return;
        }

        onSignupComplete(data.user, data.session.access_token);
      } else {
        // Sign up
        const response = await fetch(`${apiUrl}/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            ...formData,
            language
          })
        });

        const result = await response.json();
        
        if (!response.ok) {
          setError(result.error || 'Failed to create account');
          setLoading(false);
          return;
        }

        // Auto sign in after signup
        const { getSupabaseClient } = await import('@/utils/supabase/client');
        const supabase = getSupabaseClient();
        
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (signInError) {
          setError(signInError.message);
          setLoading(false);
          return;
        }

        onSignupComplete(data.user, data.session.access_token);
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError(language === 'sw' ? 'Kuna tatizo. Jaribu tena.' : 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <motion.div 
        className="max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Header - Large, bold, minimal */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold text-black mb-4 tracking-tight">
              {t.title}
            </h1>
            <p className="text-base text-gray-500">
              {t.subtitle}
            </p>
          </motion.div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Label htmlFor="name" className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-2 block">
                  {t.name}
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required={!isLogin}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-black focus:ring-0 transition-colors text-base"
                  placeholder="John Doe"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
              >
                <Label htmlFor="nationalId" className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-2 block">
                  {t.nationalId}
                </Label>
                <Input
                  id="nationalId"
                  type="text"
                  value={formData.nationalId}
                  onChange={(e) => setFormData({...formData, nationalId: e.target.value})}
                  required={!isLogin}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-black focus:ring-0 transition-colors text-base"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Label htmlFor="phone" className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-2 block">
                  {t.phone}
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+255..."
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                  required={!isLogin}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-black focus:ring-0 transition-colors text-base"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
              >
                <Label htmlFor="mobileMoney" className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-2 block">
                  {t.mobileMoney}
                </Label>
                <select
                  id="mobileMoney"
                  value={formData.mobileMoneyProvider}
                  onChange={(e) => setFormData({...formData, mobileMoneyProvider: e.target.value})}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-black focus:ring-0 transition-colors text-base bg-white"
                >
                  <option value="mpesa">{t.providers.mpesa}</option>
                  <option value="tigopesa">{t.providers.tigopesa}</option>
                  <option value="airtelmoney">{t.providers.airtel}</option>
                  <option value="halopesa">{t.providers.halopesa}</option>
                </select>
              </motion.div>
            </>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isLogin ? 0.3 : 0.5, duration: 0.5 }}
          >
            <Label htmlFor="email" className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-2 block">
              {t.email}
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-black focus:ring-0 transition-colors text-base"
              placeholder="you@example.com"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isLogin ? 0.35 : 0.55, duration: 0.5 }}
          >
            <Label htmlFor="password" className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-2 block">
              {t.password}
            </Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-black focus:ring-0 transition-colors text-base"
              placeholder="••••••••"
            />
          </motion.div>

          {error && (
            <motion.div 
              className="bg-gray-50 border-2 border-gray-200 text-gray-900 px-4 py-4 rounded-2xl text-sm"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isLogin ? 0.4 : 0.6, duration: 0.5 }}
            className="pt-4"
          >
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-black hover:bg-gray-900 text-white py-7 text-base font-medium rounded-full border-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mx-auto"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                t.submit
              )}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: isLogin ? 0.5 : 0.7, duration: 0.5 }}
            className="text-center pt-4"
          >
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-sm text-gray-500 hover:text-black font-medium transition-colors"
            >
              {t.toggle}{' '}
              <span className="text-black font-semibold underline">{t.toggleCta}</span>
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}