#!/usr/bin/env node

/**
 * Documentation Generator
 * Auto-generates README, API docs, and changelog for Flutter projects
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const COLORS = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m'
};

function log(message, color = 'reset') {
  console.log(`${COLORS[color]}${message}${COLORS.reset}`);
}

/**
 * Generate README.md from manifest.json
 */
function generateReadme(projectPath, manifest) {
  const features = loadResearchFeatures(projectPath);
  const techStack = loadTechStack(projectPath);

  const readme = `# ${manifest.name}

${manifest.description || 'A Flutter application.'}

## Features

${features.map(f => `- ${formatFeatureName(f.name)}`).join('\n')}

## Tech Stack

${techStack ? `
| Component | Technology |
|-----------|------------|
| State Management | ${techStack.state_management || 'N/A'} |
| Navigation | ${techStack.navigation || 'N/A'} |
| Database | ${techStack.database || 'N/A'} |
${techStack.api_client ? `| API Client | ${techStack.api_client} |` : ''}
${techStack.ui_components ? `| UI | ${techStack.ui_components} |` : ''}
` : ''}
## Getting Started

### Prerequisites

- Flutter SDK 3.10+
- Dart SDK 3.0+
${manifest.storage === 'firebase' ? '- Firebase CLI\n- Google account for Firebase' : ''}
${manifest.payment ? '- RevenueCat account\n- App Store Connect access\n- Google Play Console access' : ''}

### Installation

\`\`\`bash
# Clone the repository
git clone <repository-url>
cd ${manifest.name}

# Install dependencies
flutter pub get

# Generate code (if needed)
flutter pub run build_runner build --delete-conflicting-outputs
\`\`\`

### Running the App

\`\`\`bash
# Development
flutter run

# iOS Simulator
flutter run -d "iPhone 15 Pro"

# Android Emulator
flutter run -d android

# Web
flutter run -d chrome
\`\`\`

## Supported Platforms

${manifest.platforms.map(p => `- ${capitalize(p)}`).join('\n')}

## Supported Languages

${(manifest.locales || ['en']).map(l => `- ${getLanguageName(l)}`).join('\n')}

${manifest.payment ? `## Subscription

This app uses RevenueCat for subscription management. In-app purchases are available for:

- Premium features unlock
${manifest.payment === 'revenuecat' ? '- One-time purchases\n- Subscription plans' : ''}

## Configuration

### RevenueCat

Set your API keys in \`.env\`:
\`\`\`env
REVENUECAT_API_KEY=your_api_key
APPLE_KEY_ID=your_key_id
GOOGLE_PLAY_KEY=your_key
\`\`\`
` : ''}
${manifest.storage === 'firebase' ? `## Firebase Setup

1. Create a Firebase project at https://console.firebase.google.com
2. Add iOS app and download GoogleService-Info.plist
3. Add Android app and download google-services.json
4. Enable Firestore and Storage
5. Place config files in respective directories:
   - iOS: ios/Runner/GoogleService-Info.plist
   - Android: android/app/google-services.json
` : ''}
## Build

### iOS

\`\`\`bash
# Simulator (no signing)
flutter build ios --simulator --no-codesign

# Device/Release (requires signing)
flutter build ios --release
\`\`\`

### Android

\`\`\`bash
# Debug APK
flutter build apk --debug

# Release AAB (Play Store)
flutter build appbundle --release
\`\`\`

### Web

\`\`\`bash
flutter build web --release
\`\`\`

## Testing

\`\`\`bash
# Run all tests
flutter test

# With coverage
flutter test --coverage

# Integration tests
flutter test integration_test/
\`\`\`

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'feat: add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Version

${manifest.version || '1.0.0'}
`;

  const readmePath = path.join(projectPath, 'README.md');
  fs.writeFileSync(readmePath, readme);
  log(`✅ Generated: README.md`, 'green');
  return readmePath;
}

/**
 * Generate API.md from project structure
 */
function generateApiDocs(projectPath) {
  const libPath = path.join(projectPath, 'lib');

  if (!fs.existsSync(libPath)) {
    log(`⚠️  lib/ directory not found, skipping API docs`, 'yellow');
    return;
  }

  let apiContent = `# API Documentation

This document auto-generated from dart doc comments.

## Table of Contents

`;

  const files = getDartFiles(libPath);
  const classes = [];

  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const classMatches = content.match(/class\s+(\w+)/g);
    if (classMatches) {
      classMatches.forEach(match => {
        const className = match.replace('class ', '');
        const relativePath = file.replace(libPath + '/', '');
        classes.push({ name: className, path: relativePath });
      });
    }
  });

  apiContent += classes.map(c => `- [${c.name}](#${c.name.toLowerCase()})`).join('\n') + '\n\n';

  classes.forEach(c => {
    apiContent += `## ${c.name}\n\n`;
    apiContent += `File: \`${c.path}\`\n\n`;
    apiContent += `<!-- Add doc comment here -->\n\n`;
  });

  const apiPath = path.join(projectPath, 'docs', 'API.md');
  fs.mkdirSync(path.dirname(apiPath), { recursive: true });
  fs.writeFileSync(apiPath, apiContent);
  log(`✅ Generated: docs/API.md`, 'green');
  return apiPath;
}

/**
 * Generate CHANGELOG.md
 */
function generateChangelog(projectPath, version) {
  const changelogPath = path.join(projectPath, 'CHANGELOG.md');

  const template = `# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [${version || '1.0.0'}] - ${new Date().toISOString().split('T')[0]}

### Added
- Initial release
${generateFeaturesList(projectPath)}

### Changed

### Fixed

### Security

---

## Previous Versions

<!-- Add previous version entries above -->
`;

  fs.writeFileSync(changelogPath, changelogPath);
  log(`✅ Generated: CHANGELOG.md`, 'green');
  return changelogPath;
}

