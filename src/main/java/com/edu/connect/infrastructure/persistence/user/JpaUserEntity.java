package com.edu.connect.infrastructure.persistence.user;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class JpaUserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullname;
    private Long cityId;

    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private com.edu.connect.domain.model.user.UserRole role;

    @Enumerated(EnumType.STRING)
    private com.edu.connect.domain.model.user.UserStatus status;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Getters & Setters
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

    public Long getCityId() {
        return cityId;
    }

    public void setCityId(Long cityId) {
        this.cityId = cityId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public com.edu.connect.domain.model.user.UserRole getRole() {
        return role;
    }

    public void setRole(com.edu.connect.domain.model.user.UserRole role) {
        this.role = role;
    }

    public com.edu.connect.domain.model.user.UserStatus getStatus() {
        return status;
    }

    public void setStatus(com.edu.connect.domain.model.user.UserStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
