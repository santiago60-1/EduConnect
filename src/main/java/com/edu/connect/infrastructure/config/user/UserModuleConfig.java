package com.edu.connect.infrastructure.config.user;

import com.edu.connect.application.service.user.AuthService;
import com.edu.connect.application.service.user.UserService;
import com.edu.connect.domain.shared.TimeProviderPort;
import com.edu.connect.application.port.out.student.StudentRepositoryPort;
import com.edu.connect.application.port.out.teacher.TeacherRepositoryPort;
import com.edu.connect.application.port.out.user.PasswordEncoderPort;
import com.edu.connect.application.port.out.user.UserRepositoryPort;
import com.edu.connect.infrastructure.security.JwtProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UserModuleConfig {

    @Bean
    public UserService userService(
            UserRepositoryPort userRepository,
            PasswordEncoderPort encoder,
            TimeProviderPort timeProvider,
            TeacherRepositoryPort teacherRepo,
            StudentRepositoryPort studentRepo,
            com.edu.connect.application.port.out.notification.EmailSenderPort emailSender) {
        return new UserService(userRepository, encoder, timeProvider, teacherRepo, studentRepo, emailSender);
    }

    @Bean
    public AuthService authService(
            UserRepositoryPort repo,
            PasswordEncoderPort encoder,
            JwtProvider jwtProvider) {
        return new AuthService(repo, encoder, jwtProvider);
    }

    @Bean
    public org.springframework.web.client.RestTemplate restTemplate() {
        return new org.springframework.web.client.RestTemplate();
    }

    @Bean
    public com.edu.connect.application.port.out.notification.EmailSenderPort emailSender(
            org.springframework.web.client.RestTemplate restTemplate,
            @org.springframework.beans.factory.annotation.Value("${email.script.url}") String scriptUrl) {
        return new com.edu.connect.infrastructure.notification.AppsScriptEmailSenderAdapter(restTemplate, scriptUrl);
    }

    @Bean
    public TimeProviderPort timeProvider() {
        return java.time.LocalDateTime::now;
    }
}
