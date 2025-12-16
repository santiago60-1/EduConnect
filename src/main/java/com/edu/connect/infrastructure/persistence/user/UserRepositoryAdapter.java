package com.edu.connect.infrastructure.persistence.user;

import com.edu.connect.application.port.out.user.UserRepositoryPort;
import com.edu.connect.domain.model.user.User;
import com.edu.connect.domain.model.user.UserRole;
import com.edu.connect.domain.model.user.UserStatus;
import org.springframework.stereotype.Component;
import java.util.Optional;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Component
public class UserRepositoryAdapter implements UserRepositoryPort {

    private final JpaUserRepository repo;

    public UserRepositoryAdapter(JpaUserRepository repo) {
        this.repo = repo;
    }

    @Override
    public User save(User user) {
        JpaUserEntity entity = new JpaUserEntity();

        if (user.getId() != null)
            entity.setId(user.getId());

        entity.setFullname(user.getFullname());
        entity.setEmail(user.getEmail());
        entity.setPassword(user.getPasswordHash());
        entity.setRole(user.getRole());
        entity.setCityId(user.getCityId());
        // entity.setStatus(user.getStatus()); // status not part of domain User

        if (user.getCreatedAt() != null)
            entity.setCreatedAt(LocalDateTime.ofInstant(user.getCreatedAt(), ZoneOffset.UTC));
        if (user.getUpdatedAt() != null)
            entity.setUpdatedAt(LocalDateTime.ofInstant(user.getUpdatedAt(), ZoneOffset.UTC));

        JpaUserEntity saved = repo.save(entity);

        user.setId(saved.getId());
        return user;
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return repo.findByEmail(email)
                .map(this::mapToDomain);
    }

    @Override
    public Optional<User> findById(Long id) {
        return repo.findById(id)
                .map(this::mapToDomain);
    }

    private User mapToDomain(JpaUserEntity e) {
        return new User(
                e.getId(),
                e.getFullname(),
                e.getEmail(),
                e.getPassword(),
                e.getRole(),
                e.getCityId(),
                e.getCreatedAt() != null ? e.getCreatedAt().toInstant(ZoneOffset.UTC) : null,
                e.getUpdatedAt() != null ? e.getUpdatedAt().toInstant(ZoneOffset.UTC) : null);
    }
}