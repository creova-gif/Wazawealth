# WAZA WEALTH — Scheduled Trading & Banking Integration Design

**Vesto-Inspired | Calm & Trustworthy | Tanzania-First**

---

## 🎯 Overview

A comprehensive scheduled trading system with integrated banking (M-Pesa, bank accounts, Waza cards) following WAZA's signature calm, black & white aesthetic.

---

## 📐 Feature 1: Scheduled & Conditional Trades

### Design Philosophy

**Goal-Oriented Language**:
- ❌ "Set limit order"
- ✅ "Schedule your investment"

**Progressive Disclosure**:
- Step-by-step wizard (4 steps)
- One decision per screen
- Clear progress indicator

**Calm Interaction**:
- Soft transitions (300-400ms)
- No pressure, no urgency
- Educational, not complex

---

### Step-by-Step Flow

```
Step 1: Select Stock
Step 2: Amount + Funding
Step 3: Schedule + Condition
Step 4: Review + Confirm
→ Success Animation
```

---

### Step 1: Select Stock

**Layout**:
```tsx
┌─────────────────────────────────────┐
│  [<]  Schedule Trade          1/4   │  ← Header + Progress
├─────────────────────────────────────┤
│  What do you want to invest in?     │  ← Question
│                                      │
│  [🔍 Search stocks...]               │  ← Search bar
│                                      │
│  Popular Choices                     │  ← Label
│                                      │
│  ┌─────────────────────────────┐    │
│  │ CRDB            [DSE]        │    │  ← Stock card
│  │ CRDB Bank                    │    │  (selected state)
│  │                    TZS 450   │    │
│  │                          ✓   │    │
│  └─────────────────────────────┘    │
│                                      │
│  ┌─────────────────────────────┐    │
│  │ SAFARICOM       [NSE]        │    │  ← Stock card
│  │ Safaricom PLC                │    │  (unselected)
│  │                    TZS 31.2  │    │
│  └─────────────────────────────┘    │
│                                      │
│  [ Cancel ]      [ Continue → ]     │  ← Actions
└─────────────────────────────────────┘
```

**Design Specs**:
```css
Stock Card (Selected):
  border-2 border-black
  bg-zinc-50
  p-5 rounded-2xl
  
Stock Card (Unselected):
  border-2 border-zinc-200
  hover:border-zinc-400
  
Checkmark Animation:
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ type: 'spring' }}
```

**Interaction**:
- Tap card → Instant selection (no delay)
- Checkmark springs in (spring animation)
- Continue button enables
- Search filters list in real-time

---

### Step 2: Amount + Funding

**Layout**:
```tsx
┌─────────────────────────────────────┐
│  [<]  Schedule Trade          2/4   │
├─────────────────────────────────────┤
│  How much?                           │
│                                      │
│  TZS [100,000________]              │  ← Large input (text-4xl)
│                                      │
│  Quick amounts:                      │
│  [50K] [100K] [250K] [500K]         │  ← Pills
│                                      │
│  This will buy ≈ 222 shares         │  ← Calculation
│                                      │
│  ┌─────────────────────────────┐    │
│  │ Funding from                 │    │  ← Funding card
│  │ 💳 Waza Account              │    │
│  │                   [Change]   │    │
│  └─────────────────────────────┘    │
│                                      │
│  [ Back ]        [ Continue → ]     │
└─────────────────────────────────────┘
```

**Amount Input**:
```css
Input:
  h-20 text-4xl font-light
  border-2 border-zinc-200
  focus:border-black
  
Quick Amount Pills:
  Active: bg-black text-white
  Inactive: bg-zinc-100 text-zinc-700
  h-12 rounded-lg
  
Real-time Calculation:
  text-sm text-zinc-600
  Updates on every input change
```

**Funding Source Card**:
```tsx
<Card className="p-5 border-zinc-200">
  <div className="flex justify-between">
    <div>
      <p className="text-xs text-zinc-500">Funding from</p>
      <div className="flex items-center gap-2">
        <CreditCard className="w-4 h-4" />
        <p className="text-base font-medium">Waza Account</p>
      </div>
    </div>
    <button onClick={openFundingModal}>
      Change
    </button>
  </div>
</Card>
```

