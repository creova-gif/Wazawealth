# WAZA WEALTH — Design Implementation Guide

**From Specification to Production**

---

## 📋 Document Structure

This design system consists of 4 comprehensive documents:

1. **WAZA_COMPREHENSIVE_UX_SPEC.md** (49 pages)
   - Detailed design specifications for all 7 features
   - Layout structures, spacing rules, component specs
   - Visual language, motion principles
   - Design tokens and implementation checklist

2. **WAZA_MICROCOPY.json** (Complete bilingual content)
   - English + Swahili translations for every UI element
   - Structured as JSON for easy integration
   - Covers buttons, labels, messages, errors, success states

3. **WAZA_UI_STATES.md** (Complete state matrix)
   - Every screen's 6 core states documented
   - Loading, empty, error, success patterns
   - Motion recipes and error handling
   - Code examples for each state

4. **WAZA_V2_IMPLEMENTATION.md** (Existing features)
   - Currently implemented components
   - Cross-market trading, stock detail, dividend calendar
   - Dashboard enhancements

---

## 🎯 Design Philosophy Summary

### Core Principles
1. **Confidence over excitement** — Long-term wealth, not gambling
2. **Guidance over speculation** — AI coach, not stock tips
3. **Goals over picks** — Purpose-driven accounts
4. **Simplicity over complexity** — Progressive disclosure

### Visual Identity
- **90% Black & White** — Primary interface
- **8% Grays** — Borders, secondary elements
- **2% Accent** — Only for meaning (green=growth, blue=AI, amber=attention)
- **Typography**: Font-weight 300 for large numbers, 400 for body, 500 for emphasis
- **Motion**: 400ms ease-out standard, 600ms for reveals

---

## 🏗️ Feature Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
**Goal**: Core design system + onboarding

#### Tasks
1. **Design Tokens**
   - [ ] Update spacing scale (8/16/24/32/48)
   - [ ] Refine typography (300/400/500 weights)
   - [ ] Create motion constants (200/400/600ms)
   - [ ] Define color palette (black/white/zinc)

2. **Component Library**
   - [ ] Card (default, hover, selected, loading)
   - [ ] Button (primary, secondary, ghost, states)
   - [ ] Input (text, number, date, states)
   - [ ] Toggle (on/off with smooth animation)
   - [ ] Modal (slide-up, full-screen)
   - [ ] Toast (success, error, info)

3. **Onboarding Flow**
   - [ ] Welcome screen (language select)
   - [ ] Goal selection (multi-select cards)
   - [ ] Risk assessment (visual, no jargon)
   - [ ] Experience level
   - [ ] Trust & security screen
   - [ ] Completion animation

**Success Criteria**:
- All onboarding screens match spec
- Smooth transitions between steps
- Bilingual support working
- State persistence (return to step)

---

### Phase 2: Dashboard Refinement (Week 3-4)
**Goal**: Vesto-inspired clarity

#### Tasks
1. **Hero Wealth Card**
   - [ ] 7xl number (72px, font-weight 300)
   - [ ] Minimal sparkline graph
   - [ ] On-track indicator (green dot)
   - [ ] Smooth entry animation

2. **AI Insight System**
   - [ ] Dismissible daily coach card
   - [ ] 1.5s delayed entry
   - [ ] 24hr dismiss memory
   - [ ] Expandable detail modal

3. **Goal Cards**
   - [ ] Progress bar with 3 states (on track, needs attention, off track)
   - [ ] Tap to expand
   - [ ] Quick actions (add funds, adjust)

4. **Quick Actions Grid**
   - [ ] 2x2 layout with icons
   - [ ] Clear visual hierarchy
   - [ ] Markets, dividends, scenario planner

**Success Criteria**:
- Dashboard loads in <1 second
- Hero number is largest element
- AI insight feels helpful, not annoying
- Goals scannable at a glance

---

### Phase 3: Portfolio & Cross-Market (Week 5-6)
**Goal**: Unified multi-exchange experience

