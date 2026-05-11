# Common Templates - Cross-tool Compatibility

## Project Templates

### Flutter pubspec.yaml
```yaml
name: project_name
description: Project description
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  flutter_localizations:
    sdk: flutter

  # State Management
  flutter_bloc: ^8.1.0
  equatable: ^2.0.5

  # Navigation
  go_router: ^13.0.0

  # Database
  isar: ^3.1.0
  isar_flutter_libs: ^3.1.0
  path_provider: ^2.1.0

  # Networking
  dio: ^5.0.0

  # Payment
  in_app_purchase: ^3.1.0
  revenuecat: ^5.0.0

  # UI
  intl: ^0.18.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0
  build_runner: ^2.4.0
  isar_generator: ^3.1.0
  mockito: ^5.4.0
  bloc_test: ^9.1.0

flutter:
  uses-material-design: true
  generate: true

  assets:
    - assets/icons/
    - assets/splash/
    - assets/illustrations/
```

### l10n.yaml
```yaml
arb-dir: lib/l10n
template-arb-file: app_en.arb
output-localization-file: app_localizations.dart
output-class: AppLocalizations
nullable-getter: false
```

### Feature Module Template (lib/features/[feature]/)
```
feature/
├── data/
│   ├── models/
│   │   └── feature_model.dart
│   ├── repositories/
│   │   ├── feature_repository.dart
│   │   └── feature_repository_impl.dart
│   └── datasources/
│       └── feature_local_datasource.dart
├── domain/
│   ├── entities/
│   │   └── feature_entity.dart
│   └── repositories/
│       └── feature_repository.dart
├── presentation/
│   ├── bloc/
│   │   ├── feature_bloc.dart
│   │   ├── feature_event.dart
│   │   └── feature_state.dart
│   ├── screens/
│   │   └── feature_screen.dart
│   └── widgets/
│       └── feature_widget.dart
└── feature.dart (barrel export)
```

## Code Templates

### BLoC Template
```dart
part of 'feature_bloc.dart';

abstract class FeatureEvent extends Equatable {
  const FeatureEvent();

  @override
  List<Object?> get props => [];
}

class LoadFeature extends FeatureEvent {}

class UpdateFeature extends FeatureEvent {
  final FeatureModel feature;

  const UpdateFeature(this.feature);

  @override
  List<Object?> get props => [feature];
}

class DeleteFeature extends FeatureEvent {
  final String id;

  const DeleteFeature(this.id);

  @override
  List<Object?> get props => [id];
}
```

### Model Template
```dart
import 'package:equatable/equatable.dart';

class FeatureModel extends Equatable {
  final String id;
  final String name;
  final bool isActive;
  final DateTime createdAt;

  const FeatureModel({
    required this.id,
    required this.name,
    required this.isActive,
    required this.createdAt,
  });

  FeatureModel copyWith({
    String? id,
    String? name,
    bool? isActive,
    DateTime? createdAt,
  }) {
    return FeatureModel(
      id: id ?? this.id,
      name: name ?? this.name,
      isActive: isActive ?? this.isActive,
      createdAt: createdAt ?? this.createdAt,
    );
  }

  @override
  List<Object?> get props => [id, name, isActive, createdAt];
}
```

### Repository Template
```dart
abstract class FeatureRepository {
  Future<List<FeatureModel>> getAll();
  Future<FeatureModel> getById(String id);
  Future<void> create(FeatureModel feature);
  Future<void> update(FeatureModel feature);
  Future<void> delete(String id);
}
```

## Test Templates

### Unit Test Template
```dart
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';
import 'package:my_app/features/feature/data/repositories/feature_repository.dart';
import 'package:my_app/features/feature/domain/usecases/feature_usecase.dart';

@GenerateMocks([FeatureRepository])
import 'feature_usecase_test.mocks.dart';

void main() {
  late FeatureUseCase useCase;
  late MockFeatureRepository mockRepository;

  setUp(() {
    mockRepository = MockFeatureRepository();
    useCase = FeatureUseCase(repository: mockRepository);
  });

  group('FeatureUseCase', () {
    test('should get all features from repository', () async {
      final features = [FeatureModel(id: '1', name: 'Test')];
      when(mockRepository.getAll()).thenAnswer((_) async => features);

      final result = await useCase.getAll();

      expect(result, features);
      verify(mockRepository.getAll()).called(1);
    });
  });
}
```

### Widget Test Template
```dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:my_app/features/feature/presentation/widgets/feature_widget.dart';
import 'package:my_app/features/feature/domain/entities/feature_entity.dart';

void main() {
  group('FeatureWidget', () {
    testWidgets('should display feature name', (WidgetTester tester) async {
      final feature = FeatureEntity(id: '1', name: 'Test Feature');

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: FeatureWidget(feature: feature),
          ),
        ),
      );

      expect(find.text('Test Feature'), findsOneWidget);
    });
  });
}
```

### Integration Test Template
```dart
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:my_app/main.dart' as app;

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  group('Feature Flow', () {
    testWidgets('should create and display feature', (WidgetTester tester) async {
      app.main();
      await tester.pumpAndSettle();

      // Navigate to create screen
      await tester.tap(find.byIcon(Icons.add));
      await tester.pumpAndSettle();

      // Enter feature name
      await tester.enterText(find.byType(TextField), 'New Feature');
      await tester.tap(find.byType(ElevatedButton));

      // Verify created
      await tester.pumpAndSettle();
      expect(find.text('New Feature'), findsOneWidget);
    });
  });
}
```

## GitHub Actions Templates

### CI Workflow
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

  build:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
      - run: flutter pub get
      - run: flutter build ios --simulator --no-codesign
```

### Deploy Workflow
```yaml
name: Deploy

on:
  workflow_dispatch:
    inputs:
      platform:
        type: choice
        options:
          - ios
          - android
          - both

jobs:
  deploy-ios:
    if: inputs.platform == 'ios' || inputs.platform == 'both'
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
      - run: flutter build ios --release
      - run: |
          # Use secrets from repo settings
          fastlane deliver
```

## Fastlane Templates

### Appfile (iOS)
```ruby
app_identifier("com.appname")
apple_id("user@email.com")
team_id("TEAM_ID")

# RevenueCat
ENV["REVENUECAT_API_KEY"] = "your_api_key"
```

### Fastfile (iOS)
```ruby
default_platform(:ios)

platform :ios do
  desc "Build iOS app"
  lane :build do
    gym(
      scheme: "Runner",
      export_method: "app-store"
    )
  end

  desc "Deploy to App Store"
  lane :deploy do
    build
    deliver(api_key: app_store_connect_api_key(
      key_id: ENV["APPLE_KEY_ID"],
      issuer_id: ENV["APPLE_ISSUER_ID"],
      key: ENV["APPLE_KEY"]
    ))
  end
end
```

### Fastfile (Android)
```ruby
default_platform(:android)

platform :android do
  desc "Build Android AAB"
  lane :build do
    gradle(
      task: "bundle",
      flavor: "production"
    )
  end

  desc "Deploy to Play Store"
  lane :deploy do
    build
    supply(
      json_key: ENV["GOOGLE_PLAY_JSON_KEY"],
      package_name: "com.appname"
    )
  end
end
```