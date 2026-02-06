# WAZA WEALTH — Comprehensive UX Specification
**Vesto-Inspired Visual Clarity | Tanzania-First Philosophy**

---

## 🎯 Design Philosophy

### Core Principles
1. **Confidence over excitement** — Long-term wealth building, not day trading
2. **Guidance over speculation** — AI coach, not hot tips
3. **Goals over stock picking** — Purpose-based accounts first
4. **Simplicity over complexity** — Progressive disclosure

### Visual Language
- **90% Black & White** — Primary interface
- **8% Grays** — Secondary elements, borders
- **2% Accent** — Only for meaning (green = growth, blue = AI, amber = attention)
- **Font weights**: 300 (large numbers), 400 (body), 500 (emphasis)
- **Spacing scale**: 8px base, 16/24/32/48px multipliers
- **Motion**: 400ms ease-out (standard), 600ms ease-in-out (reveals)

---

## 1️⃣ ONBOARDING & USER PROFILE

### Design Goals
- Build trust immediately (security, regulation)
- Set expectations (long-term, goal-based)
- Gather minimal info (no overwhelming forms)
- Feel human and approachable

---

### 1.1 Welcome Screen

#### Layout Structure
```
┌─────────────────────────────────────┐
│                                      │
│        [Waza Logo - Simple W]        │
│                                      │
│    Build Wealth, Your Way           │
│    Jenga utajiri, njia yako          │
│                                      │
│    [Visual: Minimalist growth line]  │
│                                      │
│                                      │
│    [ Get Started ]                   │
│    [ I have an account ]             │
│                                      │
│    🛡️  CMSA Regulated                │
│    🔒  Bank-level security           │
│                                      │
│    [ English | Kiswahili ]           │
└─────────────────────────────────────┘
```

#### Spacing
- Top padding: 20% of screen height
- Logo size: 64px × 64px
- Title: text-4xl, mb-3
- Subtitle: text-base, mb-12
- Button gap: 12px
- Trust badges: mt-16, text-xs

#### Motion
```tsx
// Staggered entry
Logo:     { delay: 0,    duration: 0.6, y: 20 → 0 }
Title:    { delay: 0.2,  duration: 0.6, y: 20 → 0 }
Buttons:  { delay: 0.4,  duration: 0.6, y: 20 → 0 }
Trust:    { delay: 0.6,  duration: 0.6, opacity: 0 → 1 }
```

#### States
- **Initial**: Staggered fade-in
- **Language switch**: Crossfade text (300ms)
- **Button tap**: Scale down to 0.97, immediate navigation
- **Loading**: Blur out entire screen, spinner center

---

### 1.2 Language Selection (If not set)

#### Layout
```
┌─────────────────────────────────────┐
│  ←                                   │
│                                      │
│  Choose Your Language                │
│  Chagua Lugha Yako                   │
│                                      │
│  ┌─────────────────────────────┐    │
│  │  🇬🇧  English                │    │
│  │                               │    │
│  │  Clear financial insights     │    │
│  └─────────────────────────────┘    │
│                                      │
│  ┌─────────────────────────────┐    │
│  │  🇹🇿  Kiswahili              │    │
│  │                               │    │
│  │  Maarifa wazi ya kifedha      │    │
│  └─────────────────────────────┘    │
│                                      │
│  You can change this anytime         │
└─────────────────────────────────────┘
```

#### Card Design
- Border: 2px solid zinc-200
- Hover: border-black, shadow-sm
- Selected: border-black, bg-zinc-50
- Padding: p-6
- Transition: 200ms ease-out

---

### 1.3 Goal Selection

#### Layout
```
┌─────────────────────────────────────┐
│  Progress: ●●○○○                    │
│                                      │
│  What brings you here?               │
│  Je, ni nini kinachokuja hapa?       │
│                                      │
│  Select one or more goals            │
│                                      │
│  ┌───────────────────┐               │
│  │ 🎯 Everyday Growth│  [Selected]   │
│  │ Ukuaji wa Kila Siku│               │
│  │ Build wealth daily │               │
│  └───────────────────┘               │
│                                      │
│  ┌───────────────────┐               │
│  │ 🛡️ Retirement Vault│               │
│  │ ...                │               │
│  └───────────────────┘               │
│                                      │
│  [ Continue ]                        │
└─────────────────────────────────────┘
```

#### Goal Cards
- Height: auto (min 120px)
- Icon size: 32px
- Title: text-lg font-medium
- Subtitle: text-sm text-zinc-600
- Multi-select: Checkbox (top-right)
- Animation: Tap → scale(0.98), border-black

#### Progressive Disclosure
- **Step 1**: Goal selection (show 4 main goals)
- **Step 2**: Time horizon (1 year / 5 years / 10+ years)
- **Step 3**: Risk comfort (visual scale, no jargon)
- **Step 4**: Experience level (Beginner / Comfortable / Advanced)

---

### 1.4 Risk Comfort Screen

