package com.edu.connect.infrastructure.config.grade;

import com.edu.connect.application.port.out.grade.GradeRepositoryPort;
import com.edu.connect.application.port.out.student.StudentRepositoryPort;
import com.edu.connect.application.port.out.task.TaskRepositoryPort;
import com.edu.connect.application.service.grade.GradeService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GradeModuleConfig {

    @Bean
    public GradeService gradeService(
            GradeRepositoryPort gradeRepo,
            StudentRepositoryPort studentRepo,
            TaskRepositoryPort taskRepo) {
        return new GradeService(gradeRepo, studentRepo, taskRepo);
    }
}
