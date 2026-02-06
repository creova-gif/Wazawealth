// WAZA WEALTH — Portfolio Calculation Engine
// FIFO accounting, P/L tracking, FX-aware

import { Money, Holding, Transaction, Portfolio, Account, Currency } from '@/types/portfolio';

/**
 * Calculate unrealized P/L for a holding
 */
export function calculateUnrealizedPL(holding: Holding): {
  plAmount: Money;
  plPercent: number;
} {
  const currentValue = holding.currentMarketValue.amount;
  const bookCost = holding.bookCost.amount;
  const plAmount = currentValue - bookCost;
  const plPercent = bookCost > 0 ? (plAmount / bookCost) * 100 : 0;
  
  return {
    plAmount: { amount: plAmount, currency: holding.bookCost.currency },
    plPercent
  };
}

/**
 * Calculate book cost using FIFO (First In First Out)
 */
export function calculateBookCostFIFO(
  buyTransactions: Transaction[],
  quantityOwned: number
): Money {
  // Sort by date (oldest first)
  const sorted = [...buyTransactions].sort(
    (a, b) => a.tradeDate.getTime() - b.tradeDate.getTime()
  );
  
  let remainingQty = quantityOwned;
  let totalCost = 0;
  let currency: Currency = 'TZS';
  
  for (const tx of sorted) {
    if (remainingQty <= 0) break;
    
    const qtyFromThisTx = Math.min(remainingQty, tx.quantity || 0);
    const costFromThisTx = qtyFromThisTx * (tx.price?.amount || 0);
    
    totalCost += costFromThisTx;
    remainingQty -= qtyFromThisTx;
    currency = tx.amount.currency;
  }
  
  return { amount: totalCost, currency };
}

/**
 * Calculate average purchase price
 */
export function calculateAveragePurchasePrice(
  buyTransactions: Transaction[]
): Money {
  const totalCost = buyTransactions.reduce(
    (sum, tx) => sum + tx.amount.amount,
    0
  );
  const totalQuantity = buyTransactions.reduce(
    (sum, tx) => sum + (tx.quantity || 0),
    0
  );
  
  const avgPrice = totalQuantity > 0 ? totalCost / totalQuantity : 0;
  const currency = buyTransactions[0]?.amount.currency || 'TZS';
  
  return { amount: avgPrice, currency };
}

/**
 * Calculate portfolio allocation percentages
 */
export function calculateAllocation(
  holdings: Holding[],
  totalValue: number
): Holding[] {
  return holdings.map(holding => ({
    ...holding,
    percentOfTotal: totalValue > 0 
      ? (holding.currentMarketValue.amount / totalValue) * 100 
      : 0
  }));
}

/**
 * Convert amount between currencies using current FX rate
 */
export function convertCurrency(
  amount: Money,
  toCurrency: Currency,
  fxRates: Record<string, number>
): Money {
  if (amount.currency === toCurrency) {
    return amount;
  }
  
  const rateKey = `${amount.currency}_${toCurrency}`;
  const rate = fxRates[rateKey] || 1;
  
  return {
    amount: amount.amount * rate,
    currency: toCurrency
  };
}

/**
 * Normalize all holdings to a single currency for consolidated view
 */
export function normalizePortfolio(
  accounts: Account[],
  primaryCurrency: Currency,
  fxRates: Record<string, number>
): Money {
  let totalNormalized = 0;
  
  for (const account of accounts) {
    const accountTotal = account.totalBalance.amount;
    const converted = convertCurrency(
      { amount: accountTotal, currency: account.currency },
      primaryCurrency,
      fxRates
    );
    totalNormalized += converted.amount;
  }
  
  return { amount: totalNormalized, currency: primaryCurrency };
}

/**
 * Calculate portfolio risk score (0-100)
 * Based on asset allocation, concentration, and volatility
 */
export function calculateRiskScore(portfolio: Portfolio): number {
  let riskScore = 0;
  
  // Factor 1: Crypto exposure (crypto = high risk)
  const cryptoPercent = portfolio.cryptoExposurePercent || 0;
  riskScore += cryptoPercent * 0.8; // Crypto contributes heavily to risk
  
  // Factor 2: Single asset concentration
  const allHoldings = portfolio.accounts.flatMap(acc => acc.holdings);
  if (allHoldings.length > 0) {
    const maxSingleAsset = Math.max(...allHoldings.map(h => h.percentOfTotal));
    if (maxSingleAsset > 40) {
      riskScore += 20; // High concentration = higher risk
    }
  }
  
  // Factor 3: Stock allocation (vs bonds/cash)
  const stockAllocation = portfolio.allocationByAssetClass.find(
    a => a.assetClass === 'stock'
  );
  const stockPercent = stockAllocation?.percent || 0;
  riskScore += stockPercent * 0.3; // Stocks add moderate risk
  
  return Math.min(100, Math.max(0, riskScore));
}

/**
 * Calculate diversification score (0-100)
 * Higher = better diversified
 */
export function calculateDiversificationScore(portfolio: Portfolio): number {
  const allHoldings = portfolio.accounts.flatMap(acc => acc.holdings);
  
  if (allHoldings.length === 0) return 0;
  
  let score = 0;
  
  // Factor 1: Number of holdings (more = better, up to a point)
  const holdingsCount = allHoldings.length;
  score += Math.min(30, holdingsCount * 3);
  
  // Factor 2: Asset class diversity
  const assetClasses = new Set(allHoldings.map(h => h.asset.assetClass));
  score += assetClasses.size * 15; // 15 points per asset class
  
  // Factor 3: No single asset >40%
  const maxSingleAsset = Math.max(...allHoldings.map(h => h.percentOfTotal));
  if (maxSingleAsset < 40) {
    score += 20;
  } else if (maxSingleAsset < 50) {
    score += 10;
  }
  
  // Factor 4: Exchange diversity (DSE + NSE + GLOBAL)
  const exchanges = new Set(allHoldings.map(h => h.asset.exchange));
  score += exchanges.size * 10;
  
  return Math.min(100, score);
}

/**
 * Format money for display
 */
export function formatMoney(money: Money, compact: boolean = false): string {
  const { amount, currency } = money;
  
  if (compact && Math.abs(amount) >= 1_000_000) {
    const millions = amount / 1_000_000;
    return `${currency} ${millions.toFixed(1)}M`;
  }
  
  if (compact && Math.abs(amount) >= 1_000) {
    const thousands = amount / 1_000;
    return `${currency} ${thousands.toFixed(1)}K`;
  }
  
  return `${currency} ${amount.toLocaleString('en-US', { 
    minimumFractionDigits: 0,
    maximumFractionDigits: 2 
  })}`;
}

/**
 * Format percentage
 */
export function formatPercent(value: number, includePlus: boolean = true): string {
  const sign = value >= 0 ? (includePlus ? '+' : '') : '';
  return `${sign}${value.toFixed(2)}%`;
}

/**
 * Calculate dividend yield
 */
export function calculateDividendYield(
  holding: Holding,
  dividends12Months: Transaction[]
): number {
  const totalDividends = dividends12Months.reduce(
    (sum, div) => sum + div.amount.amount,
    0
  );
  
  const currentValue = holding.currentMarketValue.amount;
  
  return currentValue > 0 ? (totalDividends / currentValue) * 100 : 0;
}
