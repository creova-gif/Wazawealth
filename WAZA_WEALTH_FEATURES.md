# WAZA WEALTH - Feature Documentation

## 🎯 Overview

**Waza Wealth** is a calm, intelligent, AI-native wealth operating system designed for Tanzania and East Africa. It's not a trading app, not a bank, not a stock exchange dashboard — it's a daily financial companion that helps people save, invest, plan, and grow wealth without needing to understand finance.

---

## 🏗️ Core Architecture

### Purpose-Based Accounts (Not Products)

Users never choose "products." They choose what they are trying to achieve.

#### 1. **Everyday Growth Account** (TFSA-like)
- **Problem Solved**: "I want my money to grow, but still be accessible"
- **Purpose**: Long-term wealth growth with flexible withdrawals
- **Backend**: DSE stocks, Unit trusts, ETFs
- **User Experience**: Default account, conservative portfolio, AI rebalances silently

#### 2. **Retirement Vault** (RRSP-like)
- **Problem Solved**: "I don't want to struggle when I'm old"
- **Purpose**: Old-age security, long-term compounding
- **Backend**: Government bonds, Conservative ETFs, Pension-style allocation
- **User Experience**: Timeline-based progress, "Years to go" instead of daily returns

#### 3. **Goals & Savings Vault**
- **Problem Solved**: "I need money for school fees, emergencies, or business"
- **Purpose**: Short–medium-term goals, capital preservation
- **Backend**: Money market funds, Short-term bonds
- **User Experience**: Goal cards, completion forecasts, no market noise

#### 4. **Family / Legacy Vault** (Trust-fund abstraction)
- **Problem Solved**: "I want to protect my family's future"
- **Purpose**: Children, dependents, inheritance planning
- **Backend**: Segregated portfolios, beneficiary tagging, long-term low-risk growth
- **User Experience**: Family-oriented language, legacy storytelling

#### 5. **Learning & Simulation**
- **Problem Solved**: "I'm scared to invest because I don't understand it"
- **Purpose**: Build confidence, reduce fear, train good behavior
- **Backend**: Paper trading with real market data
- **User Experience**: 30–60 second lessons, practice before real money

---

## 🎨 Design Philosophy

