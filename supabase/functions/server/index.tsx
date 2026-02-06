import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "npm:@supabase/supabase-js@2";

const app = new Hono();

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-f0a5cca3/health", (c) => {
  return c.json({ status: "ok" });
});

// ===== AUTHENTICATION ROUTES =====

// Sign up new user
app.post("/make-server-f0a5cca3/signup", async (c) => {
  try {
    const { email, password, name, nationalId, phoneNumber, language } = await c.req.json();
    
    // Create user in Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, nationalId, phoneNumber, language },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log(`Signup error for ${email}: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    // Initialize user profile in KV store
    await kv.set(`user:${data.user.id}:profile`, {
      id: data.user.id,
      email,
      name,
      nationalId,
      phoneNumber,
      language: language || 'sw',
      createdAt: new Date().toISOString(),
      badges: [],
      tutorialProgress: 0,
      level: 1
    });

    // Initialize paper trading account
    await kv.set(`user:${data.user.id}:account`, {
      balance: 10000000, // 10M TZS starting balance
      portfolioValue: 0,
      totalValue: 10000000,
      positions: [],
      transactions: []
    });

    return c.json({ success: true, user: data.user });
  } catch (error) {
    console.log(`Signup error during user creation: ${error}`);
    return c.json({ error: 'Failed to create user' }, 500);
  }
});

// ===== RISK ASSESSMENT & AI PORTFOLIO =====

app.post("/make-server-f0a5cca3/risk-assessment", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { age, investmentGoal, riskTolerance, experience } = await c.req.json();
    
    // AI-powered risk assessment (simulated)
    const riskProfile = generateRiskProfile(age, riskTolerance, experience);
    const portfolioSuggestions = generatePortfolioSuggestions(riskProfile, investmentGoal);
    
    // Save risk profile
    await kv.set(`user:${user.id}:risk-profile`, {
      age,
      investmentGoal,
      riskTolerance,
      experience,
      riskProfile,
      assessedAt: new Date().toISOString()
    });

    return c.json({
      riskProfile,
      portfolioSuggestions
    });
  } catch (error) {
    console.log(`Risk assessment error: ${error}`);
    return c.json({ error: 'Failed to assess risk' }, 500);
  }
});

// ===== MARKET DATA =====

app.get("/make-server-f0a5cca3/stocks", async (c) => {
  try {
    // Mock DSE stock data (in production, fetch from real DSE API)
    const stocks = getMockDSEStocks();
    return c.json({ stocks });
  } catch (error) {
    console.log(`Error fetching stocks: ${error}`);
    return c.json({ error: 'Failed to fetch stocks' }, 500);
  }
});

app.get("/make-server-f0a5cca3/stock/:symbol", async (c) => {
  try {
    const symbol = c.req.param('symbol');
    const stock = getMockStockDetail(symbol);
    
    if (!stock) {
      return c.json({ error: 'Stock not found' }, 404);
    }
    
    return c.json({ stock });
  } catch (error) {
    console.log(`Error fetching stock detail: ${error}`);
    return c.json({ error: 'Failed to fetch stock' }, 500);
  }
});

// ===== PAPER TRADING =====

