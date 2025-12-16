package com.edu.connect.application.service.user;

import com.edu.connect.application.dto.user.RegisterUserCommand;
import com.edu.connect.application.dto.user.UpdateUserCommand;
import com.edu.connect.application.port.in.user.GetUserUseCase;
import com.edu.connect.application.port.in.user.RegisterUserUseCase;
import com.edu.connect.application.port.in.user.UpdateUserUseCase;
import com.edu.connect.application.port.out.student.StudentRepositoryPort;
import com.edu.connect.application.port.out.teacher.TeacherRepositoryPort;
import com.edu.connect.application.port.out.user.PasswordEncoderPort;
import com.edu.connect.application.port.out.user.UserRepositoryPort;
import com.edu.connect.domain.model.user.User;
import com.edu.connect.domain.model.teacher.TeacherProfile;
import com.edu.connect.domain.model.student.StudentProfile;
import com.edu.connect.domain.shared.TimeProviderPort;

import jakarta.transaction.Transactional;

import java.time.Instant;

public class UserService implements
        RegisterUserUseCase,
        UpdateUserUseCase,
        GetUserUseCase {

    private final UserRepositoryPort userRepository;
    private final PasswordEncoderPort passwordEncoder;
    private final TimeProviderPort timeProvider;
    private final TeacherRepositoryPort teacherRepository;
    private final StudentRepositoryPort studentRepository;
    private final com.edu.connect.application.port.out.notification.EmailSenderPort emailSender;

    public UserService(
            UserRepositoryPort userRepository,
            PasswordEncoderPort passwordEncoder,
            TimeProviderPort timeProvider,
            TeacherRepositoryPort teacherRepository,
            StudentRepositoryPort studentRepository,
            com.edu.connect.application.port.out.notification.EmailSenderPort emailSender) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.timeProvider = timeProvider;
        this.teacherRepository = teacherRepository;
        this.studentRepository = studentRepository;
        this.emailSender = emailSender;
    }

    @Override
    @Transactional
    public User register(RegisterUserCommand command) {

        if (command.fullname() == null || command.fullname().isBlank()) {
            throw new IllegalArgumentException("Fullname is required");
        }
        if (command.cityId() == null) {
            throw new IllegalArgumentException("CityId is required");
        }

        String rawPassword = generateRandomPassword();

        String encoded = passwordEncoder.encode(rawPassword);

        User user = User.createNew(
                command.fullname(),
                command.email(),
                encoded,
                command.role(),
                command.cityId());

        // Manually set time using provider to ensure testability/consistency if needed,
        // though User factory uses Instant.now(). Consider overriding if domain allows
        // or rely on factory.
        // For now, factory handles creation time.

        User savedUser = userRepository.save(user);

        // Create profile based on role
        if (savedUser.isTeacher()) {
            TeacherProfile teacher = TeacherProfile.createNew(
                    savedUser.getId(),
                    "Department Placeholder",
                    "Title Placeholder");
            teacherRepository.save(teacher);
        } else if (savedUser.isStudent()) {
            StudentProfile student = StudentProfile.createNew(
                    savedUser.getId(),
                    "Program Placeholder",
                    1);
            studentRepository.save(student);
        }

        String roleDisplay = savedUser.getRole().name();
        String htmlBody = """
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                    <h2 style="color: #2c3e50; text-align: center;">Welcome to EduConnect!</h2>
                    <p style="color: #555;">Hello,</p>
                    <p style="color: #555;">Your account has been successfully created.</p>
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p style="margin: 5px 0;"><strong>Role:</strong> <span style="color: #3498db;">%s</span></p>
                        <p style="margin: 5px 0;"><strong>Password:</strong> <span style="font-family: monospace; font-size: 1.2em; background-color: #eee; padding: 2px 5px; border-radius: 3px;">%s</span></p>
                    </div>
                    <p style="color: #777; font-size: 0.9em;">Please change your password after your first login.</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                    <p style="color: #999; font-size: 0.8em; text-align: center;">&copy; 2025 EduConnect. All rights reserved.</p>
                </div>
                """
                .formatted(roleDisplay, rawPassword);

        emailSender.sendEmail(savedUser.getEmail(), "Welcome to EduConnect - Account Details", htmlBody);

        return savedUser;

    }

    @Override
    public User update(UpdateUserCommand command) {
        User existing = userRepository.findById(command.id())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (command.email() != null)
            existing.setEmail(command.email());
        if (command.password() != null)
            existing.setPasswordHash(passwordEncoder.encode(command.password()));

        existing.setUpdatedAt(Instant.now());

        return userRepository.save(existing);
    }

    @Override
    public User getById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private String generateRandomPassword() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
        java.security.SecureRandom random = new java.security.SecureRandom();
        StringBuilder sb = new StringBuilder(12);
        for (int i = 0; i < 12; i++) {
            sb.append(chars.charAt(random.nextInt(chars.length())));
        }
        return sb.toString();
    }
}