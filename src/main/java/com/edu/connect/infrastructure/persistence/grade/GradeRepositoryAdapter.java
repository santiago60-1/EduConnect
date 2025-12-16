package com.edu.connect.infrastructure.persistence.grade;

import com.edu.connect.application.port.out.grade.GradeRepositoryPort;
import com.edu.connect.domain.model.grade.Grade;
import org.springframework.stereotype.Component;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class GradeRepositoryAdapter implements GradeRepositoryPort {

    private final JpaGradeRepository jpaRepository;

    public GradeRepositoryAdapter(JpaGradeRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public Grade save(Grade grade) {
        JpaGradeEntity entity = toEntity(grade);
        JpaGradeEntity saved = jpaRepository.save(entity);
        return toDomain(saved);
    }

    @Override
    public Optional<Grade> findByTaskAndStudent(Long taskId, Long studentId) {
        return jpaRepository.findByTaskIdAndStudentId(taskId, studentId)
                .map(this::toDomain);
    }

    @Override
    public Optional<Grade> findById(Long id) {
        return jpaRepository.findById(id)
                .map(this::toDomain);
    }

    @Override
    public List<Grade> findByStudentAndCourse(Long studentId, Long courseId) {
        return jpaRepository.findByStudentIdAndCourseId(studentId, courseId).stream()
                .map(this::toDomain)
                .collect(Collectors.toList());
    }

    // Mappers
    private JpaGradeEntity toEntity(Grade grade) {
        JpaGradeEntity entity = new JpaGradeEntity();

        // Reflection to get ID because it is private in Domain
        try {
            Field idField = Grade.class.getDeclaredField("id");
            idField.setAccessible(true);
            entity.setId((Long) idField.get(grade));
        } catch (Exception ignored) {
        }

        entity.setTaskId(grade.getTaskId());
        entity.setStudentId(grade.getStudentId());
        entity.setValue(grade.getValue());

        // We will simple let database handle createdAt for new entities, or retrieve
        // it?
        // Actually domain model has createdAt.
        // But for new entities it is set in factory method.
        // We can access private fields via reflection as well if needed,
        // but let's try to assume cleaner way if getters existed.
        // Domain `Grade` DOES NO expose createdAt getter.
        // So strict reflection is needed or changing domain.
        // Since I can't easily change domain without permission/reason, I'll use
        // reflection for now as seen in TaskRepositoryAdapter.

        try {
            Field createdAtField = Grade.class.getDeclaredField("createdAt");
            createdAtField.setAccessible(true);
            entity.setCreatedAt((java.time.Instant) createdAtField.get(grade));

            Field updatedAtField = Grade.class.getDeclaredField("updatedAt");
            updatedAtField.setAccessible(true);
            entity.setUpdatedAt((java.time.Instant) updatedAtField.get(grade));
        } catch (Exception e) {
            throw new RuntimeException("Error mapping to entity", e);
        }

        return entity;
    }

    private Grade toDomain(JpaGradeEntity entity) {
        // Reconstruct using factory method for immutable parts? No, Grade constructor
        // is private.
        // We must use reflection or similar trick as in TaskAdapter to reconstruct
        // state.
        // But Grade has a factory method `register` which does logic.
        // It's better to use reflection to instantiate or a reconstruction constructor
        // if validation is to be skipped.
        // The `Grade` class has a private constructor that takes all fields except ID
        // and updatedAt.

        try {
            java.lang.reflect.Constructor<Grade> constructor = Grade.class.getDeclaredConstructor(Long.class,
                    Long.class, java.math.BigDecimal.class, java.time.Instant.class);
            constructor.setAccessible(true);
            Grade grade = constructor.newInstance(entity.getTaskId(), entity.getStudentId(), entity.getValue(),
                    entity.getCreatedAt());

            Field idField = Grade.class.getDeclaredField("id");
            idField.setAccessible(true);
            idField.set(grade, entity.getId());

            Field updatedAtField = Grade.class.getDeclaredField("updatedAt");
            updatedAtField.setAccessible(true);
            updatedAtField.set(grade, entity.getUpdatedAt());

            return grade;
        } catch (Exception e) {
            throw new RuntimeException("Failed to reconstruct Grade", e);
        }
    }
}
