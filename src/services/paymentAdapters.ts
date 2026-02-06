// WAZA WEALTH — Payment Adapters
// Mobile Money (M-Pesa, Airtel, Tigo) + FX Engine

import { Currency, Money, FXConversion } from '@/types/portfolio';

/**
 * Mobile Money Provider Types
 */
export type MobileMoneyProvider = 'MPESA_TZ' | 'MPESA_KE' | 'AIRTEL' | 'TIGO';

export interface MobileMoneyDeposit {
  provider: MobileMoneyProvider;
  phoneNumber: string;
  amount: Money;
  userId: string;
}

export interface MobileMoneyWithdrawal {
  provider: MobileMoneyProvider;
  phoneNumber: string;
  amount: Money;
  userId: string;
  requiresAMLReview: boolean;
}

/**
 * Base Payment Adapter
 */
interface PaymentAdapter {
  provider: MobileMoneyProvider;
  currency: Currency;
  
  initiateDeposit(deposit: MobileMoneyDeposit): Promise<{ transactionId: string; status: string }>;
  initiateWithdrawal(withdrawal: MobileMoneyWithdrawal): Promise<{ transactionId: string; status: string }>;
  checkTransactionStatus(transactionId: string): Promise<'pending' | 'completed' | 'failed'>;
}

/**
 * 🇹🇿 M-Pesa Tanzania Adapter
 * Integration via Vodacom API
 */
export class MPesaTanzaniaAdapter implements PaymentAdapter {
  provider: MobileMoneyProvider = 'MPESA_TZ';
  currency: Currency = 'TZS';
  
  private apiUrl: string;
  private apiKey: string;
  
  constructor(apiUrl: string, apiKey: string) {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
  }
  
  async initiateDeposit(deposit: MobileMoneyDeposit): Promise<{ transactionId: string; status: string }> {
    // Real implementation: POST to Vodacom M-Pesa API
    console.log('M-Pesa TZ Deposit:', deposit);
    
    // Simulated response
    return {
      transactionId: `MPESA_TZ_${Date.now()}`,
      status: 'pending' // User needs to enter PIN on phone
    };
  }
  
  async initiateWithdrawal(withdrawal: MobileMoneyWithdrawal): Promise<{ transactionId: string; status: string }> {
    // Withdrawals require manual AML review for amounts > threshold
    if (withdrawal.requiresAMLReview) {
      return {
        transactionId: `MPESA_TZ_W_${Date.now()}`,
        status: 'pending_review'
      };
    }
    
    console.log('M-Pesa TZ Withdrawal:', withdrawal);
    
    return {
      transactionId: `MPESA_TZ_W_${Date.now()}`,
      status: 'pending'
    };
  }
  
  async checkTransactionStatus(transactionId: string): Promise<'pending' | 'completed' | 'failed'> {
    // GET transaction status from M-Pesa
    return 'completed';
  }
}

/**
 * 🇰🇪 M-Pesa Kenya Adapter
 * Integration via Safaricom STK Push
 */
export class MPesaKenyaAdapter implements PaymentAdapter {
  provider: MobileMoneyProvider = 'MPESA_KE';
  currency: Currency = 'KES';
  
  private apiUrl: string;
  private apiKey: string;
  
  constructor(apiUrl: string, apiKey: string) {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
  }
  
  async initiateDeposit(deposit: MobileMoneyDeposit): Promise<{ transactionId: string; status: string }> {
    console.log('M-Pesa KE Deposit:', deposit);
    
    return {
      transactionId: `MPESA_KE_${Date.now()}`,
      status: 'pending'
    };
  }
  
  async initiateWithdrawal(withdrawal: MobileMoneyWithdrawal): Promise<{ transactionId: string; status: string }> {
    console.log('M-Pesa KE Withdrawal:', withdrawal);
    
    return {
      transactionId: `MPESA_KE_W_${Date.now()}`,
      status: 'pending'
    };
  }
  
  async checkTransactionStatus(transactionId: string): Promise<'pending' | 'completed' | 'failed'> {
    return 'completed';
  }
}

/**
 * Airtel Money Adapter (TZ + KE)
 */
export class AirtelMoneyAdapter implements PaymentAdapter {
  provider: MobileMoneyProvider = 'AIRTEL';
  currency: Currency;
  
  constructor(currency: Currency) {
    this.currency = currency;
  }
  
  async initiateDeposit(deposit: MobileMoneyDeposit): Promise<{ transactionId: string; status: string }> {
    return { transactionId: `AIRTEL_${Date.now()}`, status: 'pending' };
  }
  
  async initiateWithdrawal(withdrawal: MobileMoneyWithdrawal): Promise<{ transactionId: string; status: string }> {
    return { transactionId: `AIRTEL_W_${Date.now()}`, status: 'pending' };
  }
  
  async checkTransactionStatus(transactionId: string): Promise<'pending' | 'completed' | 'failed'> {
    return 'completed';
  }
}

/**
 * Tigo Pesa Adapter (Tanzania)
 */
export class TigoPesaAdapter implements PaymentAdapter {
  provider: MobileMoneyProvider = 'TIGO';
  currency: Currency = 'TZS';
  
  async initiateDeposit(deposit: MobileMoneyDeposit): Promise<{ transactionId: string; status: string }> {
    return { transactionId: `TIGO_${Date.now()}`, status: 'pending' };
  }
  