#### Layout
```
┌─────────────────────────────────────┐
│  Progress: ●●●○○                    │
│                                      │
│  How do market changes feel?         │
│  Je, mabadiliko ya soko                 │
│  yanasikiaje?                        │
│                                      │
│  ┌─────────────────────────────┐    │
│  │                               │    │
│  │   [Visual: Calm wave]         │    │
│  │                               │    │
│  │   I prefer steady growth      │    │
│  │   Napendelea ukuaji thabiti   │    │
│  │                               │    │
│  │   ○                           │    │
│  └─────────────────────────────┘    │
│                                      │
│  ┌─────────────────────────────┐    │
│  │   [Visual: Balanced line]     │    │
│  │   I can handle some ups/downs │    │
│  │   ...                         │    │
│  └─────────────────────────────┘    │
│                                      │
│  ┌─────────────────────────────┐    │
│  │   [Visual: Variable curve]    │    │
│  │   I'm comfortable with volatility│  │
│  │   ...                         │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

#### Visual Language
- Use **graphs**, not words like "aggressive"
- Show **emotional response** ("This feels comfortable")
- No red/green; use **line variations** only
- Selected state: Bold border, slight bg tint

---

### 1.5 Trust & Security Screen

#### Layout
```
┌─────────────────────────────────────┐
│  Your security matters               │
│  Usalama wako una umuhimu            │
│                                      │
│  ┌─────────────────────────────┐    │
│  │  🛡️                           │    │
│  │  Regulated by CMSA            │    │
│  │  Tanzania Capital Markets     │    │
│  │  & Securities Authority       │    │
│  └─────────────────────────────┘    │
│                                      │
│  ┌─────────────────────────────┐    │
│  │  🔒                           │    │
│  │  Bank-level encryption        │    │
│  │  Your data is protected       │    │
│  └─────────────────────────────┘    │
│                                      │
│  ┌─────────────────────────────┐    │
│  │  🏦                           │    │
│  │  Funds held in custody        │    │
│  │  Separated from our accounts  │    │
│  └─────────────────────────────┘    │
│                                      │
│  [ Continue to Dashboard ]           │
└─────────────────────────────────────┘
```

#### Tone
- **Reassuring**, not alarming
- Use passive voice ("Your funds are protected")
- Icons: Simple, not corporate

---

## 2️⃣ DASHBOARD (HOME)

### Design Goals
- Answer: "Am I on track?" in 1 second
- Show AI insight without overwhelming
- Enable 1-tap actions
- Support calm daily ritual

---

### 2.1 Default State

#### Layout Hierarchy
```
┌─────────────────────────────────────┐
│  [W] Waza        🔔 👤              │  ← Header (sticky)
├─────────────────────────────────────┤
│  Good morning, Sarah                │  ← Greeting
│  Habari za asubuhi, Sarah            │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐    │
│  │  Your Wealth                 │    │  ← Hero Card
│  │                              │    │
│  │  TZS 4.75M      ↗ +11.3%   │    │
│  │                              │    │
│  │  ━━━━━━━━━━━━━━━━━━━━━    │    │  ← Sparkline
│  │                              │    │
│  │  ● On track                  │    │  ← Status
│  └─────────────────────────────┘    │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐    │
│  │  ✨ Today's Insight          │    │  ← AI Card
│  │                              │    │
│  │  You're saving 15% more      │    │
│  │  than last quarter. Keep     │    │
│  │  this momentum going!        │    │
│  │                              │    │
│  │  [ Learn more → ]            │    │
│  └─────────────────────────────┘    │
├─────────────────────────────────────┤
│  Your Goals                          │  ← Goals Section
│                                      │
│  🎯 Everyday Growth                 │
│  TZS 2.5M · 83% to goal              │
│  ━━━━━━━━━━━━━━━━━━○○              │  ← Progress bar
│                                      │
│  🛡️ Retirement Vault                │
│  TZS 1.5M · On track                 │
│  ━━━━━━━━━━━━━━━━━━━━━             │
│                                      │
│  [ + Add Goal ]                      │
├─────────────────────────────────────┤
│  Quick Actions                       │
│  [Add Money] [Invest] [Markets]      │
└─────────────────────────────────────┘
```

#### Spacing (Mobile)
- Screen padding: px-6
- Section gaps: gap-6
- Card padding: p-8
- Hero card height: auto (min 240px)
- Goal card height: 88px
- Button height: 48px

#### Hero Card Design
```
Background:  white
Border:      1px solid zinc-200
Shadow:      none (hover: shadow-sm)
Radius:      rounded-2xl

Number:
  Size:        text-7xl (72px)
  Weight:      font-light (300)
  Tracking:    -0.02em
  Color:       black

Growth:
  Size:        text-lg
  Weight:      font-medium (500)
  Color:       green-600 (if positive)
  Icon:        TrendingUp (20px)

Status Dot:
  Size:        w-2 h-2
  Color:       green-500 (on track)
              amber-500 (attention)
              zinc-400 (no data)
  Pulse:       animate-pulse (subtle)
```

---

### 2.2 AI Insight Card States

#### Default State
```
┌─────────────────────────────────────┐
│  ✨ Today's Insight                  │
│                                      │
│  [Insight text in 2-3 sentences]     │
│                                      │
│  [ Learn more → ]                    │
└─────────────────────────────────────┘

Background: bg-zinc-50
Border: border-zinc-200
Icon: Sparkles, text-zinc-700
Text: text-sm, leading-relaxed
CTA: text-zinc-700, hover:text-black
```

#### Expanded State (Tap)
```
┌─────────────────────────────────────┐
│  ✨ Why this matters                 │
│                                  [×] │
│                                      │
│  [Insight text]                      │
│                                      │
│  [Graph or visual explanation]       │
│                                      │
│  What you can do:                    │
│  • Increase monthly contributions    │
│  • Review your portfolio balance     │
│  • Stay consistent                   │
│                                      │
│  [ Got it ]                          │
└─────────────────────────────────────┘

