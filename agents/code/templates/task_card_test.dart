import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:my_app/widgets/task_card.dart';
import 'package:my_app/models/task.dart';

void main() {
  group('TaskCard Widget', () {
    testWidgets('displays task title', (WidgetTester tester) async {
      final task = Task(
        id: '1',
        title: 'Test Task',
        completed: false,
        createdAt: DateTime.now(),
      );

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: TaskCard(
              task: task,
              onTap: () {},
              onToggle: () {},
              onDelete: () {},
            ),
          ),
        ),
      );

      expect(find.text('Test Task'), findsOneWidget);
    });

    testWidgets('shows checkbox for completion status', (WidgetTester tester) async {
      final task = Task(
        id: '1',
        title: 'Test Task',
        completed: false,
        createdAt: DateTime.now(),
      );

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: TaskCard(
              task: task,
              onTap: () {},
              onToggle: () {},
              onDelete: () {},
            ),
          ),
        ),
      );

      final checkbox = find.byType(Checkbox);
      expect(checkbox, findsOneWidget);
    });

    testWidgets('calls onToggle when checkbox tapped', (WidgetTester tester) async {
      bool toggled = false;
      final task = Task(
        id: '1',
        title: 'Test Task',
        completed: false,
        createdAt: DateTime.now(),
      );

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: TaskCard(
              task: task,
              onTap: () {},
              onToggle: () => toggled = true,
              onDelete: () {},
            ),
          ),
        ),
      );

      await tester.tap(find.byType(Checkbox));
      await tester.pump();

      expect(toggled, true);
    });

    testWidgets('calls onDelete when delete icon tapped', (WidgetTester tester) async {
      bool deleted = false;
      final task = Task(
        id: '1',
        title: 'Test Task',
        completed: false,
        createdAt: DateTime.now(),
      );

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: TaskCard(
              task: task,
              onTap: () {},
              onToggle: () {},
              onDelete: () => deleted = true,
            ),
          ),
        ),
      );

      await tester.tap(find.byIcon(Icons.delete));
      await tester.pump();

      expect(deleted, true);
    });
  });
}