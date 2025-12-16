package com.edu.connect.application.port.in.student;

import com.edu.connect.domain.model.student.StudentProfile;

public interface GetStudentUseCase {
    StudentProfile getById(Long id);
}
