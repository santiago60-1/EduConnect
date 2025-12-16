package com.edu.connect.application.port.in.task;

import com.edu.connect.domain.model.task.Task;

import java.time.LocalDate;

public interface UpdateTaskUseCase {
    Task update(Long taskId, String title, String description, LocalDate dueDate);
}
