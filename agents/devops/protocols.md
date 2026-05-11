# DevOps Agent Protocols

## CI/CD Setup Protocol

### 1. Create Workflow Directory
```bash
mkdir -p projects/[name]/.github/workflows
```

### 2. Generate CI Workflow
```yaml
# .github/workflows/ci.yml
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
        with:
          channel: stable
      - run: flutter pub get
      - run: flutter analyze

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
      - run: flutter pub get
      - run: flutter test --coverage
      - uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
```

### 3. Generate Build Workflow
```yaml
# .github/workflows/build.yml
name: Build

on:
  push:
    branches: [main]

jobs:
  build:
    strategy:
      matrix:
        platform: [macos-latest, ubuntu-latest]

    runs-on: ${{ matrix.platform }}

    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
      - run: flutter pub get
      - run: flutter build appbundle --release
      - uses: actions/upload-artifact@v3
        with:
          name: release-${{ matrix.platform }}
          path: build/**/app-release.aab
```

### 4. Generate Deploy Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  workflow_dispatch:
    inputs:
      platform:
        description: 'Platform to deploy'
        required: true
        type: choice
        options:
          - ios
          - android
          - both

jobs:
  deploy-android:
    if: inputs.platform == 'android' || inputs.platform == 'both'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
      - run: flutter build appbundle --release
      - run: |
          # User sets ANDROID_UPLOAD_KEY and PLAY_STORE_JSON_KEY in repo secrets
          fastlane supply --json_key ${{ secrets.PLAY_STORE_JSON_KEY }}
```

## Git Hooks Protocol

### Pre-commit Hook
```bash
#!/bin/bash
# .git/hooks/pre-commit

echo "Running Flutter analyze..."
flutter analyze
if [ $? -ne 0 ]; then
  echo "Analyze failed. Fix errors before committing."
  exit 1
fi

echo "Running tests..."
flutter test
if [ $? -ne 0 ]; then
  echo "Tests failed. Fix failures before committing."
  exit 1
fi

echo "Formatting code..."
flutter format .
```

### Commit Message Validation
```bash
#!/bin/bash
# .git/hooks/commit-msg

COMMIT_MSG=$(cat $1)
PATTERN="^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .{1,50}"

if ! [[ $COMMIT_MSG =~ $PATTERN ]]; then
  echo "Invalid commit message format."
  echo "Expected: type(scope): description"
  echo "Types: feat, fix, docs, style, refactor, test, chore"
  exit 1
fi
```

## Environment Management Protocol

### .env.example
```bash
# API Configuration
API_URL=https://api.example.com
API_KEY=your_api_key_here

# Firebase (replace with placeholder)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_ANDROID_APP_ID=your_android_app_id
FIREBASE_IOS_APP_ID=your_ios_app_id

# RevenueCat
REVENUECAT_API_KEY=your_revenuecat_key

# Feature Flags
ENABLE_ANALYTICS=true
ENABLE_CRASH_REPORTING=true
```

### Build Environment
```dart
# Build command with environment
flutter build apk --release --dart-define=API_URL=https://api.production.com
```

## Repository Setup Protocol

### .gitignore
```gitignore
# Flutter
.dart_tool/
.flutter-plugins
.flutter-plugins-dependencies
.packages
.pub-cache/
.pub/

# Build
build/
android/app/src/main/**/google-services.json
ios/**/google-services.json

# Environment
.env
.env.*
!.env.example

# IDE
.idea/
.vscode/
*.iml

# OS
.DS_Store
Thumbs.db

# Testing
coverage/
```

### PR Template
```markdown
## Description
<!-- What does this PR do? -->

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Checklist
- [ ] Code follows project style
- [ ] Tests added/updated
- [ ] Documentation updated
```