---
name: code_agent
description: Code generation agent for Flutter projects with RevenueCat and i18n support
---

# Code Agent Definition

## Agent Type
Code Generator (peer-to-peer architecture)

## Entry Point
Receives REQUEST from Orchestrator with research output

## Communication
- Listens on port 3002
- Sends RESULT/CHECKPOINT to Orchestrator
- Uses `shared/protocols/message_format.md`

## Dependencies
- Flutter SDK
- Dart SDK

## Tasks
1. Scaffold Flutter project
2. Install dependencies (flutter_bloc, go_router, isar, revenuecat, etc)
3. Generate feature code from research
4. Setup i18n with ARB files
5. Integrate RevenueCat SDK
6. Create test files

## Output Location
`projects/[name]/`
- All Flutter source code
- pubspec.yaml
- l10n.yaml + ARB files
- Test files

## Packages Generated

Based on tech_stack:
```yaml
dependencies:
  flutter_bloc: ^8.1.0
  go_router: ^13.0.0
  isar: ^3.1.0
  isar_flutter_libs: ^3.1.0
  dio: ^5.0.0
  revenuecat: ^5.0.0
  flutter_localizations
  intl: ^0.18.0

dev_dependencies:
  build_runner: ^2.4.0
  isar_generator: ^3.1.0
  flutter_test
  mockito: ^5.4.0
  bloc_test: ^9.1.0
```