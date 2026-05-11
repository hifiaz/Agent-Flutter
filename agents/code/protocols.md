# Code Agent Protocols

## Project Scaffolding Protocol

1. **Initialize Project**
   ```bash
   flutter create --org com.appname --project-name project_name --platforms ios,android,web projects/project_name
   ```

2. **Add Dependencies**
   ```bash
   cd projects/project_name && flutter pub add [packages]
   ```

3. **Generate Code Structure**
   - Create directory hierarchy
   - Generate main.dart
   - Generate app.dart with Router
   - Create feature modules

## Feature Implementation Protocol

1. **Read Research Output**
   - Load `research/features.json`
   - Load `research/tech_stack.json`

2. **Generate Per Feature**
   - Model (data class)
   - Repository (abstract + implementation)
   - Service (API/local data source)
   - BLoC/Provider
   - Screen (UI)
   - Widgets

3. **Follow Naming Conventions**
   - Files: snake_case.dart
   - Classes: PascalCase
   - Variables: camelCase
   - Constants: SCREAMING_SNAKE_CASE

## RevenueCat Protocol

1. **SDK Setup**
   ```dart
   await Purchases.setLogLevel(LogLevel.debug);
   await Purchases.configure(Configuration(appleApiKey, googleApiKey));
   ```

2. **Entitlements Check**
   ```dart
   Future<bool> hasPremium() async {
     final entitlements = await Purchases.getEntitlements();
     return entitlements.contains('premium');
   }
   ```

3. **Purchase Flow**
   - Show paywall → User selects plan
   - Call `Purchases.purchasePackage(package)`
   - Handle success/failure
   - Unlock features based on entitlement

## i18n Protocol

1. **Create ARB Files**
   - For each locale: `app_[locale].arb`
   - Use JSON format
   - Include descriptions for translators

2. **Generate Code**
   ```bash
   flutter gen-l10n
   ```

3. **Usage in Code**
   ```dart
   Text(AppLocalizations.of(context)!.welcomeMessage)
   ```

## Storage Protocol

### Local (Isar)
```dart
// Generate models with @collection
@collection
class Task {
  Id id = Isar.autoIncrement;
  String title;
  DateTime? dueDate;
}
```

### Firebase
```dart
// Setup in main.dart
await Firebase.initializeApp(options: options);
```

## Code Quality Protocol

1. **Follow Effective Dart**
   - Use const constructors
   - Avoid null checks where possible
   - Use spread operators
   - Proper async/await patterns

2. **Error Handling**
   - Wrap async calls in try-catch
   - Return Either/Result types
   - Display user-friendly errors

3. **Performance**
   - Use const widgets
   - Implement RepaintBoundary for expensive widgets
   - Lazy load where appropriate