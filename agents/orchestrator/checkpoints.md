# Orchestrator Checkpoint Definitions

## Checkpoint 1: Research Approval

**Trigger:** Research agent completes feature analysis

**Requirements:**
- User must approve research results before proceeding

**User Prompt:**
```
=== Research Results ===
App Type: [type]
Similar Apps: [list]
Recommended Features: [list]
Suggested Tech Stack: [list]

Approve to continue? (y/n/revise)
```

**Actions:**
- `y` → proceed to Code + Design
- `n` → stop pipeline
- `revise` → send REVISION to Research agent

---

## Checkpoint 2: QA + Test Pass

**Trigger:** QA agent and Test agent complete their tasks

**Requirements:**
- `flutter analyze` must return 0 errors, 0 warnings
- Test coverage must be >= 80%

**Auto-evaluation:**
```bash
flutter analyze → 0 errors
flutter test --coverage → coverage >= 80%
```

**Actions:**
- Pass → automatically continue to Build
- Fail → send REVISION to QA/Test agent (max 3 retries)
- Persistent fail → notify user, pause pipeline

---

## Checkpoint 3: Deploy Approval

**Trigger:** Build agent completes all platform builds

**Requirements:**
- User must approve before deployment to stores

**User Prompt:**
```
=== Build Artifacts ===
iOS: build/ios/app.ipa
Android: build/android/app.aab
Web: build/web/

Ready to deploy to App Store and Play Store?
(Enter credentials when ready, or cancel)
```

**Actions:**
- Proceed → call Deploy agent
- Cancel → stop pipeline (artifacts preserved)
- Credentials needed: user provides App Store / Play Store credentials