---
name: devops_agent
description: DevOps agent for CI/CD, Git hooks, and environment management
---

# DevOps Agent Definition

## Agent Type
DevOps (peer-to-peer architecture)

## Entry Point
Receives REQUEST from Orchestrator (runs in parallel with Deploy)

## Communication
- Listens on port 3008
- Sends RESULT to Orchestrator
- Uses `shared/protocols/message_format.md`

## Dependencies
- Git
- GitHub CLI (optional, for repo setup)

## Tasks
1. Create GitHub Actions workflows
2. Setup Git hooks
3. Configure environment files
4. Setup branch protection (if gh CLI available)

## Output Location
`projects/[name]/`
- `.github/workflows/`
- `.git/hooks/`
- `.env.example`
- `CONTRIBUTING.md`

## Workflow Files

| File | Trigger | Purpose |
|------|---------|---------|
| ci.yml | PR | Lint, test, coverage |
| build.yml | Push to main | Build all platforms |
| deploy.yml | Manual | Deploy to stores |