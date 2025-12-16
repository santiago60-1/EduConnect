package com.edu.connect.domain.model.user;

import java.time.Instant;
import java.util.Objects;

public class User {
    private Long id;
    private String fullname;
    private String email;
    private String passwordHash;
    private UserRole role;
    private Long cityId;
    private Instant createdAt;
    private Instant updatedAt;

    public User() {
    }

    public User(Long id, String fullname, String email, String passwordHash, UserRole role, Long cityId,
            Instant createdAt, Instant updatedAt) {
        this.id = id;
        this.fullname = fullname;
        this.email = email;
        this.passwordHash = passwordHash;
        this.role = role;
        this.cityId = cityId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Factory helper for creation
    public static User createNew(String fullname, String email, String passwordHash, UserRole role, Long cityId) {
        Instant now = Instant.now();
        return new User(null, fullname, email, passwordHash, role, cityId, now, now);
    }

    // Getters / Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public Long getCityId() {
        return cityId;
    }

    public void setCityId(Long cityId) {
        this.cityId = cityId;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    // Convenient checks
    public boolean isAdmin() {
        return role == UserRole.ADMIN;
    }

    public boolean isTeacher() {
        return role == UserRole.TEACHER;
    }

    public boolean isStudent() {
        return role == UserRole.STUDENT;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;

        User user = (User) o;
        return Objects.equals(id, user.id) &&
                Objects.equals(email, user.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, email);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", fullname='" + fullname + '\'' +
                ", email='" + email + '\'' +
                ", role=" + role +
                '}';
    }
}