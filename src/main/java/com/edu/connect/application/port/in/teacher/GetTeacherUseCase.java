package com.edu.connect.application.port.in.teacher;

import com.edu.connect.domain.model.teacher.TeacherProfile;

public interface GetTeacherUseCase {
    TeacherProfile getById(Long id);
}
