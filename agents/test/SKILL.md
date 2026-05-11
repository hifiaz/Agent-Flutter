---
name: test
description: Runs unit tests, widget tests, and integration tests for Flutter projects
---

# Test Agent

## Overview
The Test Agent runs comprehensive tests including unit tests, widget tests, and integration tests to verify Flutter app functionality.

## Responsibilities

1. **Unit Tests**
   - Test business logic
   - Test repositories
   - Test services
   - Use mockito for mocking

2. **Widget Tests**
   - Test individual widgets
   - Test screen rendering
   - Verify user interactions

3. **Integration Tests**
   - Test full user flows
   - Test navigation
   - Test data persistence

4. **Coverage Report**
   - Generate coverage data
   - Create HTML reports
   - Ensure >= 80% coverage

## Input

From Orchestrator:
```json
{
  "type": "REQUEST",
  "payload": {
    "project_path": "projects/todo_app",
    "test_types": ["unit", "widget", "integration"]
  }
}
```

## Test Structure

```
test/
├── unit/
│   ├── models/
│   │   └── task_test.dart
│   ├── repositories/
│   │   └── task_repository_test.dart
│   └── services/
│       └── task_service_test.dart
├── widget/
│   ├── task_card_test.dart
│   └── task_list_test.dart
└── integration/
    ├── create_task_test.dart
    └── delete_task_test.dart
```

## Test Template

### Unit Test
```dart
void main() {
  group('TaskModel', () {
    test('should create task with correct values', () {
      final task = Task(
        id: '1',
        title: 'Test Task',
        dueDate: DateTime(2024, 1, 1),
      );

      expect(task.title, 'Test Task');
      expect(task.isCompleted, false);
    });

    test('should toggle completion status', () {
      final task = Task(id: '1', title: 'Test', completed: false);
      task.toggleComplete();

      expect(task.completed, true);
    });
  });
}
```

### Widget Test
```dart
void main() {
  testWidgets('TaskCard displays task title', (tester) async {
    await tester.pumpWidget(
      MaterialApp(
        home: TaskCard(task: Task(title: 'Test Task')),
      ),
    );

    expect(find.text('Test Task'), findsOneWidget);
  });
}
```

### Integration Test
```dart
void main() {
  integrationTest('create task flow', (WidgetTester tester) async {
    await tester.pumpWidget(App());
    await tester.pumpAndSettle();

    // Navigate to create task
    await tester.tap(find.byIcon(Icons.add));
    await tester.pumpAndSettle();

    // Fill form
    await tester.enterText(find.byType(TextField), 'New Task');
    await tester.tap(find.byType(ElevatedButton));

    // Verify task created
    expect(find.text('New Task'), findsOneWidget);
  });
}
```

## Output

```json
{
  "type": "RESULT",
  "payload": {
    "unit_tests": {
      "total": 50,
      "passed": 50,
      "failed": 0
    },
    "widget_tests": {
      "total": 20,
      "passed": 20,
      "failed": 0
    },
    "integration_tests": {
      "total": 5,
      "passed": 5,
      "failed": 0
    },
    "coverage": 85.5,
    "passed": true
  }
}
```

## Coverage Requirements

| Type | Minimum Coverage |
|------|------------------|
| Models | 90% |
| Repositories | 85% |
| Services | 80% |
| BLoCs | 90% |
| Widgets | 70% |
| Overall | 80% |

## Checkpoint

After test completion:
```json
{
  "type": "CHECKPOINT",
  "payload": {
    "checkpoint_id": "checkpoint_2",
    "status": "PASSED",
    "coverage": 85.5,
    "tests_passed": true,
    "needs_approval": false
  }
}
```