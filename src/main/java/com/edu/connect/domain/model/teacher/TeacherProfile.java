package com.edu.connect.domain.model.teacher;

import java.time.Instant;
import java.util.Objects;

/**
 * Lightweight teacher profile tied to a User (1:1).
 */
public class TeacherProfile {
    private Long id;
    private Long userId;       // FK to User aggregate
    private String department;
    private String academicTitle;
    private Instant createdAt;
    private Instant updatedAt;

    public TeacherProfile() {}

    public TeacherProfile(Long id, Long userId, String department, String academicTitle, Instant createdAt, Instant updatedAt) {
        this.id = id;
        this.userId = userId;
        this.department = department;
        this.academicTitle = academicTitle;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static TeacherProfile createNew(Long userId, String department, String academicTitle) {
        Instant now = Instant.now();
        return new TeacherProfile(null, userId, department, academicTitle, now, now);
    }

    // getters/setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getAcademicTitle() { return academicTitle; }
    public void setAcademicTitle(String academicTitle) { this.academicTitle = academicTitle; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TeacherProfile)) return false;
        TeacherProfile that = (TeacherProfile) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() { return Objects.hash(id); }
}