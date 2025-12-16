package com.edu.connect.application.service.task;

import com.edu.connect.application.port.in.task.*;
import com.edu.connect.application.port.out.course.CourseRepositoryPort;
import com.edu.connect.application.port.out.task.TaskRepositoryPort;
import com.edu.connect.domain.model.task.Task;

import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public class TaskService
        implements CreateTaskUseCase, UpdateTaskUseCase, GetTaskByIdUseCase, GetTasksByCourseUseCase {

    private final TaskRepositoryPort taskRepo;
    private final CourseRepositoryPort courseRepo;

    public TaskService(
            TaskRepositoryPort taskRepo,
            CourseRepositoryPort courseRepo
    ) {
        this.taskRepo = taskRepo;
        this.courseRepo = courseRepo;
    }

    @Override
    @Transactional
    public Task create(
            Long courseId,
            String title,
            String description,
            LocalDate dueDate
    ) {
        if (!courseRepo.existsById(courseId))
            throw new IllegalArgumentException("Course not found");

        Task task = Task.create(courseId, title, description, dueDate);
        return taskRepo.save(task);
    }

    @Override
    public Task update(
            Long taskId,
            String title,
            String description,
            LocalDate dueDate
    ) {
        Task task = taskRepo.findById(taskId)
                .orElseThrow(() ->
                        new IllegalArgumentException("Task not found"));

        task.update(title, description, dueDate);
        return taskRepo.save(task);
    }

    @Override
    public Optional<Task> getById(Long id) {
        return taskRepo.findById(id);
    }

    @Override
    public List<Task> getTasksByCourse(Long courseId) {
        return taskRepo.findByCourseId(courseId);
    }
}
