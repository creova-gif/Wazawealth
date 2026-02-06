# WAZA WEALTH — UI States & Edge Cases Documentation

**Complete State Matrix for Every Screen**

---

## 🎯 State Categories

Every screen must handle these 6 core states:

1. **Initial Load** — First paint, skeleton/spinner
2. **Empty State** — No data, first-time user
3. **Default State** — Normal operation with data
4. **Loading State** — Fetching/submitting data
5. **Error State** — Network/server/validation errors
6. **Success State** — Confirmation after action

---

## 📱 SCREEN-BY-SCREEN STATES

---

### 1. WELCOME SCREEN

#### Initial Load
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
>
  {/* Logo, title, buttons fade in */}
</motion.div>

Timeline:
  0ms:     Blank screen
  100ms:   Logo appears (y: 20 → 0)
  300ms:   Title appears (y: 20 → 0)
  500ms:   Buttons appear (y: 20 → 0)
  700ms:   Trust badges fade in
```

#### Language Switch
```tsx
// Crossfade text (no flicker)
<AnimatePresence mode="wait">
  <motion.p
    key={language}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
  >
    {content[language].title}
  </motion.p>
</AnimatePresence>
```

#### Button Tap
```tsx
// Immediate feedback
onTap={() => {
  // 1. Scale down
  // 2. Navigate (no delay)
}}

<motion.button
  whileTap={{ scale: 0.97 }}
  transition={{ duration: 0.1 }}
/>
```

#### Loading (Navigation)
```tsx
// Full-screen blur
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="fixed inset-0 bg-white/80 backdrop-blur-sm"
>
  <Spinner />
</motion.div>
```

---

### 2. LANGUAGE SELECTION

#### Default State
```tsx
// Both options visible
// English: Pre-selected if system language is EN
// Swahili: Pre-selected if system language is SW
// Default: Swahili (Tanzania market)

<Card
  className={`
    ${selected ? 'border-black bg-zinc-50' : 'border-zinc-200'}
    hover:border-zinc-400
  `}
/>
```

#### Hover State
```tsx
// Desktop only
hover:border-zinc-400
hover:shadow-sm
transition-all duration-200
```

#### Tap State
```tsx
// Immediate selection
onTap={() => {
  setLanguage(lang)
  // Auto-advance after 500ms
  setTimeout(navigate, 500)
}}
```

#### Selected State
```tsx
border-black
bg-zinc-50
shadow-md

// Checkmark appears
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ type: "spring" }}
>
  ✓
</motion.div>
```

---

### 3. GOAL SELECTION (ONBOARDING)

#### Initial Load
```tsx
// Staggered card entry
{goals.map((goal, i) => (
  <motion.div
    key={goal.id}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4, delay: i * 0.1 }}
  >
    <GoalCard {...goal} />
  </motion.div>
))}
```

#### Empty State (No Selection)
```tsx
// Continue button disabled
<Button
  disabled={selectedGoals.length === 0}
  className="disabled:bg-zinc-300 disabled:text-zinc-500"
>
  Continue
</Button>

// Subtle hint text
{selectedGoals.length === 0 && (
  <p className="text-xs text-zinc-500 mt-2">
    Select at least one goal to continue
  </p>
)}
```

#### Single Selection
```tsx
// Card border turns black
// Checkmark appears in top-right
// Continue button enables

<Card className="border-black bg-zinc-50">
  <CheckCircle className="absolute top-3 right-3" />
</Card>
```

#### Multi-Selection
```tsx
// Up to 3 goals allowed
// 4th tap shows tooltip
{selectedGoals.length === 3 && (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-xs text-amber-700"
  >
    Maximum 3 goals. Remove one to add another.
  </motion.div>
)}
```

#### Loading (Continue)
```tsx
// Button shows spinner
<Button disabled>
  <Spinner className="w-4 h-4 mr-2" />
  Setting up...
</Button>
```

#### Error State
```tsx
// Above Continue button
<motion.div
  initial={{ opacity: 0, height: 0 }}
  animate={{ opacity: 1, height: 'auto' }}
  className="p-3 bg-red-50 border border-red-200 rounded-lg mb-3"
