package com.edu.connect.application.port.in.course;

import com.edu.connect.application.dto.course.UpdateCourseCommand;
import com.edu.connect.domain.model.Course.Course;

public interface UpdateCourseUseCase {
    Course update(UpdateCourseCommand command);
}
