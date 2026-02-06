# WAZA WEALTH — Design System v2.0
**Inspired by Vesto | Built for Tanzania**

---

## 🎨 Visual Language

### Core Principles
1. **Calm Confidence** — Large numbers, minimal noise, generous space
2. **Goal-First** — Every screen answers "Am I on track?"
3. **AI as Guide** — Intelligence visible, not intrusive
4. **Trust Through Clarity** — No hidden complexity

---

## 🎨 Color System

### Primary Palette
```
Black         #000000   — Primary text, CTAs, emphasis
White         #FFFFFF   — Backgrounds, cards
Zinc 950      #09090B   — Deep backgrounds (alternative)
Zinc 900      #18181B   — Secondary elements
Zinc 100      #F4F4F5   — Subtle backgrounds
Zinc 200      #E4E4E7   — Borders (default)
Zinc 400      #A1A1AA   — Secondary text
Zinc 500      #71717A   — Disabled states
```

### Accent Colors (Minimal Use)
```
Green         #16A34A   — Positive growth, on-track
Emerald 50    #ECFDF5   — Positive backgrounds
Red           #DC2626   — Critical alerts only
Amber         #F59E0B   — Attention needed
Blue          #2563EB   — AI insights, informational
```

### Usage Rules
- **90% Black & White** — Core interface
- **8% Grays** — Dividers, secondary info
- **2% Accent** — Only for meaning (growth, alerts, AI)

---

## ✍️ Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 
             'Inter', 'Segoe UI', system-ui, sans-serif;
```

### Scale
```
Hero Number       text-7xl   font-light   (72px, 300 weight)
Large Number      text-5xl   font-light   (48px, 300 weight)
Section Title     text-2xl   font-light   (24px, 300 weight)
Card Title        text-lg    font-medium  (18px, 500 weight)
Body              text-base  font-normal  (16px, 400 weight)
Caption           text-sm    font-normal  (14px, 400 weight)
Micro             text-xs    font-normal  (12px, 400 weight)
```

### Hierarchy Rules
- **Big = Important** — Wealth total is largest on screen
- **Light = Calm** — Use font-weight 300 for large numbers
- **Medium = Action** — Button labels, card titles use 500
- **Tracking** — `-0.02em` for large numbers, `0` for body

---

## 📐 Spacing System

### Scale (Tailwind)
```
2px    0.5     Subtle dividers
4px    1       Tight spacing
8px    2       Icon-text gaps
12px   3       Card inner padding (compact)
16px   4       Standard gaps
24px   6       Card padding, section margins
32px   8       Large card padding
48px   12      Section breaks
64px   16      Screen-level spacing
```

### Layout Grid
- **Mobile**: 16px margins, 12px gaps
- **Tablet**: 24px margins, 16px gaps
- **Desktop**: max-w-7xl container, 24px gaps

---

## 🃏 Components

### 1. **Hero Wealth Card**
```
┌─────────────────────────────────────┐
│  Your Wealth                         │
│                                      │
│  TZS 4.75M              ↗ +11.3%   │
│                                      │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │ ← Minimal graph
│                                      │
│  On track · Next goal: TZS 6M       │ ← AI insight
└─────────────────────────────────────┘

Design:
- bg-white, border-zinc-200, p-8
- Wealth number: text-7xl font-light
- Growth: text-lg, green-600
- Graph: Stroke-only, no grid, smooth curve
- AI insight: text-sm text-zinc-600, subtle sparkle icon
```

### 2. **Purpose Account Card**
```
┌─────────────────────────────────────┐
│  🎯  Everyday Growth                │
│      TZS 2,500,000                   │
│      +12.5% this year                │
│                                      │
│      ━━━━━━━━━━━━━━━━━━━━━━━━     │ ← Progress bar
│      83% to your TZS 3M goal         │
└─────────────────────────────────────┘

Design:
- Hover: border-zinc-400, slight shadow
- Icon: 40px circle, bg-zinc-100
- Amount: text-3xl font-light
- Progress bar: h-1.5, rounded-full
```

### 3. **AI Insight Card** (Vesto-inspired)
```
┌─────────────────────────────────────┐
│  ✨  AI Insight                      │
│                                      │
│  You're saving 15% more this month  │
│  than last quarter. Keep going!     │
│                                      │
│  [ View Forecast → ]                 │
└─────────────────────────────────────┘

Design:
- bg-blue-50, border-blue-100
- Icon: Sparkles, text-blue-600
- Text: text-sm leading-relaxed
- CTA: text-blue-700 font-medium
```

### 4. **Market Card** (Cross-Market Trading)
```
┌─────────────────────────────────────┐
│  DSE · Dar es Salaam                │
│                                      │
│  CRDB Bank                  ↗ +2.3% │
│  TZS 450                             │
│                                      │
│  [ Quick Buy ]  [ + Watchlist ]      │
└─────────────────────────────────────┘

