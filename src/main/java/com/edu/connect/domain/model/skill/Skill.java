package com.edu.connect.domain.model.skill;

import java.time.Instant;

public class Skill {

    private Long id;
    private String name;
    private final Instant createdAt;

    private Skill(String name) {
        if (name == null || name.isBlank())
            throw new IllegalArgumentException("Skill name required");
        this.name = name;
        this.createdAt = Instant.now();
    }

    public static Skill create(String name) {
        return new Skill(name);
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    // Setter for ID (needed for persistence layer)
    public void setId(Long id) {
        this.id = id;
    }
}
