package com.edu.connect.application.dto.user;

public record UpdateUserCommand(
                Long id,
                String email,
                String password) {
}