Background: white (full-screen modal)
Motion: Slide up from bottom (400ms)
Overlay: bg-black/40
```

#### Empty State (New User)
```
┌─────────────────────────────────────┐
│  ✨ Your AI coach is learning        │
│                                      │
│  Add funds to get personalized       │
│  insights about your wealth journey  │
│                                      │
│  [ Add Money ]                       │
└─────────────────────────────────────┘

Background: bg-blue-50
Border: border-blue-100
Text: text-blue-800
```

---

### 2.3 Goal Progress Cards

#### Design Variants

**On Track** (83%+)
```
┌─────────────────────────────────────┐
│  🎯  Everyday Growth                │
│      TZS 2,500,000                   │
│                                      │
│      ━━━━━━━━━━━━━━━━━━○○          │
│      83% to your TZS 3M goal         │
│                                      │
│      ● On track for May 2026         │
└─────────────────────────────────────┘

Dot: green-500
Progress bar: bg-black
Incomplete: bg-zinc-200
```

**Needs Attention** (50-82%)
```
┌─────────────────────────────────────┐
│  🛡️  Retirement Vault               │
│      TZS 800,000                     │
│                                      │
│      ━━━━━━━━━━○○○○○○○○            │
│      65% to your TZS 1.5M goal       │
│                                      │
│      ⚠ Add TZS 50K/mo to stay on track│
└─────────────────────────────────────┘

Dot: amber-500
Text: amber-700
CTA: "Add funds" button appears
```

**Off Track** (<50%)
```
┌─────────────────────────────────────┐
│  🏠  Home Down Payment               │
│      TZS 2,000,000                   │
│                                      │
│      ━━━━○○○○○○○○○○○○○○            │
│      28% to your TZS 10M goal        │
│                                      │
│      Let's adjust your timeline      │
│      [ Review Goal → ]               │
└─────────────────────────────────────┘

Tone: Supportive, not judgmental
CTA: Reassess, don't abandon
```

---

### 2.4 Empty State (First Time)

#### Layout
```
┌─────────────────────────────────────┐
│  [W] Waza        🔔 👤              │
├─────────────────────────────────────┤
│  Welcome to Waza                     │
│  Karibu Waza                         │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐    │
│  │                              │    │
│  │  [Minimalist illustration]   │    │
│  │                              │    │
│  │  Start your wealth journey   │    │
│  │                              │    │
│  │  1. Add money (M-Pesa/Bank)  │    │
│  │  2. Choose your goals        │    │
│  │  3. Track your progress      │    │
│  │                              │    │
│  │  [ Get Started ]             │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

#### Tone
- **Simple steps**, not overwhelming
- **Visual first** (illustration, not text walls)
- **One CTA**, clear next action

---

## 3️⃣ PORTFOLIO & CROSS-MARKET INVESTING

### Design Goals
- Unified view across 4 exchanges
- Simple, not trader-complex
- Clear holdings + performance
- Easy to search & filter

---

### 3.1 Portfolio Overview

#### Layout
```
┌─────────────────────────────────────┐
│  ←  Portfolio                        │
├─────────────────────────────────────┤
│  Total Value                         │
│  TZS 4,750,000       ↗ +12.3%      │
│                                      │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━    │  ← Growth chart
│                                      │
│  Today: +TZS 12,400 (↗ +0.26%)      │
├─────────────────────────────────────┤
│  Holdings                            │
│  [ All | DSE | NSE | USE | RSE ]     │  ← Filter tabs
│                                      │
│  ┌─────────────────────────────┐    │
│  │  Tanzania                    │    │  ← Region group
│  │                              │    │
│  │  CRDB Bank                   │    │
│  │  450 shares · TZS 202,500    │    │
│  │  ↗ +2.3%                     │    │
│  │                              │    │
│  │  Vodacom Tanzania            │    │
│  │  120 shares · TZS 106,800    │    │
│  │  ↘ -0.8%                     │    │
│  └─────────────────────────────┘    │
│                                      │
│  ┌─────────────────────────────┐    │
│  │  Kenya                       │    │
│  │  ...                         │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

#### Grouping Strategy
1. **Default**: Group by country
2. **Alternative**: Group by sector (tap to switch)
3. **Search**: Flat list, relevance sorted

#### Holding Card Design
```
Padding: p-4
Border: 1px solid zinc-200
Hover: border-zinc-400, cursor-pointer

Stock Name: text-base font-medium
Details: text-sm text-zinc-600
Price: text-2xl font-light
Change: text-sm with icon
```

---

### 3.2 Cross-Market Search

#### Layout
```
┌─────────────────────────────────────┐
│  ← [____________Search stocks______]│
├─────────────────────────────────────┤
│  Recent                              │
│  CRDB Bank · Vodacom · Safaricom     │
├─────────────────────────────────────┤
│  Popular in Tanzania                 │
│                                      │
│  CRDB Bank (DSE)                     │
│  TZS 450 · ↗ +2.3%                   │
│                                      │
│  Vodacom (DSE)                       │
│  TZS 890 · ↘ -0.8%                   │
│                                      │
│  ...                                 │
└─────────────────────────────────────┘
```

#### Search Results
```
┌─────────────────────────────────────┐
│  ← [crdb__________]   [×]            │
├─────────────────────────────────────┤
│  CRDB Bank                           │
│  DSE · TZS 450 · ↗ +2.3%            │
│                                      │
│  CRDB Insurance                      │
│  DSE · TZS 120 · → 0.0%             │
└─────────────────────────────────────┘

