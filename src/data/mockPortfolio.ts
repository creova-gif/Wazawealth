// WAZA WEALTH — Mock Portfolio Data
// Realistic East African portfolio for testing

import { Portfolio, Account, Holding, Asset, Transaction, Money } from '@/types/portfolio';

// Sample assets
export const mockAssets: Asset[] = [
  // DSE Stocks (Tanzania)
  {
    assetId: 'dse-crdb',
    symbol: 'CRDB',
    name: 'CRDB Bank',
    assetClass: 'stock',
    exchange: 'DSE',
    currency: 'TZS',
    currentPrice: 450,
    change24h: 12,
    changePercent24h: 2.7,
    riskLevel: 'moderate',
    dividendYield: 6.2,
    regulatoryFlags: {
      availableInTZ: true,
      availableInKE: false,
      requiresAdvancedKYC: false,
      riskDisclosureRequired: false
    }
  },
  {
    assetId: 'dse-nic',
    symbol: 'NIC',
    name: 'NIC Tanzania',
    assetClass: 'stock',
    exchange: 'DSE',
    currency: 'TZS',
    currentPrice: 280,
    change24h: -3,
    changePercent24h: -1.1,
    riskLevel: 'moderate',
    dividendYield: 5.8,
    regulatoryFlags: {
      availableInTZ: true,
      availableInKE: false,
      requiresAdvancedKYC: false,
      riskDisclosureRequired: false
    }
  },
  {
    assetId: 'dse-tbl',
    symbol: 'TBL',
    name: 'Tanzania Breweries',
    assetClass: 'stock',
    exchange: 'DSE',
    currency: 'TZS',
    currentPrice: 5200,
    change24h: 100,
    changePercent24h: 2.0,
    riskLevel: 'moderate',
    dividendYield: 4.5,
    regulatoryFlags: {
      availableInTZ: true,
      availableInKE: false,
      requiresAdvancedKYC: false,
      riskDisclosureRequired: false
    }
  },
  
  // NSE Stocks (Kenya)
  {
    assetId: 'nse-safaricom',
    symbol: 'SCOM',
    name: 'Safaricom',
    assetClass: 'stock',
    exchange: 'NSE',
    currency: 'KES',
    currentPrice: 38,
    change24h: 0.5,
    changePercent24h: 1.3,
    riskLevel: 'low',
    dividendYield: 7.1,
    regulatoryFlags: {
      availableInTZ: false,
      availableInKE: true,
      requiresAdvancedKYC: false,
      riskDisclosureRequired: false
    }
  },
  {
    assetId: 'nse-equity',
    symbol: 'EQTY',
    name: 'Equity Bank',
    assetClass: 'stock',
    exchange: 'NSE',
    currency: 'KES',
    currentPrice: 52,
    change24h: -1,
    changePercent24h: -1.9,
    riskLevel: 'moderate',
    dividendYield: 8.5,
    regulatoryFlags: {
      availableInTZ: false,
      availableInKE: true,
      requiresAdvancedKYC: false,
      riskDisclosureRequired: false
    }
  },
  
  // Crypto (requires advanced KYC)
  {
    assetId: 'crypto-btc',
    symbol: 'BTC',
    name: 'Bitcoin',
    assetClass: 'crypto',
    exchange: 'CRYPTO',
    currency: 'USD',
    currentPrice: 43250,
    change24h: -820,
    changePercent24h: -1.9,
    riskLevel: 'very_high',
    regulatoryFlags: {
      availableInTZ: false, // Not available in TZ
      availableInKE: true, // Available in KE with restrictions
      requiresAdvancedKYC: true,
      riskDisclosureRequired: true
    }
  },
  {
    assetId: 'crypto-eth',
    symbol: 'ETH',
    name: 'Ethereum',
    assetClass: 'crypto',
    exchange: 'CRYPTO',
    currency: 'USD',
    currentPrice: 2280,
    change24h: -45,
    changePercent24h: -1.9,
    riskLevel: 'very_high',
    regulatoryFlags: {
      availableInTZ: false,
      availableInKE: true,
      requiresAdvancedKYC: true,
      riskDisclosureRequired: true
    }
  }
];

