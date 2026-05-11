# flutter-agent

Run a specific agent in the pipeline.

## Usage
```
/flutter-agent <agent-name>
```

## Available Agents

- `research` - Competitor analysis, feature recommendations
- `code` - Flutter implementation
- `design` - SDXL asset generation
- `qa` - Linting, security scan
- `test` - Unit, widget, integration tests
- `build` - iOS, Android, Web compilation
- `deploy` - App Store, Play Store
- `devops` - CI/CD setup

## Example

```
/flutter-agent design
```

## Implementation

1. Load agent configuration from `agents/<agent>/SKILL.md`
2. Execute agent logic
3. Update state in `shared/state.json`
4. Report results

## Output

Agent-specific output based on its responsibilities.