>
  <p className="text-sm text-red-800">
    {language === 'en' 
      ? 'Could not save goals. Please try again.'
      : 'Imeshindwa kuhifadhi malengo. Tafadhali jaribu tena.'}
  </p>
</motion.div>
```

---

### 4. DASHBOARD

#### Initial Load (Skeleton)
```tsx
// Before data loads
<div className="px-6 pt-6">
  {/* Hero Card Skeleton */}
  <Card className="p-8 animate-pulse">
    <div className="h-4 w-24 bg-zinc-200 rounded mb-4"></div>
    <div className="h-16 w-48 bg-zinc-200 rounded mb-6"></div>
    <div className="h-12 w-full bg-zinc-100 rounded"></div>
  </Card>
  
  {/* Goal Cards Skeleton */}
  {[1, 2, 3].map(i => (
    <Card key={i} className="p-4 animate-pulse mt-3">
      <div className="h-4 w-32 bg-zinc-200 rounded mb-2"></div>
      <div className="h-6 w-24 bg-zinc-200 rounded"></div>
    </Card>
  ))}
</div>
```

#### Empty State (First Time)
```tsx
<div className="px-6 pt-12 text-center">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    {/* Illustration */}
    <div className="w-48 h-48 mx-auto mb-6">
      {/* SVG illustration */}
    </div>
    
    <h2 className="text-2xl font-light mb-2">
      {language === 'en' ? 'Welcome to Waza' : 'Karibu Waza'}
    </h2>
    
    <p className="text-zinc-600 mb-6">
      {language === 'en' 
        ? 'Start your wealth journey'
        : 'Anza safari yako ya utajiri'}
    </p>
    
    <Button onClick={() => navigate('mobilemoney')}>
      {language === 'en' ? 'Add Money' : 'Ongeza Pesa'}
    </Button>
  </motion.div>
</div>
```

#### Default State (With Data)
```tsx
// Hero card with wealth value
// AI insight card (dismissible)
// Goal cards (3-5 visible)
// Quick actions
// Bottom nav

// Daily coach card appears after 1.5s
useEffect(() => {
  const timer = setTimeout(() => {
    setShowDailyCoach(true)
  }, 1500)
  return () => clearTimeout(timer)
}, [])
```

#### Pull-to-Refresh
```tsx
// On pull down
<motion.div
  drag="y"
  dragConstraints={{ top: 0, bottom: 0 }}
  onDragEnd={(e, info) => {
    if (info.offset.y > 100) {
      refreshData()
    }
  }}
>
  {/* Dashboard content */}
</motion.div>

// Spinner appears at top
{isRefreshing && (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="absolute top-16 left-1/2 -translate-x-1/2"
  >
    <Spinner />
  </motion.div>
)}
```

#### AI Insight Card States

**Visible**
```tsx
<AnimatePresence>
  {showInsight && (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card className="p-4 bg-zinc-50 relative">
        {/* Insight content */}
        <button onClick={() => setShowInsight(false)}>
          <X className="w-4 h-4" />
        </button>
      </Card>
    </motion.div>
  )}
</AnimatePresence>
```

**Dismissed**
```tsx
// Slide up and fade out
// Don't show again for 24 hours
localStorage.setItem('lastInsightDismiss', Date.now())
```

**Loading**
```tsx
<Card className="p-4 bg-zinc-50 animate-pulse">
  <div className="flex items-start gap-3">
    <div className="w-5 h-5 bg-zinc-300 rounded"></div>
    <div className="flex-1 space-y-2">
      <div className="h-4 w-full bg-zinc-300 rounded"></div>
      <div className="h-4 w-3/4 bg-zinc-300 rounded"></div>
    </div>
  </div>
</Card>
```

#### Error State
```tsx
// Replace hero card
<Card className="p-8 border-red-200 bg-red-50">
  <div className="text-center">
    <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-3" />
    <h3 className="text-lg font-medium text-red-900 mb-2">
      {language === 'en' 
        ? 'Could not load data'
        : 'Imeshindwa kupakia data'}
    </h3>
    <p className="text-sm text-red-700 mb-4">
      {language === 'en'
        ? 'Check your connection and try again'
        : 'Angalia muunganisho wako na jaribu tena'}
    </p>
    <Button onClick={() => refetch()}>
      {language === 'en' ? 'Try Again' : 'Jaribu Tena'}
    </Button>
  </div>