**Funding Options Modal**:
- Waza Account (instant)
- M-Pesa (instant, fees may apply)
- Bank Account (1-2 days)
- Slide up from bottom (300ms)
- Radio button selection

---

### Step 3: Schedule + Condition

**Layout**:
```tsx
┌─────────────────────────────────────┐
│  [<]  Schedule Trade          3/4   │
├─────────────────────────────────────┤
│  When should this happen?            │
│                                      │
│  ○ Once (specific date)              │
│  ● Weekly                            │  ← Selected
│  ○ Monthly                           │
│                                      │
│  ┌─────────────────────────────┐    │
│  │ On                           │    │  ← Schedule details
│  │ [Mon][Tue][Wed][Thu][Fri]   │    │  (Weekly selected)
│  │    ●                         │    │
│  └─────────────────────────────┘    │
│                                      │
│  Add a condition?                    │
│                                      │
│  ● No condition                      │
│  ○ Only if price drops to            │
│  ○ Only if price rises to            │
│                                      │
│  ┌─────────────────────────────┐    │  ← Conditional input
│  │ Current price: TZS 450       │    │  (if condition selected)
│  │                              │    │
│  │ TZS [445_________]           │    │
│  │                              │    │
│  │ ↓ -1.1% below current        │    │
│  └─────────────────────────────┘    │
│                                      │
│  [ Back ]        [ Continue → ]     │
└─────────────────────────────────────┘
```

**Schedule Types**:

**Once (Specific Date)**:
```tsx
<input
  type="date"
  min={today}
  className="h-12 border-2 border-zinc-200 rounded-lg"
/>
```

**Weekly**:
```tsx
<div className="grid grid-cols-5 gap-2">
  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
    <button className={`h-12 rounded-lg ${
      selected ? 'bg-black text-white' : 'bg-zinc-100'
    }`}>
      {day}
    </button>
  ))}
</div>
```

**Monthly**:
```tsx
<input
  type="range"
  min="1"
  max="28"
  value={dayOfMonth}
  className="w-full accent-black"
/>
<p className="text-3xl font-light text-center mt-3">
  {dayOfMonth}
</p>
```

**Condition Types**:
1. **No condition** — Execute always
2. **Price drops to** — Only if ≤ target
3. **Price rises to** — Only if ≥ target

**Conditional Input**:
```tsx
// Shows when condition selected
<Card className="p-5 border-zinc-200">
  <p className="text-sm text-zinc-600 mb-3">
    Current price: TZS 450
  </p>
  <input
    type="number"
    defaultValue={450}
    className="h-14 text-2xl font-light"
  />
  <p className="mt-3 text-sm text-amber-700">
    ↓ -1.1% below current
  </p>
</Card>
```

---

### Step 4: Review & Confirm

**Layout**:
```tsx
┌─────────────────────────────────────┐
│  [<]  Schedule Trade          4/4   │
├─────────────────────────────────────┤
│  Review your scheduled trade         │
│                                      │
│  ┌─────────────────────────────┐    │
│  │ STOCK                        │    │  ← Summary card
│  │ CRDB        [DSE]            │    │  (bg-zinc-50)
│  │ CRDB Bank                    │    │
│  │                              │    │
│  │ INVESTMENT                   │    │
│  │ TZS 100,000                  │    │
│  │ ≈ 222 shares                 │    │
│  │                              │    │
│  │ SCHEDULE                     │    │
│  │ Every Monday                 │    │
│  │                              │    │
│  │ CONDITION                    │    │
│  │ Only if ≤ TZS 445            │    │
│  └─────────────────────────────┘    │
│                                      │
│  ┌─────────────────────────────┐    │
│  │ ✨ AI Insight                │    │  ← AI card
│  │ Scheduling this trade helps  │    │  (bg-blue-50)
│  │ you maintain your plan       │    │
│  └─────────────────────────────┘    │
│                                      │
│  ┌─────────────────────────────┐    │
│  │ ℹ️  Funds will be deducted   │    │  ← Disclaimer
│  │    when the trade executes   │    │  (border-zinc-200)
│  └─────────────────────────────┘    │
│                                      │
│  [ Edit ]    [ Confirm Trade ]      │
└─────────────────────────────────────┘
```

