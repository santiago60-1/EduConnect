package com.edu.connect.application.port.in.course;

import com.edu.connect.domain.model.Course.Course;

import java.util.List;

public interface GetTeacherCoursesUseCase {
    List<Course> getMyCourses(Long teacherUserId);
}
