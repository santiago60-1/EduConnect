package com.edu.connect.application.port.in.enrollment;

import com.edu.connect.application.dto.enrollment.ChangeEnrollmentStatusCommand;
import com.edu.connect.domain.model.enrollment.Enrollment;

public interface ChangeEnrollmentStatusUseCase {
    Enrollment changeStatus(ChangeEnrollmentStatusCommand command);
}