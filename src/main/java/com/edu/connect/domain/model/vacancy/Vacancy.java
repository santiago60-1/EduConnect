package com.edu.connect.domain.model.vacancy;

import java.time.Instant;
import java.time.LocalDate;

public class Vacancy {

    private Long id;
    private String title;
    private String description;
    private String requirements;
    private String modality;
    private String location;
    private String pdfUrl;
    private final Long userId;
    private final LocalDate publishDate;
    private final Instant createdAt;
    private Instant updatedAt;

    private Vacancy(
            String title,
            String description,
            String requirements,
            String modality,
            String location,
            String pdfUrl,
            Long userId) {
        this.title = title;
        this.description = description;
        this.requirements = requirements;
        this.modality = modality;
        this.location = location;
        this.pdfUrl = pdfUrl;
        this.userId = userId;
        this.publishDate = LocalDate.now();
        this.createdAt = Instant.now();
    }

    public static Vacancy create(
            String title,
            String description,
            String requirements,
            String modality,
            String location,
            String pdfUrl,
            Long userId) {
        if (title == null || title.isBlank())
            throw new IllegalArgumentException("Title is required");

        return new Vacancy(
                title,
                description,
                requirements,
                modality,
                location,
                pdfUrl,
                userId);
    }

    public void update(
            String title,
            String description,
            String requirements,
            String modality,
            String location,
            String pdfUrl) {
        if (title == null || title.isBlank())
            throw new IllegalArgumentException("Title is required");

        this.title = title;
        this.description = description;
        this.requirements = requirements;
        this.modality = modality;
        this.location = location;
        this.pdfUrl = pdfUrl;
        this.updatedAt = Instant.now();
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getRequirements() {
        return requirements;
    }

    public String getModality() {
        return modality;
    }

    public String getLocation() {
        return location;
    }

    public String getPdfUrl() {
        return pdfUrl;
    }

    public Long getUserId() {
        return userId;
    }

    public LocalDate getPublishDate() {
        return publishDate;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    // Setter for ID (needed for persistence layer)
    public void setId(Long id) {
        this.id = id;
    }
}
