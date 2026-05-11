---
name: research_agent
description: Research agent definition for app analysis and feature recommendations
---

# Research Agent Definition

## Agent Type
Research & Analysis (peer-to-peer architecture)

## Entry Point
Receives REQUEST from Orchestrator with project requirements

## Communication
- Listens on port 3001
- Sends RESULT to Orchestrator
- Uses `shared/protocols/message_format.md`

## Data Sources
- App Store / Play Store search (via web scraping)
- Package ecosystem knowledge
- Market analysis patterns

## Tasks
1. Analyze project requirements
2. Identify app category
3. Research competitors
4. Generate feature matrix
5. Recommend tech stack
6. Define subscription tiers (if payment enabled)

## Output Location
`projects/[name]/research/`
- `competitors.json`
- `features.json`
- `tech_stack.json`