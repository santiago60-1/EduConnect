package com.edu.connect.application.port.in.enrollment;

import com.edu.connect.domain.model.enrollment.Enrollment;

public interface EnrollStudentUseCase {
    Enrollment enroll(Long studentId, Long courseId);
}