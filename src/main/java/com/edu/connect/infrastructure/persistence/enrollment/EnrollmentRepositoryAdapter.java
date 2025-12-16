package com.edu.connect.infrastructure.persistence.enrollment;

import com.edu.connect.application.port.out.enrollment.EnrollmentRepositoryPort;
import com.edu.connect.domain.model.enrollment.Enrollment;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class EnrollmentRepositoryAdapter
        implements EnrollmentRepositoryPort {

    private final JpaEnrollmentRepository repository;

    public EnrollmentRepositoryAdapter(JpaEnrollmentRepository repository) {
        this.repository = repository;
    }

    @Override
    public Enrollment save(Enrollment enrollment) {
        JpaEnrollmentEntity entity =
                EnrollmentMapper.toEntity(enrollment);
        JpaEnrollmentEntity saved = repository.save(entity);
        return EnrollmentMapper.toDomain(saved);
    }

    @Override
    public Optional<Enrollment> findById(Long id) {
        return repository.findById(id)
                .map(EnrollmentMapper::toDomain);
    }

    @Override
    public boolean existsByStudentAndCourse(Long studentId, Long courseId) {
        return repository.existsByStudentIdAndCourseId(studentId, courseId);
    }

    @Override
    public List<Enrollment> findByCourseId(Long courseId) {
        return repository.findByCourseId(courseId)
                .stream()
                .map(EnrollmentMapper::toDomain)
                .toList();
    }

    @Override
    public List<Enrollment> findByStudentId(Long studentId) {
        return repository.findByStudentId(studentId)
                .stream()
                .map(EnrollmentMapper::toDomain)
                .toList();
    }
}