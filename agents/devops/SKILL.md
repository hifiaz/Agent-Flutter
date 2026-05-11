---
name: devops
description: Sets up CI/CD pipelines, Git hooks, and environment configurations for Flutter projects
---

# DevOps Agent

## Overview
The DevOps Agent sets up continuous integration/continuous deployment pipelines, Git hooks, and environment configurations for Flutter projects.

## Responsibilities

1. **CI/CD Pipeline Setup**
   - GitHub Actions workflows
   - Automatic testing on PR
   - Automatic builds on merge
   - Manual deploy triggers

2. **Git Hooks**
   - Pre-commit lint checks
   - Pre-push tests
   - Commit message validation

3. **Environment Management**
   - Development, staging, production configs
   - Secret management guidelines
   - Environment-specific builds

4. **Repository Setup**
   - .gitignore configuration
   - Branch protection rules
   - PR template

## Input

From Orchestrator:
```json
{
  "type": "REQUEST",
  "payload": {
    "project_path": "projects/todo_app",
    "platforms": ["ios", "android", "web"],
    "ci_cd_provider": "github_actions"
  }
}
```

## GitHub Actions Workflows

### CI Workflow (.github/workflows/ci.yml)
```yaml
name: CI

on:
  pull_request:
    branches: [main, develop]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
      - run: flutter analyze

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
      - run: flutter test --coverage
      - uses: codecov/codecov-action@v3

  build:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
      - run: flutter build ios --simulator --no-codesign
      - run: flutter build apk --debug
```

### Build Workflow (.github/workflows/build.yml)
```yaml
name: Build

on:
  push:
    branches: [main]

jobs:
  build-ios:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
      - run: flutter build ios --release

  build-android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
      - run: flutter build appbundle --release
```

### Deploy Workflow (.github/workflows/deploy.yml)
```yaml
name: Deploy

on:
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
      - run: flutter build appbundle --release
      - run: |
          # Deploy using credentials from secrets
          # User sets up secrets in GitHub
```

## Git Hooks

### Pre-commit Hook
```bash
#!/bin/sh
flutter analyze
flutter test
```

### Commit Message Hook
Validates commit message format:
```
feat(scope): description

Types: feat, fix, docs, style, refactor, test, chore
```

## Environment Configuration

### .env files
```
.env.example          # Template with placeholder values
.env.development      # Local dev config
.env.staging          # Staging config
.env.production       # Production config
```

### Environment Variables
```dart
class EnvConfig {
  static String apiUrl = String.fromEnvironment('API_URL');
  static bool enableAnalytics = bool.fromEnvironment('ENABLE_ANALYTICS', defaultValue: true);
}
```

## Output

```json
{
  "type": "RESULT",
  "payload": {
    "created_files": [
      ".github/workflows/ci.yml",
      ".github/workflows/build.yml",
      ".github/workflows/deploy.yml",
      ".git/hooks/pre-commit",
      ".env.example"
    ],
    "passed": true
  }
}
```

## Checkpoint

After DevOps setup (no checkpoint, runs in parallel with Deploy):
```json
{
  "type": "RESULT",
  "payload": {
    "agent": "devops",
    "status": "COMPLETED",
    "artifacts": [".github/", ".git/hooks/"]
  }
}
```