</Card>
```

---

### 5. PORTFOLIO SCREEN

#### Initial Load
```tsx
// Skeleton for:
// - Total value card
// - Holdings list (3 skeleton cards)

<div className="space-y-3">
  {[1, 2, 3].map(i => (
    <Card key={i} className="p-4 animate-pulse">
      <div className="flex justify-between">
        <div className="space-y-2 flex-1">
          <div className="h-4 w-32 bg-zinc-200 rounded"></div>
          <div className="h-6 w-24 bg-zinc-200 rounded"></div>
        </div>
        <div className="h-8 w-16 bg-zinc-200 rounded"></div>
      </div>
    </Card>
  ))}
</div>
```

#### Empty State (No Holdings)
```tsx
<div className="px-6 pt-12 text-center">
  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-zinc-100 flex items-center justify-center">
    <PieChart className="w-16 h-16 text-zinc-400" />
  </div>
  
  <h3 className="text-xl font-light mb-2">
    {language === 'en' ? 'No investments yet' : 'Hakuna uwekezaji bado'}
  </h3>
  
  <p className="text-zinc-600 mb-6">
    {language === 'en'
      ? 'Start investing to build your portfolio'
      : 'Anza kuwekeza kujenga mkoba wako'}
  </p>
  
  <Button onClick={() => navigate('markets')}>
    {language === 'en' ? 'Explore Markets' : 'Chunguza Masoko'}
  </Button>
</div>
```

#### Default State (With Holdings)
```tsx
// Total value card
// Market filter tabs
// Holdings grouped by country/sector
// Each holding shows:
//   - Stock name
//   - Shares owned
//   - Current value
//   - Gain/loss
```

#### Filter Active
```tsx
// Tabs show selected market
<div className="flex gap-2">
  {['All', 'DSE', 'NSE', 'USE', 'RSE'].map(market => (
    <button
      key={market}
      className={`
        px-4 py-2 rounded-full text-sm
        ${selectedMarket === market
          ? 'bg-black text-white'
          : 'bg-zinc-100 text-zinc-600'}
      `}
      onClick={() => setSelectedMarket(market)}
    >
      {market}
    </button>
  ))}
</div>

// Holdings filter instantly (no loading)
// Fade out old, fade in new
<AnimatePresence mode="wait">
  <motion.div
    key={selectedMarket}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
  >
    {filteredHoldings.map(holding => (
      <HoldingCard key={holding.id} {...holding} />
    ))}
  </motion.div>
</AnimatePresence>
```

#### Search Active
```tsx
// Search input focused
// Keyboard opens (mobile)
// Recent searches appear below
// Results update in real-time

<input
  type="text"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  placeholder={language === 'en' ? 'Search stocks...' : 'Tafuta hisa...'}
  className="w-full h-12 px-4 border-2 border-zinc-300 focus:border-black rounded-xl"
  autoFocus
/>

// No results
{searchQuery && filteredStocks.length === 0 && (
  <div className="py-12 text-center text-zinc-500">
    {language === 'en' ? 'No matches found' : 'Hakuna matokeo'}
  </div>
)}
```

#### Loading (Refresh Prices)
```tsx
// Small spinner in header
<div className="flex items-center gap-2 text-xs text-zinc-500">
  <Spinner className="w-3 h-3" />
  Updating prices...
</div>

// Holdings stay visible (no skeleton)
// New prices fade in when ready
<motion.span
  key={price}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  {price}
</motion.span>
```

#### Error State (Price Fetch Failed)
```tsx
// Toast notification at top
<Toast>
  <AlertCircle className="w-4 h-4 text-amber-600" />
  <p className="text-sm">
    {language === 'en'
      ? 'Showing last known prices'
      : 'Inaonyesha bei za mwisho'}
  </p>
</Toast>

