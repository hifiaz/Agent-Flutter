# flutter-resume

Resume pipeline from a specific checkpoint.

## Usage
```
/flutter-resume <checkpoint-id>
```

## Available Checkpoints

- `checkpoint_1` - After research (requires user approval)
- `checkpoint_2` - After QA + Test (auto-pass)
- `checkpoint_3` - After build (requires user approval)

## Example

```
/flutter-resume checkpoint_2
```

## Implementation

1. Read current state from `shared/state.json`
2. Identify checkpoint
3. Resume pipeline from that point
4. Continue monitoring

## Notes

- Cannot resume from checkpoint before current state
- May need to re-run some agents depending on checkpoint