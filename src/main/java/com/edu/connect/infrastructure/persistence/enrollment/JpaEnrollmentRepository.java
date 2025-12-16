package com.edu.connect.infrastructure.persistence.enrollment;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JpaEnrollmentRepository
        extends JpaRepository<JpaEnrollmentEntity, Long> {

    boolean existsByStudentIdAndCourseId(Long studentId, Long courseId);

    List<JpaEnrollmentEntity> findByCourseId(Long courseId);

    List<JpaEnrollmentEntity> findByStudentId(Long studentId);
}
