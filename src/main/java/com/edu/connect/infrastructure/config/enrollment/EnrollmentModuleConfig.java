package com.edu.connect.infrastructure.config.enrollment;

import com.edu.connect.application.port.out.course.CourseRepositoryPort;
import com.edu.connect.application.port.out.enrollment.EnrollmentRepositoryPort;
import com.edu.connect.application.port.out.student.StudentRepositoryPort;
import com.edu.connect.application.service.enrollment.EnrollmentService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EnrollmentModuleConfig {

    @Bean
    public EnrollmentService enrollmentService(
            EnrollmentRepositoryPort enrollmentRepo,
            StudentRepositoryPort studentRepo,
            CourseRepositoryPort courseRepo
    ) {
        return new EnrollmentService(enrollmentRepo, studentRepo, courseRepo);
    }
}