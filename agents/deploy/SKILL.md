---
name: deploy
description: Publishes Flutter apps to App Store and Play Store with semi-manual credential handling
---

# Deploy Agent

## Overview
The Deploy Agent handles publishing Flutter applications to iOS App Store and Google Play Store using semi-manual credential handling.

## Responsibilities

1. **iOS App Store Deployment**
   - Validate build artifacts
   - Upload via Transporter or fastlane
   - Handle credentials (user provides)

2. **Google Play Store Deployment**
   - Validate AAB artifact
   - Upload via fastlane or gcloud CLI
   - Handle credentials (user provides)

3. **Release Management**
   - Track release status
   - Provide upload confirmation

## Input

From Orchestrator:
```json
{
  "type": "REQUEST",
  "payload": {
    "project_path": "projects/todo_app",
    "artifacts": {
      "ios": "build/ios/Runner.ipa",
      "android": "build/android/app-release.aab"
    },
    "release_notes": "Initial release with task management features"
  }
}
```

## Semi-Manual Credential Flow

```
User receives prompt → User inputs credentials → Agent uses credentials → Upload proceeds
```

### iOS Credentials
1. App Store Connect API Key (recommended)
2. Or: Apple ID + App-Specific Password + Team ID

### Android Credentials
1. Google Play Console Service Account (JSON key)
2. Or: Upload key + Keystore password

## Deployment Process

### iOS App Store

```bash
# Option 1: Using Transporter (manual)
# User opens Transporter app and drags Runner.ipa

# Option 2: Using fastlane (semi-manual)
# User provides API key in .env file

# In fastlane:
desc "Upload to App Store"
lane :deploy do
  api_key = app_store_connect_api_key(
    key_id: ENV['APPLE_KEY_ID'],
    issuer_id: ENV['APPLE_ISSUER_ID'],
    key: ENV['APPLE_KEY']
  )
  deliver(api_key: api_key)
end
```

### Google Play Store

```bash
# Setup fastlane
# User provides service account JSON

# In Fastfile:
desc "Deploy to Play Store"
lane :deploy do
  supply(
    json_key: ENV['GOOGLE_PLAY_JSON_KEY'],
    package_name: 'com.appname.todo'
  )
end
```

## Output

```json
{
  "type": "RESULT",
  "payload": {
    "ios": {
      "status": "uploaded",
      "build_number": "1.0.0.1",
      "upload_date": "2026-05-11T10:30:00Z"
    },
    "android": {
      "status": "uploaded",
      "version_code": "1",
      "upload_date": "2026-05-11T10:30:00Z"
    }
  }
}
```

## Checkpoint

After deployment upload:
```json
{
  "type": "CHECKPOINT",
  "payload": {
    "checkpoint_id": "checkpoint_3",
    "status": "UPLOADED",
    "message": "Artifacts uploaded. Check App Store Connect / Play Console for review status.",
    "needs_approval": false
  }
}
```

## Post-Deploy

After upload, user must:
1. **iOS**: Review in App Store Connect, submit for review
2. **Android**: Review in Play Console, publish manually

The agent provides links to:
- App Store Connect: https://appstoreconnect.apple.com
- Google Play Console: https://play.google.com/console