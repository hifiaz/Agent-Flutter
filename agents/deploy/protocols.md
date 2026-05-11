# Deploy Agent Protocols

## Credential Request Protocol

1. **Prompt User**
   ```
   === iOS Credentials ===
   Choose auth method:
   1. App Store Connect API Key (recommended)
   2. Apple ID + App-Specific Password

   Enter choice:
   ```

2. **Collect Input**
   - API Key: key_id, issuer_id, key content
   - Apple ID: email, password, team_id

3. **Validate**
   - Check format
   - Test connection (optional)

4. **Store Temporarily**
   - Environment variables (session only)
   - NOT written to files

## iOS Upload Protocol

### Method 1: App Store Connect API Key
```bash
# User provides:
APPLE_KEY_ID=XYZ123
APPLE_ISSUER_ID=abc-456
APPLE_KEY="-----BEGIN PKCS8-----..."

# fastlane uses these to authenticate
```

### Method 2: Transporter (Manual)
```
Agent provides:
1. IPA file location
2. Instructions to use Transporter app

User manually:
1. Opens Transporter
2. Drags IPA file
3. Submits
```

## Android Upload Protocol

### Service Account Method
```bash
# User provides JSON key file path
GOOGLE_PLAY_JSON_KEY=/path/to/service-account.json

# fastlane uses:
supply(
  json_key: GOOGLE_PLAY_JSON_KEY,
  package_name: "com.appname"
)
```

### Manual Method
```
Agent provides:
1. AAB file location
2. Play Console upload URL

User manually:
1. Opens Play Console
2. Creates new release
3. Uploads AAB
4. Fills release notes
5. Submits
```

## Upload Validation Protocol

### Before Upload
```bash
# Verify artifacts exist
ls -la build/ios/Runner.ipa
ls -la build/android/app-release.aab

# Verify IPA size (should be > 1MB)
du -h build/ios/Runner.ipa

# Verify AAB size
du -h build/android/app-release.aab
```

### After Upload
```json
{
  "ios": {
    "upload_id": "abc123",
    "status": "success",
    "next_steps": "Check App Store Connect for review status"
  },
  "android": {
    "upload_id": "xyz789",
    "status": "success",
    "next_steps": "Publish in Play Console"
  }
}
```

## Release Notes Protocol

1. **Generate Draft**
   ```markdown
   ## Version 1.0.0
   - Initial release with task management features
   - Create, edit, and delete tasks
   - Due date reminders
   - Categories and tags
   ```

2. **User Review**
   - Show draft to user
   - User can edit
   - Confirm before upload

3. **Apply**
   - Use approved notes for upload

## Error Handling Protocol

| Error | Action |
|-------|--------|
| Invalid credentials | Prompt user to re-enter |
| Network timeout | Retry 3 times |
| Build expired | Re-run Build agent |
| Upload rejected | Show error, suggest fix |