// Sample holdings for TZS account
export const mockHoldingsTZS: Holding[] = [
  {
    holdingId: 'h1',
    accountId: 'acc-tzs-1',
    assetId: 'dse-crdb',
    asset: mockAssets[0],
    quantity: 450,
    bookCost: { amount: 190000, currency: 'TZS' },
    averagePurchasePrice: { amount: 422, currency: 'TZS' },
    currentMarketValue: { amount: 202500, currency: 'TZS' },
    currentPrice: { amount: 450, currency: 'TZS' },
    unrealizedPL: { amount: 12500, currency: 'TZS' },
    unrealizedPLPercent: 6.6,
    percentOfTotal: 4.2,
    percentOfAccount: 14.3,
    goalAlignment: ['retirement'],
    lastUpdated: new Date()
  },
  {
    holdingId: 'h2',
    accountId: 'acc-tzs-1',
    assetId: 'dse-nic',
    asset: mockAssets[1],
    quantity: 800,
    bookCost: { amount: 228000, currency: 'TZS' },
    averagePurchasePrice: { amount: 285, currency: 'TZS' },
    currentMarketValue: { amount: 224000, currency: 'TZS' },
    currentPrice: { amount: 280, currency: 'TZS' },
    unrealizedPL: { amount: -4000, currency: 'TZS' },
    unrealizedPLPercent: -1.8,
    percentOfTotal: 3.8,
    percentOfAccount: 15.8,
    goalAlignment: ['growth'],
    lastUpdated: new Date()
  },
  {
    holdingId: 'h3',
    accountId: 'acc-tzs-1',
    assetId: 'dse-tbl',
    asset: mockAssets[2],
    quantity: 150,
    bookCost: { amount: 765000, currency: 'TZS' },
    averagePurchasePrice: { amount: 5100, currency: 'TZS' },
    currentMarketValue: { amount: 780000, currency: 'TZS' },
    currentPrice: { amount: 5200, currency: 'TZS' },
    unrealizedPL: { amount: 15000, currency: 'TZS' },
    unrealizedPLPercent: 2.0,
    percentOfTotal: 13.2,
    percentOfAccount: 55.1,
    goalAlignment: ['income'],
    lastUpdated: new Date()
  }
];

// Sample holdings for KES account
export const mockHoldingsKES: Holding[] = [
  {
    holdingId: 'h4',
    accountId: 'acc-kes-1',
    assetId: 'nse-safaricom',
    asset: mockAssets[3],
    quantity: 1200,
    bookCost: { amount: 44400, currency: 'KES' },
    averagePurchasePrice: { amount: 37, currency: 'KES' },
    currentMarketValue: { amount: 45600, currency: 'KES' },
    currentPrice: { amount: 38, currency: 'KES' },
    unrealizedPL: { amount: 1200, currency: 'KES' },
    unrealizedPLPercent: 2.7,
    percentOfTotal: 1.8,
    percentOfAccount: 72.4,
    goalAlignment: ['income'],
    lastUpdated: new Date()
  },
  {
    holdingId: 'h5',
    accountId: 'acc-kes-1',
    assetId: 'nse-equity',
    asset: mockAssets[4],
    quantity: 350,
    bookCost: { amount: 18550, currency: 'KES' },
    averagePurchasePrice: { amount: 53, currency: 'KES' },
    currentMarketValue: { amount: 18200, currency: 'KES' },
    currentPrice: { amount: 52, currency: 'KES' },
    unrealizedPL: { amount: -350, currency: 'KES' },
    unrealizedPLPercent: -1.9,
    percentOfTotal: 0.7,
    percentOfAccount: 27.6,
    goalAlignment: ['growth'],
    lastUpdated: new Date()
  }
];

// Sample TZS account
export const mockAccountTZS: Account = {
  accountId: 'acc-tzs-1',
  userId: 'user-1',
  currency: 'TZS',
  accountType: 'stocks',
  cashBalance: { amount: 250000, currency: 'TZS' },
  investedBalance: { amount: 1206500, currency: 'TZS' },
  totalBalance: { amount: 1456500, currency: 'TZS' },
  totalDeposited: { amount: 1500000, currency: 'TZS' },
  totalWithdrawn: { amount: 0, currency: 'TZS' },
  netContributions: { amount: 1500000, currency: 'TZS' },
  totalReturn: { amount: 23500, currency: 'TZS' },
  totalReturnPercent: 1.62,
  holdings: mockHoldingsTZS,
  status: 'active',
  kycRequired: 'basic',
  createdAt: new Date('2024-01-15')
};

