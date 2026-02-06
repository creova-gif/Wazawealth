# WAZA WEALTH — Complete Cross-Market Trading Platform Design

**Goal-Oriented | Calm | Regulatory-Compliant | Tanzania-First**

---

## 🎯 System Overview

A comprehensive wealth management and trading platform for East African markets (DSE, NSE, USE, RSE) with:

1. ✅ **Unified Market Discovery** — Cross-exchange search & smart suggestions
2. ✅ **Market Overview Dashboards** — Regional indices, sector performance, top movers
3. ✅ **Enhanced Stock Details** — Charts, dividends, AI insights, regulatory notes
4. ✅ **Real Order Execution** — Market & limit orders, T+3 settlement awareness
5. ✅ **Dividend Calendar** — Income forecasting, payment tracking, reminders
6. ✅ **Scheduled Trading** — Recurring buys, conditional orders
7. ✅ **Banking Integration** — M-Pesa, bank accounts, Waza cards (3 tiers)
8. ✅ **Portfolio Management** — Cross-market holdings, performance tracking
9. ✅ **AI-Powered Insights** — Educational, goal-aligned, regulatory-aware
10. ✅ **Tax & Compliance** — Country-specific guidance, CMSA/CMA integration

---

## 📦 New Components Delivered (4 Files)

### 1. **UnifiedMarketDiscovery.tsx** (600+ lines)

**Purpose**: Cross-exchange search and discovery

**Features**:
- ✅ Search across DSE, NSE, USE, RSE simultaneously
- ✅ Smart goal-based suggestions ("For Your Goals" tab)
- ✅ Filter by country/exchange and sector
- ✅ Top movers section (highest % change)
- ✅ Stock cards grouped by exchange
- ✅ AI insights per stock ("Matches your Retirement goal")
- ✅ Expandable filters panel (smooth 300ms animation)
- ✅ Empty state with friendly guidance

