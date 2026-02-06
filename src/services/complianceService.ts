// WAZA WEALTH — Compliance & KYC Service
// Tiered KYC, AML monitoring, regulatory compliance

import { KYCLevel, User, Transaction } from '@/types/portfolio';

/**
 * KYC Tier Configuration
 */
export interface KYCTierConfig {
  level: KYCLevel;
  requirements: string[];
  features: string[];
  limits: {
    dailyDeposit: number; // in primary currency
    dailyWithdrawal: number;
    monthlyVolume: number;
  };
}

export const KYC_TIERS: Record<KYCLevel, KYCTierConfig> = {
  none: {
    level: 'none',
    requirements: [],
    features: [
      'View markets',
      'Education content',
      'Simulator mode'
    ],
    limits: {
      dailyDeposit: 0,
      dailyWithdrawal: 0,
      monthlyVolume: 0
    }
  },
  basic: {
    level: 'basic',
    requirements: [
      'National ID (NIDA/Kenya ID)',
      'Selfie + liveness check',
      'Phone verification',
      'Address (light verification)'
    ],
    features: [
      'DSE stocks (Tanzania)',
      'NSE stocks (Kenya)',
      'Local currency accounts (TZS/KES)',
      'Mobile money deposits/withdrawals',
      'Dividend collection'
    ],
    limits: {
      dailyDeposit: 5000000, // TZS 5M or KES equivalent
      dailyWithdrawal: 2000000, // TZS 2M
      monthlyVolume: 50000000 // TZS 50M
    }
  },
  advanced: {
    level: 'advanced',
    requirements: [
      'All Basic requirements',
      'Proof of address (utility bill/bank statement)',
      'Source of funds declaration',
      'Enhanced due diligence',
      'Sanctions screening'
    ],
    features: [
      'All Basic features',
      'USD investment account',
      'Global ETFs & stocks',
      'Crypto trading (where available)',
      'Multi-currency accounts',
      'Higher transaction limits'
    ],
    limits: {
      dailyDeposit: 50000000, // TZS 50M
      dailyWithdrawal: 20000000, // TZS 20M
      monthlyVolume: 500000000 // TZS 500M
    }
  },
  institutional: {
    level: 'institutional',
    requirements: [
      'All Advanced requirements',
      'Company registration documents',
      'Board resolutions',
      'Ultimate beneficial ownership (UBO)',
      'Annual audited financials'
    ],
    features: [
      'All Advanced features',
      'API access',
      'Bulk trading',
      'Dedicated support',
      'Custom reporting'
    ],
    limits: {
      dailyDeposit: 1000000000, // TZS 1B
      dailyWithdrawal: 500000000,
      monthlyVolume: 10000000000
    }
  }
};

/**
 * KYC Status
 */
export type KYCStatus = 'pending' | 'under_review' | 'approved' | 'requires_action' | 'rejected';

export interface KYCSubmission {
  submissionId: string;
  userId: string;
  targetLevel: KYCLevel;
  documents: {
    idDocument?: string; // File URL
    addressProof?: string;
    selfiePhoto?: string;
    sourceOfFunds?: string;
  };
  status: KYCStatus;
  submittedAt: Date;
  reviewedAt?: Date;
  rejectionReason?: string;
}

/**
 * AML Transaction Monitoring
 */
export interface AMLFlag {
  flagId: string;
  transactionId: string;
  userId: string;
  reason: 'large_amount' | 'unusual_pattern' | 'high_velocity' | 'sanctions_match';
  severity: 'low' | 'medium' | 'high';
  requiresManualReview: boolean;
  timestamp: Date;
}

/**
 * Compliance Service
 */
export class ComplianceService {
  private kycProvider: string; // e.g., "Smile ID", "Jumio"
  
  constructor(kycProvider: string) {
    this.kycProvider = kycProvider;
  }
  
  /**
   * Get KYC requirements for a tier
   */
  getRequirements(level: KYCLevel): string[] {
    return KYC_TIERS[level].requirements;
  }
  
  /**
   * Get features unlocked at a tier
   */
  getFeatures(level: KYCLevel): string[] {
    return KYC_TIERS[level].features;
  }
  
  /**
   * Get transaction limits for a tier
   */
  getLimits(level: KYCLevel) {
    return KYC_TIERS[level].limits;
  }
  
