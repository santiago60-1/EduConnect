package com.edu.connect.infrastructure.config.teacher;

import com.edu.connect.application.port.out.teacher.TeacherRepositoryPort;
import com.edu.connect.application.service.teacher.TeacherService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TeacherModuleConfig {

    @Bean
    public TeacherService teacherService(TeacherRepositoryPort repository) {
        return new TeacherService(repository);
    }
}
