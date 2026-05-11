# Test Agent Protocols

## Test Discovery Protocol

1. **Scan Test Directory**
   - Find all `*_test.dart` files
   - Categorize by type (unit/widget/integration)

2. **Parse Test Groups**
   - Extract test names
   - Map to source files

## Execution Protocol

### Step 1: Unit Tests
```bash
flutter test test/unit/
```
- Run all unit tests first
- Fastest to execute
- Most critical for logic

### Step 2: Widget Tests
```bash
flutter test test/widget/
```
- Run after unit tests pass
- Test UI components

### Step 3: Integration Tests
```bash
flutter test integration_test/
```
- Run last (slowest)
- Test full user flows

### Step 4: Coverage
```bash
flutter test --coverage
genhtml coverage/lcov.info -o coverage/html
```

## Parallel Execution Protocol

For faster execution:
```bash
# Run in parallel (requires multiple cores)
flutter test --reporter expanded test/unit/ &
flutter test --reporter expanded test/widget/ &
wait
```

## Failure Handling Protocol

1. **Test Fails**
   - Capture failure message
   - Log stack trace
   - Identify failing test file/line

2. **Retry Logic**
   - Retry failed tests once
   - If still failing → report to Orchestrator

3. **Coverage Below Threshold**
   - Generate coverage report
   - Identify uncovered files
   - Send REVISION to Code agent

## Mock Setup Protocol

### Repository Mock
```dart
class MockTaskRepository extends Mock implements TaskRepository {}

void main() {
  late MockTaskRepository mockRepository;

  setUp(() {
    mockRepository = MockTaskRepository();
  });

  test('should return tasks from repository', () async {
    when(mockRepository.getTasks())
        .thenAnswer((_) async => [Task(title: 'Test')]);

    final bloc = TaskBloc(repository: mockRepository);
    bloc.add(LoadTasks());

    await expectLater(bloc.stream, emits(isA<TaskLoaded>()));
  });
}
```

## Integration Test Setup Protocol

```dart
void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  setUpAll(() async {
    // Setup test database
    await Hive.initFlutter();
  });

  testWidgets('complete task flow', (WidgetTester tester) async {
    await tester.pumpWidget(MyApp());
    // Test implementation
  });
}
```

## Coverage Report Protocol

1. **Generate lcov.info**
   ```bash
   flutter test --coverage
   ```

2. **Calculate Coverage**
   ```bash
   genhtml coverage/lcov.info -o coverage/html
   ```

3. **Parse Report**
   - Read `coverage/index.html`
   - Extract overall percentage
   - List files below threshold

4. **Generate JSON Report**
   ```json
   {
     "overall": 85.5,
     "files": [
       {"path": "lib/models/task.dart", "coverage": 95},
       {"path": "lib/services/task_service.dart", "coverage": 72}
     ]
   }
   ```