Motion: Results fade in (200ms)
Empty state: "No matches" with suggestion
```

---

### 3.3 Asset Detail View

#### Layout
```
┌─────────────────────────────────────┐
│  ←  CRDB Bank               [★]      │
│      DSE · Tanzania                  │
├─────────────────────────────────────┤
│  TZS 450                             │
│  ↗ +2.3% today                       │
│                                      │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━    │  ← Price chart
│                                      │
│  [ 1D | 1W | 1M | 1Y | All ]         │  ← Time selector
├─────────────────────────────────────┤
│  ✨ AI Analysis                      │
│     Strong fundamentals, consistent  │
│     dividend history. Suitable for   │
│     long-term holders.               │
├─────────────────────────────────────┤
│  About                               │
│  Tanzania's leading commercial bank  │
│  with 200+ branches nationwide.      │
│                                      │
│  Sector: Banking                     │
│  Market Cap: TZS 850B                │
│  P/E Ratio: 12.5                     │
│  Dividend Yield: 6.2%                │
├─────────────────────────────────────┤
│  Your Holdings                       │
│  450 shares · TZS 202,500            │
│  Avg. Cost: TZS 440                  │
│  Gain: +TZS 4,500 (+2.3%)           │
├─────────────────────────────────────┤
│  [ Buy ]  [ Schedule Trade ]         │
└─────────────────────────────────────┘
```

#### Progressive Disclosure
- **Fold 1**: Price, chart, AI insight
- **Fold 2**: About, fundamentals
- **Fold 3**: Holdings (if user owns)
- **Fold 4**: Related stocks

---

### 3.4 Smart Routing Indicator

#### When Displayed
- User searches across multiple exchanges
- Stock available on multiple markets
- Price arbitrage detected

#### Design
```
┌─────────────────────────────────────┐
│  💡 Best Execution                   │
│                                      │
│  We'll route your order to DSE       │
│  (best price: TZS 450.50)            │
│                                      │
│  Other markets:                      │
│  • NSE: KES 48 (≈ TZS 451)          │
│  • USE: UGX 1,680 (≈ TZS 452)       │
│                                      │
│  [ Learn about routing → ]           │
└─────────────────────────────────────┘

Background: bg-blue-50
Border: border-blue-200
Tone: Helpful, educational
```

---

## 4️⃣ SCHEDULED & CONDITIONAL TRADES

### Design Goals
- Wizard-style flow (not intimidating)
- Goal-based language
- Calendar/recurring UI
- Calm confirmation

---

### 4.1 Entry Point

#### From Stock Detail
```
┌─────────────────────────────────────┐
│  [ Buy Now ]  [ Schedule Trade ]     │
└─────────────────────────────────────┘

Tap "Schedule Trade" → Slide up modal
```

#### From Dashboard (Future Investment)
```
┌─────────────────────────────────────┐
│  Quick Actions                       │
│  [ Schedule Investment ]             │
└─────────────────────────────────────┘
```

---

### 4.2 Step 1: Select Asset

#### Layout
```
┌─────────────────────────────────────┐
│  Schedule Trade                  [×] │
├─────────────────────────────────────┤
│  What do you want to invest in?      │
│                                      │
│  [Search stocks or baskets_______]   │
│                                      │
│  Popular Choices                     │
│                                      │
│  ○ CRDB Bank (DSE)                   │
│  ○ Tanzania Growth Basket (15 stocks)│
│  ○ East Africa Blend (25 stocks)     │
│                                      │
│  [ Continue ]                        │
└─────────────────────────────────────┘
```

---

### 4.3 Step 2: Choose Amount

#### Layout
```
┌─────────────────────────────────────┐
│  Schedule Trade              [×] [<] │
│  CRDB Bank (DSE)                     │
├─────────────────────────────────────┤
│  How much?                           │
│                                      │
│  TZS [100,000__________]             │
│                                      │
│  Quick amounts:                      │
│  [50K] [100K] [250K] [500K]          │
│                                      │
│  This will buy ≈ 222 shares          │
│  at current price (TZS 450)          │
│                                      │
│  [ Continue ]                        │
└─────────────────────────────────────┘

Input: Large, clear, autofocus
Calculation: Real-time, below input
```

---

### 4.4 Step 3: Set Schedule

#### Layout
```
┌─────────────────────────────────────┐
│  Schedule Trade              [×] [<] │
├─────────────────────────────────────┤
│  When should this happen?            │
│                                      │
│  ○ Once (specific date)              │
│  ● Recurring                         │
│  ○ When price reaches target         │
│                                      │
│  ┌─────────────────────────────┐    │
│  │  Frequency                   │    │
│  │  [ Weekly ▼ ]                │    │
│  │                              │    │
│  │  On                          │    │
│  │  [ Monday ▼ ]                │    │
│  │                              │    │
│  │  Starting                    │    │
│  │  [ Jan 20, 2026 ]            │    │
│  └─────────────────────────────┘    │
│                                      │
│  [ Continue ]                        │
└─────────────────────────────────────┘

Frequency options:
  • Weekly
  • Bi-weekly (every 2 weeks)
  • Monthly
  • Quarterly
