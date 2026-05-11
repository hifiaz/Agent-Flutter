# Shared Prompts - Cross-tool Compatibility

## System Prompts

### Orchestrator System Prompt
```
You are the Orchestrator Agent for a multi-agent Flutter development system.
You coordinate 9 specialized agents to build complete Flutter applications.

Agents: research, code, design, qa, test, build, deploy, devops

Pipeline flow:
1. Research → User approval
2. Code + Design (parallel)
3. QA + Test → Auto-pass (lint=0, coverage>=80%)
4. Build
5. Deploy → User approval

State managed via shared/state.json
```

### Agent Execution Prompt Template
```
Execute [AGENT_NAME] for project [PROJECT_NAME]

Context:
- Project path: projects/[PROJECT_NAME]
- Platforms: [PLATFORMS]
- Payment: [PAYMENT_PROVIDER]
- Storage: [STORAGE_MODE]

Steps:
1. Load agent config from agents/[AGENT_NAME]/SKILL.md
2. Execute agent responsibilities
3. Save artifacts to projects/[PROJECT_NAME]/
4. Update shared/state.json
5. Report completion to Orchestrator

Checkpoints:
- checkpoint_1: After research (user approval)
- checkpoint_2: After QA+Test (auto)
- checkpoint_3: After build (user approval)
```

## Research Prompts

### Competitor Analysis
```
Analyze similar apps in the [APP_CATEGORY] category.

Steps:
1. Identify 5-10 top apps in category
2. Extract common features
3. Categorize by priority (must-have/should-have/nice-to-have)
4. Estimate complexity
5. Recommend tech stack based on requirements

Output format:
{
  "app_type": "...",
  "similar_apps": [...],
  "features": [...],
  "tech_stack": {...}
}
```

### Feature Matrix Generation
```
Generate feature matrix for [APP_TYPE] app.

Categories:
- must-have: Present in 80%+ of competitors
- should-have: Present in 50-80%
- nice-to-have: Present in 20-50%

Complexity levels:
- low: < 1 day
- medium: 1-3 days
- high: 3+ days
```

## Code Generation Prompts

### Project Scaffolding
```
Scaffold Flutter project: [PROJECT_NAME]

Structure:
- lib/ (source code)
- test/ (tests)
- l10n/ (localization)
- assets/ (assets)

Tech stack: [TECH_STACK]
State management: [STATE_MGMT]
Navigation: [NAV]
Database: [DATABASE]

Generate:
1. pubspec.yaml with dependencies
2. main.dart entry point
3. app.dart with routing
4. Feature modules
5. Test templates
```

### RevenueCat Integration
```
Integrate RevenueCat for Flutter project.

Setup:
1. Add dependencies: in_app_purchase, revenuecat
2. Configure in main.dart
3. Create entitlement service
4. Build paywall UI

Entitlements: [ENTITLEMENTS]
Subscription tiers: [TIERS]
```

### i18n Setup
```
Setup internationalization for Flutter project.

Locales: [LOCALES]
ARB files: l10n/app_[LOCALE].arb

Generate:
1. l10n.yaml configuration
2. ARB files for each locale
3. AppLocalizations usage examples
```

## Design Prompts

### Icon Generation
```
Generate app icon via SDXL.

Prompt template:
"[APP_NAME] app icon, [STYLE], [COLORS] gradient, no text"

Style options: modern-minimal, playful, professional
```

### Splash Screen
```
Generate splash screen.

Prompt template:
"[APP_NAME] splash screen, logo centered, [BG_COLOR] background"
```

### Illustrations
```
Generate illustrations.

Types:
- Empty state
- Onboarding (3 steps)
- Error state

Prompt template:
"[APP_TYPE] [ILLUSTRATION_TYPE], [STYLE], friendly"
```

## QA Prompts

### Linting
```
Run flutter analyze with strict rules.

Thresholds:
- Errors: 0
- Warnings: 0
- Hints: acceptable

Commands:
flutter analyze --fatal-infos --fatal-warnings
dart fix --apply
```

### Security Scan
```
Scan for security issues.

Check:
1. Hardcoded secrets (API keys, passwords)
2. API key handling
3. Dependency vulnerabilities
4. Firebase config exposure

Tools:
- Pattern matching for secrets
- flutter pub outdated
- Manual config review
```

## Test Prompts

### Unit Test Template
```
Write unit tests for [FEATURE].

Use mockito for mocking.
Follow Flutter test conventions.

Expected: >80% coverage
```

### Widget Test Template
```
Write widget tests for [WIDGET].

Test:
- Rendering
- User interactions
- State changes

Use tester.pumpWidget()
```

### Integration Test Template
```
Write integration tests for [FLOW].

Test full user flow:
1. App launch
2. User actions
3. Expected results

Use integrationTestWidgetsFlutterBinding.ensureInitialized()
```

## Build Prompts

### iOS Build
```
Build iOS app.

Commands:
flutter build ios --simulator --no-codesign  # simulator
flutter build ios --release                  # device

Requirements:
- Xcode installed
- Signing certificate (for device)
```

### Android Build
```
Build Android app.

Commands:
flutter build apk --debug         # debug APK
flutter build appbundle --release # release AAB

Requirements:
- Android SDK
- Keystore configured
```

### Web Build
```
Build web app.

Command:
flutter build web --release

Requirements:
- Web support enabled
- Web-compatible packages
```

## Deploy Prompts

### App Store Upload
```
Upload to iOS App Store.

Methods:
1. Transporter (manual)
2. fastlane (semi-manual)

Credentials:
- App Store Connect API Key (recommended)
- Apple ID + App-Specific Password

User provides credentials → agent uploads
```

### Play Store Upload
```
Upload to Google Play Store.

Methods:
1. Play Console (manual)
2. fastlane (semi-manual)

Credentials:
- Service Account JSON (recommended)
- Upload key + Keystore

User provides credentials → agent uploads
```

## DevOps Prompts

### CI/CD Setup
```
Setup GitHub Actions CI/CD.

Workflows:
- ci.yml: Lint, test, coverage (on PR)
- build.yml: Build all platforms (on push to main)
- deploy.yml: Deploy to stores (manual trigger)
```

### Git Hooks
```
Setup Git hooks.

Hooks:
- pre-commit: flutter analyze + test
- commit-msg: Validate message format

Format: feat(scope): description
```