**Summary Card Design**:
```css
Card:
  p-8 bg-zinc-50 border-zinc-200 rounded-2xl
  
Section Labels:
  text-xs text-zinc-500 uppercase tracking-wide
  
Values:
  Stock: text-2xl font-light
  Amount: text-3xl font-light
  Schedule: text-lg font-medium
  
Spacing:
  space-y-6 (24px between sections)
```

**AI Insight**:
```tsx
<Card className="p-6 bg-blue-50 border-blue-100">
  <div className="flex items-start gap-3">
    <Sparkles className="w-5 h-5 text-blue-700" />
    <div>
      <p className="text-sm font-medium text-blue-900 mb-1">
        AI Insight
      </p>
      <p className="text-sm text-blue-800 leading-relaxed">
        Scheduling this trade helps you maintain your
        investment plan consistently
      </p>
    </div>
  </div>
</Card>
```

**Disclaimer**:
```tsx
<Card className="p-5 border-zinc-200">
  <div className="flex items-start gap-3">
    <Info className="w-5 h-5 text-zinc-500" />
    <p className="text-sm text-zinc-600 leading-relaxed">
      Funds will be deducted when the trade executes.
      You can cancel anytime.
    </p>
  </div>
</Card>
```

---

### Success State

**Layout**:
```tsx
┌─────────────────────────────────────┐
│                                      │
│         ✓                            │  ← Animated checkmark
│                                      │  (draws in 500ms)
│  Trade Scheduled                     │  ← Title (3xl)
│  Biashara Imepangwa                  │  ← Swahili
│                                      │
│  Your recurring investment in        │  ← Message
│  CRDB Bank starts Jan 20, 2026       │
│                                      │
│  [ View Schedule ]  [ Done ]         │
└─────────────────────────────────────┘
```

**Checkmark Animation**:
```tsx
<motion.svg width="80" height="80" viewBox="0 0 80 80">
  <motion.circle
    cx="40"
    cy="40"
    r="35"
    stroke="green"
    strokeWidth="3"
    fill="none"
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
  />
  <motion.path
    d="M25 40 L35 50 L55 30"
    stroke="green"
    strokeWidth="3"
    fill="none"
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ duration: 0.5, delay: 0.3 }}
  />
</motion.svg>
```

**Subtle Confetti** (Optional):
- 3-second duration
- ~20 particles
- Calm colors (zinc, green)
- Gentle gravity

---

## 💳 Feature 2: Banking Integration

### Waza Account System

**Three Tiers** (Inspired by Wealthsimple):

1. **Starter** (Free)
   - Virtual card
   - M-Pesa deposits
   - Basic analytics
   - Daily limit: TZS 500,000
   - Monthly limit: TZS 5,000,000

2. **Growth** (TZS 10,000/month)
   - Physical card
   - Priority support
   - Advanced analytics
   - 0.5% cashback
   - Daily limit: TZS 2,000,000
   - Monthly limit: TZS 20,000,000

3. **Wealth** (TZS 50,000/month)
   - Premium metal card
   - Dedicated advisor
   - Tax optimization
   - 1% cashback
   - Airport lounge access
   - Daily limit: TZS 10,000,000
   - Monthly limit: TZS 100,000,000

---

### Virtual Card Design

**Card Visual**:
```
┌─────────────────────────────────────┐
│ Virtual Card              💳         │  ← Top
│ Waza Wealth                          │
│                                      │
│         [Chip]                       │  ← Chip graphic
│                                      │  (gold gradient)
│                                      │
│ 5123 4567 8901 2345                 │  ← Card number
│                                      │  (text-2xl font-light)
│                                      │
│ Expires    CVV                       │
│ 12/28      123                       │
│                                      │
└─────────────────────────────────────┘

Background: gradient-to-br from-black to-zinc-800
Text: white
Border-radius: rounded-2xl
Padding: p-6
Height: h-56
```

**Card Actions**:
```tsx
<div className="grid grid-cols-2 gap-2 bg-zinc-50 p-4">
  <button className="flex items-center justify-center gap-2 py-3 bg-white border">
    <Eye /> Show Details
  </button>
  <button className="flex items-center justify-center gap-2 py-3 bg-white border">
    <Copy /> Copy Number
  </button>
</div>
```

**Security Features**:
- Tap to reveal full number
- CVV masked by default
- Copy to clipboard
- Freeze/unfreeze card