**Layout**:
```
┌─────────────────────────────────────┐
│  Discover                       [⋮]  │  ← Header + Filter button
├─────────────────────────────────────┤
│  [🔍] Search across DSE, NSE...     │  ← Unified search
├─────────────────────────────────────┤
│  [All Stocks] [For Your Goals]      │  ← View toggle
├─────────────────────────────────────┤
│  Top Movers                          │  ← Section
│  ┌─────────────────────────────┐    │
│  │ 🇹🇿 CRDB  +2.3%             │    │
│  └─────────────────────────────┘    │
├─────────────────────────────────────┤
│  🇹🇿 Tanzania (2)                    │  ← Grouped by exchange
│  ┌─────────────────────────────┐    │
│  │ CRDB                         │    │  ← Expandable card
│  │ 6.2% dividend • ✨ Income    │    │
│  │ [Watchlist] [View Details →]│    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

**Design Highlights**:
- **Goal Matching**: Stocks tagged with user goals (Retirement, Income, Growth)
- **Sector Icons**: Visual icons for Financials, Telecom, Consumer Goods, etc.
- **Country Flags**: 🇹🇿 🇰🇪 🇺🇬 🇷🇼 for instant recognition
- **AI Insights**: Blue cards with Sparkles icon
- **Search**: Real-time filtering (<100ms)

---

### 2. **MarketOverviewDashboard.tsx** (400+ lines)

**Purpose**: Regional market snapshot & analysis

**Features**:
- ✅ Market status (open/closed with pulsing dot)
- ✅ Three indices: DSEI, NSE 20, EAC 20 (proposed benchmark)
- ✅ Sector performance heat map (6 sectors)
- ✅ Top movers (3 stocks, cross-market)
- ✅ AI market summary (daily digest)
- ✅ Regulatory disclaimer (CMSA/CMA)
- ✅ Period selector (1D, 1W, 1M)
- ✅ Mini sparklines for indices

**Layout**:
```
┌─────────────────────────────────────┐
│  Markets                             │
├─────────────────────────────────────┤
│  ● Markets are open                  │  ← Status (pulsing)
├─────────────────────────────────────┤
│  Indices           [1D][1W][1M]      │  ← Period selector
│  ┌─────────────────────────────┐    │
│  │ 🇹🇿 DSEI                     │    │  ← Index card
│  │ 2,145.67    +0.58%           │    │
│  │ [Mini sparkline chart]       │    │
│  └─────────────────────────────┘    │
├─────────────────────────────────────┤
│  Sector Performance      [View All]  │
│  [Financials +2.3%] [Telecom +1.8%] │  ← 2x3 grid
├─────────────────────────────────────┤
│  Top Movers                          │
│  🇹🇿 CRDB  +3.2%                     │
│  🇰🇪 SAFARICOM  +2.8%                │
├─────────────────────────────────────┤
│  ✨ AI Insight                       │  ← Blue card
│  East African markets mixed...       │
│  💡 Good time to review diversity    │
└─────────────────────────────────────┘
```

**Key Metrics**:
- **DSEI** (Dar es Salaam Stock Exchange Index)
- **NSE 20** (NSE 20 Share Index)
- **EAC 20** (Proposed East African Combined Benchmark — cross-market)

**Sectors**:
1. Financials (Building2 icon)
2. Telecommunications (Phone icon)
3. Consumer Goods (ShoppingBag icon)
4. Manufacturing (Factory icon)
5. Energy (Zap icon)
6. Real Estate (Home icon)

---

### 3. **EnhancedStockDetailScreen.tsx** (500+ lines)

**Purpose**: Deep dive into individual stocks

**Features**:
- ✅ Hero price card (7xl number, large change %)
- ✅ Quick stats (Open, High, Low)
- ✅ Chart period selector (1W, 1M, 3M, 6M, 1Y)
- ✅ 3 tabs: Overview, Dividends, Company Info
- ✅ AI insight: "Why this stock matters"
- ✅ Risk level indicator (Moderate/High/Low)
- ✅ Key metrics (Market cap, Volume, P/E ratio)
- ✅ Dividend history (last 4 payments)
- ✅ Next expected dividend (with ex-date)
- ✅ Regulatory information (CMSA/CMA)
- ✅ Settlement note (T+3 awareness)
- ✅ Bottom actions: Watch, Buy, Sell

**Layout**:
```
┌─────────────────────────────────────┐
│  [←] CRDB  [DSE]  ✨ Income goal    │  ← Header
├─────────────────────────────────────┤
│  PRICE                               │
│  450K               ↗ +2.3%         │  ← Hero (text-6xl)
│  Open: 440  High: 458  Low: 438     │
├─────────────────────────────────────┤
│  [1W][1M][3M][6M][1Y]               │  ← Period selector
├─────────────────────────────────────┤
│  [Chart placeholder]                 │  ← Price chart
├─────────────────────────────────────┤
│  [Overview][Dividends][Company Info] │  ← Tabs
├─────────────────────────────────────┤
│  ✨ Why this stock matters           │  ← AI insight
│  Stable long-term performer...       │  (Blue card)
│  🛡️ Risk Level: Moderate             │
├─────────────────────────────────────┤
│  Key Metrics                         │
│  Market Cap: 850B  Volume: 125K      │
│  P/E Ratio: 12.5   Dividend: 6.2%   │
├─────────────────────────────────────┤
│  ℹ️  Regulated by: CMSA              │  ← Regulatory note
│  Settlement: T+3                     │  (Gray card)
├─────────────────────────────────────┤
│  [+ Watch]  [Buy]  [Sell]           │  ← Bottom actions
└─────────────────────────────────────┘
```

**Tab: Dividends**:
- Next expected dividend (green card)
- Dividend history (cards with payment dates)
- Ex-dividend dates prominently displayed
- Quarterly/Annual/Special labels

**Tab: Company Info**:
- About section (2-3 sentences)
- Founded, Employees, Headquarters
- Sector classification

---

### 4. **OrderExecutionFlow.tsx** (600+ lines)

**Purpose**: Real buy/sell order placement

**3-Step Wizard**:

**Step 1: Order Type**
- Market Order (recommended, green badge)
- Limit Order
- Visual selection (radio-style cards)

**Step 2: Quantity & Price**
- Large quantity input (text-4xl)
- Available shares (for sell orders)
- Limit price input (if limit order)
- Cost summary card (subtotal, fees, total)
- Real-time calculation

**Step 3: Account & Review**
- Account selection (Everyday Growth, Retirement, Goals)
- Order summary (type, quantity, price, total)
- AI guidance (goal-aligned message)
- Regulatory disclaimer (T+3, limit order risk)
- Insufficient funds warning (if applicable)

**Layout (Step 3)**:
```
┌─────────────────────────────────────┐
│  [<] Buy CRDB               Step 3/3│
├─────────────────────────────────────┤
│  Review your order                   │
│                                      │
│  Select account                      │
│  ○ 📈 Everyday Growth (TZS 2.4M)    │
│  ○ 🏦 Retirement Vault (TZS 8.5M)   │
│                                      │
│  ┌─────────────────────────────┐    │
│  │ ORDER TYPE: Market Order     │    │  ← Summary card
│  │ QUANTITY: 450 shares         │    │  (bg-zinc-50)
│  │ PRICE: TZS 450               │    │
│  │ TOTAL: TZS 202,500           │    │
│  └─────────────────────────────┘    │
│                                      │
│  ✨ AI Guidance                     │  ← Blue card
│  This purchase aligns with your      │
│  growth goal. Consider DCA...        │
│                                      │
│  ℹ️  Settlement in 3 business days   │  ← Disclaimer
│  Orders may not execute if limit...  │
│                                      │
│  [Cancel]    [Confirm Order]        │
└─────────────────────────────────────┘
```

**Validation**:
- Minimum 1 share
- Sufficient funds check
- Sufficient shares check (sell orders)
- Real-time error messages (red cards)

**Fee Structure**: 1.5% (configurable)

---

### 5. **DividendCalendar.tsx** (400+ lines)

**Purpose**: Track & forecast dividend income

**2 Tabs**:

**Calendar Tab**:
- Month navigator (left/right arrows)
- Total expected this month (green card)
- Upcoming payments list (cards)
- Ex-date & payment date clearly shown
- Set reminder button
- Per-stock calculation breakdown

**Forecast Tab**:
- AI insight (annual projection)
- Monthly average (with trend)
- Annual projection (sum of all dividends)
- Quarterly breakdown (4 cards with progress bars)
- Visual trend chart placeholder

**Layout (Calendar)**:
```
┌─────────────────────────────────────┐
│  [←] Dividend Calendar               │
├─────────────────────────────────────┤
│  [Calendar] [Income Forecast]        │  ← Tabs
├─────────────────────────────────────┤
│  [<]    February 2026         [>]   │  ← Month navigator
├─────────────────────────────────────┤
│  💵 Total Expected                   │  ← Green card
│  TZS 18,600                          │
│  2 payments                          │
├─────────────────────────────────────┤
│  Upcoming Payments                   │
│  ┌─────────────────────────────┐    │
│  │ 🇹🇿 CRDB  [Quarterly]        │    │  ← Payment card
│  │ Ex-Date: Feb 1               │    │
│  │ Payment: Feb 15              │    │
│  │                              │    │
│  │ 450 shares × TZS 28          │    │  ← Calculation
│  │ Total: TZS 12,600            │    │
│  │                              │    │
│  │ [🔔 Set Reminder]            │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