app.post("/make-server-f0a5cca3/trade", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { action, symbol, shares, price } = await c.req.json();
    
    // Get current account
    const account = await kv.get(`user:${user.id}:account`);
    
    if (!account) {
      return c.json({ error: 'Account not found' }, 404);
    }

    const totalCost = shares * price;
    
    if (action === 'buy') {
      if (account.balance < totalCost) {
        return c.json({ error: 'Insufficient funds' }, 400);
      }
      
      // Update balance
      account.balance -= totalCost;
      
      // Add or update position
      const existingPosition = account.positions.find((p: any) => p.symbol === symbol);
      if (existingPosition) {
        const totalShares = existingPosition.shares + shares;
        const totalCost = (existingPosition.avgPrice * existingPosition.shares) + (price * shares);
        existingPosition.shares = totalShares;
        existingPosition.avgPrice = totalCost / totalShares;
      } else {
        account.positions.push({
          symbol,
          shares,
          avgPrice: price,
          purchasedAt: new Date().toISOString()
        });
      }
      
      // Add transaction
      account.transactions.unshift({
        id: crypto.randomUUID(),
        action: 'buy',
        symbol,
        shares,
        price,
        total: totalCost,
        timestamp: new Date().toISOString()
      });
      
    } else if (action === 'sell') {
      const position = account.positions.find((p: any) => p.symbol === symbol);
      
      if (!position || position.shares < shares) {
        return c.json({ error: 'Insufficient shares' }, 400);
      }
      
      // Update balance
      account.balance += totalCost;
      
      // Update or remove position
      position.shares -= shares;
      if (position.shares === 0) {
        account.positions = account.positions.filter((p: any) => p.symbol !== symbol);
      }
      
      // Add transaction
      account.transactions.unshift({
        id: crypto.randomUUID(),
        action: 'sell',
        symbol,
        shares,
        price,
        total: totalCost,
        profit: totalCost - (shares * position.avgPrice),
        timestamp: new Date().toISOString()
      });
    }
    
    // Calculate portfolio value
    const stocks = getMockDSEStocks();
    account.portfolioValue = account.positions.reduce((sum: number, pos: any) => {
      const stock = stocks.find(s => s.symbol === pos.symbol);
      return sum + (pos.shares * (stock?.price || pos.avgPrice));
    }, 0);
    account.totalValue = account.balance + account.portfolioValue;
    
    // Save updated account
    await kv.set(`user:${user.id}:account`, account);
    
    // Check for badge achievements
    await checkTradingBadges(user.id, account);
    
    return c.json({ success: true, account });
  } catch (error) {
    console.log(`Trading error: ${error}`);
    return c.json({ error: 'Failed to execute trade' }, 500);
  }
});

app.get("/make-server-f0a5cca3/portfolio", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const account = await kv.get(`user:${user.id}:account`);
    
    if (!account) {
      return c.json({ error: 'Account not found' }, 404);
    }
    
    // Get current stock prices
    const stocks = getMockDSEStocks();
    const enrichedPositions = account.positions.map((pos: any) => {
      const stock = stocks.find(s => s.symbol === pos.symbol);
      const currentPrice = stock?.price || pos.avgPrice;
      const currentValue = pos.shares * currentPrice;
      const costBasis = pos.shares * pos.avgPrice;
      const profitLoss = currentValue - costBasis;
      const profitLossPercent = (profitLoss / costBasis) * 100;
      
      return {
        ...pos,
        companyName: stock?.name,
        currentPrice,
        currentValue,
        costBasis,
        profitLoss,
        profitLossPercent
      };
    });
    
    return c.json({
      balance: account.balance,
      portfolioValue: account.portfolioValue,
      totalValue: account.totalValue,
      positions: enrichedPositions,
      transactions: (account.transactions || []).slice(0, 20) // Last 20 transactions
    });
  } catch (error) {
    console.log(`Portfolio fetch error: ${error}`);
    return c.json({ error: 'Failed to fetch portfolio' }, 500);
  }
});

// ===== AI TUTOR =====

app.post("/make-server-f0a5cca3/ai-tutor", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { question, language } = await c.req.json();
    
    // AI tutor response (simulated)
    const response = generateTutorResponse(question, language);
    
    return c.json({ response });
  } catch (error) {
    console.log(`AI tutor error: ${error}`);
    return c.json({ error: 'Failed to get tutor response' }, 500);
  }
});

// ===== GAMIFICATION =====

app.get("/make-server-f0a5cca3/badges", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const profile = await kv.get(`user:${user.id}:profile`);
    
    if (!profile) {
      return c.json({ error: 'Profile not found' }, 404);
    }
    
    const allBadges = getAllBadges();
    const userBadges = profile.badges || [];
    
    return c.json({
      earnedBadges: userBadges,
      availableBadges: allBadges.filter((b: any) => !userBadges.find((ub: any) => ub.id === b.id)),
      level: profile.level || 1,
      tutorialProgress: profile.tutorialProgress || 0
    });
  } catch (error) {
    console.log(`Badges fetch error: ${error}`);
    return c.json({ error: 'Failed to fetch badges' }, 500);
  }
});