```

---

### 4.5 Step 4: Conditional (Optional)

#### Layout
```
┌─────────────────────────────────────┐
│  Add a condition?            [×] [<] │
├─────────────────────────────────────┤
│  Only execute if:                    │
│                                      │
│  ○ No condition                      │
│  ● Price is at or below target       │
│  ○ Price is at or above target       │
│                                      │
│  ┌─────────────────────────────┐    │
│  │  Target Price                │    │
│  │                              │    │
│  │  TZS [445______]             │    │
│  │                              │    │
│  │  Current: TZS 450            │    │
│  │  ↓ -1.1% below               │    │
│  │                              │    │
│  │  ℹ️  Order executes only if   │    │
│  │     price drops to 445        │    │
│  └─────────────────────────────┘    │
│                                      │
│  [ Continue ]                        │
└─────────────────────────────────────┘

Language: Plain English/Swahili
Visual: Show comparison (current vs. target)
```

---

### 4.6 Step 5: Review & Confirm

#### Layout
```
┌─────────────────────────────────────┐
│  Review Trade               [×] [<]  │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐    │
│  │  CRDB Bank (DSE)             │    │
│  │  TZS 100,000                 │    │
│  │                              │    │
│  │  Schedule                    │    │
│  │  Every Monday, starting      │    │
│  │  Jan 20, 2026                │    │
│  │                              │    │
│  │  Condition                   │    │
│  │  Only if price ≤ TZS 445     │    │
│  └─────────────────────────────┘    │
│                                      │
│  ℹ️  This is a scheduled order.      │
│     Funds will be deducted when      │
│     the trade executes.              │
│                                      │
│  [ Edit ]    [ Confirm Trade ]       │
└─────────────────────────────────────┘

Summary: Card format, scannable
Disclaimer: Clear, not scary
CTA: "Confirm Trade" (not "Submit")
```

---

### 4.7 Confirmation Screen

#### Layout
```
┌─────────────────────────────────────┐
│                                      │
│         ✓                            │
│                                      │
│  Trade Scheduled                     │
│  Biashara Imepangwa                  │
│                                      │
│  Your recurring investment in        │
│  CRDB Bank starts Jan 20, 2026       │
│                                      │
│  [ View Schedule ]  [ Done ]         │
└─────────────────────────────────────┘

Motion: Checkmark draws (500ms)
Confetti: Subtle, 3-second duration
Tone: Encouraging
```

---

### 4.8 Scheduled Trades Management

#### Layout
```
┌─────────────────────────────────────┐
│  ←  Scheduled Trades                 │
├─────────────────────────────────────┤
│  Active (2)                          │
│                                      │
│  ┌─────────────────────────────┐    │
│  │  ⏰  Every Monday              │    │
│  │                              │    │
│  │  CRDB Bank                   │    │
│  │  TZS 100,000                 │    │
│  │                              │    │
│  │  Next: Jan 20, 2026          │    │
│  │  Condition: ≤ TZS 445        │    │
│  │                              │    │
│  │  [ Pause ] [ Edit ] [ Cancel ]│   │
│  └─────────────────────────────┘    │
│                                      │
│  ┌─────────────────────────────┐    │
│  │  ⏰  Monthly                  │    │
│  │  ...                         │    │
│  └─────────────────────────────┘    │
│                                      │
│  Completed (12)                      │
│  [ View History ]                    │
└─────────────────────────────────────┘

Card actions: Clear, reversible
History: Collapsed by default
```

---

## 5️⃣ SIMULATION & SCENARIO BUILDER

### Design Goals
- Playful but educational
- Immediate visual feedback
- Confidence bands (not false precision)
- AI explains the math

---

### 5.1 Entry Points

1. **From Goal Card** → "What if I add more?"
2. **From Dashboard** → Quick Action
3. **From Onboarding** → "See your future"

---

### 5.2 Simulator Layout

#### Default View
```
┌─────────────────────────────────────┐
│  ←  Scenario Builder                 │
├─────────────────────────────────────┤
│  Everyday Growth Goal                │
│  Current: TZS 2.5M → Target: 3M      │
├─────────────────────────────────────┤
│  Monthly Contribution                │
│  ┌───────────────────────────┐      │
│  │  ○────────────●           │      │  ← Slider
│  │  0           50K         200K│      │
│  └───────────────────────────┘      │
│                                      │
│  Time Horizon                        │
│  ┌───────────────────────────┐      │
│  │  ○────●───────────────    │      │
│  │  1yr  3yr  5yr   10yr  20yr│      │
│  └───────────────────────────┘      │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐    │
│  │                              │    │
│  │  [Projection graph]          │    │  ← Live updates
│  │  Area with confidence bands  │    │
│  │                              │    │
│  └─────────────────────────────┘    │
│                                      │
│  Projected Value                     │
│  TZS 4.2M – 5.8M                     │
│  by Dec 2028                         │
├─────────────────────────────────────┤
│  ✨ AI Insight                       │
│     With TZS 50K/month, you'll       │
│     reach your goal 8 months early   │
│                                      │
│  [ Apply Changes ]  [ Reset ]        │
└─────────────────────────────────────┘
```

#### Slider Design
```
Track height: 4px
Thumb size: 24px
Active thumb: 28px, shadow
Color: black (not blue)
Snap points: Every 10K
Haptic: Light tap at snap
```

---

### 5.3 Projection Graph

#### Design
```
Type: Area chart with confidence bands
X-axis: Time (months/years)
Y-axis: Value (TZS)

Elements:
• Current value: Solid dot
• Projection line: Medium thickness
• Confidence band: 20% opacity fill
• Grid: Minimal horizontal lines only
• Labels: Values at start + end only

Colors:
• Line: black
• Band: zinc-200
• Current dot: green-500
```

#### Motion
```tsx
// Slider change → Graph updates
transition={{
  type: "spring",
  stiffness: 50,
  damping: 20
}}