Design:
- Compact, scannable
- Stock name: text-base font-medium
- Price: text-2xl font-light
- Buttons: h-10, minimal, ghost style
```

### 5. **Scheduled Trade Card**
```
┌─────────────────────────────────────┐
│  ⏰  Scheduled for Dec 20, 2026      │
│                                      │
│  Buy TZS 100,000 → DSE Index Basket │
│  When price ≤ TZS 2,450              │
│                                      │
│  [ Edit ]  [ Cancel ]                │
└─────────────────────────────────────┘

Design:
- bg-amber-50, border-amber-200
- Clock icon: text-amber-600
- Condition: text-sm text-zinc-700
```

---

## 📱 Key Screens

### 1. **Dashboard (Home)**

```
┌─────────────────────────────────────┐
│  [W]  Waza                [🔔] [👤] │  ← Header
├─────────────────────────────────────┤
│                                      │
│  Your Wealth                         │
│  TZS 4.75M              ↗ +11.3%   │  ← Hero
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━     │
│                                      │
├─────────────────────────────────────┤
│  ✨  You're ahead of schedule        │  ← AI insight
│      Your retirement goal is on      │
│      track to complete 2 years early │
├─────────────────────────────────────┤
│  Your Accounts                       │  ← Purpose cards
│                                      │
│  🎯  Everyday Growth                │
│      TZS 2.5M    +12.5%              │
│                                      │
│  🛡️  Retirement Vault               │
│      TZS 1.5M    +8.2%               │
│                                      │
│  [ + Add Money ]  [ Invest ]         │  ← Quick actions
├─────────────────────────────────────┤
│  [Home] [Markets] [Goals] [Profile]  │  ← Bottom nav
└─────────────────────────────────────┘

Spacing:
- px-6, py-4 (mobile)
- Gap-6 between sections
- Cards: p-6, rounded-2xl
```

### 2. **Cross-Market Trading Screen**

```
┌─────────────────────────────────────┐
│  ←  Markets                   [🔍]   │
├─────────────────────────────────────┤
│  [DSE] [NSE] [USE] [RSE] [All]      │  ← Market tabs
├─────────────────────────────────────┤
│  🔥  Trending in Tanzania            │
│                                      │
│  CRDB Bank          TZS 450  ↗+2.3% │
│  Vodacom            TZS 890  ↘-0.8% │
│  NICO Insurance     TZS 1,200 ↗+5.1%│
│                                      │
│  📊  Regional Indexes                │
│                                      │
│  DSE All Share      +1.2%            │
│  NSE 20            +0.8%            │
│  EAC Composite     +1.5%            │
│                                      │
│  🎯  One-Tap Baskets                 │
│                                      │
│  Tanzania Growth    15 stocks       │
│  East Africa Blend  25 stocks       │
│  Dividend Leaders   12 stocks       │
└─────────────────────────────────────┘

Interactions:
- Tap card → Stock detail
- Swipe tabs → Switch market
- Pull-to-refresh → Update prices
```

### 3. **Stock Detail + Scheduled Trade**

```
┌─────────────────────────────────────┐
│  ←  CRDB Bank                  [★]   │
├─────────────────────────────────────┤
│  TZS 450                             │  ← Current price
│  ↗ +2.3% today                       │
│                                      │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━     │  ← Spark chart
│                                      │
│  [ Buy Now ]  [ Schedule Trade ]     │  ← Primary actions
├─────────────────────────────────────┤
│  ✨  AI Analysis                     │
│      CRDB has strong fundamentals    │
│      and consistent dividend history │
│                                      │
│  📈  Performance                     │
│      1W: +1.2%  1M: +4.5%  1Y: +18%  │
│                                      │
│  💰  Dividend                        │
│      Next: Jan 15 · Yield: 6.2%      │
└─────────────────────────────────────┘

