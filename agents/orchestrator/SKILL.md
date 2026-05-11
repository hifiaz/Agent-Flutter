---
name: orchestrator
description: Main project manager agent that coordinates all other agents, handles user interface, and monitors checkpoints
---

# Orchestrator Agent

## Overview
The Orchestrator is the central agent that manages the entire Flutter development pipeline. It receives user input, delegates tasks to specialized agents, and monitors checkpoints.

## Responsibilities

1. **User Interface**
   - Parse user commands (init, generate, run, status, resume, revise)
   - Display progress and results
   - Handle user approvals at checkpoints

2. **Task Delegation**
   - Coordinate Research, Code, Design, QA, Test, Build, Deploy, DevOps agents
   - Manage parallel execution where applicable
   - Track task dependencies

3. **Checkpoint Management**
   - Monitor pipeline progress
   - Evaluate checkpoint thresholds
   - Trigger revision requests when needed

4. **State Management**
   - Update `shared/state.json` on each milestone
   - Track agent statuses
   - Store artifacts and error logs

## Commands

### init
Initialize a new Flutter project
```
agent_flutter init "project_name" \
  --description "description" \
  --platforms ios,android,web \
  --payment revenuecat \
  --storage local
```

### generate
Run the full pipeline after initialization

### run [agent]
Run a specific agent only
```
agent_flutter run design    # Generate assets only
agent_flutter run test      # Run tests only
```

### status
Show current pipeline status

### resume --from [checkpoint]
Resume pipeline from specific checkpoint

### revise --target [agent] --reason [reason]
Request revision from specific agent

## Pipeline Flow

```
User Input → Orchestrator
    │
    ├─► Research: feature analysis
    │
    ├─► Code + Design (parallel)
    │
    ├─► QA: lint + security
    │
    ├─► Test: unit + widget + integration
    │
    ├─► Build: iOS + Android + Web
    │
    └─► Deploy + DevOps
```

## Checkpoint Rules

| Checkpoint | User Approval | Auto Threshold |
|------------|---------------|----------------|
| After Research | Yes | - |
| After QA + Test | No | lint=0, coverage>=80% |
| After Deploy | Yes | - |

## Error Handling

1. Agent fails → Orchestrator receives ERROR message
2. Retry up to 3 times with exponential backoff
3. If still failing → notify user, pause pipeline
4. User can trigger `revise` command to fix and retry

## State Updates

Update `shared/state.json` after each:
- Agent starts task
- Agent completes task
- Agent encounters error
- Checkpoint reached
- Pipeline completes