---

### M-Pesa Integration

**Add Funds via M-Pesa**:

```tsx
┌─────────────────────────────────────┐
│  Add Funds                      [×]  │
├─────────────────────────────────────┤
│  Send money to this Lipa Na M-Pesa   │
│  number                              │
│                                      │
│  ┌─────────────────────────────┐    │
│  │ PAYBILL NUMBER               │    │  ← Copy card
│  │                              │    │  (bg-green-50)
│  │ 400200                       │    │
│  │                 [Copy]       │    │
│  └─────────────────────────────┘    │
│                                      │
│  ┌─────────────────────────────┐    │
│  │ ACCOUNT NUMBER               │    │
│  │                              │    │
│  │ WZ12345678                   │    │
│  │                 [Copy]       │    │
│  └─────────────────────────────┘    │
│                                      │
│  ┌─────────────────────────────┐    │
│  │  ⏳                          │    │  ← Waiting state
│  │  Waiting for payment...      │    │
│  └─────────────────────────────┘    │
│                                      │
│  [ Close ]                           │
└─────────────────────────────────────┘
```

**Flow**:
1. User taps "Add Funds"
2. Selects M-Pesa
3. Sees Paybill + Account number
4. Copies to M-Pesa app
5. Sends payment
6. Returns to Waza
7. Payment auto-confirms (webhook)
8. Balance updates (real-time)

**Technical**:
```typescript
// M-Pesa API integration
POST /mpesa/stkpush
{
  phoneNumber: "255712345678",
  amount: 100000,
  accountReference: "WZ12345678"
}

// Callback
POST /mpesa/callback
{
  ResultCode: 0,
  TransactionID: "PFK...",
  Amount: 100000
}

// Update balance immediately
WebSocket → Frontend receives balance update
```

---

### Bank Account Linking

**Link Bank Account**:

```tsx
┌─────────────────────────────────────┐
│  Link Bank Account              [×]  │
├─────────────────────────────────────┤
│  Select your bank                    │
│                                      │
│  ○ CRDB Bank                         │
│  ○ NMB Bank                          │
│  ○ Equity Bank                       │
│  ○ Stanbic Bank                      │
│                                      │
│  Account Number                      │
│  [________________]                  │
│                                      │
│  Account Name                        │
│  [________________]                  │
│                                      │
│  ℹ️  We'll send a small test amount  │
│     to verify your account           │
│                                      │
│  [ Cancel ]    [ Link Account ]     │
└─────────────────────────────────────┘
```

**Verification Flow**:
1. User enters bank details
2. Waza sends TZS 100 test deposit
3. User confirms amount received
4. Account linked ✓

**Security**:
- Bank credentials never stored
- Uses OAuth where available
- SMS OTP verification
- Can unlink anytime

---

### Physical Card (Growth & Wealth Tiers)

**Card Design**:

**Growth Tier** — Blue plastic card
- Matte finish
- Embossed numbers
- Contactless enabled
- Chip + PIN

**Wealth Tier** — Black metal card
- Anodized aluminum
- Laser-engraved numbers
- Premium packaging
- Concierge number

**Ordering Flow**:
```tsx
┌─────────────────────────────────────┐
│  Order Physical Card            [×]  │
├─────────────────────────────────────┤
│  Shipping Address                    │
│                                      │
│  Street: [________________]          │
│  City:   [________________]          │
│  Region: [________________]          │
│  Postal: [________________]          │
│                                      │
│  Estimated Delivery: 7-10 days       │
│                                      │
│  Card Fee: Free (Growth tier)        │
│                                      │
│  [ Cancel ]    [ Confirm Order ]    │
└─────────────────────────────────────┘
```

---

## 🎨 Design Tokens

### Colors (90/8/2 Rule)

```css
/* 90% Black & White */
--black: #000000;
--white: #FFFFFF;
--zinc-50: #FAFAFA;

/* 8% Grays */
--zinc-100: #F4F4F5;
--zinc-200: #E4E4E7;
--zinc-400: #A1A1AA;
--zinc-600: #52525B;

/* 2% Accent (Semantic) */
--green-50: #ECFDF5;   /* Success backgrounds */
--green-600: #16A34A;  /* Success text */
--blue-50: #EFF6FF;    /* AI backgrounds */
--blue-700: #1D4ED8;   /* AI text */
--amber-700: #B45309;  /* Warning text */
```

