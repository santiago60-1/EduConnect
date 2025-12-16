package com.edu.connect.application.port.in.student;

import com.edu.connect.domain.model.student.StudentProfile;

import java.util.List;

public interface ListStudentsUseCase {
    List<StudentProfile> list();
}
