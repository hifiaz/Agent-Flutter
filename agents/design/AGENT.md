---
name: design_agent
description: Asset generation agent using SDXL via Pinokio
---

# Design Agent Definition

## Agent Type
Asset Generator (peer-to-peer architecture)

## Entry Point
Receives REQUEST from Orchestrator with design requirements

## Communication
- Listens on port 3003
- Sends RESULT/CHECKPOINT to Orchestrator
- Uses `shared/protocols/message_format.md`

## External Dependencies
- Pinokio runtime
- SDXL model via Pinokio

## Tasks
1. Generate app icon using SDXL
2. Generate splash screen
3. Generate illustrations (empty state, onboarding, error)
4. Convert/optimize assets for each platform
5. Create Flutter asset declarations

## Output Location
`projects/[name]/assets/`
- icons/
- splash/
- illustrations/

## Pinokio Commands
```bash
# Check SDXL status
pterm status sdxl

# Generate image
pterm run sdxl --prompt "..."
```