app.post("/make-server-f0a5cca3/tutorial-progress", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { tutorialId } = await c.req.json();
    
    const profile = await kv.get(`user:${user.id}:profile`);
    if (!profile) {
      return c.json({ error: 'Profile not found' }, 404);
    }
    
    profile.tutorialProgress = (profile.tutorialProgress || 0) + 1;
    
    // Award tutorial badge
    if (profile.tutorialProgress === 1) {
      profile.badges = profile.badges || [];
      profile.badges.push({
        id: 'first_lesson',
        name: 'Mwanafunzi wa Kwanza',
        nameEn: 'First Student',
        earnedAt: new Date().toISOString()
      });
    }
    
    await kv.set(`user:${user.id}:profile`, profile);
    
    return c.json({ success: true, tutorialProgress: profile.tutorialProgress });
  } catch (error) {
    console.log(`Tutorial progress error: ${error}`);
    return c.json({ error: 'Failed to update tutorial progress' }, 500);
  }
});

// ===== HELPER FUNCTIONS =====

function generateRiskProfile(age: number, riskTolerance: string, experience: string) {
  const profiles = ['Conservative', 'Moderate', 'Aggressive'];
  
  if (riskTolerance === 'low' || age > 50) return 'Conservative';
  if (riskTolerance === 'high' && experience !== 'beginner') return 'Aggressive';
  return 'Moderate';
}

function generatePortfolioSuggestions(riskProfile: string, goal: string) {
  const suggestions = {
    Conservative: [
      { instrument: 'CRDB Bank', allocation: '30%', rationale: 'Benki imara ya Tanzania', rationaleEn: 'Stable Tanzanian bank', confidence: 5 },
      { instrument: 'Serikali Bond 2027', allocation: '50%', rationale: 'Usalama wa juu', rationaleEn: 'High security', confidence: 5 },
      { instrument: 'TBL', allocation: '20%', rationale: 'Kampuni ya viywaji imara', rationaleEn: 'Stable beverage company', confidence: 4 }
    ],
    Moderate: [
      { instrument: 'NMB Bank', allocation: '40%', rationale: 'Benki imara na ukuaji mzuri', rationaleEn: 'Stable bank with good growth', confidence: 5 },
      { instrument: 'Serikali Bond 2026', allocation: '30%', rationale: 'Hatari ndogo', rationaleEn: 'Low risk', confidence: 5 },
      { instrument: 'VODA', allocation: '30%', rationale: 'Teknolojia yenye ukuaji', rationaleEn: 'Growing technology', confidence: 4 }
    ],
    Aggressive: [
      { instrument: 'NICOL', allocation: '40%', rationale: 'Ukuaji wa haraka', rationaleEn: 'Rapid growth', confidence: 3 },
      { instrument: 'TOL', allocation: '35%', rationale: 'Kampuni ya matumizi yenye fursa', rationaleEn: 'Consumer company with opportunity', confidence: 4 },
      { instrument: 'NMB Bank', allocation: '25%', rationale: 'Usawa katika mkoba', rationaleEn: 'Portfolio balance', confidence: 5 }
    ]
  };
  
  return suggestions[riskProfile as keyof typeof suggestions] || suggestions.Moderate;
}

