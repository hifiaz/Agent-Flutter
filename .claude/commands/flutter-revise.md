# flutter-revise

Request revision from a specific agent.

## Usage
```
/flutter-revise <agent-name> [reason]
```

## Available Agents

All agents can be revised:
- `research` - Feature analysis
- `code` - Code generation
- `design` - Asset generation
- `qa` - Quality assurance
- `test` - Testing
- `build` - Build compilation
- `deploy` - Deployment

## Example

```
/flutter-revise code "login feature broken"
/flutter-revise design "use different color scheme"
```

## Implementation

1. Identify agent
2. Send REVISION message
3. Agent re-executes with new requirements
4. Re-verify at checkpoint

## Notes

- Max 3 retries per agent
- If still failing, notify user and pause pipeline