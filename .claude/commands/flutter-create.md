# flutter-create

Create a new Flutter project with full agent pipeline.

## Usage
```
/flutter-create <project-name> [options]
```

## Options

- `--description` - Project description
- `--platforms` - Target platforms (ios,android,web)
- `--payment` - Payment provider (revenuecat)
- `--storage` - Storage mode (local,firebase)
- `--locales` - Supported locales (default: en,id)

## Example

```
/flutter-create todo_app --description "Task management" --platforms ios,android --payment revenuecat
```

## Implementation

1. Read manifest.json
2. Initialize project directory
3. Generate project structure
4. Start orchestrator pipeline
5. Monitor checkpoints

## Output

Creates `projects/<name>/` with:
- manifest.json
- Flutter project structure
- Agent configurations