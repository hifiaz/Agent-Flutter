# flutter-status

Show the current pipeline status.

## Usage
```
/flutter-status
```

## Implementation

1. Read `shared/state.json`
2. Display:
   - Current project
   - Pipeline status
   - Current checkpoint
   - Agent statuses

## Output

```
📊 Pipeline Status
   Project: todo_app
   Status: running

   Agent Status:
   - orchestrator: idle
   - research: completed
   - code: running
   ...
```

## Example

```
/flutter-status
```