### Black & White Premium Design
- Inspired by Wealthsimple, Stripe, and Apple
- Off-white backgrounds (#FFFFFF, #FAFAFA)
- Black text and accents (#000000)
- Minimal color usage
- Large, light typography (font-weight: 300-400)
- Generous white space

### UI Principles
1. **Calm over excitement** - No red/green panic colors
2. **Information hierarchy** - Most important info is largest and lightest
3. **Motion tells stories** - Subtle animations explain meaning
4. **One graph per screen** - No visual overload
5. **Trust designed, not explained** - Subtle regulatory messaging

---

## 🤖 AI System - Silent Wealth Copilot

### Core Principles
- **Silent intelligence**: Watches, learns, anticipates
- **Proactive, not reactive**: Explains before users ask
- **Never pressures**: Encourages consistency without guilt
- **Contextual**: Understands user behavior patterns

### AI Triggers
1. **First-time investor hesitation** (8+ seconds on invest screen)
2. **Returning after inactivity** (7+ days)
3. **Goal progress recognition** (70%+ complete)
4. **Educational moments** (30% random chance)
5. **Consistency encouragement** (after successful habits)

### AI Messages
- Calm, reassuring tone
- Short, simple language
- No jargon
- Focuses on long-term thinking
- Examples:
  - "Small steps compound. Future you thanks you."
  - "Timing isn't everything. Time in the market matters more."
  - "You're building something long-term."

---

## 📊 World-Class Graph System

### Story-Driven Visualization
- **Smooth curves**, no jagged lines
- **Minimal labels** - only essential information
- **No gridlines** - cleaner, calmer appearance
- **Confidence bands** for projections
- **Gradient fills** for visual depth
- **Animated drawing** - graphs draw smoothly on load

### Graph Types
1. **Portfolio Growth** - Shows historical performance
2. **Projection Graphs** - Future scenarios with confidence bands
3. **Scenario Sliders** - Interactive "What if?" planning
4. **Downside Protection** - Visual risk assessment

---

## 🎯 Daily Habit Engine (Gentle, Not Pressuring)

### Daily Rituals
1. **Today's Insight** (30 seconds)
   - Rotates based on day of week
   - Educational snippets
   - Encouragement messages

2. **1-Minute Lesson** (2-3 times per week)
   - Fundamental concepts
   - Simple explanations
   - Real-world applications

3. **Weekly Reflection** (Sundays)
   - Progress review
   - Goal check-in
   - Celebration of small steps

### No Streak Anxiety
- No guilt for missing days
- No pressure notifications
- Focus on consistency, not perfection
- Messages like "Small steps compound" instead of "Don't break your streak!"

---

## 🔐 Trust as a Feature

### Designed Trust Indicators
- **CMSA compliance** shown subtly
- **Fund segregation** messaging
- **Education-first** positioning
- **Simulation before real investing**
- **Version and regulatory info** in profile

### Trust UI Elements
- Minimal shield icons
- Calm colors (no aggressive warnings)
- Reassurance language
- Transparent fee structures
- Clear account separation

---

## 💰 Asset Offerings (Realistic & Compliant)

### 🇹🇿 Tanzania
- DSE-listed stocks
- Treasury bonds
- Corporate bonds
- Unit trusts

### 🇰🇪 Kenya (Phase 2)
- NSE stocks
- Government bonds
- Money market funds

### 🌍 Regional / Global (Phase 3)
- Africa-focused ETFs
- Global index ETFs (via licensed custodians)

---

## 📱 Mobile Money Integration

### Supported Providers
- **M-Pesa**
- **Tigo Pesa**
- **Airtel Money**
- Bank transfers (NMB, CRDB)

### Deposit Flow
1. Select provider
2. Enter amount (quick amount buttons: 50K, 100K, 250K, 500K)
3. Enter phone number
4. Confirm transaction
5. Receive USSD prompt on phone
6. Enter PIN to complete

### Design
- Clean, step-by-step process
- Large touch targets
- Progress indicators
- Reassuring messaging

---

## 🎓 Features Implemented

### ✅ Complete Features
1. **Welcome Screen** - Waza-branded onboarding
2. **Purpose-Based Accounts** - 5 account types with clear purposes
3. **Account Detail Views** - Deep dive into each account
4. **Story Graphs** - Animated, smooth, confidence-banded
5. **Enhanced AI Copilot** - Silent intelligence layer
6. **Daily Rituals** - Gentle habit formation
7. **Waza Dashboard** - Black/white premium design
8. **Mobile Money Integration** - M-Pesa, Tigo, Airtel
9. **Scenario Planner** - Interactive future projections
10. **Profile Screen** - Settings, language, security
11. **Trust Indicators** - CMSA compliance, version info
12. **Bilingual Support** - Swahili + English

### 🎨 Design Elements
- Light typography (font-weight: 300)
- Generous spacing
- Minimal color palette
- Smooth animations (motion/react)
- Premium card designs
- Thoughtful micro-interactions

---

## 🌍 Localization

### Languages Supported
- **Kiswahili** (Primary)
- **English** (Secondary)

### Localization Strategy
- All user-facing text translated
- Cultural adaptation of concepts
- Local financial terminology
- Tanzania-specific examples

---

## 🚀 Navigation Flow

```
Welcome Screen
    ↓
Language Selection (SW/EN)
    ↓
Signup
    ↓
Risk Assessment
    ↓
Goal Setting
    ↓
Dashboard (Main Hub)
    ├── Accounts (Purpose-based view)
    │   └── Account Detail
    │       ├── Deposit (Mobile Money)
    │       └── Withdraw
    ├── Invest (Story-based)
    ├── Portfolio
    ├── Learn (Tutor)
    ├── Scenario Planner
    └── Profile
        ├── Personal Info
        ├── Security
        ├── Language
        └── Logout
```

---

## 💡 Key Differentiators vs. Traditional Fintech

| Traditional Fintech | Waza Wealth |
|---------------------|---------------|
| Product-focused | Purpose-focused |
| Red/green volatility | Calm, black/white |
| Daily panic | Long-term confidence |
| Trading mindset | Wealth building |
| Reactive support | Proactive AI guidance |
| Streak anxiety | Gentle consistency |
| Complex jargon | Simple language |
| Fragmented services | Unified OS |

---

## 🎯 Target Users

### 1. Students
- Learning to save
- Building first investment habits
- Low amounts, high education

### 2. Young Professionals
- Goal-focused (house, car, business)
- Consistent income
- Medium risk tolerance

### 3. SME Owners
- Business + personal wealth
- Family planning
- Retirement preparation

---

## 📈 Success Metrics (Not Implemented in MVP)

### Engagement
- Daily active rituals completed
- Time spent in learning mode
- Scenario planner usage

### Financial
- Average account balance growth
- Deposit frequency
- Multi-account adoption

### Trust
- Retention rate
- Referral rate
- Customer satisfaction scores

---

## 🔮 Future Enhancements

### Phase 2
- Automated rebalancing
- Tax optimization
- Social features (family accounts)
- Robo-advisor enhancements

### Phase 3
- Regional expansion (Kenya, Uganda, Rwanda)
- Global ETF access
- Cryptocurrency integration (compliant)
- Legacy planning tools

### Phase 4
- Microloans integration
- Insurance products
- Real estate crowdfunding
- Impact investing options

---

## 🛠️ Technical Stack

- **Frontend**: React + TypeScript
- **Animation**: Motion (formerly Framer Motion)
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI
- **Backend**: Supabase (Auth, Database, Edge Functions)
- **State Management**: React hooks
- **Routing**: Component-based navigation

---

## 🎨 Brand Identity

**Name**: Waza Wealth  
**Tagline**: "A calm, intelligent companion for saving, investing, and growing wealth"  
**Logo**: Minimal "W" with circular elements  
**Colors**: Black (#000000), White (#FFFFFF), Zinc grays  
**Tone**: Calm, confident, educational, reassuring  
**Market**: Tanzania & East Africa  

---

## 📝 Implementation Notes

### Design Consistency
- All components use light font-weights (300-400)
- Consistent spacing scale (px-6, py-4, etc.)
- Border colors: zinc-200 (default), zinc-400 (hover)
- Button heights: 12-14 (h-12, h-14)
- Card padding: p-4 to p-8

### Animation Principles
- Initial: opacity 0, y: 20
- Animate: opacity 1, y: 0
- Duration: 0.4-0.8s
- Stagger: 0.1s between items
- Easing: easeOut, easeInOut

### Responsive Design
- Mobile-first approach
- Touch-friendly targets (min 44px)
- Bottom navigation for mobile
- Sticky headers with backdrop blur

---

## ✨ Philosophy

> **"Wealth isn't rushed — it's built."**

Waza Wealth is designed around the principle that financial success comes from:
1. **Understanding**, not speculation
2. **Consistency**, not timing
3. **Purpose**, not products
4. **Calm**, not panic
5. **Education**, not hype

This is a wealth operating system, not a trading app.

---

## 📞 Support & Documentation

- In-app help center
- FAQ section
- Educational content library
- CMSA compliance documentation
- Version info and changelogs

---

**Built for Tanzania. Designed for the future.**
