package com.edu.connect.application.port.out.enrollment;
import com.edu.connect.domain.model.enrollment.Enrollment;

import java.util.List;
import java.util.Optional;

public interface EnrollmentRepositoryPort {

    Enrollment save(Enrollment enrollment);

    Optional<Enrollment> findById(Long id);

    boolean existsByStudentAndCourse(Long studentId, Long courseId);

    List<Enrollment> findByCourseId(Long courseId);

    List<Enrollment> findByStudentId(Long studentId);
}