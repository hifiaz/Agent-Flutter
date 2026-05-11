# Project: agent_flutter

## Type
Multi-agent peer-to-peer Flutter development system

## Goal
Coordinate 9 specialized agents to build complete Flutter applications from research to deployment.

## Architecture

```
Orchestrator (you/Claude Code)
    │
    ├── Research → Feature analysis
    ├── Code → Flutter + RevenueCat + i18n
    ├── Design → SDXL assets
    ├── QA → Lint + Security
    ├── Test → Unit + Widget + Integration
    ├── Build → iOS + Android + Web
    ├── Deploy → App Store + Play Store
    └── DevOps → CI/CD + Git hooks
```

## Checkpoints

1. Research Approval (user decides)
2. QA + Test Pass (auto: lint=0, coverage>=80%)
3. Deploy Approval (user decides)

## State Management

Shared state in `shared/state.json`:
- current_project
- pipeline_status
- checkpoint_current
- agents_status

## Global Commands

- `/create-project [name]` - Initialize project
- `/run-agent [agent]` - Run specific agent
- `/status` - Show pipeline status
- `/resume [checkpoint]` - Resume from checkpoint
- `/revise [agent] [reason]` - Request revision

## Environment

Node.js for CLI, Flutter SDK for code generation, Pinokio for Design Agent.