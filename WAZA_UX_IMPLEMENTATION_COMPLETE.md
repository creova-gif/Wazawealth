# WAZA WEALTH — Complete UX Implementation Guide

**Production-Ready Design System | January 2026**

---

## 🎯 Overview

This document provides a complete implementation guide for WAZA WEALTH, a calm, intelligent, purpose-based wealth operating system for Tanzania and East Africa.

**Design Philosophy**: Confidence over excitement · Guidance over speculation · Goals over stock picking · Simplicity over complexity

---

## 📐 Core Design Principles

### 1. Visual Language

**Color System** (90/8/2 Rule)
- **90% Black & White** — Primary UI elements
- **8% Grays (Zinc)** — Borders, secondary text, disabled states
- **2% Accent** — Only for semantic meaning
  - Green (#16A34A) → Growth, on-track
  - Blue (#2563EB) → AI insights, information
  - Amber (#F59E0B) → Attention needed
  - Red (#DC2626) → Critical alerts only

**Typography Scale**
```
Hero Number:      text-7xl (72px)  font-light (300)   tracking-tight
Large Number:     text-5xl (48px)  font-light (300)   tracking-tight
Section Title:    text-2xl (24px)  font-light (300)
Card Title:       text-lg (18px)   font-medium (500)
Body:             text-base (16px) font-normal (400)
Caption:          text-sm (14px)   font-normal (400)
Micro:            text-xs (12px)   font-normal (400)
```

**Spacing Scale** (8px base)
```
2px    0.5     Dividers
4px    1       Tight spacing
8px    2       Icon-text gaps
12px   3       Card inner padding
16px   4       Standard gaps
24px   6       Card padding, section margins
32px   8       Large card padding
48px   12      Section breaks
64px   16      Screen-level spacing
```

**Motion Timing**
```
Fast:     200ms  Hover states, button feedback
Standard: 400ms  Page transitions, card entries
Slow:     600ms  Modal reveals, complex animations

Easing:
  - ease-out: General transitions
  - ease-in-out: Modals, overlays
  - spring: Checkmarks, success states
```

---

## 🎨 Component Library

### 1. Hero Wealth Card

**Purpose**: Display total wealth at a glance

**Anatomy**:
```tsx
┌─────────────────────────────────────┐
│  YOUR WEALTH                         │  ← Label (text-xs uppercase)
│                                      │
│  4.75M              ↗ +11.3%        │  ← Number (text-7xl) + Growth
│                                      │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━    │  ← Sparkline (h-16)
│                                      │
│  ● On track                          │  ← Status (text-sm)
└─────────────────────────────────────┘

Classes:
  Container:  p-8 border-zinc-200 rounded-2xl bg-white
  Number:     text-7xl font-light tracking-tight
  Growth:     text-lg font-medium text-green-600
  Status:     text-sm text-zinc-600
```

**States**:
- **Default**: Border zinc-200, no shadow
- **Hover**: border-zinc-300, shadow-sm
- **Loading**: Skeleton with pulse animation

**Motion**:
```tsx
// Entry animation
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.4, ease: 'easeOut' }}

// Number count-up
<motion.span
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
/>
```

---

### 2. AI Insight Card

**Purpose**: Surface actionable insights without noise

**Anatomy**:
```tsx
┌─────────────────────────────────────┐
│  ✨ Today's Insight                  │  ← Icon + Title
│                                      │
│  You're saving 15% more than last    │  ← Message
│  quarter. Keep this momentum going!  │  (2-3 sentences max)
│                                      │
│  [ Learn more → ]                    │  ← Optional CTA
└─────────────────────────────────────┘

Classes:
  Container:  p-6 bg-zinc-50 border-zinc-200 rounded-2xl
  Icon:       w-5 h-5 text-zinc-700
  Message:    text-sm leading-relaxed text-zinc-700
  CTA:        text-sm text-zinc-700 hover:text-black
```

**Variants**:
```tsx
// Default (general insight)
bg-zinc-50 border-zinc-200

// AI-specific
bg-blue-50 border-blue-100 text-blue-900

// Alert
bg-amber-50 border-amber-200 text-amber-900
```

**Expandable State**:
- Tap card → Full-screen modal
- Slide up from bottom (400ms)
- Include graph, bullet points, CTA

---

### 3. Goal Progress Card

**Purpose**: Show progress toward purpose-based goals

**Anatomy**:
```tsx
┌─────────────────────────────────────┐
│  🎯  Everyday Growth                │  ← Icon + Name
│      TZS 2,500,000                   │  ← Current value
│                                      │
│      ━━━━━━━━━━━━━━━━━━○○          │  ← Progress bar
│      83% to your TZS 3M goal         │  ← Progress text
│                                      │
│      ● On track for May 2026         │  ← Status
└─────────────────────────────────────┘

Classes:
  Container:  p-5 border-zinc-200 rounded-2xl
  Icon:       text-2xl
  Value:      text-2xl font-light
  Progress:   h-1.5 bg-zinc-200 rounded-full
  Fill:       bg-black rounded-full
  Status:     text-xs with status dot
```

**Status Colors**:
```tsx
On Track (≥83%):         green-500 dot
Needs Attention (50-82%): amber-500 dot
Off Track (<50%):        red-500 dot (supportive message)
```

**Motion**:
```tsx
// Progress bar fill
<motion.div
  className="h-full bg-black"
  initial={{ width: 0 }}
  animate={{ width: '83%' }}
  transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
/>
```

---

### 4. Button System

**Primary**:
```tsx
<Button className="
  h-14 px-6
  bg-black text-white
  hover:bg-zinc-800
  active:scale-98
  disabled:bg-zinc-300 disabled:text-zinc-500
  transition-all duration-200
">
  Continue
</Button>
```

**Secondary (Outline)**:
```tsx
<Button variant="outline" className="
  h-14 px-6
  border-2 border-zinc-300
  hover:border-zinc-500 hover:bg-zinc-50
  active:bg-zinc-100
">
  Cancel
</Button>
```

**Ghost**:
```tsx
<Button variant="ghost" className="
  h-12 px-4
  text-zinc-600
  hover:text-black hover:bg-zinc-50
">
  Learn more
</Button>
```

**Tap Feedback**:
```tsx
whileTap={{ scale: 0.97 }}
transition={{ duration: 0.1 }}
```

---

### 5. Input System

**Text Input**:
```tsx
<input className="
  h-14 px-4
  border-2 border-zinc-300 rounded-xl
  focus:border-black focus:ring-2 focus:ring-zinc-100
  text-lg
  transition-all duration-200
" />

States:
  Default:  border-zinc-300
  Focus:    border-black + ring-zinc-100
  Error:    border-red-500 + ring-red-100
  Success:  border-green-500 + ring-green-100
  Disabled: bg-zinc-100 text-zinc-500
```

**Slider**:
```tsx
<input
  type="range"
  className="
    w-full h-2
    bg-zinc-200 rounded-full
    accent-black
    cursor-pointer
  "
/>
```

---

### 6. Modal System

**Bottom Sheet** (Mobile-first):
```tsx
<AnimatePresence>
  {showModal && (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 z-40"
      />
      
      {/* Sheet */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50"
      >
        {/* Header */}
        <div className="border-b border-zinc-200 px-6 py-4">
          <h2>Modal Title</h2>
          <button><X /></button>
        </div>
        
        {/* Content */}
        <div className="px-6 py-6">
          ...
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>
```

---

## 🎬 Animation Patterns

### Entry Animations

**Staggered List**:
```tsx
{items.map((item, i) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4, delay: i * 0.1 }}
  >
    {item.content}
  </motion.div>
))}
```

**Fade + Slide Up**:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, ease: 'easeOut' }}
/>
```

**Scale + Fade** (Success states):
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
/>
```

### Interactive Feedback

**Button Tap**:
```tsx
<motion.button
  whileTap={{ scale: 0.97 }}
  transition={{ duration: 0.1 }}
/>
```

**Card Hover**:
```tsx
className="
  hover:border-zinc-400
  hover:shadow-sm
  transition-all duration-200
"
```

**Toggle Selection**:
```tsx
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ type: 'spring', duration: 0.4 }}
>
  <CheckCircle />
</motion.div>
```

---

## 📱 Screen Flows

### 1. Onboarding Flow

**Steps**: Language → Goals → Risk → Experience → Trust → Dashboard

**Progress Indicator**:
```tsx
<div className="flex gap-1.5">
  {[1, 2, 3, 4, 5].map((num) => (
    <div className={`
      h-1 flex-1 rounded-full
      transition-all duration-400
      ${num <= currentStep ? 'bg-black' : 'bg-zinc-200'}
    `} />
  ))}
</div>
```

**Transition Logic**:
- Language: Auto-advance after 300ms
- Goals: Require at least 1 selection
- Risk/Experience: Single selection required
- Trust: Manual continue

**Key Principles**:
- One question per screen
- Visual feedback immediate (<100ms)
- Progress always visible
- Can't go backward (prevents confusion)

---

### 2. Dashboard States

**Empty State** (New User):
```
- Centered layout
- Minimal illustration
- 3 numbered steps
- Single CTA: "Get Started"
```

**Default State** (With Data):
```
- Hero wealth card
- AI insight card (dismissible)
- Goal progress cards
- Quick actions grid
- Bottom navigation
```

**Loading State**:
```
- Hero card: Skeleton (pulse animation)
- Goals: Empty cards with shimmer
- No AI insights shown
```

**Error State**:
```
- Hero card: Last known value + error message
- Retry button
- Contact support link
```

---

### 3. Scheduled Trade Flow

**Steps**: Select Asset → Amount → Schedule → Condition → Review → Confirm

**Step Navigation**:
```tsx
┌─────────────────────────────────────┐
│  Schedule Trade              [×] [<] │  ← Close, Back
├─────────────────────────────────────┤
│  {Step Content}                      │
├─────────────────────────────────────┤
│  [ Continue ]                        │  ← Disabled until valid
└─────────────────────────────────────┘
```

**Conditional Step** (Optional):
```tsx
// If user selects "No condition", skip to review
onSelect={(condition) => {
  if (condition === 'none') {
    setStep('review');
  } else {
    setStep('condition-detail');
  }
}}
```

**Review Screen**:
```tsx
┌─────────────────────────────────────┐
│  Review Trade                        │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐    │
│  │  CRDB Bank (DSE)             │    │  ← Card format
│  │  TZS 100,000                 │    │
│  │                              │    │
│  │  Every Monday, starting      │    │
│  │  Jan 20, 2026                │    │
│  │                              │    │
│  │  Condition: ≤ TZS 445        │    │
│  └─────────────────────────────┘    │
│                                      │
│  ℹ️ Funds deducted when executed     │  ← Disclaimer
│                                      │
│  [ Edit ]    [ Confirm Trade ]       │
└─────────────────────────────────────┘
```

**Success Animation**:
```tsx
// Checkmark draws
<motion.svg>
  <motion.path
    d="M5 13l4 4L19 7"
    stroke="currentColor"
    strokeWidth="2"
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ duration: 0.5, ease: 'easeInOut' }}
  />
</motion.svg>

// Subtle confetti (3 seconds)
// Auto-dismiss after 2 seconds
```

---

### 4. Scenario Builder Interaction

**Layout**:
```
Current Plan | New Scenario  ← Comparison cards
Graph with confidence bands  ← Visual projection
AI Insight card              ← Feedback
Sliders (Monthly, Time)      ← Controls
Apply Changes button         ← Primary action
```

**Real-time Updates**:
```tsx
onChange={(value) => {
  setMonthlyContribution(value);
  // Immediately recalculate projection
  // Update graph (smooth transition)
  // Update confidence level
  // Update AI insight
}}

// Debounce graph update for performance
const debouncedUpdate = useMemo(
  () => debounce(updateGraph, 100),
  []
);
```

**Confidence Calculation**:
```tsx
const getConfidenceLevel = () => {
  const progress = (projected / target) * 100;
  if (progress >= 95) return { level: 'high', color: 'green' };
  if (progress >= 75) return { level: 'medium', color: 'blue' };
  return { level: 'low', color: 'amber' };
};
```

---

## 🎯 Microcopy Principles

### Tone Guidelines

**Be Human**:
- ❌ "Portfolio optimization required"
- ✅ "Let's adjust your timeline"

**Be Encouraging**:
- ❌ "You're behind schedule"
- ✅ "You're 65% there. Keep going!"

**Be Clear**:
- ❌ "Stochastic volatility detected"
- ✅ "Market dropped 2%, but your long-term goals are on track"

**Be Bilingual** (Swahili + English):
```tsx
// Always provide both
greeting: {
  en: "Good morning",
  sw: "Habari za asubuhi"
}

// Use user's selected language
<p>{t.greeting[language]}</p>
```

### Button Labels

**Action Oriented**:
- ✅ "Get Started" (not "Begin")
- ✅ "Schedule Trade" (not "Submit")
- ✅ "View Goal" (not "OK")

**Bilingual Parity**:
```tsx
continue: {
  en: "Continue",
  sw: "Endelea"
},
confirm: {
  en: "Confirm Trade",
  sw: "Thibitisha Biashara"
}
```

### AI Insight Language

**Formula**: [Observation] + [Encouragement] + [Optional Action]

Examples:
```
"You're saving 15% more than last quarter. Keep this momentum going!"

"Your wealth grew TZS 12,000 overnight. Keep going!"

"You're 90% to your goal. TZS 300K to go!"

"Markets dropped 2% today, but your diversification is working."
```

**Avoid**:
- Fear-based: "Don't miss out!"
- Hype: "Stocks are surging!"
- Pressure: "Act now!"
- Jargon: "Alpha generation detected"

---

## 🔧 Implementation Checklist

### Phase 1: Core Components (Week 1-2)

- [x] Design system tokens (colors, typography, spacing)
- [x] Button system (primary, secondary, ghost)
- [x] Input system (text, slider, selector)
- [x] Card components (hero, insight, goal)
- [x] Modal system (bottom sheet, full-screen)
- [x] Animation library (entry, exit, feedback)

### Phase 2: Onboarding (Week 3)

- [x] Language selection
- [x] Goal selection (multi-select)
- [x] Risk comfort (visual graphs)
- [x] Experience level
- [x] Trust & security
- [x] Progress indicator
- [x] State management

### Phase 3: Dashboard (Week 4-5)

- [x] Hero wealth card
- [x] AI insight card (default + expanded)
- [x] Goal progress cards
- [x] Quick actions
- [x] Bottom navigation
- [x] Empty state
- [x] Loading states
- [x] Error handling

### Phase 4: Cross-Market Trading (Week 6-7)

- [ ] Market tabs (DSE/NSE/USE/RSE)
- [ ] Stock search (unified)
- [ ] Stock detail screen
- [ ] Buy now flow
- [ ] Schedule trade flow (5 steps)
- [ ] Scheduled trades management

### Phase 5: Advanced Features (Week 8-10)

- [x] Scenario builder
- [ ] Dividend calendar
- [ ] Smart alerts
- [ ] Daily AI coach
- [ ] Portfolio simulation
- [ ] Regional index baskets

### Phase 6: Polish & Testing (Week 11-12)

- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Performance optimization (<3s load)
- [ ] Animation refinement (60fps)
- [ ] Swahili review (native speaker)
- [ ] User testing (5 participants)
- [ ] Bug fixes

---

## 🎨 File Structure

```
/src/app/components/
├── ImprovedOnboarding.tsx        ← 5-step onboarding
├── EnhancedDashboard.tsx         ← Main dashboard (empty + default states)
├── EnhancedScenarioBuilder.tsx   ← What-if scenario planning
├── CrossMarketScreen.tsx         ← Multi-exchange trading
├── StockDetailScreen.tsx         ← Stock detail + schedule
├── DividendCalendarScreen.tsx    ← Dividend tracking
├── StoryGraph.tsx                ← Reusable chart component
├── DailyRituals.tsx              ← Habit tracking
├── TrustIndicator.tsx            ← Compliance badges
├── ui/
│   ├── card.tsx                  ← Base card component
│   ├── button.tsx                ← Button variants
│   └── sonner.tsx                ← Toast notifications
└── ...

/src/styles/
├── theme.css                     ← Design tokens (CSS variables)
├── fonts.css                     ← Font imports
└── globals.css                   ← Global styles

/WAZA_MICROCOPY.json              ← All UI text (en + sw)
/WAZA_COMPREHENSIVE_UX_SPEC.md    ← Detailed UX specs
/WAZA_UI_STATES.md                ← State documentation
```

---

## 🌍 Localization

### Implementation Strategy

**1. Centralized Microcopy**:
```tsx
// Load from JSON file
import microcopy from '/WAZA_MICROCOPY.json';

// Access in components
const t = microcopy[section][language];
<p>{t.title}</p>
```

**2. Number Formatting**:
```tsx
// Tanzania (TZS)
const formatCurrency = (value: number) => {
  return `TZS ${value.toLocaleString('sw-TZ')}`;
};

// TZS 4,750,000 (not 4.75M in formal contexts)
// TZS 4.75M (allowed in graphs/cards for space)
```

**3. Date Formatting**:
```tsx
// Swahili months
const months = {
  sw: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 
       'Jul', 'Ago', 'Sep', 'Okt', 'Nov', 'Des'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
};
```

**4. RTL Considerations**:
```tsx
// Not needed for Swahili (LTR)
// But keep CSS logical properties for future
margin-inline-start  (not margin-left)
padding-block        (not padding-top/bottom)
```

---

## ✅ Quality Checklist

### Design Consistency
- [ ] All numbers use font-light (300)
- [ ] All spacing uses 8px scale
- [ ] All animations are <600ms
- [ ] 90% of UI is black/white/gray
- [ ] Accents only used for meaning

### Accessibility
- [ ] Color contrast ≥4.5:1 (text)
- [ ] Touch targets ≥44px
- [ ] Focus indicators visible
- [ ] Screen reader labels present
- [ ] Keyboard navigation works

### Performance
- [ ] Initial load <3s (3G)
- [ ] Animations 60fps
- [ ] Images optimized
- [ ] Code splitting implemented
- [ ] API calls debounced

### Localization
- [ ] All text in JSON
- [ ] Numbers formatted correctly
- [ ] Dates localized
- [ ] Currency symbols correct
- [ ] Native Swahili review done

### User Testing
- [ ] 5 participants (Tanzania-based)
- [ ] Onboarding completion rate >90%
- [ ] Goal creation <2 minutes
- [ ] Scenario builder understandable
- [ ] AI insights perceived as helpful

---

## 🚀 Next Steps

1. **Review Specifications** — Read all .md files
2. **Install Dependencies** — motion/react, lucide-react, etc.
3. **Implement Core Components** — Start with design system
4. **Build Onboarding** — Test with real users early
5. **Iterate Dashboard** — Get empty + default states perfect
6. **Add Advanced Features** — Scenario builder, dividends, etc.
7. **Polish & Test** — Accessibility, performance, usability
8. **Launch Beta** — Small group (100 users)
9. **Gather Feedback** — Weekly iterations
10. **Scale** — Regional expansion (Kenya, Uganda, Rwanda)

---

**Version**: 1.0  
**Last Updated**: January 15, 2026  
**Status**: ✅ Specification Complete — Ready for Implementation

---

**Built for Tanzania. Designed for calm. Inspired by excellence.**
