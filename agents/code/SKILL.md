---
name: code
description: Generates Flutter project code, implements features, integrates RevenueCat, sets up i18n localization
---

# Code Agent

## Overview
The Code Agent generates Flutter project structure, implements features based on research output, integrates RevenueCat for payments, and sets up internationalization.

## Responsibilities

1. **Project Scaffolding**
   - Create Flutter project with `flutter create`
   - Setup directory structure
   - Configure pubspec.yaml with dependencies

2. **Feature Implementation**
   - Implement features from research output
   - Create models, repositories, services
   - Build UI widgets and screens

3. **State Management**
   - Setup chosen state management (flutter_bloc/riverpod/etc)
   - Create blocs/stores/providers

4. **RevenueCat Integration**
   - Configure RevenueCat SDK
   - Implement entitlements
   - Create paywall UI

5. **Internationalization (i18n)**
   - Setup flutter_localizations
   - Generate ARB files for supported locales
   - Configure l10n.yaml

6. **Storage Integration**
   - Local: Setup Isar/Hive/SQLite
   - Firebase: Setup Firebase dependencies

## Input

From Orchestrator:
```json
{
  "type": "REQUEST",
  "payload": {
    "project_name": "todo_app",
    "research_output": {...},
    "features": [...],
    "tech_stack": {...},
    "payment": "revenuecat",
    "storage": "local",
    "locales": ["en", "id", "ms"]
  }
}
```

## Output Structure

```
projects/[name]/
├── lib/
│   ├── main.dart
│   ├── app.dart
│   ├── core/
│   │   ├── constants/
│   │   ├── theme/
│   │   ├── utils/
│   │   └── l10n/
│   ├── data/
│   │   ├── models/
│   │   ├── repositories/
│   │   └── services/
│   ├── domain/
│   │   ├── entities/
│   │   └── repositories/
│   ├── presentation/
│   │   ├── blocs/
│   │   ├── screens/
│   │   └── widgets/
│   └── payment/
│       └── revenuecat/
├── l10n/
│   ├── app_en.arb
│   └── app_id.arb
├── test/
│   └── integration/
├── pubspec.yaml
├── l10n.yaml
└── .env
```

## RevenueCat Integration

### pubspec.yaml
```yaml
dependencies:
  in_app_purchase: ^3.1.0
  revenuecat: ^5.0.0

flutter:
  generate: true
```

### l10n.yaml
```yaml
arb-dir: lib/l10n
template-arb-file: app_en.arb
output-localization-file: app_localizations.dart
```

### Entitlements
```dart
enum Entitlement {
  premium('premium'),
  pro('pro');

  final String id;
  const Entitlement(this.id);
}
```

## Internationalization

### ARB File Structure
```json
{
  "@@locale": "en",
  "appTitle": "My App",
  "@appTitle": {
    "description": "The title of the application"
  },
  "welcomeMessage": "Hello {name}",
  "@welcomeMessage": {
    "description": "Welcome message",
    "placeholders": {
      "name": {
        "type": "String"
      }
    }
  }
}
```

### Supported Locales
- English (en)
- Indonesian (id)
- Malay (ms)
- Thai (th)
- Vietnamese (vi)
- Chinese (zh)
- Japanese (ja)
- Korean (ko)

## Code Templates

### BLoC Template
```dart
class FeatureBloc extends Bloc<FeatureEvent, FeatureState> {
  FeatureBloc() : super(FeatureInitial()) {
    on<LoadFeature>(_onLoad);
  }

  Future<void> _onLoad(LoadFeature event, Emitter<FeatureState> emit) async {
    emit(FeatureLoading());
    try {
      final data = await repository.getData();
      emit(FeatureLoaded(data));
    } catch (e) {
      emit(FeatureError(e.toString()));
    }
  }
}
```

### Repository Template
```dart
abstract class FeatureRepository {
  Future<List<Item>> getItems();
  Future<Item> getItem(String id);
  Future<void> saveItem(Item item);
  Future<void> deleteItem(String id);
}
```

## Checkpoint

After code generation:
```json
{
  "type": "CHECKPOINT",
  "payload": {
    "checkpoint_id": "checkpoint_2",
    "artifacts": ["lib/", "l10n/"],
    "needs_approval": false
  }
}
```