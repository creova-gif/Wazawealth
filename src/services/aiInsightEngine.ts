// WAZA WEALTH — AI Portfolio Intelligence Engine
// Calm, educational, goal-aligned insights

import { Portfolio, Holding, Account, User, Transaction } from '@/types/portfolio';

/**
 * AI Insight Types
 */
export type InsightContext = 'portfolio' | 'asset' | 'behavior' | 'goal' | 'education';
export type InsightPriority = 'low' | 'medium' | 'high';

export interface AIInsight {
  insightId: string;
  context: InsightContext;
  trigger: string;
  priority: InsightPriority;
  title: {
    en: string;
    sw: string;
  };
  message: {
    en: string;
    sw: string;
  };
  actionable?: {
    en: string;
    sw: string;
  };
  dismissible: boolean;
  timestamp: Date;
}

/**
 * AI Insight Trigger Thresholds
 */
const THRESHOLDS = {
  ALLOCATION_DRIFT: 10, // % drift from target
  HIGH_CONCENTRATION: 40, // Single asset > 40%
  IDLE_CASH: 20, // % of portfolio in cash
  VOLATILITY_SPIKE: 30, // % price movement in 24h
  LARGE_LOSS: 15, // % loss threshold
  LARGE_GAIN: 25, // % gain threshold
  OVER_TRADING: 5, // trades per day
  FX_EXPOSURE_INCREASE: 15 // % increase in foreign currency exposure
};

/**
 * AI Insight Engine
 * Rules:
 * - Never say "buy" or "sell"
 * - Never predict prices
 * - Never guarantee returns
 * - Always explain risk calmly
 * - Always connect to user goals
 */
export class AIInsightEngine {
  /**
   * Generate Portfolio Health Check
   */
  generatePortfolioHealthCheck(portfolio: Portfolio, user: User): AIInsight | null {
    const riskScore = portfolio.riskScore;
    const diversificationScore = portfolio.diversificationScore;
    
    // Good health - no insight needed
    if (riskScore < 50 && diversificationScore > 60) {
      return null;
    }
    
    // High concentration risk
    const allHoldings = portfolio.accounts.flatMap(acc => acc.holdings);
    const maxSingleAsset = allHoldings.length > 0 
      ? Math.max(...allHoldings.map(h => h.percentOfTotal))
      : 0;
    
    if (maxSingleAsset > THRESHOLDS.HIGH_CONCENTRATION) {
      return {
        insightId: `insight_${Date.now()}`,
        context: 'portfolio',
        trigger: 'high_concentration',
        priority: 'high',
        title: {
          en: 'Portfolio Concentration',
          sw: 'Mkusanyiko wa Akaunti'
        },
        message: {
          en: `One holding makes up ${maxSingleAsset.toFixed(0)}% of your portfolio. Spreading investments across different assets can help manage risk.`,
          sw: `Uwekezaji mmoja unachukua ${maxSingleAsset.toFixed(0)}% ya akaunti yako. Kusambaza uwekezaji katika mali tofauti kunaweza kusaidia kudhibiti hatari.`
        },
        actionable: {
          en: 'Consider reviewing your allocation',
          sw: 'Fikiria kukagua mgao wako'
        },
        dismissible: true,
        timestamp: new Date()
      };
    }
    
    // Low diversification
    if (diversificationScore < 40) {
      return {
        insightId: `insight_${Date.now()}`,
        context: 'portfolio',
        trigger: 'low_diversification',
        priority: 'medium',
        title: {
          en: 'Diversification Opportunity',
          sw: 'Fursa ya Utofauti'
        },
        message: {
          en: 'Your portfolio has limited variety. Diversifying across different sectors and markets can help balance risk.',
          sw: 'Akaunti yako ina utofauti mdogo. Kusambaza katika sekta na masoko tofauti kunaweza kusaidia kusawazisha hatari.'
        },
        actionable: {
          en: 'Explore different sectors',
          sw: 'Chunguza sekta tofauti'
        },
        dismissible: true,
        timestamp: new Date()
      };
    }
    
    return null;
  }
  
