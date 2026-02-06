# WAZA WEALTH — Cross-Market Portfolio Implementation Checklist

**Production Readiness Guide**

---

## ✅ Design Deliverables (Complete)

- [x] **CrossMarketPortfolioScreen.tsx** — Main component (500+ lines)
- [x] **WAZA_CROSS_MARKET_PORTFOLIO_DESIGN.md** — Complete design system
- [x] **WAZA_VESTO_COMPARISON.md** — Inspiration vs implementation
- [x] **Sample data structure** — Position interface defined
- [x] **Bilingual microcopy** — English + Swahili (40+ strings)
- [x] **All UI states** — Empty, loading, error, expanded
- [x] **Animation choreography** — Entry, expand, filter
- [x] **Accessibility patterns** — Keyboard nav, screen readers

---

## 🔧 Backend Integration Required

### 1. API Endpoints Needed

```typescript
// Get user's portfolio (all exchanges)
GET /api/portfolio
Response: {
  positions: Position[],
  totalValue: number,
  totalCost: number,
  lastUpdated: string
}

// Search stocks across exchanges
GET /api/stocks/search?q={query}&exchange={exchange}&sector={sector}
Response: {
  results: Stock[],
  count: number
}

// Get stock detail
GET /api/stocks/{symbol}?exchange={exchange}
Response: {
  symbol: string,
  name: string,
  currentPrice: number,
  change: number,
  dividendYield: number,
  aiInsight: string
}
```

### 2. Real-time Data Integration

**Options**:
- **WebSocket** — For real-time price updates (premium)
- **Polling** — 15-second intervals (standard)
- **Manual refresh** — User-initiated (free tier)

**Recommendation**: Start with polling, upgrade to WebSocket for premium users.

---

## 📊 Data Requirements

### Position Data Structure

```typescript
interface Position {
  // Identification
  symbol: string;              // "CRDB"
  name: string;                // "CRDB Bank"
  exchange: 'DSE' | 'NSE' | 'USE' | 'RSE';
  country: 'Tanzania' | 'Kenya' | 'Uganda' | 'Rwanda';
  
  // Holdings
  shares: number;              // 450
  avgCost: number;             // 440
  purchaseDate: string;        // "2025-01-15"
  
  // Current State
  currentPrice: number;        // 450
  currentValue: number;        // shares * currentPrice
  lastUpdated: string;         // "2026-01-15T14:30:00Z"
  
  // Performance
  profitLoss: number;          // (currentPrice - avgCost) * shares
  profitLossPercent: number;   // ((currentPrice - avgCost) / avgCost) * 100
  
  // Metadata
  sector: string;              // "Banking"
  dividendYield?: number;      // 6.2
  aiInsight?: string;          // "Strong fundamentals..."
}
```

### Sample Data Generator

```typescript
// For development/testing
const generateSamplePortfolio = (): Position[] => {
  return [
    {
      symbol: 'CRDB',
      name: 'CRDB Bank',
      exchange: 'DSE',
      country: 'Tanzania',
      shares: 450,
      avgCost: 440,
      currentPrice: 450,
      currentValue: 202500,
      profitLoss: 4500,
      profitLossPercent: 2.3,
      sector: 'Banking',
      dividendYield: 6.2,
      aiInsight: 'Strong fundamentals, consistent dividend history'
    },
    // ... more positions
  ];
};
```

---

## 🎨 Component Integration

### 1. Add to Main App

```tsx
// In App.tsx or router
import { CrossMarketPortfolioScreen } from '@/app/components/CrossMarketPortfolioScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  
  return (
    <>
      {currentScreen === 'portfolio' && (
        <CrossMarketPortfolioScreen
          language={language}
          onBack={() => setCurrentScreen('dashboard')}
          onNavigateToStock={(symbol) => {
            setCurrentScreen('stock-detail');
            setSelectedStock(symbol);
          }}
        />
      )}
    </>
  );
}
```

### 2. Fetch Real Data

```tsx
// Inside CrossMarketPortfolioScreen
useEffect(() => {
  const fetchPortfolio = async () => {
    try {
      const response = await fetch('/api/portfolio', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      const data = await response.json();
      setPositions(data.positions);
    } catch (error) {
      console.error('Portfolio fetch failed:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  fetchPortfolio();
}, [accessToken]);
```

---

## 🌐 Exchange Integration

### DSE (Dar es Salaam Stock Exchange)

**Data Source**: 
- Official: https://www.dse.co.tz
- API: Partner with DSE for live data
- Fallback: Scrape end-of-day prices

**Symbols**: CRDB, VOD, TBL, TCC, TATEPA

**Trading Hours**: 10:00 - 15:00 EAT (Mon-Fri)

**Currency**: TZS

---

### NSE (Nairobi Securities Exchange)

