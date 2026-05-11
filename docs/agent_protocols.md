# Agent Protocols

## Inter-Agent Communication

Agents communicate using a peer-to-peer message protocol. Messages are JSON formatted and sent through the Orchestrator.

## Message Flow

```
Agent A → Orchestrator → Agent B
    ↓           ↓            ↓
  REQUEST    RELAY       RESPONSE
```

## Message Types

### REQUEST
Sent when an agent needs another agent to perform a task.

```json
{
  "id": "msg_001",
  "from": "orchestrator",
  "to": "code",
  "type": "REQUEST",
  "payload": {
    "action": "generate_project",
    "project_name": "my_app",
    "features": [...]
  }
}
```

### RESULT
Sent when an agent completes a task successfully.

```json
{
  "id": "msg_002",
  "from": "code",
  "to": "orchestrator",
  "type": "RESULT",
  "payload": {
    "status": "completed",
    "output": {...}
  }
}
```

### ERROR
Sent when an agent encounters an error.

```json
{
  "id": "msg_003",
  "from": "code",
  "to": "orchestrator",
  "type": "ERROR",
  "payload": {
    "error_code": "BUILD_FAILED",
    "message": "Flutter build failed",
    "details": {...}
  }
}
```

### CHECKPOINT
Sent when a checkpoint is reached.

```json
{
  "id": "msg_004",
  "from": "research",
  "to": "orchestrator",
  "type": "CHECKPOINT",
  "payload": {
    "checkpoint_id": "checkpoint_1",
    "needs_approval": true,
    "results": {...}
  }
}
```

### REVISION
Sent when an agent needs to revise its output.

```json
{
  "id": "msg_005",
  "from": "orchestrator",
  "to": "code",
  "type": "REVISION",
  "payload": {
    "reason": "lint_errors",
    "files": [...],
    "fix_instructions": "..."
  }
}
```

## Agent Ports

| Agent | Port | Purpose |
|-------|------|---------|
| Orchestrator | 3000 | Central coordinator |
| Research | 3001 | App research |
| Code | 3002 | Code generation |
| Design | 3003 | Asset generation |
| QA | 3004 | Quality assurance |
| Test | 3005 | Testing |
| Build | 3006 | Build compilation |
| Deploy | 3007 | Deployment |
| DevOps | 3008 | CI/CD setup |

## Error Handling

When an agent encounters an error:
1. Log error details
2. Send ERROR message to Orchestrator
3. Attempt retry (up to 3 times)
4. If still failing, notify user and pause pipeline

## Revision Flow

1. QA/Test fails threshold
2. Orchestrator sends REVISION to relevant agent
3. Agent fixes issues
4. Re-run QA/Test
5. Continue if passed