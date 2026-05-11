---
name: deploy_agent
description: Deployment agent for App Store and Play Store publishing
---

# Deploy Agent Definition

## Agent Type
Deployment (peer-to-peer architecture)

## Entry Point
Receives REQUEST from Orchestrator after build completes

## Communication
- Listens on port 3007
- Sends RESULT/CHECKPOINT to Orchestrator
- Uses `shared/protocols/message_format.md`

## Dependencies
- fastlane (iOS + Android)
- gcloud CLI (Android alternative)

## Tasks
1. Validate build artifacts
2. Setup fastlane credentials (user-provided)
3. Upload to App Store
4. Upload to Play Store
5. Report upload status

## Output Location
`projects/[name]/deploy/`
- `deployment_report.json`

## Semi-Manual Flow

1. Agent prompts user for credentials
2. User enters credentials via secure input
3. Agent uses credentials for upload
4. Credentials NOT stored (ephemeral or user-managed)

## Credentials Storage

| Provider | Storage | Security |
|----------|---------|----------|
| App Store API Key | User provides, agent uses | User manages |
| Play Store Service Account | User provides JSON path | User manages |
| Both | NEVER committed to repo | Ephemeral |

## Fastlane Integration

### Appfile (iOS)
```ruby
# User fills in:
apple_id("user@email.com")
team_id("TEAM_ID")
```

### Fastfile (iOS)
```ruby
lane :deploy do
  deliver(api_key: api_key)
end
```

### Fastfile (Android)
```ruby
lane :deploy do
  supply(json_key: json_key_file_path)
end
```