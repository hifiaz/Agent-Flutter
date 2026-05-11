# Tool Compatibility Matrix

## AI Coding Tools Support

| Feature | Opencode | Claude Code | Cursor |
|---------|----------|-------------|--------|
| **Agent System** | ✅ Full | ⚠️ Partial | ⚠️ Partial |
| **Custom Commands** | ✅ CLI | ✅ Slash | ✅ Slash |
| **Context Files** | ✅ SKILL.md | ✅ .claude/ | ✅ .cursorrules |
| **Auto-completion** | ❌ | ❌ | ✅ Tab |
| **File References** | ✅ Manual | ✅ /commands | ✅ @ mentions |
| **Multi-file Edit** | ✅ | ✅ | ✅ |

## Agent Compatibility

| Agent | Opencode | Claude Code | Cursor |
|-------|----------|-------------|--------|
| Orchestrator | ✅ | ✅ | ✅ |
| Research | ✅ | ✅ | ✅ |
| Code | ✅ | ✅ | ✅ |
| Design | ✅ | ✅ | ✅ |
| QA | ✅ | ✅ | ✅ |
| Test | ✅ | ✅ | ✅ |
| Build | ✅ | ✅ | ✅ |
| Deploy | ✅ | ✅ | ✅ |
| DevOps | ✅ | ✅ | ✅ |

## Workflow Features

| Feature | Opencode | Claude Code | Cursor |
|---------|----------|-------------|--------|
| CLI Interface | ✅ | ❌ | ❌ |
| Custom Slash Commands | ❌ | ✅ | ✅ |
| Pipeline Automation | ✅ (CLI) | ⚠️ (manual) | ⚠️ (manual) |
| State Management | ✅ (JSON) | ✅ (JSON) | ✅ (JSON) |
| Checkpoint System | ✅ | ⚠️ | ⚠️ |
| Revision Flow | ✅ | ⚠️ | ⚠️ |

## Setup Complexity

| Tool | Setup Time | Configuration Files |
|------|------------|---------------------|
| **Opencode** | 5 min | SKILL.md per agent |
| **Claude Code** | 10 min | CLAUDE.md + commands |
| **Cursor** | 10 min | .cursorrules + SKILL.md |

## Recommended Use Cases

| Tool | Use Case |
|------|----------|
| **Opencode** | - Automated CI/CD<br>- Scripting<br>- Batch operations<br>- Full CLI control |
| **Claude Code** | - Conversational development<br>- Custom command workflows<br>- Natural language interaction |
| **Cursor** | - IDE-based development<br>- Code autocomplete<br>- Inline editing |

## Migration Between Tools

All tools share:
- `shared/state.json` - Pipeline state
- `agents/*/SKILL.md` - Agent configs
- `projects/*/` - Generated projects

Migrate by:
1. Copy project folder to new tool
2. Configure tool-specific files
3. Continue from current state

## Limitations by Tool

### Opencode
- No custom slash commands (use CLI instead)
- Manual state updates

### Claude Code
- Agent communication via manual delegation
- No port-based IPC

### Cursor
- No native CLI
- Use terminal for CLI commands