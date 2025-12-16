package com.edu.connect.application.port.in.student;

import com.edu.connect.application.dto.student.CreateStudentCommand;
import com.edu.connect.domain.model.student.StudentProfile;

public interface CreateStudentUseCase {

    StudentProfile create(CreateStudentCommand command);
}
