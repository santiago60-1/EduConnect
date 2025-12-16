package com.edu.connect.infrastructure.config.course;

import com.edu.connect.application.port.out.course.CourseRepositoryPort;
import com.edu.connect.application.port.out.notification.EmailSenderPort;
import com.edu.connect.application.port.out.teacher.TeacherRepositoryPort;
import com.edu.connect.application.port.out.user.UserRepositoryPort;
import com.edu.connect.application.service.course.CourseService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CourseModuleConfig {

    @Bean
    public CourseService courseService(
            CourseRepositoryPort courseRepository,
            TeacherRepositoryPort teacherRepository,
            UserRepositoryPort userRepository,
            EmailSenderPort emailSender) {
        return new CourseService(courseRepository, teacherRepository, userRepository, emailSender);
    }
}
