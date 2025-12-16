package com.edu.connect.application.port.in.task;

import com.edu.connect.domain.model.task.Task;

import java.time.LocalDate;

public interface CreateTaskUseCase {
    Task create(Long courseId, String title, String description, LocalDate dueDate);
}