package com.edu.connect.infrastructure.persistence.enrollment;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "enrollments", uniqueConstraints = {
                @UniqueConstraint(columnNames = { "student_id", "course_id" })
})
public class JpaEnrollmentEntity {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(name = "student_id", nullable = false)
        private Long studentId;

        @Column(name = "course_id", nullable = false)
        private Long courseId;

        @Column(nullable = false)
        private String status;

        @Column(name = "enrollment_date", nullable = false)
        private Instant enrolledAt;

        protected JpaEnrollmentEntity() {
        }

        public JpaEnrollmentEntity(
                        Long studentId,
                        Long courseId,
                        String status,
                        Instant enrolledAt) {
                this.studentId = studentId;
                this.courseId = courseId;
                this.status = status;
                this.enrolledAt = enrolledAt;
        }

        // Getters and Setters
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

        public String getStatus() {
                return status;
        }

        public void setStatus(String status) {
                this.status = status;
        }

        public Instant getEnrolledAt() {
                return enrolledAt;
        }

        public void setEnrolledAt(Instant enrolledAt) {
                this.enrolledAt = enrolledAt;
        }
}
