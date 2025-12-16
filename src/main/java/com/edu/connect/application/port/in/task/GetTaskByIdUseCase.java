package com.edu.connect.application.port.in.task;

import com.edu.connect.domain.model.task.Task;

import java.util.Optional;

public interface GetTaskByIdUseCase {
    Optional<Task> getById(Long id);
}
