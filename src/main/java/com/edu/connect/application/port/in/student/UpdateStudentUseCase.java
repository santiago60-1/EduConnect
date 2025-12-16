package com.edu.connect.application.port.in.student;

import com.edu.connect.application.dto.student.UpdateStudentCommand;
import com.edu.connect.domain.model.student.StudentProfile;

public interface UpdateStudentUseCase {
    StudentProfile update(UpdateStudentCommand command);


}
