---
name: orchestrator_agent
description: Orchestrator agent definition for agent_flutter pipeline
---

# Orchestrator Agent Definition

## Agent Type
Central Coordinator (peer-to-peer architecture)

## Entry Point
Main CLI interface for user interaction

## Communication
- Listens on port 3000
- Sends to all other agents via peer-to-peer protocol
- Uses `shared/protocols/message_format.md` for message structure

## Dependencies
- `shared/state.json` - Pipeline state tracking
- `manifest.json` - Project configuration

## Tasks
1. Parse and validate user commands
2. Create project manifest
3. Delegate tasks to appropriate agents
4. Monitor checkpoint compliance
5. Handle user approvals
6. Manage error recovery and revision requests

## Output
- Updated `shared/state.json`
- Project structure in `projects/[name]/`
- Checkpoint approval prompts to user