#### Tasks
1. **Portfolio Overview**
   - [ ] Total value card
   - [ ] Growth chart (minimal)
   - [ ] Holdings grouped by country
   - [ ] Filter tabs (DSE/NSE/USE/RSE)

2. **Cross-Market Search**
   - [ ] Real-time search across 4 exchanges
   - [ ] Recent searches
   - [ ] Popular stocks (Tanzania-first)
   - [ ] No results state

3. **Stock Detail**
   - [ ] Big price (6xl font)
   - [ ] Mini spark chart
   - [ ] AI analysis card
   - [ ] Buy Now / Schedule buttons
   - [ ] Fundamentals (expandable)

4. **Smart Routing**
   - [ ] Multi-market availability indicator
   - [ ] Best execution explanation
   - [ ] Educational tooltip

**Success Criteria**:
- Search returns results in <200ms
- Stock detail loads in <500ms
- AI analysis is stock-specific
- Smart routing is understandable

---

### Phase 4: Scheduled Trading (Week 7-8)
**Goal**: Wizard-style, calm flow

#### Tasks
1. **Step 1: Asset Selection**
   - [ ] Search + popular stocks
   - [ ] Baskets included
   - [ ] Clear selection state

2. **Step 2: Amount**
   - [ ] Large input, autofocus
   - [ ] Quick presets (50K, 100K, etc.)
   - [ ] Real-time share calculation
   - [ ] Insufficient funds error

3. **Step 3: Schedule**
   - [ ] Once / Recurring / Price target
   - [ ] Frequency selector
   - [ ] Calendar picker
   - [ ] Clear preview

4. **Step 4: Condition (Optional)**
   - [ ] Price above/below
   - [ ] Visual comparison
   - [ ] Plain language explanation

5. **Step 5: Review**
   - [ ] Summary card
   - [ ] Edit buttons
   - [ ] Clear disclaimer
   - [ ] Confirm button

6. **Success Screen**
   - [ ] Checkmark animation
   - [ ] Encouraging message
   - [ ] View schedule / Done CTAs

**Success Criteria**:
- Flow completes in <2 minutes
- No jargon or confusing terms
- Error states are helpful
- Success feels rewarding

---

### Phase 5: Scenario Builder (Week 9-10)
**Goal**: Educational, playful exploration

#### Tasks
1. **Slider Interface**
   - [ ] Monthly contribution (smooth drag)
   - [ ] Time horizon (snap points)
   - [ ] Haptic feedback (mobile)

2. **Live Projection Graph**
   - [ ] Confidence bands
   - [ ] Smooth spring animation
   - [ ] Updates in <100ms

3. **AI Explanation**
   - [ ] Positive scenario (green)
   - [ ] Stretch scenario (amber)
   - [ ] Unrealistic scenario (red)
   - [ ] Helpful suggestions

4. **Apply Changes**
   - [ ] Confirmation modal
   - [ ] Goal update animation
   - [ ] Success feedback

**Success Criteria**:
- Sliders feel responsive
- Graph updates smoothly
- AI tone is supportive
- Unrealistic goals redirected gently

---

### Phase 6: Dividend Calendar (Week 11)
**Goal**: Serene income tracking

#### Tasks
1. **Calendar View**
   - [ ] Hero quarterly total
   - [ ] Quarter tabs
   - [ ] Chronological list
   - [ ] Payment status badges

2. **Dividend Detail**
   - [ ] Tap to expand
   - [ ] Payment date, amount, yield
   - [ ] Reminder toggle

3. **Annual Forecast**
   - [ ] Quarterly breakdown
   - [ ] Top dividend stocks
   - [ ] AI income insight
   - [ ] Auto-reinvest option

**Success Criteria**:
- Easy to see next payment
- Forecast is understandable
- Reminders work reliably

---

### Phase 7: AI Coach & Alerts (Week 12)
**Goal**: Helpful, never annoying

#### Tasks
1. **Alert Card System**
   - [ ] Daily insight (morning)
   - [ ] Goal progress (milestones)
   - [ ] Weekly summary (Sunday)
   - [ ] Trade executed
   - [ ] Dividend received
   - [ ] Market movement (optional)

