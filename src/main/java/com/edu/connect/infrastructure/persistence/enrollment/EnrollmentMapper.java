package com.edu.connect.infrastructure.persistence.enrollment;

import com.edu.connect.domain.model.enrollment.Enrollment;
import com.edu.connect.domain.model.enrollment.EnrollmentStatus;

public class EnrollmentMapper {

    public static Enrollment toDomain(JpaEnrollmentEntity entity) {
        Enrollment enrollment = Enrollment.enroll(
                entity.getStudentId(),
                entity.getCourseId()
        );
        enrollment.changeStatus(
                EnrollmentStatus.valueOf(entity.getStatus())
        );
        return enrollment;
    }

    public static JpaEnrollmentEntity toEntity(Enrollment enrollment) {
        return new JpaEnrollmentEntity(
                enrollment.getStudentId(),
                enrollment.getCourseId(),
                enrollment.getStatus().name(),
                enrollment.getEnrolledAt()
        );
    }
}