**Data Source**:
- Official: https://www.nse.co.ke
- API: NSE Live data feed (subscription)

**Symbols**: SAFARICOM, EQTY, KCB, NCBA, BAT

**Trading Hours**: 09:00 - 15:00 EAT (Mon-Fri)

**Currency**: KES → Convert to TZS

---

### USE (Uganda Securities Exchange)

**Data Source**:
- Official: https://www.use.or.ug
- API: Limited, use end-of-day data

**Symbols**: STANBIC, UCL, DFCU, BAT

**Trading Hours**: 10:00 - 15:00 EAT (Mon-Fri)

**Currency**: UGX → Convert to TZS

---

### RSE (Rwanda Stock Exchange)

**Data Source**:
- Official: https://www.rse.rw
- API: Partnership required

**Symbols**: BK, I&M, NMG, BRALIRWA

**Trading Hours**: 09:00 - 15:00 CAT (Mon-Fri)

**Currency**: RWF → Convert to TZS

---

## 💱 Currency Conversion

### Strategy

```typescript
const convertToTZS = (amount: number, currency: string): number => {
  const rates = {
    TZS: 1,
    KES: 18.5,    // 1 KES = 18.5 TZS
    UGX: 0.66,    // 1 UGX = 0.66 TZS
    RWF: 1.85     // 1 RWF = 1.85 TZS
  };
  
  return amount * (rates[currency] || 1);
};
```

### Update Frequency

- **Real-time**: Update every 1 hour (API call)
- **Cached**: Store in localStorage for 24 hours
- **Fallback**: Use Bank of Tanzania official rates

---

## 🤖 AI Insights Generation

### Logic

```typescript
const generateAIInsight = (position: Position): string => {
  const { profitLossPercent, dividendYield, sector } = position;
  
  // High dividend yield
  if (dividendYield && dividendYield > 5) {
    return language === 'en'
      ? 'Strong dividend payer, good for income investors'
      : 'Mlipaji mzuri wa gawio, nzuri kwa wawekezaji wa mapato';
  }
  
  // High growth
  if (profitLossPercent > 10) {
    return language === 'en'
      ? 'Strong performer, consider taking profits'
      : 'Inafanya vizuri, fikiria kuchukua faida';
  }
  
  // Sector-specific
  if (sector === 'Banking') {
    return language === 'en'
      ? 'Strong fundamentals, consistent dividend history'
      : 'Misingi imara, historia thabiti ya gawio';
  }
  
  // Default
  return language === 'en'
    ? 'Stable long-term holding'
    : 'Uwekezaji thabiti wa muda mrefu';
};
```

---

## 🔍 Search Implementation

### Full-text Search

```typescript
const searchStocks = (query: string, stocks: Stock[]): Stock[] => {
  const lowerQuery = query.toLowerCase();
  
  return stocks.filter(stock => 
    stock.symbol.toLowerCase().includes(lowerQuery) ||
    stock.name.toLowerCase().includes(lowerQuery) ||
    stock.sector.toLowerCase().includes(lowerQuery)
  );
};
```

### Fuzzy Search (Advanced)

```bash
npm install fuse.js
```

```typescript
import Fuse from 'fuse.js';

const fuse = new Fuse(stocks, {
  keys: ['symbol', 'name', 'sector'],
  threshold: 0.3
});

const results = fuse.search(query);
```

---

## 📱 Performance Optimization

### 1. Virtualization (For Large Portfolios)

```bash
npm install react-window
```

```tsx
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={positions.length}
  itemSize={120}
>
  {({ index, style }) => (
    <div style={style}>
      <PositionCard position={positions[index]} />
    </div>
  )}
</FixedSizeList>
```

### 2. Memoization

```tsx
const groupedPositions = useMemo(() => {
  // Expensive grouping logic
  return groupByCountryOrSector(filteredPositions);
}, [filteredPositions, groupBy]);
```

### 3. Lazy Loading

```tsx
const ExpandedDetails = lazy(() => import('./ExpandedDetails'));

<Suspense fallback={<Skeleton />}>
  <ExpandedDetails position={position} />
</Suspense>
```

---

## 🎯 Analytics & Tracking

### Events to Track

```typescript
// Page view
analytics.track('Portfolio Viewed', {
  totalValue,
  positionsCount: positions.length,
  uniqueExchanges: new Set(positions.map(p => p.exchange)).size
});

// Search
analytics.track('Portfolio Search', {
  query,
  resultsCount: filteredPositions.length
});

// Filter
analytics.track('Portfolio Filtered', {
  exchange: selectedExchange,
  sector: selectedSector
});

// Expand position
analytics.track('Position Expanded', {
  symbol: position.symbol,
  exchange: position.exchange
});

// Navigate to detail
analytics.track('Stock Detail Viewed', {
  symbol,
  from: 'portfolio'
});
```