// Holdings show with "Last updated" timestamp
<p className="text-xs text-zinc-500">
  Last updated: 10 minutes ago
</p>
```

---

### 6. STOCK DETAIL SCREEN

#### Initial Load
```tsx
// Skeleton for price card
<Card className="p-8 animate-pulse">
  <div className="h-16 w-32 bg-zinc-200 rounded mb-4"></div>
  <div className="h-12 w-full bg-zinc-100 rounded"></div>
</Card>

// Skeleton for AI analysis
<Card className="p-6 bg-blue-50 animate-pulse">
  <div className="space-y-2">
    <div className="h-4 w-full bg-blue-200 rounded"></div>
    <div className="h-4 w-3/4 bg-blue-200 rounded"></div>
  </div>
</Card>
```

#### Default State
```tsx
// Price card with chart
// Buy Now / Schedule Trade buttons
// AI analysis card
// About section
// Fundamentals
// Holdings (if user owns)
```

#### Price Update (Real-time)
```tsx
// Price flashes briefly
<motion.span
  key={price}
  initial={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
  animate={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
  transition={{ duration: 1 }}
>
  TZS {price}
</motion.span>

// Change indicator updates
<motion.div
  initial={{ scale: 1.1 }}
  animate={{ scale: 1 }}
>
  {change >= 0 ? '+' : ''}{change}%
</motion.div>
```

#### Chart Time Period Change
```tsx
// Buttons: 1D | 1W | 1M | 1Y | All
// Selected: bg-black text-white
// Chart redraws smoothly

<AnimatePresence mode="wait">
  <motion.div
    key={timePeriod}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <StoryGraph data={chartData[timePeriod]} />
  </motion.div>
</AnimatePresence>
```

#### Loading (Chart Data)
```tsx
// Chart area shows pulse
<div className="h-48 bg-zinc-100 animate-pulse rounded-lg"></div>
```

#### Error (Chart Failed)
```tsx
// Fallback to price only
<Card className="p-8">
  <PriceDisplay />
  <p className="text-xs text-zinc-500 mt-4">
    Chart temporarily unavailable
  </p>
</Card>
```

#### Star/Watchlist Toggle
```tsx
// Tap star icon
<motion.button
  whileTap={{ scale: 0.9 }}
  onClick={() => toggleWatchlist(stock.id)}
>
  <Star
    className={`
      w-6 h-6 transition-colors
      ${isWatchlisted ? 'text-yellow-500 fill-yellow-500' : 'text-zinc-400'}
    `}
  />
</motion.button>

// Success feedback
{justAdded && (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    className="absolute top-12 right-0 bg-black text-white text-xs px-3 py-1.5 rounded-lg"
  >
    Added to watchlist
  </motion.div>
)}
```

---

### 7. SCHEDULED TRADE FLOW

#### Step 1: Asset Selection

**Empty Search**
```tsx
// Show recent + popular
<div>
  <h3>Recent</h3>
  {recentStocks.map(...)}
  
  <h3>Popular in Tanzania</h3>
  {popularStocks.map(...)}
</div>
```

**Searching**
```tsx
// Real-time filter
<input onChange={(e) => setQuery(e.target.value)} />
{filteredStocks.map(...)}

// No results
{query && filteredStocks.length === 0 && (
  <div className="py-8 text-center text-zinc-500">
    No matches for "{query}"
  </div>
)}
```

**Selected**
```tsx
// Highlight selected card
<Card className="border-black bg-zinc-50">
  <CheckCircle className="text-green-600" />
</Card>

// Continue button enables
<Button disabled={!selectedAsset}>
  Continue
</Button>
```

---

#### Step 2: Amount

**Empty**
```tsx
// Continue disabled
<Button disabled={!amount || amount === '0'}>
  Continue
</Button>
```

**Typing**
```tsx
// Real-time calculation
<input
  type="number"
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
/>

<p className="text-sm text-zinc-600">
  This will buy ≈ {Math.floor(amount / stockPrice)} shares
</p>
```

**Preset Tapped**
```tsx
// Immediate fill
<button onClick={() => setAmount('100000')}>
  100K
</button>

// Input fills with animation
<motion.input
  key={amount}
  initial={{ scale: 1.05 }}
  animate={{ scale: 1 }}
/>
```

**Insufficient Funds**
```tsx
// Error message appears
{amount > balance && (
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: 'auto' }}
    className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg"
  >
    <p className="text-sm text-red-800">
      Insufficient funds. Available: TZS {balance.toLocaleString()}
    </p>
    <Button size="sm" className="mt-2" onClick={() => navigate('mobilemoney')}>
      Add Money
    </Button>
  </motion.div>
)}
```

---

#### Step 3: Schedule

**Once Selected**
```tsx
// Date picker appears
<input
  type="date"
  min={tomorrow}
  value={date}
  onChange={(e) => setDate(e.target.value)}
  className="mt-3 w-full h-12 px-4 border-2 border-zinc-300 rounded-lg"