  /**
   * Generate Risk Awareness Insight
   */
  generateRiskAwareness(holding: Holding): AIInsight | null {
    // Crypto holdings always trigger risk awareness
    if (holding.asset.assetClass === 'crypto') {
      return {
        insightId: `insight_${Date.now()}`,
        context: 'asset',
        trigger: 'crypto_volatility',
        priority: 'high',
        title: {
          en: 'High Volatility Asset',
          sw: 'Mali Yenye Mabadiliko Makubwa'
        },
        message: {
          en: `${holding.asset.name} is a highly volatile asset. Prices can move significantly in short periods. Only invest what you can afford to lose.`,
          sw: `${holding.asset.name} ni mali yenye mabadiliko makubwa ya bei. Bei zinaweza kubadilika sana kwa muda mfupi. Wekeza tu pesa unazoweza kupoteza.`
        },
        dismissible: true,
        timestamp: new Date()
      };
    }
    
    // Large price movement (>30% in 24h)
    if (holding.asset.changePercent24h && Math.abs(holding.asset.changePercent24h) > THRESHOLDS.VOLATILITY_SPIKE) {
      return {
        insightId: `insight_${Date.now()}`,
        context: 'asset',
        trigger: 'volatility_spike',
        priority: 'medium',
        title: {
          en: 'Price Movement',
          sw: 'Mabadiliko ya Bei'
        },
        message: {
          en: `${holding.asset.symbol} moved ${Math.abs(holding.asset.changePercent24h).toFixed(1)}% today. Market movements are normal. Stay focused on your long-term goals.`,
          sw: `${holding.asset.symbol} imebadilika ${Math.abs(holding.asset.changePercent24h).toFixed(1)}% leo. Mabadiliko ya soko ni kawaida. Endelea kuzingatia malengo yako ya muda mrefu.`
        },
        dismissible: true,
        timestamp: new Date()
      };
    }
    
    return null;
  }
  
  /**
   * Generate Goal Alignment Insight
   */
  generateGoalAlignment(portfolio: Portfolio, goal: any): AIInsight | null {
    if (!goal) return null;
    
    const currentWealth = portfolio.totalWealthNormalized.amount;
    const targetWealth = goal.targetAmount || 0;
    const progress = targetWealth > 0 ? (currentWealth / targetWealth) * 100 : 0;
    
    // On track (>80% of target)
    if (progress > 80) {
      return {
        insightId: `insight_${Date.now()}`,
        context: 'goal',
        trigger: 'goal_on_track',
        priority: 'low',
        title: {
          en: 'Goal Progress',
          sw: 'Maendeleo ya Lengo'
        },
        message: {
          en: `You're ${progress.toFixed(0)}% of the way to your goal. Keep going—you're doing well.`,
          sw: `Umefika ${progress.toFixed(0)}% ya njia ya lengo lako. Endelea—unafanya vizuri.`
        },
        dismissible: true,
        timestamp: new Date()
      };
    }
    
    // Needs attention (<50% of target)
    if (progress < 50) {
      return {
        insightId: `insight_${Date.now()}`,
        context: 'goal',
        trigger: 'goal_needs_attention',
        priority: 'medium',
        title: {
          en: 'Goal Check',
          sw: 'Ukaguzi wa Lengo'
        },
        message: {
          en: `You're ${progress.toFixed(0)}% toward your goal. Consider adjusting your savings or timeline if needed.`,
          sw: `Uko ${progress.toFixed(0)}% kwenye njia ya lengo lako. Fikiria kurekebisha akiba yako au muda ikiwa inahitajika.`
        },
        actionable: {
          en: 'Review your goal settings',
          sw: 'Kagua mipangilio ya lengo lako'
        },
        dismissible: true,
        timestamp: new Date()
      };
    }
    
    return null;
  }
  
  /**
   * Generate Behavior Insight (Over-trading detection)
   */
  generateBehaviorInsight(
    transactions: Transaction[],
    user: User
  ): AIInsight | null {
    // Count trades in last 24 hours
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    const recentTrades = transactions.filter(
      tx => tx.type === 'buy' || tx.type === 'sell'
    ).filter(
      tx => tx.tradeDate >= oneDayAgo
    );
    
    if (recentTrades.length > THRESHOLDS.OVER_TRADING) {
      return {
        insightId: `insight_${Date.now()}`,
        context: 'behavior',
        trigger: 'over_trading',
        priority: 'medium',
        title: {
          en: 'Trading Activity',
          sw: 'Shughuli za Biashara'
        },
        message: {
          en: "You've made several trades recently. Remember, WAZA is designed for long-term wealth building. Frequent trading can increase costs and stress.",
          sw: 'Umefanya biashara kadhaa hivi karibuni. Kumbuka, WAZA imeundwa kwa ujenzi wa mali wa muda mrefu. Biashara ya mara kwa mara inaweza kuongeza gharama na msongo.'
        },
        dismissible: true,
        timestamp: new Date()
      };
    }
    
    return null;
  }
  
