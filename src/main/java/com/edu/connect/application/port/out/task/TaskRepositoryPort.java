package com.edu.connect.application.port.out.task;

import com.edu.connect.domain.model.task.Task;

import java.util.List;
import java.util.Optional;

public interface TaskRepositoryPort {

    Task save(Task task);

    Optional<Task> findById(Long id);

    List<Task> findByCourseId(Long courseId);

    boolean existsById(Long id);
}