---

## ✅ Testing Checklist

### Unit Tests

- [ ] Position card renders correctly
- [ ] Search filters positions
- [ ] Exchange filter works
- [ ] Sector filter works
- [ ] Group by country/sector toggles
- [ ] Expand/collapse animation
- [ ] Currency formatting
- [ ] Percentage formatting
- [ ] AI insight generation

### Integration Tests

- [ ] Fetch portfolio data
- [ ] Handle loading state
- [ ] Handle error state
- [ ] Handle empty state
- [ ] Navigate to stock detail
- [ ] Navigate back to dashboard

### E2E Tests

- [ ] Load portfolio screen
- [ ] Search for stock
- [ ] Apply filters
- [ ] Expand position card
- [ ] View stock details
- [ ] Back navigation

---

## 🌐 Localization Testing

### Swahili Translations

- [ ] All labels translated
- [ ] Numbers formatted (commas, decimals)
- [ ] Currency displayed (TZS)
- [ ] Date formats localized
- [ ] Error messages translated
- [ ] Empty states translated

### English Fallbacks

- [ ] Missing translations show English
- [ ] No broken strings
- [ ] Consistent terminology

---

## 📊 Performance Targets

### Load Time
- [ ] Initial load: <3s (3G network)
- [ ] Search results: <100ms
- [ ] Filter application: <100ms
- [ ] Expand animation: 300ms
- [ ] Navigate: <500ms

### Bundle Size
- [ ] Component: <50KB gzipped
- [ ] Dependencies: <200KB total
- [ ] Images: <10KB per flag emoji

### Animations
- [ ] 60fps on mid-range devices
- [ ] No jank during scroll
- [ ] Smooth expand/collapse

---

## 🔒 Security Checklist

### API Security

- [ ] Bearer token authentication
- [ ] HTTPS only
- [ ] Rate limiting (100 req/min)
- [ ] Input validation (search query)
- [ ] SQL injection prevention

### Data Privacy

- [ ] No PII in analytics
- [ ] Portfolio data encrypted at rest
- [ ] Access token stored securely
- [ ] GDPR compliance (data export)

---

## 📱 Device Testing

### Mobile (iOS)
- [ ] iPhone 8 (375×667)
- [ ] iPhone 12 (390×844)
- [ ] iPhone 14 Pro Max (430×932)

### Mobile (Android)
- [ ] Pixel 5 (393×851)
- [ ] Samsung S21 (384×854)
- [ ] Low-end device (2GB RAM)

### Tablet
- [ ] iPad Mini (768×1024)
- [ ] iPad Pro (1024×1366)

### Desktop
- [ ] 1366×768 (common laptop)
- [ ] 1920×1080 (desktop)

---

## 🚀 Deployment Checklist

### Pre-launch

- [ ] All components tested
- [ ] API endpoints live
- [ ] Currency rates updated
- [ ] AI insights working
- [ ] Analytics integrated
- [ ] Error tracking setup (Sentry)
- [ ] Performance monitoring (Web Vitals)

### Launch

- [ ] Beta with 50 users
- [ ] Monitor error rates
- [ ] Gather feedback
- [ ] Iterate quickly

### Post-launch

- [ ] Weekly data refresh (exchange APIs)
- [ ] Monthly AI model updates
- [ ] Quarterly UX improvements

---

## 📞 Support Resources

### Documentation
- Component: `/src/app/components/CrossMarketPortfolioScreen.tsx`
- Design: `/WAZA_CROSS_MARKET_PORTFOLIO_DESIGN.md`
- Comparison: `/WAZA_VESTO_COMPARISON.md`

### External APIs
- DSE: https://www.dse.co.tz
- NSE: https://www.nse.co.ke
- USE: https://www.use.or.ug
- RSE: https://www.rse.rw

### Libraries
- Motion: https://motion.dev
- Tailwind CSS: https://tailwindcss.com
- Lucide Icons: https://lucide.dev

---

## 🎉 Final Checklist

- [x] Component created (500+ lines)
- [x] Design documented (comprehensive)
- [x] Microcopy bilingual (40+ strings)
- [x] All UI states covered (5 states)
- [x] Animations choreographed
- [x] Accessibility patterns
- [ ] Backend API integrated
- [ ] Real data connected
- [ ] Exchange APIs setup
- [ ] Currency conversion live
- [ ] AI insights generated
- [ ] Tests written (unit + integration)
- [ ] Performance optimized
- [ ] Security hardened
- [ ] Deployed to beta

---

**Status**: ✅ Design Complete — Ready for Backend Integration  
**Next Step**: API integration + real data  
**ETA to Production**: 2-3 weeks

**Built for Tanzania. Designed for calm. Ready to scale.**
