# WAZA WEALTH — Cross-Market Portfolio & Trading Screen Design

**Vesto-Inspired | Tanzania-First | Multi-Exchange**

---

## 🎯 Design Overview

A unified portfolio view that consolidates holdings across four East African exchanges (DSE, NSE, USE, RSE) with intelligent search, filtering, and AI-powered insights — all delivered in WAZA's signature calm, black & white aesthetic.

---

## 📐 Screen Structure

### Hierarchy (Top to Bottom)

```
┌─────────────────────────────────────┐
│  1. STICKY HEADER                    │  ← Navigation + Search + Filters
├─────────────────────────────────────┤
│  2. HERO SUMMARY CARD                │  ← Total value (7xl), gain %
├─────────────────────────────────────┤
│  3. AI INSIGHT CARD                  │  ← Diversification status
├─────────────────────────────────────┤
│  4. GROUP TOGGLE                     │  ← Country vs Sector view
├─────────────────────────────────────┤
│  5. HOLDINGS (GROUPED)               │  ← Expandable position cards
│     ┌─────────────────────────┐     │
│     │ 🇹🇿 Tanzania (2)        │     │
│     │  • CRDB                 │     │
│     │  • VOD                  │     │
│     └─────────────────────────┘     │
│     ┌─────────────────────────┐     │
│     │ 🇰🇪 Kenya (2)           │     │
│     │  • SAFARICOM            │     │
│     │  • EQUITY               │     │
│     └─────────────────────────┘     │
└─────────────────────────────────────┘
```

---

## 🎨 Component Breakdown

### 1. **Sticky Header** (z-index: 20)

**Structure**:
```tsx
┌─────────────────────────────────────┐
│  [←]  Portfolio              [⋮]    │  ← Back, Title, Filter button
├─────────────────────────────────────┤
│  [🔍] Search across DSE, NSE...     │  ← Unified search bar
├─────────────────────────────────────┤
│  [FILTERS PANEL - Expandable]       │  ← Exchanges + Sectors
│  • DSE 🇹🇿  NSE 🇰🇪  USE 🇺🇬  RSE 🇷🇼 │
│  • Banking | Telecom | Energy       │
│  [Clear All]  [Apply Filters]       │
└─────────────────────────────────────┘
```

**Design Specs**:
```css
Header Container:
  bg-white/95 backdrop-blur-md
  border-b border-zinc-100
  sticky top-0

Back Button:
  w-10 h-10 rounded-full
  bg-zinc-50 hover:bg-zinc-100
  
Search Input:
  h-12 pl-12 pr-4
  bg-zinc-50 border-zinc-200 rounded-xl
  focus:border-black focus:ring-2 focus:ring-zinc-100

Filter Button (Active):
  bg-black text-white
  
Filter Button (Inactive):
  bg-zinc-50 text-zinc-700
```

**Motion**:
```tsx
// Filter panel expand/collapse
initial={{ height: 0, opacity: 0 }}
animate={{ height: 'auto', opacity: 1 }}
exit={{ height: 0, opacity: 0 }}
transition={{ duration: 0.3 }}
```

**Interaction States**:
- **Default**: Search bar visible, filters collapsed
- **Search Active**: X button appears in search field
- **Filters Open**: Panel slides down (300ms), exchanges + sectors visible
- **Filter Applied**: Button turns black, badge count shows

---

### 2. **Hero Summary Card**

**Structure**:
```tsx
┌─────────────────────────────────────┐
│  TOTAL VALUE                         │  ← Micro label
│                                      │
│  238.5K             ↗ +11.3%        │  ← 7xl + Growth
│                                      │
│  ● On track                          │  ← Pulsing status dot
└─────────────────────────────────────┘
```

**Design Specs**:
```css
Card:
  p-8 border-zinc-200 rounded-2xl

Hero Number:
  text-7xl font-light tracking-tight
  (Displays in thousands: 238.5K)

Growth Indicator:
  text-2xl font-light tabular-nums
  text-green-600 (positive) | text-red-600 (negative)
  
Status Dot:
  w-2 h-2 bg-green-500 rounded-full
  animate: scale(1 → 1.2 → 1), 2s infinite
```

**Motion**:
```tsx
// Card entry
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}

// Hero number scale
initial={{ opacity: 0, scale: 0.9 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.6 }}
```

**States**:
- **Loading**: Skeleton with pulse
- **Default**: Full data with pulsing dot
- **Positive Growth**: Green text + up arrow
- **Negative Growth**: Red text + down arrow

---

### 3. **AI Insight Card**

**Purpose**: Provide intelligent diversification feedback

**Structure**:
```tsx
┌─────────────────────────────────────┐
│  ✨ Well diversified across regions  │  ← Green variant
│                                      │
│  OR                                  │
│                                      │
│  ✨ Consider adding regional diversity│ ← Amber variant
└─────────────────────────────────────┘
```