  async initiateWithdrawal(withdrawal: MobileMoneyWithdrawal): Promise<{ transactionId: string; status: string }> {
    return { transactionId: `TIGO_W_${Date.now()}`, status: 'pending' };
  }
  
  async checkTransactionStatus(transactionId: string): Promise<'pending' | 'completed' | 'failed'> {
    return 'completed';
  }
}

/**
 * FX Engine - Currency conversion with transparent rates
 * CRITICAL: Must track FX separately from performance
 */
export class FXEngine {
  private fxProvider: string;
  private markup: number; // Our markup on FX (e.g., 0.5%)
  
  constructor(fxProvider: string, markup: number = 0.005) {
    this.fxProvider = fxProvider;
    this.markup = markup;
  }
  
  /**
   * Get current FX rate
   */
  async getRate(from: Currency, to: Currency): Promise<number> {
    if (from === to) return 1;
    
    // Real implementation: Call FX data provider (e.g., XE, OANDA)
    // GET /api/v1/rates?from={from}&to={to}
    
    // Mock rates (approximate as of Jan 2026)
    const rates: Record<string, number> = {
      'TZS_KES': 0.057,
      'KES_TZS': 17.54,
      'TZS_USD': 0.00043,
      'USD_TZS': 2315,
      'KES_USD': 0.0076,
      'USD_KES': 132
    };
    
    const rateKey = `${from}_${to}`;
    const baseRate = rates[rateKey] || 1;
    
    // Apply our markup
    return baseRate * (1 - this.markup);
  }
  
  /**
   * Convert amount with full transparency
   */
  async convert(
    amount: number,
    from: Currency,
    to: Currency,
    reason: 'deposit' | 'withdrawal' | 'trade' | 'transfer'
  ): Promise<FXConversion> {
    const rate = await this.getRate(from, to);
    const convertedAmount = amount * rate;
    const fxFee = convertedAmount * this.markup;
    
    return {
      conversionId: `FX_${Date.now()}`,
      fromCurrency: from,
      toCurrency: to,
      fromAmount: { amount, currency: from },
      toAmount: { amount: convertedAmount, currency: to },
      fxRate: rate,
      fxFee: { amount: fxFee, currency: to },
      provider: this.fxProvider,
      timestamp: new Date(),
      reason
    };
  }
  
  /**
   * Calculate FX impact on portfolio
   * Shows how much of gain/loss is from FX vs asset performance
   */
  calculateFXImpact(
    originalAmount: Money,
    currentAmount: Money,
    historicalRate: number,
    currentRate: number
  ): Money {
    const fxImpact = originalAmount.amount * (currentRate - historicalRate);
    
    return {
      amount: fxImpact,
      currency: currentAmount.currency
    };
  }
}

/**
 * Payment Registry - Manages all payment providers
 */
export class PaymentRegistry {
  private adapters: Map<MobileMoneyProvider, PaymentAdapter> = new Map();
  private fxEngine: FXEngine;
  
  constructor(fxEngine: FXEngine) {
    this.fxEngine = fxEngine;
  }
  
  registerAdapter(adapter: PaymentAdapter) {
    this.adapters.set(adapter.provider, adapter);
  }
  
  getAdapter(provider: MobileMoneyProvider): PaymentAdapter | undefined {
    return this.adapters.get(provider);
  }
  
  async deposit(deposit: MobileMoneyDeposit): Promise<{ transactionId: string; status: string }> {
    const adapter = this.adapters.get(deposit.provider);
    
    if (!adapter) {
      throw new Error(`No adapter found for provider: ${deposit.provider}`);
    }
    
    return adapter.initiateDeposit(deposit);
  }
  
  async withdraw(withdrawal: MobileMoneyWithdrawal): Promise<{ transactionId: string; status: string }> {
    const adapter = this.adapters.get(withdrawal.provider);
    
    if (!adapter) {
      throw new Error(`No adapter found for provider: ${withdrawal.provider}`);
    }
    
    // AML check: Flag for review if amount > threshold
    const amlThreshold = withdrawal.amount.currency === 'TZS' ? 5000000 : 200000; // TZS 5M or KES 200K
    
    if (withdrawal.amount.amount > amlThreshold) {
      withdrawal.requiresAMLReview = true;
    }
    
    return adapter.initiateWithdrawal(withdrawal);
  }
  
  getFXEngine(): FXEngine {
    return this.fxEngine;
  }
}

/**
 * Initialize payment system
 */
export function initializePayments(): PaymentRegistry {
  const fxEngine = new FXEngine('XE.com', 0.005); // 0.5% markup
  const registry = new PaymentRegistry(fxEngine);
  
  // Register M-Pesa Tanzania
  const mpesaTZ = new MPesaTanzaniaAdapter(
    process.env.MPESA_TZ_API_URL || '',
    process.env.MPESA_TZ_API_KEY || ''
  );
  registry.registerAdapter(mpesaTZ);
  
  // Register M-Pesa Kenya
  const mpesaKE = new MPesaKenyaAdapter(
    process.env.MPESA_KE_API_URL || '',
    process.env.MPESA_KE_API_KEY || ''
  );
  registry.registerAdapter(mpesaKE);
  
  // Register Airtel Money
  const airtelTZ = new AirtelMoneyAdapter('TZS');
  registry.registerAdapter(airtelTZ);
  
  // Register Tigo Pesa
  const tigo = new TigoPesaAdapter();
  registry.registerAdapter(tigo);
  
  return registry;
}