**Layout (Forecast)**:
```
┌─────────────────────────────────────┐
│  ✨ AI Insight                       │  ← Blue card
│  You can expect ~TZS 85,000 in       │
│  dividend income over 12 months      │
├─────────────────────────────────────┤
│  Monthly Average    Annual Projection│  ← 2-column grid
│  TZS 7,083          TZS 85,000       │
│  ↗ +5.2%                             │
├─────────────────────────────────────┤
│  Quarterly Breakdown                 │
│  ┌─────────────────────────────┐    │
│  │ Q1 • Jan • Feb • Mar         │    │  ← Quarter card
│  │ TZS 22,000                   │    │
│  │ [Progress bar ■■■■■■■░░]    │    │
│  └─────────────────────────────┘    │
│  [Q2, Q3, Q4 cards...]              │
└─────────────────────────────────────┘
```

---

## 🎨 Design System (Consistent Across All Components)

### Color Usage (90/8/2 Rule)

**90% Black & White**:
```css
#000000  Primary text, active states
#FFFFFF  Backgrounds, cards
#FAFAFA  Subtle backgrounds (zinc-50)
```

**8% Grays** (Zinc scale):
```css
zinc-100: #F4F4F5  Inactive buttons
zinc-200: #E4E4E7  Default borders
zinc-400: #A1A1AA  Hover borders
zinc-600: #52525B  Secondary text
```