// Smooth curve drawing
pathLength: 0 → 1
duration: 800ms
ease: "easeInOut"
```

---

### 5.4 AI Explanation Card

#### Variants

**Positive Scenario**
```
┌─────────────────────────────────────┐
│  ✨ This scenario works              │
│                                      │
│  With TZS 50K/month and 8% annual    │
│  returns, you'll reach TZS 3M by     │
│  Sep 2027 (8 months early!)          │
│                                      │
│  Confidence: High                    │
└─────────────────────────────────────┘

Background: bg-green-50
Border: border-green-200
```

**Stretch Scenario**
```
┌─────────────────────────────────────┐
│  ⚠️  Ambitious target                │
│                                      │
│  Reaching TZS 3M in 1 year requires  │
│  TZS 180K/month. Consider extending  │
│  your timeline to 2 years.           │
│                                      │
│  [ Adjust Timeline ]                 │
└─────────────────────────────────────┘

Background: bg-amber-50
Tone: Supportive, not discouraging
```

**Unrealistic Scenario**
```
┌─────────────────────────────────────┐
│  🤔 Let's adjust                     │
│                                      │
│  This goal needs TZS 500K/month,     │
│  which is higher than your income.   │
│                                      │
│  [ Reduce Goal ] [ Extend Time ]     │
└─────────────────────────────────────┘

Tone: Gentle reality check
```

---

### 5.5 Apply Changes Flow

#### Confirmation
```
┌─────────────────────────────────────┐
│  Apply changes to your goal?         │
│                                      │
│  Your new plan:                      │
│  • Monthly: TZS 50,000               │
│  • Target: TZS 3,000,000             │
│  • Timeline: Sep 2027                │
│                                      │
│  We'll remind you to stay on track   │
│                                      │
│  [ Cancel ]  [ Apply ]               │
└─────────────────────────────────────┘
```

#### Success
```
┌─────────────────────────────────────┐
│           ✓                          │
│                                      │
│  Goal Updated                        │
│                                      │
│  Your new plan is active. We'll      │
│  send a reminder on the 1st of       │
│  each month.                         │
│                                      │
│  [ View Goal ]  [ Done ]             │
└─────────────────────────────────────┘
```

---

## 6️⃣ DIVIDEND CALENDAR & INCOME FORECAST

### Design Goals
- Calendar-first view
- Income summary prominent
- Reminders opt-in
- Serene visuals

---

### 6.1 Main View

#### Layout
```
┌─────────────────────────────────────┐
│  ←  Dividend Calendar                │
├─────────────────────────────────────┤
│  Expected This Quarter               │
│  TZS 42,500                          │  ← Hero number
│  ↗ +8.2% vs. last quarter            │
├─────────────────────────────────────┤
│  [ Q1 | Q2 | Q3 | Q4 ]               │  ← Quarter tabs
├─────────────────────────────────────┤
│  Upcoming                            │
│                                      │
│  ┌─────────────────────────────┐    │
│  │  Jan 15 · CRDB Bank          │    │
│  │  TZS 12,000                  │    │
│  │  6.2% yield                  │    │
│  │                              │    │
│  │  [🔔 Remind me]               │    │
│  └─────────────────────────────┘    │
│                                      │
│  ┌─────────────────────────────┐    │
│  │  Jan 22 · Vodacom Tanzania   │    │
│  │  TZS 8,500                   │    │
│  │  5.8% yield                  │    │
│  │                              │    │
│  │  [🔔 Remind me]               │    │
│  └─────────────────────────────┘    │
│                                      │
│  ┌─────────────────────────────┐    │
│  │  Feb 05 · NICO Insurance     │    │
│  │  TZS 22,000                  │    │
│  │  7.1% yield                  │    │
│  │                              │    │
│  │  [🔔 Remind me]               │    │
│  └─────────────────────────────┘    │
├─────────────────────────────────────┤
│  Annual Forecast                     │
│  TZS 180,000                         │
│  [ View Details → ]                  │
└─────────────────────────────────────┘
```

#### Spacing
- Hero number: text-6xl font-light
- Dividend cards: p-5, gap-3
- Calendar items: Chronological, not grid

---

### 6.2 Calendar Interaction

#### Tap Dividend Card → Expanded
```
┌─────────────────────────────────────┐
│  CRDB Bank Dividend              [×] │
├─────────────────────────────────────┤
│  Payment Date                        │
│  Jan 15, 2026                        │
│                                      │
│  Amount                              │
│  TZS 12,000                          │
│  (450 shares × TZS 26.67/share)      │
│                                      │
│  Yield                               │
│  6.2% annual                         │
│                                      │
│  Status                              │
│  ● Confirmed by company              │
│                                      │
│  ℹ️  Dividends are paid directly to   │
│     your Waza account 2-3 days after │
│     the payment date.                │
│                                      │
│  🔔 [Remind me 1 day before]         │
│                                      │
│  [ Got it ]                          │
└─────────────────────────────────────┘