2. **Dismissal Logic**
   - [ ] Swipe to dismiss
   - [ ] Tap X button
   - [ ] Auto-dismiss after 30s
   - [ ] 24hr memory

3. **Settings Screen**
   - [ ] Toggle each alert type
   - [ ] Tone selector (encouraging/neutral/minimal)
   - [ ] Frequency limits

4. **Push Notifications**
   - [ ] Permission request (first time)
   - [ ] Actionable notifications
   - [ ] Deep link to relevant screen

**Success Criteria**:
- Max 2 notifications per day
- Tone is encouraging
- Easy to disable
- Deep links work

---

## 🎨 Design Token Reference

### Spacing
```tsx
const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  6: '24px',
  8: '32px',
  12: '48px',
  16: '64px'
}
```

### Typography
```tsx
const typography = {
  micro: { size: '12px', weight: 400 },
  caption: { size: '14px', weight: 400 },
  body: { size: '16px', weight: 400 },
  lead: { size: '18px', weight: 500 },
  large: { size: '24px', weight: 300 },
  huge: { size: '48px', weight: 300 },
  hero: { size: '72px', weight: 300 }
}
```

### Colors
```tsx
const colors = {
  black: '#000000',
  white: '#FFFFFF',
  zinc: {
    50: '#FAFAFA',
    100: '#F4F4F5',
    200: '#E4E4E7',
    300: '#D4D4D8',
    400: '#A1A1AA',
    500: '#71717A',
    600: '#52525B',
    700: '#3F3F46',
    800: '#27272A',
    900: '#18181B',
    950: '#09090B'
  },
  green: {
    500: '#22C55E',
    600: '#16A34A'
  },
  blue: {
    500: '#3B82F6',
    600: '#2563EB'
  },
  amber: {
    500: '#F59E0B',
    600: '#D97706'
  },
  red: {
    500: '#EF4444',
    600: '#DC2626'
  }
}
```

### Motion
```tsx
const motion = {
  fast: '200ms ease-out',
  standard: '400ms ease-out',
  slow: '600ms ease-in-out',
  spring: {
    type: 'spring',
    stiffness: 300,
    damping: 30
  }
}
```

---

## 🧪 Testing Checklist

### Per Screen
- [ ] Loads correctly (no flash)
- [ ] Empty state displays
- [ ] Loading state shows skeleton/spinner
- [ ] Error state is helpful
- [ ] Success state is rewarding
- [ ] Animations are smooth (60fps)
- [ ] Touch targets are 44px minimum
- [ ] Text is readable (AA contrast)
- [ ] Works in both languages
- [ ] Handles slow network

### Cross-Screen
- [ ] Navigation is smooth
- [ ] State persists when returning
- [ ] Bottom nav highlights correctly
- [ ] Back button works
- [ ] Deep links work
- [ ] Authentication persists

### Edge Cases
- [ ] No internet connection
- [ ] Server error
- [ ] Invalid data
- [ ] Extremely long text
- [ ] Very small/large numbers
- [ ] Timezone differences
- [ ] Market closed

---

## 📊 Performance Targets

### Core Web Vitals
- **LCP** (Largest Contentful Paint): <2.5s
- **FID** (First Input Delay): <100ms
- **CLS** (Cumulative Layout Shift): <0.1

### Custom Metrics
- **Time to Interactive**: <3s
- **Dashboard Load**: <1s
- **Search Response**: <200ms
- **Animation FPS**: 60fps
- **Bundle Size**: <500KB (gzipped)

---

## 🌍 Localization Guidelines

### Swahili Translation Rules
1. **Financial Terms**
   - Use established Swahili terms
   - Examples: "Hisa" (shares), "Gawio" (dividend), "Soko" (market)

2. **Tone**
   - Formal but approachable
   - Use "you" (wewe) sparingly
   - Passive voice for reassurance

3. **Number Formatting**
   - TZS always before number
   - Commas for thousands: TZS 1,000,000
   - Abbreviations: K (thousand), M (million)

4. **Date Formatting**
   - Day/Month/Year: 15/01/2026
   - Month names in Swahili: Januari, Februari, etc.