/>
```

**Recurring Selected**
```tsx
// Frequency + day dropdowns appear
<select value={frequency}>
  <option>Weekly</option>
  <option>Bi-weekly</option>
  <option>Monthly</option>
  <option>Quarterly</option>
</select>

{frequency === 'weekly' && (
  <select value={day}>
    <option>Monday</option>
    <option>Tuesday</option>
    ...
  </select>
)}
```

**Price Target Selected**
```tsx
// Additional step appears
<input
  type="number"
  placeholder="Enter target price"
  value={targetPrice}
  onChange={(e) => setTargetPrice(e.target.value)}
/>

// Show comparison
<div className="flex items-center justify-between text-sm mt-2">
  <span>Current: TZS {currentPrice}</span>
  <span className={targetPrice < currentPrice ? 'text-red-600' : 'text-green-600'}>
    {((targetPrice - currentPrice) / currentPrice * 100).toFixed(1)}%
  </span>
</div>
```

---

#### Step 4: Review

**All Fields Complete**
```tsx
<Card className="p-6 border-zinc-300">
  <h4>{stockName}</h4>
  <p>TZS {amount.toLocaleString()}</p>
  
  <div className="mt-4 pt-4 border-t">
    <p className="text-sm text-zinc-600">Schedule</p>
    <p>{scheduleDescription}</p>
  </div>
  
  {condition && (
    <div className="mt-3 pt-3 border-t">
      <p className="text-sm text-zinc-600">Condition</p>
      <p>{conditionDescription}</p>
    </div>
  )}
</Card>

<Button onClick={handleConfirm}>
  Confirm Trade
</Button>
```

**Submitting**
```tsx
<Button disabled>
  <Spinner className="w-4 h-4 mr-2" />
  Scheduling...
</Button>
```

**Success**
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  className="text-center py-12"
>
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: "spring", delay: 0.2 }}
  >
    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
  </motion.div>
  
  <h2 className="text-2xl font-light mb-2">
    Trade Scheduled
  </h2>
  
  <p className="text-zinc-600 mb-6">
    Your recurring investment starts {startDate}
  </p>
  
  <div className="flex gap-3">
    <Button variant="outline" onClick={() => navigate('scheduled-trades')}>
      View Schedule
    </Button>
    <Button onClick={() => navigate('dashboard')}>
      Done
    </Button>
  </div>
</motion.div>
```

**Error**
```tsx
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4"
>
  <p className="text-sm text-red-800">
    Could not schedule trade. Please try again.
  </p>
</motion.div>

<Button onClick={() => navigate('dashboard')}>
  Return to Dashboard
</Button>
```

---

### 8. SCENARIO BUILDER

#### Initial Load
```tsx
// Sliders start at current values
// Graph shows current trajectory

initialValues={{
  monthlyContribution: currentMonthly,
  timeHorizon: goalTimeline
}}
```

#### Slider Interaction
```tsx
// Real-time graph update
<Slider
  value={monthlyContribution}
  onChange={(value) => {
    setMonthlyContribution(value)
    // Graph recalculates immediately
    updateProjection({ monthly: value, time: timeHorizon })
  }}
/>

// Smooth spring animation for graph
<motion.path
  d={projectionPath}
  transition={{ type: "spring", stiffness: 50, damping: 20 }}
/>
```