Motion: Slide up modal
Tone: Informative, reassuring
```

---

### 6.3 Annual Forecast View

#### Layout
```
┌─────────────────────────────────────┐
│  ←  Annual Income Forecast           │
├─────────────────────────────────────┤
│  Expected Dividend Income            │
│  TZS 180,000                         │
│  for 2026                            │
│                                      │
│  ┌─────────────────────────────┐    │
│  │  [Monthly bar chart]         │    │
│  │  Jan Feb Mar Apr May Jun ... │    │
│  │  Shows expected dividends    │    │
│  └─────────────────────────────┘    │
│                                      │
│  By Quarter                          │
│  Q1: TZS 42,500                      │
│  Q2: TZS 45,000                      │
│  Q3: TZS 46,000                      │
│  Q4: TZS 46,500                      │
│                                      │
│  Top Dividend Stocks                 │
│  1. NICO Insurance · TZS 88,000      │
│  2. CRDB Bank · TZS 48,000           │
│  3. Vodacom Tanzania · TZS 34,000    │
├─────────────────────────────────────┤
│  ✨ AI Insight                       │
│     Your dividend income is growing  │
│     12% year-over-year. Consider     │
│     reinvesting to compound returns. │
│                                      │
│  [ Auto-Reinvest Dividends ]         │
└─────────────────────────────────────┘
```

---

### 6.4 Reminder Settings

#### Toggle Design
```
┌─────────────────────────────────────┐
│  Dividend Reminders                  │
│                                      │
│  Upcoming payments       [●──○]      │  ← Toggle
│  Notify 1 day before                 │
│                                      │
│  Weekly summary          [○──○]      │
│  Every Monday morning                │
│                                      │
│  Annual forecast         [●──○]      │
│  At start of each year               │
└─────────────────────────────────────┘

Toggle states:
  Off: bg-zinc-200, circle left
  On:  bg-black, circle right
  Motion: Smooth slide (200ms)
```

---

### 6.5 Empty State

#### Layout
```
┌─────────────────────────────────────┐
│  ←  Dividend Calendar                │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐    │
│  │                              │    │
│  │  [Minimalist calendar icon]  │    │
│  │                              │    │
│  │  No dividends yet            │    │
│  │                              │    │
│  │  Invest in dividend-paying   │    │
│  │  stocks to start earning     │    │
│  │  passive income.             │    │
│  │                              │    │
│  │  [ Explore Dividend Stocks ] │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘

Tone: Encouraging, educational
CTA: Direct to curated list
```

---

## 7️⃣ SMART ALERTS & DAILY AI COACH

### Design Goals
- Contextual, not annoying
- Dismissible, never persistent
- Encouraging tone
- Low frequency (max 1/day)

---

### 7.1 Alert Types

#### 1. Daily Insight (Morning)
```
┌─────────────────────────────────────┐
│  ✨  Good morning, Sarah              │
│                                  [×] │
│  Your wealth grew TZS 12,000         │
│  overnight. Keep this momentum!      │
│                                      │
│  [ View Portfolio ]                  │
└─────────────────────────────────────┘

Timing: 8:00 AM local
Frequency: 3-4x/week (not daily)
Tone: Encouraging, casual
```

#### 2. Goal Progress Update
```
┌─────────────────────────────────────┐
│  🎯  Milestone reached!               │
│                                  [×] │
│  You're now 90% to your Everyday     │
│  Growth goal. Only TZS 300K to go!   │
│                                      │
│  [ View Goal ]                       │
└─────────────────────────────────────┘

Trigger: 50%, 75%, 90%, 100%
Celebratory: Confetti for 100%
```

#### 3. Weekly Summary
```
┌─────────────────────────────────────┐
│  📊  Your week in review              │
│                                  [×] │
│  Portfolio: +TZS 42,000 (+0.9%)      │
│  Contributions: TZS 100,000          │
│  Dividends: TZS 12,000               │
│                                      │
│  Great consistency this week!        │
│                                      │
│  [ View Details ]                    │
└─────────────────────────────────────┘

Timing: Sunday evening
Format: Card on dashboard (24hr lifespan)
```

#### 4. Scheduled Trade Executed
```
┌─────────────────────────────────────┐
│  ✓  Trade executed                   │
│                                  [×] │
│  Bought TZS 100,000 of CRDB Bank     │
│  at TZS 448 (condition met)          │
│                                      │
│  [ View Portfolio ]                  │
└─────────────────────────────────────┘

Trigger: Real-time (when trade happens)
Push notification: Yes (if enabled)
```

#### 5. Dividend Received
```
┌─────────────────────────────────────┐
│  💰  Dividend received                │
│                                  [×] │
│  TZS 12,000 from CRDB Bank added     │
│  to your account.                    │
│                                      │
│  [ View Dividend Calendar ]          │
└─────────────────────────────────────┘

Trigger: When dividend posts
Tone: Celebratory, not transactional
```

#### 6. Market Movement (Optional)
```
┌─────────────────────────────────────┐
│  📉  Market update                    │
│                                  [×] │
│  DSE dropped 2% today, but your      │
│  long-term goals are still on track. │
│                                      │
│  ℹ️  Short-term drops are normal.     │
│     Stay consistent.                 │
│                                      │
│  [ Learn More ]                      │
└─────────────────────────────────────┘

Trigger: >2% market move
Tone: Reassuring (prevents panic selling)
Opt-in: User can disable
```

---

### 7.2 Alert Card Design

#### Visual Specs
```
Position: Below hero card on dashboard
Padding: p-4
Border: 1px solid (color varies)
Radius: rounded-xl
Shadow: none
Motion: Slide down from top (400ms)

Dismiss button:
  Position: absolute top-3 right-3
  Size: w-6 h-6
  Icon: X (16px)
  Hover: bg-zinc-200
```

#### Color Coding
```
Default (insight):     bg-zinc-50, border-zinc-200
Positive (milestone):  bg-green-50, border-green-200
Info (update):         bg-blue-50, border-blue-200
Attention (market):    bg-amber-50, border-amber-200
```

---

### 7.3 Push Notification Design

#### Notification Content
```
Title: [Emoji] Short title (30 chars max)
Body:  Actionable summary (100 chars max)
CTA:   "View" or "Open Waza"

