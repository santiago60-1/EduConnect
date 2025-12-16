package com.edu.connect.application.port.in.enrollment;

import com.edu.connect.domain.model.enrollment.Enrollment;

public interface EnrollWithCodeUseCase {
    Enrollment enrollWithCode(Long studentId, String courseCode);
}
