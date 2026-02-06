// WAZA WEALTH — System Integrations Demo
// Shows market adapters, payments, AI, compliance working together

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle, AlertCircle, Zap, Shield } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { AIInsightEngine } from '@/services/aiInsightEngine';
import { ComplianceService, KYC_TIERS } from '@/services/complianceService';
import { mockPortfolio, mockTransactions } from '@/data/mockPortfolio';

interface Props {
  language: 'sw' | 'en';
  onBack: () => void;
}

export function SystemIntegrationsDemo({ language, onBack }: Props) {
  const [aiInsights, setAIInsights] = useState<any[]>([]);
  const [complianceStatus, setComplianceStatus] = useState<any>(null);
  
  const content = {
    sw: {
      systemIntegrations: 'Muunganisho wa Mfumo',
      activeServices: 'Huduma Zinazofanya Kazi',
      marketAdapters: 'Adapta za Soko',
      paymentRails: 'Njia za Malipo',
      aiIntelligence: 'Akili ya AI',
      compliance: 'Utii',
      dseConnected: 'DSE (Tanzania) - Imeunganishwa',
      nseConnected: 'NSE (Kenya) - Imeunganishwa',
      mpesaActive: 'M-Pesa - Inatumika',
      airtelActive: 'Airtel Money - Inatumika',
      tigoActive: 'Tigo Pesa - Inatumika',
      insightsGenerated: 'Maarifa Yaliyozalishwa',
      kycTier: 'Kiwango cha KYC',
      features: 'Vipengele',
      limits: 'Vikomo',
      viewInsights: 'Angalia Maarifa',
      generateInsights: 'Zalisha Maarifa',
      checkCompliance: 'Kagua Utii',
      systemStatus: 'Hali ya Mfumo',
      allSystemsOperational: 'Mifumo yote inafanya kazi',
      integrationArchitecture: 'Muundo wa Muunganisho'
    },
    en: {
      systemIntegrations: 'System Integrations',
      activeServices: 'Active Services',
      marketAdapters: 'Market Adapters',
      paymentRails: 'Payment Rails',
      aiIntelligence: 'AI Intelligence',
      compliance: 'Compliance',
      dseConnected: 'DSE (Tanzania) - Connected',
      nseConnected: 'NSE (Kenya) - Connected',
      mpesaActive: 'M-Pesa - Active',
      airtelActive: 'Airtel Money - Active',
      tigoActive: 'Tigo Pesa - Active',
      insightsGenerated: 'Insights Generated',
      kycTier: 'KYC Tier',
      features: 'Features',
      limits: 'Limits',
      viewInsights: 'View Insights',
      generateInsights: 'Generate Insights',
      checkCompliance: 'Check Compliance',
      systemStatus: 'System Status',
      allSystemsOperational: 'All systems operational',
      integrationArchitecture: 'Integration Architecture'
    }
  };
  
  const t = content[language];
  
  // Initialize services
  const aiEngine = new AIInsightEngine();
  const complianceService = new ComplianceService('Smile ID');
  
  const handleGenerateInsights = async () => {
    const mockUser = {
      userId: 'user-1',
      email: 'user@example.com',
      phoneNumber: '+255123456789',
      country: 'TZ' as const,
      language: language,
      kycLevel: 'basic' as const,
      kycStatus: 'approved' as const,
      riskTolerance: 'moderate' as const,
      investmentExperience: 'beginner' as const,
      riskDisclosuresAcknowledged: [],
      primaryCurrency: 'TZS' as const,
      notificationPreferences: {},
      createdAt: new Date()
    };
    
    const insights = await aiEngine.generateAllInsights(
      mockPortfolio,
      mockUser,
      mockTransactions
    );
    
    setAIInsights(insights);
  };
  
  const handleCheckCompliance = () => {
    const basicTier = KYC_TIERS.basic;
    setComplianceStatus(basicTier);
  };
  
  useEffect(() => {
    handleGenerateInsights();
    handleCheckCompliance();
  }, []);
  
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
            <h1 className="text-xl font-light">{t.systemIntegrations}</h1>
            <p className="text-xs text-zinc-500">{t.integrationArchitecture}</p>
          </div>
        </div>
      </div>
      
      {/* System Status Banner */}
      <div className="px-6 pt-6">
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <p className="font-medium text-green-900">{t.systemStatus}</p>
              <p className="text-sm text-green-700">{t.allSystemsOperational}</p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Market Adapters */}
      <div className="px-6 py-6">
        <h2 className="text-lg font-light mb-4">{t.marketAdapters}</h2>
        <div className="space-y-3">
          <Card className="p-4 border-zinc-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-lg">🇹🇿</span>
                </div>
                <div>
                  <p className="font-medium">{t.dseConnected}</p>
                  <p className="text-xs text-zinc-500">T+2 settlement, Market/Limit orders</p>
                </div>
              </div>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </Card>
          
          <Card className="p-4 border-zinc-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-lg">🇰🇪</span>
                </div>
                <div>
                  <p className="font-medium">{t.nseConnected}</p>
                  <p className="text-xs text-zinc-500">T+3 settlement, Market/Limit/Stop orders</p>
                </div>
              </div>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </Card>
        </div>
      </div>
      
      {/* Payment Rails */}
      <div className="px-6 py-4">
        <h2 className="text-lg font-light mb-4">{t.paymentRails}</h2>
        <div className="space-y-2">
          {[
            { name: t.mpesaActive, color: 'bg-green-100' },
            { name: t.airtelActive, color: 'bg-red-100' },
            { name: t.tigoActive, color: 'bg-blue-100' }
          ].map((provider, idx) => (
            <Card key={idx} className="p-3 border-zinc-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${provider.color.replace('100', '500')}`} />
                  <p className="text-sm">{provider.name}</p>
                </div>
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      {/* AI Intelligence */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-light">{t.aiIntelligence}</h2>
          <Button
            size="sm"
            onClick={handleGenerateInsights}
            className="h-8 bg-blue-600 text-white hover:bg-blue-700"
          >
            <Zap className="w-3 h-3 mr-1" />
            {t.generateInsights}
          </Button>
        </div>
        
        {aiInsights.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm text-zinc-500">
              {t.insightsGenerated}: {aiInsights.length}
            </p>
            {aiInsights.slice(0, 3).map((insight, idx) => (
              <Card key={idx} className="p-4 border-zinc-200 bg-blue-50">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900 mb-1">
                      {insight.title[language]}
                    </p>
                    <p className="text-sm text-blue-800 leading-relaxed">
                      {insight.message[language]}
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-xs">
                      <span className={`px-2 py-0.5 rounded ${
                        insight.priority === 'high' ? 'bg-red-200 text-red-800' :
                        insight.priority === 'medium' ? 'bg-amber-200 text-amber-800' :
                        'bg-blue-200 text-blue-800'
                      }`}>
                        {insight.priority}
                      </span>
                      <span className="text-zinc-500">{insight.context}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      {/* Compliance */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-light">{t.compliance}</h2>
          <Button
            size="sm"
            onClick={handleCheckCompliance}
            className="h-8 bg-purple-600 text-white hover:bg-purple-700"
          >
            <Shield className="w-3 h-3 mr-1" />
            {t.checkCompliance}
          </Button>
        </div>
        
        {complianceStatus && (
          <Card className="p-5 border-zinc-200">
            <div className="mb-4">
              <p className="text-sm text-zinc-500 mb-1">{t.kycTier}</p>
              <p className="text-2xl font-light">{complianceStatus.level}</p>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-zinc-500 mb-2">{t.features}</p>
              <div className="space-y-1">
                {complianceStatus.features.slice(0, 3).map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-sm text-zinc-500 mb-2">{t.limits}</p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-zinc-600">Daily Deposit</p>
                  <p className="font-medium">TZS {(complianceStatus.limits.dailyDeposit / 1000000).toFixed(1)}M</p>
                </div>
                <div>
                  <p className="text-zinc-600">Daily Withdrawal</p>
                  <p className="font-medium">TZS {(complianceStatus.limits.dailyWithdrawal / 1000000).toFixed(1)}M</p>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
      
      {/* Integration Architecture Info */}
      <div className="px-6 py-4">
        <Card className="p-5 bg-zinc-50 border-zinc-200">
          <h3 className="font-medium mb-3">
            {language === 'sw' ? 'Muundo wa Kiufundi' : 'Technical Architecture'}
          </h3>
          <div className="space-y-2 text-sm text-zinc-700">
            <p>
              {language === 'sw'
                ? '✓ Adapta za Soko - DSE, NSE, Global, Crypto'
                : '✓ Market Adapters - DSE, NSE, Global, Crypto'}
            </p>
            <p>
              {language === 'sw'
                ? '✓ Injini ya FX - Ubadilishaji wa sarafu zenye uwazi'
                : '✓ FX Engine - Transparent currency conversion'}
            </p>
            <p>
              {language === 'sw'
                ? '✓ AI ya Akaunti - Maarifa ya muda halisi'
                : '✓ Portfolio AI - Real-time insights'}
            </p>
            <p>
              {language === 'sw'
                ? '✓ KYC ya Ngazi - Basic → Advanced → Institutional'
                : '✓ Tiered KYC - Basic → Advanced → Institutional'}
            </p>
            <p>
              {language === 'sw'
                ? '✓ Ufuatiliaji wa AML - Usalama wa kiutii'
                : '✓ AML Monitoring - Regulatory safety'}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
