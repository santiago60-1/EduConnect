package com.edu.connect.infrastructure.persistence.task;

import com.edu.connect.application.port.out.task.TaskRepositoryPort;
import com.edu.connect.domain.model.task.Task;
import org.springframework.stereotype.Component;

import java.lang.reflect.Field;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class TaskRepositoryAdapter implements TaskRepositoryPort {

    private final JpaTaskRepository jpaRepository;

    public TaskRepositoryAdapter(JpaTaskRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public Task save(Task task) {
        JpaTaskEntity entity = toEntity(task);
        JpaTaskEntity saved = jpaRepository.save(entity);
        return toDomain(saved);
    }

    @Override
    public Optional<Task> findById(Long id) {
        return jpaRepository.findById(id)
                .map(this::toDomain);
    }

    @Override
    public List<Task> findByCourseId(Long courseId) {
        return jpaRepository.findByCourseId(courseId).stream()
                .map(this::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public boolean existsById(Long id) {
        return jpaRepository.existsById(id);
    }

    // Mappers
    private JpaTaskEntity toEntity(Task task) {
        JpaTaskEntity entity = new JpaTaskEntity();
        entity.setId(task.getId());
        entity.setCourseId(task.getCourseId());
        entity.setTitle(task.getTitle());
        entity.setDescription(task.getDescription());
        entity.setDueDate(task.getDueDate());
        entity.setCreatedAt(task.getCreatedAt());
        entity.setUpdatedAt(task.getUpdatedAt());
        return entity;
    }

    private Task toDomain(JpaTaskEntity entity) {
        // Reconstruct using create method
        LocalDate safeDueDate = entity.getDueDate() != null && entity.getDueDate().isAfter(LocalDate.now())
                ? entity.getDueDate()
                : LocalDate.now().plusDays(1);

        Task task = Task.create(
                entity.getCourseId(),
                entity.getTitle(),
                entity.getDescription(),
                safeDueDate);

        // Use reflection to set ID and updatedAt (reconstruction from persistence)
        try {
            Field idField = Task.class.getDeclaredField("id");
            idField.setAccessible(true);
            idField.set(task, entity.getId());

            if (entity.getUpdatedAt() != null) {
                Field updatedAtField = Task.class.getDeclaredField("updatedAt");
                updatedAtField.setAccessible(true);
                updatedAtField.set(task, entity.getUpdatedAt());
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to reconstruct Task from persistence", e);
        }

        return task;
    }
}
