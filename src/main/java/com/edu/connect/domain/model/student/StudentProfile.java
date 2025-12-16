package com.edu.connect.domain.model.student;

import java.time.Instant;
import java.util.Objects;

/**
 * Lightweight student profile tied to a User (1:1).
 */
public class StudentProfile {
    private Long id;
    private Long userId;
    private String program;
    private Integer cycle;
    private Instant createdAt;
    private Instant updatedAt;

    public StudentProfile() {}

    public StudentProfile(Long id, Long userId, String program, Integer cycle, Instant createdAt, Instant updatedAt) {
        this.id = id;
        this.userId = userId;
        this.program = program;
        this.cycle = cycle;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static StudentProfile createNew(Long userId, String program, Integer cycle) {
        Instant now = Instant.now();
        return new StudentProfile(null, userId, program, cycle, now, now);
    }

    // getters/setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getProgram() { return program; }
    public void setProgram(String program) { this.program = program; }

    public Integer getCycle() { return cycle; }
    public void setCycle(Integer cycle) { this.cycle = cycle; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof StudentProfile)) return false;
        StudentProfile that = (StudentProfile) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() { return Objects.hash(id); }
}
