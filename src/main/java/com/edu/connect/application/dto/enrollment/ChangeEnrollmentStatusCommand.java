package com.edu.connect.application.dto.enrollment;

import com.edu.connect.domain.model.enrollment.EnrollmentStatus;

public record ChangeEnrollmentStatusCommand(
        Long enrollmentId,
        EnrollmentStatus status
) {}