**Logic**:
```tsx
const getAIStatus = () => {
  const uniqueCountries = new Set(positions.map(p => p.country)).size;
  
  if (uniqueCountries >= 3) 
    return { message: 'Well diversified', color: 'green' };
  
  if (uniqueCountries === 2) 
    return { message: 'Optimized for growth', color: 'blue' };
  
  return { message: 'Consider diversity', color: 'amber' };
};
```

**Design Specs**:
```css
Green Variant:
  bg-green-50 border-green-100
  text-green-900
  icon: text-green-700

Blue Variant:
  bg-blue-50 border-blue-100
  text-blue-900
  icon: text-blue-700

Amber Variant:
  bg-amber-50 border-amber-100
  text-amber-900
  icon: text-amber-700
```

---

### 4. **Group Toggle**

**Purpose**: Switch between Country and Sector views

**Structure**:
```tsx
[Group by country] [Group by sector]
  ■■■■■■■■■■■■      □□□□□□□□□□□
  Active              Inactive
```

**Design Specs**:
```css
Active Button:
  bg-zinc-900 text-white
  
Inactive Button:
  bg-zinc-100 text-zinc-600
  hover:bg-zinc-200

Transition: all 200ms
```

**Behavior**:
- Single select (radio button logic)
- Instant re-grouping (no loading state)
- Smooth card re-arrangement (staggered animation)

---

### 5. **Position Cards** (Expandable)

**Collapsed State**:
```tsx
┌─────────────────────────────────────┐
│  CRDB              [DSE]             │  ← Symbol + Exchange badge
│  CRDB Bank                           │
│                              202.5K  │  ← Current value
│                              ↗ +2.3%│  ← Change
│                                      │
│  450 shares • TZS 450 • 6.2% yield  │  ← Quick stats
│                                      │
│              ⌄                       │  ← Expand chevron
└─────────────────────────────────────┘
```

**Expanded State**:
```tsx
┌─────────────────────────────────────┐
│  [Same header as collapsed]          │
│                                      │
│  ─────────────────────────────────  │
│                                      │
│  Avg. Cost       Current Price       │  ← Grid stats
│  TZS 440         TZS 450             │
│                                      │
│  Shares          Gain                │
│  450             +TZS 4,500          │
│                                      │
│  ┌─────────────────────────────┐    │
│  │ ✨ Strong fundamentals,      │    │  ← AI Insight
│  │    consistent dividend       │    │
│  └─────────────────────────────┘    │
│                                      │
│  [ View Details → ]                  │  ← CTA
│                                      │
│              ⌃                       │  ← Collapse chevron
└─────────────────────────────────────┘
```

**Design Specs**:
```css
Card (Collapsed):
  p-5 border-zinc-200 rounded-2xl
  hover:border-zinc-400
  cursor-pointer

Exchange Badge:
  text-xs px-2 py-0.5
  bg-zinc-100 text-zinc-600
  rounded

Current Value:
  text-xl font-light tabular-nums

Change Indicator:
  text-sm font-medium
  text-green-600 (up) | text-red-600 (down)

Expanded Background:
  bg-zinc-50

Stats Grid:
  grid-cols-2 gap-4

AI Insight Card:
  p-4 bg-white border-zinc-200
  Sparkles icon: text-blue-600
```

**Motion**:
```tsx
// Card entry (staggered)
initial={{ opacity: 0, x: -10 }}
animate={{ opacity: 1, x: 0 }}
transition={{ delay: 0.4 + groupIdx * 0.1 + posIdx * 0.05 }}

// Expand/collapse
initial={{ height: 0, opacity: 0 }}
animate={{ height: 'auto', opacity: 1 }}
exit={{ height: 0, opacity: 0 }}
transition={{ duration: 0.3 }}

// Chevron rotate
animate={{ rotate: expanded ? 180 : 0 }}
transition={{ duration: 0.3 }}
```

**Interaction**:
1. **Tap card** → Expands (300ms slide)
2. **Tap again** → Collapses
3. **Tap "View Details"** → Navigate to stock detail screen

---

## 🎬 Animation Choreography

### Initial Load Sequence

```
0ms:     Header appears (instant)
0-500ms: Hero card slides up + fades
200ms:   AI insight fades in
300ms:   Group toggle appears
400ms:   First group header appears
450ms:   First position card (Tanzania group)
500ms:   Second position card
550ms:   Third position card
...
```

### Search/Filter Interaction

```
User types → Instant filter
Cards that match: Stay visible
Cards that don't: Fade out (200ms)
New grouping: Stagger in (100ms per card)
```

### Expand/Collapse

```
Tap card:
  0ms:     Chevron rotates (180° in 300ms)
  0ms:     Expanded section slides down (300ms)
  100ms:   AI insight fades in
  200ms:   View Details button appears
```

