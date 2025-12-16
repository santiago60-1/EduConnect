package com.edu.connect.application.port.in.course;

import com.edu.connect.application.dto.course.CreateCourseCommand;
import com.edu.connect.domain.model.Course.Course;

public interface CreateCourseUseCase {
    Course create(CreateCourseCommand command);
}