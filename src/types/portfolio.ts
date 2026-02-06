// WAZA WEALTH — Core Portfolio Types
// Multi-asset, multi-currency, regulation-aware

export type Currency = 'TZS' | 'KES' | 'USD';
export type AssetClass = 'stock' | 'etf' | 'crypto' | 'bond' | 'cash';
export type Exchange = 'DSE' | 'NSE' | 'GLOBAL' | 'CRYPTO';
export type KYCLevel = 'none' | 'basic' | 'advanced' | 'institutional';
export type RiskLevel = 'low' | 'moderate' | 'high' | 'very_high';
export type AccountType = 'stocks' | 'investment' | 'crypto';

// Money type for precise financial calculations
export interface Money {
  amount: number;
  currency: Currency;
}

// Asset definition
export interface Asset {
  assetId: string;
  symbol: string;
  name: string;
  assetClass: AssetClass;
  exchange: Exchange;
  currency: Currency;
  currentPrice: number;
  change24h?: number;
  changePercent24h?: number;
  riskLevel: RiskLevel;
  dividendYield?: number;
  regulatoryFlags?: {
    availableInTZ: boolean;
    availableInKE: boolean;
    requiresAdvancedKYC: boolean;
    riskDisclosureRequired: boolean;
  };
}

// User holding with full P/L tracking
export interface Holding {
  holdingId: string;
  accountId: string;
  assetId: string;
  asset: Asset; // Denormalized for convenience
  
  // Quantity
  quantity: number;
  fractionalQuantity?: number;
  
  // Cost basis
  bookCost: Money; // Total acquisition cost
  averagePurchasePrice: Money; // Per unit
  
  // Current value
  currentMarketValue: Money;
  currentPrice: Money; // Per unit
  
  // P/L
  unrealizedPL: Money;
  unrealizedPLPercent: number;
  realizedPL?: Money; // From closed positions
  
  // Allocation
  percentOfTotal: number; // % of entire portfolio
  percentOfAccount: number; // % of this currency account
  percentOfAssetClass?: number; // % of stocks/ETFs/crypto
  
  // FX impact (if multi-currency)
  fxImpact?: Money;
  
  // Metadata
  goalAlignment?: string[]; // ['retirement', 'growth']
  tags?: string[];
  lastUpdated: Date;
}

// Account (TZS, KES, USD separate buckets)
export interface Account {
  accountId: string;
  userId: string;
  currency: Currency;
  accountType: AccountType;
  
  // Balances
  cashBalance: Money;
  investedBalance: Money; // Market value of holdings
  totalBalance: Money; // Cash + invested
  
  // Performance
  totalDeposited: Money;
  totalWithdrawn: Money;
  netContributions: Money; // Deposited - withdrawn
  totalReturn: Money; // All-time gains/losses
  totalReturnPercent: number;
  
  // Holdings
  holdings: Holding[];
  
  // Status
  status: 'active' | 'pending_kyc' | 'restricted';
  kycRequired: KYCLevel;
  
  createdAt: Date;
}

// Multi-currency portfolio (consolidated view)
export interface Portfolio {
  userId: string;
  accounts: Account[];
  
  // Primary currency for normalization
  primaryCurrency: Currency;
  
  // Consolidated totals (normalized to primary currency)
  totalWealthNormalized: Money;
  totalReturnNormalized: Money;
  totalReturnPercentNormalized: number;
  
  // Asset allocation
  allocationByAssetClass: {
    assetClass: AssetClass;
    value: Money;
    percent: number;
  }[];
  
  allocationByCurrency: {
    currency: Currency;
    value: Money;
    percent: number;
  }[];
  
  // Risk metrics
  riskScore: number; // 0-100
  diversificationScore: number; // 0-100
  cryptoExposurePercent: number;
  
  // FX summary
  totalFXGainLoss?: Money;
  
  lastUpdated: Date;
}

// Transaction types
export type TransactionType = 
  | 'buy' 
  | 'sell' 
  | 'dividend' 
  | 'deposit' 
  | 'withdrawal' 
  | 'fee' 
  | 'fx_conversion'
  | 'transfer';

