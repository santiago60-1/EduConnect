package com.edu.connect.application.port.out.user;

import com.edu.connect.domain.model.user.User;

import java.util.Optional;

public interface UserRepositoryPort {

    User save(User user);

    Optional<User> findById(Long id);

    Optional<User> findByEmail(String email);
}