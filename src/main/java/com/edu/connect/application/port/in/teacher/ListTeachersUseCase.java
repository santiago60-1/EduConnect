package com.edu.connect.application.port.in.teacher;

import java.util.List;

import com.edu.connect.domain.model.teacher.TeacherProfile;

public interface ListTeachersUseCase {
    List<TeacherProfile> list();
}
