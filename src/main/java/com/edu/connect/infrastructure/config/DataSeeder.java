package com.edu.connect.infrastructure.config;

import com.edu.connect.domain.model.student.StudentProfile;
import com.edu.connect.domain.model.teacher.TeacherProfile;
import com.edu.connect.domain.model.user.UserRole;
import com.edu.connect.infrastructure.persistence.course.CourseRepositoryAdapter;
import com.edu.connect.infrastructure.persistence.student.StudentRepositoryAdapter;
import com.edu.connect.infrastructure.persistence.teacher.TeacherRepositoryAdapter;
import com.edu.connect.infrastructure.persistence.user.UserRepositoryAdapter;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepositoryAdapter userRepository;
    private final TeacherRepositoryAdapter teacherRepository;
    private final StudentRepositoryAdapter studentRepository;
    private final CourseRepositoryAdapter courseRepository;
    private final com.edu.connect.application.port.out.user.PasswordEncoderPort passwordEncoder;

    public DataSeeder(
            UserRepositoryAdapter userRepository,
            TeacherRepositoryAdapter teacherRepository,
            StudentRepositoryAdapter studentRepository,
            CourseRepositoryAdapter courseRepository,
            com.edu.connect.application.port.out.user.PasswordEncoderPort passwordEncoder) {
        this.userRepository = userRepository;
        this.teacherRepository = teacherRepository;
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Create Admin user
        if (userRepository.findByEmail("admin@edu.connect").isEmpty()) {
            String encoded = passwordEncoder.encode("admin123");
            com.edu.connect.domain.model.user.User admin = com.edu.connect.domain.model.user.User.createNew(
                    "Admin User",
                    "admin@edu.connect",
                    encoded,
                    UserRole.ADMIN,
                    null);

            userRepository.save(admin);
            System.out.println("✓ Default admin user created: admin@edu.connect / admin123");
        }

        // Create Teacher user
        if (userRepository.findByEmail("santiago59782@gmail.com").isEmpty()) {
            String encoded = passwordEncoder.encode("teacher123");
            com.edu.connect.domain.model.user.User teacher = com.edu.connect.domain.model.user.User.createNew(
                    "María González",
                    "santiago59782@gmail.com",
                    encoded,
                    UserRole.TEACHER,
                    null);

            com.edu.connect.domain.model.user.User savedTeacher = userRepository.save(teacher);
            
            // Create teacher profile
            TeacherProfile teacherProfile = TeacherProfile.createNew(
                    savedTeacher.getId(),
                    "Computer Science",
                    "PhD in Software Engineering");
            teacherRepository.save(teacherProfile);
            
            System.out.println("✓ Default teacher user created: santiago59782@gmail.com / teacher123");
        }

        // Create Student user
        if (userRepository.findByEmail("student@edu.connect").isEmpty()) {
            String encoded = passwordEncoder.encode("student123");
            com.edu.connect.domain.model.user.User student = com.edu.connect.domain.model.user.User.createNew(
                    "Carlos Ramírez",
                    "student@edu.connect",
                    encoded,
                    UserRole.STUDENT,
                    null);

            com.edu.connect.domain.model.user.User savedStudent = userRepository.save(student);
            
            // Create student profile
            StudentProfile studentProfile = StudentProfile.createNew(
                    savedStudent.getId(),
                    "Computer Science",
                    5);
            studentRepository.save(studentProfile);
            
            System.out.println("✓ Default student user created: student@edu.connect / student123");
        }
        
        // Create default course for testing enrollments
        com.edu.connect.domain.model.teacher.TeacherProfile teacherProfile = teacherRepository.findByUserId(2L);
        if (teacherProfile != null) {
            // Check if course already exists
            boolean courseExists = courseRepository.findByCode("TEST01").isPresent();
            
            if (!courseExists) {
                com.edu.connect.domain.model.Course.Course course = 
                    com.edu.connect.domain.model.Course.Course.createNew(
                        "TEST01",
                        "Introduction to Programming",
                        4,
                        teacherProfile.getId()
                    );
                courseRepository.save(course);
                
                System.out.println("✓ Default test course created");
                System.out.println("  Course: Introduction to Programming");
                System.out.println("  Code: TEST01");
                System.out.println("  Credits: 4");
            }
        }
        
        System.out.println("\n========================================");
        System.out.println("   EduConnect - Test Users Ready");
        System.out.println("========================================");
        System.out.println("Admin:   admin@edu.connect / admin123");
        System.out.println("Teacher: santiago59782@gmail.com / teacher123");
        System.out.println("Student: student@edu.connect / student123");
        System.out.println("========================================");
        System.out.println("\n📚 Test Course Available:");
        System.out.println("   Name: Introduction to Programming");
        System.out.println("   Code: TEST01  ← Use this to enroll!");
        System.out.println("========================================\n");
    }
}
