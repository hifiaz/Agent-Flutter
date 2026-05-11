# Getting Started with Agent Flutter

## Prerequisites

- Node.js 18+
- Flutter SDK 3.10+
- Git
- Pinokio (for Design Agent with SDXL)

## Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Make the CLI executable:
   ```bash
   chmod +x bin/agent_flutter.sh
   ```

## Quick Start

### 1. Initialize a new project

```bash
node bin/cli.js init my_app \
  --description="Task management app" \
  --platforms=ios,android,web \
  --payment=revenuecat \
  --storage=local
```

### 2. Run the pipeline

```bash
node bin/cli.js generate my_app
```

### 3. Check status

```bash
node bin/cli.js status
```

## Project Structure

```
my_app/
├── manifest.json          # Project configuration
├── lib/                    # Flutter source code
├── l10n/                   # Localization files
├── assets/                 # App assets
├── test/                   # Tests
├── .github/workflows/      # CI/CD workflows
└── build/                  # Build artifacts
```

## Commands Reference

| Command | Description |
|---------|-------------|
| `init <name>` | Initialize new project |
| `generate [name]` | Run full pipeline |
| `status` | Show pipeline status |
| `run <agent>` | Run specific agent |
| `revise --target <agent>` | Request revision |

## Options

| Option | Description | Default |
|--------|-------------|---------|
| `--description` | Project description | "" |
| `--platforms` | Target platforms | ios,android,web |
| `--payment` | Payment provider | none |
| `--storage` | Storage mode | local |

## Checkpoints

1. **Research Approval**: Review feature recommendations
2. **Deploy Approval**: Confirm before publishing

## Next Steps

After pipeline completes:
1. Review app in simulator/emulator
2. Test on real devices
3. Submit to App Store and Play Store
4. Setup CI/CD (already configured)