### Typography

```css
/* Hero Numbers */
.hero-number {
  font-size: 72px;      /* text-7xl */
  font-weight: 300;     /* font-light */
  line-height: 1;
  letter-spacing: -0.02em;
}

/* Large Inputs */
.large-input {
  font-size: 36px;      /* text-4xl */
  font-weight: 300;     /* font-light */
}

/* Section Titles */
.section-title {
  font-size: 24px;      /* text-2xl */
  font-weight: 300;     /* font-light */
}

/* Labels */
.label {
  font-size: 12px;      /* text-xs */
  font-weight: 400;     /* font-normal */
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--zinc-500);
}
```

### Spacing

```css
/* Card Padding */
--card-padding: 32px;  /* p-8 */

/* Section Gaps */
--section-gap: 24px;   /* gap-6 */

/* Input Height */
--input-sm: 48px;      /* h-12 */
--input-md: 56px;      /* h-14 */
--input-lg: 80px;      /* h-20 */
```

### Motion

```css
/* Transitions */
--duration-fast: 200ms;
--duration-standard: 400ms;
--duration-slow: 600ms;

/* Easing */
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

---

## 🌍 Bilingual Microcopy

### Scheduled Trading

```json
{
  "selectStock": {
    "en": "What do you want to invest in?",
    "sw": "Unataka kuwekeza nini?"
  },
  "howMuch": {
    "en": "How much?",
    "sw": "Kiasi gani?"
  },
  "whenSchedule": {
    "en": "When should this happen?",
    "sw": "Hii inatokea lini?"
  },
  "once": {
    "en": "Once (specific date)",
    "sw": "Mara moja (tarehe maalum)"
  },
  "weekly": {
    "en": "Weekly",
    "sw": "Kila wiki"
  },
  "monthly": {
    "en": "Monthly",
    "sw": "Kila mwezi"
  },
  "noCondition": {
    "en": "No condition",
    "sw": "Hakuna hali"
  },
  "priceBelow": {
    "en": "Only if price drops to",
    "sw": "Tu kama bei inashuka hadi"
  },
  "confirmTrade": {
    "en": "Confirm Trade",
    "sw": "Thibitisha Biashara"
  },
  "tradeScheduled": {
    "en": "Trade Scheduled",
    "sw": "Biashara Imepangwa"
  }
}
```

### Banking

```json
{
  "availableBalance": {
    "en": "Available Balance",
    "sw": "Salio Linalopatikana"
  },
  "addFunds": {
    "en": "Add Funds",
    "sw": "Ongeza Fedha"
  },
  "virtualCard": {
    "en": "Virtual Card",
    "sw": "Kadi ya Mtandao"
  },
  "physicalCard": {
    "en": "Physical Card",
    "sw": "Kadi ya Kimwili"
  },
  "paybillNumber": {
    "en": "Paybill Number",
    "sw": "Nambari ya Paybill"
  },
  "accountNumber": {
    "en": "Account Number",
    "sw": "Nambari ya Akaunti"
  },
  "upgrade": {
    "en": "Upgrade",
    "sw": "Boresha"
  }
}
```

---

## ✅ Implementation Checklist

### Scheduled Trading

- [x] Step 1: Select Stock component
- [x] Step 2: Amount + Funding component
- [x] Step 3: Schedule + Condition component
- [x] Step 4: Review + Confirm component
- [x] Success animation
- [x] Progress bar
- [x] Back/forward navigation
- [x] Form validation
- [x] Bilingual microcopy
- [ ] API integration
- [ ] Webhook for execution
- [ ] Push notifications

### Banking Integration

- [x] Account overview
- [x] Virtual card display
- [x] Card security (show/hide)
- [x] Account tier system
- [x] M-Pesa integration UI
- [x] Bank account linking UI
- [ ] M-Pesa API integration
- [ ] Bank OAuth integration
- [ ] Card ordering backend
- [ ] Physical card printing
- [ ] Compliance (KYC/AML)

---

**Version**: 1.0  
**Status**: ✅ Design Complete  
**Next**: Backend integration  

**Built for Tanzania. Designed for calm. Banking made simple.**
