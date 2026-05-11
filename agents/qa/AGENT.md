---
name: qa_agent
description: Quality assurance agent for linting, security, and code review
---

# QA Agent Definition

## Agent Type
Quality Assurance (peer-to-peer architecture)

## Entry Point
Receives REQUEST from Orchestrator after code generation

## Communication
- Listens on port 3004
- Sends RESULT/CHECKPOINT/REVISION to Orchestrator
- Uses `shared/protocols/message_format.md`

## Dependencies
- Flutter SDK
- Dart SDK

## Tasks
1. Run `flutter analyze` with strict rules
2. Perform security scan
3. Check code coverage
4. Auto-fix minor issues
5. Report any failures

## Thresholds
- Errors: 0
- Warnings: 0
- Coverage: >= 80%

## Output Location
`projects/[name]/qa/`
- `analyze_report.json`
- `security_report.json`
- `coverage_report.json`