---

## 🌍 Exchange & Country Mapping

### Visual Indicators

```tsx
DSE → 🇹🇿 Tanzania
NSE → 🇰🇪 Kenya
USE → 🇺🇬 Uganda
RSE → 🇷🇼 Rwanda
```

**Badge Design**:
```css
Exchange Badge:
  px-2 py-0.5 rounded
  bg-zinc-100 text-zinc-600
  text-xs font-medium

Flag Emoji:
  text-2xl (in group headers)
  text-base (in filter buttons)
```

---

## 🔍 Search & Filter Logic

### Search Behavior

**Searches across**:
- Stock symbols (CRDB, SAFARICOM, etc.)
- Company names (CRDB Bank, Safaricom PLC, etc.)
- Case-insensitive
- Real-time (no submit button)

**UI Feedback**:
- Results update instantly (<100ms)
- No matches → Empty state with suggestion
- Clear button (X) appears when typing

### Filter Behavior

**Exchange Filter**:
- Multi-select (All | DSE | NSE | USE | RSE)
- Pills with flags
- Active state: Black background

**Sector Filter**:
- Multi-select (All | Banking | Telecom | etc.)
- Pills without icons
- Active state: Black background

**Apply Logic**:
- AND operation (Exchange AND Sector)
- "Clear All" resets to defaults
- "Apply Filters" closes panel + filters data

---

## 🎨 Color Usage (90/8/2 Rule)

### 90% Black & White
```
Black:   #000000   Text, active states, CTAs
White:   #FFFFFF   Backgrounds, cards
Zinc-50: #FAFAFA   Alternative backgrounds
```

### 8% Grays (Zinc)
```
Zinc-100: Inactive buttons, badges
Zinc-200: Borders (default)
Zinc-400: Borders (hover)
Zinc-600: Secondary text
```

### 2% Accent (Semantic)
```
Green-600:  Positive change, on-track
Red-600:    Negative change
Blue-600:   AI insights
Amber-600:  Warnings/suggestions
```

---

## 📱 Responsive Behavior

### Mobile (Default)
- Single column layout
- Full-width cards
- Bottom sheet for filters
- Tap to expand positions

### Tablet (768px+)
- Same layout (mobile-first)
- Wider max-width (768px)
- Side panel for filters

### Desktop (1024px+)
- Persistent filters sidebar
- Grid layout (2 columns) for position cards
- Hover states more prominent

---

## 🌐 Bilingual Microcopy

### English → Swahili

```json
{
  "title": "Portfolio" → "Mkoba",
  "search": "Search stocks..." → "Tafuta hisa...",
  "filters": "Filters" → "Chuja",
  "all": "All" → "Yote",
  "groupByCountry": "Group by country" → "Panga kwa nchi",
  "groupBySector": "Group by sector" → "Panga kwa sekta",
  "totalValue": "Total Value" → "Jumla",
  "totalGain": "Total Gain" → "Faida Jumla",
  "onTrack": "On track" → "Unafanya Vizuri",
  "holdings": "Holdings" → "Vipande",
  "shares": "shares" → "hisa",
  "avgCost": "Avg. Cost" → "Bei ya Wastani",
  "currentPrice": "Current" → "Bei ya Sasa",
  "gain": "Gain" → "Faida",
  "loss": "Loss" → "Hasara",
  "dividendYield": "Dividend Yield" → "Mapato ya Gawio",
  "aiInsight": "AI Insight" → "Uchambuzi wa AI",
  "viewDetails": "View Details" → "Angalia Maelezo",
  "optimized": "Optimized for your growth plan" → "Imeboreshwa kwa mpango wako",
  "diversified": "Well diversified across regions" → "Imetawanyika vizuri kwa mikoa",
  "needsDiversity": "Consider adding regional diversity" → "Fikiria kuongeza utofauti"
}
```

---

## 🎭 UI States

### 1. Empty State (No Holdings)

```tsx
┌─────────────────────────────────────┐
│  [←]  Portfolio              [⋮]    │
├─────────────────────────────────────┤
│                                      │
│         [Growth Icon]                │  ← Large icon
│                                      │
│      No holdings yet                 │  ← Title
│  Build wealth across East Africa     │  ← Subtitle
│                                      │
│    [ Start Investing ]               │  ← CTA
│                                      │
└─────────────────────────────────────┘
```

**Design**:
- Centered layout
- 24px icon in zinc-100 circle
- 3xl title, base subtitle
- Single CTA button

---

### 2. Loading State

```tsx
Hero Card:      [Skeleton pulse]
AI Card:        [Skeleton pulse]
Position Cards: [3 skeleton cards, staggered]
```

**Animation**:
```tsx
// Pulse effect
animate={{ opacity: [0.5, 1, 0.5] }}
transition={{ duration: 1.5, repeat: Infinity }}
```