Examples:

✨ Daily Insight
Your wealth grew TZS 12K overnight
[View Portfolio]

🎯 Milestone Reached!
You're 90% to your goal. Almost there!
[View Goal]

✓ Trade Executed
Bought TZS 100K of CRDB Bank at 448
[View Details]
```

#### Frequency Limits
```
Max per day: 2 notifications
Max per week: 7 notifications
User control: Settings → Notifications
  • Daily insights: On/Off
  • Trade alerts: On/Off
  • Dividend alerts: On/Off
  • Weekly summary: On/Off
```

---

### 7.4 AI Coach Settings

#### Layout
```
┌─────────────────────────────────────┐
│  ←  AI Coach Settings                │
├─────────────────────────────────────┤
│  Insights                            │
│                                      │
│  Daily insights          [●──○]      │
│  Morning wealth updates              │
│                                      │
│  Goal progress           [●──○]      │
│  Milestone notifications             │
│                                      │
│  Weekly summary          [●──○]      │
│  Every Sunday evening                │
│                                      │
│  Market updates          [○──○]      │
│  When market moves >2%               │
├─────────────────────────────────────┤
│  Tone                                │
│  [ Encouraging | Neutral | Minimal ] │
│                                      │
│  Encouraging: Positive, motivating   │
│  Neutral: Factual, no emotion        │
│  Minimal: Critical updates only      │
└─────────────────────────────────────┘
```

---

## 🌐 BILINGUAL MICROCOPY

### Export Format
All microcopy is available in:
- JSON file (structured data)
- CSV (for translation teams)
- Component-level (embedded)

### Coverage
- All button labels
- All placeholder text
- All success/error messages
- All AI insight variations
- All onboarding steps

See separate file: `WAZA_MICROCOPY.json`

---

## 📐 UI STATES MATRIX

### Every Screen Includes:

1. **Initial Load**
   - Loading spinner or skeleton
   - Fade-in animation

2. **Empty State**
   - Illustration + helpful message
   - Clear CTA to populate

3. **Error State**
   - Friendly error message
   - Retry button
   - Contact support link

4. **Success State**
   - Checkmark animation
   - Confirmation message
   - Next action CTA

5. **Hover/Tap Feedback**
   - Scale down (0.98)
   - Border color change
   - Shadow appearance

6. **Loading State**
   - Button: Spinner replaces text
   - Cards: Skeleton with pulse
   - Full screen: Centered spinner

---

## 🎨 DESIGN TOKENS

### Spacing
```
Base: 4px
xs:   8px   (gap-2)
sm:   12px  (gap-3)
md:   16px  (gap-4)
lg:   24px  (gap-6)
xl:   32px  (gap-8)
2xl:  48px  (gap-12)
3xl:  64px  (gap-16)
```

### Typography
```
Micro:    12px / font-normal
Caption:  14px / font-normal
Body:     16px / font-normal
Lead:     18px / font-medium
Large:    24px / font-light
Huge:     48px / font-light
Hero:     72px / font-light (300)
```

### Borders
```
Default:   1px solid zinc-200
Hover:     1px solid zinc-400
Active:    2px solid black
Focus:     2px solid black + ring-2 ring-zinc-100
```

### Shadows
```
None:      shadow-none
Subtle:    shadow-sm (0 1px 2px rgba(0,0,0,0.05))
Card:      shadow-md (0 4px 6px rgba(0,0,0,0.07))
Modal:     shadow-2xl (0 25px 50px rgba(0,0,0,0.15))
```

### Motion
```
Fast:      200ms ease-out
Standard:  400ms ease-out
Slow:      600ms ease-in-out
Spring:    type: "spring", stiffness: 300, damping: 30
```

---

## ✅ IMPLEMENTATION CHECKLIST

### Phase 1: Core Refinements
- [ ] Update spacing tokens (8/16/24/32)
- [ ] Refine typography scale
- [ ] Implement consistent card design
- [ ] Add motion to all interactions
- [ ] Create loading/empty/error states

### Phase 2: Onboarding
- [ ] Language selection screen
- [ ] Goal selection with visuals
- [ ] Risk comfort (graph-based)
- [ ] Trust & security screen
- [ ] Welcome flow

### Phase 3: Dashboard
- [ ] Hero wealth card
- [ ] AI insight card (dismissible)
- [ ] Goal progress cards
- [ ] Empty state
- [ ] Daily coach

### Phase 4: Portfolio
- [ ] Cross-market view
- [ ] Search with filters
- [ ] Asset detail screens
- [ ] Smart routing indicator

### Phase 5: Trading
- [ ] Scheduled trade wizard
- [ ] Conditional orders
- [ ] Calendar picker
- [ ] Review & confirm
- [ ] Management screen

### Phase 6: Scenario Builder
- [ ] Slider-based inputs
- [ ] Live projection graph
- [ ] AI explanations
- [ ] Apply changes flow

### Phase 7: Dividends
- [ ] Calendar view
- [ ] Upcoming payments
- [ ] Annual forecast
- [ ] Reminder settings

### Phase 8: AI Coach
- [ ] Alert card system
- [ ] Push notifications
- [ ] Settings screen
- [ ] Tone customization

---

**Document Version**: 1.0  
**Last Updated**: January 15, 2026  
**Status**: Ready for Implementation
