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

---

## Documentation Management

The DevOps Agent also handles changelog and release documentation.

### 1. Changelog Generation

Generate CHANGELOG.md from git history:
```bash
# Using git-changelog or manual
git log --oneline --format="%h %s" v1.0.0..HEAD > CHANGELOG.md
```

### 2. CHANGELOG.md Template

```markdown
# Changelog

All notable changes to this project will be documented in this file.

## [Version] - YYYY-MM-DD

### Added
- New feature description

### Changed
- Changed behavior description

### Fixed
- Bug fix description

### Deprecated
- Soon-to-be removed feature

### Removed
- Removed feature description

### Security
- Security improvement
```

### 3. Release Notes Template

```markdown
## Release v1.0.0

### What's New
- Feature 1
- Feature 2

### Improvements
- Improvement 1
- Improvement 2

### Bug Fixes
- Fix 1
- Fix 2

### Breaking Changes
- Breaking change description

### Migration Guide
Step-by-step migration instructions
```

### 4. Version Management

Semantic versioning (MAJOR.MINOR.PATCH):
- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes

### 5. CI/CD Documentation Integration

Add to CI workflow:
```yaml
docs:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - name: Generate changelog
      run: |
        git-changelog-generator
        VERSION=$(cat pubspec.yaml | grep version | cut -d: -f2 | tr -d ' "')
        echo "## v$VERSION" >> CHANGELOG.md
    - name: Deploy docs
      run: |
        # Deploy to GitHub Pages or similar
```

### 6. Documentation GitHub Actions

```yaml
name: Documentation

on:
  push:
    branches: [main]
  release:
    types: [published]

jobs:
  generate-docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Generate API docs
        run: |
          flutter pub get
          dart doc --format=markdown
      - name: Update changelog
        run: |
          git-changelog v${{ github.event.release.tag_name }}
      - name: Deploy
        if: github.event_name == 'release'
        run: |
          # Publish to GitHub Pages
```

### 7. Docs Structure

```
projects/[name]/
├── docs/
│   ├── README.md         # Project docs index
│   ├── API.md           # Generated from dart doc
│   ├── CHANGELOG.md     # Auto-updated from git
│   ├── SETUP.md         # Setup instructions
│   └── RELEASES/        # Release notes
│       ├── v1.0.0.md
│       └── v1.1.0.md
```

### 8. Documentation Checklist

- [ ] CHANGELOG.md auto-updated on release
- [ ] Version in pubspec.yaml matches tags
- [ ] Release notes for each version
- [ ] Migration guides for breaking changes
- [ ] API docs published to GitHub Pages