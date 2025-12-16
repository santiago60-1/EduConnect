package com.edu.connect.application.service.enrollment;

import com.edu.connect.application.port.in.enrollment.*;
import com.edu.connect.application.port.out.enrollment.EnrollmentRepositoryPort;
import com.edu.connect.application.port.out.course.CourseRepositoryPort;
import com.edu.connect.application.port.out.student.StudentRepositoryPort;
import com.edu.connect.application.dto.enrollment.ChangeEnrollmentStatusCommand;
import com.edu.connect.domain.exception.EnrollmentAlreadyExistsException;
import com.edu.connect.domain.model.Course.Course;
import com.edu.connect.domain.model.enrollment.*;
import jakarta.transaction.Transactional;

import java.util.List;

public class EnrollmentService
        implements EnrollStudentUseCase,
        EnrollWithCodeUseCase,
        ChangeEnrollmentStatusUseCase,
        GetStudentEnrollmentsUseCase,
        GetCourseEnrollmentsUseCase {

    private final EnrollmentRepositoryPort enrollmentRepo;
    private final StudentRepositoryPort studentRepo;
    private final CourseRepositoryPort courseRepo;

    public EnrollmentService(
            EnrollmentRepositoryPort enrollmentRepo,
            StudentRepositoryPort studentRepo,
            CourseRepositoryPort courseRepo
    ) {
        this.enrollmentRepo = enrollmentRepo;
        this.studentRepo = studentRepo;
        this.courseRepo = courseRepo;
    }

    @Override
    @Transactional
    public Enrollment enroll(Long studentId, Long courseId) {
        // Validate student exists
        if (!studentRepo.existsById(studentId))
            throw new IllegalArgumentException("Student not found with ID: " + studentId);

        // Validate course exists
        if (!courseRepo.existsById(courseId))
            throw new IllegalArgumentException("Course not found with ID: " + courseId);

        // Check if already enrolled
        if (enrollmentRepo.existsByStudentAndCourse(studentId, courseId))
            throw new EnrollmentAlreadyExistsException();

        Enrollment enrollment = Enrollment.enroll(studentId, courseId);
        return enrollmentRepo.save(enrollment);
    }

    @Override
    @Transactional
    public Enrollment enrollWithCode(Long studentId, String courseCode) {
        // Validate student exists
        if (!studentRepo.existsById(studentId))
            throw new IllegalArgumentException("Student not found with ID: " + studentId);

        // Find course by code
        Course course = courseRepo.findByCode(courseCode)
                .orElseThrow(() -> new IllegalArgumentException("Course not found with code: " + courseCode));

        // Check if already enrolled
        if (enrollmentRepo.existsByStudentAndCourse(studentId, course.getId()))
            throw new EnrollmentAlreadyExistsException();

        Enrollment enrollment = Enrollment.enroll(studentId, course.getId());
        return enrollmentRepo.save(enrollment);
    }

    @Override
    @Transactional
    public Enrollment changeStatus(ChangeEnrollmentStatusCommand command) {
        Enrollment enrollment = enrollmentRepo.findById(command.enrollmentId())
                .orElseThrow(() -> new IllegalArgumentException("Enrollment not found with ID: " + command.enrollmentId()));

        enrollment.changeStatus(command.status());
        return enrollmentRepo.save(enrollment);
    }

    @Override
    public List<Enrollment> getStudentEnrollments(Long studentId) {
        if (!studentRepo.existsById(studentId))
            throw new IllegalArgumentException("Student not found with ID: " + studentId);
        
        return enrollmentRepo.findByStudentId(studentId);
    }

    @Override
    public List<Enrollment> getCourseEnrollments(Long courseId) {
        if (!courseRepo.existsById(courseId))
            throw new IllegalArgumentException("Course not found with ID: " + courseId);
        
        return enrollmentRepo.findByCourseId(courseId);
    }
}