#### AI Insight Updates
```tsx
// Changes based on scenario
<AnimatePresence mode="wait">
  <motion.div
    key={scenarioType} // 'positive' | 'stretch' | 'unrealistic'
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
  >
    <Card className={`p-4 ${bgColor[scenarioType]}`}>
      {insightText}
    </Card>
  </motion.div>
</AnimatePresence>
```

#### Apply Changes
```tsx
// Confirmation modal
<Modal>
  <h3>Apply changes to your goal?</h3>
  <Card>
    <p>Monthly: TZS {newMonthly.toLocaleString()}</p>
    <p>Timeline: {newTimeline}</p>
  </Card>
  <Button onClick={applyChanges}>Apply</Button>
</Modal>

// Loading
<Button disabled>
  <Spinner className="mr-2" />
  Updating...
</Button>

// Success
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
>
  <CheckCircle />
  <h3>Goal Updated</h3>
</motion.div>
```

#### Error (Unrealistic Goal)
```tsx
// Red accent, not scary
<Card className="p-4 bg-red-50 border-red-200">
  <AlertCircle className="w-5 h-5 text-red-600" />
  <p className="text-sm text-red-800">
    This goal requires TZS {required}/month, which is higher than your income.
  </p>
  <div className="flex gap-2 mt-3">
    <Button size="sm" onClick={() => adjustTimeline()}>
      Extend Timeline
    </Button>
    <Button size="sm" variant="outline" onClick={() => reduceGoal()}>
      Reduce Goal
    </Button>
  </div>
</Card>
```

---

### 9. DIVIDEND CALENDAR

#### Initial Load
```tsx
// Skeleton for cards
<div className="space-y-3">
  {[1, 2, 3].map(i => (
    <Card key={i} className="p-5 animate-pulse">
      <div className="h-4 w-24 bg-zinc-200 rounded mb-2"></div>
      <div className="h-6 w-16 bg-zinc-200 rounded"></div>
    </Card>
  ))}
</div>
```

#### Empty State
```tsx
<div className="text-center py-12">
  <Calendar className="w-16 h-16 text-zinc-300 mx-auto mb-4" />
  <h3 className="text-xl font-light mb-2">
    No dividends yet
  </h3>
  <p className="text-zinc-600 mb-6">
    Invest in dividend-paying stocks to start earning passive income.
  </p>
  <Button onClick={() => navigate('markets?filter=dividend')}>
    Explore Dividend Stocks
  </Button>
</div>
```

#### Default State
```tsx
// Hero card: Quarterly total
// Quarter tabs
// Upcoming dividends (chronological)
// Annual forecast (collapsed)
```

#### Quarter Tab Change
```tsx
// Instant filter (no loading)
<AnimatePresence mode="wait">
  <motion.div
    key={selectedQuarter}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.2 }}
  >
    {dividends[selectedQuarter].map(...)}
  </motion.div>
</AnimatePresence>
```

#### Dividend Card Tap
```tsx
// Expand to show details
<Modal>
  <h3>{company} Dividend</h3>
  <div className="space-y-4">
    <div>
      <p className="text-sm text-zinc-500">Payment Date</p>
      <p>{date}</p>
    </div>
    <div>
      <p className="text-sm text-zinc-500">Amount</p>
      <p className="text-2xl font-light">{amount}</p>
      <p className="text-xs text-zinc-500">
        ({shares} shares × {perShare}/share)
      </p>
    </div>
    <Toggle
      checked={reminderEnabled}
      onChange={setReminderEnabled}
      label="Remind me 1 day before"
    />
  </div>
</Modal>
```

#### Reminder Toggle
```tsx
// Haptic feedback
<Toggle
  checked={enabled}
  onChange={(val) => {
    setEnabled(val)
    // Vibrate (mobile)
    navigator.vibrate(10)
    // Show toast
    toast.success(val ? 'Reminder set' : 'Reminder removed')
  }}
/>
```

---

### 10. ALERTS & NOTIFICATIONS