// Sample KES account
export const mockAccountKES: Account = {
  accountId: 'acc-kes-1',
  userId: 'user-1',
  currency: 'KES',
  accountType: 'stocks',
  cashBalance: { amount: 5000, currency: 'KES' },
  investedBalance: { amount: 63800, currency: 'KES' },
  totalBalance: { amount: 68800, currency: 'KES' },
  totalDeposited: { amount: 70000, currency: 'KES' },
  totalWithdrawn: { amount: 0, currency: 'KES' },
  netContributions: { amount: 70000, currency: 'KES' },
  totalReturn: { amount: 850, currency: 'KES' },
  totalReturnPercent: 1.23,
  holdings: mockHoldingsKES,
  status: 'active',
  kycRequired: 'basic',
  createdAt: new Date('2024-03-10')
};

// Sample transactions
export const mockTransactions: Transaction[] = [
  {
    transactionId: 'tx-001',
    userId: 'user-1',
    accountId: 'acc-tzs-1',
    type: 'buy',
    assetId: 'dse-crdb',
    assetSymbol: 'CRDB',
    assetClass: 'stock',
    quantity: 150,
    price: { amount: 420, currency: 'TZS' },
    amount: { amount: 63000, currency: 'TZS' },
    brokerageFee: { amount: 945, currency: 'TZS' },
    exchangeFee: { amount: 126, currency: 'TZS' },
    regulatoryFee: { amount: 32, currency: 'TZS' },
    totalFees: { amount: 1103, currency: 'TZS' },
    tradeDate: new Date('2024-09-15'),
    settlementDate: new Date('2024-09-18'),
    status: 'settled',
    orderId: 'ord-001',
    goalId: 'goal-retirement',
    createdAt: new Date('2024-09-15')
  },
  {
    transactionId: 'tx-002',
    userId: 'user-1',
    accountId: 'acc-tzs-1',
    type: 'dividend',
    assetId: 'dse-crdb',
    assetSymbol: 'CRDB',
    assetClass: 'stock',
    amount: { amount: 12600, currency: 'TZS' },
    totalFees: { amount: 0, currency: 'TZS' },
    taxWithheld: { amount: 1260, currency: 'TZS' },
    taxType: 'dividend_withholding',
    tradeDate: new Date('2024-10-15'),
    settlementDate: new Date('2024-10-15'),
    status: 'settled',
    notes: 'Quarterly dividend payment',
    createdAt: new Date('2024-10-15')
  },
  {
    transactionId: 'tx-003',
    userId: 'user-1',
    accountId: 'acc-tzs-1',
    type: 'deposit',
    amount: { amount: 50000, currency: 'TZS' },
    totalFees: { amount: 0, currency: 'TZS' },
    tradeDate: new Date('2024-10-10'),
    settlementDate: new Date('2024-10-10'),
    status: 'settled',
    notes: 'M-Pesa deposit',
    createdAt: new Date('2024-10-10')
  }
];

// Complete mock portfolio
export const mockPortfolio: Portfolio = {
  userId: 'user-1',
  accounts: [mockAccountTZS, mockAccountKES],
  primaryCurrency: 'TZS',
  totalWealthNormalized: { amount: 1525300, currency: 'TZS' }, // Includes KES converted
  totalReturnNormalized: { amount: 24350, currency: 'TZS' },
  totalReturnPercentNormalized: 1.62,
  allocationByAssetClass: [
    { assetClass: 'stock', value: { amount: 1270300, currency: 'TZS' }, percent: 83.3 },
    { assetClass: 'cash', value: { amount: 255000, currency: 'TZS' }, percent: 16.7 }
  ],
  allocationByCurrency: [
    { currency: 'TZS', value: { amount: 1456500, currency: 'TZS' }, percent: 95.5 },
    { currency: 'KES', value: { amount: 68800, currency: 'KES' }, percent: 4.5 }
  ],
  riskScore: 35, // Moderate
  diversificationScore: 62, // Good
  cryptoExposurePercent: 0,
  lastUpdated: new Date()
};

// FX rates (for multi-currency conversion)
export const mockFXRates: Record<string, number> = {
  'TZS_KES': 0.057, // 1 TZS = 0.057 KES
  'KES_TZS': 17.54, // 1 KES = 17.54 TZS
  'TZS_USD': 0.00043, // 1 TZS = 0.00043 USD
  'USD_TZS': 2315, // 1 USD = 2315 TZS
  'KES_USD': 0.0076, // 1 KES = 0.0076 USD
  'USD_KES': 132 // 1 USD = 132 KES
};
