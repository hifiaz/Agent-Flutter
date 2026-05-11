# Inter-Agent Message Protocol

## Message Format

All messages between agents use this JSON structure:

```json
{
  "id": "msg_uuid_123",
  "from": "code",
  "to": "orchestrator",
  "type": "RESULT",
  "payload": {},
  "status": "COMPLETED",
  "timestamp": "2026-05-11T10:00:00Z",
  "metadata": {}
}
```

## Message Types

| Type | Direction | Usage |
|------|-----------|-------|
| `REQUEST` | Any → Any | Request task execution |
| `RESULT` | Any → Orchestrator | Task completed successfully |
| `ERROR` | Any → Orchestrator | Task failed with details |
| `CHECKPOINT` | Any → Orchestrator | Checkpoint reached, needs approval |
| `SYNC` | Any → Any | State synchronization |
| `REVISION` | Orchestrator → Any | Revision request |

## Agent Identifiers

| Agent | ID | Port |
|-------|----|------|
| Orchestrator | `orchestrator` | 3000 |
| Research | `research` | 3001 |
| Code | `code` | 3002 |
| Design | `design` | 3003 |
| QA | `qa` | 3004 |
| Test | `test` | 3005 |
| Build | `build` | 3006 |
| Deploy | `deploy` | 3007 |
| DevOps | `devops` | 3008 |

## Error Handling

```json
{
  "type": "ERROR",
  "payload": {
    "error_code": "VALIDATION_FAILED",
    "message": "Invalid manifest format",
    "details": {},
    "retry_count": 0,
    "max_retries": 3
  }
}
```

## Checkpoint Flow

1. Agent completes work → sends `CHECKPOINT` to Orchestrator
2. Orchestrator evaluates threshold
3. If `requires_user_approval: true` → pause and wait
4. If auto-pass → notify agents to continue
5. If failed → send `REVISION` to relevant agent