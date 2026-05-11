# Research Agent Protocols

## Competitor Analysis Protocol

1. **Identify App Category**
   - Parse description to determine app type
   - Match against known categories

2. **Search Competitors**
   - Query App Store / Play Store APIs
   - Find top apps in category
   - Extract app metadata (name, rating, downloads)

3. **Feature Extraction**
   - Analyze app descriptions
   - Identify common feature patterns
   - Categorize features by frequency

## Feature Matrix Protocol

1. **Categorize Features**
   - `must-have`: Present in 80%+ of competitors
   - `should-have`: Present in 50-80% of competitors
   - `nice-to-have`: Present in 20-50% of competitors

2. **Complexity Estimation**
   - `low`: < 1 day development
   - `medium`: 1-3 days development
   - `high`: 3+ days development

3. **Priority Scoring**
   - MVP features: must-have + low/medium complexity
   - Post-MVP: should-have + any, or nice-to-have + low

## Tech Stack Protocol

1. **Match App Requirements**
   - State complexity → state management choice
   - Data volume → database choice
   - Offline requirements → sync strategy

2. **Platform Support**
   - Web required → ensure web-compatible packages
   - iOS/Android → check native dependencies

3. **Payment Integration**
   - RevenueCat → `in_app_purchase` package
   - Subscription tiers → entitlement mapping

## Output Format

All outputs saved to `projects/[name]/research/`:
```json
{
  "competitors.json": [...],
  "features.json": [...],
  "tech_stack.json": {...}
}
```