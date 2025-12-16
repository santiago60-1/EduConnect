package com.edu.connect.infrastructure.config.student;

import com.edu.connect.application.port.out.student.StudentRepositoryPort;
import com.edu.connect.application.port.out.user.UserRepositoryPort;
import com.edu.connect.application.service.student.StudentService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StudentModuleConfig {

    @Bean
    public StudentService studentService(
            StudentRepositoryPort studentRepository,
            UserRepositoryPort userRepository) {
        return new StudentService(studentRepository, userRepository);
    }
}