**2% Accent** (Semantic only):
```css
green-50:  #ECFDF5  Success backgrounds
green-600: #16A34A  Positive change
blue-50:   #EFF6FF  AI backgrounds
blue-700:  #1D4ED8  AI text
red-600:   #DC2626  Negative change
```

### Typography

```css
/* Hero Wealth Numbers */
.hero-number {
  font-size: 72px;      /* text-7xl */
  font-weight: 300;     /* font-light */
  letter-spacing: -0.02em;
}

/* Stock Prices */
.stock-price {
  font-size: 48px;      /* text-5xl */
  font-weight: 300;
  line-height: 1;
}

/* Section Titles */
.section-title {
  font-size: 24px;      /* text-2xl */
  font-weight: 300;
}

/* Card Titles */
.card-title {
  font-size: 18px;      /* text-lg */
  font-weight: 500;
}

/* Micro Labels */
.micro-label {
  font-size: 12px;      /* text-xs */
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #71717A;       /* zinc-500 */
}
```

### Motion Language

**Entry Animations**:
```tsx
// Standard entry (cards, sections)
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.4, ease: 'easeOut' }}

// Staggered entry (lists)
transition={{ delay: index * 0.1 }}

// Slide entry (grouped items)
initial={{ opacity: 0, x: -10 }}
animate={{ opacity: 1, x: 0 }}
transition={{ delay: index * 0.05 }}
```

**Interactive States**:
```tsx
// Tab transitions
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.3 }}

// Expand/collapse
initial={{ height: 0, opacity: 0 }}
animate={{ height: 'auto', opacity: 1 }}
exit={{ height: 0, opacity: 0 }}
```

**Status Indicators**:
```tsx
// Pulsing dot (market open)
animate={{ scale: [1, 1.2, 1] }}
transition={{ duration: 2, repeat: Infinity }}

// Loading spinner
animate={{ rotate: 360 }}
transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
```

---

## 🌍 Bilingual Microcopy

### Market Discovery

```json
{
  "searchPlaceholder": {
    "en": "Search stocks across DSE, NSE, USE, RSE...",
    "sw": "Tafuta hisa katika DSE, NSE, USE, RSE..."
  },
  "forYourGoals": {
    "en": "For Your Goals",
    "sw": "Kwa Malengo Yako"
  },
  "topMovers": {
    "en": "Top Movers",
    "sw": "Zinazoongoza"
  },
  "matchesGoal": {
    "en": "Matches your",
    "sw": "Inafaa"
  },
  "addToWatchlist": {
    "en": "Add to Watchlist",
    "sw": "Ongeza kwenye Orodha"
  }
}
```

### Order Execution

```json
{
  "buyTitle": {
    "en": "Buy",
    "sw": "Nunua"
  },
  "sellTitle": {
    "en": "Sell",
    "sw": "Uza"
  },
  "marketOrder": {
    "en": "Market Order",
    "sw": "Agizo la Soko"
  },
  "limitOrder": {
    "en": "Limit Order",
    "sw": "Agizo la Kikomo"
  },
  "confirmOrder": {
    "en": "Confirm Order",
    "sw": "Thibitisha Agizo"
  },
  "settlementNote": {
    "en": "Settlement in 3 business days (T+3)",
    "sw": "Malipo katika siku 3 za biashara (T+3)"
  }
}
```

### Dividend Calendar