Scheduled Trade Modal:
┌─────────────────────────────────────┐
│  Schedule Trade                  [×] │
├─────────────────────────────────────┤
│  Amount                              │
│  TZS [100,000___]                    │
│                                      │
│  Condition (Optional)                │
│  ○ Buy Immediately                   │
│  ● When price ≤ TZS 445              │
│  ○ On specific date                  │
│                                      │
│  [ Schedule Trade ]                  │
└─────────────────────────────────────┘
```

### 4. **Goal Detail Screen**

```
┌─────────────────────────────────────┐
│  ←  Everyday Growth                  │
├─────────────────────────────────────┤
│  TZS 2,500,000                       │  ← Current value
│  Your goal: TZS 3,000,000            │
│                                      │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│  83% complete                        │
│                                      │
│  ✨  On track to reach by May 2026   │
├─────────────────────────────────────┤
│  📊  Your Growth Story               │
│  ┌─────────────────────────────┐    │
│  │     Smooth area chart       │    │  ← Story graph
│  │     with confidence bands   │    │
│  └─────────────────────────────┘    │
│                                      │
│  💡  Scenario: What if you add       │
│      TZS 50,000/month?               │
│      → Reach goal 4 months early     │
│                                      │
│  [ Add Money ]  [ Adjust Goal ]      │
└─────────────────────────────────────┘
```

### 5. **Dividend Calendar**

```
┌─────────────────────────────────────┐
│  ←  Dividend Calendar                │
├─────────────────────────────────────┤
│  Expected This Quarter               │
│  TZS 42,500                          │  ← Hero number
│                                      │
│  Upcoming Payments                   │
│                                      │
│  Jan 15 · CRDB Bank                  │
│  TZS 12,000                          │
│                                      │
│  Jan 22 · Vodacom                    │
│  TZS 8,500                           │
│                                      │
│  Feb 05 · NICO Insurance             │
│  TZS 22,000                          │
│                                      │
│  📈  Annual Forecast                 │
│      Your dividend income is on      │
│      track for TZS 180,000/year      │
└─────────────────────────────────────┘

Design:
- Calendar items: Minimal list, clear dates
- Amounts: text-xl font-light
- Forecast card: bg-blue-50
```

---

## 🎭 Motion Principles

### Animation Guidelines

1. **Page Transitions**
```tsx
// Slide up + fade
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.4, ease: "easeOut" }}
```

2. **Card Hover**
```tsx
// Lift + border
hover:border-zinc-400 
hover:shadow-sm 
transition-all duration-200
```

3. **Number Changes**
```tsx
// Count-up animation
<motion.span
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
```

4. **Graph Drawing**
```tsx
// Path stroke animation
strokeDasharray="1000"
strokeDashoffset="1000"
animate={{ strokeDashoffset: 0 }}
transition={{ duration: 2, ease: "easeInOut" }}
```

5. **AI Insight Appearance**
```tsx
// Gentle pop-in
initial={{ opacity: 0, y: 10, scale: 0.95 }}
animate={{ opacity: 1, y: 0, scale: 1 }}
transition={{ duration: 0.5, delay: 0.8 }}
```

---

## 🧭 User Flows

### Flow 1: Cross-Market Stock Purchase

```
Dashboard
  ↓ Tap "Markets"
Markets Screen (DSE selected)
  ↓ Tap "CRDB Bank"
Stock Detail
  ↓ Tap "Buy Now"
Quick Buy Modal
  ├─ Enter amount
  ├─ Review total
  └─ Confirm → Success
```

### Flow 2: Schedule Conditional Trade

```
Markets Screen
  ↓ Tap Stock
Stock Detail
  ↓ Tap "Schedule Trade"
Schedule Modal
  ├─ Enter amount
  ├─ Select condition: "When price ≤ X"
  ├─ Enter target price
  └─ Schedule → Confirmation
Dashboard
  ↓ Shows "Scheduled Trade" card
```

### Flow 3: One-Tap Regional Basket

```
Markets Screen
  ↓ Scroll to "One-Tap Baskets"
  ↓ Tap "East Africa Blend"
Basket Detail
  ├─ Shows: 25 stocks across DSE/NSE/USE/RSE
  ├─ Performance: +12.3% (1Y)
  ├─ Allocation pie chart
  └─ "Invest TZS X" button
Invest Modal
  ├─ Enter amount
  ├─ AI shows: "Diversified across 4 markets"
  └─ Confirm → Portfolio updated
```

### Flow 4: AI-Powered Goal Adjustment

```
Dashboard
  ↓ Tap "Everyday Growth" account
Goal Detail
  ↓ AI card appears: "Add TZS 50K/mo → reach 4mo early"
  ↓ Tap "Try This"
Scenario Builder
  ├─ Slider: Monthly addition
  ├─ Graph updates live
  └─ "Apply Changes" → Goal updated
```

---

## 🤖 AI Integration Points

### 1. **Daily Coach Card** (Behavioral Nudge)
```
Appears: 3 seconds after dashboard load
Frequency: Once per day
Triggers:
  - Morning: "Good morning! Your wealth grew TZS 12K overnight"
  - Inactivity: "You haven't added funds in 14 days. Small steps compound."
  - Milestone: "You're 90% to your goal. Almost there!"

Design:
- bg-zinc-50, border-zinc-200
- Sparkles icon, text-sm
- Dismissible (X button)
```

### 2. **Smart Alerts**
```
Alert Types:
  1. Price Target Hit: "CRDB reached TZS 445 — your scheduled trade executed"
  2. Dividend Paid: "TZS 12,000 dividend from CRDB added to your account"
  3. Market Movement: "DSE dropped 3% — your portfolio is protected by diversification"
  4. Goal Progress: "You're now 85% to your TZS 3M goal"

