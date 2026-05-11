# Agent Flutter

Multi-agent peer-to-peer Flutter development system.

## Features

- **9 Specialized Agents**: Research, Code, Design, QA, Test, Build, Deploy, DevOps
- **Automated Pipeline**: From research to deployment
- **AI Asset Generation**: SDXL via Pinokio
- **RevenueCat Integration**: Built-in payment support
- **i18n Support**: Multi-language localization
- **CI/CD Setup**: GitHub Actions workflows

## Quick Start

```bash
# Initialize new project
node bin/cli.js init my_app \
  --description="Task management app" \
  --platforms=ios,android,web \
  --payment=revenuecat \
  --storage=local

# Run pipeline
node bin/cli.js generate my_app

# Check status
node bin/cli.js status
```

## Architecture

```
Orchestrator
    │
    ├── Research → Feature analysis
    ├── Code → Flutter implementation
    ├── Design → SDXL assets
    ├── QA → Linting + Security
    ├── Test → Unit + Widget + Integration
    ├── Build → iOS + Android + Web
    ├── Deploy → App Store + Play Store
    └── DevOps → CI/CD + Git hooks
```

## Documentation

- [Architecture](docs/architecture.md)
- [Agent Protocols](docs/agent_protocols.md)
- [Getting Started](docs/getting_started.md)

## Requirements

- Node.js 18+
- Flutter SDK 3.10+
- Git
- Pinokio (optional, for Design Agent)