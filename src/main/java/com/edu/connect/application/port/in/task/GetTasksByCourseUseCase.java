package com.edu.connect.application.port.in.task;

import com.edu.connect.domain.model.task.Task;

import java.util.List;

public interface GetTasksByCourseUseCase {
    List<Task> getTasksByCourse(Long courseId);
}
