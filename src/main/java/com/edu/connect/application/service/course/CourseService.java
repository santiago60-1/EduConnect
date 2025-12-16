package com.edu.connect.application.service.course;

import com.edu.connect.application.dto.course.CreateCourseCommand;
import com.edu.connect.application.dto.course.UpdateCourseCommand;
import com.edu.connect.application.port.in.course.CreateCourseUseCase;
import com.edu.connect.application.port.in.course.DeleteCourseUseCase;
import com.edu.connect.application.port.in.course.GetTeacherCoursesUseCase;
import com.edu.connect.application.port.in.course.UpdateCourseUseCase;
import com.edu.connect.application.port.out.course.CourseRepositoryPort;
import com.edu.connect.application.port.out.notification.EmailSenderPort;
import com.edu.connect.application.port.out.teacher.TeacherRepositoryPort;
import com.edu.connect.application.port.out.user.UserRepositoryPort;
import com.edu.connect.domain.model.Course.Course;
import jakarta.transaction.Transactional;

import java.security.SecureRandom;
import java.util.List;

public class CourseService implements
        CreateCourseUseCase,
        UpdateCourseUseCase,
        DeleteCourseUseCase,
        GetTeacherCoursesUseCase {

    private final CourseRepositoryPort courseRepository;
    private final TeacherRepositoryPort teacherRepository;
    private final UserRepositoryPort userRepository;
    private final EmailSenderPort emailSender;

    public CourseService(
            CourseRepositoryPort courseRepository,
            TeacherRepositoryPort teacherRepository,
            UserRepositoryPort userRepository,
            EmailSenderPort emailSender
    ) {
        this.courseRepository = courseRepository;
        this.teacherRepository = teacherRepository;
        this.userRepository = userRepository;
        this.emailSender = emailSender;
    }

    @Override
    @Transactional
    public Course create(CreateCourseCommand command) {
        var teacher = teacherRepository.findByUserId(command.teacherUserId());
        if (teacher == null) {
            throw new RuntimeException("Teacher not found");
        }

        var user = userRepository.findById(command.teacherUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.isTeacher()) {
            throw new RuntimeException("User is not a teacher");
        }

        // Generate 6-character code
        String code = generateCourseCode();

        Course course = Course.createNew(
                code,
                command.name(),
                command.credits(),
                teacher.getId()
        );

        Course savedCourse = courseRepository.save(course);

        // Send email to teacher with the generated code
        String htmlBody = """
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                    <h2 style="color: #2c3e50; text-align: center;">Course Created Successfully!</h2>
                    <p style="color: #555;">Hello %s,</p>
                    <p style="color: #555;">Your course has been created successfully in EduConnect.</p>
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p style="margin: 5px 0;"><strong>Course Name:</strong> <span style="color: #3498db;">%s</span></p>
                        <p style="margin: 5px 0;"><strong>Course Code:</strong> <span style="font-family: monospace; font-size: 1.5em; background-color: #eee; padding: 5px 10px; border-radius: 3px; color: #e74c3c;">%s</span></p>
                        <p style="margin: 5px 0;"><strong>Credits:</strong> %d</p>
                    </div>
                    <p style="color: #777; font-size: 0.9em;">Students will use this code to enroll in your course.</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                    <p style="color: #999; font-size: 0.8em; text-align: center;">&copy; 2025 EduConnect. All rights reserved.</p>
                </div>
                """
                .formatted(user.getFullname(), savedCourse.getName(), savedCourse.getCode(), savedCourse.getCredits());

        emailSender.sendEmail(
                user.getEmail(),
                "Course Created - " + savedCourse.getName(),
                htmlBody
        );

        return savedCourse;
    }

    @Override
    @Transactional
    public Course update(UpdateCourseCommand command) {
        Course course = courseRepository.findById(command.courseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        course.update(command.name(), command.credits());

        return courseRepository.save(course);
    }

    @Override
    @Transactional
    public void delete(Long courseId) {
        courseRepository.deleteById(courseId);
    }

    @Override
    public List<Course> getMyCourses(Long teacherUserId) {
        var teacher = teacherRepository.findByUserId(teacherUserId);
        if (teacher == null) {
            throw new RuntimeException("Teacher not found");
        }

        return courseRepository.findByTeacherId(teacher.getId());
    }

    private String generateCourseCode() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        SecureRandom random = new SecureRandom();
        StringBuilder code = new StringBuilder(6);
        for (int i = 0; i < 6; i++) {
            code.append(chars.charAt(random.nextInt(chars.length())));
        }
        return code.toString();
    }
}
