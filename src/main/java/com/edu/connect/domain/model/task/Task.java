package com.edu.connect.domain.model.task;

import java.time.Instant;
import java.time.LocalDate;

public class Task {

    private Long id;
    private final Long courseId;
    private String title;
    private String description;
    private LocalDate dueDate;
    private final Instant createdAt;
    private Instant updatedAt;

    private Task(
            Long courseId,
            String title,
            String description,
            LocalDate dueDate,
            Instant createdAt
    ) {
        this.courseId = courseId;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.createdAt = createdAt;
    }

    // FACTORY METHOD
    public static Task create(
            Long courseId,
            String title,
            String description,
            LocalDate dueDate
    ) {
        if (dueDate != null && dueDate.isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Due date cannot be in the past");
        }

        return new Task(
                courseId,
                title,
                description,
                dueDate,
                Instant.now()
        );
    }

    // BEHAVIOR
    public void update(String title, String description, LocalDate dueDate) {
        if (dueDate != null && dueDate.isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Due date cannot be in the past");
        }

        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.updatedAt = Instant.now();
    }

    // Getters
    public Long getId() { return id; }
    public Long getCourseId() { return courseId; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public LocalDate getDueDate() { return dueDate; }
    public Instant getCreatedAt() { return createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
    
    // Package-private setter for reconstruction (used only by infrastructure)
    void setId(Long id) { this.id = id; }
    void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
