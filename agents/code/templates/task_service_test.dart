import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';
import 'package:my_app/models/task.dart';
import 'package:my_app/repositories/task_repository.dart';
import 'package:my_app/services/task_service.dart';

@GenerateMocks([TaskRepository])
import 'task_service_test.mocks.dart';

void main() {
  late TaskService taskService;
  late MockTaskRepository mockRepository;

  setUp(() {
    mockRepository = MockTaskRepository();
    taskService = TaskService(repository: mockRepository);
  });

  group('TaskService', () {
    test('should return list of tasks from repository', () async {
      final tasks = [
        Task(id: '1', title: 'Task 1', completed: false),
        Task(id: '2', title: 'Task 2', completed: true),
      ];

      when(mockRepository.getTasks()).thenAnswer((_) async => tasks);

      final result = await taskService.getTasks();

      expect(result, tasks);
      verify(mockRepository.getTasks()).called(1);
    });

    test('should create new task', () async {
      final newTask = Task(id: '1', title: 'New Task', completed: false);

      when(mockRepository.createTask(any)).thenAnswer((_) async => newTask);

      final result = await taskService.createTask('New Task');

      expect(result.title, 'New Task');
      verify(mockRepository.createTask(any)).called(1);
    });

    test('should toggle task completion', () async {
      final task = Task(id: '1', title: 'Task', completed: false);

      when(mockRepository.getTask('1')).thenAnswer((_) async => task);
      when(mockRepository.updateTask(any)).thenAnswer((_) async => task);

      await taskService.toggleTaskCompletion('1');

      verify(mockRepository.updateTask(any)).called(1);
    });

    test('should delete task', () async {
      when(mockRepository.deleteTask('1')).thenAnswer((_) async {});

      await taskService.deleteTask('1');

      verify(mockRepository.deleteTask('1')).called(1);
    });
  });
}