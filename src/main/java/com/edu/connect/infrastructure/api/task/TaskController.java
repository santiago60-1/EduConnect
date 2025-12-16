package com.edu.connect.infrastructure.api.task;

import com.edu.connect.application.dto.task.CreateTaskRequest;
import com.edu.connect.application.port.in.task.*;
import com.edu.connect.domain.model.task.Task;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final CreateTaskUseCase createTaskUC;
    private final UpdateTaskUseCase updateTaskUC;
    private final GetTaskByIdUseCase getTaskByIdUC;
    private final GetTasksByCourseUseCase getTasksByCourseUC;

    public TaskController(
            CreateTaskUseCase createTaskUC,
            UpdateTaskUseCase updateTaskUC,
            GetTaskByIdUseCase getTaskByIdUC,
            GetTasksByCourseUseCase getTasksByCourseUC
    ) {
        this.createTaskUC = createTaskUC;
        this.updateTaskUC = updateTaskUC;
        this.getTaskByIdUC = getTaskByIdUC;
        this.getTasksByCourseUC = getTasksByCourseUC;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('TEACHER') or hasRole('ADMIN')")
    public Task create(@RequestBody @Valid CreateTaskRequest req) {
        return createTaskUC.create(
                req.courseId(),
                req.title(),
                req.description(),
                req.dueDate()
        );
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('TEACHER') or hasRole('ADMIN')")
    public Task update(
            @PathVariable Long id,
            @RequestBody @Valid CreateTaskRequest req
    ) {
        return updateTaskUC.update(
                id,
                req.title(),
                req.description(),
                req.dueDate()
        );
    }

    @GetMapping("/{id}")
    public Task getById(@PathVariable Long id) {
        return getTaskByIdUC.getById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    @GetMapping("/course/{courseId}")
    public List<Task> getTasksByCourse(@PathVariable Long courseId) {
        return getTasksByCourseUC.getTasksByCourse(courseId);
    }
}