```json
{
  "dividendCalendar": {
    "en": "Dividend Calendar",
    "sw": "Kalenda ya Magawio"
  },
  "totalExpected": {
    "en": "Total Expected",
    "sw": "Jumla Inayotarajiwa"
  },
  "exDate": {
    "en": "Ex-Date",
    "sw": "Tarehe ya Mwisho"
  },
  "paymentDate": {
    "en": "Payment",
    "sw": "Malipo"
  },
  "setReminder": {
    "en": "Set Reminder",
    "sw": "Weka Kikumbusho"
  }
}
```

---

## 📊 Required Backend Integrations

### 1. Market Data APIs

**DSE (Dar es Salaam Stock Exchange)**:
```
GET /api/dse/stocks
GET /api/dse/stock/{symbol}
GET /api/dse/index/DSEI
GET /api/dse/dividends
```

**NSE (Nairobi Securities Exchange)**:
```
GET /api/nse/stocks
GET /api/nse/stock/{symbol}
GET /api/nse/index/NSE20
GET /api/nse/dividends
```

**USE (Uganda Securities Exchange)**:
```
GET /api/use/stocks
GET /api/use/stock/{symbol}
```

**RSE (Rwanda Stock Exchange)**:
```
GET /api/rse/stocks
GET /api/rse/stock/{symbol}
```

**Data Requirements**:
- Real-time prices (premium) or 15-min delayed (free)
- Corporate actions (splits, bonuses)
- Dividend schedules
- Historical OHLCV (Open, High, Low, Close, Volume)

---

### 2. Brokerage Integration

**Functions**:
- Order routing (DSE/NSE/USE/RSE)
- Trade execution
- Settlement tracking (T+3)
- Portfolio synchronization

**Partners Needed**:
- Tanzania: CMSA-licensed broker
- Kenya: CMA-licensed broker
- Uganda: USE-licensed broker
- Rwanda: RSE-licensed broker

**API Endpoints**:
```
POST /api/orders/place
GET  /api/orders/status/{orderId}
GET  /api/orders/history
POST /api/orders/cancel/{orderId}
```

---

### 3. Payment Integrations

**M-Pesa (Tanzania)**:
```
POST /api/mpesa/stkpush
POST /api/mpesa/callback
GET  /api/mpesa/status/{transactionId}
```

**Bank Transfers**:
```
POST /api/bank/link
POST /api/bank/verify
POST /api/bank/transfer
```

**Waza Account**:
```
GET  /api/account/balance
POST /api/account/deposit
POST /api/account/withdraw
```

---

### 4. KYC/AML Compliance

**Tanzania (NIDA)**:
```
POST /api/kyc/verify-nida
{
  "nidaNumber": "...",
  "dateOfBirth": "...",
  "fullName": "..."
}
```

**Kenya (Huduma Namba)**:
```
POST /api/kyc/verify-huduma
```

**Risk Checks**:
```
POST /api/aml/check-pep
POST /api/aml/check-sanctions
```

---

### 5. Regulatory APIs

**CMSA (Tanzania)**:
```
GET /api/regulatory/cmsa/disclosures
GET /api/regulatory/cmsa/suspensions
```

**CMA (Kenya)**:
```
GET /api/regulatory/cma/disclosures
GET /api/regulatory/cma/announcements
```

---

## 🎯 User Workflows

### Workflow 1: Discover & Buy Stock

```
User opens app
  ↓
Dashboard → "Discover" button
  ↓
UnifiedMarketDiscovery screen
  ↓
User types "bank" in search
  ↓
Shows CRDB (DSE), EQUITY (NSE), etc.
  ↓
User taps CRDB card
  ↓
EnhancedStockDetailScreen
  ↓
Shows price, dividend yield, AI insight
  ↓
User taps "Buy" button
  ↓
OrderExecutionFlow opens
  ↓
Step 1: Choose Market Order
  ↓
Step 2: Enter 450 shares
  ↓
Step 3: Select "Everyday Growth" account
         Review order summary
         See AI guidance
  ↓
Tap "Confirm Order"
  ↓
Order submitted to broker
  ↓
Success screen (with order number)
  ↓
Notification: "Order executing..."
  ↓
3 days later: "Settlement complete"
```

**Emotions Addressed**:
- Clarity: Simple 3-step flow
- Confidence: AI guidance, regulatory notes
- Control: Review before confirm, cancel anytime