function getMockDSEStocks() {
  return [
    { symbol: 'CRDB', name: 'CRDB Bank', price: 350, change: 2.5, changePercent: 0.72, volume: 145000, sector: 'Banking' },
    { symbol: 'NMB', name: 'NMB Bank', price: 5800, change: -50, changePercent: -0.85, volume: 89000, sector: 'Banking' },
    { symbol: 'TBL', name: 'Tanzania Breweries', price: 7200, change: 100, changePercent: 1.41, volume: 52000, sector: 'Consumer Goods' },
    { symbol: 'VODA', name: 'Vodacom Tanzania', price: 950, change: 15, changePercent: 1.60, volume: 210000, sector: 'Telecommunications' },
    { symbol: 'TOL', name: 'TOL Gases', price: 850, change: -10, changePercent: -1.16, volume: 35000, sector: 'Industrial' },
    { symbol: 'NICOL', name: 'NICOL Holdings', price: 120, change: 5, changePercent: 4.35, volume: 180000, sector: 'Consumer Goods' },
    { symbol: 'TCCL', name: 'TCCL', price: 680, change: 8, changePercent: 1.19, volume: 42000, sector: 'Consumer Goods' },
    { symbol: 'DCB', name: 'DCB Commercial Bank', price: 85, change: 0, changePercent: 0, volume: 25000, sector: 'Banking' }
  ];
}

function getMockStockDetail(symbol: string) {
  const stocks = getMockDSEStocks();
  const stock = stocks.find(s => s.symbol === symbol);
  
  if (!stock) return null;
  
  return {
    ...stock,
    description: `${stock.name} ni kampuni kubwa ya ${stock.sector} nchini Tanzania.`,
    descriptionEn: `${stock.name} is a major ${stock.sector} company in Tanzania.`,
    marketCap: Math.floor(stock.price * 10000000),
    peRatio: (15 + Math.random() * 10).toFixed(2),
    dividend: (stock.price * 0.03).toFixed(2),
    yearHigh: Math.floor(stock.price * 1.2),
    yearLow: Math.floor(stock.price * 0.8)
  };
}

function generateTutorResponse(question: string, language: string) {
  const questionLower = question.toLowerCase();
  
  const responses: any = {
    'etf': {
      sw: 'ETF (Exchange Traded Fund) ni mkusanyiko wa hisa au deni ambao unauza kwenye soko kama hisa moja. Mfano: Kununua ETF ya DSE ni kama kununua sehemu ndogo ya kampuni zote DSE kwa bei nafuu. Faida: Usambaaji wa hatari na gharama ndogo.',
      en: 'ETF (Exchange Traded Fund) is a collection of stocks or bonds that trades on an exchange like a single stock. Example: Buying a DSE ETF is like buying a small piece of all DSE companies at a low cost. Benefit: Risk diversification and low fees.'
    },
    'bond': {
      sw: 'Deni (Bond) ni mkopo unaoupa serikali au kampuni, na wanakurudishia riba kila mwaka. Mfano Tanzania: Deni la Serikali 2027 linatoa riba ya 8% kila mwaka na ni salama sana. Faida: Mapato ya kudumu na hatari ndogo.',
      en: 'A Bond is a loan you give to the government or company, and they pay you interest every year. Tanzania example: Government Bond 2027 pays 8% annual interest and is very safe. Benefit: Steady income and low risk.'
    },
    'risk': {
      sw: 'Hatari ya uwekezaji ni uwezekano wa kupoteza pesa. Aina tatu: Ndogo (bonds), Wastani (hisa za benki), Kubwa (hisa mpya). Kanuni: Ukiwa mchanga, unaweza kuchukua hatari zaidi. Ukiwa mkubwa, chagua usalama.',
      en: 'Investment risk is the possibility of losing money. Three types: Low (bonds), Medium (bank stocks), High (new stocks). Rule: If you\'re young, you can take more risk. If older, choose safety.'
    },
    'dse': {
      sw: 'DSE (Dar es Salaam Stock Exchange) ni soko la hisa la Tanzania ambapo kampuni kama NMB, CRDB, na TBL zinauza hisa zao. Unaweza kununua sehemu ya kampuni hizi kupitia broker.',
      en: 'DSE (Dar es Salaam Stock Exchange) is Tanzania\'s stock market where companies like NMB, CRDB, and TBL sell their shares. You can buy a piece of these companies through a broker.'
    },
    'portfolio': {
      sw: 'Portfolio ni mkusanyiko wa uwekezaji wako wote - hisa, bonds, na pesa taslimu. Mkoba mzuri una mchanganyiko: 60% hisa, 30% bonds, 10% pesa taslimu. Hii inakuokoa na hatari.',
      en: 'Portfolio is the collection of all your investments - stocks, bonds, and cash. A good portfolio has a mix: 60% stocks, 30% bonds, 10% cash. This protects you from risk.'
    },
    'dividend': {
      sw: 'Gawio (Dividend) ni pesa ambazo kampuni inakugawia kila mwaka kutoka kwenye faida zao. Mfano: CRDB inaweza kulipa TZS 50 kwa kila hisa. Hii ni mapato ya ziada ukiwa na hisa.',
      en: 'Dividend is money that a company pays you every year from their profits. Example: CRDB might pay TZS 50 per share. This is extra income while owning the stock.'
    }
  };
  
  // Find matching topic
  for (const [topic, response] of Object.entries(responses)) {
    if (questionLower.includes(topic)) {
      return language === 'sw' ? response.sw : response.en;
    }
  }
  
  // Default response
  return language === 'sw' 
    ? 'Asante kwa swali lako. Je,ungependa kujua kuhusu: ETF, Bonds, Hatari ya uwekezaji, DSE, Portfolio, au Dividend?'
    : 'Thank you for your question. Would you like to learn about: ETF, Bonds, Investment Risk, DSE, Portfolio, or Dividend?';
}

