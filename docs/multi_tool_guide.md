# Tool Compatibility Guide

## Overview

Agent Flutter supports multiple AI coding tools:
- **Opencode** (native support)
- **Claude Code**
- **Cursor**

Each tool has specific configurations and usage patterns.

## Opencode

### Configuration
- Location: `agents/opencode/SKILL.md`
- Format: Frontmatter with `name` and `description`

### Usage
```bash
# Run CLI
node bin/cli.js init my_app

# Or use Opencode with agent files
# Opencode automatically loads SKILL.md files
```

### Agent Files
Each agent has `SKILL.md` in `agents/<agent>/SKILL.md`

## Claude Code

### Configuration
- Location: `.claude/CLAUDE.md`
- Commands: `.claude/commands/*.md`

### Usage
```bash
# Initialize Claude Code in project
cd agent_flutter
claude

# Use custom commands
/claude-commands/flutter-create
```

### Custom Slash Commands
| Command | Description |
|---------|-------------|
| `/flutter-create` | Create new Flutter project |
| `/flutter-status` | Show pipeline status |
| `/flutter-agent` | Run specific agent |
| `/flutter-resume` | Resume from checkpoint |
| `/flutter-revise` | Request revision |

### Example Session
```
claude

# Create project
/claude-commands/flutter-create todo_app --platforms ios,android

# Run pipeline
/claude-commands/flutter-agent code

# Check status
/claude-commands/flutter-status
```

## Cursor

### Configuration
- Location: `agents/cursor/.cursorrules`
- Agent config: `agents/cursor/SKILL.md`

### Usage
```bash
# Open project in Cursor
cd agent_flutter
cursor .

# Use slash commands
# Type / in Cursor chat
```

### Slash Commands
| Command | Description |
|---------|-------------|
| `/flutter-create` | Create new project |
| `/flutter-status` | Show status |
| `/flutter-agent` | Run agent |
| `/flutter-resume` | Resume |
| `/flutter-revise` | Revise |

### Tab Autocomplete
Cursor will suggest:
- Agent names when typing `run agent`
- Checkpoint names when typing `resume checkpoint`
- Project names

### @ Mentions
Use `@` to reference files:
- `@manifest.json`
- `@shared/state.json`
- `@agents/research/SKILL.md`

## Common Workflow

Regardless of tool, the pipeline remains the same:

```
User Input → Orchestrator (via tool)
    │
    ├─► Research → checkpoint (user approval)
    ├─► Code + Design (parallel)
    ├─► QA + Test → checkpoint (auto)
    ├─► Build
    └─► Deploy → checkpoint (user approval)
```

## Tool Selection

| Tool | Best For | Notes |
|------|----------|-------|
| **Opencode** | Full CLI control, script automation | Native SKILL.md support |
| **Claude Code** | Conversational workflow, custom commands | Strong slash command support |
| **Cursor** | IDE integration, autocomplete | Best for code-focused work |

## Troubleshooting

### Claude Code Commands Not Found
Make sure `.claude/commands/` files are present and have frontmatter.

### Cursor Not Loading Rules
Restart Cursor after adding `.cursorrules` file.

### Opencode Not Finding Agents
Run from project root, not from `agents/` directory.