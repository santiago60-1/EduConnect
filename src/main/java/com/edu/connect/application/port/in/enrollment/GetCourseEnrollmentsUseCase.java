package com.edu.connect.application.port.in.enrollment;

import com.edu.connect.domain.model.enrollment.Enrollment;

import java.util.List;

public interface GetCourseEnrollmentsUseCase {
    List<Enrollment> getCourseEnrollments(Long courseId);
}
