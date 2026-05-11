# Agent Flutter - Architecture

## Overview

Agent Flutter is a multi-agent peer-to-peer system for developing Flutter applications. It coordinates multiple specialized agents to handle the complete development pipeline from research to deployment.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        ORCHESTRATOR                              │
│         Main interface, task delegation, checkpoint control       │
└──────────────────────────────────┬──────────────────────────────┘
                                   │
        ┌──────────────────────────┼──────────────────────────┐
        │                          │                          │
        ▼                          ▼                          ▼
┌───────────────┐           ┌──────────────┐           ┌──────────────┐
│   RESEARCH    │           │     CODE     │           │    DESIGN    │
│ Agent         │◄─────────►│ Agent        │◄─────────►│ Agent        │
│               │           │              │           │              │
└───────────────┘           └──────────────┘           └──────────────┘
                                   │
                                   ▼
                             ┌──────────────┐
                             │      QA      │
                             │ Agent        │
                             └──────────────┘
                                   │
                                   ▼
                             ┌──────────────┐
                             │     TEST     │
                             │ Agent        │
                             └──────────────┘
                                   │
                                   ▼
        ┌──────────────────────────┴──────────────────────────┐
        │                                                       │
        ▼                                                       ▼
┌───────────────┐           ┌──────────────┐           ┌──────────────┐
│     BUILD     │           │    DEPLOY    │           │   DEVOPS     │
│ Agent         │           │ Agent        │           │ Agent        │
└───────────────┘           └──────────────┘           └──────────────┘
```

## Agents

### Orchestrator
Central coordinator that manages the entire pipeline. Handles user interface, delegates tasks, and monitors checkpoints.

### Research Agent
Analyzes app market, identifies competitors, and provides feature recommendations and tech stack suggestions.

### Code Agent
Generates Flutter project structure, implements features, integrates RevenueCat, and sets up internationalization.

### Design Agent
Generates app assets (icons, splash screens, illustrations) using SDXL via Pinokio.

### QA Agent
Performs linting, code review, and security scanning.

### Test Agent
Runs unit tests, widget tests, and integration tests.

### Build Agent
Compiles Flutter app for iOS, Android, and Web platforms.

### Deploy Agent
Publishes Flutter apps to App Store and Play Store with semi-manual credential handling.

### DevOps Agent
Sets up CI/CD pipelines, Git hooks, and environment configurations.

## Checkpoints

| Checkpoint | Agent | User Approval | Threshold |
|------------|-------|---------------|-----------|
| Research Approval | Research | Yes | - |
| QA + Test Pass | QA + Test | No | lint=0, coverage>=80% |
| Deploy Approval | Deploy | Yes | - |

## Communication Protocol

Agents communicate using JSON messages via peer-to-peer protocol. Each agent listens on a specific port and sends messages to other agents through the Orchestrator.

See `shared/protocols/message_format.md` for message format specification.