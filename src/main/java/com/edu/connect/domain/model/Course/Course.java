package com.edu.connect.domain.model.Course;

import java.time.Instant;
import java.util.Objects;

public class Course {

    private Long id;
    private String code;
    private String name;
    private Integer credits;
    private Long teacherId;
    private Instant createdAt;
    private Instant updatedAt;

    private Course(String code, String name, Integer credits, Long teacherId) {
        this.code = code;
        this.name = name;
        this.credits = credits;
        this.teacherId = teacherId;
        Instant now = Instant.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    public static Course createNew(
            String code,
            String name,
            Integer credits,
            Long teacherId
    ) {
        return new Course(code, name, credits, teacherId);
    }

    public void update(String name, Integer credits) {
        if (name != null) this.name = name;
        if (credits != null) this.credits = credits;
        this.updatedAt = Instant.now();
    }

    // Getters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

    public Integer getCredits() {
        return credits;
    }

    public Long getTeacherId() {
        return teacherId;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Course)) return false;
        Course course = (Course) o;
        return Objects.equals(id, course.id) && Objects.equals(code, course.code);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, code);
    }

    @Override
    public String toString() {
        return "Course{" +
                "id=" + id +
                ", code='" + code + '\'' +
                ", name='" + name + '\'' +
                ", credits=" + credits +
                ", teacherId=" + teacherId +
                '}';
    }
}