---

## 🚀 Launch Checklist

### Pre-Launch
- [ ] All 7 features implemented
- [ ] Bilingual support complete
- [ ] Error states tested
- [ ] Performance optimized
- [ ] Accessibility audit passed
- [ ] Security review completed
- [ ] Legal compliance verified
- [ ] Analytics integrated
- [ ] User testing completed

### Launch Day
- [ ] Monitor error rates
- [ ] Track performance metrics
- [ ] Watch user feedback
- [ ] Have rollback plan ready
- [ ] Support team briefed

### Post-Launch
- [ ] Collect user feedback
- [ ] Monitor analytics
- [ ] Iterate based on data
- [ ] Fix critical bugs within 24hrs

---

## 📚 Additional Resources

### Design References
- Vesto app (visual inspiration only)
- Wealthsimple (calm tone reference)
- Robinhood (simplicity reference)
- M-Pesa (local familiarity)

### Typography References
- SF Pro Display (iOS)
- Inter (cross-platform)
- System fonts preferred

### Motion References
- Apple Human Interface Guidelines
- Material Design Motion
- Framer Motion documentation

---

## 🤝 Collaboration Guidelines

### Designer-Developer Handoff
1. **Before Development**
   - Review spec together
   - Clarify edge cases
   - Agree on timeline
   - Set up regular check-ins

2. **During Development**
   - Review in-progress work
   - Adjust specs if needed
   - Test on real devices
   - Iterate quickly

3. **After Development**
   - Final QA review
   - Document deviations
   - Update design system
   - Celebrate launch!

### Feedback Loops
- **Daily**: Slack check-ins
- **Weekly**: Design review meetings
- **Sprint**: Demo new features
- **Monthly**: Retrospective

---

## 🎓 Design Principles Recap

1. **Simplicity First**
   - Big numbers, few charts
   - One action per screen
   - Hide complexity behind calm UI

2. **Progressive Disclosure**
   - Show basics first
   - Reveal details on demand
   - Never overwhelm

3. **Trust Through Design**
   - Calm colors (black/white)
   - Clear language (no jargon)
   - Transparent processes
   - Regulatory badges visible

4. **Goal-Focused**
   - Every screen answers: "Am I on track?"
   - Purpose-based language
   - Celebrate progress
   - Support during setbacks

5. **AI as Guide**
   - Subtle intelligence
   - Encouraging tone
   - Never pushy
   - Dismissible insights

---

## 📖 Quick Reference

### File Structure
```
/WAZA_COMPREHENSIVE_UX_SPEC.md    — Full design spec
/WAZA_MICROCOPY.json               — Bilingual content
/WAZA_UI_STATES.md                 — State documentation
/WAZA_DESIGN_SYSTEM.md             — Vesto-inspired system
/WAZA_V2_IMPLEMENTATION.md         — Current features
/WAZA_WEALTH_FEATURES.md           — Feature documentation
```

### Component Locations
```
/src/app/components/
  ├─ WazaDashboard.tsx             — Main dashboard
  ├─ CrossMarketScreen.tsx         — Multi-exchange trading
  ├─ StockDetailScreen.tsx         — Stock info + scheduling
  ├─ DividendCalendarScreen.tsx    — Dividend tracking
  ├─ ScenarioPlanner.tsx           — Goal simulation
  ├─ PurposeBasedAccounts.tsx      — Goal accounts
  └─ EnhancedAICopilot.tsx         — AI insights
```

---

## ✅ Definition of Done

A feature is complete when:
- [ ] All 6 states implemented (initial, empty, default, loading, error, success)
- [ ] Bilingual support working
- [ ] Motion is smooth (60fps)
- [ ] Error states are helpful
- [ ] Success states are rewarding
- [ ] Touch targets are 44px+
- [ ] Text contrast is AA compliant
- [ ] Works offline (graceful degradation)
- [ ] Analytics events firing
- [ ] Documentation updated

---

**Built for Tanzania. Designed with care.**

**Version**: 1.0  
**Status**: Ready for Implementation  
**Last Updated**: January 15, 2026