---

### 3. Search - No Results

```tsx
┌─────────────────────────────────────┐
│  [🔍] crdb_______________ [×]        │
├─────────────────────────────────────┤
│                                      │
│  No stocks match "crdb"              │
│                                      │
│  Try:                                │
│  • Check your spelling               │
│  • Search by company name            │
│  • Browse by exchange                │
│                                      │
└─────────────────────────────────────┘
```

---

### 4. Error State (Exchange Disconnected)

```tsx
┌─────────────────────────────────────┐
│  ⚠️ NSE data temporarily unavailable │  ← Amber card
│  Last updated: 2 hours ago           │
│  [ Retry ]                           │
└─────────────────────────────────────┘
```

**Design**:
- Amber-50 background
- Amber-700 text
- Retry button (outline)
- Shows last known data (grayed out)

---

## 🧭 Smart Routing Indicator

**When to Show**: Multi-listing scenario (stock on multiple exchanges)

**Design**:
```tsx
┌─────────────────────────────────────┐
│  💡 Best Execution                   │  ← Info card
│                                      │
│  We'll route to NSE (best price)     │  ← Simple explanation
│  TZS 450.50 vs DSE TZS 451           │  ← Price comparison
│                                      │
│  [ Learn about routing → ]           │  ← Educational link
└─────────────────────────────────────┘
```

**Language**:
- Avoid: "Order routing", "Liquidity", "NBBO"
- Use: "Best price", "Optimized for you", "We found a better deal"

---

## 📊 Data Refresh Strategy

### Real-time vs Delayed

```
DSE: 15-minute delay (free tier)
NSE: Real-time (premium)
USE: 20-minute delay
RSE: End-of-day
```

**UI Indicator**:
```tsx
<p className="text-xs text-zinc-500">
  Prices updated 15 minutes ago
  [ Refresh now ]
</p>
```

---

## 🎯 Key Design Principles Applied

### 1. Confidence over Excitement
✅ Calm colors (90% black/white)  
✅ Large readable numbers (7xl hero)  
✅ No red/green everywhere (only for change %)  

### 2. Guidance over Speculation
✅ AI insights (diversification, not hot tips)  
✅ "On track" vs "You're winning!"  
✅ Educational tooltips  

### 3. Goals over Stock Picking
✅ Portfolio value first  
✅ Individual stocks secondary  
✅ Cross-market view (not single stock focus)  

### 4. Simplicity over Complexity
✅ One search bar (all exchanges)  
✅ Progressive disclosure (expand for details)  
✅ Clear grouping (country/sector)  

---

## 🚀 Performance Optimizations

### Code Splitting
```tsx
// Lazy load expanded details
const ExpandedDetails = lazy(() => import('./ExpandedDetails'));
```

### Virtualization
```tsx
// For portfolios with 50+ positions
import { VirtualList } from 'react-window';
```

### Debounced Search
```tsx
const debouncedSearch = useMemo(
  () => debounce(setSearchQuery, 200),
  []
);
```

---

## ✅ Accessibility

### Keyboard Navigation
- Tab through filters
- Enter to expand cards
- Escape to close filters/expanded views

### Screen Readers
```tsx
<button aria-label={`Expand ${position.symbol} details`}>
  <ChevronDown aria-hidden="true" />
</button>
```

### Focus Indicators
```css
focus:ring-2 focus:ring-zinc-100
focus:outline-none
```

---

## 📋 Component Props

```tsx
interface CrossMarketPortfolioScreenProps {
  language: 'sw' | 'en';
  onBack: () => void;
  onNavigateToStock: (symbol: string) => void;
  positions?: Position[];       // Optional (uses sample data)
  loading?: boolean;
  error?: string | null;
}

interface Position {
  symbol: string;
  name: string;
  exchange: 'DSE' | 'NSE' | 'USE' | 'RSE';
  country: 'Tanzania' | 'Kenya' | 'Uganda' | 'Rwanda';
  shares: number;
  avgCost: number;
  currentPrice: number;
  currentValue: number;
  profitLoss: number;
  profitLossPercent: number;
  sector: string;
  dividendYield?: number;
  aiInsight?: string;
}
```

---

## 🎓 Usage Example

```tsx
import { CrossMarketPortfolioScreen } from '@/app/components/CrossMarketPortfolioScreen';

function App() {
  return (
    <CrossMarketPortfolioScreen
      language="en"
      onBack={() => navigate('dashboard')}
      onNavigateToStock={(symbol) => navigate(`stock/${symbol}`)}
    />
  );
}
```

---

**Version**: 1.0  
**Status**: ✅ Production-Ready  
**Last Updated**: January 15, 2026

**Built for Tanzania. Designed for calm. Inspired by excellence.**