export interface Transaction {
  transactionId: string;
  userId: string;
  accountId: string;
  
  type: TransactionType;
  
  // Asset details (if applicable)
  assetId?: string;
  assetSymbol?: string;
  assetClass?: AssetClass;
  
  // Transaction details
  quantity?: number;
  price?: Money; // Per-unit price
  amount: Money; // Total amount
  
  // Fees
  brokerageFee?: Money;
  exchangeFee?: Money;
  regulatoryFee?: Money;
  fxFee?: Money;
  totalFees: Money;
  
  // Settlement
  tradeDate: Date;
  settlementDate: Date;
  status: 'pending' | 'executed' | 'settled' | 'failed' | 'cancelled';
  
  // FX details (if cross-currency)
  fxRate?: number;
  fromCurrency?: Currency;
  toCurrency?: Currency;
  
  // P/L (for sells)
  bookCost?: Money;
  realizedPL?: Money;
  realizedPLPercent?: number;
  
  // Tax
  taxWithheld?: Money;
  taxType?: 'dividend_withholding' | 'capital_gains';
  
  // Metadata
  orderId?: string;
  goalId?: string;
  notes?: string;
  
  createdAt: Date;
}

// Order types
export type OrderType = 
  | 'market' 
  | 'limit' 
  | 'stop_loss' 
  | 'take_profit' 
  | 'scheduled' 
  | 'conditional';

export type OrderSide = 'buy' | 'sell';
export type TimeInForce = 'day' | 'gtc' | 'ioc' | 'fok';
export type OrderStatus = 'pending' | 'open' | 'partially_filled' | 'filled' | 'cancelled' | 'rejected' | 'expired';

export interface Order {
  orderId: string;
  userId: string;
  accountId: string;
  
  // Asset
  assetId: string;
  assetSymbol: string;
  assetClass: AssetClass;
  exchange: Exchange;
  
  // Order details
  side: OrderSide;
  orderType: OrderType;
  quantity: number;
  fractional: boolean;
  
  // Pricing
  limitPrice?: Money;
  stopPrice?: Money;
  
  // Time-in-force
  timeInForce: TimeInForce;
  expiresAt?: Date;
  
  // Scheduled orders
  schedule?: {
    frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly';
    startDate: Date;
    endDate?: Date;
    nextExecutionDate: Date;
  };
  
  // Conditional orders
  conditions?: {
    triggerType: 'price_above' | 'price_below' | 'date_time';
    triggerValue: any;
    triggered: boolean;
  };
  
  // Execution
  status: OrderStatus;
  filledQuantity: number;
  averageFillPrice?: Money;
  
  // Cost estimate
  estimatedCost: Money;
  estimatedFees: Money;
  totalEstimated: Money;
  
  // Goal alignment
  goalId?: string;
  
  // Metadata
  placedAt: Date;
  lastUpdatedAt: Date;
  cancelledAt?: Date;
  cancellationReason?: string;
}

// User profile with KYC
export interface User {
  userId: string;
  email: string;
  phoneNumber: string;
  country: 'TZ' | 'KE';
  language: 'sw' | 'en';
  
  // KYC
  kycLevel: KYCLevel;
  kycStatus: 'pending' | 'approved' | 'requires_action' | 'rejected';
  
  // Risk profile
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  investmentExperience: 'beginner' | 'intermediate' | 'advanced';
  
  // Compliance
  riskDisclosuresAcknowledged: string[]; // ['crypto_risk', 'equity_risk']
  
  // Settings
  primaryCurrency: Currency;
  notificationPreferences: any;
  
  createdAt: Date;
}

// FX conversion record
export interface FXConversion {
  conversionId: string;
  fromCurrency: Currency;
  toCurrency: Currency;
  fromAmount: Money;
  toAmount: Money;
  fxRate: number;
  fxFee: Money;
  provider: string;
  timestamp: Date;
  reason: 'deposit' | 'withdrawal' | 'trade' | 'transfer';
}