#### Push Notification (Mobile)
```tsx
// System notification
{
  title: "✨ Daily Insight",
  body: "Your wealth grew TZS 12K overnight",
  icon: "/icon-192.png",
  badge: "/badge.png",
  vibrate: [200, 100, 200],
  actions: [
    { action: "view", title: "View" },
    { action: "dismiss", title: "Dismiss" }
  ]
}

// Tap notification → Open app to dashboard
```

#### In-App Alert Card
```tsx
// Appears below hero card
<AnimatePresence>
  {alert && (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
    >
      <Card className={`p-4 ${alertStyles[alert.type]}`}>
        {alert.icon}
        <p>{alert.message}</p>
        <button onClick={() => dismissAlert(alert.id)}>
          <X className="w-4 h-4" />
        </button>
      </Card>
    </motion.div>
  )}
</AnimatePresence>
```

#### Dismiss Animation
```tsx
// Swipe or tap X
<motion.div
  drag="x"
  dragConstraints={{ left: 0, right: 0 }}
  onDragEnd={(e, info) => {
    if (Math.abs(info.offset.x) > 100) {
      dismissAlert()
    }
  }}
  exit={{ opacity: 0, x: info.offset.x > 0 ? 300 : -300 }}
>
  <AlertCard />
</motion.div>
```

#### Multiple Alerts
```tsx
// Stack with vertical gap
// Max 2 visible at once
<div className="space-y-3">
  {alerts.slice(0, 2).map(alert => (
    <AlertCard key={alert.id} {...alert} />
  ))}
  {alerts.length > 2 && (
    <button onClick={() => navigate('notifications')}>
      +{alerts.length - 2} more
    </button>
  )}
</div>
```

---

## 🎨 MOTION RECIPES

### Standard Entry
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.4, ease: "easeOut" }}
```

### Staggered List
```tsx
{items.map((item, i) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: i * 0.05 }}
  />
))}
```

### Modal Enter/Exit
```tsx
// Backdrop
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}

// Modal
initial={{ opacity: 0, y: 100 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: 100 }}
transition={{ duration: 0.3, ease: "easeOut" }}
```

### Tab Switch
```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={activeTab}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
  />
</AnimatePresence>
```

### Number Count-Up
```tsx
<motion.span
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  {useCountUp(targetValue, 1500)}
</motion.span>
```

### Success Checkmark
```tsx
<motion.svg viewBox="0 0 50 50">
  <motion.circle
    cx="25"
    cy="25"
    r="20"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ duration: 0.5 }}
  />
  <motion.path
    d="M15 25 L22 32 L35 18"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ duration: 0.4, delay: 0.3 }}
  />
</motion.svg>
```

---

## 🚨 ERROR HANDLING PATTERNS

### Network Error
```tsx
{networkError && (
  <Card className="p-6 border-amber-200 bg-amber-50">
    <WifiOff className="w-8 h-8 text-amber-600 mx-auto mb-3" />
    <p className="text-center text-sm text-amber-900">
      Check your internet connection
    </p>
    <Button className="mt-4" onClick={() => retry()}>
      Try Again
    </Button>
  </Card>
)}
```

### Server Error
```tsx
{serverError && (
  <Card className="p-6 border-red-200 bg-red-50">
    <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-3" />
    <p className="text-center text-sm text-red-900">
      We're experiencing technical difficulties
    </p>
    <Button className="mt-4" variant="outline" onClick={() => contactSupport()}>
      Contact Support
    </Button>
  </Card>
)}
```

### Validation Error (Inline)
```tsx
<input
  className={errors.amount ? 'border-red-500' : 'border-zinc-300'}
/>
{errors.amount && (
  <motion.p
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: 'auto' }}
    className="text-xs text-red-600 mt-1"
  >
    {errors.amount}
  </motion.p>
)}
```

### Toast Notification
```tsx
// Success
toast.success('Changes saved', {
  duration: 3000,
  icon: '✓'
})

// Error
toast.error('Something went wrong', {
  duration: 5000,
  action: {
    label: 'Retry',
    onClick: () => retry()
  }
})
```

---

**Document Version**: 1.0  
**Coverage**: 100% of user-facing screens  
**Last Updated**: January 15, 2026  
**Status**: Production Ready