  /**
   * Generate Education Moment
   */
  generateEducationMoment(
    context: 'first_stock' | 'first_dividend' | 'crypto_view' | 'fx_conversion'
  ): AIInsight {
    const educationInsights: Record<typeof context, AIInsight> = {
      first_stock: {
        insightId: `edu_${Date.now()}`,
        context: 'education',
        trigger: 'first_stock',
        priority: 'low',
        title: {
          en: 'Your First Stock',
          sw: 'Hisa Yako ya Kwanza'
        },
        message: {
          en: 'Stocks represent ownership in a company. Their value can go up or down based on company performance and market conditions. Take your time to learn.',
          sw: 'Hisa zinawakilisha umiliki katika kampuni. Thamani yao inaweza kupanda au kushuka kulingana na utendaji wa kampuni na hali ya soko. Chukua muda wako kujifunza.'
        },
        dismissible: true,
        timestamp: new Date()
      },
      first_dividend: {
        insightId: `edu_${Date.now()}`,
        context: 'education',
        trigger: 'first_dividend',
        priority: 'low',
        title: {
          en: 'Dividend Received',
          sw: 'Gawio Limepokelewa'
        },
        message: {
          en: 'Dividends are a share of company profits paid to shareholders. They\'re automatically credited to your account. This is one way investments can generate income.',
          sw: 'Magawio ni sehemu ya faida za kampuni zinazolipwa kwa wenye hisa. Yanawekwa kiiotomatiki kwenye akaunti yako. Hii ni njia moja uwekezaji unavyoweza kuzalisha kipato.'
        },
        dismissible: true,
        timestamp: new Date()
      },
      crypto_view: {
        insightId: `edu_${Date.now()}`,
        context: 'education',
        trigger: 'crypto_view',
        priority: 'medium',
        title: {
          en: 'About Cryptocurrency',
          sw: 'Kuhusu Cryptocurrency'
        },
        message: {
          en: 'Cryptocurrency is a digital asset with high volatility. Prices can change dramatically. Only available in certain countries with advanced verification.',
          sw: 'Cryptocurrency ni mali ya dijiti yenye mabadiliko makubwa. Bei zinaweza kubadilika sana. Inapatikana tu katika nchi fulani na uthibitishaji wa kiwango cha juu.'
        },
        dismissible: true,
        timestamp: new Date()
      },
      fx_conversion: {
        insightId: `edu_${Date.now()}`,
        context: 'education',
        trigger: 'fx_conversion',
        priority: 'low',
        title: {
          en: 'Currency Conversion',
          sw: 'Ubadilishaji wa Sarafu'
        },
        message: {
          en: 'When you invest in foreign assets, your returns are affected by both asset performance and currency exchange rates. We show both separately for transparency.',
          sw: 'Unapowekeza katika mali za kigeni, mapato yako yanaathiriwa na utendaji wa mali na viwango vya ubadilishaji wa sarafu. Tunaonyesha vyote viwili kwa uwazi.'
        },
        dismissible: true,
        timestamp: new Date()
      }
    };
    
    return educationInsights[context];
  }
  
  /**
   * Generate Idle Cash Insight
   */
  generateIdleCashInsight(account: Account): AIInsight | null {
    const cashPercent = (account.cashBalance.amount / account.totalBalance.amount) * 100;
    
    if (cashPercent > THRESHOLDS.IDLE_CASH) {
      return {
        insightId: `insight_${Date.now()}`,
        context: 'portfolio',
        trigger: 'idle_cash',
        priority: 'low',
        title: {
          en: 'Cash Balance',
          sw: 'Salio la Pesa Taslimu'
        },
        message: {
          en: `${cashPercent.toFixed(0)}% of your account is in cash. Consider investing it to help your money grow over time.`,
          sw: `${cashPercent.toFixed(0)}% ya akaunti yako ni pesa taslimu. Fikiria kuiwekeza ili kusaidia pesa yako kukua kwa muda.`
        },
        actionable: {
          en: 'Explore investment options',
          sw: 'Chunguza chaguzi za uwekezaji'
        },
        dismissible: true,
        timestamp: new Date()
      };
    }
    
    return null;
  }
  
  /**
   * Batch generate insights for user
   * Returns prioritized list
   */
  async generateAllInsights(
    portfolio: Portfolio,
    user: User,
    transactions: Transaction[],
    goal?: any
  ): Promise<AIInsight[]> {
    const insights: AIInsight[] = [];
    
    // Portfolio health
    const healthInsight = this.generatePortfolioHealthCheck(portfolio, user);
    if (healthInsight) insights.push(healthInsight);
    
    // Goal alignment
    if (goal) {
      const goalInsight = this.generateGoalAlignment(portfolio, goal);
      if (goalInsight) insights.push(goalInsight);
    }
    
    // Check each holding for risk
    for (const account of portfolio.accounts) {
      for (const holding of account.holdings) {
        const riskInsight = this.generateRiskAwareness(holding);
        if (riskInsight) insights.push(riskInsight);
      }
      
      // Idle cash check
      const cashInsight = this.generateIdleCashInsight(account);
      if (cashInsight) insights.push(cashInsight);
    }
    
    // Behavior patterns
    const behaviorInsight = this.generateBehaviorInsight(transactions, user);
    if (behaviorInsight) insights.push(behaviorInsight);
    
    // Sort by priority
    return insights.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }
}