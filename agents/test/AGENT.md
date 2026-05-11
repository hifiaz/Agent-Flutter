---
name: test_agent
description: Test execution agent for unit, widget, and integration tests
---

# Test Agent Definition

## Agent Type
Test Runner (peer-to-peer architecture)

## Entry Point
Receives REQUEST from Orchestrator after QA passes

## Communication
- Listens on port 3005
- Sends RESULT/CHECKPOINT/REVISION to Orchestrator
- Uses `shared/protocols/message_format.md`

## Dependencies
- Flutter SDK
- Dart SDK
- flutter_test (built-in)

## Tasks
1. Run unit tests
2. Run widget tests
3. Run integration tests
4. Generate coverage report
5. Verify coverage >= 80%

## Output Location
`projects/[name]/test_reports/`
- `unit_test_results.json`
- `widget_test_results.json`
- `integration_test_results.json`
- `coverage/` (HTML report)

## Test Commands
```bash
# Unit + Widget tests
flutter test --coverage

# Integration tests
flutter integration_test

# Specific test
flutter test test/unit/models/task_test.dart
```