  /**
   * Check if user can perform action based on KYC level
   */
  canPerformAction(
    user: User,
    action: 'buy_dse' | 'buy_nse' | 'buy_global' | 'buy_crypto' | 'withdraw'
  ): { allowed: boolean; reason?: string } {
    const userLevel = user.kycLevel;
    
    // Map actions to required KYC level
    const actionRequirements: Record<typeof action, KYCLevel> = {
      buy_dse: 'basic',
      buy_nse: 'basic',
      buy_global: 'advanced',
      buy_crypto: 'advanced',
      withdraw: 'basic'
    };
    
    const requiredLevel = actionRequirements[action];
    const tierOrder: KYCLevel[] = ['none', 'basic', 'advanced', 'institutional'];
    
    const userTierIndex = tierOrder.indexOf(userLevel);
    const requiredTierIndex = tierOrder.indexOf(requiredLevel);
    
    if (userTierIndex >= requiredTierIndex) {
      return { allowed: true };
    } else {
      return {
        allowed: false,
        reason: `This action requires ${requiredLevel} KYC level. You are currently at ${userLevel}.`
      };
    }
  }
  
  /**
   * Submit KYC upgrade request
   */
  async submitKYCUpgrade(
    userId: string,
    targetLevel: KYCLevel,
    documents: KYCSubmission['documents']
  ): Promise<KYCSubmission> {
    // Real implementation: Call KYC provider API (Smile ID, Jumio, etc.)
    // POST /api/v1/kyc/submit
    
    const submission: KYCSubmission = {
      submissionId: `KYC_${Date.now()}`,
      userId,
      targetLevel,
      documents,
      status: 'under_review',
      submittedAt: new Date()
    };
    
    console.log('KYC submission:', submission);
    
    // Simulate async review
    // In production, webhook callback when review completes
    
    return submission;
  }
  
  /**
   * Check KYC submission status
   */
  async checkKYCStatus(submissionId: string): Promise<KYCStatus> {
    // GET /api/v1/kyc/status/{submissionId}
    return 'approved';
  }
  
  /**
   * AML Transaction Monitoring
   * Flags suspicious transactions for manual review
   */
  monitorTransaction(transaction: Transaction, user: User): AMLFlag | null {
    const flags: AMLFlag[] = [];
    
    // Flag 1: Large single transaction
    const limits = this.getLimits(user.kycLevel);
    if (transaction.amount.amount > limits.dailyDeposit) {
      flags.push({
        flagId: `AML_${Date.now()}_1`,
        transactionId: transaction.transactionId,
        userId: user.userId,
        reason: 'large_amount',
        severity: 'medium',
        requiresManualReview: true,
        timestamp: new Date()
      });
    }
    
    // Flag 2: High velocity (checked elsewhere, based on transaction history)
    // Flag 3: Sanctions screening (integrate with OFAC, UN lists)
    
    return flags.length > 0 ? flags[0] : null;
  }
  
  /**
   * Country-specific restrictions
   */
  isFeatureAvailableInCountry(
    feature: 'crypto' | 'global_etfs' | 'usd_account',
    country: 'TZ' | 'KE'
  ): boolean {
    const restrictions: Record<typeof feature, { TZ: boolean; KE: boolean }> = {
      crypto: { TZ: false, KE: true }, // Crypto blocked in TZ
      global_etfs: { TZ: true, KE: true },
      usd_account: { TZ: true, KE: true }
    };
    
    return restrictions[feature][country];
  }
  
  /**
   * Risk disclosure tracking
   */
  hasAcceptedRiskDisclosure(
    user: User,
    disclosureType: 'crypto_risk' | 'equity_risk' | 'fx_risk'
  ): boolean {
    return user.riskDisclosuresAcknowledged?.includes(disclosureType) || false;
  }
  
  /**
   * Record risk disclosure acceptance
   */
  async recordRiskDisclosure(
    userId: string,
    disclosureType: string
  ): Promise<boolean> {
    // POST /api/v1/compliance/disclosure
    console.log(`User ${userId} accepted ${disclosureType}`);
    return true;
  }
  
  /**
   * Sanctions screening (mock)
   * Real implementation: Check against OFAC, UN, EU lists
   */
  async screenForSanctions(
    name: string,
    dateOfBirth: Date,
    nationality: string
  ): Promise<{ clear: boolean; matches?: any[] }> {
    // Call sanctions screening API
    // This is MANDATORY for regulated financial services
    
    return { clear: true };
  }
  
  /**
   * Generate compliance report for regulators
   */
  async generateComplianceReport(
    startDate: Date,
    endDate: Date
  ): Promise<{
    totalUsers: number;
    kycBreakdown: Record<KYCLevel, number>;
    transactionVolume: number;
    amlFlagsRaised: number;
    amlFlagsResolved: number;
  }> {
    // For regulatory reporting (CMSA, CMA)
    return {
      totalUsers: 1250,
      kycBreakdown: {
        none: 150,
        basic: 900,
        advanced: 190,
        institutional: 10
      },
      transactionVolume: 5500000000, // TZS
      amlFlagsRaised: 15,
      amlFlagsResolved: 12
    };
  }
}

/**
 * Initialize compliance service
 */
export function initializeCompliance(): ComplianceService {
  // Smile ID is recommended for Tanzania + Kenya
  return new ComplianceService('Smile ID');
}