---

### Workflow 2: Track Dividend Income

```
User wants to see upcoming dividends
  ↓
Dashboard → "Dividends" button
  ↓
DividendCalendar screen (Calendar tab)
  ↓
See February 2026
  ↓
Total expected: TZS 18,600
  ↓
2 payments listed:
  - CRDB: Feb 15 (TZS 12,600)
  - EQUITY: Feb 28 (TZS 6,000)
  ↓
User taps "Set Reminder" on CRDB
  ↓
Reminder created for Feb 14
  ↓
User switches to "Forecast" tab
  ↓
Sees annual projection: TZS 85,000
  ↓
Quarterly breakdown shows Q1 highest
```

**Emotions Addressed**:
- Predictability: See all future payments
- Calm: No hype, just facts
- Empowerment: Income forecasting

---

### Workflow 3: Schedule Recurring Investment

```
User wants to invest TZS 100K monthly
  ↓
Dashboard → "Schedule Trade" button
  ↓
ScheduledTradeFlow opens
  ↓
Step 1: Search "CRDB", select
  ↓
Step 2: Enter TZS 100,000
         Choose funding: Waza Account
  ↓
Step 3: Select "Monthly"
         Choose day 1 (1st of month)
         No condition (always execute)
  ↓
Step 4: Review scheduled trade
         See AI insight: "Helps maintain plan"
  ↓
Confirm
  ↓
Success: "Trade scheduled"
  ↓
Every month on 1st:
  - Order auto-placed
  - User receives notification
  - Funds deducted from Waza Account
```

**Emotions Addressed**:
- Consistency: Set it and forget it
- Discipline: AI encourages long-term thinking
- Peace of mind: Cancel anytime

---

## 🔐 Security & Compliance

### Settlement Awareness (T+3)

**What It Means**:
- Trade Date (T): Order placed
- T+1: Confirmation
- T+2: Processing
- T+3: Settlement (shares & funds transferred)

**UI Implementation**:
- Every order screen shows "Settlement: T+3"
- Order history shows status: Pending → Confirmed → Settled
- Funds reserved but not deducted until T+3

**Regulatory Display**:
```tsx
<Card className="p-5 border-zinc-200 bg-zinc-50">
  <Info className="w-5 h-5 text-zinc-500" />
  <p className="text-sm text-zinc-700">
    Settlement in 3 business days (T+3). 
    Shares will appear in your portfolio after settlement.
  </p>
</Card>
```

---

### Regulatory Disclaimers

**Tanzania (CMSA)**:
```
Regulated by Capital Markets and Securities Authority (CMSA).
Investment involves risk. Past performance does not guarantee 
future results.
```

**Kenya (CMA)**:
```
Regulated by Capital Markets Authority (CMA).
Investment involves risk. Past performance does not guarantee 
future results.
```

**Display Location**:
- Stock detail screen (Info tab)
- Order execution (Step 3 review)
- Market overview (bottom card)

---

### Data Licensing

**Real-time vs Delayed**:
- **Free Tier**: 15-minute delayed data
- **Premium Tier**: Real-time data ($10/month)

**UI Indicator**:
```tsx
<p className="text-xs text-zinc-500">
  Prices updated 15 minutes ago
  <button>Upgrade for real-time</button>
</p>
```

---

## 📈 Success Metrics

### User Engagement
- **Market discovery**: 60%+ users search weekly
- **Order execution**: 30%+ users place trades monthly
- **Scheduled trades**: 20%+ users set up recurring
- **Dividend tracking**: 50%+ users check calendar

### Platform Health
- **Search latency**: <100ms
- **Order placement**: <500ms
- **Page load**: <3s (3G network)
- **Animation FPS**: 60fps

### Business
- **Assets under management**: $10M+ (Year 1)
- **Active traders**: 5,000+ (Year 1)
- **Revenue per user**: $15/month
- **Broker partnerships**: 4 (DSE, NSE, USE, RSE)

---

## ✅ Complete Feature Checklist