function getAllBadges() {
  return [
    { id: 'first_lesson', name: 'Mwanafunzi wa Kwanza', nameEn: 'First Student', description: 'Maliza somo la kwanza', descriptionEn: 'Complete first lesson' },
    { id: 'first_trade', name: 'Biashara ya Kwanza', nameEn: 'First Trade', description: 'Fanya biashara ya kwanza', descriptionEn: 'Make first trade' },
    { id: 'profitable', name: 'Faida ya Kwanza', nameEn: 'First Profit', description: 'Fanya faida ya kwanza', descriptionEn: 'Make first profit' },
    { id: 'diversified', name: 'Mkoba wa Usambaaji', nameEn: 'Diversified Portfolio', description: 'Miliki hisa 3+', descriptionEn: 'Own 3+ stocks' },
    { id: 'millionaire', name: 'Milionea', nameEn: 'Millionaire', description: 'Fikia TZS 15M', descriptionEn: 'Reach TZS 15M' }
  ];
}

async function checkTradingBadges(userId: string, account: any) {
  try {
    const profile = await kv.get(`user:${userId}:profile`);
    if (!profile) return;
    
    profile.badges = profile.badges || [];
    const badgeIds = profile.badges.map((b: any) => b.id);
    
    // First trade badge
    if (account.transactions.length === 1 && !badgeIds.includes('first_trade')) {
      profile.badges.push({
        id: 'first_trade',
        name: 'Biashara ya Kwanza',
        nameEn: 'First Trade',
        earnedAt: new Date().toISOString()
      });
    }
    
    // First profit badge
    const hasProfit = account.transactions.some((t: any) => t.profit && t.profit > 0);
    if (hasProfit && !badgeIds.includes('profitable')) {
      profile.badges.push({
        id: 'profitable',
        name: 'Faida ya Kwanza',
        nameEn: 'First Profit',
        earnedAt: new Date().toISOString()
      });
    }
    
    // Diversified portfolio badge
    if (account.positions.length >= 3 && !badgeIds.includes('diversified')) {
      profile.badges.push({
        id: 'diversified',
        name: 'Mkoba wa Usambaaji',
        nameEn: 'Diversified Portfolio',
        earnedAt: new Date().toISOString()
      });
    }
    
    // Millionaire badge
    if (account.totalValue >= 15000000 && !badgeIds.includes('millionaire')) {
      profile.badges.push({
        id: 'millionaire',
        name: 'Milionea',
        nameEn: 'Millionaire',
        earnedAt: new Date().toISOString()
      });
    }
    
    await kv.set(`user:${userId}:profile`, profile);
  } catch (error) {
    console.log(`Badge check error: ${error}`);
  }
}

Deno.serve(app.fetch);