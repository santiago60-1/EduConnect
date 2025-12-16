package com.edu.connect.infrastructure.config.task;

import com.edu.connect.application.port.out.course.CourseRepositoryPort;
import com.edu.connect.application.port.out.task.TaskRepositoryPort;
import com.edu.connect.application.service.task.TaskService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TaskModuleConfig {

    @Bean
    public TaskService taskService(
            TaskRepositoryPort taskRepo,
            CourseRepositoryPort courseRepo) {
        return new TaskService(taskRepo, courseRepo);
    }
}