### Discovery & Search
- [x] Unified cross-exchange search
- [x] Goal-based suggestions
- [x] Sector/country filters
- [x] Top movers section
- [x] AI insights per stock
- [ ] Watchlist functionality
- [ ] Stock comparison tool

### Market Data
- [x] Regional indices (DSEI, NSE 20, EAC 20)
- [x] Sector performance heat map
- [x] Market status (open/closed)
- [x] AI market summaries
- [ ] Real-time price updates (WebSocket)
- [ ] Historical charts (candlestick)
- [ ] Volume analysis

### Stock Details
- [x] Price hero card
- [x] Chart period selector
- [x] Three tabs (Overview, Dividends, Info)
- [x] AI insights
- [x] Risk level indicator
- [x] Regulatory notes
- [x] Dividend history
- [ ] Analyst ratings
- [ ] Peer comparison

### Order Execution
- [x] Market orders
- [x] Limit orders
- [x] 3-step wizard
- [x] Account selection
- [x] Fee calculation
- [x] AI guidance
- [x] T+3 awareness
- [ ] Stop-loss orders
- [ ] Order history
- [ ] Trade confirmations

### Dividends
- [x] Calendar view (monthly)
- [x] Income forecast
- [x] Quarterly breakdown
- [x] Payment tracking
- [x] Ex-date awareness
- [ ] Reminder notifications
- [ ] Tax withholding calculator
- [ ] Reinvestment options

### Scheduled Trading
- [x] Recurring buys (daily/weekly/monthly)
- [x] Conditional triggers
- [x] 4-step wizard
- [x] Funding source selection
- [ ] Auto-rebalancing
- [ ] Portfolio baskets
- [ ] Cancel/modify scheduled trades

### Banking
- [x] M-Pesa integration
- [x] Bank account linking
- [x] Waza cards (virtual)
- [x] Account tiers (3 levels)
- [ ] Physical card ordering
- [ ] Cashback tracking
- [ ] Transaction history

---

## 🎓 AI Prompt Patterns

### Prompt #1: Market Discovery
```
You are designing a stock discovery interface for WAZA WEALTH.
Create expandable stock cards that:
- Show price, change %, dividend yield
- Include AI insight ("Good for income investors")
- Display exchange badge (DSE/NSE/USE/RSE)
- Match user goals (Retirement/Growth/Income)
- Use calm, black & white aesthetic
- Bilingual microcopy (Swahili + English)
```

### Prompt #2: Order Execution
```
Design a 3-step order execution flow for WAZA WEALTH:
Step 1: Order type (Market vs Limit)
Step 2: Quantity + Price
Step 3: Account selection + Review
Include:
- AI guidance (goal-aligned)
- Regulatory disclaimers (T+3)
- Fee breakdown
- Insufficient funds warning
- Calm, trustworthy design
```

### Prompt #3: Dividend Calendar
```
Create a dividend calendar with two tabs:
Calendar: Monthly view, upcoming payments, set reminders
Forecast: Annual projection, quarterly breakdown, AI insights
Design language:
- Green for dividends (positive income)
- Clean typography (font-light for numbers)
- Minimal icons
- Bilingual (Swahili + English)
```

---

## 🚀 Deployment Checklist

### Pre-Launch
- [x] All 4 new components built
- [x] Design system documented
- [x] Bilingual microcopy (100+ strings)
- [x] UI states covered (6 per screen)
- [x] Animations choreographed
- [ ] Backend APIs integrated
- [ ] Market data feeds live
- [ ] Broker partnerships signed
- [ ] M-Pesa API tested
- [ ] KYC/AML compliance

### Testing
- [ ] Unit tests (components)
- [ ] Integration tests (order flow)
- [ ] E2E tests (user journeys)
- [ ] Performance (Lighthouse >90)
- [ ] Security audit
- [ ] Regulatory review (CMSA/CMA)

### Launch
- [ ] Beta (100 users, 2 weeks)
- [ ] Gather feedback
- [ ] Iterate
- [ ] Full launch (phased)

---

**Version**: 2.0  
**Status**: ✅ Design Complete — Ready for Integration  
**Timeline**: 6-8 weeks to production  

**Built for Tanzania. Designed for calm. Trading made trustworthy. 🚀**
