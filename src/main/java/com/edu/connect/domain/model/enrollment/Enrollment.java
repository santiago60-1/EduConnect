package com.edu.connect.domain.model.enrollment;

import java.time.Instant;

public class Enrollment {

    private Long id;
    private Long studentId;
    private Long courseId;
    private EnrollmentStatus status;
    private Instant enrolledAt;

    private Enrollment(
            Long studentId,
            Long courseId,
            EnrollmentStatus status,
            Instant enrolledAt
    ) {
        this.studentId = studentId;
        this.courseId = courseId;
        this.status = status;
        this.enrolledAt = enrolledAt;
    }

    public static Enrollment enroll(
            Long studentId,
            Long courseId
    ) {
        return new Enrollment(
                studentId,
                courseId,
                EnrollmentStatus.ENROLLED,
                Instant.now()
        );
    }

    public void changeStatus(EnrollmentStatus newStatus) {
        this.status = newStatus;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public EnrollmentStatus getStatus() {
        return status;
    }

    public void setStatus(EnrollmentStatus status) {
        this.status = status;
    }

    public Instant getEnrolledAt() {
        return enrolledAt;
    }

    public void setEnrolledAt(Instant enrolledAt) {
        this.enrolledAt = enrolledAt;
    }
}