/**
 * Generate SETUP.md
 */
function generateSetup(projectPath, manifest) {
  const setup = `# Setup Guide

## Prerequisites

### Required Software

| Software | Version | Download |
|----------|---------|----------|
| Flutter | 3.10+ | [flutter.dev](https://flutter.dev) |
| Dart | 3.0+ | Included with Flutter |
| Git | 2.0+ | [git-scm.com](https://git-scm.com) |

### Optional Software

${manifest.storage === 'firebase' ? `| Software | Purpose | Download |
|----------|---------|----------|
| Firebase CLI | Firebase management | [firebase.google.com](https://firebase.google.com/docs/cli) |
` : ''}
${manifest.payment ? `| Software | Purpose | Download |
|----------|---------|----------|
| Xcode | iOS development | Mac App Store |
| Android Studio | Android development | [developer.android.com](https://developer.android.com/studio) |
| RevenueCat Dashboard | Subscription management | [revenuecat.com](https://revenuecat.com) |
` : ''}
## Installation

### 1. Clone Repository

\`\`\`bash
git clone <repository-url>
cd ${manifest.name}
\`\`\`

### 2. Install Flutter Dependencies

\`\`\`bash
flutter pub get
\`\`\`

### 3. Environment Setup

\`\`\`bash
# Copy environment template
cp .env.example .env

# Edit .env with your credentials
nano .env
\`\`\`

### 4. Platform Setup

#### iOS
\`\`\`bash
cd ios
pod install
cd ..
\`\`\`

#### Android
\`\`\`bash
# No additional setup needed if using Flutter defaults
\`\`\`

${manifest.storage === 'firebase' ? `### 5. Firebase Setup

\`\`\`bash
# Login to Firebase
firebase login

# Initialize Firebase (if not already done)
firebase init
\`\`\`

Follow the prompts to add your Firebase project.
` : ''}
## Running Development

\`\`\`bash
# Run on all devices
flutter run

# Run on specific platform
flutter run -d <device-id>
\`\`\`

## Building for Production

See [README.md](README.md#build) for build instructions.

## Troubleshooting

### Flutter not found
\`\`\`bash
# Add Flutter to PATH (macOS/Linux)
export PATH="$PATH:/path/to/flutter/bin"
\`\`\`

### iOS simulator not found
\`\`\`bash
# List available simulators
xcrun simctl list devices available
\`\`\`

### Android licenses not accepted
\`\`\`bash
flutter doctor --android-licenses
\`\`\`
`;

  const setupPath = path.join(projectPath, 'docs', 'SETUP.md');
  fs.mkdirSync(path.dirname(setupPath), { recursive: true });
  fs.writeFileSync(setupPath, setup);
  log(`✅ Generated: docs/SETUP.md`, 'green');
  return setupPath;
}

/**
 * Update CHANGELOG from git commits
 */
function updateChangelogFromGit(projectPath) {
  try {
    const logCmd = `git log --pretty=format:"%h|%s|%an" -20`;
    const output = execSync(logCmd, { cwd: projectPath, encoding: 'utf8' });

    const commits = output.split('\n').map(line => {
      const [hash, subject, author] = line.split('|');
      return { hash, subject, author };
    });

    const changelog = `# Changelog\n\n`;
    // ... process commits into changelog
    return changelog;
  } catch (e) {
    log(`⚠️  Git not available or no commits yet`, 'yellow');
    return null;
  }
}

// Helper functions
function loadResearchFeatures(projectPath) {
  try {
    const featuresPath = path.join(projectPath, 'research', 'features.json');
    if (fs.existsSync(featuresPath)) {
      const data = JSON.parse(fs.readFileSync(featuresPath, 'utf8'));
      return data.features || [];
    }
  } catch (e) {}
  return [];
}

function loadTechStack(projectPath) {
  try {
    const techPath = path.join(projectPath, 'research', 'tech_stack.json');
    if (fs.existsSync(techPath)) {
      return JSON.parse(fs.readFileSync(techPath, 'utf8'));
    }
  } catch (e) {}
  return null;
}

function formatFeatureName(name) {
  return name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getLanguageName(code) {
  const languages = {
    en: 'English',
    id: 'Indonesian',
    ms: 'Malay',
    th: 'Thai',
    vi: 'Vietnamese',
    zh: 'Chinese',
    ja: 'Japanese',
    ko: 'Korean'
  };
  return languages[code] || code;
}

function getDartFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'generated') {
      getDartFiles(fullPath, files);
    } else if (item.endsWith('.dart')) {
      files.push(fullPath);
    }
  });
  return files;
}

function generateFeaturesList(projectPath) {
  const features = loadResearchFeatures(projectPath);
  if (features.length === 0) return '';
  return '\n### Features\n' + features.map(f => `- ${formatFeatureName(f.name)}`).join('\n');
}

// CLI
const args = process.argv.slice(2);
const projectPath = args[0] || '.';

if (!fs.existsSync(path.join(projectPath, 'manifest.json'))) {
  console.error('Error: manifest.json not found');
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(path.join(projectPath, 'manifest.json'), 'utf8'));

log('\n📝 Generating documentation...', 'blue');

generateReadme(projectPath, manifest);
generateApiDocs(projectPath);
generateSetup(projectPath, manifest);
generateChangelog(projectPath, manifest.version);

log('\n✅ Documentation generated!', 'green');