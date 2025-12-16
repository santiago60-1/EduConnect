package com.edu.connect.application.port.in.teacher;

import com.edu.connect.domain.model.teacher.TeacherProfile;

public interface CreateTeacherUseCase {
    TeacherProfile create(Long userId, String department, String academicTitle);
}
