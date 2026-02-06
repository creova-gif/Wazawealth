#!/bin/bash

# List of files to update
files=(
  "/src/app/components/RiskAssessmentScreen.tsx"
  "/src/app/components/Dashboard.tsx"
  "/src/app/components/TradingScreen.tsx"
  "/src/app/components/AITutorScreen.tsx"
  "/src/app/components/BadgesScreen.tsx"
  "/src/app/components/DashboardNew.tsx"
  "/src/app/components/DashboardApple.tsx"
  "/src/app/components/RiskAssessmentApple.tsx"
  "/src/app/components/DashboardWealthsimple.tsx"
  "/src/app/components/PortfolioScreen.tsx"
  "/src/app/components/TradingScreenCalm.tsx"
  "/src/app/components/InvestScreen.tsx"
  "/src/app/components/DashboardCalm.tsx"
  "/src/app/components/InvestStoryBased.tsx"
)

# Update each file
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    sed -i "s|'/utils/supabase/info'|'@/utils/supabase/info'|g" "$file"
    echo "Updated: $file"
  fi
done

echo "All files updated!"