Design:
- Toast notification (top of screen)
- Auto-dismiss after 5 seconds
- Tap → Navigate to relevant screen
```

### 3. **Portfolio Health Check**
```
Appears: Weekly (Sundays)
Content:
  - "Your portfolio is well-diversified across 4 markets"
  - "You're on track for TZS 180K dividend income this year"
  - "Consider adding to Retirement Vault for tax benefits"

Design:
- Full-screen modal (dismissible)
- Checklist format
- CTA: "View Recommendations"
```

---

## 🎯 Behavioral Nudges

### 1. **First Investment Hesitation**
```
Trigger: User on stock detail screen for 8+ seconds
Action: Subtle AI card appears
Message: "Starting small is okay. Even TZS 10,000 compounds over time."
CTA: "Invest TZS 10,000"
```

### 2. **Consistency Encouragement**
```
Trigger: User completes 3rd consecutive monthly deposit
Action: Celebration micro-animation + card
Message: "3 months in a row! Consistency compounds more than timing."
Visual: Progress rings, confetti animation
```

### 3. **Downside Protection Reassurance**
```
Trigger: Market drops 2%+
Action: Proactive notification
Message: "Markets fluctuate. Your long-term goal is still on track."
Visual: Confidence bands on graph widen, then stabilize
```

### 4. **Goal Proximity Motivation**
```
Trigger: Goal reaches 90%
Action: Dashboard banner
Message: "You're TZS 300K away from your goal. One last push!"
Visual: Progress bar pulses gently
```

---

## 📐 Component States

### Button States
```tsx
// Primary
default:  bg-black text-white h-12 rounded-xl
hover:    bg-zinc-800
active:   bg-zinc-900 scale-95
disabled: bg-zinc-200 text-zinc-400

// Secondary
default:  border-2 border-zinc-300 bg-white
hover:    border-zinc-500
active:   bg-zinc-50
```

### Card States
```tsx
// Default
border-zinc-200 bg-white

// Hover (interactive)
hover:border-zinc-400 hover:shadow-sm

// Active/Selected
border-black shadow-md

// Loading
border-zinc-200 bg-zinc-50 animate-pulse
```

### Input States
```tsx
// Default
border-zinc-300 focus:border-black focus:ring-2 focus:ring-zinc-100

// Error
border-red-500 focus:ring-red-100

// Success
border-green-500 focus:ring-green-100
```

---

## 🌍 Localization Notes

### Swahili Translations (Key Terms)
```
Your Wealth       → Utajiri Wako
On Track          → Unafanya Vizuri
Goal              → Lengo
Add Money         → Ongeza Pesa
Invest            → Wekeza
Markets           → Masoko
Dividend          → Gawio
Scheduled Trade   → Biashara Iliyopangwa
```

### Number Formatting
```tsx
// Tanzania (Swahili)
TZS 4,750,000  (not 4.75M in formal contexts)
TZS 4.75M      (allowed in graphs/cards for space)

// Kenya
KES 450,000

// Regional
EAC Index (no currency, just %)
```

---

## ✅ Implementation Checklist

### Phase 1: Core Refinements
- [ ] Update color tokens to exact values
- [ ] Refine typography scale (especially hero numbers)
- [ ] Add generous spacing (p-8, gap-6)
- [ ] Smooth all animations (0.4s easeOut)

### Phase 2: New Components
- [ ] Cross-market search & tabs
- [ ] Scheduled trade modal
- [ ] One-tap basket cards
- [ ] Dividend calendar
- [ ] Regional index view

### Phase 3: AI Enhancements
- [ ] Daily coach card with dismissal
- [ ] Smart alert toasts
- [ ] Portfolio health check modal
- [ ] Behavioral nudges (hesitation, consistency, etc.)

### Phase 4: Advanced Features
- [ ] Scenario builder with live graphs
- [ ] Conditional trade builder
- [ ] Income forecast calculator
- [ ] Multi-market watchlist

---

## 🎨 Design Philosophy Summary

**Vesto Inspiration Applied to WAZA:**
- ✅ Big numbers, light weights
- ✅ Card-based, scannable layouts
- ✅ Minimal labels, maximum clarity
- ✅ Smooth motion, purposeful animations
- ✅ AI as subtle guide, not distraction

**WAZA Unique Identity:**
- 🇹🇿 Tanzania-first (DSE, TZS, Swahili)
- 🎯 Goal-driven (not trading-obsessed)
- 🤝 Trust through transparency
- 🌍 Regional focus (EAC markets)
- 🧘 Calm over hype

---

**Built for Tanzania. Inspired by excellence.**
